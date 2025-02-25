"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeNonBouncedRouter = writeNonBouncedRouter;
exports.groupContractReceivers = groupContractReceivers;
exports.writeBouncedRouter = writeBouncedRouter;
exports.commentPseudoOpcode = commentPseudoOpcode;
const core_1 = require("@ton/core");
const resolveDescriptors_1 = require("../../types/resolveDescriptors");
const id_1 = require("./id");
const ops_1 = require("./ops");
const resolveFuncTypeUnpack_1 = require("./resolveFuncTypeUnpack");
const writeFunction_1 = require("./writeFunction");
const errors_1 = require("../../error/errors");
const errors_2 = require("../../abi/errors");
const resolveFuncTypeFromAbiUnpack_1 = require("./resolveFuncTypeFromAbiUnpack");
const resolveAllocation_1 = require("../../storage/resolveAllocation");
// empty string receiver (`receive("")`) is not allowed
function writeNonBouncedRouter(receivers, contract, wCtx) {
    // - Special case: there are no receivers at all
    if (typeof receivers.empty === "undefined" &&
        receivers.binary.length === 0 &&
        receivers.comment.length === 0 &&
        typeof receivers.commentFallback === "undefined" &&
        typeof receivers.fallback === "undefined") {
        wCtx.append(`throw(${errors_2.contractErrors.invalidMessage.id});`);
        return;
    }
    // - Special case: only fallback receiver
    if (typeof receivers.fallback !== "undefined" &&
        receivers.binary.length === 0 &&
        receivers.comment.length === 0 &&
        typeof receivers.commentFallback === "undefined") {
        writeFallbackReceiver(receivers.fallback, contract, "in_msg", wCtx);
        return;
    }
    const writeBinaryReceivers = (msgOpcodeRemoved) => {
        receivers.binary.forEach((binRcv) => {
            writeBinaryReceiver(binRcv, msgOpcodeRemoved, contract, wCtx);
            wCtx.append();
        });
    };
    // - Special case: only binary receivers
    if (typeof receivers.empty === "undefined" &&
        receivers.comment.length === 0 &&
        typeof receivers.commentFallback === "undefined" &&
        typeof receivers.fallback === "undefined") {
        wCtx.append(`var (op, _) = in_msg~load_uint_quiet(32);`);
        writeBinaryReceivers(true);
        wCtx.append(`throw(${errors_2.contractErrors.invalidMessage.id});`);
        return;
    }
    // If there is a fallback receiver and binary/string receivers, we need to keep in_msg intact,
    // otherwise we can modify in_msg in-place
    const opcodeReader = typeof receivers.fallback === "undefined"
        ? "~load_uint"
        : ".preload_uint";
    const doesHaveTextReceivers = receivers.comment.length > 0 ||
        typeof receivers.commentFallback !== "undefined";
    wCtx.append("int op = 0;");
    wCtx.append("int in_msg_length = slice_bits(in_msg);");
    wCtx.inBlock("if (in_msg_length >= 32)", () => {
        wCtx.append(`op = in_msg${opcodeReader}(32);`);
        if (doesHaveTextReceivers) {
            writeBinaryReceivers(opcodeReader === "~load_uint");
        }
    });
    // NOTE: It should be more efficient to write all binary receivers inside
    //       `in_msg_length` length if-check regardless of text receivers,
    //       but while using Fift this way is better
    if (!doesHaveTextReceivers) {
        writeBinaryReceivers(opcodeReader === "~load_uint");
    }
    if (typeof receivers.empty !== "undefined") {
        const emptyRcv = receivers.empty;
        wCtx.append(";; Receive empty message");
        wCtx.inBlock("if ((op == 0) & (in_msg_length <= 32))", () => {
            writeReceiverBody(emptyRcv.ast.statements, contract, wCtx);
        });
    }
    writeCommentReceivers(receivers.comment, receivers.commentFallback, receivers.kind, opcodeReader === "~load_uint", typeof receivers.fallback !== "undefined", contract, wCtx);
    if (typeof receivers.fallback !== "undefined") {
        wCtx.append(";; Receiver fallback");
        writeFallbackReceiver(receivers.fallback, contract, "in_msg", wCtx);
    }
    else {
        wCtx.append(`;; Throw if not handled`);
        wCtx.append(`throw(${errors_2.contractErrors.invalidMessage.id});`);
    }
}
function writeBinaryReceiver(binaryReceiver, msgOpcodeRemoved, contract, wCtx) {
    const selector = binaryReceiver.selector;
    if (selector.kind !== "internal-binary" &&
        selector.kind !== "external-binary")
        (0, errors_1.throwInternalCompilerError)(`Invalid selector type: ${selector.kind} (internal-binary or external-binary is expected)`, binaryReceiver.ast.loc);
    const allocation = (0, resolveDescriptors_1.getType)(wCtx.ctx, selector.type);
    if (!allocation.header) {
        (0, errors_1.throwInternalCompilerError)(`Invalid allocation: ${selector.type}`, binaryReceiver.ast.loc);
    }
    wCtx.append(`;; Receive ${selector.type} message`);
    wCtx.inBlock(`if (op == ${messageOpcode(allocation.header)})`, () => {
        if (!msgOpcodeRemoved) {
            wCtx.append("in_msg~skip_bits(32);");
        }
        const msgFields = (0, resolveFuncTypeUnpack_1.resolveFuncTypeUnpack)(selector.type, (0, id_1.funcIdOf)(selector.name), wCtx);
        wCtx.append(`var ${msgFields} = in_msg~${ops_1.ops.reader(selector.type, "no-opcode", wCtx)}();`);
        writeReceiverBody(binaryReceiver.ast.statements, contract, wCtx);
    });
}
function writeCommentReceivers(commentReceivers, commentFallbackReceiver, kind, msgOpcodeRemoved, fallbackReceiverExists, contract, wCtx) {
    // - Special case: no text receivers at all
    if (typeof commentFallbackReceiver === "undefined" &&
        commentReceivers.length === 0) {
        return;
    }
    const writeFallbackTextReceiver = (commentFallbackReceiver) => {
        const writeFallbackTextReceiverInternal = () => {
            wCtx.append(";; Fallback Text Receiver");
            const inMsg = msgOpcodeRemoved ? "in_msg" : "in_msg.skip_bits(32)";
            writeFallbackReceiver(commentFallbackReceiver, contract, inMsg, wCtx);
            wCtx.append("return ();");
        };
        // We optimize fallback
        if (!fallbackReceiverExists) {
            wCtx.inBlock("if (op == 0)", writeFallbackTextReceiverInternal);
        }
        else {
            writeFallbackTextReceiverInternal();
        }
    };
    const writeTextReceivers = () => {
        // - Special case: only fallback comment receiver
        if (typeof commentFallbackReceiver !== "undefined" &&
            commentReceivers.length === 0) {
            writeFallbackTextReceiver(commentFallbackReceiver);
            return;
        }
        wCtx.append("var text_op = slice_hash(in_msg);");
        commentReceivers.forEach((commentRcv) => {
            if (commentRcv.selector.kind !== "external-comment" &&
                commentRcv.selector.kind !== "internal-comment") {
                (0, errors_1.throwInternal)(`Wrong type of a text receiver: ${commentRcv.selector.kind}`);
                return;
            }
            const hash = commentPseudoOpcode(commentRcv.selector.comment, !msgOpcodeRemoved, commentRcv.ast.loc);
            wCtx.append(`;; Receive "${commentRcv.selector.comment}" message`);
            wCtx.inBlock(`if (text_op == 0x${hash})`, () => {
                writeReceiverBody(commentRcv.ast.statements, contract, wCtx);
            });
        });
        if (typeof commentFallbackReceiver !== "undefined") {
            writeFallbackTextReceiver(commentFallbackReceiver);
        }
    };
    wCtx.append(";; Empty Receiver and Text Receivers");
    if (fallbackReceiverExists) {
        wCtx.inBlock("if (op == 0)", writeTextReceivers);
    }
    else {
        // - Special case: no fallback receiver
        writeTextReceivers();
    }
}
function groupContractReceivers(contract) {
    const contractReceivers = {
        internal: {
            kind: "internal",
            empty: undefined,
            binary: [],
            comment: [],
            commentFallback: undefined,
            fallback: undefined,
        },
        external: {
            kind: "external",
            empty: undefined,
            binary: [],
            comment: [],
            commentFallback: undefined,
            fallback: undefined,
        },
        bounced: {
            binary: [],
            fallback: undefined,
        },
    };
    for (const receiver of contract.receivers) {
        const selector = receiver.selector;
        switch (selector.kind) {
            case "internal-empty":
                contractReceivers.internal.empty = receiver;
                break;
            case "internal-binary":
                contractReceivers.internal.binary.push(receiver);
                break;
            case "internal-comment":
                contractReceivers.internal.comment.push(receiver);
                break;
            case "internal-comment-fallback":
                contractReceivers.internal.commentFallback = {
                    selector,
                    ast: receiver.ast,
                };
                break;
            case "internal-fallback":
                contractReceivers.internal.fallback = {
                    selector,
                    ast: receiver.ast,
                };
                break;
            case "external-empty":
                contractReceivers.external.empty = receiver;
                break;
            case "external-binary":
                contractReceivers.external.binary.push(receiver);
                break;
            case "external-comment":
                contractReceivers.external.comment.push(receiver);
                break;
            case "external-comment-fallback":
                contractReceivers.external.commentFallback = {
                    selector,
                    ast: receiver.ast,
                };
                break;
            case "external-fallback":
                contractReceivers.external.fallback = {
                    selector,
                    ast: receiver.ast,
                };
                break;
            case "bounce-binary":
                contractReceivers.bounced.binary.push(receiver);
                break;
            case "bounce-fallback":
                contractReceivers.bounced.fallback = {
                    selector,
                    ast: receiver.ast,
                };
                break;
        }
    }
    return contractReceivers;
}
function writeBouncedRouter(bouncedReceivers, contract, wCtx) {
    wCtx.append(";; Handle bounced messages");
    // - Special case: there are no bounce receivers at all, we can skip the bounce handling
    if (typeof bouncedReceivers.fallback === "undefined" &&
        bouncedReceivers.binary.length === 0) {
        wCtx.append("if (msg_bounced) { return (); }");
        return;
    }
    // - Special case: there is only a fallback receiver
    if (typeof bouncedReceivers.fallback !== "undefined" &&
        bouncedReceivers.binary.length === 0) {
        const bouncedFallback = bouncedReceivers.fallback;
        wCtx.inBlock("if (msg_bounced)", () => {
            wCtx.append(";; Fallback bounce receiver");
            wCtx.append(";; Skip 0xFFFFFFFF prefix of the bounced message");
            wCtx.append("in_msg~skip_bits(32);");
            writeFallbackReceiver(bouncedFallback, contract, "in_msg", wCtx);
        });
        return;
    }
    // If there is a fallback receiver and bounced message receivers, we need to keep in_msg intact,
    // otherwise we can modify in_msg in-place
    const opcodeReader = typeof bouncedReceivers.fallback === "undefined"
        ? "~load_uint"
        : ".preload_uint";
    wCtx.inBlock("if (msg_bounced)", () => {
        wCtx.append(";; Skip 0xFFFFFFFF prefix of a bounced message");
        wCtx.append("in_msg~skip_bits(32);");
        wCtx.append(`int op = 0;`);
        wCtx.inBlock("if (slice_bits(in_msg) >= 32)", () => {
            wCtx.append(`op = in_msg${opcodeReader}(32);`);
        });
        bouncedReceivers.binary.forEach((bouncedRcv) => {
            writeBouncedReceiver(bouncedRcv, opcodeReader === "~load_uint", contract, wCtx);
            wCtx.append();
        });
        if (typeof bouncedReceivers.fallback !== "undefined") {
            wCtx.append(";; Fallback bounce receiver");
            writeFallbackReceiver(bouncedReceivers.fallback, contract, "in_msg", wCtx);
        }
        // it's cheaper in terms of gas to just exit with code zero even if the
        // bounced message wasn't recognized, this is a common behavior of TON contracts
        wCtx.append("return ();");
    });
}
function writeFallbackReceiver(fbRcv, contract, inMsg, wCtx) {
    wCtx.append(`slice ${(0, id_1.funcIdOf)(fbRcv.selector.name)} = ${inMsg};`);
    writeReceiverBody(fbRcv.ast.statements, contract, wCtx);
}
function writeBouncedReceiver(bouncedReceiver, msgOpcodeRemoved, contract, wCtx) {
    const selector = bouncedReceiver.selector;
    if (selector.kind !== "bounce-binary")
        (0, errors_1.throwInternalCompilerError)(`Invalid selector type: ${selector.kind} (bounce-binary is expected)`, bouncedReceiver.ast.loc);
    wCtx.append(`;; Bounced handler for ${selector.type} message`);
    const allocation = (0, resolveDescriptors_1.getType)(wCtx.ctx, selector.type);
    wCtx.inBlock(`if (op == ${messageOpcode(allocation.header)})`, () => {
        if (!msgOpcodeRemoved) {
            wCtx.append("in_msg~skip_bits(32);");
        }
        const msgFields = (0, resolveFuncTypeUnpack_1.resolveFuncTypeUnpack)(selector.type, (0, id_1.funcIdOf)(selector.name), wCtx, false, selector.bounced);
        const msgReader = selector.bounced
            ? ops_1.ops.readerBounced(selector.type, wCtx)
            : ops_1.ops.reader(selector.type, "no-opcode", wCtx);
        wCtx.append(`var ${msgFields} = in_msg~${msgReader}();`);
        writeReceiverBody(bouncedReceiver.ast.statements, contract, wCtx);
    });
}
function writeReceiverBody(statements, contract, wCtx) {
    for (const stmt of statements) {
        (0, writeFunction_1.writeStatement)(stmt, null, null, wCtx);
    }
    writeStoreContractVariables(contract, wCtx);
    wCtx.append("return ();");
}
function messageOpcode(n) {
    // FunC does not support binary and octal numerals
    switch (n.base) {
        case 10:
            return n.value.toString(n.base);
        case 2:
        case 8:
        case 16:
            return `0x${n.value.toString(n.base)}`;
    }
}
function writeStoreContractVariables(contract, wCtx) {
    const contractVariables = (0, resolveFuncTypeFromAbiUnpack_1.resolveFuncTypeFromAbiUnpack)("$self", (0, resolveAllocation_1.getAllocation)(wCtx.ctx, contract.name).ops, wCtx);
    wCtx.append(`;; Persist state`);
    wCtx.append(`${ops_1.ops.contractStore(contract.name, wCtx)}(${contractVariables});`);
}
function commentPseudoOpcode(comment, includeZeroOpcode, loc) {
    const buffer = Buffer.from(comment, "utf8");
    if (buffer.length > 123) {
        (0, errors_1.throwCompilationError)(`receiver message is too long, max length is 123 bytes, but given ${buffer.length}`, loc);
    }
    const cell = includeZeroOpcode
        ? (0, core_1.beginCell)().storeUint(0, 32).storeBuffer(buffer).endCell()
        : (0, core_1.beginCell)().storeBuffer(buffer).endCell();
    return cell.hash().toString("hex", 0, 64);
}
