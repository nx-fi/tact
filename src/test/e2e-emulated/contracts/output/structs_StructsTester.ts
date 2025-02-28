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
    address, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type DataSize = {
    $$type: 'DataSize';
    cells: bigint;
    bits: bigint;
    refs: bigint;
}

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
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
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
        }
    }
}

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

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
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
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
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

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
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
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
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
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
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
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
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type MessageParameters = {
    $$type: 'MessageParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeMessageParameters(src: MessageParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadMessageParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function loadTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function loadGetterTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function storeTupleMessageParameters(source: MessageParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
        }
    }
}

export type DeployParameters = {
    $$type: 'DeployParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
}

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
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
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
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
            builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

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
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
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
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

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
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
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
        }
    }
}

export type BasechainAddress = {
    $$type: 'BasechainAddress';
    hash: bigint | null;
}

export function storeBasechainAddress(src: BasechainAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) { b_0.storeBit(true).storeInt(src.hash, 257); } else { b_0.storeBit(false); }
    };
}

export function loadBasechainAddress(slice: Slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function loadTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function loadGetterTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function storeTupleBasechainAddress(source: BasechainAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}

function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    }
}

export type S = {
    $$type: 'S';
    a: boolean;
    b: bigint;
}

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
    return { $$type: 'S' as const, a: _a, b: _b };
}

function loadTupleS(source: TupleReader) {
    const _a = source.readBoolean();
    const _b = source.readBigNumber();
    return { $$type: 'S' as const, a: _a, b: _b };
}

function loadGetterTupleS(source: TupleReader) {
    const _a = source.readBoolean();
    const _b = source.readBigNumber();
    return { $$type: 'S' as const, a: _a, b: _b };
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
        }
    }
}

export type T = {
    $$type: 'T';
    a: bigint;
    s: S;
}

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
    return { $$type: 'T' as const, a: _a, s: _s };
}

function loadTupleT(source: TupleReader) {
    const _a = source.readBigNumber();
    const _s = loadTupleS(source);
    return { $$type: 'T' as const, a: _a, s: _s };
}

function loadGetterTupleT(source: TupleReader) {
    const _a = source.readBigNumber();
    const _s = loadGetterTupleS(source);
    return { $$type: 'T' as const, a: _a, s: _s };
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
        }
    }
}

export type MyStruct1 = {
    $$type: 'MyStruct1';
    a: bigint;
    b: bigint;
    c: bigint | null;
}

export function storeMyStruct1(src: MyStruct1) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
        b_0.storeUint(src.b, 32);
        if (src.c !== null && src.c !== undefined) { b_0.storeBit(true).storeInt(src.c, 257); } else { b_0.storeBit(false); }
    };
}

export function loadMyStruct1(slice: Slice) {
    const sc_0 = slice;
    const _a = sc_0.loadIntBig(257);
    const _b = sc_0.loadUintBig(32);
    const _c = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'MyStruct1' as const, a: _a, b: _b, c: _c };
}

function loadTupleMyStruct1(source: TupleReader) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    const _c = source.readBigNumberOpt();
    return { $$type: 'MyStruct1' as const, a: _a, b: _b, c: _c };
}

function loadGetterTupleMyStruct1(source: TupleReader) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    const _c = source.readBigNumberOpt();
    return { $$type: 'MyStruct1' as const, a: _a, b: _b, c: _c };
}

function storeTupleMyStruct1(source: MyStruct1) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeNumber(source.b);
    builder.writeNumber(source.c);
    return builder.build();
}

function dictValueParserMyStruct1(): DictionaryValue<MyStruct1> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMyStruct1(src)).endCell());
        },
        parse: (src) => {
            return loadMyStruct1(src.loadRef().beginParse());
        }
    }
}

export type MyStruct2 = {
    $$type: 'MyStruct2';
    m: Dictionary<bigint, bigint>;
    s: MyStruct1 | null;
}

export function storeMyStruct2(src: MyStruct2) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeDict(src.m, Dictionary.Keys.BigInt(257), Dictionary.Values.BigUint(64));
        if (src.s !== null && src.s !== undefined) { b_0.storeBit(true); b_0.store(storeMyStruct1(src.s)); } else { b_0.storeBit(false); }
    };
}

export function loadMyStruct2(slice: Slice) {
    const sc_0 = slice;
    const _m = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigUint(64), sc_0);
    const _s = sc_0.loadBit() ? loadMyStruct1(sc_0) : null;
    return { $$type: 'MyStruct2' as const, m: _m, s: _s };
}

function loadTupleMyStruct2(source: TupleReader) {
    const _m = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigUint(64), source.readCellOpt());
    const _s_p = source.readTupleOpt();
    const _s = _s_p ? loadTupleMyStruct1(_s_p) : null;
    return { $$type: 'MyStruct2' as const, m: _m, s: _s };
}

function loadGetterTupleMyStruct2(source: TupleReader) {
    const _m = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigUint(64), source.readCellOpt());
    const _s_p = source.readTupleOpt();
    const _s = _s_p ? loadTupleMyStruct1(_s_p) : null;
    return { $$type: 'MyStruct2' as const, m: _m, s: _s };
}

function storeTupleMyStruct2(source: MyStruct2) {
    const builder = new TupleBuilder();
    builder.writeCell(source.m.size > 0 ? beginCell().storeDictDirect(source.m, Dictionary.Keys.BigInt(257), Dictionary.Values.BigUint(64)).endCell() : null);
    if (source.s !== null && source.s !== undefined) {
        builder.writeTuple(storeTupleMyStruct1(source.s));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserMyStruct2(): DictionaryValue<MyStruct2> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMyStruct2(src)).endCell());
        },
        parse: (src) => {
            return loadMyStruct2(src.loadRef().beginParse());
        }
    }
}

export type MyStruct3 = {
    $$type: 'MyStruct3';
    s: string;
}

export function storeMyStruct3(src: MyStruct3) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.s);
    };
}

export function loadMyStruct3(slice: Slice) {
    const sc_0 = slice;
    const _s = sc_0.loadStringRefTail();
    return { $$type: 'MyStruct3' as const, s: _s };
}

function loadTupleMyStruct3(source: TupleReader) {
    const _s = source.readString();
    return { $$type: 'MyStruct3' as const, s: _s };
}

function loadGetterTupleMyStruct3(source: TupleReader) {
    const _s = source.readString();
    return { $$type: 'MyStruct3' as const, s: _s };
}

function storeTupleMyStruct3(source: MyStruct3) {
    const builder = new TupleBuilder();
    builder.writeString(source.s);
    return builder.build();
}

function dictValueParserMyStruct3(): DictionaryValue<MyStruct3> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMyStruct3(src)).endCell());
        },
        parse: (src) => {
            return loadMyStruct3(src.loadRef().beginParse());
        }
    }
}

export type MyMessage1 = {
    $$type: 'MyMessage1';
    a: bigint;
    s: MyStruct2;
}

export function storeMyMessage1(src: MyMessage1) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2844430700, 32);
        b_0.storeInt(src.a, 257);
        b_0.store(storeMyStruct2(src.s));
    };
}

export function loadMyMessage1(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2844430700) { throw Error('Invalid prefix'); }
    const _a = sc_0.loadIntBig(257);
    const _s = loadMyStruct2(sc_0);
    return { $$type: 'MyMessage1' as const, a: _a, s: _s };
}

function loadTupleMyMessage1(source: TupleReader) {
    const _a = source.readBigNumber();
    const _s = loadTupleMyStruct2(source);
    return { $$type: 'MyMessage1' as const, a: _a, s: _s };
}

function loadGetterTupleMyMessage1(source: TupleReader) {
    const _a = source.readBigNumber();
    const _s = loadGetterTupleMyStruct2(source);
    return { $$type: 'MyMessage1' as const, a: _a, s: _s };
}

function storeTupleMyMessage1(source: MyMessage1) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeTuple(storeTupleMyStruct2(source.s));
    return builder.build();
}

function dictValueParserMyMessage1(): DictionaryValue<MyMessage1> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMyMessage1(src)).endCell());
        },
        parse: (src) => {
            return loadMyMessage1(src.loadRef().beginParse());
        }
    }
}

export type Coin = {
    $$type: 'Coin';
    first: bigint;
    second: bigint;
}

export function storeCoin(src: Coin) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeCoins(src.first);
        b_0.storeUint(src.second, 32);
    };
}

export function loadCoin(slice: Slice) {
    const sc_0 = slice;
    const _first = sc_0.loadCoins();
    const _second = sc_0.loadUintBig(32);
    return { $$type: 'Coin' as const, first: _first, second: _second };
}

function loadTupleCoin(source: TupleReader) {
    const _first = source.readBigNumber();
    const _second = source.readBigNumber();
    return { $$type: 'Coin' as const, first: _first, second: _second };
}

function loadGetterTupleCoin(source: TupleReader) {
    const _first = source.readBigNumber();
    const _second = source.readBigNumber();
    return { $$type: 'Coin' as const, first: _first, second: _second };
}

function storeTupleCoin(source: Coin) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.first);
    builder.writeNumber(source.second);
    return builder.build();
}

function dictValueParserCoin(): DictionaryValue<Coin> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCoin(src)).endCell());
        },
        parse: (src) => {
            return loadCoin(src.loadRef().beginParse());
        }
    }
}

export type VarIntegers = {
    $$type: 'VarIntegers';
    a: bigint;
    b: bigint;
    c: bigint;
    d: bigint;
}

export function storeVarIntegers(src: VarIntegers) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeVarInt(src.a, 2);
        b_0.storeVarInt(src.b, 4);
        b_0.storeVarUint(src.c, 2);
        b_0.storeVarUint(src.d, 4);
    };
}

export function loadVarIntegers(slice: Slice) {
    const sc_0 = slice;
    const _a = sc_0.loadVarIntBig(2);
    const _b = sc_0.loadVarIntBig(4);
    const _c = sc_0.loadVarUintBig(2);
    const _d = sc_0.loadVarUintBig(4);
    return { $$type: 'VarIntegers' as const, a: _a, b: _b, c: _c, d: _d };
}

function loadTupleVarIntegers(source: TupleReader) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    const _c = source.readBigNumber();
    const _d = source.readBigNumber();
    return { $$type: 'VarIntegers' as const, a: _a, b: _b, c: _c, d: _d };
}

function loadGetterTupleVarIntegers(source: TupleReader) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    const _c = source.readBigNumber();
    const _d = source.readBigNumber();
    return { $$type: 'VarIntegers' as const, a: _a, b: _b, c: _c, d: _d };
}

function storeTupleVarIntegers(source: VarIntegers) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeNumber(source.b);
    builder.writeNumber(source.c);
    builder.writeNumber(source.d);
    return builder.build();
}

function dictValueParserVarIntegers(): DictionaryValue<VarIntegers> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarIntegers(src)).endCell());
        },
        parse: (src) => {
            return loadVarIntegers(src.loadRef().beginParse());
        }
    }
}

export type IntFields = {
    $$type: 'IntFields';
    i1: bigint;
    i2: bigint;
    i3: bigint;
    i255: bigint;
    i256: bigint;
    i257: bigint;
}

export function storeIntFields(src: IntFields) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.i1, 1);
        b_0.storeInt(src.i2, 2);
        b_0.storeInt(src.i3, 3);
        b_0.storeInt(src.i255, 255);
        b_0.storeInt(src.i256, 256);
        b_0.storeInt(src.i257, 257);
    };
}

export function loadIntFields(slice: Slice) {
    const sc_0 = slice;
    const _i1 = sc_0.loadIntBig(1);
    const _i2 = sc_0.loadIntBig(2);
    const _i3 = sc_0.loadIntBig(3);
    const _i255 = sc_0.loadIntBig(255);
    const _i256 = sc_0.loadIntBig(256);
    const _i257 = sc_0.loadIntBig(257);
    return { $$type: 'IntFields' as const, i1: _i1, i2: _i2, i3: _i3, i255: _i255, i256: _i256, i257: _i257 };
}

function loadTupleIntFields(source: TupleReader) {
    const _i1 = source.readBigNumber();
    const _i2 = source.readBigNumber();
    const _i3 = source.readBigNumber();
    const _i255 = source.readBigNumber();
    const _i256 = source.readBigNumber();
    const _i257 = source.readBigNumber();
    return { $$type: 'IntFields' as const, i1: _i1, i2: _i2, i3: _i3, i255: _i255, i256: _i256, i257: _i257 };
}

function loadGetterTupleIntFields(source: TupleReader) {
    const _i1 = source.readBigNumber();
    const _i2 = source.readBigNumber();
    const _i3 = source.readBigNumber();
    const _i255 = source.readBigNumber();
    const _i256 = source.readBigNumber();
    const _i257 = source.readBigNumber();
    return { $$type: 'IntFields' as const, i1: _i1, i2: _i2, i3: _i3, i255: _i255, i256: _i256, i257: _i257 };
}

function storeTupleIntFields(source: IntFields) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.i1);
    builder.writeNumber(source.i2);
    builder.writeNumber(source.i3);
    builder.writeNumber(source.i255);
    builder.writeNumber(source.i256);
    builder.writeNumber(source.i257);
    return builder.build();
}

