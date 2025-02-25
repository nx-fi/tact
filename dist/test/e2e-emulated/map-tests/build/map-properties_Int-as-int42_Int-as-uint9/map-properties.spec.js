"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const test_MapPropertiesTester_1 = require("./test_MapPropertiesTester");
require("@ton/test-utils");
// disable tests on MacOS
const it = process.platform === "darwin" && process.env.CI ? test.skip : test;
const key = {
    $$type: "KeyData",
    _1: -5n,
    _2: 42n,
};
const val = {
    $$type: "ValData",
    _1: 6n,
    _2: 121n,
};
let contract;
beforeAll(async () => {
    const blockchain = await sandbox_1.Blockchain.create();
    blockchain.verbosity.print = false;
    const treasure = await blockchain.treasury("treasure");
    contract = blockchain.openContract(await test_MapPropertiesTester_1.MapPropertiesTester.fromInit());
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
describe("map properties", () => {
    it("should pass map property test: EmptyMapGet", async () => {
        expect(await contract.getTestEmptyMapGet(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: GetDoesNotModify", async () => {
        expect(await contract.getTestGetDoesNotModify(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: SetModifies", async () => {
        expect(await contract.getTestSetModifies(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: SetGetSameKey", async () => {
        expect(await contract.getTestSetGetSameKey(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: SetGetNotSameKey", async () => {
        expect(await contract.getTestSetGetNotSameKey(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: SetIdempotent", async () => {
        expect(await contract.getTestSetIdempotent(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: SetSetOfNotSameCommutes", async () => {
        expect(await contract.getTestSetSetOfNotSameCommutes(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: DelGetSameKeyPresent", async () => {
        expect(await contract.getTestDelGetSameKeyPresent(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: DelGetSameKeyMissing", async () => {
        expect(await contract.getTestDelGetSameKeyMissing(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: DelOfPresentModifies", async () => {
        expect(await contract.getTestDelOfPresentModifies(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: DelOfMissingDoesNotModify", async () => {
        expect(await contract.getTestDelOfMissingDoesNotModify(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: DelDelOfSameDoesNotModify", async () => {
        expect(await contract.getTestDelDelOfSameDoesNotModify(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: SetDelOfMissingDoesNotModify(", async () => {
        expect(await contract.getTestSetDelOfMissingDoesNotModify(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: DelSetOfSamePresent", async () => {
        expect(await contract.getTestDelSetOfSamePresent(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: DelSetOfSameMissing", async () => {
        expect(await contract.getTestDelSetOfSameMissing(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: DelSetOfNotSameCommutes", async () => {
        expect(await contract.getTestDelSetOfNotSameCommutes(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: EmptyMapSize", async () => {
        expect(await contract.getTestEmptyMapSize(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: SingletonMapSize", async () => {
        expect(await contract.getTestSingletonMapSize(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: DoubletonMapSize", async () => {
        expect(await contract.getTestDoubletonMapSize(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: GetNonNullEquivalentExists", async () => {
        expect(await contract.getTestGetNonNullEquivalentExists(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: EmptyMapIsEmpty", async () => {
        expect(await contract.getTestEmptyMapIsEmpty(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: NonEmptyMapsNotIsEmpty", async () => {
        expect(await contract.getTestNonEmptyMapsNotIsEmpty(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: ThereDeepEqualMapsThatAreNotEqual", async () => {
        expect(await contract.getTestThereDeepEqualMapsThatAreNotEqual(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: EqualsImpliesDeepEquals", async () => {
        expect(await contract.getTestEqualsImpliesDeepEquals(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: AsCellEquals", async () => {
        expect(await contract.getTestAsCellEquals(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: AsCellDoesNothing", async () => {
        expect(await contract.getTestAsCellDoesNothing(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: ReplaceEmptyMap", async () => {
        expect(await contract.getTestReplaceEmptyMap(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: ReplaceDoesNotModifyIfKeyIsMissing", async () => {
        expect(await contract.getTestReplaceDoesNotModifyIfKeyIsMissing(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: ReplaceWorksAsSetIfKeyIsPresent", async () => {
        expect(await contract.getTestReplaceWorksAsSetIfKeyIsPresent(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: ReplaceGetSameKeyIfPresent", async () => {
        expect(await contract.getTestReplaceGetSameKeyIfPresent(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: ReplaceGetNotSameKey", async () => {
        expect(await contract.getTestReplaceGetNotSameKey(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: ReplaceIdempotent", async () => {
        expect(await contract.getTestReplaceIdempotent(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: ReplaceReplaceOfNotSameCommutes", async () => {
        expect(await contract.getTestReplaceReplaceOfNotSameCommutes(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: EmptyMapReplaceGet", async () => {
        expect(await contract.getTestEmptyMapReplaceGet(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: SetReplaceGet", async () => {
        expect(await contract.getTestSetReplaceGet(key, val)).toStrictEqual(true);
    });
    it("should pass map property test: DelReplaceGet", async () => {
        expect(await contract.getTestDelReplaceGet(key, val)).toStrictEqual(true);
    });
});
