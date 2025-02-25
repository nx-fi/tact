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

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type MyStruct = {
    $$type: 'MyStruct';
    x: bigint;
    y: bigint;
}

export function storeMyStruct(src: MyStruct) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.x, 257);
        b_0.storeInt(src.y, 257);
    };
}

export function loadMyStruct(slice: Slice) {
    const sc_0 = slice;
    const _x = sc_0.loadIntBig(257);
    const _y = sc_0.loadIntBig(257);
    return { $$type: 'MyStruct' as const, x: _x, y: _y };
}

function loadTupleMyStruct(source: TupleReader) {
    const _x = source.readBigNumber();
    const _y = source.readBigNumber();
    return { $$type: 'MyStruct' as const, x: _x, y: _y };
}

function loadGetterTupleMyStruct(source: TupleReader) {
    const _x = source.readBigNumber();
    const _y = source.readBigNumber();
    return { $$type: 'MyStruct' as const, x: _x, y: _y };
}

function storeTupleMyStruct(source: MyStruct) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.x);
    builder.writeNumber(source.y);
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

export type LocalTypeInferenceTester$Data = {
    $$type: 'LocalTypeInferenceTester$Data';
}

export function storeLocalTypeInferenceTester$Data(src: LocalTypeInferenceTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

export function loadLocalTypeInferenceTester$Data(slice: Slice) {
    const sc_0 = slice;
    return { $$type: 'LocalTypeInferenceTester$Data' as const };
}

function loadTupleLocalTypeInferenceTester$Data(source: TupleReader) {
    return { $$type: 'LocalTypeInferenceTester$Data' as const };
}

function loadGetterTupleLocalTypeInferenceTester$Data(source: TupleReader) {
    return { $$type: 'LocalTypeInferenceTester$Data' as const };
}

function storeTupleLocalTypeInferenceTester$Data(source: LocalTypeInferenceTester$Data) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserLocalTypeInferenceTester$Data(): DictionaryValue<LocalTypeInferenceTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLocalTypeInferenceTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadLocalTypeInferenceTester$Data(src.loadRef().beginParse());
        }
    }
}

 type LocalTypeInferenceTester_init_args = {
    $$type: 'LocalTypeInferenceTester_init_args';
}

