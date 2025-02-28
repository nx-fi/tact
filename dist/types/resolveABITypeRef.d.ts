import type { ABITypeRef } from "@ton/core";
import type * as A from "../ast/ast";
import type { TypeRef } from "./types";
import type { CompilerContext } from "../context/context";
import type { SrcInfo } from "../grammar";
type FormatDef = Record<string, {
    type: string;
    format: string | number;
} | undefined>;
export declare const intMapKeyFormats: FormatDef;
export declare const intMapValFormats: FormatDef;
type ResolveTypeOptions = {
    readonly type: A.AstType;
    readonly as: A.AstId | null;
    readonly loc: SrcInfo;
};
export declare function resolveABIType({ type, as, loc, }: ResolveTypeOptions): ABITypeRef;
export declare function createABITypeRefFromTypeRef(ctx: CompilerContext, src: TypeRef, loc: SrcInfo): ABITypeRef;
export {};
