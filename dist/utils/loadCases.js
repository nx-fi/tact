"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCases = loadCases;
const fs_1 = __importDefault(require("fs"));
function loadCases(src) {
    const recs = fs_1.default.readdirSync(src);
    const res = [];
    for (const r of recs) {
        if (r.endsWith(".tact")) {
            res.push({
                name: r.slice(0, r.length - ".tact".length),
                code: fs_1.default.readFileSync(src + r, "utf8"),
            });
        }
    }
    res.sort((a, b) => a.name.localeCompare(b.name));
    return res;
}
