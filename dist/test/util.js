"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTRACTS_DIR = void 0;
exports.trimTrailingCR = trimTrailingCR;
const path_1 = __importDefault(require("path"));
exports.CONTRACTS_DIR = path_1.default.join(__dirname, "contracts");
function trimTrailingCR(input) {
    return input.replace(/\n+$/, "");
}
