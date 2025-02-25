"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const contract_with_init_init_parameter_Test_1 = require("./contracts/output/contract-with-init-init-parameter_Test");
require("@ton/test-utils");
describe("contract-with-init-init-parameter", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await contract_with_init_init_parameter_Test_1.Test.fromInit({
            $$type: "Init",
            foo: 99n,
        }));
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("0.5") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should return correct result", async () => {
        expect(await contract.getData()).toBe(99n);
    });
});
