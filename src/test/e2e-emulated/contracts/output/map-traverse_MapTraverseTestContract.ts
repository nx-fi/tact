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

export type MyStruct = {
    $$type: "MyStruct";
    a: bigint;
    b: boolean;
};

export function storeMyStruct(src: MyStruct) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
        b_0.storeBit(src.b);
    };
}

export function loadMyStruct(slice: Slice) {
    const sc_0 = slice;
    const _a = sc_0.loadIntBig(257);
    const _b = sc_0.loadBit();
    return { $$type: "MyStruct" as const, a: _a, b: _b };
}

function loadTupleMyStruct(source: TupleReader) {
    const _a = source.readBigNumber();
    const _b = source.readBoolean();
    return { $$type: "MyStruct" as const, a: _a, b: _b };
}

function loadGetterTupleMyStruct(source: TupleReader) {
    const _a = source.readBigNumber();
    const _b = source.readBoolean();
    return { $$type: "MyStruct" as const, a: _a, b: _b };
}

function storeTupleMyStruct(source: MyStruct) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeBoolean(source.b);
    return builder.build();
}

function dictValueParserMyStruct(): DictionaryValue<MyStruct> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMyStruct(src)).endCell());
        },
        parse: (src) => {
            return loadMyStruct(src.loadRef().beginParse());
        },
    };
}

export type MyStructWithMap = {
    $$type: "MyStructWithMap";
    m: Dictionary<bigint, bigint>;
};

export function storeMyStructWithMap(src: MyStructWithMap) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeDict(
            src.m,
            Dictionary.Keys.BigInt(257),
            Dictionary.Values.BigInt(257),
        );
    };
}

export function loadMyStructWithMap(slice: Slice) {
    const sc_0 = slice;
    const _m = Dictionary.load(
        Dictionary.Keys.BigInt(257),
        Dictionary.Values.BigInt(257),
        sc_0,
    );
    return { $$type: "MyStructWithMap" as const, m: _m };
}

function loadTupleMyStructWithMap(source: TupleReader) {
    const _m = Dictionary.loadDirect(
        Dictionary.Keys.BigInt(257),
        Dictionary.Values.BigInt(257),
        source.readCellOpt(),
    );
    return { $$type: "MyStructWithMap" as const, m: _m };
}

function loadGetterTupleMyStructWithMap(source: TupleReader) {
    const _m = Dictionary.loadDirect(
        Dictionary.Keys.BigInt(257),
        Dictionary.Values.BigInt(257),
        source.readCellOpt(),
    );
    return { $$type: "MyStructWithMap" as const, m: _m };
}

function storeTupleMyStructWithMap(source: MyStructWithMap) {
    const builder = new TupleBuilder();
    builder.writeCell(
        source.m.size > 0
            ? beginCell()
                  .storeDictDirect(
                      source.m,
                      Dictionary.Keys.BigInt(257),
                      Dictionary.Values.BigInt(257),
                  )
                  .endCell()
            : null,
    );
    return builder.build();
}

function dictValueParserMyStructWithMap(): DictionaryValue<MyStructWithMap> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeMyStructWithMap(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadMyStructWithMap(src.loadRef().beginParse());
        },
    };
}

export type MapTraverseTestContract$Data = {
    $$type: "MapTraverseTestContract$Data";
    m: Dictionary<bigint, bigint>;
    s: MyStructWithMap;
};

export function storeMapTraverseTestContract$Data(
    src: MapTraverseTestContract$Data,
) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeDict(
            src.m,
            Dictionary.Keys.BigInt(257),
            Dictionary.Values.BigInt(257),
        );
        b_0.store(storeMyStructWithMap(src.s));
    };
}

export function loadMapTraverseTestContract$Data(slice: Slice) {
    const sc_0 = slice;
    const _m = Dictionary.load(
        Dictionary.Keys.BigInt(257),
        Dictionary.Values.BigInt(257),
        sc_0,
    );
    const _s = loadMyStructWithMap(sc_0);
    return { $$type: "MapTraverseTestContract$Data" as const, m: _m, s: _s };
}

function loadTupleMapTraverseTestContract$Data(source: TupleReader) {
    const _m = Dictionary.loadDirect(
        Dictionary.Keys.BigInt(257),
        Dictionary.Values.BigInt(257),
        source.readCellOpt(),
    );
    const _s = loadTupleMyStructWithMap(source);
    return { $$type: "MapTraverseTestContract$Data" as const, m: _m, s: _s };
}

function loadGetterTupleMapTraverseTestContract$Data(source: TupleReader) {
    const _m = Dictionary.loadDirect(
        Dictionary.Keys.BigInt(257),
        Dictionary.Values.BigInt(257),
        source.readCellOpt(),
    );
    const _s = loadGetterTupleMyStructWithMap(source);
    return { $$type: "MapTraverseTestContract$Data" as const, m: _m, s: _s };
}

function storeTupleMapTraverseTestContract$Data(
    source: MapTraverseTestContract$Data,
) {
    const builder = new TupleBuilder();
    builder.writeCell(
        source.m.size > 0
            ? beginCell()
                  .storeDictDirect(
                      source.m,
                      Dictionary.Keys.BigInt(257),
                      Dictionary.Values.BigInt(257),
                  )
                  .endCell()
            : null,
    );
    builder.writeTuple(storeTupleMyStructWithMap(source.s));
    return builder.build();
}

