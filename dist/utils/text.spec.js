"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const text_1 = require("./text");
describe("text", () => {
    it("should detect blank lines", () => {
        expect((0, text_1.isBlank)("")).toBe(true);
        expect((0, text_1.isBlank)(" ")).toBe(true);
        expect((0, text_1.isBlank)("\t")).toBe(true);
        expect((0, text_1.isBlank)("a")).toBe(false);
    });
    it("should trim indent", () => {
        const res = (0, text_1.trimIndent)(`
            hello world
            123123 123123
               12312312
            12312312
        `);
        expect(res).toBe(`hello world\n123123 123123\n   12312312\n12312312`);
    });
});
