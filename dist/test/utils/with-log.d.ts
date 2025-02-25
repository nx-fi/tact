import type { Blockchain } from "@ton/sandbox";
import { type Transaction } from "./parse-log";
export declare function withLog<T>(blockchain: Blockchain, callback: () => Promise<T>): Promise<{
    result: T;
    transactions: readonly Transaction[];
}>;
