"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const map_comparison_MapComparisonTestContract_1 = require("./contracts/output/map-comparison_MapComparisonTestContract");
require("@ton/test-utils");
describe("map-comparison", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await map_comparison_MapComparisonTestContract_1.MapComparisonTestContract.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should implement map comparison correctly", async () => {
        // Test Int Int - Equal
        {
            const m1 = core_1.Dictionary.empty(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigInt(256));
            m1.set(1n, 2n);
            m1.set(3n, 4n);
            const m2 = core_1.Dictionary.empty(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigInt(256));
            m2.set(1n, 2n);
            m2.set(3n, 4n);
            expect(await contract.getCompareIntInt(m1, m2)).toBe(true);
        }
        // Test Int Int - Not Equal
        {
            const m1 = core_1.Dictionary.empty(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigInt(256));
            m1.set(1n, 2n);
            m1.set(3n, 4n);
            const m2 = core_1.Dictionary.empty(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigInt(256));
            m2.set(1n, 2n);
            m2.set(3n, 5n);
            expect(await contract.getCompareIntInt(m1, m2)).toBe(false);
        }
        // Test Int Cell - Equal
        {
            const m1 = core_1.Dictionary.empty(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.Cell());
            m1.set(1n, (0, core_1.beginCell)().storeUint(123, 64).endCell());
            m1.set(3n, (0, core_1.beginCell)().storeUint(456, 64).endCell());
            const m2 = core_1.Dictionary.empty(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.Cell());
            m2.set(1n, (0, core_1.beginCell)().storeUint(123, 64).endCell());
            m2.set(3n, (0, core_1.beginCell)().storeUint(456, 64).endCell());
            expect(await contract.getCompareIntCell(m1, m2)).toBe(true);
        }
        // Test Int Cell - Not Equal
        {
            const m1 = core_1.Dictionary.empty(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.Cell());
            m1.set(1n, (0, core_1.beginCell)().storeUint(123, 64).endCell());
            m1.set(3n, (0, core_1.beginCell)().storeUint(456, 64).endCell());
            const m2 = core_1.Dictionary.empty(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.Cell());
            m2.set(1n, (0, core_1.beginCell)().storeUint(123, 64).endCell());
            m2.set(3n, (0, core_1.beginCell)().storeUint(457, 64).endCell());
            expect(await contract.getCompareIntCell(m1, m2)).toBe(false);
        }
        // Test Int Address - Equal
        {
            const m1 = core_1.Dictionary.empty(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.Address());
            m1.set(1n, core_1.Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000002"));
            m1.set(3n, core_1.Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000004"));
            const m2 = core_1.Dictionary.empty(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.Address());
            m2.set(1n, core_1.Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000002"));
            m2.set(3n, core_1.Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000004"));
            expect(await contract.getCompareIntAddress(m1, m2)).toBe(true);
        }
        // Test Int Address - Not Equal
        {
            const m1 = core_1.Dictionary.empty(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.Address());
            m1.set(1n, core_1.Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000002"));
            m1.set(3n, core_1.Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000004"));
            const m2 = core_1.Dictionary.empty(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.Address());
            m2.set(1n, core_1.Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000002"));
            m2.set(3n, core_1.Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000005"));
            expect(await contract.getCompareIntAddress(m1, m2)).toBe(false);
        }
        // Test edge case (https://github.com/tact-lang/tact/issues/196#issuecomment-2075088934)
        {
            const d1 = (0, core_1.beginCell)()
                .storeUint(2, 2) // long label
                .storeUint(8, 4) // key length
                .storeUint(1, 8) // key
                .storeBit(true) // value
                .endCell();
            const d2 = (0, core_1.beginCell)()
                .storeUint(0, 1) // short label
                .storeUint(0b111111110, 9) // key length
                .storeUint(1, 8) // key
                .storeBit(true) // value
                .endCell();
            let result = await treasure.send({
                to: contract.address,
                value: (0, core_1.toNano)("0.1"),
                body: (0, core_1.beginCell)()
                    .storeUint(contract.abi.types.find((t) => t.name === "Compare")
                    .header, 32)
                    .storeMaybeRef(d1)
                    .storeMaybeRef(d2)
                    .endCell(),
                init: contract.init,
            });
            expect(result.transactions).toHaveTransaction({
                from: treasure.address,
                to: contract.address,
                success: false,
                exitCode: 53111,
            });
            result = await treasure.send({
                to: contract.address,
                value: (0, core_1.toNano)("0.1"),
                body: (0, core_1.beginCell)()
                    .storeUint(contract.abi.types.find((t) => t.name === "CompareDeep").header, 32)
                    .storeMaybeRef(d1)
                    .storeMaybeRef(d2)
                    .endCell(),
                init: contract.init,
            });
            expect(result.transactions).toHaveTransaction({
                from: treasure.address,
                to: contract.address,
                success: true,
            });
            // Just to make sure:
            const m1 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Bool(), d1);
            const m2 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Bool(), d2);
            expect(m1.size).toBe(1);
            expect(m2.size).toBe(1);
            expect(m1.get(1)).toBe(true);
            expect(m2.get(1)).toBe(true);
        }
    });
});
