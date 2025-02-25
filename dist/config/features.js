"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enabledInline = enabledInline;
exports.enabledDebug = enabledDebug;
exports.enabledOptimizedChildCode = enabledOptimizedChildCode;
exports.enabledExternals = enabledExternals;
exports.enabledIpfsAbiGetter = enabledIpfsAbiGetter;
exports.enabledInterfacesGetter = enabledInterfacesGetter;
exports.enabledNullChecks = enabledNullChecks;
exports.enabledLazyDeploymentCompletedGetter = enabledLazyDeploymentCompletedGetter;
exports.featureEnable = featureEnable;
const context_1 = require("../context/context");
const featureStore = (0, context_1.createContextStore)();
function enabledInline(ctx) {
    return featureEnabled(ctx, "inline");
}
function enabledDebug(ctx) {
    return featureEnabled(ctx, "debug");
}
function enabledOptimizedChildCode(ctx) {
    return featureEnabled(ctx, "optimizedChildCode");
}
function enabledExternals(ctx) {
    return featureEnabled(ctx, "external");
}
function enabledIpfsAbiGetter(ctx) {
    return featureEnabled(ctx, "ipfsAbiGetter");
}
function enabledInterfacesGetter(ctx) {
    return featureEnabled(ctx, "interfacesGetter");
}
function enabledNullChecks(ctx) {
    return featureEnabled(ctx, "nullChecks");
}
function enabledLazyDeploymentCompletedGetter(ctx) {
    return featureEnabled(ctx, "lazyDeploymentCompletedGetter");
}
function featureEnabled(ctx, key) {
    return featureStore.get(ctx, key) === true;
}
function featureEnable(ctx, key) {
    return featureStore.set(ctx, key, true);
}
