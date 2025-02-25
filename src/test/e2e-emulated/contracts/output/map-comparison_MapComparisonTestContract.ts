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

export type Compare = {
    $$type: "Compare";
    m1: Dictionary<number, boolean>;
    m2: Dictionary<number, boolean>;
};

export function storeCompare(src: Compare) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1473646961, 32);
        b_0.storeDict(
            src.m1,
            Dictionary.Keys.Uint(8),
            Dictionary.Values.Bool(),
        );
        b_0.storeDict(
            src.m2,
            Dictionary.Keys.Uint(8),
            Dictionary.Values.Bool(),
        );
    };
}

export function loadCompare(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1473646961) {
        throw Error("Invalid prefix");
    }
    const _m1 = Dictionary.load(
        Dictionary.Keys.Uint(8),
        Dictionary.Values.Bool(),
        sc_0,
    );
    const _m2 = Dictionary.load(
        Dictionary.Keys.Uint(8),
        Dictionary.Values.Bool(),
        sc_0,
    );
    return { $$type: "Compare" as const, m1: _m1, m2: _m2 };
}

function loadTupleCompare(source: TupleReader) {
    const _m1 = Dictionary.loadDirect(
        Dictionary.Keys.Uint(8),
        Dictionary.Values.Bool(),
        source.readCellOpt(),
    );
    const _m2 = Dictionary.loadDirect(
        Dictionary.Keys.Uint(8),
        Dictionary.Values.Bool(),
        source.readCellOpt(),
    );
    return { $$type: "Compare" as const, m1: _m1, m2: _m2 };
}

function loadGetterTupleCompare(source: TupleReader) {
    const _m1 = Dictionary.loadDirect(
        Dictionary.Keys.Uint(8),
        Dictionary.Values.Bool(),
        source.readCellOpt(),
    );
    const _m2 = Dictionary.loadDirect(
        Dictionary.Keys.Uint(8),
        Dictionary.Values.Bool(),
        source.readCellOpt(),
    );
    return { $$type: "Compare" as const, m1: _m1, m2: _m2 };
}

function storeTupleCompare(source: Compare) {
    const builder = new TupleBuilder();
    builder.writeCell(
        source.m1.size > 0
            ? beginCell()
                  .storeDictDirect(
                      source.m1,
                      Dictionary.Keys.Uint(8),
                      Dictionary.Values.Bool(),
                  )
                  .endCell()
            : null,
    );
    builder.writeCell(
        source.m2.size > 0
            ? beginCell()
                  .storeDictDirect(
                      source.m2,
                      Dictionary.Keys.Uint(8),
                      Dictionary.Values.Bool(),
                  )
                  .endCell()
            : null,
    );
    return builder.build();
}

function dictValueParserCompare(): DictionaryValue<Compare> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCompare(src)).endCell());
        },
        parse: (src) => {
            return loadCompare(src.loadRef().beginParse());
        },
    };
}

export type CompareDeep = {
    $$type: "CompareDeep";
    m1: Dictionary<number, boolean>;
    m2: Dictionary<number, boolean>;
};

export function storeCompareDeep(src: CompareDeep) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3800136638, 32);
        b_0.storeDict(
            src.m1,
            Dictionary.Keys.Uint(8),
            Dictionary.Values.Bool(),
        );
        b_0.storeDict(
            src.m2,
            Dictionary.Keys.Uint(8),
            Dictionary.Values.Bool(),
        );
    };
}

export function loadCompareDeep(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3800136638) {
        throw Error("Invalid prefix");
    }
    const _m1 = Dictionary.load(
        Dictionary.Keys.Uint(8),
        Dictionary.Values.Bool(),
        sc_0,
    );
    const _m2 = Dictionary.load(
        Dictionary.Keys.Uint(8),
        Dictionary.Values.Bool(),
        sc_0,
    );
    return { $$type: "CompareDeep" as const, m1: _m1, m2: _m2 };
}

function loadTupleCompareDeep(source: TupleReader) {
    const _m1 = Dictionary.loadDirect(
        Dictionary.Keys.Uint(8),
        Dictionary.Values.Bool(),
        source.readCellOpt(),
    );
    const _m2 = Dictionary.loadDirect(
        Dictionary.Keys.Uint(8),
        Dictionary.Values.Bool(),
        source.readCellOpt(),
    );
    return { $$type: "CompareDeep" as const, m1: _m1, m2: _m2 };
}

