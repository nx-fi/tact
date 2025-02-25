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

export type Update = {
    $$type: 'Update';
    a: bigint;
    b: boolean;
    c: Cell;
    d: Slice;
    e: Builder;
    f: string;
}

export function storeUpdate(src: Update) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2217298645, 32);
        b_0.storeInt(src.a, 257);
        b_0.storeBit(src.b);
        b_0.storeRef(src.c);
        b_0.storeRef(src.d.asCell());
        const b_1 = new Builder();
        b_1.storeRef(src.e.asCell());
        b_1.storeStringRefTail(src.f);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdate(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2217298645) { throw Error('Invalid prefix'); }
    const _a = sc_0.loadIntBig(257);
    const _b = sc_0.loadBit();
    const _c = sc_0.loadRef();
    const _d = sc_0.loadRef().asSlice();
    const sc_1 = sc_0.loadRef().beginParse();
    const _e = sc_1.loadRef().asBuilder();
    const _f = sc_1.loadStringRefTail();
    return { $$type: 'Update' as const, a: _a, b: _b, c: _c, d: _d, e: _e, f: _f };
}

function loadTupleUpdate(source: TupleReader) {
    const _a = source.readBigNumber();
    const _b = source.readBoolean();
    const _c = source.readCell();
    const _d = source.readCell().asSlice();
    const _e = source.readCell().asBuilder();
    const _f = source.readString();
    return { $$type: 'Update' as const, a: _a, b: _b, c: _c, d: _d, e: _e, f: _f };
}

function loadGetterTupleUpdate(source: TupleReader) {
    const _a = source.readBigNumber();
    const _b = source.readBoolean();
    const _c = source.readCell();
    const _d = source.readCell().asSlice();
    const _e = source.readCell().asBuilder();
    const _f = source.readString();
    return { $$type: 'Update' as const, a: _a, b: _b, c: _c, d: _d, e: _e, f: _f };
}

function storeTupleUpdate(source: Update) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeBoolean(source.b);
    builder.writeCell(source.c);
    builder.writeSlice(source.d.asCell());
    builder.writeBuilder(source.e.asCell());
    builder.writeString(source.f);
    return builder.build();
}

function dictValueParserUpdate(): DictionaryValue<Update> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdate(src)).endCell());
        },
        parse: (src) => {
            return loadUpdate(src.loadRef().beginParse());
        }
    }
}

export type SerializationTester3$Data = {
    $$type: 'SerializationTester3$Data';
    a: bigint;
    b: boolean;
    c: Cell;
    d: Slice;
    e: Builder;
    f: string;
}

export function storeSerializationTester3$Data(src: SerializationTester3$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
        b_0.storeBit(src.b);
        b_0.storeRef(src.c);
        b_0.storeRef(src.d.asCell());
        const b_1 = new Builder();
        b_1.storeRef(src.e.asCell());
        b_1.storeStringRefTail(src.f);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSerializationTester3$Data(slice: Slice) {
    const sc_0 = slice;
    const _a = sc_0.loadIntBig(257);
    const _b = sc_0.loadBit();
    const _c = sc_0.loadRef();
    const _d = sc_0.loadRef().asSlice();
    const sc_1 = sc_0.loadRef().beginParse();
    const _e = sc_1.loadRef().asBuilder();
    const _f = sc_1.loadStringRefTail();
    return { $$type: 'SerializationTester3$Data' as const, a: _a, b: _b, c: _c, d: _d, e: _e, f: _f };
}

function loadTupleSerializationTester3$Data(source: TupleReader) {
    const _a = source.readBigNumber();
    const _b = source.readBoolean();
    const _c = source.readCell();
    const _d = source.readCell().asSlice();
    const _e = source.readCell().asBuilder();
    const _f = source.readString();
    return { $$type: 'SerializationTester3$Data' as const, a: _a, b: _b, c: _c, d: _d, e: _e, f: _f };
}

function loadGetterTupleSerializationTester3$Data(source: TupleReader) {
    const _a = source.readBigNumber();
    const _b = source.readBoolean();
    const _c = source.readCell();
    const _d = source.readCell().asSlice();
    const _e = source.readCell().asBuilder();
    const _f = source.readString();
    return { $$type: 'SerializationTester3$Data' as const, a: _a, b: _b, c: _c, d: _d, e: _e, f: _f };
}

function storeTupleSerializationTester3$Data(source: SerializationTester3$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeBoolean(source.b);
    builder.writeCell(source.c);
    builder.writeSlice(source.d.asCell());
    builder.writeBuilder(source.e.asCell());
    builder.writeString(source.f);
    return builder.build();
}

function dictValueParserSerializationTester3$Data(): DictionaryValue<SerializationTester3$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSerializationTester3$Data(src)).endCell());
        },
        parse: (src) => {
            return loadSerializationTester3$Data(src.loadRef().beginParse());
        }
    }
}

 type SerializationTester3_init_args = {
    $$type: 'SerializationTester3_init_args';
    a: bigint;
    b: boolean;
    c: Cell;
    d: Slice;
    e: Builder;
    f: string;
}

