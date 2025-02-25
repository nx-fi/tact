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

export type SetIntMap1 = {
    $$type: "SetIntMap1";
    key: bigint;
    value: bigint | null;
};

export function storeSetIntMap1(src: SetIntMap1) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1510253336, 32);
        b_0.storeInt(src.key, 257);
        if (src.value !== null && src.value !== undefined) {
            b_0.storeBit(true).storeInt(src.value, 257);
        } else {
            b_0.storeBit(false);
        }
    };
}

export function loadSetIntMap1(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1510253336) {
        throw Error("Invalid prefix");
    }
    const _key = sc_0.loadIntBig(257);
    const _value = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: "SetIntMap1" as const, key: _key, value: _value };
}

function loadTupleSetIntMap1(source: TupleReader) {
    const _key = source.readBigNumber();
    const _value = source.readBigNumberOpt();
    return { $$type: "SetIntMap1" as const, key: _key, value: _value };
}

function loadGetterTupleSetIntMap1(source: TupleReader) {
    const _key = source.readBigNumber();
    const _value = source.readBigNumberOpt();
    return { $$type: "SetIntMap1" as const, key: _key, value: _value };
}

function storeTupleSetIntMap1(source: SetIntMap1) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.key);
    builder.writeNumber(source.value);
    return builder.build();
}

function dictValueParserSetIntMap1(): DictionaryValue<SetIntMap1> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetIntMap1(src)).endCell());
        },
        parse: (src) => {
            return loadSetIntMap1(src.loadRef().beginParse());
        },
    };
}

export type SetIntMap2 = {
    $$type: "SetIntMap2";
    key: bigint;
    value: boolean | null;
};

export function storeSetIntMap2(src: SetIntMap2) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1629867766, 32);
        b_0.storeInt(src.key, 257);
        if (src.value !== null && src.value !== undefined) {
            b_0.storeBit(true).storeBit(src.value);
        } else {
            b_0.storeBit(false);
        }
    };
}

export function loadSetIntMap2(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1629867766) {
        throw Error("Invalid prefix");
    }
    const _key = sc_0.loadIntBig(257);
    const _value = sc_0.loadBit() ? sc_0.loadBit() : null;
    return { $$type: "SetIntMap2" as const, key: _key, value: _value };
}

function loadTupleSetIntMap2(source: TupleReader) {
    const _key = source.readBigNumber();
    const _value = source.readBooleanOpt();
    return { $$type: "SetIntMap2" as const, key: _key, value: _value };
}

function loadGetterTupleSetIntMap2(source: TupleReader) {
    const _key = source.readBigNumber();
    const _value = source.readBooleanOpt();
    return { $$type: "SetIntMap2" as const, key: _key, value: _value };
}

function storeTupleSetIntMap2(source: SetIntMap2) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.key);
    builder.writeBoolean(source.value);
    return builder.build();
}

function dictValueParserSetIntMap2(): DictionaryValue<SetIntMap2> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetIntMap2(src)).endCell());
        },
        parse: (src) => {
            return loadSetIntMap2(src.loadRef().beginParse());
        },
    };
}

export type SetIntMap3 = {
    $$type: "SetIntMap3";
    key: bigint;
    value: Cell | null;
};

export function storeSetIntMap3(src: SetIntMap3) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3613954633, 32);
        b_0.storeInt(src.key, 257);
        if (src.value !== null && src.value !== undefined) {
            b_0.storeBit(true).storeRef(src.value);
        } else {
            b_0.storeBit(false);
        }
    };
}

export function loadSetIntMap3(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3613954633) {
        throw Error("Invalid prefix");
    }
    const _key = sc_0.loadIntBig(257);
    const _value = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: "SetIntMap3" as const, key: _key, value: _value };
}

function loadTupleSetIntMap3(source: TupleReader) {
    const _key = source.readBigNumber();
    const _value = source.readCellOpt();
    return { $$type: "SetIntMap3" as const, key: _key, value: _value };
}

function loadGetterTupleSetIntMap3(source: TupleReader) {
    const _key = source.readBigNumber();
    const _value = source.readCellOpt();
    return { $$type: "SetIntMap3" as const, key: _key, value: _value };
}

function storeTupleSetIntMap3(source: SetIntMap3) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.key);
    builder.writeCell(source.value);
    return builder.build();
}

function dictValueParserSetIntMap3(): DictionaryValue<SetIntMap3> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetIntMap3(src)).endCell());
        },
        parse: (src) => {
            return loadSetIntMap3(src.loadRef().beginParse());
        },
    };
}

export type SetIntMap4 = {
    $$type: "SetIntMap4";
    key: bigint;
    value: SomeStruct | null;
};

export function storeSetIntMap4(src: SetIntMap4) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(383013829, 32);
        b_0.storeInt(src.key, 257);
        if (src.value !== null && src.value !== undefined) {
            b_0.storeBit(true);
            b_0.store(storeSomeStruct(src.value));
        } else {
            b_0.storeBit(false);
        }
    };
}

export function loadSetIntMap4(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 383013829) {
        throw Error("Invalid prefix");
    }
    const _key = sc_0.loadIntBig(257);
    const _value = sc_0.loadBit() ? loadSomeStruct(sc_0) : null;
    return { $$type: "SetIntMap4" as const, key: _key, value: _value };
}

function loadTupleSetIntMap4(source: TupleReader) {
    const _key = source.readBigNumber();
    const _value_p = source.readTupleOpt();
    const _value = _value_p ? loadTupleSomeStruct(_value_p) : null;
    return { $$type: "SetIntMap4" as const, key: _key, value: _value };
}

