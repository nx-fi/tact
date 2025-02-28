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

export type Request = {
    $$type: 'Request';
    requested: Address;
    to: Address;
    value: bigint;
    timeout: bigint;
    bounce: boolean;
    mode: bigint;
    body: Cell | null;
}

export function storeRequest(src: Request) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4266760323, 32);
        b_0.storeAddress(src.requested);
        b_0.storeAddress(src.to);
        b_0.storeCoins(src.value);
        b_0.storeUint(src.timeout, 32);
        b_0.storeBit(src.bounce);
        b_0.storeUint(src.mode, 8);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
    };
}

export function loadRequest(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4266760323) { throw Error('Invalid prefix'); }
    const _requested = sc_0.loadAddress();
    const _to = sc_0.loadAddress();
    const _value = sc_0.loadCoins();
    const _timeout = sc_0.loadUintBig(32);
    const _bounce = sc_0.loadBit();
    const _mode = sc_0.loadUintBig(8);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'Request' as const, requested: _requested, to: _to, value: _value, timeout: _timeout, bounce: _bounce, mode: _mode, body: _body };
}

function loadTupleRequest(source: TupleReader) {
    const _requested = source.readAddress();
    const _to = source.readAddress();
    const _value = source.readBigNumber();
    const _timeout = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    return { $$type: 'Request' as const, requested: _requested, to: _to, value: _value, timeout: _timeout, bounce: _bounce, mode: _mode, body: _body };
}

function loadGetterTupleRequest(source: TupleReader) {
    const _requested = source.readAddress();
    const _to = source.readAddress();
    const _value = source.readBigNumber();
    const _timeout = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    return { $$type: 'Request' as const, requested: _requested, to: _to, value: _value, timeout: _timeout, bounce: _bounce, mode: _mode, body: _body };
}

function storeTupleRequest(source: Request) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.requested);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.timeout);
    builder.writeBoolean(source.bounce);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    return builder.build();
}

function dictValueParserRequest(): DictionaryValue<Request> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRequest(src)).endCell());
        },
        parse: (src) => {
            return loadRequest(src.loadRef().beginParse());
        }
    }
}

export type Signed = {
    $$type: 'Signed';
    request: Request;
}

export function storeSigned(src: Signed) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2213172633, 32);
        b_0.store(storeRequest(src.request));
    };
}

export function loadSigned(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2213172633) { throw Error('Invalid prefix'); }
    const _request = loadRequest(sc_0);
    return { $$type: 'Signed' as const, request: _request };
}

function loadTupleSigned(source: TupleReader) {
    const _request = loadTupleRequest(source);
    return { $$type: 'Signed' as const, request: _request };
}

function loadGetterTupleSigned(source: TupleReader) {
    const _request = loadGetterTupleRequest(source);
    return { $$type: 'Signed' as const, request: _request };
}

function storeTupleSigned(source: Signed) {
    const builder = new TupleBuilder();
    builder.writeTuple(storeTupleRequest(source.request));
    return builder.build();
}

function dictValueParserSigned(): DictionaryValue<Signed> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSigned(src)).endCell());
        },
        parse: (src) => {
            return loadSigned(src.loadRef().beginParse());
        }
    }
}

export type MultisigSigner$Data = {
    $$type: 'MultisigSigner$Data';
    master: Address;
    members: Dictionary<Address, bigint>;
    weight: bigint;
    requiredWeight: bigint;
    completed: boolean;
    request: Request;
}

export function storeMultisigSigner$Data(src: MultisigSigner$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.master);
        b_0.storeDict(src.members, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_0.storeInt(src.weight, 257);
        b_0.storeInt(src.requiredWeight, 257);
        b_0.storeBit(src.completed);
        const b_1 = new Builder();
        b_1.store(storeRequest(src.request));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMultisigSigner$Data(slice: Slice) {
    const sc_0 = slice;
    const _master = sc_0.loadAddress();
    const _members = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_0);
    const _weight = sc_0.loadIntBig(257);
    const _requiredWeight = sc_0.loadIntBig(257);
    const _completed = sc_0.loadBit();
    const sc_1 = sc_0.loadRef().beginParse();
    const _request = loadRequest(sc_1);
    return { $$type: 'MultisigSigner$Data' as const, master: _master, members: _members, weight: _weight, requiredWeight: _requiredWeight, completed: _completed, request: _request };
}

