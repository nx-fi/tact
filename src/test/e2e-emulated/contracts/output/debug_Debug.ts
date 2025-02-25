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

export type Debug$Data = {
    $$type: "Debug$Data";
};

export function storeDebug$Data(src: Debug$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

export function loadDebug$Data(slice: Slice) {
    const sc_0 = slice;
    return { $$type: "Debug$Data" as const };
}

function loadTupleDebug$Data(source: TupleReader) {
    return { $$type: "Debug$Data" as const };
}

function loadGetterTupleDebug$Data(source: TupleReader) {
    return { $$type: "Debug$Data" as const };
}

function storeTupleDebug$Data(source: Debug$Data) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserDebug$Data(): DictionaryValue<Debug$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDebug$Data(src)).endCell());
        },
        parse: (src) => {
            return loadDebug$Data(src.loadRef().beginParse());
        },
    };
}

type Debug_init_args = {
    $$type: "Debug_init_args";
};

function initDebug_init_args(src: Debug_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function Debug_init() {
    const __code = Cell.fromBase64(
        "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",
    );
    const builder = beginCell();
    builder.storeUint(0, 1);
    initDebug_init_args({ $$type: "Debug_init_args" })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Debug_errors: { [key: number]: { message: string } } = {
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

const Debug_types: ABIType[] = [
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
    { name: "Debug$Data", header: null, fields: [] },
];

const Debug_getters: ABIGetter[] = [
    { name: "debug", methodId: 93099, arguments: [], returnType: null },
];

export const Debug_getterMapping: { [key: string]: string } = {
    debug: "getDebug",
};

const Debug_receivers: ABIReceiver[] = [
    { receiver: "internal", message: { kind: "text", text: "Debug" } },
    { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
];

export class Debug implements Contract {
    static async init() {
        return await Debug_init();
    }

    static async fromInit() {
        const __gen_init = await Debug_init();
        const address = contractAddress(0, __gen_init);
        return new Debug(address, __gen_init);
    }

    static fromAddress(address: Address) {
        return new Debug(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };
    readonly abi: ContractABI = {
        types: Debug_types,
        getters: Debug_getters,
        receivers: Debug_receivers,
        errors: Debug_errors,
    };

    private constructor(address: Address, init?: { code: Cell; data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(
        provider: ContractProvider,
        via: Sender,
        args: { value: bigint; bounce?: boolean | null | undefined },
        message: "Debug" | Deploy,
    ) {
        let body: Cell | null = null;
        if (message === "Debug") {
            body = beginCell()
                .storeUint(0, 32)
                .storeStringTail(message)
                .endCell();
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

    async getDebug(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(93099 as any, builder.build()))
            .stack;
    }
}
