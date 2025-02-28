"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.posixNormalize = posixNormalize;
const node_path_1 = __importDefault(require("node:path"));
function posixNormalize(path) {
    if (typeof global === "object" &&
        typeof global.process === "object" &&
        typeof global.process.versions === "object" &&
        global.process.versions.node) {
        return path.split(node_path_1.default.sep).join(node_path_1.default.posix.sep);
    }
    return path;
}
