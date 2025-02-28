"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const bounceable_Test_1 = require("./contracts/output/bounceable_Test");
require("@ton/test-utils");
describe("Context.bounceable", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await bounceable_Test_1.Test.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should set to true for bounce message", async () => {
        await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10"), bounce: true }, "test");
        expect(await contract.getWasBounceable()).toEqual(true);
    });
    it("should set to false for non bounce message", async () => {
        await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10"), bounce: false }, "test");
        expect(await contract.getWasBounceable()).toEqual(false);
    });
});
