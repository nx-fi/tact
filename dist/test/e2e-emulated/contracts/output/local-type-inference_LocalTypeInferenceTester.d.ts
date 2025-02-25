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
export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
};
export declare function storeDeploy(src: Deploy): (builder: Builder) => void;
export declare function loadDeploy(slice: Slice): {
    $$type: "Deploy";
    queryId: bigint;
};
export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
};
export declare function storeDeployOk(src: DeployOk): (builder: Builder) => void;
export declare function loadDeployOk(slice: Slice): {
    $$type: "DeployOk";
    queryId: bigint;
};
export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
};
export declare function storeFactoryDeploy(src: FactoryDeploy): (builder: Builder) => void;
export declare function loadFactoryDeploy(slice: Slice): {
    $$type: "FactoryDeploy";
    queryId: bigint;
    cashback: Address;
};
export type MyStruct = {
    $$type: 'MyStruct';
    x: bigint;
    y: bigint;
};
export declare function storeMyStruct(src: MyStruct): (builder: Builder) => void;
export declare function loadMyStruct(slice: Slice): {
    $$type: "MyStruct";
    x: bigint;
    y: bigint;
};
export type LocalTypeInferenceTester$Data = {
    $$type: 'LocalTypeInferenceTester$Data';
};
export declare function storeLocalTypeInferenceTester$Data(src: LocalTypeInferenceTester$Data): (builder: Builder) => void;
export declare function loadLocalTypeInferenceTester$Data(slice: Slice): {
    $$type: "LocalTypeInferenceTester$Data";
};
export declare const LocalTypeInferenceTester_getterMapping: {
    [key: string]: string;
};
export declare class LocalTypeInferenceTester implements Contract {
    static init(): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(): Promise<LocalTypeInferenceTester>;
    static fromAddress(address: Address): LocalTypeInferenceTester;
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
    }, message: Deploy): Promise<void>;
    getTest1(provider: ContractProvider): Promise<bigint>;
    getTest2(provider: ContractProvider): Promise<bigint>;
    getTest3(provider: ContractProvider): Promise<Address>;
    getTest4(provider: ContractProvider): Promise<Address>;
    getTest5(provider: ContractProvider): Promise<boolean>;
    getTest6(provider: ContractProvider): Promise<Slice>;
    getTest7(provider: ContractProvider): Promise<Cell>;
    getTest8(provider: ContractProvider): Promise<Builder>;
    getTest9(provider: ContractProvider): Promise<string>;
    getTest10(provider: ContractProvider): Promise<string>;
    getTest11(provider: ContractProvider): Promise<{
        $$type: "StateInit";
        code: Cell;
        data: Cell;
    }>;
    getTest12(provider: ContractProvider): Promise<Dictionary<bigint, bigint>>;
    getTest13(provider: ContractProvider): Promise<Dictionary<bigint, number>>;
    getTest14(provider: ContractProvider): Promise<{
        $$type: "MyStruct";
        x: bigint;
        y: bigint;
    }>;
    getTest15(provider: ContractProvider): Promise<{
        $$type: "MyStruct";
        x: bigint;
        y: bigint;
    }>;
    getTest16(provider: ContractProvider): Promise<bigint | null>;
    getTest17(provider: ContractProvider): Promise<bigint | null>;
    getTest18(provider: ContractProvider): Promise<bigint | null>;
    getTest19(provider: ContractProvider): Promise<bigint | null>;
}
