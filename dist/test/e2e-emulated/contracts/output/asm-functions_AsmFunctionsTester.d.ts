import { Cell, Slice, Address, Builder, Dictionary, ContractProvider, Sender, Contract, ContractABI } from '@ton/core';
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
export type AsmFunctionsTester$Data = {
    $$type: 'AsmFunctionsTester$Data';
};
export declare function storeAsmFunctionsTester$Data(src: AsmFunctionsTester$Data): (builder: Builder) => void;
export declare function loadAsmFunctionsTester$Data(slice: Slice): {
    $$type: "AsmFunctionsTester$Data";
};
export type MapIntIntSlice = {
    $$type: 'MapIntIntSlice';
    val: Dictionary<bigint, bigint>;
    rem: Slice;
};
export declare function storeMapIntIntSlice(src: MapIntIntSlice): (builder: Builder) => void;
export declare function loadMapIntIntSlice(slice: Slice): {
    $$type: "MapIntIntSlice";
    val: Dictionary<bigint, bigint>;
    rem: Slice;
};
export type IntSlice = {
    $$type: 'IntSlice';
    val: bigint;
    rem: Slice;
};
export declare function storeIntSlice(src: IntSlice): (builder: Builder) => void;
export declare function loadIntSlice(slice: Slice): {
    $$type: "IntSlice";
    val: bigint;
    rem: Slice;
};
export type SliceInt = {
    $$type: 'SliceInt';
    rem: Slice;
    val: bigint;
};
export declare function storeSliceInt(src: SliceInt): (builder: Builder) => void;
export declare function loadSliceInt(slice: Slice): {
    $$type: "SliceInt";
    rem: Slice;
    val: bigint;
};
export type Two = {
    $$type: 'Two';
    a: bigint;
    b: bigint;
};
export declare function storeTwo(src: Two): (builder: Builder) => void;
export declare function loadTwo(slice: Slice): {
    $$type: "Two";
    a: bigint;
    b: bigint;
};
export type TwoInTwo = {
    $$type: 'TwoInTwo';
    a: Two;
    b: Two;
};
export declare function storeTwoInTwo(src: TwoInTwo): (builder: Builder) => void;
export declare function loadTwoInTwo(slice: Slice): {
    $$type: "TwoInTwo";
    a: {
        $$type: "Two";
        a: bigint;
        b: bigint;
    };
    b: {
        $$type: "Two";
        a: bigint;
        b: bigint;
    };
};
export declare const AsmFunctionsTester_getterMapping: {
    [key: string]: string;
};
export declare class AsmFunctionsTester implements Contract {
    static readonly storageReserve = 0n;
    static init(): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(): Promise<AsmFunctionsTester>;
    static fromAddress(address: Address): AsmFunctionsTester;
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
    getTestAsmStoreDict(provider: ContractProvider): Promise<boolean>;
    getTestAsmLoadCoins(provider: ContractProvider): Promise<boolean>;
    getTestAsmLoadCoinsMut(provider: ContractProvider): Promise<boolean>;
    getTestAsmLoadCoinsMutRuntime(provider: ContractProvider, c: Cell): Promise<bigint>;
    getTestAsmLoadInt(provider: ContractProvider): Promise<boolean>;
    getTestAsmDebugStr(provider: ContractProvider): Promise<boolean>;
    getTestAsmCreateUseWord(provider: ContractProvider): Promise<boolean>;
    getTestAsmSecondToLast(provider: ContractProvider): Promise<boolean>;
    getTestAsmSecondToLastRuntime(provider: ContractProvider, s1: Two, s2: Two): Promise<bigint>;
    getTestAsmFirst(provider: ContractProvider): Promise<boolean>;
    getTestAsmFirstRuntime(provider: ContractProvider, s1: TwoInTwo, s2: TwoInTwo, s3: TwoInTwo): Promise<bigint>;
}
