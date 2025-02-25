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

export type Struct2 = {
    $$type: "Struct2";
    v: bigint;
};

export function storeStruct2(src: Struct2) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2971230874, 32);
        b_0.storeInt(src.v, 257);
    };
}

export function loadStruct2(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2971230874) {
        throw Error("Invalid prefix");
    }
    const _v = sc_0.loadIntBig(257);
    return { $$type: "Struct2" as const, v: _v };
}

function loadTupleStruct2(source: TupleReader) {
    const _v = source.readBigNumber();
    return { $$type: "Struct2" as const, v: _v };
}

function loadGetterTupleStruct2(source: TupleReader) {
    const _v = source.readBigNumber();
    return { $$type: "Struct2" as const, v: _v };
}

function storeTupleStruct2(source: Struct2) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.v);
    return builder.build();
}

function dictValueParserStruct2(): DictionaryValue<Struct2> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStruct2(src)).endCell());
        },
        parse: (src) => {
            return loadStruct2(src.loadRef().beginParse());
        },
    };
}

export type OptStruct = {
    $$type: "OptStruct";
    s: Struct2 | null;
};

export function storeOptStruct(src: OptStruct) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.s !== null && src.s !== undefined) {
            b_0.storeBit(true);
            b_0.store(storeStruct2(src.s));
        } else {
            b_0.storeBit(false);
        }
    };
}

export function loadOptStruct(slice: Slice) {
    const sc_0 = slice;
    const _s = sc_0.loadBit() ? loadStruct2(sc_0) : null;
    return { $$type: "OptStruct" as const, s: _s };
}

function loadTupleOptStruct(source: TupleReader) {
    const _s_p = source.readTupleOpt();
    const _s = _s_p ? loadTupleStruct2(_s_p) : null;
    return { $$type: "OptStruct" as const, s: _s };
}

function loadGetterTupleOptStruct(source: TupleReader) {
    const _s_p = source.readTupleOpt();
    const _s = _s_p ? loadTupleStruct2(_s_p) : null;
    return { $$type: "OptStruct" as const, s: _s };
}

function storeTupleOptStruct(source: OptStruct) {
    const builder = new TupleBuilder();
    if (source.s !== null && source.s !== undefined) {
        builder.writeTuple(storeTupleStruct2(source.s));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserOptStruct(): DictionaryValue<OptStruct> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOptStruct(src)).endCell());
        },
        parse: (src) => {
            return loadOptStruct(src.loadRef().beginParse());
        },
    };
}

export type Opt2$Data = {
    $$type: "Opt2$Data";
    stateInit: StateInit;
};

export function storeOpt2$Data(src: Opt2$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.store(storeStateInit(src.stateInit));
    };
}

export function loadOpt2$Data(slice: Slice) {
    const sc_0 = slice;
    const _stateInit = loadStateInit(sc_0);
    return { $$type: "Opt2$Data" as const, stateInit: _stateInit };
}

function loadTupleOpt2$Data(source: TupleReader) {
    const _stateInit = loadTupleStateInit(source);
    return { $$type: "Opt2$Data" as const, stateInit: _stateInit };
}

function loadGetterTupleOpt2$Data(source: TupleReader) {
    const _stateInit = loadGetterTupleStateInit(source);
    return { $$type: "Opt2$Data" as const, stateInit: _stateInit };
}

function storeTupleOpt2$Data(source: Opt2$Data) {
    const builder = new TupleBuilder();
    builder.writeTuple(storeTupleStateInit(source.stateInit));
    return builder.build();
}

function dictValueParserOpt2$Data(): DictionaryValue<Opt2$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOpt2$Data(src)).endCell());
        },
        parse: (src) => {
            return loadOpt2$Data(src.loadRef().beginParse());
        },
    };
}

export type Opt3$Data = {
    $$type: "Opt3$Data";
};

export function storeOpt3$Data(src: Opt3$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

export function loadOpt3$Data(slice: Slice) {
    const sc_0 = slice;
    return { $$type: "Opt3$Data" as const };
}

function loadTupleOpt3$Data(source: TupleReader) {
    return { $$type: "Opt3$Data" as const };
}

function loadGetterTupleOpt3$Data(source: TupleReader) {
    return { $$type: "Opt3$Data" as const };
}

function storeTupleOpt3$Data(source: Opt3$Data) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserOpt3$Data(): DictionaryValue<Opt3$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOpt3$Data(src)).endCell());
        },
        parse: (src) => {
            return loadOpt3$Data(src.loadRef().beginParse());
        },
    };
}

