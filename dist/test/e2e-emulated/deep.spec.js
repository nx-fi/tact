"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const deep_A_1 = require("./contracts/output/deep_A");
const deep_B_1 = require("./contracts/output/deep_B");
const deep_C_1 = require("./contracts/output/deep_C");
require("@ton/test-utils");
describe("random", () => {
    let blockchain;
    let treasure;
    let contractA;
    let contractB;
    let contractC;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contractA = blockchain.openContract(await deep_A_1.A.fromInit());
        contractB = blockchain.openContract(await deep_B_1.B.fromInit(contractA.address));
        contractC = blockchain.openContract(await deep_C_1.C.fromInit(contractB.address));
    });
    it("should chain deep sequences correctly", async () => {
        // Send a message to contract A
        const result = await contractA.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, "Message");
        // Verify the transaction for contract A
        expect(result.transactions).toHaveTransaction({
            from: treasure.address,
            to: contractA.address,
            success: true,
            // Add any other specific transaction properties you want to check here
        });
        // Verify the chaining by checking the "next" contracts in sequence
        const nextA = await contractA.getGetNext();
        expect(nextA.code.equals(contractB.init.code)).toBe(true);
        expect(nextA.data.equals(contractB.init.data)).toBe(true);
        const nextB = await contractB.getGetNext();
        expect(nextB.code.equals(contractC.init.code)).toBe(true);
        expect(nextB.data.equals(contractC.init.data)).toBe(true);
        expect(result.transactions).toHaveTransaction({
            from: treasure.address,
            to: contractA.address,
            success: true,
            body: (0, core_1.beginCell)()
                .storeUint(0, 32)
                .storeStringTail("Message")
                .endCell(),
        });
        expect(result.transactions).toHaveTransaction({
            from: contractA.address,
            to: contractB.address,
            success: true,
            body: (0, core_1.beginCell)()
                .storeUint(0, 32)
                .storeStringTail("Message")
                .endCell(),
        });
        expect(result.transactions).toHaveTransaction({
            from: contractB.address,
            to: contractC.address,
            success: true,
            body: (0, core_1.beginCell)()
                .storeUint(0, 32)
                .storeStringTail("Message")
                .endCell(),
        });
        expect(result.transactions).toHaveTransaction({
            from: contractC.address,
            to: contractC.address,
            success: true,
            body: (0, core_1.beginCell)()
                .storeUint(0, 32)
                .storeStringTail("Message2")
                .endCell(),
        });
    });
});
