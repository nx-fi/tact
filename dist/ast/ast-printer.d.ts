import type * as A from "./ast";
import { astNumToString, idText } from "./ast-helpers";
export declare const ppAstTypeId: typeof idText;
export declare const ppAstTypeIdWithStorage: (type: A.AstTypeId, storageType: A.AstId | null) => string;
export declare const ppAstMapType: ({ keyType, keyStorageType, valueType, valueStorageType, }: A.AstMapType) => string;
export declare const ppAstBouncedMessageType: ({ messageType, }: A.AstBouncedMessageType) => string;
export declare const ppAstOptionalType: ({ typeArg }: A.AstOptionalType) => string;
export declare const ppAstType: (input: A.AstType) => string;
export declare const unaryOperatorType: Record<A.AstUnaryOperation, "post" | "pre">;
export declare const checkPostfix: (operator: A.AstUnaryOperation) => boolean;
/**
 * Description of precedence of certain type of AST node
 */
export type Precedence = {
    /**
     * Add parentheses around `code` if in this `parent` position we need brackets
     * @param check Position-checking function from parent
     * @param code Code to put parentheses around
     * @returns
     */
    brace: (position: (childPrecedence: number) => boolean, code: string) => string;
    /**
     * Used in positions where grammar rule mentions itself
     *
     * Passed down when a position allows same unparenthesized operator
     * For example, on left side of addition we can use another addition without
     * parentheses: `1 + 2 + 3` means `(1 + 2) + 3`. Thus for left-associative
     * operators we pass `self` to their left argument printer.
     */
    self: (childPrecedence: number) => boolean;
    /**
     * Used in positions where grammar rule mentions other rule
     *
     * Passed down when a position disallows same unparenthesized operator
     * For example, on the right side of subtraction we can't use another subtraction
     * without parentheses: `1 - (2 - 3)` is not the same as `(1 - 2) - 3`. Thus for
     * left-associative operators we pass `child` to their right argument printer.
     */
    child: (childPrecedence: number) => boolean;
};
/**
 * Given numeric value of precedence, where higher values stand for higher binding power,
 * create a helper object for precedence checking
 */
export declare const makePrecedence: (myPrecedence: number) => Precedence;
export declare const lowestPrecedence: Precedence;
export declare const conditionalPrecedence: Precedence;
export declare const binaryPrecedence: Readonly<Record<A.AstBinaryOperation, Precedence>>;
export declare const prefixPrecedence: Precedence;
export declare const postfixPrecedence: Precedence;
/**
 * Expression printer takes an expression and a function from parent AST node printer that checks
 * whether expressions with given precedence should be parenthesized in parent context
 */
export type ExprPrinter<T> = (expr: T) => (check: (childPrecedence: number) => boolean) => string;
/**
 * Wrapper for AST nodes that should never be parenthesized, and thus do not require information
 * about the position they're printed in
 *
 * Takes a regular printer function and returns corresponding ExprPrinter that ignores all
 * position and precedence information
 */
export declare const ppLeaf: <T>(printer: (t: T) => string) => ExprPrinter<T>;
export declare const ppExprArgs: (args: readonly A.AstExpression[]) => string;
export declare const ppAstStructFieldInit: (param: A.AstStructFieldInitializer) => string;
export declare const ppAstStructFieldValue: (param: A.AstStructFieldValue) => string;
export declare const ppAstStructInstance: ({ type, args }: A.AstStructInstance) => string;
export declare const ppAstStructValue: ({ type, args }: A.AstStructValue) => string;
export declare const ppAstInitOf: ({ contract, args }: A.AstInitOf) => string;
export declare const ppAstCodeOf: ({ contract }: A.AstCodeOf) => string;
export declare const ppAstNumber: typeof astNumToString;
export declare const ppAstBoolean: ({ value }: A.AstBoolean) => string;
export declare const ppAstId: ({ text }: A.AstId) => string;
export declare const ppAstNull: (_expr: A.AstNull) => string;
export declare const ppAstString: ({ value }: A.AstString) => string;
export declare const ppAstSimplifiedString: ({ value }: A.AstSimplifiedString) => string;
export declare const ppAstAddress: ({ value }: A.AstAddress) => string;
export declare const ppAstCell: ({ value }: A.AstCell) => string;
export declare const ppAstSlice: ({ value }: A.AstSlice) => string;
export declare const ppAstStaticCall: ({ function: func, args }: A.AstStaticCall) => string;
export declare const ppAstMethodCall: ExprPrinter<A.AstMethodCall>;
export declare const ppAstFieldAccess: ExprPrinter<A.AstFieldAccess>;
export declare const ppAstOpUnary: ExprPrinter<A.AstOpUnary>;
export declare const ppAstOpBinary: ExprPrinter<A.AstOpBinary>;
export declare const ppAstConditional: ExprPrinter<A.AstConditional>;
export declare const ppAstExpressionNested: (input: A.AstExpression) => (check: (childPrecedence: number) => boolean) => string;
export declare const ppAstExpression: (expr: A.AstExpression) => string;
/**
 * An intermediate language that is only concerned of spacing and indentation
 */
