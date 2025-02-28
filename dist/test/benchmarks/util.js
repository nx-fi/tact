"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsedGas = getUsedGas;
exports.generateResults = generateResults;
exports.printBenchmarkTable = printBenchmarkTable;
const chalk_1 = __importDefault(require("chalk"));
const cli_table3_1 = __importDefault(require("cli-table3"));
function getUsedGas(sendEnough) {
    return sendEnough.transactions
        .slice(1)
        .map((t) => t.description.type === "generic" &&
        t.description.computePhase.type === "vm"
        ? Number(t.description.computePhase.gasUsed)
        : 0)
        .reduceRight((prev, cur) => prev + cur);
}
function generateResults(benchmarkResults) {
    return benchmarkResults.results.map((result) => ({
        label: result.label,
        pr: result.pr ?? undefined,
        gas: Object.fromEntries(Object.entries(result.gas).map(([key, value]) => [
            key,
            Number(value),
        ])),
    }));
}
function calculateChange(prev, curr) {
    const change = (((curr - prev) / prev) * 100).toFixed(2);
    const number = parseFloat(change);
    if (number === 0) {
        return chalk_1.default.gray(`same`);
    }
    return number >= 0
        ? chalk_1.default.redBright(`(+${change}%)`)
        : chalk_1.default.green(`(${change}%)`);
}
function calculateChanges(results, metrics) {
    return results.reduce((changes, currentResult, index) => {
        if (index === 0) {
            return [metrics.map(() => "")];
        }
        const previousResult = results.at(index - 1);
        const rowChanges = typeof previousResult !== "undefined"
            ? metrics.map((metric) => calculateChange(previousResult.gas[metric], currentResult.gas[metric]))
            : [];
        return [...changes, rowChanges];
    }, []);
}
function printBenchmarkTable(results) {
    const METRICS = Object.keys(results[0].gas);
    if (results.length === 0) {
        console.log("No benchmark results to display.");
        return;
    }
    const table = new cli_table3_1.default({
        head: ["Run", ...METRICS, "PR #"],
        style: {
            head: ["cyan"],
            border: ["gray"],
        },
    });
    const changes = calculateChanges(results, METRICS);
    results
        .map(({ label, gas, pr: commit }, i) => [
        label,
        ...METRICS.map((metric, j) => `${gas[metric]} ${changes[i]?.[j]}`),
        commit
            ? commit.substring(commit.lastIndexOf("/") + 1, commit.lastIndexOf("/") + 8)
            : "-",
    ])
        .forEach((arr) => {
        table.push(arr);
    });
    const output = [];
    output.push(table.toString());
    const first = results[0];
    const last = results[results.length - 1];
    output.push("\nComparison with FunC implementation:");
    output.push(...METRICS.map((metric) => {
        const ratio = (Number(last.gas[metric]) / Number(first.gas[metric])) * 100;
        return `${metric.charAt(0).toUpperCase() + metric.slice(1)}: ${ratio > 100
            ? chalk_1.default.redBright(`${ratio.toFixed(2)}%`)
            : chalk_1.default.green(`${ratio.toFixed(2)}%`)} of FunC gas usage`;
    }));
    console.log(output.join("\n"));
}
