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

export type RugParams = {
    $$type: "RugParams";
    investment: bigint;
    returns: bigint;
    fee: bigint;
};

export function storeRugParams(src: RugParams) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.investment, 257);
        b_0.storeInt(src.returns, 257);
        b_0.storeInt(src.fee, 257);
    };
}

export function loadRugParams(slice: Slice) {
    const sc_0 = slice;
    const _investment = sc_0.loadIntBig(257);
    const _returns = sc_0.loadIntBig(257);
    const _fee = sc_0.loadIntBig(257);
    return {
        $$type: "RugParams" as const,
        investment: _investment,
        returns: _returns,
        fee: _fee,
    };
}

function loadTupleRugParams(source: TupleReader) {
    const _investment = source.readBigNumber();
    const _returns = source.readBigNumber();
    const _fee = source.readBigNumber();
    return {
        $$type: "RugParams" as const,
        investment: _investment,
        returns: _returns,
        fee: _fee,
    };
}

function loadGetterTupleRugParams(source: TupleReader) {
    const _investment = source.readBigNumber();
    const _returns = source.readBigNumber();
    const _fee = source.readBigNumber();
    return {
        $$type: "RugParams" as const,
        investment: _investment,
        returns: _returns,
        fee: _fee,
    };
}

function storeTupleRugParams(source: RugParams) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.investment);
    builder.writeNumber(source.returns);
    builder.writeNumber(source.fee);
    return builder.build();
}

function dictValueParserRugParams(): DictionaryValue<RugParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRugParams(src)).endCell());
        },
        parse: (src) => {
            return loadRugParams(src.loadRef().beginParse());
        },
    };
}

export type RugPull$Data = {
    $$type: "RugPull$Data";
    owner: Address;
    investment: bigint;
    returns: bigint;
    fee: bigint;
    balance: bigint;
    rugpulled: boolean;
    stopped: boolean;
    queueStart: bigint;
    queueEnd: bigint;
    queue: Dictionary<bigint, Address>;
};

export function storeRugPull$Data(src: RugPull$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.investment, 257);
        b_0.storeInt(src.returns, 257);
        const b_1 = new Builder();
        b_1.storeInt(src.fee, 257);
        b_1.storeInt(src.balance, 257);
        b_1.storeBit(src.rugpulled);
        b_1.storeBit(src.stopped);
        b_1.storeInt(src.queueStart, 257);
        const b_2 = new Builder();
        b_2.storeInt(src.queueEnd, 257);
        b_2.storeDict(
            src.queue,
            Dictionary.Keys.BigInt(257),
            Dictionary.Values.Address(),
        );
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadRugPull$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _investment = sc_0.loadIntBig(257);
    const _returns = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _fee = sc_1.loadIntBig(257);
    const _balance = sc_1.loadIntBig(257);
    const _rugpulled = sc_1.loadBit();
    const _stopped = sc_1.loadBit();
    const _queueStart = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _queueEnd = sc_2.loadIntBig(257);
    const _queue = Dictionary.load(
        Dictionary.Keys.BigInt(257),
        Dictionary.Values.Address(),
        sc_2,
    );
    return {
        $$type: "RugPull$Data" as const,
        owner: _owner,
        investment: _investment,
        returns: _returns,
        fee: _fee,
        balance: _balance,
        rugpulled: _rugpulled,
        stopped: _stopped,
        queueStart: _queueStart,
        queueEnd: _queueEnd,
        queue: _queue,
    };
}

function loadTupleRugPull$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _investment = source.readBigNumber();
    const _returns = source.readBigNumber();
    const _fee = source.readBigNumber();
    const _balance = source.readBigNumber();
    const _rugpulled = source.readBoolean();
    const _stopped = source.readBoolean();
    const _queueStart = source.readBigNumber();
    const _queueEnd = source.readBigNumber();
    const _queue = Dictionary.loadDirect(
        Dictionary.Keys.BigInt(257),
        Dictionary.Values.Address(),
        source.readCellOpt(),
    );
    return {
        $$type: "RugPull$Data" as const,
        owner: _owner,
        investment: _investment,
        returns: _returns,
        fee: _fee,
        balance: _balance,
        rugpulled: _rugpulled,
        stopped: _stopped,
        queueStart: _queueStart,
        queueEnd: _queueEnd,
        queue: _queue,
    };
}

function loadGetterTupleRugPull$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _investment = source.readBigNumber();
    const _returns = source.readBigNumber();
    const _fee = source.readBigNumber();
    const _balance = source.readBigNumber();
    const _rugpulled = source.readBoolean();
    const _stopped = source.readBoolean();
    const _queueStart = source.readBigNumber();
    const _queueEnd = source.readBigNumber();
    const _queue = Dictionary.loadDirect(
        Dictionary.Keys.BigInt(257),
        Dictionary.Values.Address(),
        source.readCellOpt(),
    );
    return {
        $$type: "RugPull$Data" as const,
        owner: _owner,
        investment: _investment,
        returns: _returns,
        fee: _fee,
        balance: _balance,
        rugpulled: _rugpulled,
        stopped: _stopped,
        queueStart: _queueStart,
        queueEnd: _queueEnd,
        queue: _queue,
    };
}

