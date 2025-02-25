"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const resolveDescriptors_1 = require("../types/resolveDescriptors");
const resolveAllocation_1 = require("./resolveAllocation");
const store_1 = require("../context/store");
const resolveStatements_1 = require("../types/resolveStatements");
const context_1 = require("../context/context");
const resolveSignatures_1 = require("../types/resolveSignatures");
const path_1 = __importDefault(require("path"));
const grammar_1 = require("../grammar");
const ast_helpers_1 = require("../ast/ast-helpers");
const grammar_2 = require("../grammar/grammar");
const path_2 = require("../stdlib/path");
const primitivesPath = path_1.default.join(path_2.stdlibPath, "/std/internal/primitives.tact");
const stdlib = fs_1.default.readFileSync(primitivesPath, "utf-8");
const src = `

trait BaseTrait {
    
}

struct Point3 {
    a: Point;
    b: Point2;
}

struct Point {
    x: Int;
    y: Int;
}

struct Point2 {
    z: Point;
}

struct Deep {
    a: Int;
    b: Int;
    c: Int;
    d: Int;
    e: Int;
    f: Int;
    g: Int;
    h: Int;
    i: Int;
    j: Int;
    k: Int;
}

struct Deep2 {
    a: Deep;
    b: Deep;
    c: Deep;
}

contract Sample {
    v: Int = 0;
    init() {

    }
    fun main(a: Int, b: Int) {
    }
}
`;
describe("resolveAllocation", () => {
    it("should write program", () => {
        const ast = (0, ast_helpers_1.getAstFactory)();
        let ctx = (0, store_1.openContext)(new context_1.CompilerContext(), [
            { code: stdlib, path: primitivesPath, origin: "stdlib" },
            { code: src, path: "<unknown>", origin: "user" },
        ], [], (0, grammar_1.getParser)(ast, grammar_2.defaultParser));
        ctx = (0, resolveDescriptors_1.resolveDescriptors)(ctx, ast);
        ctx = (0, resolveSignatures_1.resolveSignatures)(ctx, ast);
        ctx = (0, resolveStatements_1.resolveStatements)(ctx, ast);
        ctx = (0, resolveAllocation_1.resolveAllocations)(ctx);
        expect((0, resolveAllocation_1.getAllocations)(ctx)).toMatchSnapshot();
    });
});
