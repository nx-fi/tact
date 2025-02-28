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

export type DeployParamsMsg = {
    $$type: 'DeployParamsMsg';
    mode: bigint;
    bounce: boolean;
    contractNum: bigint;
    body: Slice;
}

export function storeDeployParamsMsg(src: DeployParamsMsg) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2666878717, 32);
        b_0.storeUint(src.mode, 8);
        b_0.storeBit(src.bounce);
        b_0.storeInt(src.contractNum, 257);
        b_0.storeBuilder(src.body.asBuilder());
    };
}

export function loadDeployParamsMsg(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2666878717) { throw Error('Invalid prefix'); }
    const _mode = sc_0.loadUintBig(8);
    const _bounce = sc_0.loadBit();
    const _contractNum = sc_0.loadIntBig(257);
    const _body = sc_0;
    return { $$type: 'DeployParamsMsg' as const, mode: _mode, bounce: _bounce, contractNum: _contractNum, body: _body };
}

function loadTupleDeployParamsMsg(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _contractNum = source.readBigNumber();
    const _body = source.readCell().asSlice();
    return { $$type: 'DeployParamsMsg' as const, mode: _mode, bounce: _bounce, contractNum: _contractNum, body: _body };
}

function loadGetterTupleDeployParamsMsg(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _contractNum = source.readBigNumber();
    const _body = source.readCell().asSlice();
    return { $$type: 'DeployParamsMsg' as const, mode: _mode, bounce: _bounce, contractNum: _contractNum, body: _body };
}

function storeTupleDeployParamsMsg(source: DeployParamsMsg) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeBoolean(source.bounce);
    builder.writeNumber(source.contractNum);
    builder.writeSlice(source.body.asCell());
    return builder.build();
}

function dictValueParserDeployParamsMsg(): DictionaryValue<DeployParamsMsg> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployParamsMsg(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParamsMsg(src.loadRef().beginParse());
        }
    }
}

export type DeployComparisonMsg = {
    $$type: 'DeployComparisonMsg';
    mode: bigint;
    bounce: boolean;
    contractNum: bigint;
    value: bigint;
    body: Slice;
}

export function storeDeployComparisonMsg(src: DeployComparisonMsg) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4264585740, 32);
        b_0.storeUint(src.mode, 8);
        b_0.storeBit(src.bounce);
        b_0.storeInt(src.contractNum, 257);
        b_0.storeCoins(src.value);
        b_0.storeBuilder(src.body.asBuilder());
    };
}

export function loadDeployComparisonMsg(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4264585740) { throw Error('Invalid prefix'); }
    const _mode = sc_0.loadUintBig(8);
    const _bounce = sc_0.loadBit();
    const _contractNum = sc_0.loadIntBig(257);
    const _value = sc_0.loadCoins();
    const _body = sc_0;
    return { $$type: 'DeployComparisonMsg' as const, mode: _mode, bounce: _bounce, contractNum: _contractNum, value: _value, body: _body };
}

function loadTupleDeployComparisonMsg(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _contractNum = source.readBigNumber();
    const _value = source.readBigNumber();
    const _body = source.readCell().asSlice();
    return { $$type: 'DeployComparisonMsg' as const, mode: _mode, bounce: _bounce, contractNum: _contractNum, value: _value, body: _body };
}

function loadGetterTupleDeployComparisonMsg(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _contractNum = source.readBigNumber();
    const _value = source.readBigNumber();
    const _body = source.readCell().asSlice();
    return { $$type: 'DeployComparisonMsg' as const, mode: _mode, bounce: _bounce, contractNum: _contractNum, value: _value, body: _body };
}

function storeTupleDeployComparisonMsg(source: DeployComparisonMsg) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeBoolean(source.bounce);
    builder.writeNumber(source.contractNum);
    builder.writeNumber(source.value);
    builder.writeSlice(source.body.asCell());
    return builder.build();
}