function loadTupleMultisigSigner$Data(source: TupleReader) {
    const _master = source.readAddress();
    const _members = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    const _weight = source.readBigNumber();
    const _requiredWeight = source.readBigNumber();
    const _completed = source.readBoolean();
    const _request = loadTupleRequest(source);
    return { $$type: 'MultisigSigner$Data' as const, master: _master, members: _members, weight: _weight, requiredWeight: _requiredWeight, completed: _completed, request: _request };
}

function loadGetterTupleMultisigSigner$Data(source: TupleReader) {
    const _master = source.readAddress();
    const _members = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    const _weight = source.readBigNumber();
    const _requiredWeight = source.readBigNumber();
    const _completed = source.readBoolean();
    const _request = loadGetterTupleRequest(source);
    return { $$type: 'MultisigSigner$Data' as const, master: _master, members: _members, weight: _weight, requiredWeight: _requiredWeight, completed: _completed, request: _request };
}

function storeTupleMultisigSigner$Data(source: MultisigSigner$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.master);
    builder.writeCell(source.members.size > 0 ? beginCell().storeDictDirect(source.members, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeNumber(source.weight);
    builder.writeNumber(source.requiredWeight);
    builder.writeBoolean(source.completed);
    builder.writeTuple(storeTupleRequest(source.request));
    return builder.build();
}

function dictValueParserMultisigSigner$Data(): DictionaryValue<MultisigSigner$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMultisigSigner$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMultisigSigner$Data(src.loadRef().beginParse());
        }
    }
}

export type Multisig$Data = {
    $$type: 'Multisig$Data';
    seqno: bigint;
    members: Dictionary<Address, bigint>;
    totalWeight: bigint;
    requiredWeight: bigint;
}

export function storeMultisig$Data(src: Multisig$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.seqno, 257);
        b_0.storeDict(src.members, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_0.storeInt(src.totalWeight, 257);
        b_0.storeInt(src.requiredWeight, 257);
    };
}

export function loadMultisig$Data(slice: Slice) {
    const sc_0 = slice;
    const _seqno = sc_0.loadIntBig(257);
    const _members = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_0);
    const _totalWeight = sc_0.loadIntBig(257);
    const _requiredWeight = sc_0.loadIntBig(257);
    return { $$type: 'Multisig$Data' as const, seqno: _seqno, members: _members, totalWeight: _totalWeight, requiredWeight: _requiredWeight };
}

function loadTupleMultisig$Data(source: TupleReader) {
    const _seqno = source.readBigNumber();
    const _members = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    const _totalWeight = source.readBigNumber();
    const _requiredWeight = source.readBigNumber();
    return { $$type: 'Multisig$Data' as const, seqno: _seqno, members: _members, totalWeight: _totalWeight, requiredWeight: _requiredWeight };
}

function loadGetterTupleMultisig$Data(source: TupleReader) {
    const _seqno = source.readBigNumber();
    const _members = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    const _totalWeight = source.readBigNumber();
    const _requiredWeight = source.readBigNumber();
    return { $$type: 'Multisig$Data' as const, seqno: _seqno, members: _members, totalWeight: _totalWeight, requiredWeight: _requiredWeight };
}

