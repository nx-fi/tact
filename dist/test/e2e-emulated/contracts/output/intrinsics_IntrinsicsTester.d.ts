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
export type IntrinsicsTester$Data = {
    $$type: 'IntrinsicsTester$Data';
    a: bigint;
    b: string;
    c: Address;
    d: Cell;
    e: bigint;
    f: bigint;
    g: Slice;
    h: Slice;
    i: bigint;
    j: bigint;
    k: bigint;
    l: bigint;
    m: Slice;
    n: Slice;
    o: Slice;
    p: Slice;
    q: Slice;
    r: Slice;
    s: Slice;
    t: Slice;
    u: Slice;
    w: Slice;
    v: Slice;
};
export declare function storeIntrinsicsTester$Data(src: IntrinsicsTester$Data): (builder: Builder) => void;
export declare function loadIntrinsicsTester$Data(slice: Slice): {
    $$type: "IntrinsicsTester$Data";
    a: bigint;
    b: string;
    c: Address;
    d: Cell;
    e: bigint;
    f: bigint;
    g: Slice;
    h: Slice;
    i: bigint;
    j: bigint;
    k: bigint;
    l: bigint;
    m: Slice;
    n: Slice;
    o: Slice;
    p: Slice;
    q: Slice;
    r: Slice;
    s: Slice;
    t: Slice;
    u: Slice;
    w: Slice;
    v: Slice;
};
export declare const IntrinsicsTester_getterMapping: {
    [key: string]: string;
};
export declare class IntrinsicsTester implements Contract {
    static init(): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(): Promise<IntrinsicsTester>;
    static fromAddress(address: Address): IntrinsicsTester;
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
    }, message: "Deploy" | "emit_1"): Promise<void>;
    getGetTons(provider: ContractProvider): Promise<bigint>;
    getGetTons2(provider: ContractProvider): Promise<bigint>;
    getGetString(provider: ContractProvider): Promise<string>;
    getGetString2(provider: ContractProvider): Promise<string>;
    getGetAddress(provider: ContractProvider): Promise<Address>;
    getGetAddress2(provider: ContractProvider): Promise<Address>;
    getGetCell(provider: ContractProvider): Promise<Cell>;
    getGetCell2(provider: ContractProvider): Promise<Cell>;
    getGetPow(provider: ContractProvider): Promise<bigint>;
    getGetPow2(provider: ContractProvider): Promise<bigint>;
    getGetComment(provider: ContractProvider): Promise<Cell>;
    getGetHash(provider: ContractProvider): Promise<bigint>;
    getGetHashSlice(provider: ContractProvider): Promise<bigint>;
    getGetHash2(provider: ContractProvider): Promise<bigint>;
    getGetHash3(provider: ContractProvider, src: Slice): Promise<bigint>;
    getGetHash4(provider: ContractProvider, src: string): Promise<bigint>;
    getGetHashLongComptime(provider: ContractProvider): Promise<bigint>;
    getGetHashLongRuntime(provider: ContractProvider, src: string): Promise<bigint>;
    getGetHashLongRuntimeSlice(provider: ContractProvider, src: Slice): Promise<bigint>;
    getGetHashSha256U(provider: ContractProvider, src: Slice): Promise<bigint>;
    getGetHashHashextsha256(provider: ContractProvider, src: Slice): Promise<bigint>;
    getGetSlice(provider: ContractProvider): Promise<Slice>;
    getGetSlice2(provider: ContractProvider): Promise<Slice>;
    getGetRawSlice(provider: ContractProvider): Promise<Slice>;
    getGetRawSlice2(provider: ContractProvider): Promise<Slice>;
    getGetRawSlice3(provider: ContractProvider): Promise<Slice>;
    getGetRawSlice4(provider: ContractProvider): Promise<Slice>;
    getGetAscii(provider: ContractProvider): Promise<bigint>;
    getGetAscii2(provider: ContractProvider): Promise<bigint>;
    getGetAscii3(provider: ContractProvider): Promise<bigint>;
    getGetAscii4(provider: ContractProvider): Promise<bigint>;
    getGetCrc32(provider: ContractProvider): Promise<bigint>;
    getGetCrc32_2(provider: ContractProvider): Promise<bigint>;
    getGetCrc32_3(provider: ContractProvider): Promise<bigint>;
    getGetCrc32_4(provider: ContractProvider): Promise<bigint>;
    getGetRawSlice5(provider: ContractProvider): Promise<Slice>;
    getGetRawSlice6(provider: ContractProvider): Promise<Slice>;
    getGetRawSlice7(provider: ContractProvider): Promise<Slice>;
    getGetRawSlice8(provider: ContractProvider): Promise<Slice>;
    getGetRawSlice9(provider: ContractProvider): Promise<Slice>;
    getGetRawSlice10(provider: ContractProvider): Promise<Slice>;
    getGetRawSlice11(provider: ContractProvider): Promise<Slice>;
    getGetRawSlice12(provider: ContractProvider): Promise<Slice>;
    getGetRawSlice13(provider: ContractProvider): Promise<Slice>;
    getGetRawSlice14(provider: ContractProvider): Promise<Slice>;
    getGetRawSlice15(provider: ContractProvider): Promise<Slice>;
    getGetRawSlice16(provider: ContractProvider): Promise<Slice>;
    getGetRawSlice17(provider: ContractProvider): Promise<Slice>;
    getGetRawSlice18(provider: ContractProvider): Promise<Slice>;
    getGetRawSlice19(provider: ContractProvider): Promise<Slice>;
    getGetRawSlice20(provider: ContractProvider): Promise<Slice>;
    getGetRawSlice21(provider: ContractProvider): Promise<Slice>;
    getGetRawSlice22(provider: ContractProvider): Promise<Slice>;
    getGetRawSlice23(provider: ContractProvider): Promise<Slice>;
    getGetRawSlice24(provider: ContractProvider): Promise<Slice>;
}