function dictValueParserIntFields(): DictionaryValue<IntFields> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeIntFields(src)).endCell());
        },
        parse: (src) => {
            return loadIntFields(src.loadRef().beginParse());
        }
    }
}

export type UintFields = {
    $$type: 'UintFields';
    u1: bigint;
    u2: bigint;
    u3: bigint;
    u254: bigint;
    u255: bigint;
    u256: bigint;
}

export function storeUintFields(src: UintFields) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3925996650, 32);
        b_0.storeUint(src.u1, 1);
        b_0.storeUint(src.u2, 2);
        b_0.storeUint(src.u3, 3);
        b_0.storeUint(src.u254, 254);
        b_0.storeUint(src.u255, 255);
        b_0.storeUint(src.u256, 256);
    };
}

export function loadUintFields(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3925996650) { throw Error('Invalid prefix'); }
    const _u1 = sc_0.loadUintBig(1);
    const _u2 = sc_0.loadUintBig(2);
    const _u3 = sc_0.loadUintBig(3);
    const _u254 = sc_0.loadUintBig(254);
    const _u255 = sc_0.loadUintBig(255);
    const _u256 = sc_0.loadUintBig(256);
    return { $$type: 'UintFields' as const, u1: _u1, u2: _u2, u3: _u3, u254: _u254, u255: _u255, u256: _u256 };
}

function loadTupleUintFields(source: TupleReader) {
    const _u1 = source.readBigNumber();
    const _u2 = source.readBigNumber();
    const _u3 = source.readBigNumber();
    const _u254 = source.readBigNumber();
    const _u255 = source.readBigNumber();
    const _u256 = source.readBigNumber();
    return { $$type: 'UintFields' as const, u1: _u1, u2: _u2, u3: _u3, u254: _u254, u255: _u255, u256: _u256 };
}

function loadGetterTupleUintFields(source: TupleReader) {
    const _u1 = source.readBigNumber();
    const _u2 = source.readBigNumber();
    const _u3 = source.readBigNumber();
    const _u254 = source.readBigNumber();
    const _u255 = source.readBigNumber();
    const _u256 = source.readBigNumber();
    return { $$type: 'UintFields' as const, u1: _u1, u2: _u2, u3: _u3, u254: _u254, u255: _u255, u256: _u256 };
}

function storeTupleUintFields(source: UintFields) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.u1);
    builder.writeNumber(source.u2);
    builder.writeNumber(source.u3);
    builder.writeNumber(source.u254);
    builder.writeNumber(source.u255);
    builder.writeNumber(source.u256);
    return builder.build();
}

function dictValueParserUintFields(): DictionaryValue<UintFields> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUintFields(src)).endCell());
        },
        parse: (src) => {
            return loadUintFields(src.loadRef().beginParse());
        }
    }
}

export type LongStruct15 = {
    $$type: 'LongStruct15';
    x1: bigint;
    x2: bigint;
    x3: bigint;
    x4: bigint;
    x5: bigint;
    x6: bigint;
    x7: bigint;
    x8: bigint;
    x9: bigint;
    x10: bigint;
    x11: bigint;
    x12: bigint;
    x13: bigint;
    x14: bigint;
    x15: bigint;
}

export function storeLongStruct15(src: LongStruct15) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.x1, 257);
        b_0.storeInt(src.x2, 257);
        b_0.storeInt(src.x3, 257);
        const b_1 = new Builder();
        b_1.storeInt(src.x4, 257);
        b_1.storeInt(src.x5, 257);
        b_1.storeInt(src.x6, 257);
        const b_2 = new Builder();
        b_2.storeInt(src.x7, 257);
        b_2.storeInt(src.x8, 257);
        b_2.storeInt(src.x9, 257);
        const b_3 = new Builder();
        b_3.storeInt(src.x10, 257);
        b_3.storeInt(src.x11, 257);
        b_3.storeInt(src.x12, 257);
        const b_4 = new Builder();
        b_4.storeInt(src.x13, 257);
        b_4.storeInt(src.x14, 257);
        b_4.storeInt(src.x15, 257);
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLongStruct15(slice: Slice) {
    const sc_0 = slice;
    const _x1 = sc_0.loadIntBig(257);
    const _x2 = sc_0.loadIntBig(257);
    const _x3 = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _x4 = sc_1.loadIntBig(257);
    const _x5 = sc_1.loadIntBig(257);
    const _x6 = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _x7 = sc_2.loadIntBig(257);
    const _x8 = sc_2.loadIntBig(257);
    const _x9 = sc_2.loadIntBig(257);
    const sc_3 = sc_2.loadRef().beginParse();
    const _x10 = sc_3.loadIntBig(257);
    const _x11 = sc_3.loadIntBig(257);
    const _x12 = sc_3.loadIntBig(257);
    const sc_4 = sc_3.loadRef().beginParse();
    const _x13 = sc_4.loadIntBig(257);
    const _x14 = sc_4.loadIntBig(257);
    const _x15 = sc_4.loadIntBig(257);
    return { $$type: 'LongStruct15' as const, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15 };
}

function loadTupleLongStruct15(source: TupleReader) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    const _x15 = source.readBigNumber();
    return { $$type: 'LongStruct15' as const, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15 };
}

function loadGetterTupleLongStruct15(source: TupleReader) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    const _x15 = source.readBigNumber();
    return { $$type: 'LongStruct15' as const, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15 };
}

function storeTupleLongStruct15(source: LongStruct15) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.x1);
    builder.writeNumber(source.x2);
    builder.writeNumber(source.x3);
    builder.writeNumber(source.x4);
    builder.writeNumber(source.x5);
    builder.writeNumber(source.x6);
    builder.writeNumber(source.x7);
    builder.writeNumber(source.x8);
    builder.writeNumber(source.x9);
    builder.writeNumber(source.x10);
    builder.writeNumber(source.x11);
    builder.writeNumber(source.x12);
    builder.writeNumber(source.x13);
    builder.writeNumber(source.x14);
    builder.writeNumber(source.x15);
    return builder.build();
}

function dictValueParserLongStruct15(): DictionaryValue<LongStruct15> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLongStruct15(src)).endCell());
        },
        parse: (src) => {
            return loadLongStruct15(src.loadRef().beginParse());
        }
    }
}

export type LongStruct16 = {
    $$type: 'LongStruct16';
    x1: bigint;
    x2: bigint;
    x3: bigint;
    x4: bigint;
    x5: bigint;
    x6: bigint;
    x7: bigint;
    x8: bigint;
    x9: bigint;
    x10: bigint;
    x11: bigint;
    x12: bigint;
    x13: bigint;
    x14: bigint;
    x15: bigint;
    x16: bigint;
}

export function storeLongStruct16(src: LongStruct16) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.x1, 257);
        b_0.storeInt(src.x2, 257);
        b_0.storeInt(src.x3, 257);
        const b_1 = new Builder();
        b_1.storeInt(src.x4, 257);
        b_1.storeInt(src.x5, 257);
        b_1.storeInt(src.x6, 257);
        const b_2 = new Builder();
        b_2.storeInt(src.x7, 257);
        b_2.storeInt(src.x8, 257);
        b_2.storeInt(src.x9, 257);
        const b_3 = new Builder();
        b_3.storeInt(src.x10, 257);
        b_3.storeInt(src.x11, 257);
        b_3.storeInt(src.x12, 257);
        const b_4 = new Builder();
        b_4.storeInt(src.x13, 257);
        b_4.storeInt(src.x14, 257);
        b_4.storeInt(src.x15, 257);
        const b_5 = new Builder();
        b_5.storeInt(src.x16, 257);
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLongStruct16(slice: Slice) {
    const sc_0 = slice;
    const _x1 = sc_0.loadIntBig(257);
    const _x2 = sc_0.loadIntBig(257);
    const _x3 = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _x4 = sc_1.loadIntBig(257);
    const _x5 = sc_1.loadIntBig(257);
    const _x6 = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _x7 = sc_2.loadIntBig(257);
    const _x8 = sc_2.loadIntBig(257);
    const _x9 = sc_2.loadIntBig(257);
    const sc_3 = sc_2.loadRef().beginParse();
    const _x10 = sc_3.loadIntBig(257);
    const _x11 = sc_3.loadIntBig(257);
    const _x12 = sc_3.loadIntBig(257);
    const sc_4 = sc_3.loadRef().beginParse();
    const _x13 = sc_4.loadIntBig(257);
    const _x14 = sc_4.loadIntBig(257);
    const _x15 = sc_4.loadIntBig(257);
    const sc_5 = sc_4.loadRef().beginParse();
    const _x16 = sc_5.loadIntBig(257);
    return { $$type: 'LongStruct16' as const, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16 };
}

function loadTupleLongStruct16(source: TupleReader) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    source = source.readTuple();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    return { $$type: 'LongStruct16' as const, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16 };
}

function loadGetterTupleLongStruct16(source: TupleReader) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    return { $$type: 'LongStruct16' as const, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16 };
}

function storeTupleLongStruct16(source: LongStruct16) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.x1);
    builder.writeNumber(source.x2);
    builder.writeNumber(source.x3);
    builder.writeNumber(source.x4);
    builder.writeNumber(source.x5);
    builder.writeNumber(source.x6);
    builder.writeNumber(source.x7);
    builder.writeNumber(source.x8);
    builder.writeNumber(source.x9);
    builder.writeNumber(source.x10);
    builder.writeNumber(source.x11);
    builder.writeNumber(source.x12);
    builder.writeNumber(source.x13);
    builder.writeNumber(source.x14);
    builder.writeNumber(source.x15);
    builder.writeNumber(source.x16);
    return builder.build();
}

function dictValueParserLongStruct16(): DictionaryValue<LongStruct16> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLongStruct16(src)).endCell());
        },
        parse: (src) => {
            return loadLongStruct16(src.loadRef().beginParse());
        }
    }
}

export type LongStruct32 = {
    $$type: 'LongStruct32';
    x1: bigint;
    x2: bigint;
    x3: bigint;
    x4: bigint;
    x5: bigint;
    x6: bigint;
    x7: bigint;
    x8: bigint;
    x9: bigint;
    x10: bigint;
    x11: bigint;
    x12: bigint;
    x13: bigint;
    x14: bigint;
    x15: bigint;
    x16: bigint;
    x17: bigint;
    x18: bigint;
    x19: bigint;
    x20: bigint;
    x21: bigint;
    x22: bigint;
    x23: bigint;
    x24: bigint;
    x25: bigint;
    x26: bigint;
    x27: bigint;
    x28: bigint;
    x29: bigint;
    x30: bigint;
    x31: bigint;
    x32: bigint;
}

export function storeLongStruct32(src: LongStruct32) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.x1, 257);
        b_0.storeInt(src.x2, 257);
        b_0.storeInt(src.x3, 257);
        const b_1 = new Builder();
        b_1.storeInt(src.x4, 257);
        b_1.storeInt(src.x5, 257);
        b_1.storeInt(src.x6, 257);
        const b_2 = new Builder();
        b_2.storeInt(src.x7, 257);
        b_2.storeInt(src.x8, 257);
        b_2.storeInt(src.x9, 257);
        const b_3 = new Builder();
        b_3.storeInt(src.x10, 257);
        b_3.storeInt(src.x11, 257);
        b_3.storeInt(src.x12, 257);
        const b_4 = new Builder();
        b_4.storeInt(src.x13, 257);
        b_4.storeInt(src.x14, 257);
        b_4.storeInt(src.x15, 257);
        const b_5 = new Builder();
        b_5.storeInt(src.x16, 257);
        b_5.storeInt(src.x17, 257);
        b_5.storeInt(src.x18, 257);
        const b_6 = new Builder();
        b_6.storeInt(src.x19, 257);
        b_6.storeInt(src.x20, 257);
        b_6.storeInt(src.x21, 257);
        const b_7 = new Builder();
        b_7.storeInt(src.x22, 257);
        b_7.storeInt(src.x23, 257);
        b_7.storeInt(src.x24, 257);
        const b_8 = new Builder();
        b_8.storeInt(src.x25, 257);
        b_8.storeInt(src.x26, 257);
        b_8.storeInt(src.x27, 257);
        const b_9 = new Builder();
        b_9.storeInt(src.x28, 257);
        b_9.storeInt(src.x29, 257);
        b_9.storeInt(src.x30, 257);
        const b_10 = new Builder();
        b_10.storeInt(src.x31, 257);
        b_10.storeInt(src.x32, 257);
        b_9.storeRef(b_10.endCell());
        b_8.storeRef(b_9.endCell());
        b_7.storeRef(b_8.endCell());
        b_6.storeRef(b_7.endCell());
        b_5.storeRef(b_6.endCell());
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLongStruct32(slice: Slice) {
    const sc_0 = slice;
    const _x1 = sc_0.loadIntBig(257);
    const _x2 = sc_0.loadIntBig(257);
    const _x3 = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _x4 = sc_1.loadIntBig(257);
    const _x5 = sc_1.loadIntBig(257);
    const _x6 = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _x7 = sc_2.loadIntBig(257);
    const _x8 = sc_2.loadIntBig(257);
    const _x9 = sc_2.loadIntBig(257);
    const sc_3 = sc_2.loadRef().beginParse();
    const _x10 = sc_3.loadIntBig(257);
    const _x11 = sc_3.loadIntBig(257);
    const _x12 = sc_3.loadIntBig(257);
    const sc_4 = sc_3.loadRef().beginParse();
    const _x13 = sc_4.loadIntBig(257);
    const _x14 = sc_4.loadIntBig(257);
    const _x15 = sc_4.loadIntBig(257);
    const sc_5 = sc_4.loadRef().beginParse();
    const _x16 = sc_5.loadIntBig(257);
    const _x17 = sc_5.loadIntBig(257);
    const _x18 = sc_5.loadIntBig(257);
    const sc_6 = sc_5.loadRef().beginParse();
    const _x19 = sc_6.loadIntBig(257);
    const _x20 = sc_6.loadIntBig(257);
    const _x21 = sc_6.loadIntBig(257);
    const sc_7 = sc_6.loadRef().beginParse();
    const _x22 = sc_7.loadIntBig(257);
    const _x23 = sc_7.loadIntBig(257);
    const _x24 = sc_7.loadIntBig(257);
    const sc_8 = sc_7.loadRef().beginParse();
    const _x25 = sc_8.loadIntBig(257);
    const _x26 = sc_8.loadIntBig(257);
    const _x27 = sc_8.loadIntBig(257);
    const sc_9 = sc_8.loadRef().beginParse();
    const _x28 = sc_9.loadIntBig(257);
    const _x29 = sc_9.loadIntBig(257);
    const _x30 = sc_9.loadIntBig(257);
    const sc_10 = sc_9.loadRef().beginParse();
    const _x31 = sc_10.loadIntBig(257);
    const _x32 = sc_10.loadIntBig(257);
    return { $$type: 'LongStruct32' as const, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20, x21: _x21, x22: _x22, x23: _x23, x24: _x24, x25: _x25, x26: _x26, x27: _x27, x28: _x28, x29: _x29, x30: _x30, x31: _x31, x32: _x32 };
}

