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
export type StringsTester$Data = {
    $$type: 'StringsTester$Data';
};
export declare function storeStringsTester$Data(src: StringsTester$Data): (builder: Builder) => void;
export declare function loadStringsTester$Data(slice: Slice): {
    $$type: "StringsTester$Data";
};
export declare const StringsTester_getterMapping: {
    [key: string]: string;
};
export declare class StringsTester implements Contract {
    static init(): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(): Promise<StringsTester>;
    static fromAddress(address: Address): StringsTester;
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
    }, message: null | "backtick-test"): Promise<void>;
    getConstantString(provider: ContractProvider): Promise<string>;
    getConstantStringUnicode(provider: ContractProvider): Promise<string>;
    getConstantStringUnicodeLong(provider: ContractProvider): Promise<string>;
    getDynamicStringCell(provider: ContractProvider): Promise<Cell>;
    getDynamicStringCell2(provider: ContractProvider): Promise<Cell>;
    getDynamicCommentCell(provider: ContractProvider): Promise<Cell>;
    getDynamicCommentCellLarge(provider: ContractProvider): Promise<Cell>;
    getDynamicCommentStringLarge(provider: ContractProvider): Promise<string>;
    getStringWithNumber(provider: ContractProvider): Promise<string>;
    getStringWithNegativeNumber(provider: ContractProvider): Promise<string>;
    getStringWithLargeNumber(provider: ContractProvider): Promise<string>;
    getStringWithFloat(provider: ContractProvider): Promise<string>;
    getIntToString(provider: ContractProvider, x: bigint): Promise<string>;
    getFloatToString(provider: ContractProvider, x: bigint, digits: bigint): Promise<string>;
    getBase64(provider: ContractProvider): Promise<Slice>;
    getProcessBase64(provider: ContractProvider, src: string): Promise<Slice>;
    getStringWithEscapedChars1(provider: ContractProvider): Promise<string>;
    getStringWithEscapedChars2(provider: ContractProvider): Promise<string>;
    getStringWithEscapedChars3(provider: ContractProvider): Promise<string>;
    getStringWithEscapedChars4(provider: ContractProvider): Promise<string>;
    getStringWithEscapedChars5(provider: ContractProvider): Promise<string>;
    getStringWithEscapedChars6(provider: ContractProvider): Promise<string>;
    getStringWithAddress(provider: ContractProvider): Promise<string>;
}
