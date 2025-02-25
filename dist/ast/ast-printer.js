"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ppAstMessage = exports.ppAstConstant = exports.ppAstTrait = exports.ppAstNativeFunction = exports.ppAstAsmFunctionDef = exports.ppAsmShuffle = exports.ppAstFunctionDef = exports.ppAstPrimitiveTypeDecl = exports.ppAstContract = exports.ppAstStruct = exports.ppAstModule = exports.ppAstExpression = exports.ppAstExpressionNested = exports.ppAstConditional = exports.ppAstOpBinary = exports.ppAstOpUnary = exports.ppAstFieldAccess = exports.ppAstMethodCall = exports.ppAstStaticCall = exports.ppAstSlice = exports.ppAstCell = exports.ppAstAddress = exports.ppAstSimplifiedString = exports.ppAstString = exports.ppAstNull = exports.ppAstId = exports.ppAstBoolean = exports.ppAstNumber = exports.ppAstCodeOf = exports.ppAstInitOf = exports.ppAstStructValue = exports.ppAstStructInstance = exports.ppAstStructFieldValue = exports.ppAstStructFieldInit = exports.ppExprArgs = exports.ppLeaf = exports.postfixPrecedence = exports.prefixPrecedence = exports.binaryPrecedence = exports.conditionalPrecedence = exports.lowestPrecedence = exports.makePrecedence = exports.checkPostfix = exports.unaryOperatorType = exports.ppAstType = exports.ppAstOptionalType = exports.ppAstBouncedMessageType = exports.ppAstMapType = exports.ppAstTypeIdWithStorage = exports.ppAstTypeId = void 0;
exports.prettyPrint = exports.ppAstNode = exports.exprNode = exports.ppAstStatement = exports.ppAstStatementBlock = exports.ppTypedParameter = exports.ppAstStatementDestruct = exports.ppAstStatementTry = exports.ppAstStatementForEach = exports.ppAstStatementUntil = exports.ppAstStatementRepeat = exports.ppAstStatementWhile = exports.ppAstStatementCondition = exports.ppAstStatementAugmentedAssign = exports.ppAstStatementAssign = exports.ppAstStatementExpression = exports.ppAstStatementReturn = exports.ppAstStatementLet = exports.ppAsmInstructionsBlock = exports.ppStatementBlock = exports.ppAstFuncId = exports.ppAstReceiverKind = exports.ppReceiverSubKind = exports.ppAstFunctionAttribute = exports.ppAstFunctionSignature = exports.ppAstImport = exports.ppContractBody = exports.ppAstInitFunction = exports.ppTraitBody = exports.ppAstConstDecl = exports.ppAstFunctionDecl = exports.ppAstReceiver = exports.ppAstFieldDecl = exports.ppModuleItem = void 0;
const array_1 = require("../utils/array");
const tricks_1 = require("../utils/tricks");
const ast_helpers_1 = require("./ast-helpers");
const path_1 = require("../imports/path");
const errors_1 = require("../error/errors");
//
// Types
//
exports.ppAstTypeId = ast_helpers_1.idText;
const ppAstTypeIdWithStorage = (type, storageType) => {
    const alias = storageType ? ` as ${(0, exports.ppAstId)(storageType)}` : "";
    return `${(0, exports.ppAstTypeId)(type)}${alias}`;
};
exports.ppAstTypeIdWithStorage = ppAstTypeIdWithStorage;
const ppAstMapType = ({ keyType, keyStorageType, valueType, valueStorageType, }) => {
    const key = (0, exports.ppAstTypeIdWithStorage)(keyType, keyStorageType);
    const value = (0, exports.ppAstTypeIdWithStorage)(valueType, valueStorageType);
    return `map<${key}, ${value}>`;
};
exports.ppAstMapType = ppAstMapType;
const ppAstBouncedMessageType = ({ messageType, }) => `bounced<${(0, exports.ppAstTypeId)(messageType)}>`;
exports.ppAstBouncedMessageType = ppAstBouncedMessageType;
const ppAstOptionalType = ({ typeArg }) => `${(0, exports.ppAstType)(typeArg)}?`;
exports.ppAstOptionalType = ppAstOptionalType;
exports.ppAstType = (0, tricks_1.makeVisitor)()({
    type_id: exports.ppAstTypeId,
    map_type: exports.ppAstMapType,
    bounced_message_type: exports.ppAstBouncedMessageType,
    optional_type: exports.ppAstOptionalType,
});
//
// Expressions
//
exports.unaryOperatorType = {
    "+": "pre",
    "-": "pre",
    "!": "pre",
    "~": "pre",
    "!!": "post",
};
const checkPostfix = (operator) => exports.unaryOperatorType[operator] === "post";
exports.checkPostfix = checkPostfix;
/**
 * Given numeric value of precedence, where higher values stand for higher binding power,
 * create a helper object for precedence checking
 */