type Context<U> = {
    /**
     * Line of code with \n implied
     */
    row: (s: string) => U;
    /**
     * Stacks lines after each other
     */
    block: (rows: readonly U[]) => U;
    /**
     * Similar to `block`, but adjacent lines of groups get concatenated
     * [a, b] + [c, d] = [a, bc, d]
     */
    concat: (rows: readonly U[]) => U;
    /**
     * Same as `indent`, but indents `rows` 1 level deeper and adds `{` and `}`
     */
    braced: (rows: readonly U[]) => U;
    /**
     * Print a list of `items` with `print`
     */
    list: <T>(items: readonly T[], print: Printer<T>) => readonly U[];
    /**
     * Display `items` with `print` in groups distinguished by return value of `getTag`
     */
    grouped: <T, V>(options: {
        items: readonly T[];
        /**
         * Items with the same tag are displayed without extra empty line between them
         *
         * Use NaN for tag whenever items should always be displayed with empty line,
         * because NaN !== NaN
         */
        getTag: (t: T) => V;
        print: Printer<T>;
    }) => readonly U[];
};
/**
 * Prints AST node of type `T` into an intermediate language of row of type `U`
 *
 * We enforce `U` to be a generic argument so that no implementation can (ab)use
 * the fact it's a string and generate some indentation without resorting to
 * methods of `Context`.
 */
type Printer<T> = (item: T) => <U>(ctx: Context<U>) => U;
export declare const ppAstModule: Printer<A.AstModule>;
export declare const ppAstStruct: Printer<A.AstStructDecl>;
export declare const ppAstContract: Printer<A.AstContract>;
export declare const ppAstPrimitiveTypeDecl: Printer<A.AstPrimitiveTypeDecl>;
export declare const ppAstFunctionDef: Printer<A.AstFunctionDef>;
export declare const ppAsmShuffle: ({ args, ret }: A.AstAsmShuffle) => string;
export declare const ppAstAsmFunctionDef: Printer<A.AstAsmFunctionDef>;
export declare const ppAstNativeFunction: Printer<A.AstNativeFunctionDecl>;
export declare const ppAstTrait: Printer<A.AstTrait>;
export declare const ppAstConstant: Printer<A.AstConstantDef>;
export declare const ppAstMessage: Printer<A.AstMessageDecl>;
export declare const ppModuleItem: Printer<A.AstModuleItem>;
export declare const ppAstFieldDecl: Printer<A.AstFieldDecl>;
export declare const ppAstReceiver: Printer<A.AstReceiver>;
export declare const ppAstFunctionDecl: Printer<A.AstFunctionDecl>;
export declare const ppAstConstDecl: Printer<A.AstConstantDecl>;
export declare const ppTraitBody: Printer<A.AstTraitDeclaration>;
export declare const ppAstInitFunction: Printer<A.AstContractInit>;
export declare const ppContractBody: Printer<A.AstContractDeclaration>;
export declare const ppAstImport: Printer<A.AstImport>;
export declare const ppAstFunctionSignature: ({ name, attributes, return: retTy, params, }: A.AstFunctionDef | A.AstAsmFunctionDef | A.AstFunctionDecl) => string;
export declare const ppAstFunctionAttribute: (attr: A.AstFunctionAttribute) => string;
export declare const ppReceiverSubKind: (input: A.AstReceiverSubKind) => string;
export declare const ppAstReceiverKind: (input: A.AstReceiverKind) => string;
export declare const ppAstFuncId: (func: A.AstFuncId) => string;
export declare const ppStatementBlock: Printer<readonly A.AstStatement[]>;
export declare const ppAsmInstructionsBlock: Printer<readonly A.AstAsmInstruction[]>;
export declare const ppAstStatementLet: Printer<A.AstStatementLet>;
export declare const ppAstStatementReturn: Printer<A.AstStatementReturn>;
export declare const ppAstStatementExpression: Printer<A.AstStatementExpression>;
export declare const ppAstStatementAssign: Printer<A.AstStatementAssign>;
export declare const ppAstStatementAugmentedAssign: Printer<A.AstStatementAugmentedAssign>;
export declare const ppAstStatementCondition: Printer<A.AstStatementCondition>;
export declare const ppAstStatementWhile: Printer<A.AstStatementWhile>;
export declare const ppAstStatementRepeat: Printer<A.AstStatementRepeat>;
export declare const ppAstStatementUntil: Printer<A.AstStatementUntil>;
export declare const ppAstStatementForEach: Printer<A.AstStatementForEach>;
export declare const ppAstStatementTry: Printer<A.AstStatementTry>;
export declare const ppAstStatementDestruct: Printer<A.AstStatementDestruct>;
export declare const ppTypedParameter: Printer<A.AstTypedParameter>;
export declare const ppAstStatementBlock: Printer<A.AstStatementBlock>;
export declare const ppAstStatement: Printer<A.AstStatement>;
export declare const exprNode: <T>(exprPrinter: (expr: T) => string) => Printer<T>;
export declare const ppAstNode: Printer<A.AstNode>;
/**
 * Pretty-prints an AST node into a string representation.
 * @param node The AST node to format.
 * @returns A string that represents the formatted AST node.
 */
export declare const prettyPrint: (node: A.AstNode) => string;
export {};
