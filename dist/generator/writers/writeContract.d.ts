import type { InitDescription, TypeDescription } from "../../types/types";
import type { WriterContext } from "../Writer";
import type { ItemOrigin } from "../../imports/source";
export type ContractsCodes = Record<string, {
    codeBoc: Buffer;
    abi: string;
} | undefined>;
export declare function writeStorageOps(type: TypeDescription, origin: ItemOrigin, ctx: WriterContext): void;
export declare function writeInit(t: TypeDescription, init: InitDescription, ctx: WriterContext, codes: ContractsCodes): void;
export declare function writeMainContract(contract: TypeDescription, abiLink: string, wCtx: WriterContext): void;
