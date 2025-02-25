"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withLog = withLog;
const parse_log_1 = require("./parse-log");
async function withLog(blockchain, callback) {
    const oldLog = console.log;
    const oldVmLogs = blockchain.verbosity.vmLogs;
    const oldBcLogs = blockchain.verbosity.blockchainLogs;
    const log = [];
    try {
        console.log = (message, ...rest) => {
            if (typeof message !== "string" || rest.length > 0) {
                throw new Error("Unexpected log");
            }
            log.push(message);
        };
        blockchain.verbosity.vmLogs = "vm_logs_full";
        blockchain.verbosity.blockchainLogs = true;
        const result = await callback();
        const transactions = (0, parse_log_1.getTransactions)(log);
        return { result, transactions };
    }
    finally {
        console.log = oldLog;
        blockchain.verbosity.vmLogs = oldVmLogs;
        blockchain.verbosity.blockchainLogs = oldBcLogs;
    }
}
