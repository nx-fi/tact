"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const stdlib_StdlibTest_1 = require("./contracts/output/stdlib_StdlibTest");
require("@ton/test-utils");
describe("stdlib", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await stdlib_StdlibTest_1.StdlibTest.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should execute stdlib methods correctly", async () => {
        const slice = (0, core_1.beginCell)()
            .storeBit(1)
            .storeBit(1)
            .storeRef((0, core_1.beginCell)().storeBit(1).endCell())
            .endCell()
            .asSlice();
        // Execute and verify slice methods
        expect(await contract.getSliceBits(slice)).toBe(2n);
        expect(await contract.getSliceRefs(slice)).toBe(1n);
        expect(await contract.getSliceEmpty(slice)).toBe(false);
        expect(await contract.getLoadBool(slice)).toBe(true);
        expect(await contract.getLoadBit(slice)).toBe(true);
        expect((await contract.getStoreBool((0, core_1.beginCell)(), true))
            .endCell()
            .toString()).toBe((0, core_1.beginCell)().storeBit(true).endCell().toString());
        expect((await contract.getStoreBit((0, core_1.beginCell)(), true))
            .endCell()
            .toString()).toBe((0, core_1.beginCell)().storeBit(true).endCell().toString());
        expect(Number(await contract.getTvm_2023_07Upgrade())).toEqual(1183);
        expect(await contract.getTvm_2024_04Upgrade()).toEqual(82009144n);
        expect((await contract.getStoreMaybeRef((0, core_1.beginCell)(), (0, core_1.beginCell)().storeUint(123, 64).endCell())).endCell()).toEqualCell((0, core_1.beginCell)()
            .storeMaybeRef((0, core_1.beginCell)().storeUint(123, 64).endCell())
            .endCell());
        expect((await contract.getStoreMaybeRef((0, core_1.beginCell)(), null)).endCell()).toEqualCell((0, core_1.beginCell)().storeMaybeRef(null).endCell());
        expect(await contract.getLoadMaybeRef((0, core_1.beginCell)()
            .storeMaybeRef((0, core_1.beginCell)().storeUint(123, 64).endCell())
            .asSlice())).toEqualCell((0, core_1.beginCell)().storeUint(123, 64).endCell());
        expect(await contract.getLoadMaybeRef((0, core_1.beginCell)().storeMaybeRef(null).asSlice())).toBe(null);
        const addrStd = await contract.getParseStdAddress((0, core_1.beginCell)()
            .storeAddress(core_1.Address.parse("0:4a81708d2cf7b15a1b362fbf64880451d698461f52f05f145b36c08517d76873"))
            .endCell()
            .asSlice());
        expect(addrStd.workchain).toBe(0n);
        expect(addrStd.address).toBe(BigInt("0x4a81708d2cf7b15a1b362fbf64880451d698461f52f05f145b36c08517d76873"));
        const addrVar = await contract.getParseVarAddress((0, core_1.beginCell)()
            .storeUint(6, 3)
            .storeUint(123, 9)
            .storeUint(234, 32)
            .storeUint(345, 123)
            .endCell()
            .asSlice());
        expect(addrVar.workchain).toBe(234n);
        expect(addrVar.address.asCell()).toEqualCell((0, core_1.beginCell)().storeUint(345, 123).endCell());
        expect(await contract.getBuilderDepth((0, core_1.beginCell)())).toBe(0n);
        expect(await contract.getBuilderDepth((0, core_1.beginCell)().storeRef(core_1.Cell.EMPTY))).toBe(1n);
        expect(await contract.getSkipLastBits(slice, 1n)).toEqualSlice((0, core_1.beginCell)()
            .storeBit(1)
            .storeRef((0, core_1.beginCell)().storeBit(1).endCell())
            .endCell()
            .asSlice());
        expect(await contract.getFirstBits(slice, 1n)).toEqualSlice((0, core_1.beginCell)().storeBit(1).endCell().asSlice());
        expect(await contract.getLastBits(slice, 1n)).toEqualSlice((0, core_1.beginCell)().storeBit(1).endCell().asSlice());
        expect(await contract.getSliceDepth(slice)).toBe(1n);
        expect(await contract.getComputeDataSizeCell(slice.asCell(), 1000n)).toMatchObject({
            $$type: "DataSize",
            cells: 2n,
            bits: 3n,
            refs: 1n,
        });
        expect(await contract.getComputeDataSizeCell(null, 1000n)).toMatchObject({
            $$type: "DataSize",
            cells: 0n,
            bits: 0n,
            refs: 0n,
        });
        expect(await contract.getComputeDataSizeSlice(slice, 1000n)).toMatchObject({
            $$type: "DataSize",
            cells: 1n, // -1 for slice
            bits: 3n,
            refs: 1n,
        });
        expect(await contract.getCellDepth(slice.asCell())).toBe(1n);
        expect(await contract.getCellDepth(null)).toBe(0n);
        expect(await contract.getCurLt()).toBe(0n);
        expect(await contract.getBlockLt()).toBe(0n);
        expect(Number(await contract.getSetGasLimit(5000n))).toBe(3725); // 5000 just to make sure it's enough, 3725 is how much it actually costs
        await expect(contract.getSetGasLimit(3724n)).rejects.toThrow("-14"); // 3724 gas is not enough for sure
        expect(await contract.getGetSeed()).toBe(0n);
        expect(await contract.getSetSeed(123n)).toBe(123n);
        expect(await contract.getMyCode()).toEqualCell(contract.init.code);
        const RandomMessage = core_1.Cell.fromBase64("te6ccuEBAQEAZwDOAMloAdbATUBllK0egYWU34F08lIun9zBwyu7UZQrueKKJgnXADfmsDtWQP5D/YkXX+XlULvs4HivRaKY38ftT2hS5yAAEE1v+YAGCCNaAABhF0kRG4TPMTmAapk7bYAAGEXSDt8BwKQrvKE=");
        const res = await contract.getParseOriginalFwdFee(RandomMessage.beginParse());
        expect(res).toBe(400000n);
        const varIntegers1 = await contract.getVarIntegers1();
        expect(varIntegers1).toBe(1234n); // 1000 + 200 + 30 + 4
        const varIntegers2 = await contract.getVarIntegers2();
        expect(varIntegers2).toBe(1234n); // 1000 + 200 + 30 + 4
    });
});
