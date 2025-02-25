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

export type Deploy = {
    $$type: "Deploy";
    queryId: bigint;
};

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) {
        throw Error("Invalid prefix");
    }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: "Deploy" as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: "Deploy" as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: "Deploy" as const, queryId: _queryId };
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
        },
    };
}

export type DeployOk = {
    $$type: "DeployOk";
    queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) {
        throw Error("Invalid prefix");
    }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: "DeployOk" as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: "DeployOk" as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: "DeployOk" as const, queryId: _queryId };
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
        },
    };
}

export type FactoryDeploy = {
    $$type: "FactoryDeploy";
    queryId: bigint;
    cashback: Address;
};

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
    if (sc_0.loadUint(32) !== 1829761339) {
        throw Error("Invalid prefix");
    }
    const _queryId = sc_0.loadUintBig(64);
    const _cashback = sc_0.loadAddress();
    return {
        $$type: "FactoryDeploy" as const,
        queryId: _queryId,
        cashback: _cashback,
    };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return {
        $$type: "FactoryDeploy" as const,
        queryId: _queryId,
        cashback: _cashback,
    };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return {
        $$type: "FactoryDeploy" as const,
        queryId: _queryId,
        cashback: _cashback,
    };
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
            builder.storeRef(
                beginCell().store(storeFactoryDeploy(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        },
    };
}

export type S = {
    $$type: "S";
    a: bigint;
    b: bigint;
};

export function storeS(src: S) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
        b_0.storeInt(src.b, 257);
    };
}

export function loadS(slice: Slice) {
    const sc_0 = slice;
    const _a = sc_0.loadIntBig(257);
    const _b = sc_0.loadIntBig(257);
    return { $$type: "S" as const, a: _a, b: _b };
}

function loadTupleS(source: TupleReader) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    return { $$type: "S" as const, a: _a, b: _b };
}

function loadGetterTupleS(source: TupleReader) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    return { $$type: "S" as const, a: _a, b: _b };
}

function storeTupleS(source: S) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeNumber(source.b);
    return builder.build();
}

function dictValueParserS(): DictionaryValue<S> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeS(src)).endCell());
        },
        parse: (src) => {
            return loadS(src.loadRef().beginParse());
        },
    };
}

export type SetIdAndData = {
    $$type: "SetIdAndData";
    id: bigint;
    data: Cell;
};

export function storeSetIdAndData(src: SetIdAndData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1746430141, 32);
        b_0.storeInt(src.id, 257);
        b_0.storeRef(src.data);
    };
}

export function loadSetIdAndData(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1746430141) {
        throw Error("Invalid prefix");
    }
    const _id = sc_0.loadIntBig(257);
    const _data = sc_0.loadRef();
    return { $$type: "SetIdAndData" as const, id: _id, data: _data };
}

function loadTupleSetIdAndData(source: TupleReader) {
    const _id = source.readBigNumber();
    const _data = source.readCell();
    return { $$type: "SetIdAndData" as const, id: _id, data: _data };
}

function loadGetterTupleSetIdAndData(source: TupleReader) {
    const _id = source.readBigNumber();
    const _data = source.readCell();
    return { $$type: "SetIdAndData" as const, id: _id, data: _data };
}

function storeTupleSetIdAndData(source: SetIdAndData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSetIdAndData(): DictionaryValue<SetIdAndData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeSetIdAndData(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadSetIdAndData(src.loadRef().beginParse());
        },
    };
}

export type Test$Data = {
    $$type: "Test$Data";
    id: bigint;
    anotherData: Cell;
};

export function storeTest$Data(src: Test$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.id, 32);
        b_0.storeRef(src.anotherData);
    };
}

export function loadTest$Data(slice: Slice) {
    const sc_0 = slice;
    const _id = sc_0.loadUintBig(32);
    const _anotherData = sc_0.loadRef();
    return { $$type: "Test$Data" as const, id: _id, anotherData: _anotherData };
}

function loadTupleTest$Data(source: TupleReader) {
    const _id = source.readBigNumber();
    const _anotherData = source.readCell();
    return { $$type: "Test$Data" as const, id: _id, anotherData: _anotherData };
}

