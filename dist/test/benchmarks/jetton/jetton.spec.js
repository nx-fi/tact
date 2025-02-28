"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@ton/test-utils");
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const jetton_minter_discoverable_JettonMinter_1 = require("../contracts/output/jetton_minter_discoverable_JettonMinter");
const util_1 = require("../util");
const results_json_1 = __importDefault(require("./results.json"));
const path_1 = require("path");
const fs_1 = require("fs");
const escrow_Escrow_1 = require("../contracts/output/escrow_Escrow");
const filePath_1 = require("../../../utils/filePath");
const write_vm_log_1 = require("../../utils/write-vm-log");
const loadFunCJettonsBoc = () => {
    const bocMinter = (0, fs_1.readFileSync)((0, filePath_1.posixNormalize)((0, path_1.resolve)(__dirname, "../contracts/func/output/jetton-minter-discoverable.boc")));
    const bocWallet = (0, fs_1.readFileSync)((0, filePath_1.posixNormalize)((0, path_1.resolve)(__dirname, "../contracts/func/output/jetton-wallet.boc")));
    return { bocMinter, bocWallet };
};
const deployFuncJettonMinter = async (via) => {
    const jettonData = loadFunCJettonsBoc();
    const minterCell = core_1.Cell.fromBoc(jettonData.bocMinter)[0];
    const walletCell = core_1.Cell.fromBoc(jettonData.bocWallet)[0];
    const stateInitMinter = (0, core_1.beginCell)()
        .storeCoins(0)
        .storeAddress(via.address)
        .storeRef((0, core_1.beginCell)().storeUint(1, 1).endCell()) // as salt
        .storeRef(walletCell)
        .endCell();
    const init = { code: minterCell, data: stateInitMinter };
    const minterAddress = (0, core_1.contractAddress)(0, init);
    return {
        minterAddress,
        result: await via.send({
            to: minterAddress,
            value: (0, core_1.toNano)("0.1"),
            init,
            body: (0, core_1.beginCell)().endCell(),
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
        }),
    };
};
const sendDiscoveryRaw = async (minterAddress, via, address, includeAddress, value) => {
    const msg = {
        $$type: "ProvideWalletAddress",
        queryId: 0n,
        ownerAddress: address,
        includeAddress: includeAddress,
    };
    const msgCell = (0, core_1.beginCell)().store((0, escrow_Escrow_1.storeProvideWalletAddress)(msg)).endCell();
    return await via.send({
        to: minterAddress,
        value,
        body: msgCell,
        sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
    });
};
const sendTransferRaw = async (jettonWalletAddress, via, value, jetton_amount, to, responseAddress, customPayload, forward_ton_amount, forwardPayload) => {
    const parsedForwardPayload = forwardPayload != null
        ? forwardPayload.beginParse()
        : new core_1.Builder().storeUint(0, 1).endCell().beginParse(); //Either bit equals 0
    const msg = {
        $$type: "JettonTransfer",
        queryId: 0n,
        amount: jetton_amount,
        destination: to,
        responseDestination: responseAddress,
        customPayload: customPayload,
        forwardTonAmount: forward_ton_amount,
        forwardPayload: parsedForwardPayload,
    };
    const msgCell = (0, core_1.beginCell)().store((0, jetton_minter_discoverable_JettonMinter_1.storeJettonTransfer)(msg)).endCell();
    return await via.send({
        to: jettonWalletAddress,
        value,
        body: msgCell,
        sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
    });
};
const sendMintRaw = async (jettonMinterAddress, via, to, jetton_amount, forward_ton_amount, total_ton_amount) => {
    if (total_ton_amount <= forward_ton_amount) {
        throw new Error("Total TON amount should be greater than the forward amount");
    }
    const msg = {
        $$type: "Mint",
        queryId: 0n,
        receiver: to,
        tonAmount: total_ton_amount,
        mintMessage: {
            $$type: "JettonTransferInternal",
            queryId: 0n,
            amount: jetton_amount,
            responseDestination: jettonMinterAddress,
            forwardTonAmount: forward_ton_amount,
            sender: jettonMinterAddress,
            forwardPayload: (0, core_1.beginCell)().storeUint(0, 1).endCell().beginParse(),
        },
    };
    const msgCell = (0, core_1.beginCell)().store((0, jetton_minter_discoverable_JettonMinter_1.storeMint)(msg)).endCell();
    return await via.send({
        to: jettonMinterAddress,
        value: total_ton_amount + (0, core_1.toNano)("0.015"),
        body: msgCell,
        sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
    });
};
const sendBurnRaw = async (jettonWalletAddress, via, value, jetton_amount, responseAddress, customPayload) => {
    const msg = {
        $$type: "JettonBurn",
        queryId: 0n,
        amount: jetton_amount,
        responseDestination: responseAddress,
        customPayload: customPayload,
    };
    const msgCell = (0, core_1.beginCell)().store((0, jetton_minter_discoverable_JettonMinter_1.storeJettonBurn)(msg)).endCell();
    return await via.send({
        to: jettonWalletAddress,
        value,
        body: msgCell,
        sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
    });
};
const getJettonWalletRaw = async (minterAddress, blockchain, walletAddress) => {
    const walletAddressResult = await blockchain
        .provider(minterAddress)
        .get(`get_wallet_address`, [
        {
            type: "slice",
            cell: (0, core_1.beginCell)().storeAddress(walletAddress).endCell(),
        },
    ]);
    return walletAddressResult.stack.readAddress();
};
describe("Jetton", () => {
    let blockchain;
    let jettonMinter;
    let jettonMinterFuncAddress;
    let deployer;
    let step;
    let notDeployer;
    let defaultContent;
    const results = (0, util_1.generateResults)(results_json_1.default);
    const expectedResult = results.at(-1);
    const funcResult = results.at(0);
    beforeAll(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        step = (0, write_vm_log_1.writeLog)({
            path: (0, path_1.join)(__dirname, "output", "log.yaml"),
            blockchain,
        });
        deployer = await blockchain.treasury("deployer");
        notDeployer = await blockchain.treasury("notDeployer");
        const { result: deployFuncJettonMinterResult, minterAddress } = await deployFuncJettonMinter(deployer);
        expect(deployFuncJettonMinterResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: minterAddress,
            success: true,
            deploy: true,
        });
        jettonMinterFuncAddress = minterAddress;
        defaultContent = (0, core_1.beginCell)().endCell();
        const msg = {
            $$type: "JettonUpdateContent",
            queryId: 0n,
            content: new core_1.Cell(),
        };
        jettonMinter = blockchain.openContract(await jetton_minter_discoverable_JettonMinter_1.JettonMinter.fromInit(0n, deployer.address, defaultContent));
        const deployResult = await jettonMinter.send(deployer.getSender(), { value: (0, core_1.toNano)("0.1") }, msg);
        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: jettonMinter.address,
            deploy: true,
            success: true,
        });
    });
    afterAll(() => {
        (0, util_1.printBenchmarkTable)(results);
    });
    it("transfer", async () => {
        const runMintTest = async (minterAddress) => {
            const mintResult = await step("mint", () => sendMintRaw(minterAddress, deployer, deployer.address, (0, core_1.toNano)(100000), (0, core_1.toNano)("0.05"), (0, core_1.toNano)("1")));
            const deployerJettonWalletAddress = await getJettonWalletRaw(minterAddress, blockchain, deployer.address);
            expect(mintResult.transactions).toHaveTransaction({
                from: minterAddress,
                to: deployerJettonWalletAddress,
                success: true,
                endStatus: "active",
            });
            const someAddress = core_1.Address.parse("EQD__________________________________________0vo");
            const sendResult = await step("transfer", () => sendTransferRaw(deployerJettonWalletAddress, deployer, (0, core_1.toNano)(1), 1n, someAddress, deployer.address, null, 0n, null));
            expect(sendResult.transactions).not.toHaveTransaction({
                success: false,
            });
            expect(sendResult.transactions).toHaveTransaction({
                from: deployerJettonWalletAddress,
                success: true,
                exitCode: 0,
            });
            return (0, util_1.getUsedGas)(sendResult);
        };
        const transferGasUsedTact = await runMintTest(jettonMinter.address);
        const transferGasUsedFunC = await runMintTest(jettonMinterFuncAddress);
        expect(transferGasUsedTact).toEqual(expectedResult.gas["transfer"]);
        expect(transferGasUsedFunC).toEqual(funcResult.gas["transfer"]);
    });
    it("burn", async () => {
        const runBurnTest = async (minterAddress) => {
            const deployerJettonWalletAddress = await getJettonWalletRaw(minterAddress, blockchain, deployer.address);
            const burnAmount = (0, core_1.toNano)("0.01");
            const burnResult = await step("burn", () => sendBurnRaw(deployerJettonWalletAddress, deployer, (0, core_1.toNano)(10), burnAmount, deployer.address, null));
            expect(burnResult.transactions).toHaveTransaction({
                from: deployerJettonWalletAddress,
                to: minterAddress,
                exitCode: 0,
            });
            return (0, util_1.getUsedGas)(burnResult);
        };
        const burnGasUsedTact = await runBurnTest(jettonMinter.address);
        const burnGasUsedFunC = await runBurnTest(jettonMinterFuncAddress);
        expect(burnGasUsedTact).toEqual(expectedResult.gas["burn"]);
        expect(burnGasUsedFunC).toEqual(funcResult.gas["burn"]);
    });
    it("discovery", async () => {
        const runDiscoveryTest = async (minterAddress) => {
            const discoveryResult = await step("discovery", () => sendDiscoveryRaw(minterAddress, deployer, notDeployer.address, false, (0, core_1.toNano)(10)));
            expect(discoveryResult.transactions).toHaveTransaction({
                from: deployer.address,
                to: minterAddress,
                success: true,
            });
            return (0, util_1.getUsedGas)(discoveryResult);
        };
        const discoveryGasUsedTact = await runDiscoveryTest(jettonMinter.address);
        const discoveryGasUsedFunC = await runDiscoveryTest(jettonMinterFuncAddress);
        expect(discoveryGasUsedTact).toEqual(expectedResult.gas["discovery"]);
        expect(discoveryGasUsedFunC).toEqual(funcResult.gas["discovery"]);
    });
});
