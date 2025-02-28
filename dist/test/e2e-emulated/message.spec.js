"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const message_MessageTester_1 = require("./contracts/output/message_MessageTester");
require("@ton/test-utils");
describe("message", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await message_MessageTester_1.MessageTester.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, { $$type: "Deploy", queryId: 0n });
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should send reply correctly", async () => {
        const sendResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, "Hello");
        expect(sendResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            body: (0, core_1.beginCell)()
                .storeUint(0, 32)
                .storeStringTail("Hello")
                .endCell(),
        });
    });
    it("should bounce on unknown message", async () => {
        const sendResult = await treasure.send({
            to: contract.address,
            value: (0, core_1.toNano)("10"),
            body: (0, core_1.beginCell)().storeStringTail("Unknown").endCell(),
        });
        expect(sendResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: false,
            exitCode: 130,
        });
    });
    it("should send with intermediate reservations", async () => {
        // emit, nativeReserve, send
        let balanceBefore = (await blockchain.getContract(contract.address))
            .balance;
        await expectMessageFromToWithDefaults({
            treasure,
            contract,
            body: textMsg("ReserveAtMost_1"),
        });
        let balanceAfter = (await blockchain.getContract(contract.address))
            .balance;
        // The difference is at most 0.05 Toncoin reserved on top of the previous balance
        expect(balanceAfter - balanceBefore <= (0, core_1.toNano)("0.05")).toBe(true);
        // send, nativeReserve, send
        balanceBefore = (await blockchain.getContract(contract.address))
            .balance;
        await expectMessageFromToWithDefaults({
            treasure,
            contract,
            body: textMsg("ReserveAtMost_2"),
        });
        balanceAfter = (await blockchain.getContract(contract.address)).balance;
        // The difference is at most 0.05 Toncoin reserved on top of the previous balance
        expect(balanceAfter - balanceBefore <= (0, core_1.toNano)("0.05")).toBe(true);
    });
});
/**
 * A helper function to send a message `body` from the `treasury` to the `contract`
 * with specified `value` and `bounce` values, and then expect that transaction
 * to be successful or not (`success`), and if not — expect a certain exit code from it
 */
async function expectMessageFromTo(args) {
    const sendResult = await args.treasure.send({
        to: args.contract.address,
        value: args.value,
        bounce: args.bounce,
        body: args.body,
    });
    expect(sendResult.transactions).toHaveTransaction({
        from: args.treasure.address,
        to: args.contract.address,
        success: args.success,
        exitCode: args.exitCode,
    });
}
/**
 * Like `expectMessageFromTo`, but with common defaults set:
 * * value: `toNano("10")`
 * * bounce: `false`
 * * success: `true`
 * * exitCode: `0`
 */
async function expectMessageFromToWithDefaults(args) {
    await expectMessageFromTo({
        treasure: args.treasure,
        contract: args.contract,
        body: args.body,
        value: (0, core_1.toNano)("10"),
        bounce: false,
        success: true,
        exitCode: 0,
    });
}
/** Creates a Cell message body from the passed `src` string */
function textMsg(src) {
    return (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(src).endCell();
}
