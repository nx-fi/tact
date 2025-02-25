"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const star_contract_dependency_Parent_1 = require("./contracts/output/star-contract-dependency_Parent");
const star_contract_dependency_Child0_1 = require("./contracts/output/star-contract-dependency_Child0");
const star_contract_dependency_Child1_1 = require("./contracts/output/star-contract-dependency_Child1");
const star_contract_dependency_Child2_1 = require("./contracts/output/star-contract-dependency_Child2");
const star_contract_dependency_Child3_1 = require("./contracts/output/star-contract-dependency_Child3");
const star_contract_dependency_Child4_1 = require("./contracts/output/star-contract-dependency_Child4");
const star_contract_dependency_Child5_1 = require("./contracts/output/star-contract-dependency_Child5");
const star_contract_dependency_Child6_1 = require("./contracts/output/star-contract-dependency_Child6");
const star_contract_dependency_Child7_1 = require("./contracts/output/star-contract-dependency_Child7");
const star_contract_dependency_Child8_1 = require("./contracts/output/star-contract-dependency_Child8");
const star_contract_dependency_Child9_1 = require("./contracts/output/star-contract-dependency_Child9");
require("@ton/test-utils");
describe("Diamond-shaped dependencies", () => {
    let blockchain;
    let deployer;
    let ParentContract;
    let child0Contract;
    let child1Contract;
    let child2Contract;
    let child3Contract;
    let child4Contract;
    let child5Contract;
    let child6Contract;
    let child7Contract;
    let child8Contract;
    let child9Contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        deployer = await blockchain.treasury("deployer");
        ParentContract = blockchain.openContract(await star_contract_dependency_Parent_1.Parent.fromInit());
        child0Contract = blockchain.openContract(await star_contract_dependency_Child0_1.Child0.fromInit());
        child1Contract = blockchain.openContract(await star_contract_dependency_Child1_1.Child1.fromInit());
        child2Contract = blockchain.openContract(await star_contract_dependency_Child2_1.Child2.fromInit());
        child3Contract = blockchain.openContract(await star_contract_dependency_Child3_1.Child3.fromInit());
        child4Contract = blockchain.openContract(await star_contract_dependency_Child4_1.Child4.fromInit());
        child5Contract = blockchain.openContract(await star_contract_dependency_Child5_1.Child5.fromInit());
        child6Contract = blockchain.openContract(await star_contract_dependency_Child6_1.Child6.fromInit());
        child7Contract = blockchain.openContract(await star_contract_dependency_Child7_1.Child7.fromInit());
        child8Contract = blockchain.openContract(await star_contract_dependency_Child8_1.Child8.fromInit());
        child9Contract = blockchain.openContract(await star_contract_dependency_Child9_1.Child9.fromInit());
        const deployResult = await ParentContract.send(deployer.getSender(), { value: (0, core_1.toNano)("1") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            deploy: true,
        });
    });
    it("should work for Parent", async () => {
        const ParentAboutChild0 = await ParentContract.getGetChild0();
        expect(ParentAboutChild0.code.equals(child0Contract.init.code)).toBeTruthy();
        expect(ParentAboutChild0.data.equals(child0Contract.init.data)).toBeTruthy();
        const ParentAboutChild1 = await ParentContract.getGetChild1();
        expect(ParentAboutChild1.code.equals(child1Contract.init.code)).toBeTruthy();
        expect(ParentAboutChild1.data.equals(child1Contract.init.data)).toBeTruthy();
        const ParentAboutChild2 = await ParentContract.getGetChild2();
        expect(ParentAboutChild2.code.equals(child2Contract.init.code)).toBeTruthy();
        expect(ParentAboutChild2.data.equals(child2Contract.init.data)).toBeTruthy();
        const ParentAboutChild3 = await ParentContract.getGetChild3();
        expect(ParentAboutChild3.code.equals(child3Contract.init.code)).toBeTruthy();
        expect(ParentAboutChild3.data.equals(child3Contract.init.data)).toBeTruthy();
        const ParentAboutChild4 = await ParentContract.getGetChild4();
        expect(ParentAboutChild4.code.equals(child4Contract.init.code)).toBeTruthy();
        expect(ParentAboutChild4.data.equals(child4Contract.init.data)).toBeTruthy();
        const ParentAboutChild5 = await ParentContract.getGetChild5();
        expect(ParentAboutChild5.code.equals(child5Contract.init.code)).toBeTruthy();
        expect(ParentAboutChild5.data.equals(child5Contract.init.data)).toBeTruthy();
        const ParentAboutChild6 = await ParentContract.getGetChild6();
        expect(ParentAboutChild6.code.equals(child6Contract.init.code)).toBeTruthy();
        expect(ParentAboutChild6.data.equals(child6Contract.init.data)).toBeTruthy();
        const ParentAboutChild7 = await ParentContract.getGetChild7();
        expect(ParentAboutChild7.code.equals(child7Contract.init.code)).toBeTruthy();
        expect(ParentAboutChild7.data.equals(child7Contract.init.data)).toBeTruthy();
        const ParentAboutChild8 = await ParentContract.getGetChild8();
        expect(ParentAboutChild8.code.equals(child8Contract.init.code)).toBeTruthy();
        expect(ParentAboutChild8.data.equals(child8Contract.init.data)).toBeTruthy();
        const ParentAboutChild9 = await ParentContract.getGetChild9();
        expect(ParentAboutChild9.code.equals(child9Contract.init.code)).toBeTruthy();
        expect(ParentAboutChild9.data.equals(child9Contract.init.data)).toBeTruthy();
    });
    it("should work for Child", async () => {
        // Let's pick the 5th
        const deployChild5 = await child5Contract.send(deployer.getSender(), { value: (0, core_1.toNano)("1") }, null);
        expect(deployChild5.transactions).toHaveTransaction({
            from: deployer.address,
            deploy: true,
        });
        const ChildAboutParent = await child5Contract.getGetParent();
        expect(ChildAboutParent.code.equals(ParentContract.init.code)).toBeTruthy();
        expect(ChildAboutParent.data.equals(ParentContract.init.data)).toBeTruthy();
    });
});
