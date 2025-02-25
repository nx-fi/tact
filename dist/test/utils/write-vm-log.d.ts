import type { Blockchain } from "@ton/sandbox";
type WriteLogParams = {
    readonly blockchain: Blockchain;
    readonly path: string;
};
export declare const writeLog: ({ blockchain, path }: WriteLogParams) => <T>(name: string, callback: () => Promise<T>) => Promise<T>;
export type Step = ReturnType<typeof writeLog>;
export {};
