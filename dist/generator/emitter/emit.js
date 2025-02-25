"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emit = emit;
const text_1 = require("../../utils/text");
const createPadded_1 = require("./createPadded");
function emit(args) {
    // Emit header
    let res = "";
    if (args.header) {
        res = (0, text_1.trimIndent)(args.header);
    }
    // Emit functions
    if (args.functions) {
        for (const f of args.functions) {
            if (f.name === "$main") {
                continue;
            }
            else {
                if (res !== "") {
                    res += "\n\n";
                }
                if (f.comment) {
                    for (const s of f.comment.split("\n")) {
                        res += `;; ${s}\n`;
                    }
                }
                if (f.code.kind === "generic") {
                    let sig = f.signature;
                    if (f.flags.has("impure")) {
                        sig = `${sig} impure`;
                    }
                    if (f.flags.has("inline")) {
                        sig = `${sig} inline`;
                    }
                    else {
                        sig = `${sig} inline_ref`;
                    }
                    res += `${sig} {\n${(0, createPadded_1.createPadded)(f.code.code)}\n}`;
                }
                else if (f.code.kind === "asm") {
                    let sig = f.signature;
                    if (f.flags.has("impure")) {
                        sig = `${sig} impure`;
                    }
                    res += `${sig} asm${f.code.shuffle} """\n    ${f.code.code}\n""";`;
                }
                else {
                    throw new Error(`Unknown function body kind`);
                }
            }
        }
        // Emit main
        const m = args.functions.find((v) => v.name === "$main");
        if (m) {
            if (m.code.kind !== "generic") {
                throw new Error(`Main function should have generic body`);
            }
            if (res !== "") {
                res += "\n\n";
            }
            res += m.code.code;
        }
    }
    return res;
}
