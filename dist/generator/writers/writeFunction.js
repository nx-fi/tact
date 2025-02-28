"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeCastedExpression = writeCastedExpression;
exports.writeStatement = writeStatement;
exports.writeFunction = writeFunction;
exports.writeGetter = writeGetter;
const features_1 = require("../../config/features");
const ast_helpers_1 = require("../../ast/ast-helpers");
const resolveDescriptors_1 = require("../../types/resolveDescriptors");
const resolveExpression_1 = require("../../types/resolveExpression");
const resolveFuncPrimitive_1 = require("./resolveFuncPrimitive");
const resolveFuncType_1 = require("./resolveFuncType");
const resolveFuncTypeUnpack_1 = require("./resolveFuncTypeUnpack");
const id_1 = require("./id");
const writeExpression_1 = require("./writeExpression");
const cast_1 = require("./cast");
const resolveFuncTupleType_1 = require("./resolveFuncTupleType");
const ops_1 = require("./ops");
const freshIdentifier_1 = require("./freshIdentifier");
const errors_1 = require("../../error/errors");
const ast_printer_1 = require("../../ast/ast-printer");
function writeCastedExpression(expression, to, ctx) {
    const expr = (0, resolveExpression_1.getExpType)(ctx.ctx, expression);
    return (0, cast_1.cast)(expr, to, (0, writeExpression_1.writeExpression)(expression, ctx), ctx); // Cast for nullable
}
function unwrapExternal(targetName, sourceName, type, ctx) {
    if (type.kind === "ref") {
        const t = (0, resolveDescriptors_1.getType)(ctx.ctx, type.name);
        if (t.kind === "struct" || t.kind === "contract") {
            if (type.optional) {
                ctx.append(`${(0, resolveFuncType_1.resolveFuncType)(type, ctx)} ${targetName} = ${ops_1.ops.typeFromOptTuple(t.name, ctx)}(${sourceName});`);
            }
            else {
                ctx.append(`${(0, resolveFuncType_1.resolveFuncType)(type, ctx)} ${targetName} = ${ops_1.ops.typeFromTuple(t.name, ctx)}(${sourceName});`);
            }
            return;
        }
        else if (t.kind === "primitive_type_decl" && t.name === "Address") {
            ctx.append(`${(0, resolveFuncType_1.resolveFuncType)(type, ctx)} ${targetName} = ${sourceName};`);
            return;
        }
    }
    ctx.append(`${(0, resolveFuncType_1.resolveFuncType)(type, ctx)} ${targetName} = ${sourceName};`);
}
function writeStatement(f, self, returns, ctx) {
    switch (f.kind) {
        case "statement_return": {
            if (f.expression) {
                // Format expression
                const result = writeCastedExpression(f.expression, returns, ctx);
                // Return
                if (self) {
                    // we introduce an intermediate return variable here
                    // to treat the case of a contract method call which
                    // can modify "self", otherwise the "self" below would
                    // contain the old state of contract, not the one
                    // updated in the "result" expression
                    const retVar = (0, freshIdentifier_1.freshIdentifier)("ret");
                    ctx.append(`var ${retVar} = ${result};`);
                    ctx.append(`return (${self}, ${retVar});`);
                }
                else {
                    ctx.append(`return ${result};`);
                }
            }
            else {
                if (self) {
                    ctx.append(`return (${self}, ());`);
                }
                else {
                    ctx.append(`return ();`);
                }
            }
            return;
        }
        case "statement_let": {
            // Underscore name case
            if ((0, ast_helpers_1.isWildcard)(f.name)) {
                ctx.append(`${(0, writeExpression_1.writeExpression)(f.expression, ctx)};`);
                return;
            }
            // Contract/struct case
            const t = f.type === null
                ? (0, resolveExpression_1.getExpType)(ctx.ctx, f.expression)
                : (0, resolveDescriptors_1.resolveTypeRef)(ctx.ctx, f.type);
            if (t.kind === "ref") {
                const tt = (0, resolveDescriptors_1.getType)(ctx.ctx, t.name);
                if (tt.kind === "contract" || tt.kind === "struct") {
                    if (t.optional) {
                        ctx.append(`tuple ${(0, id_1.funcIdOf)(f.name)} = ${writeCastedExpression(f.expression, t, ctx)};`);
                    }
                    else {
                        ctx.append(`var ${(0, resolveFuncTypeUnpack_1.resolveFuncTypeUnpack)(t, (0, id_1.funcIdOf)(f.name), ctx)} = ${writeCastedExpression(f.expression, t, ctx)};`);
                    }
                    return;
                }
            }
            ctx.append(`${(0, resolveFuncType_1.resolveFuncType)(t, ctx)} ${(0, id_1.funcIdOf)(f.name)} = ${writeCastedExpression(f.expression, t, ctx)};`);
            return;
        }
        case "statement_assign": {
            // Prepare lvalue
            const lvaluePath = (0, ast_helpers_1.tryExtractPath)(f.path);
            if (lvaluePath === null) {
                // typechecker is supposed to catch this
                (0, errors_1.throwInternalCompilerError)(`Assignments are allowed only into path expressions, i.e. identifiers, or sequences of direct contract/struct/message accesses, like "self.foo" or "self.structure.field"`, f.path.loc);
            }
            const path = (0, writeExpression_1.writePathExpression)(lvaluePath);
            // Contract/struct case
            const t = (0, resolveExpression_1.getExpType)(ctx.ctx, f.path);
            if (t.kind === "ref") {
                const tt = (0, resolveDescriptors_1.getType)(ctx.ctx, t.name);
                if (tt.kind === "contract" || tt.kind === "struct") {
                    ctx.append(`${(0, resolveFuncTypeUnpack_1.resolveFuncTypeUnpack)(t, path, ctx)} = ${writeCastedExpression(f.expression, t, ctx)};`);
                    return;
                }
            }
            ctx.append(`${path} = ${writeCastedExpression(f.expression, t, ctx)};`);
            return;
        }
        case "statement_augmentedassign": {
            const lvaluePath = (0, ast_helpers_1.tryExtractPath)(f.path);
            if (lvaluePath === null) {
                // typechecker is supposed to catch this
                (0, errors_1.throwInternalCompilerError)(`Assignments are allowed only into path expressions, i.e. identifiers, or sequences of direct contract/struct/message accesses, like "self.foo" or "self.structure.field"`, f.path.loc);
            }
            const path = (0, writeExpression_1.writePathExpression)(lvaluePath);
            const t = (0, resolveExpression_1.getExpType)(ctx.ctx, f.path);
            const op = f.op === "&&" ? "&" : f.op === "||" ? "|" : f.op;
            ctx.append(`${path} = ${(0, cast_1.cast)(t, t, `${path} ${op} ${(0, writeExpression_1.writeExpression)(f.expression, ctx)}`, ctx)};`);
            return;
        }
        case "statement_condition": {
            writeCondition(f, self, false, returns, ctx);
            return;
        }
        case "statement_expression": {
            const exp = (0, writeExpression_1.writeExpression)(f.expression, ctx);
            ctx.append(`${exp};`);
            return;
        }
        case "statement_while": {
            ctx.append(`while (${(0, writeExpression_1.writeExpression)(f.condition, ctx)}) {`);
            ctx.inIndent(() => {
                for (const s of f.statements) {
                    writeStatement(s, self, returns, ctx);
                }
            });
            ctx.append(`}`);
            return;
        }
        case "statement_until": {
            ctx.append(`do {`);
            ctx.inIndent(() => {
                for (const s of f.statements) {
                    writeStatement(s, self, returns, ctx);
                }
            });
            ctx.append(`} until (${(0, writeExpression_1.writeExpression)(f.condition, ctx)});`);
            return;
        }
        case "statement_repeat": {
            ctx.append(`repeat (${(0, writeExpression_1.writeExpression)(f.iterations, ctx)}) {`);
            ctx.inIndent(() => {
                for (const s of f.statements) {
                    writeStatement(s, self, returns, ctx);
                }
            });
            ctx.append(`}`);
            return;
        }
        case "statement_try": {
            ctx.append(`try {`);
            ctx.inIndent(() => {
                for (const s of f.statements) {
                    writeStatement(s, self, returns, ctx);
                }
            });
            const catchBlock = f.catchBlock;
            if (catchBlock !== undefined) {
                if ((0, ast_helpers_1.isWildcard)(catchBlock.catchName)) {
                    ctx.append(`} catch (_) {`);
                }
                else {
                    ctx.append(`} catch (_, ${(0, id_1.funcIdOf)(catchBlock.catchName)}) {`);
                }
                ctx.inIndent(() => {
                    for (const s of catchBlock.catchStatements) {
                        writeStatement(s, self, returns, ctx);
                    }
                });
            }
            else {
                ctx.append("} catch (_) { ");
            }
            ctx.append(`}`);
            return;
        }
        case "statement_foreach": {
            const mapPath = (0, ast_helpers_1.tryExtractPath)(f.map);
            if (mapPath === null) {
                // typechecker is supposed to catch this
                (0, errors_1.throwInternalCompilerError)(`foreach is only allowed over maps that are path expressions, i.e. identifiers, or sequences of direct contract/struct/message accesses, like "self.foo" or "self.structure.field"`, f.map.loc);
            }
            const path = (0, writeExpression_1.writePathExpression)(mapPath);
            const t = (0, resolveExpression_1.getExpType)(ctx.ctx, f.map);
            if (t.kind !== "map") {
                throw Error("Unknown map type");
            }
            const flag = (0, freshIdentifier_1.freshIdentifier)("flag");
            const key = (0, ast_helpers_1.isWildcard)(f.keyName)
                ? (0, freshIdentifier_1.freshIdentifier)("underscore")
                : (0, id_1.funcIdOf)(f.keyName);
            const value = (0, ast_helpers_1.isWildcard)(f.valueName)
                ? (0, freshIdentifier_1.freshIdentifier)("underscore")
                : (0, id_1.funcIdOf)(f.valueName);
            // Handle Int key
            if (t.key === "Int") {
                let bits = 257;
                let kind = "int";
                if (t.keyAs?.startsWith("int")) {
                    bits = parseInt(t.keyAs.slice(3), 10);
                }
                else if (t.keyAs?.startsWith("uint")) {
                    bits = parseInt(t.keyAs.slice(4), 10);
                    kind = "uint";
                }
                if (t.value === "Int") {
                    let vBits = ", 257";
                    let vKind = "int";
                    if (t.valueAs?.startsWith("int")) {
                        vBits = `, ${parseInt(t.valueAs.slice(3), 10)}`;
                    }
                    else if (t.valueAs?.startsWith("uint")) {
                        vBits = `, ${parseInt(t.valueAs.slice(4), 10)}`;
                        vKind = "uint";
                    }
                    else if (t.valueAs?.startsWith("coins")) {
                        vBits = "";
                        vKind = "coins";
                    }
                    else if (t.valueAs?.startsWith("var")) {
                        vBits = "";
                        vKind = t.valueAs;
                    }
                    ctx.append(`var (${key}, ${value}, ${flag}) = ${ctx.used(`__tact_dict_min_${kind}_${vKind}`)}(${path}, ${bits}${vBits});`);
                    ctx.append(`while (${flag}) {`);
                    ctx.inIndent(() => {
                        for (const s of f.statements) {
                            writeStatement(s, self, returns, ctx);
                        }
                        ctx.append(`(${key}, ${value}, ${flag}) = ${ctx.used(`__tact_dict_next_${kind}_${vKind}`)}(${path}, ${bits}, ${key}${vBits});`);
                    });
                    ctx.append(`}`);
                }
                else if (t.value === "Bool") {
                    ctx.append(`var (${key}, ${value}, ${flag}) = ${ctx.used(`__tact_dict_min_${kind}_int`)}(${path}, ${bits}, 1);`);
                    ctx.append(`while (${flag}) {`);
                    ctx.inIndent(() => {
                        for (const s of f.statements) {
                            writeStatement(s, self, returns, ctx);
                        }
                        ctx.append(`(${key}, ${value}, ${flag}) = ${ctx.used(`__tact_dict_next_${kind}_int`)}(${path}, ${bits}, ${key}, 1);`);
                    });
                    ctx.append(`}`);
                }
                else if (t.value === "Cell") {
                    ctx.append(`var (${key}, ${value}, ${flag}) = ${ctx.used(`__tact_dict_min_${kind}_cell`)}(${path}, ${bits});`);
                    ctx.append(`while (${flag}) {`);
                    ctx.inIndent(() => {
                        for (const s of f.statements) {
                            writeStatement(s, self, returns, ctx);
                        }
                        ctx.append(`(${key}, ${value}, ${flag}) = ${ctx.used(`__tact_dict_next_${kind}_cell`)}(${path}, ${bits}, ${key});`);
                    });
                    ctx.append(`}`);
                }
                else if (t.value === "Address") {
                    ctx.append(`var (${key}, ${value}, ${flag}) = ${ctx.used(`__tact_dict_min_${kind}_slice`)}(${path}, ${bits});`);
                    ctx.append(`while (${flag}) {`);
                    ctx.inIndent(() => {
                        for (const s of f.statements) {
                            writeStatement(s, self, returns, ctx);
                        }
                        ctx.append(`(${key}, ${value}, ${flag}) = ${ctx.used(`__tact_dict_next_${kind}_slice`)}(${path}, ${bits}, ${key});`);
                    });
                    ctx.append(`}`);
                }
                else {
                    // value is struct
                    ctx.append(`var (${key}, ${value}, ${flag}) = ${ctx.used(`__tact_dict_min_${kind}_cell`)}(${path}, ${bits});`);
                    ctx.append(`while (${flag}) {`);
                    ctx.inIndent(() => {
                        ctx.append(`var ${(0, resolveFuncTypeUnpack_1.resolveFuncTypeUnpack)(t.value, (0, id_1.funcIdOf)(f.valueName), ctx)} = ${ops_1.ops.typeNotNull(t.value, ctx)}(${ops_1.ops.readerOpt(t.value, ctx)}(${value}));`);
                        for (const s of f.statements) {
                            writeStatement(s, self, returns, ctx);
                        }
                        ctx.append(`(${key}, ${value}, ${flag}) = ${ctx.used(`__tact_dict_next_${kind}_cell`)}(${path}, ${bits}, ${key});`);
                    });
                    ctx.append(`}`);
                }
            }
            // Handle address key
            if (t.key === "Address") {
                if (t.value === "Int") {
                    let vBits = ", 257";
                    let vKind = "int";
                    if (t.valueAs?.startsWith("int")) {
                        vBits = `, ${parseInt(t.valueAs.slice(3), 10)}`;
                    }
                    else if (t.valueAs?.startsWith("uint")) {
                        vBits = `, ${parseInt(t.valueAs.slice(4), 10)}`;
                        vKind = "uint";
                    }
                    else if (t.valueAs?.startsWith("coins")) {
                        vBits = "";
                        vKind = "coins";
                    }
                    else if (t.valueAs?.startsWith("var")) {
                        vBits = "";
                        vKind = t.valueAs;
                    }
                    ctx.append(`var (${key}, ${value}, ${flag}) = ${ctx.used(`__tact_dict_min_slice_${vKind}`)}(${path}, 267${vBits});`);
                    ctx.append(`while (${flag}) {`);
                    ctx.inIndent(() => {
                        for (const s of f.statements) {
                            writeStatement(s, self, returns, ctx);
                        }
                        ctx.append(`(${key}, ${value}, ${flag}) = ${ctx.used(`__tact_dict_next_slice_${vKind}`)}(${path}, 267, ${key}${vBits});`);
                    });
                    ctx.append(`}`);
                }
                else if (t.value === "Bool") {
                    ctx.append(`var (${key}, ${value}, ${flag}) = ${ctx.used(`__tact_dict_min_slice_int`)}(${path}, 267, 1);`);
                    ctx.append(`while (${flag}) {`);
                    ctx.inIndent(() => {
                        for (const s of f.statements) {
                            writeStatement(s, self, returns, ctx);
                        }
                        ctx.append(`(${key}, ${value}, ${flag}) = ${ctx.used(`__tact_dict_next_slice_int`)}(${path}, 267, ${key}, 1);`);
                    });
                    ctx.append(`}`);
                }
                else if (t.value === "Cell") {
                    ctx.append(`var (${key}, ${value}, ${flag}) = ${ctx.used(`__tact_dict_min_slice_cell`)}(${path}, 267);`);
                    ctx.append(`while (${flag}) {`);
                    ctx.inIndent(() => {
                        for (const s of f.statements) {
                            writeStatement(s, self, returns, ctx);
                        }
                        ctx.append(`(${key}, ${value}, ${flag}) = ${ctx.used(`__tact_dict_next_slice_cell`)}(${path}, 267, ${key});`);
                    });
                    ctx.append(`}`);
                }
                else if (t.value === "Address") {
                    ctx.append(`var (${key}, ${value}, ${flag}) = ${ctx.used(`__tact_dict_min_slice_slice`)}(${path}, 267);`);
                    ctx.append(`while (${flag}) {`);
                    ctx.inIndent(() => {
                        for (const s of f.statements) {
                            writeStatement(s, self, returns, ctx);
                        }
                        ctx.append(`(${key}, ${value}, ${flag}) = ${ctx.used(`__tact_dict_next_slice_slice`)}(${path}, 267, ${key});`);
                    });
                    ctx.append(`}`);
                }
                else {
                    // value is struct
                    ctx.append(`var (${key}, ${value}, ${flag}) = ${ctx.used(`__tact_dict_min_slice_cell`)}(${path}, 267);`);
                    ctx.append(`while (${flag}) {`);
                    ctx.inIndent(() => {
                        ctx.append(`var ${(0, resolveFuncTypeUnpack_1.resolveFuncTypeUnpack)(t.value, (0, id_1.funcIdOf)(f.valueName), ctx)} = ${ops_1.ops.typeNotNull(t.value, ctx)}(${ops_1.ops.readerOpt(t.value, ctx)}(${value}));`);
                        for (const s of f.statements) {
                            writeStatement(s, self, returns, ctx);
                        }
                        ctx.append(`(${key}, ${value}, ${flag}) = ${ctx.used(`__tact_dict_next_slice_cell`)}(${path}, 267, ${key});`);
                    });
                    ctx.append(`}`);
                }
            }
            return;
        }
        case "statement_destruct": {
            const t = (0, resolveExpression_1.getExpType)(ctx.ctx, f.expression);
            if (t.kind !== "ref") {
                (0, errors_1.throwInternalCompilerError)(`invalid destruct expression kind: ${t.kind}`, f.expression.loc);
            }
            const ty = (0, resolveDescriptors_1.getType)(ctx.ctx, t.name);
            const ids = ty.fields.map((field) => {
                const id = f.identifiers.get(field.name);
                return id === undefined || (0, ast_helpers_1.isWildcard)(id[1])
                    ? "_"
                    : (0, id_1.funcIdOf)(id[1]);
            });
            ctx.append(`var (${ids.join(", ")}) = ${writeCastedExpression(f.expression, t, ctx)};`);
            return;
        }
        case "statement_block": {
            for (const s of f.statements) {
                writeStatement(s, self, returns, ctx);
            }
            return;
        }
    }
    throw Error("Unknown statement kind");
}
function writeCondition(f, self, elseif, returns, ctx) {
    ctx.append(`${elseif ? "} else" : ""}if (${(0, writeExpression_1.writeExpression)(f.condition, ctx)}) {`);
    ctx.inIndent(() => {
        for (const s of f.trueStatements) {
            writeStatement(s, self, returns, ctx);
        }
    });
    if (f.falseStatements && f.falseStatements.length > 0) {
        const [head, ...tail] = f.falseStatements;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- eslint bug
        if (head && tail.length === 0 && head.kind === "statement_condition") {
            writeCondition(head, self, true, returns, ctx);
        }
        else {
            ctx.append(`} else {`);
            ctx.inIndent(() => {
                for (const s of f.falseStatements) {
                    writeStatement(s, self, returns, ctx);
                }
            });
            ctx.append(`}`);
        }
    }
    else {
        ctx.append(`}`);
    }
}
function writeFunction(f, ctx) {
    const [self, isSelfOpt] = f.self?.kind === "ref"
        ? [(0, resolveDescriptors_1.getType)(ctx.ctx, f.self.name), f.self.optional]
        : [null, false];
    // Write function header
    let returns = (0, resolveFuncType_1.resolveFuncType)(f.returns, ctx);
    const returnsOriginal = returns;
    let returnsStr;
    if (self && f.isMutating) {
        if (f.returns.kind !== "void") {
            returns = `(${(0, resolveFuncType_1.resolveFuncType)(self, ctx)}, ${returns})`;
        }
        else {
            returns = `(${(0, resolveFuncType_1.resolveFuncType)(self, ctx)}, ())`;
        }
        returnsStr = (0, resolveFuncTypeUnpack_1.resolveFuncTypeUnpack)(self, (0, id_1.funcIdOf)("self"), ctx);
    }
    // Resolve function descriptor
    const params = [];
    if (self) {
        params.push((0, resolveFuncType_1.resolveFuncType)(self, ctx, isSelfOpt) + " " + (0, id_1.funcIdOf)("self"));
    }
    for (const a of f.params) {
        params.push((0, resolveFuncType_1.resolveFuncType)(a.type, ctx) + " " + (0, id_1.funcIdOf)(a.name));
    }
    const fAst = f.ast;
    switch (fAst.kind) {
        case "native_function_decl": {
            const name = (0, ast_helpers_1.idText)(fAst.nativeName);
            if (f.isMutating && !ctx.isRendered(name)) {
                writeNonMutatingFunction(f, name, params, returnsOriginal, false, ctx);
                ctx.markRendered(name);
            }
            return;
        }
        case "asm_function_def": {
            const name = self
                ? ops_1.ops.extension(self.name, f.name)
                : ops_1.ops.global(f.name);
            ctx.fun(name, () => {
                const { functionParams, shuffle } = getAsmFunctionSignature(f, fAst, params);
                ctx.signature(`${returns} ${name}(${functionParams.join(", ")})`);
                ctx.flag("impure");
                if (f.origin === "stdlib") {
                    ctx.context("stdlib");
                }
                if (fAst.instructions.length > 1 ||
                    fAst.instructions[0] !== "") {
                    ctx.asm(shuffle, fAst.instructions.join(" "));
                }
                else {
                    ctx.asm(shuffle, "NOP", true);
                }
            });
            if (f.isMutating) {
                writeNonMutatingFunction(f, name, params, returnsOriginal, true, ctx);
            }
            return;
        }
        case "function_def": {
            const name = self
                ? ops_1.ops.extension(self.name, f.name)
                : ops_1.ops.global(f.name);
            ctx.fun(name, () => {
                ctx.signature(`${returns} ${name}(${params.join(", ")})`);
                ctx.flag("impure");
                if ((0, features_1.enabledInline)(ctx.ctx) || f.isInline) {
                    ctx.flag("inline");
                }
                if (f.origin === "stdlib") {
                    ctx.context("stdlib");
                }
                ctx.body(() => {
                    // Unpack self
                    if (self && !isSelfOpt) {
                        ctx.append(`var (${(0, resolveFuncTypeUnpack_1.resolveFuncTypeUnpack)(self, (0, id_1.funcIdOf)("self"), ctx)}) = ${(0, id_1.funcIdOf)("self")};`);
                    }
                    for (const a of f.ast.params) {
                        if (!(0, resolveFuncPrimitive_1.resolveFuncPrimitive)((0, resolveDescriptors_1.resolveTypeRef)(ctx.ctx, a.type), ctx)) {
                            ctx.append(`var (${(0, resolveFuncTypeUnpack_1.resolveFuncTypeUnpack)((0, resolveDescriptors_1.resolveTypeRef)(ctx.ctx, a.type), (0, id_1.funcIdOf)(a.name), ctx)}) = ${(0, id_1.funcIdOf)(a.name)};`);
                        }
                    }
                    // Process statements
                    for (const s of fAst.statements) {
                        writeStatement(s, returnsStr, f.returns, ctx);
                    }
                    // Auto append return
                    if (f.self && f.returns.kind === "void" && f.isMutating) {
                        if (fAst.statements.length === 0 ||
                            fAst.statements[fAst.statements.length - 1]
                                .kind !== "statement_return") {
                            ctx.append(`return (${returnsStr}, ());`);
                        }
                    }
                });
            });
            if (f.isMutating) {
                writeNonMutatingFunction(f, name, params, returnsOriginal, true, ctx);
            }
            return;
        }
        default: {
            (0, errors_1.throwInternalCompilerError)(`Unknown function kind: ${(0, errors_1.idTextErr)(fAst.name)}`, fAst.loc);
        }
    }
}
function getAsmFunctionSignature(f, fAst, params) {
    const isMutable = fAst.attributes.some((a) => a.type === "mutates");
    const hasSelfParam = fAst.params[0]?.name.text === "self";
    const needRearrange = fAst.shuffle.ret.length === 0 &&
        fAst.shuffle.args.length > 1 &&
        fAst.params.length > 1 &&
        hasSelfParam &&
        !isMutable;
    if (!needRearrange) {
        const asmShuffleEscaped = {
            ...fAst.shuffle,
            args: fAst.shuffle.args.map((id) => (0, ast_helpers_1.idOfText)((0, id_1.funcIdOf)(id))),
        };
        return {
            functionParams: params,
            shuffle: (0, ast_printer_1.ppAsmShuffle)(asmShuffleEscaped),
        };
    }
    // Rearranges the parameters in the order described in Asm Shuffle
    //
    // Foe example:
    // `asm(other self) fun foo(self: Type, other: Type2)` generates as
    //                  fun foo(other: Type2, self: Type)
    const paramsDict = Object.fromEntries(params.map((param, i) => [
        i === 0 ? "self" : f.params[i - 1].name.text,
        param,
    ]));
    return {
        functionParams: fAst.shuffle.args.map((arg) => paramsDict[arg.text]),
        shuffle: "",
    };
}
// Write a function in non-mutating form
function writeNonMutatingFunction(f, name, params, returnsOriginal, markUsedName, ctx) {
    const nonMutName = ops_1.ops.nonModifying(name);
    ctx.fun(nonMutName, () => {
        ctx.signature(`${returnsOriginal} ${nonMutName}(${params.join(", ")})`);
        ctx.flag("impure");
        if ((0, features_1.enabledInline)(ctx.ctx) || f.isInline) {
            ctx.flag("inline");
        }
        if (f.origin === "stdlib") {
            ctx.context("stdlib");
        }
        ctx.body(() => {
            const params = f.ast.params;
            const withoutSelfParams = params.length > 0 && params.at(0)?.name.text === "self"
                ? params.slice(1)
                : params;
            ctx.append(`return ${(0, id_1.funcIdOf)("self")}~${markUsedName ? ctx.used(name) : name}(${withoutSelfParams
                .map((arg) => (0, id_1.funcIdOf)(arg.name))
                .join(", ")});`);
        });
    });
}
function writeGetter(f, wCtx) {
    // Render tensors
    const self = f.self?.kind === "ref" ? (0, resolveDescriptors_1.getType)(wCtx.ctx, f.self.name) : null;
    if (!self) {
        throw new Error(`No self type for getter ${(0, errors_1.idTextErr)(f.name)}`); // Impossible
    }
    wCtx.append(`_ %${f.name}(${f.params.map((v) => (0, resolveFuncTupleType_1.resolveFuncTupleType)(v.type, wCtx) + " " + (0, id_1.funcIdOf)(v.name)).join(", ")}) method_id(${f.methodId}) {`);
    wCtx.inIndent(() => {
        // Unpack parameters
        for (const param of f.params) {
            unwrapExternal((0, id_1.funcIdOf)(param.name), (0, id_1.funcIdOf)(param.name), param.type, wCtx);
        }
        // Load contract state
        wCtx.append(`var self = ${ops_1.ops.contractLoad(self.name, wCtx)}();`);
        // Execute get method
        wCtx.append(`var res = self~${wCtx.used(ops_1.ops.extension(self.name, f.name))}(${f.params.map((v) => (0, id_1.funcIdOf)(v.name)).join(", ")});`);
        // Pack if needed
        if (f.returns.kind === "ref") {
            const t = (0, resolveDescriptors_1.getType)(wCtx.ctx, f.returns.name);
            if (t.kind === "struct" || t.kind === "contract") {
                if (f.returns.optional) {
                    wCtx.append(`return ${ops_1.ops.typeToOptExternal(t.name, wCtx)}(res);`);
                }
                else {
                    wCtx.append(`return ${ops_1.ops.typeToExternal(t.name, wCtx)}(res);`);
                }
                return;
            }
        }
        // Return result
        wCtx.append(`return res;`);
    });
    wCtx.append(`}`);
    wCtx.append();
}
