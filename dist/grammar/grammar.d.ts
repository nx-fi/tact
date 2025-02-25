import type { FactoryAst } from "../ast/ast-helpers";
import type * as A from "../ast/ast";
import type { Source } from "../imports/source";
export type Parser = {
    parse: (source: Source) => A.AstModule;
    parseExpression: (sourceCode: string) => A.AstExpression;
    parseImports: (source: Source) => A.AstImport[];
    parseStatement: (sourceCode: string) => A.AstStatement;
};
export declare const defaultParser = "new";
export declare const getParser: (ast: FactoryAst, version: "old" | "new") => Parser;
