"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveFuncType = resolveFuncType;
const resolveDescriptors_1 = require("../../types/resolveDescriptors");
function resolveFuncType(descriptor, ctx, optional = false, usePartialFields = false) {
    // String
    if (typeof descriptor === "string") {
        return resolveFuncType((0, resolveDescriptors_1.getType)(ctx.ctx, descriptor), ctx, false, usePartialFields);
    }
    // TypeRef
    if (descriptor.kind === "ref") {
        return resolveFuncType((0, resolveDescriptors_1.getType)(ctx.ctx, descriptor.name), ctx, descriptor.optional, usePartialFields);
    }
    if (descriptor.kind === "map") {
        return "cell";
    }
    if (descriptor.kind === "ref_bounced") {
        return resolveFuncType((0, resolveDescriptors_1.getType)(ctx.ctx, descriptor.name), ctx, false, true);
    }
    if (descriptor.kind === "void") {
        return "()";
    }
    // TypeDescription
    if (descriptor.kind === "primitive_type_decl") {
        if (descriptor.name === "Int") {
            return "int";
        }
        else if (descriptor.name === "Bool") {
            return "int";
        }
        else if (descriptor.name === "Slice") {
            return "slice";
        }
        else if (descriptor.name === "Cell") {
            return "cell";
        }
        else if (descriptor.name === "Builder") {
            return "builder";
        }
        else if (descriptor.name === "Address") {
            return "slice";
        }
        else if (descriptor.name === "String") {
            return "slice";
        }
        else if (descriptor.name === "StringBuilder") {
            return "tuple";
        }
        else {
            throw Error("Unknown primitive type: " + descriptor.name);
        }
    }
    else if (descriptor.kind === "struct") {
        const fieldsToUse = usePartialFields
            ? descriptor.fields.slice(0, descriptor.partialFieldCount)
            : descriptor.fields;
        if (optional || fieldsToUse.length === 0) {
            return "tuple";
        }
        else {
            return ("(" +
                fieldsToUse
                    .map((v) => resolveFuncType(v.type, ctx, false, usePartialFields))
                    .join(", ") +
                ")");
        }
    }
    else if (descriptor.kind === "contract") {
        if (optional || descriptor.fields.length === 0) {
            return "tuple";
        }
        else {
            return ("(" +
                descriptor.fields
                    .map((v) => resolveFuncType(v.type, ctx, false, usePartialFields))
                    .join(", ") +
                ")");
        }
    }
    // Unreachable
    throw Error("Unknown type: " + descriptor.kind);
}