export type OptAddr = {
    $$type: "OptAddr";
    x: bigint;
    y: Address | null;
    z: bigint;
};

export function storeOptAddr(src: OptAddr) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3353994340, 32);
        b_0.storeUint(src.x, 8);
        b_0.storeAddress(src.y);
        b_0.storeUint(src.z, 16);
    };
}

export function loadOptAddr(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3353994340) {
        throw Error("Invalid prefix");
    }
    const _x = sc_0.loadUintBig(8);
    const _y = sc_0.loadMaybeAddress();
    const _z = sc_0.loadUintBig(16);
    return { $$type: "OptAddr" as const, x: _x, y: _y, z: _z };
}

function loadTupleOptAddr(source: TupleReader) {
    const _x = source.readBigNumber();
    const _y = source.readAddressOpt();
    const _z = source.readBigNumber();
    return { $$type: "OptAddr" as const, x: _x, y: _y, z: _z };
}

function loadGetterTupleOptAddr(source: TupleReader) {
    const _x = source.readBigNumber();
    const _y = source.readAddressOpt();
    const _z = source.readBigNumber();
    return { $$type: "OptAddr" as const, x: _x, y: _y, z: _z };
}

function storeTupleOptAddr(source: OptAddr) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.x);
    builder.writeAddress(source.y);
    builder.writeNumber(source.z);
    return builder.build();
}

function dictValueParserOptAddr(): DictionaryValue<OptAddr> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOptAddr(src)).endCell());
        },
        parse: (src) => {
            return loadOptAddr(src.loadRef().beginParse());
        },
    };
}

export type Opt4$Data = {
    $$type: "Opt4$Data";
    z: bigint;
};

export function storeOpt4$Data(src: Opt4$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.z, 257);
    };
}

export function loadOpt4$Data(slice: Slice) {
    const sc_0 = slice;
    const _z = sc_0.loadIntBig(257);
    return { $$type: "Opt4$Data" as const, z: _z };
}

function loadTupleOpt4$Data(source: TupleReader) {
    const _z = source.readBigNumber();
    return { $$type: "Opt4$Data" as const, z: _z };
}

function loadGetterTupleOpt4$Data(source: TupleReader) {
    const _z = source.readBigNumber();
    return { $$type: "Opt4$Data" as const, z: _z };
}

function storeTupleOpt4$Data(source: Opt4$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.z);
    return builder.build();
}

function dictValueParserOpt4$Data(): DictionaryValue<Opt4$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOpt4$Data(src)).endCell());
        },
        parse: (src) => {
            return loadOpt4$Data(src.loadRef().beginParse());
        },
    };
}

export type SomeGenericStruct = {
    $$type: "SomeGenericStruct";
    value1: bigint;
    value2: bigint;
    value3: bigint;
    value4: bigint;
    value5: bigint;
};

export function storeSomeGenericStruct(src: SomeGenericStruct) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.value1, 257);
        b_0.storeInt(src.value2, 257);
        b_0.storeInt(src.value3, 257);
        const b_1 = new Builder();
        b_1.storeInt(src.value4, 257);
        b_1.storeInt(src.value5, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSomeGenericStruct(slice: Slice) {
    const sc_0 = slice;
    const _value1 = sc_0.loadIntBig(257);
    const _value2 = sc_0.loadIntBig(257);
    const _value3 = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _value4 = sc_1.loadIntBig(257);
    const _value5 = sc_1.loadIntBig(257);
    return {
        $$type: "SomeGenericStruct" as const,
        value1: _value1,
        value2: _value2,
        value3: _value3,
        value4: _value4,
        value5: _value5,
    };
}

function loadTupleSomeGenericStruct(source: TupleReader) {
    const _value1 = source.readBigNumber();
    const _value2 = source.readBigNumber();
    const _value3 = source.readBigNumber();
    const _value4 = source.readBigNumber();
    const _value5 = source.readBigNumber();
    return {
        $$type: "SomeGenericStruct" as const,
        value1: _value1,
        value2: _value2,
        value3: _value3,
        value4: _value4,
        value5: _value5,
    };
}

function loadGetterTupleSomeGenericStruct(source: TupleReader) {
    const _value1 = source.readBigNumber();
    const _value2 = source.readBigNumber();
    const _value3 = source.readBigNumber();
    const _value4 = source.readBigNumber();
    const _value5 = source.readBigNumber();
    return {
        $$type: "SomeGenericStruct" as const,
        value1: _value1,
        value2: _value2,
        value3: _value3,
        value4: _value4,
        value5: _value5,
    };
}

function storeTupleSomeGenericStruct(source: SomeGenericStruct) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.value1);
    builder.writeNumber(source.value2);
    builder.writeNumber(source.value3);
    builder.writeNumber(source.value4);
    builder.writeNumber(source.value5);
    return builder.build();
}

