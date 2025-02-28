"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const sample_jetton_SampleJetton_1 = require("./contracts/output/sample-jetton_SampleJetton");
const sample_jetton_JettonDefaultWallet_1 = require("./contracts/output/sample-jetton_JettonDefaultWallet");
require("@ton/test-utils");
describe("bugs", () => {
    let blockchain;
    let treasure;
    let contract;
    let target;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await sample_jetton_SampleJetton_1.SampleJetton.fromInit(treasure.address, (0, core_1.beginCell)().endCell(), (0, core_1.toNano)("100")));
        target = blockchain.openContract(await sample_jetton_JettonDefaultWallet_1.JettonDefaultWallet.fromInit(contract.address, treasure.address));
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, {
            $$type: "Mint",
            receiver: treasure.address,
            amount: (0, core_1.toNano)("10"),
        });
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should deploy sample jetton correctly", async () => {
        // Ensure that the Mint operation was successful and the transaction was correct
        const mintResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, {
            $$type: "Mint",
            receiver: treasure.address,
            amount: (0, core_1.toNano)("10"),
        });
        expect(mintResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
        });
        expect(mintResult.transactions).toHaveTransaction({
            from: contract.address,
            op: 0x178d4519,
            success: true,
        });
        expect(mintResult.transactions).toHaveTransaction({
            to: treasure.address,
            op: 0xd53276db,
        });
        expect((await target.getGetWalletData()).balance).toBe((0, core_1.toNano)("20"));
    });
});
