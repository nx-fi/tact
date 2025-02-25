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

export type Parent$Data = {
    $$type: 'Parent$Data';
    parentMark: bigint;
}

export function storeParent$Data(src: Parent$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.parentMark, 257);
    };
}

export function loadParent$Data(slice: Slice) {
    const sc_0 = slice;
    const _parentMark = sc_0.loadIntBig(257);
    return { $$type: 'Parent$Data' as const, parentMark: _parentMark };
}

function loadTupleParent$Data(source: TupleReader) {
    const _parentMark = source.readBigNumber();
    return { $$type: 'Parent$Data' as const, parentMark: _parentMark };
}

function loadGetterTupleParent$Data(source: TupleReader) {
    const _parentMark = source.readBigNumber();
    return { $$type: 'Parent$Data' as const, parentMark: _parentMark };
}

function storeTupleParent$Data(source: Parent$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.parentMark);
    return builder.build();
}

function dictValueParserParent$Data(): DictionaryValue<Parent$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeParent$Data(src)).endCell());
        },
        parse: (src) => {
            return loadParent$Data(src.loadRef().beginParse());
        }
    }
}

export type Child0$Data = {
    $$type: 'Child0$Data';
    childNum: bigint;
}

export function storeChild0$Data(src: Child0$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.childNum, 32);
    };
}

export function loadChild0$Data(slice: Slice) {
    const sc_0 = slice;
    const _childNum = sc_0.loadUintBig(32);
    return { $$type: 'Child0$Data' as const, childNum: _childNum };
}

function loadTupleChild0$Data(source: TupleReader) {
    const _childNum = source.readBigNumber();
    return { $$type: 'Child0$Data' as const, childNum: _childNum };
}

function loadGetterTupleChild0$Data(source: TupleReader) {
    const _childNum = source.readBigNumber();
    return { $$type: 'Child0$Data' as const, childNum: _childNum };
}

function storeTupleChild0$Data(source: Child0$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.childNum);
    return builder.build();
}

function dictValueParserChild0$Data(): DictionaryValue<Child0$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChild0$Data(src)).endCell());
        },
        parse: (src) => {
            return loadChild0$Data(src.loadRef().beginParse());
        }
    }
}

export type Child1$Data = {
    $$type: 'Child1$Data';
    childNum: bigint;
}

export function storeChild1$Data(src: Child1$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.childNum, 32);
    };
}

export function loadChild1$Data(slice: Slice) {
    const sc_0 = slice;
    const _childNum = sc_0.loadUintBig(32);
    return { $$type: 'Child1$Data' as const, childNum: _childNum };
}

function loadTupleChild1$Data(source: TupleReader) {
    const _childNum = source.readBigNumber();
    return { $$type: 'Child1$Data' as const, childNum: _childNum };
}

function loadGetterTupleChild1$Data(source: TupleReader) {
    const _childNum = source.readBigNumber();
    return { $$type: 'Child1$Data' as const, childNum: _childNum };
}

function storeTupleChild1$Data(source: Child1$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.childNum);
    return builder.build();
}

function dictValueParserChild1$Data(): DictionaryValue<Child1$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChild1$Data(src)).endCell());
        },
        parse: (src) => {
            return loadChild1$Data(src.loadRef().beginParse());
        }
    }
}

export type Child2$Data = {
    $$type: 'Child2$Data';
    childNum: bigint;
}

export function storeChild2$Data(src: Child2$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.childNum, 32);
    };
}

export function loadChild2$Data(slice: Slice) {
    const sc_0 = slice;
    const _childNum = sc_0.loadUintBig(32);
    return { $$type: 'Child2$Data' as const, childNum: _childNum };
}

function loadTupleChild2$Data(source: TupleReader) {
    const _childNum = source.readBigNumber();
    return { $$type: 'Child2$Data' as const, childNum: _childNum };
}

function loadGetterTupleChild2$Data(source: TupleReader) {
    const _childNum = source.readBigNumber();
    return { $$type: 'Child2$Data' as const, childNum: _childNum };
}

function storeTupleChild2$Data(source: Child2$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.childNum);
    return builder.build();
}

