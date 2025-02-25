"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const implicit_init_MyContract_1 = require("./contracts/output/implicit-init_MyContract");
require("@ton/test-utils");
describe("implicit-init", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await implicit_init_MyContract_1.MyContract.fromInit());
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
    it("should increment counter", async () => {
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
        // Increment counter
        const incrementResult1 = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("1") }, "increment");
        expect(incrementResult1.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
        });
        expect(await contract.getGetCounter()).toBe(1n);
        const incrementResult2 = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("1") }, "increment");
        expect(incrementResult2.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
        });
        expect(await contract.getGetCounter()).toBe(2n);
    });
});
