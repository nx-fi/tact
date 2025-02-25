import {
    Cell,
    Slice,
    Address,
    Builder,
    beginCell,
    ComputeError,
    TupleItem,
    TupleReader,
    Dictionary,
    contractAddress,
    ContractProvider,
    Sender,
    Contract,
    ContractABI,
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue,
} from "@ton/core";

export type DataSize = {
    $$type: "DataSize";
    cells: bigint;
    bits: bigint;
    refs: bigint;
};

export function storeDataSize(src: DataSize) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}

export function loadDataSize(slice: Slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return {
        $$type: "DataSize" as const,
        cells: _cells,
        bits: _bits,
        refs: _refs,
    };
}

function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return {
        $$type: "DataSize" as const,
        cells: _cells,
        bits: _bits,
        refs: _refs,
    };
}

function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return {
        $$type: "DataSize" as const,
        cells: _cells,
        bits: _bits,
        refs: _refs,
    };
}

function storeTupleDataSize(source: DataSize) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}

function dictValueParserDataSize(): DictionaryValue<DataSize> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        },
    };
}

export type StateInit = {
    $$type: "StateInit";
    code: Cell;
    data: Cell;
};

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: "StateInit" as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: "StateInit" as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: "StateInit" as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    const builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        },
    };
}

export type Context = {
    $$type: "Context";
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
};

export function storeContext(src: Context) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return {
        $$type: "Context" as const,
        bounceable: _bounceable,
        sender: _sender,
        value: _value,
        raw: _raw,
    };
}

function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return {
        $$type: "Context" as const,
        bounceable: _bounceable,
        sender: _sender,
        value: _value,
        raw: _raw,
    };
}

function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return {
        $$type: "Context" as const,
        bounceable: _bounceable,
        sender: _sender,
        value: _value,
        raw: _raw,
    };
}

function storeTupleContext(source: Context) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        },
    };
}

export type SendParameters = {
    $$type: "SendParameters";
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
};

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) {
            b_0.storeBit(true).storeRef(src.body);
        } else {
            b_0.storeBit(false);
        }
        if (src.code !== null && src.code !== undefined) {
            b_0.storeBit(true).storeRef(src.code);
        } else {
            b_0.storeBit(false);
        }
        if (src.data !== null && src.data !== undefined) {
            b_0.storeBit(true).storeRef(src.data);
        } else {
            b_0.storeBit(false);
        }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadSendParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return {
        $$type: "SendParameters" as const,
        mode: _mode,
        body: _body,
        code: _code,
        data: _data,
        value: _value,
        to: _to,
        bounce: _bounce,
    };
}

function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return {
        $$type: "SendParameters" as const,
        mode: _mode,
        body: _body,
        code: _code,
        data: _data,
        value: _value,
        to: _to,
        bounce: _bounce,
    };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return {
        $$type: "SendParameters" as const,
        mode: _mode,
        body: _body,
        code: _code,
        data: _data,
        value: _value,
        to: _to,
        bounce: _bounce,
    };
}

function storeTupleSendParameters(source: SendParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeSendParameters(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        },
    };
}

export type DeployParameters = {
    $$type: "DeployParameters";
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
};

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) {
            b_0.storeBit(true).storeRef(src.body);
        } else {
            b_0.storeBit(false);
        }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}

export function loadDeployParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return {
        $$type: "DeployParameters" as const,
        mode: _mode,
        body: _body,
        value: _value,
        bounce: _bounce,
        init: _init,
    };
}

function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return {
        $$type: "DeployParameters" as const,
        mode: _mode,
        body: _body,
        value: _value,
        bounce: _bounce,
        init: _init,
    };
}

function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return {
        $$type: "DeployParameters" as const,
        mode: _mode,
        body: _body,
        value: _value,
        bounce: _bounce,
        init: _init,
    };
}

function storeTupleDeployParameters(source: DeployParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}

function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeDeployParameters(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        },
    };
}

export type StdAddress = {
    $$type: "StdAddress";
    workchain: bigint;
    address: bigint;
};

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return {
        $$type: "StdAddress" as const,
        workchain: _workchain,
        address: _address,
    };
}

function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return {
        $$type: "StdAddress" as const,
        workchain: _workchain,
        address: _address,
    };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return {
        $$type: "StdAddress" as const,
        workchain: _workchain,
        address: _address,
    };
}

function storeTupleStdAddress(source: StdAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        },
    };
}

export type VarAddress = {
    $$type: "VarAddress";
    workchain: bigint;
    address: Slice;
};

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return {
        $$type: "VarAddress" as const,
        workchain: _workchain,
        address: _address,
    };
}

