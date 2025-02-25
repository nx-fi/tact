"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeAccessors = writeAccessors;
const errors_1 = require("../../abi/errors");
const writeStruct_1 = require("../../bindings/typescript/writeStruct");
const features_1 = require("../../config/features");
const resolveDescriptors_1 = require("../../types/resolveDescriptors");
const ops_1 = require("./ops");
const resolveFuncFlatPack_1 = require("./resolveFuncFlatPack");
const resolveFuncFlatTypes_1 = require("./resolveFuncFlatTypes");
const resolveFuncType_1 = require("./resolveFuncType");
const resolveFuncTypeUnpack_1 = require("./resolveFuncTypeUnpack");
function chainVars(vars) {
    // let's say we have vars = ['v1', 'v2, ..., 'v32']
    // we need to split it into chunks of size maxTupleSize - 1
    const chunks = [];
    while (vars.length > 0) {
        chunks.push(vars.splice(0, writeStruct_1.maxTupleSize - 1));
    }
    // and now chain them into a string like this: [v1, v2, ..., v14, [v15, v16, ..., v28, [v29, v30, ..., v32]]
    while (chunks.length > 1) {
        const a = chunks.pop();
        chunks[chunks.length - 1].push(`[${a.join(", ")}]`);
    }
    return chunks[0];
}
function writeAccessors(type, origin, ctx) {
    // Getters
    for (const f of type.fields) {
        ctx.fun(ops_1.ops.typeField(type.name, f.name, ctx), () => {
            ctx.signature(`_ ${ops_1.ops.typeField(type.name, f.name, ctx)}(${(0, resolveFuncType_1.resolveFuncType)(type, ctx)} v)`);
            ctx.flag("inline");
            ctx.context("type:" + type.name);
            ctx.body(() => {
                ctx.append(`var (${type.fields.map((v) => `v'${v.name}`).join(", ")}) = v;`);
                ctx.append(`return v'${f.name};`);
            });
        });
    }
    // Tensor cast
    ctx.fun(ops_1.ops.typeTensorCast(type.name, ctx), () => {
        ctx.signature(`(${(0, resolveFuncType_1.resolveFuncType)(type, ctx)}) ${ops_1.ops.typeTensorCast(type.name, ctx)}(${(0, resolveFuncType_1.resolveFuncType)(type, ctx)} v)`);
        ctx.context("type:" + type.name);
        ctx.asm("", "NOP");
    });
    // Not null
    ctx.fun(ops_1.ops.typeNotNull(type.name, ctx), () => {
        ctx.signature(`(${(0, resolveFuncType_1.resolveFuncType)(type, ctx)}) ${ops_1.ops.typeNotNull(type.name, ctx)}(tuple v)`);
        ctx.flag("inline");
        ctx.context("type:" + type.name);
        ctx.body(() => {
            if ((0, features_1.enabledNullChecks)(ctx.ctx) || (0, features_1.enabledDebug)(ctx.ctx)) {
                ctx.append(`throw_if(${errors_1.contractErrors.null.id}, null?(v));`);
            }
            const flatPack = (0, resolveFuncFlatPack_1.resolveFuncFlatPack)(type, "vvv", ctx);
            const flatTypes = (0, resolveFuncFlatTypes_1.resolveFuncFlatTypes)(type, ctx);
            if (flatPack.length !== flatTypes.length)
                throw Error("Flat pack and flat types length mismatch");
            const pairs = flatPack.map((v, i) => `${flatTypes[i]} ${v}`);
            if (flatPack.length <= writeStruct_1.maxTupleSize) {
                ctx.used(`__tact_tuple_destroy_${flatPack.length}`);
                ctx.append(`var (${pairs.join(", ")}) = __tact_tuple_destroy_${flatPack.length}(v);`);
            }
            else {
                flatPack.splice(0, writeStruct_1.maxTupleSize - 1);
                const pairsBatch = pairs.splice(0, writeStruct_1.maxTupleSize - 1);
                ctx.used(`__tact_tuple_destroy_${writeStruct_1.maxTupleSize}`);
                ctx.append(`var (${pairsBatch.join(", ")}, next) = __tact_tuple_destroy_${writeStruct_1.maxTupleSize}(v);`);
                while (flatPack.length >= writeStruct_1.maxTupleSize) {
                    flatPack.splice(0, writeStruct_1.maxTupleSize - 1);
                    const pairsBatch = pairs.splice(0, writeStruct_1.maxTupleSize - 1);
                    ctx.append(`var (${pairsBatch.join(", ")}, next) = __tact_tuple_destroy_${writeStruct_1.maxTupleSize}(next);`);
                }
                ctx.used(`__tact_tuple_destroy_${flatPack.length}`);
                ctx.append(`var (${pairs.join(", ")}) = __tact_tuple_destroy_${flatPack.length}(next);`);
            }
            ctx.append(`return ${(0, resolveFuncTypeUnpack_1.resolveFuncTypeUnpack)(type, "vvv", ctx)};`);
        });
    });
    // As optional
    ctx.fun(ops_1.ops.typeAsOptional(type.name, ctx), () => {
        ctx.signature(`tuple ${ops_1.ops.typeAsOptional(type.name, ctx)}(${(0, resolveFuncType_1.resolveFuncType)(type, ctx)} v)`);
        ctx.flag("inline");
        ctx.context("type:" + type.name);
        ctx.body(() => {
            ctx.append(`var ${(0, resolveFuncTypeUnpack_1.resolveFuncTypeUnpack)(type, "v", ctx)} = v;`);
            const flatPack = (0, resolveFuncFlatPack_1.resolveFuncFlatPack)(type, "v", ctx);
            if (flatPack.length <= writeStruct_1.maxTupleSize) {
                ctx.used(`__tact_tuple_create_${flatPack.length}`);
                ctx.append(`return __tact_tuple_create_${flatPack.length}(${flatPack.join(", ")});`);
            }
            else {
                const longTupleFlatPack = chainVars(flatPack);
                ctx.used(`__tact_tuple_create_${longTupleFlatPack.length}`);
                ctx.append(`return __tact_tuple_create_${longTupleFlatPack.length}(${longTupleFlatPack.join(", ")});`);
            }
        });
    });
    //
    // Convert to and from tuple representation
    //
    ctx.fun(ops_1.ops.typeToTuple(type.name, ctx), () => {
        ctx.signature(`tuple ${ops_1.ops.typeToTuple(type.name, ctx)}((${(0, resolveFuncType_1.resolveFuncType)(type, ctx)}) v)`);
        ctx.flag("inline");
        ctx.context("type:" + type.name);
        ctx.body(() => {
            ctx.append(`var (${type.fields.map((v) => `v'${v.name}`).join(", ")}) = v;`);
            const vars = [];
            for (const f of type.fields) {
                if (f.type.kind === "ref") {
                    const t = (0, resolveDescriptors_1.getType)(ctx.ctx, f.type.name);
                    if (t.kind === "struct") {
                        if (f.type.optional) {
                            vars.push(`${ops_1.ops.typeToOptTuple(f.type.name, ctx)}(v'${f.name})`);
                        }
                        else {
                            vars.push(`${ops_1.ops.typeToTuple(f.type.name, ctx)}(v'${f.name})`);
                        }
                        continue;
                    }
                }
                vars.push(`v'${f.name}`);
            }
            if (vars.length <= writeStruct_1.maxTupleSize) {
                ctx.used(`__tact_tuple_create_${vars.length}`);
                ctx.append(`return __tact_tuple_create_${vars.length}(${vars.join(", ")});`);
            }
            else {
                const longTupleVars = chainVars(vars);
                ctx.used(`__tact_tuple_create_${longTupleVars.length}`);
                ctx.append(`return __tact_tuple_create_${longTupleVars.length}(${longTupleVars.join(", ")});`);
            }
        });
    });
    ctx.fun(ops_1.ops.typeToOptTuple(type.name, ctx), () => {
        ctx.signature(`tuple ${ops_1.ops.typeToOptTuple(type.name, ctx)}(tuple v)`);
        ctx.flag("inline");
        ctx.context("type:" + type.name);
        ctx.body(() => {
            ctx.append(`if (null?(v)) { return null(); } `);
            ctx.append(`return ${ops_1.ops.typeToTuple(type.name, ctx)}(${ops_1.ops.typeNotNull(type.name, ctx)}(v)); `);
        });
    });
    ctx.fun(ops_1.ops.typeFromTuple(type.name, ctx), () => {
        ctx.signature(`(${type.fields.map((v) => (0, resolveFuncType_1.resolveFuncType)(v.type, ctx)).join(", ")}) ${ops_1.ops.typeFromTuple(type.name, ctx)}(tuple v)`);
        ctx.flag("inline");
        ctx.context("type:" + type.name);
        ctx.body(() => {
            // Resolve vars
            const vars = [];
            const out = [];
            for (const f of type.fields) {
                if (f.type.kind === "ref") {
                    const t = (0, resolveDescriptors_1.getType)(ctx.ctx, f.type.name);
                    if (t.kind === "struct") {
                        vars.push(`tuple v'${f.name}`);
                        if (f.type.optional) {
                            out.push(`${ops_1.ops.typeFromOptTuple(f.type.name, ctx)}(v'${f.name})`);
                        }
                        else {
                            out.push(`${ops_1.ops.typeFromTuple(f.type.name, ctx)}(v'${f.name})`);
                        }
                        continue;
                    }
                    else if (t.kind === "primitive_type_decl" &&
                        t.name === "Address") {
                        vars.push(`${(0, resolveFuncType_1.resolveFuncType)(f.type, ctx)} v'${f.name}`);
                        out.push(`v'${f.name}`);
                        continue;
                    }
                }
                vars.push(`${(0, resolveFuncType_1.resolveFuncType)(f.type, ctx)} v'${f.name}`);
                out.push(`v'${f.name}`);
            }
            if (vars.length <= writeStruct_1.maxTupleSize) {
                ctx.used(`__tact_tuple_destroy_${vars.length}`);
                ctx.append(`var (${vars.join(", ")}) = __tact_tuple_destroy_${vars.length}(v);`);
            }
            else {
                const batch = vars.splice(0, writeStruct_1.maxTupleSize - 1);
                ctx.used(`__tact_tuple_destroy_${writeStruct_1.maxTupleSize}`);
                ctx.append(`var (${batch.join(", ")}, next) = __tact_tuple_destroy_${writeStruct_1.maxTupleSize}(v);`);
                while (vars.length >= writeStruct_1.maxTupleSize) {
                    const batch = vars.splice(0, writeStruct_1.maxTupleSize - 1);
                    ctx.used(`__tact_tuple_destroy_${writeStruct_1.maxTupleSize}`);
                    ctx.append(`var (${batch.join(", ")}, next) = __tact_tuple_destroy_${writeStruct_1.maxTupleSize}(next);`);
                }
                ctx.used(`__tact_tuple_destroy_${vars.length}`);
                ctx.append(`var (${batch.join(", ")}) = __tact_tuple_destroy_${vars.length}(next);`);
            }
            ctx.append(`return (${out.join(", ")});`);
        });
    });
    ctx.fun(ops_1.ops.typeFromOptTuple(type.name, ctx), () => {
        ctx.signature(`tuple ${ops_1.ops.typeFromOptTuple(type.name, ctx)}(tuple v)`);
        ctx.flag("inline");
        ctx.context("type:" + type.name);
        ctx.body(() => {
            ctx.append(`if (null?(v)) { return null(); } `);
            ctx.append(`return ${ops_1.ops.typeAsOptional(type.name, ctx)}(${ops_1.ops.typeFromTuple(type.name, ctx)}(v));`);
        });
    });
    //
    // Convert to and from external representation
    //
    ctx.fun(ops_1.ops.typeToExternal(type.name, ctx), () => {
        ctx.signature(`(${type.fields.map((f) => (0, resolveFuncType_1.resolveFuncType)(f.type, ctx)).join(", ")}) ${ops_1.ops.typeToExternal(type.name, ctx)}((${(0, resolveFuncType_1.resolveFuncType)(type, ctx)}) v)`);
        ctx.flag("inline");
        ctx.context("type:" + type.name);
        ctx.body(() => {
            ctx.append(`var (${type.fields.map((v) => `v'${v.name}`).join(", ")}) = v; `);
            const vars = [];
            for (const f of type.fields) {
                vars.push(`v'${f.name}`);
            }
            ctx.append(`return (${vars.join(", ")});`);
        });
    });
    ctx.fun(ops_1.ops.typeToOptExternal(type.name, ctx), () => {
        ctx.signature(`tuple ${ops_1.ops.typeToOptExternal(type.name, ctx)}(tuple v)`);
        ctx.flag("inline");
        ctx.context("type:" + type.name);
        ctx.body(() => {
            ctx.append(`var loaded = ${ops_1.ops.typeToOptTuple(type.name, ctx)}(v);`);
            ctx.append(`if (null?(loaded)) {`);
            ctx.inIndent(() => {
                ctx.append(`return null();`);
            });
            ctx.append(`} else {`);
            ctx.inIndent(() => {
                ctx.append(`return (loaded);`);
            });
            ctx.append(`}`);
        });
    });
}
