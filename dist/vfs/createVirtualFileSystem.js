"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVirtualFileSystem = createVirtualFileSystem;
const path_normalize_1 = __importDefault(require("path-normalize"));
function createVirtualFileSystem(root, fs, readonly = true) {
    let normalizedRoot = (0, path_normalize_1.default)(root);
    if (!normalizedRoot.endsWith("/")) {
        normalizedRoot += "/";
    }
    return {
        root: normalizedRoot,
        exists(filePath) {
            if (!filePath.startsWith(normalizedRoot)) {
                throw new Error(`Path '${filePath}' is outside of the root directory '${normalizedRoot}'`);
            }
            const name = filePath.slice(normalizedRoot.length);
            return typeof fs[name] === "string";
        },
        resolve(...filePath) {
            return (0, path_normalize_1.default)([normalizedRoot, ...filePath].join("/"));
        },
        readFile(filePath) {
            if (!filePath.startsWith(normalizedRoot)) {
                throw new Error(`Path '${filePath}' is outside of the root directory '${normalizedRoot}'`);
            }
            const name = filePath.slice(normalizedRoot.length);
            const content = fs[name];
            if (typeof content !== "string") {
                throw Error(`File ${name} not found at ${filePath}`);
            }
            else {
                return Buffer.from(content, "base64");
            }
        },
        writeFile(filePath, content) {
            if (readonly) {
                throw new Error("File system is readonly");
            }
            if (!filePath.startsWith(normalizedRoot)) {
                throw new Error(`Path '${filePath}' is outside of the root directory '${normalizedRoot}'`);
            }
            const name = filePath.slice(normalizedRoot.length);
            fs[name] =
                typeof content === "string"
                    ? Buffer.from(content).toString("base64")
                    : content.toString("base64");
        },
    };
}
