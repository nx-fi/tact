import type * as A from "../../ast/ast";
import type { FactoryAst } from "../../ast/ast-helpers";
import type { Source } from "../../imports/source";
export declare const getParser: (ast: FactoryAst) => {
    parse: (source: Source) => A.AstModule;
    parseExpression: (code: string) => A.AstExpression;
    parseImports: (source: Source) => A.AstImport[];
    parseStatement: (code: string) => A.AstStatement;
};
