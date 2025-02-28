"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolveImports_1 = require("./resolveImports");
const createNodeFileSystem_1 = require("../vfs/createNodeFileSystem");
const path_1 = __importDefault(require("path"));
const grammar_1 = require("../grammar");
const ast_helpers_1 = require("../ast/ast-helpers");
const grammar_2 = require("../grammar/grammar");
describe("resolveImports", () => {
    it("should resolve imports", () => {
        const project = (0, createNodeFileSystem_1.createNodeFileSystem)(path_1.default.resolve(__dirname, "__testdata", "project"));
        const stdlib = (0, createNodeFileSystem_1.createNodeFileSystem)(path_1.default.resolve(__dirname, "__testdata", "stdlib"));
        const ast = (0, ast_helpers_1.getAstFactory)();
        const resolved = (0, resolveImports_1.resolveImports)({
            project,
            stdlib,
            entrypoint: "./main.tact",
            parser: (0, grammar_1.getParser)(ast, grammar_2.defaultParser),
        });
        expect(resolved).toMatchObject({
            func: [
                {
                    code: "",
                    path: path_1.default.resolve(__dirname, "__testdata", "stdlib", "std", "stdlib2.fc"),
                },
            ],
            tact: [
                {
                    code: 'import "./stdlib2.fc";',
                    path: path_1.default.resolve(__dirname, "__testdata", "stdlib", "std", "stdlib.tact"),
                },
                {
                    code: "",
                    path: path_1.default.resolve(__dirname, "__testdata", "project", "imported.tact"),
                },
                {
                    code: 'import "../imported_from_subfolder";',
                    path: path_1.default.resolve(__dirname, "__testdata", "project", "subfolder", "import_from_parent.tact"),
                },
                {
                    code: "",
                    path: path_1.default.resolve(__dirname, "__testdata", "project", "imported_from_subfolder.tact"),
                },
                {
                    code: 'import "./imported"; import "./subfolder/import_from_parent";',
                    path: path_1.default.resolve(__dirname, "__testdata", "project", "main.tact"),
                },
            ],
        });
    });
});
