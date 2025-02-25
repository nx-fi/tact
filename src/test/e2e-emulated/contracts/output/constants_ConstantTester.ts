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

export type A = {
    $$type: "A";
    b: bigint;
};

export function storeA(src: A) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.b, 257);
    };
}

export function loadA(slice: Slice) {
    const sc_0 = slice;
    const _b = sc_0.loadIntBig(257);
    return { $$type: "A" as const, b: _b };
}

function loadTupleA(source: TupleReader) {
    const _b = source.readBigNumber();
    return { $$type: "A" as const, b: _b };
}

function loadGetterTupleA(source: TupleReader) {
    const _b = source.readBigNumber();
    return { $$type: "A" as const, b: _b };
}

function storeTupleA(source: A) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.b);
    return builder.build();
}

function dictValueParserA(): DictionaryValue<A> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeA(src)).endCell());
        },
        parse: (src) => {
            return loadA(src.loadRef().beginParse());
        },
    };
}

export type S = {
    $$type: "S";
    a: boolean;
    b: bigint;
};

export function storeS(src: S) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.a);
        b_0.storeInt(src.b, 257);
    };
}

export function loadS(slice: Slice) {
    const sc_0 = slice;
    const _a = sc_0.loadBit();
    const _b = sc_0.loadIntBig(257);
    return { $$type: "S" as const, a: _a, b: _b };
}

function loadTupleS(source: TupleReader) {
    const _a = source.readBoolean();
    const _b = source.readBigNumber();
    return { $$type: "S" as const, a: _a, b: _b };
}

function loadGetterTupleS(source: TupleReader) {
    const _a = source.readBoolean();
    const _b = source.readBigNumber();
    return { $$type: "S" as const, a: _a, b: _b };
}

function storeTupleS(source: S) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.a);
    builder.writeNumber(source.b);
    return builder.build();
}

function dictValueParserS(): DictionaryValue<S> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeS(src)).endCell());
        },
        parse: (src) => {
            return loadS(src.loadRef().beginParse());
        },
    };
}

export type T = {
    $$type: "T";
    a: bigint;
    s: S;
};

export function storeT(src: T) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
        b_0.store(storeS(src.s));
    };
}

export function loadT(slice: Slice) {
    const sc_0 = slice;
    const _a = sc_0.loadIntBig(257);
    const _s = loadS(sc_0);
    return { $$type: "T" as const, a: _a, s: _s };
}

function loadTupleT(source: TupleReader) {
    const _a = source.readBigNumber();
    const _s = loadTupleS(source);
    return { $$type: "T" as const, a: _a, s: _s };
}

function loadGetterTupleT(source: TupleReader) {
    const _a = source.readBigNumber();
    const _s = loadGetterTupleS(source);
    return { $$type: "T" as const, a: _a, s: _s };
}

function storeTupleT(source: T) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeTuple(storeTupleS(source.s));
    return builder.build();
}

function dictValueParserT(): DictionaryValue<T> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeT(src)).endCell());
        },
        parse: (src) => {
            return loadT(src.loadRef().beginParse());
        },
    };
}

export type ConstantTester$Data = {
    $$type: "ConstantTester$Data";
};

export function storeConstantTester$Data(src: ConstantTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

export function loadConstantTester$Data(slice: Slice) {
    const sc_0 = slice;
    return { $$type: "ConstantTester$Data" as const };
}

function loadTupleConstantTester$Data(source: TupleReader) {
    return { $$type: "ConstantTester$Data" as const };
}

function loadGetterTupleConstantTester$Data(source: TupleReader) {
    return { $$type: "ConstantTester$Data" as const };
}

function storeTupleConstantTester$Data(source: ConstantTester$Data) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserConstantTester$Data(): DictionaryValue<ConstantTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeConstantTester$Data(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadConstantTester$Data(src.loadRef().beginParse());
        },
    };
}

type ConstantTester_init_args = {
    $$type: "ConstantTester_init_args";
};

