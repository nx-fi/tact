import { Cell, Slice, Address, Builder, ContractProvider, Contract, ContractABI } from '@ton/core';
export type DataSize = {
    $$type: 'DataSize';
    cells: bigint;
    bits: bigint;
    refs: bigint;
};
export declare function storeDataSize(src: DataSize): (builder: Builder) => void;
export declare function loadDataSize(slice: Slice): {
    $$type: "DataSize";
    cells: bigint;
    bits: bigint;
    refs: bigint;
};
export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
};
export declare function storeStateInit(src: StateInit): (builder: Builder) => void;
export declare function loadStateInit(slice: Slice): {
    $$type: "StateInit";
    code: Cell;
    data: Cell;
};
export type Context = {
    $$type: 'Context';
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
};
export declare function storeContext(src: Context): (builder: Builder) => void;
export declare function loadContext(slice: Slice): {
    $$type: "Context";
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
};
export type SendParameters = {
    $$type: 'SendParameters';
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
};
export declare function storeSendParameters(src: SendParameters): (builder: Builder) => void;
export declare function loadSendParameters(slice: Slice): {
    $$type: "SendParameters";
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
};
export type MessageParameters = {
    $$type: 'MessageParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
};
export declare function storeMessageParameters(src: MessageParameters): (builder: Builder) => void;
export declare function loadMessageParameters(slice: Slice): {
    $$type: "MessageParameters";
    mode: bigint;
    body: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
};
export type DeployParameters = {
    $$type: 'DeployParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
};
export declare function storeDeployParameters(src: DeployParameters): (builder: Builder) => void;
export declare function loadDeployParameters(slice: Slice): {
    $$type: "DeployParameters";
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: {
        $$type: "StateInit";
        code: Cell;
        data: Cell;
    };
};
export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
};
export declare function storeStdAddress(src: StdAddress): (builder: Builder) => void;
export declare function loadStdAddress(slice: Slice): {
    $$type: "StdAddress";
    workchain: bigint;
    address: bigint;
};
export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
};
export declare function storeVarAddress(src: VarAddress): (builder: Builder) => void;
export declare function loadVarAddress(slice: Slice): {
    $$type: "VarAddress";
    workchain: bigint;
    address: Slice;
};
export type BasechainAddress = {
    $$type: 'BasechainAddress';
    hash: bigint | null;
};
export declare function storeBasechainAddress(src: BasechainAddress): (builder: Builder) => void;
export declare function loadBasechainAddress(slice: Slice): {
    $$type: "BasechainAddress";
    hash: bigint | null;
};
export type Message = {
    $$type: 'Message';
    msg: string;
};
export declare function storeMessage(src: Message): (builder: Builder) => void;
export declare function loadMessage(slice: Slice): {
    $$type: "Message";
    msg: string;
};
export type Empty = {
    $$type: 'Empty';
};
export declare function storeEmpty(src: Empty): (builder: Builder) => void;
export declare function loadEmpty(slice: Slice): {
    $$type: "Empty";
};
export type BinaryIntOperation = {
    $$type: 'BinaryIntOperation';
    op: string;
    val1: bigint;
    val2: bigint;
};
export declare function storeBinaryIntOperation(src: BinaryIntOperation): (builder: Builder) => void;
export declare function loadBinaryIntOperation(slice: Slice): {
    $$type: "BinaryIntOperation";
    op: string;
    val1: bigint;
    val2: bigint;
};
export type BinaryIntResult = {
    $$type: 'BinaryIntResult';
    val: bigint;
};
export declare function storeBinaryIntResult(src: BinaryIntResult): (builder: Builder) => void;
export declare function loadBinaryIntResult(slice: Slice): {
    $$type: "BinaryIntResult";
    val: bigint;
};
export type SendCellToAddress = {
    $$type: 'SendCellToAddress';
    address: Address;
    body: Cell;
};
export declare function storeSendCellToAddress(src: SendCellToAddress): (builder: Builder) => void;
export declare function loadSendCellToAddress(slice: Slice): {
    $$type: "SendCellToAddress";
    address: Address;
    body: Cell;
};
export type Calculator$Data = {
    $$type: 'Calculator$Data';
};
export declare function storeCalculator$Data(src: Calculator$Data): (builder: Builder) => void;
export declare function loadCalculator$Data(slice: Slice): {
    $$type: "Calculator$Data";
};
export type ReceiverTester$Data = {
    $$type: 'ReceiverTester$Data';
    receiverKind: string;
};
export declare function storeReceiverTester$Data(src: ReceiverTester$Data): (builder: Builder) => void;
export declare function loadReceiverTester$Data(slice: Slice): {
    $$type: "ReceiverTester$Data";
    receiverKind: string;
};
export type NoReceiverTester$Data = {
    $$type: 'NoReceiverTester$Data';
    receiver: string;
};
export declare function storeNoReceiverTester$Data(src: NoReceiverTester$Data): (builder: Builder) => void;
export declare function loadNoReceiverTester$Data(slice: Slice): {
    $$type: "NoReceiverTester$Data";
    receiver: string;
};
export type EmptyReceiverTester$Data = {
    $$type: 'EmptyReceiverTester$Data';
    receiver: string;
};
export declare function storeEmptyReceiverTester$Data(src: EmptyReceiverTester$Data): (builder: Builder) => void;
export declare function loadEmptyReceiverTester$Data(slice: Slice): {
    $$type: "EmptyReceiverTester$Data";
    receiver: string;
};
export type CommentReceiverTester$Data = {
    $$type: 'CommentReceiverTester$Data';
    receiver: string;
};
export declare function storeCommentReceiverTester$Data(src: CommentReceiverTester$Data): (builder: Builder) => void;
export declare function loadCommentReceiverTester$Data(slice: Slice): {
    $$type: "CommentReceiverTester$Data";
    receiver: string;
};
export type StringReceiverTester$Data = {
    $$type: 'StringReceiverTester$Data';
    receiver: string;
};
export declare function storeStringReceiverTester$Data(src: StringReceiverTester$Data): (builder: Builder) => void;
export declare function loadStringReceiverTester$Data(slice: Slice): {
    $$type: "StringReceiverTester$Data";
    receiver: string;
};
export type BinaryReceiverTester$Data = {
    $$type: 'BinaryReceiverTester$Data';
    receiver: string;
};
export declare function storeBinaryReceiverTester$Data(src: BinaryReceiverTester$Data): (builder: Builder) => void;
export declare function loadBinaryReceiverTester$Data(slice: Slice): {
    $$type: "BinaryReceiverTester$Data";
    receiver: string;
};
export type SliceReceiverTester$Data = {
    $$type: 'SliceReceiverTester$Data';
    receiver: string;
};
export declare function storeSliceReceiverTester$Data(src: SliceReceiverTester$Data): (builder: Builder) => void;
export declare function loadSliceReceiverTester$Data(slice: Slice): {
    $$type: "SliceReceiverTester$Data";
    receiver: string;
};
export type EmptyAndCommentReceiverTester$Data = {
    $$type: 'EmptyAndCommentReceiverTester$Data';
    receiver: string;
};
export declare function storeEmptyAndCommentReceiverTester$Data(src: EmptyAndCommentReceiverTester$Data): (builder: Builder) => void;
export declare function loadEmptyAndCommentReceiverTester$Data(slice: Slice): {
    $$type: "EmptyAndCommentReceiverTester$Data";
    receiver: string;
};
export type EmptyAndStringReceiverTester$Data = {
    $$type: 'EmptyAndStringReceiverTester$Data';
    receiver: string;
};
export declare function storeEmptyAndStringReceiverTester$Data(src: EmptyAndStringReceiverTester$Data): (builder: Builder) => void;
export declare function loadEmptyAndStringReceiverTester$Data(slice: Slice): {
    $$type: "EmptyAndStringReceiverTester$Data";
    receiver: string;
};
export type EmptyAndBinaryReceiverTester$Data = {
    $$type: 'EmptyAndBinaryReceiverTester$Data';
    receiver: string;
};
export declare function storeEmptyAndBinaryReceiverTester$Data(src: EmptyAndBinaryReceiverTester$Data): (builder: Builder) => void;
export declare function loadEmptyAndBinaryReceiverTester$Data(slice: Slice): {
    $$type: "EmptyAndBinaryReceiverTester$Data";
    receiver: string;
};
export type EmptyAndSliceReceiverTester$Data = {
    $$type: 'EmptyAndSliceReceiverTester$Data';
    receiver: string;
};
export declare function storeEmptyAndSliceReceiverTester$Data(src: EmptyAndSliceReceiverTester$Data): (builder: Builder) => void;
export declare function loadEmptyAndSliceReceiverTester$Data(slice: Slice): {
    $$type: "EmptyAndSliceReceiverTester$Data";
    receiver: string;
};
export type CommentAndStringReceiverTester$Data = {
    $$type: 'CommentAndStringReceiverTester$Data';
    receiver: string;
};
export declare function storeCommentAndStringReceiverTester$Data(src: CommentAndStringReceiverTester$Data): (builder: Builder) => void;
export declare function loadCommentAndStringReceiverTester$Data(slice: Slice): {
    $$type: "CommentAndStringReceiverTester$Data";
    receiver: string;
};
export type CommentAndBinaryReceiverTester$Data = {
    $$type: 'CommentAndBinaryReceiverTester$Data';
    receiver: string;
};
export declare function storeCommentAndBinaryReceiverTester$Data(src: CommentAndBinaryReceiverTester$Data): (builder: Builder) => void;
export declare function loadCommentAndBinaryReceiverTester$Data(slice: Slice): {
    $$type: "CommentAndBinaryReceiverTester$Data";
    receiver: string;
};
export type CommentAndSliceReceiverTester$Data = {
    $$type: 'CommentAndSliceReceiverTester$Data';
    receiver: string;
};
export declare function storeCommentAndSliceReceiverTester$Data(src: CommentAndSliceReceiverTester$Data): (builder: Builder) => void;
export declare function loadCommentAndSliceReceiverTester$Data(slice: Slice): {
    $$type: "CommentAndSliceReceiverTester$Data";
    receiver: string;
};
export type StringAndBinaryReceiverTester$Data = {
    $$type: 'StringAndBinaryReceiverTester$Data';
    receiver: string;
};
export declare function storeStringAndBinaryReceiverTester$Data(src: StringAndBinaryReceiverTester$Data): (builder: Builder) => void;
export declare function loadStringAndBinaryReceiverTester$Data(slice: Slice): {
    $$type: "StringAndBinaryReceiverTester$Data";
    receiver: string;
};
export type StringAndSliceReceiverTester$Data = {
    $$type: 'StringAndSliceReceiverTester$Data';
    receiver: string;
};
export declare function storeStringAndSliceReceiverTester$Data(src: StringAndSliceReceiverTester$Data): (builder: Builder) => void;
export declare function loadStringAndSliceReceiverTester$Data(slice: Slice): {
    $$type: "StringAndSliceReceiverTester$Data";
    receiver: string;
};
export type BinaryAndSliceReceiverTester$Data = {
    $$type: 'BinaryAndSliceReceiverTester$Data';
    receiver: string;
};
export declare function storeBinaryAndSliceReceiverTester$Data(src: BinaryAndSliceReceiverTester$Data): (builder: Builder) => void;
export declare function loadBinaryAndSliceReceiverTester$Data(slice: Slice): {
    $$type: "BinaryAndSliceReceiverTester$Data";
    receiver: string;
};
export type EmptyAndCommentAndStringReceiverTester$Data = {
    $$type: 'EmptyAndCommentAndStringReceiverTester$Data';
    receiver: string;
};
export declare function storeEmptyAndCommentAndStringReceiverTester$Data(src: EmptyAndCommentAndStringReceiverTester$Data): (builder: Builder) => void;
export declare function loadEmptyAndCommentAndStringReceiverTester$Data(slice: Slice): {
    $$type: "EmptyAndCommentAndStringReceiverTester$Data";
    receiver: string;
};
export type EmptyAndCommentAndBinaryReceiverTester$Data = {
    $$type: 'EmptyAndCommentAndBinaryReceiverTester$Data';
    receiver: string;
};
export declare function storeEmptyAndCommentAndBinaryReceiverTester$Data(src: EmptyAndCommentAndBinaryReceiverTester$Data): (builder: Builder) => void;
export declare function loadEmptyAndCommentAndBinaryReceiverTester$Data(slice: Slice): {
    $$type: "EmptyAndCommentAndBinaryReceiverTester$Data";
    receiver: string;
};
export type EmptyAndCommentAndSliceReceiverTester$Data = {
    $$type: 'EmptyAndCommentAndSliceReceiverTester$Data';
    receiver: string;
};
export declare function storeEmptyAndCommentAndSliceReceiverTester$Data(src: EmptyAndCommentAndSliceReceiverTester$Data): (builder: Builder) => void;
export declare function loadEmptyAndCommentAndSliceReceiverTester$Data(slice: Slice): {
    $$type: "EmptyAndCommentAndSliceReceiverTester$Data";
    receiver: string;
};
export type EmptyAndStringAndBinaryReceiverTester$Data = {
    $$type: 'EmptyAndStringAndBinaryReceiverTester$Data';
    receiver: string;
};
export declare function storeEmptyAndStringAndBinaryReceiverTester$Data(src: EmptyAndStringAndBinaryReceiverTester$Data): (builder: Builder) => void;
export declare function loadEmptyAndStringAndBinaryReceiverTester$Data(slice: Slice): {
    $$type: "EmptyAndStringAndBinaryReceiverTester$Data";
    receiver: string;
};
export type EmptyAndStringAndSliceReceiverTester$Data = {
    $$type: 'EmptyAndStringAndSliceReceiverTester$Data';
    receiver: string;
};
export declare function storeEmptyAndStringAndSliceReceiverTester$Data(src: EmptyAndStringAndSliceReceiverTester$Data): (builder: Builder) => void;
export declare function loadEmptyAndStringAndSliceReceiverTester$Data(slice: Slice): {
    $$type: "EmptyAndStringAndSliceReceiverTester$Data";
    receiver: string;
};
export type EmptyAndBinaryAndSliceReceiverTester$Data = {
    $$type: 'EmptyAndBinaryAndSliceReceiverTester$Data';
    receiver: string;
};
export declare function storeEmptyAndBinaryAndSliceReceiverTester$Data(src: EmptyAndBinaryAndSliceReceiverTester$Data): (builder: Builder) => void;
export declare function loadEmptyAndBinaryAndSliceReceiverTester$Data(slice: Slice): {
    $$type: "EmptyAndBinaryAndSliceReceiverTester$Data";
    receiver: string;
};
export type CommentAndStringAndBinaryReceiverTester$Data = {
    $$type: 'CommentAndStringAndBinaryReceiverTester$Data';
    receiver: string;
};
export declare function storeCommentAndStringAndBinaryReceiverTester$Data(src: CommentAndStringAndBinaryReceiverTester$Data): (builder: Builder) => void;
export declare function loadCommentAndStringAndBinaryReceiverTester$Data(slice: Slice): {
    $$type: "CommentAndStringAndBinaryReceiverTester$Data";
    receiver: string;
};
export type CommentAndStringAndSliceReceiverTester$Data = {
    $$type: 'CommentAndStringAndSliceReceiverTester$Data';
    receiver: string;
};
export declare function storeCommentAndStringAndSliceReceiverTester$Data(src: CommentAndStringAndSliceReceiverTester$Data): (builder: Builder) => void;
export declare function loadCommentAndStringAndSliceReceiverTester$Data(slice: Slice): {
    $$type: "CommentAndStringAndSliceReceiverTester$Data";
    receiver: string;
};
export type CommentAndBinaryAndSliceReceiverTester$Data = {
    $$type: 'CommentAndBinaryAndSliceReceiverTester$Data';
    receiver: string;
};
export declare function storeCommentAndBinaryAndSliceReceiverTester$Data(src: CommentAndBinaryAndSliceReceiverTester$Data): (builder: Builder) => void;
export declare function loadCommentAndBinaryAndSliceReceiverTester$Data(slice: Slice): {
    $$type: "CommentAndBinaryAndSliceReceiverTester$Data";
    receiver: string;
};
export type StringAndBinaryAndSliceReceiverTester$Data = {
    $$type: 'StringAndBinaryAndSliceReceiverTester$Data';
    receiver: string;
};
export declare function storeStringAndBinaryAndSliceReceiverTester$Data(src: StringAndBinaryAndSliceReceiverTester$Data): (builder: Builder) => void;
export declare function loadStringAndBinaryAndSliceReceiverTester$Data(slice: Slice): {
    $$type: "StringAndBinaryAndSliceReceiverTester$Data";
    receiver: string;
};
export type EmptyAndCommentAndStringAndBinaryReceiverTester$Data = {
    $$type: 'EmptyAndCommentAndStringAndBinaryReceiverTester$Data';
    receiver: string;
};
export declare function storeEmptyAndCommentAndStringAndBinaryReceiverTester$Data(src: EmptyAndCommentAndStringAndBinaryReceiverTester$Data): (builder: Builder) => void;
export declare function loadEmptyAndCommentAndStringAndBinaryReceiverTester$Data(slice: Slice): {
    $$type: "EmptyAndCommentAndStringAndBinaryReceiverTester$Data";
    receiver: string;
};
export type EmptyAndCommentAndStringAndSliceReceiverTester$Data = {
    $$type: 'EmptyAndCommentAndStringAndSliceReceiverTester$Data';
    receiver: string;
};
export declare function storeEmptyAndCommentAndStringAndSliceReceiverTester$Data(src: EmptyAndCommentAndStringAndSliceReceiverTester$Data): (builder: Builder) => void;
export declare function loadEmptyAndCommentAndStringAndSliceReceiverTester$Data(slice: Slice): {
    $$type: "EmptyAndCommentAndStringAndSliceReceiverTester$Data";
    receiver: string;
};
export type EmptyAndCommentAndBinaryAndSliceReceiverTester$Data = {
    $$type: 'EmptyAndCommentAndBinaryAndSliceReceiverTester$Data';
    receiver: string;
};
export declare function storeEmptyAndCommentAndBinaryAndSliceReceiverTester$Data(src: EmptyAndCommentAndBinaryAndSliceReceiverTester$Data): (builder: Builder) => void;
export declare function loadEmptyAndCommentAndBinaryAndSliceReceiverTester$Data(slice: Slice): {
    $$type: "EmptyAndCommentAndBinaryAndSliceReceiverTester$Data";
    receiver: string;
};
export type EmptyAndStringAndBinaryAndSliceReceiverTester$Data = {
    $$type: 'EmptyAndStringAndBinaryAndSliceReceiverTester$Data';
    receiver: string;
};
export declare function storeEmptyAndStringAndBinaryAndSliceReceiverTester$Data(src: EmptyAndStringAndBinaryAndSliceReceiverTester$Data): (builder: Builder) => void;
export declare function loadEmptyAndStringAndBinaryAndSliceReceiverTester$Data(slice: Slice): {
    $$type: "EmptyAndStringAndBinaryAndSliceReceiverTester$Data";
    receiver: string;
};
export type CommentAndStringAndBinaryAndSliceReceiverTester$Data = {
    $$type: 'CommentAndStringAndBinaryAndSliceReceiverTester$Data';
    receiver: string;
};
export declare function storeCommentAndStringAndBinaryAndSliceReceiverTester$Data(src: CommentAndStringAndBinaryAndSliceReceiverTester$Data): (builder: Builder) => void;
export declare function loadCommentAndStringAndBinaryAndSliceReceiverTester$Data(slice: Slice): {
    $$type: "CommentAndStringAndBinaryAndSliceReceiverTester$Data";
    receiver: string;
};
export type AllReceiverTester$Data = {
    $$type: 'AllReceiverTester$Data';
    receiver: string;
};
export declare function storeAllReceiverTester$Data(src: AllReceiverTester$Data): (builder: Builder) => void;
export declare function loadAllReceiverTester$Data(slice: Slice): {
    $$type: "AllReceiverTester$Data";
    receiver: string;
};
export type EmptyBouncedTester$Data = {
    $$type: 'EmptyBouncedTester$Data';
    receiver: string;
};
export declare function storeEmptyBouncedTester$Data(src: EmptyBouncedTester$Data): (builder: Builder) => void;
export declare function loadEmptyBouncedTester$Data(slice: Slice): {
    $$type: "EmptyBouncedTester$Data";
    receiver: string;
};
export type BinaryBouncedTester$Data = {
    $$type: 'BinaryBouncedTester$Data';
    receiver: string;
};
export declare function storeBinaryBouncedTester$Data(src: BinaryBouncedTester$Data): (builder: Builder) => void;
export declare function loadBinaryBouncedTester$Data(slice: Slice): {
    $$type: "BinaryBouncedTester$Data";
    receiver: string;
};
export type SliceBouncedTester$Data = {
    $$type: 'SliceBouncedTester$Data';
    receiver: string;
};
export declare function storeSliceBouncedTester$Data(src: SliceBouncedTester$Data): (builder: Builder) => void;
export declare function loadSliceBouncedTester$Data(slice: Slice): {
    $$type: "SliceBouncedTester$Data";
    receiver: string;
};
export type AllBouncedTester$Data = {
    $$type: 'AllBouncedTester$Data';
    receiver: string;
};
export declare function storeAllBouncedTester$Data(src: AllBouncedTester$Data): (builder: Builder) => void;
export declare function loadAllBouncedTester$Data(slice: Slice): {
    $$type: "AllBouncedTester$Data";
    receiver: string;
};
export declare const NoReceiverTester_getterMapping: {
    [key: string]: string;
};
export declare class NoReceiverTester implements Contract {
    static readonly storageReserve = 0n;
    static init(): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(): Promise<NoReceiverTester>;
    static fromAddress(address: Address): NoReceiverTester;
    readonly address: Address;
    readonly init?: {
        code: Cell;
        data: Cell;
    };
    readonly abi: ContractABI;
    private constructor();
    getReceiver(provider: ContractProvider): Promise<string>;
}