function dictValueParserMapTraverseTestContract$Data(): DictionaryValue<MapTraverseTestContract$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell()
                    .store(storeMapTraverseTestContract$Data(src))
                    .endCell(),
            );
        },
        parse: (src) => {
            return loadMapTraverseTestContract$Data(src.loadRef().beginParse());
        },
    };
}

type MapTraverseTestContract_init_args = {
    $$type: "MapTraverseTestContract_init_args";
};

function initMapTraverseTestContract_init_args(
    src: MapTraverseTestContract_init_args,
) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function MapTraverseTestContract_init() {
    const __code = Cell.fromBase64(
        "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",
    );
    const builder = beginCell();
    builder.storeUint(0, 1);
    initMapTraverseTestContract_init_args({
        $$type: "MapTraverseTestContract_init_args",
    })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const MapTraverseTestContract_errors: { [key: number]: { message: string } } = {
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

const MapTraverseTestContract_types: ABIType[] = [
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
        name: "MyStruct",
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
                type: { kind: "simple", type: "bool", optional: false },
            },
        ],
    },
    {
        name: "MyStructWithMap",
        header: null,
        fields: [
            { name: "m", type: { kind: "dict", key: "int", value: "int" } },
        ],
    },
    {
        name: "MapTraverseTestContract$Data",
        header: null,
        fields: [
            { name: "m", type: { kind: "dict", key: "int", value: "int" } },
            {
                name: "s",
                type: {
                    kind: "simple",
                    type: "MyStructWithMap",
                    optional: false,
                },
            },
        ],
    },
];

const MapTraverseTestContract_getters: ABIGetter[] = [
    {
        name: "test_int_int",
        methodId: 115949,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "test_int_coins",
        methodId: 106986,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "test_int_varint16",
        methodId: 117373,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "test_int_bool",
        methodId: 77636,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "test_int_cell",
        methodId: 117602,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "test_int_address",
        methodId: 83640,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "test_int_struct",
        methodId: 79520,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "test_address_int",
        methodId: 65769,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "test_address_coins",
        methodId: 80894,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "test_address_varint16",
        methodId: 113202,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "test_address_bool",
        methodId: 111244,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "test_address_cell",
        methodId: 87722,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "test_address_address",
        methodId: 123693,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "test_address_struct",
        methodId: 65619,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "test_empty_map",
        methodId: 96611,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "test_null",
        methodId: 112186,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "test_map_modification_during_traversal1",
        methodId: 104258,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "test_map_modification_during_traversal2",
        methodId: 108321,
        arguments: [],
        returnType: null,
    },
    {
        name: "test_map_size",
        methodId: 73341,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "test_map_as_field",
        methodId: 95491,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "test_map_as_struct_field",
        methodId: 79374,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
];

export const MapTraverseTestContract_getterMapping: { [key: string]: string } =
    {
        test_int_int: "getTestIntInt",
        test_int_coins: "getTestIntCoins",
        test_int_varint16: "getTestIntVarint16",
        test_int_bool: "getTestIntBool",
        test_int_cell: "getTestIntCell",
        test_int_address: "getTestIntAddress",
        test_int_struct: "getTestIntStruct",
        test_address_int: "getTestAddressInt",
        test_address_coins: "getTestAddressCoins",
        test_address_varint16: "getTestAddressVarint16",
        test_address_bool: "getTestAddressBool",
        test_address_cell: "getTestAddressCell",
        test_address_address: "getTestAddressAddress",
        test_address_struct: "getTestAddressStruct",
        test_empty_map: "getTestEmptyMap",
        test_null: "getTestNull",
        test_map_modification_during_traversal1:
            "getTestMapModificationDuringTraversal1",
        test_map_modification_during_traversal2:
            "getTestMapModificationDuringTraversal2",
        test_map_size: "getTestMapSize",
        test_map_as_field: "getTestMapAsField",
        test_map_as_struct_field: "getTestMapAsStructField",
    };

const MapTraverseTestContract_receivers: ABIReceiver[] = [
    { receiver: "internal", message: { kind: "empty" } },
];

export class MapTraverseTestContract implements Contract {
    static async init() {
        return await MapTraverseTestContract_init();
    }

    static async fromInit() {
        const __gen_init = await MapTraverseTestContract_init();
        const address = contractAddress(0, __gen_init);
        return new MapTraverseTestContract(address, __gen_init);
    }

    static fromAddress(address: Address) {
        return new MapTraverseTestContract(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };
    readonly abi: ContractABI = {
        types: MapTraverseTestContract_types,
        getters: MapTraverseTestContract_getters,
        receivers: MapTraverseTestContract_receivers,
        errors: MapTraverseTestContract_errors,
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

    async getTestIntInt(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(115949 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getTestIntCoins(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(106986 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getTestIntVarint16(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(117373 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getTestIntBool(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(77636 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getTestIntCell(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(117602 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getTestIntAddress(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(83640 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getTestIntStruct(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(79520 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getTestAddressInt(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(65769 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getTestAddressCoins(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(80894 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getTestAddressVarint16(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(113202 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getTestAddressBool(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(111244 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getTestAddressCell(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(87722 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getTestAddressAddress(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(123693 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getTestAddressStruct(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(65619 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getTestEmptyMap(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(96611 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getTestNull(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(112186 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getTestMapModificationDuringTraversal1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(104258 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getTestMapModificationDuringTraversal2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(108321 as any, builder.build()))
            .stack;
    }

    async getTestMapSize(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(73341 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getTestMapAsField(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(95491 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getTestMapAsStructField(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(79374 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }
}
