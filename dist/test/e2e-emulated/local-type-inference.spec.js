"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const local_type_inference_LocalTypeInferenceTester_1 = require("./contracts/output/local-type-inference_LocalTypeInferenceTester");
require("@ton/test-utils");
describe("local-type-inference", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await local_type_inference_LocalTypeInferenceTester_1.LocalTypeInferenceTester.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, { $$type: "Deploy", queryId: 0n });
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should automatically set types for let statements", async () => {
        expect(await contract.getTest1()).toStrictEqual(1n);
        expect(await contract.getTest2()).toStrictEqual(2n);
        expect((await contract.getTest3()).toRawString()).toBe(contract.address.toRawString());
        expect((await contract.getTest4()).toRawString()).toBe(contract.address.toRawString());
        expect(await contract.getTest5()).toStrictEqual(true);
        expect((await contract.getTest6()).toString()).toStrictEqual((0, core_1.beginCell)().storeUint(123, 64).endCell().asSlice().toString());
        expect((await contract.getTest7()).toString()).toStrictEqual((0, core_1.beginCell)().storeUint(123, 64).endCell().toString());
        expect((await contract.getTest8()).asCell().toString()).toStrictEqual((0, core_1.beginCell)().storeUint(123, 64).endCell().toString());
        expect(await contract.getTest9()).toStrictEqual("hello");
        expect(await contract.getTest10()).toStrictEqual("hello");
        const test11 = await contract.getTest11();
        expect(test11.code.toString()).toStrictEqual(contract.init?.code.toString());
        expect(test11.data.toString()).toStrictEqual(contract.init?.data.toString());
        expect(await contract.getTest14()).toStrictEqual({
            $$type: "MyStruct",
            x: 1n,
            y: 2n,
        });
        expect(await contract.getTest15()).toStrictEqual({
            $$type: "MyStruct",
            x: 1n,
            y: 2n,
        });
        expect(await contract.getTest16()).toBeNull();
        expect(await contract.getTest17()).toBeNull();
        expect(await contract.getTest18()).toBe(2n);
        expect(await contract.getTest19()).toBeNull();
        // Test contract's ABI
        expect(contract.abi).toMatchSnapshot();
    });
});
