"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const as_comment_AsCommentTester_1 = require("./contracts/output/as-comment_AsCommentTester");
require("@ton/test-utils");
describe("asComment", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await as_comment_AsCommentTester_1.AsCommentTester.fromInit());
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
    it("should calculate asComment in compile-time as in runtime", async () => {
        expect(await contract.getConstantCell()).toEqualCell(await contract.getAsCommentRuntimeCell("hello world"));
    });
});
