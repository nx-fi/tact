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

export type C1$Data = {
    $$type: "C1$Data";
    f1: bigint;
};

export function storeC1$Data(src: C1$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.f1, 257);
    };
}

export function loadC1$Data(slice: Slice) {
    const sc_0 = slice;
    const _f1 = sc_0.loadIntBig(257);
    return { $$type: "C1$Data" as const, f1: _f1 };
}

function loadTupleC1$Data(source: TupleReader) {
    const _f1 = source.readBigNumber();
    return { $$type: "C1$Data" as const, f1: _f1 };
}

function loadGetterTupleC1$Data(source: TupleReader) {
    const _f1 = source.readBigNumber();
    return { $$type: "C1$Data" as const, f1: _f1 };
}

function storeTupleC1$Data(source: C1$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.f1);
    return builder.build();
}

function dictValueParserC1$Data(): DictionaryValue<C1$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeC1$Data(src)).endCell());
        },
        parse: (src) => {
            return loadC1$Data(src.loadRef().beginParse());
        },
    };
}

export type C2$Data = {
    $$type: "C2$Data";
    f1: bigint;
};

export function storeC2$Data(src: C2$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.f1, 257);
    };
}

export function loadC2$Data(slice: Slice) {
    const sc_0 = slice;
    const _f1 = sc_0.loadIntBig(257);
    return { $$type: "C2$Data" as const, f1: _f1 };
}

function loadTupleC2$Data(source: TupleReader) {
    const _f1 = source.readBigNumber();
    return { $$type: "C2$Data" as const, f1: _f1 };
}

function loadGetterTupleC2$Data(source: TupleReader) {
    const _f1 = source.readBigNumber();
    return { $$type: "C2$Data" as const, f1: _f1 };
}

function storeTupleC2$Data(source: C2$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.f1);
    return builder.build();
}

function dictValueParserC2$Data(): DictionaryValue<C2$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeC2$Data(src)).endCell());
        },
        parse: (src) => {
            return loadC2$Data(src.loadRef().beginParse());
        },
    };
}

export type C3f$Data = {
    $$type: "C3f$Data";
    f1: bigint;
    f2: bigint;
};

export function storeC3f$Data(src: C3f$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.f1, 257);
        b_0.storeInt(src.f2, 257);
    };
}

export function loadC3f$Data(slice: Slice) {
    const sc_0 = slice;
    const _f1 = sc_0.loadIntBig(257);
    const _f2 = sc_0.loadIntBig(257);
    return { $$type: "C3f$Data" as const, f1: _f1, f2: _f2 };
}

function loadTupleC3f$Data(source: TupleReader) {
    const _f1 = source.readBigNumber();
    const _f2 = source.readBigNumber();
    return { $$type: "C3f$Data" as const, f1: _f1, f2: _f2 };
}

function loadGetterTupleC3f$Data(source: TupleReader) {
    const _f1 = source.readBigNumber();
    const _f2 = source.readBigNumber();
    return { $$type: "C3f$Data" as const, f1: _f1, f2: _f2 };
}

function storeTupleC3f$Data(source: C3f$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.f1);
    builder.writeNumber(source.f2);
    return builder.build();
}

function dictValueParserC3f$Data(): DictionaryValue<C3f$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeC3f$Data(src)).endCell());
        },
        parse: (src) => {
            return loadC3f$Data(src.loadRef().beginParse());
        },
    };
}

export type C4g$Data = {
    $$type: "C4g$Data";
    f1: bigint;
};

export function storeC4g$Data(src: C4g$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.f1, 257);
    };
}

export function loadC4g$Data(slice: Slice) {
    const sc_0 = slice;
    const _f1 = sc_0.loadIntBig(257);
    return { $$type: "C4g$Data" as const, f1: _f1 };
}

function loadTupleC4g$Data(source: TupleReader) {
    const _f1 = source.readBigNumber();
    return { $$type: "C4g$Data" as const, f1: _f1 };
}

function loadGetterTupleC4g$Data(source: TupleReader) {
    const _f1 = source.readBigNumber();
    return { $$type: "C4g$Data" as const, f1: _f1 };
}

function storeTupleC4g$Data(source: C4g$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.f1);
    return builder.build();
}

function dictValueParserC4g$Data(): DictionaryValue<C4g$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeC4g$Data(src)).endCell());
        },
        parse: (src) => {
            return loadC4g$Data(src.loadRef().beginParse());
        },
    };
}

export type C5i$Data = {
    $$type: "C5i$Data";
    f1: bigint;
};

export function storeC5i$Data(src: C5i$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.f1, 257);
    };
}

export function loadC5i$Data(slice: Slice) {
    const sc_0 = slice;
    const _f1 = sc_0.loadIntBig(257);
    return { $$type: "C5i$Data" as const, f1: _f1 };
}

function loadTupleC5i$Data(source: TupleReader) {
    const _f1 = source.readBigNumber();
    return { $$type: "C5i$Data" as const, f1: _f1 };
}

function loadGetterTupleC5i$Data(source: TupleReader) {
    const _f1 = source.readBigNumber();
    return { $$type: "C5i$Data" as const, f1: _f1 };
}

