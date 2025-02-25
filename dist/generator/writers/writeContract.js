"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeStorageOps = writeStorageOps;
exports.writeInit = writeInit;
exports.writeMainContract = writeMainContract;
const features_1 = require("../../config/features");
const id_1 = require("./id");
const ops_1 = require("./ops");
const resolveFuncPrimitive_1 = require("./resolveFuncPrimitive");
const resolveFuncType_1 = require("./resolveFuncType");
const resolveFuncTypeUnpack_1 = require("./resolveFuncTypeUnpack");
const writeExpression_1 = require("./writeExpression");
const writeFunction_1 = require("./writeFunction");
const writeInterfaces_1 = require("./writeInterfaces");
const writeRouter_1 = require("./writeRouter");
const resolveFuncTypeFromAbiUnpack_1 = require("./resolveFuncTypeFromAbiUnpack");
const resolveAllocation_1 = require("../../storage/resolveAllocation");
function writeStorageOps(type, origin, ctx) {
    // Load function
    ctx.fun(ops_1.ops.contractLoad(type.name, ctx), () => {
        ctx.signature(`${(0, resolveFuncType_1.resolveFuncType)(type, ctx)} ${ops_1.ops.contractLoad(type.name, ctx)}()`);
        ctx.flag("impure");
        // ctx.flag('inline');
        ctx.context("type:" + type.name + "$init");
        ctx.body(() => {
            // Load data slice
            ctx.append(`slice $sc = get_data().begin_parse();`);
            // Load context
            if (type.dependsOn.length > 0 &&
                !(0, features_1.enabledOptimizedChildCode)(ctx.ctx)) {
                ctx.append(`__tact_child_contract_codes = $sc~load_ref();`);
            }
            ctx.append(`int $loaded = $sc~load_int(1);`);
            // Load data
            ctx.append(`if ($loaded) {`);
            ctx.inIndent(() => {
                if (type.fields.length > 0) {
                    ctx.append(`return $sc~${ops_1.ops.reader(type.name, "with-opcode", ctx)}();`);
                }
                else {
                    ctx.append(`return null();`);
                }
            });
            ctx.append(`} else {`);
            ctx.inIndent(() => {
                // Load arguments
                if (type.init.params.length > 0) {
                    ctx.append(`(${type.init.params.map((v) => (0, resolveFuncType_1.resolveFuncType)(v.type, ctx) + " " + (0, id_1.funcIdOf)(v.name)).join(", ")}) = $sc~${ops_1.ops.reader((0, id_1.funcInitIdOf)(type.name), "with-opcode", ctx)}();`);
                    ctx.append(`$sc.end_parse();`);
                }
                // Execute init function
                ctx.append(`return ${ops_1.ops.contractInit(type.name, ctx)}(${[...type.init.params.map((v) => (0, id_1.funcIdOf)(v.name))].join(", ")});`);
            });
            ctx.append(`}`);
        });
    });
    // Store function
    ctx.fun(ops_1.ops.contractStore(type.name, ctx), () => {
        const sig = `() ${ops_1.ops.contractStore(type.name, ctx)}(${(0, resolveFuncType_1.resolveFuncType)(type, ctx)} v)`;
        ctx.signature(sig);
        ctx.flag("impure");
        ctx.flag("inline");
        ctx.context("type:" + type.name + "$init");
        ctx.body(() => {
            ctx.append(`builder b = begin_cell();`);
            // Persist system cell
            if (type.dependsOn.length > 0 &&
                !(0, features_1.enabledOptimizedChildCode)(ctx.ctx)) {
                ctx.append(`b = b.store_ref(__tact_child_contract_codes);`);
            }
            // Persist deployment flag
            ctx.append(`b = b.store_int(true, 1);`);
            // Build data
            if (type.fields.length > 0) {
                ctx.append(`b = ${ops_1.ops.writer(type.name, ctx)}(b, v);`);
            }
            // Persist data
            ctx.append(`set_data(b.end_cell());`);
        });
    });
}
function writeInit(t, init, ctx, codes) {
    ctx.fun(ops_1.ops.contractInit(t.name, ctx), () => {
        const args = init.params.map((v) => (0, resolveFuncType_1.resolveFuncType)(v.type, ctx) + " " + (0, id_1.funcIdOf)(v.name));
        const sig = `${(0, resolveFuncType_1.resolveFuncType)(t, ctx)} ${ops_1.ops.contractInit(t.name, ctx)}(${args.join(", ")})`;
        ctx.signature(sig);
        ctx.flag("impure");
        ctx.flag("inline");
        ctx.body(() => {
            // Unpack parameters
            for (const a of init.params) {
                if (!(0, resolveFuncPrimitive_1.resolveFuncPrimitive)(a.type, ctx)) {
                    ctx.append(`var (${(0, resolveFuncTypeUnpack_1.resolveFuncTypeUnpack)(a.type, (0, id_1.funcIdOf)(a.name), ctx)}) = ${(0, id_1.funcIdOf)(a.name)};`);
                }
            }
            // Generate self initial tensor
            const initValues = [];
            t.fields.forEach((tField) => {
                let init = "null()";
                if (tField.default !== undefined) {
                    init = (0, writeExpression_1.writeValue)(tField.default, ctx);
                }
                initValues.push(init);
            });
            if (initValues.length > 0) {
                // Special case for empty contracts
                ctx.append(`var (${(0, resolveFuncTypeUnpack_1.resolveFuncTypeUnpack)(t, (0, id_1.funcIdOf)("self"), ctx)}) = (${initValues.join(", ")});`);
            }
            else {
                ctx.append(`tuple ${(0, id_1.funcIdOf)("self")} = null();`);
            }
            // Generate statements
            const returns = (0, resolveFuncTypeUnpack_1.resolveFuncTypeUnpack)(t, (0, id_1.funcIdOf)("self"), ctx);
            for (const s of init.ast.statements) {
                if (s.kind === "statement_return") {
                    ctx.append(`return ${returns};`);
                }
                else {
                    (0, writeFunction_1.writeStatement)(s, returns, null, ctx);
                }
            }
            // Return result
            if (init.ast.statements.length === 0 ||
                init.ast.statements[init.ast.statements.length - 1].kind !==
                    "statement_return") {
                ctx.append(`return ${returns};`);
            }
        });
    });
    ctx.fun(ops_1.ops.contractChildGetCode(t.name, ctx), () => {
        ctx.signature(`cell ${ops_1.ops.contractChildGetCode(t.name, ctx)}()`);
        ctx.context("type:" + t.name + "$init");
        ctx.flag("inline");
        ctx.flag("impure");
        ctx.asm("", `B{${codes[t.name]?.codeBoc.toString("hex")}} B>boc PUSHREF`);
    });
    ctx.fun(ops_1.ops.contractInitChild(t.name, ctx), () => {
        const args = init.params.map((v) => (0, resolveFuncType_1.resolveFuncType)(v.type, ctx) + " " + (0, id_1.funcIdOf)(v.name));
        const sig = `(cell, cell) ${ops_1.ops.contractInitChild(t.name, ctx)}(${args.join(", ")})`;
        ctx.signature(sig);
        if ((0, features_1.enabledInline)(ctx.ctx)) {
            ctx.flag("inline");
        }
        ctx.context("type:" + t.name + "$init");
        ctx.body(() => {
            ctx.append(";; Build init code cell");
            ctx.append();
            if (t.name === ctx.name) {
                // The contract wants to deploy its copy
                ctx.write(`
                    ;; Contract Code: ${t.name}
                    cell init_code = my_code();
                `);
                ctx.append();
                ctx.append(";; Build init data cell");
                ctx.append();
                ctx.append("builder b = begin_cell();");
                if (t.dependsOn.length > 0 &&
                    !(0, features_1.enabledOptimizedChildCode)(ctx.ctx)) {
                    ctx.append("b = b.store_ref(__tact_child_contract_codes);");
                }
            }
            else {
                if (!(0, features_1.enabledOptimizedChildCode)(ctx.ctx)) {
                    ctx.write(`
                        slice sc' = __tact_child_contract_codes.begin_parse();
                        cell source = sc'~load_dict();
                    `);
                    ctx.write(`
                        ;; Contract Code: ${t.name}
                        cell init_code = ${ctx.used("__tact_dict_get_code")}(source, ${t.uid});
                    `);
                }
                else {
                    ctx.write(`
                        ;; Contract Code: ${t.name}
                        cell init_code = ${ops_1.ops.contractChildGetCode(t.name, ctx)}();
                    `);
                }
                ctx.append();
                if (!(0, features_1.enabledOptimizedChildCode)(ctx.ctx)) {
                    ctx.append(";; Build init data cell");
                    if (t.dependsOn.length > 0) {
                        ctx.write(`
                            cell contracts = new_dict();
                        `);
                    }
                    // Copy contracts code
                    for (const c of t.dependsOn) {
                        ctx.append();
                        ctx.append(`;; Contract Code: ${c.name}`);
                        if (c.name === ctx.name) {
                            ctx.append(`contracts = ${ctx.used("__tact_dict_set_code")}(contracts, ${c.uid}, my_code());`);
                        }
                        else {
                            ctx.write(`
                                cell code_${c.uid} = ${ctx.used("__tact_dict_get_code")}(source, ${c.uid});
                                contracts = ${ctx.used("__tact_dict_set_code")}(contracts, ${c.uid}, code_${c.uid});
                            `);
                        }
                    }
                }
                ctx.append();
                ctx.append("builder b = begin_cell();");
                if (!(0, features_1.enabledOptimizedChildCode)(ctx.ctx) &&
                    t.dependsOn.length > 0) {
                    ctx.append(`b = b.store_ref(begin_cell().store_dict(contracts).end_cell());`);
                }
            }
            // store initialization bit and contract variables
            ctx.append(`b = b.store_int(false, 1);`);
            const args = t.init.params.length > 0
                ? [
                    "b",
                    "(" +
                        t
                            .init.params.map((a) => (0, id_1.funcIdOf)(a.name))
                            .join(", ") +
                        ")",
                ].join(", ")
                : "b, null()";
            ctx.append(`b = ${ops_1.ops.writer((0, id_1.funcInitIdOf)(t.name), ctx)}(${args});`);
            ctx.append(`return (init_code, b.end_cell());`);
        });
    });
    ctx.fun(ops_1.ops.contractCodeChild(t.name, ctx), () => {
        const sig = `cell ${ops_1.ops.contractCodeChild(t.name, ctx)}()`;
        ctx.signature(sig);
        ctx.flag("inline");
        ctx.context("type:" + t.name + "$init");
        ctx.body(() => {
            if (!(0, features_1.enabledOptimizedChildCode)(ctx.ctx)) {
                ctx.write(`
                    slice sc' = __tact_child_contract_codes.begin_parse();
                    cell source = sc'~load_dict();
                    ;; Contract Code: ${t.name}
                    return ${ctx.used("__tact_dict_get_code")}(source, ${t.uid});
                `);
            }
            else {
                ctx.write(`
                    return ${ctx.used(ops_1.ops.contractChildGetCode(t.name, ctx))}();
                `);
            }
        });
    });
}
function writeMainContract(contract, abiLink, wCtx) {
    // Main field
    wCtx.main(() => {
        wCtx.append(`;;`);
        wCtx.append(`;; Get methods of a Contract ${contract.name}`);
        wCtx.append(`;;`);
        wCtx.append();
        // Getters
        for (const f of contract.functions.values()) {
            if (f.isGetter) {
                (0, writeFunction_1.writeGetter)(f, wCtx);
            }
        }
        // Interfaces
        if ((0, features_1.enabledInterfacesGetter)(wCtx.ctx)) {
            (0, writeInterfaces_1.writeInterfaces)(contract, wCtx);
        }
        // ABI
        if ((0, features_1.enabledIpfsAbiGetter)(wCtx.ctx)) {
            wCtx.append(`_ get_abi_ipfs() method_id {`);
            wCtx.inIndent(() => {
                wCtx.append(`return "${abiLink}";`);
            });
            wCtx.append(`}`);
            wCtx.append();
        }
        if ((0, features_1.enabledLazyDeploymentCompletedGetter)(wCtx.ctx)) {
            // Deployed
            wCtx.append(`_ lazy_deployment_completed() method_id {`);
            wCtx.inIndent(() => {
                wCtx.append(`return get_data().begin_parse().load_int(1);`);
            });
            wCtx.append(`}`);
            wCtx.append();
        }
        wCtx.append(`;;`);
        wCtx.append(`;; Routing of a Contract ${contract.name}`);
        wCtx.append(`;;`);
        wCtx.append();
        const contractReceivers = (0, writeRouter_1.groupContractReceivers)(contract);
        // Render internal receiver
        wCtx.inBlock("() recv_internal(int msg_value, cell in_msg_cell, slice in_msg) impure", () => {
            wCtx.append();
            wCtx.append(`;; Context`);
            wCtx.append(`var cs = in_msg_cell.begin_parse();`);
            wCtx.append(`cs~skip_bits(2);`); // skip int_msg_info$0 ihr_disabled:Bool
            wCtx.append(`var msg_bounceable = cs~load_int(1);`); // bounce:Bool
            wCtx.append(`var msg_bounced = cs~load_int(1);`); // bounced:Bool
            wCtx.append(`slice msg_sender_addr = cs~load_msg_addr();`);
            wCtx.append(`__tact_context = (msg_bounceable, msg_sender_addr, msg_value, cs);`);
            wCtx.append(`__tact_context_sender = msg_sender_addr;`);
            wCtx.append();
            // Load self
            wCtx.append(`;; Load contract data`);
            const contractVariables = (0, resolveFuncTypeFromAbiUnpack_1.resolveFuncTypeFromAbiUnpack)("$self", (0, resolveAllocation_1.getAllocation)(wCtx.ctx, contract.name).ops, wCtx);
            wCtx.append(`var ${contractVariables} = ${ops_1.ops.contractLoad(contract.name, wCtx)}();`);
            wCtx.append();
            (0, writeRouter_1.writeBouncedRouter)(contractReceivers.bounced, contract, wCtx);
            (0, writeRouter_1.writeNonBouncedRouter)(contractReceivers.internal, contract, wCtx);
        });
        wCtx.append();
        // Render external receiver
        const hasExternal = !(contractReceivers.external.binary.length === 0 &&
            contractReceivers.external.comment.length === 0 &&
            typeof contractReceivers.external.commentFallback === "undefined" &&
            typeof contractReceivers.external.empty === "undefined" &&
            typeof contractReceivers.external.fallback === "undefined");
        if (hasExternal) {
            wCtx.inBlock("() recv_external(slice in_msg) impure", () => {
                // Load self
                wCtx.append(`;; Load contract data`);
                const contractVariables = (0, resolveFuncTypeFromAbiUnpack_1.resolveFuncTypeFromAbiUnpack)("$self", (0, resolveAllocation_1.getAllocation)(wCtx.ctx, contract.name).ops, wCtx);
                wCtx.append(`var ${contractVariables} = ${ops_1.ops.contractLoad(contract.name, wCtx)}();`);
                wCtx.append();
                (0, writeRouter_1.writeNonBouncedRouter)(contractReceivers.external, contract, wCtx);
            });
        }
    });
}