function loadGetterTupleSetIntMap4(source: TupleReader) {
    const _key = source.readBigNumber();
    const _value_p = source.readTupleOpt();
    const _value = _value_p ? loadTupleSomeStruct(_value_p) : null;
    return { $$type: "SetIntMap4" as const, key: _key, value: _value };
}

function storeTupleSetIntMap4(source: SetIntMap4) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.key);
    if (source.value !== null && source.value !== undefined) {
        builder.writeTuple(storeTupleSomeStruct(source.value));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserSetIntMap4(): DictionaryValue<SetIntMap4> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetIntMap4(src)).endCell());
        },
        parse: (src) => {
            return loadSetIntMap4(src.loadRef().beginParse());
        },
    };
}

export type SetAddrMap1 = {
    $$type: "SetAddrMap1";
    key: Address;
    value: bigint | null;
};

export function storeSetAddrMap1(src: SetAddrMap1) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1749966413, 32);
        b_0.storeAddress(src.key);
        if (src.value !== null && src.value !== undefined) {
            b_0.storeBit(true).storeInt(src.value, 257);
        } else {
            b_0.storeBit(false);
        }
    };
}

export function loadSetAddrMap1(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1749966413) {
        throw Error("Invalid prefix");
    }
    const _key = sc_0.loadAddress();
    const _value = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: "SetAddrMap1" as const, key: _key, value: _value };
}

function loadTupleSetAddrMap1(source: TupleReader) {
    const _key = source.readAddress();
    const _value = source.readBigNumberOpt();
    return { $$type: "SetAddrMap1" as const, key: _key, value: _value };
}

function loadGetterTupleSetAddrMap1(source: TupleReader) {
    const _key = source.readAddress();
    const _value = source.readBigNumberOpt();
    return { $$type: "SetAddrMap1" as const, key: _key, value: _value };
}

function storeTupleSetAddrMap1(source: SetAddrMap1) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.key);
    builder.writeNumber(source.value);
    return builder.build();
}

function dictValueParserSetAddrMap1(): DictionaryValue<SetAddrMap1> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeSetAddrMap1(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadSetAddrMap1(src.loadRef().beginParse());
        },
    };
}

export type SetAddrMap2 = {
    $$type: "SetAddrMap2";
    key: Address;
    value: boolean | null;
};

export function storeSetAddrMap2(src: SetAddrMap2) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(624157584, 32);
        b_0.storeAddress(src.key);
        if (src.value !== null && src.value !== undefined) {
            b_0.storeBit(true).storeBit(src.value);
        } else {
            b_0.storeBit(false);
        }
    };
}

export function loadSetAddrMap2(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 624157584) {
        throw Error("Invalid prefix");
    }
    const _key = sc_0.loadAddress();
    const _value = sc_0.loadBit() ? sc_0.loadBit() : null;
    return { $$type: "SetAddrMap2" as const, key: _key, value: _value };
}

function loadTupleSetAddrMap2(source: TupleReader) {
    const _key = source.readAddress();
    const _value = source.readBooleanOpt();
    return { $$type: "SetAddrMap2" as const, key: _key, value: _value };
}

function loadGetterTupleSetAddrMap2(source: TupleReader) {
    const _key = source.readAddress();
    const _value = source.readBooleanOpt();
    return { $$type: "SetAddrMap2" as const, key: _key, value: _value };
}

function storeTupleSetAddrMap2(source: SetAddrMap2) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.key);
    builder.writeBoolean(source.value);
    return builder.build();
}

function dictValueParserSetAddrMap2(): DictionaryValue<SetAddrMap2> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeSetAddrMap2(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadSetAddrMap2(src.loadRef().beginParse());
        },
    };
}

export type SetAddrMap3 = {
    $$type: "SetAddrMap3";
    key: Address;
    value: Cell | null;
};

export function storeSetAddrMap3(src: SetAddrMap3) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4276365062, 32);
        b_0.storeAddress(src.key);
        if (src.value !== null && src.value !== undefined) {
            b_0.storeBit(true).storeRef(src.value);
        } else {
            b_0.storeBit(false);
        }
    };
}

export function loadSetAddrMap3(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4276365062) {
        throw Error("Invalid prefix");
    }
    const _key = sc_0.loadAddress();
    const _value = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: "SetAddrMap3" as const, key: _key, value: _value };
}

function loadTupleSetAddrMap3(source: TupleReader) {
    const _key = source.readAddress();
    const _value = source.readCellOpt();
    return { $$type: "SetAddrMap3" as const, key: _key, value: _value };
}

function loadGetterTupleSetAddrMap3(source: TupleReader) {
    const _key = source.readAddress();
    const _value = source.readCellOpt();
    return { $$type: "SetAddrMap3" as const, key: _key, value: _value };
}

function storeTupleSetAddrMap3(source: SetAddrMap3) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.key);
    builder.writeCell(source.value);
    return builder.build();
}

function dictValueParserSetAddrMap3(): DictionaryValue<SetAddrMap3> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeSetAddrMap3(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadSetAddrMap3(src.loadRef().beginParse());
        },
    };
}

export type SetAddrMap4 = {
    $$type: "SetAddrMap4";
    key: Address;
    value: SomeStruct | null;
};

export function storeSetAddrMap4(src: SetAddrMap4) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1683777913, 32);
        b_0.storeAddress(src.key);
        if (src.value !== null && src.value !== undefined) {
            b_0.storeBit(true);
            b_0.store(storeSomeStruct(src.value));
        } else {
            b_0.storeBit(false);
        }
    };
}

