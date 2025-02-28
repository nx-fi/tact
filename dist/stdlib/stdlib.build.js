"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const glob_1 = __importDefault(require("glob"));
const filePath_1 = require("../utils/filePath");
const path_2 = require("./path");
const libFiles = (0, path_1.join)(__dirname, "stdlib", "**", "*.@(tact|fc)");
const targetPath = (0, path_1.join)(__dirname, "stdlib.ts");
const chunk = (s, chunkSize) => {
    const result = [];
    for (let offset = 0; offset < s.length; offset += chunkSize) {
        result.push(s.slice(offset, offset + chunkSize));
    }
    return result;
};
const listFiles = (dir) => {
    const paths = glob_1.default.sync(dir, { windowsPathsNoEscape: true });
    const prefix = (0, filePath_1.posixNormalize)(path_2.stdlibPath);
    return paths.map((path) => {
        const relativePath = (0, filePath_1.posixNormalize)((0, path_1.relative)(prefix, path));
        if (!relativePath.match(/^[-./_a-z0-9]+$/)) {
            console.error(`Standard library has file with invalid characters: ${path}`);
            process.exit(30);
        }
        return {
            absolute: path,
            relative: relativePath,
        };
    });
};
const lines = [
    "const files: Record<string, string> = {};\n",
    ...listFiles(libFiles).map(({ absolute, relative }) => {
        const chunks = chunk(fs_1.default.readFileSync(absolute).toString("base64"), 128);
        const chunkedBase64 = chunks
            .map((chunk) => `    "${chunk}"`)
            .join(" +\n");
        return `files["${relative}"] =\n${chunkedBase64};\n`;
    }),
    "export default files;\n",
];
fs_1.default.writeFileSync(targetPath, lines.join(""));
