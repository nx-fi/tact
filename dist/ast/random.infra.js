"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomAstExpression = randomAstExpression;
exports.diffAstObjects = diffAstObjects;
const fast_check_1 = __importDefault(require("fast-check"));
const src_info_1 = require("../grammar/src-info");
const diff_1 = require("diff");
const ast_constants_1 = require("./ast-constants");
/**
 * An array of reserved words that cannot be used as contract or variable names in tests.
 *
 * These words are reserved for use in the language and may cause errors
 * if attempted to be used as identifiers.
 *
 * @see src/grammar/next/grammar.gg
 */
const reservedWords = [
    "extend",
    "public",
    "fun",
    "let",
    "return",
    "receive",
    "native",
    "primitive",
    "null",
    "if",
    "else",
    "while",
    "repeat",
    "do",
    "until",
    "try",
    "catch",
    "foreach",
    "as",
    "map",
    "mutates",
    "extends",
    "external",
    "import",
    "with",
    "trait",
    "initOf",
    "override",
    "abstract",
    "virtual",
    "inline",
    "const",
    "__gen",
    "__tact",
];
function dummyAstNode(generator) {
    return generator.map((i) => ({
        ...i,
        id: 0,
        loc: src_info_1.dummySrcInfo,
    }));
}
function randomAstBoolean() {
    return dummyAstNode(fast_check_1.default.record({
        kind: fast_check_1.default.constant("boolean"),
        value: fast_check_1.default.boolean(),
    }));
}
function randomAstString() {
    const escapeString = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    return dummyAstNode(fast_check_1.default.record({
        kind: fast_check_1.default.constant("string"),
        value: fast_check_1.default.string().map((s) => escapeString(s)),
    }));
}
function randomAstNumber() {
    const values = [
        ...Array.from({ length: 10 }, (_, i) => [0n, BigInt(i)]).flat(),
        ...Array.from({ length: 256 }, (_, i) => 1n ** BigInt(i)),
    ];
    return dummyAstNode(fast_check_1.default.record({
        kind: fast_check_1.default.constant("number"),
        base: fast_check_1.default.constantFrom(2, 8, 10, 16),
        value: fast_check_1.default.oneof(...values.map((value) => fast_check_1.default.constant(value))),
    }));
}
function randomAstOpUnary(operand) {
    return dummyAstNode(fast_check_1.default.record({
        kind: fast_check_1.default.constant("op_unary"),
        op: fast_check_1.default.constantFrom(...ast_constants_1.astUnaryOperations),
        operand: operand,
    }));
}
function randomAstOpBinary(leftExpression, rightExpression) {
    return dummyAstNode(fast_check_1.default.record({
        kind: fast_check_1.default.constant("op_binary"),
        op: fast_check_1.default.constantFrom(...ast_constants_1.astBinaryOperations),
        left: leftExpression,
        right: rightExpression,
    }));
}
function randomAstConditional(conditionExpression, thenBranchExpression, elseBranchExpression) {
    return dummyAstNode(fast_check_1.default.record({
        kind: fast_check_1.default.constant("conditional"),
        condition: conditionExpression,
        thenBranch: thenBranchExpression,
        elseBranch: elseBranchExpression,
    }));
}
function randomAstId() {
    return dummyAstNode(fast_check_1.default.record({
        kind: fast_check_1.default.constant("id"),
        text: fast_check_1.default
            .stringMatching(/^[A-Za-z_][A-Za-z0-9_]*$/)
            .filter((i) => !reservedWords.includes(i) &&
            !i.startsWith("__gen") &&
            !i.startsWith("__tact")),
    }));
}
function randomAstCapitalizedId() {
    return dummyAstNode(fast_check_1.default.record({
        kind: fast_check_1.default.constant("id"),
        text: fast_check_1.default.stringMatching(/^[A-Z][A-Za-z0-9_]*$/),
    }));
}
function randomAstNull() {
    return dummyAstNode(fast_check_1.default.record({
        kind: fast_check_1.default.constant("null"),
    }));
}
function randomAstInitOf(expression) {
    return dummyAstNode(fast_check_1.default.record({
        kind: fast_check_1.default.constant("init_of"),
        contract: randomAstId(),
        args: fast_check_1.default.array(expression),
    }));
}
function randomAstCodeOf() {
    return dummyAstNode(fast_check_1.default.record({
        kind: fast_check_1.default.constant("code_of"),
        contract: randomAstId(),
    }));
}
function randomAstStaticCall(expression) {
    return dummyAstNode(fast_check_1.default.record({
        kind: fast_check_1.default.constant("static_call"),
        function: randomAstId(),
        args: fast_check_1.default.array(expression),
    }));
}
function randomAstStructFieldInitializer(expression) {
    return dummyAstNode(fast_check_1.default.record({
        kind: fast_check_1.default.constant("struct_field_initializer"),
        field: randomAstId(),
        initializer: expression,
    }));
}
function randomAstStructInstance(structFieldInitializer) {
    return dummyAstNode(fast_check_1.default.record({
        kind: fast_check_1.default.constant("struct_instance"),
        type: randomAstCapitalizedId(),
        args: fast_check_1.default.array(structFieldInitializer),
    }));
}
function randomAstFieldAccess(expression) {
    return dummyAstNode(fast_check_1.default.record({
        kind: fast_check_1.default.constant("field_access"),
        aggregate: expression,
        field: randomAstId(),
    }));
}
function randomAstMethodCall(selfExpression, argsExpression) {
    return dummyAstNode(fast_check_1.default.record({
        self: selfExpression,
        kind: fast_check_1.default.constant("method_call"),
        method: randomAstId(),
        args: fast_check_1.default.array(argsExpression),
    }));
}
function randomAstStructFieldValue(subLiteral) {
    return dummyAstNode(fast_check_1.default.record({
        kind: fast_check_1.default.constant("struct_field_value"),
        field: randomAstId(),
        initializer: subLiteral,
    }));
}
function randomAstStructValue(subLiteral) {
    return dummyAstNode(fast_check_1.default.record({
        kind: fast_check_1.default.constant("struct_value"),
        type: randomAstCapitalizedId(),
        args: fast_check_1.default.array(randomAstStructFieldValue(subLiteral)),
    }));
}
function randomAstLiteral(maxDepth) {
    return fast_check_1.default.memo((depth) => {
        if (depth <= 1) {
            return fast_check_1.default.oneof(randomAstNumber(), randomAstBoolean(), randomAstNull());
        }
        const subLiteral = () => randomAstLiteral(depth - 1);
        return fast_check_1.default.oneof(randomAstNumber(), randomAstBoolean(), randomAstNull(), 
        // Add Address, Cell, Slice
        // randomAstSimplifiedString(),
        // randomAstCommentValue(),
        randomAstStructValue(subLiteral()));
    })(maxDepth);
}
function randomAstExpression(maxDepth) {
    return fast_check_1.default.memo((depth) => {
        if (depth <= 1) {
            return fast_check_1.default.oneof(randomAstLiteral(depth - 1));
        }
        const subExpr = () => randomAstExpression(depth - 1);
        return fast_check_1.default
            .oneof(randomAstLiteral(maxDepth), randomAstMethodCall(subExpr(), subExpr()), randomAstFieldAccess(subExpr()), randomAstStaticCall(subExpr()), randomAstStructInstance(randomAstStructFieldInitializer(subExpr())), randomAstInitOf(subExpr()), randomAstCodeOf(), randomAstString(), randomAstOpUnary(subExpr()), randomAstOpBinary(subExpr(), subExpr()), randomAstConditional(subExpr(), subExpr(), subExpr()))
            .filter((i) => i.kind !== "struct_value");
    })(maxDepth);
}
function isRecord(value) {
    return (typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        Object.keys(value).every((key) => typeof key === "string"));
}
function sortObjectKeys(obj) {
    const sortedEntries = Object.entries(obj)
        .sort(([key1], [key2]) => key1.localeCompare(key2))
        .map(([key, value]) => ({
        [key]: isRecord(value) ? sortObjectKeys(value) : value,
    }));
    return Object.assign({}, ...sortedEntries);
}
function diffAstObjects(left, right, prettyBefore, prettyAfter) {
    const ConsoleColors = {
        added: "\x1b[32m",
        removed: "\x1b[31m",
        reset: "\x1b[0m",
    };
    const replacer = (key, value) => {
        if (key === "id")
            return undefined;
        if (typeof value === "bigint")
            return value.toString();
        return value;
    };
    const leftStr = JSON.stringify(sortObjectKeys(left), replacer, 4);
    const rightStr = JSON.stringify(sortObjectKeys(right), replacer, 4);
    const differences = (0, diff_1.diffJson)(leftStr, rightStr);
    differences.forEach((part) => {
        const color = part.added
            ? ConsoleColors.added
            : part.removed
                ? ConsoleColors.removed
                : ConsoleColors.reset;
        process.stdout.write(color + part.value + ConsoleColors.reset);
    });
    process.stdout.write(`\n\nGenerated to\n\n${prettyBefore}`);
    process.stdout.write(`\n\nParsed to\n\n${prettyAfter}\n\n`);
}
