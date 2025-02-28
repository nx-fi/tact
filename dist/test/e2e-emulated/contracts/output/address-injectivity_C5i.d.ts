import { Cell, Slice, Address, Builder, ContractProvider, Contract, ContractABI } from '@ton/core';
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
export type C1$Data = {
    $$type: 'C1$Data';
    f1: bigint;
};
export declare function storeC1$Data(src: C1$Data): (builder: Builder) => void;
export declare function loadC1$Data(slice: Slice): {
    $$type: "C1$Data";
    f1: bigint;
};
export type C2$Data = {
    $$type: 'C2$Data';
    f1: bigint;
};
export declare function storeC2$Data(src: C2$Data): (builder: Builder) => void;
export declare function loadC2$Data(slice: Slice): {
    $$type: "C2$Data";
    f1: bigint;
};
export type C3f$Data = {
    $$type: 'C3f$Data';
    f1: bigint;
    f2: bigint;
};
export declare function storeC3f$Data(src: C3f$Data): (builder: Builder) => void;
export declare function loadC3f$Data(slice: Slice): {
    $$type: "C3f$Data";
    f1: bigint;
    f2: bigint;
};
export type C4g$Data = {
    $$type: 'C4g$Data';
    f1: bigint;
};
export declare function storeC4g$Data(src: C4g$Data): (builder: Builder) => void;
export declare function loadC4g$Data(slice: Slice): {
    $$type: "C4g$Data";
    f1: bigint;
};
export type C5i$Data = {
    $$type: 'C5i$Data';
    f1: bigint;
};
export declare function storeC5i$Data(src: C5i$Data): (builder: Builder) => void;
export declare function loadC5i$Data(slice: Slice): {
    $$type: "C5i$Data";
    f1: bigint;
};
export type C6fn$Data = {
    $$type: 'C6fn$Data';
    f: bigint;
};
export declare function storeC6fn$Data(src: C6fn$Data): (builder: Builder) => void;
export declare function loadC6fn$Data(slice: Slice): {
    $$type: "C6fn$Data";
    f: bigint;
};
export type C7gt$Data = {
    $$type: 'C7gt$Data';
    f1: bigint;
};
export declare function storeC7gt$Data(src: C7gt$Data): (builder: Builder) => void;
export declare function loadC7gt$Data(slice: Slice): {
    $$type: "C7gt$Data";
    f1: bigint;
};
export type C8h$Data = {
    $$type: 'C8h$Data';
    h1: bigint;
    h2: bigint;
};
export declare function storeC8h$Data(src: C8h$Data): (builder: Builder) => void;
export declare function loadC8h$Data(slice: Slice): {
    $$type: "C8h$Data";
    h1: bigint;
    h2: bigint;
};
export type C9g2$Data = {
    $$type: 'C9g2$Data';
    f1: bigint;
    f2: bigint;
};
export declare function storeC9g2$Data(src: C9g2$Data): (builder: Builder) => void;
export declare function loadC9g2$Data(slice: Slice): {
    $$type: "C9g2$Data";
    f1: bigint;
    f2: bigint;
};
export type C10o$Data = {
    $$type: 'C10o$Data';
    f2: bigint;
    f1: bigint;
};
export declare function storeC10o$Data(src: C10o$Data): (builder: Builder) => void;
export declare function loadC10o$Data(slice: Slice): {
    $$type: "C10o$Data";
    f2: bigint;
    f1: bigint;
};
export type Tester$Data = {
    $$type: 'Tester$Data';
};
export declare function storeTester$Data(src: Tester$Data): (builder: Builder) => void;
export declare function loadTester$Data(slice: Slice): {
    $$type: "Tester$Data";
};
export declare const C5i_getterMapping: {
    [key: string]: string;
};
export declare class C5i implements Contract {
    static readonly storageReserve = 0n;
    static init(n: bigint): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(n: bigint): Promise<C5i>;
    static fromAddress(address: Address): C5i;
    readonly address: Address;
    readonly init?: {
        code: Cell;
        data: Cell;
    };
    readonly abi: ContractABI;
    private constructor();
    getIncrAndGetField1(provider: ContractProvider, n: bigint): Promise<bigint>;
}
