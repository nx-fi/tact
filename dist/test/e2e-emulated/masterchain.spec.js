"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const masterchain_MasterchainTester_1 = require("./contracts/output/masterchain_MasterchainTester");
require("@ton/test-utils");
describe("masterchain", () => {
    let blockchain;
    let treasure;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
    });
    //
    // Deployment and simple message receiving
    //
    it("should deploy to workchain", async () => {
        const contract = blockchain.openContract(await masterchain_MasterchainTester_1.MasterchainTester.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, "DeployToWorkchain");
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should not deploy to workchain from masterchain", async () => {
        const treasure = await blockchain.treasury("treasure", {
            workchain: -1,
        });
        const contract = blockchain.openContract(await masterchain_MasterchainTester_1.MasterchainTester.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, "DeployToWorkchain");
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: false,
            deploy: true,
            exitCode: 1137,
        });
    });
    it("should deploy to masterchain from masterchain", async () => {
        const treasure = await blockchain.treasury("treasure", {
            workchain: -1,
        });
        const contract = blockchain.openContract(await masterchain_MasterchainTester_1.MasterchainTester.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, "DeployToMasterchain");
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
});
