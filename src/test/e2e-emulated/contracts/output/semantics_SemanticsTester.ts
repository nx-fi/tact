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

export type SA = {
    $$type: 'SA';
    a1: bigint;
    a2: SB;
}

export function storeSA(src: SA) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a1, 257);
        b_0.store(storeSB(src.a2));
    };
}

export function loadSA(slice: Slice) {
    const sc_0 = slice;
    const _a1 = sc_0.loadIntBig(257);
    const _a2 = loadSB(sc_0);
    return { $$type: 'SA' as const, a1: _a1, a2: _a2 };
}

function loadTupleSA(source: TupleReader) {
    const _a1 = source.readBigNumber();
    const _a2 = loadTupleSB(source);
    return { $$type: 'SA' as const, a1: _a1, a2: _a2 };
}

function loadGetterTupleSA(source: TupleReader) {
    const _a1 = source.readBigNumber();
    const _a2 = loadGetterTupleSB(source);
    return { $$type: 'SA' as const, a1: _a1, a2: _a2 };
}

function storeTupleSA(source: SA) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.a1);
    builder.writeTuple(storeTupleSB(source.a2));
    return builder.build();
}

function dictValueParserSA(): DictionaryValue<SA> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSA(src)).endCell());
        },
        parse: (src) => {
            return loadSA(src.loadRef().beginParse());
        }
    }
}

export type SB = {
    $$type: 'SB';
    b1: boolean;
    b2: SC;
    b3: bigint;
}

export function storeSB(src: SB) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.b1);
        b_0.store(storeSC(src.b2));
        b_0.storeInt(src.b3, 257);
    };
}

export function loadSB(slice: Slice) {
    const sc_0 = slice;
    const _b1 = sc_0.loadBit();
    const _b2 = loadSC(sc_0);
    const _b3 = sc_0.loadIntBig(257);
    return { $$type: 'SB' as const, b1: _b1, b2: _b2, b3: _b3 };
}

function loadTupleSB(source: TupleReader) {
    const _b1 = source.readBoolean();
    const _b2 = loadTupleSC(source);
    const _b3 = source.readBigNumber();
    return { $$type: 'SB' as const, b1: _b1, b2: _b2, b3: _b3 };
}

function loadGetterTupleSB(source: TupleReader) {
    const _b1 = source.readBoolean();
    const _b2 = loadGetterTupleSC(source);
    const _b3 = source.readBigNumber();
    return { $$type: 'SB' as const, b1: _b1, b2: _b2, b3: _b3 };
}

function storeTupleSB(source: SB) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.b1);
    builder.writeTuple(storeTupleSC(source.b2));
    builder.writeNumber(source.b3);
    return builder.build();
}

function dictValueParserSB(): DictionaryValue<SB> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSB(src)).endCell());
        },
        parse: (src) => {
            return loadSB(src.loadRef().beginParse());
        }
    }
}

export type SC = {
    $$type: 'SC';
    c1: bigint;
}

export function storeSC(src: SC) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.c1, 257);
    };
}

export function loadSC(slice: Slice) {
    const sc_0 = slice;
    const _c1 = sc_0.loadIntBig(257);
    return { $$type: 'SC' as const, c1: _c1 };
}

function loadTupleSC(source: TupleReader) {
    const _c1 = source.readBigNumber();
    return { $$type: 'SC' as const, c1: _c1 };
}

function loadGetterTupleSC(source: TupleReader) {
    const _c1 = source.readBigNumber();
    return { $$type: 'SC' as const, c1: _c1 };
}

function storeTupleSC(source: SC) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.c1);
    return builder.build();
}

function dictValueParserSC(): DictionaryValue<SC> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSC(src)).endCell());
        },
        parse: (src) => {
            return loadSC(src.loadRef().beginParse());
        }
    }
}

export type MapWrapper = {
    $$type: 'MapWrapper';
    m: Dictionary<bigint, SA>;
}

export function storeMapWrapper(src: MapWrapper) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeDict(src.m, Dictionary.Keys.BigInt(257), dictValueParserSA());
    };
}

