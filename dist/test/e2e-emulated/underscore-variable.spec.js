"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const underscore_variable_UnderscoreVariableTestContract_1 = require("./contracts/output/underscore-variable_UnderscoreVariableTestContract");
require("@ton/test-utils");
describe("underscore-variable", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await underscore_variable_UnderscoreVariableTestContract_1.UnderscoreVariableTestContract.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should implement underscore variables correctly", async () => {
        // Check methods
        expect(await contract.getTest1()).toEqual(0n);
        expect(await contract.getTest2()).toEqual(12n);
        expect(await contract.getTest3()).toEqual(6n);
        expect(await contract.getTest4()).toEqual(4n);
    });
});
