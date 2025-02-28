"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParser = void 0;
const $ = __importStar(require("@tonstudio/parser-runtime"));
const G = __importStar(require("./grammar"));
const errors_1 = require("../../error/errors");
const parser_error_1 = require("../parser-error");
const getAstSchema_1 = require("../../ast/getAstSchema");
const src_info_1 = require("../src-info");
const display_to_string_1 = require("../../error/display-to-string");
const tricks_1 = require("../../utils/tricks");
const path_1 = require("../../imports/path");
const makeVisitor = (0, tricks_1.makeMakeVisitor)("$");
const map = (ts, handler) => (ctx) => {
    return ts.map((t) => handler(t)(ctx));
};
const parseList = (node) => {
    if (!node) {
        return [];
    }
    const { head, tail } = node;
    return [head, ...tail.map(({ right }) => right)];
};
const parseId = ({ name, loc }) => (ctx) => {
    if (name.startsWith("__gen")) {
        ctx.err.reservedVarPrefix("__gen")(loc);
    }
    if (name.startsWith("__tact")) {
        ctx.err.reservedVarPrefix("__tact")(loc);
    }
    return ctx.ast.Id(name, loc);
};
/*
    FunC can parse much more than Fift can handle. For example, _0x0 and _0 are
    valid identifiers in FunC, and using either of them compiles and is then
    interpreted fine by Fift. But if you use both, FunC still compiles, but Fift crashes.

    Same goes for plain identifiers using hashes # or emojis — you can have one
    FunC function with any of those combinations of characters, but you (generally)
    cannot have two or more of such functions.
*/
const reservedFuncIds = new Set([
    "_",
    "#include",
    "#pragma",
    "[",
    "]",
    "{",
    "}",
    "?",
    ":",
    "+",
    "-",
    "*",
    "/%",
    "/",
    "%",
    "~/",
    "^/",
    "~%",
    "^%",
    "<=>",
    "<=",
    "<",
    ">=",
    ">",
    "!=",
    "==",
    "~>>",
    "~",
    "^>>",
    "^",
    "&",
    "|",
    "<<",
    ">>",
    "=",
    "+=",
    "-=",
    "*=",
    "/=",
    "%=",
    "~>>=",
    "~/=",
    "~%=",
    "^>>=",
    "^/=",
    "^%=",
    "^=",
    "<<=",
    ">>=",
    "&=",
    "|=",
    "int",
    "cell",
    "builder",
    "slice",
    "cont",
    "tuple",
    "type",
    "->",
    "forall",
    "return",
    "var",
    "repeat",
    "do",
    "while",
    "until",
    "try",
    "catch",
    "ifnot",
    "if",
    "then",
    "elseifnot",
    "elseif",
    "else",
    "extern",
    "global",
    "asm",
    "impure",
    "inline_ref",
    "inline",
    "auto_apply",
    "method_id",
    "operator",
    "infixl",
    "infixr",
    "infix",
    "const",
]);
const parseFuncId = ({ accessor, id, loc }) => (ctx) => {
    if (reservedFuncIds.has(id)) {
        ctx.err.reservedFuncId()(loc);
    }
    if (id.match(/^-?([0-9]+|0x[0-9a-fA-F]+)$/)) {
        ctx.err.numericFuncId()(loc);
    }
    if (id.startsWith('"') || id.startsWith("{-")) {
        ctx.err.invalidFuncId()(loc);
    }
    return ctx.ast.FuncId((accessor ?? "") + id, loc);
};
const baseMap = {
    IntegerLiteralBin: 2,
    IntegerLiteralOct: 8,
    IntegerLiteralDec: 10,
    IntegerLiteralHex: 16,
};
const prefixMap = {
    IntegerLiteralBin: "0b",
    IntegerLiteralOct: "0o",
    IntegerLiteralDec: "",
    IntegerLiteralHex: "0x",
};
const parseIntegerLiteralValue = ({ $, digits, loc }) => (ctx) => {
    if ($ === "IntegerLiteralDec" &&
        digits.startsWith("0") &&
        digits.includes("_")) {
        ctx.err.leadingZeroUnderscore()(loc);
    }
    const value = BigInt(prefixMap[$] + digits.replaceAll("_", ""));
    return ctx.ast.Number(baseMap[$], value, loc);
};
const parseIntegerLiteral = ({ value }) => (ctx) => {
    return parseIntegerLiteralValue(value)(ctx);
};
const parseStringLiteral = ({ value, loc }) => (ctx) => {
    return ctx.ast.String(value, loc);
};
const parseBoolLiteral = ({ value, loc }) => (ctx) => {
    return ctx.ast.Boolean(value === "true", loc);
};
const parseNull = ({ loc }) => (ctx) => {
    return ctx.ast.Null(loc);
};
const parseStructFieldInitializer = ({ name, init, loc, }) => (ctx) => {
    const fieldId = parseId(name)(ctx);
    return ctx.ast.StructFieldInitializer(fieldId, init ? parseExpression(init)(ctx) : fieldId, loc);
};
const parseStructInstance = ({ type, fields, loc, }) => (ctx) => {
    return ctx.ast.StructInstance(parseId(type)(ctx), map(parseList(fields), parseStructFieldInitializer)(ctx), loc);
};
const parseInitOf = ({ name, params, loc }) => (ctx) => {
    return ctx.ast.InitOf(parseId(name)(ctx), map(parseList(params), parseExpression)(ctx), loc);
};
const parseCodeOf = ({ name, loc }) => (ctx) => {
    return ctx.ast.CodeOf(parseId(name)(ctx), loc);
};
const parseConditional = ({ head, tail, loc }) => (ctx) => {
    const condition = parseExpression(head)(ctx);
    if (!tail) {
        return condition;
    }
    const { thenBranch, elseBranch } = tail;
    return ctx.ast.Conditional(condition, parseExpression(thenBranch)(ctx), parseExpression(elseBranch)(ctx), loc);
};
const parseBinary = ({ exprs: { head, tail }, }) => (ctx) => {
    return tail.reduce(({ child, range }, { op, right }) => {
        const merged = $.mergeLoc(range, $.mergeLoc(op.loc, right.loc));
        return {
            child: ctx.ast.OpBinary(op.name, child, parseExpression(right)(ctx), merged),
            range: merged,
        };
    }, { child: parseExpression(head)(ctx), range: head.loc }).child;
};
const parseUnary = ({ prefixes, expression }) => (ctx) => {
    return prefixes.reduceRight(({ child, range }, { name, loc }) => {
        const merged = $.mergeLoc(loc, range);
        return {
            child: ctx.ast.OpUnary(name, child, merged),
            range: merged,
        };
    }, { child: parseExpression(expression)(ctx), range: expression.loc }).child;
};
const parseSuffixUnboxNotNull = (_) => (ctx) => (child, loc) => {
    return ctx.ast.OpUnary("!!", child, loc);
};
const parseSuffixCall = ({ params }) => (ctx) => (child, loc) => {
    const paramsAst = map(parseList(params), parseExpression)(ctx);
    if (child.kind === "id") {
        return ctx.ast.StaticCall(child, paramsAst, loc);
    }
    else if (child.kind === "field_access") {
        return ctx.ast.MethodCall(child.aggregate, child.field, paramsAst, loc);
    }
    else {
        ctx.err.notCallable()(loc);
        return ctx.ast.StaticCall(ctx.ast.Id("__invalid__", loc), paramsAst, loc);
    }
};
const parseSuffixFieldAccess = ({ name }) => (ctx) => (child, loc) => {
    return ctx.ast.FieldAccess(child, parseId(name)(ctx), loc);
};
const suffixVisitor = makeVisitor()({
    SuffixUnboxNotNull: parseSuffixUnboxNotNull,
    SuffixCall: parseSuffixCall,
    SuffixFieldAccess: parseSuffixFieldAccess,
});
const parseSuffix = ({ expression, suffixes }) => (ctx) => {
    return suffixes.reduce(({ child, range }, suffix) => {
        const merged = $.mergeLoc(range, suffix.loc);
        return {
            child: suffixVisitor(suffix)(ctx)(child, merged),
            range: merged,
        };
    }, { child: parseExpression(expression)(ctx), range: expression.loc }).child;
};
const parseParens = ({ child }) => {
    return parseExpression(child);
};
const parseExpression = makeVisitor()({
    Conditional: parseConditional,
    Binary: parseBinary,
    Unary: parseUnary,
    Suffix: parseSuffix,
    Parens: parseParens,
    StructInstance: parseStructInstance,
    IntegerLiteral: parseIntegerLiteral,
    BoolLiteral: parseBoolLiteral,
    InitOf: parseInitOf,
    CodeOf: parseCodeOf,
    Null: parseNull,
    StringLiteral: parseStringLiteral,
    Id: parseId,
});
const parseStatementLet = ({ name, type, init, loc, }) => (ctx) => {
    return ctx.ast.StatementLet(parseId(name)(ctx), type ? parseType(type)(ctx) : null, parseExpression(init)(ctx), loc);
};
const parsePunnedField = ({ name }) => (ctx) => {
    return [parseId(name)(ctx), parseId(name)(ctx)];
};
const parseRegularField = ({ fieldName, varName }) => (ctx) => {
    return [parseId(fieldName)(ctx), parseId(varName)(ctx)];
};
const parseDestructItem = makeVisitor()({
    PunnedField: parsePunnedField,
    RegularField: parseRegularField,
});
const parseStatementDestruct = ({ type, fields, rest, init, loc, }) => (ctx) => {
    const ids = new Map();
    for (const param of parseList(fields)) {
        const pair = parseDestructItem(param)(ctx);
        const [field] = pair;
        const name = field.text;
        if (ids.has(name)) {
            ctx.err.duplicateField(name)(param.loc);
        }
        ids.set(name, pair);
    }
    return ctx.ast.StatementDestruct(parseTypeId(type)(ctx), ids, rest.$ === "RestArgument", parseExpression(init)(ctx), loc);
};
const parseStatementBlock = ({ body, loc }) => (ctx) => {
    return ctx.ast.StatementBlock(parseStatements(body)(ctx), loc);
};
const parseStatementReturn = ({ expression, loc, }) => (ctx) => {
    return ctx.ast.StatementReturn(expression ? parseExpression(expression)(ctx) : null, loc);
};
const parseStatementCondition = ({ condition, trueBranch, falseBranch, loc, }) => (ctx) => {
    if (typeof falseBranch === "undefined") {
        return ctx.ast.StatementCondition(parseExpression(condition)(ctx), parseStatements(trueBranch)(ctx), null, loc);
    }
    else if (falseBranch.$ === "FalseBranch") {
        return ctx.ast.StatementCondition(parseExpression(condition)(ctx), parseStatements(trueBranch)(ctx), parseStatements(falseBranch.body)(ctx), loc);
    }
    else {
        return ctx.ast.StatementCondition(parseExpression(condition)(ctx), parseStatements(trueBranch)(ctx), [parseStatementCondition(falseBranch)(ctx)], loc);
    }
};
const parseStatementWhile = ({ condition, body, loc, }) => (ctx) => {
    return ctx.ast.StatementWhile(parseExpression(condition)(ctx), parseStatements(body)(ctx), loc);
};
const parseStatementRepeat = ({ condition, body, loc, }) => (ctx) => {
    return ctx.ast.StatementRepeat(parseExpression(condition)(ctx), parseStatements(body)(ctx), loc);
};
const parseStatementUntil = ({ condition, body, loc, }) => (ctx) => {
    return ctx.ast.StatementUntil(parseExpression(condition)(ctx), parseStatements(body)(ctx), loc);
};
const parseStatementTry = ({ body, handler, loc }) => (ctx) => {
    if (handler) {
        return ctx.ast.StatementTry(parseStatements(body)(ctx), loc, {
            catchName: parseId(handler.name)(ctx),
            catchStatements: parseStatements(handler.body)(ctx),
        });
    }
    else {
        return ctx.ast.StatementTry(parseStatements(body)(ctx), loc, undefined);
    }
};
const parseStatementForEach = ({ key, value, expression, body, loc, }) => (ctx) => {
    return ctx.ast.StatementForEach(parseId(key)(ctx), parseId(value)(ctx), parseExpression(expression)(ctx), parseStatements(body)(ctx), loc);
};
const parseStatementExpression = ({ expression, loc, }) => (ctx) => {
    return ctx.ast.StatementExpression(parseExpression(expression)(ctx), loc);
};
const parseStatementAssign = ({ left, operator, right, loc, }) => (ctx) => {
    if (typeof operator === "undefined") {
        return ctx.ast.StatementAssign(parseExpression(left)(ctx), parseExpression(right)(ctx), loc);
    }
    else {
        return ctx.ast.StatementAugmentedAssign(operator, parseExpression(left)(ctx), parseExpression(right)(ctx), loc);
    }
};
const parseStatement = makeVisitor()({
    StatementLet: parseStatementLet,
    StatementDestruct: parseStatementDestruct,
    StatementBlock: parseStatementBlock,
    StatementReturn: parseStatementReturn,
    StatementCondition: parseStatementCondition,
    StatementWhile: parseStatementWhile,
    StatementRepeat: parseStatementRepeat,
    StatementUntil: parseStatementUntil,
    StatementTry: parseStatementTry,
    StatementForEach: parseStatementForEach,
    StatementExpression: parseStatementExpression,
    StatementAssign: parseStatementAssign,
});
const parseStatements = (nodes) => (ctx) => {
    return map(nodes, parseStatement)(ctx);
};
const parseFunctionAttribute = (node) => (ctx) => {
    if (typeof node.name === "string") {
        return ctx.ast.FunctionAttribute(node.name, node.loc);
    }
    return ctx.ast.FunctionAttributeGet(node.name.methodId
        ? parseExpression(node.name.methodId)(ctx)
        : null, node.loc);
};
const checkAttributes = (kind) => (ctx, isAbstract, attributes, loc) => {
    const { duplicate, tooAbstract, notAbstract } = ctx.err[kind];
    const k = new Set();
    for (const { name, loc } of attributes) {
        const type = typeof name === "string" ? name : name.$;
        if (k.has(type)) {
            duplicate(type)(loc);
        }
        k.add(type);
    }
    if (isAbstract && !k.has("abstract")) {
        notAbstract()(loc);
    }
    if (!isAbstract && k.has("abstract")) {
        tooAbstract()(loc);
    }
};
const parseFunctionAttributes = (nodes, isAbstract, loc) => (ctx) => {
    checkAttributes("function")(ctx, isAbstract, nodes, loc);
    return map(nodes, parseFunctionAttribute)(ctx);
};
const parseConstantAttribute = ({ name, loc }) => (ctx) => {
    return ctx.ast.ConstantAttribute(name, loc);
};
const parseConstantAttributes = (nodes, isAbstract, loc, noAttributes) => (ctx) => {
    const [head] = nodes;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (noAttributes && head) {
        ctx.err.topLevelConstantWithAttribute()(head.loc);
    }
    checkAttributes("constant")(ctx, isAbstract, nodes, loc);
    return map(nodes, parseConstantAttribute)(ctx);
};
const parseParameter = ({ name, type, loc }) => (ctx) => {
    return ctx.ast.TypedParameter(parseId(name)(ctx), parseType(type)(ctx), loc);
};
const parseTypeId = ({ name, loc }) => (ctx) => {
    return ctx.ast.TypeId(name, loc);
};
const parseTypeOptional = ({ type, loc }) => (ctx) => {
    const { type: innerType, optionals: [firstOption, ...restOption], loc: optionalLoc, } = type;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- eslint bug
    if (firstOption) {
        if (restOption.length !== 0) {
            ctx.err.multipleOptionals()(optionalLoc);
        }
        if (innerType.$ !== "TypeRegular") {
            ctx.err.onlyOptionalOfNamed()(optionalLoc);
            return ctx.ast.OptionalType(ctx.ast.TypeId("ERROR", innerType.loc), optionalLoc);
        }
        const { child } = innerType;
        return ctx.ast.OptionalType(ctx.ast.TypeId(child.name, child.loc), optionalLoc);
    }
    if (innerType.$ === "TypeRegular") {
        const { name, loc } = innerType.child;
        return ctx.ast.TypeId(name, loc);
    }
    const { name, args, loc: genericLoc } = innerType;
    if (name.$ === "MapKeyword") {
        const parsedArgs = parseList(args);
        const [key, value, ...rest] = parsedArgs;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- eslint bug
        if (!key || !value || rest.length > 0) {
            ctx.err.genericArgCount("map", 2, parsedArgs.length)(genericLoc);
            return ctx.ast.TypeId("ERROR", genericLoc);
        }
        const [keyAs, ...restKeyAs] = key.as;
        if (restKeyAs.length > 0) {
            ctx.err.mapOnlyOneAs("key")(genericLoc);
        }
        if (key.type.optionals.length > 0) {
            ctx.err.cannotBeOptional("key")(genericLoc);
        }
        if (key.type.type.$ !== "TypeRegular") {
            ctx.err.onlyTypeId("key")(genericLoc);
            return ctx.ast.TypeId("ERROR", genericLoc);
        }
        const [valueAs, ...restValueAs] = value.as;
        if (restValueAs.length > 0) {
            ctx.err.mapOnlyOneAs("value")(genericLoc);
        }
        if (value.type.optionals.length > 0) {
            ctx.err.cannotBeOptional("value")(genericLoc);
        }
        if (value.type.type.$ !== "TypeRegular") {
            ctx.err.onlyTypeId("value")(genericLoc);
            return ctx.ast.TypeId("ERROR", genericLoc);
        }
        const keyType = key.type.type.child;
        const valueType = value.type.type.child;
        return ctx.ast.MapType(ctx.ast.TypeId(keyType.name, keyType.loc), 
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- eslint bug
        keyAs ? ctx.ast.Id(keyAs.name, keyAs.loc) : null, ctx.ast.TypeId(valueType.name, valueType.loc), 
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- eslint bug
        valueAs ? ctx.ast.Id(valueAs.name, valueAs.loc) : null, genericLoc);
    }
    if (name.$ === "Bounced") {
        const parsedArgs = parseList(args);
        const [arg, ...rest] = parsedArgs;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- eslint bug
        if (!arg || rest.length > 0) {
            ctx.err.genericArgCount("bounced", 1, parsedArgs.length)(genericLoc);
            return ctx.ast.TypeId("ERROR", genericLoc);
        }
        if (arg.as.length > 0 ||
            arg.type.optionals.length > 0 ||
            arg.type.type.$ !== "TypeRegular") {
            ctx.err.onlyBouncedOfNamed()(genericLoc);
            return ctx.ast.TypeId("ERROR", genericLoc);
        }
        const type = arg.type.type.child;
        return ctx.ast.BouncedMessageType(ctx.ast.TypeId(type.name, type.loc), loc);
    }
    ctx.err.unknownGeneric()(genericLoc);
    return ctx.ast.TypeId("ERROR", genericLoc);
};
const parseType = (node) => (ctx) => {
    if (node.as.length > 0) {
        ctx.err.asNotAllowed()(node.loc);
    }
    return parseTypeOptional(node)(ctx);
};
const parseFieldDecl = ({ name, type, expression, loc, }) => (ctx) => {
    const id = parseId(name)(ctx);
    const expr = expression ? parseExpression(expression)(ctx) : null;
    const [as, ...restAs] = type.as;
    if (restAs.length > 0) {
        ctx.err.fieldOnlyOneAs()(loc);
    }
    const ty = parseTypeOptional(type)(ctx);
    return ctx.ast.FieldDecl(id, ty, expr, 
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- eslint bug
    as ? ctx.ast.Id(as.name, as.loc) : null, loc);
};
const parseReceiverParam = (param) => (ctx) => {
    return !param
        ? ctx.ast.ReceiverFallback()
        : param.$ === "Parameter"
            ? ctx.ast.ReceiverSimple(parseParameter(param)(ctx))
            : ctx.ast.ReceiverComment(parseStringLiteral(param)(ctx));
};
const parseReceiverReceive = ({ type, param, body, loc }) => (ctx) => {
    return ctx.ast.Receiver(ctx.ast.ReceiverInternal(parseReceiverParam(param)(ctx), type.loc), map(body, parseStatement)(ctx), loc);
};
const parseReceiverExternal = ({ type, param, body, loc }) => (ctx) => {
    return ctx.ast.Receiver(ctx.ast.ReceiverExternal(parseReceiverParam(param)(ctx), type.loc), map(body, parseStatement)(ctx), loc);
};
const emptyLoc = { $: "range", start: 0, end: 0 };
const repairParam = {
    $: "Parameter",
    name: {
        $: "Id",
        name: "__invalid__",
        loc: emptyLoc,
    },
    type: {
        $: "TypeAs",
        as: [],
        type: {
            $: "TypeOptional",
            optionals: [],
            type: {
                $: "TypeRegular",
                child: {
                    $: "TypeId",
                    name: "__Invalid__",
                    loc: emptyLoc,
                },
                loc: emptyLoc,
            },
            loc: emptyLoc,
        },
        loc: emptyLoc,
    },
    loc: emptyLoc,
};
const parseReceiverBounced = ({ type, param, body, loc }) => (ctx) => {
    if (typeof param === "undefined") {
        ctx.err.noBouncedWithoutArg()(loc);
        param = repairParam;
    }
    if (param.$ === "StringLiteral") {
        ctx.err.noBouncedWithString()(loc);
        param = repairParam;
    }
    return ctx.ast.Receiver(ctx.ast.ReceiverBounce(parseParameter(param)(ctx), type.loc), map(body, parseStatement)(ctx), loc);
};
const parserByReceiverType = {
    bounced: parseReceiverBounced,
    receive: parseReceiverReceive,
    external: parseReceiverExternal,
};
const parseReceiver = (node) => {
    return parserByReceiverType[node.type.name](node);
};
const defaultShuffle = {
    args: [],
    ret: [],
};
const parseAsmShuffle = (node) => (ctx) => {
    if (!node) {
        return defaultShuffle;
    }
    return {
        args: map(node.ids, parseId)(ctx),
        ret: node.to ? map(node.to, parseIntegerLiteralValue)(ctx) : [],
    };
};
const parseAsmFunction = (node) => (ctx) => {
    return ctx.ast.AsmFunctionDef(parseAsmShuffle(node.shuffle)(ctx), parseFunctionAttributes(node.attributes, false, node.loc)(ctx), parseId(node.name)(ctx), node.returnType ? parseType(node.returnType)(ctx) : null, map(parseList(node.parameters), parseParameter)(ctx), [node.instructions.trim()], node.loc);
};
const parseContractInit = ({ parameters, body, loc, }) => (ctx) => {
    return ctx.ast.ContractInit(map(parseList(parameters), parseParameter)(ctx), map(body, parseStatement)(ctx), loc);
};
const parseConstantDefInModule = (node) => (ctx) => {
    return parseConstantDef(node, true)(ctx);
};
const parseConstantDef = (node, noAttributes) => (ctx) => {
    const result = parseConstant(node, noAttributes)(ctx);
    if (result.kind !== "constant_def") {
        ctx.err.noConstantDecl()(node.loc);
        return {
            ...result,
            kind: "constant_def",
            initializer: ctx.ast.Number(10, 0n, node.loc),
        };
    }
    return result;
};
const parseConstantDefLocal = (node) => parseConstantDef(node, false);
const parseConstant = (node, noAttributes) => (ctx) => {
    const name = parseId(node.name)(ctx);
    const type = parseType(node.type)(ctx);
    if (node.body.$ === "ConstantDeclaration") {
        const attributes = parseConstantAttributes(node.attributes, true, node.loc, noAttributes)(ctx);
        return ctx.ast.ConstantDecl(attributes, name, type, node.loc);
    }
    else {
        const attributes = parseConstantAttributes(node.attributes, false, node.loc, noAttributes)(ctx);
        const initializer = parseExpression(node.body.expression)(ctx);
        return ctx.ast.ConstantDef(attributes, name, type, initializer, node.loc);
    }
};
const parseConstantLocal = (node) => parseConstant(node, false);
const parseContract = ({ name, attributes, parameters, traits, declarations, loc, }) => (ctx) => {
    const params = parseList(parameters).map((param) => {
        return parseFieldDecl({
            $: "FieldDecl",
            name: param.name,
            type: param.type,
            expression: undefined,
            loc: param.loc,
        })(ctx);
    });
    return ctx.ast.Contract(parseId(name)(ctx), map(parseList(traits), parseId)(ctx), map(attributes, parseContractAttribute)(ctx), parameters ? params : undefined, map(declarations, parseContractItem)(ctx), loc);
};
const parseFunctionDef = (node) => (ctx) => {
    const result = parseFunction(node)(ctx);
    if (result.kind !== "function_def") {
        ctx.err.noFunctionDecl()(node.loc);
        return {
            ...parseFunction(node)(ctx),
            kind: "function_def",
            statements: [],
        };
    }
    return result;
};
const parseFunction = (node) => (ctx) => {
    const name = parseId(node.name)(ctx);
    const returnType = node.returnType
        ? parseType(node.returnType)(ctx)
        : null;
    const parameters = map(parseList(node.parameters), parseParameter)(ctx);
    if (node.body.$ === "FunctionDeclaration") {
        const attributes = parseFunctionAttributes(node.attributes, true, node.loc)(ctx);
        return ctx.ast.FunctionDecl(attributes, name, returnType, parameters, node.loc);
    }
    else {
        const attributes = parseFunctionAttributes(node.attributes, false, node.loc)(ctx);
        const statements = map(node.body.body, parseStatement)(ctx);
        return ctx.ast.FunctionDef(attributes, name, returnType, parameters, statements, node.loc);
    }
};
const parseMessageDecl = ({ name, opcode, fields, loc, }) => (ctx) => {
    return ctx.ast.MessageDecl(parseId(name)(ctx), opcode ? parseExpression(opcode)(ctx) : null, map(parseList(fields), parseFieldDecl)(ctx), loc);
};
const parseNativeFunctionDecl = ({ name, attributes, nativeName, parameters, returnType, loc, }) => (ctx) => {
    return ctx.ast.NativeFunctionDecl(map(attributes, parseFunctionAttribute)(ctx), parseId(name)(ctx), parseFuncId(nativeName)(ctx), map(parseList(parameters), parseParameter)(ctx), returnType ? parseType(returnType)(ctx) : null, loc);
};
const parsePrimitiveTypeDecl = ({ name, loc }) => (ctx) => {
    return ctx.ast.PrimitiveTypeDecl(parseId(name)(ctx), loc);
};
const parseStructDecl = ({ name, fields, loc }) => (ctx) => {
    return ctx.ast.StructDecl(parseId(name)(ctx), map(parseList(fields), parseFieldDecl)(ctx), loc);
};
const parseContractAttribute = ({ name, loc }) => (ctx) => {
    return ctx.ast.ContractAttribute(parseStringLiteral(name)(ctx), loc);
};
const parseTrait = ({ name, traits, attributes, declarations, loc, }) => (ctx) => {
    return ctx.ast.Trait(parseId(name)(ctx), traits ? map(parseList(traits), parseId)(ctx) : [], map(attributes, parseContractAttribute)(ctx), map(declarations, parseTraitItem)(ctx), loc);
};
const parseContractItem = makeVisitor()({
    ContractInit: parseContractInit,
    FieldDecl: parseFieldDecl,
    Receiver: parseReceiver,
    Function: parseFunctionDef,
    Constant: parseConstantDefLocal,
});
const parseTraitItem = makeVisitor()({
    FieldDecl: parseFieldDecl,
    Receiver: parseReceiver,
    Function: parseFunction,
    Constant: parseConstantLocal,
});
const parseModuleItem = makeVisitor()({
    PrimitiveTypeDecl: parsePrimitiveTypeDecl,
    Function: parseFunctionDef,
    AsmFunction: parseAsmFunction,
    NativeFunctionDecl: parseNativeFunctionDecl,
    Constant: parseConstantDefInModule,
    StructDecl: parseStructDecl,
    MessageDecl: parseMessageDecl,
    Contract: parseContract,
    Trait: parseTrait,
});
const detectLanguage = (path) => {
    if (path.endsWith(".fc") || path.endsWith(".func")) {
        return "func";
    }
    if (path.endsWith(".tact")) {
        return "tact";
    }
    return undefined;
};
const guessExtension = (importText) => {
    const language = detectLanguage(importText);
    if (language) {
        return { guessedPath: importText, language };
    }
    else {
        return { guessedPath: `${importText}.tact`, language: "tact" };
    }
};
const stdlibPrefix = "@stdlib/";
const parseImportString = (importText, loc) => (ctx) => {
    if (importText.endsWith("/")) {
        ctx.err.noFolderImports()(loc);
        importText = importText.slice(0, -1);
    }
    if (importText.includes("\\")) {
        ctx.err.importWithBackslash()(loc);
        importText = importText.replace(/\\/g, "/");
    }
    const { guessedPath, language } = guessExtension(importText);
    if (guessedPath.startsWith(stdlibPrefix)) {
        const path = (0, path_1.fromString)(guessedPath.substring(stdlibPrefix.length));
        if (path.stepsUp !== 0) {
            ctx.err.importWithBackslash()(loc);
        }
        return {
            path,
            type: "stdlib",
            language,
        };
    }
    else if (guessedPath.startsWith("./") ||
        guessedPath.startsWith("../")) {
        return {
            path: (0, path_1.fromString)(guessedPath),
            type: "relative",
            language,
        };
    }
    else {
        ctx.err.invalidImport()(loc);
        return {
            path: path_1.emptyPath,
            type: "relative",
            language: "tact",
        };
    }
};
const parseImport = ({ path, loc }) => (ctx) => {
    const stringLiteral = parseStringLiteral(path)(ctx);
    const parsedString = JSON.parse(`"${stringLiteral.value}"`);
    return ctx.ast.Import(parseImportString(parsedString, loc)(ctx), loc);
};
const parseModule = ({ imports, items }) => (ctx) => {
    return ctx.ast.Module(map(imports, parseImport)(ctx), map(items, parseModuleItem)(ctx));
};
const parseJustImports = ({ imports }) => (ctx) => {
    return map(imports, parseImport)(ctx);
};
const getParser = (ast) => {
    const display = display_to_string_1.displayToString;
    const doParse = (grammar, handler, { code, path, origin }) => {
        const locationToSrcInfo = (loc) => {
            if (loc.$ === "range") {
                return (0, src_info_1.getSrcInfo)(code, loc.start, loc.end, path, origin);
            }
            else {
                console.error("Invalid range");
                return (0, src_info_1.getSrcInfo)(code, loc.at, loc.at, path, origin);
            }
        };
        const err = (0, parser_error_1.syntaxErrorSchema)(display, (message) => (source) => {
            const srcInfo = locationToSrcInfo(source);
            throw new errors_1.TactCompilationError(display.at(srcInfo, message), srcInfo);
        });
        const result = $.parse({
            grammar,
            space: G.space,
            text: code,
        });
        if (result.$ === "error") {
            const { expected, position } = result.error;
            return err.expected(expected)({
                $: "range",
                start: position,
                end: position,
            });
        }
        const ctx = {
            ast: (0, getAstSchema_1.getAstSchema)(ast, locationToSrcInfo),
            err,
        };
        return handler(result.value)(ctx);
    };
    return {
        parse: (source) => {
            return doParse(G.Module, parseModule, source);
        },
        parseExpression: (code) => {
            return doParse(G.expression, parseExpression, {
                code,
                path: "<repl>",
                origin: "user",
            });
        },
        parseImports: (source) => {
            return doParse(G.JustImports, parseJustImports, source);
        },
        parseStatement: (code) => {
            return doParse(G.statement, parseStatement, {
                code,
                path: "<repl>",
                origin: "user",
            });
        },
    };
};
exports.getParser = getParser;