function initSerializationTester3_init_args(src: SerializationTester3_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
        b_0.storeBit(src.b);
        b_0.storeRef(src.c);
        const b_1 = new Builder();
        b_1.storeRef(src.d.asCell());
        b_1.storeRef(src.e.asCell());
        b_1.storeStringRefTail(src.f);
        b_0.storeRef(b_1.endCell());
    };
}

async function SerializationTester3_init(a: bigint, b: boolean, c: Cell, d: Slice, e: Builder, f: string) {
    const __code = Cell.fromBase64('te6ccgECGAEAAckAART/APSkE/S88sgLAQIBYgIDA/bQAdBy1yHSANIA+kAhEDRQZm8E+GEC+GLbPAeSXwfgcCbXSSDCH5UxBtMfB94hghCEKUrVuo67EHhfCNs8bBbIfwHKAFVQUFaBAQHPABPKAMzIyFADzxbJWMzIA8nQE88WyVjMyFADzxbJWMzJAczJ7VTgN8AABsEhFrAVBAUCAVgGBwBGgQEB1wDSANTUAdAB1AHQyAHUAdASzxYB1DDQECYQJRAkECMAfo43EDVVEsh/AcoAVVBQVoEBAc8AE8oAzMjIUAPPFslYzMgDydATzxbJWMzIUAPPFslYzMkBzMntVOBfBvLAggIBIAgJAgEgDxACEbafe2ebZ42MMBUKAgEgCwwAAiACEbEmNs82zxsYYBUNAhGxLnbPNs8bGGAVDgACIQACIgIBIBESAhG0g5tnm2eNjDAVFgIRsRe2zzbPGxhgFRMCEbEf9s82zxsYYBUUAAIjAAIkAWTtRNDSAAGOI4EBAdcA0gDU1AHQ1AHQyALUAdATzxYC1DDQEDYQNRA0EmwW4Ns8BtFVBBcAAiUAQoEBAdcA0gDU1AHQ1AHQyALUAdATzxYC1DDQEDYQNRA0Eg==');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initSerializationTester3_init_args({ $$type: 'SerializationTester3_init_args', a, b, c, d, e, f })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const SerializationTester3_errors: { [key: number]: { message: string } } = {
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

const SerializationTester3_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Update","header":2217298645,"fields":[{"name":"a","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"b","type":{"kind":"simple","type":"bool","optional":false}},{"name":"c","type":{"kind":"simple","type":"cell","optional":false}},{"name":"d","type":{"kind":"simple","type":"slice","optional":false}},{"name":"e","type":{"kind":"simple","type":"builder","optional":false}},{"name":"f","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"SerializationTester3$Data","header":null,"fields":[{"name":"a","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"b","type":{"kind":"simple","type":"bool","optional":false}},{"name":"c","type":{"kind":"simple","type":"cell","optional":false}},{"name":"d","type":{"kind":"simple","type":"slice","optional":false}},{"name":"e","type":{"kind":"simple","type":"builder","optional":false}},{"name":"f","type":{"kind":"simple","type":"string","optional":false}}]},
]

const SerializationTester3_getters: ABIGetter[] = [
    {"name":"getA","methodId":123932,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getB","methodId":119935,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"getC","methodId":115806,"arguments":[],"returnType":{"kind":"simple","type":"cell","optional":false}},
    {"name":"getD","methodId":111801,"arguments":[],"returnType":{"kind":"simple","type":"slice","optional":false}},
    {"name":"getE","methodId":107672,"arguments":[],"returnType":{"kind":"simple","type":"builder","optional":false}},
    {"name":"getF","methodId":103675,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
]

export const SerializationTester3_getterMapping: { [key: string]: string } = {
    'getA': 'getGetA',
    'getB': 'getGetB',
    'getC': 'getGetC',
    'getD': 'getGetD',
    'getE': 'getGetE',
    'getF': 'getGetF',
}

const SerializationTester3_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Update"}},
]

export class SerializationTester3 implements Contract {
    
    static async init(a: bigint, b: boolean, c: Cell, d: Slice, e: Builder, f: string) {
        return await SerializationTester3_init(a, b, c, d, e, f);
    }
    
    static async fromInit(a: bigint, b: boolean, c: Cell, d: Slice, e: Builder, f: string) {
        const __gen_init = await SerializationTester3_init(a, b, c, d, e, f);
        const address = contractAddress(0, __gen_init);
        return new SerializationTester3(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new SerializationTester3(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  SerializationTester3_types,
        getters: SerializationTester3_getters,
        receivers: SerializationTester3_receivers,
        errors: SerializationTester3_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | Update) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Update') {
            body = beginCell().store(storeUpdate(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetA(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(123932 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getGetB(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(119935 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getGetC(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(115806 as any, builder.build())).stack;
        const result = source.readCell();
        return result;
    }
    
    async getGetD(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(111801 as any, builder.build())).stack;
        const result = source.readCell().asSlice();
        return result;
    }
    
    async getGetE(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(107672 as any, builder.build())).stack;
        const result = source.readCell().asBuilder();
        return result;
    }
    
    async getGetF(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(103675 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
}