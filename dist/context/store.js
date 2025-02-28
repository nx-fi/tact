"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRawAST = getRawAST;
exports.parseModules = parseModules;
exports.openContext = openContext;
const errors_1 = require("../error/errors");
const context_1 = require("./context");
const store = (0, context_1.createContextStore)();
/**
 * Retrieves the raw AST for the given context.
 * @public
 * @param ctx The compiler context from which the AST is retrieved.
 * @throws Will throw an error if the AST is not found in the context.
 * @returns The AST types associated with the context.
 */
function getRawAST(ctx) {
    const r = store.get(ctx, "types");
    if (!r) {
        (0, errors_1.throwInternalCompilerError)("No AST found in context");
    }
    return r;
}
/**
 * Parses multiple Tact source files into AST modules.
 * @public
 */
function parseModules(sources, parser) {
    return sources.map((source) => parser.parse(source));
}
/**
 * Extends the compiler context by adding AST entries and source information from
 * given sources and parsed programs.
 * @public
 * @param parsedModules An optional array of previously parsed programs. If not defined, they will be parsed from `sources`.
 * @returns The updated compiler context.
 */
function openContext(ctx, sources, funcSources, parser, parsedModules) {
    const modules = parsedModules ?? parseModules(sources, parser);
    const types = [];
    const functions = [];
    const constants = [];
    for (const module of modules) {
        for (const item of module.items) {
            switch (item.kind) {
                case "struct_decl":
                case "message_decl":
                case "contract":
                case "trait":
                case "primitive_type_decl":
                    {
                        types.push(item);
                    }
                    break;
                case "function_def":
                case "asm_function_def":
                case "native_function_decl":
                    {
                        functions.push(item);
                    }
                    break;
                case "constant_def":
                    {
                        constants.push(item);
                    }
                    break;
            }
        }
    }
    ctx = store.set(ctx, "types", {
        sources,
        funcSources,
        functions,
        constants,
        types,
    });
    return ctx;
}
