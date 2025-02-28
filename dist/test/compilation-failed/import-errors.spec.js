"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const tact_1 = require("../../cli/tact");
const createNodeFileSystem_1 = require("../../vfs/createNodeFileSystem");
const logger_1 = require("../../context/logger");
const createVirtualFileSystem_1 = require("../../vfs/createVirtualFileSystem");
const stdlib_1 = __importDefault(require("../../stdlib/stdlib"));
it("symlinks are not allowed", async () => {
    const result = await (0, tact_1.run)({
        config: (0, tact_1.createSingleFileConfig)(`symlink-parent.tact`, "./output"),
        logger: new logger_1.Logger(logger_1.LogLevel.NONE),
        project: (0, createNodeFileSystem_1.createNodeFileSystem)((0, path_1.join)(__dirname, "contracts")),
        stdlib: (0, createVirtualFileSystem_1.createVirtualFileSystem)("@stdlib", stdlib_1.default),
    });
    expect(result.ok).toBe(false);
    const message = result.error.map((err) => err.message).join("; ");
    expect(message).toContain("is a symbolic link which are not processed by Tact to forbid out-of-project-root accesses via symlinks");
});
