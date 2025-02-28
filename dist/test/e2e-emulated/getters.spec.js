"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const getters_Test_1 = require("./contracts/output/getters_Test");
require("@ton/test-utils");
// disable tests on MacOS
const it = process.platform === "darwin" && process.env.CI ? test.skip : test;
describe("getters", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await getters_Test_1.Test.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, {
            $$type: "Deploy",
            queryId: 0n,
        });
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should implement getters correctly", async () => {
        // Getter name conflicts
        expect(await contract.getTestGetter()).toBe(1n);
        expect(await contract.gettest_getter()).toBe(2n);
        expect(await contract.getTest_getter()).toBe(3n);
        expect(getters_Test_1.Test_getterMapping["testGetter"]).toBe("getTestGetter");
        expect(getters_Test_1.Test_getterMapping["test_getter"]).toBe("gettest_getter");
        expect(getters_Test_1.Test_getterMapping["Test_getter"]).toBe("getTest_getter");
        // Passing `S` struct to getter
        expect(await contract.getStructAsInput({
            $$type: "S",
            a: 1n,
            b: 2n,
        })).toMatchSnapshot();
        // Returning `self` from getter
        expect(await contract.getContractData()).toMatchSnapshot();
        // Passing `SetIdAndData` message to getter
        expect(await contract.getMessageAsInput1({
            $$type: "SetIdAndData",
            id: 42n,
            data: (0, core_1.beginCell)().endCell(),
        })).toBe(42n);
        expect(await contract.getMessageAsInput2({
            $$type: "SetIdAndData",
            id: 42n,
            data: (0, core_1.beginCell)().endCell(),
        })).toMatchSnapshot();
        // Passing `Test` contract data to getter
        expect(await contract.getContractAsInput({
            $$type: "Test$Data",
            id: 123n,
            anotherData: (0, core_1.beginCell)().storeUint(123, 64).endCell(),
        })).toMatchSnapshot();
        expect(await contract.getMethodIdExpr()).toBe(true);
        expect(await contract.getMethodIdConst()).toBe(2n ** 14n);
        expect(await contract.getMethodIdMin()).toBe(true);
        expect(await contract.getMethodIdMax()).toBe(true);
    });
});
