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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactions = exports.parseLog = void 0;
/* eslint-disable @typescript-eslint/no-unnecessary-condition -- eslint bug */
const promises_1 = require("fs/promises");
const process_1 = require("process");
const yaml_1 = require("yaml");
const zod_1 = require("zod");
const parser_runtime_1 = require("@tonstudio/parser-runtime");
const path_1 = require("path");
const $ = __importStar(require("./logs"));
const src_info_1 = require("../../grammar/src-info");
const packageSchema = zod_1.z.array(zod_1.z.object({
    name: zod_1.z.string(),
    messages: zod_1.z.array(zod_1.z.string()),
}));
const AsmGas = (gas) => ({ kind: "gas", gas });
const AsmException = (no, message) => ({
    kind: "exception",
    no,
    message,
});
const parseLog = async (path) => {
    const code = await (0, promises_1.readFile)(path, "utf-8");
    const reports = packageSchema.parse((0, yaml_1.parse)(code));
    const result = reports.map(({ name, messages }) => {
        return {
            name,
            transactions: (0, exports.getTransactions)(messages),
        };
    });
    const names = result.map((x) => x.name);
    if (names.length !== new Set(names).size) {
        throw new Error("Duplicate names in log");
    }
    return result;
};
exports.parseLog = parseLog;
const getTransactions = (messages) => {
    return pairUp(messages).flatMap(([bc, vm, bcSource, vmSource, debug]) => convertPair(bc, vm, bcSource, vmSource, debug));
};
exports.getTransactions = getTransactions;
const convertPair = (bc, vm, bcSource, vmSource, debug) => {
    let limits;
    let steps;
    for (const entry of bc.entries) {
        if (entry.$ === "BcEntry") {
            const info = entry.info;
            if (info.$ === "BcLimits") {
                limits = info;
            }
            else if (info.$ === "BcSteps") {
                steps = info;
            }
        }
    }
    if (limits === undefined || steps === undefined) {
        showErrorAtLoc(bcSource, "", bc.loc);
        return [];
    }
    const max = parseInt(limits.limit, 10);
    const used = parseInt(steps.used, 10);
    const credit = parseInt(limits.credit, 10);
    let gasLimit = credit ? credit : Math.min(max, 1000000);
    let prevGas = gasLimit;
    const asm = [];
    let used2 = 0;
    for (const entry of vm.entries) {
        const gasEntry = entry.other.find((entry) => entry.$ === "VmGasRemaining");
        const limitChanged = entry.other.find((entry) => entry.$ === "VmLimitChanged");
        const commandEntry = entry.other.find((entry) => entry.$ === "VmExecute");
        const locationEntry = entry.other.find((entry) => entry.$ === "VmLoc");
        const exceptionEntry = entry.other.find((entry) => entry.$ === "VmException");
        if (!commandEntry) {
            showErrorAtLoc(vmSource, "", entry.loc);
            continue;
        }
        const [cmd, argsTmp] = commandEntry.instr.split(" ", 2);
        if (!cmd) {
            throw new Error("Cannot happen");
        }
        const command = cmd === "implicit" ? commandEntry.instr : cmd;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- eslint bug
        const args = cmd === "implicit" ? "" : (argsTmp ?? "");
        const location = locationEntry
            ? {
                hash: locationEntry.hash,
                offset: locationEntry.offset,
            }
            : undefined;
        if (exceptionEntry) {
            const result = AsmException(parseInt(exceptionEntry.errno, 10), exceptionEntry.message);
            asm.push({ command, args, location, result });
            continue;
        }
        if (!gasEntry) {
            showErrorAtLoc(vmSource, "", entry.loc);
            continue;
        }
        const gasRemaining = parseInt(gasEntry.gas, 10);
        if (limitChanged) {
            const newLimit = parseInt(limitChanged.limit);
            const spentBefore = gasLimit - prevGas;
            const spentBeforeWithNewLimit = newLimit - spentBefore;
            const spentOnAccept = spentBeforeWithNewLimit - gasRemaining;
            prevGas = gasRemaining;
            gasLimit = newLimit;
            used2 += spentOnAccept;
            const result = AsmGas(spentOnAccept);
            asm.push({ command, args, location, result });
        }
        else {
            const gas = prevGas - gasRemaining;
            prevGas = gasRemaining;
            used2 += gas;
            const result = AsmGas(gas);
            asm.push({ command, args, location, result });
        }
    }
    if (used !== used2) {
        console.error("Wrong used gas!", { used, used2 });
    }
    const result = {
        asm,
        used,
        debug,
    };
    return [result];
};
const pairUp = (messages) => {
    const result = [];
    for (let i = 0, len = messages.length; i < len; ++i) {
        const message1 = messages[i];
        if (!message1?.startsWith("[")) {
            console.error(`Bad blockchain log entry:\n${message1?.substring(0, 100)}`);
            continue;
        }
        ++i;
        if (i >= len) {
            console.error(`Unpaired message:\n${message1?.substring(0, 100)}`);
        }
        const message2 = messages[i];
        if (!message2?.startsWith("stack")) {
            console.error(`Bad VM log entry:\n${message2?.substring(0, 100)}`);
            continue;
        }
        const bcEntry = (0, parser_runtime_1.parse)({
            text: message1,
            grammar: $.BlockchainMessage,
            space: (0, parser_runtime_1.str)("SPACE"),
        });
        if (bcEntry.$ === "error") {
            showError(message1, "", bcEntry.error.position);
            continue;
        }
        const vmEntry = (0, parser_runtime_1.parse)({
            text: message2,
            grammar: $.VmMessage,
            space: (0, parser_runtime_1.str)("SPACE"),
        });
        if (vmEntry.$ === "error") {
            showError(message2, "", vmEntry.error.position);
            continue;
        }
        if (i + 1 < messages.length) {
            const next = messages[i];
            if (next?.startsWith(debugPrefix)) {
                ++i;
                const debugMessage = next
                    .split("\n")
                    .map((line) => {
                    if (!line.startsWith(debugPrefix)) {
                        console.error("Internal: Debug line without prefix");
                    }
                    return line.substring(debugPrefix.length);
                })
                    .join("\n");
                result.push([
                    bcEntry.value,
                    vmEntry.value,
                    message1,
                    message2,
                    debugMessage,
                ]);
                continue;
            }
        }
        result.push([
            bcEntry.value,
            vmEntry.value,
            message1,
            message2,
            undefined,
        ]);
    }
    return result;
};
const debugPrefix = "#DEBUG#: ";
const showErrorAtLoc = (code, path, loc) => {
    showError(code, path, loc.$ === "range" ? loc.start : loc.at);
};
const showError = (code, path, position) => {
    console.log((0, src_info_1.getSrcInfo)(code, position, position, (0, path_1.relative)((0, process_1.cwd)(), path), "user").interval.getLineAndColumnMessage());
};