export function loadMapWrapper(slice: Slice) {
    const sc_0 = slice;
    const _m = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserSA(), sc_0);
    return { $$type: 'MapWrapper' as const, m: _m };
}

function loadTupleMapWrapper(source: TupleReader) {
    const _m = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserSA(), source.readCellOpt());
    return { $$type: 'MapWrapper' as const, m: _m };
}

function loadGetterTupleMapWrapper(source: TupleReader) {
    const _m = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserSA(), source.readCellOpt());
    return { $$type: 'MapWrapper' as const, m: _m };
}

function storeTupleMapWrapper(source: MapWrapper) {
    const builder = new TupleBuilder();
    builder.writeCell(source.m.size > 0 ? beginCell().storeDictDirect(source.m, Dictionary.Keys.BigInt(257), dictValueParserSA()).endCell() : null);
    return builder.build();
}

function dictValueParserMapWrapper(): DictionaryValue<MapWrapper> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMapWrapper(src)).endCell());
        },
        parse: (src) => {
            return loadMapWrapper(src.loadRef().beginParse());
        }
    }
}

export type SemanticsTester$Data = {
    $$type: 'SemanticsTester$Data';
    sC: SC;
    sB: SB;
    sA: SA;
    uB: SB;
    mA: Dictionary<bigint, SA>;
    mB: Dictionary<bigint, boolean>;
    mC: Dictionary<bigint, MapWrapper>;
    mutateContractStateResult: boolean;
}

export function storeSemanticsTester$Data(src: SemanticsTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.store(storeSC(src.sC));
        b_0.store(storeSB(src.sB));
        const b_1 = new Builder();
        b_1.store(storeSA(src.sA));
        const b_2 = new Builder();
        b_2.store(storeSB(src.uB));
        b_2.storeDict(src.mA, Dictionary.Keys.BigInt(257), dictValueParserSA());
        b_2.storeDict(src.mB, Dictionary.Keys.BigInt(257), Dictionary.Values.Bool());
        b_2.storeDict(src.mC, Dictionary.Keys.BigInt(257), dictValueParserMapWrapper());
        b_2.storeBit(src.mutateContractStateResult);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSemanticsTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _sC = loadSC(sc_0);
    const _sB = loadSB(sc_0);
    const sc_1 = sc_0.loadRef().beginParse();
    const _sA = loadSA(sc_1);
    const sc_2 = sc_1.loadRef().beginParse();
    const _uB = loadSB(sc_2);
    const _mA = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserSA(), sc_2);
    const _mB = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Bool(), sc_2);
    const _mC = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserMapWrapper(), sc_2);
    const _mutateContractStateResult = sc_2.loadBit();
    return { $$type: 'SemanticsTester$Data' as const, sC: _sC, sB: _sB, sA: _sA, uB: _uB, mA: _mA, mB: _mB, mC: _mC, mutateContractStateResult: _mutateContractStateResult };
}

function loadTupleSemanticsTester$Data(source: TupleReader) {
    const _sC = loadTupleSC(source);
    const _sB = loadTupleSB(source);
    const _sA = loadTupleSA(source);
    const _uB = loadTupleSB(source);
    const _mA = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserSA(), source.readCellOpt());
    const _mB = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Bool(), source.readCellOpt());
    const _mC = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserMapWrapper(), source.readCellOpt());
    const _mutateContractStateResult = source.readBoolean();
    return { $$type: 'SemanticsTester$Data' as const, sC: _sC, sB: _sB, sA: _sA, uB: _uB, mA: _mA, mB: _mB, mC: _mC, mutateContractStateResult: _mutateContractStateResult };
}

function loadGetterTupleSemanticsTester$Data(source: TupleReader) {
    const _sC = loadGetterTupleSC(source);
    const _sB = loadGetterTupleSB(source);
    const _sA = loadGetterTupleSA(source);
    const _uB = loadGetterTupleSB(source);
    const _mA = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserSA(), source.readCellOpt());
    const _mB = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Bool(), source.readCellOpt());
    const _mC = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserMapWrapper(), source.readCellOpt());
    const _mutateContractStateResult = source.readBoolean();
    return { $$type: 'SemanticsTester$Data' as const, sC: _sC, sB: _sB, sA: _sA, uB: _uB, mA: _mA, mB: _mB, mC: _mC, mutateContractStateResult: _mutateContractStateResult };
}