export function loadSetAddrMap4(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1683777913) {
        throw Error("Invalid prefix");
    }
    const _key = sc_0.loadAddress();
    const _value = sc_0.loadBit() ? loadSomeStruct(sc_0) : null;
    return { $$type: "SetAddrMap4" as const, key: _key, value: _value };
}

function loadTupleSetAddrMap4(source: TupleReader) {
    const _key = source.readAddress();
    const _value_p = source.readTupleOpt();
    const _value = _value_p ? loadTupleSomeStruct(_value_p) : null;
    return { $$type: "SetAddrMap4" as const, key: _key, value: _value };
}

function loadGetterTupleSetAddrMap4(source: TupleReader) {
    const _key = source.readAddress();
    const _value_p = source.readTupleOpt();
    const _value = _value_p ? loadTupleSomeStruct(_value_p) : null;
    return { $$type: "SetAddrMap4" as const, key: _key, value: _value };
}

function storeTupleSetAddrMap4(source: SetAddrMap4) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.key);
    if (source.value !== null && source.value !== undefined) {
        builder.writeTuple(storeTupleSomeStruct(source.value));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserSetAddrMap4(): DictionaryValue<SetAddrMap4> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeSetAddrMap4(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadSetAddrMap4(src.loadRef().beginParse());
        },
    };
}

export type SomeStruct = {
    $$type: "SomeStruct";
    value: bigint;
};

export function storeSomeStruct(src: SomeStruct) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.value, 257);
    };
}

export function loadSomeStruct(slice: Slice) {
    const sc_0 = slice;
    const _value = sc_0.loadIntBig(257);
    return { $$type: "SomeStruct" as const, value: _value };
}

function loadTupleSomeStruct(source: TupleReader) {
    const _value = source.readBigNumber();
    return { $$type: "SomeStruct" as const, value: _value };
}

function loadGetterTupleSomeStruct(source: TupleReader) {
    const _value = source.readBigNumber();
    return { $$type: "SomeStruct" as const, value: _value };
}

function storeTupleSomeStruct(source: SomeStruct) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.value);
    return builder.build();
}

function dictValueParserSomeStruct(): DictionaryValue<SomeStruct> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSomeStruct(src)).endCell());
        },
        parse: (src) => {
            return loadSomeStruct(src.loadRef().beginParse());
        },
    };
}

export type SomeStruct2 = {
    $$type: "SomeStruct2";
    value: bigint;
    intMap1: Dictionary<number, number>;
};

export function storeSomeStruct2(src: SomeStruct2) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.value, 257);
        b_0.storeDict(
            src.intMap1,
            Dictionary.Keys.Uint(8),
            Dictionary.Values.Uint(8),
        );
    };
}

export function loadSomeStruct2(slice: Slice) {
    const sc_0 = slice;
    const _value = sc_0.loadIntBig(257);
    const _intMap1 = Dictionary.load(
        Dictionary.Keys.Uint(8),
        Dictionary.Values.Uint(8),
        sc_0,
    );
    return { $$type: "SomeStruct2" as const, value: _value, intMap1: _intMap1 };
}

function loadTupleSomeStruct2(source: TupleReader) {
    const _value = source.readBigNumber();
    const _intMap1 = Dictionary.loadDirect(
        Dictionary.Keys.Uint(8),
        Dictionary.Values.Uint(8),
        source.readCellOpt(),
    );
    return { $$type: "SomeStruct2" as const, value: _value, intMap1: _intMap1 };
}

function loadGetterTupleSomeStruct2(source: TupleReader) {
    const _value = source.readBigNumber();
    const _intMap1 = Dictionary.loadDirect(
        Dictionary.Keys.Uint(8),
        Dictionary.Values.Uint(8),
        source.readCellOpt(),
    );
    return { $$type: "SomeStruct2" as const, value: _value, intMap1: _intMap1 };
}

function storeTupleSomeStruct2(source: SomeStruct2) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.value);
    builder.writeCell(
        source.intMap1.size > 0
            ? beginCell()
                  .storeDictDirect(
                      source.intMap1,
                      Dictionary.Keys.Uint(8),
                      Dictionary.Values.Uint(8),
                  )
                  .endCell()
            : null,
    );
    return builder.build();
}

function dictValueParserSomeStruct2(): DictionaryValue<SomeStruct2> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeSomeStruct2(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadSomeStruct2(src.loadRef().beginParse());
        },
    };
}

export type MapTestContract$Data = {
    $$type: "MapTestContract$Data";
    intMap1: Dictionary<number, number>;
    intMap2: Dictionary<bigint, boolean>;
    intMap3: Dictionary<bigint, Cell>;
    intMap4: Dictionary<bigint, SomeStruct>;
    addrMap1: Dictionary<Address, bigint>;
    addrMap2: Dictionary<Address, boolean>;
    addrMap3: Dictionary<Address, Cell>;
    addrMap4: Dictionary<Address, SomeStruct>;
};