function loadGetterTupleCompareDeep(source: TupleReader) {
    const _m1 = Dictionary.loadDirect(
        Dictionary.Keys.Uint(8),
        Dictionary.Values.Bool(),
        source.readCellOpt(),
    );
    const _m2 = Dictionary.loadDirect(
        Dictionary.Keys.Uint(8),
        Dictionary.Values.Bool(),
        source.readCellOpt(),
    );
    return { $$type: "CompareDeep" as const, m1: _m1, m2: _m2 };
}

function storeTupleCompareDeep(source: CompareDeep) {
    const builder = new TupleBuilder();
    builder.writeCell(
        source.m1.size > 0
            ? beginCell()
                  .storeDictDirect(
                      source.m1,
                      Dictionary.Keys.Uint(8),
                      Dictionary.Values.Bool(),
                  )
                  .endCell()
            : null,
    );
    builder.writeCell(
        source.m2.size > 0
            ? beginCell()
                  .storeDictDirect(
                      source.m2,
                      Dictionary.Keys.Uint(8),
                      Dictionary.Values.Bool(),
                  )
                  .endCell()
            : null,
    );
    return builder.build();
}

function dictValueParserCompareDeep(): DictionaryValue<CompareDeep> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeCompareDeep(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadCompareDeep(src.loadRef().beginParse());
        },
    };
}

export type MapComparisonTestContract$Data = {
    $$type: "MapComparisonTestContract$Data";
};

export function storeMapComparisonTestContract$Data(
    src: MapComparisonTestContract$Data,
) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

export function loadMapComparisonTestContract$Data(slice: Slice) {
    const sc_0 = slice;
    return { $$type: "MapComparisonTestContract$Data" as const };
}

function loadTupleMapComparisonTestContract$Data(source: TupleReader) {
    return { $$type: "MapComparisonTestContract$Data" as const };
}

function loadGetterTupleMapComparisonTestContract$Data(source: TupleReader) {
    return { $$type: "MapComparisonTestContract$Data" as const };
}

function storeTupleMapComparisonTestContract$Data(
    source: MapComparisonTestContract$Data,
) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserMapComparisonTestContract$Data(): DictionaryValue<MapComparisonTestContract$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell()
                    .store(storeMapComparisonTestContract$Data(src))
                    .endCell(),
            );
        },
        parse: (src) => {
            return loadMapComparisonTestContract$Data(
                src.loadRef().beginParse(),
            );
        },
    };
}

type MapComparisonTestContract_init_args = {
    $$type: "MapComparisonTestContract_init_args";
};

function initMapComparisonTestContract_init_args(
    src: MapComparisonTestContract_init_args,
) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function MapComparisonTestContract_init() {
    const __code = Cell.fromBase64(
        "te6ccgECEgEAAdsAART/APSkE/S88sgLAQIBYgIDA/jQAdBy1yHSANIA+kAhEDRQZm8E+GEC+GLbPAKRW+BwIddJIMIflTEB0x8C3iGCEFfWEXG6jjRb9AT0BFmCAM93MyFuIW5csJNfBH+OEQGzAbOwlwH5AAH5ALqSW3Di4vL0MMh/AcoAye1U4CGCEOKBe7664wIywAABwSGwEAQFAgEgBgcAolv0BPQEWYIAz3czeI437aLt+1Mg9IJvpZCOJFRQQ/Rib6GVXwZw2zHhAvkBAvkBErqVXwRw2zHhVDIx9HRvpegQNF8Ebtjy9DDIfwHKAMntVAAemTDIfwHKAMntVOAw8sCCAgEgCAkCASAKCwIRuNqds8Wds8MYEA8CEbuJvbPFnbPDGBARAhG5Lz2zxZ2zwxgQEQIBSAwNAgWtwcAODgIRss12zxZ2zwxgEBECDTbPFnbPDGAQDwB6gQEBjjftou37UyD0gm+lkI4kVFBD9GJvoZVfBnDbMeEC+QEC+QESupVfBHDbMeFUMjH0dG+l6BA0XwRu2AAU7UTQ0gAwkW3gbQB6gQELjjftou37UyD0gm+lkI4kVFBD9GJvoZVfBnDbMeEC+QEC+QESupVfBHDbMeFUMjH0dG+l6BA0XwRu2A==",
    );
    const builder = beginCell();
    builder.storeUint(0, 1);
    initMapComparisonTestContract_init_args({
        $$type: "MapComparisonTestContract_init_args",
    })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const MapComparisonTestContract_errors: { [key: number]: { message: string } } =
    {
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
        53111: { message: `Maps are not equal` },
    };

const MapComparisonTestContract_types: ABIType[] = [
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
        name: "Compare",
        header: 1473646961,
        fields: [
            {
                name: "m1",
                type: {
                    kind: "dict",
                    key: "uint",
                    keyFormat: 8,
                    value: "bool",
                },
            },
            {
                name: "m2",
                type: {
                    kind: "dict",
                    key: "uint",
                    keyFormat: 8,
                    value: "bool",
                },
            },
        ],
    },
    {
        name: "CompareDeep",
        header: 3800136638,
        fields: [
            {
                name: "m1",
                type: {
                    kind: "dict",
                    key: "uint",
                    keyFormat: 8,
                    value: "bool",
                },
            },
            {
                name: "m2",
                type: {
                    kind: "dict",
                    key: "uint",
                    keyFormat: 8,
                    value: "bool",
                },
            },
        ],
    },
    { name: "MapComparisonTestContract$Data", header: null, fields: [] },
];