function dictValueParserDeployComparisonMsg(): DictionaryValue<DeployComparisonMsg> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployComparisonMsg(src)).endCell());
        },
        parse: (src) => {
            return loadDeployComparisonMsg(src.loadRef().beginParse());
        }
    }
}

export type DeployComparisonNoBodyMsg = {
    $$type: 'DeployComparisonNoBodyMsg';
    mode: bigint;
    bounce: boolean;
    contractNum: bigint;
    value: bigint;
}

export function storeDeployComparisonNoBodyMsg(src: DeployComparisonNoBodyMsg) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3892793597, 32);
        b_0.storeUint(src.mode, 8);
        b_0.storeBit(src.bounce);
        b_0.storeInt(src.contractNum, 257);
        b_0.storeCoins(src.value);
    };
}

export function loadDeployComparisonNoBodyMsg(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3892793597) { throw Error('Invalid prefix'); }
    const _mode = sc_0.loadUintBig(8);
    const _bounce = sc_0.loadBit();
    const _contractNum = sc_0.loadIntBig(257);
    const _value = sc_0.loadCoins();
    return { $$type: 'DeployComparisonNoBodyMsg' as const, mode: _mode, bounce: _bounce, contractNum: _contractNum, value: _value };
}

function loadTupleDeployComparisonNoBodyMsg(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _contractNum = source.readBigNumber();
    const _value = source.readBigNumber();
    return { $$type: 'DeployComparisonNoBodyMsg' as const, mode: _mode, bounce: _bounce, contractNum: _contractNum, value: _value };
}

function loadGetterTupleDeployComparisonNoBodyMsg(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _contractNum = source.readBigNumber();
    const _value = source.readBigNumber();
    return { $$type: 'DeployComparisonNoBodyMsg' as const, mode: _mode, bounce: _bounce, contractNum: _contractNum, value: _value };
}

function storeTupleDeployComparisonNoBodyMsg(source: DeployComparisonNoBodyMsg) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeBoolean(source.bounce);
    builder.writeNumber(source.contractNum);
    builder.writeNumber(source.value);
    return builder.build();
}

function dictValueParserDeployComparisonNoBodyMsg(): DictionaryValue<DeployComparisonNoBodyMsg> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployComparisonNoBodyMsg(src)).endCell());
        },
        parse: (src) => {
            return loadDeployComparisonNoBodyMsg(src.loadRef().beginParse());
        }
    }
}

export type DeployContract$Data = {
    $$type: 'DeployContract$Data';
    internalNum: bigint;
}

export function storeDeployContract$Data(src: DeployContract$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.internalNum, 257);
    };
}

export function loadDeployContract$Data(slice: Slice) {
    const sc_0 = slice;
    const _internalNum = sc_0.loadIntBig(257);
    return { $$type: 'DeployContract$Data' as const, internalNum: _internalNum };
}

function loadTupleDeployContract$Data(source: TupleReader) {
    const _internalNum = source.readBigNumber();
    return { $$type: 'DeployContract$Data' as const, internalNum: _internalNum };
}

function loadGetterTupleDeployContract$Data(source: TupleReader) {
    const _internalNum = source.readBigNumber();
    return { $$type: 'DeployContract$Data' as const, internalNum: _internalNum };
}

function storeTupleDeployContract$Data(source: DeployContract$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.internalNum);
    return builder.build();
}

function dictValueParserDeployContract$Data(): DictionaryValue<DeployContract$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployContract$Data(src)).endCell());
        },
        parse: (src) => {
            return loadDeployContract$Data(src.loadRef().beginParse());
        }
    }
}

 type DeployContract_init_args = {
    $$type: 'DeployContract_init_args';
    newNum: bigint;
}

function initDeployContract_init_args(src: DeployContract_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.newNum, 257);
    };
}

