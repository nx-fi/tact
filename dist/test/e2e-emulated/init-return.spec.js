"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const init_return_Test_1 = require("./contracts/output/init-return_Test");
require("@ton/test-utils");
describe("init-return", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await init_return_Test_1.Test.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should deploy with return statement in init", async () => {
        expect(await contract.getA()).toEqual(123n);
    });
});
