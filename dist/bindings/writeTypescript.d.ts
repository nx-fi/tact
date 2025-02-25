import type { ABIArgument, ContractABI } from "@ton/core";
import type { CompilerContext } from "../context/context";
export declare function writeTypescript(abi: ContractABI, ctx: CompilerContext, init?: {
    code: string;
    system: string | null;
    args: ABIArgument[];
    prefix?: {
        value: number;
        bits: number;
    } | undefined;
}): string;
