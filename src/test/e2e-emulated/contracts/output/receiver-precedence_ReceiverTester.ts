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

export type Message = {
    $$type: "Message";
    msg: string;
};

export function storeMessage(src: Message) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2523316742, 32);
        b_0.storeStringRefTail(src.msg);
    };
}

export function loadMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2523316742) {
        throw Error("Invalid prefix");
    }
    const _msg = sc_0.loadStringRefTail();
    return { $$type: "Message" as const, msg: _msg };
}

function loadTupleMessage(source: TupleReader) {
    const _msg = source.readString();
    return { $$type: "Message" as const, msg: _msg };
}

function loadGetterTupleMessage(source: TupleReader) {
    const _msg = source.readString();
    return { $$type: "Message" as const, msg: _msg };
}

function storeTupleMessage(source: Message) {
    const builder = new TupleBuilder();
    builder.writeString(source.msg);
    return builder.build();
}

function dictValueParserMessage(): DictionaryValue<Message> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMessage(src)).endCell());
        },
        parse: (src) => {
            return loadMessage(src.loadRef().beginParse());
        },
    };
}

export type BinaryIntOperation = {
    $$type: "BinaryIntOperation";
    op: string;
    val1: bigint;
    val2: bigint;
};

export function storeBinaryIntOperation(src: BinaryIntOperation) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(829886522, 32);
        b_0.storeStringRefTail(src.op);
        b_0.storeInt(src.val1, 257);
        b_0.storeInt(src.val2, 257);
    };
}

export function loadBinaryIntOperation(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 829886522) {
        throw Error("Invalid prefix");
    }
    const _op = sc_0.loadStringRefTail();
    const _val1 = sc_0.loadIntBig(257);
    const _val2 = sc_0.loadIntBig(257);
    return {
        $$type: "BinaryIntOperation" as const,
        op: _op,
        val1: _val1,
        val2: _val2,
    };
}

function loadTupleBinaryIntOperation(source: TupleReader) {
    const _op = source.readString();
    const _val1 = source.readBigNumber();
    const _val2 = source.readBigNumber();
    return {
        $$type: "BinaryIntOperation" as const,
        op: _op,
        val1: _val1,
        val2: _val2,
    };
}

function loadGetterTupleBinaryIntOperation(source: TupleReader) {
    const _op = source.readString();
    const _val1 = source.readBigNumber();
    const _val2 = source.readBigNumber();
    return {
        $$type: "BinaryIntOperation" as const,
        op: _op,
        val1: _val1,
        val2: _val2,
    };
}

function storeTupleBinaryIntOperation(source: BinaryIntOperation) {
    const builder = new TupleBuilder();
    builder.writeString(source.op);
    builder.writeNumber(source.val1);
    builder.writeNumber(source.val2);
    return builder.build();
}

function dictValueParserBinaryIntOperation(): DictionaryValue<BinaryIntOperation> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeBinaryIntOperation(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadBinaryIntOperation(src.loadRef().beginParse());
        },
    };
}

export type BinaryIntResult = {
    $$type: "BinaryIntResult";
    val: bigint;
};

export function storeBinaryIntResult(src: BinaryIntResult) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4234356752, 32);
        b_0.storeInt(src.val, 257);
    };
}

export function loadBinaryIntResult(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4234356752) {
        throw Error("Invalid prefix");
    }
    const _val = sc_0.loadIntBig(257);
    return { $$type: "BinaryIntResult" as const, val: _val };
}

function loadTupleBinaryIntResult(source: TupleReader) {
    const _val = source.readBigNumber();
    return { $$type: "BinaryIntResult" as const, val: _val };
}

function loadGetterTupleBinaryIntResult(source: TupleReader) {
    const _val = source.readBigNumber();
    return { $$type: "BinaryIntResult" as const, val: _val };
}

function storeTupleBinaryIntResult(source: BinaryIntResult) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.val);
    return builder.build();
}

function dictValueParserBinaryIntResult(): DictionaryValue<BinaryIntResult> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeBinaryIntResult(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadBinaryIntResult(src.loadRef().beginParse());
        },
    };
}

export type Calculator$Data = {
    $$type: "Calculator$Data";
};

export function storeCalculator$Data(src: Calculator$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

export function loadCalculator$Data(slice: Slice) {
    const sc_0 = slice;
    return { $$type: "Calculator$Data" as const };
}

function loadTupleCalculator$Data(source: TupleReader) {
    return { $$type: "Calculator$Data" as const };
}

function loadGetterTupleCalculator$Data(source: TupleReader) {
    return { $$type: "Calculator$Data" as const };
}

function storeTupleCalculator$Data(source: Calculator$Data) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserCalculator$Data(): DictionaryValue<Calculator$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeCalculator$Data(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadCalculator$Data(src.loadRef().beginParse());
        },
    };
}

export type ReceiverTester$Data = {
    $$type: "ReceiverTester$Data";
    receiverKind: string;
};

export function storeReceiverTester$Data(src: ReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiverKind);
    };
}

export function loadReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiverKind = sc_0.loadStringRefTail();
    return {
        $$type: "ReceiverTester$Data" as const,
        receiverKind: _receiverKind,
    };
}

function loadTupleReceiverTester$Data(source: TupleReader) {
    const _receiverKind = source.readString();
    return {
        $$type: "ReceiverTester$Data" as const,
        receiverKind: _receiverKind,
    };
}

function loadGetterTupleReceiverTester$Data(source: TupleReader) {
    const _receiverKind = source.readString();
    return {
        $$type: "ReceiverTester$Data" as const,
        receiverKind: _receiverKind,
    };
}

function storeTupleReceiverTester$Data(source: ReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiverKind);
    return builder.build();
}

