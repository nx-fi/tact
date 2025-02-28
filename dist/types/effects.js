"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeReceiversEffects = computeReceiversEffects;
const ast_helpers_1 = require("../ast/ast-helpers");
const resolveDescriptors_1 = require("./resolveDescriptors");
const errors_1 = require("../error/errors");
const resolveExpression_1 = require("./resolveExpression");
function computeReceiversEffects(ctx) {
    for (const type of (0, resolveDescriptors_1.getAllTypes)(ctx)) {
        if (type.kind === "contract") {
            for (const receiver of type.receivers) {
                receiver.effects = statementListEffects(receiver.ast.statements, new Set(), ctx);
            }
        }
    }
}
function statementListEffects(statements, processedContractMethods, ctx) {
    return mapUnionAll(statements, (stmt) => statementEffects(stmt, processedContractMethods, ctx));
}
function statementEffects(stmt, processedContractMethods, ctx) {
    switch (stmt.kind) {
        case "statement_let":
        case "statement_expression":
        case "statement_destruct": {
            return expressionEffects(stmt.expression, processedContractMethods, ctx);
        }
        case "statement_return": {
            return stmt.expression
                ? expressionEffects(stmt.expression, processedContractMethods, ctx)
                : new Set();
        }
        case "statement_assign":
        case "statement_augmentedassign": {
            // since we don't analyze method bodies, we know `self` refers to the contract itself
            const [head, _] = (0, ast_helpers_1.tryExtractPath)(stmt.path) ?? [];
            if (typeof head === "undefined") {
                (0, errors_1.throwInternalCompilerError)("Not an l-value and typechecker should have caught it", stmt.path.loc);
            }
            const rhsEffects = expressionEffects(stmt.expression, processedContractMethods, ctx);
            if ((0, ast_helpers_1.isSelfId)(head)) {
                const lvalueEffects = stmt.kind === "statement_augmentedassign"
                    ? new Set([
                        "contractStorageWrite",
                        "contractStorageRead",
                    ])
                    : new Set(["contractStorageWrite"]);
                return union(lvalueEffects, rhsEffects);
            }
            else {
                return rhsEffects;
            }
        }
        case "statement_condition": {
            const conditionEffects = expressionEffects(stmt.condition, processedContractMethods, ctx);
            const thenEffects = statementListEffects(stmt.trueStatements, processedContractMethods, ctx);
            const elseEffects = statementListEffects(stmt.falseStatements ?? [], processedContractMethods, ctx);
            return unionAll([conditionEffects, thenEffects, elseEffects]);
        }
        case "statement_while":
        case "statement_until": {
            const conditionEffects = expressionEffects(stmt.condition, processedContractMethods, ctx);
            const bodyEffects = statementListEffects(stmt.statements, processedContractMethods, ctx);
            return union(conditionEffects, bodyEffects);
        }
        case "statement_repeat": {
            const iterationsEffects = expressionEffects(stmt.iterations, processedContractMethods, ctx);
            const bodyEffects = statementListEffects(stmt.statements, processedContractMethods, ctx);
            return union(iterationsEffects, bodyEffects);
        }
        case "statement_try": {
            const tryEffects = statementListEffects(stmt.statements, processedContractMethods, ctx);
            const catchEffects = statementListEffects(stmt.catchBlock?.catchStatements ?? [], processedContractMethods, ctx);
            return union(tryEffects, catchEffects);
        }
        case "statement_foreach": {
            const mapExpressionEffects = expressionEffects(stmt.map, processedContractMethods, ctx);
            const bodyEffects = statementListEffects(stmt.statements, processedContractMethods, ctx);
            return union(mapExpressionEffects, bodyEffects);
        }
        case "statement_block": {
            return statementListEffects(stmt.statements, processedContractMethods, ctx);
        }
    }
}
function expressionEffects(expr, processedContractMethods, ctx) {
    switch (expr.kind) {
        case "id": {
            return new Set();
        }
        case "field_access": {
            // we only analyze receiver bodies and contract methods calls
            // so we now `self` refers to the contract itself
            return expr.aggregate.kind === "id" && (0, ast_helpers_1.isSelfId)(expr.aggregate)
                ? new Set(["contractStorageRead"])
                : expressionEffects(expr.aggregate, processedContractMethods, ctx);
        }
        case "method_call": {
            const argsEffects = mapUnionAll(expr.args, (arg) => expressionEffects(arg, processedContractMethods, ctx));
            const selfEffects = expressionEffects(expr.self, processedContractMethods, ctx);
            const methodCallEffects = methodEffects(expr.self, expr.method, processedContractMethods, ctx);
            return unionAll([argsEffects, selfEffects, methodCallEffects]);
        }
        case "string":
        case "number":
        case "boolean":
        case "slice":
        case "null":
        case "simplified_string":
        case "address":
        case "cell":
        case "struct_value":
        case "code_of": {
            return new Set();
        }
        case "op_binary": {
            const leftEffects = expressionEffects(expr.left, processedContractMethods, ctx);
            const rightEffects = expressionEffects(expr.right, processedContractMethods, ctx);
            return union(leftEffects, rightEffects);
        }
        case "op_unary": {
            return expressionEffects(expr.operand, processedContractMethods, ctx);
        }
        case "conditional": {
            const conditionEffects = expressionEffects(expr.condition, processedContractMethods, ctx);
            const thenEffects = expressionEffects(expr.thenBranch, processedContractMethods, ctx);
            const elseEffects = expressionEffects(expr.elseBranch, processedContractMethods, ctx);
            return unionAll([conditionEffects, thenEffects, elseEffects]);
        }
        case "init_of":
        case "static_call": {
            // global (static) functions cannot change contract storage because of the call-by-value semantics, so we don't analyze their bodies
            return mapUnionAll(expr.args, (arg) => expressionEffects(arg, processedContractMethods, ctx));
        }
        case "struct_instance": {
            return mapUnionAll(expr.args, (field) => expressionEffects(field.initializer, processedContractMethods, ctx));
        }
    }
}
function methodEffects(self, method, processedContractMethods, ctx) {
    const selfTypeRef = (0, resolveExpression_1.getExpType)(ctx, self);
    // contract method call: self.foo(), since variable shadowing is not allowed
    if (selfTypeRef.kind === "ref") {
        const selfType = (0, resolveDescriptors_1.getType)(ctx, selfTypeRef.name);
        if (selfType.kind === "contract") {
            if (processedContractMethods.has(method)) {
                return new Set();
            }
            const methodDescr = selfType.functions.get((0, ast_helpers_1.idText)(method));
            if (typeof methodDescr === "undefined") {
                (0, errors_1.throwInternalCompilerError)(`Method ${(0, errors_1.idTextErr)(method)} not found in contract ${selfTypeRef.name}`, method.loc);
            }
            switch (methodDescr.ast.kind) {
                case "function_decl":
                    {
                        (0, errors_1.throwInternalCompilerError)(`Cannot call a function declaration ${(0, errors_1.idTextErr)(method)} on contract ${selfTypeRef.name}`, method.loc);
                    }
                    break;
                case "asm_function_def":
                case "native_function_decl": {
                    // Cannot analyze the effects of native and asm functions
                    // so we make the most conservative approximation
                    return methodDescr.isMutating
                        ? new Set([
                            "contractStorageRead",
                            "contractStorageWrite",
                        ])
                        : new Set(["contractStorageRead"]);
                }
                case "function_def": {
                    // essentially we inline contract method calls (modulo recursion)
                    return statementListEffects(methodDescr.ast.statements, addToSet(processedContractMethods, method), ctx);
                }
            }
        }
    }
    const [head, ...rest] = (0, ast_helpers_1.tryExtractPath)(self) ?? [];
    // method call on a contract storage variable: e.g. self.x.inc()
    if (typeof head !== "undefined" && (0, ast_helpers_1.isSelfId)(head) && rest.length > 0) {
        switch (selfTypeRef.kind) {
            case "map":
                {
                    switch ((0, ast_helpers_1.idText)(method)) {
                        case "set":
                        case "replace":
                        case "replaceGet":
                        case "del": {
                            return new Set([
                                "contractStorageRead",
                                "contractStorageWrite",
                            ]);
                        }
                        case "get":
                        case "asCell":
                        case "isEmpty":
                        case "exists":
                        case "deepEquals": {
                            return new Set(["contractStorageRead"]);
                        }
                        default:
                            (0, errors_1.throwInternalCompilerError)(`Invalid method call on map: ${(0, errors_1.idTextErr)(method)}`, method.loc);
                    }
                }
                break;
            case "ref": {
                const selfType = (0, resolveDescriptors_1.getType)(ctx, selfTypeRef.name);
                const methodDescr = selfType.functions.get((0, ast_helpers_1.idText)(method));
                if (typeof methodDescr === "undefined") {
                    (0, errors_1.throwInternalCompilerError)(`Method ${(0, errors_1.idTextErr)(method)} not found in type ${selfTypeRef.name}`, method.loc);
                }
                return methodDescr.isMutating
                    ? new Set([
                        "contractStorageRead",
                        "contractStorageWrite",
                    ])
                    : new Set(["contractStorageRead"]);
            }
            case "ref_bounced": // Extend functions must have a reference type as the first parameter
            case "void":
            case "null": {
                (0, errors_1.throwInternalCompilerError)("Invalid type for method call", self.loc);
            }
        }
    }
    return new Set();
}
function addToSet(set, element) {
    return new Set([...set, element]);
}
function union(left, right) {
    return new Set([...left, ...right]);
}
function unionAll(sets) {
    return new Set(sets.flatMap((set) => [...set]));
}
function mapUnionAll(xs, f) {
    return xs.reduce((acc, x) => union(acc, f(x)), new Set());
}
