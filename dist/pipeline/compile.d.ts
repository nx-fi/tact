import type { CompilerContext } from "../context/context";
import type { ContractsCodes } from "../generator/writers/writeContract";
export declare function compile(ctx: CompilerContext, name: string, basename: string, contractCodes: ContractsCodes): Promise<{
    output: {
        entrypoint: string;
        files: {
            name: string;
            code: string;
        }[];
        abi: string;
    };
    ctx: CompilerContext;
}>;