function storeTupleRugPull$Data(source: RugPull$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.investment);
    builder.writeNumber(source.returns);
    builder.writeNumber(source.fee);
    builder.writeNumber(source.balance);
    builder.writeBoolean(source.rugpulled);
    builder.writeBoolean(source.stopped);
    builder.writeNumber(source.queueStart);
    builder.writeNumber(source.queueEnd);
    builder.writeCell(
        source.queue.size > 0
            ? beginCell()
                  .storeDictDirect(
                      source.queue,
                      Dictionary.Keys.BigInt(257),
                      Dictionary.Values.Address(),
                  )
                  .endCell()
            : null,
    );
    return builder.build();
}

function dictValueParserRugPull$Data(): DictionaryValue<RugPull$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeRugPull$Data(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadRugPull$Data(src.loadRef().beginParse());
        },
    };
}

type RugPull_init_args = {
    $$type: "RugPull_init_args";
    owner: Address;
    investment: bigint;
    returns: bigint;
    fee: bigint;
};

function initRugPull_init_args(src: RugPull_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.investment, 257);
        b_0.storeInt(src.returns, 257);
        const b_1 = new Builder();
        b_1.storeInt(src.fee, 257);
        b_0.storeRef(b_1.endCell());
    };
}

async function RugPull_init(
    owner: Address,
    investment: bigint,
    returns: bigint,
    fee: bigint,
) {
    const __code = Cell.fromBase64(
        "te6ccgECGwEABNUAART/APSkE/S88sgLAQIBYgIDBNjQ7aLt+wHQctch0gDSAPpAIRA0UGZvBPhhAvhi2zwLkl8L4HAq10kgwh+OjzEK0x8hghCBnb6ZuuMCC94BwAABwSGw4wIJ+QEggvAVjjlOfMc6mus2KVf+A3ZlWIrvFvO9aFgME6uECXzyKroZBAUGAgEgExQC+DE6CdM/+kBZMlCr2zw5UanIWYIQMnsrSlADyx/LPwHPFskQmhB5EGgQVxBGEDVEMBL4QgF/bds8yH8BygBVkFCpzxYXgQEBzwAVgQEBzwADyIEBAc8AEoEBAc8AygASygASgQEBzwADyIEBAc8AEvQAyVjMyQHMye1U2zEOEgP+ORB5VRbbPCSOPF8JcAGDBm1abW1af8jPhYDKAM+EQM4B+gKAac9AAlxuAW6ok1vPgZ1Yz4aAz4SA9AD0AM+B4vQAyQH7AOD4QW8kMDKBPrtTuaATvhLy9IEBAVIyIG6VMFn0WjCUQTP0FOIBpFFYoJxTB7yVU1KhwgCRcOKK6A8HCATkj0kwEHlVFts8JLOUJXD7At5wKoMGbVptbVp/yM+FgMoAz4RAzgH6AoBpz0ACXG4BbqiTW8+BnVjPhoDPhID0APQAz4Hi9ADJAfsA4CCC8OdDtrDnn9XZ3dxaXN+Fs0N9m2H8mlWLg4OoOg/A2UvauuMCDgwKCwFCIYEBASRZ9AxvoZIwbd8gbvLQgFEYoQOkUTgXQzDbPFAFCQCIUFXIfwHKAFWQUKnPFheBAQHPABWBAQHPAAPIgQEBzwASgQEBzwDKABLKABKBAQHPAAPIgQEBzwAS9ADJWMzJAczJ7VQAcAFybVptbVp/yM+FgMoAz4RAzgH6AoBpz0ACXG4BbqiTW8+BnVjPhoDPhID0APQAz4Hi9ADJAfsAAZQwMn9wKIMGbVptbVp/yM+FgMoAz4RAzgH6AoBpz0ACXG4BbqiTW8+BnVjPhoDPhID0APQAz4Hi9ADJAfsAEHkQaBBXEEYQNVBEAwwBVILw4nZjhicr3dYVGxd+WBrJ9hMTG0XhPNx6+A5AkRMNc+i64wJfCvLAgg0AhMh/AcoAVZBQqc8WF4EBAc8AFYEBAc8AA8iBAQHPABKBAQHPAMoAEsoAEoEBAc8AA8iBAQHPABL0AMlYzMkBzMntVAQYEHlVFts82zwzf4gUDg8QEQAS+EJSoMcF8uCEABCCAJ2wJLPy9AAWAAAAAFN0b3BwZWQBkvhCAX9t2zzIfwHKAFWQUKnPFheBAQHPABWBAQHPAAPIgQEBzwASgQEBzwDKABLKABKBAQHPAAPIgQEBzwAS9ADJWMzJAczJ7VQSAKBtbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCMQNlUiEsjPhYDKAM+EQM4B+gKAac9AAlxuAW6ok1vPgZ1Yz4aAz4SA9AD0AM+B4vQAyQH7AAIBIBUWAhG+Nq7Z5tnjZRwZGgIRuhe9s82zxsoYGRcCEbhR3bPNs8bKGBkYAAIjAAIpAMbtRNDSAAGONfpAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wDSANIAgQEB1wDUMNCBAQHXAPQEMBB6EHkQeGwa4PpAgQEB1wCBAQHXANQB0IEBAdcAMBRDMATRVQJtcHBUYARwVSAABlR4dg==",
    );
    const builder = beginCell();
    builder.storeUint(0, 1);
    initRugPull_init_args({
        $$type: "RugPull_init_args",
        owner,
        investment,
        returns,
        fee,
    })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const RugPull_errors: { [key: number]: { message: string } } = {
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
    16059: { message: `Invalid value` },
    40368: { message: `Contract stopped` },
    53296: { message: `Contract not stopped` },
};

const RugPull_types: ABIType[] = [
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
        name: "RugParams",
        header: null,
        fields: [
            {
                name: "investment",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "returns",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "fee",
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
        name: "RugPull$Data",
        header: null,
        fields: [
            {
                name: "owner",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "investment",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "returns",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "fee",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
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
                name: "rugpulled",
                type: { kind: "simple", type: "bool", optional: false },
            },
            {
                name: "stopped",
                type: { kind: "simple", type: "bool", optional: false },
            },
            {
                name: "queueStart",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "queueEnd",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "queue",
                type: { kind: "dict", key: "int", value: "address" },
            },
        ],
    },
];

const RugPull_getters: ABIGetter[] = [
    {
        name: "params",
        methodId: 116437,
        arguments: [],
        returnType: { kind: "simple", type: "RugParams", optional: false },
    },
    {
        name: "owner",
        methodId: 83229,
        arguments: [],
        returnType: { kind: "simple", type: "address", optional: false },
    },
    {
        name: "stopped",
        methodId: 74107,
        arguments: [],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
];

export const RugPull_getterMapping: { [key: string]: string } = {
    params: "getParams",
    owner: "getOwner",
    stopped: "getStopped",
};

const RugPull_receivers: ABIReceiver[] = [
    { receiver: "internal", message: { kind: "empty" } },
    { receiver: "internal", message: { kind: "text", text: "withdraw" } },
    { receiver: "internal", message: { kind: "text", text: "rugpull" } },
    { receiver: "internal", message: { kind: "typed", type: "ChangeOwner" } },
    { receiver: "internal", message: { kind: "text", text: "Stop" } },
];

export class RugPull implements Contract {
    static async init(
        owner: Address,
        investment: bigint,
        returns: bigint,
        fee: bigint,
    ) {
        return await RugPull_init(owner, investment, returns, fee);
    }

    static async fromInit(
        owner: Address,
        investment: bigint,
        returns: bigint,
        fee: bigint,
    ) {
        const __gen_init = await RugPull_init(owner, investment, returns, fee);
        const address = contractAddress(0, __gen_init);
        return new RugPull(address, __gen_init);
    }

    static fromAddress(address: Address) {
        return new RugPull(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };
    readonly abi: ContractABI = {
        types: RugPull_types,
        getters: RugPull_getters,
        receivers: RugPull_receivers,
        errors: RugPull_errors,
    };

    private constructor(address: Address, init?: { code: Cell; data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(
        provider: ContractProvider,
        via: Sender,
        args: { value: bigint; bounce?: boolean | null | undefined },
        message: null | "withdraw" | "rugpull" | ChangeOwner | "Stop",
    ) {
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message === "withdraw") {
            body = beginCell()
                .storeUint(0, 32)
                .storeStringTail(message)
                .endCell();
        }
        if (message === "rugpull") {
            body = beginCell()
                .storeUint(0, 32)
                .storeStringTail(message)
                .endCell();
        }
        if (
            message &&
            typeof message === "object" &&
            !(message instanceof Slice) &&
            message.$$type === "ChangeOwner"
        ) {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (message === "Stop") {
            body = beginCell()
                .storeUint(0, 32)
                .storeStringTail(message)
                .endCell();
        }
        if (body === null) {
            throw new Error("Invalid message type");
        }

        await provider.internal(via, { ...args, body: body });
    }

    async getParams(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(116437 as any, builder.build()))
            .stack;
        const result = loadGetterTupleRugParams(source);
        return result;
    }

    async getOwner(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(83229 as any, builder.build()))
            .stack;
        const result = source.readAddress();
        return result;
    }

    async getStopped(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(74107 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }
}
