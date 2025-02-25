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
export type VarIntStruct = {
    $$type: 'VarIntStruct';
    a: bigint;
    b: bigint;
    d: bigint;
    e: bigint;
};
export declare function storeVarIntStruct(src: VarIntStruct): (builder: Builder) => void;
export declare function loadVarIntStruct(slice: Slice): {
    $$type: "VarIntStruct";
    a: bigint;
    b: bigint;
    d: bigint;
    e: bigint;
};
export type StdlibTest$Data = {
    $$type: 'StdlibTest$Data';
    v: bigint;
};
export declare function storeStdlibTest$Data(src: StdlibTest$Data): (builder: Builder) => void;
export declare function loadStdlibTest$Data(slice: Slice): {
    $$type: "StdlibTest$Data";
    v: bigint;
};
export declare const StdlibTest_getterMapping: {
    [key: string]: string;
};
export declare class StdlibTest implements Contract {
    static init(): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(): Promise<StdlibTest>;
    static fromAddress(address: Address): StdlibTest;
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
    getSliceEmpty(provider: ContractProvider, sc: Slice): Promise<boolean>;
    getSliceBits(provider: ContractProvider, sc: Slice): Promise<bigint>;
    getSliceRefs(provider: ContractProvider, sc: Slice): Promise<bigint>;
    getStoreBool(provider: ContractProvider, bl: Builder, b: boolean): Promise<Builder>;
    getLoadBool(provider: ContractProvider, sc: Slice): Promise<boolean>;
    getStoreBit(provider: ContractProvider, bl: Builder, b: boolean): Promise<Builder>;
    getLoadBit(provider: ContractProvider, sc: Slice): Promise<boolean>;
    getTvm_2023_07Upgrade(provider: ContractProvider): Promise<bigint>;
    getTvm_2024_04Upgrade(provider: ContractProvider): Promise<bigint>;
    getStoreMaybeRef(provider: ContractProvider, bl: Builder, c: Cell | null): Promise<Builder>;
    getParseStdAddress(provider: ContractProvider, slice: Slice): Promise<{
        $$type: "StdAddress";
        workchain: bigint;
        address: bigint;
    }>;
    getParseVarAddress(provider: ContractProvider, slice: Slice): Promise<{
        $$type: "VarAddress";
        workchain: bigint;
        address: Slice;
    }>;
    getParseOriginalFwdFee(provider: ContractProvider, msg: Slice): Promise<bigint>;
    getBuilderDepth(provider: ContractProvider, bl: Builder): Promise<bigint>;
    getSkipLastBits(provider: ContractProvider, sc: Slice, n: bigint): Promise<Slice>;
    getFirstBits(provider: ContractProvider, sc: Slice, n: bigint): Promise<Slice>;
    getLastBits(provider: ContractProvider, sc: Slice, n: bigint): Promise<Slice>;
    getSliceDepth(provider: ContractProvider, sc: Slice): Promise<bigint>;
    getComputeDataSizeCell(provider: ContractProvider, c: Cell | null, maxCells: bigint): Promise<{
        $$type: "DataSize";
        cells: bigint;
        bits: bigint;
        refs: bigint;
    }>;
    getComputeDataSizeSlice(provider: ContractProvider, sc: Slice, maxCells: bigint): Promise<{
        $$type: "DataSize";
        cells: bigint;
        bits: bigint;
        refs: bigint;
    }>;
    getCellDepth(provider: ContractProvider, c: Cell | null): Promise<bigint>;
    getCurLt(provider: ContractProvider): Promise<bigint>;
    getBlockLt(provider: ContractProvider): Promise<bigint>;
    getSetGasLimit(provider: ContractProvider, gl: bigint): Promise<bigint>;
    getGetSeed(provider: ContractProvider): Promise<bigint>;
    getSetSeed(provider: ContractProvider, seed: bigint): Promise<bigint>;
    getMyCode(provider: ContractProvider): Promise<Cell>;
    getVarIntegers1(provider: ContractProvider): Promise<bigint>;
    getVarIntegers2(provider: ContractProvider): Promise<bigint>;
}
