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

export type StringsTester$Data = {
    $$type: 'StringsTester$Data';
}

export function storeStringsTester$Data(src: StringsTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

export function loadStringsTester$Data(slice: Slice) {
    const sc_0 = slice;
    return { $$type: 'StringsTester$Data' as const };
}

function loadTupleStringsTester$Data(source: TupleReader) {
    return { $$type: 'StringsTester$Data' as const };
}

function loadGetterTupleStringsTester$Data(source: TupleReader) {
    return { $$type: 'StringsTester$Data' as const };
}

function storeTupleStringsTester$Data(source: StringsTester$Data) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserStringsTester$Data(): DictionaryValue<StringsTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStringsTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadStringsTester$Data(src.loadRef().beginParse());
        }
    }
}

 type StringsTester_init_args = {
    $$type: 'StringsTester_init_args';
}

function initStringsTester_init_args(src: StringsTester_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function StringsTester_init() {
    const __code = Cell.fromBase64('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');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initStringsTester_init_args({ $$type: 'StringsTester_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const StringsTester_errors: { [key: number]: { message: string } } = {
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
    31733: { message: `condition can\`t be...` },
}

const StringsTester_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"StringsTester$Data","header":null,"fields":[]},
]

const StringsTester_getters: ABIGetter[] = [
    {"name":"constantString","methodId":93932,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"constantStringUnicode","methodId":94939,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"constantStringUnicodeLong","methodId":104680,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"dynamicStringCell","methodId":122225,"arguments":[],"returnType":{"kind":"simple","type":"cell","optional":false}},
    {"name":"dynamicStringCell2","methodId":97729,"arguments":[],"returnType":{"kind":"simple","type":"cell","optional":false}},
    {"name":"dynamicCommentCell","methodId":122531,"arguments":[],"returnType":{"kind":"simple","type":"cell","optional":false}},
    {"name":"dynamicCommentCellLarge","methodId":74771,"arguments":[],"returnType":{"kind":"simple","type":"cell","optional":false}},
    {"name":"dynamicCommentStringLarge","methodId":74191,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"stringWithNumber","methodId":68752,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"stringWithNegativeNumber","methodId":82914,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"stringWithLargeNumber","methodId":94811,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"stringWithFloat","methodId":80064,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"intToString","methodId":104498,"arguments":[{"name":"x","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"floatToString","methodId":90680,"arguments":[{"name":"x","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"digits","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"base64","methodId":71427,"arguments":[],"returnType":{"kind":"simple","type":"slice","optional":false}},
    {"name":"processBase64","methodId":128362,"arguments":[{"name":"src","type":{"kind":"simple","type":"string","optional":false}}],"returnType":{"kind":"simple","type":"slice","optional":false}},
    {"name":"stringWithEscapedChars1","methodId":82062,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"stringWithEscapedChars2","methodId":94445,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"stringWithEscapedChars3","methodId":90316,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"stringWithEscapedChars4","methodId":69675,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"stringWithEscapedChars5","methodId":65546,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"stringWithEscapedChars6","methodId":77929,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"stringWithAddress","methodId":84575,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
]

export const StringsTester_getterMapping: { [key: string]: string } = {
    'constantString': 'getConstantString',
    'constantStringUnicode': 'getConstantStringUnicode',
    'constantStringUnicodeLong': 'getConstantStringUnicodeLong',
    'dynamicStringCell': 'getDynamicStringCell',
    'dynamicStringCell2': 'getDynamicStringCell2',
    'dynamicCommentCell': 'getDynamicCommentCell',
    'dynamicCommentCellLarge': 'getDynamicCommentCellLarge',
    'dynamicCommentStringLarge': 'getDynamicCommentStringLarge',
    'stringWithNumber': 'getStringWithNumber',
    'stringWithNegativeNumber': 'getStringWithNegativeNumber',
    'stringWithLargeNumber': 'getStringWithLargeNumber',
    'stringWithFloat': 'getStringWithFloat',
    'intToString': 'getIntToString',
    'floatToString': 'getFloatToString',
    'base64': 'getBase64',
    'processBase64': 'getProcessBase64',
    'stringWithEscapedChars1': 'getStringWithEscapedChars1',
    'stringWithEscapedChars2': 'getStringWithEscapedChars2',
    'stringWithEscapedChars3': 'getStringWithEscapedChars3',
    'stringWithEscapedChars4': 'getStringWithEscapedChars4',
    'stringWithEscapedChars5': 'getStringWithEscapedChars5',
    'stringWithEscapedChars6': 'getStringWithEscapedChars6',
    'stringWithAddress': 'getStringWithAddress',
}

const StringsTester_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"text","text":"backtick-test"}},
]


export class StringsTester implements Contract {
    
    public static readonly storageReserve = 0n;
    
    static async init() {
        return await StringsTester_init();
    }
    
    static async fromInit() {
        const __gen_init = await StringsTester_init();
        const address = contractAddress(0, __gen_init);
        return new StringsTester(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new StringsTester(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  StringsTester_types,
        getters: StringsTester_getters,
        receivers: StringsTester_receivers,
        errors: StringsTester_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | "backtick-test") {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message === "backtick-test") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getConstantString(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(93932 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
    async getConstantStringUnicode(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(94939 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
    async getConstantStringUnicodeLong(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(104680 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
    async getDynamicStringCell(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(122225 as any, builder.build())).stack;
        const result = source.readCell();
        return result;
    }
    
    async getDynamicStringCell2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(97729 as any, builder.build())).stack;
        const result = source.readCell();
        return result;
    }
    
    async getDynamicCommentCell(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(122531 as any, builder.build())).stack;
        const result = source.readCell();
        return result;
    }
    
    async getDynamicCommentCellLarge(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(74771 as any, builder.build())).stack;
        const result = source.readCell();
        return result;
    }
    
    async getDynamicCommentStringLarge(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(74191 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
    async getStringWithNumber(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(68752 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
    async getStringWithNegativeNumber(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(82914 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
    async getStringWithLargeNumber(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(94811 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
    async getStringWithFloat(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(80064 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
    async getIntToString(provider: ContractProvider, x: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(x);
        const source = (await provider.get(104498 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
    async getFloatToString(provider: ContractProvider, x: bigint, digits: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(x);
        builder.writeNumber(digits);
        const source = (await provider.get(90680 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
    async getBase64(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(71427 as any, builder.build())).stack;
        const result = source.readCell().asSlice();
        return result;
    }
    
    async getProcessBase64(provider: ContractProvider, src: string) {
        const builder = new TupleBuilder();
        builder.writeString(src);
        const source = (await provider.get(128362 as any, builder.build())).stack;
        const result = source.readCell().asSlice();
        return result;
    }
    
    async getStringWithEscapedChars1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(82062 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
    async getStringWithEscapedChars2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(94445 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
    async getStringWithEscapedChars3(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(90316 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
    async getStringWithEscapedChars4(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(69675 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
    async getStringWithEscapedChars5(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(65546 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
    async getStringWithEscapedChars6(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(77929 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
    async getStringWithAddress(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(84575 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
}