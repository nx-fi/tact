"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const try_catch_TryCatchTester_1 = require("./contracts/output/try-catch_TryCatchTester");
require("@ton/test-utils");
describe("try-catch", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await try_catch_TryCatchTester_1.TryCatchTester.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should implement try-catch statements correctly", async () => {
        // Check try-catch method results
        expect(await contract.getTestTryCatch1()).toEqual(7n);
        expect(await contract.getTestTryCatch2()).toEqual(101n);
        expect(await contract.getTestTryCatch3()).toEqual(4n);
        // Check state rollbacks
        expect(await contract.getGetCounter()).toEqual(0n);
        let sendResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, "increment");
        expect(sendResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
        });
        expect(await contract.getGetCounter()).toEqual(1n);
        sendResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, "incrementTryCatch");
        expect(sendResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
        });
        expect(await contract.getGetCounter()).toEqual(1n); // Counter should not change
        sendResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, "tryCatchRegisters");
        expect(sendResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
        });
        expect(await contract.getGetCounter()).toEqual(2n); // Counter should increment
    });
    it("should restore state changes if a throw occurs inside a function with non-trivial branching", async () => {
        expect(await contract.getTestTryCatch4()).toStrictEqual(true);
    });
});
