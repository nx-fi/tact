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

export type AsmFunctionsTester$Data = {
    $$type: "AsmFunctionsTester$Data";
};

export function storeAsmFunctionsTester$Data(src: AsmFunctionsTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

export function loadAsmFunctionsTester$Data(slice: Slice) {
    const sc_0 = slice;
    return { $$type: "AsmFunctionsTester$Data" as const };
}

function loadTupleAsmFunctionsTester$Data(source: TupleReader) {
    return { $$type: "AsmFunctionsTester$Data" as const };
}

function loadGetterTupleAsmFunctionsTester$Data(source: TupleReader) {
    return { $$type: "AsmFunctionsTester$Data" as const };
}

function storeTupleAsmFunctionsTester$Data(source: AsmFunctionsTester$Data) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserAsmFunctionsTester$Data(): DictionaryValue<AsmFunctionsTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeAsmFunctionsTester$Data(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadAsmFunctionsTester$Data(src.loadRef().beginParse());
        },
    };
}

export type MapIntIntSlice = {
    $$type: "MapIntIntSlice";
    val: Dictionary<bigint, bigint>;
    rem: Slice;
};

export function storeMapIntIntSlice(src: MapIntIntSlice) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeDict(
            src.val,
            Dictionary.Keys.BigInt(257),
            Dictionary.Values.BigInt(257),
        );
        b_0.storeRef(src.rem.asCell());
    };
}

export function loadMapIntIntSlice(slice: Slice) {
    const sc_0 = slice;
    const _val = Dictionary.load(
        Dictionary.Keys.BigInt(257),
        Dictionary.Values.BigInt(257),
        sc_0,
    );
    const _rem = sc_0.loadRef().asSlice();
    return { $$type: "MapIntIntSlice" as const, val: _val, rem: _rem };
}

function loadTupleMapIntIntSlice(source: TupleReader) {
    const _val = Dictionary.loadDirect(
        Dictionary.Keys.BigInt(257),
        Dictionary.Values.BigInt(257),
        source.readCellOpt(),
    );
    const _rem = source.readCell().asSlice();
    return { $$type: "MapIntIntSlice" as const, val: _val, rem: _rem };
}

function loadGetterTupleMapIntIntSlice(source: TupleReader) {
    const _val = Dictionary.loadDirect(
        Dictionary.Keys.BigInt(257),
        Dictionary.Values.BigInt(257),
        source.readCellOpt(),
    );
    const _rem = source.readCell().asSlice();
    return { $$type: "MapIntIntSlice" as const, val: _val, rem: _rem };
}

function storeTupleMapIntIntSlice(source: MapIntIntSlice) {
    const builder = new TupleBuilder();
    builder.writeCell(
        source.val.size > 0
            ? beginCell()
                  .storeDictDirect(
                      source.val,
                      Dictionary.Keys.BigInt(257),
                      Dictionary.Values.BigInt(257),
                  )
                  .endCell()
            : null,
    );
    builder.writeSlice(source.rem.asCell());
    return builder.build();
}

function dictValueParserMapIntIntSlice(): DictionaryValue<MapIntIntSlice> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeMapIntIntSlice(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadMapIntIntSlice(src.loadRef().beginParse());
        },
    };
}

export type IntSlice = {
    $$type: "IntSlice";
    val: bigint;
    rem: Slice;
};

export function storeIntSlice(src: IntSlice) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.val, 257);
        b_0.storeRef(src.rem.asCell());
    };
}

export function loadIntSlice(slice: Slice) {
    const sc_0 = slice;
    const _val = sc_0.loadIntBig(257);
    const _rem = sc_0.loadRef().asSlice();
    return { $$type: "IntSlice" as const, val: _val, rem: _rem };
}

function loadTupleIntSlice(source: TupleReader) {
    const _val = source.readBigNumber();
    const _rem = source.readCell().asSlice();
    return { $$type: "IntSlice" as const, val: _val, rem: _rem };
}

function loadGetterTupleIntSlice(source: TupleReader) {
    const _val = source.readBigNumber();
    const _rem = source.readCell().asSlice();
    return { $$type: "IntSlice" as const, val: _val, rem: _rem };
}

