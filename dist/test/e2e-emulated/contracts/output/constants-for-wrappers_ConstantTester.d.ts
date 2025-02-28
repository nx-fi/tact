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
export type SimpleStruct = {
    $$type: 'SimpleStruct';
    value: bigint;
};
export declare function storeSimpleStruct(src: SimpleStruct): (builder: Builder) => void;
export declare function loadSimpleStruct(slice: Slice): {
    $$type: "SimpleStruct";
    value: bigint;
};
export type NestedStruct = {
    $$type: 'NestedStruct';
    value: bigint;
    other: SimpleStruct;
};
export declare function storeNestedStruct(src: NestedStruct): (builder: Builder) => void;
export declare function loadNestedStruct(slice: Slice): {
    $$type: "NestedStruct";
    value: bigint;
    other: {
        $$type: "SimpleStruct";
        value: bigint;
    };
};
export type ConstantTester$Data = {
    $$type: 'ConstantTester$Data';
};
export declare function storeConstantTester$Data(src: ConstantTester$Data): (builder: Builder) => void;
export declare function loadConstantTester$Data(slice: Slice): {
    $$type: "ConstantTester$Data";
};
export declare const ConstantTester_getterMapping: {
    [key: string]: string;
};
export declare const INT = 10n;
export declare const STRING = "hello world";
export declare const STRING_WITH_QUOTES = "hello \"world\"";
export declare const BOOL = true;
export declare const ADDR: Address;
export declare const CELL: Cell;
export declare const SLICE: Slice;
export declare const SIMPLE_STRUCT: {
    $$type: "SimpleStruct";
    value: bigint;
};
export declare const NESTED_STRUCT: {
    $$type: "NestedStruct";
    value: bigint;
    other: {
        $$type: "SimpleStruct";
        value: bigint;
    };
};
export declare class ConstantTester implements Contract {
    static readonly INT = 10n;
    static readonly STRING = "hello world";
    static readonly STRING_WITH_QUOTES = "hello \"world\"";
    static readonly BOOL = true;
    static readonly ADDR: Address;
    static readonly CELL: Cell;
    static readonly SLICE: Slice;
    static readonly SIMPLE_STRUCT: {
        $$type: "SimpleStruct";
        value: bigint;
    };
    static readonly NESTED_STRUCT: {
        $$type: "NestedStruct";
        value: bigint;
        other: {
            $$type: "SimpleStruct";
            value: bigint;
        };
    };
    static readonly storageReserve = 0n;
    static init(): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(): Promise<ConstantTester>;
    static fromAddress(address: Address): ConstantTester;
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
    }, message: null): Promise<void>;
    getGlobalInt(provider: ContractProvider): Promise<bigint>;
    getGlobalString(provider: ContractProvider): Promise<string>;
    getGlobalStringWithQuotes(provider: ContractProvider): Promise<string>;
    getGlobalBool(provider: ContractProvider): Promise<boolean>;
    getGlobalAddress(provider: ContractProvider): Promise<Address>;
    getGlobalCell(provider: ContractProvider): Promise<Cell>;
    getGlobalSlice(provider: ContractProvider): Promise<Slice>;
    getGlobalSimpleStruct(provider: ContractProvider): Promise<{
        $$type: "SimpleStruct";
        value: bigint;
    }>;
    getGlobalNestedStruct(provider: ContractProvider): Promise<{
        $$type: "NestedStruct";
        value: bigint;
        other: {
            $$type: "SimpleStruct";
            value: bigint;
        };
    }>;
    getContractInt(provider: ContractProvider): Promise<bigint>;
    getContractString(provider: ContractProvider): Promise<string>;
    getContractStringWithQuotes(provider: ContractProvider): Promise<string>;
    getContractBool(provider: ContractProvider): Promise<boolean>;
    getContractAddress(provider: ContractProvider): Promise<Address>;
    getContractCell(provider: ContractProvider): Promise<Cell>;
    getContractSlice(provider: ContractProvider): Promise<Slice>;
    getContractSimpleStruct(provider: ContractProvider): Promise<{
        $$type: "SimpleStruct";
        value: bigint;
    }>;
    getContractNestedStruct(provider: ContractProvider): Promise<{
        $$type: "NestedStruct";
        value: bigint;
        other: {
            $$type: "SimpleStruct";
            value: bigint;
        };
    }>;
}
