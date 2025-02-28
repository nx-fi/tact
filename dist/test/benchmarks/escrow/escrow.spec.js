"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sandbox_1 = require("@ton/sandbox");
const core_1 = require("@ton/core");
require("@ton/test-utils");
const escrow_Escrow_1 = require("../contracts/output/escrow_Escrow");
const util_1 = require("../util");
const results_json_1 = __importDefault(require("./results.json"));
const fs_1 = require("fs");
const filePath_1 = require("../../../utils/filePath");
const path_1 = require("path");
const loadFunCEscrowBoc = () => {
    const bocEscrow = (0, fs_1.readFileSync)((0, filePath_1.posixNormalize)((0, path_1.resolve)(__dirname, "../contracts/func/output/escrow.boc")));
    return { bocEscrow };
};
const sendFundingRaw = async (escrowAddress, via, amount) => {
    const fundingMsg = (0, core_1.beginCell)()
        .store((0, escrow_Escrow_1.storeFunding)({
        $$type: "Funding",
    }))
        .endCell();
    return await via.send({
        to: escrowAddress,
        value: amount,
        body: fundingMsg,
        sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
    });
};
const sendChangeCodeRaw = async (escrowAddress, via, newCode) => {
    const changeCode = {
        $$type: "UpdateJettonWalletCode",
        newJettonWalletCode: newCode,
    };
    const changeCodeMsg = (0, core_1.beginCell)()
        .store((0, escrow_Escrow_1.storeUpdateJettonWalletCode)(changeCode))
        .endCell();
    return await via.send({
        to: escrowAddress,
        value: (0, core_1.toNano)("0.05"),
        body: changeCodeMsg,
        sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
    });
};
const sendApproveRaw = async (escrowAddress, via) => {
    const approveMsg = (0, core_1.beginCell)()
        .store((0, escrow_Escrow_1.storeApprove)({
        $$type: "Approve",
    }))
        .endCell();
    return await via.send({
        to: escrowAddress,
        value: (0, core_1.toNano)("0.05"),
        body: approveMsg,
        sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
    });
};
const sendCancelRaw = async (escrowAddress, via) => {
    const cancelMsg = (0, core_1.beginCell)()
        .store((0, escrow_Escrow_1.storeCancel)({
        $$type: "Cancel",
    }))
        .endCell();
    return await via.send({
        to: escrowAddress,
        value: (0, core_1.toNano)("0.05"),
        body: cancelMsg,
        sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
    });
};
describe("Escrow Gas Tests", () => {
    let blockchain;
    let deployer;
    let seller;
    let buyer;
    let guarantor;
    let lastCtxId = 1n;
    const stubJettonWalletCode = (0, core_1.beginCell)().storeUint(0, 1).endCell();
    const results = (0, util_1.generateResults)(results_json_1.default);
    const expectedResult = results.at(-1);
    const funcResult = results.at(0);
    async function deployEscrowContractTact(assetAddress, dealAmount, royalty) {
        const contract = blockchain.openContract(await escrow_Escrow_1.Escrow.fromInit(lastCtxId++, seller.address, guarantor.address, dealAmount, royalty, assetAddress, assetAddress ? stubJettonWalletCode : null));
        const deployResult = await contract.send(deployer.getSender(), {
            value: (0, core_1.toNano)("0.1"),
        }, {
            $$type: "ProvideEscrowData",
        });
        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: contract.address,
            value: (0, core_1.toNano)("0.1"),
            success: true,
            deploy: true,
        });
        return {
            escrowAddress: contract.address,
            result: deployResult,
        };
    }
    async function deployEscrowContractFunC(assetAddress, dealAmount, royalty) {
        const escrowData = loadFunCEscrowBoc();
        const escrowCell = core_1.Cell.fromBoc(escrowData.bocEscrow)[0];
        const stateInitEscrowBuilder = (0, core_1.beginCell)()
            .storeUint(lastCtxId++, 32)
            .storeAddress(seller.address)
            .storeAddress(guarantor.address)
            .storeUint(dealAmount, 64)
            .storeAddress(assetAddress);
        const cell2 = (0, core_1.beginCell)()
            .storeUint(royalty, 32)
            .storeAddress(null)
            .storeUint(0, 2)
            .storeMaybeRef(assetAddress ? stubJettonWalletCode : null)
            .endCell();
        const stateInit = stateInitEscrowBuilder.storeRef(cell2).endCell();
        const init = { code: escrowCell, data: stateInit };
        const escrowAddress = (0, core_1.contractAddress)(0, init);
        const deployResult = await deployer.send({
            to: escrowAddress,
            value: (0, core_1.toNano)("0.1"),
            init,
            body: (0, core_1.beginCell)().endCell(),
            sendMode: core_1.SendMode.PAY_GAS_SEPARATELY,
        });
        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: escrowAddress,
            value: (0, core_1.toNano)("0.1"),
            success: true,
            deploy: true,
        });
        return {
            escrowAddress,
            result: deployResult,
        };
    }
    // each new escrow deal is new contract instance
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        deployer = await blockchain.treasury("deployer");
        seller = await blockchain.treasury("seller");
        buyer = await blockchain.treasury("buyer");
        guarantor = await blockchain.treasury("guarantor");
    });
    afterAll(() => {
        (0, util_1.printBenchmarkTable)(results);
    });
    it("fundingTon", async () => {
        const runFundingTest = async (escrowAddress) => {
            const fundingResult = await sendFundingRaw(escrowAddress, buyer, (0, core_1.toNano)(1));
            expect(fundingResult.transactions).toHaveTransaction({
                from: buyer.address,
                to: escrowAddress,
                value: (0, core_1.toNano)(1),
                success: true,
                exitCode: 0,
            });
            return (0, util_1.getUsedGas)(fundingResult);
        };
        const dealAmount = (0, core_1.toNano)(1); // 1 ton
        const escrowContractFunC = await deployEscrowContractFunC(null, dealAmount, 1n);
        const escrowContractTact = await deployEscrowContractTact(null, dealAmount, 1n);
        const fundingGasFunC = await runFundingTest(escrowContractFunC.escrowAddress);
        const fundingGasTact = await runFundingTest(escrowContractTact.escrowAddress);
        expect(fundingGasFunC).toEqual(funcResult.gas["fundingTon"]);
        expect(fundingGasTact).toEqual(expectedResult.gas["fundingTon"]);
    });
    it("changeCode", async () => {
        const runChangeCodeTest = async (escrowAddress) => {
            const changeCodeResult = await sendChangeCodeRaw(escrowAddress, seller, (0, core_1.beginCell)().endCell());
            expect(changeCodeResult.transactions).toHaveTransaction({
                from: seller.address,
                to: escrowAddress,
                success: true,
                exitCode: 0,
            });
            return (0, util_1.getUsedGas)(changeCodeResult);
        };
        const dealAmount = (0, core_1.toNano)(1); // 1 ton
        const escrowContractFunC = await deployEscrowContractFunC(guarantor.address, dealAmount, 1n);
        const escrowContractTact = await deployEscrowContractTact(guarantor.address, dealAmount, 1n);
        const changeCodeGasFunC = await runChangeCodeTest(escrowContractFunC.escrowAddress);
        const changeCodeGasTact = await runChangeCodeTest(escrowContractTact.escrowAddress);
        expect(changeCodeGasFunC).toEqual(funcResult.gas["changeCode"]);
        expect(changeCodeGasTact).toEqual(expectedResult.gas["changeCode"]);
    });
    it("approveTon", async () => {
        const runApproveTest = async (escrowAddress) => {
            await sendFundingRaw(escrowAddress, buyer, (0, core_1.toNano)(1));
            const approveResult = await sendApproveRaw(escrowAddress, guarantor);
            expect(approveResult.transactions).toHaveTransaction({
                from: guarantor.address,
                to: escrowAddress,
                success: true,
                destroyed: true,
                exitCode: 0,
            });
            return (0, util_1.getUsedGas)(approveResult);
        };
        const dealAmount = (0, core_1.toNano)(1); // 1 ton
        const escrowContractFunC = await deployEscrowContractFunC(null, dealAmount, 1n);
        const escrowContractTact = await deployEscrowContractTact(null, dealAmount, 1n);
        const approveGasFunC = await runApproveTest(escrowContractFunC.escrowAddress);
        const approveGasTact = await runApproveTest(escrowContractTact.escrowAddress);
        expect(approveGasFunC).toEqual(funcResult.gas["approveTon"]);
        expect(approveGasTact).toEqual(expectedResult.gas["approveTon"]);
    });
    it("cancelTon", async () => {
        const runCancelTest = async (escrowAddress) => {
            await sendFundingRaw(escrowAddress, buyer, (0, core_1.toNano)(1));
            const cancelResult = await sendCancelRaw(escrowAddress, guarantor);
            expect(cancelResult.transactions).toHaveTransaction({
                from: guarantor.address,
                to: escrowAddress,
                success: true,
                destroyed: true,
                exitCode: 0,
            });
            return (0, util_1.getUsedGas)(cancelResult);
        };
        const dealAmount = (0, core_1.toNano)(1); // 1 ton
        const escrowContractFunC = await deployEscrowContractFunC(null, dealAmount, 1n);
        const escrowContractTact = await deployEscrowContractTact(null, dealAmount, 1n);
        const cancelGasFunC = await runCancelTest(escrowContractFunC.escrowAddress);
        const cancelGasTact = await runCancelTest(escrowContractTact.escrowAddress);
        expect(cancelGasFunC).toEqual(funcResult.gas["cancelTon"]);
        expect(cancelGasTact).toEqual(expectedResult.gas["cancelTon"]);
    });
});
