"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const test_util_build_1 = require("../test-util.build");
// disable tests on windows
const testWin = process.platform === "win32" && process.env.CI ? test.skip : test;
const tact = (args) => {
    const tactPath = (0, path_1.normalize)((0, path_1.join)(__dirname, "..", "..", "..", "bin", "tact.js"));
    const command = `node ${tactPath} ${args}`;
    return (0, test_util_build_1.runCommand)(command);
};
const unboc = (...args) => {
    const unbocPath = (0, path_1.normalize)((0, path_1.join)(__dirname, "..", "..", "..", "bin", "unboc.js"));
    const command = `node ${unbocPath} ${args.join(" ")}`;
    return (0, test_util_build_1.runCommand)(command);
};
const codegen = (0, test_util_build_1.makeCodegen)((0, path_1.join)(__dirname, "output"));
const goodContract = `
contract Test {
    get fun greeting(): String {
        return "hello world";
    }
}
`;
describe("unboc foo.boc", () => {
    testWin("Exits with correct code", async () => {
        const r = await codegen.config(`unboc`, goodContract, {});
        await tact(`-c ${r.config}`);
        const result = await unboc(r.outputPath("code.boc"));
        expect(result).toMatchObject({ kind: "exited", code: 0 });
    });
    testWin("Default run", async () => {
        const r = await codegen.config(`unboc`, goodContract, {});
        await tact(`-c ${r.config}`);
        const result = await unboc(r.outputPath("code.boc"));
        expect(result).toMatchSnapshot();
    });
    testWin("Without aliases", async () => {
        const r = await codegen.config(`unboc`, goodContract, {});
        await tact(`-c ${r.config}`);
        const result = await unboc("--no-aliases", r.outputPath("code.boc"));
        expect(result).toMatchSnapshot();
    });
    testWin("Without refs", async () => {
        const r = await codegen.config(`unboc`, goodContract, {});
        await tact(`-c ${r.config}`);
        const result = await unboc("--no-compute-refs", r.outputPath("code.boc"));
        expect(result).toMatchSnapshot();
    });
    testWin("With bitcode", async () => {
        const r = await codegen.config(`unboc`, goodContract, {});
        await tact(`-c ${r.config}`);
        const result = await unboc("--show-bitcode", r.outputPath("code.boc"));
        expect(result).toMatchSnapshot();
    });
});
