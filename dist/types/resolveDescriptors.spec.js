"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("../context/context");
const resolveDescriptors_1 = require("./resolveDescriptors");
const resolveSignatures_1 = require("./resolveSignatures");
const loadCases_1 = require("../utils/loadCases");
const store_1 = require("../context/store");
const features_1 = require("../config/features");
const grammar_1 = require("../grammar");
const ast_helpers_1 = require("../ast/ast-helpers");
const src_info_1 = require("../grammar/src-info");
const grammar_2 = require("../grammar/grammar");
expect.addSnapshotSerializer({
    test: (src) => (0, src_info_1.isSrcInfo)(src),
    print: (src) => src.contents,
});
describe("resolveDescriptors", () => {
    for (const r of (0, loadCases_1.loadCases)(__dirname + "/test/")) {
        it("should resolve descriptors for " + r.name, () => {
            const Ast = (0, ast_helpers_1.getAstFactory)();
            let ctx = (0, store_1.openContext)(new context_1.CompilerContext(), [{ code: r.code, path: "<unknown>", origin: "user" }], [], (0, grammar_1.getParser)(Ast, grammar_2.defaultParser));
            ctx = (0, features_1.featureEnable)(ctx, "external");
            ctx = (0, resolveDescriptors_1.resolveDescriptors)(ctx, Ast);
            ctx = (0, resolveSignatures_1.resolveSignatures)(ctx, Ast);
            expect((0, resolveDescriptors_1.getAllTypes)(ctx)).toMatchSnapshot();
            expect((0, resolveDescriptors_1.getAllStaticFunctions)(ctx)).toMatchSnapshot();
        });
    }
    for (const r of (0, loadCases_1.loadCases)(__dirname + "/test-failed/")) {
        it("should fail descriptors for " + r.name, () => {
            const Ast = (0, ast_helpers_1.getAstFactory)();
            let ctx = (0, store_1.openContext)(new context_1.CompilerContext(), [{ code: r.code, path: "<unknown>", origin: "user" }], [], (0, grammar_1.getParser)(Ast, grammar_2.defaultParser));
            ctx = (0, features_1.featureEnable)(ctx, "external");
            expect(() => {
                ctx = (0, resolveDescriptors_1.resolveDescriptors)(ctx, Ast);
                ctx = (0, resolveSignatures_1.resolveSignatures)(ctx, Ast);
            }).toThrowErrorMatchingSnapshot();
        });
    }
});