const makePrecedence = (myPrecedence) => ({
    brace: (position, code) => (position(myPrecedence) ? `(${code})` : code),
    self: (childPrecedence) => childPrecedence < myPrecedence,
    child: (childPrecedence) => childPrecedence <= myPrecedence,
});
exports.makePrecedence = makePrecedence;
// Least binding operator
exports.lowestPrecedence = (0, exports.makePrecedence)(0);
exports.conditionalPrecedence = (0, exports.makePrecedence)(20);
exports.binaryPrecedence = {
    "||": (0, exports.makePrecedence)(30),
    "&&": (0, exports.makePrecedence)(40),
    "|": (0, exports.makePrecedence)(50),
    "^": (0, exports.makePrecedence)(60),
    "&": (0, exports.makePrecedence)(70),
    "==": (0, exports.makePrecedence)(80),
    "!=": (0, exports.makePrecedence)(80),
    "<": (0, exports.makePrecedence)(90),
    ">": (0, exports.makePrecedence)(90),
    "<=": (0, exports.makePrecedence)(90),
    ">=": (0, exports.makePrecedence)(90),
    "<<": (0, exports.makePrecedence)(100),
    ">>": (0, exports.makePrecedence)(100),
    "+": (0, exports.makePrecedence)(110),
    "-": (0, exports.makePrecedence)(110),
    "*": (0, exports.makePrecedence)(120),
    "/": (0, exports.makePrecedence)(120),
    "%": (0, exports.makePrecedence)(120),
};
exports.prefixPrecedence = (0, exports.makePrecedence)(140);
// Used by postfix unary !!, method calls and field accesses
exports.postfixPrecedence = (0, exports.makePrecedence)(150);
/**
 * Wrapper for AST nodes that should never be parenthesized, and thus do not require information
 * about the position they're printed in
 *
 * Takes a regular printer function and returns corresponding ExprPrinter that ignores all
 * position and precedence information
 */
