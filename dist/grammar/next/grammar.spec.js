"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ast_helpers_1 = require("../../ast/ast-helpers");
const loadCases_1 = require("../../utils/loadCases");
const grammar_1 = require("../grammar");
const src_info_1 = require("../src-info");
expect.addSnapshotSerializer({
    test: (src) => (0, src_info_1.isSrcInfo)(src),
    print: (src) => src.contents,
});
describe("grammar", () => {
    const shouldParsePaths = [__dirname + "/../test/", __dirname + "/test/"];
    for (const path of shouldParsePaths) {
        for (const r of (0, loadCases_1.loadCases)(path)) {
            it("should parse " + r.name, () => {
                const ast = (0, ast_helpers_1.getAstFactory)();
                const { parse } = (0, grammar_1.getParser)(ast, "new");
                expect(parse({ code: r.code, path: "<unknown>", origin: "user" })).toMatchSnapshot();
            });
        }
    }
    for (const r of (0, loadCases_1.loadCases)(__dirname + "/../test-failed/")) {
        it("should fail " + r.name, () => {
            const ast = (0, ast_helpers_1.getAstFactory)();
            const { parse } = (0, grammar_1.getParser)(ast, "new");
            expect(() => parse({ code: r.code, path: "<unknown>", origin: "user" })).toThrowErrorMatchingSnapshot();
        });
    }
});
describe("parse imports", () => {
    const parser = (0, grammar_1.getParser)((0, ast_helpers_1.getAstFactory)(), "new");
    const parse = (code) => {
        return parser.parse({
            code,
            origin: "user",
            path: "test/test.tact",
        });
    };
    it("should reject non-relative imports", () => {
        expect(() => parse('import "some_name";')).toThrow();
    });
    it("should reject folder imports", () => {
        expect(() => parse('import "./some_name/";')).toThrow();
    });
    it("should reject windows imports", () => {
        expect(() => parse('import ".\\some_name";')).toThrow();
    });
    it("should parse relative imports", () => {
        expect(parse('import "./import";')).toMatchObject({
            imports: [
                {
                    importPath: {
                        type: "relative",
                        language: "tact",
                        path: {
                            segments: ["import.tact"],
                            stepsUp: 0,
                        },
                    },
                },
            ],
        });
    });
    it("should parse step-up imports", () => {
        expect(parse('import "../import";')).toMatchObject({
            imports: [
                {
                    importPath: {
                        type: "relative",
                        language: "tact",
                        path: {
                            segments: ["import.tact"],
                            stepsUp: 1,
                        },
                    },
                },
            ],
        });
    });
    it("should parse deep imports", () => {
        expect(parse('import "./import/second";')).toMatchObject({
            imports: [
                {
                    importPath: {
                        type: "relative",
                        language: "tact",
                        path: {
                            segments: ["import", "second.tact"],
                            stepsUp: 0,
                        },
                    },
                },
            ],
        });
    });
    it("should not add .tact second time", () => {
        expect(parse('import "./import.tact";')).toMatchObject({
            imports: [
                {
                    importPath: {
                        type: "relative",
                        language: "tact",
                        path: {
                            segments: ["import.tact"],
                            stepsUp: 0,
                        },
                    },
                },
            ],
        });
    });
    it("should detect .fc imports", () => {
        expect(parse('import "./import.fc";')).toMatchObject({
            imports: [
                {
                    importPath: {
                        type: "relative",
                        language: "func",
                        path: {
                            segments: ["import.fc"],
                            stepsUp: 0,
                        },
                    },
                },
            ],
        });
    });
    it("should detect .func imports", () => {
        expect(parse('import "./import.func";')).toMatchObject({
            imports: [
                {
                    importPath: {
                        type: "relative",
                        language: "func",
                        path: {
                            segments: ["import.func"],
                            stepsUp: 0,
                        },
                    },
                },
            ],
        });
    });
    it("should parse absolute stdlib imports", () => {
        expect(parse('import "@stdlib/foo";')).toMatchObject({
            imports: [
                {
                    importPath: {
                        type: "stdlib",
                        language: "tact",
                        path: {
                            segments: ["foo.tact"],
                            stepsUp: 0,
                        },
                    },
                },
            ],
        });
    });
    it("should parse relative stdlib imports", () => {
        expect(parse('import "@stdlib/foo/../bar";')).toMatchObject({
            imports: [
                {
                    importPath: {
                        type: "stdlib",
                        language: "tact",
                        path: {
                            segments: ["bar.tact"],
                            stepsUp: 0,
                        },
                    },
                },
            ],
        });
    });
    it("should parse stdlib tact imports with extension", () => {
        expect(parse('import "@stdlib/foo.tact";')).toMatchObject({
            imports: [
                {
                    importPath: {
                        type: "stdlib",
                        language: "tact",
                        path: {
                            segments: ["foo.tact"],
                            stepsUp: 0,
                        },
                    },
                },
            ],
        });
    });
    it("should parse stdlib func imports with extension", () => {
        expect(parse('import "@stdlib/foo.fc";')).toMatchObject({
            imports: [
                {
                    importPath: {
                        type: "stdlib",
                        language: "func",
                        path: {
                            segments: ["foo.fc"],
                            stepsUp: 0,
                        },
                    },
                },
            ],
        });
    });
    it("should reject stdlib root import", () => {
        expect(() => parse('import "@stdlib";')).toThrow();
    });
    it("should reject stdlib root import as folder", () => {
        expect(() => parse('import "@stdlib/";')).toThrow();
    });
    it("should reject stdlib folder import", () => {
        expect(() => parse('import "@stdlib/foo/";')).toThrow();
    });
    it("should reject stdlib import up from stdlib root", () => {
        expect(() => parse('import "@stdlib/../foo";')).toThrow();
    });
});