function loadTupleLongStruct32(source: TupleReader) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    source = source.readTuple();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    const _x17 = source.readBigNumber();
    const _x18 = source.readBigNumber();
    const _x19 = source.readBigNumber();
    const _x20 = source.readBigNumber();
    const _x21 = source.readBigNumber();
    const _x22 = source.readBigNumber();
    const _x23 = source.readBigNumber();
    const _x24 = source.readBigNumber();
    const _x25 = source.readBigNumber();
    const _x26 = source.readBigNumber();
    const _x27 = source.readBigNumber();
    const _x28 = source.readBigNumber();
    source = source.readTuple();
    const _x29 = source.readBigNumber();
    const _x30 = source.readBigNumber();
    const _x31 = source.readBigNumber();
    const _x32 = source.readBigNumber();
    return { $$type: 'LongStruct32' as const, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20, x21: _x21, x22: _x22, x23: _x23, x24: _x24, x25: _x25, x26: _x26, x27: _x27, x28: _x28, x29: _x29, x30: _x30, x31: _x31, x32: _x32 };
}

function loadGetterTupleLongStruct32(source: TupleReader) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    const _x17 = source.readBigNumber();
    const _x18 = source.readBigNumber();
    const _x19 = source.readBigNumber();
    const _x20 = source.readBigNumber();
    const _x21 = source.readBigNumber();
    const _x22 = source.readBigNumber();
    const _x23 = source.readBigNumber();
    const _x24 = source.readBigNumber();
    const _x25 = source.readBigNumber();
    const _x26 = source.readBigNumber();
    const _x27 = source.readBigNumber();
    const _x28 = source.readBigNumber();
    const _x29 = source.readBigNumber();
    const _x30 = source.readBigNumber();
    const _x31 = source.readBigNumber();
    const _x32 = source.readBigNumber();
    return { $$type: 'LongStruct32' as const, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20, x21: _x21, x22: _x22, x23: _x23, x24: _x24, x25: _x25, x26: _x26, x27: _x27, x28: _x28, x29: _x29, x30: _x30, x31: _x31, x32: _x32 };
}

function storeTupleLongStruct32(source: LongStruct32) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.x1);
    builder.writeNumber(source.x2);
    builder.writeNumber(source.x3);
    builder.writeNumber(source.x4);
    builder.writeNumber(source.x5);
    builder.writeNumber(source.x6);
    builder.writeNumber(source.x7);
    builder.writeNumber(source.x8);
    builder.writeNumber(source.x9);
    builder.writeNumber(source.x10);
    builder.writeNumber(source.x11);
    builder.writeNumber(source.x12);
    builder.writeNumber(source.x13);
    builder.writeNumber(source.x14);
    builder.writeNumber(source.x15);
    builder.writeNumber(source.x16);
    builder.writeNumber(source.x17);
    builder.writeNumber(source.x18);
    builder.writeNumber(source.x19);
    builder.writeNumber(source.x20);
    builder.writeNumber(source.x21);
    builder.writeNumber(source.x22);
    builder.writeNumber(source.x23);
    builder.writeNumber(source.x24);
    builder.writeNumber(source.x25);
    builder.writeNumber(source.x26);
    builder.writeNumber(source.x27);
    builder.writeNumber(source.x28);
    builder.writeNumber(source.x29);
    builder.writeNumber(source.x30);
    builder.writeNumber(source.x31);
    builder.writeNumber(source.x32);
    return builder.build();
}

function dictValueParserLongStruct32(): DictionaryValue<LongStruct32> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLongStruct32(src)).endCell());
        },
        parse: (src) => {
            return loadLongStruct32(src.loadRef().beginParse());
        }
    }
}

export type LongNestedStruct = {
    $$type: 'LongNestedStruct';
    x1: bigint;
    x2: bigint;
    x3: bigint;
    x4: bigint;
    x5: bigint;
    x6: bigint;
    x7: bigint;
    x8: bigint;
    x9: bigint;
    x10: bigint;
    x11: bigint;
    x12: bigint;
    x13: bigint;
    x14: bigint;
    x15: bigint;
    x16: bigint;
    x17: bigint;
    x18: bigint;
    x19: bigint;
    x20: bigint;
    s1: LongStruct15;
    s2: LongStruct16;
    s3: LongStruct32;
}

export function storeLongNestedStruct(src: LongNestedStruct) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.x1, 257);
        b_0.storeInt(src.x2, 257);
        b_0.storeInt(src.x3, 257);
        const b_1 = new Builder();
        b_1.storeInt(src.x4, 257);
        b_1.storeInt(src.x5, 257);
        b_1.storeInt(src.x6, 257);
        const b_2 = new Builder();
        b_2.storeInt(src.x7, 257);
        b_2.storeInt(src.x8, 257);
        b_2.storeInt(src.x9, 257);
        const b_3 = new Builder();
        b_3.storeInt(src.x10, 257);
        b_3.storeInt(src.x11, 257);
        b_3.storeInt(src.x12, 257);
        const b_4 = new Builder();
        b_4.storeInt(src.x13, 257);
        b_4.storeInt(src.x14, 257);
        b_4.storeInt(src.x15, 257);
        const b_5 = new Builder();
        b_5.storeInt(src.x16, 257);
        b_5.storeInt(src.x17, 257);
        b_5.storeInt(src.x18, 257);
        const b_6 = new Builder();
        b_6.storeInt(src.x19, 257);
        b_6.storeInt(src.x20, 257);
        const b_7 = new Builder();
        b_7.store(storeLongStruct15(src.s1));
        const b_8 = new Builder();
        b_8.store(storeLongStruct16(src.s2));
        const b_9 = new Builder();
        b_9.store(storeLongStruct32(src.s3));
        b_8.storeRef(b_9.endCell());
        b_7.storeRef(b_8.endCell());
        b_6.storeRef(b_7.endCell());
        b_5.storeRef(b_6.endCell());
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLongNestedStruct(slice: Slice) {
    const sc_0 = slice;
    const _x1 = sc_0.loadIntBig(257);
    const _x2 = sc_0.loadIntBig(257);
    const _x3 = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _x4 = sc_1.loadIntBig(257);
    const _x5 = sc_1.loadIntBig(257);
    const _x6 = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _x7 = sc_2.loadIntBig(257);
    const _x8 = sc_2.loadIntBig(257);
    const _x9 = sc_2.loadIntBig(257);
    const sc_3 = sc_2.loadRef().beginParse();
    const _x10 = sc_3.loadIntBig(257);
    const _x11 = sc_3.loadIntBig(257);
    const _x12 = sc_3.loadIntBig(257);
    const sc_4 = sc_3.loadRef().beginParse();
    const _x13 = sc_4.loadIntBig(257);
    const _x14 = sc_4.loadIntBig(257);
    const _x15 = sc_4.loadIntBig(257);
    const sc_5 = sc_4.loadRef().beginParse();
    const _x16 = sc_5.loadIntBig(257);
    const _x17 = sc_5.loadIntBig(257);
    const _x18 = sc_5.loadIntBig(257);
    const sc_6 = sc_5.loadRef().beginParse();
    const _x19 = sc_6.loadIntBig(257);
    const _x20 = sc_6.loadIntBig(257);
    const sc_7 = sc_6.loadRef().beginParse();
    const _s1 = loadLongStruct15(sc_7);
    const sc_8 = sc_7.loadRef().beginParse();
    const _s2 = loadLongStruct16(sc_8);
    const sc_9 = sc_8.loadRef().beginParse();
    const _s3 = loadLongStruct32(sc_9);
    return { $$type: 'LongNestedStruct' as const, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20, s1: _s1, s2: _s2, s3: _s3 };
}

function loadTupleLongNestedStruct(source: TupleReader) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    source = source.readTuple();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    const _x17 = source.readBigNumber();
    const _x18 = source.readBigNumber();
    const _x19 = source.readBigNumber();
    const _x20 = source.readBigNumber();
    const _s1 = loadTupleLongStruct15(source);
    const _s2 = loadTupleLongStruct16(source);
    const _s3 = loadTupleLongStruct32(source);
    return { $$type: 'LongNestedStruct' as const, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20, s1: _s1, s2: _s2, s3: _s3 };
}

function loadGetterTupleLongNestedStruct(source: TupleReader) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    const _x17 = source.readBigNumber();
    const _x18 = source.readBigNumber();
    const _x19 = source.readBigNumber();
    const _x20 = source.readBigNumber();
    const _s1 = loadGetterTupleLongStruct15(source);
    const _s2 = loadGetterTupleLongStruct16(source);
    const _s3 = loadGetterTupleLongStruct32(source);
    return { $$type: 'LongNestedStruct' as const, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20, s1: _s1, s2: _s2, s3: _s3 };
}

function storeTupleLongNestedStruct(source: LongNestedStruct) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.x1);
    builder.writeNumber(source.x2);
    builder.writeNumber(source.x3);
    builder.writeNumber(source.x4);
    builder.writeNumber(source.x5);
    builder.writeNumber(source.x6);
    builder.writeNumber(source.x7);
    builder.writeNumber(source.x8);
    builder.writeNumber(source.x9);
    builder.writeNumber(source.x10);
    builder.writeNumber(source.x11);
    builder.writeNumber(source.x12);
    builder.writeNumber(source.x13);
    builder.writeNumber(source.x14);
    builder.writeNumber(source.x15);
    builder.writeNumber(source.x16);
    builder.writeNumber(source.x17);
    builder.writeNumber(source.x18);
    builder.writeNumber(source.x19);
    builder.writeNumber(source.x20);
    builder.writeTuple(storeTupleLongStruct15(source.s1));
    builder.writeTuple(storeTupleLongStruct16(source.s2));
    builder.writeTuple(storeTupleLongStruct32(source.s3));
    return builder.build();
}

function dictValueParserLongNestedStruct(): DictionaryValue<LongNestedStruct> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLongNestedStruct(src)).endCell());
        },
        parse: (src) => {
            return loadLongNestedStruct(src.loadRef().beginParse());
        }
    }
}

export type LongNestedStructWithOpts = {
    $$type: 'LongNestedStructWithOpts';
    x1: bigint;
    x2: bigint;
    x3: bigint;
    x4: bigint;
    x5: bigint;
    x6: bigint;
    x7: bigint;
    x8: bigint;
    x9: bigint;
    x10: bigint;
    x11: bigint;
    x12: bigint;
    x13: bigint;
    x14: bigint;
    x15: bigint;
    x16: bigint;
    x17: bigint;
    x18: bigint | null;
    x19: bigint;
    x20: bigint;
    s1: LongStruct15 | null;
    s2: LongStruct16;
    s3: LongStruct32 | null;
}

