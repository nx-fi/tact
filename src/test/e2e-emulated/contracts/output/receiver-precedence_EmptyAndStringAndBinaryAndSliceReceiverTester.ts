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
    address, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type DataSize = {
    $$type: 'DataSize';
    cells: bigint;
    bits: bigint;
    refs: bigint;
}

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
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
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
        }
    }
}

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

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
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
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
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

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
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
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
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
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
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
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
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type MessageParameters = {
    $$type: 'MessageParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeMessageParameters(src: MessageParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadMessageParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function loadTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function loadGetterTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function storeTupleMessageParameters(source: MessageParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
        }
    }
}

export type DeployParameters = {
    $$type: 'DeployParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
}

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
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
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
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
            builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

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
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
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
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

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
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
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
        }
    }
}

export type BasechainAddress = {
    $$type: 'BasechainAddress';
    hash: bigint | null;
}

export function storeBasechainAddress(src: BasechainAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) { b_0.storeBit(true).storeInt(src.hash, 257); } else { b_0.storeBit(false); }
    };
}

export function loadBasechainAddress(slice: Slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function loadTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function loadGetterTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function storeTupleBasechainAddress(source: BasechainAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}

function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    }
}

export type Message = {
    $$type: 'Message';
    msg: string;
}

export function storeMessage(src: Message) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(100, 32);
        b_0.storeStringRefTail(src.msg);
    };
}

export function loadMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 100) { throw Error('Invalid prefix'); }
    const _msg = sc_0.loadStringRefTail();
    return { $$type: 'Message' as const, msg: _msg };
}

function loadTupleMessage(source: TupleReader) {
    const _msg = source.readString();
    return { $$type: 'Message' as const, msg: _msg };
}

function loadGetterTupleMessage(source: TupleReader) {
    const _msg = source.readString();
    return { $$type: 'Message' as const, msg: _msg };
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
        }
    }
}

export type Empty = {
    $$type: 'Empty';
}

export function storeEmpty(src: Empty) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(101, 32);
    };
}

export function loadEmpty(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 101) { throw Error('Invalid prefix'); }
    return { $$type: 'Empty' as const };
}

function loadTupleEmpty(source: TupleReader) {
    return { $$type: 'Empty' as const };
}

function loadGetterTupleEmpty(source: TupleReader) {
    return { $$type: 'Empty' as const };
}

function storeTupleEmpty(source: Empty) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserEmpty(): DictionaryValue<Empty> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEmpty(src)).endCell());
        },
        parse: (src) => {
            return loadEmpty(src.loadRef().beginParse());
        }
    }
}

export type BinaryIntOperation = {
    $$type: 'BinaryIntOperation';
    op: string;
    val1: bigint;
    val2: bigint;
}

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
    if (sc_0.loadUint(32) !== 829886522) { throw Error('Invalid prefix'); }
    const _op = sc_0.loadStringRefTail();
    const _val1 = sc_0.loadIntBig(257);
    const _val2 = sc_0.loadIntBig(257);
    return { $$type: 'BinaryIntOperation' as const, op: _op, val1: _val1, val2: _val2 };
}

function loadTupleBinaryIntOperation(source: TupleReader) {
    const _op = source.readString();
    const _val1 = source.readBigNumber();
    const _val2 = source.readBigNumber();
    return { $$type: 'BinaryIntOperation' as const, op: _op, val1: _val1, val2: _val2 };
}

function loadGetterTupleBinaryIntOperation(source: TupleReader) {
    const _op = source.readString();
    const _val1 = source.readBigNumber();
    const _val2 = source.readBigNumber();
    return { $$type: 'BinaryIntOperation' as const, op: _op, val1: _val1, val2: _val2 };
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
            builder.storeRef(beginCell().store(storeBinaryIntOperation(src)).endCell());
        },
        parse: (src) => {
            return loadBinaryIntOperation(src.loadRef().beginParse());
        }
    }
}

export type BinaryIntResult = {
    $$type: 'BinaryIntResult';
    val: bigint;
}

export function storeBinaryIntResult(src: BinaryIntResult) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4234356752, 32);
        b_0.storeInt(src.val, 257);
    };
}

export function loadBinaryIntResult(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4234356752) { throw Error('Invalid prefix'); }
    const _val = sc_0.loadIntBig(257);
    return { $$type: 'BinaryIntResult' as const, val: _val };
}

function loadTupleBinaryIntResult(source: TupleReader) {
    const _val = source.readBigNumber();
    return { $$type: 'BinaryIntResult' as const, val: _val };
}

function loadGetterTupleBinaryIntResult(source: TupleReader) {
    const _val = source.readBigNumber();
    return { $$type: 'BinaryIntResult' as const, val: _val };
}

function storeTupleBinaryIntResult(source: BinaryIntResult) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.val);
    return builder.build();
}

function dictValueParserBinaryIntResult(): DictionaryValue<BinaryIntResult> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBinaryIntResult(src)).endCell());
        },
        parse: (src) => {
            return loadBinaryIntResult(src.loadRef().beginParse());
        }
    }
}

