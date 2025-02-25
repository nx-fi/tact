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
    async function generateEscrowContract(assetAddress, dealAmount, royalty) {
        return blockchain.openContract(await escrow_Escrow_1.Escrow.fromInit(lastCtxId++, seller.address, guarantor.address, dealAmount, royalty, assetAddress, assetAddress ? stubJettonWalletCode : null));
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
        const dealAmount = (0, core_1.toNano)(1); // 1 ton
        const escrowContract = await generateEscrowContract(null, dealAmount, 1n);
        await escrowContract.send(deployer.getSender(), {
            value: (0, core_1.toNano)("0.05"),
        }, {
            $$type: "Deploy",
            queryId: 0n,
        });
        const fundingResult = await escrowContract.send(buyer.getSender(), {
            value: dealAmount,
        }, "funding");
        expect(fundingResult.transactions).toHaveTransaction({
            from: buyer.address,
            to: escrowContract.address,
            value: dealAmount,
            success: true,
            exitCode: 0,
        });
        const gasUsed = (0, util_1.getUsedGas)(fundingResult);
        expect(gasUsed).toEqual(expectedResult.gas["fundingTon"]);
    });
    it("changeCode", async () => {
        const dealAmount = (0, core_1.toNano)(5); // 5 jetton
        const escrowContract = await generateEscrowContract(guarantor.address, dealAmount, 1n);
        await escrowContract.send(deployer.getSender(), {
            value: (0, core_1.toNano)("0.05"),
        }, {
            $$type: "Deploy",
            queryId: 0n,
        });
        const newJettonWalletCode = (0, core_1.beginCell)().endCell();
        const updateResult = await escrowContract.send(seller.getSender(), {
            value: (0, core_1.toNano)("0.05"),
        }, {
            $$type: "UpdateJettonWalletCode",
            newJettonWalletCode: newJettonWalletCode, // example cell
        });
        expect(updateResult.transactions).toHaveTransaction({
            from: seller.address,
            to: escrowContract.address,
            success: true,
        });
        const gasUsed = (0, util_1.getUsedGas)(updateResult);
        expect(gasUsed).toEqual(expectedResult.gas["changeCode"]);
    });
    it("approveTon", async () => {
        const dealAmount = (0, core_1.toNano)(1); // 1 ton
        const escrowContract = await generateEscrowContract(null, dealAmount, 1n);
        await escrowContract.send(deployer.getSender(), {
            value: (0, core_1.toNano)("0.05"),
        }, {
            $$type: "Deploy",
            queryId: 0n,
        });
        await escrowContract.send(buyer.getSender(), {
            value: dealAmount,
        }, "funding");
        const approveResult = await escrowContract.send(guarantor.getSender(), {
            value: (0, core_1.toNano)("0.05"),
        }, "approve");
        expect(approveResult.transactions).toHaveTransaction({
            from: guarantor.address,
            to: escrowContract.address,
            success: true,
            outMessagesCount: 2,
            endStatus: "non-existing", // escrow should be destroyed after cancel
        });
        const gasUsed = (0, util_1.getUsedGas)(approveResult);
        expect(gasUsed).toEqual(expectedResult.gas["approveTon"]);
    });
    it("cancelTon", async () => {
        const dealAmount = (0, core_1.toNano)(1); // 1 ton
        const escrowContract = await generateEscrowContract(null, dealAmount, 1n);
        await escrowContract.send(deployer.getSender(), {
            value: (0, core_1.toNano)("0.05"),
        }, {
            $$type: "Deploy",
            queryId: 0n,
        });
        await escrowContract.send(buyer.getSender(), {
            value: dealAmount,
        }, "funding");
        const cancelResult = await escrowContract.send(guarantor.getSender(), {
            value: (0, core_1.toNano)("0.05"),
        }, "cancel");
        expect(cancelResult.transactions).toHaveTransaction({
            from: guarantor.address,
            to: escrowContract.address,
            success: true,
            endStatus: "non-existing", // escrow should be destroyed after cancel
        });
        const gasUsed = (0, util_1.getUsedGas)(cancelResult);
        expect(gasUsed).toEqual(expectedResult.gas["cancelTon"]);
    });
});
