"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFormat = void 0;
const zod_1 = require("zod");
const typeFormat = zod_1.z.union([
    zod_1.z.object({
        kind: zod_1.z.literal("simple"),
        type: zod_1.z.string(),
        optional: zod_1.z.boolean().optional().nullable(),
        format: zod_1.z
            .union([zod_1.z.boolean(), zod_1.z.number(), zod_1.z.string()])
            .optional()
            .nullable(),
    }),
    zod_1.z.object({
        kind: zod_1.z.literal("dict"),
        format: zod_1.z
            .union([zod_1.z.boolean(), zod_1.z.number(), zod_1.z.string()])
            .optional()
            .nullable(),
        key: zod_1.z.string(),
        keyFormat: zod_1.z
            .union([zod_1.z.boolean(), zod_1.z.number(), zod_1.z.string()])
            .optional()
            .nullable(),
        value: zod_1.z.string(),
        valueFormat: zod_1.z
            .union([zod_1.z.boolean(), zod_1.z.number(), zod_1.z.string()])
            .optional()
            .nullable(),
    }),
]);
const initFormat = zod_1.z.object({
    kind: zod_1.z.literal("direct"),
    args: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        type: typeFormat,
    })),
    prefix: zod_1.z
        .object({
        bits: zod_1.z.number(),
        value: zod_1.z.number(),
    })
        .optional(),
    deployment: zod_1.z.union([
        zod_1.z.object({
            kind: zod_1.z.literal("direct"),
        }),
        zod_1.z.object({
            kind: zod_1.z.literal("system-cell"),
            system: zod_1.z.string().nullable(),
        }),
    ]),
});
exports.fileFormat = zod_1.z.object({
    // Contract name, code and abi
    name: zod_1.z.string(),
    code: zod_1.z.string(),
    abi: zod_1.z.string(),
    // Deployment
    init: initFormat,
    // Sources
    sources: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).optional(),
    // Compiler information
    compiler: zod_1.z.object({
        name: zod_1.z.string(),
        version: zod_1.z.string(),
        parameters: zod_1.z.string().optional().nullable(),
    }),
});
