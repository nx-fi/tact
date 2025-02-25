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
export type EntryFirst = {
    $$type: 'EntryFirst';
    amountToAdd: bigint;
    toAddress: Address;
};
export declare function storeEntryFirst(src: EntryFirst): (builder: Builder) => void;
export declare function loadEntryFirst(slice: Slice): {
    $$type: "EntryFirst";
    amountToAdd: bigint;
    toAddress: Address;
};
export type EntrySecond = {
    $$type: 'EntrySecond';
    amountToAdd: bigint;
    toAddress: Address;
};
export declare function storeEntrySecond(src: EntrySecond): (builder: Builder) => void;
export declare function loadEntrySecond(slice: Slice): {
    $$type: "EntrySecond";
    amountToAdd: bigint;
    toAddress: Address;
};
export type First = {
    $$type: 'First';
    amount: bigint;
    myCoins: bigint;
    myBool3: boolean;
    anAddress: Address;
};
export declare function storeFirst(src: First): (builder: Builder) => void;
export declare function loadFirst(slice: Slice): {
    $$type: "First";
    amount: bigint;
    myCoins: bigint;
    myBool3: boolean;
    anAddress: Address;
};
export type Second = {
    $$type: 'Second';
    amount_bigger: bigint;
    myBool: boolean;
    thisDoesNotFit: bigint;
    myAddress: Address;
    myBool2: boolean;
    myStruct: MyStruct;
    myStruct2: MyStruct;
};
export declare function storeSecond(src: Second): (builder: Builder) => void;
export declare function loadSecond(slice: Slice): {
    $$type: "Second";
    amount_bigger: bigint;
    myBool: boolean;
    thisDoesNotFit: bigint;
    myAddress: Address;
    myBool2: boolean;
    myStruct: {
        $$type: "MyStruct";
        amount: bigint;
    };
    myStruct2: {
        $$type: "MyStruct";
        amount: bigint;
    };
};
export type Large = {
    $$type: 'Large';
    address: Address;
    value: bigint;
};
export declare function storeLarge(src: Large): (builder: Builder) => void;
export declare function loadLarge(slice: Slice): {
    $$type: "Large";
    address: Address;
    value: bigint;
};
export type SmallBounce = {
    $$type: 'SmallBounce';
    amount: bigint;
    myBool3: boolean;
};
export declare function storeSmallBounce(src: SmallBounce): (builder: Builder) => void;
export declare function loadSmallBounce(slice: Slice): {
    $$type: "SmallBounce";
    amount: bigint;
    myBool3: boolean;
};
export type MyStruct = {
    $$type: 'MyStruct';
    amount: bigint;
};
export declare function storeMyStruct(src: MyStruct): (builder: Builder) => void;
export declare function loadMyStruct(slice: Slice): {
    $$type: "MyStruct";
    amount: bigint;
};
export type SampleContract$Data = {
    $$type: 'SampleContract$Data';
    a: bigint;
};
export declare function storeSampleContract$Data(src: SampleContract$Data): (builder: Builder) => void;
export declare function loadSampleContract$Data(slice: Slice): {
    $$type: "SampleContract$Data";
    a: bigint;
};
export type SampleContract2$Data = {
    $$type: 'SampleContract2$Data';
};
export declare function storeSampleContract2$Data(src: SampleContract2$Data): (builder: Builder) => void;
export declare function loadSampleContract2$Data(slice: Slice): {
    $$type: "SampleContract2$Data";
};
export declare const SampleContract2_getterMapping: {
    [key: string]: string;
};
export declare class SampleContract2 implements Contract {
    static init(): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(): Promise<SampleContract2>;
    static fromAddress(address: Address): SampleContract2;
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
    }, message: null | First | Second): Promise<void>;
}
