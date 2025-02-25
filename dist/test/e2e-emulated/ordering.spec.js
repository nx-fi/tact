"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const ordering_A_1 = require("./contracts/output/ordering_A");
const ordering_B_1 = require("./contracts/output/ordering_B");
require("@ton/test-utils");
describe("ordering", () => {
    let blockchain;
    let treasure;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
    });
    it("should implement constructor ordering correctly in contract A", async () => {
        const contract = blockchain.openContract(await ordering_A_1.A.fromInit(treasure.address));
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, { $$type: "Deploy", queryId: 0n });
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
        // Check constructor order in contract A
        const res = await contract.getCreate(0n);
        expect(res.v1).toBe(3n);
        expect(res.v2).toBe(2n);
        expect(res.v3).toBe(1n);
    });
    it("should implement punned constructor correctly in contract B", async () => {
        const contract = blockchain.openContract(await ordering_B_1.B.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, { $$type: "Deploy", queryId: 0n });
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
        // Check constructor order in contract B
        const res = await contract.getCreate(0n);
        expect(res.v1).toBe(1n);
        expect(res.v2).toBe(2n);
        expect(res.v3).toBe(3n);
    });
});
