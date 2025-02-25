"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
describe("scope-errors", () => {
    (0, util_1.itShouldNotCompile)({
        testName: "scope-const-shadows-stdlib-ident",
        errorMessage: 'Constant "b" is shadowing an identifier defined in the Tact standard library: pick a different constant name',
    });
});