export type SendCellToAddress = {
    $$type: 'SendCellToAddress';
    address: Address;
    body: Cell;
}

export function storeSendCellToAddress(src: SendCellToAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2141069065, 32);
        b_0.storeAddress(src.address);
        b_0.storeRef(src.body);
    };
}

export function loadSendCellToAddress(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2141069065) { throw Error('Invalid prefix'); }
    const _address = sc_0.loadAddress();
    const _body = sc_0.loadRef();
    return { $$type: 'SendCellToAddress' as const, address: _address, body: _body };
}

function loadTupleSendCellToAddress(source: TupleReader) {
    const _address = source.readAddress();
    const _body = source.readCell();
    return { $$type: 'SendCellToAddress' as const, address: _address, body: _body };
}

function loadGetterTupleSendCellToAddress(source: TupleReader) {
    const _address = source.readAddress();
    const _body = source.readCell();
    return { $$type: 'SendCellToAddress' as const, address: _address, body: _body };
}

function storeTupleSendCellToAddress(source: SendCellToAddress) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeCell(source.body);
    return builder.build();
}

function dictValueParserSendCellToAddress(): DictionaryValue<SendCellToAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendCellToAddress(src)).endCell());
        },
        parse: (src) => {
            return loadSendCellToAddress(src.loadRef().beginParse());
        }
    }
}

export type Calculator$Data = {
    $$type: 'Calculator$Data';
}

export function storeCalculator$Data(src: Calculator$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

export function loadCalculator$Data(slice: Slice) {
    const sc_0 = slice;
    return { $$type: 'Calculator$Data' as const };
}

function loadTupleCalculator$Data(source: TupleReader) {
    return { $$type: 'Calculator$Data' as const };
}

function loadGetterTupleCalculator$Data(source: TupleReader) {
    return { $$type: 'Calculator$Data' as const };
}

function storeTupleCalculator$Data(source: Calculator$Data) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserCalculator$Data(): DictionaryValue<Calculator$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCalculator$Data(src)).endCell());
        },
        parse: (src) => {
            return loadCalculator$Data(src.loadRef().beginParse());
        }
    }
}

export type ReceiverTester$Data = {
    $$type: 'ReceiverTester$Data';
    receiverKind: string;
}

export function storeReceiverTester$Data(src: ReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiverKind);
    };
}

export function loadReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiverKind = sc_0.loadStringRefTail();
    return { $$type: 'ReceiverTester$Data' as const, receiverKind: _receiverKind };
}

function loadTupleReceiverTester$Data(source: TupleReader) {
    const _receiverKind = source.readString();
    return { $$type: 'ReceiverTester$Data' as const, receiverKind: _receiverKind };
}

function loadGetterTupleReceiverTester$Data(source: TupleReader) {
    const _receiverKind = source.readString();
    return { $$type: 'ReceiverTester$Data' as const, receiverKind: _receiverKind };
}

function storeTupleReceiverTester$Data(source: ReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiverKind);
    return builder.build();
}

function dictValueParserReceiverTester$Data(): DictionaryValue<ReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type NoReceiverTester$Data = {
    $$type: 'NoReceiverTester$Data';
    receiver: string;
}

export function storeNoReceiverTester$Data(src: NoReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadNoReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'NoReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleNoReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'NoReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleNoReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'NoReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleNoReceiverTester$Data(source: NoReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserNoReceiverTester$Data(): DictionaryValue<NoReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNoReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadNoReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type EmptyReceiverTester$Data = {
    $$type: 'EmptyReceiverTester$Data';
    receiver: string;
}

