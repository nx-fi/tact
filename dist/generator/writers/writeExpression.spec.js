"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolveDescriptors_1 = require("../../types/resolveDescriptors");
const Writer_1 = require("../Writer");
const writeExpression_1 = require("./writeExpression");
const store_1 = require("../../context/store");
const resolveStatements_1 = require("../../types/resolveStatements");
const context_1 = require("../../context/context");
const grammar_1 = require("../../grammar");
const ast_helpers_1 = require("../../ast/ast-helpers");
const grammar_2 = require("../../grammar/grammar");
const code = `

primitive Int;
primitive Bool;
primitive Builder;
primitive Cell;
primitive Slice;

fun f1(a: Int): Int {
    return a;
}

struct A {
    a: Int;
    b: Int;
}

fun main() {
    let a: Int = 1;
    let b: Int = 2;
    let c: Int = a + b;
    let d: Int = a + b * c;
    let e: Int = a + b / c;
    let f: Bool = true;
    let g: Bool = false;
    let h: Bool = a > 1 || b < 2 && c == 3 || !(d != 4 && true && !false);
    let i: Int = f1(a);
    let j: A = A{a: 1, b: 2};
    let k: Int = j.a;
    let l: Int = A{a: 1, b}.b;
    let m: Int = -j.b + a;
    let n: Int = -j.b + a + (+b);
    let o: Int? = null;
    let p: Int? = o!! + 1;
    let q: Cell = j.toCell();
}
`;
const golden = [
    "1",
    "2",
    "($a + $b)",
    "($a + ($b * $c))",
    "($a + ($b / $c))",
    "true",
    "false",
    "( (( (($a > 1)) ? (true) : (( (($b < 2)) ? (($c == 3)) : (false) )) )) ? (true) : ((~ ( (( (($d != 4)) ? (true) : (false) )) ? (true) : (false) ))) )",
    "$global_f1($a)",
    "$A$_constructor_a_b(1, 2)",
    `$j'a`,
    "$A$_get_b($A$_constructor_a_b(1, $b))",
    `((- $j'b) + $a)`,
    `(((- $j'b) + $a) + (+ $b))`,
    "null()",
    "($o + 1)",
    `$A$_store_cell(($j'a, $j'b))`,
];
describe("writeExpression", () => {
    it("should write expression", () => {
        const ast = (0, ast_helpers_1.getAstFactory)();
        let ctx = (0, store_1.openContext)(new context_1.CompilerContext(), [{ code: code, path: "<unknown>", origin: "user" }], [], (0, grammar_1.getParser)(ast, grammar_2.defaultParser));
        ctx = (0, resolveDescriptors_1.resolveDescriptors)(ctx, ast);
        ctx = (0, resolveStatements_1.resolveStatements)(ctx, ast);
        const main = (0, resolveDescriptors_1.getStaticFunction)(ctx, "main");
        if (main.ast.kind !== "function_def") {
            throw Error("Unexpected function kind");
        }
        let i = 0;
        for (const s of main.ast.statements) {
            if (s.kind !== "statement_let") {
                throw Error("Unexpected statement kind");
            }
            const wCtx = new Writer_1.WriterContext(ctx, "Contract1");
            wCtx.fun("$main", () => {
                wCtx.body(() => {
                    expect((0, writeExpression_1.writeExpression)(s.expression, wCtx)).toBe(golden[i]);
                });
            });
            i++;
        }
    });
});
