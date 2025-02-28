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

export type Struct2 = {
    $$type: 'Struct2';
    v: bigint;
}

export function storeStruct2(src: Struct2) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2971230874, 32);
        b_0.storeInt(src.v, 257);
    };
}

export function loadStruct2(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2971230874) { throw Error('Invalid prefix'); }
    const _v = sc_0.loadIntBig(257);
    return { $$type: 'Struct2' as const, v: _v };
}

function loadTupleStruct2(source: TupleReader) {
    const _v = source.readBigNumber();
    return { $$type: 'Struct2' as const, v: _v };
}

function loadGetterTupleStruct2(source: TupleReader) {
    const _v = source.readBigNumber();
    return { $$type: 'Struct2' as const, v: _v };
}

function storeTupleStruct2(source: Struct2) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.v);
    return builder.build();
}

function dictValueParserStruct2(): DictionaryValue<Struct2> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStruct2(src)).endCell());
        },
        parse: (src) => {
            return loadStruct2(src.loadRef().beginParse());
        }
    }
}

export type OptStruct = {
    $$type: 'OptStruct';
    s: Struct2 | null;
}

export function storeOptStruct(src: OptStruct) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.s !== null && src.s !== undefined) { b_0.storeBit(true); b_0.store(storeStruct2(src.s)); } else { b_0.storeBit(false); }
    };
}

export function loadOptStruct(slice: Slice) {
    const sc_0 = slice;
    const _s = sc_0.loadBit() ? loadStruct2(sc_0) : null;
    return { $$type: 'OptStruct' as const, s: _s };
}

function loadTupleOptStruct(source: TupleReader) {
    const _s_p = source.readTupleOpt();
    const _s = _s_p ? loadTupleStruct2(_s_p) : null;
    return { $$type: 'OptStruct' as const, s: _s };
}

function loadGetterTupleOptStruct(source: TupleReader) {
    const _s_p = source.readTupleOpt();
    const _s = _s_p ? loadTupleStruct2(_s_p) : null;
    return { $$type: 'OptStruct' as const, s: _s };
}

function storeTupleOptStruct(source: OptStruct) {
    const builder = new TupleBuilder();
    if (source.s !== null && source.s !== undefined) {
        builder.writeTuple(storeTupleStruct2(source.s));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserOptStruct(): DictionaryValue<OptStruct> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOptStruct(src)).endCell());
        },
        parse: (src) => {
            return loadOptStruct(src.loadRef().beginParse());
        }
    }
}

export type Opt2$Data = {
    $$type: 'Opt2$Data';
    stateInit: StateInit;
}

export function storeOpt2$Data(src: Opt2$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.store(storeStateInit(src.stateInit));
    };
}

export function loadOpt2$Data(slice: Slice) {
    const sc_0 = slice;
    const _stateInit = loadStateInit(sc_0);
    return { $$type: 'Opt2$Data' as const, stateInit: _stateInit };
}

function loadTupleOpt2$Data(source: TupleReader) {
    const _stateInit = loadTupleStateInit(source);
    return { $$type: 'Opt2$Data' as const, stateInit: _stateInit };
}

function loadGetterTupleOpt2$Data(source: TupleReader) {
    const _stateInit = loadGetterTupleStateInit(source);
    return { $$type: 'Opt2$Data' as const, stateInit: _stateInit };
}

function storeTupleOpt2$Data(source: Opt2$Data) {
    const builder = new TupleBuilder();
    builder.writeTuple(storeTupleStateInit(source.stateInit));
    return builder.build();
}

function dictValueParserOpt2$Data(): DictionaryValue<Opt2$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOpt2$Data(src)).endCell());
        },
        parse: (src) => {
            return loadOpt2$Data(src.loadRef().beginParse());
        }
    }
}

export type Opt3$Data = {
    $$type: 'Opt3$Data';
}

export function storeOpt3$Data(src: Opt3$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

export function loadOpt3$Data(slice: Slice) {
    const sc_0 = slice;
    return { $$type: 'Opt3$Data' as const };
}

function loadTupleOpt3$Data(source: TupleReader) {
    return { $$type: 'Opt3$Data' as const };
}

function loadGetterTupleOpt3$Data(source: TupleReader) {
    return { $$type: 'Opt3$Data' as const };
}

function storeTupleOpt3$Data(source: Opt3$Data) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserOpt3$Data(): DictionaryValue<Opt3$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOpt3$Data(src)).endCell());
        },
        parse: (src) => {
            return loadOpt3$Data(src.loadRef().beginParse());
        }
    }
}

export type OptAddr = {
    $$type: 'OptAddr';
    x: bigint;
    y: Address | null;
    z: bigint;
}

