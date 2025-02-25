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
export type NoDependencies$Data = {
    $$type: 'NoDependencies$Data';
};
export declare function storeNoDependencies$Data(src: NoDependencies$Data): (builder: Builder) => void;
export declare function loadNoDependencies$Data(slice: Slice): {
    $$type: "NoDependencies$Data";
};
export type OneDependency$Data = {
    $$type: 'OneDependency$Data';
    param: bigint;
};
export declare function storeOneDependency$Data(src: OneDependency$Data): (builder: Builder) => void;
export declare function loadOneDependency$Data(slice: Slice): {
    $$type: "OneDependency$Data";
    param: bigint;
};
export type TwoDependencies$Data = {
    $$type: 'TwoDependencies$Data';
    param: bigint;
};
export declare function storeTwoDependencies$Data(src: TwoDependencies$Data): (builder: Builder) => void;
export declare function loadTwoDependencies$Data(slice: Slice): {
    $$type: "TwoDependencies$Data";
    param: bigint;
};
export declare const OneDependency_getterMapping: {
    [key: string]: string;
};
export declare class OneDependency implements Contract {
    static init(initParam: bigint): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(initParam: bigint): Promise<OneDependency>;
    static fromAddress(address: Address): OneDependency;
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
    getGetDep(provider: ContractProvider): Promise<{
        $$type: "StateInit";
        code: Cell;
        data: Cell;
    }>;
    getGetState(provider: ContractProvider): Promise<{
        $$type: "StateInit";
        code: Cell;
        data: Cell;
    }>;
}
