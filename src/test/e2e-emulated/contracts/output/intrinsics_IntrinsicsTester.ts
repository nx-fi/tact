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

export type IntrinsicsTester$Data = {
    $$type: "IntrinsicsTester$Data";
    a: bigint;
    b: string;
    c: Address;
    d: Cell;
    e: bigint;
    f: bigint;
    g: Slice;
    h: Slice;
    i: bigint;
    j: bigint;
    k: bigint;
    l: bigint;
    m: Slice;
    n: Slice;
    o: Slice;
    p: Slice;
    q: Slice;
    r: Slice;
    s: Slice;
    t: Slice;
    u: Slice;
    w: Slice;
    v: Slice;
};

export function storeIntrinsicsTester$Data(src: IntrinsicsTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
        b_0.storeStringRefTail(src.b);
        b_0.storeAddress(src.c);
        b_0.storeRef(src.d);
        b_0.storeInt(src.e, 257);
        const b_1 = new Builder();
        b_1.storeInt(src.f, 257);
        b_1.storeRef(src.g.asCell());
        b_1.storeRef(src.h.asCell());
        b_1.storeInt(src.i, 257);
        b_1.storeInt(src.j, 257);
        const b_2 = new Builder();
        b_2.storeInt(src.k, 257);
        b_2.storeInt(src.l, 257);
        b_2.storeRef(src.m.asCell());
        b_2.storeRef(src.n.asCell());
        b_2.storeRef(src.o.asCell());
        const b_3 = new Builder();
        b_3.storeRef(src.p.asCell());
        b_3.storeRef(src.q.asCell());
        b_3.storeRef(src.r.asCell());
        const b_4 = new Builder();
        b_4.storeRef(src.s.asCell());
        b_4.storeRef(src.t.asCell());
        b_4.storeRef(src.u.asCell());
        const b_5 = new Builder();
        b_5.storeRef(src.w.asCell());
        b_5.storeRef(src.v.asCell());
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadIntrinsicsTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _a = sc_0.loadIntBig(257);
    const _b = sc_0.loadStringRefTail();
    const _c = sc_0.loadAddress();
    const _d = sc_0.loadRef();
    const _e = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _f = sc_1.loadIntBig(257);
    const _g = sc_1.loadRef().asSlice();
    const _h = sc_1.loadRef().asSlice();
    const _i = sc_1.loadIntBig(257);
    const _j = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _k = sc_2.loadIntBig(257);
    const _l = sc_2.loadIntBig(257);
    const _m = sc_2.loadRef().asSlice();
    const _n = sc_2.loadRef().asSlice();
    const _o = sc_2.loadRef().asSlice();
    const sc_3 = sc_2.loadRef().beginParse();
    const _p = sc_3.loadRef().asSlice();
    const _q = sc_3.loadRef().asSlice();
    const _r = sc_3.loadRef().asSlice();
    const sc_4 = sc_3.loadRef().beginParse();
    const _s = sc_4.loadRef().asSlice();
    const _t = sc_4.loadRef().asSlice();
    const _u = sc_4.loadRef().asSlice();
    const sc_5 = sc_4.loadRef().beginParse();
    const _w = sc_5.loadRef().asSlice();
    const _v = sc_5.loadRef().asSlice();
    return {
        $$type: "IntrinsicsTester$Data" as const,
        a: _a,
        b: _b,
        c: _c,
        d: _d,
        e: _e,
        f: _f,
        g: _g,
        h: _h,
        i: _i,
        j: _j,
        k: _k,
        l: _l,
        m: _m,
        n: _n,
        o: _o,
        p: _p,
        q: _q,
        r: _r,
        s: _s,
        t: _t,
        u: _u,
        w: _w,
        v: _v,
    };
}