function dictValueParserSomeGenericStruct(): DictionaryValue<SomeGenericStruct> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeSomeGenericStruct(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadSomeGenericStruct(src.loadRef().beginParse());
        },
    };
}

export type StructWithOptionals = {
    $$type: "StructWithOptionals";
    a: bigint | null;
    b: boolean | null;
    c: Cell | null;
    d: Address | null;
    e: SomeGenericStruct | null;
};

export function storeStructWithOptionals(src: StructWithOptionals) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.a !== null && src.a !== undefined) {
            b_0.storeBit(true).storeInt(src.a, 257);
        } else {
            b_0.storeBit(false);
        }
        if (src.b !== null && src.b !== undefined) {
            b_0.storeBit(true).storeBit(src.b);
        } else {
            b_0.storeBit(false);
        }
        if (src.c !== null && src.c !== undefined) {
            b_0.storeBit(true).storeRef(src.c);
        } else {
            b_0.storeBit(false);
        }
        b_0.storeAddress(src.d);
        const b_1 = new Builder();
        if (src.e !== null && src.e !== undefined) {
            b_1.storeBit(true);
            b_1.store(storeSomeGenericStruct(src.e));
        } else {
            b_1.storeBit(false);
        }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadStructWithOptionals(slice: Slice) {
    const sc_0 = slice;
    const _a = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    const _b = sc_0.loadBit() ? sc_0.loadBit() : null;
    const _c = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _d = sc_0.loadMaybeAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _e = sc_1.loadBit() ? loadSomeGenericStruct(sc_1) : null;
    return {
        $$type: "StructWithOptionals" as const,
        a: _a,
        b: _b,
        c: _c,
        d: _d,
        e: _e,
    };
}

function loadTupleStructWithOptionals(source: TupleReader) {
    const _a = source.readBigNumberOpt();
    const _b = source.readBooleanOpt();
    const _c = source.readCellOpt();
    const _d = source.readAddressOpt();
    const _e_p = source.readTupleOpt();
    const _e = _e_p ? loadTupleSomeGenericStruct(_e_p) : null;
    return {
        $$type: "StructWithOptionals" as const,
        a: _a,
        b: _b,
        c: _c,
        d: _d,
        e: _e,
    };
}

function loadGetterTupleStructWithOptionals(source: TupleReader) {
    const _a = source.readBigNumberOpt();
    const _b = source.readBooleanOpt();
    const _c = source.readCellOpt();
    const _d = source.readAddressOpt();
    const _e_p = source.readTupleOpt();
    const _e = _e_p ? loadTupleSomeGenericStruct(_e_p) : null;
    return {
        $$type: "StructWithOptionals" as const,
        a: _a,
        b: _b,
        c: _c,
        d: _d,
        e: _e,
    };
}

function storeTupleStructWithOptionals(source: StructWithOptionals) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeBoolean(source.b);
    builder.writeCell(source.c);
    builder.writeAddress(source.d);
    if (source.e !== null && source.e !== undefined) {
        builder.writeTuple(storeTupleSomeGenericStruct(source.e));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserStructWithOptionals(): DictionaryValue<StructWithOptionals> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeStructWithOptionals(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadStructWithOptionals(src.loadRef().beginParse());
        },
    };
}

