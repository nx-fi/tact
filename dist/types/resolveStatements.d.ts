import type * as A from "../ast/ast";
import type { CompilerContext } from "../context/context";
import type { FactoryAst } from "../ast/ast-helpers";
import type { TypeRef } from "./types";
import type { SrcInfo } from "../grammar";
export type StatementContext = {
    root: SrcInfo;
    funName: string | null;
    returns: TypeRef;
    vars: Map<string, TypeRef>;
    requiredFields: string[];
};
export declare function emptyContext(root: SrcInfo, funName: string | null, returns: TypeRef): StatementContext;
export declare function addVariable(name: A.AstId, ref: TypeRef, ctx: CompilerContext, sctx: StatementContext): StatementContext;
export declare function isLvalue(path: A.AstId[], ctx: CompilerContext): boolean;
export declare function resolveStatements(ctx: CompilerContext, Ast: FactoryAst): CompilerContext;
