"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
describe("abi/global.ts errors", () => {
    (0, util_1.itShouldNotCompile)({
        testName: "sha256-expects-string-or-slice",
        errorMessage: "sha256 expects string or slice argument",
    });
});
