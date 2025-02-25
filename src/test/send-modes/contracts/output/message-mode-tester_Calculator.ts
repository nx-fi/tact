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

export type AverageRequest = {
    $$type: 'AverageRequest';
    from: bigint;
    to: bigint;
    amountToPayInResponse: bigint;
}

export function storeAverageRequest(src: AverageRequest) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3337606158, 32);
        b_0.storeUint(src.from, 32);
        b_0.storeUint(src.to, 32);
        b_0.storeInt(src.amountToPayInResponse, 257);
    };
}

export function loadAverageRequest(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3337606158) { throw Error('Invalid prefix'); }
    const _from = sc_0.loadUintBig(32);
    const _to = sc_0.loadUintBig(32);
    const _amountToPayInResponse = sc_0.loadIntBig(257);
    return { $$type: 'AverageRequest' as const, from: _from, to: _to, amountToPayInResponse: _amountToPayInResponse };
}

function loadTupleAverageRequest(source: TupleReader) {
    const _from = source.readBigNumber();
    const _to = source.readBigNumber();
    const _amountToPayInResponse = source.readBigNumber();
    return { $$type: 'AverageRequest' as const, from: _from, to: _to, amountToPayInResponse: _amountToPayInResponse };
}

function loadGetterTupleAverageRequest(source: TupleReader) {
    const _from = source.readBigNumber();
    const _to = source.readBigNumber();
    const _amountToPayInResponse = source.readBigNumber();
    return { $$type: 'AverageRequest' as const, from: _from, to: _to, amountToPayInResponse: _amountToPayInResponse };
}

function storeTupleAverageRequest(source: AverageRequest) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.from);
    builder.writeNumber(source.to);
    builder.writeNumber(source.amountToPayInResponse);
    return builder.build();
}

function dictValueParserAverageRequest(): DictionaryValue<AverageRequest> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAverageRequest(src)).endCell());
        },
        parse: (src) => {
            return loadAverageRequest(src.loadRef().beginParse());
        }
    }
}

export type AverageResult = {
    $$type: 'AverageResult';
    res: bigint;
}

export function storeAverageResult(src: AverageResult) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(23842436, 32);
        b_0.storeUint(src.res, 32);
    };
}

export function loadAverageResult(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 23842436) { throw Error('Invalid prefix'); }
    const _res = sc_0.loadUintBig(32);
    return { $$type: 'AverageResult' as const, res: _res };
}

function loadTupleAverageResult(source: TupleReader) {
    const _res = source.readBigNumber();
    return { $$type: 'AverageResult' as const, res: _res };
}

function loadGetterTupleAverageResult(source: TupleReader) {
    const _res = source.readBigNumber();
    return { $$type: 'AverageResult' as const, res: _res };
}

function storeTupleAverageResult(source: AverageResult) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.res);
    return builder.build();
}

function dictValueParserAverageResult(): DictionaryValue<AverageResult> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAverageResult(src)).endCell());
        },
        parse: (src) => {
            return loadAverageResult(src.loadRef().beginParse());
        }
    }
}

export type Calculator$Data = {
    $$type: 'Calculator$Data';
}

export function storeCalculator$Data(src: Calculator$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

export function loadCalculator$Data(slice: Slice) {
    const sc_0 = slice;
    return { $$type: 'Calculator$Data' as const };
}

function loadTupleCalculator$Data(source: TupleReader) {
    return { $$type: 'Calculator$Data' as const };
}

function loadGetterTupleCalculator$Data(source: TupleReader) {
    return { $$type: 'Calculator$Data' as const };
}

function storeTupleCalculator$Data(source: Calculator$Data) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserCalculator$Data(): DictionaryValue<Calculator$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCalculator$Data(src)).endCell());
        },
        parse: (src) => {
            return loadCalculator$Data(src.loadRef().beginParse());
        }
    }
}

export type DoCalculatorRequest = {
    $$type: 'DoCalculatorRequest';
    from: bigint;
    to: bigint;
    amountToPayInRequest: bigint;
    amountToPayInCalculatorResponse: bigint;
}

export function storeDoCalculatorRequest(src: DoCalculatorRequest) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1607210036, 32);
        b_0.storeUint(src.from, 32);
        b_0.storeUint(src.to, 32);
        b_0.storeInt(src.amountToPayInRequest, 257);
        b_0.storeInt(src.amountToPayInCalculatorResponse, 257);
    };
}

export function loadDoCalculatorRequest(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607210036) { throw Error('Invalid prefix'); }
    const _from = sc_0.loadUintBig(32);
    const _to = sc_0.loadUintBig(32);
    const _amountToPayInRequest = sc_0.loadIntBig(257);
    const _amountToPayInCalculatorResponse = sc_0.loadIntBig(257);
    return { $$type: 'DoCalculatorRequest' as const, from: _from, to: _to, amountToPayInRequest: _amountToPayInRequest, amountToPayInCalculatorResponse: _amountToPayInCalculatorResponse };
}

