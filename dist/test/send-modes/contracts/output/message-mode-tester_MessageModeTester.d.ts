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
export type AverageRequest = {
    $$type: 'AverageRequest';
    from: bigint;
    to: bigint;
    amountToPayInResponse: bigint;
};
export declare function storeAverageRequest(src: AverageRequest): (builder: Builder) => void;
export declare function loadAverageRequest(slice: Slice): {
    $$type: "AverageRequest";
    from: bigint;
    to: bigint;
    amountToPayInResponse: bigint;
};
export type AverageResult = {
    $$type: 'AverageResult';
    res: bigint;
};
export declare function storeAverageResult(src: AverageResult): (builder: Builder) => void;
export declare function loadAverageResult(slice: Slice): {
    $$type: "AverageResult";
    res: bigint;
};
export type Calculator$Data = {
    $$type: 'Calculator$Data';
};
export declare function storeCalculator$Data(src: Calculator$Data): (builder: Builder) => void;
export declare function loadCalculator$Data(slice: Slice): {
    $$type: "Calculator$Data";
};
export type DoCalculatorRequest = {
    $$type: 'DoCalculatorRequest';
    from: bigint;
    to: bigint;
    amountToPayInRequest: bigint;
    amountToPayInCalculatorResponse: bigint;
};
export declare function storeDoCalculatorRequest(src: DoCalculatorRequest): (builder: Builder) => void;
export declare function loadDoCalculatorRequest(slice: Slice): {
    $$type: "DoCalculatorRequest";
    from: bigint;
    to: bigint;
    amountToPayInRequest: bigint;
    amountToPayInCalculatorResponse: bigint;
};
export type MessageModeTester$Data = {
    $$type: 'MessageModeTester$Data';
    val: bigint;
};
export declare function storeMessageModeTester$Data(src: MessageModeTester$Data): (builder: Builder) => void;
export declare function loadMessageModeTester$Data(slice: Slice): {
    $$type: "MessageModeTester$Data";
    val: bigint;
};
export declare const MessageModeTester_getterMapping: {
    [key: string]: string;
};
export declare class MessageModeTester implements Contract {
    static init(): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(): Promise<MessageModeTester>;
    static fromAddress(address: Address): MessageModeTester;
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
    }, message: null | AverageResult | DoCalculatorRequest): Promise<void>;
    getCurrentResult(provider: ContractProvider): Promise<bigint>;
}
