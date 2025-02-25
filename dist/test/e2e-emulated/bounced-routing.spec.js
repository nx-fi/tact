"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const bounced_routing_SampleContract2_1 = require("./contracts/output/bounced-routing_SampleContract2");
const bounced_routing_SampleContract_1 = require("./contracts/output/bounced-routing_SampleContract");
require("@ton/test-utils");
describe("strings", () => {
    let blockchain;
    let treasure;
    let contract;
    let contract2;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await bounced_routing_SampleContract_1.SampleContract.fromInit());
        contract2 = blockchain.openContract(await bounced_routing_SampleContract2_1.SampleContract2.fromInit());
        // Deploy contracts
        let deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
        deployResult = await contract2.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract2.address,
            success: true,
            deploy: true,
        });
    });
    it("should bounce based on type router", async () => {
        // Initial amount check
        expect(await contract.getAmount()).toBe(100n);
        // Send EntryFirst message
        let result = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, {
            $$type: "EntryFirst",
            amountToAdd: 10n,
            toAddress: contract2.address,
        });
        expect(result.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
        });
        // Verify amount after EntryFirst
        expect(await contract.getAmount()).toBe(98n);
        // Send EntrySecond message
        result = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, {
            $$type: "EntrySecond",
            amountToAdd: 10n,
            toAddress: contract2.address,
        });
        expect(result.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
        });
        // Verify amount after EntrySecond
        expect(await contract.getAmount()).toBe(94n);
    });
});