export type Update = {
    $$type: "Update";
    a: bigint | null;
    b: boolean | null;
    c: Cell | null;
    d: Address | null;
    e: SomeGenericStruct | null;
    f: StructWithOptionals | null;
};

export function storeUpdate(src: Update) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(357891325, 32);
        if (src.a !== null && src.a !== undefined) {
            b_0.storeBit(true).storeInt(src.a, 257);
        } else {
            b_0.storeBit(false);
        }
        if (src.b !== null && src.b !== undefined) {
            b_0.storeBit(true).storeBit(src.b);
        } else {
            b_0.storeBit(false);
        }
        if (src.c !== null && src.c !== undefined) {
            b_0.storeBit(true).storeRef(src.c);
        } else {
            b_0.storeBit(false);
        }
        b_0.storeAddress(src.d);
        const b_1 = new Builder();
        if (src.e !== null && src.e !== undefined) {
            b_1.storeBit(true);
            b_1.store(storeSomeGenericStruct(src.e));
        } else {
            b_1.storeBit(false);
        }
        const b_2 = new Builder();
        if (src.f !== null && src.f !== undefined) {
            b_2.storeBit(true);
            b_2.store(storeStructWithOptionals(src.f));
        } else {
            b_2.storeBit(false);
        }
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdate(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 357891325) {
        throw Error("Invalid prefix");
    }
    const _a = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    const _b = sc_0.loadBit() ? sc_0.loadBit() : null;
    const _c = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _d = sc_0.loadMaybeAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _e = sc_1.loadBit() ? loadSomeGenericStruct(sc_1) : null;
    const sc_2 = sc_1.loadRef().beginParse();
    const _f = sc_2.loadBit() ? loadStructWithOptionals(sc_2) : null;
    return {
        $$type: "Update" as const,
        a: _a,
        b: _b,
        c: _c,
        d: _d,
        e: _e,
        f: _f,
    };
}

function loadTupleUpdate(source: TupleReader) {
    const _a = source.readBigNumberOpt();
    const _b = source.readBooleanOpt();
    const _c = source.readCellOpt();
    const _d = source.readAddressOpt();
    const _e_p = source.readTupleOpt();
    const _e = _e_p ? loadTupleSomeGenericStruct(_e_p) : null;
    const _f_p = source.readTupleOpt();
    const _f = _f_p ? loadTupleStructWithOptionals(_f_p) : null;
    return {
        $$type: "Update" as const,
        a: _a,
        b: _b,
        c: _c,
        d: _d,
        e: _e,
        f: _f,
    };
}

function loadGetterTupleUpdate(source: TupleReader) {
    const _a = source.readBigNumberOpt();
    const _b = source.readBooleanOpt();
    const _c = source.readCellOpt();
    const _d = source.readAddressOpt();
    const _e_p = source.readTupleOpt();
    const _e = _e_p ? loadTupleSomeGenericStruct(_e_p) : null;
    const _f_p = source.readTupleOpt();
    const _f = _f_p ? loadTupleStructWithOptionals(_f_p) : null;
    return {
        $$type: "Update" as const,
        a: _a,
        b: _b,
        c: _c,
        d: _d,
        e: _e,
        f: _f,
    };
}

function storeTupleUpdate(source: Update) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeBoolean(source.b);
    builder.writeCell(source.c);
    builder.writeAddress(source.d);
    if (source.e !== null && source.e !== undefined) {
        builder.writeTuple(storeTupleSomeGenericStruct(source.e));
    } else {
        builder.writeTuple(null);
    }
    if (source.f !== null && source.f !== undefined) {
        builder.writeTuple(storeTupleStructWithOptionals(source.f));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserUpdate(): DictionaryValue<Update> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdate(src)).endCell());
        },
        parse: (src) => {
            return loadUpdate(src.loadRef().beginParse());
        },
    };
}

export type ContractWithOptionals$Data = {
    $$type: "ContractWithOptionals$Data";
    a: bigint | null;
    b: boolean | null;
    c: Cell | null;
    d: Address | null;
    e: SomeGenericStruct | null;
    f: StructWithOptionals | null;
};

