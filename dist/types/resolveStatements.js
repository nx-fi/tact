"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyContext = emptyContext;
exports.addVariable = addVariable;
exports.isLvalue = isLvalue;
exports.resolveStatements = resolveStatements;
const subtyping_1 = require("./subtyping");
const ast_helpers_1 = require("../ast/ast-helpers");
const errors_1 = require("../error/errors");
const resolveDescriptors_1 = require("./resolveDescriptors");
const resolveExpression_1 = require("./resolveExpression");
const types_1 = require("./types");
const constEval_1 = require("../optimizer/constEval");
const interpreter_1 = require("../optimizer/interpreter");
const crc16_1 = require("../utils/crc16");
const util_1 = require("../ast/util");
function emptyContext(root, funName, returns) {
    return {
        root,
        funName,
        returns,
        vars: new Map(),
        requiredFields: [],
    };
}
function checkVariableExists(ctx, sctx, name) {
    if (sctx.vars.has((0, ast_helpers_1.idText)(name))) {
        (0, errors_1.throwCompilationError)(`Variable already exists: ${(0, errors_1.idTextErr)(name)}`, name.loc);
    }
    // Check if the user tries to shadow the current function name
    if (sctx.funName === (0, ast_helpers_1.idText)(name)) {
        (0, errors_1.throwCompilationError)(`Variable cannot have the same name as its enclosing function: ${(0, errors_1.idTextErr)(name)}`, name.loc);
    }
    if ((0, resolveDescriptors_1.hasStaticConstant)(ctx, (0, ast_helpers_1.idText)(name))) {
        if (name.loc.origin === "stdlib") {
            const constLoc = (0, resolveDescriptors_1.getStaticConstant)(ctx, (0, ast_helpers_1.idText)(name)).loc;
            (0, errors_1.throwCompilationError)(`Constant ${(0, errors_1.idTextErr)(name)} is shadowing an identifier defined in the Tact standard library: pick a different constant name`, constLoc);
        }
        else {
            (0, errors_1.throwCompilationError)(`Variable ${(0, errors_1.idTextErr)(name)} is trying to shadow an existing constant with the same name`, name.loc);
        }
    }
}
function addRequiredVariables(name, src) {
    if (src.requiredFields.find((v) => v === name)) {
        (0, errors_1.throwInternalCompilerError)(`Variable already exists: ${name}`); // Should happen earlier
    }
    return {
        ...src,
        requiredFields: [...src.requiredFields, name],
    };
}
function removeRequiredVariable(name, src) {
    if (!src.requiredFields.find((v) => v === name)) {
        (0, errors_1.throwInternalCompilerError)(`Variable is not required: ${name}`); // Should happen earlier
    }
    const filtered = src.requiredFields.filter((v) => v !== name);
    return {
        ...src,
        requiredFields: filtered,
    };
}
function addVariable(name, ref, ctx, sctx) {
    checkVariableExists(ctx, sctx, name); // Should happen earlier
    if ((0, ast_helpers_1.isWildcard)(name)) {
        return sctx;
    }
    return {
        ...sctx,
        vars: new Map(sctx.vars).set((0, ast_helpers_1.idText)(name), ref),
    };
}
function processCondition(condition, sctx, ctx) {
    // Process expression
    ctx = (0, resolveExpression_1.resolveExpression)(condition.condition, sctx, ctx);
    let initialCtx = sctx;
    // Simple if
    if (condition.falseStatements === null) {
        const r = processStatements(condition.trueStatements, initialCtx, ctx);
        ctx = r.ctx;
        return { ctx, sctx: initialCtx, returnAlwaysReachable: false };
    }
    // Simple if-else
    const processedCtx = [];
    const returnAlwaysReachableInAllBranches = [];
    // Process true branch
    const r1 = processStatements(condition.trueStatements, initialCtx, ctx);
    ctx = r1.ctx;
    processedCtx.push(r1.sctx);
    returnAlwaysReachableInAllBranches.push(r1.returnAlwaysReachable);
    // Process false branch
    const r2 = processStatements(condition.falseStatements, initialCtx, ctx);
    ctx = r2.ctx;
    processedCtx.push(r2.sctx);
    returnAlwaysReachableInAllBranches.push(r2.returnAlwaysReachable);
    // Merge statement contexts
    const removed = [];
    for (const f of initialCtx.requiredFields) {
        let found = false;
        for (const c of processedCtx) {
            if (c.requiredFields.find((v) => v === f)) {
                found = true;
                break;
            }
        }
        if (!found) {
            removed.push(f);
        }
    }
    for (const r of removed) {
        initialCtx = removeRequiredVariable(r, initialCtx);
    }
    return {
        ctx,
        sctx: initialCtx,
        returnAlwaysReachable: returnAlwaysReachableInAllBranches.every((x) => x),
    };
}
// Precondition: `self` here means a contract or a trait,
// and not a `self` parameter of a mutating method
function isLvalue(path, ctx) {
    const headId = path[0];
    if ((0, ast_helpers_1.isSelfId)(headId) && path.length > 1) {
        // we can be dealing with a contract/trait constant `self.constFoo`
        const selfTypeRef = (0, resolveExpression_1.getExpType)(ctx, headId);
        if (selfTypeRef.kind == "ref") {
            const contractTypeDescription = (0, resolveDescriptors_1.getType)(ctx, selfTypeRef.name);
            return (contractTypeDescription.constants.findIndex((constDescr) => (0, ast_helpers_1.eqNames)(path[1], constDescr.name)) === -1);
        }
        else {
            return true;
        }
    }
    else {
        // if the head path symbol is a global constant, then the whole path expression is a constant
        return !(0, resolveDescriptors_1.hasStaticConstant)(ctx, (0, ast_helpers_1.idText)(headId));
    }
}
function processStatements(statements, sctx, ctx) {
    // Process statements
    let returnAlwaysReachable = false;
    for (const s of statements) {
        // Check for unreachable
        if (returnAlwaysReachable) {
            (0, errors_1.throwCompilationError)("Unreachable statement", s.loc);
        }
        // Process statement
        switch (s.kind) {
            case "statement_let":
                {
                    // Process expression
                    ctx = (0, resolveExpression_1.resolveExpression)(s.expression, sctx, ctx);
                    // Check variable name
                    checkVariableExists(ctx, sctx, s.name);
                    // Check type
                    const expressionType = (0, resolveExpression_1.getExpType)(ctx, s.expression);
                    if (s.type !== null) {
                        const variableType = (0, resolveDescriptors_1.resolveTypeRef)(ctx, s.type);
                        if (!(0, subtyping_1.isAssignable)(expressionType, variableType)) {
                            (0, errors_1.throwCompilationError)(`Type mismatch: "${(0, types_1.printTypeRef)(expressionType)}" is not assignable to "${(0, types_1.printTypeRef)(variableType)}"`, s.loc);
                        }
                        sctx = addVariable(s.name, variableType, ctx, sctx);
                    }
                    else {
                        if (expressionType.kind === "null") {
                            (0, errors_1.throwCompilationError)(`Cannot infer type for ${(0, errors_1.idTextErr)(s.name)}`, s.loc);
                        }
                        if (expressionType.kind === "void") {
                            (0, errors_1.throwCompilationError)(`The inferred type of variable ${(0, errors_1.idTextErr)(s.name)} is "void", which is not allowed`, s.loc);
                        }
                        sctx = addVariable(s.name, expressionType, ctx, sctx);
                    }
                }
                break;
            case "statement_assign":
                {
                    const tempSctx = { ...sctx, requiredFields: [] };
                    // Process lvalue
                    ctx = (0, resolveExpression_1.resolveExpression)(s.path, tempSctx, ctx);
                    const path = (0, ast_helpers_1.tryExtractPath)(s.path);
                    if (path === null) {
                        (0, errors_1.throwCompilationError)(`Assignments are allowed only into path expressions, i.e. identifiers, or sequences of direct contract/struct/message accesses, like "self.foo" or "self.structure.field"`, s.path.loc);
                    }
                    if (!isLvalue(path, ctx)) {
                        (0, errors_1.throwCompilationError)("Modifications of constant expressions are not allowed", s.path.loc);
                    }
                    // Process expression
                    ctx = (0, resolveExpression_1.resolveExpression)(s.expression, sctx, ctx);
                    // Check type
                    const expressionType = (0, resolveExpression_1.getExpType)(ctx, s.expression);
                    const tailType = (0, resolveExpression_1.getExpType)(ctx, s.path);
                    if (!(0, subtyping_1.isAssignable)(expressionType, tailType)) {
                        (0, errors_1.throwCompilationError)(`Type mismatch: "${(0, types_1.printTypeRef)(expressionType)}" is not assignable to "${(0, types_1.printTypeRef)(tailType)}"`, s.loc);
                    }
                    // Mark as assigned
                    if (path.length === 2 && path[0].text === "self") {
                        const field = path[1].text;
                        if (sctx.requiredFields.findIndex((v) => v === field) >=
                            0) {
                            sctx = removeRequiredVariable(field, sctx);
                        }
                    }
                }
                break;
            case "statement_augmentedassign":
                {
                    // Process lvalue
                    const tempSctx = { ...sctx, requiredFields: [] };
                    ctx = (0, resolveExpression_1.resolveExpression)(s.path, tempSctx, ctx);
                    const path = (0, ast_helpers_1.tryExtractPath)(s.path);
                    if (path === null) {
                        (0, errors_1.throwCompilationError)(`Assignments are allowed only into path expressions, i.e. identifiers, or sequences of direct contract/struct/message accesses, like "self.foo" or "self.structure.field"`, s.path.loc);
                    }
                    if (!isLvalue(path, ctx)) {
                        (0, errors_1.throwCompilationError)("Modifications of constant expressions are not allowed", s.path.loc);
                    }
                    // Process expression
                    ctx = (0, resolveExpression_1.resolveExpression)(s.expression, sctx, ctx);
                    // Check type
                    const tailType = (0, resolveExpression_1.getExpType)(ctx, s.path);
                    const expressionType = (0, resolveExpression_1.getExpType)(ctx, s.expression);
                    // Check if any of the types is not ref or is optional or types themselves don't match
                    if (tailType.kind !== "ref" || tailType.optional) {
                        (0, errors_1.throwCompilationError)(`Type error: invalid type ${(0, types_1.printTypeRef)(tailType)} for augmented assignment`, s.path.loc);
                    }
                    if (expressionType.kind !== "ref" ||
                        expressionType.optional) {
                        (0, errors_1.throwCompilationError)(`Type error: invalid type ${(0, types_1.printTypeRef)(expressionType)} for augmented assignment`, s.expression.loc);
                    }
                    if (s.op === "&&" || s.op === "||") {
                        if (tailType.name !== "Bool") {
                            (0, errors_1.throwCompilationError)(`Type error: Augmented assignment ${s.op}= is only allowed for Bool type`, s.path.loc);
                        }
                        if (expressionType.name !== "Bool") {
                            (0, errors_1.throwCompilationError)(`Type error: Augmented assignment ${s.op}= is only allowed for Bool type`, s.expression.loc);
                        }
                    }
                    else {
                        if (tailType.name !== "Int") {
                            (0, errors_1.throwCompilationError)(`Type error: Augmented assignment ${s.op}= is only allowed for Int type`, s.path.loc);
                        }
                        if (expressionType.name !== "Int") {
                            (0, errors_1.throwCompilationError)(`Type error: Augmented assignment ${s.op}= is only allowed for Int type`, s.expression.loc);
                        }
                    }
                }
                break;
            case "statement_expression":
                {
                    // Process expression
                    ctx = (0, resolveExpression_1.resolveExpression)(s.expression, sctx, ctx);
                    // take `throw` and `throwNative` into account when doing
                    // return-reachability analysis
                    if (s.expression.kind === "static_call" &&
                        ["throw", "nativeThrow"].includes((0, ast_helpers_1.idText)(s.expression.function))) {
                        returnAlwaysReachable = true;
                    }
                }
                break;
            case "statement_condition":
                {
                    // Process condition (expression resolved inside)
                    const r = processCondition(s, sctx, ctx);
                    ctx = r.ctx;
                    sctx = r.sctx;
                    returnAlwaysReachable ||= r.returnAlwaysReachable;
                    // Check type
                    const expressionType = (0, resolveExpression_1.getExpType)(ctx, s.condition);
                    if (expressionType.kind !== "ref" ||
                        expressionType.name !== "Bool" ||
                        expressionType.optional) {
                        (0, errors_1.throwCompilationError)(`Type mismatch: "${(0, types_1.printTypeRef)(expressionType)}" is not assignable to "Bool"`, s.loc);
                    }
                }
                break;
            case "statement_return":
                {
                    if (s.expression) {
                        // Process expression
                        ctx = (0, resolveExpression_1.resolveExpression)(s.expression, sctx, ctx);
                        // Check type
                        const expressionType = (0, resolveExpression_1.getExpType)(ctx, s.expression);
                        // Actually, we might relax the following restriction in the future
                        // Because `return foo()` means `foo(); return` for a void-returning function
                        // And `return foo()` looks nicer when the user needs early exit from a function
                        // right after executing `foo()`
                        if (expressionType.kind == "void") {
                            (0, errors_1.throwCompilationError)(`'return' statement can only be used with non-void types`, s.loc);
                        }
                        if (!(0, subtyping_1.isAssignable)(expressionType, sctx.returns)) {
                            (0, errors_1.throwCompilationError)(`Type mismatch: "${(0, types_1.printTypeRef)(expressionType)}" is not assignable to "${(0, types_1.printTypeRef)(sctx.returns)}"`, s.loc);
                        }
                    }
                    else {
                        if (sctx.returns.kind !== "void") {
                            (0, errors_1.throwCompilationError)(`The function fails to return a result of type "${(0, types_1.printTypeRef)(sctx.returns)}"`, s.loc);
                        }
                    }
                    // Check if all required variables are assigned
                    if (sctx.requiredFields.length > 0) {
                        if (sctx.requiredFields.length === 1) {
                            (0, errors_1.throwCompilationError)(`Field "${sctx.requiredFields[0]}" is not set`, sctx.root);
                        }
                        else {
                            (0, errors_1.throwCompilationError)(`Fields ${sctx.requiredFields.map((x) => '"' + x + '"').join(", ")} are not set`, sctx.root);
                        }
                    }
                    returnAlwaysReachable = true;
                }
                break;
            case "statement_repeat":
                {
                    // Process expression
                    ctx = (0, resolveExpression_1.resolveExpression)(s.iterations, sctx, ctx);
                    // Process statements
                    const r = processStatements(s.statements, sctx, ctx);
                    ctx = r.ctx;
                    // Check type
                    const expressionType = (0, resolveExpression_1.getExpType)(ctx, s.iterations);
                    if (expressionType.kind !== "ref" ||
                        expressionType.name !== "Int" ||
                        expressionType.optional) {
                        (0, errors_1.throwCompilationError)(`Type mismatch: "${(0, types_1.printTypeRef)(expressionType)}" is not assignable to "Int"`, s.loc);
                    }
                }
                break;
            case "statement_until":
                {
                    // Process expression
                    ctx = (0, resolveExpression_1.resolveExpression)(s.condition, sctx, ctx);
                    // Process statements
                    const r = processStatements(s.statements, sctx, ctx);
                    ctx = r.ctx;
                    // XXX a do-until loop is a weird place to always return from a function
                    // so we might want to issue a warning here
                    returnAlwaysReachable ||= r.returnAlwaysReachable;
                    // Check type
                    const expressionType = (0, resolveExpression_1.getExpType)(ctx, s.condition);
                    if (expressionType.kind !== "ref" ||
                        expressionType.name !== "Bool" ||
                        expressionType.optional) {
                        (0, errors_1.throwCompilationError)(`Type mismatch: "${(0, types_1.printTypeRef)(expressionType)}" is not assignable to "Bool"`, s.loc);
                    }
                }
                break;
            case "statement_while":
                {
                    // Process expression
                    ctx = (0, resolveExpression_1.resolveExpression)(s.condition, sctx, ctx);
                    // Process statements
                    const r = processStatements(s.statements, sctx, ctx);
                    ctx = r.ctx;
                    // a while loop might be executed zero times, so
                    // even if its body always returns from a function
                    // we don't care
                    // Check type
                    const expressionType = (0, resolveExpression_1.getExpType)(ctx, s.condition);
                    if (expressionType.kind !== "ref" ||
                        expressionType.name !== "Bool" ||
                        expressionType.optional) {
                        (0, errors_1.throwCompilationError)(`Type mismatch: "${(0, types_1.printTypeRef)(expressionType)}" is not assignable to "Bool"`, s.loc);
                    }
                }
                break;
            case "statement_try":
                {
                    let initialSctx = sctx;
                    // Process inner statements
                    const r = processStatements(s.statements, sctx, ctx);
                    ctx = r.ctx;
                    // try-statement might not return from the current function
                    // because the control flow can go to the empty catch block
                    if (s.catchBlock === undefined) {
                        break;
                    }
                    let catchCtx = sctx;
                    // Process catchName variable for exit code
                    checkVariableExists(ctx, initialSctx, s.catchBlock.catchName);
                    catchCtx = addVariable(s.catchBlock.catchName, { kind: "ref", name: "Int", optional: false }, ctx, initialSctx);
                    // Process catch statements
                    const rCatch = processStatements(s.catchBlock.catchStatements, catchCtx, ctx);
                    ctx = rCatch.ctx;
                    catchCtx = rCatch.sctx;
                    // if both catch- and try- blocks always return from the current function
                    // we mark the whole try-catch statement as always returning
                    returnAlwaysReachable ||=
                        r.returnAlwaysReachable && rCatch.returnAlwaysReachable;
                    // Merge statement contexts
                    const removed = [];
                    for (const f of initialSctx.requiredFields) {
                        if (!catchCtx.requiredFields.find((v) => v === f)) {
                            removed.push(f);
                        }
                    }
                    for (const r of removed) {
                        initialSctx = removeRequiredVariable(r, initialSctx);
                    }
                }
                break;
            case "statement_foreach": {
                let initialSctx = sctx; // Preserve initial context to use later for merging
                // Resolve map expression
                ctx = (0, resolveExpression_1.resolveExpression)(s.map, sctx, ctx);
                const mapPath = (0, ast_helpers_1.tryExtractPath)(s.map);
                if (mapPath === null) {
                    (0, errors_1.throwCompilationError)(`foreach is only allowed over maps that are path expressions, i.e. identifiers, or sequences of direct contract/struct/message accesses, like "self.foo" or "self.structure.field"`, s.map.loc);
                }
                // Check if map is valid
                const mapType = (0, resolveExpression_1.getExpType)(ctx, s.map);
                if (mapType.kind !== "map") {
                    (0, errors_1.throwCompilationError)(`foreach can only be used on maps, but "${mapPath.map((id) => id.text).join(".")}" has type "${(0, types_1.printTypeRef)(mapType)}"`, s.map.loc);
                }
                let foreachSctx = sctx;
                // Add key and value to statement context
                if (!(0, ast_helpers_1.isWildcard)(s.keyName)) {
                    checkVariableExists(ctx, initialSctx, s.keyName);
                    foreachSctx = addVariable(s.keyName, { kind: "ref", name: mapType.key, optional: false }, ctx, initialSctx);
                }
                if (!(0, ast_helpers_1.isWildcard)(s.valueName)) {
                    checkVariableExists(ctx, foreachSctx, s.valueName);
                    foreachSctx = addVariable(s.valueName, { kind: "ref", name: mapType.value, optional: false }, ctx, foreachSctx);
                }
                // Process inner statements
                const r = processStatements(s.statements, foreachSctx, ctx);
                ctx = r.ctx;
                foreachSctx = r.sctx;
                // Merge statement contexts (similar to catch block merging)
                const removed = [];
                for (const f of initialSctx.requiredFields) {
                    if (!foreachSctx.requiredFields.find((v) => v === f)) {
                        removed.push(f);
                    }
                }
                for (const r of removed) {
                    initialSctx = removeRequiredVariable(r, initialSctx);
                }
                sctx = initialSctx; // Re-assign the modified initial context back to sctx after merging
                break;
            }
            case "statement_destruct": {
                // Process expression
                ctx = (0, resolveExpression_1.resolveExpression)(s.expression, sctx, ctx);
                // Check variable names
                for (const [_, name] of s.identifiers.values()) {
                    checkVariableExists(ctx, sctx, name);
                }
                // Check type
                const expressionType = (0, resolveExpression_1.getExpType)(ctx, s.expression);
                if (expressionType.kind !== "ref") {
                    (0, errors_1.throwCompilationError)(`Type '${(0, types_1.printTypeRef)(expressionType)}' cannot be destructured`, s.expression.loc);
                }
                if (expressionType.optional) {
                    (0, errors_1.throwCompilationError)(`Type '${(0, types_1.printTypeRef)(expressionType)}' is optional and cannot be destructured`, s.expression.loc);
                }
                const ty = (0, resolveDescriptors_1.getType)(ctx, expressionType.name);
                if (ty.kind !== "struct") {
                    (0, errors_1.throwCompilationError)(`Type '${(0, types_1.printTypeRef)(expressionType)}' cannot be destructured`, s.expression.loc);
                }
                // Check variables count
                if (!s.ignoreUnspecifiedFields &&
                    s.identifiers.size !== ty.fields.length) {
                    (0, errors_1.throwCompilationError)(`Expected ${ty.fields.length} fields, but got ${s.identifiers.size}`, s.loc);
                }
                // Compare type with the specified one
                const typeRef = (0, resolveDescriptors_1.resolveTypeRef)(ctx, s.type);
                if (typeRef.kind !== "ref") {
                    (0, errors_1.throwInternalCompilerError)(`Unexpected type kind: '${typeRef.kind}'`, s.type.loc);
                }
                if (expressionType.name !== typeRef.name) {
                    (0, errors_1.throwCompilationError)(`Type mismatch: "${(0, types_1.printTypeRef)(expressionType)}" is not assignable to "${(0, types_1.printTypeRef)(typeRef)}"`, s.expression.loc);
                }
                // Add variables
                s.identifiers.forEach(([field, name], _) => {
                    const f = ty.fields.find((f) => (0, ast_helpers_1.eqNames)(f.name, field));
                    if (!f) {
                        (0, errors_1.throwCompilationError)(`Field '${(0, errors_1.idTextErr)(field)}' not found in type '${expressionType.name}'`, field.loc);
                    }
                    if (name.text !== "_") {
                        sctx = addVariable(name, f.type, ctx, sctx);
                    }
                });
                break;
            }
            case "statement_block": {
                const r = processStatements(s.statements, sctx, ctx);
                ctx = r.ctx;
                returnAlwaysReachable ||= r.returnAlwaysReachable;
                break;
            }
        }
    }
    return { ctx, sctx, returnAlwaysReachable };
}
function processFunctionBody(statements, sctx, ctx) {
    const res = processStatements(statements, sctx, ctx);
    // Check if a non-void function always returns a value
    if (sctx.returns.kind !== "void" && !res.returnAlwaysReachable) {
        (0, errors_1.throwCompilationError)(`Function does not always return a result. Adding 'return' statement(s) should fix the issue.`, res.sctx.root);
    }
    // Check if all required variables are assigned
    if (res.sctx.requiredFields.length > 0) {
        if (res.sctx.requiredFields.length === 1) {
            (0, errors_1.throwCompilationError)(`Field "${res.sctx.requiredFields[0]}" is not set`, res.sctx.root);
        }
        else {
            (0, errors_1.throwCompilationError)(`Fields ${res.sctx.requiredFields.map((x) => '"' + x + '"').join(", ")} are not set`, res.sctx.root);
        }
    }
    return res.ctx;
}
function resolveStatements(ctx, Ast) {
    const util = (0, util_1.getAstUtil)(Ast);
    // Process all static functions
    for (const f of (0, resolveDescriptors_1.getAllStaticFunctions)(ctx)) {
        if (f.ast.kind === "function_def") {
            // Build statement context
            let sctx = emptyContext(f.ast.loc, f.name, f.returns);
            for (const p of f.params) {
                sctx = addVariable(p.name, p.type, ctx, sctx);
            }
            ctx = processFunctionBody(f.ast.statements, sctx, ctx);
        }
    }
    // Process all types
    for (const t of (0, resolveDescriptors_1.getAllTypes)(ctx)) {
        // Process init
        if (t.init) {
            // Build statement context
            let sctx = emptyContext(t.init.ast.loc, null, { kind: "void" });
            // Self
            sctx = addVariable(ast_helpers_1.selfId, { kind: "ref", name: t.name, optional: false }, ctx, sctx);
            // Required variables
            for (const f of t.fields) {
                if (f.default !== undefined) {
                    // NOTE: undefined is important here
                    continue;
                }
                if ((0, subtyping_1.isAssignable)({ kind: "null" }, f.type)) {
                    continue;
                }
                sctx = addRequiredVariables(f.name, sctx);
            }
            // Args
            for (const p of t.init.params) {
                sctx = addVariable(p.name, p.type, ctx, sctx);
            }
            // Process
            ctx = processFunctionBody(t.init.ast.statements, sctx, ctx);
        }
        // Process receivers
        for (const f of t.receivers) {
            // Build statement context
            let sctx = emptyContext(f.ast.loc, null, { kind: "void" });
            sctx = addVariable(ast_helpers_1.selfId, { kind: "ref", name: t.name, optional: false }, ctx, sctx);
            switch (f.selector.kind) {
                case "internal-binary":
                case "external-binary":
                    {
                        sctx = addVariable(f.selector.name, {
                            kind: "ref",
                            name: f.selector.type,
                            optional: false,
                        }, ctx, sctx);
                    }
                    break;
                case "internal-empty":
                case "external-empty":
                case "external-comment":
                case "internal-comment":
                    // Nothing to add to context
                    break;
                case "internal-comment-fallback":
                case "external-comment-fallback":
                    {
                        sctx = addVariable(f.selector.name, { kind: "ref", name: "String", optional: false }, ctx, sctx);
                    }
                    break;
                case "internal-fallback":
                case "external-fallback":
                    {
                        sctx = addVariable(f.selector.name, { kind: "ref", name: "Slice", optional: false }, ctx, sctx);
                    }
                    break;
                case "bounce-fallback":
                    {
                        sctx = addVariable(f.selector.name, { kind: "ref", name: "Slice", optional: false }, ctx, sctx);
                    }
                    break;
                case "bounce-binary":
                    {
                        sctx = addVariable(f.selector.name, f.selector.bounced
                            ? { kind: "ref_bounced", name: f.selector.type }
                            : {
                                kind: "ref",
                                name: f.selector.type,
                                optional: false,
                            }, ctx, sctx);
                    }
                    break;
            }
            // Process
            ctx = processFunctionBody(f.ast.statements, sctx, ctx);
        }
        // Process functions
        const methodIds = new Map();
        for (const f of t.functions.values()) {
            if (f.ast.kind !== "native_function_decl" &&
                f.ast.kind !== "function_decl" &&
                f.ast.kind !== "asm_function_def") {
                // Build statement context
                let sctx = emptyContext(f.ast.loc, f.name, f.returns);
                if (f.self === null) {
                    (0, errors_1.throwInternalCompilerError)("Self is null where it should not be");
                }
                sctx = addVariable(ast_helpers_1.selfId, f.self, ctx, sctx);
                // Check for collisions in getter method IDs
                if (f.isGetter) {
                    const methodId = getMethodId(f, ctx, sctx, util);
                    const existing = methodIds.get(methodId);
                    if (existing) {
                        (0, errors_1.throwCompilationError)(`Method ID collision: getter '${f.name}' has the same method ID ${methodId} as getter '${existing}'\nPick a different getter name or explicit method ID to avoid collisions`, f.ast.name.loc);
                    }
                    else {
                        f.methodId = methodId;
                        methodIds.set(methodId, f.name);
                    }
                }
                for (const a of f.params) {
                    sctx = addVariable(a.name, a.type, ctx, sctx);
                }
                ctx = processFunctionBody(f.ast.statements, sctx, ctx);
            }
        }
    }
    return ctx;
}
function checkMethodId(methodId, loc) {
    // method ids are 19-bit signed integers
    if (methodId < -(2n ** 18n) || methodId >= 2n ** 18n) {
        (0, errors_1.throwConstEvalError)("method ids must fit 19-bit signed integer range", true, loc);
    }
    // method ids -4, -3, -2, -1, 0 ... 2^14 - 1 (inclusive) are kind of reserved by TVM
    // for the upper bound see F12_n (CALL) TVM instruction
    // and many small ids will be taken by internal procedures
    //
    // also, some ids are taken by the getters generated by Tact:
    // supported_interfaces -> 113617
    // lazy_deployment_completed -> 115390
    // get_abi_ipfs -> 121275
    if (-4n <= methodId && methodId < 2n ** 14n) {
        (0, errors_1.throwConstEvalError)("method ids cannot overlap with the TVM reserved ids: -4, -3, -2, -1, 0 ... 2^14 - 1", true, loc);
    }
    const tactGeneratedGetterMethodIds = [113617n, 115390n, 121275n];
    if (tactGeneratedGetterMethodIds.includes(methodId)) {
        (0, errors_1.throwConstEvalError)(`method ids cannot overlap with Tact reserved method ids: ${tactGeneratedGetterMethodIds.map((n) => n.toString()).join(", ")}`, true, loc);
    }
}
function getMethodId(funcDescr, ctx, sctx, util) {
    const optMethodId = funcDescr.ast.attributes.find((attr) => attr.type === "get")?.methodId;
    if (optMethodId) {
        ctx = (0, resolveExpression_1.resolveExpression)(optMethodId, sctx, ctx);
        const ty = (0, resolveExpression_1.getExpType)(ctx, optMethodId);
        if (!(ty.kind === "ref" && ty.name === "Int")) {
            (0, errors_1.throwCompilationError)(`Getter's method id expression must be of type "Int" but it has type "${(0, types_1.printTypeRef)(ty)}"`, optMethodId.loc);
        }
        const methodId = (0, interpreter_1.ensureInt)((0, constEval_1.evalConstantExpression)(optMethodId, ctx, util)).value;
        checkMethodId(methodId, optMethodId.loc);
        return Number(methodId);
    }
    else {
        const methodId = ((0, crc16_1.crc16)(funcDescr.name) & 0xffff) | 0x10000;
        checkMethodId(BigInt(methodId), funcDescr.ast.loc);
        return methodId;
    }
}
