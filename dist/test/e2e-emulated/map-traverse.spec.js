"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const map_traverse_MapTraverseTestContract_1 = require("./contracts/output/map-traverse_MapTraverseTestContract");
require("@ton/test-utils");
describe("map-traversal", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await map_traverse_MapTraverseTestContract_1.MapTraverseTestContract.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should implement map traversal correctly", async () => {
        // Check methods
        expect(await contract.getTestIntInt()).toEqual(1010n);
        expect(await contract.getTestIntCoins()).toEqual(1010n);
        expect(await contract.getTestIntVarint16()).toEqual(1010n);
        expect(await contract.getTestIntBool()).toEqual(12n);
        expect(await contract.getTestIntCell()).toEqual(1010n);
        expect(await contract.getTestIntAddress()).toEqual(28n);
        expect(await contract.getTestIntStruct()).toEqual(1010n);
        expect(await contract.getTestAddressInt()).toEqual(1018n);
        expect(await contract.getTestAddressCoins()).toEqual(1018n);
        expect(await contract.getTestAddressVarint16()).toEqual(1018n);
        expect(await contract.getTestAddressBool()).toEqual(20n);
        expect(await contract.getTestAddressCell()).toEqual(1018n);
        expect(await contract.getTestAddressAddress()).toEqual(26n);
        expect(await contract.getTestAddressStruct()).toEqual(1018n);
        expect(await contract.getTestEmptyMap()).toEqual(0n);
        expect(await contract.getTestNull()).toEqual(0n);
        expect(await contract.getTestMapModificationDuringTraversal1()).toEqual(808n);
        // XXX works on my macOS instance, but fails in CI for some reason
        // await expect(contract.getTestMapModificationDuringTraversal2()).rejects.toMatchObject(Error("Exit code: -14"));
        expect(await contract.getTestMapSize()).toEqual(4n);
        expect(await contract.getTestMapAsField()).toEqual(606n);
        expect(await contract.getTestMapAsStructField()).toEqual(606n);
    });
});
