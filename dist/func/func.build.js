"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sourcePath = path_1.default.resolve(__dirname, "funcfiftlib.wasm");
const targetPath = path_1.default.resolve(__dirname, "funcfiftlib.wasm.js");
const wasmBase64 = fs_1.default.readFileSync(sourcePath).toString("base64");
const wasmBase64js = `module.exports = { FuncFiftLibWasm: '${wasmBase64}' };`;
fs_1.default.writeFileSync(targetPath, wasmBase64js);
