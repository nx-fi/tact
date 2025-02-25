"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allInFolderFunc = exports.allInFolder = void 0;
const glob_1 = require("glob");
const createVirtualFileSystem_1 = require("../../vfs/createVirtualFileSystem");
const path_1 = require("path");
const createNodeFileSystem_1 = require("../../vfs/createNodeFileSystem");
const logger_1 = require("../../context/logger");
const tact_1 = require("../../cli/tact");
const stdlib_1 = __importDefault(require("../../stdlib/stdlib"));
const filePath_1 = require("../../utils/filePath");
const funcCompile_1 = require("../../func/funcCompile");
// node.js 20+ builtin
const globSync = (globs, options) => {
    return globs.flatMap((g) => glob_1.glob.sync(g, options));
};
const allInFolder = async (folder, globs, options = { debug: true, external: true }) => {
    try {
        const stdlib = (0, createVirtualFileSystem_1.createVirtualFileSystem)("@stdlib", stdlib_1.default);
        const contracts = globSync(globs, { cwd: folder });
        const projects = contracts.map((contractPath) => {
            const contractOptions = structuredClone(options);
            return {
                name: (0, path_1.basename)(contractPath, (0, path_1.extname)(contractPath)),
                path: contractPath,
                output: (0, path_1.join)((0, path_1.dirname)(contractPath), "output"),
                options: contractOptions,
            };
        });
        const project = (0, createNodeFileSystem_1.createNodeFileSystem)(folder, false);
        const compileResult = await (0, tact_1.run)({
            config: { projects },
            logger: new logger_1.Logger(logger_1.LogLevel.INFO),
            project,
            stdlib,
        });
        if (!compileResult.ok) {
            throw new Error("Tact projects compilation failed");
        }
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
exports.allInFolder = allInFolder;
const runFuncBuild = async (folder, globs) => {
    const stdlib = (0, createVirtualFileSystem_1.createVirtualFileSystem)("@stdlib", stdlib_1.default);
    const contractsPaths = globSync(globs, { cwd: folder });
    const project = (0, createNodeFileSystem_1.createNodeFileSystem)(folder, false);
    const contracts = contractsPaths.map((contractPath) => {
        const name = (0, path_1.basename)(contractPath, (0, path_1.extname)(contractPath));
        return {
            name,
            path: contractPath,
            output: (0, filePath_1.posixNormalize)(project.resolve((0, path_1.dirname)(contractPath), "../output/", `${name}.boc`)),
        };
    });
    const logger = new logger_1.Logger();
    const importRegex = /#include\s+"([^"]+)"/g;
    const isContractRegex = /\(\)\s+recv_internal/g;
    const compileFuncContract = async (contractInfo) => {
        const stdlibPath = stdlib.resolve("std/stdlib.fc");
        const stdlibCode = stdlib.readFile(stdlibPath).toString();
        const stdlibExPath = stdlib.resolve("std/stdlib_ex.fc");
        const stdlibExCode = stdlib.readFile(stdlibExPath).toString();
        // we need to regex match the imports and add them to sources
        // statements like #include "params.fc";
        const contractCode = project
            .readFile(project.resolve(contractInfo.path))
            .toString();
        // skip if no recv_internal
        if (!isContractRegex.test(contractCode)) {
            return;
        }
        logger.info(`💼 Compiling FunC contract ${contractInfo.name}...`);
        const includePaths = [];
        for (const [, include] of contractCode.matchAll(importRegex)) {
            if (typeof include === "undefined") {
                continue;
            }
            const includePath = project.resolve((0, path_1.dirname)(contractInfo.path), include);
            includePaths.push({
                path: (0, filePath_1.posixNormalize)(includePath),
                content: project.readFile(includePath).toString(),
            });
        }
        const funcArgs = {
            entries: [
                stdlibPath,
                stdlibExPath,
                (0, filePath_1.posixNormalize)(project.resolve(contractInfo.path)),
            ],
            sources: [
                {
                    path: stdlibPath,
                    content: stdlibCode,
                },
                {
                    path: stdlibExPath,
                    content: stdlibExCode,
                },
                ...includePaths,
                {
                    path: (0, filePath_1.posixNormalize)(project.resolve(contractInfo.path)),
                    content: project
                        .readFile(project.resolve(contractInfo.path))
                        .toString(),
                },
            ],
            logger,
        };
        const compilationResult = await (0, funcCompile_1.funcCompile)(funcArgs);
        if (!compilationResult.ok) {
            logger.error(compilationResult.log);
            return;
        }
        project.writeFile(project.resolve(contractInfo.output), compilationResult.output);
    };
    for (const contractInfo of contracts) {
        try {
            await compileFuncContract(contractInfo);
        }
        catch (e) {
            logger.error("FunC compiler crashed");
            logger.error(e);
            continue;
        }
    }
};
const allInFolderFunc = async (folder, globs) => {
    try {
        await runFuncBuild(folder, globs);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
exports.allInFolderFunc = allInFolderFunc;
