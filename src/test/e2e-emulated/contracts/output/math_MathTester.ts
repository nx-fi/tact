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

export type MathTester$Data = {
    $$type: "MathTester$Data";
};

export function storeMathTester$Data(src: MathTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

export function loadMathTester$Data(slice: Slice) {
    const sc_0 = slice;
    return { $$type: "MathTester$Data" as const };
}

function loadTupleMathTester$Data(source: TupleReader) {
    return { $$type: "MathTester$Data" as const };
}

function loadGetterTupleMathTester$Data(source: TupleReader) {
    return { $$type: "MathTester$Data" as const };
}

function storeTupleMathTester$Data(source: MathTester$Data) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserMathTester$Data(): DictionaryValue<MathTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeMathTester$Data(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadMathTester$Data(src.loadRef().beginParse());
        },
    };
}

type MathTester_init_args = {
    $$type: "MathTester_init_args";
};

function initMathTester_init_args(src: MathTester_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function MathTester_init() {
    const __code = Cell.fromBase64(
        "te6ccgICARcAAQAADAYAAAEU/wD0pBP0vPLICwABAgFiAAIAAwKs0AHQctch0gDSAPpAIRA0UGZvBPhhAvhi2zwCkVvggCDXBW+jMAGCEJRqmLa6jqLTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8MMh/AcoAye1U4FvywIIBFQAEAgEgAAUABgCgbW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAjEDZVIhLIz4WAygDPhEDOAfoCgGnPQAJcbgFuqJNbz4GdWM+GgM+EgPQA9ADPgeL0AMkB+wACASAABwAIAgEgAA0ADgIBIAAJAAoCASAACwAMAgEgABMAFAIBIAAoACkCASAAQQBCAgEgAFsAXAIBIAAPABACASAAEQASAgEgAH0AfgIBIACdAJ4CASAAxwDIAgEgAO4A7wIBIAAVABYCASAAHwAgAgEgABcAGAIBIAAaABsCDqpP2zzbPDEBFQAZAhCqINs8Wds8MQEVAIsAAnQCEKsj2zxZ2zwxARUAHAIBIAAdAB4AEgEhbpJbf5G94gINpIW2ebZ4YwEVAKYCD6U9tniztnhjARUAxQIBIAAhACICASAAIwAkAg6qbts82zwxARUAZAIQqgHbPFnbPDEBFQCWAhCrAts8Wds8MQEVACUCASAAJgAnABAhbpJbcJG64gINpMe2ebZ4YwEVAKYCD6V/tniztnhjARUArQIBIAAqACsCASAAMQAyAgOWkAAsAC0CAVgALwAwAg+tts8Ads8MYAEVAC4CD6w2zxZ2zwxgARUA1gAMIPKFtgOlAgvTtnm2eGMBFQB3Ag+lubZ4s7Z4YwEVAOYCASAAMwA0AgEgADoAOwIBagA1ADYCAUgAOAA5Ag26zbPNs8MYARUAZAIPuW2zwB2zwxgBFQA3AApxAa3AAQIPoaNs8Wds8MYBFQCbAg+gR2zxZ2zwxgEVAPsCAVgAPAA9AgFYAD8AQAIPoENs8Wds8MYBFQDRAg+hA2zxZ2zwxgEVAD4AEgEhbpJbcJG64gIPo/ds8Wds8MYBFQDZAg+gt2zxZ2zwxgEVAQICASAAQwBEAgEgAFIAUwIBIABFAEYCASAASgBLAg6qy9s82zwxARUARwIBIABIAEkAAnACD6eDtniztnhjARUA7AIPpy+2eLO2eGMBFQDrAhCrp9s8Wds8MQEVAEwCASAATQBOAC4hbiFuXLCTXwRwmwGzAbOwkb2SW3/i4gIBIABPAFACD6Q1tniztnhjARUBFAIPohds8Wds8MYBFQEAAg+i82zwB2zwxgEVAFEAArMCD611bZ5tnhjAARUAvgIBIABUAFUCEKuG2zxZ2zwxARUAVgIBSABXAFgAArwCA50cAFkAWgIPoDts8Wds8MYBFQC1Ag02zwB2zwxgARUAfAINNs8Wds8MYAEVARACASAAXQBeAgEgAHAAcQIBIABfAGACASAAZwBoAgEgAGEAYgIQqrnbPAHbPDEBFQBlAg+khbZ4s7Z4YwEVAGMCDaUTtnm2eGMBFQBkABABAfkAAfkAugAEgAwBBNs8AGYAWiDAAJIwcOAgIPKFtgOlIMABljAgpasApJSkqwCu4pxcqQYhoasAZqABwADmMQIBIABpAGoCEKgl2zwB2zwxARUAfAIPpce2eLO2eGMBFQBrAgFuAGwAbQAEqQYCEbd7Z4qkG2eGMAEVAG4CD7S7Z4s7Z4YwARUAbwAEqaYAECFuklt/kb3iAgFIAHIAcwIBIAB5AHoCD6THtniztnhjARUAdAIBZgB1AHYAMiFuIW5csJNfBH+cAbMBs7CSxwWSW3Di4rMCDbUbZ5tnhjABFQB3Ag+2G2eAO2eGMAEVAHgAAnUAAq4CEKvE2zxZ2zwxARUAewIQqATbPAHbPDEBFQB8AC4hbiFuXLCTXwR/mwGzAbOwkbqSW3Di4gAEbrMCAUgAfwCAAgEgAIwAjQIBIACBAIICASAAhwCIAgEgAIMAhAIPp3m2eLO2eGMBFQEWAg+jS2zwB2zwxgEVAIUCD6IzbPFnbPDGARUAhgAEs6MAFCFukltwkscF4rMCASAAiQCKAg+mUbZ4s7Z4YwEVAIsCD6HrbPFnbPDGARUA5QIPoBts8Ads8MYBFQDEABwhbpJbcJcB+QEB+QG64gIBIACOAI8CASAAlwCYAhCprds8Wds8MQEVAJACASAAkQCSABYBIW6SW3CSxwXiswIBIACTAJQCD6YTtniztnhjARUAlgIPoW9s8Wds8MYBFQCVAg+gn2zwB2zwxgEVAMQAEAEB+QAB+QC9AB4BIW6SW3CXAfkBAfkBuuICAUgAmQCaAhCq9ts8Ads8MQEVAJwCD6E7bPFnbPDGARUAmwIPod9s8Wds8MYBFQC2AAKyAAauwAECASAAnwCgAgEgALcAuAIBIAChAKICASAArgCvAgEgAKMApAIBIACnAKgCD6edtniztnhjARUApQINpgu2ebZ4YwEVAKYACAHHBbMAAnMCASAAqQCqAg+m1bZ4s7Z4YwEVAK0CD6DjbPFnbPDGARUAqwIRomds8VSDbPDGARUArAAeASFukltwlwH5AAH5ALriAASphgAQAQH5AQH5Ab0CASAAsACxAgFqALMAtAIPpLm2eLO2eGMBFQEQAg+k07Z4s7Z4YwEVALIAAr4CD77ds8Wds8MYARUAtQIPvx2zxZ2zwxgBFQC2AAKtAAKsAgEgALkAugIRrSRtniztnhjAARUAxgIBIAC7ALwCASAAvwDAAg+n37Z4s7Z4YwEVAL0CDaZJtnm2eGMBFQC+ADAhbiFuXLCTXwR/nAGzAbOwkscFkltw4uIAAncCASAAwQDCAg+ml7Z4s7Z4YwEVAMUCD6BnbPFnbPDGARUAwwIPoZds8Ads8MYBFQDEABwhbpJbcJcB+QAB+QC64gACbgA8IW4hblywk18Ef44RAbMBs7CXAfkBAfkBupJbcOLiAAK5AgEgAMkAygIBIADbANwCASAAywDMAhGutm2eLO2eGMABFQDaAgEgAM0AzgIBIADUANUCASAAzwDQAg+nDbZ4A7Z4YwEVANMCD6GfbPFnbPDGARUA0QIPoCNs8Wds8MYBFQDSAAKhABIhbpJbcJLHBeIAArgCD6X9tniztnhjARUA1gIBWADXANgAPCFuIW5csJNfBHCOEQGzAbOwlwH5AAH5AL2SW3/i4gIPuR2zxZ2zwxgBFQDsAg+6zbPFnbPDGAEVANkAHCFuklt/lwH5AQH5Ab3iABggwv/yhXEBkiGo5DECASAA3QDeAgEgAOcA6AIBSADfAOACASAA4wDkAg+h32zwB2zwxgEVAOECD6CnbPFnbPDGARUA4gAEs7MAFAEhbpJbcJLHBeICD6W/tniztnhjARUA5QIPpxu2eLO2eGMBFQDmADwhbiFuXLCTXwR/jhEBswGzsJcB+QAB+QC6kltw4uIAHgEhbpJbf5cB+QEB+QG94gIBSADpAOoCEqgv2zxVINs8MQEVAO0CD6DHbPFnbPDGARUA6wIPo2Ns8Wds8MYBFQDsAAKgAAKxAASppQIBIADwAPECASABAwEEAgEgAPIA8wIBIAD8AP0CAUgA9AD1AgEgAPgA+QIPoFNs8Ads8MYBFQD2Ag+hK2zxZ2zwxgEVAPcABrOzswAGAccFAg+lebZ4s7Z4YwEVAPoCD6fdtniztnhjARUA+wAeASFuklt/lwH5AAH5AL3iABABAfkBAfkBugIBSAD+AP8CEKoM2zxZ2zwxARUBAgIPoSNs8Wds8MYBFQEAAg+hf2zxZ2zwxgEVAQEABKkEAEAhwgDyhSDCAfKFXLmSW3CfcJNTIb6WUSGpBAKk6Gwh4gAEqQgCASABBQEGAhGsDW2eLO2eGMABFQEWAgEgAQcBCAIBIAERARICASABCQEKAg+m07Z4s7Z4YwEVARACD6DXbPAHbPDGARUBCwIBSAEMAQ0ABKOzAhGx22eKpBtnhjABFQEOAg+1e2eLO2eGMAEVAQ8ABKmkAAK7AAKwAg+lO7Z4s7Z4YwEVARMCD6eftniztnhjARUBFAAcIW6SW3+XAfkAAfkAveIAPCFuIW5csJNfBHCOEQGzAbOwlwH5AQH5Ab2SW3/i4gAU7UTQ0gAwkW3gbQACqA==",
    );
    const builder = beginCell();
    builder.storeUint(0, 1);
    initMathTester_init_args({ $$type: "MathTester_init_args" })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const MathTester_errors: { [key: number]: { message: string } } = {
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

const MathTester_types: ABIType[] = [
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
    { name: "MathTester$Data", header: null, fields: [] },
];

const MathTester_getters: ABIGetter[] = [
    {
        name: "add",
        methodId: 83863,
        arguments: [
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "sub",
        methodId: 80400,
        arguments: [
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "mul",
        methodId: 99260,
        arguments: [
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "div",
        methodId: 125000,
        arguments: [
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "mod",
        methodId: 126476,
        arguments: [
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "shr",
        methodId: 89358,
        arguments: [
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "shl",
        methodId: 110321,
        arguments: [
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "and",
        methodId: 108636,
        arguments: [
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "or",
        methodId: 83393,
        arguments: [
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "xor",
        methodId: 78952,
        arguments: [
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "bitwise_not",
        methodId: 85436,
        arguments: [
            {
                name: "a",
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
        name: "addAug",
        methodId: 120881,
        arguments: [
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "subAug",
        methodId: 114791,
        arguments: [
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "mulAug",
        methodId: 129050,
        arguments: [
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "divAug",
        methodId: 85125,
        arguments: [
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "modAug",
        methodId: 81709,
        arguments: [
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "bitwiseOrAug",
        methodId: 116497,
        arguments: [
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "bitwiseAndAug",
        methodId: 89159,
        arguments: [
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "bitwiseXorAug",
        methodId: 104526,
        arguments: [
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "compare1",
        methodId: 80704,
        arguments: [
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
                    optional: true,
                    format: 257,
                },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare2",
        methodId: 68387,
        arguments: [
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
                    optional: true,
                    format: 257,
                },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare3",
        methodId: 72450,
        arguments: [
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
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare4",
        methodId: 93157,
        arguments: [
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
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare5",
        methodId: 97220,
        arguments: [
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
                type: {
                    kind: "simple",
                    type: "int",
                    optional: true,
                    format: 257,
                },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare6",
        methodId: 84903,
        arguments: [
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
                type: {
                    kind: "simple",
                    type: "int",
                    optional: true,
                    format: 257,
                },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare7",
        methodId: 88966,
        arguments: [
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
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare8",
        methodId: 109161,
        arguments: [
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
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare9",
        methodId: 113224,
        arguments: [
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
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare10",
        methodId: 127339,
        arguments: [
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
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare11",
        methodId: 123210,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "b",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare12",
        methodId: 119081,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "b",
                type: { kind: "simple", type: "address", optional: true },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare13",
        methodId: 114952,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "address", optional: true },
            },
            {
                name: "b",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare14",
        methodId: 111087,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "address", optional: true },
            },
            {
                name: "b",
                type: { kind: "simple", type: "address", optional: true },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare15",
        methodId: 106958,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "b",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare16",
        methodId: 102829,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "b",
                type: { kind: "simple", type: "address", optional: true },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare17",
        methodId: 98700,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "address", optional: true },
            },
            {
                name: "b",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare18",
        methodId: 94307,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "address", optional: true },
            },
            {
                name: "b",
                type: { kind: "simple", type: "address", optional: true },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare19",
        methodId: 90178,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "cell", optional: false },
            },
            {
                name: "b",
                type: { kind: "simple", type: "cell", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare20",
        methodId: 107576,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "cell", optional: false },
            },
            {
                name: "b",
                type: { kind: "simple", type: "cell", optional: true },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare21",
        methodId: 111641,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "b",
                type: { kind: "simple", type: "cell", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare22",
        methodId: 99450,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "b",
                type: { kind: "simple", type: "cell", optional: true },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare23",
        methodId: 103515,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "cell", optional: false },
            },
            {
                name: "b",
                type: { kind: "simple", type: "cell", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare24",
        methodId: 124092,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "cell", optional: false },
            },
            {
                name: "b",
                type: { kind: "simple", type: "cell", optional: true },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare25",
        methodId: 128157,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "b",
                type: { kind: "simple", type: "cell", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare26",
        methodId: 115966,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "b",
                type: { kind: "simple", type: "cell", optional: true },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare27",
        methodId: 120031,
        arguments: [
            { name: "a", type: { kind: "dict", key: "int", value: "int" } },
            { name: "b", type: { kind: "dict", key: "int", value: "int" } },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare28",
        methodId: 75056,
        arguments: [
            { name: "a", type: { kind: "dict", key: "int", value: "int" } },
            { name: "b", type: { kind: "dict", key: "int", value: "int" } },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare29",
        methodId: 79121,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "slice", optional: false },
            },
            {
                name: "b",
                type: { kind: "simple", type: "slice", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare30",
        methodId: 104201,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "slice", optional: false },
            },
            {
                name: "b",
                type: { kind: "simple", type: "slice", optional: true },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare31",
        methodId: 100136,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "slice", optional: true },
            },
            {
                name: "b",
                type: { kind: "simple", type: "slice", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare32",
        methodId: 112459,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "slice", optional: true },
            },
            {
                name: "b",
                type: { kind: "simple", type: "slice", optional: true },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare33",
        methodId: 108394,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "slice", optional: false },
            },
            {
                name: "b",
                type: { kind: "simple", type: "slice", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare34",
        methodId: 120717,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "slice", optional: false },
            },
            {
                name: "b",
                type: { kind: "simple", type: "slice", optional: true },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare35",
        methodId: 116652,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "slice", optional: true },
            },
            {
                name: "b",
                type: { kind: "simple", type: "slice", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare36",
        methodId: 128975,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "slice", optional: true },
            },
            {
                name: "b",
                type: { kind: "simple", type: "slice", optional: true },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare37",
        methodId: 124910,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "string", optional: false },
            },
            {
                name: "b",
                type: { kind: "simple", type: "string", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare38",
        methodId: 71169,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "string", optional: false },
            },
            {
                name: "b",
                type: { kind: "simple", type: "string", optional: true },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare39",
        methodId: 67104,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "string", optional: true },
            },
            {
                name: "b",
                type: { kind: "simple", type: "string", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare40",
        methodId: 69278,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "string", optional: true },
            },
            {
                name: "b",
                type: { kind: "simple", type: "string", optional: true },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare41",
        methodId: 73407,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "string", optional: false },
            },
            {
                name: "b",
                type: { kind: "simple", type: "string", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare42",
        methodId: 77532,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "string", optional: false },
            },
            {
                name: "b",
                type: { kind: "simple", type: "string", optional: true },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare43",
        methodId: 81661,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "string", optional: true },
            },
            {
                name: "b",
                type: { kind: "simple", type: "string", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "compare44",
        methodId: 85530,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "string", optional: true },
            },
            {
                name: "b",
                type: { kind: "simple", type: "string", optional: true },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "isNull1",
        methodId: 111973,
        arguments: [
            {
                name: "a",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: true,
                    format: 257,
                },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "isNotNull1",
        methodId: 89158,
        arguments: [
            {
                name: "a",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: true,
                    format: 257,
                },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "isNull2",
        methodId: 99590,
        arguments: [
            {
                name: "address",
                type: { kind: "simple", type: "address", optional: true },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "isNotNull2",
        methodId: 93221,
        arguments: [
            {
                name: "address",
                type: { kind: "simple", type: "address", optional: true },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "isNull3",
        methodId: 103719,
        arguments: [
            {
                name: "cell",
                type: { kind: "simple", type: "cell", optional: true },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "isNotNull3",
        methodId: 97284,
        arguments: [
            {
                name: "cell",
                type: { kind: "simple", type: "cell", optional: true },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "log2",
        methodId: 75030,
        arguments: [
            {
                name: "num",
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
        name: "log",
        methodId: 125279,
        arguments: [
            {
                name: "num",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "base",
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
        name: "pow",
        methodId: 118124,
        arguments: [
            {
                name: "base",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "exp",
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
        name: "pow2",
        methodId: 94960,
        arguments: [
            {
                name: "exp",
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
        name: "precedence1",
        methodId: 78380,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "precedence2",
        methodId: 66127,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "precedence3",
        methodId: 70254,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "precedence4",
        methodId: 90761,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "precedence5",
        methodId: 94888,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "precedence6",
        methodId: 82635,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "precedence7",
        methodId: 86762,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "precedence8",
        methodId: 107269,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "precedence9",
        methodId: 111396,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "precedence10",
        methodId: 68674,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "precedence11",
        methodId: 72803,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "precedence12",
        methodId: 76800,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "bitwiseNot1",
        methodId: 118903,
        arguments: [
            {
                name: "x",
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
        name: "bitwiseNot2",
        methodId: 122900,
        arguments: [
            {
                name: "x",
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
        name: "bitwiseNot3",
        methodId: 127029,
        arguments: [
            {
                name: "x",
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
        name: "bitwiseNot4",
        methodId: 98514,
        arguments: [
            {
                name: "x",
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
        name: "augmentedAnd",
        methodId: 127849,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "bool", optional: false },
            },
            {
                name: "b",
                type: { kind: "simple", type: "bool", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "augmentedOr",
        methodId: 121304,
        arguments: [
            {
                name: "a",
                type: { kind: "simple", type: "bool", optional: false },
            },
            {
                name: "b",
                type: { kind: "simple", type: "bool", optional: false },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "augmentedShiftLeft",
        methodId: 104823,
        arguments: [
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "augmentedShiftRight",
        methodId: 110189,
        arguments: [
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "shiftLeft0",
        methodId: 106230,
        arguments: [
            {
                name: "i",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "shiftRight0",
        methodId: 78486,
        arguments: [
            {
                name: "i",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
        ],
        returnType: { kind: "simple", type: "bool", optional: false },
    },
    {
        name: "sign",
        methodId: 115590,
        arguments: [
            {
                name: "x",
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
        name: "divc",
        methodId: 92387,
        arguments: [
            {
                name: "x",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "y",
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
        name: "muldivc",
        methodId: 107929,
        arguments: [
            {
                name: "x",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "y",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "mulShiftRight",
        methodId: 127246,
        arguments: [
            {
                name: "x",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "y",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "mulShiftRightRound",
        methodId: 121903,
        arguments: [
            {
                name: "x",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "y",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "mulShiftRightCeil",
        methodId: 93115,
        arguments: [
            {
                name: "x",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "y",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
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
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "sqrt",
        methodId: 91833,
        arguments: [
            {
                name: "x",
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
];

export const MathTester_getterMapping: { [key: string]: string } = {
    add: "getAdd",
    sub: "getSub",
    mul: "getMul",
    div: "getDiv",
    mod: "getMod",
    shr: "getShr",
    shl: "getShl",
    and: "getAnd",
    or: "getOr",
    xor: "getXor",
    bitwise_not: "getBitwiseNot",
    addAug: "getAddAug",
    subAug: "getSubAug",
    mulAug: "getMulAug",
    divAug: "getDivAug",
    modAug: "getModAug",
    bitwiseOrAug: "getBitwiseOrAug",
    bitwiseAndAug: "getBitwiseAndAug",
    bitwiseXorAug: "getBitwiseXorAug",
    compare1: "getCompare1",
    compare2: "getCompare2",
    compare3: "getCompare3",
    compare4: "getCompare4",
    compare5: "getCompare5",
    compare6: "getCompare6",
    compare7: "getCompare7",
    compare8: "getCompare8",
    compare9: "getCompare9",
    compare10: "getCompare10",
    compare11: "getCompare11",
    compare12: "getCompare12",
    compare13: "getCompare13",
    compare14: "getCompare14",
    compare15: "getCompare15",
    compare16: "getCompare16",
    compare17: "getCompare17",
    compare18: "getCompare18",
    compare19: "getCompare19",
    compare20: "getCompare20",
    compare21: "getCompare21",
    compare22: "getCompare22",
    compare23: "getCompare23",
    compare24: "getCompare24",
    compare25: "getCompare25",
    compare26: "getCompare26",
    compare27: "getCompare27",
    compare28: "getCompare28",
    compare29: "getCompare29",
    compare30: "getCompare30",
    compare31: "getCompare31",
    compare32: "getCompare32",
    compare33: "getCompare33",
    compare34: "getCompare34",
    compare35: "getCompare35",
    compare36: "getCompare36",
    compare37: "getCompare37",
    compare38: "getCompare38",
    compare39: "getCompare39",
    compare40: "getCompare40",
    compare41: "getCompare41",
    compare42: "getCompare42",
    compare43: "getCompare43",
    compare44: "getCompare44",
    isNull1: "getIsNull1",
    isNotNull1: "getIsNotNull1",
    isNull2: "getIsNull2",
    isNotNull2: "getIsNotNull2",
    isNull3: "getIsNull3",
    isNotNull3: "getIsNotNull3",
    log2: "getLog2",
    log: "getLog",
    pow: "getPow",
    pow2: "getPow2",
    precedence1: "getPrecedence1",
    precedence2: "getPrecedence2",
    precedence3: "getPrecedence3",
    precedence4: "getPrecedence4",
    precedence5: "getPrecedence5",
    precedence6: "getPrecedence6",
    precedence7: "getPrecedence7",
    precedence8: "getPrecedence8",
    precedence9: "getPrecedence9",
    precedence10: "getPrecedence10",
    precedence11: "getPrecedence11",
    precedence12: "getPrecedence12",
    bitwiseNot1: "getBitwiseNot1",
    bitwiseNot2: "getBitwiseNot2",
    bitwiseNot3: "getBitwiseNot3",
    bitwiseNot4: "getBitwiseNot4",
    augmentedAnd: "getAugmentedAnd",
    augmentedOr: "getAugmentedOr",
    augmentedShiftLeft: "getAugmentedShiftLeft",
    augmentedShiftRight: "getAugmentedShiftRight",
    shiftLeft0: "getShiftLeft0",
    shiftRight0: "getShiftRight0",
    sign: "getSign",
    divc: "getDivc",
    muldivc: "getMuldivc",
    mulShiftRight: "getMulShiftRight",
    mulShiftRightRound: "getMulShiftRightRound",
    mulShiftRightCeil: "getMulShiftRightCeil",
    sqrt: "getSqrt",
};

const MathTester_receivers: ABIReceiver[] = [
    { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
];

export class MathTester implements Contract {
    static async init() {
        return await MathTester_init();
    }

    static async fromInit() {
        const __gen_init = await MathTester_init();
        const address = contractAddress(0, __gen_init);
        return new MathTester(address, __gen_init);
    }

    static fromAddress(address: Address) {
        return new MathTester(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };
    readonly abi: ContractABI = {
        types: MathTester_types,
        getters: MathTester_getters,
        receivers: MathTester_receivers,
        errors: MathTester_errors,
    };

    private constructor(address: Address, init?: { code: Cell; data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(
        provider: ContractProvider,
        via: Sender,
        args: { value: bigint; bounce?: boolean | null | undefined },
        message: Deploy,
    ) {
        let body: Cell | null = null;
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

    async getAdd(provider: ContractProvider, a: bigint, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(83863 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSub(provider: ContractProvider, a: bigint, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(80400 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getMul(provider: ContractProvider, a: bigint, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(99260 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getDiv(provider: ContractProvider, a: bigint, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(125000 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getMod(provider: ContractProvider, a: bigint, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(126476 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getShr(provider: ContractProvider, a: bigint, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(89358 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getShl(provider: ContractProvider, a: bigint, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(110321 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getAnd(provider: ContractProvider, a: bigint, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(108636 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getOr(provider: ContractProvider, a: bigint, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(83393 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getXor(provider: ContractProvider, a: bigint, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(78952 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getBitwiseNot(provider: ContractProvider, a: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        const source = (await provider.get(85436 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getAddAug(provider: ContractProvider, a: bigint, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(120881 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSubAug(provider: ContractProvider, a: bigint, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(114791 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getMulAug(provider: ContractProvider, a: bigint, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(129050 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getDivAug(provider: ContractProvider, a: bigint, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(85125 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getModAug(provider: ContractProvider, a: bigint, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(81709 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getBitwiseOrAug(provider: ContractProvider, a: bigint, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(116497 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getBitwiseAndAug(provider: ContractProvider, a: bigint, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(89159 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getBitwiseXorAug(provider: ContractProvider, a: bigint, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(104526 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getCompare1(provider: ContractProvider, a: bigint, b: bigint | null) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(80704 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare2(provider: ContractProvider, a: bigint, b: bigint | null) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(68387 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare3(provider: ContractProvider, a: bigint | null, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(72450 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare4(provider: ContractProvider, a: bigint | null, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(93157 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare5(
        provider: ContractProvider,
        a: bigint | null,
        b: bigint | null,
    ) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(97220 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare6(
        provider: ContractProvider,
        a: bigint | null,
        b: bigint | null,
    ) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(84903 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare7(provider: ContractProvider, a: bigint, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(88966 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare8(provider: ContractProvider, a: bigint, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(109161 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare9(provider: ContractProvider, a: bigint, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(113224 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare10(provider: ContractProvider, a: bigint, b: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(127339 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare11(provider: ContractProvider, a: Address, b: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(a);
        builder.writeAddress(b);
        const source = (await provider.get(123210 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare12(
        provider: ContractProvider,
        a: Address,
        b: Address | null,
    ) {
        const builder = new TupleBuilder();
        builder.writeAddress(a);
        builder.writeAddress(b);
        const source = (await provider.get(119081 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare13(
        provider: ContractProvider,
        a: Address | null,
        b: Address,
    ) {
        const builder = new TupleBuilder();
        builder.writeAddress(a);
        builder.writeAddress(b);
        const source = (await provider.get(114952 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare14(
        provider: ContractProvider,
        a: Address | null,
        b: Address | null,
    ) {
        const builder = new TupleBuilder();
        builder.writeAddress(a);
        builder.writeAddress(b);
        const source = (await provider.get(111087 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare15(provider: ContractProvider, a: Address, b: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(a);
        builder.writeAddress(b);
        const source = (await provider.get(106958 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare16(
        provider: ContractProvider,
        a: Address,
        b: Address | null,
    ) {
        const builder = new TupleBuilder();
        builder.writeAddress(a);
        builder.writeAddress(b);
        const source = (await provider.get(102829 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare17(
        provider: ContractProvider,
        a: Address | null,
        b: Address,
    ) {
        const builder = new TupleBuilder();
        builder.writeAddress(a);
        builder.writeAddress(b);
        const source = (await provider.get(98700 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare18(
        provider: ContractProvider,
        a: Address | null,
        b: Address | null,
    ) {
        const builder = new TupleBuilder();
        builder.writeAddress(a);
        builder.writeAddress(b);
        const source = (await provider.get(94307 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare19(provider: ContractProvider, a: Cell, b: Cell) {
        const builder = new TupleBuilder();
        builder.writeCell(a);
        builder.writeCell(b);
        const source = (await provider.get(90178 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare20(provider: ContractProvider, a: Cell, b: Cell | null) {
        const builder = new TupleBuilder();
        builder.writeCell(a);
        builder.writeCell(b);
        const source = (await provider.get(107576 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare21(provider: ContractProvider, a: Cell | null, b: Cell) {
        const builder = new TupleBuilder();
        builder.writeCell(a);
        builder.writeCell(b);
        const source = (await provider.get(111641 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare22(
        provider: ContractProvider,
        a: Cell | null,
        b: Cell | null,
    ) {
        const builder = new TupleBuilder();
        builder.writeCell(a);
        builder.writeCell(b);
        const source = (await provider.get(99450 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare23(provider: ContractProvider, a: Cell, b: Cell) {
        const builder = new TupleBuilder();
        builder.writeCell(a);
        builder.writeCell(b);
        const source = (await provider.get(103515 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare24(provider: ContractProvider, a: Cell, b: Cell | null) {
        const builder = new TupleBuilder();
        builder.writeCell(a);
        builder.writeCell(b);
        const source = (await provider.get(124092 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare25(provider: ContractProvider, a: Cell | null, b: Cell) {
        const builder = new TupleBuilder();
        builder.writeCell(a);
        builder.writeCell(b);
        const source = (await provider.get(128157 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare26(
        provider: ContractProvider,
        a: Cell | null,
        b: Cell | null,
    ) {
        const builder = new TupleBuilder();
        builder.writeCell(a);
        builder.writeCell(b);
        const source = (await provider.get(115966 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare27(
        provider: ContractProvider,
        a: Dictionary<bigint, bigint>,
        b: Dictionary<bigint, bigint>,
    ) {
        const builder = new TupleBuilder();
        builder.writeCell(
            a.size > 0
                ? beginCell()
                      .storeDictDirect(
                          a,
                          Dictionary.Keys.BigInt(257),
                          Dictionary.Values.BigInt(257),
                      )
                      .endCell()
                : null,
        );
        builder.writeCell(
            b.size > 0
                ? beginCell()
                      .storeDictDirect(
                          b,
                          Dictionary.Keys.BigInt(257),
                          Dictionary.Values.BigInt(257),
                      )
                      .endCell()
                : null,
        );
        const source = (await provider.get(120031 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare28(
        provider: ContractProvider,
        a: Dictionary<bigint, bigint>,
        b: Dictionary<bigint, bigint>,
    ) {
        const builder = new TupleBuilder();
        builder.writeCell(
            a.size > 0
                ? beginCell()
                      .storeDictDirect(
                          a,
                          Dictionary.Keys.BigInt(257),
                          Dictionary.Values.BigInt(257),
                      )
                      .endCell()
                : null,
        );
        builder.writeCell(
            b.size > 0
                ? beginCell()
                      .storeDictDirect(
                          b,
                          Dictionary.Keys.BigInt(257),
                          Dictionary.Values.BigInt(257),
                      )
                      .endCell()
                : null,
        );
        const source = (await provider.get(75056 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare29(provider: ContractProvider, a: Slice, b: Slice) {
        const builder = new TupleBuilder();
        builder.writeSlice(a.asCell());
        builder.writeSlice(b.asCell());
        const source = (await provider.get(79121 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare30(provider: ContractProvider, a: Slice, b: Slice | null) {
        const builder = new TupleBuilder();
        builder.writeSlice(a.asCell());
        builder.writeSlice(b?.asCell());
        const source = (await provider.get(104201 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare31(provider: ContractProvider, a: Slice | null, b: Slice) {
        const builder = new TupleBuilder();
        builder.writeSlice(a?.asCell());
        builder.writeSlice(b.asCell());
        const source = (await provider.get(100136 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare32(
        provider: ContractProvider,
        a: Slice | null,
        b: Slice | null,
    ) {
        const builder = new TupleBuilder();
        builder.writeSlice(a?.asCell());
        builder.writeSlice(b?.asCell());
        const source = (await provider.get(112459 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare33(provider: ContractProvider, a: Slice, b: Slice) {
        const builder = new TupleBuilder();
        builder.writeSlice(a.asCell());
        builder.writeSlice(b.asCell());
        const source = (await provider.get(108394 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare34(provider: ContractProvider, a: Slice, b: Slice | null) {
        const builder = new TupleBuilder();
        builder.writeSlice(a.asCell());
        builder.writeSlice(b?.asCell());
        const source = (await provider.get(120717 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare35(provider: ContractProvider, a: Slice | null, b: Slice) {
        const builder = new TupleBuilder();
        builder.writeSlice(a?.asCell());
        builder.writeSlice(b.asCell());
        const source = (await provider.get(116652 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare36(
        provider: ContractProvider,
        a: Slice | null,
        b: Slice | null,
    ) {
        const builder = new TupleBuilder();
        builder.writeSlice(a?.asCell());
        builder.writeSlice(b?.asCell());
        const source = (await provider.get(128975 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare37(provider: ContractProvider, a: string, b: string) {
        const builder = new TupleBuilder();
        builder.writeString(a);
        builder.writeString(b);
        const source = (await provider.get(124910 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare38(
        provider: ContractProvider,
        a: string,
        b: string | null,
    ) {
        const builder = new TupleBuilder();
        builder.writeString(a);
        builder.writeString(b);
        const source = (await provider.get(71169 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare39(
        provider: ContractProvider,
        a: string | null,
        b: string,
    ) {
        const builder = new TupleBuilder();
        builder.writeString(a);
        builder.writeString(b);
        const source = (await provider.get(67104 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare40(
        provider: ContractProvider,
        a: string | null,
        b: string | null,
    ) {
        const builder = new TupleBuilder();
        builder.writeString(a);
        builder.writeString(b);
        const source = (await provider.get(69278 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare41(provider: ContractProvider, a: string, b: string) {
        const builder = new TupleBuilder();
        builder.writeString(a);
        builder.writeString(b);
        const source = (await provider.get(73407 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare42(
        provider: ContractProvider,
        a: string,
        b: string | null,
    ) {
        const builder = new TupleBuilder();
        builder.writeString(a);
        builder.writeString(b);
        const source = (await provider.get(77532 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare43(
        provider: ContractProvider,
        a: string | null,
        b: string,
    ) {
        const builder = new TupleBuilder();
        builder.writeString(a);
        builder.writeString(b);
        const source = (await provider.get(81661 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getCompare44(
        provider: ContractProvider,
        a: string | null,
        b: string | null,
    ) {
        const builder = new TupleBuilder();
        builder.writeString(a);
        builder.writeString(b);
        const source = (await provider.get(85530 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getIsNull1(provider: ContractProvider, a: bigint | null) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        const source = (await provider.get(111973 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getIsNotNull1(provider: ContractProvider, a: bigint | null) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        const source = (await provider.get(89158 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getIsNull2(provider: ContractProvider, address: Address | null) {
        const builder = new TupleBuilder();
        builder.writeAddress(address);
        const source = (await provider.get(99590 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getIsNotNull2(provider: ContractProvider, address: Address | null) {
        const builder = new TupleBuilder();
        builder.writeAddress(address);
        const source = (await provider.get(93221 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getIsNull3(provider: ContractProvider, cell: Cell | null) {
        const builder = new TupleBuilder();
        builder.writeCell(cell);
        const source = (await provider.get(103719 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getIsNotNull3(provider: ContractProvider, cell: Cell | null) {
        const builder = new TupleBuilder();
        builder.writeCell(cell);
        const source = (await provider.get(97284 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getLog2(provider: ContractProvider, num: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(num);
        const source = (await provider.get(75030 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getLog(provider: ContractProvider, num: bigint, base: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(num);
        builder.writeNumber(base);
        const source = (await provider.get(125279 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getPow(provider: ContractProvider, base: bigint, exp: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(base);
        builder.writeNumber(exp);
        const source = (await provider.get(118124 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getPow2(provider: ContractProvider, exp: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(exp);
        const source = (await provider.get(94960 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getPrecedence1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(78380 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getPrecedence2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(66127 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getPrecedence3(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(70254 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getPrecedence4(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(90761 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getPrecedence5(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(94888 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getPrecedence6(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(82635 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getPrecedence7(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(86762 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getPrecedence8(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(107269 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getPrecedence9(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(111396 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getPrecedence10(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(68674 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getPrecedence11(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(72803 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getPrecedence12(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(76800 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getBitwiseNot1(provider: ContractProvider, x: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(x);
        const source = (await provider.get(118903 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getBitwiseNot2(provider: ContractProvider, x: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(x);
        const source = (await provider.get(122900 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getBitwiseNot3(provider: ContractProvider, x: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(x);
        const source = (await provider.get(127029 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getBitwiseNot4(provider: ContractProvider, x: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(x);
        const source = (await provider.get(98514 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getAugmentedAnd(provider: ContractProvider, a: boolean, b: boolean) {
        const builder = new TupleBuilder();
        builder.writeBoolean(a);
        builder.writeBoolean(b);
        const source = (await provider.get(127849 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getAugmentedOr(provider: ContractProvider, a: boolean, b: boolean) {
        const builder = new TupleBuilder();
        builder.writeBoolean(a);
        builder.writeBoolean(b);
        const source = (await provider.get(121304 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getAugmentedShiftLeft(
        provider: ContractProvider,
        a: bigint,
        b: bigint,
    ) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(104823 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getAugmentedShiftRight(
        provider: ContractProvider,
        a: bigint,
        b: bigint,
    ) {
        const builder = new TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(110189 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getShiftLeft0(provider: ContractProvider, i: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(i);
        const source = (await provider.get(106230 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getShiftRight0(provider: ContractProvider, i: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(i);
        const source = (await provider.get(78486 as any, builder.build()))
            .stack;
        const result = source.readBoolean();
        return result;
    }

    async getSign(provider: ContractProvider, x: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(x);
        const source = (await provider.get(115590 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getDivc(provider: ContractProvider, x: bigint, y: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(x);
        builder.writeNumber(y);
        const source = (await provider.get(92387 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getMuldivc(
        provider: ContractProvider,
        x: bigint,
        y: bigint,
        z: bigint,
    ) {
        const builder = new TupleBuilder();
        builder.writeNumber(x);
        builder.writeNumber(y);
        builder.writeNumber(z);
        const source = (await provider.get(107929 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getMulShiftRight(
        provider: ContractProvider,
        x: bigint,
        y: bigint,
        z: bigint,
    ) {
        const builder = new TupleBuilder();
        builder.writeNumber(x);
        builder.writeNumber(y);
        builder.writeNumber(z);
        const source = (await provider.get(127246 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getMulShiftRightRound(
        provider: ContractProvider,
        x: bigint,
        y: bigint,
        z: bigint,
    ) {
        const builder = new TupleBuilder();
        builder.writeNumber(x);
        builder.writeNumber(y);
        builder.writeNumber(z);
        const source = (await provider.get(121903 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getMulShiftRightCeil(
        provider: ContractProvider,
        x: bigint,
        y: bigint,
        z: bigint,
    ) {
        const builder = new TupleBuilder();
        builder.writeNumber(x);
        builder.writeNumber(y);
        builder.writeNumber(z);
        const source = (await provider.get(93115 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSqrt(provider: ContractProvider, x: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(x);
        const source = (await provider.get(91833 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }
}
