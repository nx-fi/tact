"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const core_2 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const sandbox_2 = require("@ton/sandbox");
const upgrade_SampleUpgradeContract_1 = require("./contracts/output/upgrade_SampleUpgradeContract");
const upgrade_v2_SampleUpgradeContractV2_1 = require("./contracts/output/upgrade-v2_SampleUpgradeContractV2");
const upgrade_v3_SampleUpgradeContractV3_1 = require("./contracts/output/upgrade-v3_SampleUpgradeContractV3");
require("@ton/test-utils");
describe("upgrade", () => {
    let blockchain;
    let treasure;
    let owner;
    let nonOwner;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_2.Blockchain.create();
        owner = await blockchain.treasury("owner");
        nonOwner = await blockchain.treasury("non-owner");
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await upgrade_SampleUpgradeContract_1.SampleUpgradeContract.fromInit(owner.address));
        const result = await contract.send(treasure.getSender(), {
            value: (0, core_2.toNano)("10"),
        }, null);
        expect(result.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("non owner cannot update contract", async () => {
        const newContract = await upgrade_v2_SampleUpgradeContractV2_1.SampleUpgradeContractV2.fromInit(owner.address);
        const nonOwnerResult = await updateContract(nonOwner.getSender(), newContract.init);
        expect(nonOwnerResult.transactions).toHaveTransaction({
            from: nonOwner.address,
            to: contract.address,
            success: false,
            exitCode: 132,
        });
    });
    it("should implement upgrade of simple contract correctly", async () => {
        expect(await contract.getIsUpgradable()).toEqual(true);
        // Check counter
        expect(await contract.getCounter()).toEqual(0n);
        // Increment counter
        await contract.send(owner.getSender(), { value: (0, core_2.toNano)(1) }, "increment");
        // Check counter
        expect(await contract.getCounter()).toEqual(1n);
        expect(await contract.getVersion()).toEqual(0n);
        const newContract = await upgrade_v2_SampleUpgradeContractV2_1.SampleUpgradeContractV2.fromInit(owner.address);
        await updateContract(owner.getSender(), {
            code: newContract.init.code,
            data: null,
        });
        // Should add 100 instead of 1
        // Increment counter
        await contract.send(owner.getSender(), { value: (0, core_2.toNano)(1) }, "increment");
        // Check counter
        expect(await contract.getCounter()).toEqual(101n);
        expect(await contract.getVersion()).toEqual(1n);
        expect(await contract.getIsUpgradable()).toEqual(true);
    });
    it("should implement upgrade of simple contract with new receiver correctly", async () => {
        // NOTE: After the upgrade, the new version counter has an int32 type, not uint32
        const newContract = await upgrade_v3_SampleUpgradeContractV3_1.SampleUpgradeContractV3.fromInit(owner.address);
        await updateContract(owner.getSender(), {
            code: newContract.init.code,
            data: null,
        });
        // Decrement counter with new receiver
        await sendRawMessage((0, core_2.beginCell)().storeUint(0, 32).storeStringTail("decrement").endCell());
        // Check counter
        expect(await contract.getCounter()).toEqual(-1n);
        expect(await contract.getVersion()).toEqual(1n);
        expect(await contract.getIsUpgradable()).toEqual(true);
    });
    it("should implement upgrade of simple contract with new data correctly", async () => {
        const builder = new core_1.Builder();
        builder.storeUint(1, 1); // we need to reload on message so we set 1 here
        builder.storeInt(100, 32); // version
        builder.storeAddress(owner.address);
        builder.storeInt(999, 32); // counter
        const newData = builder.endCell();
        await updateContract(owner.getSender(), {
            code: contract.init.code,
            data: newData,
        });
        // Check counter
        expect(await contract.getCounter()).toEqual(999n);
        expect(await contract.getVersion()).toEqual(100n);
        expect(await contract.getIsUpgradable()).toEqual(true);
    });
    function updateContract(sender, init) {
        if (init === undefined) {
            throw new Error("invalid argument");
        }
        // Update code
        return contract.send(sender, { value: (0, core_2.toNano)(1) }, {
            $$type: "Upgrade",
            code: init.code,
            data: init.data,
        });
    }
    async function sendRawMessage(body) {
        const cont = await blockchain.getContract(contract.address);
        await cont.receiveMessage((0, sandbox_1.internal)({
            from: owner.getSender().address,
            to: contract.address,
            bounced: false,
            body: body,
            value: (0, core_2.toNano)("0.95"),
        }));
    }
});
