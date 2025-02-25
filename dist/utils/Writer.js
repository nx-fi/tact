"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Writer = void 0;
const text_1 = require("./text");
class Writer {
    indent = 0;
    lines = [];
    inIndent = (handler) => {
        this.indent++;
        handler();
        this.indent--;
    };
    inBlock = (beforeCurlyBrace, handler) => {
        this.append(`${beforeCurlyBrace} {`);
        this.inIndent(handler);
        this.append("}");
    };
    append(src = "") {
        this.lines.push(" ".repeat(this.indent * 4) + src);
    }
    write(src) {
        const lines = (0, text_1.trimIndent)(src).split("\n");
        for (const l of lines) {
            this.append(l);
        }
    }
    end() {
        return this.lines.join("\n");
    }
}
exports.Writer = Writer;
