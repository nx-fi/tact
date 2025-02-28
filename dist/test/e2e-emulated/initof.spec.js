"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const initof_Self_1 = require("./contracts/output/initof_Self");
const initof_Parent_1 = require("./contracts/output/initof_Parent");
const initof_2_TestInit_1 = require("./contracts/output/initof-2_TestInit");
const initof_3_A_1 = require("./contracts/output/initof-3_A");
require("@ton/test-utils");
describe("initOf", () => {
    let blockchain;
    let treasure;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
    });
    it("should implement initOf correctly - 1", async () => {
        const contract = blockchain.openContract(await initof_Self_1.Self.fromInit());
        await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
        expect(await contract.getTestInitOfAddress()).toEqualAddress(await contract.getTestMyAddress());
    });
    it("should implement initOf correctly - 2", async () => {
        const contract = blockchain.openContract(await initof_Parent_1.Parent.fromInit());
        await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
        expect(await contract.getTestInitOfAddressChild()).toEqualAddress(await contract.getTestMyAddressChild());
    });
    it("should implement initOf correctly - 3", async () => {
        const contract = blockchain.openContract(await initof_2_TestInit_1.TestInit.fromInit());
        const result = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, {
            $$type: "Deploy",
            queryId: 0n,
        });
        const logs = result.transactions[1].debugLogs;
        expect(logs).toContain("init@TestInit-SUCCESS");
        expect(logs).not.toContain("ERROR@TestInit");
    });
    it("should implement initOf correctly - 4", async () => {
        const contract = blockchain.openContract(await initof_3_A_1.A.fromInit());
        const result = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, "aa");
        expect(result.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
        });
    });
});
