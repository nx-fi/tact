"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const allocation_Test_1 = require("./contracts/output/allocation_Test");
require("@ton/test-utils");
describe("allocation", () => {
    let blockchain;
    let owner;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        owner = await blockchain.treasury("owner");
        contract = blockchain.openContract(await allocation_Test_1.Test.fromInit(owner.address, {
            $$type: "Struct2",
            c: "",
            d: "",
            e: "",
            f: "",
        }));
        const deployResult = await contract.send(owner.getSender(), {
            value: (0, core_1.toNano)(1),
        }, { $$type: "Deploy", queryId: 0n });
        expect(deployResult.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should deploy correctly and process SetCost message without cell overflow", async () => {
        const setCostResult = await contract.send(owner.getSender(), { value: (0, core_1.toNano)(1) }, { $$type: "SetCost", cost: (0, core_1.toNano)("0.1") });
        expect(setCostResult.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            success: true,
        });
    });
});
