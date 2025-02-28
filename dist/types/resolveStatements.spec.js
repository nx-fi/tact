"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolveExpression_1 = require("./resolveExpression");
const resolveDescriptors_1 = require("./resolveDescriptors");
const loadCases_1 = require("../utils/loadCases");
const store_1 = require("../context/store");
const resolveStatements_1 = require("./resolveStatements");
const context_1 = require("../context/context");
const features_1 = require("../config/features");
const grammar_1 = require("../grammar");
const ast_helpers_1 = require("../ast/ast-helpers");
const grammar_2 = require("../grammar/grammar");
describe("resolveStatements", () => {
    for (const r of (0, loadCases_1.loadCases)(__dirname + "/stmts/")) {
        it("should resolve statements for " + r.name, () => {
            const Ast = (0, ast_helpers_1.getAstFactory)();
            let ctx = (0, store_1.openContext)(new context_1.CompilerContext(), [{ code: r.code, path: "<unknown>", origin: "user" }], [], (0, grammar_1.getParser)(Ast, grammar_2.defaultParser));
            ctx = (0, features_1.featureEnable)(ctx, "external");
            ctx = (0, resolveDescriptors_1.resolveDescriptors)(ctx, Ast);
            ctx = (0, resolveStatements_1.resolveStatements)(ctx, Ast);
            expect((0, resolveExpression_1.getAllExpressionTypes)(ctx)).toMatchSnapshot();
        });
    }
    for (const r of (0, loadCases_1.loadCases)(__dirname + "/stmts-failed/")) {
        it("should fail statements for " + r.name, () => {
            const Ast = (0, ast_helpers_1.getAstFactory)();
            let ctx = (0, store_1.openContext)(new context_1.CompilerContext(), [{ code: r.code, path: "<unknown>", origin: "user" }], [], (0, grammar_1.getParser)(Ast, grammar_2.defaultParser));
            ctx = (0, features_1.featureEnable)(ctx, "external");
            ctx = (0, resolveDescriptors_1.resolveDescriptors)(ctx, Ast);
            expect(() => (0, resolveStatements_1.resolveStatements)(ctx, Ast)).toThrowErrorMatchingSnapshot();
        });
    }
});
