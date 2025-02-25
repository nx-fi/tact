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
    DictionaryValue,
} from "@ton/core";

export type DataSize = {
    $$type: "DataSize";
    cells: bigint;
    bits: bigint;
    refs: bigint;
};

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
    return {
        $$type: "DataSize" as const,
        cells: _cells,
        bits: _bits,
        refs: _refs,
    };
}

function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return {
        $$type: "DataSize" as const,
        cells: _cells,
        bits: _bits,
        refs: _refs,
    };
}

function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return {
        $$type: "DataSize" as const,
        cells: _cells,
        bits: _bits,
        refs: _refs,
    };
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
        },
    };
}

export type StateInit = {
    $$type: "StateInit";
    code: Cell;
    data: Cell;
};

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
    return { $$type: "StateInit" as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: "StateInit" as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: "StateInit" as const, code: _code, data: _data };
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
        },
    };
}

export type Context = {
    $$type: "Context";
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
};

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
    return {
        $$type: "Context" as const,
        bounceable: _bounceable,
        sender: _sender,
        value: _value,
        raw: _raw,
    };
}

function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return {
        $$type: "Context" as const,
        bounceable: _bounceable,
        sender: _sender,
        value: _value,
        raw: _raw,
    };
}

function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return {
        $$type: "Context" as const,
        bounceable: _bounceable,
        sender: _sender,
        value: _value,
        raw: _raw,
    };
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
        },
    };
}

export type SendParameters = {
    $$type: "SendParameters";
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
};

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) {
            b_0.storeBit(true).storeRef(src.body);
        } else {
            b_0.storeBit(false);
        }
        if (src.code !== null && src.code !== undefined) {
            b_0.storeBit(true).storeRef(src.code);
        } else {
            b_0.storeBit(false);
        }
        if (src.data !== null && src.data !== undefined) {
            b_0.storeBit(true).storeRef(src.data);
        } else {
            b_0.storeBit(false);
        }
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
    return {
        $$type: "SendParameters" as const,
        mode: _mode,
        body: _body,
        code: _code,
        data: _data,
        value: _value,
        to: _to,
        bounce: _bounce,
    };
}

function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return {
        $$type: "SendParameters" as const,
        mode: _mode,
        body: _body,
        code: _code,
        data: _data,
        value: _value,
        to: _to,
        bounce: _bounce,
    };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return {
        $$type: "SendParameters" as const,
        mode: _mode,
        body: _body,
        code: _code,
        data: _data,
        value: _value,
        to: _to,
        bounce: _bounce,
    };
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
            builder.storeRef(
                beginCell().store(storeSendParameters(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        },
    };
}

export type DeployParameters = {
    $$type: "DeployParameters";
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
};

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) {
            b_0.storeBit(true).storeRef(src.body);
        } else {
            b_0.storeBit(false);
        }
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
    return {
        $$type: "DeployParameters" as const,
        mode: _mode,
        body: _body,
        value: _value,
        bounce: _bounce,
        init: _init,
    };
}

function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return {
        $$type: "DeployParameters" as const,
        mode: _mode,
        body: _body,
        value: _value,
        bounce: _bounce,
        init: _init,
    };
}

function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return {
        $$type: "DeployParameters" as const,
        mode: _mode,
        body: _body,
        value: _value,
        bounce: _bounce,
        init: _init,
    };
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
            builder.storeRef(
                beginCell().store(storeDeployParameters(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        },
    };
}

export type StdAddress = {
    $$type: "StdAddress";
    workchain: bigint;
    address: bigint;
};

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
    return {
        $$type: "StdAddress" as const,
        workchain: _workchain,
        address: _address,
    };
}

function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return {
        $$type: "StdAddress" as const,
        workchain: _workchain,
        address: _address,
    };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return {
        $$type: "StdAddress" as const,
        workchain: _workchain,
        address: _address,
    };
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
        },
    };
}

export type VarAddress = {
    $$type: "VarAddress";
    workchain: bigint;
    address: Slice;
};

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
    return {
        $$type: "VarAddress" as const,
        workchain: _workchain,
        address: _address,
    };
}

function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return {
        $$type: "VarAddress" as const,
        workchain: _workchain,
        address: _address,
    };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return {
        $$type: "VarAddress" as const,
        workchain: _workchain,
        address: _address,
    };
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
        },
    };
}