const MapComparisonTestContract_getters: ABIGetter[] = [
    {
        name: "compareIntInt",
        methodId: 69033,
        arguments: [
            { name: "m1", type: { kind: "dict", key: "int", value: "int" } },
            { name: "m2", type: { kind: "dict", key: "int", value: "int" } },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compareIntCell",
        methodId: 116487,
        arguments: [
            {
                name: "m1",
                type: {
                    kind: "dict",
                    key: "int",
                    value: "cell",
                    valueFormat: "ref",
                },
            },
            {
                name: "m2",
                type: {
                    kind: "dict",
                    key: "int",
                    value: "cell",
                    valueFormat: "ref",
                },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compareIntAddress",
        methodId: 116486,
        arguments: [
            {
                name: "m1",
                type: { kind: "dict", key: "int", value: "address" },
            },
            {
                name: "m2",
                type: { kind: "dict", key: "int", value: "address" },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compareAddressInt",
        methodId: 96411,
        arguments: [
            {
                name: "m1",
                type: { kind: "dict", key: "address", value: "int" },
            },
            {
                name: "m2",
                type: { kind: "dict", key: "address", value: "int" },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compareAddressCell",
        methodId: 121653,
        arguments: [
            {
                name: "m1",
                type: {
                    kind: "dict",
                    key: "address",
                    value: "cell",
                    valueFormat: "ref",
                },
            },
            {
                name: "m2",
                type: {
                    kind: "dict",
                    key: "address",
                    value: "cell",
                    valueFormat: "ref",
                },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compareAddressAddress",
        methodId: 103155,
        arguments: [
            {
                name: "m1",
                type: { kind: "dict", key: "address", value: "address" },
            },
            {
                name: "m2",
                type: { kind: "dict", key: "address", value: "address" },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
];

export const MapComparisonTestContract_getterMapping: {
    [key: string]: string;
} = {
    compareIntInt: "getCompareIntInt",
    compareIntCell: "getCompareIntCell",
    compareIntAddress: "getCompareIntAddress",
    compareAddressInt: "getCompareAddressInt",
    compareAddressCell: "getCompareAddressCell",
    compareAddressAddress: "getCompareAddressAddress",
};

const MapComparisonTestContract_receivers: ABIReceiver[] = [
    { receiver: "internal", message: { kind: "empty" } },
    { receiver: "internal", message: { kind: "typed", type: "Compare" } },
    { receiver: "internal", message: { kind: "typed", type: "CompareDeep" } },
];

export class MapComparisonTestContract implements Contract {
    static async init() {
        return await MapComparisonTestContract_init();
    }

    static async fromInit() {
        const __gen_init = await MapComparisonTestContract_init();
        const address = contractAddress(0, __gen_init);
        return new MapComparisonTestContract(address, __gen_init);
    }

    static fromAddress(address: Address) {
        return new MapComparisonTestContract(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };
    readonly abi: ContractABI = {
        types: MapComparisonTestContract_types,
        getters: MapComparisonTestContract_getters,
        receivers: MapComparisonTestContract_receivers,
        errors: MapComparisonTestContract_errors,
    };

    private constructor(address: Address, init?: { code: Cell; data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(
        provider: ContractProvider,
        via: Sender,
        args: { value: bigint; bounce?: boolean | null | undefined },
        message: null | Compare | CompareDeep,
    ) {
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (
            message &&
            typeof message === "object" &&
            !(message instanceof Slice) &&
            message.$$type === "Compare"
        ) {
            body = beginCell().store(storeCompare(message)).endCell();
        }
        if (
            message &&
            typeof message === "object" &&
            !(message instanceof Slice) &&
            message.$$type === "CompareDeep"
        ) {
            body = beginCell().store(storeCompareDeep(message)).endCell();
        }
        if (body === null) {
            throw new Error("Invalid message type");
        }

        await provider.internal(via, { ...args, body: body });
    }

    async getCompareIntInt(
        provider: ContractProvider,
        m1: Dictionary<bigint, bigint>,
        m2: Dictionary<bigint, bigint>,
    ) {
        const builder = new TupleBuilder();
        builder.writeCell(
            m1.size > 0
                ? beginCell()
                      .storeDictDirect(
                          m1,
                          Dictionary.Keys.BigInt(257),
                          Dictionary.Values.BigInt(257),
                      )
                      .endCell()
                : null,
        );
        builder.writeCell(
            m2.size > 0
                ? beginCell()
                      .storeDictDirect(
                          m2,
                          Dictionary.Keys.BigInt(257),
                          Dictionary.Values.BigInt(257),
                      )
                      .endCell()
                : null,
        );
        const source = (await provider.get(69033 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompareIntCell(
        provider: ContractProvider,
        m1: Dictionary<bigint, Cell>,
        m2: Dictionary<bigint, Cell>,
    ) {
        const builder = new TupleBuilder();
        builder.writeCell(
            m1.size > 0
                ? beginCell()
                      .storeDictDirect(
                          m1,
                          Dictionary.Keys.BigInt(257),
                          Dictionary.Values.Cell(),
                      )
                      .endCell()
                : null,
        );
        builder.writeCell(
            m2.size > 0
                ? beginCell()
                      .storeDictDirect(
                          m2,
                          Dictionary.Keys.BigInt(257),
                          Dictionary.Values.Cell(),
                      )
                      .endCell()
                : null,
        );
        const source = (await provider.get(116487 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompareIntAddress(
        provider: ContractProvider,
        m1: Dictionary<bigint, Address>,
        m2: Dictionary<bigint, Address>,
    ) {
        const builder = new TupleBuilder();
        builder.writeCell(
            m1.size > 0
                ? beginCell()
                      .storeDictDirect(
                          m1,
                          Dictionary.Keys.BigInt(257),
                          Dictionary.Values.Address(),
                      )
                      .endCell()
                : null,
        );
        builder.writeCell(
            m2.size > 0
                ? beginCell()
                      .storeDictDirect(
                          m2,
                          Dictionary.Keys.BigInt(257),
                          Dictionary.Values.Address(),
                      )
                      .endCell()
                : null,
        );
        const source = (await provider.get(116486 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompareAddressInt(
        provider: ContractProvider,
        m1: Dictionary<Address, bigint>,
        m2: Dictionary<Address, bigint>,
    ) {
        const builder = new TupleBuilder();
        builder.writeCell(
            m1.size > 0
                ? beginCell()
                      .storeDictDirect(
                          m1,
                          Dictionary.Keys.Address(),
                          Dictionary.Values.BigInt(257),
                      )
                      .endCell()
                : null,
        );
        builder.writeCell(
            m2.size > 0
                ? beginCell()
                      .storeDictDirect(
                          m2,
                          Dictionary.Keys.Address(),
                          Dictionary.Values.BigInt(257),
                      )
                      .endCell()
                : null,
        );
        const source = (await provider.get(96411 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompareAddressCell(
        provider: ContractProvider,
        m1: Dictionary<Address, Cell>,
        m2: Dictionary<Address, Cell>,
    ) {
        const builder = new TupleBuilder();
        builder.writeCell(
            m1.size > 0
                ? beginCell()
                      .storeDictDirect(
                          m1,
                          Dictionary.Keys.Address(),
                          Dictionary.Values.Cell(),
                      )
                      .endCell()
                : null,
        );
        builder.writeCell(
            m2.size > 0
                ? beginCell()
                      .storeDictDirect(
                          m2,
                          Dictionary.Keys.Address(),
                          Dictionary.Values.Cell(),
                      )
                      .endCell()
                : null,
        );
        const source = (await provider.get(121653 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompareAddressAddress(
        provider: ContractProvider,
        m1: Dictionary<Address, Address>,
        m2: Dictionary<Address, Address>,
    ) {
        const builder = new TupleBuilder();
        builder.writeCell(
            m1.size > 0
                ? beginCell()
                      .storeDictDirect(
                          m1,
                          Dictionary.Keys.Address(),
                          Dictionary.Values.Address(),
                      )
                      .endCell()
                : null,
        );
        builder.writeCell(
            m2.size > 0
                ? beginCell()
                      .storeDictDirect(
                          m2,
                          Dictionary.Keys.Address(),
                          Dictionary.Values.Address(),
                      )
                      .endCell()
                : null,
        );
        const source = (await provider.get(103155 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }
}
