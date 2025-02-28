"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crc16_1 = require("./crc16");
describe("crc16", () => {
    it("crc16 is correctly calculated from the string", () => {
        expect((0, crc16_1.crc16)("")).toBe(0);
        expect((0, crc16_1.crc16)("Hello Tact")).toBe(11154);
        expect((0, crc16_1.crc16)("Привет Tact")).toBe(36467);
        expect((0, crc16_1.crc16)("👋 Tact")).toBe(17840);
        expect((0, crc16_1.crc16)("\u0000")).toBe(0);
        expect((0, crc16_1.crc16)("⚡")).toBe(40122);
        expect(((0, crc16_1.crc16)("get_wallet_data") & 0xffff) | 0x10000).toBe(97026);
        expect(((0, crc16_1.crc16)("get_jetton_data") & 0xffff) | 0x10000).toBe(106029);
        expect(((0, crc16_1.crc16)("get_wallet_address") & 0xffff) | 0x10000).toBe(103289);
    });
});
