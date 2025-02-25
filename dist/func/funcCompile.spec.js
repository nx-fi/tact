"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("../context/logger");
const funcCompile_1 = require("./funcCompile");
const stdlib_1 = __importDefault(require("../stdlib/stdlib"));
describe("funcCompile", () => {
    it("should compile small contract", async () => {
        const source = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "__testdata__", "small.fc"), "utf8");
        const res = await (0, funcCompile_1.funcCompile)({
            entries: ["/stdlib.fc", "/small.fc"],
            sources: [
                {
                    path: "/stdlib.fc",
                    content: Buffer.from(stdlib_1.default["std/stdlib.fc"], "base64").toString(),
                },
                { path: "/small.fc", content: source },
            ],
            logger: new logger_1.Logger(),
        });
        expect(res.ok).toBe(true);
    });
});
