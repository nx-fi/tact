"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCodegen = exports.runCommand = void 0;
const child_process_1 = require("child_process");
const path_1 = require("path");
const promises_1 = require("fs/promises");
const runCommand = (command, cwd = process.cwd()) => {
    const thread = (0, child_process_1.exec)(command, { cwd });
    return new Promise((resolve, reject) => {
        const chunksOut = [];
        const chunksErr = [];
        thread.stdout?.on("data", (chunk) => {
            chunksOut.push(chunk);
        });
        thread.stderr?.on("data", (chunk) => {
            chunksErr.push(chunk);
        });
        thread.on("error", (code) => {
            reject(code);
        });
        thread.on("exit", (code, signal) => {
            if (code !== null) {
                resolve({
                    kind: "exited",
                    code,
                    stdout: chunksOut.join(""),
                    stderr: chunksErr.join(""),
                });
            }
            else if (signal !== null) {
                resolve({ kind: "signaled", signal });
            }
            else {
                reject(new Error("Node.js bug"));
            }
        });
    });
};
exports.runCommand = runCommand;
const makeCodegen = (outputDir) => {
    const contract = async (name, code) => {
        await (0, promises_1.mkdir)(outputDir, { recursive: true });
        const fullPath = (0, path_1.join)(outputDir, `${name}.tact`);
        await (0, promises_1.writeFile)(fullPath, code);
        return fullPath;
    };
    const config = async (name, code, partialConfig) => {
        await (0, promises_1.mkdir)(outputDir, { recursive: true });
        const outDir = outputDir;
        await (0, promises_1.writeFile)((0, path_1.join)(outDir, `${name}.tact`), code);
        const config = {
            projects: [
                {
                    name,
                    path: `./${name}.tact`,
                    output: `./${name}`,
                    ...partialConfig,
                },
            ],
        };
        const configPath = (0, path_1.join)(outDir, `${name}.config.json`);
        await (0, promises_1.writeFile)(configPath, JSON.stringify(config, null, 4));
        return {
            config: configPath,
            outputPath: (ext) => (0, path_1.join)(outDir, name, `${name}_Test.${ext}`),
        };
    };
    return { contract, config };
};
exports.makeCodegen = makeCodegen;
