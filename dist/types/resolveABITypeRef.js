"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intMapValFormats = exports.intMapKeyFormats = void 0;
exports.resolveABIType = resolveABIType;
exports.createABITypeRefFromTypeRef = createABITypeRefFromTypeRef;
const ast_helpers_1 = require("../ast/ast-helpers");
const errors_1 = require("../error/errors");
const resolveDescriptors_1 = require("./resolveDescriptors");
const uintOptions = Object.fromEntries([...Array(256).keys()].map((key) => [
    `uint${key + 1}`,
    { type: "uint", format: key + 1 },
]));
const intOptions = Object.fromEntries([...Array(256).keys()].map((key) => [
    `int${key + 1}`,
    { type: "int", format: key + 1 },
]));
const intFormats = {
    ...uintOptions,
    ...intOptions,
    int257: { type: "int", format: 257 },
    coins: { type: "uint", format: "coins" },
    varint16: { type: "int", format: "varint16" },
    varint32: { type: "int", format: "varint32" },
    varuint16: { type: "uint", format: "varuint16" },
    varuint32: { type: "uint", format: "varuint32" },
};
// only fixed-width integer map keys are supported
exports.intMapKeyFormats = {
    ...uintOptions,
    ...intOptions,
    int257: { type: "int", format: 257 },
};
exports.intMapValFormats = { ...intFormats };
const cellFormats = {
    remaining: { type: "cell", format: "remainder" },
};
const sliceFormats = {
    remaining: { type: "slice", format: "remainder" },
    bytes32: { type: "fixed-bytes", format: 32 },
    bytes64: { type: "fixed-bytes", format: 64 },
};
const builderFormats = {
    remaining: { type: "builder", format: "remainder" },
};
function resolveABIType(src) {
    if (src.type.kind === "type_id" ||
        (src.type.kind === "optional_type" &&
            src.type.typeArg.kind == "type_id")) {
        //
        // Primitive types
        //
        const typeId = src.type.kind === "type_id"
            ? src.type
            : src.type.typeArg.kind === "type_id"
                ? src.type.typeArg
                : (0, errors_1.throwInternalCompilerError)("Only optional type identifiers are supported now", src.type.typeArg.loc);
        if ((0, ast_helpers_1.isInt)(typeId)) {
            if (src.as) {
                const fmt = intFormats[(0, ast_helpers_1.idText)(src.as)];
                if (!fmt) {
                    (0, errors_1.throwCompilationError)(`Unsupported format ${(0, errors_1.idTextErr)(src.as)}`, src.loc);
                }
                return {
                    kind: "simple",
                    type: fmt.type,
                    optional: src.type.kind === "optional_type",
                    format: fmt.format,
                };
            }
            return {
                kind: "simple",
                type: "int",
                optional: src.type.kind === "optional_type",
                format: 257,
            }; // Default is maximum size int
        }
        if ((0, ast_helpers_1.isBool)(typeId)) {
            if (src.as) {
                (0, errors_1.throwCompilationError)(`Unsupported format ${(0, errors_1.idTextErr)(src.as)}`, src.loc);
            }
            return {
                kind: "simple",
                type: "bool",
                optional: src.type.kind === "optional_type",
            };
        }
        if ((0, ast_helpers_1.isCell)(typeId)) {
            if (src.as) {
                const fmt = cellFormats[(0, ast_helpers_1.idText)(src.as)];
                if (!fmt) {
                    (0, errors_1.throwCompilationError)(`Unsupported format ${(0, errors_1.idTextErr)(src.as)}`, src.loc);
                }
                return {
                    kind: "simple",
                    type: fmt.type,
                    optional: src.type.kind === "optional_type",
                    format: fmt.format,
                };
            }
            return {
                kind: "simple",
                type: "cell",
                optional: src.type.kind === "optional_type",
            };
        }
        if ((0, ast_helpers_1.isSlice)(typeId)) {
            if (src.as) {
                const fmt = sliceFormats[(0, ast_helpers_1.idText)(src.as)];
                if (!fmt) {
                    (0, errors_1.throwCompilationError)(`Unsupported format ${(0, errors_1.idTextErr)(src.as)}`, src.loc);
                }
                return {
                    kind: "simple",
                    type: fmt.type,
                    optional: src.type.kind === "optional_type",
                    format: fmt.format,
                };
            }
            return {
                kind: "simple",
                type: "slice",
                optional: src.type.kind === "optional_type",
            };
        }
        if ((0, ast_helpers_1.isBuilder)(typeId)) {
            if (src.as) {
                const fmt = builderFormats[(0, ast_helpers_1.idText)(src.as)];
                if (!fmt) {
                    (0, errors_1.throwCompilationError)(`Unsupported format ${(0, errors_1.idTextErr)(src.as)}`, src.loc);
                }
                return {
                    kind: "simple",
                    type: fmt.type,
                    optional: src.type.kind === "optional_type",
                    format: fmt.format,
                };
            }
            return {
                kind: "simple",
                type: "builder",
                optional: src.type.kind === "optional_type",
            };
        }
        if ((0, ast_helpers_1.isAddress)(typeId)) {
            if (src.as) {
                (0, errors_1.throwCompilationError)(`Unsupported format ${(0, errors_1.idTextErr)(src.as)}`, src.loc);
            }
            return {
                kind: "simple",
                type: "address",
                optional: src.type.kind === "optional_type",
            };
        }
        if ((0, ast_helpers_1.isString)(typeId)) {
            if (src.as) {
                (0, errors_1.throwCompilationError)(`Unsupported format ${(0, errors_1.idTextErr)(src.as)}`, src.loc);
            }
            return {
                kind: "simple",
                type: "string",
                optional: src.type.kind === "optional_type",
            };
        }
        if ((0, ast_helpers_1.isStringBuilder)(typeId)) {
            (0, errors_1.throwCompilationError)(`Unsupported type StringBuilder`, src.loc);
        }
        //
        // Structs
        //
        if (src.as) {
            if ((0, ast_helpers_1.eqNames)(src.as, "reference")) {
                return {
                    kind: "simple",
                    type: (0, ast_helpers_1.idText)(typeId),
                    optional: src.type.kind === "optional_type",
                    format: "ref",
                };
            }
            else {
                (0, errors_1.throwCompilationError)(`Unsupported format ${(0, errors_1.idTextErr)(src.as)}`, src.loc);
            }
        }
        return {
            kind: "simple",
            type: (0, ast_helpers_1.idText)(typeId),
            optional: src.type.kind === "optional_type",
        };
    }
    //
    // Map
    //
    if (src.type.kind === "map_type") {
        let key;
        let keyFormat = undefined;
        let value;
        let valueFormat = undefined;
        // Resolve key type
        if ((0, ast_helpers_1.isInt)(src.type.keyType)) {
            key = "int";
            if (src.type.keyStorageType) {
                const format = exports.intMapKeyFormats[(0, ast_helpers_1.idText)(src.type.keyStorageType)];
                if (!format) {
                    (0, errors_1.throwCompilationError)(`Unsupported format ${(0, errors_1.idTextErr)(src.type.keyStorageType)} for map key`, src.loc);
                }
                key = format.type;
                keyFormat = format.format;
            }
        }
        else if ((0, ast_helpers_1.isAddress)(src.type.keyType)) {
            key = "address";
            if (src.type.keyStorageType) {
                (0, errors_1.throwCompilationError)(`Unsupported format ${(0, errors_1.idTextErr)(src.type.keyStorageType)} for map key`, src.loc);
            }
        }
        else {
            (0, errors_1.throwCompilationError)(`Unsupported map key type ${(0, errors_1.idTextErr)(src.type.keyType)}`, src.loc);
        }
        // Resolve value type
        if ((0, ast_helpers_1.isInt)(src.type.valueType)) {
            value = "int";
            if (src.type.valueStorageType) {
                const format = exports.intMapValFormats[(0, ast_helpers_1.idText)(src.type.valueStorageType)];
                if (!format) {
                    (0, errors_1.throwCompilationError)(`Unsupported format ${(0, ast_helpers_1.idText)(src.type.valueStorageType)} for map value`, src.loc);
                }
                value = format.type;
                valueFormat = format.format;
            }
        }
        else if ((0, ast_helpers_1.isBool)(src.type.valueType)) {
            value = "bool";
            if (src.type.valueStorageType) {
                (0, errors_1.throwCompilationError)(`Unsupported format ${(0, errors_1.idTextErr)(src.type.valueStorageType)} for map value`, src.loc);
            }
        }
        else if ((0, ast_helpers_1.isCell)(src.type.valueType)) {
            value = "cell";
            valueFormat = "ref";
            if (src.type.valueStorageType &&
                (0, ast_helpers_1.eqNames)(src.type.valueStorageType, "reference")) {
                (0, errors_1.throwCompilationError)(`Unsupported format ${(0, errors_1.idTextErr)(src.type.valueStorageType)} for map value`, src.loc);
            }
        }
        else if ((0, ast_helpers_1.isSlice)(src.type.valueType)) {
            (0, errors_1.throwCompilationError)(`Unsupported map value type ${(0, errors_1.idTextErr)(src.type.valueType)}`, src.loc);
        }
        else if ((0, ast_helpers_1.isAddress)(src.type.valueType)) {
            value = "address";
            if (src.type.valueStorageType) {
                (0, errors_1.throwCompilationError)(`Unsupported format ${(0, errors_1.idTextErr)(src.type.valueStorageType)} for map value`, src.loc);
            }
        }
        else if ((0, ast_helpers_1.isString)(src.type.valueType)) {
            (0, errors_1.throwCompilationError)(`Unsupported map value type ${(0, errors_1.idTextErr)(src.type.valueType)}`, src.loc);
        }
        else if ((0, ast_helpers_1.isStringBuilder)(src.type.valueType) ||
            (0, ast_helpers_1.isBuilder)(src.type.valueType)) {
            (0, errors_1.throwCompilationError)(`Unsupported map value type ${(0, errors_1.idTextErr)(src.type.valueType)}`, src.loc);
        }
        else {
            value = (0, ast_helpers_1.idText)(src.type.valueType);
            valueFormat = "ref";
            if (src.type.valueStorageType &&
                (0, ast_helpers_1.eqNames)(src.type.valueStorageType, "reference")) {
                (0, errors_1.throwCompilationError)(`Unsupported format ${(0, errors_1.idTextErr)(src.type.valueStorageType)} for map value`, src.loc);
            }
        }
        return { kind: "dict", key, keyFormat, value, valueFormat };
    }
    (0, errors_1.throwCompilationError)(`Unsupported type`, src.loc);
}
function createABITypeRefFromTypeRef(ctx, src, loc) {
    if (src.kind === "ref") {
        // Primitives
        if (src.name === "Int") {
            return {
                kind: "simple",
                type: "int",
                optional: src.optional,
                format: 257,
            }; // Default is maximum size int
        }
        if (src.name === "Bool") {
            return { kind: "simple", type: "bool", optional: src.optional };
        }
        if (src.name === "Cell") {
            return { kind: "simple", type: "cell", optional: src.optional };
        }
        if (src.name === "Slice") {
            return { kind: "simple", type: "slice", optional: src.optional };
        }
        if (src.name === "Builder") {
            return { kind: "simple", type: "builder", optional: src.optional };
        }
        if (src.name === "Address") {
            return { kind: "simple", type: "address", optional: src.optional };
        }
        if (src.name === "String") {
            return { kind: "simple", type: "string", optional: src.optional };
        }
        if (src.name === "StringBuilder") {
            (0, errors_1.throwInternalCompilerError)(`Unsupported type "${src.name}"`);
        }
        // Structs
        const type = (0, resolveDescriptors_1.getType)(ctx, src.name);
        if (type.kind === "contract") {
            return {
                kind: "simple",
                type: src.name + "$Data",
                optional: src.optional,
            };
        }
        else {
            return { kind: "simple", type: src.name, optional: src.optional };
        }
    }
    if (src.kind === "map") {
        let key;
        let keyFormat = undefined;
        let value;
        let valueFormat = undefined;
        // Resolve key type
        if (src.key === "Int") {
            key = "int";
            if (src.keyAs) {
                const format = exports.intMapKeyFormats[src.keyAs];
                if (!format) {
                    (0, errors_1.throwCompilationError)(`Unsupported format ${src.keyAs} for map key`, loc);
                }
                key = format.type;
                keyFormat = format.format;
            }
        }
        else if (src.key === "Address") {
            key = "address";
            if (src.keyAs) {
                (0, errors_1.throwCompilationError)(`Unsupported format ${src.keyAs} for map key`, loc);
            }
        }
        else {
            (0, errors_1.throwInternalCompilerError)(`Unsupported map key type "${src.key}"`);
        }
        // Resolve value type
        if (src.value === "Int") {
            value = "int";
            if (src.valueAs) {
                const format = exports.intMapValFormats[src.valueAs];
                if (!format) {
                    (0, errors_1.throwCompilationError)(`Unsupported format ${src.valueAs} for map value`, loc);
                }
                value = format.type;
                valueFormat = format.format;
            }
        }
        else if (src.value === "Bool") {
            value = "bool";
            if (src.valueAs) {
                (0, errors_1.throwCompilationError)(`Unsupported format ${src.valueAs} for map value`, loc);
            }
        }
        else if (src.value === "Cell") {
            value = "cell";
            valueFormat = "ref";
            if (src.valueAs && src.valueAs !== "reference") {
                (0, errors_1.throwCompilationError)(`Unsupported format ${src.valueAs} for map value`, loc);
            }
        }
        else if (src.value === "Slice") {
            (0, errors_1.throwInternalCompilerError)(`Unsupported map value type "${src.value}"`);
        }
        else if (src.value === "Address") {
            value = "address";
            if (src.valueAs) {
                (0, errors_1.throwCompilationError)(`Unsupported format ${src.valueAs} for map value`, loc);
            }
        }
        else if (src.value === "String") {
            (0, errors_1.throwInternalCompilerError)(`Unsupported map value type "${src.value}"`);
        }
        else if (src.value === "StringBuilder" || src.value === "Builder") {
            (0, errors_1.throwInternalCompilerError)(`Unsupported map value type "${src.value}"`);
        }
        else {
            value = src.value;
            valueFormat = "ref";
            if (src.valueAs && src.valueAs !== "reference") {
                (0, errors_1.throwCompilationError)(`Unsupported format ${src.valueAs} for map value`, loc);
            }
        }
        return { kind: "dict", key, keyFormat, value, valueFormat };
    }
    if (src.kind === "ref_bounced") {
        (0, errors_1.throwInternalCompilerError)("Unexpected bounced reference");
    }
    (0, errors_1.throwInternalCompilerError)(`Unsupported type`);
}