function storeTupleIntSlice(source: IntSlice) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.val);
    builder.writeSlice(source.rem.asCell());
    return builder.build();
}

function dictValueParserIntSlice(): DictionaryValue<IntSlice> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeIntSlice(src)).endCell());
        },
        parse: (src) => {
            return loadIntSlice(src.loadRef().beginParse());
        },
    };
}

export type SliceInt = {
    $$type: "SliceInt";
    rem: Slice;
    val: bigint;
};

export function storeSliceInt(src: SliceInt) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.rem.asCell());
        b_0.storeInt(src.val, 257);
    };
}

export function loadSliceInt(slice: Slice) {
    const sc_0 = slice;
    const _rem = sc_0.loadRef().asSlice();
    const _val = sc_0.loadIntBig(257);
    return { $$type: "SliceInt" as const, rem: _rem, val: _val };
}

function loadTupleSliceInt(source: TupleReader) {
    const _rem = source.readCell().asSlice();
    const _val = source.readBigNumber();
    return { $$type: "SliceInt" as const, rem: _rem, val: _val };
}

function loadGetterTupleSliceInt(source: TupleReader) {
    const _rem = source.readCell().asSlice();
    const _val = source.readBigNumber();
    return { $$type: "SliceInt" as const, rem: _rem, val: _val };
}

function storeTupleSliceInt(source: SliceInt) {
    const builder = new TupleBuilder();
    builder.writeSlice(source.rem.asCell());
    builder.writeNumber(source.val);
    return builder.build();
}

function dictValueParserSliceInt(): DictionaryValue<SliceInt> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSliceInt(src)).endCell());
        },
        parse: (src) => {
            return loadSliceInt(src.loadRef().beginParse());
        },
    };
}

export type Two = {
    $$type: "Two";
    a: bigint;
    b: bigint;
};

export function storeTwo(src: Two) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
        b_0.storeInt(src.b, 257);
    };
}

export function loadTwo(slice: Slice) {
    const sc_0 = slice;
    const _a = sc_0.loadIntBig(257);
    const _b = sc_0.loadIntBig(257);
    return { $$type: "Two" as const, a: _a, b: _b };
}

function loadTupleTwo(source: TupleReader) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    return { $$type: "Two" as const, a: _a, b: _b };
}

function loadGetterTupleTwo(source: TupleReader) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    return { $$type: "Two" as const, a: _a, b: _b };
}

function storeTupleTwo(source: Two) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeNumber(source.b);
    return builder.build();
}

function dictValueParserTwo(): DictionaryValue<Two> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTwo(src)).endCell());
        },
        parse: (src) => {
            return loadTwo(src.loadRef().beginParse());
        },
    };
}

export type TwoInTwo = {
    $$type: "TwoInTwo";
    a: Two;
    b: Two;
};

export function storeTwoInTwo(src: TwoInTwo) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.store(storeTwo(src.a));
        const b_1 = new Builder();
        b_1.store(storeTwo(src.b));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadTwoInTwo(slice: Slice) {
    const sc_0 = slice;
    const _a = loadTwo(sc_0);
    const sc_1 = sc_0.loadRef().beginParse();
    const _b = loadTwo(sc_1);
    return { $$type: "TwoInTwo" as const, a: _a, b: _b };
}

function loadTupleTwoInTwo(source: TupleReader) {
    const _a = loadTupleTwo(source);
    const _b = loadTupleTwo(source);
    return { $$type: "TwoInTwo" as const, a: _a, b: _b };
}

function loadGetterTupleTwoInTwo(source: TupleReader) {
    const _a = loadGetterTupleTwo(source);
    const _b = loadGetterTupleTwo(source);
    return { $$type: "TwoInTwo" as const, a: _a, b: _b };
}

function storeTupleTwoInTwo(source: TwoInTwo) {
    const builder = new TupleBuilder();
    builder.writeTuple(storeTupleTwo(source.a));
    builder.writeTuple(storeTupleTwo(source.b));
    return builder.build();
}

