export type Loc = {
    readonly hash: string;
    readonly offset: string;
};
export type AsmResult = AsmGas | AsmException;
export type AsmGas = {
    readonly kind: "gas";
    readonly gas: number;
};
export type AsmException = {
    readonly kind: "exception";
    readonly no: number;
    readonly message: string;
};
export type Asm = {
    readonly command: string;
    readonly args: string;
    readonly location: Loc | undefined;
    readonly result: AsmResult;
};
export type Transaction = {
    readonly asm: readonly Asm[];
    readonly used: number;
    readonly debug: string | undefined;
};
export type Log = {
    readonly name: string;
    readonly transactions: readonly Transaction[];
};
export declare const parseLog: (path: string) => Promise<Log[]>;
export declare const getTransactions: (messages: readonly string[]) => Transaction[];
