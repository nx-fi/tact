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
export type Struct2 = {
    $$type: 'Struct2';
    v: bigint;
};
export declare function storeStruct2(src: Struct2): (builder: Builder) => void;
export declare function loadStruct2(slice: Slice): {
    $$type: "Struct2";
    v: bigint;
};
export type OptStruct = {
    $$type: 'OptStruct';
    s: Struct2 | null;
};
export declare function storeOptStruct(src: OptStruct): (builder: Builder) => void;
export declare function loadOptStruct(slice: Slice): {
    $$type: "OptStruct";
    s: {
        $$type: "Struct2";
        v: bigint;
    } | null;
};
export type Opt2$Data = {
    $$type: 'Opt2$Data';
    stateInit: StateInit;
};
export declare function storeOpt2$Data(src: Opt2$Data): (builder: Builder) => void;
export declare function loadOpt2$Data(slice: Slice): {
    $$type: "Opt2$Data";
    stateInit: {
        $$type: "StateInit";
        code: Cell;
        data: Cell;
    };
};
export type Opt3$Data = {
    $$type: 'Opt3$Data';
};
export declare function storeOpt3$Data(src: Opt3$Data): (builder: Builder) => void;
export declare function loadOpt3$Data(slice: Slice): {
    $$type: "Opt3$Data";
};
export type OptAddr = {
    $$type: 'OptAddr';
    x: bigint;
    y: Address | null;
    z: bigint;
};
export declare function storeOptAddr(src: OptAddr): (builder: Builder) => void;
export declare function loadOptAddr(slice: Slice): {
    $$type: "OptAddr";
    x: bigint;
    y: Address | null;
    z: bigint;
};
export type Opt4$Data = {
    $$type: 'Opt4$Data';
    z: bigint;
};
export declare function storeOpt4$Data(src: Opt4$Data): (builder: Builder) => void;
export declare function loadOpt4$Data(slice: Slice): {
    $$type: "Opt4$Data";
    z: bigint;
};
export type SomeGenericStruct = {
    $$type: 'SomeGenericStruct';
    value1: bigint;
    value2: bigint;
    value3: bigint;
    value4: bigint;
    value5: bigint;
};
export declare function storeSomeGenericStruct(src: SomeGenericStruct): (builder: Builder) => void;
export declare function loadSomeGenericStruct(slice: Slice): {
    $$type: "SomeGenericStruct";
    value1: bigint;
    value2: bigint;
    value3: bigint;
    value4: bigint;
    value5: bigint;
};
export type StructWithOptionals = {
    $$type: 'StructWithOptionals';
    a: bigint | null;
    b: boolean | null;
    c: Cell | null;
    d: Address | null;
    e: SomeGenericStruct | null;
};
export declare function storeStructWithOptionals(src: StructWithOptionals): (builder: Builder) => void;
export declare function loadStructWithOptionals(slice: Slice): {
    $$type: "StructWithOptionals";
    a: bigint | null;
    b: boolean | null;
    c: Cell | null;
    d: Address | null;
    e: {
        $$type: "SomeGenericStruct";
        value1: bigint;
        value2: bigint;
        value3: bigint;
        value4: bigint;
        value5: bigint;
    } | null;
};
export type Update = {
    $$type: 'Update';
    a: bigint | null;
    b: boolean | null;
    c: Cell | null;
    d: Address | null;
    e: SomeGenericStruct | null;
    f: StructWithOptionals | null;
};
export declare function storeUpdate(src: Update): (builder: Builder) => void;
export declare function loadUpdate(slice: Slice): {
    $$type: "Update";
    a: bigint | null;
    b: boolean | null;
    c: Cell | null;
    d: Address | null;
    e: {
        $$type: "SomeGenericStruct";
        value1: bigint;
        value2: bigint;
        value3: bigint;
        value4: bigint;
        value5: bigint;
    } | null;
    f: {
        $$type: "StructWithOptionals";
        a: bigint | null;
        b: boolean | null;
        c: Cell | null;
        d: Address | null;
        e: {
            $$type: "SomeGenericStruct";
            value1: bigint;
            value2: bigint;
            value3: bigint;
            value4: bigint;
            value5: bigint;
        } | null;
    } | null;
};
export type ContractWithOptionals$Data = {
    $$type: 'ContractWithOptionals$Data';
    a: bigint | null;
    b: boolean | null;
    c: Cell | null;
    d: Address | null;
    e: SomeGenericStruct | null;
    f: StructWithOptionals | null;
};
export declare function storeContractWithOptionals$Data(src: ContractWithOptionals$Data): (builder: Builder) => void;
export declare function loadContractWithOptionals$Data(slice: Slice): {
    $$type: "ContractWithOptionals$Data";
    a: bigint | null;
    b: boolean | null;
    c: Cell | null;
    d: Address | null;
    e: {
        $$type: "SomeGenericStruct";
        value1: bigint;
        value2: bigint;
        value3: bigint;
        value4: bigint;
        value5: bigint;
    } | null;
    f: {
        $$type: "StructWithOptionals";
        a: bigint | null;
        b: boolean | null;
        c: Cell | null;
        d: Address | null;
        e: {
            $$type: "SomeGenericStruct";
            value1: bigint;
            value2: bigint;
            value3: bigint;
            value4: bigint;
            value5: bigint;
        } | null;
    } | null;
};
export declare const Opt2_getterMapping: {
    [key: string]: string;
};
export declare class Opt2 implements Contract {
    static readonly storageReserve = 0n;
    static init(): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(): Promise<Opt2>;
    static fromAddress(address: Address): Opt2;
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
    }, message: "Test"): Promise<void>;
}
