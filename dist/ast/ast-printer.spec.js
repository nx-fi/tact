"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const ast_printer_1 = require("./ast-printer");
const grammar_1 = require("../grammar");
const path_1 = require("path");
const util_1 = require("../test/util");
const assert = __importStar(require("assert"));
const json_bigint_1 = __importDefault(require("json-bigint"));
const ast_helpers_1 = require("./ast-helpers");
const grammar_2 = require("../grammar/grammar");
describe("formatter", () => {
    it.each(fs_1.default.readdirSync(util_1.CONTRACTS_DIR, { withFileTypes: true }))("shouldn't change proper formatting", (dentry) => {
        if (!dentry.isFile()) {
            return;
        }
        const Ast = (0, ast_helpers_1.getAstFactory)();
        const { parse } = (0, grammar_1.getParser)(Ast, grammar_2.defaultParser);
        const path = (0, path_1.join)(util_1.CONTRACTS_DIR, dentry.name);
        const code = (0, util_1.trimTrailingCR)(fs_1.default.readFileSync(path, "utf-8"));
        const ast = parse({ code, path, origin: "user" });
        const formatted = (0, util_1.trimTrailingCR)((0, ast_printer_1.prettyPrint)(ast));
        assert.strictEqual(formatted, code, `The formatted AST comparison failed for ${dentry.name}`);
    });
    const outputDir = (0, path_1.join)(util_1.CONTRACTS_DIR, "pretty-printer-output");
    fs_1.default.mkdirSync(outputDir, { recursive: true });
    it.each(fs_1.default.readdirSync(util_1.CONTRACTS_DIR, { withFileTypes: true }))("shouldn't change AST", (dentry) => {
        if (!dentry.isFile()) {
            return;
        }
        const Ast = (0, ast_helpers_1.getAstFactory)();
        const { parse } = (0, grammar_1.getParser)(Ast, grammar_2.defaultParser);
        const path = (0, path_1.join)(util_1.CONTRACTS_DIR, dentry.name);
        const code = fs_1.default.readFileSync(path, "utf-8");
        const ast = parse({ code, path, origin: "user" });
        //TODO: change for proper recursive removal
        const astStr = json_bigint_1.default.stringify(ast).replace(/"id":[0-9]+,/g, "");
        const formattedCode = (0, ast_printer_1.prettyPrint)(ast);
        const formattedPath = (0, path_1.join)(outputDir, dentry.name);
        fs_1.default.openSync(formattedPath, "w");
        fs_1.default.writeFileSync(formattedPath, formattedCode, { flag: "w" });
        const astFormatted = parse({
            code: formattedCode,
            path: formattedPath,
            origin: "user",
        });
        //TODO: change for proper recursive removal
        const astFormattedStr = json_bigint_1.default.stringify(astFormatted).replace(/"id":[0-9]+,/g, "");
        expect(astFormattedStr).toEqual(astStr);
    });
});