export function storeOptAddr(src: OptAddr) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3353994340, 32);
        b_0.storeUint(src.x, 8);
        b_0.storeAddress(src.y);
        b_0.storeUint(src.z, 16);
    };
}

export function loadOptAddr(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3353994340) { throw Error('Invalid prefix'); }
    const _x = sc_0.loadUintBig(8);
    const _y = sc_0.loadMaybeAddress();
    const _z = sc_0.loadUintBig(16);
    return { $$type: 'OptAddr' as const, x: _x, y: _y, z: _z };
}

function loadTupleOptAddr(source: TupleReader) {
    const _x = source.readBigNumber();
    const _y = source.readAddressOpt();
    const _z = source.readBigNumber();
    return { $$type: 'OptAddr' as const, x: _x, y: _y, z: _z };
}

function loadGetterTupleOptAddr(source: TupleReader) {
    const _x = source.readBigNumber();
    const _y = source.readAddressOpt();
    const _z = source.readBigNumber();
    return { $$type: 'OptAddr' as const, x: _x, y: _y, z: _z };
}

function storeTupleOptAddr(source: OptAddr) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.x);
    builder.writeAddress(source.y);
    builder.writeNumber(source.z);
    return builder.build();
}

function dictValueParserOptAddr(): DictionaryValue<OptAddr> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOptAddr(src)).endCell());
        },
        parse: (src) => {
            return loadOptAddr(src.loadRef().beginParse());
        }
    }
}

export type Opt4$Data = {
    $$type: 'Opt4$Data';
    z: bigint;
}

export function storeOpt4$Data(src: Opt4$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.z, 257);
    };
}

export function loadOpt4$Data(slice: Slice) {
    const sc_0 = slice;
    const _z = sc_0.loadIntBig(257);
    return { $$type: 'Opt4$Data' as const, z: _z };
}

function loadTupleOpt4$Data(source: TupleReader) {
    const _z = source.readBigNumber();
    return { $$type: 'Opt4$Data' as const, z: _z };
}

function loadGetterTupleOpt4$Data(source: TupleReader) {
    const _z = source.readBigNumber();
    return { $$type: 'Opt4$Data' as const, z: _z };
}

function storeTupleOpt4$Data(source: Opt4$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.z);
    return builder.build();
}

function dictValueParserOpt4$Data(): DictionaryValue<Opt4$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOpt4$Data(src)).endCell());
        },
        parse: (src) => {
            return loadOpt4$Data(src.loadRef().beginParse());
        }
    }
}

 type Opt4_init_args = {
    $$type: 'Opt4_init_args';
}

function initOpt4_init_args(src: Opt4_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function Opt4_init() {
    const __code = Cell.fromBase64('te6ccgEBBAEArgACGv8AIOMD9KQT9LzyyAsBAgD4MAHQctch0gDSAPpAIRA0UGZvBPhhAvhi7UTQ0gABl4EBAdcAATGSMHDiMAGRMOBwIddJIMIflTEB0x8C3iGCEMfp5GS6jilb0wcg1wsBwwCT+kABlHLXIW3iAdMPVSBsMch/AcoAAQGBAQHPAMntVOAywAABwSGw3PLAggExpnf3e1E0NIAAZeBAQHXAAExkjBw4ts8MYAMAAiA=');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initOpt4_init_args({ $$type: 'Opt4_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Opt4_errors: { [key: number]: { message: string } } = {
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

const Opt4_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"Struct2","header":2971230874,"fields":[{"name":"v","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"OptStruct","header":null,"fields":[{"name":"s","type":{"kind":"simple","type":"Struct2","optional":true}}]},
    {"name":"Opt2$Data","header":null,"fields":[{"name":"stateInit","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"Opt3$Data","header":null,"fields":[]},
    {"name":"OptAddr","header":3353994340,"fields":[{"name":"x","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"y","type":{"kind":"simple","type":"address","optional":true}},{"name":"z","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"Opt4$Data","header":null,"fields":[{"name":"z","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const Opt4_getters: ABIGetter[] = [
    {"name":"z","methodId":122845,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

export const Opt4_getterMapping: { [key: string]: string } = {
    'z': 'getZ',
}

const Opt4_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"OptAddr"}},
]


export class Opt4 implements Contract {
    
    public static readonly storageReserve = 0n;
    
    static async init() {
        return await Opt4_init();
    }
    
    static async fromInit() {
        const __gen_init = await Opt4_init();
        const address = contractAddress(0, __gen_init);
        return new Opt4(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new Opt4(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Opt4_types,
        getters: Opt4_getters,
        receivers: Opt4_receivers,
        errors: Opt4_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | OptAddr) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'OptAddr') {
            body = beginCell().store(storeOptAddr(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getZ(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(122845 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
}