const ppLeaf = (printer) => (node) => () => printer(node);
exports.ppLeaf = ppLeaf;
const ppExprArgs = (args) => args.map((arg) => (0, exports.ppAstExpression)(arg)).join(", ");
exports.ppExprArgs = ppExprArgs;
const ppAstStructFieldInit = (param) => `${(0, exports.ppAstId)(param.field)}: ${(0, exports.ppAstExpression)(param.initializer)}`;
exports.ppAstStructFieldInit = ppAstStructFieldInit;
const ppAstStructFieldValue = (param) => `${(0, exports.ppAstId)(param.field)}: ${(0, exports.ppAstExpression)(param.initializer)}`;
exports.ppAstStructFieldValue = ppAstStructFieldValue;
const ppAstStructInstance = ({ type, args }) => `${(0, exports.ppAstId)(type)}{${args.map((x) => (0, exports.ppAstStructFieldInit)(x)).join(", ")}}`;
exports.ppAstStructInstance = ppAstStructInstance;
const ppAstStructValue = ({ type, args }) => `${(0, exports.ppAstId)(type)}{${args.map((x) => (0, exports.ppAstStructFieldValue)(x)).join(", ")}}`;
exports.ppAstStructValue = ppAstStructValue;
const ppAstInitOf = ({ contract, args }) => `initOf ${(0, exports.ppAstId)(contract)}(${(0, exports.ppExprArgs)(args)})`;
exports.ppAstInitOf = ppAstInitOf;
const ppAstCodeOf = ({ contract }) => `codeOf ${(0, exports.ppAstId)(contract)}`;
exports.ppAstCodeOf = ppAstCodeOf;
exports.ppAstNumber = ast_helpers_1.astNumToString;
const ppAstBoolean = ({ value }) => value.toString();
exports.ppAstBoolean = ppAstBoolean;
const ppAstId = ({ text }) => text;
exports.ppAstId = ppAstId;
const ppAstNull = (_expr) => "null";
exports.ppAstNull = ppAstNull;
const ppAstString = ({ value }) => `"${value}"`;
exports.ppAstString = ppAstString;
const ppAstSimplifiedString = ({ value }) => JSON.stringify(value);
exports.ppAstSimplifiedString = ppAstSimplifiedString;
const ppAstAddress = ({ value }) => `addr("${value.toRawString()}")`;
exports.ppAstAddress = ppAstAddress;
const ppAstCell = ({ value }) => `cell("${value.toString()}")`;
exports.ppAstCell = ppAstCell;
const ppAstSlice = ({ value }) => `slice("${value.toString()}")`;
exports.ppAstSlice = ppAstSlice;
const ppAstStaticCall = ({ function: func, args }) => {
    return `${(0, exports.ppAstId)(func)}(${(0, exports.ppExprArgs)(args)})`;
};
exports.ppAstStaticCall = ppAstStaticCall;
const ppAstMethodCall = ({ self: object, method, args }) => (position) => {
    const { brace, self } = exports.postfixPrecedence;
    return brace(position, `${(0, exports.ppAstExpressionNested)(object)(self)}.${(0, exports.ppAstId)(method)}(${(0, exports.ppExprArgs)(args)})`);
};
exports.ppAstMethodCall = ppAstMethodCall;
const ppAstFieldAccess = ({ aggregate, field }) => (position) => {
    const { brace, self } = exports.postfixPrecedence;
    return brace(position, `${(0, exports.ppAstExpressionNested)(aggregate)(self)}.${(0, exports.ppAstId)(field)}`);
};
exports.ppAstFieldAccess = ppAstFieldAccess;
const ppAstOpUnary = ({ op, operand }) => (position) => {
    const isPostfix = (0, exports.checkPostfix)(op);
    const { brace, self } = isPostfix
        ? exports.postfixPrecedence
        : exports.prefixPrecedence;
    const code = (0, exports.ppAstExpressionNested)(operand)(self);
    return brace(position, isPostfix ? `${code}${op}` : `${op}${code}`);
};
exports.ppAstOpUnary = ppAstOpUnary;
const ppAstOpBinary = ({ left, op, right }) => (position) => {
    const { brace, self, child } = exports.binaryPrecedence[op];
    const leftCode = (0, exports.ppAstExpressionNested)(left)(self);
    const rightCode = (0, exports.ppAstExpressionNested)(right)(child);
    return brace(position, `${leftCode} ${op} ${rightCode}`);
};
exports.ppAstOpBinary = ppAstOpBinary;
const ppAstConditional = ({ condition, thenBranch, elseBranch }) => (position) => {
    const { brace, self, child } = exports.conditionalPrecedence;
    const conditionCode = (0, exports.ppAstExpressionNested)(condition)(child);
    const thenCode = (0, exports.ppAstExpressionNested)(thenBranch)(child);
    const elseCode = (0, exports.ppAstExpressionNested)(elseBranch)(self);
    return brace(position, `${conditionCode} ? ${thenCode} : ${elseCode}`);
};
exports.ppAstConditional = ppAstConditional;
exports.ppAstExpressionNested = (0, tricks_1.makeVisitor)()({
    struct_instance: (0, exports.ppLeaf)(exports.ppAstStructInstance),
    struct_value: (0, exports.ppLeaf)(exports.ppAstStructValue),
    number: (0, exports.ppLeaf)(exports.ppAstNumber),
    boolean: (0, exports.ppLeaf)(exports.ppAstBoolean),
    id: (0, exports.ppLeaf)(exports.ppAstId),
    null: (0, exports.ppLeaf)(exports.ppAstNull),
    init_of: (0, exports.ppLeaf)(exports.ppAstInitOf),
    code_of: (0, exports.ppLeaf)(exports.ppAstCodeOf),
    string: (0, exports.ppLeaf)(exports.ppAstString),
    static_call: (0, exports.ppLeaf)(exports.ppAstStaticCall),
    simplified_string: (0, exports.ppLeaf)(exports.ppAstSimplifiedString),
    address: (0, exports.ppLeaf)(exports.ppAstAddress),
    cell: (0, exports.ppLeaf)(exports.ppAstCell),
    slice: (0, exports.ppLeaf)(exports.ppAstSlice),
    method_call: exports.ppAstMethodCall,
    field_access: exports.ppAstFieldAccess,
    op_unary: exports.ppAstOpUnary,
    op_binary: exports.ppAstOpBinary,
    conditional: exports.ppAstConditional,
});
const ppAstExpression = (expr) => {
    return (0, exports.ppAstExpressionNested)(expr)(exports.lowestPrecedence.child);
};
exports.ppAstExpression = ppAstExpression;
/**
 * Concatenates an array of printing results, so that last line of each expression is merged
 * with first line of next expression
 *
 * Typically used to generate multiline indented code as part of single-line expression
 *
 * Roughly, `concat(["while (true)"], [" "], ["{", "...", "}"]) = ["while (true) {", "...", "}"]`
 */
