import type { SendMessageResult } from "@ton/sandbox/dist/blockchain/Blockchain";
export declare function getUsedGas(sendEnough: SendMessageResult): number;
export type BenchmarkResult = {
    label: string;
    pr: string | undefined;
    gas: Record<string, number>;
};
export type RawBenchmarkResult = {
    results: {
        label: string;
        pr: string | null;
        gas: Record<string, string>;
    }[];
};
export declare function generateResults(benchmarkResults: RawBenchmarkResult): BenchmarkResult[];
export declare function printBenchmarkTable(results: BenchmarkResult[]): void;
