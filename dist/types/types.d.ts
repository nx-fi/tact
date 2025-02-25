import type { ABIField } from "@ton/core";
import type * as A from "../ast/ast";
import type { SrcInfo } from "../grammar";
import type { ItemOrigin } from "../imports/source";
export type TypeDescription = {
    kind: "struct" | "primitive_type_decl" | "contract" | "trait";
    origin: ItemOrigin;
    name: string;
    uid: number;
    header: A.AstNumber | null;
    tlb: string | null;
    signature: string | null;
    fields: FieldDescription[];
    partialFieldCount: number;
    traits: TypeDescription[];
    functions: Map<string, FunctionDescription>;
    receivers: ReceiverDescription[];
    init: InitDescription | null;
    ast: A.AstTypeDecl;
    dependsOn: TypeDescription[];
    interfaces: string[];
    constants: ConstantDescription[];
};
export type TypeRef = {
    kind: "ref";
    name: string;
    optional: boolean;
} | {
    kind: "map";
    key: string;
    keyAs: string | null;
    value: string;
    valueAs: string | null;
} | {
    kind: "ref_bounced";
    name: string;
} | {
    kind: "void";
} | {
    kind: "null";
};
export declare function showValue(val: A.AstLiteral): string;
export type FieldDescription = {
    name: string;
    index: number;
    type: TypeRef;
    as: string | null;
    default: A.AstLiteral | undefined;
    loc: SrcInfo;
    ast: A.AstFieldDecl;
    abi: ABIField;
};
export type ConstantDescription = {
    name: string;
    type: TypeRef;
    value: A.AstLiteral | undefined;
    loc: SrcInfo;
    ast: A.AstConstantDef | A.AstConstantDecl;
};
export type FunctionParameter = {
    name: A.AstId;
    type: TypeRef;
    loc: SrcInfo;
};
export type InitParameter = {
    name: A.AstId;
    type: TypeRef;
    as: string | null;
    loc: SrcInfo;
};
export type FunctionDescription = {
    name: string;
    origin: ItemOrigin;
    isGetter: boolean;
    methodId: number | null;
    isMutating: boolean;
    isOverride: boolean;
    isVirtual: boolean;
    isAbstract: boolean;
    isInline: boolean;
    self: TypeRef | null;
    returns: TypeRef;
    params: FunctionParameter[];
    ast: A.AstFunctionDef | A.AstNativeFunctionDecl | A.AstFunctionDecl | A.AstAsmFunctionDef;
};
export type BinaryReceiverSelector = {
    kind: "internal-binary";
    type: string;
    name: A.AstId;
} | {
    kind: "bounce-binary";
    name: A.AstId;
    type: string;
    bounced: boolean;
} | {
    kind: "external-binary";
    type: string;
    name: A.AstId;
};
export type CommentReceiverSelector = {
    kind: "internal-comment";
    comment: string;
} | {
    kind: "external-comment";
    comment: string;
};
type EmptyReceiverSelector = {
    kind: "internal-empty";
} | {
    kind: "external-empty";
};
export type FallbackReceiverSelector = {
    kind: "internal-comment-fallback";
    name: A.AstId;
} | {
    kind: "internal-fallback";
    name: A.AstId;
} | {
    kind: "bounce-fallback";
    name: A.AstId;
} | {
    kind: "external-comment-fallback";
    name: A.AstId;
} | {
    kind: "external-fallback";
    name: A.AstId;
};
export type ReceiverSelector = BinaryReceiverSelector | CommentReceiverSelector | EmptyReceiverSelector | FallbackReceiverSelector;
export declare function receiverSelectorName(selector: ReceiverSelector): string;
export type ReceiverDescription = {
    selector: ReceiverSelector;
    ast: A.AstReceiver;
};
export type InitDescription = {
    params: InitParameter[];
    ast: A.AstContractInit;
};
export declare function printTypeRef(src: TypeRef): string;
export declare function typeRefEquals(a: TypeRef, b: TypeRef): boolean;
export {};
