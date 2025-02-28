"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ast_helpers_1 = require("../../ast/ast-helpers");
const context_1 = require("../../context/context");
const store_1 = require("../../context/store");
const grammar_1 = require("../../grammar");
const grammar_2 = require("../../grammar/grammar");
const resolveDescriptors_1 = require("../../types/resolveDescriptors");
const resolveExpression_1 = require("../../types/resolveExpression");
const resolveSignatures_1 = require("../../types/resolveSignatures");
const resolveStatements_1 = require("../../types/resolveStatements");
const loadCases_1 = require("../../utils/loadCases");
describe("interpreter-evaluation", () => {
    for (const r of (0, loadCases_1.loadCases)(__dirname + "/success/")) {
        it(`${r.name} should pass compilation`, () => {
            const Ast = (0, ast_helpers_1.getAstFactory)();
            let ctx = (0, store_1.openContext)(new context_1.CompilerContext(), [{ code: r.code, path: "<unknown>", origin: "user" }], [], (0, grammar_1.getParser)(Ast, grammar_2.defaultParser));
            ctx = (0, resolveDescriptors_1.resolveDescriptors)(ctx, Ast);
            ctx = (0, resolveStatements_1.resolveStatements)(ctx, Ast);
            ctx = (0, resolveSignatures_1.resolveSignatures)(ctx, Ast);
            expect((0, resolveExpression_1.getAllExpressionTypes)(ctx)).toMatchSnapshot();
        });
    }
});
