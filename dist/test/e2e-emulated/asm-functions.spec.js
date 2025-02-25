"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const asm_functions_AsmFunctionsTester_1 = require("./contracts/output/asm-functions_AsmFunctionsTester");
require("@ton/test-utils");
describe("asm functions", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await asm_functions_AsmFunctionsTester_1.AsmFunctionsTester.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should implement asm functions correctly", async () => {
        expect(await contract.getTestAsmStoreDict()).toEqual(true);
        expect(await contract.getTestAsmLoadCoins()).toEqual(true);
        expect(await contract.getTestAsmLoadCoinsMut()).toEqual(true);
        expect(await contract.getTestAsmLoadCoinsMutRuntime((0, core_1.beginCell)().storeCoins(42n).endCell())).toEqual(42n);
        expect(await contract.getTestAsmLoadInt()).toEqual(true);
        expect(await contract.getTestAsmDebugStr()).toEqual(true);
        expect(await contract.getTestAsmCreateUseWord()).toEqual(true);
        // Struct arrangements
        expect(await contract.getTestAsmSecondToLast()).toEqual(true);
        expect(await contract.getTestAsmSecondToLastRuntime({ $$type: "Two", a: 1n, b: 2n }, { $$type: "Two", a: 3n, b: 4n })).toEqual(3n);
        expect(await contract.getTestAsmFirst()).toEqual(true);
        expect(await contract.getTestAsmFirstRuntime({
            $$type: "TwoInTwo",
            a: { $$type: "Two", a: 1n, b: 2n },
            b: { $$type: "Two", a: 3n, b: 4n },
        }, {
            $$type: "TwoInTwo",
            a: { $$type: "Two", a: 5n, b: 6n },
            b: { $$type: "Two", a: 7n, b: 8n },
        }, {
            $$type: "TwoInTwo",
            a: { $$type: "Two", a: 9n, b: 10n },
            b: { $$type: "Two", a: 11n, b: 12n },
        })).toEqual(1n);
    });
});