function storeTupleMultisig$Data(source: Multisig$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    builder.writeCell(source.members.size > 0 ? beginCell().storeDictDirect(source.members, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeNumber(source.totalWeight);
    builder.writeNumber(source.requiredWeight);
    return builder.build();
}

function dictValueParserMultisig$Data(): DictionaryValue<Multisig$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMultisig$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMultisig$Data(src.loadRef().beginParse());
        }
    }
}

 type Multisig_init_args = {
    $$type: 'Multisig_init_args';
    members: Dictionary<Address, bigint>;
    totalWeight: bigint;
    requiredWeight: bigint;
}

function initMultisig_init_args(src: Multisig_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeDict(src.members, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_0.storeInt(src.totalWeight, 257);
        b_0.storeInt(src.requiredWeight, 257);
    };
}

async function Multisig_init(members: Dictionary<Address, bigint>, totalWeight: bigint, requiredWeight: bigint) {
    const __code = Cell.fromBase64('te6ccgECFQEABYoABPz/ACCPdTAB0HLXIdIA0gD6QCEQNFBmbwT4YQL4Yu1E0NIAAY4VgQEB1wD0BIEBAdcAgQEB1wBVMGwUjhb0BIEBAdcAgQEB1wBVIAPRWDFwVCID4jEyA5JfA+AB1w0f8uCCIYIQ/lGYg7rjAgGCEIPqVZm64wJfA/LAguH0pBMBAgMEAYox+kD6QPoA0x/SANMH0gABkdSSbQHiVWA3+EKBAQsqAoEBAUEz9ApvoZQB1wAwkltt4iBu8tCAggC04wHCAPL0+CgJCAcFAvzTHwGCEP5RmIO68uCB+kD6QPoA0x/SANMH0gABkdSSbQHiVWA3+EL4KEoTVBl2VHZYU+yIyHABygBVkVCpzxYX9AAVgQEBzwDIBxBGEDVEgIIQ/lGYg1AIyx9QBs8WUATPFlj6AssfygDLByFus5V/AcoAzJRwMsoA4skBzMkHCAICcRESAAr0vPLICwL+iMhwAcoAVZFQqc8WF/QAFYEBAc8AyAcQRhA1RICCEP5RmINQCMsfUAbPFlAEzxZY+gLLH8oAywchbrOVfwHKAMyUcDLKAOLJAczJXHBZIPkAIvkAWtdlAddlggIBNMjLF8sPyw/L/8v/cfkEAMh0AcsCEsoHy//J0HADgEJAEwcGAHB/WRA1bURVA8jPhYDKAM+EQM4B+gKAac9AAlxuAW6ok1vPgZ1Yz4aAz4SA9AD0AM+B4vQAyQH7AAPm/wAgj2UwAdBy1yHSANIA+kAhEDRQZm8E+GEC+GLbPA2SXw3gcCzXSSDCH5UxDNMfDd4BwAABwSGwkl8N4Av5AYLwj7igPZy8lp00YA7qgzzgL9ip1MVqoH+dWCfsyEJqV4m64wJfDPLAguH0pBP0vPLICw4JCgD0cFkg+QAi+QBa12UB12WCAgE0yMsXyw/LD8v/y/9x+QQAyHQBywISygfL/8nQBoERTQfHBRby9IESk/gjFrwV8vREFBAkbVBDbQPIz4WAygDPhEDOAfoCgGnPQAJcbgFuqJNbz4GdWM+GgM+EgPQA9ADPgeL0AMkB+wACnoESk/gjUjC88vSCAJ9qJrPy9PhCKYEBCyKBAQFBM/QKb6GUAdcAMJJbbeIgbvLQgAqBAQv0WTBQiaBTBr7jABCbEIoJEGgQVxBGEDVEMBILDAITpmi/ts82zxsx4A4PAfw1f3CBAIJwVHdlU31WElYUyFVgghCD6lWZUAjLHweCEP5RmINQCMsfUAbPFlAEzxZY+gLLH8oAywchbrOVfwHKAMyUcDLKAOLJLVUgECRtUENtUCPIz4WAygDPhEDOAfoCgGnPQAJcbgFuqJNbz4GdWM+GgM+EgPQA9ADPgeINAKbIfwHKAFWwUMvPFhn0ABeBAQHPABWBAQHPABPKAMhGFxA1GIIQ/lGYg1AIyx9QBs8WUATPFlj6AssfygDLByFus5V/AcoAzJRwMsoA4skBzMntVAAO9ADJAfsABQGe7UTQ0gABjkb6QPQEgQEB1wCBAQHXANIA1AHQ0x8BghD+UZiDuvLggfpA+kD6ANMf0gDTB9IAAZHUkm0B4lVgNxB8EHsQehB5EHhVBWwc4BAADlR2VFR2VCYAiPpA9ASBAQHXANQB0NMfAYIQ/lGYg7ry4IH6QPpA+gDTH9IA0wfSAAGR1JJtAeJVYDcQehB5EHhVBQrRVQhwCAdwB1VBAX28pC9qJoaQAAxwrAgIDrgHoCQICA64BAgIDrgCqYNgpHC3oCQICA64BAgIDrgCqQAeisGLgqEQHxKoHtnjYgwTAXm8yg9qJoaQAAxwrAgIDrgHoCQICA64BAgIDrgCqYNgpHC3oCQICA64BAgIDrgCqQAeisGLgqEQHxbZ42IMFAAugQELJAKBAQFBM/QKb6GUAdcAMJJbbeIAAiI=');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initMultisig_init_args({ $$type: 'Multisig_init_args', members, totalWeight, requiredWeight })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Multisig_errors: { [key: number]: { message: string } } = {
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
    4429: { message: `Invalid sender` },
    4755: { message: `Timeout` },
    40810: { message: `Completed` },
    46307: { message: `Not a member` },
}

const Multisig_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"Request","header":4266760323,"fields":[{"name":"requested","type":{"kind":"simple","type":"address","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"timeout","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"mode","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Signed","header":2213172633,"fields":[{"name":"request","type":{"kind":"simple","type":"Request","optional":false}}]},
    {"name":"MultisigSigner$Data","header":null,"fields":[{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"members","type":{"kind":"dict","key":"address","value":"int"}},{"name":"weight","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"requiredWeight","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"completed","type":{"kind":"simple","type":"bool","optional":false}},{"name":"request","type":{"kind":"simple","type":"Request","optional":false}}]},
    {"name":"Multisig$Data","header":null,"fields":[{"name":"seqno","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"members","type":{"kind":"dict","key":"address","value":"int"}},{"name":"totalWeight","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"requiredWeight","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const Multisig_getters: ABIGetter[] = [
    {"name":"member","methodId":70789,"arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"members","methodId":104769,"arguments":[],"returnType":{"kind":"dict","key":"address","value":"int"}},
]

export const Multisig_getterMapping: { [key: string]: string } = {
    'member': 'getMember',
    'members': 'getMembers',
}

const Multisig_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"Request"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Signed"}},
]


export class Multisig implements Contract {
    
    public static readonly storageReserve = 0n;
    
    static async init(members: Dictionary<Address, bigint>, totalWeight: bigint, requiredWeight: bigint) {
        return await Multisig_init(members, totalWeight, requiredWeight);
    }
    
    static async fromInit(members: Dictionary<Address, bigint>, totalWeight: bigint, requiredWeight: bigint) {
        const __gen_init = await Multisig_init(members, totalWeight, requiredWeight);
        const address = contractAddress(0, __gen_init);
        return new Multisig(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new Multisig(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Multisig_types,
        getters: Multisig_getters,
        receivers: Multisig_receivers,
        errors: Multisig_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Request | Signed) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Request') {
            body = beginCell().store(storeRequest(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Signed') {
            body = beginCell().store(storeSigned(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getMember(provider: ContractProvider, address: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(address);
        const source = (await provider.get(70789 as any, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    
    async getMembers(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(104769 as any, builder.build())).stack;
        const result = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
        return result;
    }
    
}