function storeTupleSemanticsTester$Data(source: SemanticsTester$Data) {
    const builder = new TupleBuilder();
    builder.writeTuple(storeTupleSC(source.sC));
    builder.writeTuple(storeTupleSB(source.sB));
    builder.writeTuple(storeTupleSA(source.sA));
    builder.writeTuple(storeTupleSB(source.uB));
    builder.writeCell(source.mA.size > 0 ? beginCell().storeDictDirect(source.mA, Dictionary.Keys.BigInt(257), dictValueParserSA()).endCell() : null);
    builder.writeCell(source.mB.size > 0 ? beginCell().storeDictDirect(source.mB, Dictionary.Keys.BigInt(257), Dictionary.Values.Bool()).endCell() : null);
    builder.writeCell(source.mC.size > 0 ? beginCell().storeDictDirect(source.mC, Dictionary.Keys.BigInt(257), dictValueParserMapWrapper()).endCell() : null);
    builder.writeBoolean(source.mutateContractStateResult);
    return builder.build();
}

function dictValueParserSemanticsTester$Data(): DictionaryValue<SemanticsTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSemanticsTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadSemanticsTester$Data(src.loadRef().beginParse());
        }
    }
}

 type SemanticsTester_init_args = {
    $$type: 'SemanticsTester_init_args';
}

