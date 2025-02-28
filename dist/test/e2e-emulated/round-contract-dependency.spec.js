"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const round_contract_dependency_A_1 = require("./contracts/output/round-contract-dependency_A");
const round_contract_dependency_B_1 = require("./contracts/output/round-contract-dependency_B");
const round_contract_dependency_C_1 = require("./contracts/output/round-contract-dependency_C");
require("@ton/test-utils");
describe("Diamond-shaped dependencies", () => {
    let blockchain;
    let deployer;
    let contractA;
    let contractB;
    let contractC;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        deployer = await blockchain.treasury("deployer");
        contractA = blockchain.openContract(await round_contract_dependency_A_1.A.fromInit());
        contractB = blockchain.openContract(await round_contract_dependency_B_1.B.fromInit());
        contractC = blockchain.openContract(await round_contract_dependency_C_1.C.fromInit());
        // Deploy contracts
        await contractA.send(deployer.getSender(), { value: (0, core_1.toNano)("1") }, null);
        await contractB.send(deployer.getSender(), { value: (0, core_1.toNano)("1") }, null);
        await contractC.send(deployer.getSender(), { value: (0, core_1.toNano)("1") }, null);
    });
    it("Should work for A", async () => {
        const FirstAboutSecond = await contractA.getGetNext();
        expect(FirstAboutSecond.code.equals(contractB.init.code)).toBeTruthy();
        expect(FirstAboutSecond.data.equals(contractB.init.data)).toBeTruthy();
        const FirstAboutThird = await contractA.getGetNestedNext();
        expect(FirstAboutThird.code.equals(contractC.init.code)).toBeTruthy();
        expect(FirstAboutThird.data.equals(contractC.init.data)).toBeTruthy();
    });
    it("Should work for B", async () => {
        const SecondAboutThird = await contractB.getGetNext();
        expect(SecondAboutThird.code.equals(contractC.init.code)).toBeTruthy();
        expect(SecondAboutThird.data.equals(contractC.init.data)).toBeTruthy();
        const SecondAboutFirst = await contractB.getGetNestedNext();
        expect(SecondAboutFirst.code.equals(contractA.init.code)).toBeTruthy();
        expect(SecondAboutFirst.data.equals(contractA.init.data)).toBeTruthy();
    });
    it("Should work for C", async () => {
        const ThirdAboutFirst = await contractC.getGetNext();
        expect(ThirdAboutFirst.code.equals(contractA.init.code)).toBeTruthy();
        expect(ThirdAboutFirst.data.equals(contractA.init.data)).toBeTruthy();
        const ThirdAboutSecond = await contractC.getGetNestedNext();
        expect(ThirdAboutSecond.code.equals(contractB.init.code)).toBeTruthy();
        expect(ThirdAboutSecond.data.equals(contractB.init.data)).toBeTruthy();
    });
});