function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return {
        $$type: "VarAddress" as const,
        workchain: _workchain,
        address: _address,
    };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return {
        $$type: "VarAddress" as const,
        workchain: _workchain,
        address: _address,
    };
}

function storeTupleVarAddress(source: VarAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        },
    };
}

export type ChangeOwner = {
    $$type: "ChangeOwner";
    queryId: bigint;
    newOwner: Address;
};

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) {
        throw Error("Invalid prefix");
    }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return {
        $$type: "ChangeOwner" as const,
        queryId: _queryId,
        newOwner: _newOwner,
    };
}

function loadTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return {
        $$type: "ChangeOwner" as const,
        queryId: _queryId,
        newOwner: _newOwner,
    };
}

function loadGetterTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return {
        $$type: "ChangeOwner" as const,
        queryId: _queryId,
        newOwner: _newOwner,
    };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeChangeOwner(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        },
    };
}

export type ChangeOwnerOk = {
    $$type: "ChangeOwnerOk";
    queryId: bigint;
    newOwner: Address;
};

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) {
        throw Error("Invalid prefix");
    }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return {
        $$type: "ChangeOwnerOk" as const,
        queryId: _queryId,
        newOwner: _newOwner,
    };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return {
        $$type: "ChangeOwnerOk" as const,
        queryId: _queryId,
        newOwner: _newOwner,
    };
}

function loadGetterTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return {
        $$type: "ChangeOwnerOk" as const,
        queryId: _queryId,
        newOwner: _newOwner,
    };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeChangeOwnerOk(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        },
    };
}

export type Mint = {
    $$type: "Mint";
    amount: bigint;
    receiver: Address;
};

export function storeMint(src: Mint) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4235234258, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.receiver);
    };
}

export function loadMint(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4235234258) {
        throw Error("Invalid prefix");
    }
    const _amount = sc_0.loadIntBig(257);
    const _receiver = sc_0.loadAddress();
    return { $$type: "Mint" as const, amount: _amount, receiver: _receiver };
}

function loadTupleMint(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _receiver = source.readAddress();
    return { $$type: "Mint" as const, amount: _amount, receiver: _receiver };
}

function loadGetterTupleMint(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _receiver = source.readAddress();
    return { $$type: "Mint" as const, amount: _amount, receiver: _receiver };
}

function storeTupleMint(source: Mint) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.receiver);
    return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMint(src)).endCell());
        },
        parse: (src) => {
            return loadMint(src.loadRef().beginParse());
        },
    };
}

export type JettonData = {
    $$type: "JettonData";
    totalSupply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    walletCode: Cell;
};

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.totalSupply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.walletCode);
    };
}

export function loadJettonData(slice: Slice) {
    const sc_0 = slice;
    const _totalSupply = sc_0.loadIntBig(257);
    const _mintable = sc_0.loadBit();
    const _owner = sc_0.loadAddress();
    const _content = sc_0.loadRef();
    const _walletCode = sc_0.loadRef();
    return {
        $$type: "JettonData" as const,
        totalSupply: _totalSupply,
        mintable: _mintable,
        owner: _owner,
        content: _content,
        walletCode: _walletCode,
    };
}

function loadTupleJettonData(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _walletCode = source.readCell();
    return {
        $$type: "JettonData" as const,
        totalSupply: _totalSupply,
        mintable: _mintable,
        owner: _owner,
        content: _content,
        walletCode: _walletCode,
    };
}

function loadGetterTupleJettonData(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _walletCode = source.readCell();
    return {
        $$type: "JettonData" as const,
        totalSupply: _totalSupply,
        mintable: _mintable,
        owner: _owner,
        content: _content,
        walletCode: _walletCode,
    };
}

function storeTupleJettonData(source: JettonData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.walletCode);
    return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        },
    };
}

export type SampleJetton$Data = {
    $$type: "SampleJetton$Data";
    totalSupply: bigint;
    max_supply: bigint;
    owner: Address;
    content: Cell;
    mintable: boolean;
};

export function storeSampleJetton$Data(src: SampleJetton$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeCoins(src.totalSupply);
        b_0.storeCoins(src.max_supply);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeBit(src.mintable);
    };
}

export function loadSampleJetton$Data(slice: Slice) {
    const sc_0 = slice;
    const _totalSupply = sc_0.loadCoins();
    const _max_supply = sc_0.loadCoins();
    const _owner = sc_0.loadAddress();
    const _content = sc_0.loadRef();
    const _mintable = sc_0.loadBit();
    return {
        $$type: "SampleJetton$Data" as const,
        totalSupply: _totalSupply,
        max_supply: _max_supply,
        owner: _owner,
        content: _content,
        mintable: _mintable,
    };
}

