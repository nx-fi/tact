"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const external_fallbacks_ExternalFallbacksTester_1 = require("./contracts/output/external-fallbacks_ExternalFallbacksTester");
require("@ton/test-utils");
describe("external fallbacks", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await external_fallbacks_ExternalFallbacksTester_1.ExternalFallbacksTester.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
        expect(await contract.getGetA()).toBe(100n);
    });
    it("should implement external fallbacks correctly", async () => {
        // Test the `Add` function via internal message
        const addResultInternal = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, {
            $$type: "Add",
            x: 10n,
        });
        expect(addResultInternal.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
        });
        expect(await contract.getGetA()).toBe(110n);
        // Test the `Add` function via external message
        const addResultExternal = await contract.sendExternal({
            $$type: "Add",
            x: 10n,
        });
        expect(addResultExternal.transactions).toHaveTransaction({
            to: contract.address,
            success: true,
        });
        expect(await contract.getGetA()).toBe(120n);
        // Test the external fallback handling (null external message)
        const fallbackResult = await contract.sendExternal(null);
        expect(fallbackResult.transactions).toHaveTransaction({
            to: contract.address,
            success: true,
        });
        expect(await contract.getGetA()).toBe(220n);
        // Test the external fallback handling (Slice external message)
        const fallbackSliceResult = await contract.sendExternal((0, core_1.beginCell)().storeUint(0n, 32).asSlice());
        expect(fallbackSliceResult.transactions).toHaveTransaction({
            to: contract.address,
            success: true,
        });
        expect(await contract.getGetA()).toBe(320n);
    });
});
