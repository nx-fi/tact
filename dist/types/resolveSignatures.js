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
exports.resolveSignatures = resolveSignatures;
const changeCase = __importStar(require("change-case"));
const idToHex_1 = require("../utils/idToHex");
const errors_1 = require("../error/errors");
const resolveDescriptors_1 = require("./resolveDescriptors");
const errors_2 = require("../error/errors");
const writeRouter_1 = require("../generator/writers/writeRouter");
const grammar_1 = require("../grammar");
const interpreter_1 = require("../optimizer/interpreter");
const constEval_1 = require("../optimizer/constEval");
const util_1 = require("../ast/util");
const sha256_1 = require("../utils/sha256");
function resolveSignatures(ctx, Ast) {
    const util = (0, util_1.getAstUtil)(Ast);
    const signatures = new Map();
    function createTypeFormat(type, format) {
        if (type === "int") {
            if (typeof format === "number") {
                return `int${format}`;
            }
            else if (format === "varint16" || format === "varint32") {
                return format;
            }
            else if (format !== null) {
                (0, errors_1.throwInternalCompilerError)(`Unsupported int format: ${format}`);
            }
            return `int`;
        }
        else if (type === "uint") {
            if (typeof format === "number") {
                return `uint${format}`;
            }
            else if (format === "coins") {
                return `coins`;
            }
            else if (format === "varuint16" || format === "varuint32") {
                return format;
            }
            else if (format !== null) {
                (0, errors_1.throwInternalCompilerError)(`Unsupported uint format: ${format}`);
            }
            return `uint`;
        }
        else if (type === "bool") {
            if (format !== null) {
                (0, errors_1.throwInternalCompilerError)(`Unsupported bool format: ${format}`);
            }
            return "bool";
        }
        else if (type === "address") {
            if (format !== null) {
                (0, errors_1.throwInternalCompilerError)(`Unsupported address format: ${format}`);
            }
            return "address";
        }
        else if (type === "cell") {
            if (format === "remainder") {
                return "remainder<cell>";
            }
            else if (format === "ref") {
                return "^cell";
            }
            if (format !== null) {
                (0, errors_1.throwInternalCompilerError)(`Unsupported cell format: ${format}`);
            }
            return "^cell";
        }
        else if (type === "slice") {
            if (format === "remainder") {
                return "remainder<slice>";
            }
            else if (format === "ref") {
                return "^slice";
            }
            else if (format !== null) {
                (0, errors_1.throwInternalCompilerError)(`Unsupported slice format: ${format}`);
            }
            return "^slice";
        }
        else if (type === "builder") {
            if (format === "remainder") {
                return "remainder<builder>";
            }
            else if (format === "ref") {
                return "^slice";
            }
            else if (format !== null) {
                (0, errors_1.throwInternalCompilerError)(`Unsupported builder format: ${format}`);
            }
            return "^builder";
        }
        else if (type === "string") {
            if (format !== null) {
                (0, errors_1.throwInternalCompilerError)(`Unsupported builder format: ${format}`);
            }
            return "^string";
        }
        else if (type === "fixed-bytes") {
            if (typeof format === "number") {
                return `fixed_bytes${format}`;
            }
            else if (format !== null) {
                (0, errors_1.throwInternalCompilerError)(`Unsupported fixed-bytes format: ${format}`);
            }
            (0, errors_1.throwInternalCompilerError)("Missing fixed-bytes format");
        }
        // Struct types
        const t = (0, resolveDescriptors_1.getType)(ctx, type);
        if (t.kind !== "struct") {
            (0, errors_1.throwInternalCompilerError)(`Unsupported type: ${type}`);
        }
        const s = createTupleSignature(type);
        if (format === "ref") {
            return `^${s.signature}`;
        }
        else if (format !== null) {
            (0, errors_1.throwInternalCompilerError)(`Unsupported struct format: ${format}`);
        }
        return s.signature;
    }
    function createTLBField(src) {
        switch (src.type.kind) {
            case "simple": {
                let base = createTypeFormat(src.type.type, src.type.format ?? null);
                if (src.type.optional) {
                    base = "Maybe " + base;
                }
                return src.name + ":" + base;
            }
            case "dict": {
                if (src.type.format !== null && src.type.format !== undefined) {
                    (0, errors_1.throwInternalCompilerError)(`Unsupported map format: ${src.type.format}`);
                }
                if (src.type.keyFormat === "coins") {
                    (0, errors_2.throwCompilationError)(`Unsupported format ${src.type.keyFormat} for map key`);
                }
                const key = createTypeFormat(src.type.key, src.type.keyFormat ?? null);
                const value = createTypeFormat(src.type.value, src.type.valueFormat ?? null);
                return src.name + ":dict<" + key + ", " + value + ">";
            }
        }
    }
    function createTupleSignature(name) {
        if (signatures.has(name)) {
            return signatures.get(name);
        }
        const t = (0, resolveDescriptors_1.getType)(ctx, name);
        if (t.kind !== "struct" && t.kind !== "contract") {
            (0, errors_1.throwInternalCompilerError)(`Unsupported type: ${name}`);
        }
        for (const field of t.fields) {
            const type = field.type;
            if (type.kind !== "ref") {
                continue;
            }
            const t = (0, resolveDescriptors_1.getType)(ctx, type.name);
            if (t.kind === "contract") {
                (0, errors_2.throwCompilationError)(`Fields with a contract type are not supported yet`, field.loc);
            }
        }
        // Check for no "as remaining" in the middle of the struct or contract
        for (const field of t.fields.slice(0, -1)) {
            if (field.as === "remaining") {
                const kind = t.ast.kind === "message_decl"
                    ? "message"
                    : t.ast.kind === "contract"
                        ? "contract"
                        : "struct";
                (0, errors_2.throwCompilationError)(`The "as remaining" field can only be the last field of the ${kind}`, field.loc);
            }
        }
        const fields = t.fields.map((v) => createTLBField(v.abi));
        // Calculate signature and method id
        const signature = name + "{" + fields.join(",") + "}";
        let id = null;
        if (t.ast.kind === "message_decl") {
            if (t.ast.opcode !== null) {
                // Currently, message opcode expressions do not get typechecked, so
                // ```
                // message(true ? 42 : false) TypeError { }
                // ```
                // WILL NOT result in error
                const opCode = (0, interpreter_1.ensureInt)((0, constEval_1.evalConstantExpression)(t.ast.opcode, ctx, util)).value;
                if (opCode === 0n) {
                    (0, errors_1.throwConstEvalError)(`Opcode of message ${(0, errors_1.idTextErr)(t.ast.name)} is zero: those are reserved for text comments and cannot be used for message structs`, true, t.ast.opcode.loc);
                }
                if (opCode < 0) {
                    (0, errors_1.throwConstEvalError)(`Opcode of message ${(0, errors_1.idTextErr)(t.ast.name)} is negative ('${opCode}') which is not allowed`, true, t.ast.opcode.loc);
                }
                if (opCode > 0xffff_ffff) {
                    (0, errors_1.throwConstEvalError)(`Opcode of message ${(0, errors_1.idTextErr)(t.ast.name)} is too large ('${opCode}'): it must fit into 32 bits`, true, t.ast.opcode.loc);
                }
                id =
                    t.ast.opcode.kind === "number"
                        ? t.ast.opcode
                        : {
                            kind: "number",
                            base: 10,
                            value: opCode,
                            id: 0,
                            loc: grammar_1.dummySrcInfo,
                        };
            }
            else {
                id = newMessageOpcode(signature);
                if (id.value === 0n) {
                    (0, errors_2.throwCompilationError)(`Auto-generated opcode for message "${(0, errors_1.idTextErr)(t.ast.name)}" is zero which is reserved for text comments.\nTry changing names of the message type or its fields to get a non-zero opcode.\nOr consider specifying the opcode explicitly.`, t.ast.loc);
                }
            }
        }
        // Calculate TLB
        const tlbHeader = id !== null
            ? `${changeCase.snakeCase(name)}#${(0, idToHex_1.idToHex)(Number(id.value))}`
            : "_";
        const tlb = tlbHeader + " " + fields.join(" ") + " = " + name;
        signatures.set(name, { signature, id, tlb });
        return { signature, id, tlb };
    }
    (0, resolveDescriptors_1.getAllTypes)(ctx).forEach((t) => {
        if (t.kind === "struct" || t.kind === "contract") {
            const r = createTupleSignature(t.name);
            t.tlb = r.tlb;
            t.signature = r.signature;
            t.header = r.id;
        }
    });
    checkAggregateTypes(ctx);
    return ctx;
}
function newMessageOpcode(signature) {
    return {
        kind: "number",
        base: 10,
        value: (0, sha256_1.highest32ofSha256)((0, sha256_1.sha256)(signature)),
        id: 0,
        loc: grammar_1.dummySrcInfo,
    };
}
function checkBinaryMessageReceiver(rcv, rcvAst, usedOpcodes, ctx) {
    const msgType = (0, resolveDescriptors_1.getType)(ctx, rcv.type);
    const opcode = msgType.header;
    if (usedOpcodes.has(Number(opcode.value))) {
        (0, errors_2.throwCompilationError)(`Receive functions of a contract or trait cannot process messages with the same opcode: opcodes of message types "${rcv.type}" and "${usedOpcodes.get(Number(opcode.value))}" are equal`, rcvAst.loc);
    }
    else {
        usedOpcodes.set(Number(opcode.value), rcv.type);
    }
}
// "opcode" clashes are highly unlikely in this case, of course
function checkCommentMessageReceiver(rcv, rcvAst, usedOpcodes) {
    const opcode1 = (0, writeRouter_1.commentPseudoOpcode)(rcv.comment, true, rcvAst.loc);
    const opcode2 = (0, writeRouter_1.commentPseudoOpcode)(rcv.comment, false, rcvAst.loc);
    if (usedOpcodes.has(opcode1) || usedOpcodes.has(opcode2)) {
        (0, errors_2.throwCompilationError)(`Receive functions of a contract or trait cannot process comments with the same hashes: hashes of comment strings "${rcv.comment}" and "${usedOpcodes.get(opcode1)}" are equal`, rcvAst.loc);
    }
    else {
        usedOpcodes.set(opcode1, rcv.comment);
        usedOpcodes.set(opcode2, rcv.comment);
    }
}
function checkMessageOpcodesUniqueInContractOrTrait(receivers, ctx) {
    const binBouncedRcvUsedOpcodes = new Map();
    const binExternalRcvUsedOpcodes = new Map();
    const binInternalRcvUsedOpcodes = new Map();
    const commentExternalRcvUsedOpcodes = new Map();
    const commentInternalRcvUsedOpcodes = new Map();
    for (const rcv of receivers) {
        switch (rcv.selector.kind) {
            case "internal-binary":
                checkBinaryMessageReceiver(rcv.selector, rcv.ast, binInternalRcvUsedOpcodes, ctx);
                break;
            case "bounce-binary":
                checkBinaryMessageReceiver(rcv.selector, rcv.ast, binBouncedRcvUsedOpcodes, ctx);
                break;
            case "external-binary":
                checkBinaryMessageReceiver(rcv.selector, rcv.ast, binExternalRcvUsedOpcodes, ctx);
                break;
            case "internal-comment":
                checkCommentMessageReceiver(rcv.selector, rcv.ast, commentInternalRcvUsedOpcodes);
                break;
            case "external-comment":
                checkCommentMessageReceiver(rcv.selector, rcv.ast, commentExternalRcvUsedOpcodes);
                break;
            default:
                break;
        }
    }
}
function checkAggregateTypes(ctx) {
    (0, resolveDescriptors_1.getAllTypes)(ctx).forEach((aggregate) => {
        switch (aggregate.kind) {
            case "contract":
                checkMessageOpcodesUniqueInContractOrTrait(aggregate.receivers, ctx);
                checkContractFields(aggregate);
                break;
            case "trait":
                checkMessageOpcodesUniqueInContractOrTrait(aggregate.receivers, ctx);
                break;
            default:
                break;
        }
    });
}
function checkContractFields(t) {
    // Check if "as remaining" is only used for the last field of contract
    for (const field of t.fields.slice(0, -1)) {
        if (field.as === "remaining") {
            (0, errors_2.throwCompilationError)(`The "as remaining" field can only be the last field of the contract`, field.ast.loc);
        }
    }
}