function loadTupleIntrinsicsTester$Data(source: TupleReader) {
    const _a = source.readBigNumber();
    const _b = source.readString();
    const _c = source.readAddress();
    const _d = source.readCell();
    const _e = source.readBigNumber();
    const _f = source.readBigNumber();
    const _g = source.readCell().asSlice();
    const _h = source.readCell().asSlice();
    const _i = source.readBigNumber();
    const _j = source.readBigNumber();
    const _k = source.readBigNumber();
    const _l = source.readBigNumber();
    const _m = source.readCell().asSlice();
    const _n = source.readCell().asSlice();
    source = source.readTuple();
    const _o = source.readCell().asSlice();
    const _p = source.readCell().asSlice();
    const _q = source.readCell().asSlice();
    const _r = source.readCell().asSlice();
    const _s = source.readCell().asSlice();
    const _t = source.readCell().asSlice();
    const _u = source.readCell().asSlice();
    const _w = source.readCell().asSlice();
    const _v = source.readCell().asSlice();
    return {
        $$type: "IntrinsicsTester$Data" as const,
        a: _a,
        b: _b,
        c: _c,
        d: _d,
        e: _e,
        f: _f,
        g: _g,
        h: _h,
        i: _i,
        j: _j,
        k: _k,
        l: _l,
        m: _m,
        n: _n,
        o: _o,
        p: _p,
        q: _q,
        r: _r,
        s: _s,
        t: _t,
        u: _u,
        w: _w,
        v: _v,
    };
}

function loadGetterTupleIntrinsicsTester$Data(source: TupleReader) {
    const _a = source.readBigNumber();
    const _b = source.readString();
    const _c = source.readAddress();
    const _d = source.readCell();
    const _e = source.readBigNumber();
    const _f = source.readBigNumber();
    const _g = source.readCell().asSlice();
    const _h = source.readCell().asSlice();
    const _i = source.readBigNumber();
    const _j = source.readBigNumber();
    const _k = source.readBigNumber();
    const _l = source.readBigNumber();
    const _m = source.readCell().asSlice();
    const _n = source.readCell().asSlice();
    const _o = source.readCell().asSlice();
    const _p = source.readCell().asSlice();
    const _q = source.readCell().asSlice();
    const _r = source.readCell().asSlice();
    const _s = source.readCell().asSlice();
    const _t = source.readCell().asSlice();
    const _u = source.readCell().asSlice();
    const _w = source.readCell().asSlice();
    const _v = source.readCell().asSlice();
    return {
        $$type: "IntrinsicsTester$Data" as const,
        a: _a,
        b: _b,
        c: _c,
        d: _d,
        e: _e,
        f: _f,
        g: _g,
        h: _h,
        i: _i,
        j: _j,
        k: _k,
        l: _l,
        m: _m,
        n: _n,
        o: _o,
        p: _p,
        q: _q,
        r: _r,
        s: _s,
        t: _t,
        u: _u,
        w: _w,
        v: _v,
    };
}

function storeTupleIntrinsicsTester$Data(source: IntrinsicsTester$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeString(source.b);
    builder.writeAddress(source.c);
    builder.writeCell(source.d);
    builder.writeNumber(source.e);
    builder.writeNumber(source.f);
    builder.writeSlice(source.g.asCell());
    builder.writeSlice(source.h.asCell());
    builder.writeNumber(source.i);
    builder.writeNumber(source.j);
    builder.writeNumber(source.k);
    builder.writeNumber(source.l);
    builder.writeSlice(source.m.asCell());
    builder.writeSlice(source.n.asCell());
    builder.writeSlice(source.o.asCell());
    builder.writeSlice(source.p.asCell());
    builder.writeSlice(source.q.asCell());
    builder.writeSlice(source.r.asCell());
    builder.writeSlice(source.s.asCell());
    builder.writeSlice(source.t.asCell());
    builder.writeSlice(source.u.asCell());
    builder.writeSlice(source.w.asCell());
    builder.writeSlice(source.v.asCell());
    return builder.build();
}

function dictValueParserIntrinsicsTester$Data(): DictionaryValue<IntrinsicsTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeIntrinsicsTester$Data(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadIntrinsicsTester$Data(src.loadRef().beginParse());
        },
    };
}

type IntrinsicsTester_init_args = {
    $$type: "IntrinsicsTester_init_args";
};