function loadTupleSampleJetton$Data(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _max_supply = source.readBigNumber();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _mintable = source.readBoolean();
    return {
        $$type: "SampleJetton$Data" as const,
        totalSupply: _totalSupply,
        max_supply: _max_supply,
        owner: _owner,
        content: _content,
        mintable: _mintable,
    };
}

function loadGetterTupleSampleJetton$Data(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _max_supply = source.readBigNumber();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _mintable = source.readBoolean();
    return {
        $$type: "SampleJetton$Data" as const,
        totalSupply: _totalSupply,
        max_supply: _max_supply,
        owner: _owner,
        content: _content,
        mintable: _mintable,
    };
}

function storeTupleSampleJetton$Data(source: SampleJetton$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeNumber(source.max_supply);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeBoolean(source.mintable);
    return builder.build();
}

function dictValueParserSampleJetton$Data(): DictionaryValue<SampleJetton$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeSampleJetton$Data(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadSampleJetton$Data(src.loadRef().beginParse());
        },
    };
}

export type TokenTransfer = {
    $$type: "TokenTransfer";
    queryId: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
};

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) {
            b_0.storeBit(true).storeRef(src.custom_payload);
        } else {
            b_0.storeBit(false);
        }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransfer(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) {
        throw Error("Invalid prefix");
    }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _destination = sc_0.loadAddress();
    const _response_destination = sc_0.loadMaybeAddress();
    const _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _forward_ton_amount = sc_0.loadCoins();
    const _forward_payload = sc_0;
    return {
        $$type: "TokenTransfer" as const,
        queryId: _queryId,
        amount: _amount,
        destination: _destination,
        response_destination: _response_destination,
        custom_payload: _custom_payload,
        forward_ton_amount: _forward_ton_amount,
        forward_payload: _forward_payload,
    };
}

function loadTupleTokenTransfer(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _destination = source.readAddress();
    const _response_destination = source.readAddressOpt();
    const _custom_payload = source.readCellOpt();
    const _forward_ton_amount = source.readBigNumber();
    const _forward_payload = source.readCell().asSlice();
    return {
        $$type: "TokenTransfer" as const,
        queryId: _queryId,
        amount: _amount,
        destination: _destination,
        response_destination: _response_destination,
        custom_payload: _custom_payload,
        forward_ton_amount: _forward_ton_amount,
        forward_payload: _forward_payload,
    };
}

function loadGetterTupleTokenTransfer(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _destination = source.readAddress();
    const _response_destination = source.readAddressOpt();
    const _custom_payload = source.readCellOpt();
    const _forward_ton_amount = source.readBigNumber();
    const _forward_payload = source.readCell().asSlice();
    return {
        $$type: "TokenTransfer" as const,
        queryId: _queryId,
        amount: _amount,
        destination: _destination,
        response_destination: _response_destination,
        custom_payload: _custom_payload,
        forward_ton_amount: _forward_ton_amount,
        forward_payload: _forward_payload,
    };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeTokenTransfer(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        },
    };
}

export type TokenTransferInternal = {
    $$type: "TokenTransferInternal";
    queryId: bigint;
    amount: bigint;
    from: Address;
    response_destination: Address | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
};

export function storeTokenTransferInternal(src: TokenTransferInternal) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransferInternal(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) {
        throw Error("Invalid prefix");
    }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _from = sc_0.loadAddress();
    const _response_destination = sc_0.loadMaybeAddress();
    const _forward_ton_amount = sc_0.loadCoins();
    const _forward_payload = sc_0;
    return {
        $$type: "TokenTransferInternal" as const,
        queryId: _queryId,
        amount: _amount,
        from: _from,
        response_destination: _response_destination,
        forward_ton_amount: _forward_ton_amount,
        forward_payload: _forward_payload,
    };
}

function loadTupleTokenTransferInternal(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _from = source.readAddress();
    const _response_destination = source.readAddressOpt();
    const _forward_ton_amount = source.readBigNumber();
    const _forward_payload = source.readCell().asSlice();
    return {
        $$type: "TokenTransferInternal" as const,
        queryId: _queryId,
        amount: _amount,
        from: _from,
        response_destination: _response_destination,
        forward_ton_amount: _forward_ton_amount,
        forward_payload: _forward_payload,
    };
}

