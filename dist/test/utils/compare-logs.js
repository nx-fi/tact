"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
const promises_1 = require("fs/promises");
const tricks_1 = require("../../utils/tricks");
const markdown_1 = require("./markdown");
const parse_log_1 = require("./parse-log");
const main = async () => {
    const argv = process.argv.slice(2);
    const [before, after, output] = argv;
    if (argv.length !== 3 || !before || !after || !output) {
        console.error(`> yarn ts-node compare-logs <before> <after> <output>`);
        process.exit(30);
    }
    const logsBefore = await (0, parse_log_1.parseLog)(before);
    const beforeMap = new Map(logsBefore.map((log) => [log.name, log.transactions]));
    const logsAfter = await (0, parse_log_1.parseLog)(after);
    const afterMap = new Map(logsAfter.map((log) => [log.name, log.transactions]));
    const allNames = logsBefore.map((log) => log.name);
    logsAfter.forEach((log) => {
        if (!beforeMap.has(log.name)) {
            console.error(`${log.name} didn't exist before`);
            allNames.push(log.name);
        }
    });
    const result = [];
    allNames.forEach((name) => {
        const b = beforeMap.get(name);
        const a = afterMap.get(name);
        if (!a) {
            console.error(`${name} doesn't exist after`);
            return;
        }
        if (!b) {
            return; // impossible
        }
        matchLogs(name, b, a, result);
    });
    await (0, promises_1.writeFile)(output, result.join("\n"));
};
const table = markdown_1.md.table
    .add("name", "Instruction", "left")
    .add("countBefore", "Before#", "right")
    .add("countAfter", "After#", "right")
    .add("countDelta", "Δ#", "right")
    .add("gasBefore", "Before$", "right")
    .add("gasAfter", "After$", "right")
    .add("gasDelta", "Δ$", "right").end;
const matchLogs = (name, before, after, result) => {
    if (before.length !== after.length) {
        console.error(`Number of transactions doesn't match`);
    }
    const minLen = Math.min(before.length, after.length);
    before.slice(0, minLen).forEach((b, i) => {
        result.push(`## ${name} #${i}`);
        const a = after[i];
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!a) {
            return;
        }
        const statsBefore = getStats(b);
        const statsAfter = getStats(a);
        const allKeys = Object.keys({ ...statsBefore, ...statsAfter });
        const totals = {
            countBefore: 0,
            countAfter: 0,
            countDelta: 0,
            gasBefore: 0,
            gasAfter: 0,
            gasDelta: 0,
        };
        const unorderedRows = allKeys.flatMap((k) => {
            const b = statsBefore[k] ?? { count: 0, gas: 0 };
            const a = statsAfter[k] ?? { count: 0, gas: 0 };
            if (a.count === b.count && a.gas === b.gas) {
                return [];
            }
            const gasDelta = a.gas - b.gas;
            const values = {
                countBefore: b.count,
                countAfter: a.count,
                countDelta: a.count - b.count,
                gasBefore: b.gas,
                gasAfter: a.gas,
                gasDelta,
            };
            (0, tricks_1.entries)(values).forEach(([key, value]) => (totals[key] += value));
            return [[gasDelta, { name: k, ...values }]];
        });
        if (totals.gasDelta !== a.used - b.used) {
            console.error(`Internal error: total gas delta does not match`);
        }
        if (unorderedRows.length === 0) {
            result.push("No diff");
            result.push("");
            return;
        }
        const rows = unorderedRows.sort((a, b) => b[0] - a[0]).map((x) => x[1]);
        rows.unshift({ name: "Total", ...totals });
        const stringRows = rows.map((r) => ({
            name: markdown_1.md.pre(r.name),
            countBefore: String(r.countBefore),
            countAfter: String(r.countAfter),
            countDelta: formatDelta(r.countDelta),
            gasBefore: String(r.gasBefore),
            gasAfter: String(r.gasAfter),
            gasDelta: formatDelta(r.gasDelta),
        }));
        result.push(table(stringRows));
    });
};
const formatDelta = (s) => {
    return s === 0 ? "" : s > 0 ? `+${s}` : "" + s;
};
const getStats = ({ asm }) => {
    const commands = {};
    for (const { command, result } of asm) {
        if (result.kind !== "gas") {
            console.error("No gas data for exception");
            continue;
        }
        const gas = result.gas;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- eslint bug
        const c = (commands[command] = commands[command] || {
            count: 0,
            gas: 0,
        });
        c.count += 1;
        c.gas += gas;
    }
    return commands;
};
void main();
