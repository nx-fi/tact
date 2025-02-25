"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ast_helpers_1 = require("../../ast/ast-helpers");
const resolveDescriptors_1 = require("../../types/resolveDescriptors");
const Writer_1 = require("../Writer");
const resolveFuncType_1 = require("./resolveFuncType");
const store_1 = require("../../context/store");
const context_1 = require("../../context/context");
const grammar_1 = require("../../grammar");
const grammar_2 = require("../../grammar/grammar");
const primitiveCode = `
primitive Int;
primitive Bool;
primitive Builder;
primitive Cell;
primitive Slice;

trait BaseTrait {
    
}

struct Struct1 {
    a1: Int;
    a2: Int;
}

struct Struct2 {
    b1: Int;
}

contract Contract1 {
    c: Int;
    c2: Int;

    init() {
        
    }
}

contract Contract2 {
    d: Int;
    e: Struct1;

    init() {

    }
}
`;
describe("resolveFuncType", () => {
    it("should process primitive types", () => {
        const ast = (0, ast_helpers_1.getAstFactory)();
        let ctx = (0, store_1.openContext)(new context_1.CompilerContext(), [{ code: primitiveCode, path: "<unknown>", origin: "user" }], [], (0, grammar_1.getParser)(ast, grammar_2.defaultParser));
        ctx = (0, resolveDescriptors_1.resolveDescriptors)(ctx, ast);
        const wCtx = new Writer_1.WriterContext(ctx, "Contract1");
        expect((0, resolveFuncType_1.resolveFuncType)({ kind: "ref", name: "Int", optional: false }, wCtx)).toBe("int");
        expect((0, resolveFuncType_1.resolveFuncType)({ kind: "ref", name: "Bool", optional: false }, wCtx)).toBe("int");
        expect((0, resolveFuncType_1.resolveFuncType)({ kind: "ref", name: "Cell", optional: false }, wCtx)).toBe("cell");
        expect((0, resolveFuncType_1.resolveFuncType)({ kind: "ref", name: "Slice", optional: false }, wCtx)).toBe("slice");
        expect((0, resolveFuncType_1.resolveFuncType)({ kind: "ref", name: "Builder", optional: false }, wCtx)).toBe("builder");
        expect((0, resolveFuncType_1.resolveFuncType)({ kind: "ref", name: "Int", optional: true }, wCtx)).toBe("int");
        expect((0, resolveFuncType_1.resolveFuncType)({ kind: "ref", name: "Bool", optional: true }, wCtx)).toBe("int");
        expect((0, resolveFuncType_1.resolveFuncType)({ kind: "ref", name: "Cell", optional: true }, wCtx)).toBe("cell");
        expect((0, resolveFuncType_1.resolveFuncType)({ kind: "ref", name: "Slice", optional: true }, wCtx)).toBe("slice");
        expect((0, resolveFuncType_1.resolveFuncType)({ kind: "ref", name: "Builder", optional: true }, wCtx)).toBe("builder");
    });
    it("should process contract and struct types", () => {
        const ast = (0, ast_helpers_1.getAstFactory)();
        let ctx = (0, store_1.openContext)(new context_1.CompilerContext(), [{ code: primitiveCode, path: "<unknown>", origin: "user" }], [], (0, grammar_1.getParser)(ast, grammar_2.defaultParser));
        ctx = (0, resolveDescriptors_1.resolveDescriptors)(ctx, ast);
        const wCtx = new Writer_1.WriterContext(ctx, "Contract1");
        expect((0, resolveFuncType_1.resolveFuncType)({ kind: "ref", name: "Struct1", optional: false }, wCtx)).toBe("(int, int)");
        expect((0, resolveFuncType_1.resolveFuncType)({ kind: "ref", name: "Struct2", optional: false }, wCtx)).toBe("(int)");
        expect((0, resolveFuncType_1.resolveFuncType)({ kind: "ref", name: "Contract1", optional: false }, wCtx)).toBe("(int, int)");
        expect((0, resolveFuncType_1.resolveFuncType)({ kind: "ref", name: "Contract2", optional: false }, wCtx)).toBe("(int, (int, int))");
        expect((0, resolveFuncType_1.resolveFuncType)({ kind: "ref", name: "Struct1", optional: true }, wCtx)).toBe("tuple");
        expect((0, resolveFuncType_1.resolveFuncType)({ kind: "ref", name: "Struct2", optional: true }, wCtx)).toBe("tuple");
        expect((0, resolveFuncType_1.resolveFuncType)({ kind: "ref", name: "Contract1", optional: true }, wCtx)).toBe("tuple");
        expect((0, resolveFuncType_1.resolveFuncType)({ kind: "ref", name: "Contract2", optional: true }, wCtx)).toBe("tuple");
    });
});