function loadGetterTupleTokenTransferInternal(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _from = source.readAddress();
    const _response_destination = source.readAddressOpt();
    const _forward_ton_amount = source.readBigNumber();
    const _forward_payload = source.readCell().asSlice();
    return {
        $$type: "TokenTransferInternal" as const,
        queryId: _queryId,
        amount: _amount,
        from: _from,
        response_destination: _response_destination,
        forward_ton_amount: _forward_ton_amount,
        forward_payload: _forward_payload,
    };
}

function storeTupleTokenTransferInternal(source: TokenTransferInternal) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTokenTransferInternal(): DictionaryValue<TokenTransferInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeTokenTransferInternal(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadTokenTransferInternal(src.loadRef().beginParse());
        },
    };
}

export type TokenNotification = {
    $$type: "TokenNotification";
    queryId: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Slice;
};

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) {
        throw Error("Invalid prefix");
    }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _from = sc_0.loadAddress();
    const _forward_payload = sc_0;
    return {
        $$type: "TokenNotification" as const,
        queryId: _queryId,
        amount: _amount,
        from: _from,
        forward_payload: _forward_payload,
    };
}

function loadTupleTokenNotification(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _from = source.readAddress();
    const _forward_payload = source.readCell().asSlice();
    return {
        $$type: "TokenNotification" as const,
        queryId: _queryId,
        amount: _amount,
        from: _from,
        forward_payload: _forward_payload,
    };
}

function loadGetterTupleTokenNotification(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _from = source.readAddress();
    const _forward_payload = source.readCell().asSlice();
    return {
        $$type: "TokenNotification" as const,
        queryId: _queryId,
        amount: _amount,
        from: _from,
        forward_payload: _forward_payload,
    };
}

function storeTupleTokenNotification(source: TokenNotification) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeTokenNotification(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadTokenNotification(src.loadRef().beginParse());
        },
    };
}

export type TokenBurn = {
    $$type: "TokenBurn";
    queryId: bigint;
    amount: bigint;
    owner: Address;
    response_destination: Address;
};

export function storeTokenBurn(src: TokenBurn) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadTokenBurn(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) {
        throw Error("Invalid prefix");
    }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _owner = sc_0.loadAddress();
    const _response_destination = sc_0.loadAddress();
    return {
        $$type: "TokenBurn" as const,
        queryId: _queryId,
        amount: _amount,
        owner: _owner,
        response_destination: _response_destination,
    };
}

function loadTupleTokenBurn(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _owner = source.readAddress();
    const _response_destination = source.readAddress();
    return {
        $$type: "TokenBurn" as const,
        queryId: _queryId,
        amount: _amount,
        owner: _owner,
        response_destination: _response_destination,
    };
}

function loadGetterTupleTokenBurn(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _owner = source.readAddress();
    const _response_destination = source.readAddress();
    return {
        $$type: "TokenBurn" as const,
        queryId: _queryId,
        amount: _amount,
        owner: _owner,
        response_destination: _response_destination,
    };
}

function storeTupleTokenBurn(source: TokenBurn) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.response_destination);
    return builder.build();
}

function dictValueParserTokenBurn(): DictionaryValue<TokenBurn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenBurn(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurn(src.loadRef().beginParse());
        },
    };
}

export type TokenBurnNotification = {
    $$type: "TokenBurnNotification";
    queryId: bigint;
    amount: bigint;
    owner: Address;
    response_destination: Address | null;
};

export function storeTokenBurnNotification(src: TokenBurnNotification) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadTokenBurnNotification(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) {
        throw Error("Invalid prefix");
    }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _owner = sc_0.loadAddress();
    const _response_destination = sc_0.loadMaybeAddress();
    return {
        $$type: "TokenBurnNotification" as const,
        queryId: _queryId,
        amount: _amount,
        owner: _owner,
        response_destination: _response_destination,
    };
}

function loadTupleTokenBurnNotification(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _owner = source.readAddress();
    const _response_destination = source.readAddressOpt();
    return {
        $$type: "TokenBurnNotification" as const,
        queryId: _queryId,
        amount: _amount,
        owner: _owner,
        response_destination: _response_destination,
    };
}

function loadGetterTupleTokenBurnNotification(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _owner = source.readAddress();
    const _response_destination = source.readAddressOpt();
    return {
        $$type: "TokenBurnNotification" as const,
        queryId: _queryId,
        amount: _amount,
        owner: _owner,
        response_destination: _response_destination,
    };
}

function storeTupleTokenBurnNotification(source: TokenBurnNotification) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.response_destination);
    return builder.build();
}

function dictValueParserTokenBurnNotification(): DictionaryValue<TokenBurnNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeTokenBurnNotification(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadTokenBurnNotification(src.loadRef().beginParse());
        },
    };
}

