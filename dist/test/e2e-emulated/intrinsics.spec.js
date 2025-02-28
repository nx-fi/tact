"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const intrinsics_IntrinsicsTester_1 = require("./contracts/output/intrinsics_IntrinsicsTester");
require("@ton/test-utils");
const paddedBits_1 = require("@ton/core/dist/boc/utils/paddedBits");
const sha256_1 = require("../../utils/sha256");
describe("intrinsics", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await intrinsics_IntrinsicsTester_1.IntrinsicsTester.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, "Deploy");
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should return correct intrinsic results", async () => {
        // Compile-time constants
        expect(await contract.getGetTons()).toBe((0, core_1.toNano)("10.1234"));
        expect(await contract.getGetTons2()).toBe((0, core_1.toNano)("10.1234"));
        expect(await contract.getGetString()).toBe("Hello world");
        expect(await contract.getGetString2()).toBe("Hello world");
        expect((await contract.getGetAddress()).equals(core_1.Address.parse("EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N"))).toBe(true);
        expect((await contract.getGetAddress2()).equals(core_1.Address.parse("EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N"))).toBe(true);
        expect((await contract.getGetCell()).equals(core_1.Cell.fromBase64("te6cckEBAQEADgAAGEhlbGxvIHdvcmxkIXgtxbw="))).toBe(true);
        expect((await contract.getGetCell2()).equals(core_1.Cell.fromBase64("te6cckEBAQEADgAAGEhlbGxvIHdvcmxkIXgtxbw="))).toBe(true);
        expect(await contract.getGetPow()).toBe(512n);
        expect(await contract.getGetPow2()).toBe(512n);
        // Compile-time optimizations
        expect((await contract.getGetComment()).equals((0, core_1.beginCell)()
            .storeUint(0, 32)
            .storeStringTail("Hello world")
            .endCell())).toBe(true);
        // Compile-time send/emit optimizations
        const emitResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)(1) }, "emit_1");
        // Verify emitted message
        expect(emitResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            outMessagesCount: 1,
        });
        const outMessage = emitResult.externals[0].body.beginParse();
        expect(outMessage.loadUint(32)).toEqual(0);
        expect(outMessage.loadStringTail()).toEqual("Hello world");
        expect(outMessage.remainingBits).toEqual(0);
        expect(outMessage.remainingRefs).toEqual(0);
        // Check `slice`
        expect((await contract.getGetSlice())
            .asCell()
            .equals(core_1.Cell.fromBase64("te6cckEBAQEADgAAGEhlbGxvIHdvcmxkIXgtxbw="))).toBe(true);
        expect((await contract.getGetSlice2())
            .asCell()
            .equals(core_1.Cell.fromBase64("te6cckEBAQEADgAAGEhlbGxvIHdvcmxkIXgtxbw="))).toBe(true);
        // Check `rawSlice`
        expect((await contract.getGetRawSlice())
            .asCell()
            .equals((0, core_1.beginCell)()
            .storeBuffer(Buffer.from("abcdef", "hex"))
            .endCell())).toBe(true);
        expect((await contract.getGetRawSlice2())
            .asCell()
            .equals((0, core_1.beginCell)()
            .storeBuffer(Buffer.from("abcdef", "hex"))
            .endCell())).toBe(true);
        expect((await contract.getGetRawSlice3()).asCell().equals(core_1.Cell.EMPTY)).toBe(true);
        expect((await contract.getGetRawSlice4()).asCell().equals(core_1.Cell.EMPTY)).toBe(true);
        expect((await contract.getGetRawSlice5())
            .asCell()
            .equals((0, core_1.beginCell)().storeUint(18, 6).endCell())).toBe(true);
        expect((await contract.getGetRawSlice6())
            .asCell()
            .equals((0, core_1.beginCell)().storeUint(18, 6).endCell())).toBe(true);
        expect((await contract.getGetRawSlice7()).asCell().equals(core_1.Cell.EMPTY)).toBe(true);
        expect((await contract.getGetRawSlice8()).asCell().equals(core_1.Cell.EMPTY)).toBe(true);
        expect((await contract.getGetRawSlice9())
            .asCell()
            .equals((0, core_1.beginCell)().storeUint(0, 3).endCell())).toBe(true);
        expect((await contract.getGetRawSlice10())
            .asCell()
            .equals((0, core_1.beginCell)().storeUint(0, 3).endCell())).toBe(true);
        expect((await contract.getGetRawSlice11()).asCell().equals(core_1.Cell.EMPTY)).toBe(true);
        expect((await contract.getGetRawSlice12()).asCell().equals(core_1.Cell.EMPTY)).toBe(true);
        expect((await contract.getGetRawSlice13())
            .asCell()
            .equals((0, core_1.beginCell)().storeUint(7, 4).endCell())).toBe(true);
        expect((await contract.getGetRawSlice14())
            .asCell()
            .equals((0, core_1.beginCell)().storeUint(7, 4).endCell())).toBe(true);
        expect((await contract.getGetRawSlice15()).asCell().equals((0, core_1.beginCell)()
            .storeBits((0, paddedBits_1.paddedBufferToBits)(Buffer.from("abcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcf", "hex")))
            .endCell())).toBe(true);
        expect((await contract.getGetRawSlice16()).asCell().equals((0, core_1.beginCell)()
            .storeBits((0, paddedBits_1.paddedBufferToBits)(Buffer.from("abcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcf", "hex")))
            .endCell())).toBe(true);
        expect((await contract.getGetRawSlice17())
            .asCell()
            .equals((0, core_1.beginCell)().storeUint(0b100010, 6).endCell())).toBe(true);
        expect((await contract.getGetRawSlice18())
            .asCell()
            .equals((0, core_1.beginCell)().storeUint(0b100010, 6).endCell())).toBe(true);
        expect((await contract.getGetRawSlice19())
            .asCell()
            .equals((0, core_1.beginCell)().storeUint(0b100010, 6).endCell())).toBe(true);
        expect((await contract.getGetRawSlice20())
            .asCell()
            .equals((0, core_1.beginCell)().storeUint(0b100010, 6).endCell())).toBe(true);
        expect((await contract.getGetRawSlice21()).asCell().equals(core_1.Cell.EMPTY)).toBe(true);
        expect((await contract.getGetRawSlice22()).asCell().equals(core_1.Cell.EMPTY)).toBe(true);
        expect((await contract.getGetRawSlice23()).asCell().equals(core_1.Cell.EMPTY)).toBe(true);
        expect((await contract.getGetRawSlice24()).asCell().equals(core_1.Cell.EMPTY)).toBe(true);
        // Check `ascii`
        expect(await contract.getGetAscii()).toBe(BigInt("0x68656c6c6f20776f726c64"));
        expect(await contract.getGetAscii2()).toBe(BigInt("0x68656c6c6f20776f726c64"));
        expect(await contract.getGetAscii3()).toBe(BigInt("1563963554659859369353828835329962428465513941646011501275668087180532385"));
        expect(await contract.getGetAscii4()).toBe(BigInt("1563963554659859369353828835329962428465513941646011501275668087180532385"));
        // Check `crc32`
        expect(await contract.getGetCrc32()).toBe(BigInt(2235694568));
        expect(await contract.getGetCrc32_2()).toBe(BigInt(2235694568));
        expect(await contract.getGetCrc32_3()).toBe(0n);
        expect(await contract.getGetCrc32_4()).toBe(0n);
    });
    const checkSha256 = async (input) => {
        const expected = (0, sha256_1.sha256)(input).value;
        const actual = await contract.getGetHashLongRuntime(input);
        expect(actual.toString(16)).toEqual(expected.toString(16));
    };
    const checkSha256Slice = async (input) => {
        const expected = (0, sha256_1.sha256)(input).value;
        const actual = await contract.getGetHashLongRuntimeSlice((0, core_1.beginCell)().storeStringTail(input).asSlice());
        expect(actual.toString(16)).toEqual(expected.toString(16));
    };
    const generateString = (length) => {
        const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    };
    it("should calculate sha256 correctly", async () => {
        function sha256Hex(src) {
            return (0, sha256_1.sha256)(src).value;
        }
        expect(await contract.getGetHash()).toBe(sha256Hex("hello world"));
        expect(await contract.getGetHashSlice()).toBe(sha256Hex("hello world"));
        expect(await contract.getGetHash2()).toBe(sha256Hex("hello world"));
        expect(await contract.getGetHash3((0, core_1.beginCell)().storeStringTail("sometest").endCell().asSlice())).toBe(sha256Hex("sometest"));
        expect(await contract.getGetHash4("wallet")).toBe(sha256Hex("wallet"));
        const longString = "------------------------------------------------------------------------------------------------------------------------------129";
        expect(await contract.getGetHashLongComptime()).toBe(sha256Hex(longString));
        await checkSha256("hello world");
        const input256bytes = generateString(256);
        // check various length input for strings and slices
        const s1 = generateString(15);
        await checkSha256(s1);
        await checkSha256Slice(s1);
        const s2 = generateString(127);
        await checkSha256(s2);
        await checkSha256Slice(s2);
        const s3 = generateString(128);
        await checkSha256(s3);
        await checkSha256Slice(s3);
        await checkSha256(input256bytes);
        await checkSha256Slice(input256bytes);
        const s5 = generateString(1024);
        await checkSha256(s5);
        await checkSha256Slice(s5);
        const s6 = generateString(16999);
        await checkSha256(s6);
        await checkSha256Slice(s6);
        // check that we hash all string, not just first 127 bytes
        const first128bytesOf256bytesString = input256bytes.slice(0, 128);
        const first128bytesOf256bytesStringHash = await contract.getGetHashLongRuntime(first128bytesOf256bytesString);
        const input256bytesStringHash = await contract.getGetHashLongRuntime(input256bytes);
        expect(first128bytesOf256bytesStringHash).not.toEqual(input256bytesStringHash);
        // check that we hash all slice, not just first 127 bytes
        const first128bytesOf256bytesSliceHash = await contract.getGetHashLongRuntimeSlice((0, core_1.beginCell)()
            .storeStringTail(first128bytesOf256bytesString)
            .asSlice());
        const input256bytesSliceHash = await contract.getGetHashLongRuntimeSlice((0, core_1.beginCell)().storeStringTail(input256bytes).asSlice());
        expect(first128bytesOf256bytesSliceHash).not.toEqual(input256bytesSliceHash);
        // NOTE:
        // The SHA256U instruction is used by string_hash() from FunC stdlib,
        // which was previously used by Tact for runtime hashing of String and Slice values.
        // check that SHA256U instruction hashes ONLY first 127 bytes
        const first128bytesOf256bytesSHA256U = await contract.getGetHashSha256U((0, core_1.beginCell)()
            .storeStringTail(first128bytesOf256bytesString)
            .asSlice());
        const input256bytesSHA256U = await contract.getGetHashSha256U((0, core_1.beginCell)().storeStringTail(input256bytes).asSlice());
        expect(first128bytesOf256bytesSHA256U).toEqual(input256bytesSHA256U);
        // check that HASHEXT_SHA256 instruction hashes ONLY first 127 bytes
        const first128bytesOf256bytesHASHEXTSHA256 = await contract.getGetHashHashextsha256((0, core_1.beginCell)()
            .storeStringTail(first128bytesOf256bytesString)
            .asSlice());
        const input256bytesHASHEXTSHA256 = await contract.getGetHashHashextsha256((0, core_1.beginCell)().storeStringTail(input256bytes).asSlice());
        expect(first128bytesOf256bytesHASHEXTSHA256).toEqual(input256bytesHASHEXTSHA256);
    });
});
