"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveFuncFlatPack = resolveFuncFlatPack;
const resolveDescriptors_1 = require("../../types/resolveDescriptors");
function resolveFuncFlatPack(descriptor, name, ctx, optional = false) {
    // String
    if (typeof descriptor === "string") {
        return resolveFuncFlatPack((0, resolveDescriptors_1.getType)(ctx.ctx, descriptor), name, ctx);
    }
    // TypeRef
    if (descriptor.kind === "ref") {
        return resolveFuncFlatPack((0, resolveDescriptors_1.getType)(ctx.ctx, descriptor.name), name, ctx, descriptor.optional);
    }
    if (descriptor.kind === "map") {
        return [name];
    }
    if (descriptor.kind === "ref_bounced") {
        throw Error("Unimplemented");
    }
    if (descriptor.kind === "void") {
        throw Error("Void type is not allowed in function arguments: " + name);
    }
    // TypeDescription
    if (descriptor.kind === "primitive_type_decl") {
        return [name];
    }
    else if (descriptor.kind === "struct") {
        if (optional || descriptor.fields.length === 0) {
            return [name];
        }
        else {
            return descriptor.fields.flatMap((v) => resolveFuncFlatPack(v.type, name + `'` + v.name, ctx));
        }
    }
    else if (descriptor.kind === "contract") {
        if (optional || descriptor.fields.length === 0) {
            return [name];
        }
        else {
            return descriptor.fields.flatMap((v) => resolveFuncFlatPack(v.type, name + `'` + v.name, ctx));
        }
    }
    // Unreachable
    throw Error("Unknown type: " + descriptor.kind);
}