export type TokenExcesses = {
    $$type: "TokenExcesses";
    queryId: bigint;
};

export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadTokenExcesses(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) {
        throw Error("Invalid prefix");
    }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: "TokenExcesses" as const, queryId: _queryId };
}

function loadTupleTokenExcesses(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: "TokenExcesses" as const, queryId: _queryId };
}

function loadGetterTupleTokenExcesses(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: "TokenExcesses" as const, queryId: _queryId };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeTokenExcesses(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadTokenExcesses(src.loadRef().beginParse());
        },
    };
}

export type TokenUpdateContent = {
    $$type: "TokenUpdateContent";
    content: Cell;
};

export function storeTokenUpdateContent(src: TokenUpdateContent) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2937889386, 32);
        b_0.storeRef(src.content);
    };
}

export function loadTokenUpdateContent(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2937889386) {
        throw Error("Invalid prefix");
    }
    const _content = sc_0.loadRef();
    return { $$type: "TokenUpdateContent" as const, content: _content };
}

function loadTupleTokenUpdateContent(source: TupleReader) {
    const _content = source.readCell();
    return { $$type: "TokenUpdateContent" as const, content: _content };
}

function loadGetterTupleTokenUpdateContent(source: TupleReader) {
    const _content = source.readCell();
    return { $$type: "TokenUpdateContent" as const, content: _content };
}

function storeTupleTokenUpdateContent(source: TokenUpdateContent) {
    const builder = new TupleBuilder();
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserTokenUpdateContent(): DictionaryValue<TokenUpdateContent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeTokenUpdateContent(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadTokenUpdateContent(src.loadRef().beginParse());
        },
    };
}

export type JettonDefaultWallet$Data = {
    $$type: "JettonDefaultWallet$Data";
    balance: bigint;
    owner: Address;
    master: Address;
};

export function storeJettonDefaultWallet$Data(src: JettonDefaultWallet$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
    };
}

export function loadJettonDefaultWallet$Data(slice: Slice) {
    const sc_0 = slice;
    const _balance = sc_0.loadIntBig(257);
    const _owner = sc_0.loadAddress();
    const _master = sc_0.loadAddress();
    return {
        $$type: "JettonDefaultWallet$Data" as const,
        balance: _balance,
        owner: _owner,
        master: _master,
    };
}

function loadTupleJettonDefaultWallet$Data(source: TupleReader) {
    const _balance = source.readBigNumber();
    const _owner = source.readAddress();
    const _master = source.readAddress();
    return {
        $$type: "JettonDefaultWallet$Data" as const,
        balance: _balance,
        owner: _owner,
        master: _master,
    };
}

function loadGetterTupleJettonDefaultWallet$Data(source: TupleReader) {
    const _balance = source.readBigNumber();
    const _owner = source.readAddress();
    const _master = source.readAddress();
    return {
        $$type: "JettonDefaultWallet$Data" as const,
        balance: _balance,
        owner: _owner,
        master: _master,
    };
}

function storeTupleJettonDefaultWallet$Data(source: JettonDefaultWallet$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    return builder.build();
}

function dictValueParserJettonDefaultWallet$Data(): DictionaryValue<JettonDefaultWallet$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeJettonDefaultWallet$Data(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadJettonDefaultWallet$Data(src.loadRef().beginParse());
        },
    };
}

export type JettonWalletData = {
    $$type: "JettonWalletData";
    balance: bigint;
    owner: Address;
    master: Address;
    walletCode: Cell;
};

export function storeJettonWalletData(src: JettonWalletData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeRef(src.walletCode);
    };
}

export function loadJettonWalletData(slice: Slice) {
    const sc_0 = slice;
    const _balance = sc_0.loadIntBig(257);
    const _owner = sc_0.loadAddress();
    const _master = sc_0.loadAddress();
    const _walletCode = sc_0.loadRef();
    return {
        $$type: "JettonWalletData" as const,
        balance: _balance,
        owner: _owner,
        master: _master,
        walletCode: _walletCode,
    };
}

function loadTupleJettonWalletData(source: TupleReader) {
    const _balance = source.readBigNumber();
    const _owner = source.readAddress();
    const _master = source.readAddress();
    const _walletCode = source.readCell();
    return {
        $$type: "JettonWalletData" as const,
        balance: _balance,
        owner: _owner,
        master: _master,
        walletCode: _walletCode,
    };
}

function loadGetterTupleJettonWalletData(source: TupleReader) {
    const _balance = source.readBigNumber();
    const _owner = source.readAddress();
    const _master = source.readAddress();
    const _walletCode = source.readCell();
    return {
        $$type: "JettonWalletData" as const,
        balance: _balance,
        owner: _owner,
        master: _master,
        walletCode: _walletCode,
    };
}

