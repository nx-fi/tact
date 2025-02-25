"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const asm_shuffle_in_comptime_Test_1 = require("./contracts/output/asm-shuffle-in-comptime_Test");
require("@ton/test-utils");
describe("asm-shuffle-in-comptime", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await asm_shuffle_in_comptime_Test_1.Test.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("0.5") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should shuffle arguments correctly", async () => {
        expect(await contract.getFoo(10n)).toEqual(20n);
        expect(await contract.getFoo(100n)).toEqual(100n);
    });
});
