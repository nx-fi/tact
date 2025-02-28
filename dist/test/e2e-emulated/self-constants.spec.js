"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const self_constants_ConstantTester_1 = require("./contracts/output/self-constants_ConstantTester");
require("@ton/test-utils");
describe("self-constants", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await self_constants_ConstantTester_1.ConstantTester.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should implement self constants correctly", async () => {
        expect(await contract.getB()).toEqual(42n);
        expect(await contract.getC2()).toEqual(51n);
        expect(await contract.getValue()).toEqual(69n);
        expect(await contract.getTraitB()).toEqual(42n);
        expect(await contract.getTraitC2()).toEqual(51n);
    });
});
