"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cast = cast;
const resolveDescriptors_1 = require("../../types/resolveDescriptors");
const ops_1 = require("./ops");
function cast(from, to, expression, ctx) {
    if (from.kind === "ref" && to.kind === "ref") {
        if (from.name !== to.name) {
            throw Error("Impossible");
        }
        if (!from.optional && to.optional) {
            const type = (0, resolveDescriptors_1.getType)(ctx.ctx, from.name);
            if (type.kind === "struct") {
                return `${ops_1.ops.typeAsOptional(type.name, ctx)}(${expression})`;
            }
        }
    }
    return expression;
}