export type VarIntStruct = {
    $$type: "VarIntStruct";
    a: bigint;
    b: bigint;
    d: bigint;
    e: bigint;
};

export function storeVarIntStruct(src: VarIntStruct) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeVarInt(src.a, 2);
        b_0.storeVarInt(src.b, 4);
        b_0.storeVarUint(src.d, 2);
        b_0.storeVarUint(src.e, 4);
    };
}

export function loadVarIntStruct(slice: Slice) {
    const sc_0 = slice;
    const _a = sc_0.loadVarIntBig(2);
    const _b = sc_0.loadVarIntBig(4);
    const _d = sc_0.loadVarUintBig(2);
    const _e = sc_0.loadVarUintBig(4);
    return { $$type: "VarIntStruct" as const, a: _a, b: _b, d: _d, e: _e };
}

function loadTupleVarIntStruct(source: TupleReader) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    const _d = source.readBigNumber();
    const _e = source.readBigNumber();
    return { $$type: "VarIntStruct" as const, a: _a, b: _b, d: _d, e: _e };
}

function loadGetterTupleVarIntStruct(source: TupleReader) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    const _d = source.readBigNumber();
    const _e = source.readBigNumber();
    return { $$type: "VarIntStruct" as const, a: _a, b: _b, d: _d, e: _e };
}

function storeTupleVarIntStruct(source: VarIntStruct) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeNumber(source.b);
    builder.writeNumber(source.d);
    builder.writeNumber(source.e);
    return builder.build();
}

function dictValueParserVarIntStruct(): DictionaryValue<VarIntStruct> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeVarIntStruct(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadVarIntStruct(src.loadRef().beginParse());
        },
    };
}

export type StdlibTest$Data = {
    $$type: "StdlibTest$Data";
    v: bigint;
};

export function storeStdlibTest$Data(src: StdlibTest$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.v, 257);
    };
}

export function loadStdlibTest$Data(slice: Slice) {
    const sc_0 = slice;
    const _v = sc_0.loadIntBig(257);
    return { $$type: "StdlibTest$Data" as const, v: _v };
}

function loadTupleStdlibTest$Data(source: TupleReader) {
    const _v = source.readBigNumber();
    return { $$type: "StdlibTest$Data" as const, v: _v };
}

function loadGetterTupleStdlibTest$Data(source: TupleReader) {
    const _v = source.readBigNumber();
    return { $$type: "StdlibTest$Data" as const, v: _v };
}

function storeTupleStdlibTest$Data(source: StdlibTest$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.v);
    return builder.build();
}

function dictValueParserStdlibTest$Data(): DictionaryValue<StdlibTest$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeStdlibTest$Data(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadStdlibTest$Data(src.loadRef().beginParse());
        },
    };
}

type StdlibTest_init_args = {
    $$type: "StdlibTest_init_args";
};