function dictValueParserChild2$Data(): DictionaryValue<Child2$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChild2$Data(src)).endCell());
        },
        parse: (src) => {
            return loadChild2$Data(src.loadRef().beginParse());
        }
    }
}

export type Child3$Data = {
    $$type: 'Child3$Data';
    childNum: bigint;
}

export function storeChild3$Data(src: Child3$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.childNum, 32);
    };
}

export function loadChild3$Data(slice: Slice) {
    const sc_0 = slice;
    const _childNum = sc_0.loadUintBig(32);
    return { $$type: 'Child3$Data' as const, childNum: _childNum };
}

function loadTupleChild3$Data(source: TupleReader) {
    const _childNum = source.readBigNumber();
    return { $$type: 'Child3$Data' as const, childNum: _childNum };
}

function loadGetterTupleChild3$Data(source: TupleReader) {
    const _childNum = source.readBigNumber();
    return { $$type: 'Child3$Data' as const, childNum: _childNum };
}

function storeTupleChild3$Data(source: Child3$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.childNum);
    return builder.build();
}

function dictValueParserChild3$Data(): DictionaryValue<Child3$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChild3$Data(src)).endCell());
        },
        parse: (src) => {
            return loadChild3$Data(src.loadRef().beginParse());
        }
    }
}

export type Child4$Data = {
    $$type: 'Child4$Data';
    childNum: bigint;
}

export function storeChild4$Data(src: Child4$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.childNum, 32);
    };
}

export function loadChild4$Data(slice: Slice) {
    const sc_0 = slice;
    const _childNum = sc_0.loadUintBig(32);
    return { $$type: 'Child4$Data' as const, childNum: _childNum };
}

function loadTupleChild4$Data(source: TupleReader) {
    const _childNum = source.readBigNumber();
    return { $$type: 'Child4$Data' as const, childNum: _childNum };
}

function loadGetterTupleChild4$Data(source: TupleReader) {
    const _childNum = source.readBigNumber();
    return { $$type: 'Child4$Data' as const, childNum: _childNum };
}

function storeTupleChild4$Data(source: Child4$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.childNum);
    return builder.build();
}

function dictValueParserChild4$Data(): DictionaryValue<Child4$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChild4$Data(src)).endCell());
        },
        parse: (src) => {
            return loadChild4$Data(src.loadRef().beginParse());
        }
    }
}

export type Child5$Data = {
    $$type: 'Child5$Data';
    childNum: bigint;
}

export function storeChild5$Data(src: Child5$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.childNum, 32);
    };
}

export function loadChild5$Data(slice: Slice) {
    const sc_0 = slice;
    const _childNum = sc_0.loadUintBig(32);
    return { $$type: 'Child5$Data' as const, childNum: _childNum };
}

function loadTupleChild5$Data(source: TupleReader) {
    const _childNum = source.readBigNumber();
    return { $$type: 'Child5$Data' as const, childNum: _childNum };
}

function loadGetterTupleChild5$Data(source: TupleReader) {
    const _childNum = source.readBigNumber();
    return { $$type: 'Child5$Data' as const, childNum: _childNum };
}

function storeTupleChild5$Data(source: Child5$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.childNum);
    return builder.build();
}

function dictValueParserChild5$Data(): DictionaryValue<Child5$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChild5$Data(src)).endCell());
        },
        parse: (src) => {
            return loadChild5$Data(src.loadRef().beginParse());
        }
    }
}

export type Child6$Data = {
    $$type: 'Child6$Data';
    childNum: bigint;
}

export function storeChild6$Data(src: Child6$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.childNum, 32);
    };
}

export function loadChild6$Data(slice: Slice) {
    const sc_0 = slice;
    const _childNum = sc_0.loadUintBig(32);
    return { $$type: 'Child6$Data' as const, childNum: _childNum };
}

function loadTupleChild6$Data(source: TupleReader) {
    const _childNum = source.readBigNumber();
    return { $$type: 'Child6$Data' as const, childNum: _childNum };
}

function loadGetterTupleChild6$Data(source: TupleReader) {
    const _childNum = source.readBigNumber();
    return { $$type: 'Child6$Data' as const, childNum: _childNum };
}

function storeTupleChild6$Data(source: Child6$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.childNum);
    return builder.build();
}

