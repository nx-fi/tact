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
export type MyStruct = {
    $$type: 'MyStruct';
    a: bigint;
    b: boolean;
};
export declare function storeMyStruct(src: MyStruct): (builder: Builder) => void;
export declare function loadMyStruct(slice: Slice): {
    $$type: "MyStruct";
    a: bigint;
    b: boolean;
};
export type MyStructWithMap = {
    $$type: 'MyStructWithMap';
    m: Dictionary<bigint, bigint>;
};
export declare function storeMyStructWithMap(src: MyStructWithMap): (builder: Builder) => void;
export declare function loadMyStructWithMap(slice: Slice): {
    $$type: "MyStructWithMap";
    m: Dictionary<bigint, bigint>;
};
export type MapTraverseTestContract$Data = {
    $$type: 'MapTraverseTestContract$Data';
    m: Dictionary<bigint, bigint>;
    s: MyStructWithMap;
};
export declare function storeMapTraverseTestContract$Data(src: MapTraverseTestContract$Data): (builder: Builder) => void;
export declare function loadMapTraverseTestContract$Data(slice: Slice): {
    $$type: "MapTraverseTestContract$Data";
    m: Dictionary<bigint, bigint>;
    s: {
        $$type: "MyStructWithMap";
        m: Dictionary<bigint, bigint>;
    };
};
export declare const MapTraverseTestContract_getterMapping: {
    [key: string]: string;
};
export declare class MapTraverseTestContract implements Contract {
    static init(): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(): Promise<MapTraverseTestContract>;
    static fromAddress(address: Address): MapTraverseTestContract;
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
    getTestIntInt(provider: ContractProvider): Promise<bigint>;
    getTestIntCoins(provider: ContractProvider): Promise<bigint>;
    getTestIntVarint16(provider: ContractProvider): Promise<bigint>;
    getTestIntBool(provider: ContractProvider): Promise<bigint>;
    getTestIntCell(provider: ContractProvider): Promise<bigint>;
    getTestIntAddress(provider: ContractProvider): Promise<bigint>;
    getTestIntStruct(provider: ContractProvider): Promise<bigint>;
    getTestAddressInt(provider: ContractProvider): Promise<bigint>;
    getTestAddressCoins(provider: ContractProvider): Promise<bigint>;
    getTestAddressVarint16(provider: ContractProvider): Promise<bigint>;
    getTestAddressBool(provider: ContractProvider): Promise<bigint>;
    getTestAddressCell(provider: ContractProvider): Promise<bigint>;
    getTestAddressAddress(provider: ContractProvider): Promise<bigint>;
    getTestAddressStruct(provider: ContractProvider): Promise<bigint>;
    getTestEmptyMap(provider: ContractProvider): Promise<bigint>;
    getTestNull(provider: ContractProvider): Promise<bigint>;
    getTestMapModificationDuringTraversal1(provider: ContractProvider): Promise<bigint>;
    getTestMapModificationDuringTraversal2(provider: ContractProvider): Promise<void>;
    getTestMapSize(provider: ContractProvider): Promise<bigint>;
    getTestMapAsField(provider: ContractProvider): Promise<bigint>;
    getTestMapAsStructField(provider: ContractProvider): Promise<bigint>;
}
