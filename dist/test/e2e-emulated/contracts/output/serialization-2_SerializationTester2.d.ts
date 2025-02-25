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
export type Vars = {
    $$type: 'Vars';
    a: bigint;
    b: bigint;
    c: bigint;
    d: bigint;
    e: bigint;
};
export declare function storeVars(src: Vars): (builder: Builder) => void;
export declare function loadVars(slice: Slice): {
    $$type: "Vars";
    a: bigint;
    b: bigint;
    c: bigint;
    d: bigint;
    e: bigint;
};
export type Both = {
    $$type: 'Both';
    a: Vars;
    b: Vars;
};
export declare function storeBoth(src: Both): (builder: Builder) => void;
export declare function loadBoth(slice: Slice): {
    $$type: "Both";
    a: {
        $$type: "Vars";
        a: bigint;
        b: bigint;
        c: bigint;
        d: bigint;
        e: bigint;
    };
    b: {
        $$type: "Vars";
        a: bigint;
        b: bigint;
        c: bigint;
        d: bigint;
        e: bigint;
    };
};
export type Update = {
    $$type: 'Update';
    a: Vars;
    b: Vars;
};
export declare function storeUpdate(src: Update): (builder: Builder) => void;
export declare function loadUpdate(slice: Slice): {
    $$type: "Update";
    a: {
        $$type: "Vars";
        a: bigint;
        b: bigint;
        c: bigint;
        d: bigint;
        e: bigint;
    };
    b: {
        $$type: "Vars";
        a: bigint;
        b: bigint;
        c: bigint;
        d: bigint;
        e: bigint;
    };
};
export type SerializationTester2$Data = {
    $$type: 'SerializationTester2$Data';
    a: Vars;
    b: Vars;
};
export declare function storeSerializationTester2$Data(src: SerializationTester2$Data): (builder: Builder) => void;
export declare function loadSerializationTester2$Data(slice: Slice): {
    $$type: "SerializationTester2$Data";
    a: {
        $$type: "Vars";
        a: bigint;
        b: bigint;
        c: bigint;
        d: bigint;
        e: bigint;
    };
    b: {
        $$type: "Vars";
        a: bigint;
        b: bigint;
        c: bigint;
        d: bigint;
        e: bigint;
    };
};
export declare const SerializationTester2_getterMapping: {
    [key: string]: string;
};
export declare class SerializationTester2 implements Contract {
    static init(a: Vars, b: Vars): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(a: Vars, b: Vars): Promise<SerializationTester2>;
    static fromAddress(address: Address): SerializationTester2;
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
    }, message: null | Update): Promise<void>;
    getGetA(provider: ContractProvider): Promise<{
        $$type: "Vars";
        a: bigint;
        b: bigint;
        c: bigint;
        d: bigint;
        e: bigint;
    }>;
    getGetAOpt(provider: ContractProvider): Promise<{
        $$type: "Vars";
        a: bigint;
        b: bigint;
        c: bigint;
        d: bigint;
        e: bigint;
    } | null>;
    getGetB(provider: ContractProvider): Promise<{
        $$type: "Vars";
        a: bigint;
        b: bigint;
        c: bigint;
        d: bigint;
        e: bigint;
    }>;
    getGetBOpt(provider: ContractProvider): Promise<{
        $$type: "Vars";
        a: bigint;
        b: bigint;
        c: bigint;
        d: bigint;
        e: bigint;
    } | null>;
    getGetBoth(provider: ContractProvider): Promise<{
        $$type: "Both";
        a: {
            $$type: "Vars";
            a: bigint;
            b: bigint;
            c: bigint;
            d: bigint;
            e: bigint;
        };
        b: {
            $$type: "Vars";
            a: bigint;
            b: bigint;
            c: bigint;
            d: bigint;
            e: bigint;
        };
    }>;
    getGetBothOpt(provider: ContractProvider): Promise<{
        $$type: "Both";
        a: {
            $$type: "Vars";
            a: bigint;
            b: bigint;
            c: bigint;
            d: bigint;
            e: bigint;
        };
        b: {
            $$type: "Vars";
            a: bigint;
            b: bigint;
            c: bigint;
            d: bigint;
            e: bigint;
        };
    } | null>;
    getProcess(provider: ContractProvider, src: Vars, both: Both, both2: Both | null): Promise<{
        $$type: "Vars";
        a: bigint;
        b: bigint;
        c: bigint;
        d: bigint;
        e: bigint;
    }>;
}
