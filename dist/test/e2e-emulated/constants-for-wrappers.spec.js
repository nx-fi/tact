"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const constants_for_wrappers_ConstantTester_1 = require("./contracts/output/constants-for-wrappers_ConstantTester");
require("@ton/test-utils");
describe("constants-for-wrappers", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await constants_for_wrappers_ConstantTester_1.ConstantTester.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should implement constants correctly", async () => {
        expect(await contract.getGlobalInt()).toEqual(constants_for_wrappers_ConstantTester_1.INT);
        expect(await contract.getGlobalString()).toEqual(constants_for_wrappers_ConstantTester_1.STRING);
        expect(await contract.getGlobalStringWithQuotes()).toEqual(constants_for_wrappers_ConstantTester_1.STRING_WITH_QUOTES);
        expect(await contract.getGlobalBool()).toEqual(constants_for_wrappers_ConstantTester_1.BOOL);
        expect((await contract.getGlobalAddress()).toRawString()).toEqual(constants_for_wrappers_ConstantTester_1.ADDR.toRawString());
        expect(await contract.getGlobalCell()).toEqualCell(constants_for_wrappers_ConstantTester_1.CELL);
        expect(await contract.getGlobalSlice()).toEqualSlice(constants_for_wrappers_ConstantTester_1.SLICE);
        expect(await contract.getGlobalSimpleStruct()).toEqual(constants_for_wrappers_ConstantTester_1.SIMPLE_STRUCT);
        expect(await contract.getGlobalNestedStruct()).toEqual(constants_for_wrappers_ConstantTester_1.NESTED_STRUCT);
        expect(await contract.getContractInt()).toEqual(constants_for_wrappers_ConstantTester_1.ConstantTester.INT);
        expect(await contract.getContractString()).toEqual(constants_for_wrappers_ConstantTester_1.ConstantTester.STRING);
        expect(await contract.getContractStringWithQuotes()).toEqual(constants_for_wrappers_ConstantTester_1.ConstantTester.STRING_WITH_QUOTES);
        expect(await contract.getContractBool()).toEqual(constants_for_wrappers_ConstantTester_1.ConstantTester.BOOL);
        expect((await contract.getContractAddress()).toRawString()).toEqual(constants_for_wrappers_ConstantTester_1.ConstantTester.ADDR.toRawString());
        expect(await contract.getContractCell()).toEqualCell(constants_for_wrappers_ConstantTester_1.ConstantTester.CELL);
        expect(await contract.getContractSlice()).toEqualSlice(constants_for_wrappers_ConstantTester_1.ConstantTester.SLICE);
        expect(await contract.getContractSimpleStruct()).toEqual(constants_for_wrappers_ConstantTester_1.ConstantTester.SIMPLE_STRUCT);
        expect(await contract.getContractNestedStruct()).toEqual(constants_for_wrappers_ConstantTester_1.ConstantTester.NESTED_STRUCT);
    });
});
