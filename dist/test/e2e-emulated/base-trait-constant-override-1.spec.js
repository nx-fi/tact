"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const base_trait_constant_override_1_TraitsConstantContract_1 = require("./contracts/output/base-trait-constant-override-1_TraitsConstantContract");
require("@ton/test-utils");
describe("base-trait-constant-override-1", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await base_trait_constant_override_1_TraitsConstantContract_1.TraitsConstantContract.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("0.5") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should override constant correctly", async () => {
        expect(await contract.getConstant()).toEqual(100n);
    });
});
