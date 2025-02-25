"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const zod_1 = require("zod");
const runBenchmark = (specPath) => {
    return new Promise((resolve) => {
        (0, child_process_1.exec)(`yarn jest --json ${specPath}`, (_, stdout) => {
            resolve(stdout);
        });
    });
};
const JestStatusStringEnum = zod_1.z.enum(["passed", "failed"]);
const JestOutputSchema = zod_1.z.object({
    success: zod_1.z.literal(false), // if this is true, we don't need to update benchmark results
    testResults: zod_1.z
        .array(zod_1.z.object({
        assertionResults: zod_1.z.array(zod_1.z.object({
            status: JestStatusStringEnum,
            title: zod_1.z.string(),
            failureDetails: zod_1.z.array(zod_1.z.object({
                matcherResult: zod_1.z.object({
                    actual: zod_1.z.number(),
                    expected: zod_1.z.number(),
                }),
            })),
        })),
    }))
        .nonempty(),
});
const parseBenchmarkOutput = (output) => {
    const jestOutput = output.split("\n")[1];
    if (typeof jestOutput === "undefined") {
        return;
    }
    const jestParseResult = JestOutputSchema.safeParse(JSON.parse(jestOutput));
    if (!jestParseResult.success) {
        return;
    }
    const jestData = jestParseResult.data;
    const gasUpdates = {};
    jestData.testResults[0].assertionResults
        .filter((assertion) => assertion.status === "failed" &&
        typeof assertion.failureDetails[0] !== "undefined")
        .forEach((assertion) => {
        gasUpdates[assertion.title] =
            assertion.failureDetails[0].matcherResult.actual;
    });
    return {
        label: `Benchmark ${new Date().toISOString().split("T")[0]}`,
        pr: undefined,
        gas: gasUpdates,
    };
};
const updateResultsFile = async (filePath, newResult) => {
    const fileContent = await (0, promises_1.readFile)(filePath, "utf-8");
    const benchmarkResults = JSON.parse(fileContent);
    const lastResult = benchmarkResults.results.at(-1);
    if (typeof lastResult === "undefined") {
        return;
    }
    benchmarkResults.results.push({
        label: newResult.label,
        pr: newResult.pr ?? null,
        gas: Object.fromEntries(Object.entries(lastResult.gas).map(([key, value]) => [
            key,
            newResult.gas[key] ? newResult.gas[key].toString() : value,
        ])),
    });
    await (0, promises_1.writeFile)(filePath, JSON.stringify(benchmarkResults, null, 2));
};
const main = async () => {
    try {
        const benchmarkPaths = [
            (0, path_1.join)(__dirname, "jetton", "jetton.spec.ts"),
            (0, path_1.join)(__dirname, "escrow", "escrow.spec.ts"),
        ];
        const fetchBenchmarkResults = async (specPath) => {
            console.log(`Running benchmark: ${specPath}`);
            const output = await runBenchmark(specPath);
            const newResult = parseBenchmarkOutput(output);
            if (typeof newResult === "undefined") {
                return;
            }
            const resultsFilePath = (0, path_1.join)(specPath, "..", "results.json");
            await updateResultsFile(resultsFilePath, newResult);
            console.log(`Updated benchmarks for ${resultsFilePath}`);
        };
        await Promise.all(benchmarkPaths.map(fetchBenchmarkResults));
    }
    catch (error) {
        console.error(error);
    }
};
void main();
