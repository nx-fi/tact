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
export type MathTester$Data = {
    $$type: 'MathTester$Data';
};
export declare function storeMathTester$Data(src: MathTester$Data): (builder: Builder) => void;
export declare function loadMathTester$Data(slice: Slice): {
    $$type: "MathTester$Data";
};
export declare const MathTester_getterMapping: {
    [key: string]: string;
};
export declare class MathTester implements Contract {
    static readonly storageReserve = 0n;
    static init(): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(): Promise<MathTester>;
    static fromAddress(address: Address): MathTester;
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
    }, message: Deploy): Promise<void>;
    getAdd(provider: ContractProvider, a: bigint, b: bigint): Promise<bigint>;
    getSub(provider: ContractProvider, a: bigint, b: bigint): Promise<bigint>;
    getMul(provider: ContractProvider, a: bigint, b: bigint): Promise<bigint>;
    getDiv(provider: ContractProvider, a: bigint, b: bigint): Promise<bigint>;
    getMod(provider: ContractProvider, a: bigint, b: bigint): Promise<bigint>;
    getShr(provider: ContractProvider, a: bigint, b: bigint): Promise<bigint>;
    getShl(provider: ContractProvider, a: bigint, b: bigint): Promise<bigint>;
    getAnd(provider: ContractProvider, a: bigint, b: bigint): Promise<bigint>;
    getOr(provider: ContractProvider, a: bigint, b: bigint): Promise<bigint>;
    getXor(provider: ContractProvider, a: bigint, b: bigint): Promise<bigint>;
    getBitwiseNot(provider: ContractProvider, a: bigint): Promise<bigint>;
    getAddAug(provider: ContractProvider, a: bigint, b: bigint): Promise<bigint>;
    getSubAug(provider: ContractProvider, a: bigint, b: bigint): Promise<bigint>;
    getMulAug(provider: ContractProvider, a: bigint, b: bigint): Promise<bigint>;
    getDivAug(provider: ContractProvider, a: bigint, b: bigint): Promise<bigint>;
    getModAug(provider: ContractProvider, a: bigint, b: bigint): Promise<bigint>;
    getBitwiseOrAug(provider: ContractProvider, a: bigint, b: bigint): Promise<bigint>;
    getBitwiseAndAug(provider: ContractProvider, a: bigint, b: bigint): Promise<bigint>;
    getBitwiseXorAug(provider: ContractProvider, a: bigint, b: bigint): Promise<bigint>;
    getCompare1(provider: ContractProvider, a: bigint, b: bigint | null): Promise<boolean>;
    getCompare2(provider: ContractProvider, a: bigint, b: bigint | null): Promise<boolean>;
    getCompare3(provider: ContractProvider, a: bigint | null, b: bigint): Promise<boolean>;
    getCompare4(provider: ContractProvider, a: bigint | null, b: bigint): Promise<boolean>;
    getCompare5(provider: ContractProvider, a: bigint | null, b: bigint | null): Promise<boolean>;
    getCompare6(provider: ContractProvider, a: bigint | null, b: bigint | null): Promise<boolean>;
    getCompare7(provider: ContractProvider, a: bigint, b: bigint): Promise<boolean>;
    getCompare8(provider: ContractProvider, a: bigint, b: bigint): Promise<boolean>;
    getCompare9(provider: ContractProvider, a: bigint, b: bigint): Promise<boolean>;
    getCompare10(provider: ContractProvider, a: bigint, b: bigint): Promise<boolean>;
    getCompare11(provider: ContractProvider, a: Address, b: Address): Promise<boolean>;
    getCompare12(provider: ContractProvider, a: Address, b: Address | null): Promise<boolean>;
    getCompare13(provider: ContractProvider, a: Address | null, b: Address): Promise<boolean>;
    getCompare14(provider: ContractProvider, a: Address | null, b: Address | null): Promise<boolean>;
    getCompare15(provider: ContractProvider, a: Address, b: Address): Promise<boolean>;
    getCompare16(provider: ContractProvider, a: Address, b: Address | null): Promise<boolean>;
    getCompare17(provider: ContractProvider, a: Address | null, b: Address): Promise<boolean>;
    getCompare18(provider: ContractProvider, a: Address | null, b: Address | null): Promise<boolean>;
    getCompare19(provider: ContractProvider, a: Cell, b: Cell): Promise<boolean>;
    getCompare20(provider: ContractProvider, a: Cell, b: Cell | null): Promise<boolean>;
    getCompare21(provider: ContractProvider, a: Cell | null, b: Cell): Promise<boolean>;
    getCompare22(provider: ContractProvider, a: Cell | null, b: Cell | null): Promise<boolean>;
    getCompare23(provider: ContractProvider, a: Cell, b: Cell): Promise<boolean>;
    getCompare24(provider: ContractProvider, a: Cell, b: Cell | null): Promise<boolean>;
    getCompare25(provider: ContractProvider, a: Cell | null, b: Cell): Promise<boolean>;
    getCompare26(provider: ContractProvider, a: Cell | null, b: Cell | null): Promise<boolean>;
    getCompare27(provider: ContractProvider, a: Dictionary<bigint, bigint>, b: Dictionary<bigint, bigint>): Promise<boolean>;
    getCompare28(provider: ContractProvider, a: Dictionary<bigint, bigint>, b: Dictionary<bigint, bigint>): Promise<boolean>;
    getCompare29(provider: ContractProvider, a: Slice, b: Slice): Promise<boolean>;
    getCompare30(provider: ContractProvider, a: Slice, b: Slice | null): Promise<boolean>;
    getCompare31(provider: ContractProvider, a: Slice | null, b: Slice): Promise<boolean>;
    getCompare32(provider: ContractProvider, a: Slice | null, b: Slice | null): Promise<boolean>;
    getCompare33(provider: ContractProvider, a: Slice, b: Slice): Promise<boolean>;
    getCompare34(provider: ContractProvider, a: Slice, b: Slice | null): Promise<boolean>;
    getCompare35(provider: ContractProvider, a: Slice | null, b: Slice): Promise<boolean>;
    getCompare36(provider: ContractProvider, a: Slice | null, b: Slice | null): Promise<boolean>;
    getCompare37(provider: ContractProvider, a: string, b: string): Promise<boolean>;
    getCompare38(provider: ContractProvider, a: string, b: string | null): Promise<boolean>;
    getCompare39(provider: ContractProvider, a: string | null, b: string): Promise<boolean>;
    getCompare40(provider: ContractProvider, a: string | null, b: string | null): Promise<boolean>;
    getCompare41(provider: ContractProvider, a: string, b: string): Promise<boolean>;
    getCompare42(provider: ContractProvider, a: string, b: string | null): Promise<boolean>;
    getCompare43(provider: ContractProvider, a: string | null, b: string): Promise<boolean>;
    getCompare44(provider: ContractProvider, a: string | null, b: string | null): Promise<boolean>;
    getIsNull1(provider: ContractProvider, a: bigint | null): Promise<boolean>;
    getIsNotNull1(provider: ContractProvider, a: bigint | null): Promise<boolean>;
    getIsNull2(provider: ContractProvider, address: Address | null): Promise<boolean>;
    getIsNotNull2(provider: ContractProvider, address: Address | null): Promise<boolean>;
    getIsNull3(provider: ContractProvider, cell: Cell | null): Promise<boolean>;
    getIsNotNull3(provider: ContractProvider, cell: Cell | null): Promise<boolean>;
    getLog2(provider: ContractProvider, num: bigint): Promise<bigint>;
    getLog(provider: ContractProvider, num: bigint, base: bigint): Promise<bigint>;
    getPow(provider: ContractProvider, base: bigint, exp: bigint): Promise<bigint>;
    getPow2(provider: ContractProvider, exp: bigint): Promise<bigint>;
    getPrecedence1(provider: ContractProvider): Promise<bigint>;
    getPrecedence2(provider: ContractProvider): Promise<bigint>;
    getPrecedence3(provider: ContractProvider): Promise<bigint>;
    getPrecedence4(provider: ContractProvider): Promise<bigint>;
    getPrecedence5(provider: ContractProvider): Promise<bigint>;
    getPrecedence6(provider: ContractProvider): Promise<bigint>;
    getPrecedence7(provider: ContractProvider): Promise<bigint>;
    getPrecedence8(provider: ContractProvider): Promise<bigint>;
    getPrecedence9(provider: ContractProvider): Promise<bigint>;
    getPrecedence10(provider: ContractProvider): Promise<bigint>;
    getPrecedence11(provider: ContractProvider): Promise<bigint>;
    getPrecedence12(provider: ContractProvider): Promise<bigint>;
    getBitwiseNot1(provider: ContractProvider, x: bigint): Promise<bigint>;
    getBitwiseNot2(provider: ContractProvider, x: bigint): Promise<bigint>;
    getBitwiseNot3(provider: ContractProvider, x: bigint): Promise<bigint>;
    getBitwiseNot4(provider: ContractProvider, x: bigint): Promise<bigint>;
    getAugmentedAnd(provider: ContractProvider, a: boolean, b: boolean): Promise<boolean>;
    getAugmentedOr(provider: ContractProvider, a: boolean, b: boolean): Promise<boolean>;
    getAugmentedShiftLeft(provider: ContractProvider, a: bigint, b: bigint): Promise<bigint>;
    getAugmentedShiftRight(provider: ContractProvider, a: bigint, b: bigint): Promise<bigint>;
    getShiftLeft0(provider: ContractProvider, i: bigint): Promise<boolean>;
    getShiftRight0(provider: ContractProvider, i: bigint): Promise<boolean>;
    getSign(provider: ContractProvider, x: bigint): Promise<bigint>;
    getDivc(provider: ContractProvider, x: bigint, y: bigint): Promise<bigint>;
    getMuldivc(provider: ContractProvider, x: bigint, y: bigint, z: bigint): Promise<bigint>;
    getMulShiftRight(provider: ContractProvider, x: bigint, y: bigint, z: bigint): Promise<bigint>;
    getMulShiftRightRound(provider: ContractProvider, x: bigint, y: bigint, z: bigint): Promise<bigint>;
    getMulShiftRightCeil(provider: ContractProvider, x: bigint, y: bigint, z: bigint): Promise<bigint>;
    getSqrt(provider: ContractProvider, x: bigint): Promise<bigint>;
}
