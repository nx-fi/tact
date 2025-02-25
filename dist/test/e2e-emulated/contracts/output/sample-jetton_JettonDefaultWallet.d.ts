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
export type Mint = {
    $$type: 'Mint';
    amount: bigint;
    receiver: Address;
};
export declare function storeMint(src: Mint): (builder: Builder) => void;
export declare function loadMint(slice: Slice): {
    $$type: "Mint";
    amount: bigint;
    receiver: Address;
};
export type JettonData = {
    $$type: 'JettonData';
    totalSupply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    walletCode: Cell;
};
export declare function storeJettonData(src: JettonData): (builder: Builder) => void;
export declare function loadJettonData(slice: Slice): {
    $$type: "JettonData";
    totalSupply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    walletCode: Cell;
};
export type SampleJetton$Data = {
    $$type: 'SampleJetton$Data';
    totalSupply: bigint;
    max_supply: bigint;
    owner: Address;
    content: Cell;
    mintable: boolean;
};
export declare function storeSampleJetton$Data(src: SampleJetton$Data): (builder: Builder) => void;
export declare function loadSampleJetton$Data(slice: Slice): {
    $$type: "SampleJetton$Data";
    totalSupply: bigint;
    max_supply: bigint;
    owner: Address;
    content: Cell;
    mintable: boolean;
};
export type TokenTransfer = {
    $$type: 'TokenTransfer';
    queryId: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
};
export declare function storeTokenTransfer(src: TokenTransfer): (builder: Builder) => void;
export declare function loadTokenTransfer(slice: Slice): {
    $$type: "TokenTransfer";
    queryId: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
};
export type TokenTransferInternal = {
    $$type: 'TokenTransferInternal';
    queryId: bigint;
    amount: bigint;
    from: Address;
    response_destination: Address | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
};
export declare function storeTokenTransferInternal(src: TokenTransferInternal): (builder: Builder) => void;
export declare function loadTokenTransferInternal(slice: Slice): {
    $$type: "TokenTransferInternal";
    queryId: bigint;
    amount: bigint;
    from: Address;
    response_destination: Address | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
};
export type TokenNotification = {
    $$type: 'TokenNotification';
    queryId: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Slice;
};
export declare function storeTokenNotification(src: TokenNotification): (builder: Builder) => void;
export declare function loadTokenNotification(slice: Slice): {
    $$type: "TokenNotification";
    queryId: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Slice;
};
export type TokenBurn = {
    $$type: 'TokenBurn';
    queryId: bigint;
    amount: bigint;
    owner: Address;
    response_destination: Address;
};
export declare function storeTokenBurn(src: TokenBurn): (builder: Builder) => void;
export declare function loadTokenBurn(slice: Slice): {
    $$type: "TokenBurn";
    queryId: bigint;
    amount: bigint;
    owner: Address;
    response_destination: Address;
};
export type TokenBurnNotification = {
    $$type: 'TokenBurnNotification';
    queryId: bigint;
    amount: bigint;
    owner: Address;
    response_destination: Address | null;
};
export declare function storeTokenBurnNotification(src: TokenBurnNotification): (builder: Builder) => void;
export declare function loadTokenBurnNotification(slice: Slice): {
    $$type: "TokenBurnNotification";
    queryId: bigint;
    amount: bigint;
    owner: Address;
    response_destination: Address | null;
};
export type TokenExcesses = {
    $$type: 'TokenExcesses';
    queryId: bigint;
};
export declare function storeTokenExcesses(src: TokenExcesses): (builder: Builder) => void;
export declare function loadTokenExcesses(slice: Slice): {
    $$type: "TokenExcesses";
    queryId: bigint;
};
export type TokenUpdateContent = {
    $$type: 'TokenUpdateContent';
    content: Cell;
};
export declare function storeTokenUpdateContent(src: TokenUpdateContent): (builder: Builder) => void;
export declare function loadTokenUpdateContent(slice: Slice): {
    $$type: "TokenUpdateContent";
    content: Cell;
};
export type JettonDefaultWallet$Data = {
    $$type: 'JettonDefaultWallet$Data';
    balance: bigint;
    owner: Address;
    master: Address;
};
export declare function storeJettonDefaultWallet$Data(src: JettonDefaultWallet$Data): (builder: Builder) => void;
export declare function loadJettonDefaultWallet$Data(slice: Slice): {
    $$type: "JettonDefaultWallet$Data";
    balance: bigint;
    owner: Address;
    master: Address;
};
export type JettonWalletData = {
    $$type: 'JettonWalletData';
    balance: bigint;
    owner: Address;
    master: Address;
    walletCode: Cell;
};
export declare function storeJettonWalletData(src: JettonWalletData): (builder: Builder) => void;
export declare function loadJettonWalletData(slice: Slice): {
    $$type: "JettonWalletData";
    balance: bigint;
    owner: Address;
    master: Address;
    walletCode: Cell;
};
export declare const JettonDefaultWallet_getterMapping: {
    [key: string]: string;
};
export declare class JettonDefaultWallet implements Contract {
    static init(master: Address, owner: Address): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(master: Address, owner: Address): Promise<JettonDefaultWallet>;
    static fromAddress(address: Address): JettonDefaultWallet;
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
    }, message: TokenTransfer | TokenTransferInternal | TokenBurn): Promise<void>;
    getMsgValue(provider: ContractProvider, value: bigint): Promise<bigint>;
    getGetWalletData(provider: ContractProvider): Promise<{
        $$type: "JettonWalletData";
        balance: bigint;
        owner: Address;
        master: Address;
        walletCode: Cell;
    }>;
}
