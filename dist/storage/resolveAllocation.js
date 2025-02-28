"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllocation = getAllocation;
exports.getAllocations = getAllocations;
exports.getSortedTypes = getSortedTypes;
exports.resolveAllocations = resolveAllocations;
const context_1 = require("../context/context");
const resolveDescriptors_1 = require("../types/resolveDescriptors");
const utils_1 = require("../utils/utils");
const allocator_1 = require("./allocator");
const resolveABITypeRef_1 = require("../types/resolveABITypeRef");
const id_1 = require("../generator/writers/id");
const errors_1 = require("../error/errors");
const ast_helpers_1 = require("../ast/ast-helpers");
const store = (0, context_1.createContextStore)();
function getAllocation(ctx, name) {
    const t = store.get(ctx, name);
    if (!t) {
        (0, errors_1.throwInternalCompilerError)(`Allocation for ${name} not found`);
    }
    return t;
}
function getAllocations(ctx) {
    return getSortedTypes(ctx).map((v) => ({
        allocation: getAllocation(ctx, v.name),
        type: v,
    }));
}
function getSortedTypes(ctx) {
    const types = (0, resolveDescriptors_1.getAllTypes)(ctx).filter((v) => v.kind === "struct" || v.kind === "contract");
    let structs = types.filter((t) => t.kind === "struct");
    const refs = (src) => {
        const res = [];
        const t = new Set();
        for (const f of src.fields) {
            const r = f.type;
            if (r.kind === "ref") {
                const tp = (0, resolveDescriptors_1.getType)(ctx, r.name);
                if (tp.kind === "struct") {
                    if (!t.has(tp.name)) {
                        t.add(r.name);
                        res.push(tp);
                    }
                }
            }
        }
        return res;
    };
    structs = (0, utils_1.topologicalSort)(structs, refs);
    structs = [...structs, ...types.filter((v) => v.kind === "contract")];
    return structs;
}
function resolveAllocations(ctx) {
    // Load topological order of structs and contracts
    const types = getSortedTypes(ctx);
    // Generate allocations
    for (const s of types) {
        // Reserve bits
        let reserveBits = 0;
        let header = null;
        if (s.header !== null) {
            reserveBits += 32; // Header size
            header = { value: Number(s.header.value), bits: 32 };
        }
        // Reserver refs
        let reserveRefs = 0;
        if (s.kind === "contract") {
            reserveRefs += 1; // Internal state
        }
        // Convert fields
        const ops = [];
        const partialOps = [];
        for (const [i, f] of s.fields.entries()) {
            const op = {
                name: f.name,
                type: f.abi.type,
                op: (0, allocator_1.getAllocationOperationFromField)(f.abi.type, (name) => getAllocation(ctx, name).size),
            };
            ops.push(op);
            if (i < s.partialFieldCount) {
                partialOps.push(op);
            }
        }
        // Perform allocation
        const root = (0, allocator_1.allocate)({
            ops,
            reserved: { bits: reserveBits, refs: reserveRefs },
        });
        const partialRoot = (0, allocator_1.allocate)({
            ops: partialOps,
            reserved: { bits: reserveBits, refs: reserveRefs },
        });
        // Store allocation
        const allocation = {
            ops,
            root,
            header,
            size: {
                bits: root.size.bits + reserveBits,
                refs: root.size.refs + reserveRefs,
            },
        };
        const partialAllocation = {
            ops: partialOps,
            root: partialRoot,
            header,
            size: {
                bits: root.size.bits + reserveBits,
                refs: root.size.refs + reserveRefs,
            },
        };
        ctx = store.set(ctx, s.name, allocation);
        ctx = store.set(ctx, (0, resolveDescriptors_1.toBounced)(s.name), partialAllocation);
    }
    // Generate init allocations
    for (const s of types) {
        if (s.kind === "contract" && s.init) {
            // Reserve bits and refs
            let reserveBits = 0;
            let reserveRefs = 0;
            // Reserve first bit for init state
            reserveBits++;
            // Reserve ref for system cell
            reserveRefs++;
            // Resolve opts
            const ops = [];
            if (s.init.kind !== "contract-params") {
                for (const f of s.init.params) {
                    const abiType = (0, resolveABITypeRef_1.createABITypeRefFromTypeRef)(ctx, f.type, f.loc);
                    ops.push({
                        name: (0, ast_helpers_1.idText)(f.name),
                        type: abiType,
                        op: (0, allocator_1.getAllocationOperationFromField)(abiType, (name) => getAllocation(ctx, name).size),
                    });
                }
            }
            else {
                for (const f of s.init.contract.params ?? []) {
                    const abiType = (0, resolveABITypeRef_1.resolveABIType)(f);
                    ops.push({
                        name: (0, ast_helpers_1.idText)(f.name),
                        type: abiType,
                        op: (0, allocator_1.getAllocationOperationFromField)(abiType, (name) => getAllocation(ctx, name).size),
                    });
                }
            }
            // Perform allocation
            const root = (0, allocator_1.allocate)({
                ops,
                reserved: { bits: reserveBits, refs: reserveRefs },
            }); // Better allocation?
            // Store allocation
            const allocation = {
                ops,
                root,
                header: null,
                size: {
                    bits: root.size.bits + reserveBits,
                    refs: root.size.refs + reserveRefs,
                },
            };
            ctx = store.set(ctx, (0, id_1.funcInitIdOf)(s.name), allocation);
        }
    }
    return ctx;
}
