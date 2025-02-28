"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const ternary_TernaryTester_1 = require("./contracts/output/ternary_TernaryTester");
require("@ton/test-utils");
describe("ternary", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await ternary_TernaryTester_1.TernaryTester.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should implement ternary operator correctly", async () => {
        // Check methods
        expect(await contract.getTest1(123n)).toEqual(1n);
        expect(await contract.getTest1(5n)).toEqual(2n);
        expect(await contract.getTest2(123n)).toEqual(246n);
        expect(await contract.getTest2(5n)).toEqual(15n);
        expect(await contract.getTest3(2n, 2n)).toEqual(1n);
        expect(await contract.getTest3(2n, 3n)).toEqual(2n);
        expect(await contract.getTest4(123n, 456n)).toEqual(1n);
        expect(await contract.getTest4(123n, 5n)).toEqual(2n);
        expect(await contract.getTest4(5n, 789n)).toEqual(3n);
        expect(await contract.getTest4(5n, 5n)).toEqual(4n);
        expect(await contract.getTest5()).toEqual(1n);
        expect(await contract.getTest6()).toEqual(1n);
        expect(await contract.getTest7()).toEqual(2n);
        expect(await contract.getTest8()).toEqual(3n);
        expect(await contract.getTest9()).toEqual(3n);
        expect(await contract.getTest10(1n)).toEqual(42n);
        expect(await contract.getTest10(2n)).toEqual(43n);
        expect(await contract.getTest10(3n)).toEqual(44n);
        expect(await contract.getTest10(4n)).toEqual(45n);
        expect(await contract.getTest10(0n)).toEqual(45n);
        expect(await contract.getTest10(42n)).toEqual(45n);
    });
});
