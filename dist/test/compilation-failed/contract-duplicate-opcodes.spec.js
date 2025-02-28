"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
describe("contract-duplicate-opcodes", () => {
    (0, util_1.itShouldNotCompile)({
        testName: "contract-duplicate-bounced-opcode",
        errorMessage: 'Receive functions of a contract or trait cannot process messages with the same opcode: opcodes of message types "Msg2" and "Msg1" are equal',
    });
    (0, util_1.itShouldNotCompile)({
        testName: "contract-duplicate-external-opcode",
        errorMessage: 'Receive functions of a contract or trait cannot process messages with the same opcode: opcodes of message types "Msg2" and "Msg1" are equal',
    });
    (0, util_1.itShouldNotCompile)({
        testName: "contract-duplicate-receiver-opcode",
        errorMessage: 'Receive functions of a contract or trait cannot process messages with the same opcode: opcodes of message types "Msg2" and "Msg1" are equal',
    });
});