export function storeMapTestContract$Data(src: MapTestContract$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeDict(
            src.intMap1,
            Dictionary.Keys.Uint(8),
            Dictionary.Values.Uint(8),
        );
        b_0.storeDict(
            src.intMap2,
            Dictionary.Keys.BigInt(257),
            Dictionary.Values.Bool(),
        );
        const b_1 = new Builder();
        b_1.storeDict(
            src.intMap3,
            Dictionary.Keys.BigInt(257),
            Dictionary.Values.Cell(),
        );
        b_1.storeDict(
            src.intMap4,
            Dictionary.Keys.BigInt(257),
            dictValueParserSomeStruct(),
        );
        b_1.storeDict(
            src.addrMap1,
            Dictionary.Keys.Address(),
            Dictionary.Values.BigInt(257),
        );
        const b_2 = new Builder();
        b_2.storeDict(
            src.addrMap2,
            Dictionary.Keys.Address(),
            Dictionary.Values.Bool(),
        );
        b_2.storeDict(
            src.addrMap3,
            Dictionary.Keys.Address(),
            Dictionary.Values.Cell(),
        );
        b_2.storeDict(
            src.addrMap4,
            Dictionary.Keys.Address(),
            dictValueParserSomeStruct(),
        );
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMapTestContract$Data(slice: Slice) {
    const sc_0 = slice;
    const _intMap1 = Dictionary.load(
        Dictionary.Keys.Uint(8),
        Dictionary.Values.Uint(8),
        sc_0,
    );
    const _intMap2 = Dictionary.load(
        Dictionary.Keys.BigInt(257),
        Dictionary.Values.Bool(),
        sc_0,
    );
    const sc_1 = sc_0.loadRef().beginParse();
    const _intMap3 = Dictionary.load(
        Dictionary.Keys.BigInt(257),
        Dictionary.Values.Cell(),
        sc_1,
    );
    const _intMap4 = Dictionary.load(
        Dictionary.Keys.BigInt(257),
        dictValueParserSomeStruct(),
        sc_1,
    );
    const _addrMap1 = Dictionary.load(
        Dictionary.Keys.Address(),
        Dictionary.Values.BigInt(257),
        sc_1,
    );
    const sc_2 = sc_1.loadRef().beginParse();
    const _addrMap2 = Dictionary.load(
        Dictionary.Keys.Address(),
        Dictionary.Values.Bool(),
        sc_2,
    );
    const _addrMap3 = Dictionary.load(
        Dictionary.Keys.Address(),
        Dictionary.Values.Cell(),
        sc_2,
    );
    const _addrMap4 = Dictionary.load(
        Dictionary.Keys.Address(),
        dictValueParserSomeStruct(),
        sc_2,
    );
    return {
        $$type: "MapTestContract$Data" as const,
        intMap1: _intMap1,
        intMap2: _intMap2,
        intMap3: _intMap3,
        intMap4: _intMap4,
        addrMap1: _addrMap1,
        addrMap2: _addrMap2,
        addrMap3: _addrMap3,
        addrMap4: _addrMap4,
    };
}

function loadTupleMapTestContract$Data(source: TupleReader) {
    const _intMap1 = Dictionary.loadDirect(
        Dictionary.Keys.Uint(8),
        Dictionary.Values.Uint(8),
        source.readCellOpt(),
    );
    const _intMap2 = Dictionary.loadDirect(
        Dictionary.Keys.BigInt(257),
        Dictionary.Values.Bool(),
        source.readCellOpt(),
    );
    const _intMap3 = Dictionary.loadDirect(
        Dictionary.Keys.BigInt(257),
        Dictionary.Values.Cell(),
        source.readCellOpt(),
    );
    const _intMap4 = Dictionary.loadDirect(
        Dictionary.Keys.BigInt(257),
        dictValueParserSomeStruct(),
        source.readCellOpt(),
    );
    const _addrMap1 = Dictionary.loadDirect(
        Dictionary.Keys.Address(),
        Dictionary.Values.BigInt(257),
        source.readCellOpt(),
    );
    const _addrMap2 = Dictionary.loadDirect(
        Dictionary.Keys.Address(),
        Dictionary.Values.Bool(),
        source.readCellOpt(),
    );
    const _addrMap3 = Dictionary.loadDirect(
        Dictionary.Keys.Address(),
        Dictionary.Values.Cell(),
        source.readCellOpt(),
    );
    const _addrMap4 = Dictionary.loadDirect(
        Dictionary.Keys.Address(),
        dictValueParserSomeStruct(),
        source.readCellOpt(),
    );
    return {
        $$type: "MapTestContract$Data" as const,
        intMap1: _intMap1,
        intMap2: _intMap2,
        intMap3: _intMap3,
        intMap4: _intMap4,
        addrMap1: _addrMap1,
        addrMap2: _addrMap2,
        addrMap3: _addrMap3,
        addrMap4: _addrMap4,
    };
}

function loadGetterTupleMapTestContract$Data(source: TupleReader) {
    const _intMap1 = Dictionary.loadDirect(
        Dictionary.Keys.Uint(8),
        Dictionary.Values.Uint(8),
        source.readCellOpt(),
    );
    const _intMap2 = Dictionary.loadDirect(
        Dictionary.Keys.BigInt(257),
        Dictionary.Values.Bool(),
        source.readCellOpt(),
    );
    const _intMap3 = Dictionary.loadDirect(
        Dictionary.Keys.BigInt(257),
        Dictionary.Values.Cell(),
        source.readCellOpt(),
    );
    const _intMap4 = Dictionary.loadDirect(
        Dictionary.Keys.BigInt(257),
        dictValueParserSomeStruct(),
        source.readCellOpt(),
    );
    const _addrMap1 = Dictionary.loadDirect(
        Dictionary.Keys.Address(),
        Dictionary.Values.BigInt(257),
        source.readCellOpt(),
    );
    const _addrMap2 = Dictionary.loadDirect(
        Dictionary.Keys.Address(),
        Dictionary.Values.Bool(),
        source.readCellOpt(),
    );
    const _addrMap3 = Dictionary.loadDirect(
        Dictionary.Keys.Address(),
        Dictionary.Values.Cell(),
        source.readCellOpt(),
    );
    const _addrMap4 = Dictionary.loadDirect(
        Dictionary.Keys.Address(),
        dictValueParserSomeStruct(),
        source.readCellOpt(),
    );
    return {
        $$type: "MapTestContract$Data" as const,
        intMap1: _intMap1,
        intMap2: _intMap2,
        intMap3: _intMap3,
        intMap4: _intMap4,
        addrMap1: _addrMap1,
        addrMap2: _addrMap2,
        addrMap3: _addrMap3,
        addrMap4: _addrMap4,
    };
}

function storeTupleMapTestContract$Data(source: MapTestContract$Data) {
    const builder = new TupleBuilder();
    builder.writeCell(
        source.intMap1.size > 0
            ? beginCell()
                  .storeDictDirect(
                      source.intMap1,
                      Dictionary.Keys.Uint(8),
                      Dictionary.Values.Uint(8),
                  )
                  .endCell()
            : null,
    );
    builder.writeCell(
        source.intMap2.size > 0
            ? beginCell()
                  .storeDictDirect(
                      source.intMap2,
                      Dictionary.Keys.BigInt(257),
                      Dictionary.Values.Bool(),
                  )
                  .endCell()
            : null,
    );
    builder.writeCell(
        source.intMap3.size > 0
            ? beginCell()
                  .storeDictDirect(
                      source.intMap3,
                      Dictionary.Keys.BigInt(257),
                      Dictionary.Values.Cell(),
                  )
                  .endCell()
            : null,
    );
    builder.writeCell(
        source.intMap4.size > 0
            ? beginCell()
                  .storeDictDirect(
                      source.intMap4,
                      Dictionary.Keys.BigInt(257),
                      dictValueParserSomeStruct(),
                  )
                  .endCell()
            : null,
    );
    builder.writeCell(
        source.addrMap1.size > 0
            ? beginCell()
                  .storeDictDirect(
                      source.addrMap1,
                      Dictionary.Keys.Address(),
                      Dictionary.Values.BigInt(257),
                  )
                  .endCell()
            : null,
    );
    builder.writeCell(
        source.addrMap2.size > 0
            ? beginCell()
                  .storeDictDirect(
                      source.addrMap2,
                      Dictionary.Keys.Address(),
                      Dictionary.Values.Bool(),
                  )
                  .endCell()
            : null,
    );
    builder.writeCell(
        source.addrMap3.size > 0
            ? beginCell()
                  .storeDictDirect(
                      source.addrMap3,
                      Dictionary.Keys.Address(),
                      Dictionary.Values.Cell(),
                  )
                  .endCell()
            : null,
    );
    builder.writeCell(
        source.addrMap4.size > 0
            ? beginCell()
                  .storeDictDirect(
                      source.addrMap4,
                      Dictionary.Keys.Address(),
                      dictValueParserSomeStruct(),
                  )
                  .endCell()
            : null,
    );
    return builder.build();
}

function dictValueParserMapTestContract$Data(): DictionaryValue<MapTestContract$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeMapTestContract$Data(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadMapTestContract$Data(src.loadRef().beginParse());
        },
    };
}