export function storeContractWithOptionals$Data(
    src: ContractWithOptionals$Data,
) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.a !== null && src.a !== undefined) {
            b_0.storeBit(true).storeInt(src.a, 257);
        } else {
            b_0.storeBit(false);
        }
        if (src.b !== null && src.b !== undefined) {
            b_0.storeBit(true).storeBit(src.b);
        } else {
            b_0.storeBit(false);
        }
        if (src.c !== null && src.c !== undefined) {
            b_0.storeBit(true).storeRef(src.c);
        } else {
            b_0.storeBit(false);
        }
        b_0.storeAddress(src.d);
        const b_1 = new Builder();
        if (src.e !== null && src.e !== undefined) {
            b_1.storeBit(true);
            b_1.store(storeSomeGenericStruct(src.e));
        } else {
            b_1.storeBit(false);
        }
        const b_2 = new Builder();
        if (src.f !== null && src.f !== undefined) {
            b_2.storeBit(true);
            b_2.store(storeStructWithOptionals(src.f));
        } else {
            b_2.storeBit(false);
        }
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadContractWithOptionals$Data(slice: Slice) {
    const sc_0 = slice;
    const _a = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    const _b = sc_0.loadBit() ? sc_0.loadBit() : null;
    const _c = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _d = sc_0.loadMaybeAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _e = sc_1.loadBit() ? loadSomeGenericStruct(sc_1) : null;
    const sc_2 = sc_1.loadRef().beginParse();
    const _f = sc_2.loadBit() ? loadStructWithOptionals(sc_2) : null;
    return {
        $$type: "ContractWithOptionals$Data" as const,
        a: _a,
        b: _b,
        c: _c,
        d: _d,
        e: _e,
        f: _f,
    };
}

function loadTupleContractWithOptionals$Data(source: TupleReader) {
    const _a = source.readBigNumberOpt();
    const _b = source.readBooleanOpt();
    const _c = source.readCellOpt();
    const _d = source.readAddressOpt();
    const _e_p = source.readTupleOpt();
    const _e = _e_p ? loadTupleSomeGenericStruct(_e_p) : null;
    const _f_p = source.readTupleOpt();
    const _f = _f_p ? loadTupleStructWithOptionals(_f_p) : null;
    return {
        $$type: "ContractWithOptionals$Data" as const,
        a: _a,
        b: _b,
        c: _c,
        d: _d,
        e: _e,
        f: _f,
    };
}

function loadGetterTupleContractWithOptionals$Data(source: TupleReader) {
    const _a = source.readBigNumberOpt();
    const _b = source.readBooleanOpt();
    const _c = source.readCellOpt();
    const _d = source.readAddressOpt();
    const _e_p = source.readTupleOpt();
    const _e = _e_p ? loadTupleSomeGenericStruct(_e_p) : null;
    const _f_p = source.readTupleOpt();
    const _f = _f_p ? loadTupleStructWithOptionals(_f_p) : null;
    return {
        $$type: "ContractWithOptionals$Data" as const,
        a: _a,
        b: _b,
        c: _c,
        d: _d,
        e: _e,
        f: _f,
    };
}

function storeTupleContractWithOptionals$Data(
    source: ContractWithOptionals$Data,
) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeBoolean(source.b);
    builder.writeCell(source.c);
    builder.writeAddress(source.d);
    if (source.e !== null && source.e !== undefined) {
        builder.writeTuple(storeTupleSomeGenericStruct(source.e));
    } else {
        builder.writeTuple(null);
    }
    if (source.f !== null && source.f !== undefined) {
        builder.writeTuple(storeTupleStructWithOptionals(source.f));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserContractWithOptionals$Data(): DictionaryValue<ContractWithOptionals$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell()
                    .store(storeContractWithOptionals$Data(src))
                    .endCell(),
            );
        },
        parse: (src) => {
            return loadContractWithOptionals$Data(src.loadRef().beginParse());
        },
    };
}

type Opt3_init_args = {
    $$type: "Opt3_init_args";
    arg: Struct2 | null;
};

function initOpt3_init_args(src: Opt3_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.arg !== null && src.arg !== undefined) {
            b_0.storeBit(true);
            b_0.store(storeStruct2(src.arg));
        } else {
            b_0.storeBit(false);
        }
    };
}

