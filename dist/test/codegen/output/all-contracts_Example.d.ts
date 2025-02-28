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
export type MyMessage = {
    $$type: 'MyMessage';
};
export declare function storeMyMessage(src: MyMessage): (builder: Builder) => void;
export declare function loadMyMessage(slice: Slice): {
    $$type: "MyMessage";
};
export type Issue74$Data = {
    $$type: 'Issue74$Data';
};
export declare function storeIssue74$Data(src: Issue74$Data): (builder: Builder) => void;
export declare function loadIssue74$Data(slice: Slice): {
    $$type: "Issue74$Data";
};
export type LargeContract$Data = {
    $$type: 'LargeContract$Data';
    testMap0: Dictionary<bigint, bigint>;
    testMap1: Dictionary<bigint, bigint>;
    testMap2: Dictionary<bigint, bigint>;
    testMap3: Dictionary<bigint, bigint>;
    testMap4: Dictionary<bigint, bigint>;
    testMap5: Dictionary<bigint, bigint>;
    testMap6: Dictionary<bigint, bigint>;
    testMap7: Dictionary<bigint, bigint>;
    testMap8: Dictionary<bigint, bigint>;
    testMap9: Dictionary<bigint, bigint>;
    testMap10: Dictionary<bigint, bigint>;
    testMap11: Dictionary<bigint, bigint>;
    testMap12: Dictionary<bigint, bigint>;
    testMap13: Dictionary<bigint, bigint>;
    testMap14: Dictionary<bigint, bigint>;
    testMap15: Dictionary<bigint, bigint>;
    testMap16: Dictionary<bigint, bigint>;
    testMap17: Dictionary<bigint, bigint>;
    testMap18: Dictionary<bigint, bigint>;
    testMap19: Dictionary<bigint, bigint>;
    testMap20: Dictionary<bigint, bigint>;
    testMap21: Dictionary<bigint, bigint>;
    testMap22: Dictionary<bigint, bigint>;
    testMap23: Dictionary<bigint, bigint>;
    testMap24: Dictionary<bigint, bigint>;
    testMap25: Dictionary<bigint, bigint>;
    testMap26: Dictionary<bigint, bigint>;
    testMap27: Dictionary<bigint, bigint>;
    testMap28: Dictionary<bigint, bigint>;
    testMap29: Dictionary<bigint, bigint>;
    testMap30: Dictionary<bigint, bigint>;
    testMap31: Dictionary<bigint, bigint>;
    testMap32: Dictionary<bigint, bigint>;
    testMap33: Dictionary<bigint, bigint>;
    testMap34: Dictionary<bigint, bigint>;
    testMap35: Dictionary<bigint, bigint>;
    testMap36: Dictionary<bigint, bigint>;
    testMap37: Dictionary<bigint, bigint>;
    testMap38: Dictionary<bigint, bigint>;
    testMap39: Dictionary<bigint, bigint>;
    testMap40: Dictionary<bigint, bigint>;
    testMap41: Dictionary<bigint, bigint>;
    testMap42: Dictionary<bigint, bigint>;
    testMap43: Dictionary<bigint, bigint>;
    testMap44: Dictionary<bigint, bigint>;
    testMap45: Dictionary<bigint, bigint>;
    testMap46: Dictionary<bigint, bigint>;
    testMap47: Dictionary<bigint, bigint>;
    testMap48: Dictionary<bigint, bigint>;
    testMap49: Dictionary<bigint, bigint>;
    testMap50: Dictionary<bigint, bigint>;
    testMap51: Dictionary<bigint, bigint>;
    testMap52: Dictionary<bigint, bigint>;
    testMap53: Dictionary<bigint, bigint>;
    testMap54: Dictionary<bigint, bigint>;
    testMap55: Dictionary<bigint, bigint>;
    testMap56: Dictionary<bigint, bigint>;
    testMap57: Dictionary<bigint, bigint>;
    testMap58: Dictionary<bigint, bigint>;
    testMap59: Dictionary<bigint, bigint>;
    testMap60: Dictionary<bigint, bigint>;
    testMap61: Dictionary<bigint, bigint>;
    testMap62: Dictionary<bigint, bigint>;
};
export declare function storeLargeContract$Data(src: LargeContract$Data): (builder: Builder) => void;
export declare function loadLargeContract$Data(slice: Slice): {
    $$type: "LargeContract$Data";
    testMap0: Dictionary<bigint, bigint>;
    testMap1: Dictionary<bigint, bigint>;
    testMap2: Dictionary<bigint, bigint>;
    testMap3: Dictionary<bigint, bigint>;
    testMap4: Dictionary<bigint, bigint>;
    testMap5: Dictionary<bigint, bigint>;
    testMap6: Dictionary<bigint, bigint>;
    testMap7: Dictionary<bigint, bigint>;
    testMap8: Dictionary<bigint, bigint>;
    testMap9: Dictionary<bigint, bigint>;
    testMap10: Dictionary<bigint, bigint>;
    testMap11: Dictionary<bigint, bigint>;
    testMap12: Dictionary<bigint, bigint>;
    testMap13: Dictionary<bigint, bigint>;
    testMap14: Dictionary<bigint, bigint>;
    testMap15: Dictionary<bigint, bigint>;
    testMap16: Dictionary<bigint, bigint>;
    testMap17: Dictionary<bigint, bigint>;
    testMap18: Dictionary<bigint, bigint>;
    testMap19: Dictionary<bigint, bigint>;
    testMap20: Dictionary<bigint, bigint>;
    testMap21: Dictionary<bigint, bigint>;
    testMap22: Dictionary<bigint, bigint>;
    testMap23: Dictionary<bigint, bigint>;
    testMap24: Dictionary<bigint, bigint>;
    testMap25: Dictionary<bigint, bigint>;
    testMap26: Dictionary<bigint, bigint>;
    testMap27: Dictionary<bigint, bigint>;
    testMap28: Dictionary<bigint, bigint>;
    testMap29: Dictionary<bigint, bigint>;
    testMap30: Dictionary<bigint, bigint>;
    testMap31: Dictionary<bigint, bigint>;
    testMap32: Dictionary<bigint, bigint>;
    testMap33: Dictionary<bigint, bigint>;
    testMap34: Dictionary<bigint, bigint>;
    testMap35: Dictionary<bigint, bigint>;
    testMap36: Dictionary<bigint, bigint>;
    testMap37: Dictionary<bigint, bigint>;
    testMap38: Dictionary<bigint, bigint>;
    testMap39: Dictionary<bigint, bigint>;
    testMap40: Dictionary<bigint, bigint>;
    testMap41: Dictionary<bigint, bigint>;
    testMap42: Dictionary<bigint, bigint>;
    testMap43: Dictionary<bigint, bigint>;
    testMap44: Dictionary<bigint, bigint>;
    testMap45: Dictionary<bigint, bigint>;
    testMap46: Dictionary<bigint, bigint>;
    testMap47: Dictionary<bigint, bigint>;
    testMap48: Dictionary<bigint, bigint>;
    testMap49: Dictionary<bigint, bigint>;
    testMap50: Dictionary<bigint, bigint>;
    testMap51: Dictionary<bigint, bigint>;
    testMap52: Dictionary<bigint, bigint>;
    testMap53: Dictionary<bigint, bigint>;
    testMap54: Dictionary<bigint, bigint>;
    testMap55: Dictionary<bigint, bigint>;
    testMap56: Dictionary<bigint, bigint>;
    testMap57: Dictionary<bigint, bigint>;
    testMap58: Dictionary<bigint, bigint>;
    testMap59: Dictionary<bigint, bigint>;
    testMap60: Dictionary<bigint, bigint>;
    testMap61: Dictionary<bigint, bigint>;
    testMap62: Dictionary<bigint, bigint>;
};
export type TokenInfo = {
    $$type: 'TokenInfo';
    ticker: string;
    decimals: bigint;
};
export declare function storeTokenInfo(src: TokenInfo): (builder: Builder) => void;
export declare function loadTokenInfo(slice: Slice): {
    $$type: "TokenInfo";
    ticker: string;
    decimals: bigint;
};
export type Replace = {
    $$type: 'Replace';
    items: Dictionary<bigint, Address>;
};
export declare function storeReplace(src: Replace): (builder: Builder) => void;
export declare function loadReplace(slice: Slice): {
    $$type: "Replace";
    items: Dictionary<bigint, Address>;
};
export type Maps$Data = {
    $$type: 'Maps$Data';
    mi1: Dictionary<bigint, TokenInfo>;
    mi2: Dictionary<bigint, boolean>;
    mi3: Dictionary<bigint, bigint>;
    mi4: Dictionary<bigint, Address>;
    ma1: Dictionary<Address, TokenInfo>;
    ma2: Dictionary<Address, boolean>;
    ma3: Dictionary<Address, bigint>;
    ma4: Dictionary<Address, Address>;
};
export declare function storeMaps$Data(src: Maps$Data): (builder: Builder) => void;
export declare function loadMaps$Data(slice: Slice): {
    $$type: "Maps$Data";
    mi1: Dictionary<bigint, TokenInfo>;
    mi2: Dictionary<bigint, boolean>;
    mi3: Dictionary<bigint, bigint>;
    mi4: Dictionary<bigint, Address>;
    ma1: Dictionary<Address, TokenInfo>;
    ma2: Dictionary<Address, boolean>;
    ma3: Dictionary<Address, bigint>;
    ma4: Dictionary<Address, Address>;
};
export type FunCKeywords = {
    $$type: 'FunCKeywords';
    var: bigint;
    ifnot: bigint;
    then: bigint;
    elseifnot: bigint;
    int: bigint;
    cell: bigint;
    slice: bigint;
    builder: bigint;
    cont: bigint;
    tuple: bigint;
    type: bigint;
    forall: bigint;
    extern: bigint;
    global: bigint;
    asm: bigint;
    impure: bigint;
    inline_ref: bigint;
    auto_apply: bigint;
    method_id: bigint;
    operator: bigint;
    infix: bigint;
    infixl: bigint;
    infixr: bigint;
};
export declare function storeFunCKeywords(src: FunCKeywords): (builder: Builder) => void;
export declare function loadFunCKeywords(slice: Slice): {
    $$type: "FunCKeywords";
    var: bigint;
    ifnot: bigint;
    then: bigint;
    elseifnot: bigint;
    int: bigint;
    cell: bigint;
    slice: bigint;
    builder: bigint;
    cont: bigint;
    tuple: bigint;
    type: bigint;
    forall: bigint;
    extern: bigint;
    global: bigint;
    asm: bigint;
    impure: bigint;
    inline_ref: bigint;
    auto_apply: bigint;
    method_id: bigint;
    operator: bigint;
    infix: bigint;
    infixl: bigint;
    infixr: bigint;
};
export type Bar$Data = {
    $$type: 'Bar$Data';
    f: FunCKeywords;
};
export declare function storeBar$Data(src: Bar$Data): (builder: Builder) => void;
export declare function loadBar$Data(slice: Slice): {
    $$type: "Bar$Data";
    f: {
        $$type: "FunCKeywords";
        var: bigint;
        ifnot: bigint;
        then: bigint;
        elseifnot: bigint;
        int: bigint;
        cell: bigint;
        slice: bigint;
        builder: bigint;
        cont: bigint;
        tuple: bigint;
        type: bigint;
        forall: bigint;
        extern: bigint;
        global: bigint;
        asm: bigint;
        impure: bigint;
        inline_ref: bigint;
        auto_apply: bigint;
        method_id: bigint;
        operator: bigint;
        infix: bigint;
        infixl: bigint;
        infixr: bigint;
    };
};
export type Binary = {
    $$type: 'Binary';
};
export declare function storeBinary(src: Binary): (builder: Builder) => void;
export declare function loadBinary(slice: Slice): {
    $$type: "Binary";
};
export type Octal = {
    $$type: 'Octal';
};
export declare function storeOctal(src: Octal): (builder: Builder) => void;
export declare function loadOctal(slice: Slice): {
    $$type: "Octal";
};
export type Decimal = {
    $$type: 'Decimal';
};
export declare function storeDecimal(src: Decimal): (builder: Builder) => void;
export declare function loadDecimal(slice: Slice): {
    $$type: "Decimal";
};
export type Hexadecimal = {
    $$type: 'Hexadecimal';
};
export declare function storeHexadecimal(src: Hexadecimal): (builder: Builder) => void;
export declare function loadHexadecimal(slice: Slice): {
    $$type: "Hexadecimal";
};
export type Example$Data = {
    $$type: 'Example$Data';
};
export declare function storeExample$Data(src: Example$Data): (builder: Builder) => void;
export declare function loadExample$Data(slice: Slice): {
    $$type: "Example$Data";
};
export type Position = {
    $$type: 'Position';
    tokenId: bigint;
    foo: bigint | null;
};
export declare function storePosition(src: Position): (builder: Builder) => void;
export declare function loadPosition(slice: Slice): {
    $$type: "Position";
    tokenId: bigint;
    foo: bigint | null;
};
export type Test$Data = {
    $$type: 'Test$Data';
};
export declare function storeTest$Data(src: Test$Data): (builder: Builder) => void;
export declare function loadTest$Data(slice: Slice): {
    $$type: "Test$Data";
};
export type Foo = {
    $$type: 'Foo';
    x: bigint;
};
export declare function storeFoo(src: Foo): (builder: Builder) => void;
export declare function loadFoo(slice: Slice): {
    $$type: "Foo";
    x: bigint;
};
export type MutatingMethodOnNonLvalues$Data = {
    $$type: 'MutatingMethodOnNonLvalues$Data';
};
export declare function storeMutatingMethodOnNonLvalues$Data(src: MutatingMethodOnNonLvalues$Data): (builder: Builder) => void;
export declare function loadMutatingMethodOnNonLvalues$Data(slice: Slice): {
    $$type: "MutatingMethodOnNonLvalues$Data";
};
export type TestGlobalFunctionShadowing$Data = {
    $$type: 'TestGlobalFunctionShadowing$Data';
};
export declare function storeTestGlobalFunctionShadowing$Data(src: TestGlobalFunctionShadowing$Data): (builder: Builder) => void;
export declare function loadTestGlobalFunctionShadowing$Data(slice: Slice): {
    $$type: "TestGlobalFunctionShadowing$Data";
};
export type MapUintBool$Data = {
    $$type: 'MapUintBool$Data';
    m: Dictionary<bigint, boolean>;
};
export declare function storeMapUintBool$Data(src: MapUintBool$Data): (builder: Builder) => void;
export declare function loadMapUintBool$Data(slice: Slice): {
    $$type: "MapUintBool$Data";
    m: Dictionary<bigint, boolean>;
};
export type TestContract$Data = {
    $$type: 'TestContract$Data';
};
export declare function storeTestContract$Data(src: TestContract$Data): (builder: Builder) => void;
export declare function loadTestContract$Data(slice: Slice): {
    $$type: "TestContract$Data";
};
export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
};
export declare function storeDeploy(src: Deploy): (builder: Builder) => void;
export declare function loadDeploy(slice: Slice): {
    $$type: "Deploy";
    queryId: bigint;
};
export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
};
export declare function storeDeployOk(src: DeployOk): (builder: Builder) => void;
export declare function loadDeployOk(slice: Slice): {
    $$type: "DeployOk";
    queryId: bigint;
};
export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
};
export declare function storeFactoryDeploy(src: FactoryDeploy): (builder: Builder) => void;
export declare function loadFactoryDeploy(slice: Slice): {
    $$type: "FactoryDeploy";
    queryId: bigint;
    cashback: Address;
};
export declare const Example_getterMapping: {
    [key: string]: string;
};
export declare const GlobalConst = 42n;
export declare class Example implements Contract {
    static readonly storageReserve = 0n;
    static readonly ContractConst = 43n;
    static init(): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(): Promise<Example>;
    static fromAddress(address: Address): Example;
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
    }, message: Binary | Octal | Decimal | Hexadecimal): Promise<void>;
}