const concat = ([head, ...tail]) => {
    // If we're concatenating an empty array, the result is always empty
    if ((0, array_1.isUndefined)(head)) {
        return [];
    }
    // Create a copy of first printing result, where we'll accumulate other results
    const init = [...head];
    // Recursively concatenate all printing results except for first
    const next = concat(tail);
    // Take last line of first printing result
    const last = init.pop();
    // If first printing result has no lines, return concatenation result of all others
    if ((0, array_1.isUndefined)(last)) {
        return next;
    }
    // Get first line on concatenated printing results starting with second
    const [nextHead, ...nextTail] = next;
    // If they all concatenated into an array of 0 lines, just return first printing result
    if ((0, array_1.isUndefined)(nextHead)) {
        return head;
    }
    // Otherwise concatenate results, leaving indent only in front of the merged line
    return [...init, (level) => last(level) + nextHead(0), ...nextTail];
};
const createContext = (spaces) => {
    const row = (s) => [
        // Empty lines are not indented
        (level) => (s === "" ? s : " ".repeat(level * spaces) + s),
    ];
    const block = (rows) => rows.flat();
    const indent = (rows) => block(rows).map((f) => (level) => f(level + 1));
    const braced = (rows) => block(rows.length > 0 ? [row(`{`), indent(rows), row(`}`)] : [row("{ }")]);
    const list = (items, print) => items.map((node) => print(node)(ctx));
    const grouped = ({ items, getTag, print, }) => {
        return (0, array_1.intercalate)((0, array_1.groupBy)(items, getTag).map((group) => list(group, print)), row(""));
    };
    const ctx = {
        row,
        concat,
        block,
        braced,
        list,
        grouped,
    };
    return ctx;
};
const ppAstModule = ({ imports, items }) => (c) => {
    const itemsCode = c.grouped({
        items,
        getTag: ({ kind }) => (kind === "constant_def" ? 1 : NaN),
        print: exports.ppModuleItem,
    });
    if (imports.length === 0) {
        return c.block(itemsCode);
    }
    return c.block([
        ...c.list(imports, exports.ppAstImport),
        c.row(""),
        ...itemsCode,
    ]);
};
exports.ppAstModule = ppAstModule;
const ppAstStruct = ({ name, fields }) => (c) => c.concat([
    c.row(`struct ${(0, exports.ppAstId)(name)} `),
    c.braced(c.list(fields, exports.ppAstFieldDecl)),
]);
exports.ppAstStruct = ppAstStruct;
const ppAstContract = ({ name, traits, declarations, attributes }) => (c) => {
    const attrsCode = attributes
        .map(({ name: { value } }) => `@interface("${value}") `)
        .join("");
    const traitsCode = traits.map((trait) => trait.text).join(", ");
    const header = traitsCode
        ? `contract ${(0, exports.ppAstId)(name)} with ${traitsCode}`
        : `contract ${(0, exports.ppAstId)(name)}`;
    return c.concat([
        c.row(`${attrsCode}${header} `),
        c.braced(c.grouped({
            items: declarations,
            getTag: ({ kind }) => kind === "constant_def"
                ? 1
                : kind === "field_decl"
                    ? 2
                    : NaN,
            print: exports.ppContractBody,
        })),
    ]);
};
exports.ppAstContract = ppAstContract;
const ppAstPrimitiveTypeDecl = ({ name }) => (c) => c.row(`primitive ${(0, exports.ppAstId)(name)};`);
exports.ppAstPrimitiveTypeDecl = ppAstPrimitiveTypeDecl;
const ppAstFunctionDef = (node) => (c) => c.concat([
    c.row((0, exports.ppAstFunctionSignature)(node)),
    c.row(" "),
    (0, exports.ppStatementBlock)(node.statements)(c),
]);
exports.ppAstFunctionDef = ppAstFunctionDef;
const ppAsmShuffle = ({ args, ret }) => {
    if (args.length === 0 && ret.length === 0) {
        return "";
    }
    const argsCode = args.map(({ text }) => text).join(" ");
    if (ret.length === 0) {
        return `(${argsCode})`;
    }
    const retCode = ret.map(({ value }) => value.toString()).join(" ");
    return `(${argsCode} -> ${retCode})`;
};
exports.ppAsmShuffle = ppAsmShuffle;
const ppAstAsmFunctionDef = (node) => (c) => c.concat([
    c.row(`asm${(0, exports.ppAsmShuffle)(node.shuffle)} ${(0, exports.ppAstFunctionSignature)(node)} `),
    (0, exports.ppAsmInstructionsBlock)(node.instructions)(c),
]);
exports.ppAstAsmFunctionDef = ppAstAsmFunctionDef;
const ppAstNativeFunction = ({ name, nativeName, params, return: retTy, attributes }) => (c) => {
    const attrs = attributes.map(({ type }) => type + " ").join("");
    const argsCode = params
        .map(({ name, type }) => `${(0, exports.ppAstId)(name)}: ${(0, exports.ppAstType)(type)}`)
        .join(", ");
    const returnType = retTy ? `: ${(0, exports.ppAstType)(retTy)}` : "";
    return c.block([
        c.row(`@name(${(0, exports.ppAstFuncId)(nativeName)})`),
        c.row(`${attrs}native ${(0, exports.ppAstId)(name)}(${argsCode})${returnType};`),
    ]);
};
exports.ppAstNativeFunction = ppAstNativeFunction;
const ppAstTrait = ({ name, traits, attributes, declarations }) => (c) => {
    const attrsCode = attributes
        .map((attr) => `@${attr.type}("${attr.name.value}") `)
        .join("");
    const traitsCode = traits.map((t) => (0, exports.ppAstId)(t)).join(", ");
    const header = traitsCode
        ? `trait ${(0, exports.ppAstId)(name)} with ${traitsCode}`
        : `trait ${(0, exports.ppAstId)(name)}`;
    return c.concat([
        c.row(`${attrsCode}${header} `),
        c.braced(c.grouped({
            items: declarations,
            getTag: ({ kind }) => kind === "constant_def" || kind === "constant_decl"
                ? 1
                : kind === "field_decl"
                    ? 2
                    : NaN,
            print: exports.ppTraitBody,
        })),
    ]);
};
exports.ppAstTrait = ppAstTrait;
const ppAstConstant = ({ attributes, initializer, name, type }) => (c) => {
    const attrsCode = attributes.map(({ type }) => type + " ").join("");
    return c.row(`${attrsCode}const ${(0, exports.ppAstId)(name)}: ${(0, exports.ppAstType)(type)} = ${(0, exports.ppAstExpression)(initializer)};`);
};
exports.ppAstConstant = ppAstConstant;
const ppAstMessage = ({ name, opcode, fields }) => (c) => {
    const prefixCode = opcode !== null ? `(${(0, exports.ppAstExpression)(opcode)})` : "";
    return c.concat([
        c.row(`message${prefixCode} ${(0, exports.ppAstId)(name)} `),
        c.braced(c.list(fields, exports.ppAstFieldDecl)),
    ]);
};
exports.ppAstMessage = ppAstMessage;
exports.ppModuleItem = (0, tricks_1.makeVisitor)()({
    struct_decl: exports.ppAstStruct,
    contract: exports.ppAstContract,
    primitive_type_decl: exports.ppAstPrimitiveTypeDecl,
    function_def: exports.ppAstFunctionDef,
    asm_function_def: exports.ppAstAsmFunctionDef,
    native_function_decl: exports.ppAstNativeFunction,
    trait: exports.ppAstTrait,
    constant_def: exports.ppAstConstant,
    message_decl: exports.ppAstMessage,
});
const ppAstFieldDecl = ({ type, initializer, as, name }) => (c) => {
    const asAlias = as ? ` as ${(0, exports.ppAstId)(as)}` : "";
    const initializerCode = initializer
        ? ` = ${(0, exports.ppAstExpression)(initializer)}`
        : "";
    return c.row(`${(0, exports.ppAstId)(name)}: ${(0, exports.ppAstType)(type)}${asAlias}${initializerCode};`);
};
exports.ppAstFieldDecl = ppAstFieldDecl;
const ppAstReceiver = ({ selector, statements }) => (c) => c.concat([
    c.row(`${(0, exports.ppAstReceiverKind)(selector)} `),
    (0, exports.ppStatementBlock)(statements)(c),
]);
exports.ppAstReceiver = ppAstReceiver;
const ppAstFunctionDecl = (f) => (c) => c.row(`${(0, exports.ppAstFunctionSignature)(f)};`);
exports.ppAstFunctionDecl = ppAstFunctionDecl;
const ppAstConstDecl = ({ attributes, name, type }) => (c) => {
    const attrsCode = attributes.map(({ type }) => type + " ").join("");
    return c.row(`${attrsCode}const ${(0, exports.ppAstId)(name)}: ${(0, exports.ppAstType)(type)};`);
};
exports.ppAstConstDecl = ppAstConstDecl;
exports.ppTraitBody = (0, tricks_1.makeVisitor)()({
    function_def: exports.ppAstFunctionDef,
    asm_function_def: exports.ppAstAsmFunctionDef,
    constant_def: exports.ppAstConstant,
    field_decl: exports.ppAstFieldDecl,
    receiver: exports.ppAstReceiver,
    function_decl: exports.ppAstFunctionDecl,
    constant_decl: exports.ppAstConstDecl,
});
const ppAstInitFunction = ({ params, statements }) => (c) => {
    const argsCode = params
        .map(({ name, type }) => `${(0, exports.ppAstId)(name)}: ${(0, exports.ppAstType)(type)}`)
        .join(", ");
    if (statements.length === 0) {
        return c.row(`init(${argsCode}) {}`);
    }
    return c.concat([
        c.row(`init(${argsCode}) `),
        c.braced(c.list(statements, exports.ppAstStatement)),
    ]);
};
exports.ppAstInitFunction = ppAstInitFunction;
exports.ppContractBody = (0, tricks_1.makeVisitor)()({
    field_decl: exports.ppAstFieldDecl,
    function_def: exports.ppAstFunctionDef,
    asm_function_def: exports.ppAstAsmFunctionDef,
    contract_init: exports.ppAstInitFunction,
    receiver: exports.ppAstReceiver,
    constant_def: exports.ppAstConstant,
});
const ppAstImport = ({ importPath: { path, type, language } }) => (c) => {
    if (type === "relative") {
        return c.row(`import "${(0, path_1.asString)(path)}";`);
    }
    else {
        if (language === "func") {
            (0, errors_1.throwInternalCompilerError)("There are no standard library files in FunC");
        }
        const displayPath = (0, path_1.asString)(path).slice(0, -".tact".length);
        return c.row(`import "@stdlib/${displayPath}";`);
    }
};
exports.ppAstImport = ppAstImport;
const ppAstFunctionSignature = ({ name, attributes, return: retTy, params, }) => {
    const argsCode = params
        .map(({ name, type }) => `${(0, exports.ppAstId)(name)}: ${(0, exports.ppAstType)(type)}`)
        .join(", ");
    const attrsCode = attributes
        .map((attr) => (0, exports.ppAstFunctionAttribute)(attr) + " ")
        .join("");
    const returnType = retTy ? `: ${(0, exports.ppAstType)(retTy)}` : "";
    return `${attrsCode}fun ${(0, exports.ppAstId)(name)}(${argsCode})${returnType}`;
};
exports.ppAstFunctionSignature = ppAstFunctionSignature;
const ppAstFunctionAttribute = (attr) => {
    if (attr.type === "get" && attr.methodId !== null) {
        return `get(${(0, exports.ppAstExpression)(attr.methodId)})`;
    }
    else {
        return attr.type;
    }
};
exports.ppAstFunctionAttribute = ppAstFunctionAttribute;
const wrap = (prefix, body) => `${prefix}(${body})`;
exports.ppReceiverSubKind = (0, tricks_1.makeVisitor)()({
    simple: ({ param }) => typedParameter(param),
    fallback: () => "",
    comment: ({ comment }) => `"${comment.value}"`,
});
exports.ppAstReceiverKind = (0, tricks_1.makeVisitor)()({
    bounce: ({ param }) => wrap("bounced", typedParameter(param)),
    internal: ({ subKind }) => wrap("receive", (0, exports.ppReceiverSubKind)(subKind)),
    external: ({ subKind }) => wrap("external", (0, exports.ppReceiverSubKind)(subKind)),
});
const ppAstFuncId = (func) => func.text;
exports.ppAstFuncId = ppAstFuncId;
//
// Statements
//
const ppStatementBlock = (stmts) => (c) => c.braced(stmts.length === 0 ? [] : c.list(stmts, exports.ppAstStatement));
exports.ppStatementBlock = ppStatementBlock;
const ppAsmInstructionsBlock = (instructions) => (c) => c.braced(instructions.map(c.row));
exports.ppAsmInstructionsBlock = ppAsmInstructionsBlock;
const ppAstStatementLet = ({ type, name, expression }) => (c) => {
    const tyAnnotation = type === null ? "" : `: ${(0, exports.ppAstType)(type)}`;
    return c.row(`let ${(0, exports.ppAstId)(name)}${tyAnnotation} = ${(0, exports.ppAstExpression)(expression)};`);
};
exports.ppAstStatementLet = ppAstStatementLet;
const ppAstStatementReturn = ({ expression }) => (c) => c.row(`return ${expression ? (0, exports.ppAstExpression)(expression) : ""};`);
exports.ppAstStatementReturn = ppAstStatementReturn;
const ppAstStatementExpression = ({ expression }) => (c) => c.row(`${(0, exports.ppAstExpression)(expression)};`);
exports.ppAstStatementExpression = ppAstStatementExpression;
const ppAstStatementAssign = ({ path, expression }) => (c) => c.row(`${(0, exports.ppAstExpression)(path)} = ${(0, exports.ppAstExpression)(expression)};`);
exports.ppAstStatementAssign = ppAstStatementAssign;
const ppAstStatementAugmentedAssign = ({ path, op, expression }) => (c) => c.row(`${(0, exports.ppAstExpression)(path)} ${op}= ${(0, exports.ppAstExpression)(expression)};`);
exports.ppAstStatementAugmentedAssign = ppAstStatementAugmentedAssign;
const ppAstStatementCondition = ({ condition, trueStatements, falseStatements }) => (c) => {
    if (falseStatements) {
        return c.concat([
            c.row(`if (${(0, exports.ppAstExpression)(condition)}) `),
            (0, exports.ppStatementBlock)(trueStatements)(c),
            c.row(" else "),
            (0, exports.ppStatementBlock)(falseStatements)(c),
        ]);
    }
    else {
        return c.concat([
            c.row(`if (${(0, exports.ppAstExpression)(condition)}) `),
            (0, exports.ppStatementBlock)(trueStatements)(c),
        ]);
    }
};
exports.ppAstStatementCondition = ppAstStatementCondition;
const ppAstStatementWhile = ({ condition, statements }) => (c) => c.concat([
    c.row(`while (${(0, exports.ppAstExpression)(condition)}) `),
    (0, exports.ppStatementBlock)(statements)(c),
]);
exports.ppAstStatementWhile = ppAstStatementWhile;
const ppAstStatementRepeat = ({ iterations, statements }) => (c) => c.concat([
    c.row(`repeat (${(0, exports.ppAstExpression)(iterations)}) `),
    (0, exports.ppStatementBlock)(statements)(c),
]);
exports.ppAstStatementRepeat = ppAstStatementRepeat;
const ppAstStatementUntil = ({ condition, statements }) => (c) => c.concat([
    c.row(`do `),
    (0, exports.ppStatementBlock)(statements)(c),
    c.row(` until (${(0, exports.ppAstExpression)(condition)});`),
]);
exports.ppAstStatementUntil = ppAstStatementUntil;
const ppAstStatementForEach = ({ keyName, valueName, map, statements }) => (c) => c.concat([
    c.row(`foreach (${(0, exports.ppAstId)(keyName)}, ${(0, exports.ppAstId)(valueName)} in ${(0, exports.ppAstExpression)(map)}) `),
    (0, exports.ppStatementBlock)(statements)(c),
]);
exports.ppAstStatementForEach = ppAstStatementForEach;
const ppAstStatementTry = ({ statements, catchBlock }) => (c) => {
    const catchBlocks = catchBlock !== undefined
        ? [
            c.row(` catch (${(0, exports.ppAstId)(catchBlock.catchName)}) `),
            (0, exports.ppStatementBlock)(catchBlock.catchStatements)(c),
        ]
        : [];
    return c.concat([
        c.row(`try `),
        (0, exports.ppStatementBlock)(statements)(c),
        ...catchBlocks,
    ]);
};
exports.ppAstStatementTry = ppAstStatementTry;
const ppAstStatementDestruct = ({ type, identifiers, ignoreUnspecifiedFields, expression }) => (c) => {
    const ids = [];
    for (const [field, name] of identifiers.values()) {
        const id = field.text === name.text
            ? (0, exports.ppAstId)(name)
            : `${(0, exports.ppAstId)(field)}: ${(0, exports.ppAstId)(name)}`;
        ids.push(id);
    }
    const restPattern = ignoreUnspecifiedFields ? ", .." : "";
    return c.row(`let ${(0, exports.ppAstTypeId)(type)} {${ids.join(", ")}${restPattern}} = ${(0, exports.ppAstExpression)(expression)};`);
};
exports.ppAstStatementDestruct = ppAstStatementDestruct;
const typedParameter = ({ name, type }) => `${(0, exports.ppAstId)(name)}: ${(0, exports.ppAstType)(type)}`;
const ppTypedParameter = (param) => (c) => c.row(typedParameter(param));
exports.ppTypedParameter = ppTypedParameter;
const ppAstStatementBlock = ({ statements }) => (c) => (0, exports.ppStatementBlock)(statements)(c);
exports.ppAstStatementBlock = ppAstStatementBlock;
exports.ppAstStatement = (0, tricks_1.makeVisitor)()({
    statement_let: exports.ppAstStatementLet,
    statement_return: exports.ppAstStatementReturn,
    statement_expression: exports.ppAstStatementExpression,
    statement_assign: exports.ppAstStatementAssign,
    statement_augmentedassign: exports.ppAstStatementAugmentedAssign,
    statement_condition: exports.ppAstStatementCondition,
    statement_while: exports.ppAstStatementWhile,
    statement_until: exports.ppAstStatementUntil,
    statement_repeat: exports.ppAstStatementRepeat,
    statement_foreach: exports.ppAstStatementForEach,
    statement_try: exports.ppAstStatementTry,
    statement_destruct: exports.ppAstStatementDestruct,
    statement_block: exports.ppAstStatementBlock,
});
const exprNode = (exprPrinter) => (node) => (c) => c.row(exprPrinter(node));
exports.exprNode = exprNode;
exports.ppAstNode = (0, tricks_1.makeVisitor)()({
    op_binary: (0, exports.exprNode)(exports.ppAstExpression),
    op_unary: (0, exports.exprNode)(exports.ppAstExpression),
    field_access: (0, exports.exprNode)(exports.ppAstExpression),
    method_call: (0, exports.exprNode)(exports.ppAstExpression),
    static_call: (0, exports.exprNode)(exports.ppAstExpression),
    struct_instance: (0, exports.exprNode)(exports.ppAstExpression),
    struct_value: (0, exports.exprNode)(exports.ppAstStructValue),
    init_of: (0, exports.exprNode)(exports.ppAstExpression),
    code_of: (0, exports.exprNode)(exports.ppAstExpression),
    conditional: (0, exports.exprNode)(exports.ppAstExpression),
    number: (0, exports.exprNode)(exports.ppAstExpression),
    id: (0, exports.exprNode)(exports.ppAstExpression),
    boolean: (0, exports.exprNode)(exports.ppAstExpression),
    string: (0, exports.exprNode)(exports.ppAstExpression),
    simplified_string: (0, exports.exprNode)(exports.ppAstExpression),
    null: (0, exports.exprNode)(exports.ppAstExpression),
    address: (0, exports.exprNode)(exports.ppAstExpression),
    cell: (0, exports.exprNode)(exports.ppAstExpression),
    slice: (0, exports.exprNode)(exports.ppAstExpression),
    type_id: (0, exports.exprNode)(exports.ppAstType),
    optional_type: (0, exports.exprNode)(exports.ppAstType),
    map_type: (0, exports.exprNode)(exports.ppAstType),
    bounced_message_type: (0, exports.exprNode)(exports.ppAstType),
    struct_field_initializer: (0, exports.exprNode)(exports.ppAstStructFieldInit),
    struct_field_value: (0, exports.exprNode)(exports.ppAstStructFieldValue),
    destruct_mapping: () => {
        throw new Error("Not implemented");
    },
    destruct_end: () => {
        throw new Error("Not implemented");
    },
    simple: (0, exports.exprNode)(exports.ppReceiverSubKind),
    fallback: (0, exports.exprNode)(exports.ppReceiverSubKind),
    comment: (0, exports.exprNode)(exports.ppReceiverSubKind),
    bounce: (0, exports.exprNode)(exports.ppAstReceiverKind),
    internal: (0, exports.exprNode)(exports.ppAstReceiverKind),
    external: (0, exports.exprNode)(exports.ppAstReceiverKind),
    module: exports.ppAstModule,
    struct_decl: exports.ppAstStruct,
    constant_def: exports.ppAstConstant,
    constant_decl: exports.ppAstConstDecl,
    function_def: exports.ppAstFunctionDef,
    contract: exports.ppAstContract,
    trait: exports.ppAstTrait,
    primitive_type_decl: exports.ppAstPrimitiveTypeDecl,
    message_decl: exports.ppAstMessage,
    native_function_decl: exports.ppAstNativeFunction,
    field_decl: exports.ppAstFieldDecl,
    function_decl: exports.ppAstFunctionDecl,
    receiver: exports.ppAstReceiver,
    contract_init: exports.ppAstInitFunction,
    statement_let: exports.ppAstStatementLet,
    statement_return: exports.ppAstStatementReturn,
    statement_expression: exports.ppAstStatementExpression,
    statement_assign: exports.ppAstStatementAssign,
    statement_augmentedassign: exports.ppAstStatementAugmentedAssign,
    statement_condition: exports.ppAstStatementCondition,
    statement_while: exports.ppAstStatementWhile,
    statement_until: exports.ppAstStatementUntil,
    statement_repeat: exports.ppAstStatementRepeat,
    statement_try: exports.ppAstStatementTry,
    statement_foreach: exports.ppAstStatementForEach,
    statement_block: exports.ppAstStatementBlock,
    import: exports.ppAstImport,
    func_id: (0, exports.exprNode)(exports.ppAstFuncId),
    statement_destruct: exports.ppAstStatementDestruct,
    function_attribute: (0, exports.exprNode)(exports.ppAstFunctionAttribute),
    asm_function_def: exports.ppAstAsmFunctionDef,
    typed_parameter: exports.ppTypedParameter,
});
/**
 * Pretty-prints an AST node into a string representation.
 * @param node The AST node to format.
 * @returns A string that represents the formatted AST node.
 */
const prettyPrint = (node) => (0, exports.ppAstNode)(node)(createContext(4))
    // Initial level of indentation is 0
    .map((f) => f(0))
    // Lines are terminated with \n
    .join("\n");
exports.prettyPrint = prettyPrint;
