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
export type UpdateJettonWalletCode = {
    $$type: 'UpdateJettonWalletCode';
    newJettonWalletCode: Cell;
};
export declare function storeUpdateJettonWalletCode(src: UpdateJettonWalletCode): (builder: Builder) => void;
export declare function loadUpdateJettonWalletCode(slice: Slice): {
    $$type: "UpdateJettonWalletCode";
    newJettonWalletCode: Cell;
};
export type TakeEscrowData = {
    $$type: 'TakeEscrowData';
    escrowData: EscrowData;
};
export declare function storeTakeEscrowData(src: TakeEscrowData): (builder: Builder) => void;
export declare function loadTakeEscrowData(slice: Slice): {
    $$type: "TakeEscrowData";
    escrowData: {
        $$type: "EscrowData";
        id: bigint;
        sellerAddress: Address;
        guarantorAddress: Address;
        dealAmount: bigint;
        guarantorRoyaltyPercent: bigint;
        isFunded: boolean;
        assetAddress: Address | null;
        jettonWalletCode: Cell | null;
        buyerAddress: Address | null;
    };
};
export type Funding = {
    $$type: 'Funding';
};
export declare function storeFunding(src: Funding): (builder: Builder) => void;
export declare function loadFunding(slice: Slice): {
    $$type: "Funding";
};
export type Approve = {
    $$type: 'Approve';
};
export declare function storeApprove(src: Approve): (builder: Builder) => void;
export declare function loadApprove(slice: Slice): {
    $$type: "Approve";
};
export type Cancel = {
    $$type: 'Cancel';
};
export declare function storeCancel(src: Cancel): (builder: Builder) => void;
export declare function loadCancel(slice: Slice): {
    $$type: "Cancel";
};
export type ProvideEscrowData = {
    $$type: 'ProvideEscrowData';
};
export declare function storeProvideEscrowData(src: ProvideEscrowData): (builder: Builder) => void;
export declare function loadProvideEscrowData(slice: Slice): {
    $$type: "ProvideEscrowData";
};
export type EscrowData = {
    $$type: 'EscrowData';
    id: bigint;
    sellerAddress: Address;
    guarantorAddress: Address;
    dealAmount: bigint;
    guarantorRoyaltyPercent: bigint;
    isFunded: boolean;
    assetAddress: Address | null;
    jettonWalletCode: Cell | null;
    buyerAddress: Address | null;
};
export declare function storeEscrowData(src: EscrowData): (builder: Builder) => void;
export declare function loadEscrowData(slice: Slice): {
    $$type: "EscrowData";
    id: bigint;
    sellerAddress: Address;
    guarantorAddress: Address;
    dealAmount: bigint;
    guarantorRoyaltyPercent: bigint;
    isFunded: boolean;
    assetAddress: Address | null;
    jettonWalletCode: Cell | null;
    buyerAddress: Address | null;
};
export type Escrow$Data = {
    $$type: 'Escrow$Data';
    id: bigint;
    sellerAddress: Address;
    guarantorAddress: Address;
    buyerAddress: Address | null;
    dealAmount: bigint;
    guarantorRoyaltyPercent: bigint;
    isFunded: boolean;
    assetAddress: Address | null;
    jettonWalletCode: Cell | null;
};
export declare function storeEscrow$Data(src: Escrow$Data): (builder: Builder) => void;
export declare function loadEscrow$Data(slice: Slice): {
    $$type: "Escrow$Data";
    id: bigint;
    sellerAddress: Address;
    guarantorAddress: Address;
    buyerAddress: Address | null;
    dealAmount: bigint;
    guarantorRoyaltyPercent: bigint;
    isFunded: boolean;
    assetAddress: Address | null;
    jettonWalletCode: Cell | null;
};
export declare const Escrow_getterMapping: {
    [key: string]: string;
};
export declare class Escrow implements Contract {
    static readonly GUARANTOR_PERCENT_CONST = 100000n;
    static readonly GUARANTOR_PERCENT_MAX = 90000n;
    static readonly JETTON_TRANSFER_GAS = 50000000n;
    static readonly TON_TRANSFER_GAS = 15000000n;
    static readonly storageReserve = 0n;
    static init(id: bigint, sellerAddress: Address, guarantorAddress: Address, dealAmount: bigint, guarantorRoyaltyPercent: bigint, assetAddress: Address | null, jettonWalletCode: Cell | null): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(id: bigint, sellerAddress: Address, guarantorAddress: Address, dealAmount: bigint, guarantorRoyaltyPercent: bigint, assetAddress: Address | null, jettonWalletCode: Cell | null): Promise<Escrow>;
    static fromAddress(address: Address): Escrow;
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
    }, message: Funding | UpdateJettonWalletCode | JettonNotification | Approve | Cancel | ProvideEscrowData): Promise<void>;
    getCalculateRoyaltyAmount(provider: ContractProvider): Promise<bigint>;
    getWalletAddress(provider: ContractProvider): Promise<Address>;
    getEscrowInfo(provider: ContractProvider): Promise<{
        $$type: "Escrow$Data";
        id: bigint;
        sellerAddress: Address;
        guarantorAddress: Address;
        buyerAddress: Address | null;
        dealAmount: bigint;
        guarantorRoyaltyPercent: bigint;
        isFunded: boolean;
        assetAddress: Address | null;
        jettonWalletCode: Cell | null;
    }>;
}