function dictValueParserTwoInTwo(): DictionaryValue<TwoInTwo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTwoInTwo(src)).endCell());
        },
        parse: (src) => {
            return loadTwoInTwo(src.loadRef().beginParse());
        },
    };
}

type AsmFunctionsTester_init_args = {
    $$type: "AsmFunctionsTester_init_args";
};

function initAsmFunctionsTester_init_args(src: AsmFunctionsTester_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function AsmFunctionsTester_init() {
    const __code = Cell.fromBase64(
        "te6ccgECJAEAAjIAART/APSkE/S88sgLAQIBYgIDAYbQAdBy1yHSANIA+kAhEDRQZm8E+GEC+GLbPAKRW+BwIddJIMIflTEB0x8wkTLiwAABwSGwmTDIfwHKAMntVOAw8sCCIgIBIAQFAgEgBgcCASAWFwIBIAgJAgEgDxACD7Ttm2ebZ4YwIgoCAVgLDAAUcXJzdFowMDDAAwIPrMVtnm2eGMAiDQIPrwxtnm2eGMAiDgAeyIAqAcoGydB31wABMcAqALxtgQEBgCOAIiIhbpVbWfRaMJjIAc8AQTP0QuKBAQGAKoAbIiFulVtZ9FowmMgBzwBBM/RC4shSEPQAydD0BDABIW4hblywk18Ef44RAbMBs7CXAfkAAfkAupJbcOLiAg+2M/tnm2eGMCIRAgEgEhMAGMiAKvoCydD6ADDAKgIPs042zzbPDGAiFAJjswXAm8iAW8iAm8iECMEbyIBbyICbyIQIwhvIgFvIgJvIhAj2zwMEKsQmhCJVTDbPDGAiFQAS/vVXb3JrcyF/ABBVM1tbW1tbMAIPu0xds82zwxgiGAIBIBkaABR2pKSkpaWlpMAHAh+3ZSAt5EBN5FtniIibZ4YwIhsCASAcHQAIWjAwMAIPsg92zzbPDGAiHgIBSB8gADBxcnN0dXZ3eHl6gAuADFUzW1tbW1swwAECEKoQ2zwB2zwxIiECDqto2zzbPDEiIwAI0PoA0QAU7UTQ0gAwkW3gbQAmyIAq+gLJ0PoAAcAqkscAkjBw4g==",
    );
    const builder = beginCell();
    builder.storeUint(0, 1);
    initAsmFunctionsTester_init_args({
        $$type: "AsmFunctionsTester_init_args",
    })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const AsmFunctionsTester_errors: { [key: number]: { message: string } } = {
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

const AsmFunctionsTester_types: ABIType[] = [
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
    { name: "AsmFunctionsTester$Data", header: null, fields: [] },
    {
        name: "MapIntIntSlice",
        header: null,
        fields: [
            { name: "val", type: { kind: "dict", key: "int", value: "int" } },
            {
                name: "rem",
                type: { kind: "simple", type: "slice", optional: false },
            },
        ],
    },
    {
        name: "IntSlice",
        header: null,
        fields: [
            {
                name: "val",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "rem",
                type: { kind: "simple", type: "slice", optional: false },
            },
        ],
    },
    {
        name: "SliceInt",
        header: null,
        fields: [
            {
                name: "rem",
                type: { kind: "simple", type: "slice", optional: false },
            },
            {
                name: "val",
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
        name: "Two",
        header: null,
        fields: [
            {
                name: "a",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "b",
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
        name: "TwoInTwo",
        header: null,
        fields: [
            {
                name: "a",
                type: { kind: "simple", type: "Two", optional: false },
            },
            {
                name: "b",
                type: { kind: "simple", type: "Two", optional: false },
            },
        ],
    },
];

const AsmFunctionsTester_getters: ABIGetter[] = [
    {
        name: "testAsmStoreDict",
        methodId: 81432,
        arguments: [],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "testAsmLoadCoins",
        methodId: 86431,
        arguments: [],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "testAsmLoadCoinsMut",
        methodId: 128872,
        arguments: [],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "testAsmLoadCoinsMutRuntime",
        methodId: 127504,
        arguments: [
            {
                name: "c",
                type: { kind: "simple", type: "cell", optional: false },
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
        name: "testAsmLoadInt",
        methodId: 78218,
        arguments: [],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "testAsmDebugStr",
        methodId: 93496,
        arguments: [],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "testAsmCreateUseWord",
        methodId: 111813,
        arguments: [],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "testAsmSecondToLast",
        methodId: 67436,
        arguments: [],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "testAsmSecondToLastRuntime",
        methodId: 121641,
        arguments: [
            {
                name: "s1",
                type: { kind: "simple", type: "Two", optional: false },
            },
            {
                name: "s2",
                type: { kind: "simple", type: "Two", optional: false },
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
        name: "testAsmFirst",
        methodId: 124989,
        arguments: [],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "testAsmFirstRuntime",
        methodId: 97303,
        arguments: [
            {
                name: "s1",
                type: { kind: "simple", type: "TwoInTwo", optional: false },
            },
            {
                name: "s2",
                type: { kind: "simple", type: "TwoInTwo", optional: false },
            },
            {
                name: "s3",
                type: { kind: "simple", type: "TwoInTwo", optional: false },
            },
        ],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
];

export const AsmFunctionsTester_getterMapping: { [key: string]: string } = {
    testAsmStoreDict: "getTestAsmStoreDict",
    testAsmLoadCoins: "getTestAsmLoadCoins",
    testAsmLoadCoinsMut: "getTestAsmLoadCoinsMut",
    testAsmLoadCoinsMutRuntime: "getTestAsmLoadCoinsMutRuntime",
    testAsmLoadInt: "getTestAsmLoadInt",
    testAsmDebugStr: "getTestAsmDebugStr",
    testAsmCreateUseWord: "getTestAsmCreateUseWord",
    testAsmSecondToLast: "getTestAsmSecondToLast",
    testAsmSecondToLastRuntime: "getTestAsmSecondToLastRuntime",
    testAsmFirst: "getTestAsmFirst",
    testAsmFirstRuntime: "getTestAsmFirstRuntime",
};

const AsmFunctionsTester_receivers: ABIReceiver[] = [
    { receiver: "internal", message: { kind: "empty" } },
];

export class AsmFunctionsTester implements Contract {
    static async init() {
        return await AsmFunctionsTester_init();
    }

    static async fromInit() {
        const __gen_init = await AsmFunctionsTester_init();
        const address = contractAddress(0, __gen_init);
        return new AsmFunctionsTester(address, __gen_init);
    }

    static fromAddress(address: Address) {
        return new AsmFunctionsTester(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };
    readonly abi: ContractABI = {
        types: AsmFunctionsTester_types,
        getters: AsmFunctionsTester_getters,
        receivers: AsmFunctionsTester_receivers,
        errors: AsmFunctionsTester_errors,
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

    async getTestAsmStoreDict(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(81432 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getTestAsmLoadCoins(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(86431 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getTestAsmLoadCoinsMut(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(128872 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getTestAsmLoadCoinsMutRuntime(provider: ContractProvider, c: Cell) {
        const builder = new TupleBuilder();
        builder.writeCell(c);
        const source = (await provider.get(127504 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getTestAsmLoadInt(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(78218 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getTestAsmDebugStr(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(93496 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getTestAsmCreateUseWord(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(111813 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getTestAsmSecondToLast(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(67436 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getTestAsmSecondToLastRuntime(
        provider: ContractProvider,
        s1: Two,
        s2: Two,
    ) {
        const builder = new TupleBuilder();
        builder.writeTuple(storeTupleTwo(s1));
        builder.writeTuple(storeTupleTwo(s2));
        const source = (await provider.get(121641 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getTestAsmFirst(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(124989 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getTestAsmFirstRuntime(
        provider: ContractProvider,
        s1: TwoInTwo,
        s2: TwoInTwo,
        s3: TwoInTwo,
    ) {
        const builder = new TupleBuilder();
        builder.writeTuple(storeTupleTwoInTwo(s1));
        builder.writeTuple(storeTupleTwoInTwo(s2));
        builder.writeTuple(storeTupleTwoInTwo(s3));
        const source = (await provider.get(97303 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }
}