function initIntrinsicsTester_init_args(src: IntrinsicsTester_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function IntrinsicsTester_init() {
    const __code = Cell.fromBase64(
        "te6ccgECrgEAC2gAART/APSkE/S88sgLAQIBYgIDAgLPBAUCASALDAO1AHQctch0gDSAPpAIRA0UGZvBPhhAvhi2zwRGJRfD18J4FYW10nCH5cRFtMfMREW3hEW+QEggvDByOvo5C8UWPJpPovvNFycCNuMVtLKY3vptDbqH2iXb7rjAoKYGBwAlHGVIddKwwCWIdQw0AGk6PkEAIAGKMBEUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOVR3IfwHKABEXERYRFREUERMREhERERBV4Ns8ye1UCQFYgvCqOvlvwZg/+mmCyUmhvGI0IIwUg5jPIFTg0NPmwoPzvrrjAl8PXwjywIIIArqIyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHch/AcoAERcRFhEVERQRExESEREREFXg2zzJ7VSOCQH2AREWAREXgQEBzwDIAREVzxbJAREUzAEREs8WERDIzB+BAQHPAB2BAQHPAMhQDM8WyVALzMhQCs8WyVAJzBeBAQHPAAXIgQEBzwAUgQEBzwASgQEBzwDIWM8WyQHMyFjPFskBzMhQA88WyVjMyMhQBM8WyVADzMhQBM8WCgCayVADzMhQBM8WyVADzMjIUAXPFslQBMzIUAbPFslQBczIUAbPFslQBczIyFAHzxbJUAbMyFAHzxbJUAbMyVAEzMlQBMzJAczJWMzJAcwCASANDgIBIFJTAgEgDxACASArLAIBIBESAgEgHh8CASATFAIBIBcYAhmv+e2ebZ4riC+HtjjAphUCea2s7Z4IiwiLiIsIioiLCIqIigiKiIoIiYiKCImIiQiJiIkIiIiJCIiIiAiIiIgHiIgHqodtniuIL4e2OMCmFgBIjQhgBB7+qpcxuU2jl+XmRiL15jNIuBKsW0djqT8N0gHQeY1EAAT5AgIBWBkaAhmsrO2ebZ4riC+HtjjAph0CF6a1tnm2eK4gvh7Y46YbAhem17Z5tniuIL4e2OOmHAACKwAMghCFQf3oAARWFgIBICAhAgFIJygCGa4EbZ5tniuIL4e2OMCmIgIB5yMkAASLAQIV/2zzbPFcQXw9scamJQIXu22zzbPFcQXw9scYpiYAAnAAGoJIaGVsbG8gd29ybGQCGKml2zzbPFcQXw9scaYpAhioKds82zxXEF8PbHGmKgAKizq83vgAAigCASAtLgIBIDM0AgEgOToCASAvMAIZrQptnm2eK4gvh7Y4wKYxAhmvzG2ebZ4riC+HtjjApjIAAiMAAiwCASBFRgIBIDU2Ahmuzm2ebZ4riC+HtjjApjcCGa6sbZ5tniuIL4e2OMCmOAACLgAai7SGVsbG8gd29ybGSAIBIDs8AgEgPj8CGKo12zzbPFcQXw9scaZ8Ahiocds82zxXEF8PbHGmPQECiKsCGKmg2zzbPFcQXw9scaZAAgEgQUIAHIvEhlbGxvIHdvcmxkIYAhelDbZ5tniuIL4e2OOmQwIXp3O2ebZ4riC+HtjjpkQADIISW2bTQAACLQIBWEdIAgFuS0wCF6d7tnm2eK4gvh7Y46ZJAhem87Z5tniuIL4e2OOmSgBAguDimqHimqHimqHimqHimqHimqHimqHimqHimqHimqEABFYSAhej82zzbPFcQXw9scamTQIBIE5PAASDCAIXvR2zzbPFcQXw9scYplACF7/Ns82zxXEF8PbHGKZRAARWEwAEVhACASBUVQIBIFhZAgEgVlcCASB4eQIBIGRlAgFIbG0CASBaWwIBIFxdAgFIhocCASCQkQIBIJ2eAgEgXl8CASBgYQJ5rXRtngiLCIuIiwiKiIsIioiKCIqIigiJiIoIiYiJCImIiQiIiIkIiIiICIiIiAeIiAeqh22eK4gvh7Y4wKacAhirXts82zxXEF8PbHGmYgIYqaXbPNs8VxBfD2xxpmMAAiYAAioCASBmZwJ5rQftngiLCIuIiwiKiIsIioiKCIqIigiJiIoIiYiJCImIiQiIiIkIiIiICIiIiAeIiAeqh22eK4gvh7Y4wKacAhiruds82zxXEF8PbHGmaAIBIGlqAQKJrQIXpoW2ebZ4riC+HtjjpooCF6Sftnm2eK4gvh7Y46ZrAAIiAhirmNs82zxXEF8PbHGmbgIBIG9wAAIlAgFYcXICAUh1dgIXvj2zzbPFcQXw9scYpnMCF79ts82zxXEF8PbHGKZ0AAIvAARWFAIXvu2zzbPFcQXw9scYpooCF7yts82zxXEF8PbHGKZ3AB6LtoZWxsbyB3b3JsZI8AECAUh6ewIBIH5/Ahir+9s82zxXEF8PbHGmfAIYqg3bPNs8VxBfD2xxpn0ABosYoAACIQIBIICBAgFIg4QCGKva2zzbPFcQXw9scaaCAhiqLNs82zxXEF8PbHGmigACJAJ3pR22eCIsIi4iLCIqIiwiKiIoIioiKCImIigiJiIkIiYiJCIiIiQiIiIgIiIiIB4iIB6qHbZ4riC+HtjjpoUCd6b/tngiLCIuIiwiKiIsIioiKCIqIigiJiIoIiYiJCImIiQiIiIkIiIiICIiIiAeIiAeqh22eK4gvh7Y46acAAhx+QQAAhirPds82zxXEF8PbHGmigIBIIiJAhenjbZ5tniuIL4e2OOmigIBSIuMAASLCAIXvP2zzbPFcQXw9scYpo0CF7y9s82zxXEF8PbHGKaPAQKIjgAeAAAAAEhlbGxvIHdvcmxkAAIgAgEgkpMCASCZmgIYqxzbPNs8VxBfD2xxppQCAWaVlgACJwIXvn2zzbPFcQXw9scYppcCF759s82zxXEF8PbHGKaYAESC8LlNJ7mTTT4IpS5S19p9q/rEhO/jelOA7pCI96zi783pAAIpAhirT9s82zxXEF8PbHGmmwJ4qtrbPBEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD2xxppwARILwgKjpaTDMduHx5dazJURMUEIbgA3jfoBWzrTuzR6uDqEABPABAgEgn6ACGa1k7Z5tniuIL4e2OMCmpwIBIKGiAhiphNs82zxXEF8PbHGmpQIXple2ebZ4riC+HtjjpqMCF6b/tnm2eK4gvh7Y46akAARWFQAGixeAAAaLFKACdO1E0NIAAY6u2zxXFxEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDuAw2zyoqQAEVhEB8IEBAdcA1AHQAfpA1AHQ1IEBAdcAgQEB1wDUAdAB1AHQAYEBAdcA1DDQgQEB1wCBAQHXAIEBAdcA1AHQAdQB0AHUAdAB1DDQ1AHQAdQB0AHUAdAB1DDQ1AHQAdQB0AHUAdAB1DDQ1AHQAdQw0BEUERcRFBEUERYRFKoC3oISW2bTQIu0hlbGxvIHdvcmxkiNCGAEHv6qlzG5TaOX5eZGIvXmM0i4EqxbR2OpPw3SAdB5jUSIgwiC8LlNJ7mTTT4IpS5S19p9q/rEhO/jelOA7pCI96zi783pi8SGVsbG8gd29ybGQhiLOrze+KusAAwRFBEVERQAGEhlbGxvIHdvcmxkIQGagkhoZWxsbyB3b3JsZIIQhUH96HCC4OKaoeKaoeKaoeKaoeKaoeKaoeKaoeKaoeKaoeKaoYsIixSgiwiLAYsIixeAiYsYoIsYoIsIiwitAP+rzavNq82rzavNq82rzavNq82rzavNq82rzavNq82rzavNq82rzavNq82rzavNq82rzavNq82rzavNq82rzavNq82rzavNq82rzavNq82rzavNq82rzavNq82rzavNq82rzavNq82rzavNq82rzavNq82rzavNq82rzavNq82rzw==",
    );
    const builder = beginCell();
    builder.storeUint(0, 1);
    initIntrinsicsTester_init_args({ $$type: "IntrinsicsTester_init_args" })(
        builder,
    );
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const IntrinsicsTester_errors: { [key: number]: { message: string } } = {
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

const IntrinsicsTester_types: ABIType[] = [
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
        name: "IntrinsicsTester$Data",
        header: null,
        fields: [
            {
                name: "a",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "b",
                type: { kind: "simple", type: "string", optional: false },
            },
            {
                name: "c",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "d",
                type: { kind: "simple", type: "cell", optional: false },
            },
            {
                name: "e",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "f",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "g",
                type: { kind: "simple", type: "slice", optional: false },
            },
            {
                name: "h",
                type: { kind: "simple", type: "slice", optional: false },
            },
            {
                name: "i",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "j",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "k",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "l",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "m",
                type: { kind: "simple", type: "slice", optional: false },
            },
            {
                name: "n",
                type: { kind: "simple", type: "slice", optional: false },
            },
            {
                name: "o",
                type: { kind: "simple", type: "slice", optional: false },
            },
            {
                name: "p",
                type: { kind: "simple", type: "slice", optional: false },
            },
            {
                name: "q",
                type: { kind: "simple", type: "slice", optional: false },
            },
            {
                name: "r",
                type: { kind: "simple", type: "slice", optional: false },
            },
            {
                name: "s",
                type: { kind: "simple", type: "slice", optional: false },
            },
            {
                name: "t",
                type: { kind: "simple", type: "slice", optional: false },
            },
            {
                name: "u",
                type: { kind: "simple", type: "slice", optional: false },
            },
            {
                name: "w",
                type: { kind: "simple", type: "slice", optional: false },
            },
            {
                name: "v",
                type: { kind: "simple", type: "slice", optional: false },
            },
        ],
    },
];

const IntrinsicsTester_getters: ABIGetter[] = [
    {
        name: "getTons",
        methodId: 85126,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "getTons2",
        methodId: 72025,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "getString",
        methodId: 97624,
        arguments: [],
        returnType: { kind: "simple", type: "string", optional: false },
    },
    {
        name: "getString2",
        methodId: 123179,
        arguments: [],
        returnType: { kind: "simple", type: "string", optional: false },
    },
    {
        name: "getAddress",
        methodId: 67571,
        arguments: [],
        returnType: { kind: "simple", type: "address", optional: false },
    },
    {
        name: "getAddress2",
        methodId: 103926,
        arguments: [],
        returnType: { kind: "simple", type: "address", optional: false },
    },
    {
        name: "getCell",
        methodId: 83057,
        arguments: [],
        returnType: { kind: "simple", type: "cell", optional: false },
    },
    {
        name: "getCell2",
        methodId: 94033,
        arguments: [],
        returnType: { kind: "simple", type: "cell", optional: false },
    },
    {
        name: "getPow",
        methodId: 93948,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "getPow2",
        methodId: 92025,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "getComment",
        methodId: 116303,
        arguments: [],
        returnType: { kind: "simple", type: "cell", optional: false },
    },
    {
        name: "getHash",
        methodId: 120167,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "getHashSlice",
        methodId: 104138,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "getHash2",
        methodId: 125641,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "getHash3",
        methodId: 129768,
        arguments: [
            {
                name: "src",
                type: { kind: "simple", type: "slice", optional: false },
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
        name: "getHash4",
        methodId: 100879,
        arguments: [
            {
                name: "src",
                type: { kind: "simple", type: "string", optional: false },
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
        name: "getHashLongComptime",
        methodId: 121679,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "getHashLongRuntime",
        methodId: 113535,
        arguments: [
            {
                name: "src",
                type: { kind: "simple", type: "string", optional: false },
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
        name: "getHashLongRuntimeSlice",
        methodId: 122586,
        arguments: [
            {
                name: "src",
                type: { kind: "simple", type: "slice", optional: false },
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
        name: "getHashSHA256U",
        methodId: 68441,
        arguments: [
            {
                name: "src",
                type: { kind: "simple", type: "slice", optional: false },
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
        name: "getHashHASHEXTSHA256",
        methodId: 112782,
        arguments: [
            {
                name: "src",
                type: { kind: "simple", type: "slice", optional: false },
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
        name: "getSlice",
        methodId: 84384,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getSlice2",
        methodId: 94204,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getRawSlice",
        methodId: 78245,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getRawSlice2",
        methodId: 103779,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getRawSlice3",
        methodId: 99650,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getRawSlice4",
        methodId: 128421,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getAscii",
        methodId: 77750,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "getAscii2",
        methodId: 95644,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "getAscii3",
        methodId: 91581,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "getAscii4",
        methodId: 71002,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "getCrc32",
        methodId: 71531,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "getCrc32_2",
        methodId: 85945,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "getCrc32_3",
        methodId: 90008,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "getCrc32_4",
        methodId: 77695,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "getRawSlice5",
        methodId: 124292,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getRawSlice6",
        methodId: 120295,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getRawSlice7",
        methodId: 116166,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getRawSlice8",
        methodId: 78889,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getRawSlice9",
        methodId: 74760,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getRawSlice10",
        methodId: 119580,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getRawSlice11",
        methodId: 115517,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getRawSlice12",
        methodId: 127838,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getRawSlice13",
        methodId: 123775,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getRawSlice14",
        methodId: 103320,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getRawSlice15",
        methodId: 99257,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getRawSlice16",
        methodId: 111578,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getRawSlice17",
        methodId: 107515,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getRawSlice18",
        methodId: 86548,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getRawSlice19",
        methodId: 82485,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getRawSlice20",
        methodId: 99919,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getRawSlice21",
        methodId: 104046,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getRawSlice22",
        methodId: 108045,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getRawSlice23",
        methodId: 112172,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "getRawSlice24",
        methodId: 116427,
        arguments: [],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
];

export const IntrinsicsTester_getterMapping: { [key: string]: string } = {
    getTons: "getGetTons",
    getTons2: "getGetTons2",
    getString: "getGetString",
    getString2: "getGetString2",
    getAddress: "getGetAddress",
    getAddress2: "getGetAddress2",
    getCell: "getGetCell",
    getCell2: "getGetCell2",
    getPow: "getGetPow",
    getPow2: "getGetPow2",
    getComment: "getGetComment",
    getHash: "getGetHash",
    getHashSlice: "getGetHashSlice",
    getHash2: "getGetHash2",
    getHash3: "getGetHash3",
    getHash4: "getGetHash4",
    getHashLongComptime: "getGetHashLongComptime",
    getHashLongRuntime: "getGetHashLongRuntime",
    getHashLongRuntimeSlice: "getGetHashLongRuntimeSlice",
    getHashSHA256U: "getGetHashSha256U",
    getHashHASHEXTSHA256: "getGetHashHashextsha256",
    getSlice: "getGetSlice",
    getSlice2: "getGetSlice2",
    getRawSlice: "getGetRawSlice",
    getRawSlice2: "getGetRawSlice2",
    getRawSlice3: "getGetRawSlice3",
    getRawSlice4: "getGetRawSlice4",
    getAscii: "getGetAscii",
    getAscii2: "getGetAscii2",
    getAscii3: "getGetAscii3",
    getAscii4: "getGetAscii4",
    getCrc32: "getGetCrc32",
    getCrc32_2: "getGetCrc32_2",
    getCrc32_3: "getGetCrc32_3",
    getCrc32_4: "getGetCrc32_4",
    getRawSlice5: "getGetRawSlice5",
    getRawSlice6: "getGetRawSlice6",
    getRawSlice7: "getGetRawSlice7",
    getRawSlice8: "getGetRawSlice8",
    getRawSlice9: "getGetRawSlice9",
    getRawSlice10: "getGetRawSlice10",
    getRawSlice11: "getGetRawSlice11",
    getRawSlice12: "getGetRawSlice12",
    getRawSlice13: "getGetRawSlice13",
    getRawSlice14: "getGetRawSlice14",
    getRawSlice15: "getGetRawSlice15",
    getRawSlice16: "getGetRawSlice16",
    getRawSlice17: "getGetRawSlice17",
    getRawSlice18: "getGetRawSlice18",
    getRawSlice19: "getGetRawSlice19",
    getRawSlice20: "getGetRawSlice20",
    getRawSlice21: "getGetRawSlice21",
    getRawSlice22: "getGetRawSlice22",
    getRawSlice23: "getGetRawSlice23",
    getRawSlice24: "getGetRawSlice24",
};

const IntrinsicsTester_receivers: ABIReceiver[] = [
    { receiver: "internal", message: { kind: "text", text: "Deploy" } },
    { receiver: "internal", message: { kind: "text", text: "emit_1" } },
];

export class IntrinsicsTester implements Contract {
    static async init() {
        return await IntrinsicsTester_init();
    }

    static async fromInit() {
        const __gen_init = await IntrinsicsTester_init();
        const address = contractAddress(0, __gen_init);
        return new IntrinsicsTester(address, __gen_init);
    }

    static fromAddress(address: Address) {
        return new IntrinsicsTester(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };
    readonly abi: ContractABI = {
        types: IntrinsicsTester_types,
        getters: IntrinsicsTester_getters,
        receivers: IntrinsicsTester_receivers,
        errors: IntrinsicsTester_errors,
    };

    private constructor(address: Address, init?: { code: Cell; data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(
        provider: ContractProvider,
        via: Sender,
        args: { value: bigint; bounce?: boolean | null | undefined },
        message: "Deploy" | "emit_1",
    ) {
        let body: Cell | null = null;
        if (message === "Deploy") {
            body = beginCell()
                .storeUint(0, 32)
                .storeStringTail(message)
                .endCell();
        }
        if (message === "emit_1") {
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

    async getGetTons(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(85126 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetTons2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(72025 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetString(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(97624 as any, builder.build()))
            .stack;
        const result = source.readString();
        return result;
    }

    async getGetString2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(123179 as any, builder.build()))
            .stack;
        const result = source.readString();
        return result;
    }

    async getGetAddress(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(67571 as any, builder.build()))
            .stack;
        const result = source.readAddress();
        return result;
    }

    async getGetAddress2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(103926 as any, builder.build()))
            .stack;
        const result = source.readAddress();
        return result;
    }

    async getGetCell(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(83057 as any, builder.build()))
            .stack;
        const result = source.readCell();
        return result;
    }

    async getGetCell2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(94033 as any, builder.build()))
            .stack;
        const result = source.readCell();
        return result;
    }

    async getGetPow(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(93948 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetPow2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(92025 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetComment(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(116303 as any, builder.build()))
            .stack;
        const result = source.readCell();
        return result;
    }

    async getGetHash(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(120167 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetHashSlice(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(104138 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetHash2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(125641 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetHash3(provider: ContractProvider, src: Slice) {
        const builder = new TupleBuilder();
        builder.writeSlice(src.asCell());
        const source = (await provider.get(129768 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetHash4(provider: ContractProvider, src: string) {
        const builder = new TupleBuilder();
        builder.writeString(src);
        const source = (await provider.get(100879 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetHashLongComptime(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(121679 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetHashLongRuntime(provider: ContractProvider, src: string) {
        const builder = new TupleBuilder();
        builder.writeString(src);
        const source = (await provider.get(113535 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetHashLongRuntimeSlice(provider: ContractProvider, src: Slice) {
        const builder = new TupleBuilder();
        builder.writeSlice(src.asCell());
        const source = (await provider.get(122586 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetHashSha256U(provider: ContractProvider, src: Slice) {
        const builder = new TupleBuilder();
        builder.writeSlice(src.asCell());
        const source = (await provider.get(68441 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetHashHashextsha256(provider: ContractProvider, src: Slice) {
        const builder = new TupleBuilder();
        builder.writeSlice(src.asCell());
        const source = (await provider.get(112782 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetSlice(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(84384 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetSlice2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(94204 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetRawSlice(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(78245 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetRawSlice2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(103779 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetRawSlice3(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(99650 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetRawSlice4(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(128421 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetAscii(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(77750 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetAscii2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(95644 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetAscii3(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(91581 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetAscii4(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(71002 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetCrc32(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(71531 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetCrc32_2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(85945 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetCrc32_3(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(90008 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetCrc32_4(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(77695 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetRawSlice5(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(124292 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetRawSlice6(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(120295 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetRawSlice7(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(116166 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetRawSlice8(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(78889 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetRawSlice9(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(74760 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetRawSlice10(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(119580 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetRawSlice11(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(115517 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetRawSlice12(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(127838 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetRawSlice13(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(123775 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetRawSlice14(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(103320 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetRawSlice15(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(99257 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetRawSlice16(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(111578 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetRawSlice17(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(107515 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetRawSlice18(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(86548 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetRawSlice19(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(82485 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetRawSlice20(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(99919 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetRawSlice21(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(104046 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetRawSlice22(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(108045 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetRawSlice23(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(112172 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getGetRawSlice24(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(116427 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }
}
