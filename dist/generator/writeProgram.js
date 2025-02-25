"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeProgram = writeProgram;
const resolveAllocation_1 = require("../storage/resolveAllocation");
const resolveDescriptors_1 = require("../types/resolveDescriptors");
const Writer_1 = require("./Writer");
const writeSerialization_1 = require("./writers/writeSerialization");
const writeStdlib_1 = require("./writers/writeStdlib");
const writeAccessors_1 = require("./writers/writeAccessors");
const writeFunction_1 = require("./writers/writeFunction");
const calculateIPFSlink_1 = require("../utils/calculateIPFSlink");
const store_1 = require("../context/store");
const emit_1 = require("./emitter/emit");
const writeContract_1 = require("./writers/writeContract");
const id_1 = require("./writers/id");
const idToHex_1 = require("../utils/idToHex");
const text_1 = require("../utils/text");
async function writeProgram(ctx, abiSrc, basename, contractCodes, debug) {
    //
    // Load ABI (required for generator)
    //
    const abi = JSON.stringify(abiSrc);
    const abiLink = await (0, calculateIPFSlink_1.calculateIPFSlink)(Buffer.from(abi));
    //
    // Render contract
    //
    const wCtx = new Writer_1.WriterContext(ctx, abiSrc.name);
    writeAll(ctx, wCtx, abiSrc.name, abiLink, contractCodes);
    const functions = wCtx.extract(debug);
    //
    // Emit files
    //
    const files = [];
    const imported = [];
    //
    // Headers
    //
    const headers = [];
    headers.push(`;;`);
    headers.push(`;; Header files for ${abiSrc.name}`);
    headers.push(`;; NOTE: declarations are sorted for optimal order`);
    headers.push(`;;`);
    headers.push(``);
    // const sortedHeaders = [...functions].sort((a, b) => a.name.localeCompare(b.name));
    for (const f of functions) {
        if (f.code.kind === "generic" && f.signature) {
            headers.push(`;; ${f.name}`);
            let sig = f.signature;
            if (f.flags.has("impure")) {
                sig = sig + " impure";
            }
            if (f.flags.has("inline")) {
                sig = sig + " inline";
            }
            else {
                sig = sig + " inline_ref";
            }
            headers.push(sig + ";");
            headers.push("");
        }
    }
    files.push({
        name: basename + ".headers.fc",
        code: headers.join("\n"),
    });
    //
    // stdlib
    //
    const stdlibHeader = (0, text_1.trimIndent)(`
        global (int, slice, int, slice) __tact_context;
        global slice __tact_context_sender;
        global cell __tact_child_contract_codes;
        global int __tact_randomized;
    `);
    const stdlibFunctions = tryExtractModule(functions, "stdlib", []);
    if (stdlibFunctions) {
        imported.push("stdlib");
    }
    const stdlib = (0, emit_1.emit)({
        header: stdlibHeader,
        functions: stdlibFunctions,
    });
    files.push({
        name: basename + ".stdlib.fc",
        code: stdlib,
    });
    //
    // native
    //
    const nativeSources = (0, store_1.getRawAST)(ctx).funcSources;
    if (nativeSources.length > 0) {
        imported.push("native");
        files.push({
            name: basename + ".native.fc",
            code: (0, emit_1.emit)({
                header: [...nativeSources.map((v) => v.code)].join("\n\n"),
            }),
        });
    }
    //
    // constants
    //
    const constantsFunctions = tryExtractModule(functions, "constants", imported);
    if (constantsFunctions) {
        imported.push("constants");
        files.push({
            name: basename + ".constants.fc",
            code: (0, emit_1.emit)({ functions: constantsFunctions }),
        });
    }
    //
    // storage
    //
    const emittedTypes = [];
    const types = (0, resolveAllocation_1.getSortedTypes)(ctx);
    for (const t of types) {
        const ffs = [];
        if (t.kind === "struct" || t.kind === "contract" || t.kind == "trait") {
            const typeFunctions = tryExtractModule(functions, "type:" + t.name, imported);
            if (typeFunctions) {
                imported.push("type:" + t.name);
                ffs.push(...typeFunctions);
            }
        }
        if (t.kind === "contract") {
            const typeFunctions = tryExtractModule(functions, "type:" + t.name + "$init", imported);
            if (typeFunctions) {
                imported.push("type:" + t.name + "$init");
                ffs.push(...typeFunctions);
            }
        }
        if (ffs.length > 0) {
            const header = [];
            header.push(";;");
            header.push(`;; Type: ${t.name}`);
            if (t.header !== null) {
                header.push(`;; Header: 0x${(0, idToHex_1.idToHex)(Number(t.header.value))}`);
            }
            if (t.tlb) {
                header.push(`;; TLB: ${t.tlb}`);
            }
            header.push(";;");
            emittedTypes.push((0, emit_1.emit)({
                functions: ffs,
                header: header.join("\n"),
            }));
        }
    }
    if (emittedTypes.length > 0) {
        files.push({
            name: basename + ".storage.fc",
            code: [...emittedTypes].join("\n\n"),
        });
    }
    // const storageFunctions = tryExtractModule(functions, 'storage', imported);
    // if (storageFunctions) {
    //     imported.push('storage');
    //     files.push({
    //         name: basename + '.storage.fc',
    //         code: emit({ functions: storageFunctions })
    //     });
    // }
    //
    // Remaining
    //
    const remainingFunctions = tryExtractModule(functions, null, imported);
    const header = [];
    header.push("#pragma version =0.4.6;");
    header.push("#pragma allow-post-modification;");
    header.push("#pragma compute-asm-ltr;");
    files.forEach((file) => {
        header.push("");
        header.push(`;; ${file.name}`);
        header.push(file.code);
    });
    header.push("");
    header.push(";;");
    header.push(`;; Contract ${abiSrc.name} functions`);
    header.push(";;");
    header.push("");
    const code = (0, emit_1.emit)({
        header: header.join("\n"),
        functions: remainingFunctions,
    });
    return {
        entrypoint: basename + ".code.fc",
        files: [{ name: basename + ".code.fc", code }],
        abi,
    };
}
function tryExtractModule(functions, context, imported) {
    // Put to map
    const maps = new Map();
    for (const f of functions) {
        maps.set(f.name, f);
    }
    // Extract functions of a context
    const ctxFunctions = functions
        .filter((v) => v.code.kind !== "skip")
        .filter((v) => {
        if (context) {
            return v.context === context;
        }
        else {
            return v.context === null || !imported.includes(v.context);
        }
    });
    if (ctxFunctions.length === 0) {
        return null;
    }
    // Check dependencies
    // if (context) {
    //     for (let f of ctxFunctions) {
    //         for (let d of f.depends) {
    //             let c = maps.get(d)!.context;
    //             if (!c) {
    //                 console.warn(`Function ${f.name} depends on ${d} with generic context, but ${context} is needed`);
    //                 return null; // Found dependency to unknown function
    //             }
    //             if (c !== context && (c !== null && !imported.includes(c))) {
    //                 console.warn(`Function ${f.name} depends on ${d} with ${c} context, but ${context} is needed`);
    //                 return null; // Found dependency to another context
    //             }
    //         }
    //     }
    // }
    return ctxFunctions;
}
function writeAll(ctx, wCtx, name, abiLink, contractCodes) {
    // Load all types
    const allTypes = (0, resolveDescriptors_1.getAllTypes)(ctx);
    const contracts = allTypes.filter((v) => v.kind === "contract");
    const c = contracts.find((v) => v.name === name);
    if (!c) {
        throw Error(`Contract "${name}" not found`);
    }
    // Stdlib
    (0, writeStdlib_1.writeStdlib)(wCtx);
    // Serializers
    const sortedTypes = (0, resolveAllocation_1.getSortedTypes)(ctx);
    for (const t of sortedTypes) {
        if (t.kind === "contract" || t.kind === "struct") {
            const allocation = (0, resolveAllocation_1.getAllocation)(ctx, t.name);
            const allocationBounced = (0, resolveAllocation_1.getAllocation)(ctx, (0, resolveDescriptors_1.toBounced)(t.name));
            (0, writeSerialization_1.writeSerializer)(t.name, t.kind === "contract", allocation, t.origin, wCtx);
            (0, writeSerialization_1.writeOptionalSerializer)(t.name, t.origin, wCtx);
            (0, writeSerialization_1.writeParser)(t.name, t.kind === "contract", "with-opcode", allocation, t.origin, wCtx);
            (0, writeSerialization_1.writeParser)(t.name, t.kind === "contract", "no-opcode", allocation, t.origin, wCtx);
            (0, writeSerialization_1.writeOptionalParser)(t.name, t.origin, wCtx);
            (0, writeSerialization_1.writeBouncedParser)(t.name, t.kind === "contract", allocationBounced, t.origin, wCtx);
        }
    }
    // Accessors
    for (const t of allTypes) {
        if (t.kind === "contract" || t.kind === "struct") {
            (0, writeAccessors_1.writeAccessors)(t, t.origin, wCtx);
        }
    }
    // Init serializers
    for (const t of sortedTypes) {
        if (t.kind === "contract" && t.init) {
            const allocation = (0, resolveAllocation_1.getAllocation)(ctx, (0, id_1.funcInitIdOf)(t.name));
            (0, writeSerialization_1.writeSerializer)((0, id_1.funcInitIdOf)(t.name), true, allocation, t.origin, wCtx);
            (0, writeSerialization_1.writeParser)((0, id_1.funcInitIdOf)(t.name), false, "with-opcode", allocation, t.origin, wCtx);
        }
    }
    // Storage Functions
    for (const t of sortedTypes) {
        if (t.kind === "contract") {
            (0, writeContract_1.writeStorageOps)(t, t.origin, wCtx);
        }
    }
    // Static functions
    (0, resolveDescriptors_1.getAllStaticFunctions)(ctx).forEach((f) => {
        (0, writeFunction_1.writeFunction)(f, wCtx);
    });
    // Extensions
    for (const c of allTypes) {
        if (c.kind !== "contract" && c.kind !== "trait") {
            // We are rendering contract functions separately
            for (const f of c.functions.values()) {
                (0, writeFunction_1.writeFunction)(f, wCtx);
            }
        }
    }
    // Contract functions
    for (const c of contracts) {
        // Init
        if (c.init) {
            (0, writeContract_1.writeInit)(c, c.init, wCtx, contractCodes);
        }
        // Functions
        for (const f of c.functions.values()) {
            (0, writeFunction_1.writeFunction)(f, wCtx);
        }
    }
    // Write contract main
    (0, writeContract_1.writeMainContract)(c, abiLink, wCtx);
}
