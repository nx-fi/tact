"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const tact_reserved_contract_errors_ReservedContractErrorsTester_1 = require("./contracts/output/tact-reserved-contract-errors_ReservedContractErrorsTester");
require("@ton/test-utils");
describe("Tact-reserved contract errors", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure", {
            resetBalanceIfZero: true,
        });
        contract = blockchain.openContract(await tact_reserved_contract_errors_ReservedContractErrorsTester_1.ReservedContractErrorsTester.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("100000") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    // 128: Null reference exception
    it("should test exit code 128", async () => {
        await testReservedExitCode(128, contract, treasure);
    });
    // 129: Invalid serialization prefix
    // NOTE: Reserved, but due to a number of prior checks it cannot be thrown unless one hijacks
    //       the contract code before deployment and changes the opcodes of the Messages expected
    //       to be received in the contract
    // 130: Invalid incoming message
    it("should test exit code 130", async () => {
        await testReservedExitCode(130, contract, treasure);
    });
    // 131: Constraints error
    // NOTE: Reserved, but never thrown anywhere, can't repro
    // 132: Access denied
    it("should test exit code 132", async () => {
        await testReservedExitCode(132, contract, treasure);
    });
    // 133: Contract stopped
    // NOTE: Reserved, but never thrown anywhere, can't repro
    // 134: Invalid argument
    it("should test exit code 134", async () => {
        await testReservedExitCode(134, contract, treasure);
    });
    // 135: Code of a contract was not found
    // NOTE: Reserved, but one has to replace the contract code to trigger it
    // 136: Invalid address
    it("should test exit code 136", async () => {
        await testReservedExitCode(136, contract, treasure);
    });
});
async function testReservedExitCode(code, contract, treasure) {
    expect(code).toBeGreaterThanOrEqual(128);
    expect(code).toBeLessThan(256);
    expect([128, 130, 132, 134, 136]).toContain(code);
    const sendResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, code.toString(10));
    expect(sendResult.transactions).toHaveTransaction({
        from: code === 130 ? contract.address : treasure.address,
        to: contract.address,
        success: false,
        exitCode: code,
    });
}
