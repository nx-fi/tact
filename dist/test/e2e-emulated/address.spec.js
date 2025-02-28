"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const address_AddressTester_1 = require("./contracts/output/address_AddressTester");
require("@ton/test-utils");
describe("address", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await address_AddressTester_1.AddressTester.fromInit());
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
    it("should implement addresses correctly", async () => {
        // Check methods
        expect((await contract.getTest1()).toRawString()).toEqual("0:4a81708d2cf7b15a1b362fbf64880451d698461f52f05f145b36c08517d76873");
        expect((await contract.getTest2()).toRawString()).toEqual("0:4a81708d2cf7b15a1b362fbf64880451d698461f52f05f145b36c08517d76873");
        expect((await contract.getTest3()).toRawString()).toEqual("0:4a81708d2cf7b15a1b362fbf64880451d698461f52f05f145b36c08517d76873");
    });
});
