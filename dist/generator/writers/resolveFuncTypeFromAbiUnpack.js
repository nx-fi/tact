"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveFuncTypeFromAbiUnpack = resolveFuncTypeFromAbiUnpack;
const resolveDescriptors_1 = require("../../types/resolveDescriptors");
function resolveFuncTypeFromAbiUnpack(name, fields, ctx) {
    if (fields.length === 0) {
        return name;
    }
    const res = [];
    for (const f of fields) {
        switch (f.type.kind) {
            case "dict":
                {
                    res.push(`${name}'${f.name}`);
                }
                break;
            case "simple":
                {
                    if (f.type.type === "int" ||
                        f.type.type === "uint" ||
                        f.type.type === "bool") {
                        res.push(`${name}'${f.name}`);
                    }
                    else if (f.type.type === "cell") {
                        res.push(`${name}'${f.name}`);
                    }
                    else if (f.type.type === "slice") {
                        res.push(`${name}'${f.name}`);
                    }
                    else if (f.type.type === "builder") {
                        res.push(`${name}'${f.name}`);
                    }
                    else if (f.type.type === "address") {
                        res.push(`${name}'${f.name}`);
                    }
                    else if (f.type.type === "fixed-bytes") {
                        res.push(`${name}'${f.name}`);
                    }
                    else if (f.type.type === "string") {
                        res.push(`${name}'${f.name}`);
                    }
                    else {
                        const t = (0, resolveDescriptors_1.getType)(ctx.ctx, f.type.type);
                        if (f.type.optional ?? t.fields.length === 0) {
                            res.push(`${name}'${f.name}`);
                        }
                        else {
                            const loaded = t.fields.map((v) => v.abi);
                            res.push(resolveFuncTypeFromAbiUnpack(`${name}'${f.name}`, loaded, ctx));
                        }
                    }
                }
                break;
        }
    }
    return `(${res.join(", ")})`;
}
