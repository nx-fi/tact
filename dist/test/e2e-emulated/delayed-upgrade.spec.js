"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const core_2 = require("@ton/core");
const core_3 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const sandbox_2 = require("@ton/sandbox");
const delayed_upgrade_SampleDelayedUpgradeContract_1 = require("./contracts/output/delayed-upgrade_SampleDelayedUpgradeContract");
const delayed_upgrade_v2_SampleDelayedUpgradeContractV2_1 = require("./contracts/output/delayed-upgrade-v2_SampleDelayedUpgradeContractV2");
const delayed_upgrade_v3_SampleDelayedUpgradeContractV3_1 = require("./contracts/output/delayed-upgrade-v3_SampleDelayedUpgradeContractV3");
require("@ton/test-utils");
describe("delayed upgrade", () => {
    let blockchain;
    let treasure;
    let owner;
    let nonOwner;
    let contract;
    const NANOSECONDS_1S = 1000000000n;
    const MILLISECONDS_1S = 1_000;
    beforeEach(async () => {
        blockchain = await sandbox_2.Blockchain.create();
        owner = await blockchain.treasury("owner");
        nonOwner = await blockchain.treasury("non-owner");
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await delayed_upgrade_SampleDelayedUpgradeContract_1.SampleDelayedUpgradeContract.fromInit(owner.address));
        const result = await contract.send(treasure.getSender(), {
            value: (0, core_3.toNano)("10"),
        }, null);
        expect(result.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("non owner cannot update contract", async () => {
        const newContract = await delayed_upgrade_v2_SampleDelayedUpgradeContractV2_1.SampleDelayedUpgradeContractV2.fromInit(owner.address);
        const nonOwnerResult = await initiateUpdateContract(nonOwner.getSender(), 0n, {
            code: newContract.init.code,
            data: null,
        });
        expect(nonOwnerResult.transactions).toHaveTransaction({
            from: nonOwner.address,
            to: contract.address,
            success: false,
            exitCode: 132,
        });
    });
    it("should implement delayed upgrade with timeout=0 of contract correctly", async () => {
        expect(await contract.getIsUpgradable()).toEqual(true);
        // Check counter
        expect(await contract.getCounter()).toEqual(0n);
        // Increment counter
        await contract.send(owner.getSender(), { value: (0, core_3.toNano)(1) }, "increment");
        // Check counter
        expect(await contract.getCounter()).toEqual(1n);
        expect(await contract.getVersion()).toEqual(0n);
        const newContract = await delayed_upgrade_v2_SampleDelayedUpgradeContractV2_1.SampleDelayedUpgradeContractV2.fromInit(owner.address);
        await initiateUpdateContract(owner.getSender(), 0n, {
            code: newContract.init.code,
            data: null,
        });
        await confirmUpdateContract(owner.getSender());
        // Should add 100 instead of 1
        // Increment counter
        await contract.send(owner.getSender(), { value: (0, core_3.toNano)(1) }, "increment");
        // Check counter
        expect(await contract.getCounter()).toEqual(101n);
        expect(await contract.getVersion()).toEqual(1n);
        expect(await contract.getIsUpgradable()).toEqual(true);
    });
    it("should implement delayed upgrade with timeout=1s of contract correctly", async () => {
        expect(await contract.getIsUpgradable()).toEqual(true);
        // Check counter
        expect(await contract.getCounter()).toEqual(0n);
        // Increment counter
        await contract.send(owner.getSender(), { value: (0, core_3.toNano)(1) }, "increment");
        // Check counter
        expect(await contract.getCounter()).toEqual(1n);
        expect(await contract.getVersion()).toEqual(0n);
        const newContract = await delayed_upgrade_v2_SampleDelayedUpgradeContractV2_1.SampleDelayedUpgradeContractV2.fromInit(owner.address);
        await initiateUpdateContract(owner.getSender(), NANOSECONDS_1S, {
            code: newContract.init.code,
            data: null,
        });
        // imitate actual timeout
        await new Promise((resolve) => setTimeout(resolve, MILLISECONDS_1S));
        await confirmUpdateContract(owner.getSender());
        // Should add 100 instead of 1
        // Increment counter
        await contract.send(owner.getSender(), { value: (0, core_3.toNano)(1) }, "increment");
        // Check counter
        expect(await contract.getCounter()).toEqual(101n);
        expect(await contract.getVersion()).toEqual(1n);
        expect(await contract.getIsUpgradable()).toEqual(true);
    });
    it("should fail delayed upgrade with timeout=1m without actual waiting correctly", async () => {
        const newContract = await delayed_upgrade_v2_SampleDelayedUpgradeContractV2_1.SampleDelayedUpgradeContractV2.fromInit(owner.address);
        await initiateUpdateContract(owner.getSender(), 60n * NANOSECONDS_1S, {
            code: newContract.init.code,
            data: null,
        });
        const earlyConfirmRes = await confirmUpdateContract(owner.getSender());
        const errorCodeForInvalidSender = findErrorCodeByMessage(contract.abi.errors, "DelayedUpgradable: Cannot confirm upgrade before timeout");
        if (errorCodeForInvalidSender === null) {
            throw new Error("cannot find message");
        }
        expect(earlyConfirmRes.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            aborted: true,
            exitCode: errorCodeForInvalidSender,
        });
    });
    it("should implement delayed upgrade of contract with new receiver correctly", async () => {
        // NOTE: After the upgrade, the new version counter has an int32 type, not uint32
        const newContract = await delayed_upgrade_v3_SampleDelayedUpgradeContractV3_1.SampleDelayedUpgradeContractV3.fromInit(owner.address);
        await initiateUpdateContract(owner.getSender(), NANOSECONDS_1S, {
            code: newContract.init.code,
            data: null,
        });
        // imitate actual timeout
        await new Promise((resolve) => setTimeout(resolve, MILLISECONDS_1S));
        await confirmUpdateContract(owner.getSender());
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
        builder.storeInt(0, 257); // initiated_at
        builder.storeUint(537627911, 32); // struct
        builder.storeBit(false); // upgrade_info.code
        builder.storeBit(false); // upgrade_info.data
        builder.storeInt(0, 257); // upgrade_info.timeout
        builder.storeAddress(owner.address);
        builder.storeUint(999, 32); // counter
        const newData = builder.endCell();
        await initiateUpdateContract(owner.getSender(), 0n, {
            code: null,
            data: newData,
        });
        await confirmUpdateContract(owner.getSender());
        // Check counter
        expect(await contract.getCounter()).toEqual(999n);
        expect(await contract.getVersion()).toEqual(100n);
        expect(await contract.getIsUpgradable()).toEqual(true);
    });
    async function initiateUpdateContract(sender, timeout, init) {
        if (init === undefined) {
            throw new Error("invalid argument");
        }
        // Update code
        return await contract.send(sender, { value: (0, core_3.toNano)(1) }, {
            $$type: "Upgrade",
            code: init.code,
            data: init.data,
            timeout: timeout,
        });
    }
    async function confirmUpdateContract(sender) {
        return await contract.send(sender, { value: (0, core_3.toNano)(1) }, {
            $$type: "Confirm",
        });
    }
    async function sendRawMessage(body) {
        const cont = await blockchain.getContract(contract.address);
        await cont.receiveMessage((0, sandbox_1.internal)({
            from: owner.getSender().address,
            to: contract.address,
            bounced: false,
            body: body,
            value: (0, core_3.toNano)("0.95"),
        }));
    }
    function findErrorCodeByMessage(errors, errorMessage) {
        if (!errors)
            return null;
        for (const [code, error] of Object.entries(errors)) {
            if (error.message === errorMessage) {
                return parseInt(code, 10);
            }
        }
        return null;
    }
});
