"use strict";
//type Test = { expr: string; isValue: boolean };
Object.defineProperty(exports, "__esModule", { value: true });
const ast_helpers_1 = require("../../ast/ast-helpers");
const __1 = require("../");
const grammar_1 = require("../grammar");
const valueExpressions = ["1", "true", "false", "null"];
const notValueExpressions = [
    "g",
    // Raw strings are not literals: they need to go through the interpreter to get transformed into simplified strings, which are literals.
    '"one"',
    // Even if these three struct instances have literal fields, raw struct instances are not literals because they need to go through
    // the interpreter to get transformed into struct values.
    "Test {f1: 0, f2: true}",
    "Test {f1: 0, f2: true, f3: null}",
    "Test {f1: Test2 {c:0}, f2: true}",
    "Test {f1: 0, f2: b}",
    "Test {f1: a, f2: true}",
    "f(1)",
    "f(1,4)",
    "s.f(1,4)",
    "+4",
    "-4",
    "!true",
    "g!!",
    "~6",
    "0 + 1",
    "0 - 1",
    "0 * 2",
    "1 / 3",
    "2 % 4",
    "10 >> 2",
    "10 << 2",
    "10 & 4",
    "10 | 4",
    "10 ^ 4",
    "10 != 4",
    "10 > 3",
    "10 < 3",
    "10 >= 5",
    "10 <= 2",
    "10 == 7",
    "true && false",
    "true || false",
    "true ? 0 : 1",
    "s.a",
    "s.a.a",
    "Test {a: 0, b: 1}.a",
    "initOf a(0,1,null)",
];
function testIsValue(expr, testResult) {
    const ast = (0, ast_helpers_1.getAstFactory)();
    const { parseExpression } = (0, __1.getParser)(ast, grammar_1.defaultParser);
    expect((0, ast_helpers_1.isLiteral)(parseExpression(expr))).toBe(testResult);
}
describe("expression-is-value", () => {
    valueExpressions.forEach((test) => {
        it(`should correctly determine that '${test}' is a value expression.`, () => {
            testIsValue(test, true);
        });
    });
    notValueExpressions.forEach((test) => {
        it(`should correctly determine that '${test}' is NOT a value expression.`, () => {
            testIsValue(test, false);
        });
    });
});