function initStdlibTest_init_args(src: StdlibTest_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function StdlibTest_init() {
    const __code = Cell.fromBase64(
        "te6ccgECWAEAA3EAART/APSkE/S88sgLAQIBYgIDAZLQAdBy1yHSANIA+kAhEDRQZm8E+GEC+GLbPAKRW+BwIddJIMIflTEB0x8wkTLiwAABwSGwn8h/AcoAAQGBAQHPAMntVOAw8sCCVgIBIAQFAgEgBgcCASA2NwIBIA4PAgEgCAkCE7YK+2eLO2eNgnBWCgIBIAsMAAT5QQIPsRG2zzbPDGBWDQIRsbK2zxZ2zwxgVlcABPgmAgEgEBECASAgIQIBIBITAgEgGRoCEa+fbZ4A7Z4YwFYUAgEgFRYARHTXIfpAMXD4KFiCEDuaygAB+kD6AHHXIfoA+gAwbGFw+DoCDqmd2zzbPDFWFwIQqInbPAHbPDFWGABUgQPogQDIgB50yFUwUEP6AwH6B1j6AgH6BsnQ+gH6BfoA+gQwWqBYoAGgAATXZAIPrpftnm2eGMBWGwIBIBwdAAT4BwIQqtvbPFnbPDFWHgIOqVbbPNs8MVYfAAYB9AAABPgqAgEgIiMCASAvMAIBICQlAgEgKywCEKkL2zwB2zwxViYCAUgnKAAExwACDaAHbPNs8MZWKQIPoUts8Ads8MZWKgAE+CQABNdJAhCpL9s8Ads8MVYtAhCqhds8Ads8MVYuAATXZQAE10oCD6wQbZ5tnhjAVjECASAyMwBggQPocPg2gQPoUwBw+DeggQPoIHD4OKCBA+hw+DuggQPoIHD4PKCBA+hw+Dqg+C+gAg6p/ts82zwxVjQCEqkV2zxZ2zxsE1Y1AEbIgQPo+gOBAMj6B4Ae+gJ0+gbJ0PoB+gX6APoEMFqgWKABoAAE+UMCASA4OQIBIFBRAgEgOjsCASBERQIBIDw9AhGwvvbPAHbPDGBWQwIBID4/AhGv2O2eLO2eGMBWQgIQqQXbPFnbPDFWQAIQqO/bPFnbPDFWQQAE1yAABNciAATXIwAI+BT4JgIBIEZHAhOy/bbPAHbPGwSgVk8CEa/UbZ4A7Z4YwFZNAgEgSEkCEKqJ2zwB2zwxVkoCASBLTAAW+AFwgGSRpOQw+AcCD6YdtngDtnhjVk0CD6WZtngDtnhjVk4ABtIAMAAEzzAABPpEAg+1PJtnm2eGMFZSAgFiU1QABPglAhKoy9s8Ads8bBJWVQIQqzvbPFnbPDFWVwAE+kYAIu1E0NIAAZeBAQHXAAEx4DBwAAYBygA=",
    );
    const builder = beginCell();
    builder.storeUint(0, 1);
    initStdlibTest_init_args({ $$type: "StdlibTest_init_args" })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const StdlibTest_errors: { [key: number]: { message: string } } = {
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
    39: {
        message: `Outbound message does not fit into a cell after rewriting`,
    },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: {
        message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree`,
    },
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
};

const StdlibTest_types: ABIType[] = [
    {
        name: "DataSize",
        header: null,
        fields: [
            {
                name: "cells",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "bits",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "refs",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
        ],
    },
    {
        name: "StateInit",
        header: null,
        fields: [
            {
                name: "code",
                type: { kind: "simple", type: "cell", optional: false },
            },
            {
                name: "data",
                type: { kind: "simple", type: "cell", optional: false },
            },
        ],
    },
    {
        name: "Context",
        header: null,
        fields: [
            {
                name: "bounceable",
                type: { kind: "simple", type: "bool", optional: false },
            },
            {
                name: "sender",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "value",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "raw",
                type: { kind: "simple", type: "slice", optional: false },
            },
        ],
    },
    {
        name: "SendParameters",
        header: null,
        fields: [
            {
                name: "mode",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "body",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "code",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "data",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "value",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "to",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "bounce",
                type: { kind: "simple", type: "bool", optional: false },
            },
        ],
    },
    {
        name: "DeployParameters",
        header: null,
        fields: [
            {
                name: "mode",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "body",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "value",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "bounce",
                type: { kind: "simple", type: "bool", optional: false },
            },
            {
                name: "init",
                type: { kind: "simple", type: "StateInit", optional: false },
            },
        ],
    },
    {
        name: "StdAddress",
        header: null,
        fields: [
            {
                name: "workchain",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 8,
                },
            },
            {
                name: "address",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 256,
                },
            },
        ],
    },
    {
        name: "VarAddress",
        header: null,
        fields: [
            {
                name: "workchain",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 32,
                },
            },
            {
                name: "address",
                type: { kind: "simple", type: "slice", optional: false },
            },
        ],
    },
    {
        name: "VarIntStruct",
        header: null,
        fields: [
            {
                name: "a",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: "varint16",
                },
            },
            {
                name: "b",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: "varint32",
                },
            },
            {
                name: "d",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "varuint16",
                },
            },
            {
                name: "e",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "varuint32",
                },
            },
        ],
    },
    {
        name: "StdlibTest$Data",
        header: null,
        fields: [
            {
                name: "v",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
        ],
    },
];

const StdlibTest_getters: ABIGetter[] = [
    {
        name: "sliceEmpty",
        methodId: 73995,
        arguments: [
            {
                name: "sc",
                type: { kind: "simple", type: "slice", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "sliceBits",
        methodId: 75090,
        arguments: [
            {
                name: "sc",
                type: { kind: "simple", type: "slice", optional: false },
            },
        ],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "sliceRefs",
        methodId: 77445,
        arguments: [
            {
                name: "sc",
                type: { kind: "simple", type: "slice", optional: false },
            },
        ],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "storeBool",
        methodId: 95946,
        arguments: [
            {
                name: "bl",
                type: { kind: "simple", type: "builder", optional: false },
            },
            {
                name: "b",
                type: { kind: "simple", type: "bool", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "builder", optional: false },
    },
    {
        name: "loadBool",
        methodId: 109838,
        arguments: [
            {
                name: "sc",
                type: { kind: "simple", type: "slice", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "storeBit",
        methodId: 124731,
        arguments: [
            {
                name: "bl",
                type: { kind: "simple", type: "builder", optional: false },
            },
            {
                name: "b",
                type: { kind: "simple", type: "bool", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "builder", optional: false },
    },
    {
        name: "loadBit",
        methodId: 108456,
        arguments: [
            {
                name: "sc",
                type: { kind: "simple", type: "slice", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "tvm_2023_07_upgrade",
        methodId: 70959,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "tvm_2024_04_upgrade",
        methodId: 77856,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "storeMaybeRef",
        methodId: 72411,
        arguments: [
            {
                name: "bl",
                type: { kind: "simple", type: "builder", optional: false },
            },
            {
                name: "c",
                type: { kind: "simple", type: "cell", optional: true },
            },
        ],
        returnType: { kind: "simple", type: "builder", optional: false },
    },
    {
        name: "parseStdAddress",
        methodId: 113654,
        arguments: [
            {
                name: "slice",
                type: { kind: "simple", type: "slice", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "StdAddress", optional: false },
    },
    {
        name: "parseVarAddress",
        methodId: 123083,
        arguments: [
            {
                name: "slice",
                type: { kind: "simple", type: "slice", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "VarAddress", optional: false },
    },
    {
        name: "parseOriginalFwdFee",
        methodId: 67390,
        arguments: [
            {
                name: "msg",
                type: { kind: "simple", type: "slice", optional: false },
            },
        ],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "builderDepth",
        methodId: 110284,
        arguments: [
            {
                name: "bl",
                type: { kind: "simple", type: "builder", optional: false },
            },
        ],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "skipLastBits",
        methodId: 102321,
        arguments: [
            {
                name: "sc",
                type: { kind: "simple", type: "slice", optional: false },
            },
            {
                name: "n",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
        ],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "firstBits",
        methodId: 98565,
        arguments: [
            {
                name: "sc",
                type: { kind: "simple", type: "slice", optional: false },
            },
            {
                name: "n",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
        ],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "lastBits",
        methodId: 99567,
        arguments: [
            {
                name: "sc",
                type: { kind: "simple", type: "slice", optional: false },
            },
            {
                name: "n",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
        ],
        returnType: { kind: "simple", type: "slice", optional: false },
    },
    {
        name: "sliceDepth",
        methodId: 68745,
        arguments: [
            {
                name: "sc",
                type: { kind: "simple", type: "slice", optional: false },
            },
        ],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "computeDataSizeCell",
        methodId: 86103,
        arguments: [
            {
                name: "c",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "maxCells",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
        ],
        returnType: { kind: "simple", type: "DataSize", optional: false },
    },
    {
        name: "computeDataSizeSlice",
        methodId: 81173,
        arguments: [
            {
                name: "sc",
                type: { kind: "simple", type: "slice", optional: false },
            },
            {
                name: "maxCells",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
        ],
        returnType: { kind: "simple", type: "DataSize", optional: false },
    },
    {
        name: "cellDepth",
        methodId: 76079,
        arguments: [
            {
                name: "c",
                type: { kind: "simple", type: "cell", optional: true },
            },
        ],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "curLt",
        methodId: 117220,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "blockLt",
        methodId: 74753,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "setGasLimit",
        methodId: 109193,
        arguments: [
            {
                name: "gl",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
        ],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "getSeed",
        methodId: 91206,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "setSeed",
        methodId: 103163,
        arguments: [
            {
                name: "seed",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
        ],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "myCode",
        methodId: 73046,
        arguments: [],
        returnType: { kind: "simple", type: "cell", optional: false },
    },
    {
        name: "varIntegers1",
        methodId: 80382,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "varIntegers2",
        methodId: 67997,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
];

export const StdlibTest_getterMapping: { [key: string]: string } = {
    sliceEmpty: "getSliceEmpty",
    sliceBits: "getSliceBits",
    sliceRefs: "getSliceRefs",
    storeBool: "getStoreBool",
    loadBool: "getLoadBool",
    storeBit: "getStoreBit",
    loadBit: "getLoadBit",
    tvm_2023_07_upgrade: "getTvm_2023_07Upgrade",
    tvm_2024_04_upgrade: "getTvm_2024_04Upgrade",
    storeMaybeRef: "getStoreMaybeRef",
    parseStdAddress: "getParseStdAddress",
    parseVarAddress: "getParseVarAddress",
    parseOriginalFwdFee: "getParseOriginalFwdFee",
    builderDepth: "getBuilderDepth",
    skipLastBits: "getSkipLastBits",
    firstBits: "getFirstBits",
    lastBits: "getLastBits",
    sliceDepth: "getSliceDepth",
    computeDataSizeCell: "getComputeDataSizeCell",
    computeDataSizeSlice: "getComputeDataSizeSlice",
    cellDepth: "getCellDepth",
    curLt: "getCurLt",
    blockLt: "getBlockLt",
    setGasLimit: "getSetGasLimit",
    getSeed: "getGetSeed",
    setSeed: "getSetSeed",
    myCode: "getMyCode",
    varIntegers1: "getVarIntegers1",
    varIntegers2: "getVarIntegers2",
};

const StdlibTest_receivers: ABIReceiver[] = [
    { receiver: "internal", message: { kind: "empty" } },
];

export class StdlibTest implements Contract {
    static async init() {
        return await StdlibTest_init();
    }

    static async fromInit() {
        const __gen_init = await StdlibTest_init();
        const address = contractAddress(0, __gen_init);
        return new StdlibTest(address, __gen_init);
    }

    static fromAddress(address: Address) {
        return new StdlibTest(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };
    readonly abi: ContractABI = {
        types: StdlibTest_types,
        getters: StdlibTest_getters,
        receivers: StdlibTest_receivers,
        errors: StdlibTest_errors,
    };

    private constructor(address: Address, init?: { code: Cell; data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(
        provider: ContractProvider,
        via: Sender,
        args: { value: bigint; bounce?: boolean | null | undefined },
        message: null,
    ) {
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (body === null) {
            throw new Error("Invalid message type");
        }

        await provider.internal(via, { ...args, body: body });
    }

    async getSliceEmpty(provider: ContractProvider, sc: Slice) {
        const builder = new TupleBuilder();
        builder.writeSlice(sc.asCell());
        const source = (await provider.get(73995 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getSliceBits(provider: ContractProvider, sc: Slice) {
        const builder = new TupleBuilder();
        builder.writeSlice(sc.asCell());
        const source = (await provider.get(75090 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSliceRefs(provider: ContractProvider, sc: Slice) {
        const builder = new TupleBuilder();
        builder.writeSlice(sc.asCell());
        const source = (await provider.get(77445 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getStoreBool(provider: ContractProvider, bl: Builder, b: boolean) {
        const builder = new TupleBuilder();
        builder.writeBuilder(bl.asCell());
        builder.writeBoolean(b);
        const source = (await provider.get(95946 as any, builder.build()))
            .stack;
        const result = source.readCell().asBuilder();
        return result;
    }

    async getLoadBool(provider: ContractProvider, sc: Slice) {
        const builder = new TupleBuilder();
        builder.writeSlice(sc.asCell());
        const source = (await provider.get(109838 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getStoreBit(provider: ContractProvider, bl: Builder, b: boolean) {
        const builder = new TupleBuilder();
        builder.writeBuilder(bl.asCell());
        builder.writeBoolean(b);
        const source = (await provider.get(124731 as any, builder.build()))
            .stack;
        const result = source.readCell().asBuilder();
        return result;
    }

    async getLoadBit(provider: ContractProvider, sc: Slice) {
        const builder = new TupleBuilder();
        builder.writeSlice(sc.asCell());
        const source = (await provider.get(108456 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getTvm_2023_07Upgrade(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(70959 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getTvm_2024_04Upgrade(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(77856 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getStoreMaybeRef(
        provider: ContractProvider,
        bl: Builder,
        c: Cell | null,
    ) {
        const builder = new TupleBuilder();
        builder.writeBuilder(bl.asCell());
        builder.writeCell(c);
        const source = (await provider.get(72411 as any, builder.build()))
            .stack;
        const result = source.readCell().asBuilder();
        return result;
    }

    async getParseStdAddress(provider: ContractProvider, slice: Slice) {
        const builder = new TupleBuilder();
        builder.writeSlice(slice.asCell());
        const source = (await provider.get(113654 as any, builder.build()))
            .stack;
        const result = loadGetterTupleStdAddress(source);
        return result;
    }

    async getParseVarAddress(provider: ContractProvider, slice: Slice) {
        const builder = new TupleBuilder();
        builder.writeSlice(slice.asCell());
        const source = (await provider.get(123083 as any, builder.build()))
            .stack;
        const result = loadGetterTupleVarAddress(source);
        return result;
    }

    async getParseOriginalFwdFee(provider: ContractProvider, msg: Slice) {
        const builder = new TupleBuilder();
        builder.writeSlice(msg.asCell());
        const source = (await provider.get(67390 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getBuilderDepth(provider: ContractProvider, bl: Builder) {
        const builder = new TupleBuilder();
        builder.writeBuilder(bl.asCell());
        const source = (await provider.get(110284 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSkipLastBits(provider: ContractProvider, sc: Slice, n: bigint) {
        const builder = new TupleBuilder();
        builder.writeSlice(sc.asCell());
        builder.writeNumber(n);
        const source = (await provider.get(102321 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getFirstBits(provider: ContractProvider, sc: Slice, n: bigint) {
        const builder = new TupleBuilder();
        builder.writeSlice(sc.asCell());
        builder.writeNumber(n);
        const source = (await provider.get(98565 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getLastBits(provider: ContractProvider, sc: Slice, n: bigint) {
        const builder = new TupleBuilder();
        builder.writeSlice(sc.asCell());
        builder.writeNumber(n);
        const source = (await provider.get(99567 as any, builder.build()))
            .stack;
        const result = source.readCell().asSlice();
        return result;
    }

    async getSliceDepth(provider: ContractProvider, sc: Slice) {
        const builder = new TupleBuilder();
        builder.writeSlice(sc.asCell());
        const source = (await provider.get(68745 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getComputeDataSizeCell(
        provider: ContractProvider,
        c: Cell | null,
        maxCells: bigint,
    ) {
        const builder = new TupleBuilder();
        builder.writeCell(c);
        builder.writeNumber(maxCells);
        const source = (await provider.get(86103 as any, builder.build()))
            .stack;
        const result = loadGetterTupleDataSize(source);
        return result;
    }

    async getComputeDataSizeSlice(
        provider: ContractProvider,
        sc: Slice,
        maxCells: bigint,
    ) {
        const builder = new TupleBuilder();
        builder.writeSlice(sc.asCell());
        builder.writeNumber(maxCells);
        const source = (await provider.get(81173 as any, builder.build()))
            .stack;
        const result = loadGetterTupleDataSize(source);
        return result;
    }

    async getCellDepth(provider: ContractProvider, c: Cell | null) {
        const builder = new TupleBuilder();
        builder.writeCell(c);
        const source = (await provider.get(76079 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getCurLt(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(117220 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getBlockLt(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(74753 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSetGasLimit(provider: ContractProvider, gl: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(gl);
        const source = (await provider.get(109193 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getGetSeed(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(91206 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSetSeed(provider: ContractProvider, seed: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(seed);
        const source = (await provider.get(103163 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getMyCode(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(73046 as any, builder.build()))
            .stack;
        const result = source.readCell();
        return result;
    }

    async getVarIntegers1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(80382 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getVarIntegers2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(67997 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }
}
