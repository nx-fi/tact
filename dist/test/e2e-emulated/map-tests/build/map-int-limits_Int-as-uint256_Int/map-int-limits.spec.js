"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const test_MapIntLimitTester_1 = require("./test_MapIntLimitTester");
require("@ton/test-utils");
// disable tests on MacOS
const it = process.platform === "darwin" && process.env.CI ? test.skip : test;
let contract;
beforeAll(async () => {
    const blockchain = await sandbox_1.Blockchain.create();
    blockchain.verbosity.print = false;
    const treasure = await blockchain.treasury("treasure");
    contract = blockchain.openContract(await test_MapIntLimitTester_1.MapIntLimitTester.fromInit());
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
describe("map int limits", () => {
    it("should pass map int limit test: SetMinAndMaxDoesNotThrow", async () => {
        expect(await contract.getTestSetMinAndMaxDoesNotThrow()).toStrictEqual(true);
    });
    it("should pass map int limit test: GetGreaterThanMax", async () => {
        expect(await contract.getTestGetGreaterThanMax()).toStrictEqual(true);
    });
    it("should pass map int limit test: GetSmallerThanMin", async () => {
        expect(await contract.getTestGetSmallerThanMin()).toStrictEqual(true);
    });
    it("should pass map int limit test: SetKeyGreaterThanMax", async () => {
        expect(await contract.getTestSetKeyGreaterThanMax()).toStrictEqual(true);
    });
    it("should pass map int limit test: etKeySmallerThanMin", async () => {
        expect(await contract.getTestSetKeySmallerThanMin()).toStrictEqual(true);
    });
    it("should pass map int limit test: SetValGreaterThanMax", async () => {
        expect(await contract.getTestSetValGreaterThanMax()).toStrictEqual(true);
    });
    it("should pass map int limit test: SetValSmallerThanMin", async () => {
        expect(await contract.getTestSetValSmallerThanMin()).toStrictEqual(true);
    });
});
