"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const init_of_message_Test_1 = require("./contracts/output/init-of-message_Test");
require("@ton/test-utils");
describe("init-of-message", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        const msg = {
            $$type: "InitData",
            seller: treasure.address,
            nonce: 0n,
        };
        contract = blockchain.openContract(await init_of_message_Test_1.Test.fromInit(msg));
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should deploy when given a message as init", async () => { });
});