function storeTupleC5i$Data(source: C5i$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.f1);
    return builder.build();
}

function dictValueParserC5i$Data(): DictionaryValue<C5i$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeC5i$Data(src)).endCell());
        },
        parse: (src) => {
            return loadC5i$Data(src.loadRef().beginParse());
        },
    };
}

export type C6fn$Data = {
    $$type: "C6fn$Data";
    f: bigint;
};

export function storeC6fn$Data(src: C6fn$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.f, 257);
    };
}

export function loadC6fn$Data(slice: Slice) {
    const sc_0 = slice;
    const _f = sc_0.loadIntBig(257);
    return { $$type: "C6fn$Data" as const, f: _f };
}

function loadTupleC6fn$Data(source: TupleReader) {
    const _f = source.readBigNumber();
    return { $$type: "C6fn$Data" as const, f: _f };
}

function loadGetterTupleC6fn$Data(source: TupleReader) {
    const _f = source.readBigNumber();
    return { $$type: "C6fn$Data" as const, f: _f };
}

function storeTupleC6fn$Data(source: C6fn$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.f);
    return builder.build();
}

function dictValueParserC6fn$Data(): DictionaryValue<C6fn$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeC6fn$Data(src)).endCell());
        },
        parse: (src) => {
            return loadC6fn$Data(src.loadRef().beginParse());
        },
    };
}

export type C7gt$Data = {
    $$type: "C7gt$Data";
    f1: bigint;
};

export function storeC7gt$Data(src: C7gt$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.f1, 257);
    };
}

export function loadC7gt$Data(slice: Slice) {
    const sc_0 = slice;
    const _f1 = sc_0.loadIntBig(257);
    return { $$type: "C7gt$Data" as const, f1: _f1 };
}

function loadTupleC7gt$Data(source: TupleReader) {
    const _f1 = source.readBigNumber();
    return { $$type: "C7gt$Data" as const, f1: _f1 };
}

function loadGetterTupleC7gt$Data(source: TupleReader) {
    const _f1 = source.readBigNumber();
    return { $$type: "C7gt$Data" as const, f1: _f1 };
}

function storeTupleC7gt$Data(source: C7gt$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.f1);
    return builder.build();
}

function dictValueParserC7gt$Data(): DictionaryValue<C7gt$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeC7gt$Data(src)).endCell());
        },
        parse: (src) => {
            return loadC7gt$Data(src.loadRef().beginParse());
        },
    };
}

export type C8h$Data = {
    $$type: "C8h$Data";
    h1: bigint;
    h2: bigint;
};

export function storeC8h$Data(src: C8h$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.h1, 257);
        b_0.storeInt(src.h2, 257);
    };
}

export function loadC8h$Data(slice: Slice) {
    const sc_0 = slice;
    const _h1 = sc_0.loadIntBig(257);
    const _h2 = sc_0.loadIntBig(257);
    return { $$type: "C8h$Data" as const, h1: _h1, h2: _h2 };
}

function loadTupleC8h$Data(source: TupleReader) {
    const _h1 = source.readBigNumber();
    const _h2 = source.readBigNumber();
    return { $$type: "C8h$Data" as const, h1: _h1, h2: _h2 };
}

function loadGetterTupleC8h$Data(source: TupleReader) {
    const _h1 = source.readBigNumber();
    const _h2 = source.readBigNumber();
    return { $$type: "C8h$Data" as const, h1: _h1, h2: _h2 };
}

function storeTupleC8h$Data(source: C8h$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.h1);
    builder.writeNumber(source.h2);
    return builder.build();
}

function dictValueParserC8h$Data(): DictionaryValue<C8h$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeC8h$Data(src)).endCell());
        },
        parse: (src) => {
            return loadC8h$Data(src.loadRef().beginParse());
        },
    };
}

export type C9g2$Data = {
    $$type: "C9g2$Data";
    f1: bigint;
    f2: bigint;
};

export function storeC9g2$Data(src: C9g2$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.f1, 257);
        b_0.storeInt(src.f2, 257);
    };
}

export function loadC9g2$Data(slice: Slice) {
    const sc_0 = slice;
    const _f1 = sc_0.loadIntBig(257);
    const _f2 = sc_0.loadIntBig(257);
    return { $$type: "C9g2$Data" as const, f1: _f1, f2: _f2 };
}

function loadTupleC9g2$Data(source: TupleReader) {
    const _f1 = source.readBigNumber();
    const _f2 = source.readBigNumber();
    return { $$type: "C9g2$Data" as const, f1: _f1, f2: _f2 };
}

function loadGetterTupleC9g2$Data(source: TupleReader) {
    const _f1 = source.readBigNumber();
    const _f2 = source.readBigNumber();
    return { $$type: "C9g2$Data" as const, f1: _f1, f2: _f2 };
}

function storeTupleC9g2$Data(source: C9g2$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.f1);
    builder.writeNumber(source.f2);
    return builder.build();
}

