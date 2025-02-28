"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const debug_Debug_1 = require("./contracts/output/debug_Debug");
const filePath_1 = require("../../utils/filePath");
require("@ton/test-utils");
describe("debug", () => {
    let blockchain;
    let treasure;
    let contract;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
        contract = blockchain.openContract(await debug_Debug_1.Debug.fromInit());
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, { $$type: "Deploy", queryId: 0n });
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
    });
    it("should dump values correctly", async () => {
        // Send Debug message
        const result = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, "Debug");
        const debugLogs = result.transactions[1]?.debugLogs.replace(/#DEBUG#: /g, "") ?? "";
        const filePath = (0, filePath_1.posixNormalize)("src/test/e2e-emulated/contracts/debug.tact");
        expect(debugLogs).toStrictEqual(`File ${filePath}:10:9:
dumpStack()
stack(1 values) : 10000000000 
File ${filePath}:11:9:
dump("Hello world!")
Hello world!
File ${filePath}:12:9:
dump(123)
123
File ${filePath}:13:9:
dump(true)
true
File ${filePath}:14:9:
dump(false)
false
File ${filePath}:15:9:
dump(null)
null
File ${filePath}:16:9:
dump(myAddress())
${contract.address.toString({ bounceable: true })}
File ${filePath}:17:9:
dump(newAddress(0, 0x83dfd552e63729b472fcbcc8c45ebcc6691702558b68ec7527e1ba403a0f31a8))
${core_1.Address.parseRaw("0:83dfd552e63729b472fcbcc8c45ebcc6691702558b68ec7527e1ba403a0f31a8").toString()}
File ${filePath}:18:9:
dump(myBalance())
10000000000`);
    });
});
