"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const constants_ConstantTester_1 = require("./contracts/output/constants_ConstantTester");
require("@ton/test-utils");
describe("constants", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await constants_ConstantTester_1.ConstantTester.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should implement constants correctly", async () => {
        // Check methods
        expect(await contract.getSomething1()).toEqual(11n);
        expect(await contract.getSomething2()).toBeNull();
        expect(await contract.getSomething3()).toEqual((0, core_1.toNano)("123"));
        expect(await contract.getSomething4()).toEqual((0, core_1.toNano)("456"));
        expect(await contract.getSomething5()).toEqual("Hello world!");
        expect(await contract.getSomething6()).toEqual(10n);
        expect(await contract.getSomething7()).toEqual(5n);
        expect(await contract.getSomething8()).toEqual(4n);
        expect((await contract.getSomething9()).toRawString()).toEqual("0:4a81708d2cf7b15a1b362fbf64880451d698461f52f05f145b36c08517d76873");
        expect((await contract.getSomething10()).toRawString()).toEqual("0:4a81708d2cf7b15a1b362fbf64880451d698461f52f05f145b36c08517d76873");
        expect(await contract.getSomething11()).toEqual(88n);
        expect(await contract.getSomething12()).toEqual(-90n);
        expect(await contract.getSomething13()).toEqual(88n);
        expect(await contract.getSomething14()).toEqual(243n);
        expect(await contract.getSomething15()).toEqual(32n);
        expect(await contract.getSomething16()).toEqual(-115792089237316195423570985008687907853269984665640564039457584007913129639936n);
        expect(await contract.getSomething17()).toEqual(115792089237316195423570985008687907853269984665640564039457584007913129639935n);
        expect(await contract.getSomething18()).toEqual(-115792089237316195423570985008687907853269984665640564039457584007913129639935n);
        expect(await contract.getSomething19()).toEqual(-115792089237316195423570985008687907853269984665640564039457584007913129639936n);
        expect(await contract.getMinInt1()).toEqual(-115792089237316195423570985008687907853269984665640564039457584007913129639936n);
        expect(await contract.getSomething20()).toEqual(-6n);
        expect(await contract.getGlobalConst()).toEqual(100n);
        expect(await contract.getSomething21()).toEqual(0n);
        expect(await contract.getSomething22()).toEqual(-1n);
        expect(await contract.getSomething23()).toEqual(-1n);
        expect(await contract.getSomething24()).toEqual(0n);
        expect(await contract.getSomething25()).toEqual(1n);
        expect(await contract.getSomething26()).toEqual(4n);
        expect(await contract.getSomething27()).toEqual(-4n);
        expect(await contract.getSomething28()).toEqual(-1n);
        expect(await contract.getSomething29()).toEqual(42n);
        expect(await contract.getSomething30()).toEqual(null);
        expect(await contract.getSomething31()).toEqual(42n);
        expect(await contract.getSomething32()).toEqual(42n);
        expect((await contract.getSomething33()).size).toEqual(0);
        expect((await contract.getSomething34()).size).toEqual(0);
        expect(await contract.getSomething35()).toEqual({
            $$type: "S",
            a: false,
            b: 42n,
        });
        expect(await contract.getSomething36()).toEqual({
            $$type: "S",
            a: false,
            b: 42n,
        });
        expect(await contract.getSomething37()).toEqual({
            $$type: "T",
            a: 42n,
            s: { $$type: "S", a: true, b: 42n },
        });
        expect(await contract.getSomething38()).toEqual(4n);
        expect(await contract.getSomething39()).toEqual(true);
        expect(await contract.getSomething40()).toEqual(true);
        expect((await contract.getSomething41()).toRawString()).toEqual("0:0000000000000000000000000000000000000000000000000000000000000000");
        expect((await contract.getSomething42()).toRawString()).toEqual("0:0000000000000000000000000000000000000000000000000000000000012345");
        expect((await contract.getSomething43()).toRawString()).toEqual("0:0000000000000000000000000000000000000000000000000123456789abcdef");
        expect((await contract.getSomething44()).toRawString()).toEqual("0:4a81708d2cf7b15a1b362fbf64880451d698461f52f05f145b36c08517d76873");
        expect(await contract.getSomething45()).toEqual(42n);
        expect(await contract.getGlobalConst1()).toEqual(1n);
        expect(await contract.getGlobalConst2()).toEqual(2n);
        expect(await contract.getGlobalConst3()).toEqual(4n);
        expect(await contract.getGlobalConst4()).toEqual(15n);
        expect(await contract.getGlobalConst5()).toEqual(15n);
        expect(await contract.getGlobalConst6()).toEqual(26n);
        expect(await contract.getGlobalConst7()).toEqual(27n);
        expect(await contract.getGlobalConst8()).toEqual(2n);
        expect(await contract.getGlobalConst9()).toEqual(2n);
        expect(await contract.getGlobalConst10()).toEqual(24n);
        expect(await contract.getGlobalConst11()).toEqual(24n);
        expect(await contract.getGlobalConst12()).toEqual(8n);
        expect(await contract.getGlobalConst13()).toEqual(8n);
        expect(await contract.getBeforeDefinedA()).toEqual(10n);
        expect(await contract.getBeforeDefinedC()).toEqual(20n);
        expect(await contract.getDefaultFieldB()).toEqual(20n);
        expect(await contract.getNoCircularA()).toEqual(200n);
    });
});