function dictValueParserC9g2$Data(): DictionaryValue<C9g2$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeC9g2$Data(src)).endCell());
        },
        parse: (src) => {
            return loadC9g2$Data(src.loadRef().beginParse());
        },
    };
}

export type C10o$Data = {
    $$type: "C10o$Data";
    f2: bigint;
    f1: bigint;
};

export function storeC10o$Data(src: C10o$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.f2, 257);
        b_0.storeInt(src.f1, 257);
    };
}

export function loadC10o$Data(slice: Slice) {
    const sc_0 = slice;
    const _f2 = sc_0.loadIntBig(257);
    const _f1 = sc_0.loadIntBig(257);
    return { $$type: "C10o$Data" as const, f2: _f2, f1: _f1 };
}

function loadTupleC10o$Data(source: TupleReader) {
    const _f2 = source.readBigNumber();
    const _f1 = source.readBigNumber();
    return { $$type: "C10o$Data" as const, f2: _f2, f1: _f1 };
}

function loadGetterTupleC10o$Data(source: TupleReader) {
    const _f2 = source.readBigNumber();
    const _f1 = source.readBigNumber();
    return { $$type: "C10o$Data" as const, f2: _f2, f1: _f1 };
}

function storeTupleC10o$Data(source: C10o$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.f2);
    builder.writeNumber(source.f1);
    return builder.build();
}

function dictValueParserC10o$Data(): DictionaryValue<C10o$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeC10o$Data(src)).endCell());
        },
        parse: (src) => {
            return loadC10o$Data(src.loadRef().beginParse());
        },
    };
}

export type Tester$Data = {
    $$type: "Tester$Data";
};

export function storeTester$Data(src: Tester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

export function loadTester$Data(slice: Slice) {
    const sc_0 = slice;
    return { $$type: "Tester$Data" as const };
}

function loadTupleTester$Data(source: TupleReader) {
    return { $$type: "Tester$Data" as const };
}

function loadGetterTupleTester$Data(source: TupleReader) {
    return { $$type: "Tester$Data" as const };
}

function storeTupleTester$Data(source: Tester$Data) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserTester$Data(): DictionaryValue<Tester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeTester$Data(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadTester$Data(src.loadRef().beginParse());
        },
    };
}

type C5i_init_args = {
    $$type: "C5i_init_args";
    n: bigint;
};

function initC5i_init_args(src: C5i_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.n, 257);
    };
}

async function C5i_init(n: bigint) {
    const __code = Cell.fromBase64(
        "te6ccgEBBgEAXwABFP8A9KQT9LzyyAsBAgFiAgMBPtAw0HLXIdIA0gD6QCEQNFBVbwT4YQH4Yts8MNzywIIEAhGhZe22eAO2eGMEBQAu7UTQ0gABl4EBAdcAATHggQEB1wABAdEABlIQoA==",
    );
    const builder = beginCell();
    builder.storeUint(0, 1);
    initC5i_init_args({ $$type: "C5i_init_args", n })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const C5i_errors: { [key: number]: { message: string } } = {
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
};

const C5i_types: ABIType[] = [
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
        name: "C1$Data",
        header: null,
        fields: [
            {
                name: "f1",
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
        name: "C2$Data",
        header: null,
        fields: [
            {
                name: "f1",
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
        name: "C3f$Data",
        header: null,
        fields: [
            {
                name: "f1",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "f2",
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
        name: "C4g$Data",
        header: null,
        fields: [
            {
                name: "f1",
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
        name: "C5i$Data",
        header: null,
        fields: [
            {
                name: "f1",
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
        name: "C6fn$Data",
        header: null,
        fields: [
            {
                name: "f",
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
        name: "C7gt$Data",
        header: null,
        fields: [
            {
                name: "f1",
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
        name: "C8h$Data",
        header: null,
        fields: [
            {
                name: "h1",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "h2",
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
        name: "C9g2$Data",
        header: null,
        fields: [
            {
                name: "f1",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "f2",
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
        name: "C10o$Data",
        header: null,
        fields: [
            {
                name: "f2",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "f1",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
        ],
    },
    { name: "Tester$Data", header: null, fields: [] },
];

const C5i_getters: ABIGetter[] = [
    {
        name: "incrAndGetField1",
        methodId: 111350,
        arguments: [
            {
                name: "n",
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
];

export const C5i_getterMapping: { [key: string]: string } = {
    incrAndGetField1: "getIncrAndGetField1",
};

const C5i_receivers: ABIReceiver[] = [];

export class C5i implements Contract {
    static async init(n: bigint) {
        return await C5i_init(n);
    }

    static async fromInit(n: bigint) {
        const __gen_init = await C5i_init(n);
        const address = contractAddress(0, __gen_init);
        return new C5i(address, __gen_init);
    }

    static fromAddress(address: Address) {
        return new C5i(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };
    readonly abi: ContractABI = {
        types: C5i_types,
        getters: C5i_getters,
        receivers: C5i_receivers,
        errors: C5i_errors,
    };

    private constructor(address: Address, init?: { code: Cell; data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async getIncrAndGetField1(provider: ContractProvider, n: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(n);
        const source = (await provider.get(111350 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }
}