function loadTupleDoCalculatorRequest(source: TupleReader) {
    const _from = source.readBigNumber();
    const _to = source.readBigNumber();
    const _amountToPayInRequest = source.readBigNumber();
    const _amountToPayInCalculatorResponse = source.readBigNumber();
    return { $$type: 'DoCalculatorRequest' as const, from: _from, to: _to, amountToPayInRequest: _amountToPayInRequest, amountToPayInCalculatorResponse: _amountToPayInCalculatorResponse };
}

function loadGetterTupleDoCalculatorRequest(source: TupleReader) {
    const _from = source.readBigNumber();
    const _to = source.readBigNumber();
    const _amountToPayInRequest = source.readBigNumber();
    const _amountToPayInCalculatorResponse = source.readBigNumber();
    return { $$type: 'DoCalculatorRequest' as const, from: _from, to: _to, amountToPayInRequest: _amountToPayInRequest, amountToPayInCalculatorResponse: _amountToPayInCalculatorResponse };
}

function storeTupleDoCalculatorRequest(source: DoCalculatorRequest) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.from);
    builder.writeNumber(source.to);
    builder.writeNumber(source.amountToPayInRequest);
    builder.writeNumber(source.amountToPayInCalculatorResponse);
    return builder.build();
}

function dictValueParserDoCalculatorRequest(): DictionaryValue<DoCalculatorRequest> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDoCalculatorRequest(src)).endCell());
        },
        parse: (src) => {
            return loadDoCalculatorRequest(src.loadRef().beginParse());
        }
    }
}

export type MessageModeTester$Data = {
    $$type: 'MessageModeTester$Data';
    val: bigint;
}

export function storeMessageModeTester$Data(src: MessageModeTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.val, 257);
    };
}

export function loadMessageModeTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _val = sc_0.loadIntBig(257);
    return { $$type: 'MessageModeTester$Data' as const, val: _val };
}

function loadTupleMessageModeTester$Data(source: TupleReader) {
    const _val = source.readBigNumber();
    return { $$type: 'MessageModeTester$Data' as const, val: _val };
}

function loadGetterTupleMessageModeTester$Data(source: TupleReader) {
    const _val = source.readBigNumber();
    return { $$type: 'MessageModeTester$Data' as const, val: _val };
}

function storeTupleMessageModeTester$Data(source: MessageModeTester$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.val);
    return builder.build();
}

function dictValueParserMessageModeTester$Data(): DictionaryValue<MessageModeTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMessageModeTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMessageModeTester$Data(src.loadRef().beginParse());
        }
    }
}

 type Calculator_init_args = {
    $$type: 'Calculator_init_args';
}

function initCalculator_init_args(src: Calculator_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function Calculator_init() {
    const __code = Cell.fromBase64('te6ccgEBBAEA6AABFP8A9KQT9LzyyAsBApjTAdBy1yHSANIA+kAhEDRQZm8E+GEC+GLbPAKRW+BwIddJIMIflTEB0x8C3iGCEMbv1A664wIywAABwSGwmTDIfwHKAMntVOAw8sCCAgMAFO1E0NIAMJFt4G0A+lvTH9MfgQEB1wBVIDOBY3NTEqHC//L0UwGhpHCSXbuVI6ADpAPoMzGpBPhCcALIAYIJa86EWMsfyx/JE3BQNG0DbVAjyM+FgMoAz4RAzgH6AoBpz0ACXG4BbqiTW8+BnVjPhoDPhID0APQAz4Hi9ADJAfsAMMh/AcoAye1U');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initCalculator_init_args({ $$type: 'Calculator_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Calculator_errors: { [key: number]: { message: string } } = {
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
    25459: { message: `There must exist at least one number in the interval.` },
}

const Calculator_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"AverageRequest","header":3337606158,"fields":[{"name":"from","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"to","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"amountToPayInResponse","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"AverageResult","header":23842436,"fields":[{"name":"res","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Calculator$Data","header":null,"fields":[]},
    {"name":"DoCalculatorRequest","header":1607210036,"fields":[{"name":"from","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"to","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"amountToPayInRequest","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amountToPayInCalculatorResponse","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"MessageModeTester$Data","header":null,"fields":[{"name":"val","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const Calculator_getters: ABIGetter[] = [
]

export const Calculator_getterMapping: { [key: string]: string } = {
}

const Calculator_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"AverageRequest"}},
]

export class Calculator implements Contract {
    
    static async init() {
        return await Calculator_init();
    }
    
    static async fromInit() {
        const __gen_init = await Calculator_init();
        const address = contractAddress(0, __gen_init);
        return new Calculator(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new Calculator(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Calculator_types,
        getters: Calculator_getters,
        receivers: Calculator_receivers,
        errors: Calculator_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | AverageRequest) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AverageRequest') {
            body = beginCell().store(storeAverageRequest(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
}