export function storeLongNestedStructWithOpts(src: LongNestedStructWithOpts) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.x1, 257);
        b_0.storeInt(src.x2, 257);
        b_0.storeInt(src.x3, 257);
        const b_1 = new Builder();
        b_1.storeInt(src.x4, 257);
        b_1.storeInt(src.x5, 257);
        b_1.storeInt(src.x6, 257);
        const b_2 = new Builder();
        b_2.storeInt(src.x7, 257);
        b_2.storeInt(src.x8, 257);
        b_2.storeInt(src.x9, 257);
        const b_3 = new Builder();
        b_3.storeInt(src.x10, 257);
        b_3.storeInt(src.x11, 257);
        b_3.storeInt(src.x12, 257);
        const b_4 = new Builder();
        b_4.storeInt(src.x13, 257);
        b_4.storeInt(src.x14, 257);
        b_4.storeInt(src.x15, 257);
        const b_5 = new Builder();
        b_5.storeInt(src.x16, 257);
        b_5.storeInt(src.x17, 257);
        if (src.x18 !== null && src.x18 !== undefined) { b_5.storeBit(true).storeInt(src.x18, 257); } else { b_5.storeBit(false); }
        const b_6 = new Builder();
        b_6.storeInt(src.x19, 257);
        b_6.storeInt(src.x20, 257);
        const b_7 = new Builder();
        if (src.s1 !== null && src.s1 !== undefined) { b_7.storeBit(true); b_7.store(storeLongStruct15(src.s1)); } else { b_7.storeBit(false); }
        const b_8 = new Builder();
        b_8.store(storeLongStruct16(src.s2));
        const b_9 = new Builder();
        if (src.s3 !== null && src.s3 !== undefined) { b_9.storeBit(true); b_9.store(storeLongStruct32(src.s3)); } else { b_9.storeBit(false); }
        b_8.storeRef(b_9.endCell());
        b_7.storeRef(b_8.endCell());
        b_6.storeRef(b_7.endCell());
        b_5.storeRef(b_6.endCell());
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLongNestedStructWithOpts(slice: Slice) {
    const sc_0 = slice;
    const _x1 = sc_0.loadIntBig(257);
    const _x2 = sc_0.loadIntBig(257);
    const _x3 = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _x4 = sc_1.loadIntBig(257);
    const _x5 = sc_1.loadIntBig(257);
    const _x6 = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _x7 = sc_2.loadIntBig(257);
    const _x8 = sc_2.loadIntBig(257);
    const _x9 = sc_2.loadIntBig(257);
    const sc_3 = sc_2.loadRef().beginParse();
    const _x10 = sc_3.loadIntBig(257);
    const _x11 = sc_3.loadIntBig(257);
    const _x12 = sc_3.loadIntBig(257);
    const sc_4 = sc_3.loadRef().beginParse();
    const _x13 = sc_4.loadIntBig(257);
    const _x14 = sc_4.loadIntBig(257);
    const _x15 = sc_4.loadIntBig(257);
    const sc_5 = sc_4.loadRef().beginParse();
    const _x16 = sc_5.loadIntBig(257);
    const _x17 = sc_5.loadIntBig(257);
    const _x18 = sc_5.loadBit() ? sc_5.loadIntBig(257) : null;
    const sc_6 = sc_5.loadRef().beginParse();
    const _x19 = sc_6.loadIntBig(257);
    const _x20 = sc_6.loadIntBig(257);
    const sc_7 = sc_6.loadRef().beginParse();
    const _s1 = sc_7.loadBit() ? loadLongStruct15(sc_7) : null;
    const sc_8 = sc_7.loadRef().beginParse();
    const _s2 = loadLongStruct16(sc_8);
    const sc_9 = sc_8.loadRef().beginParse();
    const _s3 = sc_9.loadBit() ? loadLongStruct32(sc_9) : null;
    return { $$type: 'LongNestedStructWithOpts' as const, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20, s1: _s1, s2: _s2, s3: _s3 };
}

function loadTupleLongNestedStructWithOpts(source: TupleReader) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    source = source.readTuple();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    const _x17 = source.readBigNumber();
    const _x18 = source.readBigNumberOpt();
    const _x19 = source.readBigNumber();
    const _x20 = source.readBigNumber();
    const _s1_p = source.readTupleOpt();
    const _s1 = _s1_p ? loadTupleLongStruct15(_s1_p) : null;
    const _s2 = loadTupleLongStruct16(source);
    const _s3_p = source.readTupleOpt();
    const _s3 = _s3_p ? loadTupleLongStruct32(_s3_p) : null;
    return { $$type: 'LongNestedStructWithOpts' as const, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20, s1: _s1, s2: _s2, s3: _s3 };
}

function loadGetterTupleLongNestedStructWithOpts(source: TupleReader) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    const _x17 = source.readBigNumber();
    const _x18 = source.readBigNumberOpt();
    const _x19 = source.readBigNumber();
    const _x20 = source.readBigNumber();
    const _s1_p = source.readTupleOpt();
    const _s1 = _s1_p ? loadTupleLongStruct15(_s1_p) : null;
    const _s2 = loadGetterTupleLongStruct16(source);
    const _s3_p = source.readTupleOpt();
    const _s3 = _s3_p ? loadTupleLongStruct32(_s3_p) : null;
    return { $$type: 'LongNestedStructWithOpts' as const, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20, s1: _s1, s2: _s2, s3: _s3 };
}

function storeTupleLongNestedStructWithOpts(source: LongNestedStructWithOpts) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.x1);
    builder.writeNumber(source.x2);
    builder.writeNumber(source.x3);
    builder.writeNumber(source.x4);
    builder.writeNumber(source.x5);
    builder.writeNumber(source.x6);
    builder.writeNumber(source.x7);
    builder.writeNumber(source.x8);
    builder.writeNumber(source.x9);
    builder.writeNumber(source.x10);
    builder.writeNumber(source.x11);
    builder.writeNumber(source.x12);
    builder.writeNumber(source.x13);
    builder.writeNumber(source.x14);
    builder.writeNumber(source.x15);
    builder.writeNumber(source.x16);
    builder.writeNumber(source.x17);
    builder.writeNumber(source.x18);
    builder.writeNumber(source.x19);
    builder.writeNumber(source.x20);
    if (source.s1 !== null && source.s1 !== undefined) {
        builder.writeTuple(storeTupleLongStruct15(source.s1));
    } else {
        builder.writeTuple(null);
    }
    builder.writeTuple(storeTupleLongStruct16(source.s2));
    if (source.s3 !== null && source.s3 !== undefined) {
        builder.writeTuple(storeTupleLongStruct32(source.s3));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserLongNestedStructWithOpts(): DictionaryValue<LongNestedStructWithOpts> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLongNestedStructWithOpts(src)).endCell());
        },
        parse: (src) => {
            return loadLongNestedStructWithOpts(src.loadRef().beginParse());
        }
    }
}

export type Point = {
    $$type: 'Point';
    x: bigint;
    y: bigint;
}

export function storePoint(src: Point) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.x, 64);
        b_0.storeInt(src.y, 64);
    };
}

export function loadPoint(slice: Slice) {
    const sc_0 = slice;
    const _x = sc_0.loadIntBig(64);
    const _y = sc_0.loadIntBig(64);
    return { $$type: 'Point' as const, x: _x, y: _y };
}

function loadTuplePoint(source: TupleReader) {
    const _x = source.readBigNumber();
    const _y = source.readBigNumber();
    return { $$type: 'Point' as const, x: _x, y: _y };
}

function loadGetterTuplePoint(source: TupleReader) {
    const _x = source.readBigNumber();
    const _y = source.readBigNumber();
    return { $$type: 'Point' as const, x: _x, y: _y };
}

function storeTuplePoint(source: Point) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.x);
    builder.writeNumber(source.y);
    return builder.build();
}

function dictValueParserPoint(): DictionaryValue<Point> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePoint(src)).endCell());
        },
        parse: (src) => {
            return loadPoint(src.loadRef().beginParse());
        }
    }
}

export type Line = {
    $$type: 'Line';
    start: Point;
    end: Point;
}

export function storeLine(src: Line) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.store(storePoint(src.start));
        b_0.store(storePoint(src.end));
    };
}

export function loadLine(slice: Slice) {
    const sc_0 = slice;
    const _start = loadPoint(sc_0);
    const _end = loadPoint(sc_0);
    return { $$type: 'Line' as const, start: _start, end: _end };
}

function loadTupleLine(source: TupleReader) {
    const _start = loadTuplePoint(source);
    const _end = loadTuplePoint(source);
    return { $$type: 'Line' as const, start: _start, end: _end };
}

function loadGetterTupleLine(source: TupleReader) {
    const _start = loadGetterTuplePoint(source);
    const _end = loadGetterTuplePoint(source);
    return { $$type: 'Line' as const, start: _start, end: _end };
}

function storeTupleLine(source: Line) {
    const builder = new TupleBuilder();
    builder.writeTuple(storeTuplePoint(source.start));
    builder.writeTuple(storeTuplePoint(source.end));
    return builder.build();
}

function dictValueParserLine(): DictionaryValue<Line> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLine(src)).endCell());
        },
        parse: (src) => {
            return loadLine(src.loadRef().beginParse());
        }
    }
}

export type Location = {
    $$type: 'Location';
    idx: bigint;
    line1: Line;
    line2: Line | null;
}

export function storeLocation(src: Location) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.idx, 257);
        b_0.store(storeLine(src.line1));
        if (src.line2 !== null && src.line2 !== undefined) { b_0.storeBit(true); b_0.store(storeLine(src.line2)); } else { b_0.storeBit(false); }
    };
}

export function loadLocation(slice: Slice) {
    const sc_0 = slice;
    const _idx = sc_0.loadIntBig(257);
    const _line1 = loadLine(sc_0);
    const _line2 = sc_0.loadBit() ? loadLine(sc_0) : null;
    return { $$type: 'Location' as const, idx: _idx, line1: _line1, line2: _line2 };
}

function loadTupleLocation(source: TupleReader) {
    const _idx = source.readBigNumber();
    const _line1 = loadTupleLine(source);
    const _line2_p = source.readTupleOpt();
    const _line2 = _line2_p ? loadTupleLine(_line2_p) : null;
    return { $$type: 'Location' as const, idx: _idx, line1: _line1, line2: _line2 };
}

function loadGetterTupleLocation(source: TupleReader) {
    const _idx = source.readBigNumber();
    const _line1 = loadGetterTupleLine(source);
    const _line2_p = source.readTupleOpt();
    const _line2 = _line2_p ? loadTupleLine(_line2_p) : null;
    return { $$type: 'Location' as const, idx: _idx, line1: _line1, line2: _line2 };
}

function storeTupleLocation(source: Location) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.idx);
    builder.writeTuple(storeTupleLine(source.line1));
    if (source.line2 !== null && source.line2 !== undefined) {
        builder.writeTuple(storeTupleLine(source.line2));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserLocation(): DictionaryValue<Location> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLocation(src)).endCell());
        },
        parse: (src) => {
            return loadLocation(src.loadRef().beginParse());
        }
    }
}

export type DoubleNestedStructOpt = {
    $$type: 'DoubleNestedStructOpt';
    a: bigint;
    s: MyStruct1 | null;
}

export function storeDoubleNestedStructOpt(src: DoubleNestedStructOpt) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
        if (src.s !== null && src.s !== undefined) { b_0.storeBit(true); b_0.store(storeMyStruct1(src.s)); } else { b_0.storeBit(false); }
    };
}

export function loadDoubleNestedStructOpt(slice: Slice) {
    const sc_0 = slice;
    const _a = sc_0.loadIntBig(257);
    const _s = sc_0.loadBit() ? loadMyStruct1(sc_0) : null;
    return { $$type: 'DoubleNestedStructOpt' as const, a: _a, s: _s };
}

function loadTupleDoubleNestedStructOpt(source: TupleReader) {
    const _a = source.readBigNumber();
    const _s_p = source.readTupleOpt();
    const _s = _s_p ? loadTupleMyStruct1(_s_p) : null;
    return { $$type: 'DoubleNestedStructOpt' as const, a: _a, s: _s };
}

function loadGetterTupleDoubleNestedStructOpt(source: TupleReader) {
    const _a = source.readBigNumber();
    const _s_p = source.readTupleOpt();
    const _s = _s_p ? loadTupleMyStruct1(_s_p) : null;
    return { $$type: 'DoubleNestedStructOpt' as const, a: _a, s: _s };
}

function storeTupleDoubleNestedStructOpt(source: DoubleNestedStructOpt) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.a);
    if (source.s !== null && source.s !== undefined) {
        builder.writeTuple(storeTupleMyStruct1(source.s));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserDoubleNestedStructOpt(): DictionaryValue<DoubleNestedStructOpt> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDoubleNestedStructOpt(src)).endCell());
        },
        parse: (src) => {
            return loadDoubleNestedStructOpt(src.loadRef().beginParse());
        }
    }
}

export type TripleNestedStructOpt = {
    $$type: 'TripleNestedStructOpt';
    a: bigint;
    s: DoubleNestedStructOpt | null;
}

