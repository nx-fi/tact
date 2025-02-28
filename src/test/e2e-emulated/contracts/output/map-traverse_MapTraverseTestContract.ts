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

export type MyStruct = {
    $$type: 'MyStruct';
    a: bigint;
    b: boolean;
}

export function storeMyStruct(src: MyStruct) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
        b_0.storeBit(src.b);
    };
}

export function loadMyStruct(slice: Slice) {
    const sc_0 = slice;
    const _a = sc_0.loadIntBig(257);
    const _b = sc_0.loadBit();
    return { $$type: 'MyStruct' as const, a: _a, b: _b };
}

function loadTupleMyStruct(source: TupleReader) {
    const _a = source.readBigNumber();
    const _b = source.readBoolean();
    return { $$type: 'MyStruct' as const, a: _a, b: _b };
}

function loadGetterTupleMyStruct(source: TupleReader) {
    const _a = source.readBigNumber();
    const _b = source.readBoolean();
    return { $$type: 'MyStruct' as const, a: _a, b: _b };
}

function storeTupleMyStruct(source: MyStruct) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeBoolean(source.b);
    return builder.build();
}

function dictValueParserMyStruct(): DictionaryValue<MyStruct> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMyStruct(src)).endCell());
        },
        parse: (src) => {
            return loadMyStruct(src.loadRef().beginParse());
        }
    }
}

export type MyStructWithMap = {
    $$type: 'MyStructWithMap';
    m: Dictionary<bigint, bigint>;
}

export function storeMyStructWithMap(src: MyStructWithMap) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeDict(src.m, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
    };
}

export function loadMyStructWithMap(slice: Slice) {
    const sc_0 = slice;
    const _m = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_0);
    return { $$type: 'MyStructWithMap' as const, m: _m };
}

function loadTupleMyStructWithMap(source: TupleReader) {
    const _m = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'MyStructWithMap' as const, m: _m };
}

function loadGetterTupleMyStructWithMap(source: TupleReader) {
    const _m = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'MyStructWithMap' as const, m: _m };
}

function storeTupleMyStructWithMap(source: MyStructWithMap) {
    const builder = new TupleBuilder();
    builder.writeCell(source.m.size > 0 ? beginCell().storeDictDirect(source.m, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257)).endCell() : null);
    return builder.build();
}

function dictValueParserMyStructWithMap(): DictionaryValue<MyStructWithMap> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMyStructWithMap(src)).endCell());
        },
        parse: (src) => {
            return loadMyStructWithMap(src.loadRef().beginParse());
        }
    }
}

export type MapTraverseTestContract$Data = {
    $$type: 'MapTraverseTestContract$Data';
    m: Dictionary<bigint, bigint>;
    s: MyStructWithMap;
}

export function storeMapTraverseTestContract$Data(src: MapTraverseTestContract$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeDict(src.m, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
        b_0.store(storeMyStructWithMap(src.s));
    };
}

export function loadMapTraverseTestContract$Data(slice: Slice) {
    const sc_0 = slice;
    const _m = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_0);
    const _s = loadMyStructWithMap(sc_0);
    return { $$type: 'MapTraverseTestContract$Data' as const, m: _m, s: _s };
}

function loadTupleMapTraverseTestContract$Data(source: TupleReader) {
    const _m = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    const _s = loadTupleMyStructWithMap(source);
    return { $$type: 'MapTraverseTestContract$Data' as const, m: _m, s: _s };
}

function loadGetterTupleMapTraverseTestContract$Data(source: TupleReader) {
    const _m = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    const _s = loadGetterTupleMyStructWithMap(source);
    return { $$type: 'MapTraverseTestContract$Data' as const, m: _m, s: _s };
}

function storeTupleMapTraverseTestContract$Data(source: MapTraverseTestContract$Data) {
    const builder = new TupleBuilder();
    builder.writeCell(source.m.size > 0 ? beginCell().storeDictDirect(source.m, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeTuple(storeTupleMyStructWithMap(source.s));
    return builder.build();
}

function dictValueParserMapTraverseTestContract$Data(): DictionaryValue<MapTraverseTestContract$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMapTraverseTestContract$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMapTraverseTestContract$Data(src.loadRef().beginParse());
        }
    }
}

 type MapTraverseTestContract_init_args = {
    $$type: 'MapTraverseTestContract_init_args';
}

