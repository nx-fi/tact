"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const functions_Functions_1 = require("./contracts/output/functions_Functions");
const benchmark_sha256_small_Sha256Small_1 = require("./contracts/output/benchmark_sha256_small_Sha256Small");
const benchmark_sha256_big_Sha256Big_1 = require("./contracts/output/benchmark_sha256_big_Sha256Big");
const benchmark_sha256_as_slice_Sha256AsSlice_1 = require("./contracts/output/benchmark_sha256_as_slice_Sha256AsSlice");
const forward_Forward_1 = require("./contracts/output/forward_Forward");
const address_Addresses_1 = require("./contracts/output/address_Addresses");
const codeOf_CodeOfVsInitOf_1 = require("./contracts/output/codeOf_CodeOfVsInitOf");
require("@ton/test-utils");
const cells_CellsCreation_1 = require("./contracts/output/cells_CellsCreation");
const util_1 = require("./util");
const write_vm_log_1 = require("../utils/write-vm-log");
const path_1 = require("path");
const deploy_WithDeploy_1 = require("./contracts/output/deploy_WithDeploy");
const deploy_WithoutDeploy_1 = require("./contracts/output/deploy_WithoutDeploy");
function measureGas(txs) {
    return Number(txs[1].description
        .computePhase.gasUsed);
}
describe("benchmarks", () => {
    let blockchain;
    let treasure;
    let step;
    beforeAll(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        step = (0, write_vm_log_1.writeLog)({
            path: (0, path_1.join)(__dirname, "output", "log.yaml"),
            blockchain,
        });
    });
    beforeEach(async () => {
        treasure = await blockchain.treasury("benchmarks");
    });
    it("benchmark functions", async () => {
        const functions = blockchain.openContract(await functions_Functions_1.Functions.fromInit());
        const sendResult = await step("benchmark functions", () => functions.send(treasure.getSender(), { value: (0, core_1.toNano)(1) }, { $$type: "Add", value: 10n }));
        const gasUsed = measureGas(sendResult.transactions);
        expect(gasUsed).toMatchSnapshot("gas used");
        // Verify code size
        const codeSize = functions.init.code.toBoc().length;
        expect(codeSize).toMatchSnapshot("code size");
    });
    it("benchmark readFwdFee", async () => {
        const testContract = blockchain.openContract(await forward_Forward_1.Forward.fromInit());
        const sendResult = await testContract.send(treasure.getSender(), { value: (0, core_1.toNano)(1) }, {
            $$type: "TestGetFwdFee",
            any: (0, core_1.beginCell)()
                .storeUint(0, 32)
                .storeStringTail("This is test payload")
                .asSlice(),
        });
        const gasUsed = measureGas(sendResult.transactions);
        expect(gasUsed).toMatchSnapshot("gas used");
        const codeSize = testContract.init.code.toBoc().length;
        expect(codeSize).toMatchSnapshot("code size");
    });
    async function hashStringSmall(sha256, s) {
        const result = await sha256.send(treasure.getSender(), { value: (0, core_1.toNano)(1) }, { $$type: "HashData", value: s });
        return (0, util_1.getUsedGas)(result);
    }
    async function hashStringBig(sha256, s) {
        const result = await sha256.send(treasure.getSender(), { value: (0, core_1.toNano)(1) }, { $$type: "HashData", value: s });
        return (0, util_1.getUsedGas)(result);
    }
    async function hashStringAsSLice(sha256, s) {
        const result = await sha256.send(treasure.getSender(), { value: (0, core_1.toNano)(1) }, { $$type: "HashData", value: s });
        return (0, util_1.getUsedGas)(result);
    }
    it("benchmark sha256", async () => {
        const sha256Small = blockchain.openContract(await benchmark_sha256_small_Sha256Small_1.Sha256Small.fromInit());
        const sha256Big = blockchain.openContract(await benchmark_sha256_big_Sha256Big_1.Sha256Big.fromInit());
        const sha256AsSlice = blockchain.openContract(await benchmark_sha256_as_slice_Sha256AsSlice_1.Sha256AsSlice.fromInit());
        await sha256Small.send(treasure.getSender(), { value: (0, core_1.toNano)(1) }, null);
        await sha256Big.send(treasure.getSender(), { value: (0, core_1.toNano)(1) }, null);
        await sha256AsSlice.send(treasure.getSender(), { value: (0, core_1.toNano)(1) }, null);
        await hashStringBig(sha256Big, "hello world");
        await hashStringSmall(sha256Small, "hello world");
        await hashStringAsSLice(sha256AsSlice, "hello world");
        expect(await hashStringBig(sha256Big, "hello world")).toMatchSnapshot("gas hash string big");
        expect(await hashStringSmall(sha256Small, "hello world")).toMatchSnapshot("gas hash string small");
        expect(await hashStringAsSLice(sha256AsSlice, "hello world")).toMatchSnapshot("gas hash string slice");
        expect(await hashStringBig(sha256Big, "hello world".repeat(5))).toMatchSnapshot("gas hash string big repeated");
        expect(await hashStringSmall(sha256Small, "hello world".repeat(5))).toMatchSnapshot("gas hash string small repeated");
        expect(await hashStringAsSLice(sha256AsSlice, "hello world".repeat(5))).toMatchSnapshot("gas hash string slice repeated");
        expect(await hashStringBig(sha256Big, "hello world".repeat(10))).toMatchSnapshot("gas hash string big repeated more");
        expect(await hashStringSmall(sha256Small, "hello world".repeat(10))).toMatchSnapshot("gas hash string small repeated more");
        expect(await hashStringAsSLice(sha256AsSlice, "hello world".repeat(10))).toMatchSnapshot("gas hash string slice repeated more");
    });
    it("benchmark cells creation", async () => {
        const testContract = blockchain.openContract(await cells_CellsCreation_1.CellsCreation.fromInit());
        await testContract.send(treasure.getSender(), { value: (0, core_1.toNano)(1) }, null);
        const gasUsed1 = (await blockchain.runGetMethod(testContract.address, "emptyCell")).gasUsed;
        expect(gasUsed1).toMatchSnapshot("gas used emptyCell");
        const gasUsed2 = (await blockchain.runGetMethod(testContract.address, "emptySlice")).gasUsed;
        expect(gasUsed2).toMatchSnapshot("gas used emptySlice");
    });
    it("benchmark contractAddressExt", async () => {
        const testContract = blockchain.openContract(await address_Addresses_1.Addresses.fromInit());
        await testContract.send(treasure.getSender(), { value: (0, core_1.toNano)(1) }, null);
        const gasUsed = (await blockchain.runGetMethod(testContract.address, "contractAddressExt")).gasUsed;
        expect(gasUsed).toMatchSnapshot("gas used contractAddressExt");
    });
    it("benchmark codeOf vs initOf", async () => {
        const testContract = blockchain.openContract(await codeOf_CodeOfVsInitOf_1.CodeOfVsInitOf.fromInit());
        await testContract.send(treasure.getSender(), { value: (0, core_1.toNano)(1) }, null);
        const gasUsed = (await blockchain.runGetMethod(testContract.address, "withCodeOf")).gasUsed;
        expect(gasUsed).toMatchSnapshot("gas used withCodeOf");
        const gasUsed2 = (await blockchain.runGetMethod(testContract.address, "withInitOf")).gasUsed;
        expect(gasUsed2).toMatchSnapshot("gas used withInitOf");
    });
    it("benchmark codeOf vs myCode()", async () => {
        const testContract = blockchain.openContract(await codeOf_CodeOfVsInitOf_1.CodeOfVsInitOf.fromInit());
        await testContract.send(treasure.getSender(), { value: (0, core_1.toNano)(1) }, null);
        const gasUsed = (await blockchain.runGetMethod(testContract.address, "codeOfSelf")).gasUsed;
        expect(gasUsed).toMatchSnapshot("gas used codeOf for current contract");
        const gasUsed2 = (await blockchain.runGetMethod(testContract.address, "myCode")).gasUsed;
        expect(gasUsed2).toMatchSnapshot("gas used myCode");
    });
    it("benchmark deployable trait vs raw deploy", async () => {
        const withDeployTrait = blockchain.openContract(await deploy_WithDeploy_1.WithDeploy.fromInit());
        const withoutDeploy = blockchain.openContract(await deploy_WithoutDeploy_1.WithoutDeploy.fromInit());
        const deployResultTrait = await withDeployTrait.send(treasure.getSender(), { value: (0, core_1.toNano)(1) }, {
            $$type: "Deploy",
            queryId: 1n,
        });
        const deployRawResult = await withoutDeploy.send(treasure.getSender(), { value: (0, core_1.toNano)(1) }, (0, core_1.beginCell)().endCell().beginParse());
        const gasUsed = measureGas(deployResultTrait.transactions);
        expect(gasUsed).toMatchSnapshot("gas used deploy trait");
        const gasUsedRaw = measureGas(deployRawResult.transactions);
        expect(gasUsedRaw).toMatchSnapshot("gas used raw deploy");
    });
});