export function storeTripleNestedStructOpt(src: TripleNestedStructOpt) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
        const b_1 = new Builder();
        if (src.s !== null && src.s !== undefined) { b_1.storeBit(true); b_1.store(storeDoubleNestedStructOpt(src.s)); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadTripleNestedStructOpt(slice: Slice) {
    const sc_0 = slice;
    const _a = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _s = sc_1.loadBit() ? loadDoubleNestedStructOpt(sc_1) : null;
    return { $$type: 'TripleNestedStructOpt' as const, a: _a, s: _s };
}

function loadTupleTripleNestedStructOpt(source: TupleReader) {
    const _a = source.readBigNumber();
    const _s_p = source.readTupleOpt();
    const _s = _s_p ? loadTupleDoubleNestedStructOpt(_s_p) : null;
    return { $$type: 'TripleNestedStructOpt' as const, a: _a, s: _s };
}

function loadGetterTupleTripleNestedStructOpt(source: TupleReader) {
    const _a = source.readBigNumber();
    const _s_p = source.readTupleOpt();
    const _s = _s_p ? loadTupleDoubleNestedStructOpt(_s_p) : null;
    return { $$type: 'TripleNestedStructOpt' as const, a: _a, s: _s };
}

function storeTupleTripleNestedStructOpt(source: TripleNestedStructOpt) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.a);
    if (source.s !== null && source.s !== undefined) {
        builder.writeTuple(storeTupleDoubleNestedStructOpt(source.s));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserTripleNestedStructOpt(): DictionaryValue<TripleNestedStructOpt> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTripleNestedStructOpt(src)).endCell());
        },
        parse: (src) => {
            return loadTripleNestedStructOpt(src.loadRef().beginParse());
        }
    }
}

export type LongAndDeepNestedStruct = {
    $$type: 'LongAndDeepNestedStruct';
    x1: bigint;
    x2: bigint;
    x3: bigint;
    x4: bigint;
    x5: bigint;
    x6: bigint;
    x7: bigint;
    x8: bigint;
    x9: bigint;
    x10: bigint;
    x11: bigint;
    x12: bigint;
    x13: bigint;
    x14: bigint;
    x15: bigint;
    x16: bigint;
    s1: TripleNestedStructOpt;
    s2: TripleNestedStructOpt;
    s3: TripleNestedStructOpt | null;
    s4: TripleNestedStructOpt | null;
}

export function storeLongAndDeepNestedStruct(src: LongAndDeepNestedStruct) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.x1, 257);
        b_0.storeInt(src.x2, 257);
        b_0.storeInt(src.x3, 257);
        const b_1 = new Builder();
        b_1.storeInt(src.x4, 257);
        b_1.storeInt(src.x5, 257);
        b_1.storeInt(src.x6, 257);
        const b_2 = new Builder();
        b_2.storeInt(src.x7, 257);
        b_2.storeInt(src.x8, 257);
        b_2.storeInt(src.x9, 257);
        const b_3 = new Builder();
        b_3.storeInt(src.x10, 257);
        b_3.storeInt(src.x11, 257);
        b_3.storeInt(src.x12, 257);
        const b_4 = new Builder();
        b_4.storeInt(src.x13, 257);
        b_4.storeInt(src.x14, 257);
        b_4.storeInt(src.x15, 257);
        const b_5 = new Builder();
        b_5.storeInt(src.x16, 257);
        b_5.store(storeTripleNestedStructOpt(src.s1));
        b_5.store(storeTripleNestedStructOpt(src.s2));
        const b_6 = new Builder();
        if (src.s3 !== null && src.s3 !== undefined) { b_6.storeBit(true); b_6.store(storeTripleNestedStructOpt(src.s3)); } else { b_6.storeBit(false); }
        if (src.s4 !== null && src.s4 !== undefined) { b_6.storeBit(true); b_6.store(storeTripleNestedStructOpt(src.s4)); } else { b_6.storeBit(false); }
        b_5.storeRef(b_6.endCell());
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLongAndDeepNestedStruct(slice: Slice) {
    const sc_0 = slice;
    const _x1 = sc_0.loadIntBig(257);
    const _x2 = sc_0.loadIntBig(257);
    const _x3 = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _x4 = sc_1.loadIntBig(257);
    const _x5 = sc_1.loadIntBig(257);
    const _x6 = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _x7 = sc_2.loadIntBig(257);
    const _x8 = sc_2.loadIntBig(257);
    const _x9 = sc_2.loadIntBig(257);
    const sc_3 = sc_2.loadRef().beginParse();
    const _x10 = sc_3.loadIntBig(257);
    const _x11 = sc_3.loadIntBig(257);
    const _x12 = sc_3.loadIntBig(257);
    const sc_4 = sc_3.loadRef().beginParse();
    const _x13 = sc_4.loadIntBig(257);
    const _x14 = sc_4.loadIntBig(257);
    const _x15 = sc_4.loadIntBig(257);
    const sc_5 = sc_4.loadRef().beginParse();
    const _x16 = sc_5.loadIntBig(257);
    const _s1 = loadTripleNestedStructOpt(sc_5);
    const _s2 = loadTripleNestedStructOpt(sc_5);
    const sc_6 = sc_5.loadRef().beginParse();
    const _s3 = sc_6.loadBit() ? loadTripleNestedStructOpt(sc_6) : null;
    const _s4 = sc_6.loadBit() ? loadTripleNestedStructOpt(sc_6) : null;
    return { $$type: 'LongAndDeepNestedStruct' as const, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, s1: _s1, s2: _s2, s3: _s3, s4: _s4 };
}

function loadTupleLongAndDeepNestedStruct(source: TupleReader) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    source = source.readTuple();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    const _s1 = loadTupleTripleNestedStructOpt(source);
    const _s2 = loadTupleTripleNestedStructOpt(source);
    const _s3_p = source.readTupleOpt();
    const _s3 = _s3_p ? loadTupleTripleNestedStructOpt(_s3_p) : null;
    const _s4_p = source.readTupleOpt();
    const _s4 = _s4_p ? loadTupleTripleNestedStructOpt(_s4_p) : null;
    return { $$type: 'LongAndDeepNestedStruct' as const, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, s1: _s1, s2: _s2, s3: _s3, s4: _s4 };
}

function loadGetterTupleLongAndDeepNestedStruct(source: TupleReader) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    const _s1 = loadGetterTupleTripleNestedStructOpt(source);
    const _s2 = loadGetterTupleTripleNestedStructOpt(source);
    const _s3_p = source.readTupleOpt();
    const _s3 = _s3_p ? loadTupleTripleNestedStructOpt(_s3_p) : null;
    const _s4_p = source.readTupleOpt();
    const _s4 = _s4_p ? loadTupleTripleNestedStructOpt(_s4_p) : null;
    return { $$type: 'LongAndDeepNestedStruct' as const, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, s1: _s1, s2: _s2, s3: _s3, s4: _s4 };
}

function storeTupleLongAndDeepNestedStruct(source: LongAndDeepNestedStruct) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.x1);
    builder.writeNumber(source.x2);
    builder.writeNumber(source.x3);
    builder.writeNumber(source.x4);
    builder.writeNumber(source.x5);
    builder.writeNumber(source.x6);
    builder.writeNumber(source.x7);
    builder.writeNumber(source.x8);
    builder.writeNumber(source.x9);
    builder.writeNumber(source.x10);
    builder.writeNumber(source.x11);
    builder.writeNumber(source.x12);
    builder.writeNumber(source.x13);
    builder.writeNumber(source.x14);
    builder.writeNumber(source.x15);
    builder.writeNumber(source.x16);
    builder.writeTuple(storeTupleTripleNestedStructOpt(source.s1));
    builder.writeTuple(storeTupleTripleNestedStructOpt(source.s2));
    if (source.s3 !== null && source.s3 !== undefined) {
        builder.writeTuple(storeTupleTripleNestedStructOpt(source.s3));
    } else {
        builder.writeTuple(null);
    }
    if (source.s4 !== null && source.s4 !== undefined) {
        builder.writeTuple(storeTupleTripleNestedStructOpt(source.s4));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserLongAndDeepNestedStruct(): DictionaryValue<LongAndDeepNestedStruct> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLongAndDeepNestedStruct(src)).endCell());
        },
        parse: (src) => {
            return loadLongAndDeepNestedStruct(src.loadRef().beginParse());
        }
    }
}

export type Foo = {
    $$type: 'Foo';
    s: Slice;
}

export function storeFoo(src: Foo) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(42, 32);
        b_0.storeBuilder(src.s.asBuilder());
    };
}

export function loadFoo(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 42) { throw Error('Invalid prefix'); }
    const _s = sc_0;
    return { $$type: 'Foo' as const, s: _s };
}

function loadTupleFoo(source: TupleReader) {
    const _s = source.readCell().asSlice();
    return { $$type: 'Foo' as const, s: _s };
}

function loadGetterTupleFoo(source: TupleReader) {
    const _s = source.readCell().asSlice();
    return { $$type: 'Foo' as const, s: _s };
}

function storeTupleFoo(source: Foo) {
    const builder = new TupleBuilder();
    builder.writeSlice(source.s.asCell());
    return builder.build();
}

function dictValueParserFoo(): DictionaryValue<Foo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFoo(src)).endCell());
        },
        parse: (src) => {
            return loadFoo(src.loadRef().beginParse());
        }
    }
}

export type Dict = {
    $$type: 'Dict';
    m: Dictionary<number, bigint>;
}

export function storeDict(src: Dict) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeDict(src.m, Dictionary.Keys.Uint(8), Dictionary.Values.BigVarUint(4));
    };
}

export function loadDict(slice: Slice) {
    const sc_0 = slice;
    const _m = Dictionary.load(Dictionary.Keys.Uint(8), Dictionary.Values.BigVarUint(4), sc_0);
    return { $$type: 'Dict' as const, m: _m };
}

function loadTupleDict(source: TupleReader) {
    const _m = Dictionary.loadDirect(Dictionary.Keys.Uint(8), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    return { $$type: 'Dict' as const, m: _m };
}

function loadGetterTupleDict(source: TupleReader) {
    const _m = Dictionary.loadDirect(Dictionary.Keys.Uint(8), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    return { $$type: 'Dict' as const, m: _m };
}

function storeTupleDict(source: Dict) {
    const builder = new TupleBuilder();
    builder.writeCell(source.m.size > 0 ? beginCell().storeDictDirect(source.m, Dictionary.Keys.Uint(8), Dictionary.Values.BigVarUint(4)).endCell() : null);
    return builder.build();
}

function dictValueParserDict(): DictionaryValue<Dict> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDict(src)).endCell());
        },
        parse: (src) => {
            return loadDict(src.loadRef().beginParse());
        }
    }
}

export type OptionalFields = {
    $$type: 'OptionalFields';
    nickname: string | null;
    avatar: string | null;
}

export function storeOptionalFields(src: OptionalFields) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.nickname !== null && src.nickname !== undefined) { b_0.storeBit(true).storeStringRefTail(src.nickname); } else { b_0.storeBit(false); }
        if (src.avatar !== null && src.avatar !== undefined) { b_0.storeBit(true).storeStringRefTail(src.avatar); } else { b_0.storeBit(false); }
    };
}

export function loadOptionalFields(slice: Slice) {
    const sc_0 = slice;
    const _nickname = sc_0.loadBit() ? sc_0.loadStringRefTail() : null;
    const _avatar = sc_0.loadBit() ? sc_0.loadStringRefTail() : null;
    return { $$type: 'OptionalFields' as const, nickname: _nickname, avatar: _avatar };
}

function loadTupleOptionalFields(source: TupleReader) {
    const _nickname = source.readStringOpt();
    const _avatar = source.readStringOpt();
    return { $$type: 'OptionalFields' as const, nickname: _nickname, avatar: _avatar };
}

function loadGetterTupleOptionalFields(source: TupleReader) {
    const _nickname = source.readStringOpt();
    const _avatar = source.readStringOpt();
    return { $$type: 'OptionalFields' as const, nickname: _nickname, avatar: _avatar };
}

function storeTupleOptionalFields(source: OptionalFields) {
    const builder = new TupleBuilder();
    builder.writeString(source.nickname);
    builder.writeString(source.avatar);
    return builder.build();
}

function dictValueParserOptionalFields(): DictionaryValue<OptionalFields> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOptionalFields(src)).endCell());
        },
        parse: (src) => {
            return loadOptionalFields(src.loadRef().beginParse());
        }
    }
}

export type S1 = {
    $$type: 'S1';
    a: bigint;
    b: bigint;
    c: bigint;
}

export function storeS1(src: S1) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
        b_0.storeInt(src.b, 257);
        b_0.storeInt(src.c, 257);
    };
}

export function loadS1(slice: Slice) {
    const sc_0 = slice;
    const _a = sc_0.loadIntBig(257);
    const _b = sc_0.loadIntBig(257);
    const _c = sc_0.loadIntBig(257);
    return { $$type: 'S1' as const, a: _a, b: _b, c: _c };
}

function loadTupleS1(source: TupleReader) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    const _c = source.readBigNumber();
    return { $$type: 'S1' as const, a: _a, b: _b, c: _c };
}

function loadGetterTupleS1(source: TupleReader) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    const _c = source.readBigNumber();
    return { $$type: 'S1' as const, a: _a, b: _b, c: _c };
}

function storeTupleS1(source: S1) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeNumber(source.b);
    builder.writeNumber(source.c);
    return builder.build();
}

function dictValueParserS1(): DictionaryValue<S1> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeS1(src)).endCell());
        },
        parse: (src) => {
            return loadS1(src.loadRef().beginParse());
        }
    }
}