function loadGetterTupleTest$Data(source: TupleReader) {
    const _id = source.readBigNumber();
    const _anotherData = source.readCell();
    return { $$type: "Test$Data" as const, id: _id, anotherData: _anotherData };
}

function storeTupleTest$Data(source: Test$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeCell(source.anotherData);
    return builder.build();
}

function dictValueParserTest$Data(): DictionaryValue<Test$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTest$Data(src)).endCell());
        },
        parse: (src) => {
            return loadTest$Data(src.loadRef().beginParse());
        },
    };
}

type Test_init_args = {
    $$type: "Test_init_args";
};

function initTest_init_args(src: Test_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function Test_init() {
    const __code = Cell.fromBase64(
        "te6ccgECJAEAAeQAART/APSkE/S88sgLAQIBIAIDAgEgBAUCDtLbPNs8bCEiIwIBIAYHAg7x2zzbPGwhIiMCASAICQIBIA8QAgEgCgsCEb1/Rtnm2eNhDCIjA/fcA6DlrkOkAaQB9IBCIGigzN4J8MIF8MW2eAckvgfAAwBBrgrfRmBDBCDQMNF7dRww2GMCAgOuAaiy2CWQ/gOUALIFlj+Zk9qpwAMEISjVMW11HU+mfgJjkAMEIV/yHq6xlj+Wf5Il8IQC4Nu2eZD+A5QAsgWWP5mT2qnBIgwNAg3dtnm2eNhDIg4AoG1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQIxA2VSISyM+FgMoAz4RAzgH6AoBpz0ACXG4BbqiTW8+BnVjPhoDPhID0APQAz4Hi9ADJAfsAAApfA/LAggAEgw0CASAREgIBIBgZAgFmExQCEbvh/bPNs8bCGCIXAhGv2O2ebZ42EUAiFQIRre5tnm2eNhDAIhYAAlwAAnMAAnECEbsabbPNs8bCGCIaAgEgGxwAAnICF7fYTeRbZ4tbZ42EMCIdAgEgHh8AAjACAVggIQETsbHbyLbPFpsIoCIBEqthbyLbPFpsIiIBEqqhbyLbPFpsIiIAJO1E0NIAAZbTH9RZbBLgMHDIyQACfw==",
    );
    const builder = beginCell();
    builder.storeUint(0, 1);
    initTest_init_args({ $$type: "Test_init_args" })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Test_errors: { [key: number]: { message: string } } = {
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

const Test_types: ABIType[] = [
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
        name: "Deploy",
        header: 2490013878,
        fields: [
            {
                name: "queryId",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 64,
                },
            },
        ],
    },
    {
        name: "DeployOk",
        header: 2952335191,
        fields: [
            {
                name: "queryId",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 64,
                },
            },
        ],
    },
    {
        name: "FactoryDeploy",
        header: 1829761339,
        fields: [
            {
                name: "queryId",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 64,
                },
            },
            {
                name: "cashback",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "S",
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
        name: "SetIdAndData",
        header: 1746430141,
        fields: [
            {
                name: "id",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "data",
                type: { kind: "simple", type: "cell", optional: false },
            },
        ],
    },
    {
        name: "Test$Data",
        header: null,
        fields: [
            {
                name: "id",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 32,
                },
            },
            {
                name: "anotherData",
                type: { kind: "simple", type: "cell", optional: false },
            },
        ],
    },
];