function storeTupleJettonWalletData(source: JettonWalletData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeCell(source.walletCode);
    return builder.build();
}

function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeJettonWalletData(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadJettonWalletData(src.loadRef().beginParse());
        },
    };
}

type JettonDefaultWallet_init_args = {
    $$type: "JettonDefaultWallet_init_args";
    master: Address;
    owner: Address;
};

function initJettonDefaultWallet_init_args(src: JettonDefaultWallet_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.master);
        b_0.storeAddress(src.owner);
    };
}

async function JettonDefaultWallet_init(master: Address, owner: Address) {
    const __code = Cell.fromBase64(
        "te6ccgECFgEABKYAART/APSkE/S88sgLAQIBYgIDBPjQAdBy1yHSANIA+kAhEDRQZm8E+GEC+GLbPASOQQKAINch0x/TPzH6ADCBNVIighAXjUUZupIyf5gCghB73ZfeuuIS8vSgAsh/AcoAVSBQI4EBAc8AAc8WAc8Wye1U4AKAINcFb6MwIYIQD4p+pbrjAiGCEBeNRRm64wIBFAQFBgIBIBESBPwx2zwyNvhBbySBEU1Tw8cF8vRUcyEj+kD6AHHXIfoA+gAwbGFw+DpEMFJE+kD6AHHXIfoA+gAwbGFw+DqgggnJw4ABoIEQPwGCCJiWgLYIErzy9FFjoYIA9fwhwv/y9FKD2zxQVHCAQHArRhNQq8hVUNs8yRBFEDQQNkFgQVQHCwgJBNAx2zw2+EFvJFPCxwWzjr5Txts8AYIAptQCcFkg+QAi+QBa12UB12WCAgE0yMsXyw/LD8v/y/9x+QQAyHQBywISygfL/8nQAFJAxwXy9N5Rp6CCAPX8IcL/8vQkwgCVECk2NjDjDUOJJAoLDA0BHIIQWV8HvLrjAl8E8sCCDwBS0z/6APpAINcLAcMAk/pAAZRy1yFt4gHSAAGR1JJtAeL6AFFmFhUUQzAAToIQF41FGVAHyx8Vyz9QA/oCAc8WASBulTBwAcsBks8W4gH6AgHPFgCwX0H5AAH5AFrXZQHXZYICATTIyxfLD8sPy//L/3H5BAADyM+FgMoAEszMz4hACMv/AfoCgGnPQM+GNPQAyQH7AALIfwHKAFUgUCOBAQHPAAHPFgHPFsntVAA+0z/6APpAINcLAcMAk/pAAZRy1yFt4gH6AFFVFRRDMAAe+CrIcAHKAFpZzxYBzxbJAMJwKUkTUIvIVTCCEHNi0JxQBcsfE8s/AfoCAc8WAc8WySpURDAXcFA0bQNtVSDIz4WAygDPhEDOAfoCgGnPQAJcbgFuqJNbz4GdWM+GgM+EgPQA9ADPgeL0AMkB+wAQNhA0AvTbPBA6R1j6QPoAcdch+gD6ADBsYXD4OlBWoVAFoSNus45RAyBu8tCAcALIAYIQ1TJ221jLH8s/yRNEQHJQNG0DbVUgyM+FgMoAz4RAzgH6AoBpz0ACXG4BbqiTW8+BnVjPhoDPhID0APQAz4Hi9ADJAfsAlBAjXwPiARUOAC7IfwHKAFUgUCOBAQHPAAHPFgHPFsntVAH80z/6APpA+kBVMFsy+EFvJIERTVODxwXy9FFloYIA9fwhwv/y9EMwUjf6QPoAcdch+gD6ADBsYXD4OoIAqZ4BggkxLQCgggiYloCgErzy9HCAQAJ/VDRmyFUwghB73ZfeUAXLHxPLPwH6AgHPFgEgbpUwcAHLAZLPFuLJJkNEEACeECRtUENtA8jPhYDKAM+EQM4B+gKAac9AAlxuAW6ok1vPgZ1Yz4aAz4SA9AD0AM+B4vQAyQH7AALIfwHKAFUgUCOBAQHPAAHPFgHPFsntVAIRv9gW2ebZ42GkFBMCFb4QltniqBbZ42GMFBUADvgqVGMwUjAAPu1E0NIAAZ2BAQHXAPpA+kBVIGwT4PpA+kBZAtEBcAIALPgnbxAhoYIImJaAZrYIoYIImJaAoKE=",
    );
    const builder = beginCell();
    builder.storeUint(0, 1);
    initJettonDefaultWallet_init_args({
        $$type: "JettonDefaultWallet_init_args",
        master,
        owner,
    })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const JettonDefaultWallet_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough Toncoin` },
    38: { message: `Not enough extra currencies` },
    39: {
        message: `Outbound message does not fit into a cell after rewriting`,
    },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: {
        message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree`,
    },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid standard address` },
    3734: { message: `Not Owner` },
    4159: { message: `Invalid value!!` },
    4429: { message: `Invalid sender` },
    6898: { message: `The total supply will be overlapping.` },
    13650: { message: `Invalid bounced message` },
    18668: { message: `Can't Mint Anymore` },
    42708: { message: `Invalid sender!` },
    43422: { message: `Invalid value - Burn` },
    62972: { message: `Invalid balance` },
};