function dictValueParserChild6$Data(): DictionaryValue<Child6$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChild6$Data(src)).endCell());
        },
        parse: (src) => {
            return loadChild6$Data(src.loadRef().beginParse());
        }
    }
}

export type Child7$Data = {
    $$type: 'Child7$Data';
    childNum: bigint;
}

export function storeChild7$Data(src: Child7$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.childNum, 32);
    };
}

export function loadChild7$Data(slice: Slice) {
    const sc_0 = slice;
    const _childNum = sc_0.loadUintBig(32);
    return { $$type: 'Child7$Data' as const, childNum: _childNum };
}

function loadTupleChild7$Data(source: TupleReader) {
    const _childNum = source.readBigNumber();
    return { $$type: 'Child7$Data' as const, childNum: _childNum };
}

function loadGetterTupleChild7$Data(source: TupleReader) {
    const _childNum = source.readBigNumber();
    return { $$type: 'Child7$Data' as const, childNum: _childNum };
}

function storeTupleChild7$Data(source: Child7$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.childNum);
    return builder.build();
}

function dictValueParserChild7$Data(): DictionaryValue<Child7$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChild7$Data(src)).endCell());
        },
        parse: (src) => {
            return loadChild7$Data(src.loadRef().beginParse());
        }
    }
}

export type Child8$Data = {
    $$type: 'Child8$Data';
    childNum: bigint;
}

export function storeChild8$Data(src: Child8$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.childNum, 32);
    };
}

export function loadChild8$Data(slice: Slice) {
    const sc_0 = slice;
    const _childNum = sc_0.loadUintBig(32);
    return { $$type: 'Child8$Data' as const, childNum: _childNum };
}

function loadTupleChild8$Data(source: TupleReader) {
    const _childNum = source.readBigNumber();
    return { $$type: 'Child8$Data' as const, childNum: _childNum };
}

function loadGetterTupleChild8$Data(source: TupleReader) {
    const _childNum = source.readBigNumber();
    return { $$type: 'Child8$Data' as const, childNum: _childNum };
}

function storeTupleChild8$Data(source: Child8$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.childNum);
    return builder.build();
}

function dictValueParserChild8$Data(): DictionaryValue<Child8$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChild8$Data(src)).endCell());
        },
        parse: (src) => {
            return loadChild8$Data(src.loadRef().beginParse());
        }
    }
}

export type Child9$Data = {
    $$type: 'Child9$Data';
    childNum: bigint;
}

export function storeChild9$Data(src: Child9$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.childNum, 32);
    };
}

export function loadChild9$Data(slice: Slice) {
    const sc_0 = slice;
    const _childNum = sc_0.loadUintBig(32);
    return { $$type: 'Child9$Data' as const, childNum: _childNum };
}

function loadTupleChild9$Data(source: TupleReader) {
    const _childNum = source.readBigNumber();
    return { $$type: 'Child9$Data' as const, childNum: _childNum };
}

function loadGetterTupleChild9$Data(source: TupleReader) {
    const _childNum = source.readBigNumber();
    return { $$type: 'Child9$Data' as const, childNum: _childNum };
}

function storeTupleChild9$Data(source: Child9$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.childNum);
    return builder.build();
}

function dictValueParserChild9$Data(): DictionaryValue<Child9$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChild9$Data(src)).endCell());
        },
        parse: (src) => {
            return loadChild9$Data(src.loadRef().beginParse());
        }
    }
}

 type Parent_init_args = {
    $$type: 'Parent_init_args';
}

