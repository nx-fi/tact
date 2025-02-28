"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crc32_1 = require("./crc32");
describe("crc32", () => {
    it("crc32 is correctly calculated from the string", () => {
        expect((0, crc32_1.crc32)("")).toBe(0);
        expect((0, crc32_1.crc32)("Hello Tact")).toBe(-1612685692);
        expect((0, crc32_1.crc32)("Привет Tact")).toBe(-1470995533);
        expect((0, crc32_1.crc32)("👋 Tact")).toBe(1855222621);
        expect((0, crc32_1.crc32)("\u0000")).toBe(-771559539);
        expect((0, crc32_1.crc32)("⚡")).toBe(2136484914);
    });
});
