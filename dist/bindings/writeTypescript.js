"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeTypescript = writeTypescript;
const changeCase = __importStar(require("change-case"));
const Writer_1 = require("../utils/Writer");
const writeStruct_1 = require("./typescript/writeStruct");
const errors_1 = require("../error/errors");
const utils_1 = require("../utils/utils");
const allocator_1 = require("../storage/allocator");
const serializers_1 = require("./typescript/serializers");
const ast_helpers_1 = require("../ast/ast-helpers");
const features_1 = require("../config/features");
function writeArguments(args) {
    const res = [];
    outer: for (const f of args) {
        for (const s of serializers_1.serializers) {
            const v = s.abiMatcher(f.type);
            if (v) {
                res.push(`${f.name}: ${s.tsType(v)}`);
                continue outer;
            }
        }
        (0, errors_1.throwInternalCompilerError)(`Unsupported type: ${JSON.stringify(f.type)}`);
    }
    return res;
}
function writeTypescript(abi, ctx, init) {
    const w = new Writer_1.Writer();
    w.write(`
        import { 
            Cell,
            Slice, 
            Address, 
            Builder, 
            beginCell, 
            ComputeError, 
            TupleItem, 
            TupleReader, 
            Dictionary, 
            contractAddress, 
            ContractProvider, 
            Sender, 
            Contract, 
            ContractABI, 
            ABIType,
            ABIGetter,
            ABIReceiver,
            TupleBuilder,
            DictionaryValue
        } from '@ton/core';
    `);
    w.append();
    const allocations = {};
    // Structs
    if (abi.types) {
        // Allocations
        const refs = (src) => {
            const res = [];
            const t = new Set();
            for (const f of src.fields) {
                const r = f.type;
                if (r.kind === "simple") {
                    const e = abi.types.find((v) => (0, ast_helpers_1.eqNames)(v.name, r.type));
                    if (e) {
                        if (!t.has(r.type)) {
                            t.add(r.type);
                            res.push(e);
                        }
                    }
                }
            }
            return res;
        };
        const sortedTypes = (0, utils_1.topologicalSort)(abi.types, refs);
        for (const f of sortedTypes) {
            const ops = f.fields.map((v) => ({
                name: v.name,
                type: v.type,
                op: (0, allocator_1.getAllocationOperationFromField)(v.type, (s) => allocations[s].size),
            }));
            const headerBits = f.header ? 32 : 0;
            const allocation = (0, allocator_1.allocate)({
                reserved: { bits: headerBits, refs: 0 },
                ops,
            });
            allocations[f.name] = {
                size: {
                    bits: allocation.size.bits + headerBits,
                    refs: allocation.size.refs,
                },
                root: allocation,
            };
        }
        for (const s of abi.types) {
            (0, writeStruct_1.writeStruct)(s.name, s.fields, true, w);
            (0, writeStruct_1.writeSerializer)(s, allocations[s.name].root, w);
            (0, writeStruct_1.writeParser)(s, allocations[s.name].root, w);
            (0, writeStruct_1.writeTupleParser)(s, w);
            (0, writeStruct_1.writeGetterTupleParser)(s, w);
            (0, writeStruct_1.writeTupleSerializer)(s, w);
            (0, writeStruct_1.writeDictParser)(s, w);
        }
    }
    // Init
    if (init) {
        // Write serializer
        const argTypeName = (abi.name ?? "Contract") + "_init_args";
        const ops = init.args.map((v) => ({
            name: v.name,
            type: v.type,
            op: (0, allocator_1.getAllocationOperationFromField)(v.type, (s) => allocations[s].size),
        }));
        const allocation = (0, allocator_1.allocate)({
            reserved: { bits: init.prefix ? init.prefix.bits : 0, refs: 1 },
            ops,
        });
        (0, writeStruct_1.writeStruct)(argTypeName, init.args, false, w);
        (0, writeStruct_1.writeInitSerializer)(argTypeName, allocation, w);
        // Write init function
        w.append(`async function ${abi.name}_init(${writeArguments(init.args).join(", ")}) {`);
        w.inIndent(() => {
            // Code references
            w.append(`const __code = Cell.fromBase64('${init.code}');`);
            w.append("const builder = beginCell();");
            if (init.system !== null && !(0, features_1.enabledOptimizedChildCode)(ctx)) {
                w.append(`const __system = Cell.fromBase64('${init.system}');`);
                w.append(`builder.storeRef(__system);`);
            }
            if (init.prefix) {
                w.append(`builder.storeUint(${init.prefix.value}, ${init.prefix.bits});`);
            }
            w.append(`init${argTypeName}({ ${[`$$type: '${argTypeName}'`, ...init.args.map((v) => v.name)].join(", ")} })(builder);`);
            w.append(`const __data = builder.endCell();`);
            w.append(`return { code: __code, data: __data };`);
        });
        w.append(`}`);
        w.append();
    }
    // Errors
    w.append(`const ${abi.name}_errors: { [key: number]: { message: string } } = {`);
    w.inIndent(() => {
        if (abi.errors) {
            Object.entries(abi.errors).forEach(([k, abiError]) => {
                w.append(`${k}: { message: \`${abiError.message.replaceAll("`", "\\`")}\` },`);
            });
        }
    });
    w.append(`}`);
    w.append();
    // Types
    w.append(`const ${abi.name}_types: ABIType[] = [`);
    w.inIndent(() => {
        if (abi.types) {
            for (const t of abi.types) {
                w.append(JSON.stringify(t) + ",");
            }
        }
    });
    w.append(`]`);
    w.append();
    const getterNames = new Map();
    // Getters
    w.append(`const ${abi.name}_getters: ABIGetter[] = [`);
    w.inIndent(() => {
        if (abi.getters) {
            for (const t of abi.getters) {
                w.append(JSON.stringify(t) + ",");
                let getterName = changeCase.pascalCase(t.name);
                if (Array.from(getterNames.values()).includes(getterName)) {
                    getterName = t.name;
                }
                getterNames.set(t.name, getterName);
            }
        }
    });
    w.append(`]`);
    w.append();
    // Getter mapping
    w.append(`export const ${abi.name}_getterMapping: { [key: string]: string } = {`);
    w.inIndent(() => {
        if (abi.getters) {
            for (const t of abi.getters) {
                w.append(`'${t.name}': 'get${getterNames.get(t.name)}',`);
            }
        }
    });
    w.append(`}`);
    w.append();
    // Receivers
    w.append(`const ${abi.name}_receivers: ABIReceiver[] = [`);
    w.inIndent(() => {
        if (abi.receivers) {
            for (const t of abi.receivers) {
                w.append(JSON.stringify(t) + ",");
            }
        }
    });
    w.append(`]`);
    w.append();
    // Wrapper
    w.append(`export class ${abi.name} implements Contract {`);
    w.inIndent(() => {
        w.append();
        if (init) {
            w.append(`static async init(${writeArguments(init.args).join(", ")}) {`);
            w.inIndent(() => {
                w.append(`return await ${abi.name}_init(${init.args.map((v) => v.name).join(", ")});`);
            });
            w.append(`}`);
            w.append();
            w.append(`static async fromInit(${writeArguments(init.args).join(", ")}) {`);
            w.inIndent(() => {
                w.append(`const __gen_init = await ${abi.name}_init(${init.args.map((v) => v.name).join(", ")});`);
                w.append(`const address = contractAddress(0, __gen_init);`);
                w.append(`return new ${abi.name}(address, __gen_init);`);
            });
            w.append(`}`);
            w.append();
        }
        w.append(`static fromAddress(address: Address) {`);
        w.inIndent(() => {
            w.append(`return new ${abi.name}(address);`);
        });
        w.append(`}`);
        w.append();
        w.append(`readonly address: Address; `);
        w.append(`readonly init?: { code: Cell, data: Cell };`);
        w.append(`readonly abi: ContractABI = {`);
        w.inIndent(() => {
            w.append(`types:  ${abi.name}_types,`);
            w.append(`getters: ${abi.name}_getters,`);
            w.append(`receivers: ${abi.name}_receivers,`);
            w.append(`errors: ${abi.name}_errors,`);
        });
        w.append(`};`);
        w.append();
        w.append(`private constructor(address: Address, init?: { code: Cell, data: Cell }) {`);
        w.inIndent(() => {
            w.append("this.address = address;");
            w.append("this.init = init;");
        });
        w.append("}");
        w.append();
        // Internal receivers
        if (abi.receivers &&
            abi.receivers.filter((v) => v.receiver === "internal").length > 0) {
            // Types
            const receivers = [];
            for (const r of abi.receivers) {
                if (r.receiver !== "internal") {
                    continue;
                }
                switch (r.message.kind) {
                    case "empty":
                        {
                            receivers.push(`null`);
                        }
                        break;
                    case "typed":
                        {
                            receivers.push(r.message.type);
                        }
                        break;
                    case "text":
                        {
                            if (r.message.text !== null &&
                                r.message.text !== undefined) {
                                receivers.push(JSON.stringify(r.message.text));
                            }
                            else {
                                receivers.push(`string`);
                            }
                        }
                        break;
                    case "any":
                        {
                            receivers.push(`Slice`);
                        }
                        break;
                }
            }
            // Receiver function
            w.append(`async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: ${receivers.join(" | ")}) {`);
            w.inIndent(() => {
                w.append();
                // Parse message
                w.append(`let body: Cell | null = null;`);
                for (const r of abi.receivers) {
                    if (r.receiver !== "internal") {
                        continue;
                    }
                    const msg = r.message;
                    switch (msg.kind) {
                        case "typed":
                            {
                                w.append(`if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === '${msg.type}') {`);
                                w.inIndent(() => {
                                    w.append(`body = beginCell().store(store${msg.type}(message)).endCell();`);
                                });
                                w.append(`}`);
                            }
                            break;
                        case "empty":
                            {
                                w.append(`if (message === null) {`);
                                w.inIndent(() => {
                                    w.append(`body = new Cell();`);
                                });
                                w.append(`}`);
                            }
                            break;
                        case "text":
                            {
                                if (msg.text === null ||
                                    msg.text === undefined) {
                                    w.append(`if (typeof message === 'string') {`);
                                    w.inIndent(() => {
                                        w.append(`body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();`);
                                    });
                                    w.append(`}`);
                                }
                                else {
                                    w.append(`if (message === ${JSON.stringify(msg.text)}) {`);
                                    w.inIndent(() => {
                                        w.append(`body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();`);
                                    });
                                    w.append(`}`);
                                }
                            }
                            break;
                        case "any": {
                            w.append(`if (message && typeof message === 'object' && message instanceof Slice) {`);
                            w.inIndent(() => {
                                w.append(`body = message.asCell();`);
                            });
                            w.append(`}`);
                        }
                    }
                }
                w.append(`if (body === null) { throw new Error('Invalid message type'); }`);
                w.append();
                // Send message
                w.append(`await provider.internal(via, { ...args, body: body });`);
                w.append();
            });
            w.append(`}`);
            w.append();
        }
        if (abi.receivers &&
            abi.receivers.filter((v) => v.receiver === "external").length > 0) {
            // Types
            const receivers = [];
            for (const r of abi.receivers) {
                if (r.receiver !== "external") {
                    continue;
                }
                switch (r.message.kind) {
                    case "empty":
                        {
                            receivers.push(`null`);
                        }
                        break;
                    case "typed":
                        {
                            receivers.push(r.message.type);
                        }
                        break;
                    case "text":
                        {
                            if (r.message.text !== null &&
                                r.message.text !== undefined) {
                                receivers.push(`'${r.message.text}'`);
                            }
                            else {
                                receivers.push(`string`);
                            }
                        }
                        break;
                    case "any":
                        {
                            receivers.push(`Slice`);
                        }
                        break;
                }
            }
            // Receiver function
            w.append(`async sendExternal(provider: ContractProvider, message: ${receivers.join(" | ")}) {`);
            w.inIndent(() => {
                w.append();
                // Parse message
                w.append(`let body: Cell | null = null;`);
                for (const r of abi.receivers) {
                    if (r.receiver !== "external") {
                        continue;
                    }
                    const msg = r.message;
                    switch (msg.kind) {
                        case "typed":
                            {
                                w.append(`if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === '${msg.type}') {`);
                                w.inIndent(() => {
                                    w.append(`body = beginCell().store(store${msg.type}(message)).endCell();`);
                                });
                                w.append(`}`);
                            }
                            break;
                        case "empty":
                            {
                                w.append(`if (message === null) {`);
                                w.inIndent(() => {
                                    w.append(`body = new Cell();`);
                                });
                                w.append(`}`);
                            }
                            break;
                        case "text":
                            {
                                if (msg.text === null ||
                                    msg.text === undefined) {
                                    w.append(`if (typeof message === 'string') {`);
                                    w.inIndent(() => {
                                        w.append(`body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();`);
                                    });
                                    w.append(`}`);
                                }
                                else {
                                    w.append(`if (message === '${msg.text}') {`);
                                    w.inIndent(() => {
                                        w.append(`body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();`);
                                    });
                                    w.append(`}`);
                                }
                            }
                            break;
                        case "any": {
                            w.append(`if (message && typeof message === 'object' && message instanceof Slice) {`);
                            w.inIndent(() => {
                                w.append(`body = message.asCell();`);
                            });
                            w.append(`}`);
                        }
                    }
                }
                w.append(`if (body === null) { throw new Error('Invalid message type'); }`);
                w.append();
                // Send message
                w.append(`await provider.external(body);`);
                w.append();
            });
            w.append(`}`);
            w.append();
        }
        // Getters
        if (abi.getters) {
            for (const g of abi.getters) {
                w.append(`async get${getterNames.get(g.name)}(${["provider: ContractProvider", ...writeArguments(g.arguments ?? [])].join(", ")}) {`);
                w.inIndent(() => {
                    w.append(`const builder = new TupleBuilder();`);
                    if (g.arguments) {
                        for (const a of g.arguments) {
                            (0, writeStruct_1.writeArgumentToStack)(a.name, a.type, w);
                        }
                    }
                    if (g.methodId) {
                        // 'as any' is used because Sandbox contracts's getters can be called
                        // using the function name or the method id number
                        // but the ContractProvider's interface get methods can only
                        // take strings (function names)
                        w.append(`const source = (await provider.get(${g.methodId} as any, builder.build())).stack;`);
                    }
                    else {
                        w.append(`const source = (await provider.get('${g.name}', builder.build())).stack;`);
                    }
                    if (g.returnType) {
                        (0, writeStruct_1.writeGetParser)("result", g.returnType, w);
                        w.append(`return result;`);
                    }
                });
                w.append(`}`);
                w.append();
            }
        }
    });
    w.append(`}`);
    return w.end();
}
