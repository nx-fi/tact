"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const recursion_RecursionTester_1 = require("./contracts/output/recursion_RecursionTester");
require("@ton/test-utils");
describe("recursion", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await recursion_RecursionTester_1.RecursionTester.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, { $$type: "Deploy", queryId: 0n });
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should perform recursive operations correctly", async () => {
        // Check Fibonacci sequence
        expect(await contract.getFib(0n)).toBe(0n);
        expect(await contract.getFib(1n)).toBe(1n);
        expect(await contract.getFib(2n)).toBe(1n);
        expect(await contract.getFib(3n)).toBe(2n);
        // Check Factorial calculations
        expect(await contract.getFact(0n)).toBe(1n);
        expect(await contract.getFact(1n)).toBe(1n);
        expect(await contract.getFact(2n)).toBe(2n);
        expect(await contract.getFact(3n)).toBe(6n);
    });
});
