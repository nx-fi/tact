"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBounced = void 0;
exports.resolveTypeRef = resolveTypeRef;
exports.resolveDescriptors = resolveDescriptors;
exports.getType = getType;
exports.getAllTypes = getAllTypes;
exports.getContracts = getContracts;
exports.getStaticFunction = getStaticFunction;
exports.hasStaticFunction = hasStaticFunction;
exports.getStaticConstant = getStaticConstant;
exports.hasStaticConstant = hasStaticConstant;
exports.getAllStaticFunctions = getAllStaticFunctions;
exports.getAllStaticConstants = getAllStaticConstants;
const ast_helpers_1 = require("../ast/ast-helpers");
const iterators_1 = require("../ast/iterators");
const errors_1 = require("../error/errors");
const context_1 = require("../context/context");
const types_1 = require("./types");
const store_1 = require("../context/store");
const clone_1 = require("../ast/clone");
const crc16_1 = require("../utils/crc16");
const isSubsetOf_1 = require("../utils/isSubsetOf");
const constEval_1 = require("../optimizer/constEval");
const resolveABITypeRef_1 = require("./resolveABITypeRef");
const features_1 = require("../config/features");
const isRuntimeType_1 = require("./isRuntimeType");
const global_1 = require("../abi/global");
const resolveExpression_1 = require("./resolveExpression");
const resolveStatements_1 = require("./resolveStatements");
const subtyping_1 = require("./subtyping");
const util_1 = require("../ast/util");
const array_1 = require("../utils/array");
const store = (0, context_1.createContextStore)();
const staticFunctionsStore = (0, context_1.createContextStore)();
const staticConstantsStore = (0, context_1.createContextStore)();
// this function does not handle the case of structs
function verifyMapAsAnnotationsForPrimitiveTypes(type, asAnnotation, kind) {
    switch ((0, ast_helpers_1.idText)(type)) {
        case "Int": {
            if (asAnnotation === null)
                return;
            const ann = (0, ast_helpers_1.idText)(asAnnotation);
            switch (kind) {
                case "keyType":
                    if (!Object.keys(resolveABITypeRef_1.intMapKeyFormats).includes(ann)) {
                        (0, errors_1.throwCompilationError)(`"${ann}" is invalid as-annotation for map key type "Int"`, asAnnotation.loc);
                    }
                    return;
                case "valType":
                    if (!Object.keys(resolveABITypeRef_1.intMapValFormats).includes(ann)) {
                        (0, errors_1.throwCompilationError)(`"${ann}" is invalid as-annotation for map value type "Int"`, asAnnotation.loc);
                    }
            }
            return;
        }
        case "Address":
        case "Bool":
        case "Cell": {
            if (asAnnotation !== null) {
                (0, errors_1.throwCompilationError)(`${(0, errors_1.idTextErr)(type)} type cannot have as-annotation`, asAnnotation.loc);
            }
            return;
        }
        default: {
            (0, errors_1.throwInternalCompilerError)("Unsupported map type", type.loc);
        }
    }
}
function verifyMapTypes(typeId, asAnnotation, allowedTypeNames, kind) {
    if (!allowedTypeNames.includes((0, ast_helpers_1.idText)(typeId))) {
        (0, errors_1.throwCompilationError)("Invalid map type. Check https://docs.tact-lang.org/book/maps#allowed-types", typeId.loc);
    }
    verifyMapAsAnnotationsForPrimitiveTypes(typeId, asAnnotation, kind);
}
function verifyMapType(mapTy, isValTypeStruct) {
    // optional and other compound key and value types are disallowed at the level of grammar
    // check allowed key types
    verifyMapTypes(mapTy.keyType, mapTy.keyStorageType, ["Int", "Address"], "keyType");
    // check allowed value types
    if (isValTypeStruct && mapTy.valueStorageType === null) {
        return;
    }
    // the case for struct/message is already checked
    verifyMapTypes(mapTy.valueType, mapTy.valueStorageType, ["Int", "Address", "Bool", "Cell"], "valType");
}
const toBounced = (type) => `${type}%%BOUNCED%%`;
exports.toBounced = toBounced;
function resolveTypeRef(ctx, type) {
    switch (type.kind) {
        case "type_id": {
            const t = getType(ctx, (0, ast_helpers_1.idText)(type));
            return {
                kind: "ref",
                name: t.name,
                optional: false,
            };
        }
        case "optional_type": {
            if (type.typeArg.kind !== "type_id") {
                (0, errors_1.throwInternalCompilerError)("Only optional type identifiers are supported now", type.typeArg.loc);
            }
            const t = getType(ctx, (0, ast_helpers_1.idText)(type.typeArg));
            return {
                kind: "ref",
                name: t.name,
                optional: true,
            };
        }
        case "map_type": {
            const keyTy = getType(ctx, (0, ast_helpers_1.idText)(type.keyType));
            const valTy = getType(ctx, (0, ast_helpers_1.idText)(type.valueType));
            verifyMapType(type, valTy.kind === "struct");
            return {
                kind: "map",
                key: keyTy.name,
                keyAs: type.keyStorageType !== null
                    ? (0, ast_helpers_1.idText)(type.keyStorageType)
                    : null,
                value: valTy.name,
                valueAs: type.valueStorageType !== null
                    ? (0, ast_helpers_1.idText)(type.valueStorageType)
                    : null,
            };
        }
        case "bounced_message_type": {
            const t = getType(ctx, (0, ast_helpers_1.idText)(type.messageType));
            return {
                kind: "ref_bounced",
                name: t.name,
            };
        }
    }
}
function buildTypeRef(type, types) {
    switch (type.kind) {
        case "type_id": {
            if (!types.has((0, ast_helpers_1.idText)(type))) {
                (0, errors_1.throwCompilationError)(`Type ${(0, errors_1.idTextErr)(type)} not found`, type.loc);
            }
            return {
                kind: "ref",
                name: (0, ast_helpers_1.idText)(type),
                optional: false,
            };
        }
        case "optional_type": {
            if (type.typeArg.kind !== "type_id") {
                (0, errors_1.throwInternalCompilerError)("Only optional type identifiers are supported now", type.typeArg.loc);
            }
            if (!types.has((0, ast_helpers_1.idText)(type.typeArg))) {
                (0, errors_1.throwCompilationError)(`Type ${(0, errors_1.idTextErr)(type.typeArg)} not found`, type.loc);
            }
            return {
                kind: "ref",
                name: (0, ast_helpers_1.idText)(type.typeArg),
                optional: true,
            };
        }
        case "map_type": {
            if (!types.has((0, ast_helpers_1.idText)(type.keyType))) {
                (0, errors_1.throwCompilationError)(`Type ${(0, errors_1.idTextErr)(type.keyType)} not found`, type.loc);
            }
            if (!types.has((0, ast_helpers_1.idText)(type.valueType))) {
                (0, errors_1.throwCompilationError)(`Type ${(0, errors_1.idTextErr)(type.valueType)} not found`, type.loc);
            }
            const valTy = types.get((0, ast_helpers_1.idText)(type.valueType));
            verifyMapType(type, valTy.kind === "struct");
            return {
                kind: "map",
                key: (0, ast_helpers_1.idText)(type.keyType),
                keyAs: type.keyStorageType !== null
                    ? (0, ast_helpers_1.idText)(type.keyStorageType)
                    : null,
                value: (0, ast_helpers_1.idText)(type.valueType),
                valueAs: type.valueStorageType !== null
                    ? (0, ast_helpers_1.idText)(type.valueStorageType)
                    : null,
            };
        }
        case "bounced_message_type": {
            return {
                kind: "ref_bounced",
                name: (0, ast_helpers_1.idText)(type.messageType),
            };
        }
    }
}
function uidForName(name, types) {
    // Resolve unique typeid from crc16
    let uid = (0, crc16_1.crc16)(name);
    while (Array.from(types.values()).find((v) => v.uid === uid)) {
        uid = (uid + 1) % 65536;
    }
    return uid;
}
function resolveDescriptors(ctx, Ast) {
    const types = new Map();
    const staticFunctions = new Map();
    const staticConstants = new Map();
    const ast = (0, store_1.getRawAST)(ctx);
    const util = (0, util_1.getAstUtil)(Ast);
    //
    // Register types
    //
    for (const a of ast.types) {
        if (types.has((0, ast_helpers_1.idText)(a.name))) {
            (0, errors_1.throwCompilationError)(`Type "${(0, ast_helpers_1.idText)(a.name)}" already exists`, a.loc);
        }
        const uid = uidForName((0, ast_helpers_1.idText)(a.name), types);
        switch (a.kind) {
            case "primitive_type_decl":
                {
                    types.set((0, ast_helpers_1.idText)(a.name), {
                        kind: "primitive_type_decl",
                        origin: a.loc.origin,
                        name: (0, ast_helpers_1.idText)(a.name),
                        uid,
                        fields: [],
                        traits: [],
                        header: null,
                        tlb: null,
                        signature: null,
                        functions: new Map(),
                        receivers: [],
                        dependsOn: [],
                        init: null,
                        ast: a,
                        interfaces: [],
                        constants: [],
                        partialFieldCount: 0,
                    });
                }
                break;
            case "contract":
                {
                    types.set((0, ast_helpers_1.idText)(a.name), {
                        kind: "contract",
                        origin: a.loc.origin,
                        name: (0, ast_helpers_1.idText)(a.name),
                        uid,
                        header: null,
                        tlb: null,
                        fields: [],
                        traits: [],
                        signature: null,
                        functions: new Map(),
                        receivers: [],
                        dependsOn: [],
                        init: null,
                        ast: a,
                        interfaces: a.attributes.map((v) => v.name.value),
                        constants: [],
                        partialFieldCount: 0,
                    });
                }
                break;
            case "struct_decl":
            case "message_decl":
                {
                    types.set((0, ast_helpers_1.idText)(a.name), {
                        kind: "struct",
                        origin: a.loc.origin,
                        name: (0, ast_helpers_1.idText)(a.name),
                        uid,
                        header: null,
                        tlb: null,
                        signature: null,
                        fields: [],
                        traits: [],
                        functions: new Map(),
                        receivers: [],
                        dependsOn: [],
                        init: null,
                        ast: a,
                        interfaces: [],
                        constants: [],
                        partialFieldCount: 0,
                    });
                }
                break;
            case "trait": {
                types.set((0, ast_helpers_1.idText)(a.name), {
                    kind: "trait",
                    origin: a.loc.origin,
                    name: (0, ast_helpers_1.idText)(a.name),
                    uid,
                    header: null,
                    tlb: null,
                    signature: null,
                    fields: [],
                    traits: [],
                    functions: new Map(),
                    receivers: [],
                    dependsOn: [],
                    init: null,
                    ast: a,
                    interfaces: a.attributes.map((v) => v.name.value),
                    constants: [],
                    partialFieldCount: 0,
                });
            }
        }
    }
    //
    // Resolve fields
    //
    function buildFieldDescription(src, index) {
        const fieldTy = buildTypeRef(src.type, types);
        // Check if field is runtime type
        if ((0, isRuntimeType_1.isRuntimeType)(fieldTy)) {
            (0, errors_1.throwCompilationError)((0, types_1.printTypeRef)(fieldTy) +
                " is a runtime only type and can't be used as field", src.loc);
        }
        // Resolve abi type
        const type = (0, resolveABITypeRef_1.resolveABIType)(src);
        return {
            name: (0, ast_helpers_1.idText)(src.name),
            type: fieldTy,
            index,
            as: src.as !== null ? (0, ast_helpers_1.idText)(src.as) : null,
            default: undefined, // initializer will be evaluated after typechecking
            loc: src.loc,
            ast: src,
            abi: { name: (0, ast_helpers_1.idText)(src.name), type },
        };
    }
    function buildConstantDescription(src) {
        const constDeclTy = buildTypeRef(src.type, types);
        return {
            name: (0, ast_helpers_1.idText)(src.name),
            type: constDeclTy,
            value: undefined, // initializer will be evaluated after typechecking
            loc: src.loc,
            ast: src,
        };
    }
    for (const a of ast.types) {
        // Contract
        if (a.kind === "contract") {
            for (const f of a.declarations) {
                if (f.kind === "field_decl") {
                    if (types
                        .get((0, ast_helpers_1.idText)(a.name))
                        .fields.find((v) => (0, ast_helpers_1.eqNames)(v.name, f.name))) {
                        (0, errors_1.throwCompilationError)(`Field ${(0, errors_1.idTextErr)(f.name)} already exists`, f.loc);
                    }
                    if (types
                        .get((0, ast_helpers_1.idText)(a.name))
                        .constants.find((v) => (0, ast_helpers_1.eqNames)(v.name, f.name))) {
                        (0, errors_1.throwCompilationError)(`Constant ${(0, ast_helpers_1.idText)(f.name)} already exists`, f.loc);
                    }
                    types
                        .get((0, ast_helpers_1.idText)(a.name))
                        .fields.push(buildFieldDescription(f, types.get((0, ast_helpers_1.idText)(a.name)).fields.length));
                }
                else if (f.kind === "constant_def") {
                    if (types
                        .get((0, ast_helpers_1.idText)(a.name))
                        .fields.find((v) => (0, ast_helpers_1.eqNames)(v.name, f.name))) {
                        (0, errors_1.throwCompilationError)(`Field ${(0, errors_1.idTextErr)(f.name)} already exists`, f.loc);
                    }
                    if (types
                        .get((0, ast_helpers_1.idText)(a.name))
                        .constants.find((v) => (0, ast_helpers_1.eqNames)(v.name, f.name))) {
                        (0, errors_1.throwCompilationError)(`Constant ${(0, errors_1.idTextErr)(f.name)} already exists`, f.loc);
                    }
                    if (f.attributes.find((v) => v.type !== "override")) {
                        (0, errors_1.throwCompilationError)(`Constant can be only overridden`, f.loc);
                    }
                    types
                        .get((0, ast_helpers_1.idText)(a.name))
                        .constants.push(buildConstantDescription(f));
                }
            }
        }
        // Struct
        if (a.kind === "struct_decl" || a.kind === "message_decl") {
            for (const f of a.fields) {
                if (types
                    .get((0, ast_helpers_1.idText)(a.name))
                    .fields.find((v) => (0, ast_helpers_1.eqNames)(v.name, f.name))) {
                    (0, errors_1.throwCompilationError)(`Field ${(0, errors_1.idTextErr)(f.name)} already exists`, f.loc);
                }
                types
                    .get((0, ast_helpers_1.idText)(a.name))
                    .fields.push(buildFieldDescription(f, types.get((0, ast_helpers_1.idText)(a.name)).fields.length));
            }
            if (a.fields.length === 0 && a.kind === "struct_decl") {
                (0, errors_1.throwCompilationError)(`Struct ${(0, errors_1.idTextErr)(a.name)} must have at least one field`, a.loc);
            }
        }
        // Trait
        if (a.kind === "trait") {
            for (const traitDecl of a.declarations) {
                if (traitDecl.kind === "field_decl") {
                    if (types
                        .get((0, ast_helpers_1.idText)(a.name))
                        .fields.find((v) => (0, ast_helpers_1.eqNames)(v.name, traitDecl.name))) {
                        (0, errors_1.throwCompilationError)(`Field ${(0, errors_1.idTextErr)(traitDecl.name)} already exists`, traitDecl.loc);
                    }
                    if (traitDecl.initializer) {
                        (0, errors_1.throwCompilationError)(`Trait field cannot have an initializer`, traitDecl.initializer.loc);
                    }
                    types
                        .get((0, ast_helpers_1.idText)(a.name))
                        .fields.push(buildFieldDescription(traitDecl, types.get((0, ast_helpers_1.idText)(a.name)).fields.length));
                }
                else if (traitDecl.kind === "constant_def" ||
                    traitDecl.kind === "constant_decl") {
                    if (types
                        .get((0, ast_helpers_1.idText)(a.name))
                        .fields.find((v) => (0, ast_helpers_1.eqNames)(v.name, traitDecl.name))) {
                        (0, errors_1.throwCompilationError)(`Field ${(0, errors_1.idTextErr)(traitDecl.name)} already exists`, traitDecl.loc);
                    }
                    if (types
                        .get((0, ast_helpers_1.idText)(a.name))
                        .constants.find((v) => (0, ast_helpers_1.eqNames)(v.name, traitDecl.name))) {
                        (0, errors_1.throwCompilationError)(`Constant ${(0, errors_1.idTextErr)(traitDecl.name)} already exists`, traitDecl.loc);
                    }
                    types
                        .get((0, ast_helpers_1.idText)(a.name))
                        .constants.push(buildConstantDescription(traitDecl));
                }
            }
        }
    }
    //
    // Populate partial serialization info
    //
    for (const t of types.values()) {
        t.partialFieldCount = resolvePartialFields(ctx, t);
    }
    //
    // Resolve contract functions
    //
    function resolveFunctionDescriptor(optSelf, a, origin) {
        let self = optSelf;
        // Resolve return
        let returns = { kind: "void" };
        if (a.return) {
            returns = buildTypeRef(a.return, types);
        }
        let params = [];
        for (const r of a.params) {
            params.push({
                name: r.name,
                type: buildTypeRef(r.type, types),
                loc: r.loc,
            });
        }
        // Resolve flags
        const isGetter = a.attributes.find((a) => a.type === "get");
        const isMutating = a.attributes.find((a) => a.type === "mutates");
        const isExtends = a.attributes.find((a) => a.type === "extends");
        const isVirtual = a.attributes.find((a) => a.type === "virtual");
        const isOverride = a.attributes.find((a) => a.type === "override");
        const isInline = a.attributes.find((a) => a.type === "inline");
        const isAbstract = a.attributes.find((a) => a.type === "abstract");
        // Check for native
        if (a.kind === "native_function_decl") {
            if (isGetter) {
                (0, errors_1.throwCompilationError)("Native functions cannot be getters", isGetter.loc);
            }
            if (self) {
                (0, errors_1.throwCompilationError)("Native functions cannot be declared within a contract", a.loc);
            }
            if (isVirtual) {
                (0, errors_1.throwCompilationError)("Native functions cannot be virtual", isVirtual.loc);
            }
            if (isOverride) {
                (0, errors_1.throwCompilationError)("Native functions cannot be overridden", isOverride.loc);
            }
        }
        // Check virtual and override
        if (isVirtual && isExtends) {
            (0, errors_1.throwCompilationError)("Extend functions cannot be virtual", isVirtual.loc);
        }
        if (isOverride && isExtends) {
            (0, errors_1.throwCompilationError)("Extend functions cannot be overridden", isOverride.loc);
        }
        if (isAbstract && isExtends) {
            (0, errors_1.throwCompilationError)("Extend functions cannot be abstract", isAbstract.loc);
        }
        if (!self && isVirtual) {
            (0, errors_1.throwCompilationError)("Virtual functions must be defined within a contract or a trait", isVirtual.loc);
        }
        if (!self && isOverride) {
            (0, errors_1.throwCompilationError)("Overrides functions must be defined within a contract or a trait", isOverride.loc);
        }
        if (!self && isAbstract) {
            (0, errors_1.throwCompilationError)("Abstract functions must be defined within a trait", isAbstract.loc);
        }
        if (isVirtual && isAbstract) {
            (0, errors_1.throwCompilationError)("Abstract functions cannot be virtual", isAbstract.loc);
        }
        if (isVirtual && isOverride) {
            (0, errors_1.throwCompilationError)("Overrides functions cannot be virtual", isOverride.loc);
        }
        if (isAbstract && isOverride) {
            (0, errors_1.throwCompilationError)("Overrides functions cannot be abstract", isOverride.loc);
        }
        // Check virtual
        if (isVirtual) {
            if (self?.kind !== "ref") {
                (0, errors_1.throwInternalCompilerError)("Virtual functions must have a self parameter", isVirtual.loc);
            }
            const t = types.get(self.name);
            if (t.kind !== "trait") {
                (0, errors_1.throwCompilationError)("Virtual functions must be defined within a trait", isVirtual.loc);
            }
        }
        // Check abstract
        if (isAbstract) {
            if (self?.kind !== "ref") {
                (0, errors_1.throwInternalCompilerError)("Abstract functions must have a self parameter", isAbstract.loc);
            }
            const t = types.get(self.name);
            if (t.kind !== "trait") {
                (0, errors_1.throwCompilationError)("Abstract functions must be defined within a trait", isAbstract.loc);
            }
        }
        if (isOverride) {
            if (self?.kind !== "ref") {
                (0, errors_1.throwInternalCompilerError)("Override functions must have a self parameter", isOverride.loc);
            }
            const t = types.get(self.name);
            if (!["contract", "trait"].includes(t.kind)) {
                (0, errors_1.throwCompilationError)("Overridden functions must be defined within a contract or a trait", isOverride.loc);
            }
        }
        // Check for common
        if (a.kind === "function_def") {
            if (isGetter && !self) {
                (0, errors_1.throwCompilationError)("Getters must be defined within a contract", isGetter.loc);
            }
        }
        // Check for getter
        if (isInline && isGetter) {
            (0, errors_1.throwCompilationError)("Getters cannot be inline", isInline.loc);
        }
        const exNames = new Set();
        // Validate mutating
        if (isExtends) {
            if (self) {
                (0, errors_1.throwCompilationError)("Extend functions cannot be defined within a contract", isExtends.loc);
            }
            if (params.length === 0) {
                (0, errors_1.throwCompilationError)('Extend functions must have at least one parameter named "self"', isExtends.loc);
            }
            const firstParam = params[0];
            if (!(0, ast_helpers_1.isSelfId)(firstParam.name)) {
                (0, errors_1.throwCompilationError)('Extend function must have first parameter named "self"', firstParam.loc);
            }
            if (firstParam.type.kind !== "ref") {
                (0, errors_1.throwCompilationError)("Extend functions must have a reference type as the first parameter", firstParam.loc);
            }
            if (!types.has(firstParam.type.name)) {
                (0, errors_1.throwCompilationError)("Type " + firstParam.type.name + " not found", firstParam.loc);
            }
            // Update self and remove first parameter
            self = firstParam.type;
            exNames.add((0, ast_helpers_1.idText)(firstParam.name));
            params = params.slice(1);
        }
        // Check for mutating and extends
        if (isMutating && !isExtends) {
            (0, errors_1.throwCompilationError)("Mutating functions must be extend functions", isMutating.loc);
        }
        const firstParam = params[0];
        if (!(0, array_1.isUndefined)(firstParam) &&
            !isExtends &&
            (0, ast_helpers_1.isSelfId)(firstParam.name)) {
            (0, errors_1.throwCompilationError)('Parameter name "self" is reserved for functions with "extends" modifier', firstParam.loc);
        }
        for (const param of params) {
            if (exNames.has((0, ast_helpers_1.idText)(param.name))) {
                (0, errors_1.throwCompilationError)(`Parameter name ${(0, errors_1.idTextErr)(param.name)} is already used`, param.loc);
            }
            if ((0, ast_helpers_1.isSelfId)(param.name)) {
                (0, errors_1.throwCompilationError)('Parameter name "self" is reserved', param.loc);
            }
            exNames.add((0, ast_helpers_1.idText)(param.name));
        }
        // Check for runtime types in getters
        if (isGetter) {
            for (const param of params) {
                if ((0, isRuntimeType_1.isRuntimeType)(param.type)) {
                    (0, errors_1.throwCompilationError)((0, types_1.printTypeRef)(param.type) +
                        " is a runtime-only type and can't be used as a getter parameter", param.loc);
                }
            }
            if ((0, isRuntimeType_1.isRuntimeType)(returns)) {
                (0, errors_1.throwCompilationError)((0, types_1.printTypeRef)(returns) +
                    " is a runtime-only type and can't be used as getter return type", a.loc);
            }
        }
        // check asm shuffle
        if (a.kind === "asm_function_def") {
            // check arguments shuffle
            if (a.shuffle.args.length !== 0) {
                const shuffleArgSet = new Set(a.shuffle.args.map((id) => (0, ast_helpers_1.idText)(id)));
                if (shuffleArgSet.size !== a.shuffle.args.length) {
                    (0, errors_1.throwCompilationError)("asm argument rearrangement cannot have duplicates", a.loc);
                }
                const paramSet = new Set(a.params.map((typedId) => (0, ast_helpers_1.idText)(typedId.name)));
                if (!(0, isSubsetOf_1.isSubsetOf)(paramSet, shuffleArgSet)) {
                    (0, errors_1.throwCompilationError)("asm argument rearrangement must mention all function parameters", a.loc);
                }
                if (!(0, isSubsetOf_1.isSubsetOf)(shuffleArgSet, paramSet)) {
                    (0, errors_1.throwCompilationError)("asm argument rearrangement must mention only function parameters", a.loc);
                }
            }
            // check return shuffle
            if (a.shuffle.ret.length !== 0) {
                const shuffleRetSet = new Set(a.shuffle.ret.map((num) => Number(num.value)));
                if (shuffleRetSet.size !== a.shuffle.ret.length) {
                    (0, errors_1.throwCompilationError)("asm return rearrangement cannot have duplicates", a.loc);
                }
                let retTupleSize = 0;
                switch (returns.kind) {
                    case "ref":
                        {
                            const ty = types.get(returns.name);
                            switch (ty.kind) {
                                case "struct":
                                case "contract":
                                    retTupleSize = ty.fields.length;
                                    break;
                                case "primitive_type_decl":
                                    retTupleSize = 1;
                                    break;
                                case "trait":
                                    (0, errors_1.throwInternalCompilerError)("A trait cannot be returned from a function", a.loc);
                            }
                        }
                        break;
                    case "null":
                    case "map":
                        retTupleSize = 1;
                        break;
                    case "ref_bounced":
                        (0, errors_1.throwInternalCompilerError)("A <bounced> type cannot be returned from a function", a.loc);
                        break;
                    case "void":
                        retTupleSize = 0;
                        break;
                }
                // mutating functions also return `self` arg (implicitly in Tact, but explicitly in FunC)
                retTupleSize += isMutating ? 1 : 0;
                const returnValueSet = new Set([...Array(retTupleSize).keys()]);
                if (!(0, isSubsetOf_1.isSubsetOf)(returnValueSet, shuffleRetSet)) {
                    (0, errors_1.throwCompilationError)(`asm return rearrangement must mention all return position numbers: [0..${retTupleSize - 1}]`, a.loc);
                }
                if (!(0, isSubsetOf_1.isSubsetOf)(shuffleRetSet, returnValueSet)) {
                    (0, errors_1.throwCompilationError)(`asm return rearrangement must mention only valid return position numbers: [0..${retTupleSize - 1}]`, a.loc);
                }
            }
        }
        // Register function
        return {
            name: (0, ast_helpers_1.idText)(a.name),
            self: self,
            origin,
            params,
            returns,
            ast: a,
            isMutating: !!isMutating || !!optSelf /* && !isGetter */, // Mark all contract functions as mutating
            isGetter: !!isGetter,
            isVirtual: !!isVirtual,
            isOverride: !!isOverride,
            isInline: !!isInline,
            isAbstract: !!isAbstract,
            methodId: null,
        };
    }
    function resolveInitFunction(ast) {
        const params = [];
        for (const r of ast.params) {
            params.push({
                name: r.name,
                type: buildTypeRef(r.type, types),
                as: null,
                loc: r.loc,
            });
        }
        // Check if runtime types are used
        for (const a of params) {
            if ((0, isRuntimeType_1.isRuntimeType)(a.type)) {
                (0, errors_1.throwCompilationError)((0, types_1.printTypeRef)(a.type) +
                    " is a runtime-only type and can't be used as a init function parameter", a.loc);
            }
        }
        function checkNode(node) {
            if (node.kind === "field_access" || node.kind === "method_call") {
                // we don't need to check `self.a` or `self.foo()`
                return false;
            }
            if (node.kind === "statement_assign" ||
                node.kind === "statement_augmentedassign") {
                const left = node.path;
                if (left.kind === "id" && left.text === "self") {
                    (0, errors_1.throwCompilationError)("cannot reassign `self` in `init` function", left.loc);
                }
                (0, iterators_1.traverseAndCheck)(node.expression, checkNode);
                // don't walk to left side of assignment
                return false;
            }
            if (node.kind === "id" && node.text === "self") {
                (0, errors_1.throwCompilationError)("cannot read whole `self` in `init` function", node.loc);
            }
            return true;
        }
        ast.statements.forEach((stmt) => {
            (0, iterators_1.traverseAndCheck)(stmt, checkNode);
        });
        return {
            params,
            ast,
        };
    }
    for (const a of ast.types) {
        if (a.kind === "contract" || a.kind === "trait") {
            const s = types.get((0, ast_helpers_1.idText)(a.name));
            for (const d of a.declarations) {
                if (d.kind === "function_def" ||
                    d.kind === "function_decl" ||
                    d.kind === "asm_function_def") {
                    const f = resolveFunctionDescriptor({
                        kind: "ref",
                        name: s.name,
                        optional: false,
                    }, d, s.origin);
                    if (f.self?.kind !== "ref" || f.self.name !== s.name) {
                        (0, errors_1.throwInternalCompilerError)(`Function self must be ${s.name}`); // Impossible
                    }
                    if (s.functions.has(f.name)) {
                        (0, errors_1.throwCompilationError)(`Function "${f.name}" already exists in type "${s.name}"`, s.ast.loc);
                    }
                    s.functions.set(f.name, f);
                }
                if (d.kind === "contract_init") {
                    if (s.init) {
                        (0, errors_1.throwCompilationError)("Init function already exists", d.loc);
                    }
                    s.init = resolveInitFunction(d);
                }
                if (d.kind === "receiver") {
                    // Check if externals are enabled
                    if (d.selector.kind.startsWith("external-") &&
                        !(0, features_1.enabledExternals)(ctx)) {
                        (0, errors_1.throwCompilationError)("External functions are not enabled", d.loc);
                    }
                    switch (d.selector.kind) {
                        case "internal":
                        case "external": {
                            const internal = d.selector.kind === "internal";
                            const { subKind } = d.selector;
                            switch (subKind.kind) {
                                case "simple": {
                                    const param = subKind.param;
                                    if (param.type.kind !== "type_id") {
                                        (0, errors_1.throwCompilationError)("Receive function can only accept non-optional message types", d.loc);
                                    }
                                    const t = types.get((0, ast_helpers_1.idText)(param.type));
                                    if (!t) {
                                        (0, errors_1.throwCompilationError)(`Type ${(0, errors_1.idTextErr)(param.type)} not found`, d.loc);
                                    }
                                    // Raw receiver
                                    if (t.kind === "primitive_type_decl") {
                                        if (t.name === "Slice") {
                                            // Check for existing receiver
                                            if (s.receivers.find((v) => v.selector.kind ===
                                                (internal
                                                    ? "internal-fallback"
                                                    : "external-fallback"))) {
                                                (0, errors_1.throwCompilationError)(`Fallback receive function already exists`, d.loc);
                                            }
                                            // Persist receiver
                                            s.receivers.push({
                                                selector: {
                                                    kind: internal
                                                        ? "internal-fallback"
                                                        : "external-fallback",
                                                    name: param.name,
                                                },
                                                ast: d,
                                            });
                                        }
                                        else if (t.name === "String") {
                                            // Check for existing receiver
                                            if (s.receivers.find((v) => v.selector.kind ===
                                                (internal
                                                    ? "internal-comment-fallback"
                                                    : "external-comment-fallback"))) {
                                                (0, errors_1.throwCompilationError)("Comment fallback receive function already exists", d.loc);
                                            }
                                            // Persist receiver
                                            s.receivers.push({
                                                selector: {
                                                    kind: internal
                                                        ? "internal-comment-fallback"
                                                        : "external-comment-fallback",
                                                    name: param.name,
                                                },
                                                ast: d,
                                            });
                                        }
                                        else {
                                            (0, errors_1.throwCompilationError)("Receive function can only accept message, Slice or String", d.loc);
                                        }
                                    }
                                    else {
                                        // Check type
                                        if (t.kind !== "struct") {
                                            (0, errors_1.throwCompilationError)("Receive function can only accept message", d.loc);
                                        }
                                        if (t.ast.kind !== "message_decl") {
                                            (0, errors_1.throwCompilationError)("Receive function can only accept message", d.loc);
                                        }
                                        // Check for duplicate
                                        const n = (0, ast_helpers_1.idText)(param.type);
                                        if (s.receivers.find((v) => v.selector.kind ===
                                            (internal
                                                ? "internal-binary"
                                                : "external-binary") &&
                                            (0, ast_helpers_1.eqNames)(v.selector.type, n))) {
                                            (0, errors_1.throwCompilationError)(`Receive function for ${(0, errors_1.idTextErr)(param.type)} already exists`, param.loc);
                                        }
                                        // Persist receiver
                                        s.receivers.push({
                                            selector: {
                                                kind: internal
                                                    ? "internal-binary"
                                                    : "external-binary",
                                                name: param.name,
                                                type: (0, ast_helpers_1.idText)(param.type),
                                            },
                                            ast: d,
                                        });
                                    }
                                    break;
                                }
                                case "comment": {
                                    if (subKind.comment.value === "") {
                                        (0, errors_1.throwCompilationError)("To use empty comment receiver, just remove parameter instead of passing empty string", d.loc);
                                    }
                                    const c = subKind.comment.value;
                                    if (s.receivers.find((v) => v.selector.kind ===
                                        (internal
                                            ? "internal-comment"
                                            : "external-comment") &&
                                        v.selector.comment === c)) {
                                        (0, errors_1.throwCompilationError)(`Receive function for ${(0, errors_1.idTextErr)(c)} already exists`, d.loc);
                                    }
                                    s.receivers.push({
                                        selector: {
                                            kind: internal
                                                ? "internal-comment"
                                                : "external-comment",
                                            comment: c,
                                        },
                                        ast: d,
                                    });
                                    break;
                                }
                                case "fallback": {
                                    // Handle empty
                                    if (s.receivers.find((v) => v.selector.kind ===
                                        (internal
                                            ? "internal-empty"
                                            : "external-empty"))) {
                                        (0, errors_1.throwCompilationError)("Empty receive function already exists", d.loc);
                                    }
                                    s.receivers.push({
                                        selector: {
                                            kind: internal
                                                ? "internal-empty"
                                                : "external-empty",
                                        },
                                        ast: d,
                                    });
                                    break;
                                }
                            }
                            break;
                        }
                        case "bounce": {
                            const param = d.selector.param;
                            if (param.type.kind === "type_id") {
                                if ((0, ast_helpers_1.isSlice)(param.type)) {
                                    if (s.receivers.find((v) => v.selector.kind ===
                                        "bounce-fallback")) {
                                        (0, errors_1.throwCompilationError)(`Fallback bounce receive function already exists`, d.loc);
                                    }
                                    s.receivers.push({
                                        selector: {
                                            kind: "bounce-fallback",
                                            name: param.name,
                                        },
                                        ast: d,
                                    });
                                }
                                else {
                                    const type = types.get((0, ast_helpers_1.idText)(param.type));
                                    if (type === undefined) {
                                        (0, errors_1.throwCompilationError)(`Unknown bounced receiver parameter type: ${(0, errors_1.idTextErr)(param.type)}`, param.type.loc);
                                    }
                                    if (type.ast.kind !== "message_decl") {
                                        (0, errors_1.throwCompilationError)("Bounce receive function can only accept bounced message, message or Slice", d.loc);
                                    }
                                    if (type.fields.length !==
                                        type.partialFieldCount) {
                                        (0, errors_1.throwCompilationError)(`This message is too big for bounce receiver, you need to wrap it to a bounced<${(0, errors_1.idTextErr)(param.type)}>.`, d.loc);
                                    }
                                    if (s.receivers.find((v) => v.selector.kind ===
                                        "bounce-binary" &&
                                        v.selector.type === type.name)) {
                                        (0, errors_1.throwCompilationError)(`Bounce receive function for ${(0, errors_1.idTextErr)(param.type)} already exists`, param.loc);
                                    }
                                    s.receivers.push({
                                        selector: {
                                            kind: "bounce-binary",
                                            name: param.name,
                                            type: (0, ast_helpers_1.idText)(param.type),
                                            bounced: false,
                                        },
                                        ast: d,
                                    });
                                }
                            }
                            else if (param.type.kind === "optional_type") {
                                (0, errors_1.throwCompilationError)("Bounce receive function cannot have optional parameter", d.loc);
                            }
                            else if (param.type.kind === "bounced_message_type") {
                                const t = types.get((0, ast_helpers_1.idText)(param.type.messageType));
                                if (t === undefined) {
                                    (0, errors_1.throwCompilationError)(`Unknown bounced receiver parameter type: ${(0, errors_1.idTextErr)(param.type.messageType)}`, param.type.loc);
                                }
                                if (t.kind !== "struct") {
                                    (0, errors_1.throwCompilationError)("Bounce receive function can only accept bounced<T> struct types", d.loc);
                                }
                                if (t.ast.kind !== "message_decl") {
                                    (0, errors_1.throwCompilationError)("Bounce receive function can only accept bounced<T> message types", d.loc);
                                }
                                if (s.receivers.find((v) => v.selector.kind ===
                                    "bounce-binary" &&
                                    v.selector.type === t.name)) {
                                    (0, errors_1.throwCompilationError)(`Bounce receive function for ${(0, errors_1.idTextErr)(t.name)} already exists`, d.loc);
                                }
                                if (t.fields.length === t.partialFieldCount) {
                                    (0, errors_1.throwCompilationError)("This message is small enough for bounce receiver, you need to remove bounced modifier.", d.loc);
                                }
                                s.receivers.push({
                                    selector: {
                                        kind: "bounce-binary",
                                        name: param.name,
                                        type: (0, ast_helpers_1.idText)(param.type.messageType),
                                        bounced: true,
                                    },
                                    ast: d,
                                });
                            }
                            else {
                                (0, errors_1.throwCompilationError)("Bounce receive function can only accept bounced<T> struct parameters or Slice", d.loc);
                            }
                        }
                    }
                }
            }
        }
    }
    //
    // Check for missing init methods
    //
    for (const t of types.values()) {
        if (t.kind === "contract") {
            if (!t.init) {
                t.init = {
                    params: [],
                    ast: Ast.createNode({
                        kind: "contract_init",
                        params: [],
                        statements: [],
                        loc: t.ast.loc,
                    }),
                };
            }
        }
    }
    //
    // Flatten and resolve traits
    //
    for (const t of types.values()) {
        if (t.ast.kind === "trait" || t.ast.kind === "contract") {
            // Check there are no duplicates in the _immediately_ inherited traits
            const traitSet = new Set(t.ast.traits.map(ast_helpers_1.idText));
            if (traitSet.size !== t.ast.traits.length) {
                const aggregateType = t.ast.kind === "contract" ? "contract" : "trait";
                (0, errors_1.throwCompilationError)(`The list of inherited traits for ${aggregateType} "${t.name}" has duplicates`, t.ast.loc);
            }
            // Flatten traits
            const traits = [];
            const visited = new Set();
            visited.add(t.name);
            // eslint-disable-next-line no-inner-declarations
            function visit(name) {
                if (visited.has(name)) {
                    return;
                }
                const tt = types.get(name);
                if (!tt) {
                    (0, errors_1.throwCompilationError)("Trait " + name + " not found", t.ast.loc);
                }
                visited.add(name);
                traits.push(tt);
                if (tt.ast.kind === "trait") {
                    for (const s of tt.ast.traits) {
                        visit((0, ast_helpers_1.idText)(s));
                    }
                    for (const f of tt.traits) {
                        visit(f.name);
                    }
                }
                else {
                    (0, errors_1.throwCompilationError)("Type " + name + " is not a trait", t.ast.loc);
                }
            }
            // implicitly inherit from BaseTrait only in contracts
            if (t.ast.kind === "contract") {
                visit("BaseTrait");
            }
            for (const s of t.ast.traits) {
                visit((0, ast_helpers_1.idText)(s));
            }
            // Assign traits
            t.traits = traits;
        }
    }
    //
    // Verify trait fields
    //
    function printFieldTypeRefWithAs(ex) {
        return (0, types_1.printTypeRef)(ex.type) + (ex.as !== null ? ` as ${ex.as}` : "");
    }
    for (const t of types.values()) {
        for (const tr of t.traits) {
            // Check that trait is valid
            if (!types.has(tr.name)) {
                (0, errors_1.throwCompilationError)("Trait " + tr.name + " not found", t.ast.loc);
            }
            if (types.get(tr.name).kind !== "trait") {
                (0, errors_1.throwCompilationError)("Type " + tr.name + " is not a trait", t.ast.loc);
            }
            // Check that trait has all required fields
            const ttr = types.get(tr.name);
            for (const f of ttr.fields) {
                // Check if field exists
                const ex = t.fields.find((v) => v.name === f.name);
                if (!ex) {
                    (0, errors_1.throwCompilationError)(`Trait "${tr.name}" requires field "${f.name}"`, t.ast.loc);
                }
                // Check type
                if (!(0, types_1.typeRefEquals)(f.type, ex.type)) {
                    (0, errors_1.throwCompilationError)(`Trait "${tr.name}" requires field "${f.name}" of type "${(0, types_1.printTypeRef)(f.type)}"`, t.ast.loc);
                }
                else if (f.as !== ex.as &&
                    !((f.as === "int257" && ex.as === null) ||
                        (f.as === null && ex.as === "int257"))) {
                    const expected = printFieldTypeRefWithAs(f);
                    const actual = printFieldTypeRefWithAs(ex);
                    (0, errors_1.throwCompilationError)(`Trait "${tr.name}" requires field "${f.name}" of type "${expected}", but "${actual}" given`, ex.ast.loc);
                }
            }
        }
    }
    //
    // Copy Trait functions and constants
    //
    function copyTraits(contractOrTrait) {
        const inheritOnlyBaseTrait = contractOrTrait.traits.length === 1;
        // Check that "override" functions have a super function
        for (const funInContractOrTrait of contractOrTrait.functions.values()) {
            if (!funInContractOrTrait.isOverride) {
                continue;
            }
            const foundOverriddenFunction = contractOrTrait.traits.some((t) => t.functions.has(funInContractOrTrait.name));
            if (!foundOverriddenFunction) {
                const msg = contractOrTrait.traits.length === 0 || inheritOnlyBaseTrait
                    ? `Function "${funInContractOrTrait.name}" overrides nothing, remove "override" modifier or inherit any traits with this function`
                    : `Function "${funInContractOrTrait.name}" overrides nothing, remove "override" modifier`;
                (0, errors_1.throwCompilationError)(msg, funInContractOrTrait.ast.loc);
            }
        }
        // Check that "override" constants have a super constant
        for (const constantInContractOrTrait of contractOrTrait.constants.values()) {
            const isOverride = constantInContractOrTrait.ast.attributes.find((a) => a.type === "override");
            if (!isOverride) {
                continue;
            }
            const foundOverriddenConstant = contractOrTrait.traits.some((t) => t.constants.some((c) => c.name === constantInContractOrTrait.name));
            if (!foundOverriddenConstant) {
                const msg = contractOrTrait.traits.length === 0 || inheritOnlyBaseTrait
                    ? `Constant "${constantInContractOrTrait.name}" overrides nothing, remove "override" modifier or inherit any traits with this constant`
                    : `Constant "${constantInContractOrTrait.name}" overrides nothing, remove "override" modifier`;
                (0, errors_1.throwCompilationError)(msg, constantInContractOrTrait.ast.loc);
            }
        }
        for (const inheritedTrait of contractOrTrait.traits) {
            // Copy functions
            for (const traitFunction of inheritedTrait.functions.values()) {
                const funInContractOrTrait = contractOrTrait.functions.get(traitFunction.name);
                if (!funInContractOrTrait && traitFunction.isAbstract) {
                    (0, errors_1.throwCompilationError)(`Trait "${inheritedTrait.name}" requires function "${traitFunction.name}"`, contractOrTrait.ast.loc);
                }
                if (funInContractOrTrait?.isOverride) {
                    if (traitFunction.isGetter &&
                        !funInContractOrTrait.isGetter) {
                        (0, errors_1.throwCompilationError)(`Overridden function "${traitFunction.name}" must be a getter`, funInContractOrTrait.ast.loc);
                    }
                    if (traitFunction.isMutating !==
                        funInContractOrTrait.isMutating) {
                        (0, errors_1.throwCompilationError)(`Overridden function "${traitFunction.name}" should have same mutability`, funInContractOrTrait.ast.loc);
                    }
                    if (!(0, types_1.typeRefEquals)(traitFunction.returns, funInContractOrTrait.returns)) {
                        (0, errors_1.throwCompilationError)(`Overridden function "${traitFunction.name}" should have same return type`, funInContractOrTrait.ast.loc);
                    }
                    if (traitFunction.params.length !==
                        funInContractOrTrait.params.length) {
                        (0, errors_1.throwCompilationError)(`Overridden function "${traitFunction.name}" should have same number of parameters`, funInContractOrTrait.ast.loc);
                    }
                    for (let i = 0; i < traitFunction.params.length; i++) {
                        const a = funInContractOrTrait.params[i];
                        const b = traitFunction.params[i];
                        if (!(0, types_1.typeRefEquals)(a.type, b.type)) {
                            (0, errors_1.throwCompilationError)(`Overridden function "${traitFunction.name}" should have same parameter types`, funInContractOrTrait.ast.loc);
                        }
                    }
                    continue; // Ignore overridden functions
                }
                // Check duplicates
                if (funInContractOrTrait) {
                    if (traitFunction.isVirtual) {
                        (0, errors_1.throwCompilationError)(`Function "${traitFunction.name}" is defined as virtual in trait "${inheritedTrait.name}": you are probably missing "override" keyword`, funInContractOrTrait.ast.loc);
                    }
                    if (traitFunction.ast.attributes.find((v) => v.type === "override") === undefined) {
                        (0, errors_1.throwCompilationError)(`Function "${traitFunction.name}" is already defined in trait "${inheritedTrait.name}"`, funInContractOrTrait.ast.loc);
                    }
                }
                // Register function
                contractOrTrait.functions.set(traitFunction.name, {
                    ...traitFunction,
                    self: {
                        kind: "ref",
                        name: contractOrTrait.name,
                        optional: false,
                    },
                    ast: (0, clone_1.cloneNode)(traitFunction.ast, Ast),
                });
            }
            // Copy constants
            for (const traitConstant of inheritedTrait.constants) {
                const constInContractOrTrait = contractOrTrait.constants.find((v) => v.name === traitConstant.name);
                if (!constInContractOrTrait &&
                    traitConstant.ast.attributes.find((v) => v.type === "abstract")) {
                    (0, errors_1.throwCompilationError)(`Trait "${inheritedTrait.name}" requires constant "${traitConstant.name}"`, contractOrTrait.ast.loc);
                }
                if (constInContractOrTrait?.ast.attributes.find((v) => v.type === "override")) {
                    if (!(0, types_1.typeRefEquals)(traitConstant.type, constInContractOrTrait.type)) {
                        (0, errors_1.throwCompilationError)(`Overridden constant "${traitConstant.name}" should have same type`, constInContractOrTrait.ast.loc);
                    }
                    continue;
                }
                // Check duplicates
                if (constInContractOrTrait) {
                    if (traitConstant.ast.attributes.find((v) => v.type === "virtual")) {
                        (0, errors_1.throwCompilationError)(`Constant "${traitConstant.name}" is defined as virtual in trait "${inheritedTrait.name}": you are probably missing "override" keyword`, constInContractOrTrait.ast.loc);
                    }
                    if (traitConstant.ast.attributes.find((v) => v.type === "override") === undefined) {
                        (0, errors_1.throwCompilationError)(`Constant "${traitConstant.name}" is already defined in trait "${inheritedTrait.name}"`, constInContractOrTrait.ast.loc);
                    }
                }
                const contractField = contractOrTrait.fields.find((v) => v.name === traitConstant.name);
                if (contractField) {
                    // a trait constant has the same name as a contract field
                    (0, errors_1.throwCompilationError)(`Contract ${contractOrTrait.name} inherits constant "${traitConstant.name}" from its traits and hence cannot have a storage variable with the same name`, contractField.loc);
                }
                if (traitConstant.ast.attributes.find((v) => v.type === "override")) {
                    // remove overridden constant
                    contractOrTrait.constants =
                        contractOrTrait.constants.filter((c) => c.name !== traitConstant.name);
                }
                // Register constant
                contractOrTrait.constants.push({
                    ...traitConstant,
                    ast: (0, clone_1.cloneNode)(traitConstant.ast, Ast),
                });
            }
            // Copy receivers
            for (const f of inheritedTrait.receivers) {
                // eslint-disable-next-line no-inner-declarations
                function sameReceiver(a, b) {
                    if (a.kind === "internal-comment" &&
                        b.kind === "internal-comment") {
                        return a.comment === b.comment;
                    }
                    if (a.kind === "internal-binary" &&
                        b.kind === "internal-binary") {
                        return a.type === b.type;
                    }
                    if (a.kind === "bounce-fallback" &&
                        b.kind === "bounce-fallback") {
                        return true; // Could be only one
                    }
                    if (a.kind === "bounce-binary" &&
                        b.kind === "bounce-binary") {
                        return a.type === b.type;
                    }
                    if (a.kind === "internal-empty" &&
                        b.kind === "internal-empty") {
                        return true;
                    }
                    if (a.kind === "internal-fallback" &&
                        b.kind === "internal-fallback") {
                        return true;
                    }
                    if (a.kind === "internal-comment-fallback" &&
                        b.kind === "internal-comment-fallback") {
                        return true;
                    }
                    return false;
                }
                if (contractOrTrait.receivers.find((v) => sameReceiver(v.selector, f.selector))) {
                    (0, errors_1.throwCompilationError)(`Receive function for ${(0, errors_1.idTextErr)((0, types_1.receiverSelectorName)(f.selector))} already exists`, contractOrTrait.ast.loc);
                }
                contractOrTrait.receivers.push({
                    selector: f.selector,
                    ast: (0, clone_1.cloneNode)(f.ast, Ast),
                });
            }
            // Copy interfaces
            for (const i of inheritedTrait.interfaces) {
                if (!contractOrTrait.interfaces.find((v) => v === i)) {
                    contractOrTrait.interfaces.push(i);
                }
            }
        }
    }
    // Copy to non-traits to avoid duplicates
    const processed = new Set();
    const processing = new Set();
    function processType(name) {
        // Check if processed
        if (processed.has(name)) {
            return;
        }
        if (processing.has(name)) {
            (0, errors_1.throwCompilationError)(`Circular dependency detected for type "${name}"`, types.get(name).ast.loc);
        }
        processing.add(name);
        // Process dependencies first
        const dependencies = Array.from(types.values()).filter((v) => v.traits.find((v2) => v2.name === name));
        for (const d of dependencies) {
            processType(d.name);
        }
        // Copy traits
        copyTraits(types.get(name));
        // Mark as processed
        processed.add(name);
        processing.delete(name);
    }
    for (const k of types.keys()) {
        processType(k);
    }
    //
    // Register dependencies
    //
    for (const [k, t] of types) {
        const dependsOn = new Set();
        const handler = (src) => {
            if (src.kind === "init_of" || src.kind === "code_of") {
                if (!types.has((0, ast_helpers_1.idText)(src.contract))) {
                    (0, errors_1.throwCompilationError)(`Type ${(0, errors_1.idTextErr)(src.contract)} not found`, src.loc);
                }
                dependsOn.add((0, ast_helpers_1.idText)(src.contract));
            }
        };
        // Traverse functions
        for (const f of t.functions.values()) {
            (0, iterators_1.traverse)(f.ast, handler);
        }
        for (const f of t.receivers) {
            (0, iterators_1.traverse)(f.ast, handler);
        }
        if (t.init)
            (0, iterators_1.traverse)(t.init.ast, handler);
        // Add dependencies
        for (const s of dependsOn) {
            if (s !== k) {
                t.dependsOn.push(types.get(s));
            }
        }
    }
    //
    // Register transient dependencies
    //
    function collectTransient(name, to) {
        const t = types.get(name);
        for (const d of t.dependsOn) {
            if (to.has(d.name)) {
                continue;
            }
            to.add(d.name);
            collectTransient(d.name, to);
        }
    }
    for (const k of types.keys()) {
        const dependsOn = new Set();
        dependsOn.add(k);
        collectTransient(k, dependsOn);
        for (const s of dependsOn) {
            if (s !== k && !types.get(k).dependsOn.find((v) => v.name === s)) {
                types.get(k).dependsOn.push(types.get(s));
            }
        }
    }
    //
    // Resolve static functions
    //
    for (const a of ast.functions) {
        const r = resolveFunctionDescriptor(null, a, a.loc.origin);
        if (r.self) {
            if (r.self.kind !== "ref") {
                (0, errors_1.throwCompilationError)(`Wrong self type "${r.name}" for static function`, r.ast.loc);
            }
            if (types.get(r.self.name).functions.has(r.name)) {
                (0, errors_1.throwCompilationError)(`Function "${r.name}" already exists in type "${r.self.name}"`, r.ast.loc);
            }
            types.get(r.self.name).functions.set(r.name, r);
        }
        else {
            if (staticFunctions.has(r.name) || global_1.GlobalFunctions.has(r.name)) {
                (0, errors_1.throwCompilationError)(`Static function "${r.name}" already exists`, r.ast.loc);
            }
            if (staticConstants.has(r.name)) {
                (0, errors_1.throwCompilationError)(`Static constant "${r.name}" already exists`, a.loc);
            }
            staticFunctions.set(r.name, r);
        }
    }
    //
    // Resolve static constants
    //
    for (const a of ast.constants) {
        if (staticConstants.has((0, ast_helpers_1.idText)(a.name))) {
            (0, errors_1.throwCompilationError)(`Static constant ${(0, errors_1.idTextErr)(a.name)} already exists`, a.loc);
        }
        if (staticFunctions.has((0, ast_helpers_1.idText)(a.name)) ||
            global_1.GlobalFunctions.has((0, ast_helpers_1.idText)(a.name))) {
            (0, errors_1.throwCompilationError)(`Static function ${(0, errors_1.idTextErr)(a.name)} already exists`, a.loc);
        }
        staticConstants.set((0, ast_helpers_1.idText)(a.name), buildConstantDescription(a));
    }
    //
    // Register types and functions in context
    //
    for (const [k, t] of types) {
        ctx = store.set(ctx, k, t);
    }
    for (const [k, t] of staticFunctions) {
        ctx = staticFunctionsStore.set(ctx, k, t);
    }
    for (const [k, t] of staticConstants) {
        ctx = staticConstantsStore.set(ctx, k, t);
    }
    // A pass that initializes constants and default field values
    ctx = initializeConstantsAndDefaultContractAndStructFields(ctx, util);
    // detect self-referencing or mutually-recursive types
    checkRecursiveTypes(ctx);
    return ctx;
}
function getType(ctx, ident) {
    const name = typeof ident === "string" ? ident : (0, ast_helpers_1.idText)(ident);
    const r = store.get(ctx, name);
    if (!r) {
        (0, errors_1.throwInternalCompilerError)(`Type ${name} not found`);
    }
    return r;
}
function getTypeStore(ctx) {
    return store.all(ctx);
}
function getAllTypes(ctx) {
    return Array.from(getTypeStore(ctx).values());
}
function getContracts(ctx) {
    return getAllTypes(ctx)
        .filter((v) => v.kind === "contract")
        .map((v) => v.name);
}
function getStaticFunction(ctx, name) {
    const r = staticFunctionsStore.get(ctx, name);
    if (!r) {
        (0, errors_1.throwInternalCompilerError)(`Static function ${name} not found`);
    }
    return r;
}
function hasStaticFunction(ctx, name) {
    return !!staticFunctionsStore.get(ctx, name);
}
function getStaticConstant(ctx, name) {
    const r = staticConstantsStore.get(ctx, name);
    if (!r) {
        (0, errors_1.throwInternalCompilerError)(`Static constant ${name} not found`);
    }
    return r;
}
function hasStaticConstant(ctx, name) {
    return !!staticConstantsStore.get(ctx, name);
}
function getStaticFunctionStore(ctx) {
    return staticFunctionsStore.all(ctx);
}
function getAllStaticFunctions(ctx) {
    return Array.from(getStaticFunctionStore(ctx).values());
}
function getStaticConstantStore(ctx) {
    return staticConstantsStore.all(ctx);
}
function getAllStaticConstants(ctx) {
    return Array.from(getStaticConstantStore(ctx).values());
}
function resolvePartialFields(ctx, type) {
    if (type.kind !== "struct")
        return 0;
    let partialFieldsCount = 0;
    let remainingBits = 224;
    for (const f of type.fields) {
        // dicts are unsupported
        if (f.abi.type.kind !== "simple")
            break;
        let fieldBits = f.abi.type.optional ? 1 : 0;
        // TODO handle fixed-bytes
        if (Number.isInteger(f.abi.type.format)) {
            fieldBits += f.abi.type.format;
        }
        else if (f.abi.type.format === "coins") {
            fieldBits += 124;
        }
        else if (f.abi.type.type === "address") {
            fieldBits += 267;
        }
        else if (f.abi.type.type === "bool") {
            fieldBits += 1;
        }
        else {
            // Unsupported - all others (slice, builder, nested structs, maps)
            break;
        }
        if (remainingBits - fieldBits >= 0) {
            remainingBits -= fieldBits;
            partialFieldsCount++;
        }
        else {
            break;
        }
    }
    return partialFieldsCount;
}
function checkInitializerType(name, kind, declTy, initializer, ctx, selfTypeRef) {
    let stmtCtx = (0, resolveStatements_1.emptyContext)(initializer.loc, null, declTy);
    if (selfTypeRef) {
        stmtCtx = (0, resolveStatements_1.addVariable)(ast_helpers_1.selfId, selfTypeRef, ctx, stmtCtx);
    }
    ctx = (0, resolveExpression_1.resolveExpression)(initializer, stmtCtx, ctx);
    const initTy = (0, resolveExpression_1.getExpType)(ctx, initializer);
    if (!(0, subtyping_1.isAssignable)(initTy, declTy)) {
        (0, errors_1.throwCompilationError)(`${kind} ${(0, errors_1.idTextErr)(name)} has declared type "${(0, types_1.printTypeRef)(declTy)}", but its initializer has incompatible type "${(0, types_1.printTypeRef)(initTy)}"`, initializer.loc);
    }
    return ctx;
}
function initializeConstants(constants, ctx, util) {
    for (const constant of constants) {
        if (constant.ast.kind === "constant_def") {
            constant.value ??= (0, constEval_1.evalConstantExpression)(constant.ast.initializer, ctx, util);
        }
    }
    return ctx;
}
function checkConstants(constants, ctx, typeRef) {
    for (const constant of constants) {
        if (constant.ast.kind === "constant_def") {
            ctx = checkInitializerType(constant.name, "Constant", constant.type, constant.ast.initializer, ctx, typeRef);
        }
    }
    return ctx;
}
function initializeConstantsAndDefaultContractAndStructFields(ctx, util) {
    const staticConstants = getAllStaticConstants(ctx);
    // we split the handling of constants into two steps:
    // first we check all constants to make sure the types of initializers are correct
    ctx = checkConstants(staticConstants, ctx, undefined);
    for (const aggregateTy of getAllTypes(ctx)) {
        switch (aggregateTy.kind) {
            case "primitive_type_decl":
                break;
            case "trait":
            case "contract":
            case "struct": {
                {
                    const selfTypeRef = {
                        kind: "ref",
                        name: aggregateTy.name,
                        optional: false,
                    };
                    ctx = checkConstants(aggregateTy.constants, ctx, selfTypeRef);
                    for (const field of aggregateTy.fields) {
                        if (field.ast.initializer !== null) {
                            ctx = checkInitializerType(field.name, "Struct field", field.type, field.ast.initializer, ctx, selfTypeRef);
                            field.default = (0, constEval_1.evalConstantExpression)(field.ast.initializer, ctx, util);
                        }
                        else {
                            // if a field has optional type and it is missing an explicit initializer
                            // we consider it to be initialized with the null value
                            field.default =
                                field.type.kind === "ref" && field.type.optional
                                    ? util.makeNullLiteral(field.ast.loc)
                                    : undefined;
                        }
                    }
                    // here we actually initialize constants
                    // see more detail below
                    ctx = initializeConstants(aggregateTy.constants, ctx, util);
                }
                break;
            }
        }
    }
    // and here we initialize all uninitialized constants,
    // the constant may already be initialized since we call initialization recursively
    // if one constant depends on another
    ctx = initializeConstants(staticConstants, ctx, util);
    return ctx;
}
function checkRecursiveTypes(ctx) {
    // the implementation is basically Tarjan's algorithm,
    // which removes trivial SCCs, i.e. nodes (structs) that do not refer to themselves
    // and terminates early if a non-trivial SCC is detected
    // https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm
    const structs = getAllTypes(ctx).filter((aggregate) => aggregate.kind === "struct");
    let index = 0;
    const stack = [];
    // `string` here means "struct name"
    const indices = new Map();
    const lowLinks = new Map();
    const onStack = new Set();
    const selfReferencingVertices = new Set();
    for (const struct of structs) {
        if (!indices.has(struct.name)) {
            const cycle = strongConnect(struct);
            if (cycle.length === 1) {
                const tyId = cycle[0];
                (0, errors_1.throwCompilationError)(`Self-referencing types are not supported: type ${(0, errors_1.idTextErr)(tyId)} refers to itself in its definition`, tyId.loc);
            }
            else if (cycle.length > 1) {
                const tyIds = cycle.map((tyId) => (0, errors_1.idTextErr)(tyId)).join(", ");
                (0, errors_1.throwCompilationError)(`Mutually recursive types are not supported: types ${tyIds} form a cycle`, cycle[0].loc);
            }
        }
    }
    function strongConnect(struct) {
        // Set the depth index for v to the smallest unused index
        indices.set(struct.name, index);
        lowLinks.set(struct.name, index);
        index += 1;
        stack.push(struct.ast.name);
        onStack.add(struct.name);
        const processPossibleSuccessor = (successorName) => {
            const fieldTy = getType(ctx, successorName);
            if (fieldTy.name === struct.name) {
                selfReferencingVertices.add(struct.name);
            }
            if (fieldTy.kind === "struct") {
                // successor
                if (!indices.has(fieldTy.name)) {
                    strongConnect(fieldTy);
                    lowLinks.set(struct.name, Math.min(lowLinks.get(struct.name), lowLinks.get(fieldTy.name)));
                }
                else if (onStack.has(fieldTy.name)) {
                    lowLinks.set(struct.name, Math.min(lowLinks.get(struct.name), indices.get(fieldTy.name)));
                }
            }
        };
        // process the successors of the current node
        for (const field of struct.fields) {
            switch (field.type.kind) {
                case "ref":
                case "ref_bounced":
                    processPossibleSuccessor(field.type.name);
                    break;
                case "map":
                    processPossibleSuccessor(field.type.value);
                    break;
                // do nothing
                case "void":
                case "null":
                    break;
            }
        }
        if (lowLinks.get(struct.name) === indices.get(struct.name)) {
            const cycle = [];
            let e = "";
            do {
                const last = stack.pop();
                e = (0, ast_helpers_1.idText)(last);
                onStack.delete(e);
                cycle.push(last);
            } while (e !== struct.name);
            if (cycle.length > 1) {
                return cycle.reverse();
            }
            else if (cycle.length === 1) {
                if (selfReferencingVertices.has(struct.name)) {
                    // filter out trivial SCCs
                    return cycle;
                }
            }
        }
        return [];
    }
}
