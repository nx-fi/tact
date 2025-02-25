import type * as A from "../../ast/ast";
import type { FactoryAst } from "../../ast/ast-helpers";
import type { Source } from "../../imports/source";
/**
 * @deprecated
 */
export declare const getParser: (ast: FactoryAst) => {
    parse: ({ code, origin, path }: Source) => A.AstModule;
    parseExpression: (code: string) => A.AstExpression;
    parseImports: ({ code, origin, path }: Source) => A.AstImport[];
    parseStatement: (code: string) => A.AstStatement;
};
