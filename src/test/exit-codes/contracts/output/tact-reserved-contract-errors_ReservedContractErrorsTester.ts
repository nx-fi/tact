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

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type DNSResolveResult = {
    $$type: 'DNSResolveResult';
    prefix: bigint;
    record: Cell | null;
}

export function storeDNSResolveResult(src: DNSResolveResult) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.prefix, 257);
        if (src.record !== null && src.record !== undefined) { b_0.storeBit(true).storeRef(src.record); } else { b_0.storeBit(false); }
    };
}

export function loadDNSResolveResult(slice: Slice) {
    const sc_0 = slice;
    const _prefix = sc_0.loadIntBig(257);
    const _record = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'DNSResolveResult' as const, prefix: _prefix, record: _record };
}

function loadTupleDNSResolveResult(source: TupleReader) {
    const _prefix = source.readBigNumber();
    const _record = source.readCellOpt();
    return { $$type: 'DNSResolveResult' as const, prefix: _prefix, record: _record };
}

function loadGetterTupleDNSResolveResult(source: TupleReader) {
    const _prefix = source.readBigNumber();
    const _record = source.readCellOpt();
    return { $$type: 'DNSResolveResult' as const, prefix: _prefix, record: _record };
}

function storeTupleDNSResolveResult(source: DNSResolveResult) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.prefix);
    builder.writeCell(source.record);
    return builder.build();
}

function dictValueParserDNSResolveResult(): DictionaryValue<DNSResolveResult> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDNSResolveResult(src)).endCell());
        },
        parse: (src) => {
            return loadDNSResolveResult(src.loadRef().beginParse());
        }
    }
}

export type SpanishInquisition = {
    $$type: 'SpanishInquisition';
}

export function storeSpanishInquisition(src: SpanishInquisition) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1478, 32);
    };
}

export function loadSpanishInquisition(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1478) { throw Error('Invalid prefix'); }
    return { $$type: 'SpanishInquisition' as const };
}

function loadTupleSpanishInquisition(source: TupleReader) {
    return { $$type: 'SpanishInquisition' as const };
}

function loadGetterTupleSpanishInquisition(source: TupleReader) {
    return { $$type: 'SpanishInquisition' as const };
}

function storeTupleSpanishInquisition(source: SpanishInquisition) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserSpanishInquisition(): DictionaryValue<SpanishInquisition> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSpanishInquisition(src)).endCell());
        },
        parse: (src) => {
            return loadSpanishInquisition(src.loadRef().beginParse());
        }
    }
}

export type ReservedContractErrorsTester$Data = {
    $$type: 'ReservedContractErrorsTester$Data';
    owner: Address;
}

export function storeReservedContractErrorsTester$Data(src: ReservedContractErrorsTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

export function loadReservedContractErrorsTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    return { $$type: 'ReservedContractErrorsTester$Data' as const, owner: _owner };
}

function loadTupleReservedContractErrorsTester$Data(source: TupleReader) {
    const _owner = source.readAddress();
    return { $$type: 'ReservedContractErrorsTester$Data' as const, owner: _owner };
}

function loadGetterTupleReservedContractErrorsTester$Data(source: TupleReader) {
    const _owner = source.readAddress();
    return { $$type: 'ReservedContractErrorsTester$Data' as const, owner: _owner };
}

function storeTupleReservedContractErrorsTester$Data(source: ReservedContractErrorsTester$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserReservedContractErrorsTester$Data(): DictionaryValue<ReservedContractErrorsTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReservedContractErrorsTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadReservedContractErrorsTester$Data(src.loadRef().beginParse());
        }
    }
}

 type ReservedContractErrorsTester_init_args = {
    $$type: 'ReservedContractErrorsTester_init_args';
}

