"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableFeatures = enableFeatures;
exports.build = build;
const core_1 = require("@ton/core");
const opcode_1 = require("@tact-lang/opcode");
const writeTypescript_1 = require("../bindings/writeTypescript");
const features_1 = require("../config/features");
const context_1 = require("../context/context");
const funcCompile_1 = require("../func/funcCompile");
const writeReport_1 = require("../generator/writeReport");
const store_1 = require("../context/store");
const stdlib_1 = __importDefault(require("../stdlib/stdlib"));
const logger_1 = require("../context/logger");
const packageCode_1 = require("../packaging/packageCode");
const resolveABITypeRef_1 = require("../types/resolveABITypeRef");
const resolveDescriptors_1 = require("../types/resolveDescriptors");
const filePath_1 = require("../utils/filePath");
const createVirtualFileSystem_1 = require("../vfs/createVirtualFileSystem");
const compile_1 = require("./compile");
const precompile_1 = require("./precompile");
const version_1 = require("./version");
const ast_helpers_1 = require("../ast/ast-helpers");
const errors_1 = require("../error/errors");
const grammar_1 = require("../grammar");
const grammar_2 = require("../grammar/grammar");
const utils_1 = require("./utils");
function enableFeatures(ctx, logger, config) {
    if (config.options === undefined) {
        return ctx;
    }
    const features = [
        { option: config.options.debug, name: "debug" },
        { option: config.options.external, name: "external" },
        { option: config.options.experimental?.inline, name: "inline" },
        { option: config.options.ipfsAbiGetter, name: "ipfsAbiGetter" },
        { option: config.options.interfacesGetter, name: "interfacesGetter" },
        {
            option: config.options.safety?.nullChecks ?? true,
            name: "nullChecks",
        },
        {
            option: config.options.enableLazyDeploymentCompletedGetter ?? false,
            name: "lazyDeploymentCompletedGetter",
        },
    ];
    return features.reduce((currentCtx, { option, name }) => {
        if (option) {
            logger.debug(`   > 👀 Enabling ${name}`);
            return (0, features_1.featureEnable)(currentCtx, name);
        }
        return currentCtx;
    }, ctx);
}
async function build(args) {
    const { config, project } = args;
    const stdlib = typeof args.stdlib === "string"
        ? (0, createVirtualFileSystem_1.createVirtualFileSystem)(args.stdlib, stdlib_1.default)
        : args.stdlib;
    const ast = args.ast ?? (0, ast_helpers_1.getAstFactory)();
    const parser = args.parser ?? (0, grammar_1.getParser)(ast, config.options?.parser ?? grammar_2.defaultParser);
    const logger = args.logger ?? new logger_1.Logger();
    // Configure context
    let ctx = new context_1.CompilerContext();
    const cfg = JSON.stringify({
        entrypoint: (0, filePath_1.posixNormalize)(config.path),
        options: config.options ?? {},
    });
    ctx = enableFeatures(ctx, logger, config);
    // Precompile
    try {
        ctx = (0, precompile_1.precompile)(ctx, project, stdlib, config.path, parser, ast);
    }
    catch (e) {
        logger.error(config.mode === "checkOnly" || config.mode === "funcOnly"
            ? "Syntax and type checking failed"
            : "Tact compilation failed");
        // show an error with a backtrace only in verbose mode
        if (e instanceof errors_1.TactError && config.verbose && config.verbose < 2) {
            logger.error(e.message);
        }
        else {
            logger.error(e);
        }
        return { ok: false, error: [e] };
    }
    if (config.mode === "checkOnly") {
        logger.info("✔️ Syntax and type checking succeeded.");
        return { ok: true, error: [] };
    }
    // Compile contracts
    let ok = true;
    const errorMessages = [];
    const built = {};
    const allContracts = (0, resolveDescriptors_1.getAllTypes)(ctx).filter((v) => v.kind === "contract");
    // Sort contracts in topological order
    // If a cycle is found, return undefined
    const sortedContracts = (0, utils_1.topSortContracts)(allContracts);
    if (sortedContracts !== undefined) {
        ctx = (0, features_1.featureEnable)(ctx, "optimizedChildCode");
    }
    for (const contract of sortedContracts ?? allContracts) {
        const contractName = contract.name;
        const pathAbi = project.resolve(config.output, config.name + "_" + contractName + ".abi");
        const pathCodeBoc = project.resolve(config.output, config.name + "_" + contractName + ".code.boc");
        const pathCodeFif = project.resolve(config.output, config.name + "_" + contractName + ".code.fif");
        const pathCodeFifDec = project.resolve(config.output, config.name + "_" + contractName + ".code.rev.fif");
        let codeFc;
        let codeEntrypoint;
        // Compiling contract to func
        logger.info(`   > ${contractName}: tact compiler`);
        let abi;
        try {
            const res = await (0, compile_1.compile)(ctx, contractName, config.name + "_" + contractName, built);
            for (const files of res.output.files) {
                const ffc = project.resolve(config.output, files.name);
                project.writeFile(ffc, files.code);
            }
            project.writeFile(pathAbi, res.output.abi);
            abi = res.output.abi;
            codeFc = res.output.files.map((v) => ({
                path: (0, filePath_1.posixNormalize)(project.resolve(config.output, v.name)),
                content: v.code,
            }));
            codeEntrypoint = res.output.entrypoint;
        }
        catch (e) {
            logger.error("Tact compilation failed");
            // show an error with a backtrace only in verbose mode
            if (e instanceof errors_1.TactError &&
                config.verbose &&
                config.verbose < 2) {
                logger.error(e.message);
            }
            else {
                logger.error(e);
            }
            ok = false;
            errorMessages.push(e);
            continue;
        }
        if (config.mode === "funcOnly") {
            continue;
        }
        // Compiling contract to TVM
        logger.info(`   > ${contractName}: func compiler`);
        let codeBoc;
        try {
            const stdlibPath = stdlib.resolve("std/stdlib.fc");
            const stdlibCode = stdlib.readFile(stdlibPath).toString();
            const stdlibExPath = stdlib.resolve("std/stdlib_ex.fc");
            const stdlibExCode = stdlib.readFile(stdlibExPath).toString();
            const c = await (0, funcCompile_1.funcCompile)({
                entries: [
                    stdlibPath,
                    stdlibExPath,
                    (0, filePath_1.posixNormalize)(project.resolve(config.output, codeEntrypoint)),
                ],
                sources: [
                    {
                        path: stdlibPath,
                        content: stdlibCode,
                    },
                    {
                        path: stdlibExPath,
                        content: stdlibExCode,
                    },
                    ...codeFc,
                ],
                logger,
            });
            if (!c.ok) {
                const match = c.log.match(/undefined function `([^`]+)`, defining a global function of unknown type/);
                if (match) {
                    const message = `Function '${match[1]}' does not exist in imported FunC sources`;
                    logger.error(message);
                    errorMessages.push(new Error(message));
                    return { ok: false, error: errorMessages };
                }
                logger.error(c.log);
                ok = false;
                errorMessages.push(new Error(c.log));
                continue;
            }
            project.writeFile(pathCodeFif, c.fift);
            project.writeFile(pathCodeBoc, c.output);
            codeBoc = c.output;
        }
        catch (e) {
            logger.error("FunC compiler crashed");
            logger.error(e);
            ok = false;
            errorMessages.push(e);
            continue;
        }
        // Add to built map
        built[contractName] = {
            codeBoc,
            abi,
        };
        if (config.mode === "fullWithDecompilation") {
            // Fift decompiler for generated code debug
            logger.info(`   > ${contractName}: fift decompiler`);
            let codeFiftDecompiled;
            try {
                const cell = opcode_1.Cell.fromBoc(codeBoc).at(0);
                if (typeof cell === "undefined") {
                    throw new Error("Cannot create Cell from BoC file");
                }
                const program = (0, opcode_1.disassembleRoot)(cell, { computeRefs: true });
                codeFiftDecompiled = opcode_1.AssemblyWriter.write(program, {
                    useAliases: true,
                });
                project.writeFile(pathCodeFifDec, codeFiftDecompiled);
            }
            catch (e) {
                logger.error("Fift decompiler crashed");
                logger.error(e);
                ok = false;
                errorMessages.push(e);
                continue;
            }
        }
    }
    if (!ok) {
        logger.info("💥 Compilation failed. Skipping packaging");
        return { ok: false, error: errorMessages };
    }
    if (config.mode === "funcOnly") {
        logger.info("✔️ FunC code generation succeeded.");
        return { ok: true, error: errorMessages };
    }
    // Package
    logger.info("   > Packaging");
    const contracts = (0, resolveDescriptors_1.getContracts)(ctx);
    const packages = [];
    for (const contract of contracts) {
        logger.info("   > " + contract);
        const artifacts = built[contract];
        if (!artifacts) {
            const message = `   > ${contract}: no artifacts found`;
            logger.error(message);
            errorMessages.push(new Error(message));
            return { ok: false, error: errorMessages };
        }
        // System cell
        const depends = core_1.Dictionary.empty(core_1.Dictionary.Keys.Uint(16), core_1.Dictionary.Values.Cell());
        const ct = (0, resolveDescriptors_1.getType)(ctx, contract);
        for (const c of ct.dependsOn) {
            const cd = built[c.name];
            if (!cd) {
                const message = `   > ${c.name}: no artifacts found`;
                logger.error(message);
                errorMessages.push(new Error(message));
                return { ok: false, error: errorMessages };
            }
            depends.set(c.uid, core_1.Cell.fromBoc(cd.codeBoc)[0]);
        }
        const systemCell = ct.dependsOn.length > 0
            ? (0, core_1.beginCell)().storeDict(depends).endCell()
            : null;
        // Collect sources
        const sources = {};
        const rawAst = (0, store_1.getRawAST)(ctx);
        for (const source of [...rawAst.funcSources, ...rawAst.sources]) {
            if (source.path.startsWith(project.root) &&
                !source.path.startsWith(stdlib.root)) {
                const source_path = (0, filePath_1.posixNormalize)(source.path.slice(project.root.length));
                sources[source_path] = Buffer.from(source.code).toString("base64");
            }
        }
        // Package
        const pkg = {
            name: contract,
            abi: artifacts.abi,
            code: artifacts.codeBoc.toString("base64"),
            init: {
                kind: "direct",
                args: (0, resolveDescriptors_1.getType)(ctx, contract).init.params.map((v) => ({
                    name: (0, ast_helpers_1.idText)(v.name),
                    type: (0, resolveABITypeRef_1.createABITypeRefFromTypeRef)(ctx, v.type, v.loc),
                })),
                prefix: {
                    bits: 1,
                    value: 0,
                },
                deployment: {
                    kind: "system-cell",
                    system: systemCell?.toBoc().toString("base64") ?? null,
                },
            },
            sources,
            compiler: {
                name: "tact",
                version: (0, version_1.getCompilerVersion)(),
                parameters: cfg,
            },
        };
        const pkgData = (0, packageCode_1.packageCode)(pkg);
        const pathPkg = project.resolve(config.output, config.name + "_" + contract + ".pkg");
        project.writeFile(pathPkg, pkgData);
        packages.push(pkg);
    }
    // Bindings
    logger.info("   > Bindings");
    for (const pkg of packages) {
        logger.info(`   > ${pkg.name}`);
        if (pkg.init.deployment.kind !== "system-cell") {
            const message = `   > ${pkg.name}: unsupported deployment kind ${pkg.init.deployment.kind}`;
            logger.error(message);
            errorMessages.push(new Error(message));
            return { ok: false, error: errorMessages };
        }
        try {
            const bindingsServer = (0, writeTypescript_1.writeTypescript)(JSON.parse(pkg.abi), ctx, {
                code: pkg.code,
                prefix: pkg.init.prefix,
                system: pkg.init.deployment.system,
                args: pkg.init.args,
            });
            project.writeFile(project.resolve(config.output, config.name + "_" + pkg.name + ".ts"), bindingsServer);
        }
        catch (e) {
            const error = e;
            error.message = `Bindings compiler crashed: ${error.message}`;
            logger.error(error);
            errorMessages.push(error);
            return { ok: false, error: errorMessages };
        }
    }
    // Reports
    logger.info("   > Reports");
    for (const pkg of packages) {
        logger.info("   > " + pkg.name);
        try {
            const report = (0, writeReport_1.writeReport)(ctx, pkg);
            const pathBindings = project.resolve(config.output, config.name + "_" + pkg.name + ".md");
            project.writeFile(pathBindings, report);
        }
        catch (e) {
            const error = e;
            error.message = `Report generation crashed: ${error.message}`;
            logger.error(error);
            errorMessages.push(error);
            return { ok: false, error: errorMessages };
        }
    }
    return { ok: true, error: [] };
}
