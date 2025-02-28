"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const traits_LaikaContract_1 = require("./contracts/output/traits_LaikaContract");
require("@ton/test-utils");
describe("traits", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await traits_LaikaContract_1.LaikaContract.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("0.5") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should implement traits correctly", async () => {
        // Check the contract's behavior after deployment
        expect(await contract.getSay()).toBe("I am a Laika and I say Woof");
    });
    it("should override constant correctly", async () => {
        // Check the contract's behavior after deployment
        expect(await contract.getFooConstant()).toBe(100n);
    });
});
