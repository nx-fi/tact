"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.precompile = precompile;
const resolveDescriptors_1 = require("../types/resolveDescriptors");
const resolveAllocation_1 = require("../storage/resolveAllocation");
const store_1 = require("../context/store");
const resolveStatements_1 = require("../types/resolveStatements");
const resolveErrors_1 = require("../types/resolveErrors");
const resolveSignatures_1 = require("../types/resolveSignatures");
const resolveImports_1 = require("../imports/resolveImports");
function precompile(ctx, project, stdlib, entrypoint, parser, ast, parsedModules) {
    // Load all sources
    const imported = (0, resolveImports_1.resolveImports)({ entrypoint, project, stdlib, parser });
    // Add information about all the source code entries to the context
    ctx = (0, store_1.openContext)(ctx, imported.tact, imported.func, parser, parsedModules);
    // First load type descriptors and check that
    //       they all have valid signatures
    ctx = (0, resolveDescriptors_1.resolveDescriptors)(ctx, ast);
    // This creates TLB-style type definitions
    ctx = (0, resolveSignatures_1.resolveSignatures)(ctx, ast);
    // This checks and resolves all statements
    ctx = (0, resolveStatements_1.resolveStatements)(ctx, ast);
    // This extracts error messages
    ctx = (0, resolveErrors_1.resolveErrors)(ctx, ast);
    // This creates allocations for all defined types
    ctx = (0, resolveAllocation_1.resolveAllocations)(ctx);
    // Prepared context
    return ctx;
}
