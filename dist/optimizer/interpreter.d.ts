import type * as A from "../ast/ast";
import { CompilerContext } from "../context/context";
import type { AstUtil } from "../ast/util";
import type { Parser } from "../grammar/grammar";
import type { SrcInfo } from "../grammar";
import type { FactoryAst } from "../ast/ast-helpers";
export declare function throwNonFatalErrorConstEval(msg: string, source: SrcInfo): never;
type EvalResult = {
    kind: "ok";
    value: A.AstLiteral;
} | {
    kind: "error";
    message: string;
};
export declare function ensureInt(val: A.AstExpression): A.AstNumber;
export declare function ensureBoolean(val: A.AstExpression): A.AstBoolean;
export declare function ensureString(val: A.AstExpression): A.AstString;
export declare function ensureSimplifiedString(val: A.AstExpression): A.AstSimplifiedString;
export declare function evalUnaryOp(op: A.AstUnaryOperation, valOperand: A.AstLiteral, source: SrcInfo, util: AstUtil): A.AstLiteral;
export declare function evalBinaryOp(op: A.AstBinaryOperation, valLeft: A.AstLiteral, valRightContinuation: () => A.AstLiteral, // It needs to be a continuation, because some binary operators short-circuit
source: SrcInfo, util: AstUtil): A.AstLiteral;
/**
 * @deprecated Strings in Tact fully follow JS grammar. Use JSON.parse(`"${value}"`) instead.
 */
export declare function interpretEscapeSequences(stringLiteral: string, source: SrcInfo): string;
export type InterpreterConfig = {
    maxLoopIterations: bigint;
};
export declare function parseAndEvalExpression(sourceCode: string, ast?: FactoryAst, parser?: Parser, util?: AstUtil): EvalResult;
export declare class Interpreter {
    private envStack;
    private context;
    /**
     * Stores all visited constants during the current computation.
     */
    private visitedConstants;
    /**
     * Stores all constants that were calculated during the computation of some constant,
     * and the functions that were called for this process.
     * Used only in case of circular dependencies to return a clear error.
     */
    private constantComputationPath;
    private config;
    private util;
    constructor(util: AstUtil, context?: CompilerContext, config?: InterpreterConfig);
    /**
     * This is the public access for expression interpretation.
     * @param ast Expression to interpret.
     */
    interpretExpression(expr: A.AstExpression): A.AstLiteral;
    /**
     * This is the public access for statement interpretation.
     * @param stmt Statement to interpret.
     */
    interpretStatement(stmt: A.AstStatement): void;
    /**
     * This is the public access for module item interpretation.
     * @param modItem Module item to interpret.
     */
    interpretModuleItem(modItem: A.AstModuleItem): void;
    private interpretModuleItemInternal;
    private interpretConstantDef;
    private interpretFunctionDef;
    private interpretStructDecl;
    private interpretMessageDecl;
    private interpretPrimitiveTypeDecl;
    private interpretFunctionDecl;
    private interpretContract;
    private interpretTrait;
    private interpretExpressionInternal;
    private interpretName;
    private interpretMethodCall;
    private interpretInitOf;
    private interpretCodeOf;
    private interpretNull;
    private interpretBoolean;
    private interpretNumber;
    private interpretString;
    private interpretSimplifiedString;
    private interpretAddress;
    private interpretCell;
    private interpretSlice;
    private interpretUnaryOp;
    private interpretBinaryOp;
    private interpretConditional;
    private interpretStructInstance;
    private interpretStructValue;
    private interpretFieldAccess;
    private interpretStaticCall;
    private evalStaticFunction;
    private interpretStatementInternal;
    private interpretLetStatement;
    private interpretDestructStatement;
    private interpretAssignStatement;
    private interpretAugmentedAssignStatement;
    private interpretConditionStatement;
    private interpretExpressionStatement;
    private interpretForEachStatement;
    private interpretRepeatStatement;
    private interpretReturnStatement;
    private interpretTryStatement;
    private interpretUntilStatement;
    private interpretWhileStatement;
    private interpretBlockStatement;
    private inComputationPath;
    private formatComputationPath;
    private handleStackOverflow;
}
export {};
