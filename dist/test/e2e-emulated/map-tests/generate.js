"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tact_1 = require("../../../cli/tact");
const map_properties_key_value_types_1 = require("./map-properties-key-value-types");
const promises_1 = require("fs/promises");
const path_1 = __importStar(require("path"));
const node_process_1 = require("node:process");
const map_int_limits_key_value_types_1 = require("./map-int-limits-key-value-types");
const promises_2 = require("node:fs/promises");
const createVirtualFileSystem_1 = require("../../../vfs/createVirtualFileSystem");
const stdlib_1 = __importDefault(require("../../../stdlib/stdlib"));
const logger_1 = require("../../../context/logger");
const createNodeFileSystem_1 = require("../../../vfs/createNodeFileSystem");
const pwd = (fileName) => path_1.default.join(__dirname, fileName);
const testDirectory = (kind, testName) => pwd(`./build/${kind}_${testName}`.replaceAll(" ", "-"));
const testContractFileName = "test.tact";
const applySubstitutions = ({ template, subst }) => {
    return Array.from(subst).reduce((partialTemplate, [placeholder, concreteValue]) => {
        return partialTemplate.replaceAll(placeholder, concreteValue);
    }, template);
};
const instantiateContractAndSpecTemplates = async (testKind, testName, templateTact, templateSpec) => {
    const testDir = testDirectory(testKind, testName);
    const tactSourceCode = applySubstitutions(templateTact);
    const specSourceCode = applySubstitutions(templateSpec);
    await (0, promises_1.mkdir)(testDir, { recursive: true });
    const tactFilePath = path_1.default.join(testDir, testContractFileName);
    await (0, promises_1.writeFile)(tactFilePath, tactSourceCode);
    const specFilePath = path_1.default.join(testDir, `${testKind}.spec.ts`);
    await (0, promises_1.writeFile)(specFilePath, specSourceCode);
    return tactFilePath;
};
const stdlib = (0, createVirtualFileSystem_1.createVirtualFileSystem)("@stdlib", stdlib_1.default);
const compileAndExitOnError = async (tactFilePath) => {
    const compilationResult = await (0, tact_1.run)({
        config: (0, tact_1.createSingleFileConfig)((0, path_1.basename)(tactFilePath, (0, path_1.extname)(tactFilePath)), (0, path_1.dirname)(tactFilePath)),
        logger: new logger_1.Logger(logger_1.LogLevel.NONE),
        stdlib,
        project: (0, createNodeFileSystem_1.createNodeFileSystem)((0, path_1.dirname)(tactFilePath), false),
    });
    if (!compilationResult.ok) {
        console.error(compilationResult.error);
        (0, node_process_1.exit)(1);
    }
};
const generatePropertyTests = async () => {
    const templateTactSourceCodeProperties = (await (0, promises_2.readFile)(pwd("map-properties.tact.template"))).toString();
    const templateSpecSourceCodeProperties = (await (0, promises_2.readFile)(pwd("map-properties.spec.ts.template"))).toString();
    for (const key of map_properties_key_value_types_1.keyTypes) {
        for (const val of map_properties_key_value_types_1.valTypes) {
            const testName = `${key.type}_${val.type}`;
            const tactFilePath = await instantiateContractAndSpecTemplates("map-properties", testName, {
                template: templateTactSourceCodeProperties,
                subst: new Map([
                    ["KEY_TYPE_PLACEHOLDER", key.type],
                    ["VAL_TYPE_PLACEHOLDER", val.type],
                ]),
            }, {
                template: templateSpecSourceCodeProperties,
                subst: new Map([
                    ["KEY_1_PLACEHOLDER", key._1],
                    ["KEY_2_PLACEHOLDER", key._2],
                    ["VAL_1_PLACEHOLDER", val._1],
                    ["VAL_2_PLACEHOLDER", val._2],
                ]),
            });
            await compileAndExitOnError(tactFilePath);
        }
    }
};
const generateIntLimitsTests = async () => {
    const templateTactSourceCodeLimits = (await (0, promises_2.readFile)(pwd("map-int-limits.tact.template"))).toString();
    const templateSpecSourceCodeLimits = (await (0, promises_2.readFile)(pwd("map-int-limits.spec.ts.template"))).toString();
    for (const key of map_int_limits_key_value_types_1.intKeyFormats) {
        for (const val of map_int_limits_key_value_types_1.intValFormats) {
            const testName = `${(0, map_int_limits_key_value_types_1.descriptionToString)(key)}_${(0, map_int_limits_key_value_types_1.descriptionToString)(val)}`;
            const tactFilePath = await instantiateContractAndSpecTemplates("map-int-limits", testName, {
                template: templateTactSourceCodeLimits,
                subst: new Map([
                    ["KEY_FORMAT_PLACEHOLDER", (0, map_int_limits_key_value_types_1.descriptionToString)(key)],
                    ["VAL_FORMAT_PLACEHOLDER", (0, map_int_limits_key_value_types_1.descriptionToString)(val)],
                    ["KEY_MIN_PLACEHOLDER", (0, map_int_limits_key_value_types_1.minInt)(key).toString()],
                    ["KEY_MAX_PLACEHOLDER", (0, map_int_limits_key_value_types_1.maxInt)(key).toString()],
                    ["VAL_MIN_PLACEHOLDER", (0, map_int_limits_key_value_types_1.minInt)(val).toString()],
                    ["VAL_MAX_PLACEHOLDER", (0, map_int_limits_key_value_types_1.maxInt)(val).toString()],
                ]),
            }, {
                template: templateSpecSourceCodeLimits,
                subst: new Map(),
            });
            await compileAndExitOnError(tactFilePath);
        }
    }
};
const main = async () => {
    try {
        await generatePropertyTests();
        await generateIntLimitsTests();
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
};
void main();
