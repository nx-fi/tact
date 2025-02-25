"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const base_trait_function_override_BaseTraitsFunctionContract_1 = require("./contracts/output/base-trait-function-override_BaseTraitsFunctionContract");
require("@ton/test-utils");
describe("base-trait-function-override", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await base_trait_function_override_BaseTraitsFunctionContract_1.BaseTraitsFunctionContract.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should override function correctly", async () => {
        expect(await contract.getValue()).toEqual(1000n);
    });
});
