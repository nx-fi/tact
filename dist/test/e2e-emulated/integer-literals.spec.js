"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const integer_literals_IntegerLiteralsTester_1 = require("./contracts/output/integer-literals_IntegerLiteralsTester");
require("@ton/test-utils");
describe("integer-literals", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await integer_literals_IntegerLiteralsTester_1.IntegerLiteralsTester.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should implement integer literals correctly", async () => {
        // Check decimal literals
        expect(await contract.getDecLiteral1()).toEqual(123n);
        expect(await contract.getDecLiteral2()).toEqual(-123n);
        expect(await contract.getDecLiteral3()).toEqual(1012300000n);
        // Check hexadecimal literals
        expect(await contract.getHexLiteral1()).toEqual(0x123n);
        expect(await contract.getHexLiteral2()).toEqual(-0x123n);
        expect(await contract.getHexLiteral3()).toEqual(0x1012300000n);
        // Check binary literals
        expect(await contract.getBinLiteral1()).toEqual(42n);
        expect(await contract.getBinLiteral2()).toEqual(-42n);
        expect(await contract.getBinLiteral3()).toEqual(672n);
        // Check octal literals
        expect(await contract.getOctLiteral1()).toEqual(83n);
        expect(await contract.getOctLiteral2()).toEqual(-83n);
        expect(await contract.getOctLiteral3()).toEqual(136937472n);
    });
});
