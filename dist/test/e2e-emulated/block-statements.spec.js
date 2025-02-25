"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const block_statements_Test_1 = require("./contracts/output/block-statements_Test");
require("@ton/test-utils");
describe("block-statements", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await block_statements_Test_1.Test.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, { $$type: "Deploy", queryId: 0n });
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should work correctly with block statements", async () => {
        expect(await contract.getA()).toEqual(84n);
    });
    it("should work correctly with variables from subsequent block statements", async () => {
        expect(await contract.getB()).toEqual(1308n);
    });
    it("should work correctly with variables of different types from subsequent block statements", async () => {
        expect(await contract.getC()).toEqual(557n);
    });
    it("should work correctly with variables of different types from subsequent block statements inside interpreter", async () => {
        expect(await contract.getD()).toEqual(1308n);
    });
    it("should work correctly with variables of different types from nested block statements inside interpreter", async () => {
        expect(await contract.getE()).toEqual(84n);
    });
});