const JettonDefaultWallet_types: ABIType[] = [
    {
        name: "DataSize",
        header: null,
        fields: [
            {
                name: "cells",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "bits",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "refs",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
        ],
    },
    {
        name: "StateInit",
        header: null,
        fields: [
            {
                name: "code",
                type: { kind: "simple", type: "cell", optional: false },
            },
            {
                name: "data",
                type: { kind: "simple", type: "cell", optional: false },
            },
        ],
    },
    {
        name: "Context",
        header: null,
        fields: [
            {
                name: "bounceable",
                type: { kind: "simple", type: "bool", optional: false },
            },
            {
                name: "sender",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "value",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "raw",
                type: { kind: "simple", type: "slice", optional: false },
            },
        ],
    },
    {
        name: "SendParameters",
        header: null,
        fields: [
            {
                name: "mode",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "body",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "code",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "data",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "value",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "to",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "bounce",
                type: { kind: "simple", type: "bool", optional: false },
            },
        ],
    },
    {
        name: "DeployParameters",
        header: null,
        fields: [
            {
                name: "mode",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "body",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "value",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "bounce",
                type: { kind: "simple", type: "bool", optional: false },
            },
            {
                name: "init",
                type: { kind: "simple", type: "StateInit", optional: false },
            },
        ],
    },
    {
        name: "StdAddress",
        header: null,
        fields: [
            {
                name: "workchain",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 8,
                },
            },
            {
                name: "address",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 256,
                },
            },
        ],
    },
    {
        name: "VarAddress",
        header: null,
        fields: [
            {
                name: "workchain",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 32,
                },
            },
            {
                name: "address",
                type: { kind: "simple", type: "slice", optional: false },
            },
        ],
    },
    {
        name: "ChangeOwner",
        header: 2174598809,
        fields: [
            {
                name: "queryId",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 64,
                },
            },
            {
                name: "newOwner",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "ChangeOwnerOk",
        header: 846932810,
        fields: [
            {
                name: "queryId",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 64,
                },
            },
            {
                name: "newOwner",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "Mint",
        header: 4235234258,
        fields: [
            {
                name: "amount",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "receiver",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "JettonData",
        header: null,
        fields: [
            {
                name: "totalSupply",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "mintable",
                type: { kind: "simple", type: "bool", optional: false },
            },
            {
                name: "owner",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "content",
                type: { kind: "simple", type: "cell", optional: false },
            },
            {
                name: "walletCode",
                type: { kind: "simple", type: "cell", optional: false },
            },
        ],
    },
    {
        name: "SampleJetton$Data",
        header: null,
        fields: [
            {
                name: "totalSupply",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
            {
                name: "max_supply",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
            {
                name: "owner",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "content",
                type: { kind: "simple", type: "cell", optional: false },
            },
            {
                name: "mintable",
                type: { kind: "simple", type: "bool", optional: false },
            },
        ],
    },
    {
        name: "TokenTransfer",
        header: 260734629,
        fields: [
            {
                name: "queryId",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 64,
                },
            },
            {
                name: "amount",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
            {
                name: "destination",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "response_destination",
                type: { kind: "simple", type: "address", optional: true },
            },
            {
                name: "custom_payload",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "forward_ton_amount",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
            {
                name: "forward_payload",
                type: {
                    kind: "simple",
                    type: "slice",
                    optional: false,
                    format: "remainder",
                },
            },
        ],
    },
    {
        name: "TokenTransferInternal",
        header: 395134233,
        fields: [
            {
                name: "queryId",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 64,
                },
            },
            {
                name: "amount",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
            {
                name: "from",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "response_destination",
                type: { kind: "simple", type: "address", optional: true },
            },
            {
                name: "forward_ton_amount",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
            {
                name: "forward_payload",
                type: {
                    kind: "simple",
                    type: "slice",
                    optional: false,
                    format: "remainder",
                },
            },
        ],
    },
    {
        name: "TokenNotification",
        header: 1935855772,
        fields: [
            {
                name: "queryId",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 64,
                },
            },
            {
                name: "amount",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
            {
                name: "from",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "forward_payload",
                type: {
                    kind: "simple",
                    type: "slice",
                    optional: false,
                    format: "remainder",
                },
            },
        ],
    },
    {
        name: "TokenBurn",
        header: 1499400124,
        fields: [
            {
                name: "queryId",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 64,
                },
            },
            {
                name: "amount",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
            {
                name: "owner",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "response_destination",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "TokenBurnNotification",
        header: 2078119902,
        fields: [
            {
                name: "queryId",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 64,
                },
            },
            {
                name: "amount",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
            {
                name: "owner",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "response_destination",
                type: { kind: "simple", type: "address", optional: true },
            },
        ],
    },
    {
        name: "TokenExcesses",
        header: 3576854235,
        fields: [
            {
                name: "queryId",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 64,
                },
            },
        ],
    },
    {
        name: "TokenUpdateContent",
        header: 2937889386,
        fields: [
            {
                name: "content",
                type: { kind: "simple", type: "cell", optional: false },
            },
        ],
    },
    {
        name: "JettonDefaultWallet$Data",
        header: null,
        fields: [
            {
                name: "balance",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "owner",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "master",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "JettonWalletData",
        header: null,
        fields: [
            {
                name: "balance",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "owner",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "master",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "walletCode",
                type: { kind: "simple", type: "cell", optional: false },
            },
        ],
    },
];

const JettonDefaultWallet_getters: ABIGetter[] = [
    {
        name: "msgValue",
        methodId: 115218,
        arguments: [
            {
                name: "value",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
        ],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "get_wallet_data",
        methodId: 97026,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "JettonWalletData",
            optional: false,
        },
    },
];

export const JettonDefaultWallet_getterMapping: { [key: string]: string } = {
    msgValue: "getMsgValue",
    get_wallet_data: "getGetWalletData",
};

const JettonDefaultWallet_receivers: ABIReceiver[] = [
    { receiver: "internal", message: { kind: "typed", type: "TokenTransfer" } },
    {
        receiver: "internal",
        message: { kind: "typed", type: "TokenTransferInternal" },
    },
    { receiver: "internal", message: { kind: "typed", type: "TokenBurn" } },
];

export class JettonDefaultWallet implements Contract {
    static async init(master: Address, owner: Address) {
        return await JettonDefaultWallet_init(master, owner);
    }

    static async fromInit(master: Address, owner: Address) {
        const __gen_init = await JettonDefaultWallet_init(master, owner);
        const address = contractAddress(0, __gen_init);
        return new JettonDefaultWallet(address, __gen_init);
    }

    static fromAddress(address: Address) {
        return new JettonDefaultWallet(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };
    readonly abi: ContractABI = {
        types: JettonDefaultWallet_types,
        getters: JettonDefaultWallet_getters,
        receivers: JettonDefaultWallet_receivers,
        errors: JettonDefaultWallet_errors,
    };

    private constructor(address: Address, init?: { code: Cell; data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(
        provider: ContractProvider,
        via: Sender,
        args: { value: bigint; bounce?: boolean | null | undefined },
        message: TokenTransfer | TokenTransferInternal | TokenBurn,
    ) {
        let body: Cell | null = null;
        if (
            message &&
            typeof message === "object" &&
            !(message instanceof Slice) &&
            message.$$type === "TokenTransfer"
        ) {
            body = beginCell().store(storeTokenTransfer(message)).endCell();
        }
        if (
            message &&
            typeof message === "object" &&
            !(message instanceof Slice) &&
            message.$$type === "TokenTransferInternal"
        ) {
            body = beginCell()
                .store(storeTokenTransferInternal(message))
                .endCell();
        }
        if (
            message &&
            typeof message === "object" &&
            !(message instanceof Slice) &&
            message.$$type === "TokenBurn"
        ) {
            body = beginCell().store(storeTokenBurn(message)).endCell();
        }
        if (body === null) {
            throw new Error("Invalid message type");
        }

        await provider.internal(via, { ...args, body: body });
    }

    async getMsgValue(provider: ContractProvider, value: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(value);
        const source = (await provider.get(115218 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetWalletData(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(97026 as any, builder.build()))
            .stack;
        const result = loadGetterTupleJettonWalletData(source);
        return result;
    }
}
