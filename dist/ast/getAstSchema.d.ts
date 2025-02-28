/**
 * AST node constructors are not just constructors: they also generate ids
 * We have this file so that the "current id" state would not be stored globally
 */
import type { Loc } from "@tonstudio/parser-runtime";
import type * as A from "./ast";
import type { FactoryAst } from "../ast/ast-helpers";
import type { SrcInfo } from "../grammar/src-info";
export declare const getAstSchema: (factory: FactoryAst, toSrcInfo: (location: Loc) => SrcInfo) => {
    Module: (imports: A.AstImport[], items: A.AstModuleItem[]) => A.AstModule;
    Import: (source: A.ImportPath, loc: Loc) => A.AstImport;
    PrimitiveTypeDecl: (name: A.AstId, loc: Loc) => A.AstPrimitiveTypeDecl;
    FunctionDef: (attributes: A.AstFunctionAttribute[], name: A.AstId, retType: A.AstType | null, params: A.AstTypedParameter[], statements: A.AstStatement[], loc: Loc) => A.AstFunctionDef;
    AsmFunctionDef: (shuffle: A.AstAsmShuffle, attributes: A.AstFunctionAttribute[], name: A.AstId, retType: A.AstType | null, params: A.AstTypedParameter[], instructions: A.AstAsmInstruction[], loc: Loc) => A.AstAsmFunctionDef;
    FunctionDecl: (attributes: A.AstFunctionAttribute[], name: A.AstId, retType: A.AstType | null, params: A.AstTypedParameter[], loc: Loc) => A.AstFunctionDecl;
    NativeFunctionDecl: (attributes: A.AstFunctionAttribute[], name: A.AstId, nativeName: A.AstFuncId, params: A.AstTypedParameter[], retType: A.AstType | null, loc: Loc) => A.AstNativeFunctionDecl;
    ConstantDef: (attributes: A.AstConstantAttribute[], name: A.AstId, type: A.AstType, initializer: A.AstExpression, loc: Loc) => A.AstConstantDef;
    ConstantDecl: (attributes: A.AstConstantAttribute[], name: A.AstId, type: A.AstType, loc: Loc) => A.AstConstantDecl;
    StructDecl: (name: A.AstId, fields: A.AstFieldDecl[], loc: Loc) => A.AstStructDecl;
    MessageDecl: (name: A.AstId, opcode: A.AstExpression | null, fields: A.AstFieldDecl[], loc: Loc) => A.AstMessageDecl;
    Contract: (name: A.AstId, traits: A.AstId[], attributes: A.AstContractAttribute[], params: undefined | readonly A.AstFieldDecl[], declarations: A.AstContractDeclaration[], loc: Loc) => A.AstContract;
    Trait: (name: A.AstId, traits: A.AstId[], attributes: A.AstContractAttribute[], declarations: A.AstTraitDeclaration[], loc: Loc) => A.AstTrait;
    FieldDecl: (name: A.AstId, type: A.AstType, initializer: A.AstExpression | null, as: A.AstId | null, loc: Loc) => A.AstFieldDecl;
    Receiver: (selector: A.AstReceiverKind, statements: A.AstStatement[], loc: Loc) => A.AstReceiver;
    ReceiverSimple: (param: A.AstTypedParameter) => A.AstReceiverSimple;
    ReceiverFallback: () => A.AstReceiverFallback;
    ReceiverComment: (comment: A.AstString) => A.AstReceiverComment;
    ReceiverInternal: (subKind: A.AstReceiverSubKind, loc: Loc) => A.AstReceiverInternal;
    ReceiverExternal: (subKind: A.AstReceiverSubKind, loc: Loc) => A.AstReceiverExternal;
    ReceiverBounce: (param: A.AstTypedParameter, loc: Loc) => A.AstReceiverBounce;
    ContractInit: (params: A.AstTypedParameter[], statements: A.AstStatement[], loc: Loc) => A.AstContractInit;
    StatementLet: (name: A.AstId, type: A.AstType | null, expression: A.AstExpression, loc: Loc) => A.AstStatementLet;
    StatementDestruct: (type: A.AstTypeId, identifiers: Map<string, [A.AstId, A.AstId]>, ignoreUnspecifiedFields: boolean, expression: A.AstExpression, loc: Loc) => A.AstStatementDestruct;
    StatementReturn: (expression: A.AstExpression | null, loc: Loc) => A.AstStatementReturn;
    StatementExpression: (expression: A.AstExpression, loc: Loc) => A.AstStatementExpression;
    StatementAssign: (path: A.AstExpression, expression: A.AstExpression, loc: Loc) => A.AstStatementAssign;
    StatementAugmentedAssign: (op: A.AstAugmentedAssignOperation, path: A.AstExpression, expression: A.AstExpression, loc: Loc) => A.AstStatementAugmentedAssign;
    StatementCondition: (condition: A.AstExpression, trueStatements: A.AstStatement[], falseStatements: A.AstStatement[] | null, loc: Loc) => A.AstStatementCondition;
    StatementWhile: (condition: A.AstExpression, statements: A.AstStatement[], loc: Loc) => A.AstStatementWhile;
    StatementUntil: (condition: A.AstExpression, statements: A.AstStatement[], loc: Loc) => A.AstStatementUntil;
    StatementRepeat: (iterations: A.AstExpression, statements: A.AstStatement[], loc: Loc) => A.AstStatementRepeat;
    StatementTry: (statements: A.AstStatement[], loc: Loc, catchBlock?: {
        catchName: A.AstId;
        catchStatements: A.AstStatement[];
    }) => A.AstStatementTry;
    StatementForEach: (keyName: A.AstId, valueName: A.AstId, map: A.AstExpression, statements: A.AstStatement[], loc: Loc) => A.AstStatementForEach;
    StatementBlock: (statements: A.AstStatement[], loc: Loc) => A.AstStatementBlock;
    TypeId: (text: string, loc: Loc) => A.AstTypeId;
    OptionalType: (typeArg: A.AstType, loc: Loc) => A.AstOptionalType;
    MapType: (keyType: A.AstTypeId, keyStorageType: A.AstId | null, valueType: A.AstTypeId, valueStorageType: A.AstId | null, loc: Loc) => A.AstMapType;
    BouncedMessageType: (messageType: A.AstTypeId, loc: Loc) => A.AstBouncedMessageType;
    OpBinary: (op: A.AstBinaryOperation, left: A.AstExpression, right: A.AstExpression, loc: Loc) => A.AstOpBinary;
    OpUnary: (op: A.AstUnaryOperation, operand: A.AstExpression, loc: Loc) => A.AstOpUnary;
    FieldAccess: (aggregate: A.AstExpression, field: A.AstId, loc: Loc) => A.AstFieldAccess;
    MethodCall: (self: A.AstExpression, method: A.AstId, args: A.AstExpression[], loc: Loc) => A.AstMethodCall;
    StaticCall: (funcId: A.AstId, args: A.AstExpression[], loc: Loc) => A.AstStaticCall;
    StructInstance: (type: A.AstId, args: A.AstStructFieldInitializer[], loc: Loc) => A.AstStructInstance;
    StructFieldInitializer: (field: A.AstId, initializer: A.AstExpression, loc: Loc) => A.AstStructFieldInitializer;
    InitOf: (contract: A.AstId, args: A.AstExpression[], loc: Loc) => A.AstInitOf;
    CodeOf: (contract: A.AstId, loc: Loc) => A.AstCodeOf;
    Conditional: (condition: A.AstExpression, thenBranch: A.AstExpression, elseBranch: A.AstExpression, loc: Loc) => A.AstConditional;
    Id: (text: string, loc: Loc) => A.AstId;
    FuncId: (text: string, loc: Loc) => A.AstFuncId;
    Null: (loc: Loc) => A.AstNull;
    String: (value: string, loc: Loc) => A.AstString;
    Boolean: (value: boolean, loc: Loc) => A.AstBoolean;
    Number: (base: A.AstNumberBase, value: bigint, loc: Loc) => A.AstNumber;
    ContractAttribute: (name: A.AstString, loc: Loc) => A.AstContractAttribute;
    FunctionAttributeGet: (methodId: A.AstExpression | null, loc: Loc) => A.AstFunctionAttributeGet;
    FunctionAttribute: (type: A.AstFunctionAttributeName, loc: Loc) => A.AstFunctionAttributeRest;
    ConstantAttribute: (type: A.AstConstantAttributeName, loc: Loc) => A.AstConstantAttribute;
    TypedParameter: (name: A.AstId, type: A.AstType, loc: Loc) => A.AstTypedParameter;
};
/**
 * List of all constructors for AST nodes
 */
export type AstSchema = ReturnType<typeof getAstSchema>;
