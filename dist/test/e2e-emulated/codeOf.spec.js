"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const codeOf_CodeOfTester_1 = require("./contracts/output/codeOf_CodeOfTester");
const codeOf_ChildContract_1 = require("./contracts/output/codeOf_ChildContract");
require("@ton/test-utils");
describe("codeOf", () => {
    let blockchain;
    let treasure;
    let contract;
    let childContract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await codeOf_CodeOfTester_1.CodeOfTester.fromInit(0n, true));
        childContract = blockchain.openContract(await codeOf_ChildContract_1.ChildContract.fromInit(0n));
        const result = await contract.send(treasure.getSender(), {
            value: (0, core_1.toNano)("10"),
        }, null);
        expect(result.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should get self code correctly", async () => {
        const init = contract.init;
        if (!init)
            throw new Error("contract.init is undefined");
        expect((await contract.getSelfCode()).toString()).toEqual(init.code.toString());
    });
    it("should get child contract code correctly", async () => {
        const childInit = childContract.init;
        if (!childInit)
            throw new Error("childContract.init is undefined");
        expect((await contract.getChildCode()).toString()).toEqual(childInit.code.toString());
    });
    it("should pass internal tests correctly", async () => {
        expect(await contract.getTestThatMyCodeEqualToCodeOfSelf()).toEqual(true);
        expect(await contract.getTestThatInitOfSelfCodeEqualToCodeOf()).toEqual(true);
        expect(await contract.getTestThatInitOfChildCodeEqualToCodeOf()).toEqual(true);
        expect(await contract.getTestThatInitOfSelfCodeNotEqualToCodeOfChild()).toEqual(true);
        expect(await contract.getTestThatMyCodeNotEqualToCodeOfChild()).toEqual(true);
    });
});
