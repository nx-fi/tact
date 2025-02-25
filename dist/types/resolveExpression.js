"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpType = getExpType;
exports.resolveExpression = resolveExpression;
exports.getAllExpressionTypes = getAllExpressionTypes;
const ast_helpers_1 = require("../ast/ast-helpers");
const errors_1 = require("../error/errors");
const context_1 = require("../context/context");
const resolveDescriptors_1 = require("./resolveDescriptors");
const types_1 = require("./types");
const map_1 = require("../abi/map");
const global_1 = require("../abi/global");
const subtyping_1 = require("./subtyping");
const struct_1 = require("../abi/struct");
const ast_printer_1 = require("../ast/ast-printer");
const interpreter_1 = require("../optimizer/interpreter");
const constEval_1 = require("../optimizer/constEval");
const util_1 = require("../ast/util");
const store = (0, context_1.createContextStore)();
function getExpType(ctx, exp) {
    const t = store.get(ctx, exp.id);
    if (!t) {
        (0, errors_1.throwInternalCompilerError)(`Expression ${exp.id} not found`);
    }
    return t.description;
}
function registerExpType(ctx, exp, description) {
    const ex = store.get(ctx, exp.id);
    if (ex) {
        if ((0, types_1.typeRefEquals)(ex.description, description)) {
            return ctx;
        }
        (0, errors_1.throwInternalCompilerError)(`Expression ${(0, ast_printer_1.prettyPrint)(exp)} with exp.id = ${exp.id} already has registered type "${(0, types_1.printTypeRef)(ex.description)}" but the typechecker is trying to re-register it as "${(0, types_1.printTypeRef)(description)}"`, exp.loc);
    }
    return store.set(ctx, exp.id, { ast: exp, description });
}
function resolveBooleanLiteral(exp, sctx, ctx) {
    return registerExpType(ctx, exp, {
        kind: "ref",
        name: "Bool",
        optional: false,
    });
}
function resolveIntLiteral(exp, sctx, ctx) {
    return registerExpType(ctx, exp, {
        kind: "ref",
        name: "Int",
        optional: false,
    });
}
function resolveNullLiteral(exp, sctx, ctx) {
    return registerExpType(ctx, exp, { kind: "null" });
}
function resolveAddressLiteral(exp, sctx, ctx) {
    return registerExpType(ctx, exp, {
        kind: "ref",
        name: "Address",
        optional: false,
    });
}
function resolveCellLiteral(exp, sctx, ctx) {
    return registerExpType(ctx, exp, {
        kind: "ref",
        name: "Cell",
        optional: false,
    });
}
function resolveSliceLiteral(exp, sctx, ctx) {
    return registerExpType(ctx, exp, {
        kind: "ref",
        name: "Slice",
        optional: false,
    });
}
function resolveStringLiteral(exp, sctx, ctx) {
    return registerExpType(ctx, exp, {
        kind: "ref",
        name: "String",
        optional: false,
    });
}
function resolveStructNew(exp, sctx, ctx) {
    // Get type
    const tp = (0, resolveDescriptors_1.getType)(ctx, exp.type);
    if (tp.kind !== "struct") {
        (0, errors_1.throwCompilationError)(`Invalid type ${(0, errors_1.idTextErr)(exp.type)} for construction`, exp.loc);
    }
    // Process fields
    const processed = new Set();
    for (const e of exp.args) {
        // Check duplicates
        if (processed.has((0, ast_helpers_1.idText)(e.field))) {
            (0, errors_1.throwCompilationError)(`Duplicate fields ${(0, errors_1.idTextErr)(e.field)}`, e.loc);
        }
        processed.add((0, ast_helpers_1.idText)(e.field));
        // Check existing
        const f = tp.fields.find((v) => (0, ast_helpers_1.eqNames)(v.name, e.field));
        if (!f) {
            (0, errors_1.throwCompilationError)(`Unknown fields ${(0, errors_1.idTextErr)(e.field)} in type ${(0, errors_1.idTextErr)(tp.name)}`, e.loc);
        }
        // Resolve expression
        ctx = resolveExpression(e.initializer, sctx, ctx);
        // Check expression type
        const expressionType = getExpType(ctx, e.initializer);
        if (!(0, subtyping_1.isAssignable)(expressionType, f.type)) {
            (0, errors_1.throwCompilationError)(`Invalid type "${(0, types_1.printTypeRef)(expressionType)}" for field ${(0, errors_1.idTextErr)(e.field)} with type "${(0, types_1.printTypeRef)(f.type)}" in type "${tp.name}"`, e.loc);
        }
    }
    // Check missing fields
    for (const f of tp.fields) {
        if (!processed.has(f.name) &&
            f.ast.initializer === null &&
            !(f.type.kind === "ref" && f.type.optional)) {
            (0, errors_1.throwCompilationError)(`Missing field "${f.name}" in type "${tp.name}"`, exp.loc);
        }
    }
    // Register result
    return registerExpType(ctx, exp, {
        kind: "ref",
        name: tp.name,
        optional: false,
    });
}
function resolveBinaryOp(exp, sctx, ctx) {
    // Resolve left and right expressions
    ctx = resolveExpression(exp.left, sctx, ctx);
    ctx = resolveExpression(exp.right, sctx, ctx);
    const le = getExpType(ctx, exp.left);
    const re = getExpType(ctx, exp.right);
    // Check operands
    let resolved;
    switch (exp.op) {
        case "-":
        case "+":
        case "*":
        case "/":
        case "%":
        case ">>":
        case "<<":
        case "&":
        case "|":
        case "^":
            {
                if (le.kind !== "ref" || le.optional || le.name !== "Int") {
                    (0, errors_1.throwCompilationError)(`Invalid type "${(0, types_1.printTypeRef)(le)}" for binary operator "${exp.op}"`, exp.loc);
                }
                if (re.kind !== "ref" || re.optional || re.name !== "Int") {
                    (0, errors_1.throwCompilationError)(`Invalid type "${(0, types_1.printTypeRef)(re)}" for binary operator "${exp.op}"`, exp.loc);
                }
                // poor man's constant propagation analysis (very local)
                // it works only in the case when the right-hand side is a constant expression
                // and does not have any variables
                if (exp.op === ">>" || exp.op === "<<") {
                    try {
                        const valBits = (0, interpreter_1.ensureInt)((0, constEval_1.evalConstantExpression)(exp.right, ctx, (0, util_1.getAstUtil)((0, ast_helpers_1.getAstFactory)())));
                        if (0n > valBits.value || valBits.value > 256n) {
                            (0, errors_1.throwCompilationError)(`the number of bits shifted ('${valBits.value}') must be within [0..256] range`, exp.right.loc);
                        }
                    }
                    catch (error) {
                        if (!(error instanceof errors_1.TactConstEvalError)) {
                            throw error;
                        }
                    }
                }
                resolved = { kind: "ref", name: "Int", optional: false };
            }
            break;
        case "<":
        case "<=":
        case ">":
        case ">=":
            {
                if (le.kind !== "ref" || le.optional || le.name !== "Int") {
                    (0, errors_1.throwCompilationError)(`Invalid type "${(0, types_1.printTypeRef)(le)}" for binary operator "${exp.op}"`, exp.loc);
                }
                if (re.kind !== "ref" || re.optional || re.name !== "Int") {
                    (0, errors_1.throwCompilationError)(`Invalid type "${(0, types_1.printTypeRef)(re)}" for binary operator "${exp.op}"`, exp.loc);
                }
                resolved = { kind: "ref", name: "Bool", optional: false };
            }
            break;
        case "==":
        case "!=":
            {
                // any inhabitant of an optional type can be compared to null
                if ((le.kind === "ref" && le.optional && re.kind === "null") ||
                    (re.kind === "ref" && re.optional && le.kind === "null")) {
                    resolved = { kind: "ref", name: "Bool", optional: false };
                    break;
                }
                if (!isEqualityType(ctx, le)) {
                    (0, errors_1.throwCompilationError)(`Expressions of "${(0, types_1.printTypeRef)(le)}" type cannot be used for (non)equality operator "${exp.op}"\n See https://docs.tact-lang.org/book/operators#binary-equality`, exp.loc);
                }
                if (!isEqualityType(ctx, re)) {
                    (0, errors_1.throwCompilationError)(`Expressions of "${(0, types_1.printTypeRef)(re)}" type cannot be used for (non)equality operator "${exp.op}"\nSee https://docs.tact-lang.org/book/operators#binary-equality`, exp.loc);
                }
                if (!(0, subtyping_1.isAssignable)(le, re) && !(0, subtyping_1.isAssignable)(re, le)) {
                    (0, errors_1.throwCompilationError)(`Incompatible types "${(0, types_1.printTypeRef)(le)}" and "${(0, types_1.printTypeRef)(re)}" for binary operator "${exp.op}"`, exp.loc);
                }
                resolved = { kind: "ref", name: "Bool", optional: false };
            }
            break;
        case "&&":
        case "||": {
            if (le.kind !== "ref" || le.optional || le.name !== "Bool") {
                (0, errors_1.throwCompilationError)(`Invalid type "${(0, types_1.printTypeRef)(le)}" for binary operator "${exp.op}"`, exp.loc);
            }
            if (re.kind !== "ref" || re.optional || re.name !== "Bool") {
                (0, errors_1.throwCompilationError)(`Invalid type "${(0, types_1.printTypeRef)(re)}" for binary operator "${exp.op}"`, exp.loc);
            }
            resolved = { kind: "ref", name: "Bool", optional: false };
        }
    }
    // Register result
    return registerExpType(ctx, exp, resolved);
}
function isEqualityType(ctx, ty) {
    switch (ty.kind) {
        case "ref": {
            const type = (0, resolveDescriptors_1.getType)(ctx, ty.name);
            if (type.kind === "primitive_type_decl") {
                return (ty.name === "Int" ||
                    ty.name === "Bool" ||
                    ty.name === "Address" ||
                    ty.name === "Cell" ||
                    ty.name === "Slice" ||
                    ty.name === "String");
            }
            else {
                return false;
            }
        }
        case "null":
        case "map":
            return true;
        case "void":
        case "ref_bounced":
            return false;
    }
}
function resolveUnaryOp(exp, sctx, ctx) {
    // Resolve right side
    ctx = resolveExpression(exp.operand, sctx, ctx);
    // Check right type dependent on operator
    let resolvedType = getExpType(ctx, exp.operand);
    switch (exp.op) {
        case "-":
        case "+":
        case "~":
            {
                if (resolvedType.kind !== "ref" ||
                    resolvedType.optional ||
                    resolvedType.name !== "Int") {
                    (0, errors_1.throwCompilationError)(`Invalid type "${(0, types_1.printTypeRef)(resolvedType)}" for unary operator "${exp.op}"`, exp.loc);
                }
            }
            break;
        case "!":
            {
                if (resolvedType.kind !== "ref" ||
                    resolvedType.optional ||
                    resolvedType.name !== "Bool") {
                    (0, errors_1.throwCompilationError)(`Invalid type "${(0, types_1.printTypeRef)(resolvedType)}" for unary operator "${exp.op}"`, exp.loc);
                }
            }
            break;
        case "!!": {
            if (resolvedType.kind !== "ref" || !resolvedType.optional) {
                (0, errors_1.throwCompilationError)(`Type "${(0, types_1.printTypeRef)(resolvedType)}" is not optional`, exp.loc);
            }
            resolvedType = {
                kind: "ref",
                name: resolvedType.name,
                optional: false,
            };
        }
    }
    // Register result
    return registerExpType(ctx, exp, resolvedType);
}
function resolveFieldAccess(exp, sctx, ctx) {
    // Resolve expression
    ctx = resolveExpression(exp.aggregate, sctx, ctx);
    // Find target type and check for type
    const src = getExpType(ctx, exp.aggregate);
    if ((src.kind !== "ref" || src.optional) && src.kind !== "ref_bounced") {
        (0, errors_1.throwCompilationError)(`Invalid type "${(0, types_1.printTypeRef)(src)}" for field access`, exp.loc);
    }
    // Check if field initialized
    if (sctx.requiredFields.length > 0 &&
        exp.aggregate.kind === "id" &&
        exp.aggregate.text === "self") {
        if (sctx.requiredFields.find((v) => (0, ast_helpers_1.eqNames)(v, exp.field))) {
            (0, errors_1.throwCompilationError)(`Field ${(0, errors_1.idTextErr)(exp.field)} is not initialized`, exp.field.loc);
        }
    }
    // Find field
    const srcT = (0, resolveDescriptors_1.getType)(ctx, src.name);
    const fieldIndex = srcT.fields.findIndex((v) => (0, ast_helpers_1.eqNames)(v.name, exp.field));
    const field = fieldIndex !== -1 ? srcT.fields[fieldIndex] : undefined;
    // If we found a field of bounced<T>, check if the field doesn't fit in 224 bytes and cannot be accessed
    if (src.kind === "ref_bounced" &&
        field &&
        fieldIndex >= srcT.partialFieldCount) {
        if (srcT.fields.length === 1) {
            (0, errors_1.throwCompilationError)(`Maximum size of the bounced message is 224 bytes, but the ${(0, errors_1.idTextErr)(exp.field)} field of type ${(0, errors_1.idTextErr)(src.name)} cannot fit into it because its too big, so it cannot be accessed. Reduce the type of this field so that it fits into 224 bytes`, exp.field.loc);
        }
        (0, errors_1.throwCompilationError)(`Maximum size of the bounced message is 224 bytes, but the ${(0, errors_1.idTextErr)(exp.field)} field of type ${(0, errors_1.idTextErr)(src.name)} cannot fit into it due to the size of previous fields or its own size, so it cannot be accessed. Make the type of the fields before this one smaller, or reduce the type of this field so that it fits into 224 bytes`, exp.field.loc);
    }
    const cst = srcT.constants.find((v) => (0, ast_helpers_1.eqNames)(v.name, exp.field));
    if (!field && !cst) {
        const typeStr = src.kind === "ref_bounced"
            ? `bounced<${(0, errors_1.idTextErr)(src.name)}>`
            : (0, errors_1.idTextErr)(src.name);
        if (src.kind === "ref" && !src.optional) {
            // Check for struct methods
            if ((srcT.kind === "struct" &&
                struct_1.StructFunctions.has((0, ast_helpers_1.idText)(exp.field))) ||
                srcT.functions.has((0, ast_helpers_1.idText)(exp.field))) {
                (0, errors_1.throwCompilationError)(`Type ${typeStr} does not have a field named "${exp.field.text}", did you mean "${exp.field.text}()" instead?`, exp.loc);
            }
        }
        (0, errors_1.throwCompilationError)(`Type ${typeStr} does not have a field named ${(0, errors_1.idTextErr)(exp.field)}`, exp.field.loc);
    }
    // Register result type
    if (field) {
        return registerExpType(ctx, exp, field.type);
    }
    else {
        return registerExpType(ctx, exp, cst.type);
    }
}
function checkParameterType(expression, parameter, ctx) {
    const t = getExpType(ctx, expression);
    if (!(0, subtyping_1.isAssignable)(t, parameter.type)) {
        (0, errors_1.throwCompilationError)(`Cannot pass an expression of type "${(0, types_1.printTypeRef)(t)}" to the parameter ${(0, errors_1.idTextErr)(parameter.name)} of type "${(0, types_1.printTypeRef)(parameter.type)}"`, expression.loc);
    }
}
function resolveStaticCall(exp, sctx, ctx) {
    // Check if abi global function
    if (global_1.GlobalFunctions.has((0, ast_helpers_1.idText)(exp.function))) {
        const f = global_1.GlobalFunctions.get((0, ast_helpers_1.idText)(exp.function));
        // Resolve arguments
        for (const e of exp.args) {
            ctx = resolveExpression(e, sctx, ctx);
        }
        // Resolve return type
        const resolved = f.resolve(ctx, exp.args.map((v) => getExpType(ctx, v)), exp.loc);
        // Register return type
        return registerExpType(ctx, exp, resolved);
    }
    // Check if function exists
    if (!(0, resolveDescriptors_1.hasStaticFunction)(ctx, (0, ast_helpers_1.idText)(exp.function))) {
        // check if there is a method with the same name
        if ((0, resolveDescriptors_1.getAllTypes)(ctx).find((ty) => ty.functions.get((0, ast_helpers_1.idText)(exp.function)) !== undefined) !== undefined) {
            (0, errors_1.throwCompilationError)(`Cannot find global function ${(0, errors_1.idTextErr)(exp.function)}, did you mean "self.${(0, ast_helpers_1.idText)(exp.function)}()"?`, exp.loc);
        }
        (0, errors_1.throwCompilationError)(`Cannot find global function ${(0, errors_1.idTextErr)(exp.function)}`, exp.loc);
    }
    // Get static function
    const f = (0, resolveDescriptors_1.getStaticFunction)(ctx, (0, ast_helpers_1.idText)(exp.function));
    // Resolve call arguments
    for (const e of exp.args) {
        ctx = resolveExpression(e, sctx, ctx);
    }
    // Check arguments
    if (f.params.length !== exp.args.length) {
        (0, errors_1.throwCompilationError)(`Function ${(0, errors_1.idTextErr)(exp.function)} expects ${f.params.length} arguments, got ${exp.args.length}`, exp.loc);
    }
    for (const [i, a] of f.params.entries()) {
        checkParameterType(exp.args[i], a, ctx);
    }
    // Resolve return type
    return registerExpType(ctx, exp, f.returns);
}
function resolveCall(exp, sctx, ctx) {
    // Resolve expression
    ctx = resolveExpression(exp.self, sctx, ctx);
    // Check if self is initialized
    if (exp.self.kind === "id" &&
        exp.self.text === "self" &&
        sctx.requiredFields.length > 0) {
        (0, errors_1.throwCompilationError)("Cannot access self before init", exp.loc);
    }
    // Resolve args
    for (const e of exp.args) {
        ctx = resolveExpression(e, sctx, ctx);
    }
    // Resolve return value
    const src = getExpType(ctx, exp.self);
    // Handle ref
    if (src.kind === "ref") {
        // Register return type
        const srcT = (0, resolveDescriptors_1.getType)(ctx, src.name);
        // Check struct ABI
        if (srcT.kind === "struct") {
            if (struct_1.StructFunctions.has((0, ast_helpers_1.idText)(exp.method))) {
                const abi = struct_1.StructFunctions.get((0, ast_helpers_1.idText)(exp.method));
                const resolved = abi.resolve(ctx, [src, ...exp.args.map((v) => getExpType(ctx, v))], exp.loc);
                return registerExpType(ctx, exp, resolved);
            }
        }
        const f = srcT.functions.get((0, ast_helpers_1.idText)(exp.method));
        if (f) {
            // Check arguments
            if (f.params.length !== exp.args.length) {
                (0, errors_1.throwCompilationError)(`Function ${(0, errors_1.idTextErr)(exp.method)} expects ${f.params.length} arguments, got ${exp.args.length}`, exp.loc);
            }
            for (const [i, a] of f.params.entries()) {
                checkParameterType(exp.args[i], a, ctx);
            }
            return registerExpType(ctx, exp, f.returns);
        }
        // Check if a field with the same name exists
        const field = srcT.fields.find((v) => (0, ast_helpers_1.eqNames)(v.name, exp.method));
        if (field) {
            (0, errors_1.throwCompilationError)(`Type "${src.name}" does not have a function named "${exp.method.text}()", did you mean field "${exp.method.text}" instead?`, exp.loc);
        }
        (0, errors_1.throwCompilationError)(`Type "${src.name}" does not have a function named ${(0, errors_1.idTextErr)(exp.method)}`, exp.loc);
    }
    // Handle map
    if (src.kind === "map") {
        if (!map_1.MapFunctions.has((0, ast_helpers_1.idText)(exp.method))) {
            (0, errors_1.throwCompilationError)(`Map function ${(0, errors_1.idTextErr)(exp.method)} not found`, exp.loc);
        }
        const abf = map_1.MapFunctions.get((0, ast_helpers_1.idText)(exp.method));
        const resolved = abf.resolve(ctx, [src, ...exp.args.map((v) => getExpType(ctx, v))], exp.loc);
        return registerExpType(ctx, exp, resolved);
    }
    if (src.kind === "ref_bounced") {
        (0, errors_1.throwCompilationError)(`Cannot call function on bounced value`, exp.loc);
    }
    if (src.kind === "null") {
        // e.g. null.foo()
        // we need to try to find a method foo that accepts nullable type as self
        const types = (0, resolveDescriptors_1.getAllTypes)(ctx);
        const candidates = [];
        for (const t of types) {
            const f = t.functions.get((0, ast_helpers_1.idText)(exp.method));
            if (f) {
                if (f.self?.kind === "ref" && f.self.optional) {
                    candidates.push({ type: t, f });
                }
            }
        }
        const candidate = candidates[0];
        // No candidates found
        if (typeof candidate === "undefined") {
            (0, errors_1.throwCompilationError)(`Invalid type "${(0, types_1.printTypeRef)(src)}" for function call`, exp.loc);
        }
        // Too many candidates found
        if (candidates.length > 1) {
            (0, errors_1.throwCompilationError)(`Ambiguous method call ${(0, errors_1.idTextErr)(exp.method)}`, exp.loc);
        }
        // Return the only candidate
        return registerExpType(ctx, exp, candidate.f.returns);
    }
    (0, errors_1.throwCompilationError)(`Invalid type "${(0, types_1.printTypeRef)(src)}" for function call`, exp.loc);
}
function resolveInitOf(ast, sctx, ctx) {
    // Resolve type
    const type = (0, resolveDescriptors_1.getType)(ctx, ast.contract);
    if (type.kind !== "contract") {
        (0, errors_1.throwCompilationError)(`Type ${(0, errors_1.idTextErr)(ast.contract)} is not a contract`, ast.loc);
    }
    if (!type.init) {
        (0, errors_1.throwCompilationError)(`Contract ${(0, errors_1.idTextErr)(ast.contract)} does not have an init function`, ast.loc);
    }
    // Resolve args
    for (const e of ast.args) {
        ctx = resolveExpression(e, sctx, ctx);
    }
    // Check arguments
    if (type.init.params.length !== ast.args.length) {
        (0, errors_1.throwCompilationError)(`Init function of "${type.name}" expects ${type.init.params.length} arguments, got ${ast.args.length}`, ast.loc);
    }
    for (const [i, a] of type.init.params.entries()) {
        checkParameterType(ast.args[i], a, ctx);
    }
    // Register return type
    return registerExpType(ctx, ast, {
        kind: "ref",
        name: "StateInit",
        optional: false,
    });
}
function resolveCodeOf(ast, ctx) {
    // Resolve type
    const type = (0, resolveDescriptors_1.getType)(ctx, ast.contract);
    if (type.kind !== "contract") {
        (0, errors_1.throwCompilationError)(`Type ${(0, errors_1.idTextErr)(ast.contract)} is not a contract`, ast.loc);
    }
    // Register return type
    return registerExpType(ctx, ast, {
        kind: "ref",
        name: "Cell",
        optional: false,
    });
}
function resolveConditional(ast, sctx, ctx) {
    ctx = resolveExpression(ast.condition, sctx, ctx);
    const conditionType = getExpType(ctx, ast.condition);
    if (conditionType.kind !== "ref" ||
        conditionType.optional ||
        conditionType.name !== "Bool") {
        (0, errors_1.throwCompilationError)(`Invalid type "${(0, types_1.printTypeRef)(conditionType)}" for ternary condition`, ast.condition.loc);
    }
    ctx = resolveExpression(ast.thenBranch, sctx, ctx);
    ctx = resolveExpression(ast.elseBranch, sctx, ctx);
    const thenType = getExpType(ctx, ast.thenBranch);
    const elseType = getExpType(ctx, ast.elseBranch);
    const resultType = (0, subtyping_1.moreGeneralType)(thenType, elseType);
    if (resultType) {
        if (resultType.kind == "void") {
            (0, errors_1.throwCompilationError)(`Expressions of "<void>" type cannot be used for conditional expression`, ast.loc);
        }
        return registerExpType(ctx, ast, resultType);
    }
    (0, errors_1.throwCompilationError)(`Non-matching types "${(0, types_1.printTypeRef)(thenType)}" and "${(0, types_1.printTypeRef)(elseType)}" for ternary branches`, ast.elseBranch.loc);
}
function resolveExpression(exp, sctx, ctx) {
    switch (exp.kind) {
        case "boolean": {
            return resolveBooleanLiteral(exp, sctx, ctx);
        }
        case "number": {
            return resolveIntLiteral(exp, sctx, ctx);
        }
        case "null": {
            return resolveNullLiteral(exp, sctx, ctx);
        }
        case "string": {
            return resolveStringLiteral(exp, sctx, ctx);
        }
        case "address": {
            return resolveAddressLiteral(exp, sctx, ctx);
        }
        case "cell": {
            return resolveCellLiteral(exp, sctx, ctx);
        }
        case "slice": {
            return resolveSliceLiteral(exp, sctx, ctx);
        }
        case "simplified_string": {
            // A simplified string is resolved as a string
            return resolveStringLiteral(exp, sctx, ctx);
        }
        case "struct_value": {
            // A struct value is resolved as a struct instance
            return resolveStructNew(exp, sctx, ctx);
        }
        case "struct_instance": {
            return resolveStructNew(exp, sctx, ctx);
        }
        case "op_binary": {
            return resolveBinaryOp(exp, sctx, ctx);
        }
        case "op_unary": {
            return resolveUnaryOp(exp, sctx, ctx);
        }
        case "id": {
            // Find variable
            const v = sctx.vars.get(exp.text);
            if (!v) {
                if (!(0, resolveDescriptors_1.hasStaticConstant)(ctx, exp.text)) {
                    if ((0, ast_helpers_1.isWildcard)(exp)) {
                        (0, errors_1.throwCompilationError)("Wildcard variable name '_' cannot be accessed", exp.loc);
                    }
                    // Handle static struct method calls
                    try {
                        const t = (0, resolveDescriptors_1.getType)(ctx, exp.text);
                        if (t.kind === "struct") {
                            return registerExpType(ctx, exp, {
                                kind: "ref",
                                name: t.name,
                                optional: false,
                            });
                        }
                    }
                    catch {
                        // Ignore
                    }
                    // Handle possible field access and suggest to use self.field instead
                    const self = sctx.vars.get("self");
                    if (self && self.kind === "ref") {
                        const t = (0, resolveDescriptors_1.getType)(ctx, self.name);
                        if (t.kind === "contract" || t.kind === "trait") {
                            const field = t.fields.find((f) => f.name == exp.text);
                            const constant = t.constants.find((c) => c.name == exp.text);
                            if (typeof field !== "undefined" ||
                                typeof constant !== "undefined") {
                                (0, errors_1.throwCompilationError)(`Cannot find '${exp.text}', did you mean 'self.${exp.text}'?`, exp.loc);
                            }
                        }
                    }
                    (0, errors_1.throwCompilationError)(`Cannot find '${exp.text}'`, exp.loc);
                }
                else {
                    const cc = (0, resolveDescriptors_1.getStaticConstant)(ctx, exp.text);
                    return registerExpType(ctx, exp, cc.type);
                }
            }
            return registerExpType(ctx, exp, v);
        }
        case "field_access": {
            return resolveFieldAccess(exp, sctx, ctx);
        }
        case "static_call": {
            return resolveStaticCall(exp, sctx, ctx);
        }
        case "method_call": {
            return resolveCall(exp, sctx, ctx);
        }
        case "init_of": {
            return resolveInitOf(exp, sctx, ctx);
        }
        case "code_of": {
            return resolveCodeOf(exp, ctx);
        }
        case "conditional": {
            return resolveConditional(exp, sctx, ctx);
        }
    }
}
function getAllExpressionTypes(ctx) {
    const res = [];
    store.all(ctx).forEach((val, _key) => {
        res.push([val.ast.loc.contents, (0, types_1.printTypeRef)(val.description)]);
    });
    return res;
}
