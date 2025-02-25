"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const repeat_range_RepeatRangeTester_1 = require("./contracts/output/repeat-range_RepeatRangeTester");
require("@ton/test-utils");
describe("repeat range", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure", {
            resetBalanceIfZero: true,
        });
        contract = blockchain.openContract(await repeat_range_RepeatRangeTester_1.RepeatRangeTester.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should test repeat range boundaries", async () => {
        // ignored range
        expect(await contract.getTestIgnoredRange()).toEqual(true);
        // invalid range
        expect(await contract.getTestInvalidRange()).toEqual(true);
        // min effective range
        expect(await contract.getTestMinEffectiveRange()).toEqual(true);
        // max effective range
        const sendResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, "testMaxEffectiveRange");
        expect(sendResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: false,
            exitCode: -14,
        });
    });
});