function initParent_init_args(src: Parent_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function Parent_init() {
    const __code = Cell.fromBase64('te6ccgECLQEAA2wAART/APSkE/S88sgLAQIBYgIDAZzQAdBy1yHSANIA+kAhEDRQZm8E+GEC+GLbPAKRW+BwIddJIMIflTEB0x8wkTLiwAABwSGwjhPI+EMBzH8BygABAYEBAc8Aye1U4DDywIIqAgEgBAUCAWoGBwIBIAwNAhGwjTbPNs8bBKAqCAIRsIV2zzbPGwSgKgoBBNs8CQA4+EPQ9AQwggCLGwGAEPQPb6Hy4IfIcAHKAG0wyQEE2zwLADj4Q9D0BDCCAJs6AYAQ9A9vofLgh8hwAcoAbTDJAgEgDg8CASAeHwIBIBARAgEgGBkCEbDuNs82zxsEoCoSAhGw5nbPNs8bBKAqFAEE2zwTADb4Q9D0BDCBSpcBgBD0D2+h8uCHyHABygBtMMkBBNs8FQH2+EPQ9AQwIIFatgGAEPQPb6Hy4IdtgQqp+CoCgBD0FyKBChMBgBD0D2+h8uCHgQoTAQKAEPQXIoEaMgGAEPQPb6Hy4IeBGjIBAoAQ9BcigSpRAYAQ9A9vofLgh4EqUQECgBD0FyKBOnABgBD0D2+h8uCHgTpwAQKAEPQXFgH+IoFKlwGAEPQPb6Hy4IeBSpcBAoAQ9BcigWrVAYAQ9A9vofLgh4Fq1QECgBD0FyKBevQBgBD0D2+h8uCHgXr0AQKAEPQXIoIAixsBgBD0D2+h8uCHggCLGwECgBD0FwKCAJs6AYAQ9A9vofLghxKCAJs6AQKAEPQXyAHI9ADJARcAEMxwAcoAbTDJAhGw/rbPNs8bBKAqGgIRsPb2zzbPGwSgKhwBBNs8GwA2+EPQ9AQwgWrVAYAQ9A9vofLgh8hwAcoAbTDJAQTbPB0ANvhD0PQEMIF69AGAEPQPb6Hy4IfIcAHKAG0wyQIBICAhAgEgJicCEbDPNs82zxsEoCoiAhGwx3bPNs8bBKAqJAEE2zwjADb4Q9D0BDCBChMBgBD0D2+h8uCHyHABygBtMMkBBNs8JQA2+EPQ9AQwgRoyAYAQ9A9vofLgh8hwAcoAbTDJAhGw37bPNs8bBKAqKAIRsNf2zzbPGwSgKisBBNs8KQA2+EPQ9AQwgSpRAYAQ9A9vofLgh8hwAcoAbTDJACrtRNDUAfhj0gABl4EBAdcAATHgMHIBBNs8LAA2+EPQ9AQwgTpwAYAQ9A9vofLgh8hwAcoAbTDJ');
    const builder = beginCell();
    const __system = Cell.fromBase64('te6cckECIAEAAmMAAQHAAQIBIAIaAgEgAwoCASAEBwIBIAUGAQWyhOAdAQWyjKAdAgEgCAkBBbKUYB0BBbKcIB0CASALFwIBIAwNAQWypeAdAQWyraAOART/APSkE/S88sgLDwIBYhARAZbQAdBy1yHSANIA+kAhEDRQZm8E+GEC+GLbPAKRW+BwIddJIMIflTEB0x8wkTLiwAABwSGwjhDI+EMBzH8BygABAcsfye1U4DDywIISAhGhhw22ebZ42CUSEwAk7UTQ1AH4Y9IAAZTTHwEx4DBwAQTbPBQB6vhD0PQEMCCBCqkBgBD0D2+h8uCHbSKBChMBgBD0D2+h8uCHgQoTAQKAEPQXIoEaMgGAEPQPb6Hy4IeBGjIBAoAQ9BcigSpRAYAQ9A9vofLgh4EqUQECgBD0FyKBOnABgBD0D2+h8uCHgTpwAQKAEPQXIoFKlxUB/gGAEPQPb6Hy4IeBSpcBAoAQ9BeBWrb4KgKAEPQXIoFq1QGAEPQPb6Hy4IeBatUBAoAQ9BcigXr0AYAQ9A9vofLgh4F69AECgBD0FyKCAIsbAYAQ9A9vofLgh4IAixsBAoAQ9BcCggCbOgGAEPQPb6Hy4IcSggCbOgECgBD0F8gWABwByPQAyQHMcAHKAG0wyQIBIBgZAQWytWAdAQWyvSAdAgFiGxwBBbLG4B0BBbLOoB0BFP8A9KQT9LzyyAseAYzTAdBy1yHSANIA+kAhEDRQZm8E+GEC+GLbPAKRW+BwIddJIMIflTEB0x8wkTLiwAABwSGwnMh/AcoAAQHLH8ntVOAw8sCCHwAc7UTQ0gABlNMfATHgMHAlmWys');
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initParent_init_args({ $$type: 'Parent_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Parent_errors: { [key: number]: { message: string } } = {
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
}

const Parent_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Parent$Data","header":null,"fields":[{"name":"parentMark","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Child0$Data","header":null,"fields":[{"name":"childNum","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Child1$Data","header":null,"fields":[{"name":"childNum","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Child2$Data","header":null,"fields":[{"name":"childNum","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Child3$Data","header":null,"fields":[{"name":"childNum","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Child4$Data","header":null,"fields":[{"name":"childNum","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Child5$Data","header":null,"fields":[{"name":"childNum","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Child6$Data","header":null,"fields":[{"name":"childNum","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Child7$Data","header":null,"fields":[{"name":"childNum","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Child8$Data","header":null,"fields":[{"name":"childNum","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Child9$Data","header":null,"fields":[{"name":"childNum","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
]

const Parent_getters: ABIGetter[] = [
    {"name":"getChild0","methodId":115516,"arguments":[],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
    {"name":"getChild1","methodId":119581,"arguments":[],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
    {"name":"getChild2","methodId":123774,"arguments":[],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
    {"name":"getChild3","methodId":127839,"arguments":[],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
    {"name":"getChild4","methodId":99256,"arguments":[],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
    {"name":"getChild5","methodId":103321,"arguments":[],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
    {"name":"getChild6","methodId":107514,"arguments":[],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
    {"name":"getChild7","methodId":111579,"arguments":[],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
    {"name":"getChild8","methodId":82484,"arguments":[],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
    {"name":"getChild9","methodId":86549,"arguments":[],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
]

export const Parent_getterMapping: { [key: string]: string } = {
    'getChild0': 'getGetChild0',
    'getChild1': 'getGetChild1',
    'getChild2': 'getGetChild2',
    'getChild3': 'getGetChild3',
    'getChild4': 'getGetChild4',
    'getChild5': 'getGetChild5',
    'getChild6': 'getGetChild6',
    'getChild7': 'getGetChild7',
    'getChild8': 'getGetChild8',
    'getChild9': 'getGetChild9',
}

const Parent_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
]

export class Parent implements Contract {
    
    static async init() {
        return await Parent_init();
    }
    
    static async fromInit() {
        const __gen_init = await Parent_init();
        const address = contractAddress(0, __gen_init);
        return new Parent(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new Parent(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Parent_types,
        getters: Parent_getters,
        receivers: Parent_receivers,
        errors: Parent_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetChild0(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(115516 as any, builder.build())).stack;
        const result = loadGetterTupleStateInit(source);
        return result;
    }
    
    async getGetChild1(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(119581 as any, builder.build())).stack;
        const result = loadGetterTupleStateInit(source);
        return result;
    }
    
    async getGetChild2(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(123774 as any, builder.build())).stack;
        const result = loadGetterTupleStateInit(source);
        return result;
    }
    
    async getGetChild3(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(127839 as any, builder.build())).stack;
        const result = loadGetterTupleStateInit(source);
        return result;
    }
    
    async getGetChild4(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(99256 as any, builder.build())).stack;
        const result = loadGetterTupleStateInit(source);
        return result;
    }
    
    async getGetChild5(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(103321 as any, builder.build())).stack;
        const result = loadGetterTupleStateInit(source);
        return result;
    }
    
    async getGetChild6(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(107514 as any, builder.build())).stack;
        const result = loadGetterTupleStateInit(source);
        return result;
    }
    
    async getGetChild7(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(111579 as any, builder.build())).stack;
        const result = loadGetterTupleStateInit(source);
        return result;
    }
    
    async getGetChild8(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(82484 as any, builder.build())).stack;
        const result = loadGetterTupleStateInit(source);
        return result;
    }
    
    async getGetChild9(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(86549 as any, builder.build())).stack;
        const result = loadGetterTupleStateInit(source);
        return result;
    }
    
}