"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sha256_1 = require("./sha256");
const core_1 = require("@ton/core");
describe("sha256", () => {
    const bigintToBuffer = (value) => {
        const hex = value.toString(16);
        const paddedHex = hex.length % 2 === 0 ? hex : "0" + hex;
        return Buffer.from(paddedHex, "hex");
    };
    it("should be equal to Buffer.readUInt32BE", () => {
        const res = (0, sha256_1.sha256)("hello world");
        const buffer = bigintToBuffer(res.value);
        expect((0, sha256_1.highest32ofSha256)(res)).toBe(BigInt(buffer.readUInt32BE()));
    });
    it("should be equal to storeBuffer().loadUint", () => {
        const res = (0, sha256_1.sha256)("hello world");
        const buffer = bigintToBuffer(res.value);
        expect((0, sha256_1.highest32ofSha256)(res)).toBe(BigInt((0, core_1.beginCell)()
            .storeBuffer(buffer)
            .endCell()
            .beginParse()
            .loadUint(32)));
    });
});
