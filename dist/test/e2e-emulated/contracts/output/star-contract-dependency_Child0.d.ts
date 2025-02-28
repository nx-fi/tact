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
export type Parent$Data = {
    $$type: 'Parent$Data';
    parentMark: bigint;
};
export declare function storeParent$Data(src: Parent$Data): (builder: Builder) => void;
export declare function loadParent$Data(slice: Slice): {
    $$type: "Parent$Data";
    parentMark: bigint;
};
export type Child0$Data = {
    $$type: 'Child0$Data';
    childNum: bigint;
};
export declare function storeChild0$Data(src: Child0$Data): (builder: Builder) => void;
export declare function loadChild0$Data(slice: Slice): {
    $$type: "Child0$Data";
    childNum: bigint;
};
export type Child1$Data = {
    $$type: 'Child1$Data';
    childNum: bigint;
};
export declare function storeChild1$Data(src: Child1$Data): (builder: Builder) => void;
export declare function loadChild1$Data(slice: Slice): {
    $$type: "Child1$Data";
    childNum: bigint;
};
export type Child2$Data = {
    $$type: 'Child2$Data';
    childNum: bigint;
};
export declare function storeChild2$Data(src: Child2$Data): (builder: Builder) => void;
export declare function loadChild2$Data(slice: Slice): {
    $$type: "Child2$Data";
    childNum: bigint;
};
export type Child3$Data = {
    $$type: 'Child3$Data';
    childNum: bigint;
};
export declare function storeChild3$Data(src: Child3$Data): (builder: Builder) => void;
export declare function loadChild3$Data(slice: Slice): {
    $$type: "Child3$Data";
    childNum: bigint;
};
export type Child4$Data = {
    $$type: 'Child4$Data';
    childNum: bigint;
};
export declare function storeChild4$Data(src: Child4$Data): (builder: Builder) => void;
export declare function loadChild4$Data(slice: Slice): {
    $$type: "Child4$Data";
    childNum: bigint;
};
export type Child5$Data = {
    $$type: 'Child5$Data';
    childNum: bigint;
};
export declare function storeChild5$Data(src: Child5$Data): (builder: Builder) => void;
export declare function loadChild5$Data(slice: Slice): {
    $$type: "Child5$Data";
    childNum: bigint;
};
export type Child6$Data = {
    $$type: 'Child6$Data';
    childNum: bigint;
};
export declare function storeChild6$Data(src: Child6$Data): (builder: Builder) => void;
export declare function loadChild6$Data(slice: Slice): {
    $$type: "Child6$Data";
    childNum: bigint;
};
export type Child7$Data = {
    $$type: 'Child7$Data';
    childNum: bigint;
};
export declare function storeChild7$Data(src: Child7$Data): (builder: Builder) => void;
export declare function loadChild7$Data(slice: Slice): {
    $$type: "Child7$Data";
    childNum: bigint;
};
export type Child8$Data = {
    $$type: 'Child8$Data';
    childNum: bigint;
};
export declare function storeChild8$Data(src: Child8$Data): (builder: Builder) => void;
export declare function loadChild8$Data(slice: Slice): {
    $$type: "Child8$Data";
    childNum: bigint;
};
export type Child9$Data = {
    $$type: 'Child9$Data';
    childNum: bigint;
};
export declare function storeChild9$Data(src: Child9$Data): (builder: Builder) => void;
export declare function loadChild9$Data(slice: Slice): {
    $$type: "Child9$Data";
    childNum: bigint;
};
export declare const Child0_getterMapping: {
    [key: string]: string;
};
export declare class Child0 implements Contract {
    static readonly storageReserve = 0n;
    static init(): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(): Promise<Child0>;
    static fromAddress(address: Address): Child0;
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
}