function initSemanticsTester_init_args(src: SemanticsTester_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function SemanticsTester_init() {
    const __code = Cell.fromBase64('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');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initSemanticsTester_init_args({ $$type: 'SemanticsTester_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const SemanticsTester_errors: { [key: number]: { message: string } } = {
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

const SemanticsTester_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SA","header":null,"fields":[{"name":"a1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"a2","type":{"kind":"simple","type":"SB","optional":false}}]},
    {"name":"SB","header":null,"fields":[{"name":"b1","type":{"kind":"simple","type":"bool","optional":false}},{"name":"b2","type":{"kind":"simple","type":"SC","optional":false}},{"name":"b3","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SC","header":null,"fields":[{"name":"c1","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"MapWrapper","header":null,"fields":[{"name":"m","type":{"kind":"dict","key":"int","value":"SA","valueFormat":"ref"}}]},
    {"name":"SemanticsTester$Data","header":null,"fields":[{"name":"sC","type":{"kind":"simple","type":"SC","optional":false}},{"name":"sB","type":{"kind":"simple","type":"SB","optional":false}},{"name":"sA","type":{"kind":"simple","type":"SA","optional":false}},{"name":"uB","type":{"kind":"simple","type":"SB","optional":false}},{"name":"mA","type":{"kind":"dict","key":"int","value":"SA","valueFormat":"ref"}},{"name":"mB","type":{"kind":"dict","key":"int","value":"bool"}},{"name":"mC","type":{"kind":"dict","key":"int","value":"MapWrapper","valueFormat":"ref"}},{"name":"mutateContractStateResult","type":{"kind":"simple","type":"bool","optional":false}}]},
]

const SemanticsTester_getters: ABIGetter[] = [
    {"name":"checkAllContractFieldsAreUnchanged","methodId":89972,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"structAssign1","methodId":126129,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"structAssign2","methodId":122066,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"paramStruct1","methodId":101710,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"paramStruct2","methodId":113965,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"mutateParamStruct1","methodId":122731,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"mutateParamStruct2","methodId":126728,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"testReturnedStructs","methodId":120944,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"mutatesChainStruct1","methodId":111427,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"mutatesChainStruct2","methodId":99104,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"mutatesChainStruct3","methodId":103169,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"mutatesChainStruct4","methodId":123878,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"mutatesChainStruct5","methodId":127943,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"mutatesChainStruct6","methodId":115620,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"mapAssign1","methodId":116618,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"mapAssign2","methodId":129001,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"paramMap1","methodId":94790,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"paramMap2","methodId":82469,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"mutateParamMap1","methodId":78185,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"mutateParamMap2","methodId":65802,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"testReturnedMaps1","methodId":110855,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"mutateNestedMap1","methodId":118490,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"contractAssign1","methodId":127255,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"contractAssign2","methodId":115060,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"paramContract","methodId":92093,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"mutateParamContract","methodId":79882,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"address","methodId":69216,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"testReturnedContracts","methodId":113327,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"mutateContractStateFlag","methodId":67465,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"changesPersisted","methodId":76822,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"mutatesChainInt1","methodId":119936,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"mutatesChainInt2","methodId":124131,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"mutatesChainInt3","methodId":128194,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"mutatesChainInt4","methodId":99365,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"mutatesChainInt5","methodId":103428,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"mutatesChainInt6","methodId":107623,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"andMutateShortCircuit","methodId":119163,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"andInfiniteLoopShortCircuit","methodId":110116,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"andExceptionShortCircuit","methodId":68264,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"orMutateShortCircuit","methodId":127918,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"orInfiniteLoopShortCircuit","methodId":66777,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"orExceptionShortCircuit","methodId":67804,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"ternaryMutateShortCircuit","methodId":73382,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"ternaryInfiniteLoopShortCircuit","methodId":115599,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"ternaryExceptionShortCircuit","methodId":90901,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"testAddressEquality","methodId":92871,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"testInversesParseStdAddressAndNewAddress","methodId":109118,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"testSliceEquality1","methodId":83228,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"testSliceEquality2","methodId":95615,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"testCellEquality1","methodId":91507,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"testCellEquality2","methodId":87312,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"testCellEquality3","methodId":83249,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
]

export const SemanticsTester_getterMapping: { [key: string]: string } = {
    'checkAllContractFieldsAreUnchanged': 'getCheckAllContractFieldsAreUnchanged',
    'structAssign1': 'getStructAssign1',
    'structAssign2': 'getStructAssign2',
    'paramStruct1': 'getParamStruct1',
    'paramStruct2': 'getParamStruct2',
    'mutateParamStruct1': 'getMutateParamStruct1',
    'mutateParamStruct2': 'getMutateParamStruct2',
    'testReturnedStructs': 'getTestReturnedStructs',
    'mutatesChainStruct1': 'getMutatesChainStruct1',
    'mutatesChainStruct2': 'getMutatesChainStruct2',
    'mutatesChainStruct3': 'getMutatesChainStruct3',
    'mutatesChainStruct4': 'getMutatesChainStruct4',
    'mutatesChainStruct5': 'getMutatesChainStruct5',
    'mutatesChainStruct6': 'getMutatesChainStruct6',
    'mapAssign1': 'getMapAssign1',
    'mapAssign2': 'getMapAssign2',
    'paramMap1': 'getParamMap1',
    'paramMap2': 'getParamMap2',
    'mutateParamMap1': 'getMutateParamMap1',
    'mutateParamMap2': 'getMutateParamMap2',
    'testReturnedMaps1': 'getTestReturnedMaps1',
    'mutateNestedMap1': 'getMutateNestedMap1',
    'contractAssign1': 'getContractAssign1',
    'contractAssign2': 'getContractAssign2',
    'paramContract': 'getParamContract',
    'mutateParamContract': 'getMutateParamContract',
    'address': 'getAddress',
    'testReturnedContracts': 'getTestReturnedContracts',
    'mutateContractStateFlag': 'getMutateContractStateFlag',
    'changesPersisted': 'getChangesPersisted',
    'mutatesChainInt1': 'getMutatesChainInt1',
    'mutatesChainInt2': 'getMutatesChainInt2',
    'mutatesChainInt3': 'getMutatesChainInt3',
    'mutatesChainInt4': 'getMutatesChainInt4',
    'mutatesChainInt5': 'getMutatesChainInt5',
    'mutatesChainInt6': 'getMutatesChainInt6',
    'andMutateShortCircuit': 'getAndMutateShortCircuit',
    'andInfiniteLoopShortCircuit': 'getAndInfiniteLoopShortCircuit',
    'andExceptionShortCircuit': 'getAndExceptionShortCircuit',
    'orMutateShortCircuit': 'getOrMutateShortCircuit',
    'orInfiniteLoopShortCircuit': 'getOrInfiniteLoopShortCircuit',
    'orExceptionShortCircuit': 'getOrExceptionShortCircuit',
    'ternaryMutateShortCircuit': 'getTernaryMutateShortCircuit',
    'ternaryInfiniteLoopShortCircuit': 'getTernaryInfiniteLoopShortCircuit',
    'ternaryExceptionShortCircuit': 'getTernaryExceptionShortCircuit',
    'testAddressEquality': 'getTestAddressEquality',
    'testInversesParseStdAddressAndNewAddress': 'getTestInversesParseStdAddressAndNewAddress',
    'testSliceEquality1': 'getTestSliceEquality1',
    'testSliceEquality2': 'getTestSliceEquality2',
    'testCellEquality1': 'getTestCellEquality1',
    'testCellEquality2': 'getTestCellEquality2',
    'testCellEquality3': 'getTestCellEquality3',
}

const SemanticsTester_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"text","text":"mutate"}},
]

export class SemanticsTester implements Contract {
    
    static async init() {
        return await SemanticsTester_init();
    }
    
    static async fromInit() {
        const __gen_init = await SemanticsTester_init();
        const address = contractAddress(0, __gen_init);
        return new SemanticsTester(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new SemanticsTester(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  SemanticsTester_types,
        getters: SemanticsTester_getters,
        receivers: SemanticsTester_receivers,
        errors: SemanticsTester_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | "mutate") {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message === "mutate") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getCheckAllContractFieldsAreUnchanged(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(89972 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getStructAssign1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(126129 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getStructAssign2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(122066 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getParamStruct1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(101710 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getParamStruct2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(113965 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getMutateParamStruct1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(122731 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getMutateParamStruct2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(126728 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getTestReturnedStructs(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(120944 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getMutatesChainStruct1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(111427 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getMutatesChainStruct2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(99104 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getMutatesChainStruct3(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(103169 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getMutatesChainStruct4(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(123878 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getMutatesChainStruct5(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(127943 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getMutatesChainStruct6(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(115620 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getMapAssign1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(116618 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getMapAssign2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(129001 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getParamMap1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(94790 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getParamMap2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(82469 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getMutateParamMap1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(78185 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getMutateParamMap2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(65802 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getTestReturnedMaps1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(110855 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getMutateNestedMap1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(118490 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getContractAssign1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(127255 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getContractAssign2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(115060 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getParamContract(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(92093 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getMutateParamContract(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(79882 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getAddress(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(69216 as any, builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
    async getTestReturnedContracts(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(113327 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getMutateContractStateFlag(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(67465 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getChangesPersisted(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(76822 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getMutatesChainInt1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(119936 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getMutatesChainInt2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(124131 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getMutatesChainInt3(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(128194 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getMutatesChainInt4(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(99365 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getMutatesChainInt5(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(103428 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getMutatesChainInt6(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(107623 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getAndMutateShortCircuit(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(119163 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getAndInfiniteLoopShortCircuit(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(110116 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getAndExceptionShortCircuit(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(68264 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getOrMutateShortCircuit(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(127918 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getOrInfiniteLoopShortCircuit(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(66777 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getOrExceptionShortCircuit(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(67804 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getTernaryMutateShortCircuit(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(73382 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getTernaryInfiniteLoopShortCircuit(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(115599 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getTernaryExceptionShortCircuit(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(90901 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getTestAddressEquality(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(92871 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getTestInversesParseStdAddressAndNewAddress(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(109118 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getTestSliceEquality1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(83228 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getTestSliceEquality2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(95615 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getTestCellEquality1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(91507 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getTestCellEquality2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(87312 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getTestCellEquality3(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(83249 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
}