function initLocalTypeInferenceTester_init_args(src: LocalTypeInferenceTester_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function LocalTypeInferenceTester_init() {
    const __code = Cell.fromBase64('te6ccgECOgEAAxQAART/APSkE/S88sgLAQIBYgIDAqzQAdBy1yHSANIA+kAhEDRQZm8E+GEC+GLbPAKRW+CAINcFb6MwAYIQlGqYtrqOotM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zwwyH8BygDJ7VTgW/LAgjgEAgEgBQYAoG1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQIxA2VSISyM+FgMoAz4RAzgH6AoBpz0ACXG4BbqiTW8+BnVjPhoDPhID0APQAz4Hi9ADJAfsAAgEgBwgCASAeHwIBIAkKAgEgFBUCD7ZUG2ebZ4YwOAsCASAMDQACcQIBSA4PAgFIEhMCDqrD2zzbPDE4EAIOqSjbPNs8MTgRAAJyAFptgQEBcXIiIW6VW1n0WjCYyAHPAEEz9ELigQEBcSFBM/QMb6GUAdcAMJJbbeICDqri2zzbPDE4GAIOqQnbPNs8MTgpAgEgFhcCASAaGwIPsIF2zzbPDGA4GAIPsIk2zzbPDGA4GQAE+CgAAn8CD7CR9s82zwxgOBwCD7CZts82zwxgOB0AEMiAewHLP8nQAA7IgHsByz/JAgEgICECASAxMgIBICIjAgEgKisCAUgkJQIBSCcoAg6rids82zwxOCYCDqhi2zzbPDE4KQAMyIB7Acs/Ag6rqNs82zwxOCwCDqhD2zzbPDE4KQACbQIPsQg2zzbPDGA4LAIRsQB2zzbPGwSgOC8BSMhvAAFvjG1vjItWhlbGxvjbPG8iAcmTIW6zlgFvIlnMyegx0C0BBNs8LgC6INdKIddJlyDCACLCALGOSgNvIoB/Is8xqwKhBasCUVW2CCDCAJwgqgIV1xhQM88WQBTeWW8CU0GhwgCZyAFvAlBEoaoCjhIxM8IAmdQw0CDXSiHXSZJwIOLi6F8DAQTbPDAAFPgqyHABygBtMMkCASAzNAIBIDY3Ag+xObbPNs8MYDg1Ag+xMfbPNs8MYDg1ACptgQEBcSFBM/QMb6GUAdcAMJJbbeICEbEpNs82zxsEoDg5AhGxIXbPNs8bBKA4OQAU7UTQ0gAwkW3gbQAEcXI=');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initLocalTypeInferenceTester_init_args({ $$type: 'LocalTypeInferenceTester_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const LocalTypeInferenceTester_errors: { [key: number]: { message: string } } = {
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

const LocalTypeInferenceTester_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"MyStruct","header":null,"fields":[{"name":"x","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"y","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"LocalTypeInferenceTester$Data","header":null,"fields":[]},
]

const LocalTypeInferenceTester_getters: ABIGetter[] = [
    {"name":"test1","methodId":70304,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"test2","methodId":74435,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"test3","methodId":78562,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"test4","methodId":82437,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"test5","methodId":86564,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"test6","methodId":90695,"arguments":[],"returnType":{"kind":"simple","type":"slice","optional":false}},
    {"name":"test7","methodId":94822,"arguments":[],"returnType":{"kind":"simple","type":"cell","optional":false}},
    {"name":"test8","methodId":99209,"arguments":[],"returnType":{"kind":"simple","type":"builder","optional":false}},
    {"name":"test9","methodId":103336,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"test10","methodId":107552,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"test11","methodId":111617,"arguments":[],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
    {"name":"test12","methodId":99426,"arguments":[],"returnType":{"kind":"dict","key":"int","value":"int"}},
    {"name":"test13","methodId":103491,"arguments":[],"returnType":{"kind":"dict","key":"int","value":"uint","valueFormat":32}},
    {"name":"test14","methodId":124068,"arguments":[],"returnType":{"kind":"simple","type":"MyStruct","optional":false}},
    {"name":"test15","methodId":128133,"arguments":[],"returnType":{"kind":"simple","type":"MyStruct","optional":false}},
    {"name":"test16","methodId":115942,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"test17","methodId":120007,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"test18","methodId":75048,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"test19","methodId":79113,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
]

export const LocalTypeInferenceTester_getterMapping: { [key: string]: string } = {
    'test1': 'getTest1',
    'test2': 'getTest2',
    'test3': 'getTest3',
    'test4': 'getTest4',
    'test5': 'getTest5',
    'test6': 'getTest6',
    'test7': 'getTest7',
    'test8': 'getTest8',
    'test9': 'getTest9',
    'test10': 'getTest10',
    'test11': 'getTest11',
    'test12': 'getTest12',
    'test13': 'getTest13',
    'test14': 'getTest14',
    'test15': 'getTest15',
    'test16': 'getTest16',
    'test17': 'getTest17',
    'test18': 'getTest18',
    'test19': 'getTest19',
}

const LocalTypeInferenceTester_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class LocalTypeInferenceTester implements Contract {
    
    static async init() {
        return await LocalTypeInferenceTester_init();
    }
    
    static async fromInit() {
        const __gen_init = await LocalTypeInferenceTester_init();
        const address = contractAddress(0, __gen_init);
        return new LocalTypeInferenceTester(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new LocalTypeInferenceTester(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  LocalTypeInferenceTester_types,
        getters: LocalTypeInferenceTester_getters,
        receivers: LocalTypeInferenceTester_receivers,
        errors: LocalTypeInferenceTester_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getTest1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(70304 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getTest2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(74435 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getTest3(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(78562 as any, builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
    async getTest4(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(82437 as any, builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
    async getTest5(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(86564 as any, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getTest6(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(90695 as any, builder.build())).stack;
        const result = source.readCell().asSlice();
        return result;
    }
    
    async getTest7(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(94822 as any, builder.build())).stack;
        const result = source.readCell();
        return result;
    }
    
    async getTest8(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(99209 as any, builder.build())).stack;
        const result = source.readCell().asBuilder();
        return result;
    }
    
    async getTest9(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(103336 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
    async getTest10(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(107552 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
    async getTest11(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(111617 as any, builder.build())).stack;
        const result = loadGetterTupleStateInit(source);
        return result;
    }
    
    async getTest12(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(99426 as any, builder.build())).stack;
        const result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
        return result;
    }
    
    async getTest13(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(103491 as any, builder.build())).stack;
        const result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Uint(32), source.readCellOpt());
        return result;
    }
    
    async getTest14(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(124068 as any, builder.build())).stack;
        const result = loadGetterTupleMyStruct(source);
        return result;
    }
    
    async getTest15(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(128133 as any, builder.build())).stack;
        const result = loadGetterTupleMyStruct(source);
        return result;
    }
    
    async getTest16(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(115942 as any, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    
    async getTest17(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(120007 as any, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    
    async getTest18(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(75048 as any, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    
    async getTest19(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(79113 as any, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    
}