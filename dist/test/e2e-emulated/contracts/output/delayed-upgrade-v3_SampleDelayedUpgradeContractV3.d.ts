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
export type Upgrade = {
    $$type: 'Upgrade';
    code: Cell | null;
    data: Cell | null;
    timeout: bigint;
};
export declare function storeUpgrade(src: Upgrade): (builder: Builder) => void;
export declare function loadUpgrade(slice: Slice): {
    $$type: "Upgrade";
    code: Cell | null;
    data: Cell | null;
    timeout: bigint;
};
export type Confirm = {
    $$type: 'Confirm';
};
export declare function storeConfirm(src: Confirm): (builder: Builder) => void;
export declare function loadConfirm(slice: Slice): {
    $$type: "Confirm";
};
export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
};
export declare function storeChangeOwner(src: ChangeOwner): (builder: Builder) => void;
export declare function loadChangeOwner(slice: Slice): {
    $$type: "ChangeOwner";
    queryId: bigint;
    newOwner: Address;
};
export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
};
export declare function storeChangeOwnerOk(src: ChangeOwnerOk): (builder: Builder) => void;
export declare function loadChangeOwnerOk(slice: Slice): {
    $$type: "ChangeOwnerOk";
    queryId: bigint;
    newOwner: Address;
};
export type Add = {
    $$type: 'Add';
    amount: bigint;
};
export declare function storeAdd(src: Add): (builder: Builder) => void;
export declare function loadAdd(slice: Slice): {
    $$type: "Add";
    amount: bigint;
};
export type SampleDelayedUpgradeContractV3$Data = {
    $$type: 'SampleDelayedUpgradeContractV3$Data';
    _version: bigint;
    initiatedAt: bigint;
    upgradeInfo: Upgrade;
    owner: Address;
    counter: bigint;
};
export declare function storeSampleDelayedUpgradeContractV3$Data(src: SampleDelayedUpgradeContractV3$Data): (builder: Builder) => void;
export declare function loadSampleDelayedUpgradeContractV3$Data(slice: Slice): {
    $$type: "SampleDelayedUpgradeContractV3$Data";
    _version: bigint;
    initiatedAt: bigint;
    upgradeInfo: {
        $$type: "Upgrade";
        code: Cell | null;
        data: Cell | null;
        timeout: bigint;
    };
    owner: Address;
    counter: bigint;
};
export declare const SampleDelayedUpgradeContractV3_getterMapping: {
    [key: string]: string;
};
export declare class SampleDelayedUpgradeContractV3 implements Contract {
    static readonly storageReserve = 0n;
    static init(owner: Address): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(owner: Address): Promise<SampleDelayedUpgradeContractV3>;
    static fromAddress(address: Address): SampleDelayedUpgradeContractV3;
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
    }, message: null | "increment" | "decrement" | Confirm | Upgrade): Promise<void>;
    getCounter(provider: ContractProvider): Promise<bigint>;
    getIsUpgradable(provider: ContractProvider): Promise<boolean>;
    getVersion(provider: ContractProvider): Promise<bigint>;
    getOwner(provider: ContractProvider): Promise<Address>;
}
