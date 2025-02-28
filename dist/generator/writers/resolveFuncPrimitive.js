"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveFuncPrimitive = resolveFuncPrimitive;
const resolveDescriptors_1 = require("../../types/resolveDescriptors");
function resolveFuncPrimitive(descriptor, ctx) {
    // String
    if (typeof descriptor === "string") {
        return resolveFuncPrimitive((0, resolveDescriptors_1.getType)(ctx.ctx, descriptor), ctx);
    }
    // TypeRef
    if (descriptor.kind === "ref") {
        return resolveFuncPrimitive((0, resolveDescriptors_1.getType)(ctx.ctx, descriptor.name), ctx);
    }
    if (descriptor.kind === "map") {
        return true;
    }
    if (descriptor.kind === "ref_bounced") {
        throw Error("Unimplemented");
    }
    if (descriptor.kind === "void") {
        return true;
    }
    // TypeDescription
    if (descriptor.kind === "primitive_type_decl") {
        if (descriptor.name === "Int") {
            return true;
        }
        else if (descriptor.name === "Bool") {
            return true;
        }
        else if (descriptor.name === "Slice") {
            return true;
        }
        else if (descriptor.name === "Cell") {
            return true;
        }
        else if (descriptor.name === "Builder") {
            return true;
        }
        else if (descriptor.name === "Address") {
            return true;
        }
        else if (descriptor.name === "String") {
            return true;
        }
        else if (descriptor.name === "StringBuilder") {
            return true;
        }
        else {
            throw Error("Unknown primitive type: " + descriptor.name);
        }
    }
    else if (descriptor.kind === "struct") {
        return false;
    }
    else if (descriptor.kind === "contract") {
        return false;
    }
    // Unreachable
    throw Error("Unknown type: " + descriptor.kind);
}