const Test_getters: ABIGetter[] = [
    {
        name: "testGetter",
        methodId: 97823,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "test_getter",
        methodId: 111014,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "Test_getter",
        methodId: 72668,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "contractData",
        methodId: 71601,
        arguments: [],
        returnType: { kind: "simple", type: "Test$Data", optional: false },
    },
    {
        name: "structAsInput",
        methodId: 128711,
        arguments: [
            { name: "s", type: { kind: "simple", type: "S", optional: false } },
        ],
        returnType: { kind: "simple", type: "S", optional: false },
    },
    {
        name: "messageAsInput1",
        methodId: 122562,
        arguments: [
            {
                name: "m",
                type: { kind: "simple", type: "SetIdAndData", optional: false },
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
        name: "messageAsInput2",
        methodId: 126625,
        arguments: [
            {
                name: "m",
                type: { kind: "simple", type: "SetIdAndData", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "SetIdAndData", optional: false },
    },
    {
        name: "contractAsInput",
        methodId: 125793,
        arguments: [
            {
                name: "test",
                type: { kind: "simple", type: "Test$Data", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "Test$Data", optional: false },
    },
    {
        name: "methodIdExpr",
        methodId: 45032,
        arguments: [],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "methodIdConst",
        methodId: 16384,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "methodIdMin",
        methodId: -262144,
        arguments: [],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "methodIdMax",
        methodId: 262143,
        arguments: [],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
];

export const Test_getterMapping: { [key: string]: string } = {
    testGetter: "getTestGetter",
    test_getter: "gettest_getter",
    Test_getter: "getTest_getter",
    contractData: "getContractData",
    structAsInput: "getStructAsInput",
    messageAsInput1: "getMessageAsInput1",
    messageAsInput2: "getMessageAsInput2",
    contractAsInput: "getContractAsInput",
    methodIdExpr: "getMethodIdExpr",
    methodIdConst: "getMethodIdConst",
    methodIdMin: "getMethodIdMin",
    methodIdMax: "getMethodIdMax",
};

const Test_receivers: ABIReceiver[] = [
    { receiver: "internal", message: { kind: "typed", type: "SetIdAndData" } },
    { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
];

export class Test implements Contract {
    static async init() {
        return await Test_init();
    }

    static async fromInit() {
        const __gen_init = await Test_init();
        const address = contractAddress(0, __gen_init);
        return new Test(address, __gen_init);
    }

    static fromAddress(address: Address) {
        return new Test(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };
    readonly abi: ContractABI = {
        types: Test_types,
        getters: Test_getters,
        receivers: Test_receivers,
        errors: Test_errors,
    };

    private constructor(address: Address, init?: { code: Cell; data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(
        provider: ContractProvider,
        via: Sender,
        args: { value: bigint; bounce?: boolean | null | undefined },
        message: SetIdAndData | Deploy,
    ) {
        let body: Cell | null = null;
        if (
            message &&
            typeof message === "object" &&
            !(message instanceof Slice) &&
            message.$$type === "SetIdAndData"
        ) {
            body = beginCell().store(storeSetIdAndData(message)).endCell();
        }
        if (
            message &&
            typeof message === "object" &&
            !(message instanceof Slice) &&
            message.$$type === "Deploy"
        ) {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) {
            throw new Error("Invalid message type");
        }

        await provider.internal(via, { ...args, body: body });
    }

    async getTestGetter(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(97823 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async gettest_getter(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(111014 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getTest_getter(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(72668 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getContractData(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(71601 as any, builder.build()))
            .stack;
        const result = loadGetterTupleTest$Data(source);
        return result;
    }

    async getStructAsInput(provider: ContractProvider, s: S) {
        const builder = new TupleBuilder();
        builder.writeTuple(storeTupleS(s));
        const source = (await provider.get(128711 as any, builder.build()))
            .stack;
        const result = loadGetterTupleS(source);
        return result;
    }

    async getMessageAsInput1(provider: ContractProvider, m: SetIdAndData) {
        const builder = new TupleBuilder();
        builder.writeTuple(storeTupleSetIdAndData(m));
        const source = (await provider.get(122562 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getMessageAsInput2(provider: ContractProvider, m: SetIdAndData) {
        const builder = new TupleBuilder();
        builder.writeTuple(storeTupleSetIdAndData(m));
        const source = (await provider.get(126625 as any, builder.build()))
            .stack;
        const result = loadGetterTupleSetIdAndData(source);
        return result;
    }

    async getContractAsInput(provider: ContractProvider, test: Test$Data) {
        const builder = new TupleBuilder();
        builder.writeTuple(storeTupleTest$Data(test));
        const source = (await provider.get(125793 as any, builder.build()))
            .stack;
        const result = loadGetterTupleTest$Data(source);
        return result;
    }

    async getMethodIdExpr(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(45032 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getMethodIdConst(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(16384 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getMethodIdMin(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(-262144 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getMethodIdMax(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(262143 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }
}