async function DeployContract_init(newNum: bigint) {
    const __code = Cell.fromBase64('te6ccgECBgEAApwAA9z/ACCP4DAB0HLXIdIA0gD6QCEQNFBmbwT4YQL4Yu1E0NIAAZeBAQHXAAExmIEBAdcAAQHR4jABkTDgcCHXScIflTAg1wsf3iCCEJ71Vv264wIgghD+MGoMuuMCghDoB1D9uuMCMOFtgBP0vPLICwECAwDgMIAg1yHTB9IAgQEB1wBRM0MwNAPIAc8WyXAE+CrIcAHKAFgBgQEBzwDJEEUQJBAjX0H5AAH5AFrXZQHXZYICATTIyxfLD8sPy//L/3H5BAADyM+FgMoAEszMz4hACMv/AfoCgGnPQM+GNPQAyQH7AAH0MIAg1yHTB9IAgQEB1wD6AFFEFEMwNQH4KshwAcoAWAGBAQHPAMklyAHPFslUZUFUdkNfQfkAAfkAWtdlAddlggIBNMjLF8sPyw/L/8v/cfkEAAPIz4WAygASzMzPiEAIy/8B+gKAac9Az4Y09ADJAfsABcgBzxbJUxUEAdSAINch0wfSAIEBAdcA+gBVMDT4KshwAcoAWAGBAQHPAMlUc0JTQ21VMF9B+QAB+QBa12UB12WCAgE0yMsXyw/LD8v/y/9x+QQAA8jPhYDKABLMzM+IQAjL/wH6AoBpz0DPhjT0AMkB+wBcBQDGcFkg+QAi+QBa12UB12WCAgE0yMsXyw/LD8v/y/9x+QQAyHQBywISygfL/8nQFURgQzAByM+FgMoAz4RAzgH6AoBpz0ACXG4BbqiTW8+BnVjPhoDPhID0APQAz4Hi9ADJAfsAAMxwWSD5ACL5AFrXZQHXZYICATTIyxfLD8sPy//L/3H5BADIdAHLAhLKB8v/ydAQRUQwbQUEQxPIz4WAygDPhEDOAfoCgGnPQAJcbgFuqJNbz4GdWM+GgM+EgPQA9ADPgeL0AMkB+wA=');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initDeployContract_init_args({ $$type: 'DeployContract_init_args', newNum })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const DeployContract_errors: { [key: number]: { message: string } } = {
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

const DeployContract_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"DeployParamsMsg","header":2666878717,"fields":[{"name":"mode","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"contractNum","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"DeployComparisonMsg","header":4264585740,"fields":[{"name":"mode","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"contractNum","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"body","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"DeployComparisonNoBodyMsg","header":3892793597,"fields":[{"name":"mode","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"contractNum","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"DeployContract$Data","header":null,"fields":[{"name":"internalNum","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const DeployContract_getters: ABIGetter[] = [
]

export const DeployContract_getterMapping: { [key: string]: string } = {
}

const DeployContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"any"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DeployParamsMsg"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DeployComparisonMsg"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DeployComparisonNoBodyMsg"}},
]


export class DeployContract implements Contract {
    
    public static readonly storageReserve = 0n;
    
    static async init(newNum: bigint) {
        return await DeployContract_init(newNum);
    }
    
    static async fromInit(newNum: bigint) {
        const __gen_init = await DeployContract_init(newNum);
        const address = contractAddress(0, __gen_init);
        return new DeployContract(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new DeployContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  DeployContract_types,
        getters: DeployContract_getters,
        receivers: DeployContract_receivers,
        errors: DeployContract_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Slice | DeployParamsMsg | DeployComparisonMsg | DeployComparisonNoBodyMsg) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && message instanceof Slice) {
            body = message.asCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeployParamsMsg') {
            body = beginCell().store(storeDeployParamsMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeployComparisonMsg') {
            body = beginCell().store(storeDeployComparisonMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeployComparisonNoBodyMsg') {
            body = beginCell().store(storeDeployComparisonNoBodyMsg(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
}