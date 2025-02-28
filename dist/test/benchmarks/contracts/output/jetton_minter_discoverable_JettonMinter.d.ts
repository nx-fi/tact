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
export type JettonWallet$Data = {
    $$type: 'JettonWallet$Data';
    balance: bigint;
    owner: Address;
    master: Address;
};
export declare function storeJettonWallet$Data(src: JettonWallet$Data): (builder: Builder) => void;
export declare function loadJettonWallet$Data(slice: Slice): {
    $$type: "JettonWallet$Data";
    balance: bigint;
    owner: Address;
    master: Address;
};
export type JettonData = {
    $$type: 'JettonData';
    totalSupply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    jettonWalletCode: Cell;
};
export declare function storeJettonData(src: JettonData): (builder: Builder) => void;
export declare function loadJettonData(slice: Slice): {
    $$type: "JettonData";
    totalSupply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    jettonWalletCode: Cell;
};
export type JettonWalletData = {
    $$type: 'JettonWalletData';
    balance: bigint;
    owner: Address;
    master: Address;
    code: Cell;
};
export declare function storeJettonWalletData(src: JettonWalletData): (builder: Builder) => void;
export declare function loadJettonWalletData(slice: Slice): {
    $$type: "JettonWalletData";
    balance: bigint;
    owner: Address;
    master: Address;
    code: Cell;
};
export type MaybeAddress = {
    $$type: 'MaybeAddress';
    address: Address | null;
};
export declare function storeMaybeAddress(src: MaybeAddress): (builder: Builder) => void;
export declare function loadMaybeAddress(slice: Slice): {
    $$type: "MaybeAddress";
    address: Address | null;
};
export type JettonUpdateContent = {
    $$type: 'JettonUpdateContent';
    queryId: bigint;
    content: Cell;
};
export declare function storeJettonUpdateContent(src: JettonUpdateContent): (builder: Builder) => void;
export declare function loadJettonUpdateContent(slice: Slice): {
    $$type: "JettonUpdateContent";
    queryId: bigint;
    content: Cell;
};
export type JettonTransfer = {
    $$type: 'JettonTransfer';
    queryId: bigint;
    amount: bigint;
    destination: Address;
    responseDestination: Address | null;
    customPayload: Cell | null;
    forwardTonAmount: bigint;
    forwardPayload: Slice;
};
export declare function storeJettonTransfer(src: JettonTransfer): (builder: Builder) => void;
export declare function loadJettonTransfer(slice: Slice): {
    $$type: "JettonTransfer";
    queryId: bigint;
    amount: bigint;
    destination: Address;
    responseDestination: Address | null;
    customPayload: Cell | null;
    forwardTonAmount: bigint;
    forwardPayload: Slice;
};
export type JettonTransferInternal = {
    $$type: 'JettonTransferInternal';
    queryId: bigint;
    amount: bigint;
    sender: Address;
    responseDestination: Address | null;
    forwardTonAmount: bigint;
    forwardPayload: Slice;
};
export declare function storeJettonTransferInternal(src: JettonTransferInternal): (builder: Builder) => void;
export declare function loadJettonTransferInternal(slice: Slice): {
    $$type: "JettonTransferInternal";
    queryId: bigint;
    amount: bigint;
    sender: Address;
    responseDestination: Address | null;
    forwardTonAmount: bigint;
    forwardPayload: Slice;
};
export type JettonNotification = {
    $$type: 'JettonNotification';
    queryId: bigint;
    amount: bigint;
    sender: Address;
    forwardPayload: Slice;
};
export declare function storeJettonNotification(src: JettonNotification): (builder: Builder) => void;
export declare function loadJettonNotification(slice: Slice): {
    $$type: "JettonNotification";
    queryId: bigint;
    amount: bigint;
    sender: Address;
    forwardPayload: Slice;
};
export type JettonBurn = {
    $$type: 'JettonBurn';
    queryId: bigint;
    amount: bigint;
    responseDestination: Address;
    customPayload: Cell | null;
};
export declare function storeJettonBurn(src: JettonBurn): (builder: Builder) => void;
export declare function loadJettonBurn(slice: Slice): {
    $$type: "JettonBurn";
    queryId: bigint;
    amount: bigint;
    responseDestination: Address;
    customPayload: Cell | null;
};
export type JettonBurnNotification = {
    $$type: 'JettonBurnNotification';
    queryId: bigint;
    amount: bigint;
    sender: Address;
    responseDestination: Address;
};
export declare function storeJettonBurnNotification(src: JettonBurnNotification): (builder: Builder) => void;
export declare function loadJettonBurnNotification(slice: Slice): {
    $$type: "JettonBurnNotification";
    queryId: bigint;
    amount: bigint;
    sender: Address;
    responseDestination: Address;
};
export type JettonExcesses = {
    $$type: 'JettonExcesses';
    queryId: bigint;
};
export declare function storeJettonExcesses(src: JettonExcesses): (builder: Builder) => void;
export declare function loadJettonExcesses(slice: Slice): {
    $$type: "JettonExcesses";
    queryId: bigint;
};
export type ProvideWalletAddress = {
    $$type: 'ProvideWalletAddress';
    queryId: bigint;
    ownerAddress: Address;
    includeAddress: boolean;
};
export declare function storeProvideWalletAddress(src: ProvideWalletAddress): (builder: Builder) => void;
export declare function loadProvideWalletAddress(slice: Slice): {
    $$type: "ProvideWalletAddress";
    queryId: bigint;
    ownerAddress: Address;
    includeAddress: boolean;
};
export type TakeWalletAddress = {
    $$type: 'TakeWalletAddress';
    queryId: bigint;
    walletAddress: Address;
    ownerAddress: Cell | null;
};
export declare function storeTakeWalletAddress(src: TakeWalletAddress): (builder: Builder) => void;
export declare function loadTakeWalletAddress(slice: Slice): {
    $$type: "TakeWalletAddress";
    queryId: bigint;
    walletAddress: Address;
    ownerAddress: Cell | null;
};
export type Mint = {
    $$type: 'Mint';
    queryId: bigint;
    receiver: Address;
    tonAmount: bigint;
    mintMessage: JettonTransferInternal;
};
export declare function storeMint(src: Mint): (builder: Builder) => void;
export declare function loadMint(slice: Slice): {
    $$type: "Mint";
    queryId: bigint;
    receiver: Address;
    tonAmount: bigint;
    mintMessage: {
        $$type: "JettonTransferInternal";
        queryId: bigint;
        amount: bigint;
        sender: Address;
        responseDestination: Address | null;
        forwardTonAmount: bigint;
        forwardPayload: Slice;
    };
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
export type JettonMasterState = {
    $$type: 'JettonMasterState';
    totalSupply: bigint;
    mintable: boolean;
    adminAddress: Address;
    jettonContent: Cell;
    jettonWalletCode: Cell;
};
export declare function storeJettonMasterState(src: JettonMasterState): (builder: Builder) => void;
export declare function loadJettonMasterState(slice: Slice): {
    $$type: "JettonMasterState";
    totalSupply: bigint;
    mintable: boolean;
    adminAddress: Address;
    jettonContent: Cell;
    jettonWalletCode: Cell;
};
export type JettonMinter$Data = {
    $$type: 'JettonMinter$Data';
    totalSupply: bigint;
    owner: Address;
    jettonContent: Cell;
};
export declare function storeJettonMinter$Data(src: JettonMinter$Data): (builder: Builder) => void;
export declare function loadJettonMinter$Data(slice: Slice): {
    $$type: "JettonMinter$Data";
    totalSupply: bigint;
    owner: Address;
    jettonContent: Cell;
};
export declare const JettonMinter_getterMapping: {
    [key: string]: string;
};
export declare const ProvideAddressGasConsumption = 10000000n;
export declare const Workchain = 0n;
export declare class JettonMinter implements Contract {
    static readonly minTonsForStorage = 10000000n;
    static readonly gasConsumption = 15000000n;
    static readonly storageReserve = 0n;
    static init(totalSupply: bigint, owner: Address, jettonContent: Cell): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(totalSupply: bigint, owner: Address, jettonContent: Cell): Promise<JettonMinter>;
    static fromAddress(address: Address): JettonMinter;
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
    }, message: ProvideWalletAddress | JettonBurnNotification | JettonUpdateContent | Mint | ChangeOwner): Promise<void>;
    getGetJettonData(provider: ContractProvider): Promise<{
        $$type: "JettonMasterState";
        totalSupply: bigint;
        mintable: boolean;
        adminAddress: Address;
        jettonContent: Cell;
        jettonWalletCode: Cell;
    }>;
    getGetWalletAddress(provider: ContractProvider, ownerAddress: Address): Promise<Address>;
}
