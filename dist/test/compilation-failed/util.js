"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itShouldNotCompile = itShouldNotCompile;
const fs_1 = require("fs");
const tact_1 = require("../../cli/tact");
const logger_1 = require("../../context/logger");
const stdlib_1 = __importDefault(require("../../stdlib/stdlib"));
const createVirtualFileSystem_1 = require("../../vfs/createVirtualFileSystem");
const path_1 = require("path");
// helper to reduce boilerplate
function itShouldNotCompile(params) {
    it(`should not compile ${params.testName}`, async () => {
        const fileName = `${params.testName}.tact`;
        const options = params.testName.includes("external")
            ? {
                external: true,
            }
            : {};
        const result = await (0, tact_1.run)({
            config: {
                projects: [
                    {
                        name: params.testName,
                        path: `./${fileName}`,
                        output: "./output",
                        options,
                    },
                ],
            },
            logger: new logger_1.Logger(logger_1.LogLevel.NONE),
            project: (0, createVirtualFileSystem_1.createVirtualFileSystem)("/", {
                [fileName]: (0, fs_1.readFileSync)((0, path_1.join)(__dirname, "contracts", `./${fileName}`)).toString("base64"),
            }, false),
            stdlib: (0, createVirtualFileSystem_1.createVirtualFileSystem)("@stdlib", stdlib_1.default),
        });
        expect(result.ok).toBe(false);
        const message = result.error.map((err) => err.message).join("; ");
        expect(message).toContain(params.errorMessage);
    });
}
