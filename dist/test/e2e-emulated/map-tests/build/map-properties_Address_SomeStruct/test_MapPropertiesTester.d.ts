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
export type KeyData = {
    $$type: 'KeyData';
    _1: Address;
    _2: Address;
};
export declare function storeKeyData(src: KeyData): (builder: Builder) => void;
export declare function loadKeyData(slice: Slice): {
    $$type: "KeyData";
    _1: Address;
    _2: Address;
};
export type ValData = {
    $$type: 'ValData';
    _1: SomeStruct;
    _2: SomeStruct;
};
export declare function storeValData(src: ValData): (builder: Builder) => void;
export declare function loadValData(slice: Slice): {
    $$type: "ValData";
    _1: {
        $$type: "SomeStruct";
        i: bigint;
        b: boolean;
        a: Address;
        u1: bigint;
        u2: bigint;
    };
    _2: {
        $$type: "SomeStruct";
        i: bigint;
        b: boolean;
        a: Address;
        u1: bigint;
        u2: bigint;
    };
};
export type SomeStruct = {
    $$type: 'SomeStruct';
    i: bigint;
    b: boolean;
    a: Address;
    u1: bigint;
    u2: bigint;
};
export declare function storeSomeStruct(src: SomeStruct): (builder: Builder) => void;
export declare function loadSomeStruct(slice: Slice): {
    $$type: "SomeStruct";
    i: bigint;
    b: boolean;
    a: Address;
    u1: bigint;
    u2: bigint;
};
export type SomeMessage = {
    $$type: 'SomeMessage';
    buyer: Address;
    nonce: bigint;
};
export declare function storeSomeMessage(src: SomeMessage): (builder: Builder) => void;
export declare function loadSomeMessage(slice: Slice): {
    $$type: "SomeMessage";
    buyer: Address;
    nonce: bigint;
};
export type MapPropertiesTester$Data = {
    $$type: 'MapPropertiesTester$Data';
};
export declare function storeMapPropertiesTester$Data(src: MapPropertiesTester$Data): (builder: Builder) => void;
export declare function loadMapPropertiesTester$Data(slice: Slice): {
    $$type: "MapPropertiesTester$Data";
};
export declare const MapPropertiesTester_getterMapping: {
    [key: string]: string;
};
export declare class MapPropertiesTester implements Contract {
    static readonly ExitCodeEqualKeys = 1024n;
    static readonly ExitCodeKeyMustBeMissing = 1025n;
    static readonly ExitCodeKeyMustBePresent = 1026n;
    static readonly ExitCodeUnequalMapHashes = 1027n;
    static readonly storageReserve = 0n;
    static init(): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(): Promise<MapPropertiesTester>;
    static fromAddress(address: Address): MapPropertiesTester;
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
    getTestEmptyMapGet(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestGetDoesNotModify(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestSetModifies(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestSetGetSameKey(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestSetGetNotSameKey(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestSetIdempotent(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestSetSetOfNotSameCommutes(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestDelGetSameKeyPresent(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestDelGetSameKeyMissing(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestDelOfPresentModifies(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestDelOfMissingDoesNotModify(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestDelDelOfSameDoesNotModify(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestSetDelOfMissingDoesNotModify(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestDelSetOfSamePresent(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestDelSetOfSameMissing(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestDelSetOfNotSameCommutes(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestEmptyMapSize(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestSingletonMapSize(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestDoubletonMapSize(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestGetNonNullEquivalentExists(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestEmptyMapIsEmpty(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestNonEmptyMapsNotIsEmpty(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestEqualsImpliesDeepEquals(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestThereDeepEqualMapsThatAreNotEqual(provider: ContractProvider, _key: KeyData, _val: ValData): Promise<boolean>;
    getTestAsCellEquals(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestAsCellDoesNothing(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestReplaceEmptyMap(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestReplaceDoesNotModifyIfKeyIsMissing(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestReplaceWorksAsSetIfKeyIsPresent(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestReplaceGetSameKeyIfPresent(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestReplaceGetNotSameKey(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestReplaceIdempotent(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestReplaceReplaceOfNotSameCommutes(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestEmptyMapReplaceGet(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestDelReplaceGet(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
    getTestSetReplaceGet(provider: ContractProvider, key: KeyData, val: ValData): Promise<boolean>;
}
