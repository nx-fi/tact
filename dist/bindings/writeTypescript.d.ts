import type { ABIArgument, ContractABI } from "@ton/core";
import type { CompilerContext } from "../context/context";
export type WrappersConstantDescription = {
    readonly name: string;
    readonly value: string | undefined;
    readonly fromContract: boolean;
};
export declare function writeTypescript(abi: ContractABI, ctx: CompilerContext, constants: WrappersConstantDescription[], init?: {
    code: string;
    system: string | null;
    args: ABIArgument[];
    prefix?: {
        value: number;
        bits: number;
    } | undefined;
}): string;
