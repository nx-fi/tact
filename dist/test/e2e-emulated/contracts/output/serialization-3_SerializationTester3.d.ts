import { Cell, Slice, Address, Builder, ContractProvider, Sender, Contract, ContractABI } from '@ton/core';
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
export type Update = {
    $$type: 'Update';
    a: bigint;
    b: boolean;
    c: Cell;
    d: Slice;
    e: Builder;
    f: string;
};
export declare function storeUpdate(src: Update): (builder: Builder) => void;
export declare function loadUpdate(slice: Slice): {
    $$type: "Update";
    a: bigint;
    b: boolean;
    c: Cell;
    d: Slice;
    e: Builder;
    f: string;
};
export type SerializationTester3$Data = {
    $$type: 'SerializationTester3$Data';
    a: bigint;
    b: boolean;
    c: Cell;
    d: Slice;
    e: Builder;
    f: string;
};
export declare function storeSerializationTester3$Data(src: SerializationTester3$Data): (builder: Builder) => void;
export declare function loadSerializationTester3$Data(slice: Slice): {
    $$type: "SerializationTester3$Data";
    a: bigint;
    b: boolean;
    c: Cell;
    d: Slice;
    e: Builder;
    f: string;
};
export declare const SerializationTester3_getterMapping: {
    [key: string]: string;
};
export declare class SerializationTester3 implements Contract {
    static readonly storageReserve = 0n;
    static init(a: bigint, b: boolean, c: Cell, d: Slice, e: Builder, f: string): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(a: bigint, b: boolean, c: Cell, d: Slice, e: Builder, f: string): Promise<SerializationTester3>;
    static fromAddress(address: Address): SerializationTester3;
    readonly address: Address;
    readonly init?: {
        code: Cell;
        data: Cell;
    };
    readonly abi: ContractABI;
    private constructor();
    send(provider: ContractProvider, via: Sender, args: {
        value: bigint;
        bounce?: boolean | null | undefined;
    }, message: null | Update): Promise<void>;
    getGetA(provider: ContractProvider): Promise<bigint>;
    getGetB(provider: ContractProvider): Promise<boolean>;
    getGetC(provider: ContractProvider): Promise<Cell>;
    getGetD(provider: ContractProvider): Promise<Slice>;
    getGetE(provider: ContractProvider): Promise<Builder>;
    getGetF(provider: ContractProvider): Promise<string>;
}