function initConstantTester_init_args(src: ConstantTester_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function ConstantTester_init() {
    const __code = Cell.fromBase64(
        "te6ccgECqwEABdcAART/APSkE/S88sgLAQIBYgIDAYbQAdBy1yHSANIA+kAhEDRQZm8E+GEC+GLbPAKRW+BwIddJIMIflTEB0x8wkTLiwAABwSGwmTDIfwHKAMntVOAw8sCCqQIBIAQFAgEgBgcCASAICQIBIA4PAgEgISICASAKCwIBIAwNAgEgOzwCASBUVQIBIG1uAgEgjY4CASAQEQIBIBkaAgEgEhMCASAWFwIBSBQVAg+spm2ebZ4YwKlPAg2n5bZ5tnhjqU8CDaaNtnm2eGOpKwIPrOntnm2eGMCpGAIPrLbtnm2eGMCpfQBIjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAgEgGxwCASAeHwIPrNhtnm2eGMCpHQIPrS5tnm2eGMCpTwBIjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACRosAg+syO2ebZ4YwKkgAg+tPu2ebZ4YwKlnAEiNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACRorPE1eb3wCASAjJAIBIDAxAgEgJSYCASAsLQIBICcoAg+sXe2ebZ4YwKl9AgFIKSoCDquy2zzbPDGpUwINoZ9s82zwxqkrAg2h22zzbPDGqaoABIAUAgEgLi8CD6xNbZ5tnhjAqaoCDqlX2zzbPDGpZwIOq5PbPNs8Mak6AgEgMjMCAek4OQIBIDQ1AgHnNjcCDqgl2zzbPDGpXAIOq/DbPNs8MalTAg267bPNs8MYqVMCDb0ds82zwxipjAINuP2zzbPDGKk6Ag2/DbPNs8MYqYwARIL3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECAVg9PgIBWEhJAgEgP0ACAWpERQIBIEFCAg2mLbZ5tnhjqU8CDaETbPNs8MapZwINoN9s82zwxqlDAA6CGGort9AAAg25/bPNs8MYqUYCDb4Ns82zwxipRwAEgBsABIT/AgEgSksCAWpQUQIBIExNAg2mb7Z5tnhjqU8CDaGXbPNs8MapmAINoFts82zwxqlOAByLxIZWxsbyB3b3JsZCGAACfwINu+2zzbPDGKlSAg28HbPNs8MYqVMABIAaAASF/wIBWFZXAgFYYWICASBYWQIBal5fAgEgWlsCDaaptnm2eGOpXQINoBts82zwxqmYAg2h12zzbPDGqVwAAnoABID6Ag293bPNs8MYqWsCDbots82zwxipYAAEgCACASBjZAIBamlqAgEgZWYCDabrtnm2eGOpmQINoJ9s82zwxqlnAg2hU2zzbPDGqWgABIAqAAJ1Ag2/zbPNs8MYqWsCDbg9s82zwxipbAAEgA8ABoEA8wIBIG9wAgEgfn8CASBxcgIBIHd4AgEgc3QCDqth2zzbPDGpdgINpyO2ebZ4Y6l1Ag2nobZ5tnhjqYAABoEAyAAEgGQCASB5egIBant8Ag+lgbZ5tnjYJammAg2nJbZ5tnhjqX0CDb5Ns82zwxipnAINub2zzbPDGKl9AAJ0Ag+t+O2ebZ4YwKmAAgEggYIAAngCASCDhAIBaomKAgEghYYCDadntnm2eGOpiAINo4ds82zwxqmYAg2iS2zzbPDGqYcABIALAAJ8Ag28XbPNs8MYqYsCDbuts82zwxipjAAEgKYAAnICASCPkAIBIJ2eAg+tyW2ebZ4YwKmfAgEgkZICASCTlAIBapqbAgEglZYCDaehtnm2eGOpmQIPogts82zxsE6plwINo8ds82zwxqmYAAiAKn8hAAJtAAJwAg26bbPNs8MYqZwCDb2ds82zwxipqAAEgFgCD63Z7Z5tnhjAqZ8CASCgoQAEgBgCASCiowIOqgfbPNs8MamqAgEgpKUCDafjtnm2eGOpqAIPoo9s82zxsEqppgINo0Ns82zwxqmnAAZwgCoADoIYHKNfDgAAAnEAFO1E0NIAMJFt4G0ASI0IYAJUC4RpZ72K0NmxffskQCKOtMIw+peC+KLZtgQovrtDnA==",
    );
    const builder = beginCell();
    builder.storeUint(0, 1);
    initConstantTester_init_args({ $$type: "ConstantTester_init_args" })(
        builder,
    );
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const ConstantTester_errors: { [key: number]: { message: string } } = {
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

const ConstantTester_types: ABIType[] = [
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
        name: "A",
        header: null,
        fields: [
            {
                name: "b",
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
        name: "S",
        header: null,
        fields: [
            {
                name: "a",
                type: { kind: "simple", type: "bool", optional: false },
            },
            {
                name: "b",
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
        name: "T",
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
            { name: "s", type: { kind: "simple", type: "S", optional: false } },
        ],
    },
    { name: "ConstantTester$Data", header: null, fields: [] },
];

const ConstantTester_getters: ABIGetter[] = [
    {
        name: "something1",
        methodId: 121234,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something2",
        methodId: 125425,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: true,
            format: 257,
        },
    },
    {
        name: "something3",
        methodId: 129488,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something4",
        methodId: 100663,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something5",
        methodId: 104726,
        arguments: [],
        returnType: { kind: "simple", type: "string", optional: false },
    },
    {
        name: "something6",
        methodId: 108917,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something7",
        methodId: 112980,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something8",
        methodId: 84155,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something9",
        methodId: 88218,
        arguments: [],
        returnType: { kind: "simple", type: "address", optional: false },
    },
    {
        name: "something10",
        methodId: 130567,
        arguments: [],
        returnType: { kind: "simple", type: "address", optional: false },
    },
    {
        name: "something11",
        methodId: 126502,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something12",
        methodId: 122437,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something13",
        methodId: 118372,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something14",
        methodId: 114307,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something15",
        methodId: 110242,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something16",
        methodId: 106177,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something17",
        methodId: 102112,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something18",
        methodId: 98063,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something19",
        methodId: 93998,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something20",
        methodId: 109396,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something21",
        methodId: 113525,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something22",
        methodId: 101142,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something23",
        methodId: 105271,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something24",
        methodId: 125904,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something25",
        methodId: 130033,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something26",
        methodId: 117650,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something27",
        methodId: 121779,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something28",
        methodId: 76380,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something29",
        methodId: 80509,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: true,
            format: 257,
        },
    },
    {
        name: "something30",
        methodId: 104549,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: true,
            format: 257,
        },
    },
    {
        name: "something31",
        methodId: 100420,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something32",
        methodId: 112679,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something33",
        methodId: 108550,
        arguments: [],
        returnType: { kind: "dict", key: "int", value: "int" },
    },
    {
        name: "something34",
        methodId: 121057,
        arguments: [],
        returnType: { kind: "dict", key: "int", value: "int" },
    },
    {
        name: "something35",
        methodId: 116928,
        arguments: [],
        returnType: { kind: "simple", type: "S", optional: false },
    },
    {
        name: "something36",
        methodId: 129187,
        arguments: [],
        returnType: { kind: "simple", type: "S", optional: false },
    },
    {
        name: "something37",
        methodId: 125058,
        arguments: [],
        returnType: { kind: "simple", type: "T", optional: false },
    },
    {
        name: "something38",
        methodId: 72045,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "something39",
        methodId: 67916,
        arguments: [],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "something40",
        methodId: 66034,
        arguments: [],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "something41",
        methodId: 70099,
        arguments: [],
        returnType: { kind: "simple", type: "address", optional: false },
    },
    {
        name: "something42",
        methodId: 74160,
        arguments: [],
        returnType: { kind: "simple", type: "address", optional: false },
    },
    {
        name: "something43",
        methodId: 78225,
        arguments: [],
        returnType: { kind: "simple", type: "address", optional: false },
    },
    {
        name: "something44",
        methodId: 82294,
        arguments: [],
        returnType: { kind: "simple", type: "address", optional: false },
    },
    {
        name: "something45",
        methodId: 86359,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "globalConst1",
        methodId: 126681,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "globalConst2",
        methodId: 122554,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "globalConst3",
        methodId: 118427,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "globalConst4",
        methodId: 114300,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "globalConst5",
        methodId: 110173,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "globalConst6",
        methodId: 106046,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "globalConst7",
        methodId: 101919,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "globalConst8",
        methodId: 98288,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "globalConst9",
        methodId: 94161,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "globalConst10",
        methodId: 127923,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "globalConst11",
        methodId: 123794,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "globalConst12",
        methodId: 119793,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "globalConst13",
        methodId: 115664,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "beforeDefinedA",
        methodId: 90149,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "beforeDefinedC",
        methodId: 82023,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "defaultFieldB",
        methodId: 66374,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "noCircularA",
        methodId: 115089,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "minInt1",
        methodId: 92144,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "minInt2",
        methodId: 87955,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "minInt3",
        methodId: 83890,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "globalConst",
        methodId: 116577,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
];

export const ConstantTester_getterMapping: { [key: string]: string } = {
    something1: "getSomething1",
    something2: "getSomething2",
    something3: "getSomething3",
    something4: "getSomething4",
    something5: "getSomething5",
    something6: "getSomething6",
    something7: "getSomething7",
    something8: "getSomething8",
    something9: "getSomething9",
    something10: "getSomething10",
    something11: "getSomething11",
    something12: "getSomething12",
    something13: "getSomething13",
    something14: "getSomething14",
    something15: "getSomething15",
    something16: "getSomething16",
    something17: "getSomething17",
    something18: "getSomething18",
    something19: "getSomething19",
    something20: "getSomething20",
    something21: "getSomething21",
    something22: "getSomething22",
    something23: "getSomething23",
    something24: "getSomething24",
    something25: "getSomething25",
    something26: "getSomething26",
    something27: "getSomething27",
    something28: "getSomething28",
    something29: "getSomething29",
    something30: "getSomething30",
    something31: "getSomething31",
    something32: "getSomething32",
    something33: "getSomething33",
    something34: "getSomething34",
    something35: "getSomething35",
    something36: "getSomething36",
    something37: "getSomething37",
    something38: "getSomething38",
    something39: "getSomething39",
    something40: "getSomething40",
    something41: "getSomething41",
    something42: "getSomething42",
    something43: "getSomething43",
    something44: "getSomething44",
    something45: "getSomething45",
    globalConst1: "getGlobalConst1",
    globalConst2: "getGlobalConst2",
    globalConst3: "getGlobalConst3",
    globalConst4: "getGlobalConst4",
    globalConst5: "getGlobalConst5",
    globalConst6: "getGlobalConst6",
    globalConst7: "getGlobalConst7",
    globalConst8: "getGlobalConst8",
    globalConst9: "getGlobalConst9",
    globalConst10: "getGlobalConst10",
    globalConst11: "getGlobalConst11",
    globalConst12: "getGlobalConst12",
    globalConst13: "getGlobalConst13",
    beforeDefinedA: "getBeforeDefinedA",
    beforeDefinedC: "getBeforeDefinedC",
    defaultFieldB: "getDefaultFieldB",
    noCircularA: "getNoCircularA",
    minInt1: "getMinInt1",
    minInt2: "getMinInt2",
    minInt3: "getMinInt3",
    globalConst: "getGlobalConst",
};

const ConstantTester_receivers: ABIReceiver[] = [
    { receiver: "internal", message: { kind: "empty" } },
];

export class ConstantTester implements Contract {
    static async init() {
        return await ConstantTester_init();
    }

    static async fromInit() {
        const __gen_init = await ConstantTester_init();
        const address = contractAddress(0, __gen_init);
        return new ConstantTester(address, __gen_init);
    }

    static fromAddress(address: Address) {
        return new ConstantTester(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };
    readonly abi: ContractABI = {
        types: ConstantTester_types,
        getters: ConstantTester_getters,
        receivers: ConstantTester_receivers,
        errors: ConstantTester_errors,
    };

    private constructor(address: Address, init?: { code: Cell; data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(
        provider: ContractProvider,
        via: Sender,
        args: { value: bigint; bounce?: boolean | null | undefined },
        message: null,
    ) {
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (body === null) {
            throw new Error("Invalid message type");
        }

        await provider.internal(via, { ...args, body: body });
    }

    async getSomething1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(121234 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(125425 as any, builder.build()))
            .stack;
        const result = source.readBigNumberOpt();
        return result;
    }

    async getSomething3(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(129488 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething4(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(100663 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething5(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(104726 as any, builder.build()))
            .stack;
        const result = source.readString();
        return result;
    }

    async getSomething6(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(108917 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething7(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(112980 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething8(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(84155 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething9(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(88218 as any, builder.build()))
            .stack;
        const result = source.readAddress();
        return result;
    }

    async getSomething10(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(130567 as any, builder.build()))
            .stack;
        const result = source.readAddress();
        return result;
    }

    async getSomething11(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(126502 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething12(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(122437 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething13(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(118372 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething14(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(114307 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething15(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(110242 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething16(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(106177 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething17(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(102112 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething18(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(98063 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething19(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(93998 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething20(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(109396 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething21(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(113525 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething22(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(101142 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething23(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(105271 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething24(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(125904 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething25(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(130033 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething26(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(117650 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething27(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(121779 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething28(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(76380 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething29(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(80509 as any, builder.build()))
            .stack;
        const result = source.readBigNumberOpt();
        return result;
    }

    async getSomething30(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(104549 as any, builder.build()))
            .stack;
        const result = source.readBigNumberOpt();
        return result;
    }

    async getSomething31(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(100420 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething32(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(112679 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething33(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(108550 as any, builder.build()))
            .stack;
        const result = Dictionary.loadDirect(
            Dictionary.Keys.BigInt(257),
            Dictionary.Values.BigInt(257),
            source.readCellOpt(),
        );
        return result;
    }

    async getSomething34(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(121057 as any, builder.build()))
            .stack;
        const result = Dictionary.loadDirect(
            Dictionary.Keys.BigInt(257),
            Dictionary.Values.BigInt(257),
            source.readCellOpt(),
        );
        return result;
    }

    async getSomething35(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(116928 as any, builder.build()))
            .stack;
        const result = loadGetterTupleS(source);
        return result;
    }

    async getSomething36(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(129187 as any, builder.build()))
            .stack;
        const result = loadGetterTupleS(source);
        return result;
    }

    async getSomething37(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(125058 as any, builder.build()))
            .stack;
        const result = loadGetterTupleT(source);
        return result;
    }

    async getSomething38(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(72045 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSomething39(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(67916 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getSomething40(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(66034 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getSomething41(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(70099 as any, builder.build()))
            .stack;
        const result = source.readAddress();
        return result;
    }

    async getSomething42(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(74160 as any, builder.build()))
            .stack;
        const result = source.readAddress();
        return result;
    }

    async getSomething43(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(78225 as any, builder.build()))
            .stack;
        const result = source.readAddress();
        return result;
    }

    async getSomething44(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(82294 as any, builder.build()))
            .stack;
        const result = source.readAddress();
        return result;
    }

    async getSomething45(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(86359 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGlobalConst1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(126681 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGlobalConst2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(122554 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGlobalConst3(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(118427 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGlobalConst4(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(114300 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGlobalConst5(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(110173 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGlobalConst6(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(106046 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGlobalConst7(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(101919 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGlobalConst8(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(98288 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGlobalConst9(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(94161 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGlobalConst10(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(127923 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGlobalConst11(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(123794 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGlobalConst12(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(119793 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGlobalConst13(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(115664 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getBeforeDefinedA(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(90149 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getBeforeDefinedC(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(82023 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getDefaultFieldB(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(66374 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getNoCircularA(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(115089 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getMinInt1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(92144 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getMinInt2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(87955 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getMinInt3(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(83890 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGlobalConst(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(116577 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }
}
