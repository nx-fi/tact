"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveFuncFlatTypes = resolveFuncFlatTypes;
const resolveDescriptors_1 = require("../../types/resolveDescriptors");
const resolveFuncType_1 = require("./resolveFuncType");
function resolveFuncFlatTypes(descriptor, ctx, optional = false) {
    // String
    if (typeof descriptor === "string") {
        return resolveFuncFlatTypes((0, resolveDescriptors_1.getType)(ctx.ctx, descriptor), ctx);
    }
    // TypeRef
    if (descriptor.kind === "ref") {
        return resolveFuncFlatTypes((0, resolveDescriptors_1.getType)(ctx.ctx, descriptor.name), ctx, descriptor.optional);
    }
    if (descriptor.kind === "map") {
        return ["cell"];
    }
    if (descriptor.kind === "ref_bounced") {
        throw Error("Unimplemented");
    }
    if (descriptor.kind === "void") {
        throw Error("Void type is not allowed in function arguments");
    }
    // TypeDescription
    if (descriptor.kind === "primitive_type_decl") {
        return [(0, resolveFuncType_1.resolveFuncType)(descriptor, ctx)];
    }
    else if (descriptor.kind === "struct") {
        if (optional || descriptor.fields.length === 0) {
            return ["tuple"];
        }
        else {
            return descriptor.fields.flatMap((v) => resolveFuncFlatTypes(v.type, ctx));
        }
    }
    else if (descriptor.kind === "contract") {
        if (optional || descriptor.fields.length === 0) {
            return ["tuple"];
        }
        else {
            return descriptor.fields.flatMap((v) => resolveFuncFlatTypes(v.type, ctx));
        }
    }
    // Unreachable
    throw Error("Unknown type: " + descriptor.kind);
}