function initMapTraverseTestContract_init_args(src: MapTraverseTestContract_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function MapTraverseTestContract_init() {
    const __code = Cell.fromBase64('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');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initMapTraverseTestContract_init_args({ $$type: 'MapTraverseTestContract_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const MapTraverseTestContract_errors: { [key: number]: { message: string } } = {
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

const MapTraverseTestContract_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"MyStruct","header":null,"fields":[{"name":"a","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"b","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MyStructWithMap","header":null,"fields":[{"name":"m","type":{"kind":"dict","key":"int","value":"int"}}]},
    {"name":"MapTraverseTestContract$Data","header":null,"fields":[{"name":"m","type":{"kind":"dict","key":"int","value":"int"}},{"name":"s","type":{"kind":"simple","type":"MyStructWithMap","optional":false}}]},
]

const MapTraverseTestContract_getters: ABIGetter[] = [
    {"name":"test_int_int","methodId":115949,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"test_int_coins","methodId":106986,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"test_int_varint16","methodId":117373,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"test_int_bool","methodId":77636,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"test_int_cell","methodId":117602,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"test_int_address","methodId":83640,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"test_int_struct","methodId":79520,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"test_address_int","methodId":65769,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"test_address_coins","methodId":80894,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"test_address_varint16","methodId":113202,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"test_address_bool","methodId":111244,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"test_address_cell","methodId":87722,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"test_address_address","methodId":123693,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"test_address_struct","methodId":65619,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"test_empty_map","methodId":96611,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"test_null","methodId":112186,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"test_map_modification_during_traversal1","methodId":104258,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"test_map_modification_during_traversal2","methodId":108321,"arguments":[],"returnType":null},
    {"name":"test_map_size","methodId":73341,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"test_map_as_field","methodId":95491,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"test_map_as_struct_field","methodId":79374,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

export const MapTraverseTestContract_getterMapping: { [key: string]: string } = {
    'test_int_int': 'getTestIntInt',
    'test_int_coins': 'getTestIntCoins',
    'test_int_varint16': 'getTestIntVarint16',
    'test_int_bool': 'getTestIntBool',
    'test_int_cell': 'getTestIntCell',
    'test_int_address': 'getTestIntAddress',
    'test_int_struct': 'getTestIntStruct',
    'test_address_int': 'getTestAddressInt',
    'test_address_coins': 'getTestAddressCoins',
    'test_address_varint16': 'getTestAddressVarint16',
    'test_address_bool': 'getTestAddressBool',
    'test_address_cell': 'getTestAddressCell',
    'test_address_address': 'getTestAddressAddress',
    'test_address_struct': 'getTestAddressStruct',
    'test_empty_map': 'getTestEmptyMap',
    'test_null': 'getTestNull',
    'test_map_modification_during_traversal1': 'getTestMapModificationDuringTraversal1',
    'test_map_modification_during_traversal2': 'getTestMapModificationDuringTraversal2',
    'test_map_size': 'getTestMapSize',
    'test_map_as_field': 'getTestMapAsField',
    'test_map_as_struct_field': 'getTestMapAsStructField',
}

const MapTraverseTestContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
]


export class MapTraverseTestContract implements Contract {
    
    public static readonly storageReserve = 0n;
    
    static async init() {
        return await MapTraverseTestContract_init();
    }
    
    static async fromInit() {
        const __gen_init = await MapTraverseTestContract_init();
        const address = contractAddress(0, __gen_init);
        return new MapTraverseTestContract(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new MapTraverseTestContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  MapTraverseTestContract_types,
        getters: MapTraverseTestContract_getters,
        receivers: MapTraverseTestContract_receivers,
        errors: MapTraverseTestContract_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getTestIntInt(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(115949 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getTestIntCoins(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(106986 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getTestIntVarint16(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(117373 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getTestIntBool(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(77636 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getTestIntCell(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(117602 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getTestIntAddress(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(83640 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getTestIntStruct(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(79520 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getTestAddressInt(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(65769 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getTestAddressCoins(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(80894 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getTestAddressVarint16(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(113202 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getTestAddressBool(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(111244 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getTestAddressCell(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(87722 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getTestAddressAddress(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(123693 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getTestAddressStruct(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(65619 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getTestEmptyMap(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(96611 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getTestNull(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(112186 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getTestMapModificationDuringTraversal1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(104258 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getTestMapModificationDuringTraversal2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(108321 as any, builder.build())).stack;
    }
    
    async getTestMapSize(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(73341 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getTestMapAsField(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(95491 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getTestMapAsStructField(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(79374 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
}