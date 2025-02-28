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
export type A = {
    $$type: 'A';
    b: bigint;
};
export declare function storeA(src: A): (builder: Builder) => void;
export declare function loadA(slice: Slice): {
    $$type: "A";
    b: bigint;
};
export type S = {
    $$type: 'S';
    a: boolean;
    b: bigint;
};
export declare function storeS(src: S): (builder: Builder) => void;
export declare function loadS(slice: Slice): {
    $$type: "S";
    a: boolean;
    b: bigint;
};
export type T = {
    $$type: 'T';
    a: bigint;
    s: S;
};
export declare function storeT(src: T): (builder: Builder) => void;
export declare function loadT(slice: Slice): {
    $$type: "T";
    a: bigint;
    s: {
        $$type: "S";
        a: boolean;
        b: bigint;
    };
};
export type ConstantTester$Data = {
    $$type: 'ConstantTester$Data';
};
export declare function storeConstantTester$Data(src: ConstantTester$Data): (builder: Builder) => void;
export declare function loadConstantTester$Data(slice: Slice): {
    $$type: "ConstantTester$Data";
};
export declare const ConstantTester_getterMapping: {
    [key: string]: string;
};
export declare const someGlobalConst = 100n;
export declare const globalConst1 = 1n;
export declare const globalConst2 = 2n;
export declare const globalConst3 = 4n;
export declare const globalConst4 = 15n;
export declare const globalConst5 = 15n;
export declare const globalConst6 = 26n;
export declare const globalConst7 = 27n;
export declare const globalConst8 = 2n;
export declare const globalConst9 = 2n;
export declare const globalConst10 = 24n;
export declare const globalConst11 = 24n;
export declare const globalConst12 = 8n;
export declare const globalConst13 = 8n;
export declare const beforeDefinedC = 20n;
export declare const beforeDefinedA = 10n;
export declare const beforeDefinedB = 10n;
export declare const NoCircularA = 100n;
export declare const NoCircularB = 100n;
export declare class ConstantTester implements Contract {
    static readonly something1 = 11n;
    static readonly something2: null;
    static readonly something3 = 123000000000n;
    static readonly something4 = 456000000000n;
    static readonly something5 = "Hello world!";
    static readonly something6 = 10n;
    static readonly something7 = 5n;
    static readonly something8 = 4n;
    static readonly something9: Address;
    static readonly something10: Address;
    static readonly something11 = 88n;
    static readonly something12 = -90n;
    static readonly something13 = 88n;
    static readonly something14 = 243n;
    static readonly something15 = 32n;
    static readonly something16 = -115792089237316195423570985008687907853269984665640564039457584007913129639936n;
    static readonly something17 = 115792089237316195423570985008687907853269984665640564039457584007913129639935n;
    static readonly something18 = -115792089237316195423570985008687907853269984665640564039457584007913129639935n;
    static readonly something19 = -115792089237316195423570985008687907853269984665640564039457584007913129639936n;
    static readonly something20 = -6n;
    static readonly something21 = 0n;
    static readonly something22 = -1n;
    static readonly something23 = -1n;
    static readonly something24 = 0n;
    static readonly something25 = 1n;
    static readonly something26 = 4n;
    static readonly something27 = -4n;
    static readonly something28 = -1n;
    static readonly something29 = 42n;
    static readonly something30: null;
    static readonly something31 = 42n;
    static readonly something32 = 42n;
    static readonly something33: null;
    static readonly something34: null;
    static readonly something35: {
        $$type: "S";
        a: boolean;
        b: bigint;
    };
    static readonly something36: {
        $$type: "S";
        b: bigint;
        a: boolean;
    };
    static readonly something37: {
        $$type: "T";
        a: bigint;
        s: {
            $$type: "S";
            a: boolean;
            b: bigint;
        };
    };
    static readonly something38 = 4n;
    static readonly something39 = true;
    static readonly something40 = true;
    static readonly something41: Address;
    static readonly something42: Address;
    static readonly something43: Address;
    static readonly something44: Address;
    static readonly something45 = 42n;
    static readonly storageReserve = 0n;
    static init(): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(): Promise<ConstantTester>;
    static fromAddress(address: Address): ConstantTester;
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
    getSomething1(provider: ContractProvider): Promise<bigint>;
    getSomething2(provider: ContractProvider): Promise<bigint | null>;
    getSomething3(provider: ContractProvider): Promise<bigint>;
    getSomething4(provider: ContractProvider): Promise<bigint>;
    getSomething5(provider: ContractProvider): Promise<string>;
    getSomething6(provider: ContractProvider): Promise<bigint>;
    getSomething7(provider: ContractProvider): Promise<bigint>;
    getSomething8(provider: ContractProvider): Promise<bigint>;
    getSomething9(provider: ContractProvider): Promise<Address>;
    getSomething10(provider: ContractProvider): Promise<Address>;
    getSomething11(provider: ContractProvider): Promise<bigint>;
    getSomething12(provider: ContractProvider): Promise<bigint>;
    getSomething13(provider: ContractProvider): Promise<bigint>;
    getSomething14(provider: ContractProvider): Promise<bigint>;
    getSomething15(provider: ContractProvider): Promise<bigint>;
    getSomething16(provider: ContractProvider): Promise<bigint>;
    getSomething17(provider: ContractProvider): Promise<bigint>;
    getSomething18(provider: ContractProvider): Promise<bigint>;
    getSomething19(provider: ContractProvider): Promise<bigint>;
    getSomething20(provider: ContractProvider): Promise<bigint>;
    getSomething21(provider: ContractProvider): Promise<bigint>;
    getSomething22(provider: ContractProvider): Promise<bigint>;
    getSomething23(provider: ContractProvider): Promise<bigint>;
    getSomething24(provider: ContractProvider): Promise<bigint>;
    getSomething25(provider: ContractProvider): Promise<bigint>;
    getSomething26(provider: ContractProvider): Promise<bigint>;
    getSomething27(provider: ContractProvider): Promise<bigint>;
    getSomething28(provider: ContractProvider): Promise<bigint>;
    getSomething29(provider: ContractProvider): Promise<bigint | null>;
    getSomething30(provider: ContractProvider): Promise<bigint | null>;
    getSomething31(provider: ContractProvider): Promise<bigint>;
    getSomething32(provider: ContractProvider): Promise<bigint>;
    getSomething33(provider: ContractProvider): Promise<Dictionary<bigint, bigint>>;
    getSomething34(provider: ContractProvider): Promise<Dictionary<bigint, bigint>>;
    getSomething35(provider: ContractProvider): Promise<{
        $$type: "S";
        a: boolean;
        b: bigint;
    }>;
    getSomething36(provider: ContractProvider): Promise<{
        $$type: "S";
        a: boolean;
        b: bigint;
    }>;
    getSomething37(provider: ContractProvider): Promise<{
        $$type: "T";
        a: bigint;
        s: {
            $$type: "S";
            a: boolean;
            b: bigint;
        };
    }>;
    getSomething38(provider: ContractProvider): Promise<bigint>;
    getSomething39(provider: ContractProvider): Promise<boolean>;
    getSomething40(provider: ContractProvider): Promise<boolean>;
    getSomething41(provider: ContractProvider): Promise<Address>;
    getSomething42(provider: ContractProvider): Promise<Address>;
    getSomething43(provider: ContractProvider): Promise<Address>;
    getSomething44(provider: ContractProvider): Promise<Address>;
    getSomething45(provider: ContractProvider): Promise<bigint>;
    getGlobalConst1(provider: ContractProvider): Promise<bigint>;
    getGlobalConst2(provider: ContractProvider): Promise<bigint>;
    getGlobalConst3(provider: ContractProvider): Promise<bigint>;
    getGlobalConst4(provider: ContractProvider): Promise<bigint>;
    getGlobalConst5(provider: ContractProvider): Promise<bigint>;
    getGlobalConst6(provider: ContractProvider): Promise<bigint>;
    getGlobalConst7(provider: ContractProvider): Promise<bigint>;
    getGlobalConst8(provider: ContractProvider): Promise<bigint>;
    getGlobalConst9(provider: ContractProvider): Promise<bigint>;
    getGlobalConst10(provider: ContractProvider): Promise<bigint>;
    getGlobalConst11(provider: ContractProvider): Promise<bigint>;
    getGlobalConst12(provider: ContractProvider): Promise<bigint>;
    getGlobalConst13(provider: ContractProvider): Promise<bigint>;
    getBeforeDefinedA(provider: ContractProvider): Promise<bigint>;
    getBeforeDefinedC(provider: ContractProvider): Promise<bigint>;
    getDefaultFieldB(provider: ContractProvider): Promise<bigint>;
    getNoCircularA(provider: ContractProvider): Promise<bigint>;
    getMinInt1(provider: ContractProvider): Promise<bigint>;
    getMinInt2(provider: ContractProvider): Promise<bigint>;
    getMinInt3(provider: ContractProvider): Promise<bigint>;
    getGlobalConst(provider: ContractProvider): Promise<bigint>;
}