function initReservedContractErrorsTester_init_args(src: ReservedContractErrorsTester_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function ReservedContractErrorsTester_init() {
    const __code = Cell.fromBase64('te6ccgECMgEADdkAART/APSkE/S88sgLAQIBYgIDA9TQAdBy1yHSANIA+kAhEDRQZm8E+GEC+GLbPAKRW+BwIddJIMIflTEB0x8C3gHAAAHBIbCcMMh/AcoAAc8Wye1U4PkBIILwjrtk/AQYHwBYt8QYuchMQCf7khjOFIxtXnYUdP+oU5q64wIgGwQFAg+giju2ebZ4YxscAPIwbSBu8tCAi+ZHVtcChnb3RjaGEhISmI0S0ZpbGUgc3JjL3Rlc3QvZXhpdC1jb2Rlcy9jb250cmFjdHMvdGFjdC1yZXNlcnZlZC1jb250cmFjdC1lcnJvcnMudGFjdDoyMDo5OoP4UMP4UMP4UMMh/AcoAAc8Wye1UAfSC8ErKNr37i4MsX3HfDX3wQZ/B5wA9IaZGZtY0bLrKH8Sruo5TMPgocIBCbwDIATCBBcYByx/JWm1tQAN/yM+FgMoAz4RAzgH6AoBpz0ACXG4BbqiTW8+BnVjPhoDPhID0APQAz4Hi9ADJAfsAyH8BygABzxbJ7VTgIAYE/oLwwYInUrnbr5/pJo7m5wEF1GbitiIHIRPm3mCO8/r7GEC6jo4w2zzIfwHKAAHPFsntVOAggvB1YthgilFC8VgpygUuV7W1zuCg/+eRxdviarrCAc14QbrjAoLwTZr2OAsLd4795JaJyEXWpMs3n8tdw7HAAEp74hlZ9dS64wIHCAkKABL4QlIQxwXy4IQD/DCBAIZcf+1B7UPtRO1F7UeWMVMCvfLy7WftZe1k7WPtYXN/7RGK7UHt8QHy/4FiZSHy9FRiIO1B7UPtRO1F7UeWMVMCvfLy7WftZe1k7WPtYXN/7RGK7UHt8QHy/4IAt3Qh8vRUYiDtQe1D7UTtRe1HljFTAr3y8u1n7WXtZAsMDQT4gQCGXH/tQe1D7UTtRe1HljFTAr3y8u1n7WXtZO1j7WFzf+0Rj7x/yHUBywJSEMoHcAHL/8nQAds8jQiZHVtcChhZGRyU2xpY2UuYXNBZGRyZXNzKGNoYWluSUQpKYInbPHDtQe3xAfL/gXBYIfL0VGIg7UHtQ+1E7UXtRysdLR4ACDDywIID/MhwAcsHydDbPI0a2R1bXAoYmVnaW5DZWxsKCkKICAgICAgICAgICAgICAgIC5zdG9yZVVpbnQoMCwgOCkKICAgICAgICAgICAgICAgIC5hc1NsaWNlKCkKICAgICAgICAgICAgICAgIC5mcm9tQmFzZTY0KCkpgif4UMP4UMBAODwH0ixAI2zyNBlkdW1wKCJceDAwIi5mcm9tQmFzZTY0KCkpgjRMRmlsZSBzcmMvdGVzdC9leGl0LWNvZGVzL2NvbnRyYWN0cy90YWN0LXJlc2VydmVkLWNvbnRyYWN0LWVycm9ycy50YWN0OjYwOjEzOoP4UMP4UMP4gMHAQA/ztY+1hc3/tEY90gCp/IMEB8tCGIMJN8tCGyFkhwQCXWM+EtlijWN5xIZKnCuQSqQxQM44TmnqpDKYwVBIgwADmMGilkssH5NohWCDAAJIwMYriydCNBxkdW1wKCg0MikudG9GbG9hdFN0cmluZygtMSkpgif4UMP4UMP4UMHAWEhMAmEZpbGUgc3JjL3Rlc3QvZXhpdC1jb2Rlcy9jb250cmFjdHMvdGFjdC1yZXNlcnZlZC1jb250cmFjdC1lcnJvcnMudGFjdDo0NzoxMzoACP4gMHAB9iDXSasCyAGObwHTByHCQJMhwVuRcOKWAaa/WMsFjlghwmCTIcF7kXDilgGmuVjLBY5EIcIvkyHBOpFw4pYBpgRYywWOMCHALZF/kyHAK+KWgD4yAssFjhwhwF+Rf5MhwC/iloA/MgLLBZkBwD2T8sCG3wHi4uLi4uQxIBEALM8xIKk4AiDDAJgCydACodcYMOBbydAAmEZpbGUgc3JjL3Rlc3QvZXhpdC1jb2Rlcy9jb250cmFjdHMvdGFjdC1yZXNlcnZlZC1jb250cmFjdC1lcnJvcnMudGFjdDo2OToxMzoC/u1B7fEB8v+CAOssIfL0VGIg7UHtQ+1E7UXtR5YxUwK98vLtZ+1l7WTtY+1hc3/tEYrtQe3xAfL/ggCrSiHy9FRiIO1B7UPtRO1F7UeYMVMCvWwT8vLtZ+1l7WTtY+1hc3/tEYrtQe3xAfL/gU6+AfL08sCGyH8BygABzxbJ7VQUFQLqgCqATiDBAfLQhiDCTfLQhshZIcEAl1jPhLZYo1jecSGSpwrkEqkMUDOOE5p6qQymMFQSIMAA5jBopZLLB+TaIVggwACSMDGK4snQjQcZHVtcCgoNDIpLnRvRmxvYXRTdHJpbmcoNzgpKYIn+FDD+FDD+FDBwFhcDfDCIyMzJ0Ns8jQoZHVtcChkbnNJbnRlcm5hbE5vcm1hbGl6ZShzbGljZVdpdGhSZWYpKYIn+FDD+FDD+IDBwGBkaAHpwAZYgeqkIwACWeqkEAaQB6I4YyAGaeqkMpjBUEiDAAOYwaKUgWZMSywfk2hJZoBOhAc+EugGTz4TC5M8TAJhGaWxlIHNyYy90ZXN0L2V4aXQtY29kZXMvY29udHJhY3RzL3RhY3QtcmVzZXJ2ZWQtY29udHJhY3QtZXJyb3JzLnRhY3Q6Nzg6MTM6AAAArCDXSsAA8uCGyCHXSasCjkIB0wchwGKTgDYy3iHAZyLAcbGTgDky3iHAbJOAMTLeIcBvk4AwMt4hwHOTgDUy3iHAdZOAdjLeIcB6k4AyMt4CywfkMcnQAJhGaWxlIHNyYy90ZXN0L2V4aXQtY29kZXMvY29udHJhY3RzL3RhY3QtcmVzZXJ2ZWQtY29udHJhY3QtZXJyb3JzLnRhY3Q6ODk6MTM6AB7tRNDSAAGU+kABMeAw+CgAAiAAmkZpbGUgc3JjL3Rlc3QvZXhpdC1jb2Rlcy9jb250cmFjdHMvdGFjdC1yZXNlcnZlZC1jb250cmFjdC1lcnJvcnMudGFjdDoxMTU6MTM6BOKK7WftZe1k7WPtYXN/7RGK7UHt8QHy/4IAoY0h8vRUYiDtQe1D7UTtRe1HljFTAr3y8u1n7WXtZO1j7WFzf+0Riu1B7fEB8v+CAPClIfL0VGIg7UHtQ+1E7UXtR5YxUwK98vLtZ+1l7WTtY+1hc3/tER8gISIADDFTAr3y8gN4cMh1AcsCUhDKB1IQy//J0AHbPI0ImR1bXAoYWRkclNsaWNlLmFzQWRkcmVzcyhjaGFpbklEKSmCJ2zxwKyMtA3hxyHUBywJSEMoHcAHL/8nQAds8jQiZHVtcChhZGRyU2xpY2UuYXNBZGRyZXNzKGNoYWluSUQpKYInbPHArJC0E7IrtQe3xAfL/ggCSXCHy9FRiIO1B7UPtRO1F7UeWMVMCvfLy7WftZe1k7WPtYXN/7RGK7UHt8QHy/4IAwLYh8vRUYiDtQe1D7UTtRe1HmDFTAr1sE/Ly7WftZe1k7WPtYXN/7RGK7UHt8QHy/4IA0GsB8vTywIYlJicoAJpGaWxlIHNyYy90ZXN0L2V4aXQtY29kZXMvY29udHJhY3RzL3RhY3QtcmVzZXJ2ZWQtY29udHJhY3QtZXJyb3JzLnRhY3Q6MTMwOjEzOgCaRmlsZSBzcmMvdGVzdC9leGl0LWNvZGVzL2NvbnRyYWN0cy90YWN0LXJlc2VydmVkLWNvbnRyYWN0LWVycm9ycy50YWN0OjE0NToxMzoDeHDIdAHLAlIQygdSEMspydAB2zyNCJkdW1wKGFkZHJTbGljZS5hc0FkZHJlc3MoY2hhaW5JRCkpgids8cCspLQN4f8h0AcsCUhDKB3AByynJ0AHbPI0ImR1bXAoYWRkclNsaWNlLmFzQWRkcmVzcyhjaGFpbklEKSmCJ2zxwKyotA3owcch0AcsCUhDKB3AByynJ0AHbPI0ImR1bXAoYWRkclNsaWNlLmFzQWRkcmVzcyhjaGFpbklEKSmCJ2zxwKywtABbIfwHKAAHPFsntVACaRmlsZSBzcmMvdGVzdC9leGl0LWNvZGVzL2NvbnRyYWN0cy90YWN0LXJlc2VydmVkLWNvbnRyYWN0LWVycm9ycy50YWN0OjE2MDoxMzoAmkZpbGUgc3JjL3Rlc3QvZXhpdC1jb2Rlcy9jb250cmFjdHMvdGFjdC1yZXNlcnZlZC1jb250cmFjdC1lcnJvcnMudGFjdDoxNzU6MTM6AEgh10mBAQu68uCIwP+bINcLCoEE/7ry4IiZINcLAsAE8uCI4gAAmkZpbGUgc3JjL3Rlc3QvZXhpdC1jb2Rlcy9jb250cmFjdHMvdGFjdC1yZXNlcnZlZC1jb250cmFjdC1lcnJvcnMudGFjdDoxOTA6MTM6ARoC2zwC/hQw/hQw/hQwLgJI+kTIixEYzxYCgwegqTgHWMsHy//J0CDbPMhYzxYBzxbJ0Ns8LzAAmMgBzxaLIAAIzxbJ0HCUIccBs44qAdMHgwaTIMIAjhsDqgBTI7CRpN4DqwAjhA+8mQOED7CBECGyA97oMDEB6DGDB6kMAcjLB8sHydABoI0QEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5LV+DIlSLXScIXiuhsIcnQMQCaAtMH0wfTBwOqDwKqBxKxAbEgqxGAP7CqAlIweNckFM8WI6sLgD+wqgJSMHjXJM8WI6sFgD+wqgJSMHjXJM8WA4A/sKoCUiB41yQTzxY=');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initReservedContractErrorsTester_init_args({ $$type: 'ReservedContractErrorsTester_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const ReservedContractErrorsTester_errors: { [key: number]: { message: string } } = {
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
    20158: { message: `dnsInternalNormalize() didn't error on Slice with refs` },
    24161: { message: `Invalid DNS name` },
    25189: { message: `Slice.fromBase64() didn't error on invalid Base64` },
    28760: { message: `Slice.asAddress() didn't error on invalid tag prefix for a masterchain address` },
    37468: { message: `Slice.asAddress() didn't error on invalid account ID size for a basechain address` },
    41357: { message: `Slice.asAddress() didn't error on invalid tag prefix for a basechain address` },
    43850: { message: `Int.toFloatString() didn't error on digits 78` },
    46964: { message: `String.fromBase64() didn't error on invalid Base64` },
    49334: { message: `Slice.asAddress() didn't error on invalid account ID size for a masterchain address` },
    53355: { message: `Slice.asAddress() didn't error on invalid account ID size for a workchain address` },
    60204: { message: `Int.toFloatString() didn't error on digits -1` },
    61605: { message: `Slice.asAddress() didn't error on invalid tag prefix for a workchain address` },
}

const ReservedContractErrorsTester_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"DNSResolveResult","header":null,"fields":[{"name":"prefix","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"record","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"SpanishInquisition","header":1478,"fields":[]},
    {"name":"ReservedContractErrorsTester$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
]

const ReservedContractErrorsTester_getters: ABIGetter[] = [
    {"name":"owner","methodId":83229,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const ReservedContractErrorsTester_getterMapping: { [key: string]: string } = {
    'owner': 'getOwner',
}

const ReservedContractErrorsTester_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"text","text":"128"}},
    {"receiver":"internal","message":{"kind":"text","text":"130"}},
    {"receiver":"internal","message":{"kind":"text","text":"132"}},
    {"receiver":"internal","message":{"kind":"text","text":"134"}},
    {"receiver":"internal","message":{"kind":"text","text":"136"}},
]

export class ReservedContractErrorsTester implements Contract {
    
    static async init() {
        return await ReservedContractErrorsTester_init();
    }
    
    static async fromInit() {
        const __gen_init = await ReservedContractErrorsTester_init();
        const address = contractAddress(0, __gen_init);
        return new ReservedContractErrorsTester(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new ReservedContractErrorsTester(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  ReservedContractErrorsTester_types,
        getters: ReservedContractErrorsTester_getters,
        receivers: ReservedContractErrorsTester_receivers,
        errors: ReservedContractErrorsTester_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | "128" | "130" | "132" | "134" | "136") {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message === "128") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "130") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "132") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "134") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "136") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getOwner(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(83229 as any, builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
}