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
export type Compare = {
    $$type: 'Compare';
    m1: Dictionary<number, boolean>;
    m2: Dictionary<number, boolean>;
};
export declare function storeCompare(src: Compare): (builder: Builder) => void;
export declare function loadCompare(slice: Slice): {
    $$type: "Compare";
    m1: Dictionary<number, boolean>;
    m2: Dictionary<number, boolean>;
};
export type CompareDeep = {
    $$type: 'CompareDeep';
    m1: Dictionary<number, boolean>;
    m2: Dictionary<number, boolean>;
};
export declare function storeCompareDeep(src: CompareDeep): (builder: Builder) => void;
export declare function loadCompareDeep(slice: Slice): {
    $$type: "CompareDeep";
    m1: Dictionary<number, boolean>;
    m2: Dictionary<number, boolean>;
};
export type MapComparisonTestContract$Data = {
    $$type: 'MapComparisonTestContract$Data';
};
export declare function storeMapComparisonTestContract$Data(src: MapComparisonTestContract$Data): (builder: Builder) => void;
export declare function loadMapComparisonTestContract$Data(slice: Slice): {
    $$type: "MapComparisonTestContract$Data";
};
export declare const MapComparisonTestContract_getterMapping: {
    [key: string]: string;
};
export declare class MapComparisonTestContract implements Contract {
    static init(): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(): Promise<MapComparisonTestContract>;
    static fromAddress(address: Address): MapComparisonTestContract;
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
    }, message: null | Compare | CompareDeep): Promise<void>;
    getCompareIntInt(provider: ContractProvider, m1: Dictionary<bigint, bigint>, m2: Dictionary<bigint, bigint>): Promise<boolean>;
    getCompareIntCell(provider: ContractProvider, m1: Dictionary<bigint, Cell>, m2: Dictionary<bigint, Cell>): Promise<boolean>;
    getCompareIntAddress(provider: ContractProvider, m1: Dictionary<bigint, Address>, m2: Dictionary<bigint, Address>): Promise<boolean>;
    getCompareAddressInt(provider: ContractProvider, m1: Dictionary<Address, bigint>, m2: Dictionary<Address, bigint>): Promise<boolean>;
    getCompareAddressCell(provider: ContractProvider, m1: Dictionary<Address, Cell>, m2: Dictionary<Address, Cell>): Promise<boolean>;
    getCompareAddressAddress(provider: ContractProvider, m1: Dictionary<Address, Address>, m2: Dictionary<Address, Address>): Promise<boolean>;
}