export function storeEmptyReceiverTester$Data(src: EmptyReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadEmptyReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleEmptyReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleEmptyReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleEmptyReceiverTester$Data(source: EmptyReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserEmptyReceiverTester$Data(): DictionaryValue<EmptyReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEmptyReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type CommentReceiverTester$Data = {
    $$type: 'CommentReceiverTester$Data';
    receiver: string;
}

export function storeCommentReceiverTester$Data(src: CommentReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadCommentReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'CommentReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleCommentReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'CommentReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleCommentReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'CommentReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleCommentReceiverTester$Data(source: CommentReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserCommentReceiverTester$Data(): DictionaryValue<CommentReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCommentReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadCommentReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type StringReceiverTester$Data = {
    $$type: 'StringReceiverTester$Data';
    receiver: string;
}

export function storeStringReceiverTester$Data(src: StringReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadStringReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'StringReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleStringReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'StringReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleStringReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'StringReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleStringReceiverTester$Data(source: StringReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserStringReceiverTester$Data(): DictionaryValue<StringReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStringReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadStringReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type BinaryReceiverTester$Data = {
    $$type: 'BinaryReceiverTester$Data';
    receiver: string;
}

export function storeBinaryReceiverTester$Data(src: BinaryReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadBinaryReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'BinaryReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleBinaryReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'BinaryReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleBinaryReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'BinaryReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleBinaryReceiverTester$Data(source: BinaryReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserBinaryReceiverTester$Data(): DictionaryValue<BinaryReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBinaryReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadBinaryReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type SliceReceiverTester$Data = {
    $$type: 'SliceReceiverTester$Data';
    receiver: string;
}

export function storeSliceReceiverTester$Data(src: SliceReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadSliceReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'SliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'SliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'SliceReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleSliceReceiverTester$Data(source: SliceReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserSliceReceiverTester$Data(): DictionaryValue<SliceReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type EmptyAndCommentReceiverTester$Data = {
    $$type: 'EmptyAndCommentReceiverTester$Data';
    receiver: string;
}

export function storeEmptyAndCommentReceiverTester$Data(src: EmptyAndCommentReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadEmptyAndCommentReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndCommentReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleEmptyAndCommentReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleEmptyAndCommentReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleEmptyAndCommentReceiverTester$Data(source: EmptyAndCommentReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserEmptyAndCommentReceiverTester$Data(): DictionaryValue<EmptyAndCommentReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEmptyAndCommentReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndCommentReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type EmptyAndStringReceiverTester$Data = {
    $$type: 'EmptyAndStringReceiverTester$Data';
    receiver: string;
}

export function storeEmptyAndStringReceiverTester$Data(src: EmptyAndStringReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadEmptyAndStringReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndStringReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleEmptyAndStringReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndStringReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleEmptyAndStringReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndStringReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleEmptyAndStringReceiverTester$Data(source: EmptyAndStringReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserEmptyAndStringReceiverTester$Data(): DictionaryValue<EmptyAndStringReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEmptyAndStringReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndStringReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type EmptyAndBinaryReceiverTester$Data = {
    $$type: 'EmptyAndBinaryReceiverTester$Data';
    receiver: string;
}

export function storeEmptyAndBinaryReceiverTester$Data(src: EmptyAndBinaryReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadEmptyAndBinaryReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndBinaryReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleEmptyAndBinaryReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndBinaryReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleEmptyAndBinaryReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndBinaryReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleEmptyAndBinaryReceiverTester$Data(source: EmptyAndBinaryReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserEmptyAndBinaryReceiverTester$Data(): DictionaryValue<EmptyAndBinaryReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEmptyAndBinaryReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndBinaryReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type EmptyAndSliceReceiverTester$Data = {
    $$type: 'EmptyAndSliceReceiverTester$Data';
    receiver: string;
}

export function storeEmptyAndSliceReceiverTester$Data(src: EmptyAndSliceReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadEmptyAndSliceReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleEmptyAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleEmptyAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleEmptyAndSliceReceiverTester$Data(source: EmptyAndSliceReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserEmptyAndSliceReceiverTester$Data(): DictionaryValue<EmptyAndSliceReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEmptyAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type CommentAndStringReceiverTester$Data = {
    $$type: 'CommentAndStringReceiverTester$Data';
    receiver: string;
}

export function storeCommentAndStringReceiverTester$Data(src: CommentAndStringReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadCommentAndStringReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'CommentAndStringReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleCommentAndStringReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndStringReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleCommentAndStringReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndStringReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleCommentAndStringReceiverTester$Data(source: CommentAndStringReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserCommentAndStringReceiverTester$Data(): DictionaryValue<CommentAndStringReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCommentAndStringReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadCommentAndStringReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type CommentAndBinaryReceiverTester$Data = {
    $$type: 'CommentAndBinaryReceiverTester$Data';
    receiver: string;
}

export function storeCommentAndBinaryReceiverTester$Data(src: CommentAndBinaryReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadCommentAndBinaryReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'CommentAndBinaryReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleCommentAndBinaryReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndBinaryReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleCommentAndBinaryReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndBinaryReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleCommentAndBinaryReceiverTester$Data(source: CommentAndBinaryReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserCommentAndBinaryReceiverTester$Data(): DictionaryValue<CommentAndBinaryReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCommentAndBinaryReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadCommentAndBinaryReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type CommentAndSliceReceiverTester$Data = {
    $$type: 'CommentAndSliceReceiverTester$Data';
    receiver: string;
}

export function storeCommentAndSliceReceiverTester$Data(src: CommentAndSliceReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadCommentAndSliceReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'CommentAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleCommentAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleCommentAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleCommentAndSliceReceiverTester$Data(source: CommentAndSliceReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserCommentAndSliceReceiverTester$Data(): DictionaryValue<CommentAndSliceReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCommentAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadCommentAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type StringAndBinaryReceiverTester$Data = {
    $$type: 'StringAndBinaryReceiverTester$Data';
    receiver: string;
}

export function storeStringAndBinaryReceiverTester$Data(src: StringAndBinaryReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadStringAndBinaryReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'StringAndBinaryReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleStringAndBinaryReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'StringAndBinaryReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleStringAndBinaryReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'StringAndBinaryReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleStringAndBinaryReceiverTester$Data(source: StringAndBinaryReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserStringAndBinaryReceiverTester$Data(): DictionaryValue<StringAndBinaryReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStringAndBinaryReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadStringAndBinaryReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type StringAndSliceReceiverTester$Data = {
    $$type: 'StringAndSliceReceiverTester$Data';
    receiver: string;
}

export function storeStringAndSliceReceiverTester$Data(src: StringAndSliceReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadStringAndSliceReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'StringAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleStringAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'StringAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleStringAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'StringAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleStringAndSliceReceiverTester$Data(source: StringAndSliceReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserStringAndSliceReceiverTester$Data(): DictionaryValue<StringAndSliceReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStringAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadStringAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type BinaryAndSliceReceiverTester$Data = {
    $$type: 'BinaryAndSliceReceiverTester$Data';
    receiver: string;
}

export function storeBinaryAndSliceReceiverTester$Data(src: BinaryAndSliceReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadBinaryAndSliceReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'BinaryAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleBinaryAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'BinaryAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleBinaryAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'BinaryAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleBinaryAndSliceReceiverTester$Data(source: BinaryAndSliceReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserBinaryAndSliceReceiverTester$Data(): DictionaryValue<BinaryAndSliceReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBinaryAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadBinaryAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type EmptyAndCommentAndStringReceiverTester$Data = {
    $$type: 'EmptyAndCommentAndStringReceiverTester$Data';
    receiver: string;
}

export function storeEmptyAndCommentAndStringReceiverTester$Data(src: EmptyAndCommentAndStringReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadEmptyAndCommentAndStringReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndCommentAndStringReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleEmptyAndCommentAndStringReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndStringReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleEmptyAndCommentAndStringReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndStringReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleEmptyAndCommentAndStringReceiverTester$Data(source: EmptyAndCommentAndStringReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserEmptyAndCommentAndStringReceiverTester$Data(): DictionaryValue<EmptyAndCommentAndStringReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEmptyAndCommentAndStringReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndCommentAndStringReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type EmptyAndCommentAndBinaryReceiverTester$Data = {
    $$type: 'EmptyAndCommentAndBinaryReceiverTester$Data';
    receiver: string;
}

export function storeEmptyAndCommentAndBinaryReceiverTester$Data(src: EmptyAndCommentAndBinaryReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadEmptyAndCommentAndBinaryReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndCommentAndBinaryReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleEmptyAndCommentAndBinaryReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndBinaryReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleEmptyAndCommentAndBinaryReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndBinaryReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleEmptyAndCommentAndBinaryReceiverTester$Data(source: EmptyAndCommentAndBinaryReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserEmptyAndCommentAndBinaryReceiverTester$Data(): DictionaryValue<EmptyAndCommentAndBinaryReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEmptyAndCommentAndBinaryReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndCommentAndBinaryReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type EmptyAndCommentAndSliceReceiverTester$Data = {
    $$type: 'EmptyAndCommentAndSliceReceiverTester$Data';
    receiver: string;
}

export function storeEmptyAndCommentAndSliceReceiverTester$Data(src: EmptyAndCommentAndSliceReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadEmptyAndCommentAndSliceReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndCommentAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleEmptyAndCommentAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleEmptyAndCommentAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleEmptyAndCommentAndSliceReceiverTester$Data(source: EmptyAndCommentAndSliceReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserEmptyAndCommentAndSliceReceiverTester$Data(): DictionaryValue<EmptyAndCommentAndSliceReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEmptyAndCommentAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndCommentAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type EmptyAndStringAndBinaryReceiverTester$Data = {
    $$type: 'EmptyAndStringAndBinaryReceiverTester$Data';
    receiver: string;
}

export function storeEmptyAndStringAndBinaryReceiverTester$Data(src: EmptyAndStringAndBinaryReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadEmptyAndStringAndBinaryReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndStringAndBinaryReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleEmptyAndStringAndBinaryReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndStringAndBinaryReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleEmptyAndStringAndBinaryReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndStringAndBinaryReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleEmptyAndStringAndBinaryReceiverTester$Data(source: EmptyAndStringAndBinaryReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserEmptyAndStringAndBinaryReceiverTester$Data(): DictionaryValue<EmptyAndStringAndBinaryReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEmptyAndStringAndBinaryReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndStringAndBinaryReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type EmptyAndStringAndSliceReceiverTester$Data = {
    $$type: 'EmptyAndStringAndSliceReceiverTester$Data';
    receiver: string;
}

export function storeEmptyAndStringAndSliceReceiverTester$Data(src: EmptyAndStringAndSliceReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadEmptyAndStringAndSliceReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndStringAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleEmptyAndStringAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndStringAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleEmptyAndStringAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndStringAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleEmptyAndStringAndSliceReceiverTester$Data(source: EmptyAndStringAndSliceReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserEmptyAndStringAndSliceReceiverTester$Data(): DictionaryValue<EmptyAndStringAndSliceReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEmptyAndStringAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndStringAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type EmptyAndBinaryAndSliceReceiverTester$Data = {
    $$type: 'EmptyAndBinaryAndSliceReceiverTester$Data';
    receiver: string;
}

export function storeEmptyAndBinaryAndSliceReceiverTester$Data(src: EmptyAndBinaryAndSliceReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadEmptyAndBinaryAndSliceReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndBinaryAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleEmptyAndBinaryAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndBinaryAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleEmptyAndBinaryAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndBinaryAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleEmptyAndBinaryAndSliceReceiverTester$Data(source: EmptyAndBinaryAndSliceReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserEmptyAndBinaryAndSliceReceiverTester$Data(): DictionaryValue<EmptyAndBinaryAndSliceReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEmptyAndBinaryAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndBinaryAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type CommentAndStringAndBinaryReceiverTester$Data = {
    $$type: 'CommentAndStringAndBinaryReceiverTester$Data';
    receiver: string;
}

export function storeCommentAndStringAndBinaryReceiverTester$Data(src: CommentAndStringAndBinaryReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadCommentAndStringAndBinaryReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'CommentAndStringAndBinaryReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleCommentAndStringAndBinaryReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndStringAndBinaryReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleCommentAndStringAndBinaryReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndStringAndBinaryReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleCommentAndStringAndBinaryReceiverTester$Data(source: CommentAndStringAndBinaryReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserCommentAndStringAndBinaryReceiverTester$Data(): DictionaryValue<CommentAndStringAndBinaryReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCommentAndStringAndBinaryReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadCommentAndStringAndBinaryReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type CommentAndStringAndSliceReceiverTester$Data = {
    $$type: 'CommentAndStringAndSliceReceiverTester$Data';
    receiver: string;
}

export function storeCommentAndStringAndSliceReceiverTester$Data(src: CommentAndStringAndSliceReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadCommentAndStringAndSliceReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'CommentAndStringAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleCommentAndStringAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndStringAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleCommentAndStringAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndStringAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleCommentAndStringAndSliceReceiverTester$Data(source: CommentAndStringAndSliceReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserCommentAndStringAndSliceReceiverTester$Data(): DictionaryValue<CommentAndStringAndSliceReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCommentAndStringAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadCommentAndStringAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type CommentAndBinaryAndSliceReceiverTester$Data = {
    $$type: 'CommentAndBinaryAndSliceReceiverTester$Data';
    receiver: string;
}

export function storeCommentAndBinaryAndSliceReceiverTester$Data(src: CommentAndBinaryAndSliceReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadCommentAndBinaryAndSliceReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'CommentAndBinaryAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleCommentAndBinaryAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndBinaryAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleCommentAndBinaryAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndBinaryAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleCommentAndBinaryAndSliceReceiverTester$Data(source: CommentAndBinaryAndSliceReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserCommentAndBinaryAndSliceReceiverTester$Data(): DictionaryValue<CommentAndBinaryAndSliceReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCommentAndBinaryAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadCommentAndBinaryAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type StringAndBinaryAndSliceReceiverTester$Data = {
    $$type: 'StringAndBinaryAndSliceReceiverTester$Data';
    receiver: string;
}

export function storeStringAndBinaryAndSliceReceiverTester$Data(src: StringAndBinaryAndSliceReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadStringAndBinaryAndSliceReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'StringAndBinaryAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleStringAndBinaryAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'StringAndBinaryAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleStringAndBinaryAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'StringAndBinaryAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleStringAndBinaryAndSliceReceiverTester$Data(source: StringAndBinaryAndSliceReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserStringAndBinaryAndSliceReceiverTester$Data(): DictionaryValue<StringAndBinaryAndSliceReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStringAndBinaryAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadStringAndBinaryAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type EmptyAndCommentAndStringAndBinaryReceiverTester$Data = {
    $$type: 'EmptyAndCommentAndStringAndBinaryReceiverTester$Data';
    receiver: string;
}

export function storeEmptyAndCommentAndStringAndBinaryReceiverTester$Data(src: EmptyAndCommentAndStringAndBinaryReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadEmptyAndCommentAndStringAndBinaryReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndCommentAndStringAndBinaryReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleEmptyAndCommentAndStringAndBinaryReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndStringAndBinaryReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleEmptyAndCommentAndStringAndBinaryReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndStringAndBinaryReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleEmptyAndCommentAndStringAndBinaryReceiverTester$Data(source: EmptyAndCommentAndStringAndBinaryReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserEmptyAndCommentAndStringAndBinaryReceiverTester$Data(): DictionaryValue<EmptyAndCommentAndStringAndBinaryReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEmptyAndCommentAndStringAndBinaryReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndCommentAndStringAndBinaryReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type EmptyAndCommentAndStringAndSliceReceiverTester$Data = {
    $$type: 'EmptyAndCommentAndStringAndSliceReceiverTester$Data';
    receiver: string;
}

export function storeEmptyAndCommentAndStringAndSliceReceiverTester$Data(src: EmptyAndCommentAndStringAndSliceReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadEmptyAndCommentAndStringAndSliceReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndCommentAndStringAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleEmptyAndCommentAndStringAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndStringAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleEmptyAndCommentAndStringAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndStringAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleEmptyAndCommentAndStringAndSliceReceiverTester$Data(source: EmptyAndCommentAndStringAndSliceReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserEmptyAndCommentAndStringAndSliceReceiverTester$Data(): DictionaryValue<EmptyAndCommentAndStringAndSliceReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEmptyAndCommentAndStringAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndCommentAndStringAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type EmptyAndCommentAndBinaryAndSliceReceiverTester$Data = {
    $$type: 'EmptyAndCommentAndBinaryAndSliceReceiverTester$Data';
    receiver: string;
}

export function storeEmptyAndCommentAndBinaryAndSliceReceiverTester$Data(src: EmptyAndCommentAndBinaryAndSliceReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadEmptyAndCommentAndBinaryAndSliceReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndCommentAndBinaryAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleEmptyAndCommentAndBinaryAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndBinaryAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleEmptyAndCommentAndBinaryAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndBinaryAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleEmptyAndCommentAndBinaryAndSliceReceiverTester$Data(source: EmptyAndCommentAndBinaryAndSliceReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserEmptyAndCommentAndBinaryAndSliceReceiverTester$Data(): DictionaryValue<EmptyAndCommentAndBinaryAndSliceReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEmptyAndCommentAndBinaryAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndCommentAndBinaryAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type EmptyAndStringAndBinaryAndSliceReceiverTester$Data = {
    $$type: 'EmptyAndStringAndBinaryAndSliceReceiverTester$Data';
    receiver: string;
}

export function storeEmptyAndStringAndBinaryAndSliceReceiverTester$Data(src: EmptyAndStringAndBinaryAndSliceReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadEmptyAndStringAndBinaryAndSliceReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndStringAndBinaryAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleEmptyAndStringAndBinaryAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndStringAndBinaryAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleEmptyAndStringAndBinaryAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndStringAndBinaryAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleEmptyAndStringAndBinaryAndSliceReceiverTester$Data(source: EmptyAndStringAndBinaryAndSliceReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserEmptyAndStringAndBinaryAndSliceReceiverTester$Data(): DictionaryValue<EmptyAndStringAndBinaryAndSliceReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEmptyAndStringAndBinaryAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndStringAndBinaryAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type CommentAndStringAndBinaryAndSliceReceiverTester$Data = {
    $$type: 'CommentAndStringAndBinaryAndSliceReceiverTester$Data';
    receiver: string;
}

export function storeCommentAndStringAndBinaryAndSliceReceiverTester$Data(src: CommentAndStringAndBinaryAndSliceReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadCommentAndStringAndBinaryAndSliceReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'CommentAndStringAndBinaryAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleCommentAndStringAndBinaryAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndStringAndBinaryAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleCommentAndStringAndBinaryAndSliceReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndStringAndBinaryAndSliceReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleCommentAndStringAndBinaryAndSliceReceiverTester$Data(source: CommentAndStringAndBinaryAndSliceReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserCommentAndStringAndBinaryAndSliceReceiverTester$Data(): DictionaryValue<CommentAndStringAndBinaryAndSliceReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCommentAndStringAndBinaryAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadCommentAndStringAndBinaryAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type AllReceiverTester$Data = {
    $$type: 'AllReceiverTester$Data';
    receiver: string;
}

export function storeAllReceiverTester$Data(src: AllReceiverTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadAllReceiverTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'AllReceiverTester$Data' as const, receiver: _receiver };
}

function loadTupleAllReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'AllReceiverTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleAllReceiverTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'AllReceiverTester$Data' as const, receiver: _receiver };
}

function storeTupleAllReceiverTester$Data(source: AllReceiverTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserAllReceiverTester$Data(): DictionaryValue<AllReceiverTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAllReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadAllReceiverTester$Data(src.loadRef().beginParse());
        }
    }
}

export type EmptyBouncedTester$Data = {
    $$type: 'EmptyBouncedTester$Data';
    receiver: string;
}

export function storeEmptyBouncedTester$Data(src: EmptyBouncedTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadEmptyBouncedTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyBouncedTester$Data' as const, receiver: _receiver };
}

function loadTupleEmptyBouncedTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyBouncedTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleEmptyBouncedTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'EmptyBouncedTester$Data' as const, receiver: _receiver };
}

function storeTupleEmptyBouncedTester$Data(source: EmptyBouncedTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserEmptyBouncedTester$Data(): DictionaryValue<EmptyBouncedTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEmptyBouncedTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyBouncedTester$Data(src.loadRef().beginParse());
        }
    }
}

export type BinaryBouncedTester$Data = {
    $$type: 'BinaryBouncedTester$Data';
    receiver: string;
}

export function storeBinaryBouncedTester$Data(src: BinaryBouncedTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadBinaryBouncedTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'BinaryBouncedTester$Data' as const, receiver: _receiver };
}

function loadTupleBinaryBouncedTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'BinaryBouncedTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleBinaryBouncedTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'BinaryBouncedTester$Data' as const, receiver: _receiver };
}

function storeTupleBinaryBouncedTester$Data(source: BinaryBouncedTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserBinaryBouncedTester$Data(): DictionaryValue<BinaryBouncedTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBinaryBouncedTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadBinaryBouncedTester$Data(src.loadRef().beginParse());
        }
    }
}

export type SliceBouncedTester$Data = {
    $$type: 'SliceBouncedTester$Data';
    receiver: string;
}

export function storeSliceBouncedTester$Data(src: SliceBouncedTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadSliceBouncedTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'SliceBouncedTester$Data' as const, receiver: _receiver };
}

function loadTupleSliceBouncedTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'SliceBouncedTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleSliceBouncedTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'SliceBouncedTester$Data' as const, receiver: _receiver };
}

function storeTupleSliceBouncedTester$Data(source: SliceBouncedTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserSliceBouncedTester$Data(): DictionaryValue<SliceBouncedTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSliceBouncedTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadSliceBouncedTester$Data(src.loadRef().beginParse());
        }
    }
}

export type AllBouncedTester$Data = {
    $$type: 'AllBouncedTester$Data';
    receiver: string;
}

export function storeAllBouncedTester$Data(src: AllBouncedTester$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}

export function loadAllBouncedTester$Data(slice: Slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'AllBouncedTester$Data' as const, receiver: _receiver };
}

function loadTupleAllBouncedTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'AllBouncedTester$Data' as const, receiver: _receiver };
}

function loadGetterTupleAllBouncedTester$Data(source: TupleReader) {
    const _receiver = source.readString();
    return { $$type: 'AllBouncedTester$Data' as const, receiver: _receiver };
}

function storeTupleAllBouncedTester$Data(source: AllBouncedTester$Data) {
    const builder = new TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}

function dictValueParserAllBouncedTester$Data(): DictionaryValue<AllBouncedTester$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAllBouncedTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadAllBouncedTester$Data(src.loadRef().beginParse());
        }
    }
}

 type EmptyAndStringAndBinaryAndSliceReceiverTester_init_args = {
    $$type: 'EmptyAndStringAndBinaryAndSliceReceiverTester_init_args';
}

function initEmptyAndStringAndBinaryAndSliceReceiverTester_init_args(src: EmptyAndStringAndBinaryAndSliceReceiverTester_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function EmptyAndStringAndBinaryAndSliceReceiverTester_init() {
    const __code = Cell.fromBase64('te6ccgECCgEAAmkABPz/ACCP9TDtou37AdBy1yHSANIA+kAhEDRQZm8E+GEC+GLtRNDSAAGU1AHQMZowi3dW5rbm93bo4jABkTDgcCHXSSDCH5Ey4w0gwAAiwSGwjhhbi1ZW1wdHmMh/AcoAAcgBzxbJAczJ7VTgwACRMOMNi4ZmFsbGJhY2uOEgwP8BAgYDALAxIdcLHzIhwGSOG1uLZiaW5hcnmMh/AcoAAcgBzxbJAczJ7VTbMeAhwGWOKluNBRiaW5hcnlfZW1wdHlfbWVzc2FnZYMh/AcoAAcgBzxbJAczJ7VTbMeABAFDCH44ji/ZmFsbGJhY2tfc3RyaW5njIfwHKAAHIAc8WyQHMye1U2zHgBOiP8TDtou377UTQ0gABlNQB0DGaMIt3Vua25vd26OIwcCHXSSDCH5Ey4w0gwAAiwSGwjiNb+ACL5leHRlcm5hbF9lbXB0eYyH8BygAByAHPFskBzMntVODAAJEw4w34AI0EWV4dGVybmFsX2ZhbGxiYWNrg4AQFBgcA3DEh1wsfMiHAZY41W/gAjQdZXh0ZXJuYWxfYmluYXJ5X2VtcHR5X21lc3NhZ2WDIfwHKAAHIAc8WyQHMye1U2zHgIcBkjiZb+ACL9leHRlcm5hbF9iaW5hcnmMh/AcoAAcgBzxbJAczJ7VTbMeABAGjCH44v+ACNBhleHRlcm5hbF9mYWxsYmFja19zdHJpbmeDIfwHKAAHIAc8WyQHMye1U2zHgACDIfwHKAAHIAc8WyQHMye1UARD0pBP0vPLICwgBO6ZNGPtRNDSAAGU1AHQMZowi3dW5rbm93bo4ts8MYAkAAiA=');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initEmptyAndStringAndBinaryAndSliceReceiverTester_init_args({ $$type: 'EmptyAndStringAndBinaryAndSliceReceiverTester_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const EmptyAndStringAndBinaryAndSliceReceiverTester_errors: { [key: number]: { message: string } } = {
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
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
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
}

const EmptyAndStringAndBinaryAndSliceReceiverTester_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"Message","header":100,"fields":[{"name":"msg","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"Empty","header":101,"fields":[]},
    {"name":"BinaryIntOperation","header":829886522,"fields":[{"name":"op","type":{"kind":"simple","type":"string","optional":false}},{"name":"val1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"val2","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"BinaryIntResult","header":4234356752,"fields":[{"name":"val","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SendCellToAddress","header":2141069065,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"body","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Calculator$Data","header":null,"fields":[]},
    {"name":"ReceiverTester$Data","header":null,"fields":[{"name":"receiverKind","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"NoReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"EmptyReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"CommentReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"StringReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"BinaryReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"SliceReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"EmptyAndCommentReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"EmptyAndStringReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"EmptyAndBinaryReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"EmptyAndSliceReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"CommentAndStringReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"CommentAndBinaryReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"CommentAndSliceReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"StringAndBinaryReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"StringAndSliceReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"BinaryAndSliceReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"EmptyAndCommentAndStringReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"EmptyAndCommentAndBinaryReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"EmptyAndCommentAndSliceReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"EmptyAndStringAndBinaryReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"EmptyAndStringAndSliceReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"EmptyAndBinaryAndSliceReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"CommentAndStringAndBinaryReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"CommentAndStringAndSliceReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"CommentAndBinaryAndSliceReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"StringAndBinaryAndSliceReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"EmptyAndCommentAndStringAndBinaryReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"EmptyAndCommentAndStringAndSliceReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"EmptyAndCommentAndBinaryAndSliceReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"EmptyAndStringAndBinaryAndSliceReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"CommentAndStringAndBinaryAndSliceReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"AllReceiverTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"EmptyBouncedTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"BinaryBouncedTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"SliceBouncedTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"AllBouncedTester$Data","header":null,"fields":[{"name":"receiver","type":{"kind":"simple","type":"string","optional":false}}]},
]

const EmptyAndStringAndBinaryAndSliceReceiverTester_getters: ABIGetter[] = [
    {"name":"receiver","methodId":78947,"arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
]

export const EmptyAndStringAndBinaryAndSliceReceiverTester_getterMapping: { [key: string]: string } = {
    'receiver': 'getReceiver',
}

const EmptyAndStringAndBinaryAndSliceReceiverTester_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"text"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Message"}},
    {"receiver":"internal","message":{"kind":"any"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Empty"}},
    {"receiver":"external","message":{"kind":"typed","type":"Empty"}},
    {"receiver":"external","message":{"kind":"empty"}},
    {"receiver":"external","message":{"kind":"text"}},
    {"receiver":"external","message":{"kind":"typed","type":"Message"}},
    {"receiver":"external","message":{"kind":"any"}},
]


export class EmptyAndStringAndBinaryAndSliceReceiverTester implements Contract {
    
    public static readonly storageReserve = 0n;
    
    static async init() {
        return await EmptyAndStringAndBinaryAndSliceReceiverTester_init();
    }
    
    static async fromInit() {
        const __gen_init = await EmptyAndStringAndBinaryAndSliceReceiverTester_init();
        const address = contractAddress(0, __gen_init);
        return new EmptyAndStringAndBinaryAndSliceReceiverTester(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new EmptyAndStringAndBinaryAndSliceReceiverTester(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  EmptyAndStringAndBinaryAndSliceReceiverTester_types,
        getters: EmptyAndStringAndBinaryAndSliceReceiverTester_getters,
        receivers: EmptyAndStringAndBinaryAndSliceReceiverTester_receivers,
        errors: EmptyAndStringAndBinaryAndSliceReceiverTester_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | string | Message | Slice | Empty) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (typeof message === 'string') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Message') {
            body = beginCell().store(storeMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && message instanceof Slice) {
            body = message.asCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Empty') {
            body = beginCell().store(storeEmpty(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async sendExternal(provider: ContractProvider, message: Empty | null | string | Message | Slice) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Empty') {
            body = beginCell().store(storeEmpty(message)).endCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (typeof message === 'string') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Message') {
            body = beginCell().store(storeMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && message instanceof Slice) {
            body = message.asCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.external(body);
        
    }
    
    async getReceiver(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(78947 as any, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    
}