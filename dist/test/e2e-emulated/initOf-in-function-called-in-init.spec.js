"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const initOf_in_function_called_in_init_Test_1 = require("./contracts/output/initOf-in-function-called-in-init_Test");
const initOf_in_function_called_in_init_2_Test_1 = require("./contracts/output/initOf-in-function-called-in-init-2_Test");
const initOf_in_function_called_in_init_MasterV0_1 = require("./contracts/output/initOf-in-function-called-in-init_MasterV0");
const initOf_in_function_called_in_init_2_MasterV0_1 = require("./contracts/output/initOf-in-function-called-in-init-2_MasterV0");
require("@ton/test-utils");
describe("initOf inside init via global function", () => {
    let blockchain;
    let treasure;
    let contract;
    let contract2;
    let childContract;
    let childContract2;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await initOf_in_function_called_in_init_Test_1.Test.fromInit());
        contract2 = blockchain.openContract(await initOf_in_function_called_in_init_2_Test_1.Test.fromInit());
        childContract = blockchain.openContract(await initOf_in_function_called_in_init_MasterV0_1.MasterV0.fromInit());
        childContract2 = blockchain.openContract(await initOf_in_function_called_in_init_2_MasterV0_1.MasterV0.fromInit());
        const result = await contract.send(treasure.getSender(), {
            value: (0, core_1.toNano)("10"),
        }, null);
        expect(result.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
        const result2 = await contract2.send(treasure.getSender(), {
            value: (0, core_1.toNano)("10"),
        }, null);
        expect(result2.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract2.address,
            success: true,
            deploy: true,
        });
    });
    it("should set owner with global function correctly", async () => {
        expect(await contract.getOwner()).toEqualAddress(childContract.address);
        expect(await contract2.getOwner()).toEqualAddress(childContract2.address);
    });
});
