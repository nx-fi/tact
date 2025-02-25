import type * as A from "../ast/ast";
import type { CompilerContext } from "./context";
import type { Parser } from "../grammar/grammar";
import type { Source } from "../imports/source";
/**
 * Represents the storage for all AST-related data within the compiler context.
 * @public
 * @property functions AST entries representing top-level functions.
 * @property constants AST entries representing top-level constant definitions.
 * @property types AST entries representing structures, contracts, and traits.
 */
export type AstStore = {
    sources: Source[];
    funcSources: {
        code: string;
        path: string;
    }[];
    functions: (A.AstFunctionDef | A.AstNativeFunctionDecl | A.AstAsmFunctionDef)[];
    constants: A.AstConstantDef[];
    types: A.AstTypeDecl[];
};
/**
 * Retrieves the raw AST for the given context.
 * @public
 * @param ctx The compiler context from which the AST is retrieved.
 * @throws Will throw an error if the AST is not found in the context.
 * @returns The AST types associated with the context.
 */
export declare function getRawAST(ctx: CompilerContext): AstStore;
/**
 * Parses multiple Tact source files into AST modules.
 * @public
 */
export declare function parseModules(sources: Source[], parser: Parser): A.AstModule[];
/**
 * Extends the compiler context by adding AST entries and source information from
 * given sources and parsed programs.
 * @public
 * @param parsedModules An optional array of previously parsed programs. If not defined, they will be parsed from `sources`.
 * @returns The updated compiler context.
 */
export declare function openContext(ctx: CompilerContext, sources: Source[], funcSources: {
    code: string;
    path: string;
}[], parser: Parser, parsedModules?: A.AstModule[]): CompilerContext;
