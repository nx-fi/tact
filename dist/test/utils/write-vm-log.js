"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeLog = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const writeLog = ({ blockchain, path }) => {
    (0, fs_1.mkdirSync)((0, path_1.dirname)(path), { recursive: true });
    try {
        (0, fs_1.rmSync)(path);
    }
    catch (_) {
        /* */
    }
    (0, fs_1.writeFileSync)(path, "");
    return async function step(name, callback) {
        const oldLog = console.log;
        const oldVmLogs = blockchain.verbosity.vmLogs;
        const oldBcLogs = blockchain.verbosity.blockchainLogs;
        try {
            console.log = (message, ...rest) => {
                if (typeof message !== "string" || rest.length > 0) {
                    throw new Error("Unexpected log");
                }
                const lines = message
                    .split("\n")
                    .map((s) => "    " + s)
                    .join("\n");
                const entry = `  - |\n${lines}\n`;
                (0, fs_1.appendFileSync)(path, entry);
            };
            blockchain.verbosity.vmLogs = "vm_logs_full";
            blockchain.verbosity.blockchainLogs = true;
            const entry = `- name: ${name}\n  messages:\n`;
            (0, fs_1.appendFileSync)(path, entry);
            return await callback();
        }
        finally {
            console.log = oldLog;
            blockchain.verbosity.vmLogs = oldVmLogs;
            blockchain.verbosity.blockchainLogs = oldBcLogs;
        }
    };
};
exports.writeLog = writeLog;
