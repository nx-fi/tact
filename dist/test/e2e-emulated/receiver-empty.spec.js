"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const receiver_empty_Test_1 = require("./contracts/output/receiver-empty_Test");
require("@ton/test-utils");
describe("receiver-empty", () => {
    let blockchain;
    let treasure;
    let contract;
    const amount = (0, core_1.toNano)("0.5");
    const checkBalanceIsWithinLimits = async (amount, epsilon) => {
        const contractBalance = await contract.getBalance();
        expect(contractBalance).toBeGreaterThan(amount - epsilon);
        expect(contractBalance).toBeLessThan(amount);
    };
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await receiver_empty_Test_1.Test.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: amount }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
        await checkBalanceIsWithinLimits(amount, (0, core_1.toNano)("0.002"));
    });
    it("empty receivers accept sent funds", async () => {
        const sendResult = await contract.send(treasure.getSender(), { value: amount }, null);
        expect(sendResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: false,
        });
        await checkBalanceIsWithinLimits(2n * amount, (0, core_1.toNano)("0.003"));
    });
});
