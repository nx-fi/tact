"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const text_message_receivers_TextMessageReceivers_1 = require("./contracts/output/text-message-receivers_TextMessageReceivers");
require("@ton/test-utils");
describe("text-message-receivers", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await text_message_receivers_TextMessageReceivers_1.TextMessageReceivers.fromInit());
    });
    it("should deploy", async () => {
        // Deploy the contract
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("1") }, { $$type: "Deploy", queryId: 0n });
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
        // Verify initial state
        expect(await contract.getGetCounter()).toBe(0n);
    });
    it("should increment counter with different text messages", async () => {
        // Deploy the contract
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("1") }, { $$type: "Deploy", queryId: 0n });
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
        // Verify initial state
        expect(await contract.getGetCounter()).toBe(0n);
        const sendMessage = async (message) => {
            const incrementResult1 = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("1") }, message);
            expect(incrementResult1.transactions).toHaveTransaction({
                from: treasure.address,
                to: contract.address,
                success: true,
            });
        };
        // Increment counter
        await sendMessage("increment'");
        expect(await contract.getGetCounter()).toBe(1n);
        await sendMessage('increment-2\\"');
        expect(await contract.getGetCounter()).toBe(3n);
        await sendMessage("increment-3`");
        expect(await contract.getGetCounter()).toBe(6n);
        await sendMessage("\\\\increment-4\\\\");
        expect(await contract.getGetCounter()).toBe(10n);
    });
});