type MapTestContract_init_args = {
    $$type: "MapTestContract_init_args";
};

function initMapTestContract_init_args(src: MapTestContract_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function MapTestContract_init() {
    const __code = Cell.fromBase64(
        "te6ccgECOwEABgcAART/APSkE/S88sgLAQIBYgIDBIbQAdBy1yHSANIA+kAhEDRQZm8E+GEC+GLbPAmSXwngB4Ag1wVvozAhghBaBKMYuuMCIYIQYSXO9rrjAiGCENdokkm6OQQFBgIBIAwNAL4xgQEB1wDSAAGVgQEB1wCSbQHiWTJ4IBBJEyFulVtZ9FswmMgBzwFBM/RD4gcQRhA1RDASyH8BygBVcFB49AAFyPQAFPQAEvQAAcj0ABL0ABP0ABP0AMkBzMkBzMntVAC6MYEBAdcA0gABktIAkm0B4lkyECaBAQECcSFulVtZ9FowmMgBzwBBM/RC4hBXBhA1RAPIfwHKAFVwUHj0AAXI9AAU9AAS9AAByPQAEvQAE/QAE/QAyQHMyQHMye1UBP6OVzGBAQHXANIAAZHUkm0B4lkyECWBAQECIG6VMFn0WjCUQTP0FeIQVxBGRDUSyH8BygBVcFB49AAFyPQAFPQAEvQAAcj0ABL0ABP0ABP0AMkBzMkBzMntVOAhghAW1FPFuuMCIYIQaE5eTbrjAiGCECUz45C64wIhghD+5CcGBwgJCgDsMYEBAdcA0gABmIEBAdcAAW8BkW3iEoEBATMgbpIwbY4QIG7y0IBvIcgBAYEBAc8AyeIQNSBulTBZ9FowlEEz9BXiEFcQRhA1UEQDyH8BygBVcFB49AAFyPQAFPQAEvQAAcj0ABL0ABP0ABP0AMkBzMkBzMntVADAMfpA0gABlYEBAdcAkm0B4lkyECOBAQsCgQEBIW6VW1n0WTCYyAHPAEEz9EHiEFcQRhA1QUPIfwHKAFVwUHj0AAXI9AAU9AAS9AAByPQAEvQAE/QAE/QAyQHMyQHMye1UAKgx+kDSAAGS0gCSbQHiWYEBCzNxIW6VW1n0WTCYyAHPAEEz9EHiEFdVFMh/AcoAVXBQePQABcj0ABT0ABL0AAHI9AAS9AAT9AAT9ADJAczJAczJ7VQB0LqOVTH6QNIAAZHUkm0B4lkyECiBAQsCIG6VMFn0WTCUQTP0E+IQVxBGEDVEA8h/AcoAVXBQePQABcj0ABT0ABL0AAHI9AAS9AAT9AAT9ADJAczJAczJ7VTgAYIQZFxpebrjAl8J8sCCCwDk+kDSAAGYgQEB1wABbwGRbeISgQELMyBukjBtjhAgbvLQgG8hyAEBgQEBzwDJ4hA6IG6VMFn0WTCUQTP0E+IQVxBGEDVEMBLIfwHKAFVwUHj0AAXI9AAU9AAS9AAByPQAEvQAE/QAE/QAyQHMyQHMye1UAgEgDg8CASAwMQIBIBARAgEgICECASASEwIBIBkaAgEgFBUCFbIpNs8VQfbPGyBgORgCEa9D7Z5tnjZAwDkWAhWtqm2eKoPtnjZAwDkXAAInACqBAQskAnFBM/QKb6GUAdcAMJJbbeIAHIEBAScCWfQNb6GSMG3fAhGxsXbPNs8bIGA5GwIBIBwdAAIlAhGvcm2ebZ42QMA5HgIRruJtnm2eNkDAOR8AAiYAAiACASAiIwIRtaw7Z5tnjZAwOS8CAW4kJQIBICgpAg+mR7Z5tnjZAzkmAhOl6bZ4qg+2eNkDOScAAiEAHIEBCyMCWfQLb6GSMG3fAhGvEW2ebZ42QMA5KgIDooIrLAACJAINa2zzbPGyBjktAhHW2eKoPtnjZAw5LgACIgAqgQEBKAJxQTP0DG+hlAHXADCSW23iAAIjAgFIMjMCAUg2NwJBsa12zxVB9s8bIEgbpIwbZkgbvLQgG8hbwHiIG6SMG3egOTQCFbD5Ns8VQfbPGyBgOTUAPoEBCyICWfQLb6GSMG3fIG6SMG2a0IEBAdcAATFvAeIAKHhTCVAzQTP0Dm+hlAHXATCSW23iAhWxbTbPFUH2zxsgYDk4AkGwOXbPFUH2zxsgSBukjBtmSBu8tCAbyFvAeIgbpIwbd6A5OgAugQELJQKBAQFBM/QKb6GUAdcAMJJbbeIAWu1E0NIAAY4b9ATUAdD0BPQE9ATUMND0BPQE9AT0BDAQeGwY4DBtbW1tbW1tbQA+gQEBJgJZ9A1voZIwbd8gbpIwbZrQgQEB1wABMW8B4g==",
    );
    const builder = beginCell();
    builder.storeUint(0, 1);
    initMapTestContract_init_args({ $$type: "MapTestContract_init_args" })(
        builder,
    );
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const MapTestContract_errors: { [key: number]: { message: string } } = {
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

const MapTestContract_types: ABIType[] = [
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
        name: "SetIntMap1",
        header: 1510253336,
        fields: [
            {
                name: "key",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "value",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: true,
                    format: 257,
                },
            },
        ],
    },
    {
        name: "SetIntMap2",
        header: 1629867766,
        fields: [
            {
                name: "key",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "value",
                type: { kind: "simple", type: "bool", optional: true },
            },
        ],
    },
    {
        name: "SetIntMap3",
        header: 3613954633,
        fields: [
            {
                name: "key",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "value",
                type: { kind: "simple", type: "cell", optional: true },
            },
        ],
    },
    {
        name: "SetIntMap4",
        header: 383013829,
        fields: [
            {
                name: "key",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "value",
                type: { kind: "simple", type: "SomeStruct", optional: true },
            },
        ],
    },
    {
        name: "SetAddrMap1",
        header: 1749966413,
        fields: [
            {
                name: "key",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "value",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: true,
                    format: 257,
                },
            },
        ],
    },
    {
        name: "SetAddrMap2",
        header: 624157584,
        fields: [
            {
                name: "key",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "value",
                type: { kind: "simple", type: "bool", optional: true },
            },
        ],
    },
    {
        name: "SetAddrMap3",
        header: 4276365062,
        fields: [
            {
                name: "key",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "value",
                type: { kind: "simple", type: "cell", optional: true },
            },
        ],
    },
    {
        name: "SetAddrMap4",
        header: 1683777913,
        fields: [
            {
                name: "key",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "value",
                type: { kind: "simple", type: "SomeStruct", optional: true },
            },
        ],
    },
    {
        name: "SomeStruct",
        header: null,
        fields: [
            {
                name: "value",
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
        name: "SomeStruct2",
        header: null,
        fields: [
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
                name: "intMap1",
                type: {
                    kind: "dict",
                    key: "uint",
                    keyFormat: 8,
                    value: "uint",
                    valueFormat: 8,
                },
            },
        ],
    },
    {
        name: "MapTestContract$Data",
        header: null,
        fields: [
            {
                name: "intMap1",
                type: {
                    kind: "dict",
                    key: "uint",
                    keyFormat: 8,
                    value: "uint",
                    valueFormat: 8,
                },
            },
            {
                name: "intMap2",
                type: { kind: "dict", key: "int", value: "bool" },
            },
            {
                name: "intMap3",
                type: {
                    kind: "dict",
                    key: "int",
                    value: "cell",
                    valueFormat: "ref",
                },
            },
            {
                name: "intMap4",
                type: {
                    kind: "dict",
                    key: "int",
                    value: "SomeStruct",
                    valueFormat: "ref",
                },
            },
            {
                name: "addrMap1",
                type: { kind: "dict", key: "address", value: "int" },
            },
            {
                name: "addrMap2",
                type: { kind: "dict", key: "address", value: "bool" },
            },
            {
                name: "addrMap3",
                type: {
                    kind: "dict",
                    key: "address",
                    value: "cell",
                    valueFormat: "ref",
                },
            },
            {
                name: "addrMap4",
                type: {
                    kind: "dict",
                    key: "address",
                    value: "SomeStruct",
                    valueFormat: "ref",
                },
            },
        ],
    },
];

const MapTestContract_getters: ABIGetter[] = [
    {
        name: "intMap1",
        methodId: 67207,
        arguments: [],
        returnType: {
            kind: "dict",
            key: "uint",
            keyFormat: 8,
            value: "uint",
            valueFormat: 8,
        },
    },
    {
        name: "intMap1Value",
        methodId: 103396,
        arguments: [
            {
                name: "key",
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
            optional: true,
            format: 257,
        },
    },
    {
        name: "intMap2",
        methodId: 79588,
        arguments: [],
        returnType: { kind: "dict", key: "int", value: "bool" },
    },
    {
        name: "intMap2Value",
        methodId: 89348,
        arguments: [
            {
                name: "key",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: true },
    },
    {
        name: "intMap3",
        methodId: 75461,
        arguments: [],
        returnType: {
            kind: "dict",
            key: "int",
            value: "cell",
            valueFormat: "ref",
        },
    },
    {
        name: "intMap3Value",
        methodId: 71844,
        arguments: [
            {
                name: "key",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
        ],
        returnType: { kind: "simple", type: "cell", optional: true },
    },
    {
        name: "intMap4",
        methodId: 87586,
        arguments: [],
        returnType: {
            kind: "dict",
            key: "int",
            value: "SomeStruct",
            valueFormat: "ref",
        },
    },
    {
        name: "intMap4Value",
        methodId: 119013,
        arguments: [
            {
                name: "key",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
        ],
        returnType: { kind: "simple", type: "SomeStruct", optional: true },
    },
    {
        name: "addrMap1",
        methodId: 93537,
        arguments: [],
        returnType: { kind: "dict", key: "address", value: "int" },
    },
    {
        name: "addrMap1Value",
        methodId: 116148,
        arguments: [
            {
                name: "key",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
        returnType: {
            kind: "simple",
            type: "int",
            optional: true,
            format: 257,
        },
    },
    {
        name: "addrMap2",
        methodId: 89346,
        arguments: [],
        returnType: { kind: "dict", key: "address", value: "bool" },
    },
    {
        name: "addrMap2Value",
        methodId: 68436,
        arguments: [
            {
                name: "key",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: true },
    },
    {
        name: "addrMap3",
        methodId: 85283,
        arguments: [],
        returnType: {
            kind: "dict",
            key: "address",
            value: "cell",
            valueFormat: "ref",
        },
    },
    {
        name: "addrMap3Value",
        methodId: 85748,
        arguments: [
            {
                name: "key",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "cell", optional: true },
    },
    {
        name: "addrMap4",
        methodId: 81348,
        arguments: [],
        returnType: {
            kind: "dict",
            key: "address",
            value: "SomeStruct",
            valueFormat: "ref",
        },
    },
    {
        name: "addrMap4Value",
        methodId: 100021,
        arguments: [
            {
                name: "key",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "SomeStruct", optional: true },
    },
];

export const MapTestContract_getterMapping: { [key: string]: string } = {
    intMap1: "getIntMap1",
    intMap1Value: "getIntMap1Value",
    intMap2: "getIntMap2",
    intMap2Value: "getIntMap2Value",
    intMap3: "getIntMap3",
    intMap3Value: "getIntMap3Value",
    intMap4: "getIntMap4",
    intMap4Value: "getIntMap4Value",
    addrMap1: "getAddrMap1",
    addrMap1Value: "getAddrMap1Value",
    addrMap2: "getAddrMap2",
    addrMap2Value: "getAddrMap2Value",
    addrMap3: "getAddrMap3",
    addrMap3Value: "getAddrMap3Value",
    addrMap4: "getAddrMap4",
    addrMap4Value: "getAddrMap4Value",
};

const MapTestContract_receivers: ABIReceiver[] = [
    { receiver: "internal", message: { kind: "typed", type: "SetIntMap1" } },
    { receiver: "internal", message: { kind: "typed", type: "SetIntMap2" } },
    { receiver: "internal", message: { kind: "typed", type: "SetIntMap3" } },
    { receiver: "internal", message: { kind: "typed", type: "SetIntMap4" } },
    { receiver: "internal", message: { kind: "typed", type: "SetAddrMap1" } },
    { receiver: "internal", message: { kind: "typed", type: "SetAddrMap2" } },
    { receiver: "internal", message: { kind: "typed", type: "SetAddrMap3" } },
    { receiver: "internal", message: { kind: "typed", type: "SetAddrMap4" } },
];

export class MapTestContract implements Contract {
    static async init() {
        return await MapTestContract_init();
    }

    static async fromInit() {
        const __gen_init = await MapTestContract_init();
        const address = contractAddress(0, __gen_init);
        return new MapTestContract(address, __gen_init);
    }

    static fromAddress(address: Address) {
        return new MapTestContract(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };
    readonly abi: ContractABI = {
        types: MapTestContract_types,
        getters: MapTestContract_getters,
        receivers: MapTestContract_receivers,
        errors: MapTestContract_errors,
    };

    private constructor(address: Address, init?: { code: Cell; data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(
        provider: ContractProvider,
        via: Sender,
        args: { value: bigint; bounce?: boolean | null | undefined },
        message:
            | SetIntMap1
            | SetIntMap2
            | SetIntMap3
            | SetIntMap4
            | SetAddrMap1
            | SetAddrMap2
            | SetAddrMap3
            | SetAddrMap4,
    ) {
        let body: Cell | null = null;
        if (
            message &&
            typeof message === "object" &&
            !(message instanceof Slice) &&
            message.$$type === "SetIntMap1"
        ) {
            body = beginCell().store(storeSetIntMap1(message)).endCell();
        }
        if (
            message &&
            typeof message === "object" &&
            !(message instanceof Slice) &&
            message.$$type === "SetIntMap2"
        ) {
            body = beginCell().store(storeSetIntMap2(message)).endCell();
        }
        if (
            message &&
            typeof message === "object" &&
            !(message instanceof Slice) &&
            message.$$type === "SetIntMap3"
        ) {
            body = beginCell().store(storeSetIntMap3(message)).endCell();
        }
        if (
            message &&
            typeof message === "object" &&
            !(message instanceof Slice) &&
            message.$$type === "SetIntMap4"
        ) {
            body = beginCell().store(storeSetIntMap4(message)).endCell();
        }
        if (
            message &&
            typeof message === "object" &&
            !(message instanceof Slice) &&
            message.$$type === "SetAddrMap1"
        ) {
            body = beginCell().store(storeSetAddrMap1(message)).endCell();
        }
        if (
            message &&
            typeof message === "object" &&
            !(message instanceof Slice) &&
            message.$$type === "SetAddrMap2"
        ) {
            body = beginCell().store(storeSetAddrMap2(message)).endCell();
        }
        if (
            message &&
            typeof message === "object" &&
            !(message instanceof Slice) &&
            message.$$type === "SetAddrMap3"
        ) {
            body = beginCell().store(storeSetAddrMap3(message)).endCell();
        }
        if (
            message &&
            typeof message === "object" &&
            !(message instanceof Slice) &&
            message.$$type === "SetAddrMap4"
        ) {
            body = beginCell().store(storeSetAddrMap4(message)).endCell();
        }
        if (body === null) {
            throw new Error("Invalid message type");
        }

        await provider.internal(via, { ...args, body: body });
    }

    async getIntMap1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(67207 as any, builder.build()))
            .stack;
        const result = Dictionary.loadDirect(
            Dictionary.Keys.Uint(8),
            Dictionary.Values.Uint(8),
            source.readCellOpt(),
        );
        return result;
    }

    async getIntMap1Value(provider: ContractProvider, key: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(key);
        const source = (await provider.get(103396 as any, builder.build()))
            .stack;
        const result = source.readBigNumberOpt();
        return result;
    }

    async getIntMap2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(79588 as any, builder.build()))
            .stack;
        const result = Dictionary.loadDirect(
            Dictionary.Keys.BigInt(257),
            Dictionary.Values.Bool(),
            source.readCellOpt(),
        );
        return result;
    }

    async getIntMap2Value(provider: ContractProvider, key: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(key);
        const source = (await provider.get(89348 as any, builder.build()))
            .stack;
        const result = source.readBooleanOpt();
        return result;
    }

    async getIntMap3(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(75461 as any, builder.build()))
            .stack;
        const result = Dictionary.loadDirect(
            Dictionary.Keys.BigInt(257),
            Dictionary.Values.Cell(),
            source.readCellOpt(),
        );
        return result;
    }

    async getIntMap3Value(provider: ContractProvider, key: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(key);
        const source = (await provider.get(71844 as any, builder.build()))
            .stack;
        const result = source.readCellOpt();
        return result;
    }

    async getIntMap4(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(87586 as any, builder.build()))
            .stack;
        const result = Dictionary.loadDirect(
            Dictionary.Keys.BigInt(257),
            dictValueParserSomeStruct(),
            source.readCellOpt(),
        );
        return result;
    }

    async getIntMap4Value(provider: ContractProvider, key: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(key);
        const source = (await provider.get(119013 as any, builder.build()))
            .stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleSomeStruct(result_p) : null;
        return result;
    }

    async getAddrMap1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(93537 as any, builder.build()))
            .stack;
        const result = Dictionary.loadDirect(
            Dictionary.Keys.Address(),
            Dictionary.Values.BigInt(257),
            source.readCellOpt(),
        );
        return result;
    }

    async getAddrMap1Value(provider: ContractProvider, key: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(key);
        const source = (await provider.get(116148 as any, builder.build()))
            .stack;
        const result = source.readBigNumberOpt();
        return result;
    }

    async getAddrMap2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(89346 as any, builder.build()))
            .stack;
        const result = Dictionary.loadDirect(
            Dictionary.Keys.Address(),
            Dictionary.Values.Bool(),
            source.readCellOpt(),
        );
        return result;
    }

    async getAddrMap2Value(provider: ContractProvider, key: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(key);
        const source = (await provider.get(68436 as any, builder.build()))
            .stack;
        const result = source.readBooleanOpt();
        return result;
    }

    async getAddrMap3(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(85283 as any, builder.build()))
            .stack;
        const result = Dictionary.loadDirect(
            Dictionary.Keys.Address(),
            Dictionary.Values.Cell(),
            source.readCellOpt(),
        );
        return result;
    }

    async getAddrMap3Value(provider: ContractProvider, key: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(key);
        const source = (await provider.get(85748 as any, builder.build()))
            .stack;
        const result = source.readCellOpt();
        return result;
    }

    async getAddrMap4(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(81348 as any, builder.build()))
            .stack;
        const result = Dictionary.loadDirect(
            Dictionary.Keys.Address(),
            dictValueParserSomeStruct(),
            source.readCellOpt(),
        );
        return result;
    }

    async getAddrMap4Value(provider: ContractProvider, key: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(key);
        const source = (await provider.get(100021 as any, builder.build()))
            .stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleSomeStruct(result_p) : null;
        return result;
    }
}
