"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("../../context/context");
const resolveAllocation_1 = require("../../storage/resolveAllocation");
const resolveDescriptors_1 = require("../../types/resolveDescriptors");
const Writer_1 = require("../Writer");
const writeSerialization_1 = require("./writeSerialization");
const writeStdlib_1 = require("./writeStdlib");
const store_1 = require("../../context/store");
const writeAccessors_1 = require("./writeAccessors");
const grammar_1 = require("../../grammar");
const ast_helpers_1 = require("../../ast/ast-helpers");
const grammar_2 = require("../../grammar/grammar");
const code = `
primitive Int;
primitive Bool;
primitive Builder;
primitive Cell;
primitive Slice;
primitive Address;

struct A {
    a: Int;
    b: Int;
    c: Int?;
    d: Bool;
    e: Bool?;
    f: Int;
    g: Int;
}

struct B {
    a: Int;
    b: Int;
    c: Int?;
    d: Bool;
    e: Bool?;
    f: Int;
    g: Int;
}

struct C {
    a: Cell;
    b: Cell?;
    c: Slice?;
    d: Slice?;
    e: Bool;
    f: Int;
    g: Int;
    h: Address;
}
`;
describe("writeSerialization", () => {
    for (const s of ["A", "B", "C"]) {
        it("should write serializer for " + s, () => {
            const ast = (0, ast_helpers_1.getAstFactory)();
            let ctx = (0, store_1.openContext)(new context_1.CompilerContext(), [{ code, path: "<unknown>", origin: "user" }], [], (0, grammar_1.getParser)(ast, grammar_2.defaultParser));
            ctx = (0, resolveDescriptors_1.resolveDescriptors)(ctx, ast);
            ctx = (0, resolveAllocation_1.resolveAllocations)(ctx);
            const wCtx = new Writer_1.WriterContext(ctx, s);
            (0, writeStdlib_1.writeStdlib)(wCtx);
            (0, writeSerialization_1.writeSerializer)((0, resolveDescriptors_1.getType)(ctx, s).name, false, (0, resolveAllocation_1.getAllocation)(ctx, s), "user", wCtx);
            for (const t of (0, resolveDescriptors_1.getAllTypes)(ctx)) {
                if (t.kind === "contract" || t.kind === "struct") {
                    (0, writeAccessors_1.writeAccessors)(t, "user", wCtx);
                }
            }
            (0, writeSerialization_1.writeParser)((0, resolveDescriptors_1.getType)(ctx, s).name, false, "with-opcode", (0, resolveAllocation_1.getAllocation)(ctx, s), "user", wCtx);
            const extracted = wCtx.extract(true);
            expect(extracted).toMatchSnapshot();
        });
    }
});