async function Opt3_init(arg: Struct2 | null) {
    const __code = Cell.fromBase64(
        "te6ccgEBAwEAXAABFP8A9KQT9LzyyAsBAT7TMNBy1yHSANIA+kAhEDRQVW8E+GEB+GLbPDDc8sCCAgBW7UTQ0gABkjBt4NIAAY4V0x8BghCxGWKauvLggYEBAdcAAW8BkW3iAdEwbQ==",
    );
    const builder = beginCell();
    builder.storeUint(0, 1);
    initOpt3_init_args({ $$type: "Opt3_init_args", arg })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Opt3_errors: { [key: number]: { message: string } } = {
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

const Opt3_types: ABIType[] = [
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
        name: "Struct2",
        header: 2971230874,
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
    {
        name: "OptStruct",
        header: null,
        fields: [
            {
                name: "s",
                type: { kind: "simple", type: "Struct2", optional: true },
            },
        ],
    },
    {
        name: "Opt2$Data",
        header: null,
        fields: [
            {
                name: "stateInit",
                type: { kind: "simple", type: "StateInit", optional: false },
            },
        ],
    },
    { name: "Opt3$Data", header: null, fields: [] },
    {
        name: "OptAddr",
        header: 3353994340,
        fields: [
            {
                name: "x",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 8,
                },
            },
            {
                name: "y",
                type: { kind: "simple", type: "address", optional: true },
            },
            {
                name: "z",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 16,
                },
            },
        ],
    },
    {
        name: "Opt4$Data",
        header: null,
        fields: [
            {
                name: "z",
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
        name: "SomeGenericStruct",
        header: null,
        fields: [
            {
                name: "value1",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "value2",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "value3",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "value4",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "value5",
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
        name: "StructWithOptionals",
        header: null,
        fields: [
            {
                name: "a",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: true,
                    format: 257,
                },
            },
            {
                name: "b",
                type: { kind: "simple", type: "bool", optional: true },
            },
            {
                name: "c",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "d",
                type: { kind: "simple", type: "address", optional: true },
            },
            {
                name: "e",
                type: {
                    kind: "simple",
                    type: "SomeGenericStruct",
                    optional: true,
                },
            },
        ],
    },
    {
        name: "Update",
        header: 357891325,
        fields: [
            {
                name: "a",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: true,
                    format: 257,
                },
            },
            {
                name: "b",
                type: { kind: "simple", type: "bool", optional: true },
            },
            {
                name: "c",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "d",
                type: { kind: "simple", type: "address", optional: true },
            },
            {
                name: "e",
                type: {
                    kind: "simple",
                    type: "SomeGenericStruct",
                    optional: true,
                },
            },
            {
                name: "f",
                type: {
                    kind: "simple",
                    type: "StructWithOptionals",
                    optional: true,
                },
            },
        ],
    },
    {
        name: "ContractWithOptionals$Data",
        header: null,
        fields: [
            {
                name: "a",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: true,
                    format: 257,
                },
            },
            {
                name: "b",
                type: { kind: "simple", type: "bool", optional: true },
            },
            {
                name: "c",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "d",
                type: { kind: "simple", type: "address", optional: true },
            },
            {
                name: "e",
                type: {
                    kind: "simple",
                    type: "SomeGenericStruct",
                    optional: true,
                },
            },
            {
                name: "f",
                type: {
                    kind: "simple",
                    type: "StructWithOptionals",
                    optional: true,
                },
            },
        ],
    },
];

const Opt3_getters: ABIGetter[] = [];

export const Opt3_getterMapping: { [key: string]: string } = {};

const Opt3_receivers: ABIReceiver[] = [];

export class Opt3 implements Contract {
    static async init(arg: Struct2 | null) {
        return await Opt3_init(arg);
    }

    static async fromInit(arg: Struct2 | null) {
        const __gen_init = await Opt3_init(arg);
        const address = contractAddress(0, __gen_init);
        return new Opt3(address, __gen_init);
    }

    static fromAddress(address: Address) {
        return new Opt3(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };
    readonly abi: ContractABI = {
        types: Opt3_types,
        getters: Opt3_getters,
        receivers: Opt3_receivers,
        errors: Opt3_errors,
    };

    private constructor(address: Address, init?: { code: Cell; data: Cell }) {
        this.address = address;
        this.init = init;
    }
}
