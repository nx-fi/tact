import type { MatchResult } from "ohm-js";
import type { ErrorDisplay } from "../../error/display";
import type { SrcInfo } from "../src-info";
import type { ItemOrigin } from "../../imports/source";
/**
 * @deprecated
 */
export declare const parserErrorSchema: (display: ErrorDisplay<string>) => {
    generic: (matchResult: MatchResult, path: string, origin: ItemOrigin) => never;
    constant: {
        duplicate: (attr: string) => (source: SrcInfo) => never;
        notAbstract: () => (source: SrcInfo) => never;
        tooAbstract: () => (source: SrcInfo) => never;
    };
    function: {
        duplicate: (attr: string) => (source: SrcInfo) => never;
        notAbstract: () => (source: SrcInfo) => never;
        tooAbstract: () => (source: SrcInfo) => never;
    };
    topLevelConstantWithAttribute: () => (source: SrcInfo) => never;
    literalTooLong: () => (source: SrcInfo) => never;
    extraneousComma: () => (source: SrcInfo) => never;
    duplicateField: (name: string) => (source: SrcInfo) => never;
    restShouldBeLast: () => (source: SrcInfo) => never;
    importWithBackslash: () => (source: SrcInfo) => never;
    reservedVarPrefix: (prefix: string) => (source: SrcInfo) => never;
    notCallable: () => (source: SrcInfo) => never;
    noBouncedWithoutArg: () => (source: SrcInfo) => never;
    noBouncedWithString: () => (source: SrcInfo) => never;
    noConstantDecl: () => (source: SrcInfo) => never;
    noFunctionDecl: () => (source: SrcInfo) => never;
    expected: (expects: ReadonlySet<string>) => (source: SrcInfo) => never;
    invalidFuncId: () => (source: SrcInfo) => never;
    reservedFuncId: () => (source: SrcInfo) => never;
    numericFuncId: () => (source: SrcInfo) => never;
    leadingZeroUnderscore: () => (source: SrcInfo) => never;
    noFolderImports: () => (source: SrcInfo) => never;
    invalidImport: () => (source: SrcInfo) => never;
    escapingImport: () => (source: SrcInfo) => never;
    asNotAllowed: () => (source: SrcInfo) => never;
    multipleOptionals: () => (source: SrcInfo) => never;
    onlyOptionalOfNamed: () => (source: SrcInfo) => never;
    genericArgCount: (name: string, expectedCount: number, gotCount: number) => (source: SrcInfo) => never;
    unknownType: (name: string) => (source: SrcInfo) => never;
    onlyBouncedOfNamed: () => (source: SrcInfo) => never;
    mapOnlyOneAs: (name: "key" | "value") => (source: SrcInfo) => never;
    cannotBeOptional: (name: "key" | "value") => (source: SrcInfo) => never;
    onlyTypeId: (name: "key" | "value") => (source: SrcInfo) => never;
    fieldOnlyOneAs: () => (source: SrcInfo) => never;
    noOptionalFieldType: () => (source: SrcInfo) => never;
    fieldMustBeNamed: () => (source: SrcInfo) => never;
    unknownGeneric: () => (source: SrcInfo) => never;
};
/**
 * @deprecated
 */
export type ParserErrors = ReturnType<typeof parserErrorSchema>;