function dictValueParserReceiverTester$Data(): DictionaryValue<ReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeReceiverTester$Data(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadReceiverTester$Data(src.loadRef().beginParse());
        },
    };
}

type ReceiverTester_init_args = {
    $$type: "ReceiverTester_init_args";
};

function initReceiverTester_init_args(src: ReceiverTester_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function ReceiverTester_init() {
    const __code = Cell.fromBase64(
        "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",
    );
    const builder = beginCell();
    builder.storeUint(0, 1);
    initReceiverTester_init_args({ $$type: "ReceiverTester_init_args" })(
        builder,
    );
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const ReceiverTester_errors: { [key: number]: { message: string } } = {
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
    48163: { message: `Only divisions are currently supported.` },
};

const ReceiverTester_types: ABIType[] = [
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
        name: "Message",
        header: 2523316742,
        fields: [
            {
                name: "msg",
                type: { kind: "simple", type: "string", optional: false },
            },
        ],
    },
    {
        name: "BinaryIntOperation",
        header: 829886522,
        fields: [
            {
                name: "op",
                type: { kind: "simple", type: "string", optional: false },
            },
            {
                name: "val1",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "val2",
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
        name: "BinaryIntResult",
        header: 4234356752,
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
        ],
    },
    { name: "Calculator$Data", header: null, fields: [] },
    {
        name: "ReceiverTester$Data",
        header: null,
        fields: [
            {
                name: "receiverKind",
                type: { kind: "simple", type: "string", optional: false },
            },
        ],
    },
];

const ReceiverTester_getters: ABIGetter[] = [
    {
        name: "receiverKind",
        methodId: 87389,
        arguments: [],
        returnType: { kind: "simple", type: "string", optional: false },
    },
];

export const ReceiverTester_getterMapping: { [key: string]: string } = {
    receiverKind: "getReceiverKind",
};

const ReceiverTester_receivers: ABIReceiver[] = [
    { receiver: "internal", message: { kind: "empty" } },
    { receiver: "internal", message: { kind: "text" } },
    { receiver: "internal", message: { kind: "typed", type: "Message" } },
    { receiver: "internal", message: { kind: "any" } },
    { receiver: "internal", message: { kind: "text", text: "message" } },
    {
        receiver: "internal",
        message: { kind: "text", text: "do_unsupported_op" },
    },
    { receiver: "internal", message: { kind: "text", text: "do_div_by_zero" } },
    { receiver: "internal", message: { kind: "text", text: "do_success_div" } },
    {
        receiver: "internal",
        message: { kind: "text", text: "do_unknown_request" },
    },
    { receiver: "external", message: { kind: "text" } },
    { receiver: "external", message: { kind: "empty" } },
    { receiver: "external", message: { kind: "text", text: "message" } },
    { receiver: "external", message: { kind: "typed", type: "Message" } },
];

export class ReceiverTester implements Contract {
    static async init() {
        return await ReceiverTester_init();
    }

    static async fromInit() {
        const __gen_init = await ReceiverTester_init();
        const address = contractAddress(0, __gen_init);
        return new ReceiverTester(address, __gen_init);
    }

    static fromAddress(address: Address) {
        return new ReceiverTester(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };
    readonly abi: ContractABI = {
        types: ReceiverTester_types,
        getters: ReceiverTester_getters,
        receivers: ReceiverTester_receivers,
        errors: ReceiverTester_errors,
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
            | null
            | string
            | Message
            | Slice
            | "message"
            | "do_unsupported_op"
            | "do_div_by_zero"
            | "do_success_div"
            | "do_unknown_request",
    ) {
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (typeof message === "string") {
            body = beginCell()
                .storeUint(0, 32)
                .storeStringTail(message)
                .endCell();
        }
        if (
            message &&
            typeof message === "object" &&
            !(message instanceof Slice) &&
            message.$$type === "Message"
        ) {
            body = beginCell().store(storeMessage(message)).endCell();
        }
        if (
            message &&
            typeof message === "object" &&
            message instanceof Slice
        ) {
            body = message.asCell();
        }
        if (message === "message") {
            body = beginCell()
                .storeUint(0, 32)
                .storeStringTail(message)
                .endCell();
        }
        if (message === "do_unsupported_op") {
            body = beginCell()
                .storeUint(0, 32)
                .storeStringTail(message)
                .endCell();
        }
        if (message === "do_div_by_zero") {
            body = beginCell()
                .storeUint(0, 32)
                .storeStringTail(message)
                .endCell();
        }
        if (message === "do_success_div") {
            body = beginCell()
                .storeUint(0, 32)
                .storeStringTail(message)
                .endCell();
        }
        if (message === "do_unknown_request") {
            body = beginCell()
                .storeUint(0, 32)
                .storeStringTail(message)
                .endCell();
        }
        if (body === null) {
            throw new Error("Invalid message type");
        }

        await provider.internal(via, { ...args, body: body });
    }

    async sendExternal(
        provider: ContractProvider,
        message: string | null | "message" | Message,
    ) {
        let body: Cell | null = null;
        if (typeof message === "string") {
            body = beginCell()
                .storeUint(0, 32)
                .storeStringTail(message)
                .endCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (message === "message") {
            body = beginCell()
                .storeUint(0, 32)
                .storeStringTail(message)
                .endCell();
        }
        if (
            message &&
            typeof message === "object" &&
            !(message instanceof Slice) &&
            message.$$type === "Message"
        ) {
            body = beginCell().store(storeMessage(message)).endCell();
        }
        if (body === null) {
            throw new Error("Invalid message type");
        }

        await provider.external(body);
    }

    async getReceiverKind(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(87389 as any, builder.build()))
            .stack;
        const result = source.readString();
        return result;
    }
}
