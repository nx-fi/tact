"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fast_check_1 = __importDefault(require("fast-check"));
const grammar_1 = require("../grammar");
const ast_helpers_1 = require("../ast/ast-helpers");
const random_infra_1 = require("./random.infra");
const ast_printer_1 = require("./ast-printer");
describe("Pretty Print Expressions", () => {
    const maxDepth = 4;
    const parser = (0, grammar_1.getParser)((0, ast_helpers_1.getAstFactory)(), "new");
    it(`should parse AstExpression`, () => {
        fast_check_1.default.assert(fast_check_1.default.property((0, random_infra_1.randomAstExpression)(maxDepth), (generatedAst) => {
            const prettyBefore = (0, ast_printer_1.prettyPrint)(generatedAst);
            const parsedAst = parser.parseExpression(prettyBefore);
            const prettyAfter = (0, ast_printer_1.prettyPrint)(parsedAst);
            expect(prettyBefore).toBe(prettyAfter);
            const actual = (0, ast_helpers_1.eqExpressions)(generatedAst, parsedAst);
            if (!actual) {
                (0, random_infra_1.diffAstObjects)(generatedAst, parsedAst, prettyBefore, prettyAfter);
            }
            expect(actual).toBe(true);
        }), { seed: 1, numRuns: 5000 });
    });
});