export type StructsTester$Data = {
    $$type: 'StructsTester$Data';
    s1: S;
    s2: S;
    t1: T;
    t2: T;
    mapWithLongStructs15: Dictionary<bigint, LongStruct15>;
    mapWithLongStructs16: Dictionary<bigint, LongStruct16>;
    mapWithLongStructs32: Dictionary<bigint, LongStruct32>;
    x1: bigint;
    x2: bigint;
    x3: bigint;
    x4: bigint;
    x5: bigint;
    x6: bigint;
    x7: bigint;
    x8: bigint;
    x9: bigint;
    x10: bigint;
    x11: bigint;
    x12: bigint;
    x13: bigint;
    x14: bigint;
    x15: bigint;
    x16: bigint;
    x17: bigint;
    x18: bigint;
    x19: bigint;
    x20: bigint;
}

export function storeStructsTester$Data(src: StructsTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.store(storeS(src.s1));
        b_0.store(storeS(src.s2));
        const b_1 = new Builder();
        b_1.store(storeT(src.t1));
        const b_2 = new Builder();
        b_2.store(storeT(src.t2));
        b_2.storeDict(src.mapWithLongStructs15, Dictionary.Keys.BigInt(257), dictValueParserLongStruct15());
        b_2.storeDict(src.mapWithLongStructs16, Dictionary.Keys.BigInt(257), dictValueParserLongStruct16());
        b_2.storeDict(src.mapWithLongStructs32, Dictionary.Keys.BigInt(257), dictValueParserLongStruct32());
        b_2.storeInt(src.x1, 257);
        const b_3 = new Builder();
        b_3.storeInt(src.x2, 257);
        b_3.storeInt(src.x3, 257);
        b_3.storeInt(src.x4, 257);
        const b_4 = new Builder();
        b_4.storeInt(src.x5, 257);
        b_4.storeInt(src.x6, 257);
        b_4.storeInt(src.x7, 257);
        const b_5 = new Builder();
        b_5.storeInt(src.x8, 257);
        b_5.storeInt(src.x9, 257);
        b_5.storeInt(src.x10, 257);
        const b_6 = new Builder();
        b_6.storeInt(src.x11, 257);
        b_6.storeInt(src.x12, 257);
        b_6.storeInt(src.x13, 257);
        const b_7 = new Builder();
        b_7.storeInt(src.x14, 257);
        b_7.storeInt(src.x15, 257);
        b_7.storeInt(src.x16, 257);
        const b_8 = new Builder();
        b_8.storeInt(src.x17, 257);
        b_8.storeInt(src.x18, 257);
        b_8.storeInt(src.x19, 257);
        const b_9 = new Builder();
        b_9.storeInt(src.x20, 257);
        b_8.storeRef(b_9.endCell());
        b_7.storeRef(b_8.endCell());
        b_6.storeRef(b_7.endCell());
        b_5.storeRef(b_6.endCell());
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadStructsTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _s1 = loadS(sc_0);
    const _s2 = loadS(sc_0);
    const sc_1 = sc_0.loadRef().beginParse();
    const _t1 = loadT(sc_1);
    const sc_2 = sc_1.loadRef().beginParse();
    const _t2 = loadT(sc_2);
    const _mapWithLongStructs15 = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserLongStruct15(), sc_2);
    const _mapWithLongStructs16 = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserLongStruct16(), sc_2);
    const _mapWithLongStructs32 = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserLongStruct32(), sc_2);
    const _x1 = sc_2.loadIntBig(257);
    const sc_3 = sc_2.loadRef().beginParse();
    const _x2 = sc_3.loadIntBig(257);
    const _x3 = sc_3.loadIntBig(257);
    const _x4 = sc_3.loadIntBig(257);
    const sc_4 = sc_3.loadRef().beginParse();
    const _x5 = sc_4.loadIntBig(257);
    const _x6 = sc_4.loadIntBig(257);
    const _x7 = sc_4.loadIntBig(257);
    const sc_5 = sc_4.loadRef().beginParse();
    const _x8 = sc_5.loadIntBig(257);
    const _x9 = sc_5.loadIntBig(257);
    const _x10 = sc_5.loadIntBig(257);
    const sc_6 = sc_5.loadRef().beginParse();
    const _x11 = sc_6.loadIntBig(257);
    const _x12 = sc_6.loadIntBig(257);
    const _x13 = sc_6.loadIntBig(257);
    const sc_7 = sc_6.loadRef().beginParse();
    const _x14 = sc_7.loadIntBig(257);
    const _x15 = sc_7.loadIntBig(257);
    const _x16 = sc_7.loadIntBig(257);
    const sc_8 = sc_7.loadRef().beginParse();
    const _x17 = sc_8.loadIntBig(257);
    const _x18 = sc_8.loadIntBig(257);
    const _x19 = sc_8.loadIntBig(257);
    const sc_9 = sc_8.loadRef().beginParse();
    const _x20 = sc_9.loadIntBig(257);
    return { $$type: 'StructsTester$Data' as const, s1: _s1, s2: _s2, t1: _t1, t2: _t2, mapWithLongStructs15: _mapWithLongStructs15, mapWithLongStructs16: _mapWithLongStructs16, mapWithLongStructs32: _mapWithLongStructs32, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20 };
}

function loadTupleStructsTester$Data(source: TupleReader) {
    const _s1 = loadTupleS(source);
    const _s2 = loadTupleS(source);
    const _t1 = loadTupleT(source);
    const _t2 = loadTupleT(source);
    const _mapWithLongStructs15 = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserLongStruct15(), source.readCellOpt());
    const _mapWithLongStructs16 = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserLongStruct16(), source.readCellOpt());
    const _mapWithLongStructs32 = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserLongStruct32(), source.readCellOpt());
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    source = source.readTuple();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    const _x17 = source.readBigNumber();
    const _x18 = source.readBigNumber();
    const _x19 = source.readBigNumber();
    const _x20 = source.readBigNumber();
    return { $$type: 'StructsTester$Data' as const, s1: _s1, s2: _s2, t1: _t1, t2: _t2, mapWithLongStructs15: _mapWithLongStructs15, mapWithLongStructs16: _mapWithLongStructs16, mapWithLongStructs32: _mapWithLongStructs32, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20 };
}

function loadGetterTupleStructsTester$Data(source: TupleReader) {
    const _s1 = loadGetterTupleS(source);
    const _s2 = loadGetterTupleS(source);
    const _t1 = loadGetterTupleT(source);
    const _t2 = loadGetterTupleT(source);
    const _mapWithLongStructs15 = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserLongStruct15(), source.readCellOpt());
    const _mapWithLongStructs16 = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserLongStruct16(), source.readCellOpt());
    const _mapWithLongStructs32 = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserLongStruct32(), source.readCellOpt());
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    const _x17 = source.readBigNumber();
    const _x18 = source.readBigNumber();
    const _x19 = source.readBigNumber();
    const _x20 = source.readBigNumber();
    return { $$type: 'StructsTester$Data' as const, s1: _s1, s2: _s2, t1: _t1, t2: _t2, mapWithLongStructs15: _mapWithLongStructs15, mapWithLongStructs16: _mapWithLongStructs16, mapWithLongStructs32: _mapWithLongStructs32, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20 };
}

function storeTupleStructsTester$Data(source: StructsTester$Data) {
    const builder = new TupleBuilder();
    builder.writeTuple(storeTupleS(source.s1));
    builder.writeTuple(storeTupleS(source.s2));
    builder.writeTuple(storeTupleT(source.t1));
    builder.writeTuple(storeTupleT(source.t2));
    builder.writeCell(source.mapWithLongStructs15.size > 0 ? beginCell().storeDictDirect(source.mapWithLongStructs15, Dictionary.Keys.BigInt(257), dictValueParserLongStruct15()).endCell() : null);
    builder.writeCell(source.mapWithLongStructs16.size > 0 ? beginCell().storeDictDirect(source.mapWithLongStructs16, Dictionary.Keys.BigInt(257), dictValueParserLongStruct16()).endCell() : null);
    builder.writeCell(source.mapWithLongStructs32.size > 0 ? beginCell().storeDictDirect(source.mapWithLongStructs32, Dictionary.Keys.BigInt(257), dictValueParserLongStruct32()).endCell() : null);
    builder.writeNumber(source.x1);
    builder.writeNumber(source.x2);
    builder.writeNumber(source.x3);
    builder.writeNumber(source.x4);
    builder.writeNumber(source.x5);
    builder.writeNumber(source.x6);
    builder.writeNumber(source.x7);
    builder.writeNumber(source.x8);
    builder.writeNumber(source.x9);
    builder.writeNumber(source.x10);
    builder.writeNumber(source.x11);
    builder.writeNumber(source.x12);
    builder.writeNumber(source.x13);
    builder.writeNumber(source.x14);
    builder.writeNumber(source.x15);
    builder.writeNumber(source.x16);
    builder.writeNumber(source.x17);
    builder.writeNumber(source.x18);
    builder.writeNumber(source.x19);
    builder.writeNumber(source.x20);
    return builder.build();
}

function dictValueParserStructsTester$Data(): DictionaryValue<StructsTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStructsTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadStructsTester$Data(src.loadRef().beginParse());
        }
    }
}

 type StructsTester_init_args = {
    $$type: 'StructsTester_init_args';
}

