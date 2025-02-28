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
export type SA = {
    $$type: 'SA';
    a1: bigint;
    a2: SB;
};
export declare function storeSA(src: SA): (builder: Builder) => void;
export declare function loadSA(slice: Slice): {
    $$type: "SA";
    a1: bigint;
    a2: {
        $$type: "SB";
        b1: boolean;
        b2: {
            $$type: "SC";
            c1: bigint;
        };
        b3: bigint;
    };
};
export type SB = {
    $$type: 'SB';
    b1: boolean;
    b2: SC;
    b3: bigint;
};
export declare function storeSB(src: SB): (builder: Builder) => void;
export declare function loadSB(slice: Slice): {
    $$type: "SB";
    b1: boolean;
    b2: {
        $$type: "SC";
        c1: bigint;
    };
    b3: bigint;
};
export type SC = {
    $$type: 'SC';
    c1: bigint;
};
export declare function storeSC(src: SC): (builder: Builder) => void;
export declare function loadSC(slice: Slice): {
    $$type: "SC";
    c1: bigint;
};
export type MapWrapper = {
    $$type: 'MapWrapper';
    m: Dictionary<bigint, SA>;
};
export declare function storeMapWrapper(src: MapWrapper): (builder: Builder) => void;
export declare function loadMapWrapper(slice: Slice): {
    $$type: "MapWrapper";
    m: Dictionary<bigint, SA>;
};
export type SemanticsTester$Data = {
    $$type: 'SemanticsTester$Data';
    sC: SC;
    sB: SB;
    sA: SA;
    uB: SB;
    mA: Dictionary<bigint, SA>;
    mB: Dictionary<bigint, boolean>;
    mC: Dictionary<bigint, MapWrapper>;
    mutateContractStateResult: boolean;
};
export declare function storeSemanticsTester$Data(src: SemanticsTester$Data): (builder: Builder) => void;
export declare function loadSemanticsTester$Data(slice: Slice): {
    $$type: "SemanticsTester$Data";
    sC: {
        $$type: "SC";
        c1: bigint;
    };
    sB: {
        $$type: "SB";
        b1: boolean;
        b2: {
            $$type: "SC";
            c1: bigint;
        };
        b3: bigint;
    };
    sA: {
        $$type: "SA";
        a1: bigint;
        a2: {
            $$type: "SB";
            b1: boolean;
            b2: {
                $$type: "SC";
                c1: bigint;
            };
            b3: bigint;
        };
    };
    uB: {
        $$type: "SB";
        b1: boolean;
        b2: {
            $$type: "SC";
            c1: bigint;
        };
        b3: bigint;
    };
    mA: Dictionary<bigint, SA>;
    mB: Dictionary<bigint, boolean>;
    mC: Dictionary<bigint, MapWrapper>;
    mutateContractStateResult: boolean;
};
export declare const SemanticsTester_getterMapping: {
    [key: string]: string;
};
export declare class SemanticsTester implements Contract {
    static readonly storageReserve = 0n;
    static init(): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(): Promise<SemanticsTester>;
    static fromAddress(address: Address): SemanticsTester;
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
    }, message: null | "mutate"): Promise<void>;
    getCheckAllContractFieldsAreUnchanged(provider: ContractProvider): Promise<boolean>;
    getStructAssign1(provider: ContractProvider): Promise<boolean>;
    getStructAssign2(provider: ContractProvider): Promise<boolean>;
    getParamStruct1(provider: ContractProvider): Promise<boolean>;
    getParamStruct2(provider: ContractProvider): Promise<boolean>;
    getMutateParamStruct1(provider: ContractProvider): Promise<boolean>;
    getMutateParamStruct2(provider: ContractProvider): Promise<boolean>;
    getTestReturnedStructs(provider: ContractProvider): Promise<boolean>;
    getMutatesChainStruct1(provider: ContractProvider): Promise<boolean>;
    getMutatesChainStruct2(provider: ContractProvider): Promise<boolean>;
    getMutatesChainStruct3(provider: ContractProvider): Promise<boolean>;
    getMutatesChainStruct4(provider: ContractProvider): Promise<boolean>;
    getMutatesChainStruct5(provider: ContractProvider): Promise<boolean>;
    getMutatesChainStruct6(provider: ContractProvider): Promise<boolean>;
    getMapAssign1(provider: ContractProvider): Promise<boolean>;
    getMapAssign2(provider: ContractProvider): Promise<boolean>;
    getParamMap1(provider: ContractProvider): Promise<boolean>;
    getParamMap2(provider: ContractProvider): Promise<boolean>;
    getMutateParamMap1(provider: ContractProvider): Promise<boolean>;
    getMutateParamMap2(provider: ContractProvider): Promise<boolean>;
    getTestReturnedMaps1(provider: ContractProvider): Promise<boolean>;
    getMutateNestedMap1(provider: ContractProvider): Promise<boolean>;
    getContractAssign1(provider: ContractProvider): Promise<boolean>;
    getContractAssign2(provider: ContractProvider): Promise<boolean>;
    getParamContract(provider: ContractProvider): Promise<boolean>;
    getMutateParamContract(provider: ContractProvider): Promise<boolean>;
    getAddress(provider: ContractProvider): Promise<Address>;
    getTestReturnedContracts(provider: ContractProvider): Promise<boolean>;
    getMutateContractStateFlag(provider: ContractProvider): Promise<boolean>;
    getChangesPersisted(provider: ContractProvider): Promise<boolean>;
    getMutatesChainInt1(provider: ContractProvider): Promise<boolean>;
    getMutatesChainInt2(provider: ContractProvider): Promise<boolean>;
    getMutatesChainInt3(provider: ContractProvider): Promise<boolean>;
    getMutatesChainInt4(provider: ContractProvider): Promise<boolean>;
    getMutatesChainInt5(provider: ContractProvider): Promise<boolean>;
    getMutatesChainInt6(provider: ContractProvider): Promise<boolean>;
    getAndMutateShortCircuit(provider: ContractProvider): Promise<boolean>;
    getAndInfiniteLoopShortCircuit(provider: ContractProvider): Promise<boolean>;
    getAndExceptionShortCircuit(provider: ContractProvider): Promise<boolean>;
    getOrMutateShortCircuit(provider: ContractProvider): Promise<boolean>;
    getOrInfiniteLoopShortCircuit(provider: ContractProvider): Promise<boolean>;
    getOrExceptionShortCircuit(provider: ContractProvider): Promise<boolean>;
    getTernaryMutateShortCircuit(provider: ContractProvider): Promise<boolean>;
    getTernaryInfiniteLoopShortCircuit(provider: ContractProvider): Promise<boolean>;
    getTernaryExceptionShortCircuit(provider: ContractProvider): Promise<boolean>;
    getTestAddressEquality(provider: ContractProvider): Promise<boolean>;
    getTestInversesParseStdAddressAndNewAddress(provider: ContractProvider): Promise<boolean>;
    getTestSliceEquality1(provider: ContractProvider): Promise<boolean>;
    getTestSliceEquality2(provider: ContractProvider): Promise<boolean>;
    getTestCellEquality1(provider: ContractProvider): Promise<boolean>;
    getTestCellEquality2(provider: ContractProvider): Promise<boolean>;
    getTestCellEquality3(provider: ContractProvider): Promise<boolean>;
}
