"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const deploy_DeployContract_1 = require("./contracts/output/deploy_DeployContract");
require("@ton/test-utils");
const test_utils_1 = require("@ton/test-utils");
const counter = () => {
    let next = 0n;
    return () => next++;
};
const nextContractId = counter();
describe("Deploy() correctness", () => {
    let blockchain;
    let treasure;
    let contract;
    async function checkCorrectness(params) {
        const deployedContractId = nextContractId();
        const msgToSend = {
            bounce: params.bounce,
            $$type: "DeployParamsMsg",
            body: params.body,
            contractNum: deployedContractId,
            mode: params.mode,
        };
        const sendResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("1") }, msgToSend);
        expect(sendResult.transactions).toHaveTransaction({
            from: contract.address,
            to: (await deploy_DeployContract_1.DeployContract.fromInit(deployedContractId)).address,
            deploy: true,
        });
    }
    async function testIdenticalMessages(msgToSend) {
        const { transactions } = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("100") }, msgToSend);
        // Obtain the transaction that executed the deploy and send functions
        const tsx = ensureTransactionIsDefined((0, test_utils_1.findTransaction)(transactions, {
            from: treasure.address,
            to: contract.address,
            success: true,
        }));
        // Check that two messages were sent
        expect(tsx.outMessagesCount).toBe(2);
        // Obtain both sent messages
        const message1 = ensureMessageIsDefined(tsx.outMessages.get(0));
        const message2 = ensureMessageIsDefined(tsx.outMessages.get(1));
        // Check that their bodies are identical
        message1.body.equals(message2.body);
        // Check that their init structs are defined
        const initStruct1 = ensureInitStructIsDefined(message1.init);
        const initStruct2 = ensureInitStructIsDefined(message2.init);
        // Now check that both structs are identical
        checkIdenticalInitStructs(initStruct1, initStruct2);
        const info1 = extractMessageInfo(message1.info);
        const info2 = extractMessageInfo(message2.info);
        checkInfosAreIdentical(info1, info2);
    }
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await deploy_DeployContract_1.DeployContract.fromInit(nextContractId()));
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, (0, core_1.beginCell)().endCell().asSlice());
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should work with any bounce flag", async () => {
        await checkCorrectness({
            bounce: true,
            body: (0, core_1.beginCell)()
                .storeStringTail("Hello world!")
                .endCell()
                .asSlice(),
            mode: 64n,
        });
        await checkCorrectness({
            bounce: false,
            body: (0, core_1.beginCell)()
                .storeStringTail("Hello world!")
                .endCell()
                .asSlice(),
            mode: 64n,
        });
    });
    it("should work with any mode", async () => {
        await checkCorrectness({
            bounce: true,
            body: (0, core_1.beginCell)()
                .storeStringTail("Hello world!")
                .endCell()
                .asSlice(),
            mode: 64n,
        });
        await checkCorrectness({
            bounce: true,
            body: (0, core_1.beginCell)()
                .storeStringTail("Hello world!")
                .endCell()
                .asSlice(),
            mode: 128n,
        });
    });
    it("should work with any body", async () => {
        await checkCorrectness({
            bounce: false,
            body: (0, core_1.beginCell)().endCell().asSlice(), // empty slice
            mode: 64n,
        });
    });
    it("should check that deploy and send produce indistinguishable messages", async () => {
        // Different bounces
        await testIdenticalMessages({
            $$type: "DeployComparisonMsg",
            bounce: true,
            body: (0, core_1.beginCell)().storeUint(3, 5).endCell().asSlice(),
            contractNum: nextContractId(),
            mode: 0n,
            value: (0, core_1.toNano)("1"),
        });
        await testIdenticalMessages({
            $$type: "DeployComparisonMsg",
            bounce: false,
            body: (0, core_1.beginCell)().storeUint(3, 5).endCell().asSlice(),
            contractNum: nextContractId(),
            mode: 0n,
            value: (0, core_1.toNano)("1"),
        });
        // Different bodies
        const bodiesToCheck = [
            (0, core_1.beginCell)().storeUint(3, 5).storeUint(8, 10).endCell().asSlice(),
            (0, core_1.beginCell)()
                .storeUint(8, 10)
                .storeStringTail("test")
                .endCell()
                .asSlice(),
            (0, core_1.beginCell)().endCell().asSlice(),
        ];
        for (const body of bodiesToCheck) {
            await testIdenticalMessages({
                $$type: "DeployComparisonMsg",
                bounce: true,
                body: body,
                contractNum: nextContractId(),
                mode: 0n,
                value: (0, core_1.toNano)("1"),
            });
        }
        // Different modes
        const modesToCheck = [0n, 1n, 2n, 16n, 32n, 64n, 65n, 66n, 80n, 96n];
        for (const mode of modesToCheck) {
            await testIdenticalMessages({
                $$type: "DeployComparisonMsg",
                bounce: true,
                body: (0, core_1.beginCell)()
                    .storeUint(8, 10)
                    .storeStringTail("test")
                    .endCell()
                    .asSlice(),
                contractNum: nextContractId(),
                mode: mode,
                value: (0, core_1.toNano)("1"),
            });
        }
        // Different values
        const valuesToCheck = [(0, core_1.toNano)("0.05"), (0, core_1.toNano)("1"), (0, core_1.toNano)("2")];
        for (const value of valuesToCheck) {
            await testIdenticalMessages({
                $$type: "DeployComparisonMsg",
                bounce: true,
                body: (0, core_1.beginCell)()
                    .storeUint(8, 10)
                    .storeStringTail("test")
                    .endCell()
                    .asSlice(),
                contractNum: nextContractId(),
                mode: 0n,
                value: value,
            });
        }
        // Checks for send and deploy with no given bodies
        // Different bounces
        await testIdenticalMessages({
            $$type: "DeployComparisonNoBodyMsg",
            bounce: true,
            contractNum: nextContractId(),
            mode: 0n,
            value: (0, core_1.toNano)("1"),
        });
        await testIdenticalMessages({
            $$type: "DeployComparisonNoBodyMsg",
            bounce: false,
            contractNum: nextContractId(),
            mode: 0n,
            value: (0, core_1.toNano)("1"),
        });
        // Different modes
        for (const mode of modesToCheck) {
            await testIdenticalMessages({
                $$type: "DeployComparisonNoBodyMsg",
                bounce: true,
                contractNum: nextContractId(),
                mode: mode,
                value: (0, core_1.toNano)("1"),
            });
        }
        // Different values
        for (const value of valuesToCheck) {
            await testIdenticalMessages({
                $$type: "DeployComparisonNoBodyMsg",
                bounce: true,
                contractNum: nextContractId(),
                mode: 0n,
                value: value,
            });
        }
    });
});
function ensureTransactionIsDefined(tsx) {
    if (tsx) {
        return tsx;
    }
    throw new Error("Transaction was expected to exist");
}
function ensureMessageIsDefined(msg) {
    if (msg) {
        return msg;
    }
    throw new Error("Message was expected to be exist");
}
function ensureInitStructIsDefined(initStruct) {
    if (initStruct) {
        return initStruct;
    }
    throw new Error("Init struct was expected to exist");
}
function checkIdenticalInitStructs(initStruct1, initStruct2) {
    if (typeof initStruct1.code === "undefined" ||
        typeof initStruct2.code === "undefined" ||
        initStruct1.code === null ||
        initStruct2.code === null) {
        throw new Error("Code field was expected to be defined in both structs");
    }
    expect(initStruct1.code.equals(initStruct2.code)).toBe(true);
    if (typeof initStruct1.data === "undefined" ||
        typeof initStruct2.data === "undefined" ||
        initStruct1.data === null ||
        initStruct2.data === null) {
        throw new Error("Data field was expected to be defined in both structs");
    }
    expect(initStruct1.data.equals(initStruct2.data)).toBe(true);
    expect(initStruct1.libraries).toBeUndefined();
    expect(initStruct2.libraries).toBeUndefined();
    expect(initStruct1.special).toBeUndefined();
    expect(initStruct2.special).toBeUndefined();
    expect(initStruct1.splitDepth).toBeUndefined();
    expect(initStruct2.splitDepth).toBeUndefined();
}
function extractMessageInfo(info) {
    if (info.type === "internal") {
        return info;
    }
    throw new Error("Message was expected to be of type internal");
}
function checkInfosAreIdentical(info1, info2) {
    expect(info1.bounce).toBe(info2.bounce);
    expect(info1.bounced).toBe(info2.bounced);
    expect(info1.dest.equals(info2.dest)).toBe(true);
    expect(info1.forwardFee.toString()).toBe(info2.forwardFee.toString());
    expect(info1.src.equals(info2.src)).toBe(true);
    // We cannot compare info1.value and info2.value because their values will depend on the send-message mode used
    // and the order in which they execute in the action phase
}