function initStructsTester_init_args(src: StructsTester_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function StructsTester_init() {
    const __code = Cell.fromBase64('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DIANgA6AD4AQgBGAEoATgBRWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWE1YTVhNWIlYiViJWIlYiViJWIlYiViJWIlYiViJWIlYiViJWIlYyVjJWMlYyVjJWMlYyVjJWMlYyVjJWMlYyVjJWMnAB/BEpEUoRKREoEUkRKBEnEUgRJxEmEUcRJhElEUYRJREkEUURJBEjEUQRIxEiEUMRIhEhEUIRIREgEUERIBEfEUARHxEeET8RHhEdET4RHREcET0RHBEbETwRGxEaETsRGhEZEToRGREYETkRGBEXETgRFxEWETcRFhEVETYRFXEARFYyVjJWMlYyVjKAFYAWgBeAGIAZgBqAG4AcgB2AHoAfgCAB/BEUETURFBETETQRExESETMREhERETIREREQETEREA8RMA8OES8ODREuDQwRLQwLESwLChErCgkRKgkIESkIBxEoBwYRJwYFESYFBBElBAMRJAMCESMCAREiAREhERARIBEQDxEfDw4RHg4NER0NDBEcDAsRGwsKERoKCREZCXIASAgRGAgHERcHBhEWBgURFQUEERQEAxETAwIREgIBEREBERBV4AAScXJzdHVvA28CAhiqcNs82zxsxmzGbJbDdgIBIHd4ABJ/fnyF/YX+hf8D76Ybtnm2eK5ArkCuQK5ArkCuQK5ArkCuQK5ArkCuQK5ArkCuQK5ArkCuQK5ArkCuQK5ArkCuQK5ArkCuQK5ArkCuQK5ArkKuPiI6IjwiOiI4IjoiOCI2IjgiNiI0IjYiNCIyIjQiMiIwIjIiMCIuIjAiLiIsIi4iLcN5egKPppe2ebZ4riCuIK4griCuIK4griCuIK4griCuIK4griCuIK4griCuIK4griCuIK4griCuIK4griCuIK4griCuIK4griCuItg/w4QB7HFyc3R1dnd4eXqAC4AMgA2ADoAPgBCAEYASgBOAFIAVgBaAF4AYgBmAGoAbgByAHYAegB+AIDBXHnGAIIEBASIDER8DER4RIBEeAxEdAxEcESARHAMRGwMRGhEgERoDERkDERgRIBEYAxEXAxEWESARFgMRFQN7AFQRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ4C6BEUESARFAMREwMREhEgERIDEREDERARIBEQED8OESAOED0MESAMEDsKESAKEDkI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');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initStructsTester_init_args({ $$type: 'StructsTester_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const StructsTester_errors: { [key: number]: { message: string } } = {
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
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
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
}

const StructsTester_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"S","header":null,"fields":[{"name":"a","type":{"kind":"simple","type":"bool","optional":false}},{"name":"b","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"T","header":null,"fields":[{"name":"a","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"s","type":{"kind":"simple","type":"S","optional":false}}]},
    {"name":"MyStruct1","header":null,"fields":[{"name":"a","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"b","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"c","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"MyStruct2","header":null,"fields":[{"name":"m","type":{"kind":"dict","key":"int","value":"uint","valueFormat":64}},{"name":"s","type":{"kind":"simple","type":"MyStruct1","optional":true}}]},
    {"name":"MyStruct3","header":null,"fields":[{"name":"s","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"MyMessage1","header":2844430700,"fields":[{"name":"a","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"s","type":{"kind":"simple","type":"MyStruct2","optional":false}}]},
    {"name":"Coin","header":null,"fields":[{"name":"first","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"second","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"VarIntegers","header":null,"fields":[{"name":"a","type":{"kind":"simple","type":"int","optional":false,"format":"varint16"}},{"name":"b","type":{"kind":"simple","type":"int","optional":false,"format":"varint32"}},{"name":"c","type":{"kind":"simple","type":"uint","optional":false,"format":"varuint16"}},{"name":"d","type":{"kind":"simple","type":"uint","optional":false,"format":"varuint32"}}]},
    {"name":"IntFields","header":null,"fields":[{"name":"i1","type":{"kind":"simple","type":"int","optional":false,"format":1}},{"name":"i2","type":{"kind":"simple","type":"int","optional":false,"format":2}},{"name":"i3","type":{"kind":"simple","type":"int","optional":false,"format":3}},{"name":"i255","type":{"kind":"simple","type":"int","optional":false,"format":255}},{"name":"i256","type":{"kind":"simple","type":"int","optional":false,"format":256}},{"name":"i257","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UintFields","header":3925996650,"fields":[{"name":"u1","type":{"kind":"simple","type":"uint","optional":false,"format":1}},{"name":"u2","type":{"kind":"simple","type":"uint","optional":false,"format":2}},{"name":"u3","type":{"kind":"simple","type":"uint","optional":false,"format":3}},{"name":"u254","type":{"kind":"simple","type":"uint","optional":false,"format":254}},{"name":"u255","type":{"kind":"simple","type":"uint","optional":false,"format":255}},{"name":"u256","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"LongStruct15","header":null,"fields":[{"name":"x1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x2","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x3","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x4","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x5","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x6","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x7","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x9","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x10","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x11","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x12","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x13","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x14","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x15","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LongStruct16","header":null,"fields":[{"name":"x1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x2","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x3","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x4","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x5","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x6","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x7","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x9","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x10","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x11","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x12","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x13","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x14","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x15","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x16","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LongStruct32","header":null,"fields":[{"name":"x1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x2","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x3","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x4","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x5","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x6","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x7","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x9","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x10","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x11","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x12","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x13","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x14","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x15","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x16","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x17","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x18","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x19","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x20","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x21","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x22","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x23","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x24","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x25","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x26","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x27","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x28","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x29","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x30","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x31","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x32","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LongNestedStruct","header":null,"fields":[{"name":"x1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x2","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x3","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x4","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x5","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x6","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x7","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x9","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x10","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x11","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x12","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x13","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x14","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x15","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x16","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x17","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x18","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x19","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x20","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"s1","type":{"kind":"simple","type":"LongStruct15","optional":false}},{"name":"s2","type":{"kind":"simple","type":"LongStruct16","optional":false}},{"name":"s3","type":{"kind":"simple","type":"LongStruct32","optional":false}}]},
    {"name":"LongNestedStructWithOpts","header":null,"fields":[{"name":"x1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x2","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x3","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x4","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x5","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x6","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x7","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x9","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x10","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x11","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x12","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x13","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x14","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x15","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x16","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x17","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x18","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"x19","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x20","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"s1","type":{"kind":"simple","type":"LongStruct15","optional":true}},{"name":"s2","type":{"kind":"simple","type":"LongStruct16","optional":false}},{"name":"s3","type":{"kind":"simple","type":"LongStruct32","optional":true}}]},
    {"name":"Point","header":null,"fields":[{"name":"x","type":{"kind":"simple","type":"int","optional":false,"format":64}},{"name":"y","type":{"kind":"simple","type":"int","optional":false,"format":64}}]},
    {"name":"Line","header":null,"fields":[{"name":"start","type":{"kind":"simple","type":"Point","optional":false}},{"name":"end","type":{"kind":"simple","type":"Point","optional":false}}]},
    {"name":"Location","header":null,"fields":[{"name":"idx","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"line1","type":{"kind":"simple","type":"Line","optional":false}},{"name":"line2","type":{"kind":"simple","type":"Line","optional":true}}]},
    {"name":"DoubleNestedStructOpt","header":null,"fields":[{"name":"a","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"s","type":{"kind":"simple","type":"MyStruct1","optional":true}}]},
    {"name":"TripleNestedStructOpt","header":null,"fields":[{"name":"a","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"s","type":{"kind":"simple","type":"DoubleNestedStructOpt","optional":true}}]},
    {"name":"LongAndDeepNestedStruct","header":null,"fields":[{"name":"x1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x2","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x3","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x4","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x5","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x6","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x7","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x9","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x10","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x11","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x12","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x13","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x14","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x15","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x16","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"s1","type":{"kind":"simple","type":"TripleNestedStructOpt","optional":false}},{"name":"s2","type":{"kind":"simple","type":"TripleNestedStructOpt","optional":false}},{"name":"s3","type":{"kind":"simple","type":"TripleNestedStructOpt","optional":true}},{"name":"s4","type":{"kind":"simple","type":"TripleNestedStructOpt","optional":true}}]},
    {"name":"Foo","header":42,"fields":[{"name":"s","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Dict","header":null,"fields":[{"name":"m","type":{"kind":"dict","key":"uint","keyFormat":8,"value":"uint","valueFormat":"coins"}}]},
    {"name":"OptionalFields","header":null,"fields":[{"name":"nickname","type":{"kind":"simple","type":"string","optional":true}},{"name":"avatar","type":{"kind":"simple","type":"string","optional":true}}]},
    {"name":"S1","header":null,"fields":[{"name":"a","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"b","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"c","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StructsTester$Data","header":null,"fields":[{"name":"s1","type":{"kind":"simple","type":"S","optional":false}},{"name":"s2","type":{"kind":"simple","type":"S","optional":false}},{"name":"t1","type":{"kind":"simple","type":"T","optional":false}},{"name":"t2","type":{"kind":"simple","type":"T","optional":false}},{"name":"mapWithLongStructs15","type":{"kind":"dict","key":"int","value":"LongStruct15","valueFormat":"ref"}},{"name":"mapWithLongStructs16","type":{"kind":"dict","key":"int","value":"LongStruct16","valueFormat":"ref"}},{"name":"mapWithLongStructs32","type":{"kind":"dict","key":"int","value":"LongStruct32","valueFormat":"ref"}},{"name":"x1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x2","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x3","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x4","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x5","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x6","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x7","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x9","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x10","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x11","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x12","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x13","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x14","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x15","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x16","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x17","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x18","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x19","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"x20","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const StructsTester_getters: ABIGetter[] = [
    {"name":"structInitializerTest","methodId":69602,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"toCell1","methodId":82862,"arguments":[{"name":"s","type":{"kind":"simple","type":"MyStruct1","optional":false}}],"returnType":{"kind":"simple","type":"cell","optional":false}},
    {"name":"toSlice1","methodId":69666,"arguments":[{"name":"s","type":{"kind":"simple","type":"MyStruct1","optional":false}}],"returnType":{"kind":"simple","type":"slice","optional":false}},
    {"name":"fromCell1","methodId":76221,"arguments":[{"name":"src","type":{"kind":"simple","type":"cell","optional":false}}],"returnType":{"kind":"simple","type":"MyStruct1","optional":false}},
    {"name":"fromSlice1","methodId":118478,"arguments":[{"name":"src","type":{"kind":"simple","type":"slice","optional":false}}],"returnType":{"kind":"simple","type":"MyStruct1","optional":false}},
    {"name":"toCell2","methodId":95181,"arguments":[{"name":"s","type":{"kind":"simple","type":"MyStruct2","optional":false}}],"returnType":{"kind":"simple","type":"cell","optional":false}},
    {"name":"fromCell2","methodId":72158,"arguments":[{"name":"src","type":{"kind":"simple","type":"cell","optional":false}}],"returnType":{"kind":"simple","type":"MyStruct2","optional":false}},
    {"name":"fromSlice2","methodId":130733,"arguments":[{"name":"src","type":{"kind":"simple","type":"slice","optional":false}}],"returnType":{"kind":"simple","type":"MyStruct2","optional":false}},
    {"name":"test1","methodId":70304,"arguments":[{"name":"s1","type":{"kind":"simple","type":"MyStruct1","optional":false}},{"name":"s2","type":{"kind":"simple","type":"MyStruct2","optional":false}}],"returnType":{"kind":"simple","type":"cell","optional":false}},
    {"name":"toCellMessage1","methodId":103675,"arguments":[{"name":"m","type":{"kind":"simple","type":"MyMessage1","optional":false}}],"returnType":{"kind":"simple","type":"cell","optional":false}},
    {"name":"fromCellMessage1","methodId":65739,"arguments":[{"name":"src","type":{"kind":"simple","type":"cell","optional":false}}],"returnType":{"kind":"simple","type":"MyMessage1","optional":false}},
    {"name":"fromSliceMessage1","methodId":100880,"arguments":[{"name":"src","type":{"kind":"simple","type":"slice","optional":false}}],"returnType":{"kind":"simple","type":"MyMessage1","optional":false}},
    {"name":"contractStructConstantImmediate","methodId":131046,"arguments":[],"returnType":{"kind":"simple","type":"MyStruct3","optional":false}},
    {"name":"globalConstStructConstantImmediate","methodId":96485,"arguments":[],"returnType":{"kind":"simple","type":"MyStruct3","optional":false}},
    {"name":"contractStructConstantFieldImmediate","methodId":115253,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"globalConstStructConstantFieldImmediate","methodId":72941,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"contractStructConstantViaVar","methodId":103564,"arguments":[],"returnType":{"kind":"simple","type":"MyStruct3","optional":false}},
    {"name":"globalConstStructConstantViaVar","methodId":105147,"arguments":[],"returnType":{"kind":"simple","type":"MyStruct3","optional":false}},
    {"name":"contractStructConstantFieldViaVar","methodId":97692,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"globalConstStructConstantFieldViaVar","methodId":118768,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"longStruct15Test","methodId":92569,"arguments":[],"returnType":{"kind":"simple","type":"LongStruct15","optional":false}},
    {"name":"longStruct16Test","methodId":100171,"arguments":[],"returnType":{"kind":"simple","type":"LongStruct16","optional":false}},
    {"name":"longStruct32Test","methodId":99597,"arguments":[],"returnType":{"kind":"simple","type":"LongStruct32","optional":false}},
    {"name":"longNestedStructTest","methodId":101744,"arguments":[],"returnType":{"kind":"simple","type":"LongNestedStruct","optional":false}},
    {"name":"longNestedStructWithOptsTest","methodId":103572,"arguments":[],"returnType":{"kind":"simple","type":"LongNestedStructWithOpts","optional":false}},
    {"name":"longContractTest","methodId":81181,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"location1","methodId":126791,"arguments":[],"returnType":{"kind":"simple","type":"Location","optional":false}},
    {"name":"location2","methodId":122660,"arguments":[],"returnType":{"kind":"simple","type":"Location","optional":false}},
    {"name":"tripleNestedStructOpt1","methodId":102164,"arguments":[],"returnType":{"kind":"simple","type":"TripleNestedStructOpt","optional":false}},
    {"name":"tripleNestedStructOpt2","methodId":114551,"arguments":[],"returnType":{"kind":"simple","type":"TripleNestedStructOpt","optional":false}},
    {"name":"tripleNestedStructOpt3","methodId":110422,"arguments":[],"returnType":{"kind":"simple","type":"TripleNestedStructOpt","optional":false}},
    {"name":"longAndDeepNestedStruct1","methodId":87259,"arguments":[],"returnType":{"kind":"simple","type":"LongAndDeepNestedStruct","optional":false}},
    {"name":"longAndDeepNestedStruct2","methodId":91320,"arguments":[],"returnType":{"kind":"simple","type":"LongAndDeepNestedStruct","optional":false}},
    {"name":"longAndDeepNestedStruct3","methodId":95385,"arguments":[],"returnType":{"kind":"simple","type":"LongAndDeepNestedStruct","optional":false}},
    {"name":"intFieldsStruct","methodId":98928,"arguments":[],"returnType":{"kind":"simple","type":"IntFields","optional":false}},
    {"name":"intFieldsFromCell","methodId":75138,"arguments":[{"name":"src","type":{"kind":"simple","type":"cell","optional":false}}],"returnType":{"kind":"simple","type":"IntFields","optional":false}},
    {"name":"uintFieldsMessage","methodId":72699,"arguments":[],"returnType":{"kind":"simple","type":"UintFields","optional":false}},
    {"name":"uintFieldsFromCell","methodId":121259,"arguments":[{"name":"src","type":{"kind":"simple","type":"cell","optional":false}}],"returnType":{"kind":"simple","type":"UintFields","optional":false}},
    {"name":"optionalFields","methodId":79909,"arguments":[],"returnType":{"kind":"simple","type":"OptionalFields","optional":false}},
    {"name":"destructuringTest1","methodId":121307,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"destructuringTest1Const","methodId":112759,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"destructuringTest2","methodId":125368,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"destructuringTest2Const","methodId":95895,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"destructuringTest3","methodId":129433,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"destructuringTest3Const","methodId":78647,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"destructuringTest4","methodId":100734,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"destructuringTest4Const","methodId":129910,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"destructuringTest5","methodId":104799,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"destructuringTest5Const","methodId":114390,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"destructuringTest6","methodId":108860,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"destructuringTest6Const","methodId":94262,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"destructuringTest7","methodId":112925,"arguments":[],"returnType":{"kind":"simple","type":"S1","optional":false}},
    {"name":"destructuringTest7Const","methodId":79254,"arguments":[],"returnType":{"kind":"simple","type":"S1","optional":false}},
    {"name":"destructuringTest8","methodId":84210,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"destructuringTest8Const","methodId":127125,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

export const StructsTester_getterMapping: { [key: string]: string } = {
    'structInitializerTest': 'getStructInitializerTest',
    'toCell1': 'getToCell1',
    'toSlice1': 'getToSlice1',
    'fromCell1': 'getFromCell1',
    'fromSlice1': 'getFromSlice1',
    'toCell2': 'getToCell2',
    'fromCell2': 'getFromCell2',
    'fromSlice2': 'getFromSlice2',
    'test1': 'getTest1',
    'toCellMessage1': 'getToCellMessage1',
    'fromCellMessage1': 'getFromCellMessage1',
    'fromSliceMessage1': 'getFromSliceMessage1',
    'contractStructConstantImmediate': 'getContractStructConstantImmediate',
    'globalConstStructConstantImmediate': 'getGlobalConstStructConstantImmediate',
    'contractStructConstantFieldImmediate': 'getContractStructConstantFieldImmediate',
    'globalConstStructConstantFieldImmediate': 'getGlobalConstStructConstantFieldImmediate',
    'contractStructConstantViaVar': 'getContractStructConstantViaVar',
    'globalConstStructConstantViaVar': 'getGlobalConstStructConstantViaVar',
    'contractStructConstantFieldViaVar': 'getContractStructConstantFieldViaVar',
    'globalConstStructConstantFieldViaVar': 'getGlobalConstStructConstantFieldViaVar',
    'longStruct15Test': 'getLongStruct15Test',
    'longStruct16Test': 'getLongStruct16Test',
    'longStruct32Test': 'getLongStruct32Test',
    'longNestedStructTest': 'getLongNestedStructTest',
    'longNestedStructWithOptsTest': 'getLongNestedStructWithOptsTest',
    'longContractTest': 'getLongContractTest',
    'location1': 'getLocation1',
    'location2': 'getLocation2',
    'tripleNestedStructOpt1': 'getTripleNestedStructOpt1',
    'tripleNestedStructOpt2': 'getTripleNestedStructOpt2',
    'tripleNestedStructOpt3': 'getTripleNestedStructOpt3',
    'longAndDeepNestedStruct1': 'getLongAndDeepNestedStruct1',
    'longAndDeepNestedStruct2': 'getLongAndDeepNestedStruct2',
    'longAndDeepNestedStruct3': 'getLongAndDeepNestedStruct3',
    'intFieldsStruct': 'getIntFieldsStruct',
    'intFieldsFromCell': 'getIntFieldsFromCell',
    'uintFieldsMessage': 'getUintFieldsMessage',
    'uintFieldsFromCell': 'getUintFieldsFromCell',
    'optionalFields': 'getOptionalFields',
    'destructuringTest1': 'getDestructuringTest1',
    'destructuringTest1Const': 'getDestructuringTest1Const',
    'destructuringTest2': 'getDestructuringTest2',
    'destructuringTest2Const': 'getDestructuringTest2Const',
    'destructuringTest3': 'getDestructuringTest3',
    'destructuringTest3Const': 'getDestructuringTest3Const',
    'destructuringTest4': 'getDestructuringTest4',
    'destructuringTest4Const': 'getDestructuringTest4Const',
    'destructuringTest5': 'getDestructuringTest5',
    'destructuringTest5Const': 'getDestructuringTest5Const',
    'destructuringTest6': 'getDestructuringTest6',
    'destructuringTest6Const': 'getDestructuringTest6Const',
    'destructuringTest7': 'getDestructuringTest7',
    'destructuringTest7Const': 'getDestructuringTest7Const',
    'destructuringTest8': 'getDestructuringTest8',
    'destructuringTest8Const': 'getDestructuringTest8Const',
}

const StructsTester_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Foo"}},
    {"receiver":"internal","message":{"kind":"text","text":"example"}},
    {"receiver":"internal","message":{"kind":"text","text":"exampleVarIntegers"}},
]

export const globalConstStruct = { $$type: "MyStruct3" as const, s: "global const struct test" };

export class StructsTester implements Contract {
    
    public static readonly contractStructConst = { $$type: "MyStruct3" as const, s: "contract const struct test" };
    public static readonly storageReserve = 0n;
    
    static async init() {
        return await StructsTester_init();
    }
    
    static async fromInit() {
        const __gen_init = await StructsTester_init();
        const address = contractAddress(0, __gen_init);
        return new StructsTester(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new StructsTester(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  StructsTester_types,
        getters: StructsTester_getters,
        receivers: StructsTester_receivers,
        errors: StructsTester_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | Foo | "example" | "exampleVarIntegers") {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Foo') {
            body = beginCell().store(storeFoo(message)).endCell();
        }
        if (message === "example") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "exampleVarIntegers") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getStructInitializerTest(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(69602 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getToCell1(provider: ContractProvider, s: MyStruct1) {
        const builder = new TupleBuilder();
        builder.writeTuple(storeTupleMyStruct1(s));
        const source = (await provider.get(82862 as any, builder.build())).stack;
        const result = source.readCell();
        return result;
    }
    
    async getToSlice1(provider: ContractProvider, s: MyStruct1) {
        const builder = new TupleBuilder();
        builder.writeTuple(storeTupleMyStruct1(s));
        const source = (await provider.get(69666 as any, builder.build())).stack;
        const result = source.readCell().asSlice();
        return result;
    }
    
    async getFromCell1(provider: ContractProvider, src: Cell) {
        const builder = new TupleBuilder();
        builder.writeCell(src);
        const source = (await provider.get(76221 as any, builder.build())).stack;
        const result = loadGetterTupleMyStruct1(source);
        return result;
    }
    
    async getFromSlice1(provider: ContractProvider, src: Slice) {
        const builder = new TupleBuilder();
        builder.writeSlice(src.asCell());
        const source = (await provider.get(118478 as any, builder.build())).stack;
        const result = loadGetterTupleMyStruct1(source);
        return result;
    }
    
    async getToCell2(provider: ContractProvider, s: MyStruct2) {
        const builder = new TupleBuilder();
        builder.writeTuple(storeTupleMyStruct2(s));
        const source = (await provider.get(95181 as any, builder.build())).stack;
        const result = source.readCell();
        return result;
    }
    
    async getFromCell2(provider: ContractProvider, src: Cell) {
        const builder = new TupleBuilder();
        builder.writeCell(src);
        const source = (await provider.get(72158 as any, builder.build())).stack;
        const result = loadGetterTupleMyStruct2(source);
        return result;
    }
    
    async getFromSlice2(provider: ContractProvider, src: Slice) {
        const builder = new TupleBuilder();
        builder.writeSlice(src.asCell());
        const source = (await provider.get(130733 as any, builder.build())).stack;
        const result = loadGetterTupleMyStruct2(source);
        return result;
    }
    
    async getTest1(provider: ContractProvider, s1: MyStruct1, s2: MyStruct2) {
        const builder = new TupleBuilder();
        builder.writeTuple(storeTupleMyStruct1(s1));
        builder.writeTuple(storeTupleMyStruct2(s2));
        const source = (await provider.get(70304 as any, builder.build())).stack;
        const result = source.readCell();
        return result;
    }
    
    async getToCellMessage1(provider: ContractProvider, m: MyMessage1) {
        const builder = new TupleBuilder();
        builder.writeTuple(storeTupleMyMessage1(m));
        const source = (await provider.get(103675 as any, builder.build())).stack;
        const result = source.readCell();
        return result;
    }
    
    async getFromCellMessage1(provider: ContractProvider, src: Cell) {
        const builder = new TupleBuilder();
        builder.writeCell(src);
        const source = (await provider.get(65739 as any, builder.build())).stack;
        const result = loadGetterTupleMyMessage1(source);
        return result;
    }
    
    async getFromSliceMessage1(provider: ContractProvider, src: Slice) {
        const builder = new TupleBuilder();
        builder.writeSlice(src.asCell());
        const source = (await provider.get(100880 as any, builder.build())).stack;
        const result = loadGetterTupleMyMessage1(source);
        return result;
    }
    
    async getContractStructConstantImmediate(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(131046 as any, builder.build())).stack;
        const result = loadGetterTupleMyStruct3(source);
        return result;
    }
    
    async getGlobalConstStructConstantImmediate(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(96485 as any, builder.build())).stack;
        const result = loadGetterTupleMyStruct3(source);
        return result;
    }
    
    async getContractStructConstantFieldImmediate(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(115253 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
    async getGlobalConstStructConstantFieldImmediate(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(72941 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
    async getContractStructConstantViaVar(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(103564 as any, builder.build())).stack;
        const result = loadGetterTupleMyStruct3(source);
        return result;
    }
    
    async getGlobalConstStructConstantViaVar(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(105147 as any, builder.build())).stack;
        const result = loadGetterTupleMyStruct3(source);
        return result;
    }
    
    async getContractStructConstantFieldViaVar(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(97692 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
    async getGlobalConstStructConstantFieldViaVar(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(118768 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
    async getLongStruct15Test(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(92569 as any, builder.build())).stack;
        const result = loadGetterTupleLongStruct15(source);
        return result;
    }
    
    async getLongStruct16Test(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(100171 as any, builder.build())).stack;
        const result = loadGetterTupleLongStruct16(source);
        return result;
    }
    
    async getLongStruct32Test(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(99597 as any, builder.build())).stack;
        const result = loadGetterTupleLongStruct32(source);
        return result;
    }
    
    async getLongNestedStructTest(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(101744 as any, builder.build())).stack;
        const result = loadGetterTupleLongNestedStruct(source);
        return result;
    }
    
    async getLongNestedStructWithOptsTest(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(103572 as any, builder.build())).stack;
        const result = loadGetterTupleLongNestedStructWithOpts(source);
        return result;
    }
    
    async getLongContractTest(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(81181 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getLocation1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(126791 as any, builder.build())).stack;
        const result = loadGetterTupleLocation(source);
        return result;
    }
    
    async getLocation2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(122660 as any, builder.build())).stack;
        const result = loadGetterTupleLocation(source);
        return result;
    }
    
    async getTripleNestedStructOpt1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(102164 as any, builder.build())).stack;
        const result = loadGetterTupleTripleNestedStructOpt(source);
        return result;
    }
    
    async getTripleNestedStructOpt2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(114551 as any, builder.build())).stack;
        const result = loadGetterTupleTripleNestedStructOpt(source);
        return result;
    }
    
    async getTripleNestedStructOpt3(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(110422 as any, builder.build())).stack;
        const result = loadGetterTupleTripleNestedStructOpt(source);
        return result;
    }
    
    async getLongAndDeepNestedStruct1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(87259 as any, builder.build())).stack;
        const result = loadGetterTupleLongAndDeepNestedStruct(source);
        return result;
    }
    
    async getLongAndDeepNestedStruct2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(91320 as any, builder.build())).stack;
        const result = loadGetterTupleLongAndDeepNestedStruct(source);
        return result;
    }
    
    async getLongAndDeepNestedStruct3(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(95385 as any, builder.build())).stack;
        const result = loadGetterTupleLongAndDeepNestedStruct(source);
        return result;
    }
    
    async getIntFieldsStruct(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(98928 as any, builder.build())).stack;
        const result = loadGetterTupleIntFields(source);
        return result;
    }
    
    async getIntFieldsFromCell(provider: ContractProvider, src: Cell) {
        const builder = new TupleBuilder();
        builder.writeCell(src);
        const source = (await provider.get(75138 as any, builder.build())).stack;
        const result = loadGetterTupleIntFields(source);
        return result;
    }
    
    async getUintFieldsMessage(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(72699 as any, builder.build())).stack;
        const result = loadGetterTupleUintFields(source);
        return result;
    }
    
    async getUintFieldsFromCell(provider: ContractProvider, src: Cell) {
        const builder = new TupleBuilder();
        builder.writeCell(src);
        const source = (await provider.get(121259 as any, builder.build())).stack;
        const result = loadGetterTupleUintFields(source);
        return result;
    }
    
    async getOptionalFields(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(79909 as any, builder.build())).stack;
        const result = loadGetterTupleOptionalFields(source);
        return result;
    }
    
    async getDestructuringTest1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(121307 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getDestructuringTest1Const(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(112759 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getDestructuringTest2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(125368 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getDestructuringTest2Const(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(95895 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getDestructuringTest3(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(129433 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getDestructuringTest3Const(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(78647 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getDestructuringTest4(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(100734 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getDestructuringTest4Const(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(129910 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getDestructuringTest5(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(104799 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getDestructuringTest5Const(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(114390 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getDestructuringTest6(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(108860 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getDestructuringTest6Const(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(94262 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getDestructuringTest7(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(112925 as any, builder.build())).stack;
        const result = loadGetterTupleS1(source);
        return result;
    }
    
    async getDestructuringTest7Const(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(79254 as any, builder.build())).stack;
        const result = loadGetterTupleS1(source);
        return result;
    }
    
    async getDestructuringTest8(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(84210 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getDestructuringTest8Const(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(127125 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
}