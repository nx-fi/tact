"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeSerializer = writeSerializer;
exports.writeOptionalSerializer = writeOptionalSerializer;
exports.writeParser = writeParser;
exports.writeBouncedParser = writeBouncedParser;
exports.writeOptionalParser = writeOptionalParser;
const errors_1 = require("../../abi/errors");
const errors_2 = require("../../error/errors");
const grammar_1 = require("../../grammar");
const resolveDescriptors_1 = require("../../types/resolveDescriptors");
const ops_1 = require("./ops");
const resolveFuncTypeFromAbi_1 = require("./resolveFuncTypeFromAbi");
const resolveFuncTypeFromAbiUnpack_1 = require("./resolveFuncTypeFromAbiUnpack");
const SMALL_STRUCT_MAX_FIELDS = 10;
//
// Serializer
//
function writeSerializer(name, forceInline, allocation, origin, ctx) {
    const isSmall = allocation.ops.length <= SMALL_STRUCT_MAX_FIELDS;
    // Write to builder
    ctx.fun(ops_1.ops.writer(name, ctx), () => {
        ctx.signature(`builder ${ops_1.ops.writer(name, ctx)}(builder build_0, ${(0, resolveFuncTypeFromAbi_1.resolveFuncTypeFromAbi)(allocation.ops.map((v) => v.type), ctx)} v)`);
        if (forceInline || isSmall) {
            ctx.flag("inline");
        }
        ctx.context("type:" + name);
        ctx.body(() => {
            if (allocation.ops.length > 0) {
                ctx.append(`var ${(0, resolveFuncTypeFromAbiUnpack_1.resolveFuncTypeFromAbiUnpack)(`v`, allocation.ops, ctx)} = v;`);
            }
            if (allocation.header) {
                ctx.append(`build_0 = store_uint(build_0, ${allocation.header.value}, ${allocation.header.bits});`);
            }
            writeSerializerCell(allocation.root, 0, ctx);
            ctx.append(`return build_0;`);
        });
    });
    // Write to cell
    ctx.fun(ops_1.ops.writerCell(name, ctx), () => {
        ctx.signature(`cell ${ops_1.ops.writerCell(name, ctx)}(${(0, resolveFuncTypeFromAbi_1.resolveFuncTypeFromAbi)(allocation.ops.map((v) => v.type), ctx)} v)`);
        ctx.flag("inline");
        ctx.context("type:" + name);
        ctx.body(() => {
            ctx.append(`return ${ops_1.ops.writer(name, ctx)}(begin_cell(), v).end_cell();`);
        });
    });
}
function writeOptionalSerializer(name, origin, ctx) {
    ctx.fun(ops_1.ops.writerCellOpt(name, ctx), () => {
        ctx.signature(`cell ${ops_1.ops.writerCellOpt(name, ctx)}(tuple v)`);
        ctx.flag("inline");
        ctx.context("type:" + name);
        ctx.body(() => {
            ctx.write(`
                if (null?(v)) {
                    return null();
                }
                return ${ops_1.ops.writerCell(name, ctx)}(${ops_1.ops.typeNotNull(name, ctx)}(v));
            `);
        });
    });
}
function writeSerializerCell(cell, gen, ctx) {
    // Write fields
    for (const f of cell.ops) {
        writeSerializerField(f, gen, ctx);
    }
    // Tail
    if (cell.next) {
        ctx.append(`var build_${gen + 1} = begin_cell();`);
        writeSerializerCell(cell.next, gen + 1, ctx);
        ctx.append(`build_${gen} = store_ref(build_${gen}, build_${gen + 1}.end_cell());`);
    }
}
function writeSerializerField(f, gen, ctx) {
    const fieldName = `v'${f.name}`;
    const op = f.op;
    switch (op.kind) {
        case "int": {
            if (op.optional) {
                ctx.append(`build_${gen} = ~ null?(${fieldName}) ? build_${gen}.store_int(true, 1).store_int(${fieldName}, ${op.bits}) : build_${gen}.store_int(false, 1);`);
            }
            else {
                ctx.append(`build_${gen} = build_${gen}.store_int(${fieldName}, ${op.bits});`);
            }
            return;
        }
        case "uint": {
            if (op.optional) {
                ctx.append(`build_${gen} = ~ null?(${fieldName}) ? build_${gen}.store_int(true, 1).store_uint(${fieldName}, ${op.bits}) : build_${gen}.store_int(false, 1);`);
            }
            else {
                ctx.append(`build_${gen} = build_${gen}.store_uint(${fieldName}, ${op.bits});`);
            }
            return;
        }
        case "varint16":
        case "varuint16":
        case "varint32":
        case "varuint32": {
            if (op.optional) {
                ctx.append(`build_${gen} = ~ null?(${fieldName}) ? build_${gen}.store_int(true, 1).store_${op.kind}(${fieldName}) : build_${gen}.store_int(false, 1);`);
            }
            else {
                ctx.append(`build_${gen} = build_${gen}.store_${op.kind}(${fieldName});`);
            }
            return;
        }
        case "boolean": {
            if (op.optional) {
                ctx.append(`build_${gen} = ~ null?(${fieldName}) ? build_${gen}.store_int(true, 1).store_int(${fieldName}, 1) : build_${gen}.store_int(false, 1);`);
            }
            else {
                ctx.append(`build_${gen} = build_${gen}.store_int(${fieldName}, 1);`);
            }
            return;
        }
        case "address": {
            if (op.optional) {
                ctx.used(`__tact_store_address_opt`);
                ctx.append(`build_${gen} = __tact_store_address_opt(build_${gen}, ${fieldName});`);
            }
            else {
                ctx.append(`build_${gen} = build_${gen}.store_slice(${fieldName});`);
            }
            return;
        }
        case "cell": {
            switch (op.format) {
                case "default":
                    {
                        if (op.optional) {
                            ctx.append(`build_${gen} = ~ null?(${fieldName}) ? build_${gen}.store_int(true, 1).store_ref(${fieldName}) : build_${gen}.store_int(false, 1);`);
                        }
                        else {
                            ctx.append(`build_${gen} = build_${gen}.store_ref(${fieldName});`);
                        }
                    }
                    break;
                case "remainder":
                    {
                        if (op.optional) {
                            throw Error("Impossible");
                        }
                        ctx.append(`build_${gen} = build_${gen}.store_slice(${fieldName}.begin_parse());`);
                    }
                    break;
            }
            return;
        }
        case "slice": {
            switch (op.format) {
                case "default":
                    {
                        if (op.optional) {
                            ctx.append(`build_${gen} = ~ null?(${fieldName}) ? build_${gen}.store_int(true, 1).store_ref(begin_cell().store_slice(${fieldName}).end_cell()) : build_${gen}.store_int(false, 1);`);
                        }
                        else {
                            ctx.append(`build_${gen} = build_${gen}.store_ref(begin_cell().store_slice(${fieldName}).end_cell());`);
                        }
                    }
                    break;
                case "remainder": {
                    if (op.optional) {
                        throw Error("Impossible");
                    }
                    ctx.append(`build_${gen} = build_${gen}.store_slice(${fieldName});`);
                }
            }
            return;
        }
        case "builder": {
            switch (op.format) {
                case "default":
                    {
                        if (op.optional) {
                            ctx.append(`build_${gen} = ~ null?(${fieldName}) ? build_${gen}.store_int(true, 1).store_ref(begin_cell().store_slice(${fieldName}.end_cell().begin_parse()).end_cell()) : build_${gen}.store_int(false, 1);`);
                        }
                        else {
                            ctx.append(`build_${gen} = build_${gen}.store_ref(begin_cell().store_slice(${fieldName}.end_cell().begin_parse()).end_cell());`);
                        }
                    }
                    break;
                case "remainder": {
                    if (op.optional) {
                        throw Error("Impossible");
                    }
                    ctx.append(`build_${gen} = build_${gen}.store_slice(${fieldName}.end_cell().begin_parse());`);
                }
            }
            return;
        }
        case "string": {
            if (op.optional) {
                ctx.append(`build_${gen} = ~ null?(${fieldName}) ? build_${gen}.store_int(true, 1).store_ref(begin_cell().store_slice(${fieldName}).end_cell()) : build_${gen}.store_int(false, 1);`);
            }
            else {
                ctx.append(`build_${gen} = build_${gen}.store_ref(begin_cell().store_slice(${fieldName}).end_cell());`);
            }
            return;
        }
        case "fixed-bytes": {
            if (op.optional) {
                ctx.append(`build_${gen} = ~ null?(${fieldName}) ? build_${gen}.store_int(true, 1).store_slice(${fieldName}) : build_${gen}.store_int(false, 1);`);
            }
            else {
                ctx.append(`build_${gen} = build_${gen}.store_slice(${fieldName});`);
            }
            return;
        }
        case "map": {
            ctx.append(`build_${gen} = build_${gen}.store_dict(${fieldName});`);
            return;
        }
        case "struct": {
            if (op.ref) {
                throw Error("Not implemented");
            }
            if (op.optional) {
                ctx.append(`build_${gen} = ~ null?(${fieldName}) ? build_${gen}.store_int(true, 1).${ops_1.ops.writer(op.type, ctx)}(${ops_1.ops.typeNotNull(op.type, ctx)}(${fieldName})) : build_${gen}.store_int(false, 1);`);
            }
            else {
                const ff = (0, resolveDescriptors_1.getType)(ctx.ctx, op.type).fields.map((f) => f.abi);
                ctx.append(`build_${gen} = ${ops_1.ops.writer(op.type, ctx)}(build_${gen}, ${(0, resolveFuncTypeFromAbiUnpack_1.resolveFuncTypeFromAbiUnpack)(fieldName, ff, ctx)});`);
            }
            return;
        }
    }
    (0, errors_2.throwInternalCompilerError)(`Unsupported field kind`, grammar_1.dummySrcInfo);
}
//
// Parser
//
function writeParser(name, forceInline, opcode, allocation, origin, ctx) {
    const isSmall = allocation.ops.length <= SMALL_STRUCT_MAX_FIELDS;
    ctx.fun(ops_1.ops.reader(name, opcode, ctx), () => {
        ctx.signature(`(slice, (${(0, resolveFuncTypeFromAbi_1.resolveFuncTypeFromAbi)(allocation.ops.map((v) => v.type), ctx)})) ${ops_1.ops.reader(name, opcode, ctx)}(slice sc_0)`);
        if (forceInline || isSmall) {
            ctx.flag("inline");
        }
        ctx.context("type:" + name);
        ctx.body(() => {
            // Check prefix
            if (allocation.header && opcode === "with-opcode") {
                ctx.append(`throw_unless(${errors_1.contractErrors.invalidPrefix.id}, sc_0~load_uint(${allocation.header.bits}) == ${allocation.header.value});`);
            }
            // Write cell parser
            writeCellParser(allocation.root, 0, ctx);
            // Compile tuple
            if (allocation.ops.length === 0) {
                ctx.append(`return (sc_0, null());`);
            }
            else {
                ctx.append(`return (sc_0, (${allocation.ops.map((v) => `v'${v.name}`).join(", ")}));`);
            }
        });
    });
    // Write non-modifying variant
    // prevent from writing two FunC functions with the same name
    if (opcode === "with-opcode") {
        ctx.fun(ops_1.ops.readerNonModifying(name, ctx), () => {
            ctx.signature(`(${(0, resolveFuncTypeFromAbi_1.resolveFuncTypeFromAbi)(allocation.ops.map((v) => v.type), ctx)}) ${ops_1.ops.readerNonModifying(name, ctx)}(slice sc_0)`);
            if (forceInline || isSmall) {
                ctx.flag("inline");
            }
            ctx.context("type:" + name);
            ctx.body(() => {
                ctx.append(`var r = sc_0~${ops_1.ops.reader(name, opcode, ctx)}();`);
                ctx.append(`sc_0.end_parse();`);
                ctx.append(`return r;`);
            });
        });
    }
}
function writeBouncedParser(name, forceInline, allocation, origin, ctx) {
    const isSmall = allocation.ops.length <= SMALL_STRUCT_MAX_FIELDS;
    ctx.fun(ops_1.ops.readerBounced(name, ctx), () => {
        ctx.signature(`(slice, (${(0, resolveFuncTypeFromAbi_1.resolveFuncTypeFromAbi)(allocation.ops.map((v) => v.type), ctx)})) ${ops_1.ops.readerBounced(name, ctx)}(slice sc_0)`);
        if (forceInline || isSmall) {
            ctx.flag("inline");
        }
        ctx.context("type:" + name);
        ctx.body(() => {
            // Opcode already eaten and checked
            // Write cell parser
            writeCellParser(allocation.root, 0, ctx);
            // Compile tuple
            if (allocation.ops.length === 0) {
                ctx.append(`return (sc_0, null());`);
            }
            else {
                ctx.append(`return (sc_0, (${allocation.ops.map((v) => `v'${v.name}`).join(", ")}));`);
            }
        });
    });
}
function writeOptionalParser(name, origin, ctx) {
    ctx.fun(ops_1.ops.readerOpt(name, ctx), () => {
        ctx.signature(`tuple ${ops_1.ops.readerOpt(name, ctx)}(cell cl)`);
        ctx.flag("inline");
        ctx.context("type:" + name);
        ctx.body(() => {
            ctx.write(`
                if (null?(cl)) {
                    return null();
                }
                var sc = cl.begin_parse();
                return ${ops_1.ops.typeAsOptional(name, ctx)}(sc~${ops_1.ops.reader(name, "with-opcode", ctx)}());
            `);
        });
    });
}
function writeCellParser(cell, gen, ctx) {
    // Write current fields
    for (const f of cell.ops) {
        writeFieldParser(f, gen, ctx);
    }
    // Handle next cell
    if (cell.next) {
        ctx.append(`slice sc_${gen + 1} = sc_${gen}~load_ref().begin_parse();`);
        return writeCellParser(cell.next, gen + 1, ctx);
    }
    else {
        return gen;
    }
}
function writeFieldParser(f, gen, ctx) {
    const op = f.op;
    const varName = `var v'${f.name}`;
    switch (op.kind) {
        case "int": {
            if (op.optional) {
                ctx.append(`${varName} = sc_${gen}~load_int(1) ? sc_${gen}~load_int(${op.bits}) : null();`);
            }
            else {
                ctx.append(`${varName} = sc_${gen}~load_int(${op.bits});`);
            }
            return;
        }
        case "uint": {
            if (op.optional) {
                ctx.append(`${varName} = sc_${gen}~load_int(1) ? sc_${gen}~load_uint(${op.bits}) : null();`);
            }
            else {
                ctx.append(`${varName} = sc_${gen}~load_uint(${op.bits});`);
            }
            return;
        }
        case "varint16":
        case "varint32":
        case "varuint16":
        case "varuint32": {
            if (op.optional) {
                ctx.append(`${varName} = sc_${gen}~load_int(1) ? sc_${gen}~load_${op.kind}() : null();`);
            }
            else {
                ctx.append(`${varName} = sc_${gen}~load_${op.kind}();`);
            }
            return;
        }
        case "boolean": {
            if (op.optional) {
                ctx.append(`${varName} = sc_${gen}~load_int(1) ? sc_${gen}~load_int(1) : null();`);
            }
            else {
                ctx.append(`${varName} = sc_${gen}~load_int(1);`);
            }
            return;
        }
        case "address": {
            if (op.optional) {
                ctx.used(`__tact_load_address_opt`);
                ctx.append(`${varName} = sc_${gen}~__tact_load_address_opt();`);
            }
            else {
                ctx.append(`${varName} = sc_${gen}~load_msg_addr();`);
            }
            return;
        }
        case "cell": {
            if (op.optional) {
                if (op.format !== "default") {
                    throw new Error(`Impossible`);
                }
                ctx.append(`${varName} = sc_${gen}~load_int(1) ? sc_${gen}~load_ref() : null();`);
            }
            else {
                switch (op.format) {
                    case "default":
                        {
                            ctx.append(`${varName} = sc_${gen}~load_ref();`);
                        }
                        break;
                    case "remainder": {
                        ctx.append(`${varName} = begin_cell().store_slice(sc_${gen}).end_cell();`);
                    }
                }
            }
            return;
        }
        case "slice": {
            if (op.optional) {
                if (op.format !== "default") {
                    throw new Error(`Impossible`);
                }
                ctx.append(`${varName} = sc_${gen}~load_int(1) ? sc_${gen}~load_ref().begin_parse() : null();`);
            }
            else {
                switch (op.format) {
                    case "default":
                        {
                            ctx.append(`${varName} = sc_${gen}~load_ref().begin_parse();`);
                        }
                        break;
                    case "remainder":
                        {
                            ctx.append(`${varName} = sc_${gen};`);
                        }
                        break;
                }
            }
            return;
        }
        case "builder": {
            if (op.optional) {
                if (op.format !== "default") {
                    throw new Error(`Impossible`);
                }
                ctx.append(`${varName} = sc_${gen}~load_int(1) ? begin_cell().store_slice(sc_${gen}~load_ref().begin_parse()) : null();`);
            }
            else {
                switch (op.format) {
                    case "default":
                        {
                            ctx.append(`${varName} = begin_cell().store_slice(sc_${gen}~load_ref().begin_parse());`);
                        }
                        break;
                    case "remainder":
                        {
                            ctx.append(`${varName} = begin_cell().store_slice(sc_${gen});`);
                        }
                        break;
                }
            }
            return;
        }
        case "string": {
            if (op.optional) {
                ctx.append(`${varName} = sc_${gen}~load_int(1) ? sc_${gen}~load_ref().begin_parse() : null();`);
            }
            else {
                ctx.append(`${varName} = sc_${gen}~load_ref().begin_parse();`);
            }
            return;
        }
        case "fixed-bytes": {
            if (op.optional) {
                ctx.append(`${varName} = sc_${gen}~load_int(1) ? sc_${gen}~load_bits(${op.bytes * 8}) : null();`);
            }
            else {
                ctx.append(`${varName} = sc_${gen}~load_bits(${op.bytes * 8});`);
            }
            return;
        }
        case "map": {
            ctx.append(`${varName} = sc_${gen}~load_dict();`);
            return;
        }
        case "struct": {
            if (op.optional) {
                if (op.ref) {
                    throw Error("Not implemented");
                }
                else {
                    ctx.append(`${varName} = sc_${gen}~load_int(1) ? ${ops_1.ops.typeAsOptional(op.type, ctx)}(sc_${gen}~${ops_1.ops.reader(op.type, "with-opcode", ctx)}()) : null();`);
                }
            }
            else {
                if (op.ref) {
                    throw Error("Not implemented");
                }
                else {
                    ctx.append(`${varName} = sc_${gen}~${ops_1.ops.reader(op.type, "with-opcode", ctx)}();`);
                }
            }
            return;
        }
    }
}
