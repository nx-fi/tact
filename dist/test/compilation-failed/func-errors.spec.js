"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
describe("func-errors", () => {
    (0, util_1.itShouldNotCompile)({
        testName: "func-function-does-not-exist",
        errorMessage: "Function 'iDoNotExist' does not exist in imported FunC sources",
    });
});
