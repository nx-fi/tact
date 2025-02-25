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

export type SomeStruct = {
    $$type: 'SomeStruct';
    int: bigint;
    bool: boolean;
    address: Address;
    a: bigint;
    b: bigint;
}

export function storeSomeStruct(src: SomeStruct) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.int, 257);
        b_0.storeBit(src.bool);
        b_0.storeAddress(src.address);
        b_0.storeInt(src.a, 257);
        const b_1 = new Builder();
        b_1.storeInt(src.b, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSomeStruct(slice: Slice) {
    const sc_0 = slice;
    const _int = sc_0.loadIntBig(257);
    const _bool = sc_0.loadBit();
    const _address = sc_0.loadAddress();
    const _a = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _b = sc_1.loadIntBig(257);
    return { $$type: 'SomeStruct' as const, int: _int, bool: _bool, address: _address, a: _a, b: _b };
}

function loadTupleSomeStruct(source: TupleReader) {
    const _int = source.readBigNumber();
    const _bool = source.readBoolean();
    const _address = source.readAddress();
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    return { $$type: 'SomeStruct' as const, int: _int, bool: _bool, address: _address, a: _a, b: _b };
}

function loadGetterTupleSomeStruct(source: TupleReader) {
    const _int = source.readBigNumber();
    const _bool = source.readBoolean();
    const _address = source.readAddress();
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    return { $$type: 'SomeStruct' as const, int: _int, bool: _bool, address: _address, a: _a, b: _b };
}

function storeTupleSomeStruct(source: SomeStruct) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.int);
    builder.writeBoolean(source.bool);
    builder.writeAddress(source.address);
    builder.writeNumber(source.a);
    builder.writeNumber(source.b);
    return builder.build();
}

function dictValueParserSomeStruct(): DictionaryValue<SomeStruct> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSomeStruct(src)).endCell());
        },
        parse: (src) => {
            return loadSomeStruct(src.loadRef().beginParse());
        }
    }
}

export type GetAllMapsResult = {
    $$type: 'GetAllMapsResult';
    int_varint16: bigint | null;
    int_varint32: bigint | null;
    int_varuint16: bigint | null;
    int_varuint32: bigint | null;
    int_bool: boolean | null;
    int_cell: Cell | null;
    int_address: Address | null;
    int_struct: SomeStruct | null;
    int8_varint16: bigint | null;
    int8_varint32: bigint | null;
    int8_varuint16: bigint | null;
    int8_varuint32: bigint | null;
    int8_bool: boolean | null;
    int8_cell: Cell | null;
    int8_address: Address | null;
    int8_struct: SomeStruct | null;
    int42_varint16: bigint | null;
    int42_varint32: bigint | null;
    int42_varuint16: bigint | null;
    int42_varuint32: bigint | null;
    int42_bool: boolean | null;
    int42_cell: Cell | null;
    int42_address: Address | null;
    int42_struct: SomeStruct | null;
    int256_varint16: bigint | null;
    int256_varint32: bigint | null;
    int256_varuint16: bigint | null;
    int256_varuint32: bigint | null;
    int256_bool: boolean | null;
    int256_cell: Cell | null;
    int256_address: Address | null;
    int256_struct: SomeStruct | null;
    uint8_varint16: bigint | null;
    uint8_varint32: bigint | null;
    uint8_varuint16: bigint | null;
    uint8_varuint32: bigint | null;
    uint8_bool: boolean | null;
    uint8_cell: Cell | null;
    uint8_address: Address | null;
    uint8_struct: SomeStruct | null;
    uint42_varint16: bigint | null;
    uint42_varint32: bigint | null;
    uint42_varuint16: bigint | null;
    uint42_varuint32: bigint | null;
    uint42_bool: boolean | null;
    uint42_cell: Cell | null;
    uint42_address: Address | null;
    uint42_struct: SomeStruct | null;
    uint256_varint16: bigint | null;
    uint256_varint32: bigint | null;
    uint256_varuint16: bigint | null;
    uint256_varuint32: bigint | null;
    uint256_bool: boolean | null;
    uint256_cell: Cell | null;
    uint256_address: Address | null;
    uint256_struct: SomeStruct | null;
    address_varint16: bigint | null;
    address_varint32: bigint | null;
    address_varuint16: bigint | null;
    address_varuint32: bigint | null;
    address_bool: boolean | null;
    address_cell: Cell | null;
    address_address: Address | null;
    address_struct: SomeStruct | null;
}

export function storeGetAllMapsResult(src: GetAllMapsResult) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.int_varint16 !== null && src.int_varint16 !== undefined) { b_0.storeBit(true).storeInt(src.int_varint16, 257); } else { b_0.storeBit(false); }
        if (src.int_varint32 !== null && src.int_varint32 !== undefined) { b_0.storeBit(true).storeInt(src.int_varint32, 257); } else { b_0.storeBit(false); }
        if (src.int_varuint16 !== null && src.int_varuint16 !== undefined) { b_0.storeBit(true).storeInt(src.int_varuint16, 257); } else { b_0.storeBit(false); }
        const b_1 = new Builder();
        if (src.int_varuint32 !== null && src.int_varuint32 !== undefined) { b_1.storeBit(true).storeInt(src.int_varuint32, 257); } else { b_1.storeBit(false); }
        if (src.int_bool !== null && src.int_bool !== undefined) { b_1.storeBit(true).storeBit(src.int_bool); } else { b_1.storeBit(false); }
        if (src.int_cell !== null && src.int_cell !== undefined) { b_1.storeBit(true).storeRef(src.int_cell); } else { b_1.storeBit(false); }
        b_1.storeAddress(src.int_address);
        const b_2 = new Builder();
        if (src.int_struct !== null && src.int_struct !== undefined) { b_2.storeBit(true); b_2.store(storeSomeStruct(src.int_struct)); } else { b_2.storeBit(false); }
        const b_3 = new Builder();
        if (src.int8_varint16 !== null && src.int8_varint16 !== undefined) { b_3.storeBit(true).storeInt(src.int8_varint16, 257); } else { b_3.storeBit(false); }
        if (src.int8_varint32 !== null && src.int8_varint32 !== undefined) { b_3.storeBit(true).storeInt(src.int8_varint32, 257); } else { b_3.storeBit(false); }
        if (src.int8_varuint16 !== null && src.int8_varuint16 !== undefined) { b_3.storeBit(true).storeInt(src.int8_varuint16, 257); } else { b_3.storeBit(false); }
        const b_4 = new Builder();
        if (src.int8_varuint32 !== null && src.int8_varuint32 !== undefined) { b_4.storeBit(true).storeInt(src.int8_varuint32, 257); } else { b_4.storeBit(false); }
        if (src.int8_bool !== null && src.int8_bool !== undefined) { b_4.storeBit(true).storeBit(src.int8_bool); } else { b_4.storeBit(false); }
        if (src.int8_cell !== null && src.int8_cell !== undefined) { b_4.storeBit(true).storeRef(src.int8_cell); } else { b_4.storeBit(false); }
        b_4.storeAddress(src.int8_address);
        const b_5 = new Builder();
        if (src.int8_struct !== null && src.int8_struct !== undefined) { b_5.storeBit(true); b_5.store(storeSomeStruct(src.int8_struct)); } else { b_5.storeBit(false); }
        const b_6 = new Builder();
        if (src.int42_varint16 !== null && src.int42_varint16 !== undefined) { b_6.storeBit(true).storeInt(src.int42_varint16, 257); } else { b_6.storeBit(false); }
        if (src.int42_varint32 !== null && src.int42_varint32 !== undefined) { b_6.storeBit(true).storeInt(src.int42_varint32, 257); } else { b_6.storeBit(false); }
        if (src.int42_varuint16 !== null && src.int42_varuint16 !== undefined) { b_6.storeBit(true).storeInt(src.int42_varuint16, 257); } else { b_6.storeBit(false); }
        const b_7 = new Builder();
        if (src.int42_varuint32 !== null && src.int42_varuint32 !== undefined) { b_7.storeBit(true).storeInt(src.int42_varuint32, 257); } else { b_7.storeBit(false); }
        if (src.int42_bool !== null && src.int42_bool !== undefined) { b_7.storeBit(true).storeBit(src.int42_bool); } else { b_7.storeBit(false); }
        if (src.int42_cell !== null && src.int42_cell !== undefined) { b_7.storeBit(true).storeRef(src.int42_cell); } else { b_7.storeBit(false); }
        b_7.storeAddress(src.int42_address);
        const b_8 = new Builder();
        if (src.int42_struct !== null && src.int42_struct !== undefined) { b_8.storeBit(true); b_8.store(storeSomeStruct(src.int42_struct)); } else { b_8.storeBit(false); }
        const b_9 = new Builder();
        if (src.int256_varint16 !== null && src.int256_varint16 !== undefined) { b_9.storeBit(true).storeInt(src.int256_varint16, 257); } else { b_9.storeBit(false); }
        if (src.int256_varint32 !== null && src.int256_varint32 !== undefined) { b_9.storeBit(true).storeInt(src.int256_varint32, 257); } else { b_9.storeBit(false); }
        if (src.int256_varuint16 !== null && src.int256_varuint16 !== undefined) { b_9.storeBit(true).storeInt(src.int256_varuint16, 257); } else { b_9.storeBit(false); }
        const b_10 = new Builder();
        if (src.int256_varuint32 !== null && src.int256_varuint32 !== undefined) { b_10.storeBit(true).storeInt(src.int256_varuint32, 257); } else { b_10.storeBit(false); }
        if (src.int256_bool !== null && src.int256_bool !== undefined) { b_10.storeBit(true).storeBit(src.int256_bool); } else { b_10.storeBit(false); }
        if (src.int256_cell !== null && src.int256_cell !== undefined) { b_10.storeBit(true).storeRef(src.int256_cell); } else { b_10.storeBit(false); }
        b_10.storeAddress(src.int256_address);
        const b_11 = new Builder();
        if (src.int256_struct !== null && src.int256_struct !== undefined) { b_11.storeBit(true); b_11.store(storeSomeStruct(src.int256_struct)); } else { b_11.storeBit(false); }
        const b_12 = new Builder();
        if (src.uint8_varint16 !== null && src.uint8_varint16 !== undefined) { b_12.storeBit(true).storeInt(src.uint8_varint16, 257); } else { b_12.storeBit(false); }
        if (src.uint8_varint32 !== null && src.uint8_varint32 !== undefined) { b_12.storeBit(true).storeInt(src.uint8_varint32, 257); } else { b_12.storeBit(false); }
        if (src.uint8_varuint16 !== null && src.uint8_varuint16 !== undefined) { b_12.storeBit(true).storeInt(src.uint8_varuint16, 257); } else { b_12.storeBit(false); }
        const b_13 = new Builder();
        if (src.uint8_varuint32 !== null && src.uint8_varuint32 !== undefined) { b_13.storeBit(true).storeInt(src.uint8_varuint32, 257); } else { b_13.storeBit(false); }
        if (src.uint8_bool !== null && src.uint8_bool !== undefined) { b_13.storeBit(true).storeBit(src.uint8_bool); } else { b_13.storeBit(false); }
        if (src.uint8_cell !== null && src.uint8_cell !== undefined) { b_13.storeBit(true).storeRef(src.uint8_cell); } else { b_13.storeBit(false); }
        b_13.storeAddress(src.uint8_address);
        const b_14 = new Builder();
        if (src.uint8_struct !== null && src.uint8_struct !== undefined) { b_14.storeBit(true); b_14.store(storeSomeStruct(src.uint8_struct)); } else { b_14.storeBit(false); }
        const b_15 = new Builder();
        if (src.uint42_varint16 !== null && src.uint42_varint16 !== undefined) { b_15.storeBit(true).storeInt(src.uint42_varint16, 257); } else { b_15.storeBit(false); }
        if (src.uint42_varint32 !== null && src.uint42_varint32 !== undefined) { b_15.storeBit(true).storeInt(src.uint42_varint32, 257); } else { b_15.storeBit(false); }
        if (src.uint42_varuint16 !== null && src.uint42_varuint16 !== undefined) { b_15.storeBit(true).storeInt(src.uint42_varuint16, 257); } else { b_15.storeBit(false); }
        const b_16 = new Builder();
        if (src.uint42_varuint32 !== null && src.uint42_varuint32 !== undefined) { b_16.storeBit(true).storeInt(src.uint42_varuint32, 257); } else { b_16.storeBit(false); }
        if (src.uint42_bool !== null && src.uint42_bool !== undefined) { b_16.storeBit(true).storeBit(src.uint42_bool); } else { b_16.storeBit(false); }
        if (src.uint42_cell !== null && src.uint42_cell !== undefined) { b_16.storeBit(true).storeRef(src.uint42_cell); } else { b_16.storeBit(false); }
        b_16.storeAddress(src.uint42_address);
        const b_17 = new Builder();
        if (src.uint42_struct !== null && src.uint42_struct !== undefined) { b_17.storeBit(true); b_17.store(storeSomeStruct(src.uint42_struct)); } else { b_17.storeBit(false); }
        const b_18 = new Builder();
        if (src.uint256_varint16 !== null && src.uint256_varint16 !== undefined) { b_18.storeBit(true).storeInt(src.uint256_varint16, 257); } else { b_18.storeBit(false); }
        if (src.uint256_varint32 !== null && src.uint256_varint32 !== undefined) { b_18.storeBit(true).storeInt(src.uint256_varint32, 257); } else { b_18.storeBit(false); }
        if (src.uint256_varuint16 !== null && src.uint256_varuint16 !== undefined) { b_18.storeBit(true).storeInt(src.uint256_varuint16, 257); } else { b_18.storeBit(false); }
        const b_19 = new Builder();
        if (src.uint256_varuint32 !== null && src.uint256_varuint32 !== undefined) { b_19.storeBit(true).storeInt(src.uint256_varuint32, 257); } else { b_19.storeBit(false); }
        if (src.uint256_bool !== null && src.uint256_bool !== undefined) { b_19.storeBit(true).storeBit(src.uint256_bool); } else { b_19.storeBit(false); }
        if (src.uint256_cell !== null && src.uint256_cell !== undefined) { b_19.storeBit(true).storeRef(src.uint256_cell); } else { b_19.storeBit(false); }
        b_19.storeAddress(src.uint256_address);
        const b_20 = new Builder();
        if (src.uint256_struct !== null && src.uint256_struct !== undefined) { b_20.storeBit(true); b_20.store(storeSomeStruct(src.uint256_struct)); } else { b_20.storeBit(false); }
        const b_21 = new Builder();
        if (src.address_varint16 !== null && src.address_varint16 !== undefined) { b_21.storeBit(true).storeInt(src.address_varint16, 257); } else { b_21.storeBit(false); }
        if (src.address_varint32 !== null && src.address_varint32 !== undefined) { b_21.storeBit(true).storeInt(src.address_varint32, 257); } else { b_21.storeBit(false); }
        if (src.address_varuint16 !== null && src.address_varuint16 !== undefined) { b_21.storeBit(true).storeInt(src.address_varuint16, 257); } else { b_21.storeBit(false); }
        const b_22 = new Builder();
        if (src.address_varuint32 !== null && src.address_varuint32 !== undefined) { b_22.storeBit(true).storeInt(src.address_varuint32, 257); } else { b_22.storeBit(false); }
        if (src.address_bool !== null && src.address_bool !== undefined) { b_22.storeBit(true).storeBit(src.address_bool); } else { b_22.storeBit(false); }
        if (src.address_cell !== null && src.address_cell !== undefined) { b_22.storeBit(true).storeRef(src.address_cell); } else { b_22.storeBit(false); }
        b_22.storeAddress(src.address_address);
        const b_23 = new Builder();
        if (src.address_struct !== null && src.address_struct !== undefined) { b_23.storeBit(true); b_23.store(storeSomeStruct(src.address_struct)); } else { b_23.storeBit(false); }
        b_22.storeRef(b_23.endCell());
        b_21.storeRef(b_22.endCell());
        b_20.storeRef(b_21.endCell());
        b_19.storeRef(b_20.endCell());
        b_18.storeRef(b_19.endCell());
        b_17.storeRef(b_18.endCell());
        b_16.storeRef(b_17.endCell());
        b_15.storeRef(b_16.endCell());
        b_14.storeRef(b_15.endCell());
        b_13.storeRef(b_14.endCell());
        b_12.storeRef(b_13.endCell());
        b_11.storeRef(b_12.endCell());
        b_10.storeRef(b_11.endCell());
        b_9.storeRef(b_10.endCell());
        b_8.storeRef(b_9.endCell());
        b_7.storeRef(b_8.endCell());
        b_6.storeRef(b_7.endCell());
        b_5.storeRef(b_6.endCell());
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGetAllMapsResult(slice: Slice) {
    const sc_0 = slice;
    const _int_varint16 = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    const _int_varint32 = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    const _int_varuint16 = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    const sc_1 = sc_0.loadRef().beginParse();
    const _int_varuint32 = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    const _int_bool = sc_1.loadBit() ? sc_1.loadBit() : null;
    const _int_cell = sc_1.loadBit() ? sc_1.loadRef() : null;
    const _int_address = sc_1.loadMaybeAddress();
    const sc_2 = sc_1.loadRef().beginParse();
    const _int_struct = sc_2.loadBit() ? loadSomeStruct(sc_2) : null;
    const sc_3 = sc_2.loadRef().beginParse();
    const _int8_varint16 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _int8_varint32 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _int8_varuint16 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const sc_4 = sc_3.loadRef().beginParse();
    const _int8_varuint32 = sc_4.loadBit() ? sc_4.loadIntBig(257) : null;
    const _int8_bool = sc_4.loadBit() ? sc_4.loadBit() : null;
    const _int8_cell = sc_4.loadBit() ? sc_4.loadRef() : null;
    const _int8_address = sc_4.loadMaybeAddress();
    const sc_5 = sc_4.loadRef().beginParse();
    const _int8_struct = sc_5.loadBit() ? loadSomeStruct(sc_5) : null;
    const sc_6 = sc_5.loadRef().beginParse();
    const _int42_varint16 = sc_6.loadBit() ? sc_6.loadIntBig(257) : null;
    const _int42_varint32 = sc_6.loadBit() ? sc_6.loadIntBig(257) : null;
    const _int42_varuint16 = sc_6.loadBit() ? sc_6.loadIntBig(257) : null;
    const sc_7 = sc_6.loadRef().beginParse();
    const _int42_varuint32 = sc_7.loadBit() ? sc_7.loadIntBig(257) : null;
    const _int42_bool = sc_7.loadBit() ? sc_7.loadBit() : null;
    const _int42_cell = sc_7.loadBit() ? sc_7.loadRef() : null;
    const _int42_address = sc_7.loadMaybeAddress();
    const sc_8 = sc_7.loadRef().beginParse();
    const _int42_struct = sc_8.loadBit() ? loadSomeStruct(sc_8) : null;
    const sc_9 = sc_8.loadRef().beginParse();
    const _int256_varint16 = sc_9.loadBit() ? sc_9.loadIntBig(257) : null;
    const _int256_varint32 = sc_9.loadBit() ? sc_9.loadIntBig(257) : null;
    const _int256_varuint16 = sc_9.loadBit() ? sc_9.loadIntBig(257) : null;
    const sc_10 = sc_9.loadRef().beginParse();
    const _int256_varuint32 = sc_10.loadBit() ? sc_10.loadIntBig(257) : null;
    const _int256_bool = sc_10.loadBit() ? sc_10.loadBit() : null;
    const _int256_cell = sc_10.loadBit() ? sc_10.loadRef() : null;
    const _int256_address = sc_10.loadMaybeAddress();
    const sc_11 = sc_10.loadRef().beginParse();
    const _int256_struct = sc_11.loadBit() ? loadSomeStruct(sc_11) : null;
    const sc_12 = sc_11.loadRef().beginParse();
    const _uint8_varint16 = sc_12.loadBit() ? sc_12.loadIntBig(257) : null;
    const _uint8_varint32 = sc_12.loadBit() ? sc_12.loadIntBig(257) : null;
    const _uint8_varuint16 = sc_12.loadBit() ? sc_12.loadIntBig(257) : null;
    const sc_13 = sc_12.loadRef().beginParse();
    const _uint8_varuint32 = sc_13.loadBit() ? sc_13.loadIntBig(257) : null;
    const _uint8_bool = sc_13.loadBit() ? sc_13.loadBit() : null;
    const _uint8_cell = sc_13.loadBit() ? sc_13.loadRef() : null;
    const _uint8_address = sc_13.loadMaybeAddress();
    const sc_14 = sc_13.loadRef().beginParse();
    const _uint8_struct = sc_14.loadBit() ? loadSomeStruct(sc_14) : null;
    const sc_15 = sc_14.loadRef().beginParse();
    const _uint42_varint16 = sc_15.loadBit() ? sc_15.loadIntBig(257) : null;
    const _uint42_varint32 = sc_15.loadBit() ? sc_15.loadIntBig(257) : null;
    const _uint42_varuint16 = sc_15.loadBit() ? sc_15.loadIntBig(257) : null;
    const sc_16 = sc_15.loadRef().beginParse();
    const _uint42_varuint32 = sc_16.loadBit() ? sc_16.loadIntBig(257) : null;
    const _uint42_bool = sc_16.loadBit() ? sc_16.loadBit() : null;
    const _uint42_cell = sc_16.loadBit() ? sc_16.loadRef() : null;
    const _uint42_address = sc_16.loadMaybeAddress();
    const sc_17 = sc_16.loadRef().beginParse();
    const _uint42_struct = sc_17.loadBit() ? loadSomeStruct(sc_17) : null;
    const sc_18 = sc_17.loadRef().beginParse();
    const _uint256_varint16 = sc_18.loadBit() ? sc_18.loadIntBig(257) : null;
    const _uint256_varint32 = sc_18.loadBit() ? sc_18.loadIntBig(257) : null;
    const _uint256_varuint16 = sc_18.loadBit() ? sc_18.loadIntBig(257) : null;
    const sc_19 = sc_18.loadRef().beginParse();
    const _uint256_varuint32 = sc_19.loadBit() ? sc_19.loadIntBig(257) : null;
    const _uint256_bool = sc_19.loadBit() ? sc_19.loadBit() : null;
    const _uint256_cell = sc_19.loadBit() ? sc_19.loadRef() : null;
    const _uint256_address = sc_19.loadMaybeAddress();
    const sc_20 = sc_19.loadRef().beginParse();
    const _uint256_struct = sc_20.loadBit() ? loadSomeStruct(sc_20) : null;
    const sc_21 = sc_20.loadRef().beginParse();
    const _address_varint16 = sc_21.loadBit() ? sc_21.loadIntBig(257) : null;
    const _address_varint32 = sc_21.loadBit() ? sc_21.loadIntBig(257) : null;
    const _address_varuint16 = sc_21.loadBit() ? sc_21.loadIntBig(257) : null;
    const sc_22 = sc_21.loadRef().beginParse();
    const _address_varuint32 = sc_22.loadBit() ? sc_22.loadIntBig(257) : null;
    const _address_bool = sc_22.loadBit() ? sc_22.loadBit() : null;
    const _address_cell = sc_22.loadBit() ? sc_22.loadRef() : null;
    const _address_address = sc_22.loadMaybeAddress();
    const sc_23 = sc_22.loadRef().beginParse();
    const _address_struct = sc_23.loadBit() ? loadSomeStruct(sc_23) : null;
    return { $$type: 'GetAllMapsResult' as const, int_varint16: _int_varint16, int_varint32: _int_varint32, int_varuint16: _int_varuint16, int_varuint32: _int_varuint32, int_bool: _int_bool, int_cell: _int_cell, int_address: _int_address, int_struct: _int_struct, int8_varint16: _int8_varint16, int8_varint32: _int8_varint32, int8_varuint16: _int8_varuint16, int8_varuint32: _int8_varuint32, int8_bool: _int8_bool, int8_cell: _int8_cell, int8_address: _int8_address, int8_struct: _int8_struct, int42_varint16: _int42_varint16, int42_varint32: _int42_varint32, int42_varuint16: _int42_varuint16, int42_varuint32: _int42_varuint32, int42_bool: _int42_bool, int42_cell: _int42_cell, int42_address: _int42_address, int42_struct: _int42_struct, int256_varint16: _int256_varint16, int256_varint32: _int256_varint32, int256_varuint16: _int256_varuint16, int256_varuint32: _int256_varuint32, int256_bool: _int256_bool, int256_cell: _int256_cell, int256_address: _int256_address, int256_struct: _int256_struct, uint8_varint16: _uint8_varint16, uint8_varint32: _uint8_varint32, uint8_varuint16: _uint8_varuint16, uint8_varuint32: _uint8_varuint32, uint8_bool: _uint8_bool, uint8_cell: _uint8_cell, uint8_address: _uint8_address, uint8_struct: _uint8_struct, uint42_varint16: _uint42_varint16, uint42_varint32: _uint42_varint32, uint42_varuint16: _uint42_varuint16, uint42_varuint32: _uint42_varuint32, uint42_bool: _uint42_bool, uint42_cell: _uint42_cell, uint42_address: _uint42_address, uint42_struct: _uint42_struct, uint256_varint16: _uint256_varint16, uint256_varint32: _uint256_varint32, uint256_varuint16: _uint256_varuint16, uint256_varuint32: _uint256_varuint32, uint256_bool: _uint256_bool, uint256_cell: _uint256_cell, uint256_address: _uint256_address, uint256_struct: _uint256_struct, address_varint16: _address_varint16, address_varint32: _address_varint32, address_varuint16: _address_varuint16, address_varuint32: _address_varuint32, address_bool: _address_bool, address_cell: _address_cell, address_address: _address_address, address_struct: _address_struct };
}

function loadTupleGetAllMapsResult(source: TupleReader) {
    const _int_varint16 = source.readBigNumberOpt();
    const _int_varint32 = source.readBigNumberOpt();
    const _int_varuint16 = source.readBigNumberOpt();
    const _int_varuint32 = source.readBigNumberOpt();
    const _int_bool = source.readBooleanOpt();
    const _int_cell = source.readCellOpt();
    const _int_address = source.readAddressOpt();
    const _int_struct_p = source.readTupleOpt();
    const _int_struct = _int_struct_p ? loadTupleSomeStruct(_int_struct_p) : null;
    const _int8_varint16 = source.readBigNumberOpt();
    const _int8_varint32 = source.readBigNumberOpt();
    const _int8_varuint16 = source.readBigNumberOpt();
    const _int8_varuint32 = source.readBigNumberOpt();
    const _int8_bool = source.readBooleanOpt();
    const _int8_cell = source.readCellOpt();
    source = source.readTuple();
    const _int8_address = source.readAddressOpt();
    const _int8_struct_p = source.readTupleOpt();
    const _int8_struct = _int8_struct_p ? loadTupleSomeStruct(_int8_struct_p) : null;
    const _int42_varint16 = source.readBigNumberOpt();
    const _int42_varint32 = source.readBigNumberOpt();
    const _int42_varuint16 = source.readBigNumberOpt();
    const _int42_varuint32 = source.readBigNumberOpt();
    const _int42_bool = source.readBooleanOpt();
    const _int42_cell = source.readCellOpt();
    const _int42_address = source.readAddressOpt();
    const _int42_struct_p = source.readTupleOpt();
    const _int42_struct = _int42_struct_p ? loadTupleSomeStruct(_int42_struct_p) : null;
    const _int256_varint16 = source.readBigNumberOpt();
    const _int256_varint32 = source.readBigNumberOpt();
    const _int256_varuint16 = source.readBigNumberOpt();
    const _int256_varuint32 = source.readBigNumberOpt();
    source = source.readTuple();
    const _int256_bool = source.readBooleanOpt();
    const _int256_cell = source.readCellOpt();
    const _int256_address = source.readAddressOpt();
    const _int256_struct_p = source.readTupleOpt();
    const _int256_struct = _int256_struct_p ? loadTupleSomeStruct(_int256_struct_p) : null;
    const _uint8_varint16 = source.readBigNumberOpt();
    const _uint8_varint32 = source.readBigNumberOpt();
    const _uint8_varuint16 = source.readBigNumberOpt();
    const _uint8_varuint32 = source.readBigNumberOpt();
    const _uint8_bool = source.readBooleanOpt();
    const _uint8_cell = source.readCellOpt();
    const _uint8_address = source.readAddressOpt();
    const _uint8_struct_p = source.readTupleOpt();
    const _uint8_struct = _uint8_struct_p ? loadTupleSomeStruct(_uint8_struct_p) : null;
    const _uint42_varint16 = source.readBigNumberOpt();
    const _uint42_varint32 = source.readBigNumberOpt();
    source = source.readTuple();
    const _uint42_varuint16 = source.readBigNumberOpt();
    const _uint42_varuint32 = source.readBigNumberOpt();
    const _uint42_bool = source.readBooleanOpt();
    const _uint42_cell = source.readCellOpt();
    const _uint42_address = source.readAddressOpt();
    const _uint42_struct_p = source.readTupleOpt();
    const _uint42_struct = _uint42_struct_p ? loadTupleSomeStruct(_uint42_struct_p) : null;
    const _uint256_varint16 = source.readBigNumberOpt();
    const _uint256_varint32 = source.readBigNumberOpt();
    const _uint256_varuint16 = source.readBigNumberOpt();
    const _uint256_varuint32 = source.readBigNumberOpt();
    const _uint256_bool = source.readBooleanOpt();
    const _uint256_cell = source.readCellOpt();
    const _uint256_address = source.readAddressOpt();
    const _uint256_struct_p = source.readTupleOpt();
    const _uint256_struct = _uint256_struct_p ? loadTupleSomeStruct(_uint256_struct_p) : null;
    source = source.readTuple();
    const _address_varint16 = source.readBigNumberOpt();
    const _address_varint32 = source.readBigNumberOpt();
    const _address_varuint16 = source.readBigNumberOpt();
    const _address_varuint32 = source.readBigNumberOpt();
    const _address_bool = source.readBooleanOpt();
    const _address_cell = source.readCellOpt();
    const _address_address = source.readAddressOpt();
    const _address_struct_p = source.readTupleOpt();
    const _address_struct = _address_struct_p ? loadTupleSomeStruct(_address_struct_p) : null;
    return { $$type: 'GetAllMapsResult' as const, int_varint16: _int_varint16, int_varint32: _int_varint32, int_varuint16: _int_varuint16, int_varuint32: _int_varuint32, int_bool: _int_bool, int_cell: _int_cell, int_address: _int_address, int_struct: _int_struct, int8_varint16: _int8_varint16, int8_varint32: _int8_varint32, int8_varuint16: _int8_varuint16, int8_varuint32: _int8_varuint32, int8_bool: _int8_bool, int8_cell: _int8_cell, int8_address: _int8_address, int8_struct: _int8_struct, int42_varint16: _int42_varint16, int42_varint32: _int42_varint32, int42_varuint16: _int42_varuint16, int42_varuint32: _int42_varuint32, int42_bool: _int42_bool, int42_cell: _int42_cell, int42_address: _int42_address, int42_struct: _int42_struct, int256_varint16: _int256_varint16, int256_varint32: _int256_varint32, int256_varuint16: _int256_varuint16, int256_varuint32: _int256_varuint32, int256_bool: _int256_bool, int256_cell: _int256_cell, int256_address: _int256_address, int256_struct: _int256_struct, uint8_varint16: _uint8_varint16, uint8_varint32: _uint8_varint32, uint8_varuint16: _uint8_varuint16, uint8_varuint32: _uint8_varuint32, uint8_bool: _uint8_bool, uint8_cell: _uint8_cell, uint8_address: _uint8_address, uint8_struct: _uint8_struct, uint42_varint16: _uint42_varint16, uint42_varint32: _uint42_varint32, uint42_varuint16: _uint42_varuint16, uint42_varuint32: _uint42_varuint32, uint42_bool: _uint42_bool, uint42_cell: _uint42_cell, uint42_address: _uint42_address, uint42_struct: _uint42_struct, uint256_varint16: _uint256_varint16, uint256_varint32: _uint256_varint32, uint256_varuint16: _uint256_varuint16, uint256_varuint32: _uint256_varuint32, uint256_bool: _uint256_bool, uint256_cell: _uint256_cell, uint256_address: _uint256_address, uint256_struct: _uint256_struct, address_varint16: _address_varint16, address_varint32: _address_varint32, address_varuint16: _address_varuint16, address_varuint32: _address_varuint32, address_bool: _address_bool, address_cell: _address_cell, address_address: _address_address, address_struct: _address_struct };
}

function loadGetterTupleGetAllMapsResult(source: TupleReader) {
    const _int_varint16 = source.readBigNumberOpt();
    const _int_varint32 = source.readBigNumberOpt();
    const _int_varuint16 = source.readBigNumberOpt();
    const _int_varuint32 = source.readBigNumberOpt();
    const _int_bool = source.readBooleanOpt();
    const _int_cell = source.readCellOpt();
    const _int_address = source.readAddressOpt();
    const _int_struct_p = source.readTupleOpt();
    const _int_struct = _int_struct_p ? loadTupleSomeStruct(_int_struct_p) : null;
    const _int8_varint16 = source.readBigNumberOpt();
    const _int8_varint32 = source.readBigNumberOpt();
    const _int8_varuint16 = source.readBigNumberOpt();
    const _int8_varuint32 = source.readBigNumberOpt();
    const _int8_bool = source.readBooleanOpt();
    const _int8_cell = source.readCellOpt();
    const _int8_address = source.readAddressOpt();
    const _int8_struct_p = source.readTupleOpt();
    const _int8_struct = _int8_struct_p ? loadTupleSomeStruct(_int8_struct_p) : null;
    const _int42_varint16 = source.readBigNumberOpt();
    const _int42_varint32 = source.readBigNumberOpt();
    const _int42_varuint16 = source.readBigNumberOpt();
    const _int42_varuint32 = source.readBigNumberOpt();
    const _int42_bool = source.readBooleanOpt();
    const _int42_cell = source.readCellOpt();
    const _int42_address = source.readAddressOpt();
    const _int42_struct_p = source.readTupleOpt();
    const _int42_struct = _int42_struct_p ? loadTupleSomeStruct(_int42_struct_p) : null;
    const _int256_varint16 = source.readBigNumberOpt();
    const _int256_varint32 = source.readBigNumberOpt();
    const _int256_varuint16 = source.readBigNumberOpt();
    const _int256_varuint32 = source.readBigNumberOpt();
    const _int256_bool = source.readBooleanOpt();
    const _int256_cell = source.readCellOpt();
    const _int256_address = source.readAddressOpt();
    const _int256_struct_p = source.readTupleOpt();
    const _int256_struct = _int256_struct_p ? loadTupleSomeStruct(_int256_struct_p) : null;
    const _uint8_varint16 = source.readBigNumberOpt();
    const _uint8_varint32 = source.readBigNumberOpt();
    const _uint8_varuint16 = source.readBigNumberOpt();
    const _uint8_varuint32 = source.readBigNumberOpt();
    const _uint8_bool = source.readBooleanOpt();
    const _uint8_cell = source.readCellOpt();
    const _uint8_address = source.readAddressOpt();
    const _uint8_struct_p = source.readTupleOpt();
    const _uint8_struct = _uint8_struct_p ? loadTupleSomeStruct(_uint8_struct_p) : null;
    const _uint42_varint16 = source.readBigNumberOpt();
    const _uint42_varint32 = source.readBigNumberOpt();
    const _uint42_varuint16 = source.readBigNumberOpt();
    const _uint42_varuint32 = source.readBigNumberOpt();
    const _uint42_bool = source.readBooleanOpt();
    const _uint42_cell = source.readCellOpt();
    const _uint42_address = source.readAddressOpt();
    const _uint42_struct_p = source.readTupleOpt();
    const _uint42_struct = _uint42_struct_p ? loadTupleSomeStruct(_uint42_struct_p) : null;
    const _uint256_varint16 = source.readBigNumberOpt();
    const _uint256_varint32 = source.readBigNumberOpt();
    const _uint256_varuint16 = source.readBigNumberOpt();
    const _uint256_varuint32 = source.readBigNumberOpt();
    const _uint256_bool = source.readBooleanOpt();
    const _uint256_cell = source.readCellOpt();
    const _uint256_address = source.readAddressOpt();
    const _uint256_struct_p = source.readTupleOpt();
    const _uint256_struct = _uint256_struct_p ? loadTupleSomeStruct(_uint256_struct_p) : null;
    const _address_varint16 = source.readBigNumberOpt();
    const _address_varint32 = source.readBigNumberOpt();
    const _address_varuint16 = source.readBigNumberOpt();
    const _address_varuint32 = source.readBigNumberOpt();
    const _address_bool = source.readBooleanOpt();
    const _address_cell = source.readCellOpt();
    const _address_address = source.readAddressOpt();
    const _address_struct_p = source.readTupleOpt();
    const _address_struct = _address_struct_p ? loadTupleSomeStruct(_address_struct_p) : null;
    return { $$type: 'GetAllMapsResult' as const, int_varint16: _int_varint16, int_varint32: _int_varint32, int_varuint16: _int_varuint16, int_varuint32: _int_varuint32, int_bool: _int_bool, int_cell: _int_cell, int_address: _int_address, int_struct: _int_struct, int8_varint16: _int8_varint16, int8_varint32: _int8_varint32, int8_varuint16: _int8_varuint16, int8_varuint32: _int8_varuint32, int8_bool: _int8_bool, int8_cell: _int8_cell, int8_address: _int8_address, int8_struct: _int8_struct, int42_varint16: _int42_varint16, int42_varint32: _int42_varint32, int42_varuint16: _int42_varuint16, int42_varuint32: _int42_varuint32, int42_bool: _int42_bool, int42_cell: _int42_cell, int42_address: _int42_address, int42_struct: _int42_struct, int256_varint16: _int256_varint16, int256_varint32: _int256_varint32, int256_varuint16: _int256_varuint16, int256_varuint32: _int256_varuint32, int256_bool: _int256_bool, int256_cell: _int256_cell, int256_address: _int256_address, int256_struct: _int256_struct, uint8_varint16: _uint8_varint16, uint8_varint32: _uint8_varint32, uint8_varuint16: _uint8_varuint16, uint8_varuint32: _uint8_varuint32, uint8_bool: _uint8_bool, uint8_cell: _uint8_cell, uint8_address: _uint8_address, uint8_struct: _uint8_struct, uint42_varint16: _uint42_varint16, uint42_varint32: _uint42_varint32, uint42_varuint16: _uint42_varuint16, uint42_varuint32: _uint42_varuint32, uint42_bool: _uint42_bool, uint42_cell: _uint42_cell, uint42_address: _uint42_address, uint42_struct: _uint42_struct, uint256_varint16: _uint256_varint16, uint256_varint32: _uint256_varint32, uint256_varuint16: _uint256_varuint16, uint256_varuint32: _uint256_varuint32, uint256_bool: _uint256_bool, uint256_cell: _uint256_cell, uint256_address: _uint256_address, uint256_struct: _uint256_struct, address_varint16: _address_varint16, address_varint32: _address_varint32, address_varuint16: _address_varuint16, address_varuint32: _address_varuint32, address_bool: _address_bool, address_cell: _address_cell, address_address: _address_address, address_struct: _address_struct };
}

function storeTupleGetAllMapsResult(source: GetAllMapsResult) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.int_varint16);
    builder.writeNumber(source.int_varint32);
    builder.writeNumber(source.int_varuint16);
    builder.writeNumber(source.int_varuint32);
    builder.writeBoolean(source.int_bool);
    builder.writeCell(source.int_cell);
    builder.writeAddress(source.int_address);
    if (source.int_struct !== null && source.int_struct !== undefined) {
        builder.writeTuple(storeTupleSomeStruct(source.int_struct));
    } else {
        builder.writeTuple(null);
    }
    builder.writeNumber(source.int8_varint16);
    builder.writeNumber(source.int8_varint32);
    builder.writeNumber(source.int8_varuint16);
    builder.writeNumber(source.int8_varuint32);
    builder.writeBoolean(source.int8_bool);
    builder.writeCell(source.int8_cell);
    builder.writeAddress(source.int8_address);
    if (source.int8_struct !== null && source.int8_struct !== undefined) {
        builder.writeTuple(storeTupleSomeStruct(source.int8_struct));
    } else {
        builder.writeTuple(null);
    }
    builder.writeNumber(source.int42_varint16);
    builder.writeNumber(source.int42_varint32);
    builder.writeNumber(source.int42_varuint16);
    builder.writeNumber(source.int42_varuint32);
    builder.writeBoolean(source.int42_bool);
    builder.writeCell(source.int42_cell);
    builder.writeAddress(source.int42_address);
    if (source.int42_struct !== null && source.int42_struct !== undefined) {
        builder.writeTuple(storeTupleSomeStruct(source.int42_struct));
    } else {
        builder.writeTuple(null);
    }
    builder.writeNumber(source.int256_varint16);
    builder.writeNumber(source.int256_varint32);
    builder.writeNumber(source.int256_varuint16);
    builder.writeNumber(source.int256_varuint32);
    builder.writeBoolean(source.int256_bool);
    builder.writeCell(source.int256_cell);
    builder.writeAddress(source.int256_address);
    if (source.int256_struct !== null && source.int256_struct !== undefined) {
        builder.writeTuple(storeTupleSomeStruct(source.int256_struct));
    } else {
        builder.writeTuple(null);
    }
    builder.writeNumber(source.uint8_varint16);
    builder.writeNumber(source.uint8_varint32);
    builder.writeNumber(source.uint8_varuint16);
    builder.writeNumber(source.uint8_varuint32);
    builder.writeBoolean(source.uint8_bool);
    builder.writeCell(source.uint8_cell);
    builder.writeAddress(source.uint8_address);
    if (source.uint8_struct !== null && source.uint8_struct !== undefined) {
        builder.writeTuple(storeTupleSomeStruct(source.uint8_struct));
    } else {
        builder.writeTuple(null);
    }
    builder.writeNumber(source.uint42_varint16);
    builder.writeNumber(source.uint42_varint32);
    builder.writeNumber(source.uint42_varuint16);
    builder.writeNumber(source.uint42_varuint32);
    builder.writeBoolean(source.uint42_bool);
    builder.writeCell(source.uint42_cell);
    builder.writeAddress(source.uint42_address);
    if (source.uint42_struct !== null && source.uint42_struct !== undefined) {
        builder.writeTuple(storeTupleSomeStruct(source.uint42_struct));
    } else {
        builder.writeTuple(null);
    }
    builder.writeNumber(source.uint256_varint16);
    builder.writeNumber(source.uint256_varint32);
    builder.writeNumber(source.uint256_varuint16);
    builder.writeNumber(source.uint256_varuint32);
    builder.writeBoolean(source.uint256_bool);
    builder.writeCell(source.uint256_cell);
    builder.writeAddress(source.uint256_address);
    if (source.uint256_struct !== null && source.uint256_struct !== undefined) {
        builder.writeTuple(storeTupleSomeStruct(source.uint256_struct));
    } else {
        builder.writeTuple(null);
    }
    builder.writeNumber(source.address_varint16);
    builder.writeNumber(source.address_varint32);
    builder.writeNumber(source.address_varuint16);
    builder.writeNumber(source.address_varuint32);
    builder.writeBoolean(source.address_bool);
    builder.writeCell(source.address_cell);
    builder.writeAddress(source.address_address);
    if (source.address_struct !== null && source.address_struct !== undefined) {
        builder.writeTuple(storeTupleSomeStruct(source.address_struct));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserGetAllMapsResult(): DictionaryValue<GetAllMapsResult> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetAllMapsResult(src)).endCell());
        },
        parse: (src) => {
            return loadGetAllMapsResult(src.loadRef().beginParse());
        }
    }
}

export type ReplaceAllMapsResult = {
    $$type: 'ReplaceAllMapsResult';
    int_varint16: boolean;
    int_varint32: boolean;
    int_varuint16: boolean;
    int_varuint32: boolean;
    int_bool: boolean;
    int_cell: boolean;
    int_address: boolean;
    int_struct: boolean;
    int8_varint16: boolean;
    int8_varint32: boolean;
    int8_varuint16: boolean;
    int8_varuint32: boolean;
    int8_bool: boolean;
    int8_cell: boolean;
    int8_address: boolean;
    int8_struct: boolean;
    int42_varint16: boolean;
    int42_varint32: boolean;
    int42_varuint16: boolean;
    int42_varuint32: boolean;
    int42_bool: boolean;
    int42_cell: boolean;
    int42_address: boolean;
    int42_struct: boolean;
    int256_varint16: boolean;
    int256_varint32: boolean;
    int256_varuint16: boolean;
    int256_varuint32: boolean;
    int256_bool: boolean;
    int256_cell: boolean;
    int256_address: boolean;
    int256_struct: boolean;
    uint8_varint16: boolean;
    uint8_varint32: boolean;
    uint8_varuint16: boolean;
    uint8_varuint32: boolean;
    uint8_bool: boolean;
    uint8_cell: boolean;
    uint8_address: boolean;
    uint8_struct: boolean;
    uint42_varint16: boolean;
    uint42_varint32: boolean;
    uint42_varuint16: boolean;
    uint42_varuint32: boolean;
    uint42_bool: boolean;
    uint42_cell: boolean;
    uint42_address: boolean;
    uint42_struct: boolean;
    uint256_varint16: boolean;
    uint256_varint32: boolean;
    uint256_varuint16: boolean;
    uint256_varuint32: boolean;
    uint256_bool: boolean;
    uint256_cell: boolean;
    uint256_address: boolean;
    uint256_struct: boolean;
    address_varint16: boolean;
    address_varint32: boolean;
    address_varuint16: boolean;
    address_varuint32: boolean;
    address_bool: boolean;
    address_cell: boolean;
    address_address: boolean;
    address_struct: boolean;
}

export function storeReplaceAllMapsResult(src: ReplaceAllMapsResult) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.int_varint16);
        b_0.storeBit(src.int_varint32);
        b_0.storeBit(src.int_varuint16);
        b_0.storeBit(src.int_varuint32);
        b_0.storeBit(src.int_bool);
        b_0.storeBit(src.int_cell);
        b_0.storeBit(src.int_address);
        b_0.storeBit(src.int_struct);
        b_0.storeBit(src.int8_varint16);
        b_0.storeBit(src.int8_varint32);
        b_0.storeBit(src.int8_varuint16);
        b_0.storeBit(src.int8_varuint32);
        b_0.storeBit(src.int8_bool);
        b_0.storeBit(src.int8_cell);
        b_0.storeBit(src.int8_address);
        b_0.storeBit(src.int8_struct);
        b_0.storeBit(src.int42_varint16);
        b_0.storeBit(src.int42_varint32);
        b_0.storeBit(src.int42_varuint16);
        b_0.storeBit(src.int42_varuint32);
        b_0.storeBit(src.int42_bool);
        b_0.storeBit(src.int42_cell);
        b_0.storeBit(src.int42_address);
        b_0.storeBit(src.int42_struct);
        b_0.storeBit(src.int256_varint16);
        b_0.storeBit(src.int256_varint32);
        b_0.storeBit(src.int256_varuint16);
        b_0.storeBit(src.int256_varuint32);
        b_0.storeBit(src.int256_bool);
        b_0.storeBit(src.int256_cell);
        b_0.storeBit(src.int256_address);
        b_0.storeBit(src.int256_struct);
        b_0.storeBit(src.uint8_varint16);
        b_0.storeBit(src.uint8_varint32);
        b_0.storeBit(src.uint8_varuint16);
        b_0.storeBit(src.uint8_varuint32);
        b_0.storeBit(src.uint8_bool);
        b_0.storeBit(src.uint8_cell);
        b_0.storeBit(src.uint8_address);
        b_0.storeBit(src.uint8_struct);
        b_0.storeBit(src.uint42_varint16);
        b_0.storeBit(src.uint42_varint32);
        b_0.storeBit(src.uint42_varuint16);
        b_0.storeBit(src.uint42_varuint32);
        b_0.storeBit(src.uint42_bool);
        b_0.storeBit(src.uint42_cell);
        b_0.storeBit(src.uint42_address);
        b_0.storeBit(src.uint42_struct);
        b_0.storeBit(src.uint256_varint16);
        b_0.storeBit(src.uint256_varint32);
        b_0.storeBit(src.uint256_varuint16);
        b_0.storeBit(src.uint256_varuint32);
        b_0.storeBit(src.uint256_bool);
        b_0.storeBit(src.uint256_cell);
        b_0.storeBit(src.uint256_address);
        b_0.storeBit(src.uint256_struct);
        b_0.storeBit(src.address_varint16);
        b_0.storeBit(src.address_varint32);
        b_0.storeBit(src.address_varuint16);
        b_0.storeBit(src.address_varuint32);
        b_0.storeBit(src.address_bool);
        b_0.storeBit(src.address_cell);
        b_0.storeBit(src.address_address);
        b_0.storeBit(src.address_struct);
    };
}

export function loadReplaceAllMapsResult(slice: Slice) {
    const sc_0 = slice;
    const _int_varint16 = sc_0.loadBit();
    const _int_varint32 = sc_0.loadBit();
    const _int_varuint16 = sc_0.loadBit();
    const _int_varuint32 = sc_0.loadBit();
    const _int_bool = sc_0.loadBit();
    const _int_cell = sc_0.loadBit();
    const _int_address = sc_0.loadBit();
    const _int_struct = sc_0.loadBit();
    const _int8_varint16 = sc_0.loadBit();
    const _int8_varint32 = sc_0.loadBit();
    const _int8_varuint16 = sc_0.loadBit();
    const _int8_varuint32 = sc_0.loadBit();
    const _int8_bool = sc_0.loadBit();
    const _int8_cell = sc_0.loadBit();
    const _int8_address = sc_0.loadBit();
    const _int8_struct = sc_0.loadBit();
    const _int42_varint16 = sc_0.loadBit();
    const _int42_varint32 = sc_0.loadBit();
    const _int42_varuint16 = sc_0.loadBit();
    const _int42_varuint32 = sc_0.loadBit();
    const _int42_bool = sc_0.loadBit();
    const _int42_cell = sc_0.loadBit();
    const _int42_address = sc_0.loadBit();
    const _int42_struct = sc_0.loadBit();
    const _int256_varint16 = sc_0.loadBit();
    const _int256_varint32 = sc_0.loadBit();
    const _int256_varuint16 = sc_0.loadBit();
    const _int256_varuint32 = sc_0.loadBit();
    const _int256_bool = sc_0.loadBit();
    const _int256_cell = sc_0.loadBit();
    const _int256_address = sc_0.loadBit();
    const _int256_struct = sc_0.loadBit();
    const _uint8_varint16 = sc_0.loadBit();
    const _uint8_varint32 = sc_0.loadBit();
    const _uint8_varuint16 = sc_0.loadBit();
    const _uint8_varuint32 = sc_0.loadBit();
    const _uint8_bool = sc_0.loadBit();
    const _uint8_cell = sc_0.loadBit();
    const _uint8_address = sc_0.loadBit();
    const _uint8_struct = sc_0.loadBit();
    const _uint42_varint16 = sc_0.loadBit();
    const _uint42_varint32 = sc_0.loadBit();
    const _uint42_varuint16 = sc_0.loadBit();
    const _uint42_varuint32 = sc_0.loadBit();
    const _uint42_bool = sc_0.loadBit();
    const _uint42_cell = sc_0.loadBit();
    const _uint42_address = sc_0.loadBit();
    const _uint42_struct = sc_0.loadBit();
    const _uint256_varint16 = sc_0.loadBit();
    const _uint256_varint32 = sc_0.loadBit();
    const _uint256_varuint16 = sc_0.loadBit();
    const _uint256_varuint32 = sc_0.loadBit();
    const _uint256_bool = sc_0.loadBit();
    const _uint256_cell = sc_0.loadBit();
    const _uint256_address = sc_0.loadBit();
    const _uint256_struct = sc_0.loadBit();
    const _address_varint16 = sc_0.loadBit();
    const _address_varint32 = sc_0.loadBit();
    const _address_varuint16 = sc_0.loadBit();
    const _address_varuint32 = sc_0.loadBit();
    const _address_bool = sc_0.loadBit();
    const _address_cell = sc_0.loadBit();
    const _address_address = sc_0.loadBit();
    const _address_struct = sc_0.loadBit();
    return { $$type: 'ReplaceAllMapsResult' as const, int_varint16: _int_varint16, int_varint32: _int_varint32, int_varuint16: _int_varuint16, int_varuint32: _int_varuint32, int_bool: _int_bool, int_cell: _int_cell, int_address: _int_address, int_struct: _int_struct, int8_varint16: _int8_varint16, int8_varint32: _int8_varint32, int8_varuint16: _int8_varuint16, int8_varuint32: _int8_varuint32, int8_bool: _int8_bool, int8_cell: _int8_cell, int8_address: _int8_address, int8_struct: _int8_struct, int42_varint16: _int42_varint16, int42_varint32: _int42_varint32, int42_varuint16: _int42_varuint16, int42_varuint32: _int42_varuint32, int42_bool: _int42_bool, int42_cell: _int42_cell, int42_address: _int42_address, int42_struct: _int42_struct, int256_varint16: _int256_varint16, int256_varint32: _int256_varint32, int256_varuint16: _int256_varuint16, int256_varuint32: _int256_varuint32, int256_bool: _int256_bool, int256_cell: _int256_cell, int256_address: _int256_address, int256_struct: _int256_struct, uint8_varint16: _uint8_varint16, uint8_varint32: _uint8_varint32, uint8_varuint16: _uint8_varuint16, uint8_varuint32: _uint8_varuint32, uint8_bool: _uint8_bool, uint8_cell: _uint8_cell, uint8_address: _uint8_address, uint8_struct: _uint8_struct, uint42_varint16: _uint42_varint16, uint42_varint32: _uint42_varint32, uint42_varuint16: _uint42_varuint16, uint42_varuint32: _uint42_varuint32, uint42_bool: _uint42_bool, uint42_cell: _uint42_cell, uint42_address: _uint42_address, uint42_struct: _uint42_struct, uint256_varint16: _uint256_varint16, uint256_varint32: _uint256_varint32, uint256_varuint16: _uint256_varuint16, uint256_varuint32: _uint256_varuint32, uint256_bool: _uint256_bool, uint256_cell: _uint256_cell, uint256_address: _uint256_address, uint256_struct: _uint256_struct, address_varint16: _address_varint16, address_varint32: _address_varint32, address_varuint16: _address_varuint16, address_varuint32: _address_varuint32, address_bool: _address_bool, address_cell: _address_cell, address_address: _address_address, address_struct: _address_struct };
}

function loadTupleReplaceAllMapsResult(source: TupleReader) {
    const _int_varint16 = source.readBoolean();
    const _int_varint32 = source.readBoolean();
    const _int_varuint16 = source.readBoolean();
    const _int_varuint32 = source.readBoolean();
    const _int_bool = source.readBoolean();
    const _int_cell = source.readBoolean();
    const _int_address = source.readBoolean();
    const _int_struct = source.readBoolean();
    const _int8_varint16 = source.readBoolean();
    const _int8_varint32 = source.readBoolean();
    const _int8_varuint16 = source.readBoolean();
    const _int8_varuint32 = source.readBoolean();
    const _int8_bool = source.readBoolean();
    const _int8_cell = source.readBoolean();
    source = source.readTuple();
    const _int8_address = source.readBoolean();
    const _int8_struct = source.readBoolean();
    const _int42_varint16 = source.readBoolean();
    const _int42_varint32 = source.readBoolean();
    const _int42_varuint16 = source.readBoolean();
    const _int42_varuint32 = source.readBoolean();
    const _int42_bool = source.readBoolean();
    const _int42_cell = source.readBoolean();
    const _int42_address = source.readBoolean();
    const _int42_struct = source.readBoolean();
    const _int256_varint16 = source.readBoolean();
    const _int256_varint32 = source.readBoolean();
    const _int256_varuint16 = source.readBoolean();
    const _int256_varuint32 = source.readBoolean();
    source = source.readTuple();
    const _int256_bool = source.readBoolean();
    const _int256_cell = source.readBoolean();
    const _int256_address = source.readBoolean();
    const _int256_struct = source.readBoolean();
    const _uint8_varint16 = source.readBoolean();
    const _uint8_varint32 = source.readBoolean();
    const _uint8_varuint16 = source.readBoolean();
    const _uint8_varuint32 = source.readBoolean();
    const _uint8_bool = source.readBoolean();
    const _uint8_cell = source.readBoolean();
    const _uint8_address = source.readBoolean();
    const _uint8_struct = source.readBoolean();
    const _uint42_varint16 = source.readBoolean();
    const _uint42_varint32 = source.readBoolean();
    source = source.readTuple();
    const _uint42_varuint16 = source.readBoolean();
    const _uint42_varuint32 = source.readBoolean();
    const _uint42_bool = source.readBoolean();
    const _uint42_cell = source.readBoolean();
    const _uint42_address = source.readBoolean();
    const _uint42_struct = source.readBoolean();
    const _uint256_varint16 = source.readBoolean();
    const _uint256_varint32 = source.readBoolean();
    const _uint256_varuint16 = source.readBoolean();
    const _uint256_varuint32 = source.readBoolean();
    const _uint256_bool = source.readBoolean();
    const _uint256_cell = source.readBoolean();
    const _uint256_address = source.readBoolean();
    const _uint256_struct = source.readBoolean();
    source = source.readTuple();
    const _address_varint16 = source.readBoolean();
    const _address_varint32 = source.readBoolean();
    const _address_varuint16 = source.readBoolean();
    const _address_varuint32 = source.readBoolean();
    const _address_bool = source.readBoolean();
    const _address_cell = source.readBoolean();
    const _address_address = source.readBoolean();
    const _address_struct = source.readBoolean();
    return { $$type: 'ReplaceAllMapsResult' as const, int_varint16: _int_varint16, int_varint32: _int_varint32, int_varuint16: _int_varuint16, int_varuint32: _int_varuint32, int_bool: _int_bool, int_cell: _int_cell, int_address: _int_address, int_struct: _int_struct, int8_varint16: _int8_varint16, int8_varint32: _int8_varint32, int8_varuint16: _int8_varuint16, int8_varuint32: _int8_varuint32, int8_bool: _int8_bool, int8_cell: _int8_cell, int8_address: _int8_address, int8_struct: _int8_struct, int42_varint16: _int42_varint16, int42_varint32: _int42_varint32, int42_varuint16: _int42_varuint16, int42_varuint32: _int42_varuint32, int42_bool: _int42_bool, int42_cell: _int42_cell, int42_address: _int42_address, int42_struct: _int42_struct, int256_varint16: _int256_varint16, int256_varint32: _int256_varint32, int256_varuint16: _int256_varuint16, int256_varuint32: _int256_varuint32, int256_bool: _int256_bool, int256_cell: _int256_cell, int256_address: _int256_address, int256_struct: _int256_struct, uint8_varint16: _uint8_varint16, uint8_varint32: _uint8_varint32, uint8_varuint16: _uint8_varuint16, uint8_varuint32: _uint8_varuint32, uint8_bool: _uint8_bool, uint8_cell: _uint8_cell, uint8_address: _uint8_address, uint8_struct: _uint8_struct, uint42_varint16: _uint42_varint16, uint42_varint32: _uint42_varint32, uint42_varuint16: _uint42_varuint16, uint42_varuint32: _uint42_varuint32, uint42_bool: _uint42_bool, uint42_cell: _uint42_cell, uint42_address: _uint42_address, uint42_struct: _uint42_struct, uint256_varint16: _uint256_varint16, uint256_varint32: _uint256_varint32, uint256_varuint16: _uint256_varuint16, uint256_varuint32: _uint256_varuint32, uint256_bool: _uint256_bool, uint256_cell: _uint256_cell, uint256_address: _uint256_address, uint256_struct: _uint256_struct, address_varint16: _address_varint16, address_varint32: _address_varint32, address_varuint16: _address_varuint16, address_varuint32: _address_varuint32, address_bool: _address_bool, address_cell: _address_cell, address_address: _address_address, address_struct: _address_struct };
}

function loadGetterTupleReplaceAllMapsResult(source: TupleReader) {
    const _int_varint16 = source.readBoolean();
    const _int_varint32 = source.readBoolean();
    const _int_varuint16 = source.readBoolean();
    const _int_varuint32 = source.readBoolean();
    const _int_bool = source.readBoolean();
    const _int_cell = source.readBoolean();
    const _int_address = source.readBoolean();
    const _int_struct = source.readBoolean();
    const _int8_varint16 = source.readBoolean();
    const _int8_varint32 = source.readBoolean();
    const _int8_varuint16 = source.readBoolean();
    const _int8_varuint32 = source.readBoolean();
    const _int8_bool = source.readBoolean();
    const _int8_cell = source.readBoolean();
    const _int8_address = source.readBoolean();
    const _int8_struct = source.readBoolean();
    const _int42_varint16 = source.readBoolean();
    const _int42_varint32 = source.readBoolean();
    const _int42_varuint16 = source.readBoolean();
    const _int42_varuint32 = source.readBoolean();
    const _int42_bool = source.readBoolean();
    const _int42_cell = source.readBoolean();
    const _int42_address = source.readBoolean();
    const _int42_struct = source.readBoolean();
    const _int256_varint16 = source.readBoolean();
    const _int256_varint32 = source.readBoolean();
    const _int256_varuint16 = source.readBoolean();
    const _int256_varuint32 = source.readBoolean();
    const _int256_bool = source.readBoolean();
    const _int256_cell = source.readBoolean();
    const _int256_address = source.readBoolean();
    const _int256_struct = source.readBoolean();
    const _uint8_varint16 = source.readBoolean();
    const _uint8_varint32 = source.readBoolean();
    const _uint8_varuint16 = source.readBoolean();
    const _uint8_varuint32 = source.readBoolean();
    const _uint8_bool = source.readBoolean();
    const _uint8_cell = source.readBoolean();
    const _uint8_address = source.readBoolean();
    const _uint8_struct = source.readBoolean();
    const _uint42_varint16 = source.readBoolean();
    const _uint42_varint32 = source.readBoolean();
    const _uint42_varuint16 = source.readBoolean();
    const _uint42_varuint32 = source.readBoolean();
    const _uint42_bool = source.readBoolean();
    const _uint42_cell = source.readBoolean();
    const _uint42_address = source.readBoolean();
    const _uint42_struct = source.readBoolean();
    const _uint256_varint16 = source.readBoolean();
    const _uint256_varint32 = source.readBoolean();
    const _uint256_varuint16 = source.readBoolean();
    const _uint256_varuint32 = source.readBoolean();
    const _uint256_bool = source.readBoolean();
    const _uint256_cell = source.readBoolean();
    const _uint256_address = source.readBoolean();
    const _uint256_struct = source.readBoolean();
    const _address_varint16 = source.readBoolean();
    const _address_varint32 = source.readBoolean();
    const _address_varuint16 = source.readBoolean();
    const _address_varuint32 = source.readBoolean();
    const _address_bool = source.readBoolean();
    const _address_cell = source.readBoolean();
    const _address_address = source.readBoolean();
    const _address_struct = source.readBoolean();
    return { $$type: 'ReplaceAllMapsResult' as const, int_varint16: _int_varint16, int_varint32: _int_varint32, int_varuint16: _int_varuint16, int_varuint32: _int_varuint32, int_bool: _int_bool, int_cell: _int_cell, int_address: _int_address, int_struct: _int_struct, int8_varint16: _int8_varint16, int8_varint32: _int8_varint32, int8_varuint16: _int8_varuint16, int8_varuint32: _int8_varuint32, int8_bool: _int8_bool, int8_cell: _int8_cell, int8_address: _int8_address, int8_struct: _int8_struct, int42_varint16: _int42_varint16, int42_varint32: _int42_varint32, int42_varuint16: _int42_varuint16, int42_varuint32: _int42_varuint32, int42_bool: _int42_bool, int42_cell: _int42_cell, int42_address: _int42_address, int42_struct: _int42_struct, int256_varint16: _int256_varint16, int256_varint32: _int256_varint32, int256_varuint16: _int256_varuint16, int256_varuint32: _int256_varuint32, int256_bool: _int256_bool, int256_cell: _int256_cell, int256_address: _int256_address, int256_struct: _int256_struct, uint8_varint16: _uint8_varint16, uint8_varint32: _uint8_varint32, uint8_varuint16: _uint8_varuint16, uint8_varuint32: _uint8_varuint32, uint8_bool: _uint8_bool, uint8_cell: _uint8_cell, uint8_address: _uint8_address, uint8_struct: _uint8_struct, uint42_varint16: _uint42_varint16, uint42_varint32: _uint42_varint32, uint42_varuint16: _uint42_varuint16, uint42_varuint32: _uint42_varuint32, uint42_bool: _uint42_bool, uint42_cell: _uint42_cell, uint42_address: _uint42_address, uint42_struct: _uint42_struct, uint256_varint16: _uint256_varint16, uint256_varint32: _uint256_varint32, uint256_varuint16: _uint256_varuint16, uint256_varuint32: _uint256_varuint32, uint256_bool: _uint256_bool, uint256_cell: _uint256_cell, uint256_address: _uint256_address, uint256_struct: _uint256_struct, address_varint16: _address_varint16, address_varint32: _address_varint32, address_varuint16: _address_varuint16, address_varuint32: _address_varuint32, address_bool: _address_bool, address_cell: _address_cell, address_address: _address_address, address_struct: _address_struct };
}

function storeTupleReplaceAllMapsResult(source: ReplaceAllMapsResult) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.int_varint16);
    builder.writeBoolean(source.int_varint32);
    builder.writeBoolean(source.int_varuint16);
    builder.writeBoolean(source.int_varuint32);
    builder.writeBoolean(source.int_bool);
    builder.writeBoolean(source.int_cell);
    builder.writeBoolean(source.int_address);
    builder.writeBoolean(source.int_struct);
    builder.writeBoolean(source.int8_varint16);
    builder.writeBoolean(source.int8_varint32);
    builder.writeBoolean(source.int8_varuint16);
    builder.writeBoolean(source.int8_varuint32);
    builder.writeBoolean(source.int8_bool);
    builder.writeBoolean(source.int8_cell);
    builder.writeBoolean(source.int8_address);
    builder.writeBoolean(source.int8_struct);
    builder.writeBoolean(source.int42_varint16);
    builder.writeBoolean(source.int42_varint32);
    builder.writeBoolean(source.int42_varuint16);
    builder.writeBoolean(source.int42_varuint32);
    builder.writeBoolean(source.int42_bool);
    builder.writeBoolean(source.int42_cell);
    builder.writeBoolean(source.int42_address);
    builder.writeBoolean(source.int42_struct);
    builder.writeBoolean(source.int256_varint16);
    builder.writeBoolean(source.int256_varint32);
    builder.writeBoolean(source.int256_varuint16);
    builder.writeBoolean(source.int256_varuint32);
    builder.writeBoolean(source.int256_bool);
    builder.writeBoolean(source.int256_cell);
    builder.writeBoolean(source.int256_address);
    builder.writeBoolean(source.int256_struct);
    builder.writeBoolean(source.uint8_varint16);
    builder.writeBoolean(source.uint8_varint32);
    builder.writeBoolean(source.uint8_varuint16);
    builder.writeBoolean(source.uint8_varuint32);
    builder.writeBoolean(source.uint8_bool);
    builder.writeBoolean(source.uint8_cell);
    builder.writeBoolean(source.uint8_address);
    builder.writeBoolean(source.uint8_struct);
    builder.writeBoolean(source.uint42_varint16);
    builder.writeBoolean(source.uint42_varint32);
    builder.writeBoolean(source.uint42_varuint16);
    builder.writeBoolean(source.uint42_varuint32);
    builder.writeBoolean(source.uint42_bool);
    builder.writeBoolean(source.uint42_cell);
    builder.writeBoolean(source.uint42_address);
    builder.writeBoolean(source.uint42_struct);
    builder.writeBoolean(source.uint256_varint16);
    builder.writeBoolean(source.uint256_varint32);
    builder.writeBoolean(source.uint256_varuint16);
    builder.writeBoolean(source.uint256_varuint32);
    builder.writeBoolean(source.uint256_bool);
    builder.writeBoolean(source.uint256_cell);
    builder.writeBoolean(source.uint256_address);
    builder.writeBoolean(source.uint256_struct);
    builder.writeBoolean(source.address_varint16);
    builder.writeBoolean(source.address_varint32);
    builder.writeBoolean(source.address_varuint16);
    builder.writeBoolean(source.address_varuint32);
    builder.writeBoolean(source.address_bool);
    builder.writeBoolean(source.address_cell);
    builder.writeBoolean(source.address_address);
    builder.writeBoolean(source.address_struct);
    return builder.build();
}

function dictValueParserReplaceAllMapsResult(): DictionaryValue<ReplaceAllMapsResult> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReplaceAllMapsResult(src)).endCell());
        },
        parse: (src) => {
            return loadReplaceAllMapsResult(src.loadRef().beginParse());
        }
    }
}

export type ReplaceGetAllMapsResult = {
    $$type: 'ReplaceGetAllMapsResult';
    int_varint16: bigint | null;
    int_varint32: bigint | null;
    int_varuint16: bigint | null;
    int_varuint32: bigint | null;
    int_bool: boolean | null;
    int_cell: Cell | null;
    int_address: Address | null;
    int_struct: SomeStruct | null;
    int8_varint16: bigint | null;
    int8_varint32: bigint | null;
    int8_varuint16: bigint | null;
    int8_varuint32: bigint | null;
    int8_bool: boolean | null;
    int8_cell: Cell | null;
    int8_address: Address | null;
    int8_struct: SomeStruct | null;
    int42_varint16: bigint | null;
    int42_varint32: bigint | null;
    int42_varuint16: bigint | null;
    int42_varuint32: bigint | null;
    int42_bool: boolean | null;
    int42_cell: Cell | null;
    int42_address: Address | null;
    int42_struct: SomeStruct | null;
    int256_varint16: bigint | null;
    int256_varint32: bigint | null;
    int256_varuint16: bigint | null;
    int256_varuint32: bigint | null;
    int256_bool: boolean | null;
    int256_cell: Cell | null;
    int256_address: Address | null;
    int256_struct: SomeStruct | null;
    uint8_varint16: bigint | null;
    uint8_varint32: bigint | null;
    uint8_varuint16: bigint | null;
    uint8_varuint32: bigint | null;
    uint8_bool: boolean | null;
    uint8_cell: Cell | null;
    uint8_address: Address | null;
    uint8_struct: SomeStruct | null;
    uint42_varint16: bigint | null;
    uint42_varint32: bigint | null;
    uint42_varuint16: bigint | null;
    uint42_varuint32: bigint | null;
    uint42_bool: boolean | null;
    uint42_cell: Cell | null;
    uint42_address: Address | null;
    uint42_struct: SomeStruct | null;
    uint256_varint16: bigint | null;
    uint256_varint32: bigint | null;
    uint256_varuint16: bigint | null;
    uint256_varuint32: bigint | null;
    uint256_bool: boolean | null;
    uint256_cell: Cell | null;
    uint256_address: Address | null;
    uint256_struct: SomeStruct | null;
    address_varint16: bigint | null;
    address_varint32: bigint | null;
    address_varuint16: bigint | null;
    address_varuint32: bigint | null;
    address_bool: boolean | null;
    address_cell: Cell | null;
    address_address: Address | null;
    address_struct: SomeStruct | null;
}

export function storeReplaceGetAllMapsResult(src: ReplaceGetAllMapsResult) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.int_varint16 !== null && src.int_varint16 !== undefined) { b_0.storeBit(true).storeInt(src.int_varint16, 257); } else { b_0.storeBit(false); }
        if (src.int_varint32 !== null && src.int_varint32 !== undefined) { b_0.storeBit(true).storeInt(src.int_varint32, 257); } else { b_0.storeBit(false); }
        if (src.int_varuint16 !== null && src.int_varuint16 !== undefined) { b_0.storeBit(true).storeInt(src.int_varuint16, 257); } else { b_0.storeBit(false); }
        const b_1 = new Builder();
        if (src.int_varuint32 !== null && src.int_varuint32 !== undefined) { b_1.storeBit(true).storeInt(src.int_varuint32, 257); } else { b_1.storeBit(false); }
        if (src.int_bool !== null && src.int_bool !== undefined) { b_1.storeBit(true).storeBit(src.int_bool); } else { b_1.storeBit(false); }
        if (src.int_cell !== null && src.int_cell !== undefined) { b_1.storeBit(true).storeRef(src.int_cell); } else { b_1.storeBit(false); }
        b_1.storeAddress(src.int_address);
        const b_2 = new Builder();
        if (src.int_struct !== null && src.int_struct !== undefined) { b_2.storeBit(true); b_2.store(storeSomeStruct(src.int_struct)); } else { b_2.storeBit(false); }
        const b_3 = new Builder();
        if (src.int8_varint16 !== null && src.int8_varint16 !== undefined) { b_3.storeBit(true).storeInt(src.int8_varint16, 257); } else { b_3.storeBit(false); }
        if (src.int8_varint32 !== null && src.int8_varint32 !== undefined) { b_3.storeBit(true).storeInt(src.int8_varint32, 257); } else { b_3.storeBit(false); }
        if (src.int8_varuint16 !== null && src.int8_varuint16 !== undefined) { b_3.storeBit(true).storeInt(src.int8_varuint16, 257); } else { b_3.storeBit(false); }
        const b_4 = new Builder();
        if (src.int8_varuint32 !== null && src.int8_varuint32 !== undefined) { b_4.storeBit(true).storeInt(src.int8_varuint32, 257); } else { b_4.storeBit(false); }
        if (src.int8_bool !== null && src.int8_bool !== undefined) { b_4.storeBit(true).storeBit(src.int8_bool); } else { b_4.storeBit(false); }
        if (src.int8_cell !== null && src.int8_cell !== undefined) { b_4.storeBit(true).storeRef(src.int8_cell); } else { b_4.storeBit(false); }
        b_4.storeAddress(src.int8_address);
        const b_5 = new Builder();
        if (src.int8_struct !== null && src.int8_struct !== undefined) { b_5.storeBit(true); b_5.store(storeSomeStruct(src.int8_struct)); } else { b_5.storeBit(false); }
        const b_6 = new Builder();
        if (src.int42_varint16 !== null && src.int42_varint16 !== undefined) { b_6.storeBit(true).storeInt(src.int42_varint16, 257); } else { b_6.storeBit(false); }
        if (src.int42_varint32 !== null && src.int42_varint32 !== undefined) { b_6.storeBit(true).storeInt(src.int42_varint32, 257); } else { b_6.storeBit(false); }
        if (src.int42_varuint16 !== null && src.int42_varuint16 !== undefined) { b_6.storeBit(true).storeInt(src.int42_varuint16, 257); } else { b_6.storeBit(false); }
        const b_7 = new Builder();
        if (src.int42_varuint32 !== null && src.int42_varuint32 !== undefined) { b_7.storeBit(true).storeInt(src.int42_varuint32, 257); } else { b_7.storeBit(false); }
        if (src.int42_bool !== null && src.int42_bool !== undefined) { b_7.storeBit(true).storeBit(src.int42_bool); } else { b_7.storeBit(false); }
        if (src.int42_cell !== null && src.int42_cell !== undefined) { b_7.storeBit(true).storeRef(src.int42_cell); } else { b_7.storeBit(false); }
        b_7.storeAddress(src.int42_address);
        const b_8 = new Builder();
        if (src.int42_struct !== null && src.int42_struct !== undefined) { b_8.storeBit(true); b_8.store(storeSomeStruct(src.int42_struct)); } else { b_8.storeBit(false); }
        const b_9 = new Builder();
        if (src.int256_varint16 !== null && src.int256_varint16 !== undefined) { b_9.storeBit(true).storeInt(src.int256_varint16, 257); } else { b_9.storeBit(false); }
        if (src.int256_varint32 !== null && src.int256_varint32 !== undefined) { b_9.storeBit(true).storeInt(src.int256_varint32, 257); } else { b_9.storeBit(false); }
        if (src.int256_varuint16 !== null && src.int256_varuint16 !== undefined) { b_9.storeBit(true).storeInt(src.int256_varuint16, 257); } else { b_9.storeBit(false); }
        const b_10 = new Builder();
        if (src.int256_varuint32 !== null && src.int256_varuint32 !== undefined) { b_10.storeBit(true).storeInt(src.int256_varuint32, 257); } else { b_10.storeBit(false); }
        if (src.int256_bool !== null && src.int256_bool !== undefined) { b_10.storeBit(true).storeBit(src.int256_bool); } else { b_10.storeBit(false); }
        if (src.int256_cell !== null && src.int256_cell !== undefined) { b_10.storeBit(true).storeRef(src.int256_cell); } else { b_10.storeBit(false); }
        b_10.storeAddress(src.int256_address);
        const b_11 = new Builder();
        if (src.int256_struct !== null && src.int256_struct !== undefined) { b_11.storeBit(true); b_11.store(storeSomeStruct(src.int256_struct)); } else { b_11.storeBit(false); }
        const b_12 = new Builder();
        if (src.uint8_varint16 !== null && src.uint8_varint16 !== undefined) { b_12.storeBit(true).storeInt(src.uint8_varint16, 257); } else { b_12.storeBit(false); }
        if (src.uint8_varint32 !== null && src.uint8_varint32 !== undefined) { b_12.storeBit(true).storeInt(src.uint8_varint32, 257); } else { b_12.storeBit(false); }
        if (src.uint8_varuint16 !== null && src.uint8_varuint16 !== undefined) { b_12.storeBit(true).storeInt(src.uint8_varuint16, 257); } else { b_12.storeBit(false); }
        const b_13 = new Builder();
        if (src.uint8_varuint32 !== null && src.uint8_varuint32 !== undefined) { b_13.storeBit(true).storeInt(src.uint8_varuint32, 257); } else { b_13.storeBit(false); }
        if (src.uint8_bool !== null && src.uint8_bool !== undefined) { b_13.storeBit(true).storeBit(src.uint8_bool); } else { b_13.storeBit(false); }
        if (src.uint8_cell !== null && src.uint8_cell !== undefined) { b_13.storeBit(true).storeRef(src.uint8_cell); } else { b_13.storeBit(false); }
        b_13.storeAddress(src.uint8_address);
        const b_14 = new Builder();
        if (src.uint8_struct !== null && src.uint8_struct !== undefined) { b_14.storeBit(true); b_14.store(storeSomeStruct(src.uint8_struct)); } else { b_14.storeBit(false); }
        const b_15 = new Builder();
        if (src.uint42_varint16 !== null && src.uint42_varint16 !== undefined) { b_15.storeBit(true).storeInt(src.uint42_varint16, 257); } else { b_15.storeBit(false); }
        if (src.uint42_varint32 !== null && src.uint42_varint32 !== undefined) { b_15.storeBit(true).storeInt(src.uint42_varint32, 257); } else { b_15.storeBit(false); }
        if (src.uint42_varuint16 !== null && src.uint42_varuint16 !== undefined) { b_15.storeBit(true).storeInt(src.uint42_varuint16, 257); } else { b_15.storeBit(false); }
        const b_16 = new Builder();
        if (src.uint42_varuint32 !== null && src.uint42_varuint32 !== undefined) { b_16.storeBit(true).storeInt(src.uint42_varuint32, 257); } else { b_16.storeBit(false); }
        if (src.uint42_bool !== null && src.uint42_bool !== undefined) { b_16.storeBit(true).storeBit(src.uint42_bool); } else { b_16.storeBit(false); }
        if (src.uint42_cell !== null && src.uint42_cell !== undefined) { b_16.storeBit(true).storeRef(src.uint42_cell); } else { b_16.storeBit(false); }
        b_16.storeAddress(src.uint42_address);
        const b_17 = new Builder();
        if (src.uint42_struct !== null && src.uint42_struct !== undefined) { b_17.storeBit(true); b_17.store(storeSomeStruct(src.uint42_struct)); } else { b_17.storeBit(false); }
        const b_18 = new Builder();
        if (src.uint256_varint16 !== null && src.uint256_varint16 !== undefined) { b_18.storeBit(true).storeInt(src.uint256_varint16, 257); } else { b_18.storeBit(false); }
        if (src.uint256_varint32 !== null && src.uint256_varint32 !== undefined) { b_18.storeBit(true).storeInt(src.uint256_varint32, 257); } else { b_18.storeBit(false); }
        if (src.uint256_varuint16 !== null && src.uint256_varuint16 !== undefined) { b_18.storeBit(true).storeInt(src.uint256_varuint16, 257); } else { b_18.storeBit(false); }
        const b_19 = new Builder();
        if (src.uint256_varuint32 !== null && src.uint256_varuint32 !== undefined) { b_19.storeBit(true).storeInt(src.uint256_varuint32, 257); } else { b_19.storeBit(false); }
        if (src.uint256_bool !== null && src.uint256_bool !== undefined) { b_19.storeBit(true).storeBit(src.uint256_bool); } else { b_19.storeBit(false); }
        if (src.uint256_cell !== null && src.uint256_cell !== undefined) { b_19.storeBit(true).storeRef(src.uint256_cell); } else { b_19.storeBit(false); }
        b_19.storeAddress(src.uint256_address);
        const b_20 = new Builder();
        if (src.uint256_struct !== null && src.uint256_struct !== undefined) { b_20.storeBit(true); b_20.store(storeSomeStruct(src.uint256_struct)); } else { b_20.storeBit(false); }
        const b_21 = new Builder();
        if (src.address_varint16 !== null && src.address_varint16 !== undefined) { b_21.storeBit(true).storeInt(src.address_varint16, 257); } else { b_21.storeBit(false); }
        if (src.address_varint32 !== null && src.address_varint32 !== undefined) { b_21.storeBit(true).storeInt(src.address_varint32, 257); } else { b_21.storeBit(false); }
        if (src.address_varuint16 !== null && src.address_varuint16 !== undefined) { b_21.storeBit(true).storeInt(src.address_varuint16, 257); } else { b_21.storeBit(false); }
        const b_22 = new Builder();
        if (src.address_varuint32 !== null && src.address_varuint32 !== undefined) { b_22.storeBit(true).storeInt(src.address_varuint32, 257); } else { b_22.storeBit(false); }
        if (src.address_bool !== null && src.address_bool !== undefined) { b_22.storeBit(true).storeBit(src.address_bool); } else { b_22.storeBit(false); }
        if (src.address_cell !== null && src.address_cell !== undefined) { b_22.storeBit(true).storeRef(src.address_cell); } else { b_22.storeBit(false); }
        b_22.storeAddress(src.address_address);
        const b_23 = new Builder();
        if (src.address_struct !== null && src.address_struct !== undefined) { b_23.storeBit(true); b_23.store(storeSomeStruct(src.address_struct)); } else { b_23.storeBit(false); }
        b_22.storeRef(b_23.endCell());
        b_21.storeRef(b_22.endCell());
        b_20.storeRef(b_21.endCell());
        b_19.storeRef(b_20.endCell());
        b_18.storeRef(b_19.endCell());
        b_17.storeRef(b_18.endCell());
        b_16.storeRef(b_17.endCell());
        b_15.storeRef(b_16.endCell());
        b_14.storeRef(b_15.endCell());
        b_13.storeRef(b_14.endCell());
        b_12.storeRef(b_13.endCell());
        b_11.storeRef(b_12.endCell());
        b_10.storeRef(b_11.endCell());
        b_9.storeRef(b_10.endCell());
        b_8.storeRef(b_9.endCell());
        b_7.storeRef(b_8.endCell());
        b_6.storeRef(b_7.endCell());
        b_5.storeRef(b_6.endCell());
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadReplaceGetAllMapsResult(slice: Slice) {
    const sc_0 = slice;
    const _int_varint16 = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    const _int_varint32 = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    const _int_varuint16 = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    const sc_1 = sc_0.loadRef().beginParse();
    const _int_varuint32 = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    const _int_bool = sc_1.loadBit() ? sc_1.loadBit() : null;
    const _int_cell = sc_1.loadBit() ? sc_1.loadRef() : null;
    const _int_address = sc_1.loadMaybeAddress();
    const sc_2 = sc_1.loadRef().beginParse();
    const _int_struct = sc_2.loadBit() ? loadSomeStruct(sc_2) : null;
    const sc_3 = sc_2.loadRef().beginParse();
    const _int8_varint16 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _int8_varint32 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _int8_varuint16 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const sc_4 = sc_3.loadRef().beginParse();
    const _int8_varuint32 = sc_4.loadBit() ? sc_4.loadIntBig(257) : null;
    const _int8_bool = sc_4.loadBit() ? sc_4.loadBit() : null;
    const _int8_cell = sc_4.loadBit() ? sc_4.loadRef() : null;
    const _int8_address = sc_4.loadMaybeAddress();
    const sc_5 = sc_4.loadRef().beginParse();
    const _int8_struct = sc_5.loadBit() ? loadSomeStruct(sc_5) : null;
    const sc_6 = sc_5.loadRef().beginParse();
    const _int42_varint16 = sc_6.loadBit() ? sc_6.loadIntBig(257) : null;
    const _int42_varint32 = sc_6.loadBit() ? sc_6.loadIntBig(257) : null;
    const _int42_varuint16 = sc_6.loadBit() ? sc_6.loadIntBig(257) : null;
    const sc_7 = sc_6.loadRef().beginParse();
    const _int42_varuint32 = sc_7.loadBit() ? sc_7.loadIntBig(257) : null;
    const _int42_bool = sc_7.loadBit() ? sc_7.loadBit() : null;
    const _int42_cell = sc_7.loadBit() ? sc_7.loadRef() : null;
    const _int42_address = sc_7.loadMaybeAddress();
    const sc_8 = sc_7.loadRef().beginParse();
    const _int42_struct = sc_8.loadBit() ? loadSomeStruct(sc_8) : null;
    const sc_9 = sc_8.loadRef().beginParse();
    const _int256_varint16 = sc_9.loadBit() ? sc_9.loadIntBig(257) : null;
    const _int256_varint32 = sc_9.loadBit() ? sc_9.loadIntBig(257) : null;
    const _int256_varuint16 = sc_9.loadBit() ? sc_9.loadIntBig(257) : null;
    const sc_10 = sc_9.loadRef().beginParse();
    const _int256_varuint32 = sc_10.loadBit() ? sc_10.loadIntBig(257) : null;
    const _int256_bool = sc_10.loadBit() ? sc_10.loadBit() : null;
    const _int256_cell = sc_10.loadBit() ? sc_10.loadRef() : null;
    const _int256_address = sc_10.loadMaybeAddress();
    const sc_11 = sc_10.loadRef().beginParse();
    const _int256_struct = sc_11.loadBit() ? loadSomeStruct(sc_11) : null;
    const sc_12 = sc_11.loadRef().beginParse();
    const _uint8_varint16 = sc_12.loadBit() ? sc_12.loadIntBig(257) : null;
    const _uint8_varint32 = sc_12.loadBit() ? sc_12.loadIntBig(257) : null;
    const _uint8_varuint16 = sc_12.loadBit() ? sc_12.loadIntBig(257) : null;
    const sc_13 = sc_12.loadRef().beginParse();
    const _uint8_varuint32 = sc_13.loadBit() ? sc_13.loadIntBig(257) : null;
    const _uint8_bool = sc_13.loadBit() ? sc_13.loadBit() : null;
    const _uint8_cell = sc_13.loadBit() ? sc_13.loadRef() : null;
    const _uint8_address = sc_13.loadMaybeAddress();
    const sc_14 = sc_13.loadRef().beginParse();
    const _uint8_struct = sc_14.loadBit() ? loadSomeStruct(sc_14) : null;
    const sc_15 = sc_14.loadRef().beginParse();
    const _uint42_varint16 = sc_15.loadBit() ? sc_15.loadIntBig(257) : null;
    const _uint42_varint32 = sc_15.loadBit() ? sc_15.loadIntBig(257) : null;
    const _uint42_varuint16 = sc_15.loadBit() ? sc_15.loadIntBig(257) : null;
    const sc_16 = sc_15.loadRef().beginParse();
    const _uint42_varuint32 = sc_16.loadBit() ? sc_16.loadIntBig(257) : null;
    const _uint42_bool = sc_16.loadBit() ? sc_16.loadBit() : null;
    const _uint42_cell = sc_16.loadBit() ? sc_16.loadRef() : null;
    const _uint42_address = sc_16.loadMaybeAddress();
    const sc_17 = sc_16.loadRef().beginParse();
    const _uint42_struct = sc_17.loadBit() ? loadSomeStruct(sc_17) : null;
    const sc_18 = sc_17.loadRef().beginParse();
    const _uint256_varint16 = sc_18.loadBit() ? sc_18.loadIntBig(257) : null;
    const _uint256_varint32 = sc_18.loadBit() ? sc_18.loadIntBig(257) : null;
    const _uint256_varuint16 = sc_18.loadBit() ? sc_18.loadIntBig(257) : null;
    const sc_19 = sc_18.loadRef().beginParse();
    const _uint256_varuint32 = sc_19.loadBit() ? sc_19.loadIntBig(257) : null;
    const _uint256_bool = sc_19.loadBit() ? sc_19.loadBit() : null;
    const _uint256_cell = sc_19.loadBit() ? sc_19.loadRef() : null;
    const _uint256_address = sc_19.loadMaybeAddress();
    const sc_20 = sc_19.loadRef().beginParse();
    const _uint256_struct = sc_20.loadBit() ? loadSomeStruct(sc_20) : null;
    const sc_21 = sc_20.loadRef().beginParse();
    const _address_varint16 = sc_21.loadBit() ? sc_21.loadIntBig(257) : null;
    const _address_varint32 = sc_21.loadBit() ? sc_21.loadIntBig(257) : null;
    const _address_varuint16 = sc_21.loadBit() ? sc_21.loadIntBig(257) : null;
    const sc_22 = sc_21.loadRef().beginParse();
    const _address_varuint32 = sc_22.loadBit() ? sc_22.loadIntBig(257) : null;
    const _address_bool = sc_22.loadBit() ? sc_22.loadBit() : null;
    const _address_cell = sc_22.loadBit() ? sc_22.loadRef() : null;
    const _address_address = sc_22.loadMaybeAddress();
    const sc_23 = sc_22.loadRef().beginParse();
    const _address_struct = sc_23.loadBit() ? loadSomeStruct(sc_23) : null;
    return { $$type: 'ReplaceGetAllMapsResult' as const, int_varint16: _int_varint16, int_varint32: _int_varint32, int_varuint16: _int_varuint16, int_varuint32: _int_varuint32, int_bool: _int_bool, int_cell: _int_cell, int_address: _int_address, int_struct: _int_struct, int8_varint16: _int8_varint16, int8_varint32: _int8_varint32, int8_varuint16: _int8_varuint16, int8_varuint32: _int8_varuint32, int8_bool: _int8_bool, int8_cell: _int8_cell, int8_address: _int8_address, int8_struct: _int8_struct, int42_varint16: _int42_varint16, int42_varint32: _int42_varint32, int42_varuint16: _int42_varuint16, int42_varuint32: _int42_varuint32, int42_bool: _int42_bool, int42_cell: _int42_cell, int42_address: _int42_address, int42_struct: _int42_struct, int256_varint16: _int256_varint16, int256_varint32: _int256_varint32, int256_varuint16: _int256_varuint16, int256_varuint32: _int256_varuint32, int256_bool: _int256_bool, int256_cell: _int256_cell, int256_address: _int256_address, int256_struct: _int256_struct, uint8_varint16: _uint8_varint16, uint8_varint32: _uint8_varint32, uint8_varuint16: _uint8_varuint16, uint8_varuint32: _uint8_varuint32, uint8_bool: _uint8_bool, uint8_cell: _uint8_cell, uint8_address: _uint8_address, uint8_struct: _uint8_struct, uint42_varint16: _uint42_varint16, uint42_varint32: _uint42_varint32, uint42_varuint16: _uint42_varuint16, uint42_varuint32: _uint42_varuint32, uint42_bool: _uint42_bool, uint42_cell: _uint42_cell, uint42_address: _uint42_address, uint42_struct: _uint42_struct, uint256_varint16: _uint256_varint16, uint256_varint32: _uint256_varint32, uint256_varuint16: _uint256_varuint16, uint256_varuint32: _uint256_varuint32, uint256_bool: _uint256_bool, uint256_cell: _uint256_cell, uint256_address: _uint256_address, uint256_struct: _uint256_struct, address_varint16: _address_varint16, address_varint32: _address_varint32, address_varuint16: _address_varuint16, address_varuint32: _address_varuint32, address_bool: _address_bool, address_cell: _address_cell, address_address: _address_address, address_struct: _address_struct };
}

function loadTupleReplaceGetAllMapsResult(source: TupleReader) {
    const _int_varint16 = source.readBigNumberOpt();
    const _int_varint32 = source.readBigNumberOpt();
    const _int_varuint16 = source.readBigNumberOpt();
    const _int_varuint32 = source.readBigNumberOpt();
    const _int_bool = source.readBooleanOpt();
    const _int_cell = source.readCellOpt();
    const _int_address = source.readAddressOpt();
    const _int_struct_p = source.readTupleOpt();
    const _int_struct = _int_struct_p ? loadTupleSomeStruct(_int_struct_p) : null;
    const _int8_varint16 = source.readBigNumberOpt();
    const _int8_varint32 = source.readBigNumberOpt();
    const _int8_varuint16 = source.readBigNumberOpt();
    const _int8_varuint32 = source.readBigNumberOpt();
    const _int8_bool = source.readBooleanOpt();
    const _int8_cell = source.readCellOpt();
    source = source.readTuple();
    const _int8_address = source.readAddressOpt();
    const _int8_struct_p = source.readTupleOpt();
    const _int8_struct = _int8_struct_p ? loadTupleSomeStruct(_int8_struct_p) : null;
    const _int42_varint16 = source.readBigNumberOpt();
    const _int42_varint32 = source.readBigNumberOpt();
    const _int42_varuint16 = source.readBigNumberOpt();
    const _int42_varuint32 = source.readBigNumberOpt();
    const _int42_bool = source.readBooleanOpt();
    const _int42_cell = source.readCellOpt();
    const _int42_address = source.readAddressOpt();
    const _int42_struct_p = source.readTupleOpt();
    const _int42_struct = _int42_struct_p ? loadTupleSomeStruct(_int42_struct_p) : null;
    const _int256_varint16 = source.readBigNumberOpt();
    const _int256_varint32 = source.readBigNumberOpt();
    const _int256_varuint16 = source.readBigNumberOpt();
    const _int256_varuint32 = source.readBigNumberOpt();
    source = source.readTuple();
    const _int256_bool = source.readBooleanOpt();
    const _int256_cell = source.readCellOpt();
    const _int256_address = source.readAddressOpt();
    const _int256_struct_p = source.readTupleOpt();
    const _int256_struct = _int256_struct_p ? loadTupleSomeStruct(_int256_struct_p) : null;
    const _uint8_varint16 = source.readBigNumberOpt();
    const _uint8_varint32 = source.readBigNumberOpt();
    const _uint8_varuint16 = source.readBigNumberOpt();
    const _uint8_varuint32 = source.readBigNumberOpt();
    const _uint8_bool = source.readBooleanOpt();
    const _uint8_cell = source.readCellOpt();
    const _uint8_address = source.readAddressOpt();
    const _uint8_struct_p = source.readTupleOpt();
    const _uint8_struct = _uint8_struct_p ? loadTupleSomeStruct(_uint8_struct_p) : null;
    const _uint42_varint16 = source.readBigNumberOpt();
    const _uint42_varint32 = source.readBigNumberOpt();
    source = source.readTuple();
    const _uint42_varuint16 = source.readBigNumberOpt();
    const _uint42_varuint32 = source.readBigNumberOpt();
    const _uint42_bool = source.readBooleanOpt();
    const _uint42_cell = source.readCellOpt();
    const _uint42_address = source.readAddressOpt();
    const _uint42_struct_p = source.readTupleOpt();
    const _uint42_struct = _uint42_struct_p ? loadTupleSomeStruct(_uint42_struct_p) : null;
    const _uint256_varint16 = source.readBigNumberOpt();
    const _uint256_varint32 = source.readBigNumberOpt();
    const _uint256_varuint16 = source.readBigNumberOpt();
    const _uint256_varuint32 = source.readBigNumberOpt();
    const _uint256_bool = source.readBooleanOpt();
    const _uint256_cell = source.readCellOpt();
    const _uint256_address = source.readAddressOpt();
    const _uint256_struct_p = source.readTupleOpt();
    const _uint256_struct = _uint256_struct_p ? loadTupleSomeStruct(_uint256_struct_p) : null;
    source = source.readTuple();
    const _address_varint16 = source.readBigNumberOpt();
    const _address_varint32 = source.readBigNumberOpt();
    const _address_varuint16 = source.readBigNumberOpt();
    const _address_varuint32 = source.readBigNumberOpt();
    const _address_bool = source.readBooleanOpt();
    const _address_cell = source.readCellOpt();
    const _address_address = source.readAddressOpt();
    const _address_struct_p = source.readTupleOpt();
    const _address_struct = _address_struct_p ? loadTupleSomeStruct(_address_struct_p) : null;
    return { $$type: 'ReplaceGetAllMapsResult' as const, int_varint16: _int_varint16, int_varint32: _int_varint32, int_varuint16: _int_varuint16, int_varuint32: _int_varuint32, int_bool: _int_bool, int_cell: _int_cell, int_address: _int_address, int_struct: _int_struct, int8_varint16: _int8_varint16, int8_varint32: _int8_varint32, int8_varuint16: _int8_varuint16, int8_varuint32: _int8_varuint32, int8_bool: _int8_bool, int8_cell: _int8_cell, int8_address: _int8_address, int8_struct: _int8_struct, int42_varint16: _int42_varint16, int42_varint32: _int42_varint32, int42_varuint16: _int42_varuint16, int42_varuint32: _int42_varuint32, int42_bool: _int42_bool, int42_cell: _int42_cell, int42_address: _int42_address, int42_struct: _int42_struct, int256_varint16: _int256_varint16, int256_varint32: _int256_varint32, int256_varuint16: _int256_varuint16, int256_varuint32: _int256_varuint32, int256_bool: _int256_bool, int256_cell: _int256_cell, int256_address: _int256_address, int256_struct: _int256_struct, uint8_varint16: _uint8_varint16, uint8_varint32: _uint8_varint32, uint8_varuint16: _uint8_varuint16, uint8_varuint32: _uint8_varuint32, uint8_bool: _uint8_bool, uint8_cell: _uint8_cell, uint8_address: _uint8_address, uint8_struct: _uint8_struct, uint42_varint16: _uint42_varint16, uint42_varint32: _uint42_varint32, uint42_varuint16: _uint42_varuint16, uint42_varuint32: _uint42_varuint32, uint42_bool: _uint42_bool, uint42_cell: _uint42_cell, uint42_address: _uint42_address, uint42_struct: _uint42_struct, uint256_varint16: _uint256_varint16, uint256_varint32: _uint256_varint32, uint256_varuint16: _uint256_varuint16, uint256_varuint32: _uint256_varuint32, uint256_bool: _uint256_bool, uint256_cell: _uint256_cell, uint256_address: _uint256_address, uint256_struct: _uint256_struct, address_varint16: _address_varint16, address_varint32: _address_varint32, address_varuint16: _address_varuint16, address_varuint32: _address_varuint32, address_bool: _address_bool, address_cell: _address_cell, address_address: _address_address, address_struct: _address_struct };
}

function loadGetterTupleReplaceGetAllMapsResult(source: TupleReader) {
    const _int_varint16 = source.readBigNumberOpt();
    const _int_varint32 = source.readBigNumberOpt();
    const _int_varuint16 = source.readBigNumberOpt();
    const _int_varuint32 = source.readBigNumberOpt();
    const _int_bool = source.readBooleanOpt();
    const _int_cell = source.readCellOpt();
    const _int_address = source.readAddressOpt();
    const _int_struct_p = source.readTupleOpt();
    const _int_struct = _int_struct_p ? loadTupleSomeStruct(_int_struct_p) : null;
    const _int8_varint16 = source.readBigNumberOpt();
    const _int8_varint32 = source.readBigNumberOpt();
    const _int8_varuint16 = source.readBigNumberOpt();
    const _int8_varuint32 = source.readBigNumberOpt();
    const _int8_bool = source.readBooleanOpt();
    const _int8_cell = source.readCellOpt();
    const _int8_address = source.readAddressOpt();
    const _int8_struct_p = source.readTupleOpt();
    const _int8_struct = _int8_struct_p ? loadTupleSomeStruct(_int8_struct_p) : null;
    const _int42_varint16 = source.readBigNumberOpt();
    const _int42_varint32 = source.readBigNumberOpt();
    const _int42_varuint16 = source.readBigNumberOpt();
    const _int42_varuint32 = source.readBigNumberOpt();
    const _int42_bool = source.readBooleanOpt();
    const _int42_cell = source.readCellOpt();
    const _int42_address = source.readAddressOpt();
    const _int42_struct_p = source.readTupleOpt();
    const _int42_struct = _int42_struct_p ? loadTupleSomeStruct(_int42_struct_p) : null;
    const _int256_varint16 = source.readBigNumberOpt();
    const _int256_varint32 = source.readBigNumberOpt();
    const _int256_varuint16 = source.readBigNumberOpt();
    const _int256_varuint32 = source.readBigNumberOpt();
    const _int256_bool = source.readBooleanOpt();
    const _int256_cell = source.readCellOpt();
    const _int256_address = source.readAddressOpt();
    const _int256_struct_p = source.readTupleOpt();
    const _int256_struct = _int256_struct_p ? loadTupleSomeStruct(_int256_struct_p) : null;
    const _uint8_varint16 = source.readBigNumberOpt();
    const _uint8_varint32 = source.readBigNumberOpt();
    const _uint8_varuint16 = source.readBigNumberOpt();
    const _uint8_varuint32 = source.readBigNumberOpt();
    const _uint8_bool = source.readBooleanOpt();
    const _uint8_cell = source.readCellOpt();
    const _uint8_address = source.readAddressOpt();
    const _uint8_struct_p = source.readTupleOpt();
    const _uint8_struct = _uint8_struct_p ? loadTupleSomeStruct(_uint8_struct_p) : null;
    const _uint42_varint16 = source.readBigNumberOpt();
    const _uint42_varint32 = source.readBigNumberOpt();
    const _uint42_varuint16 = source.readBigNumberOpt();
    const _uint42_varuint32 = source.readBigNumberOpt();
    const _uint42_bool = source.readBooleanOpt();
    const _uint42_cell = source.readCellOpt();
    const _uint42_address = source.readAddressOpt();
    const _uint42_struct_p = source.readTupleOpt();
    const _uint42_struct = _uint42_struct_p ? loadTupleSomeStruct(_uint42_struct_p) : null;
    const _uint256_varint16 = source.readBigNumberOpt();
    const _uint256_varint32 = source.readBigNumberOpt();
    const _uint256_varuint16 = source.readBigNumberOpt();
    const _uint256_varuint32 = source.readBigNumberOpt();
    const _uint256_bool = source.readBooleanOpt();
    const _uint256_cell = source.readCellOpt();
    const _uint256_address = source.readAddressOpt();
    const _uint256_struct_p = source.readTupleOpt();
    const _uint256_struct = _uint256_struct_p ? loadTupleSomeStruct(_uint256_struct_p) : null;
    const _address_varint16 = source.readBigNumberOpt();
    const _address_varint32 = source.readBigNumberOpt();
    const _address_varuint16 = source.readBigNumberOpt();
    const _address_varuint32 = source.readBigNumberOpt();
    const _address_bool = source.readBooleanOpt();
    const _address_cell = source.readCellOpt();
    const _address_address = source.readAddressOpt();
    const _address_struct_p = source.readTupleOpt();
    const _address_struct = _address_struct_p ? loadTupleSomeStruct(_address_struct_p) : null;
    return { $$type: 'ReplaceGetAllMapsResult' as const, int_varint16: _int_varint16, int_varint32: _int_varint32, int_varuint16: _int_varuint16, int_varuint32: _int_varuint32, int_bool: _int_bool, int_cell: _int_cell, int_address: _int_address, int_struct: _int_struct, int8_varint16: _int8_varint16, int8_varint32: _int8_varint32, int8_varuint16: _int8_varuint16, int8_varuint32: _int8_varuint32, int8_bool: _int8_bool, int8_cell: _int8_cell, int8_address: _int8_address, int8_struct: _int8_struct, int42_varint16: _int42_varint16, int42_varint32: _int42_varint32, int42_varuint16: _int42_varuint16, int42_varuint32: _int42_varuint32, int42_bool: _int42_bool, int42_cell: _int42_cell, int42_address: _int42_address, int42_struct: _int42_struct, int256_varint16: _int256_varint16, int256_varint32: _int256_varint32, int256_varuint16: _int256_varuint16, int256_varuint32: _int256_varuint32, int256_bool: _int256_bool, int256_cell: _int256_cell, int256_address: _int256_address, int256_struct: _int256_struct, uint8_varint16: _uint8_varint16, uint8_varint32: _uint8_varint32, uint8_varuint16: _uint8_varuint16, uint8_varuint32: _uint8_varuint32, uint8_bool: _uint8_bool, uint8_cell: _uint8_cell, uint8_address: _uint8_address, uint8_struct: _uint8_struct, uint42_varint16: _uint42_varint16, uint42_varint32: _uint42_varint32, uint42_varuint16: _uint42_varuint16, uint42_varuint32: _uint42_varuint32, uint42_bool: _uint42_bool, uint42_cell: _uint42_cell, uint42_address: _uint42_address, uint42_struct: _uint42_struct, uint256_varint16: _uint256_varint16, uint256_varint32: _uint256_varint32, uint256_varuint16: _uint256_varuint16, uint256_varuint32: _uint256_varuint32, uint256_bool: _uint256_bool, uint256_cell: _uint256_cell, uint256_address: _uint256_address, uint256_struct: _uint256_struct, address_varint16: _address_varint16, address_varint32: _address_varint32, address_varuint16: _address_varuint16, address_varuint32: _address_varuint32, address_bool: _address_bool, address_cell: _address_cell, address_address: _address_address, address_struct: _address_struct };
}

function storeTupleReplaceGetAllMapsResult(source: ReplaceGetAllMapsResult) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.int_varint16);
    builder.writeNumber(source.int_varint32);
    builder.writeNumber(source.int_varuint16);
    builder.writeNumber(source.int_varuint32);
    builder.writeBoolean(source.int_bool);
    builder.writeCell(source.int_cell);
    builder.writeAddress(source.int_address);
    if (source.int_struct !== null && source.int_struct !== undefined) {
        builder.writeTuple(storeTupleSomeStruct(source.int_struct));
    } else {
        builder.writeTuple(null);
    }
    builder.writeNumber(source.int8_varint16);
    builder.writeNumber(source.int8_varint32);
    builder.writeNumber(source.int8_varuint16);
    builder.writeNumber(source.int8_varuint32);
    builder.writeBoolean(source.int8_bool);
    builder.writeCell(source.int8_cell);
    builder.writeAddress(source.int8_address);
    if (source.int8_struct !== null && source.int8_struct !== undefined) {
        builder.writeTuple(storeTupleSomeStruct(source.int8_struct));
    } else {
        builder.writeTuple(null);
    }
    builder.writeNumber(source.int42_varint16);
    builder.writeNumber(source.int42_varint32);
    builder.writeNumber(source.int42_varuint16);
    builder.writeNumber(source.int42_varuint32);
    builder.writeBoolean(source.int42_bool);
    builder.writeCell(source.int42_cell);
    builder.writeAddress(source.int42_address);
    if (source.int42_struct !== null && source.int42_struct !== undefined) {
        builder.writeTuple(storeTupleSomeStruct(source.int42_struct));
    } else {
        builder.writeTuple(null);
    }
    builder.writeNumber(source.int256_varint16);
    builder.writeNumber(source.int256_varint32);
    builder.writeNumber(source.int256_varuint16);
    builder.writeNumber(source.int256_varuint32);
    builder.writeBoolean(source.int256_bool);
    builder.writeCell(source.int256_cell);
    builder.writeAddress(source.int256_address);
    if (source.int256_struct !== null && source.int256_struct !== undefined) {
        builder.writeTuple(storeTupleSomeStruct(source.int256_struct));
    } else {
        builder.writeTuple(null);
    }
    builder.writeNumber(source.uint8_varint16);
    builder.writeNumber(source.uint8_varint32);
    builder.writeNumber(source.uint8_varuint16);
    builder.writeNumber(source.uint8_varuint32);
    builder.writeBoolean(source.uint8_bool);
    builder.writeCell(source.uint8_cell);
    builder.writeAddress(source.uint8_address);
    if (source.uint8_struct !== null && source.uint8_struct !== undefined) {
        builder.writeTuple(storeTupleSomeStruct(source.uint8_struct));
    } else {
        builder.writeTuple(null);
    }
    builder.writeNumber(source.uint42_varint16);
    builder.writeNumber(source.uint42_varint32);
    builder.writeNumber(source.uint42_varuint16);
    builder.writeNumber(source.uint42_varuint32);
    builder.writeBoolean(source.uint42_bool);
    builder.writeCell(source.uint42_cell);
    builder.writeAddress(source.uint42_address);
    if (source.uint42_struct !== null && source.uint42_struct !== undefined) {
        builder.writeTuple(storeTupleSomeStruct(source.uint42_struct));
    } else {
        builder.writeTuple(null);
    }
    builder.writeNumber(source.uint256_varint16);
    builder.writeNumber(source.uint256_varint32);
    builder.writeNumber(source.uint256_varuint16);
    builder.writeNumber(source.uint256_varuint32);
    builder.writeBoolean(source.uint256_bool);
    builder.writeCell(source.uint256_cell);
    builder.writeAddress(source.uint256_address);
    if (source.uint256_struct !== null && source.uint256_struct !== undefined) {
        builder.writeTuple(storeTupleSomeStruct(source.uint256_struct));
    } else {
        builder.writeTuple(null);
    }
    builder.writeNumber(source.address_varint16);
    builder.writeNumber(source.address_varint32);
    builder.writeNumber(source.address_varuint16);
    builder.writeNumber(source.address_varuint32);
    builder.writeBoolean(source.address_bool);
    builder.writeCell(source.address_cell);
    builder.writeAddress(source.address_address);
    if (source.address_struct !== null && source.address_struct !== undefined) {
        builder.writeTuple(storeTupleSomeStruct(source.address_struct));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserReplaceGetAllMapsResult(): DictionaryValue<ReplaceGetAllMapsResult> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReplaceGetAllMapsResult(src)).endCell());
        },
        parse: (src) => {
            return loadReplaceGetAllMapsResult(src.loadRef().beginParse());
        }
    }
}

export type ExistsAllMapsResult = {
    $$type: 'ExistsAllMapsResult';
    int_varint16: boolean;
    int_varint32: boolean;
    int_varuint16: boolean;
    int_varuint32: boolean;
    int_bool: boolean;
    int_cell: boolean;
    int_address: boolean;
    int_struct: boolean;
    int8_varint16: boolean;
    int8_varint32: boolean;
    int8_varuint16: boolean;
    int8_varuint32: boolean;
    int8_bool: boolean;
    int8_cell: boolean;
    int8_address: boolean;
    int8_struct: boolean;
    int42_varint16: boolean;
    int42_varint32: boolean;
    int42_varuint16: boolean;
    int42_varuint32: boolean;
    int42_bool: boolean;
    int42_cell: boolean;
    int42_address: boolean;
    int42_struct: boolean;
    int256_varint16: boolean;
    int256_varint32: boolean;
    int256_varuint16: boolean;
    int256_varuint32: boolean;
    int256_bool: boolean;
    int256_cell: boolean;
    int256_address: boolean;
    int256_struct: boolean;
    uint8_varint16: boolean;
    uint8_varint32: boolean;
    uint8_varuint16: boolean;
    uint8_varuint32: boolean;
    uint8_bool: boolean;
    uint8_cell: boolean;
    uint8_address: boolean;
    uint8_struct: boolean;
    uint42_varint16: boolean;
    uint42_varint32: boolean;
    uint42_varuint16: boolean;
    uint42_varuint32: boolean;
    uint42_bool: boolean;
    uint42_cell: boolean;
    uint42_address: boolean;
    uint42_struct: boolean;
    uint256_varint16: boolean;
    uint256_varint32: boolean;
    uint256_varuint16: boolean;
    uint256_varuint32: boolean;
    uint256_bool: boolean;
    uint256_cell: boolean;
    uint256_address: boolean;
    uint256_struct: boolean;
    address_varint16: boolean;
    address_varint32: boolean;
    address_varuint16: boolean;
    address_varuint32: boolean;
    address_bool: boolean;
    address_cell: boolean;
    address_address: boolean;
    address_struct: boolean;
}

export function storeExistsAllMapsResult(src: ExistsAllMapsResult) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.int_varint16);
        b_0.storeBit(src.int_varint32);
        b_0.storeBit(src.int_varuint16);
        b_0.storeBit(src.int_varuint32);
        b_0.storeBit(src.int_bool);
        b_0.storeBit(src.int_cell);
        b_0.storeBit(src.int_address);
        b_0.storeBit(src.int_struct);
        b_0.storeBit(src.int8_varint16);
        b_0.storeBit(src.int8_varint32);
        b_0.storeBit(src.int8_varuint16);
        b_0.storeBit(src.int8_varuint32);
        b_0.storeBit(src.int8_bool);
        b_0.storeBit(src.int8_cell);
        b_0.storeBit(src.int8_address);
        b_0.storeBit(src.int8_struct);
        b_0.storeBit(src.int42_varint16);
        b_0.storeBit(src.int42_varint32);
        b_0.storeBit(src.int42_varuint16);
        b_0.storeBit(src.int42_varuint32);
        b_0.storeBit(src.int42_bool);
        b_0.storeBit(src.int42_cell);
        b_0.storeBit(src.int42_address);
        b_0.storeBit(src.int42_struct);
        b_0.storeBit(src.int256_varint16);
        b_0.storeBit(src.int256_varint32);
        b_0.storeBit(src.int256_varuint16);
        b_0.storeBit(src.int256_varuint32);
        b_0.storeBit(src.int256_bool);
        b_0.storeBit(src.int256_cell);
        b_0.storeBit(src.int256_address);
        b_0.storeBit(src.int256_struct);
        b_0.storeBit(src.uint8_varint16);
        b_0.storeBit(src.uint8_varint32);
        b_0.storeBit(src.uint8_varuint16);
        b_0.storeBit(src.uint8_varuint32);
        b_0.storeBit(src.uint8_bool);
        b_0.storeBit(src.uint8_cell);
        b_0.storeBit(src.uint8_address);
        b_0.storeBit(src.uint8_struct);
        b_0.storeBit(src.uint42_varint16);
        b_0.storeBit(src.uint42_varint32);
        b_0.storeBit(src.uint42_varuint16);
        b_0.storeBit(src.uint42_varuint32);
        b_0.storeBit(src.uint42_bool);
        b_0.storeBit(src.uint42_cell);
        b_0.storeBit(src.uint42_address);
        b_0.storeBit(src.uint42_struct);
        b_0.storeBit(src.uint256_varint16);
        b_0.storeBit(src.uint256_varint32);
        b_0.storeBit(src.uint256_varuint16);
        b_0.storeBit(src.uint256_varuint32);
        b_0.storeBit(src.uint256_bool);
        b_0.storeBit(src.uint256_cell);
        b_0.storeBit(src.uint256_address);
        b_0.storeBit(src.uint256_struct);
        b_0.storeBit(src.address_varint16);
        b_0.storeBit(src.address_varint32);
        b_0.storeBit(src.address_varuint16);
        b_0.storeBit(src.address_varuint32);
        b_0.storeBit(src.address_bool);
        b_0.storeBit(src.address_cell);
        b_0.storeBit(src.address_address);
        b_0.storeBit(src.address_struct);
    };
}

export function loadExistsAllMapsResult(slice: Slice) {
    const sc_0 = slice;
    const _int_varint16 = sc_0.loadBit();
    const _int_varint32 = sc_0.loadBit();
    const _int_varuint16 = sc_0.loadBit();
    const _int_varuint32 = sc_0.loadBit();
    const _int_bool = sc_0.loadBit();
    const _int_cell = sc_0.loadBit();
    const _int_address = sc_0.loadBit();
    const _int_struct = sc_0.loadBit();
    const _int8_varint16 = sc_0.loadBit();
    const _int8_varint32 = sc_0.loadBit();
    const _int8_varuint16 = sc_0.loadBit();
    const _int8_varuint32 = sc_0.loadBit();
    const _int8_bool = sc_0.loadBit();
    const _int8_cell = sc_0.loadBit();
    const _int8_address = sc_0.loadBit();
    const _int8_struct = sc_0.loadBit();
    const _int42_varint16 = sc_0.loadBit();
    const _int42_varint32 = sc_0.loadBit();
    const _int42_varuint16 = sc_0.loadBit();
    const _int42_varuint32 = sc_0.loadBit();
    const _int42_bool = sc_0.loadBit();
    const _int42_cell = sc_0.loadBit();
    const _int42_address = sc_0.loadBit();
    const _int42_struct = sc_0.loadBit();
    const _int256_varint16 = sc_0.loadBit();
    const _int256_varint32 = sc_0.loadBit();
    const _int256_varuint16 = sc_0.loadBit();
    const _int256_varuint32 = sc_0.loadBit();
    const _int256_bool = sc_0.loadBit();
    const _int256_cell = sc_0.loadBit();
    const _int256_address = sc_0.loadBit();
    const _int256_struct = sc_0.loadBit();
    const _uint8_varint16 = sc_0.loadBit();
    const _uint8_varint32 = sc_0.loadBit();
    const _uint8_varuint16 = sc_0.loadBit();
    const _uint8_varuint32 = sc_0.loadBit();
    const _uint8_bool = sc_0.loadBit();
    const _uint8_cell = sc_0.loadBit();
    const _uint8_address = sc_0.loadBit();
    const _uint8_struct = sc_0.loadBit();
    const _uint42_varint16 = sc_0.loadBit();
    const _uint42_varint32 = sc_0.loadBit();
    const _uint42_varuint16 = sc_0.loadBit();
    const _uint42_varuint32 = sc_0.loadBit();
    const _uint42_bool = sc_0.loadBit();
    const _uint42_cell = sc_0.loadBit();
    const _uint42_address = sc_0.loadBit();
    const _uint42_struct = sc_0.loadBit();
    const _uint256_varint16 = sc_0.loadBit();
    const _uint256_varint32 = sc_0.loadBit();
    const _uint256_varuint16 = sc_0.loadBit();
    const _uint256_varuint32 = sc_0.loadBit();
    const _uint256_bool = sc_0.loadBit();
    const _uint256_cell = sc_0.loadBit();
    const _uint256_address = sc_0.loadBit();
    const _uint256_struct = sc_0.loadBit();
    const _address_varint16 = sc_0.loadBit();
    const _address_varint32 = sc_0.loadBit();
    const _address_varuint16 = sc_0.loadBit();
    const _address_varuint32 = sc_0.loadBit();
    const _address_bool = sc_0.loadBit();
    const _address_cell = sc_0.loadBit();
    const _address_address = sc_0.loadBit();
    const _address_struct = sc_0.loadBit();
    return { $$type: 'ExistsAllMapsResult' as const, int_varint16: _int_varint16, int_varint32: _int_varint32, int_varuint16: _int_varuint16, int_varuint32: _int_varuint32, int_bool: _int_bool, int_cell: _int_cell, int_address: _int_address, int_struct: _int_struct, int8_varint16: _int8_varint16, int8_varint32: _int8_varint32, int8_varuint16: _int8_varuint16, int8_varuint32: _int8_varuint32, int8_bool: _int8_bool, int8_cell: _int8_cell, int8_address: _int8_address, int8_struct: _int8_struct, int42_varint16: _int42_varint16, int42_varint32: _int42_varint32, int42_varuint16: _int42_varuint16, int42_varuint32: _int42_varuint32, int42_bool: _int42_bool, int42_cell: _int42_cell, int42_address: _int42_address, int42_struct: _int42_struct, int256_varint16: _int256_varint16, int256_varint32: _int256_varint32, int256_varuint16: _int256_varuint16, int256_varuint32: _int256_varuint32, int256_bool: _int256_bool, int256_cell: _int256_cell, int256_address: _int256_address, int256_struct: _int256_struct, uint8_varint16: _uint8_varint16, uint8_varint32: _uint8_varint32, uint8_varuint16: _uint8_varuint16, uint8_varuint32: _uint8_varuint32, uint8_bool: _uint8_bool, uint8_cell: _uint8_cell, uint8_address: _uint8_address, uint8_struct: _uint8_struct, uint42_varint16: _uint42_varint16, uint42_varint32: _uint42_varint32, uint42_varuint16: _uint42_varuint16, uint42_varuint32: _uint42_varuint32, uint42_bool: _uint42_bool, uint42_cell: _uint42_cell, uint42_address: _uint42_address, uint42_struct: _uint42_struct, uint256_varint16: _uint256_varint16, uint256_varint32: _uint256_varint32, uint256_varuint16: _uint256_varuint16, uint256_varuint32: _uint256_varuint32, uint256_bool: _uint256_bool, uint256_cell: _uint256_cell, uint256_address: _uint256_address, uint256_struct: _uint256_struct, address_varint16: _address_varint16, address_varint32: _address_varint32, address_varuint16: _address_varuint16, address_varuint32: _address_varuint32, address_bool: _address_bool, address_cell: _address_cell, address_address: _address_address, address_struct: _address_struct };
}

function loadTupleExistsAllMapsResult(source: TupleReader) {
    const _int_varint16 = source.readBoolean();
    const _int_varint32 = source.readBoolean();
    const _int_varuint16 = source.readBoolean();
    const _int_varuint32 = source.readBoolean();
    const _int_bool = source.readBoolean();
    const _int_cell = source.readBoolean();
    const _int_address = source.readBoolean();
    const _int_struct = source.readBoolean();
    const _int8_varint16 = source.readBoolean();
    const _int8_varint32 = source.readBoolean();
    const _int8_varuint16 = source.readBoolean();
    const _int8_varuint32 = source.readBoolean();
    const _int8_bool = source.readBoolean();
    const _int8_cell = source.readBoolean();
    source = source.readTuple();
    const _int8_address = source.readBoolean();
    const _int8_struct = source.readBoolean();
    const _int42_varint16 = source.readBoolean();
    const _int42_varint32 = source.readBoolean();
    const _int42_varuint16 = source.readBoolean();
    const _int42_varuint32 = source.readBoolean();
    const _int42_bool = source.readBoolean();
    const _int42_cell = source.readBoolean();
    const _int42_address = source.readBoolean();
    const _int42_struct = source.readBoolean();
    const _int256_varint16 = source.readBoolean();
    const _int256_varint32 = source.readBoolean();
    const _int256_varuint16 = source.readBoolean();
    const _int256_varuint32 = source.readBoolean();
    source = source.readTuple();
    const _int256_bool = source.readBoolean();
    const _int256_cell = source.readBoolean();
    const _int256_address = source.readBoolean();
    const _int256_struct = source.readBoolean();
    const _uint8_varint16 = source.readBoolean();
    const _uint8_varint32 = source.readBoolean();
    const _uint8_varuint16 = source.readBoolean();
    const _uint8_varuint32 = source.readBoolean();
    const _uint8_bool = source.readBoolean();
    const _uint8_cell = source.readBoolean();
    const _uint8_address = source.readBoolean();
    const _uint8_struct = source.readBoolean();
    const _uint42_varint16 = source.readBoolean();
    const _uint42_varint32 = source.readBoolean();
    source = source.readTuple();
    const _uint42_varuint16 = source.readBoolean();
    const _uint42_varuint32 = source.readBoolean();
    const _uint42_bool = source.readBoolean();
    const _uint42_cell = source.readBoolean();
    const _uint42_address = source.readBoolean();
    const _uint42_struct = source.readBoolean();
    const _uint256_varint16 = source.readBoolean();
    const _uint256_varint32 = source.readBoolean();
    const _uint256_varuint16 = source.readBoolean();
    const _uint256_varuint32 = source.readBoolean();
    const _uint256_bool = source.readBoolean();
    const _uint256_cell = source.readBoolean();
    const _uint256_address = source.readBoolean();
    const _uint256_struct = source.readBoolean();
    source = source.readTuple();
    const _address_varint16 = source.readBoolean();
    const _address_varint32 = source.readBoolean();
    const _address_varuint16 = source.readBoolean();
    const _address_varuint32 = source.readBoolean();
    const _address_bool = source.readBoolean();
    const _address_cell = source.readBoolean();
    const _address_address = source.readBoolean();
    const _address_struct = source.readBoolean();
    return { $$type: 'ExistsAllMapsResult' as const, int_varint16: _int_varint16, int_varint32: _int_varint32, int_varuint16: _int_varuint16, int_varuint32: _int_varuint32, int_bool: _int_bool, int_cell: _int_cell, int_address: _int_address, int_struct: _int_struct, int8_varint16: _int8_varint16, int8_varint32: _int8_varint32, int8_varuint16: _int8_varuint16, int8_varuint32: _int8_varuint32, int8_bool: _int8_bool, int8_cell: _int8_cell, int8_address: _int8_address, int8_struct: _int8_struct, int42_varint16: _int42_varint16, int42_varint32: _int42_varint32, int42_varuint16: _int42_varuint16, int42_varuint32: _int42_varuint32, int42_bool: _int42_bool, int42_cell: _int42_cell, int42_address: _int42_address, int42_struct: _int42_struct, int256_varint16: _int256_varint16, int256_varint32: _int256_varint32, int256_varuint16: _int256_varuint16, int256_varuint32: _int256_varuint32, int256_bool: _int256_bool, int256_cell: _int256_cell, int256_address: _int256_address, int256_struct: _int256_struct, uint8_varint16: _uint8_varint16, uint8_varint32: _uint8_varint32, uint8_varuint16: _uint8_varuint16, uint8_varuint32: _uint8_varuint32, uint8_bool: _uint8_bool, uint8_cell: _uint8_cell, uint8_address: _uint8_address, uint8_struct: _uint8_struct, uint42_varint16: _uint42_varint16, uint42_varint32: _uint42_varint32, uint42_varuint16: _uint42_varuint16, uint42_varuint32: _uint42_varuint32, uint42_bool: _uint42_bool, uint42_cell: _uint42_cell, uint42_address: _uint42_address, uint42_struct: _uint42_struct, uint256_varint16: _uint256_varint16, uint256_varint32: _uint256_varint32, uint256_varuint16: _uint256_varuint16, uint256_varuint32: _uint256_varuint32, uint256_bool: _uint256_bool, uint256_cell: _uint256_cell, uint256_address: _uint256_address, uint256_struct: _uint256_struct, address_varint16: _address_varint16, address_varint32: _address_varint32, address_varuint16: _address_varuint16, address_varuint32: _address_varuint32, address_bool: _address_bool, address_cell: _address_cell, address_address: _address_address, address_struct: _address_struct };
}

function loadGetterTupleExistsAllMapsResult(source: TupleReader) {
    const _int_varint16 = source.readBoolean();
    const _int_varint32 = source.readBoolean();
    const _int_varuint16 = source.readBoolean();
    const _int_varuint32 = source.readBoolean();
    const _int_bool = source.readBoolean();
    const _int_cell = source.readBoolean();
    const _int_address = source.readBoolean();
    const _int_struct = source.readBoolean();
    const _int8_varint16 = source.readBoolean();
    const _int8_varint32 = source.readBoolean();
    const _int8_varuint16 = source.readBoolean();
    const _int8_varuint32 = source.readBoolean();
    const _int8_bool = source.readBoolean();
    const _int8_cell = source.readBoolean();
    const _int8_address = source.readBoolean();
    const _int8_struct = source.readBoolean();
    const _int42_varint16 = source.readBoolean();
    const _int42_varint32 = source.readBoolean();
    const _int42_varuint16 = source.readBoolean();
    const _int42_varuint32 = source.readBoolean();
    const _int42_bool = source.readBoolean();
    const _int42_cell = source.readBoolean();
    const _int42_address = source.readBoolean();
    const _int42_struct = source.readBoolean();
    const _int256_varint16 = source.readBoolean();
    const _int256_varint32 = source.readBoolean();
    const _int256_varuint16 = source.readBoolean();
    const _int256_varuint32 = source.readBoolean();
    const _int256_bool = source.readBoolean();
    const _int256_cell = source.readBoolean();
    const _int256_address = source.readBoolean();
    const _int256_struct = source.readBoolean();
    const _uint8_varint16 = source.readBoolean();
    const _uint8_varint32 = source.readBoolean();
    const _uint8_varuint16 = source.readBoolean();
    const _uint8_varuint32 = source.readBoolean();
    const _uint8_bool = source.readBoolean();
    const _uint8_cell = source.readBoolean();
    const _uint8_address = source.readBoolean();
    const _uint8_struct = source.readBoolean();
    const _uint42_varint16 = source.readBoolean();
    const _uint42_varint32 = source.readBoolean();
    const _uint42_varuint16 = source.readBoolean();
    const _uint42_varuint32 = source.readBoolean();
    const _uint42_bool = source.readBoolean();
    const _uint42_cell = source.readBoolean();
    const _uint42_address = source.readBoolean();
    const _uint42_struct = source.readBoolean();
    const _uint256_varint16 = source.readBoolean();
    const _uint256_varint32 = source.readBoolean();
    const _uint256_varuint16 = source.readBoolean();
    const _uint256_varuint32 = source.readBoolean();
    const _uint256_bool = source.readBoolean();
    const _uint256_cell = source.readBoolean();
    const _uint256_address = source.readBoolean();
    const _uint256_struct = source.readBoolean();
    const _address_varint16 = source.readBoolean();
    const _address_varint32 = source.readBoolean();
    const _address_varuint16 = source.readBoolean();
    const _address_varuint32 = source.readBoolean();
    const _address_bool = source.readBoolean();
    const _address_cell = source.readBoolean();
    const _address_address = source.readBoolean();
    const _address_struct = source.readBoolean();
    return { $$type: 'ExistsAllMapsResult' as const, int_varint16: _int_varint16, int_varint32: _int_varint32, int_varuint16: _int_varuint16, int_varuint32: _int_varuint32, int_bool: _int_bool, int_cell: _int_cell, int_address: _int_address, int_struct: _int_struct, int8_varint16: _int8_varint16, int8_varint32: _int8_varint32, int8_varuint16: _int8_varuint16, int8_varuint32: _int8_varuint32, int8_bool: _int8_bool, int8_cell: _int8_cell, int8_address: _int8_address, int8_struct: _int8_struct, int42_varint16: _int42_varint16, int42_varint32: _int42_varint32, int42_varuint16: _int42_varuint16, int42_varuint32: _int42_varuint32, int42_bool: _int42_bool, int42_cell: _int42_cell, int42_address: _int42_address, int42_struct: _int42_struct, int256_varint16: _int256_varint16, int256_varint32: _int256_varint32, int256_varuint16: _int256_varuint16, int256_varuint32: _int256_varuint32, int256_bool: _int256_bool, int256_cell: _int256_cell, int256_address: _int256_address, int256_struct: _int256_struct, uint8_varint16: _uint8_varint16, uint8_varint32: _uint8_varint32, uint8_varuint16: _uint8_varuint16, uint8_varuint32: _uint8_varuint32, uint8_bool: _uint8_bool, uint8_cell: _uint8_cell, uint8_address: _uint8_address, uint8_struct: _uint8_struct, uint42_varint16: _uint42_varint16, uint42_varint32: _uint42_varint32, uint42_varuint16: _uint42_varuint16, uint42_varuint32: _uint42_varuint32, uint42_bool: _uint42_bool, uint42_cell: _uint42_cell, uint42_address: _uint42_address, uint42_struct: _uint42_struct, uint256_varint16: _uint256_varint16, uint256_varint32: _uint256_varint32, uint256_varuint16: _uint256_varuint16, uint256_varuint32: _uint256_varuint32, uint256_bool: _uint256_bool, uint256_cell: _uint256_cell, uint256_address: _uint256_address, uint256_struct: _uint256_struct, address_varint16: _address_varint16, address_varint32: _address_varint32, address_varuint16: _address_varuint16, address_varuint32: _address_varuint32, address_bool: _address_bool, address_cell: _address_cell, address_address: _address_address, address_struct: _address_struct };
}

function storeTupleExistsAllMapsResult(source: ExistsAllMapsResult) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.int_varint16);
    builder.writeBoolean(source.int_varint32);
    builder.writeBoolean(source.int_varuint16);
    builder.writeBoolean(source.int_varuint32);
    builder.writeBoolean(source.int_bool);
    builder.writeBoolean(source.int_cell);
    builder.writeBoolean(source.int_address);
    builder.writeBoolean(source.int_struct);
    builder.writeBoolean(source.int8_varint16);
    builder.writeBoolean(source.int8_varint32);
    builder.writeBoolean(source.int8_varuint16);
    builder.writeBoolean(source.int8_varuint32);
    builder.writeBoolean(source.int8_bool);
    builder.writeBoolean(source.int8_cell);
    builder.writeBoolean(source.int8_address);
    builder.writeBoolean(source.int8_struct);
    builder.writeBoolean(source.int42_varint16);
    builder.writeBoolean(source.int42_varint32);
    builder.writeBoolean(source.int42_varuint16);
    builder.writeBoolean(source.int42_varuint32);
    builder.writeBoolean(source.int42_bool);
    builder.writeBoolean(source.int42_cell);
    builder.writeBoolean(source.int42_address);
    builder.writeBoolean(source.int42_struct);
    builder.writeBoolean(source.int256_varint16);
    builder.writeBoolean(source.int256_varint32);
    builder.writeBoolean(source.int256_varuint16);
    builder.writeBoolean(source.int256_varuint32);
    builder.writeBoolean(source.int256_bool);
    builder.writeBoolean(source.int256_cell);
    builder.writeBoolean(source.int256_address);
    builder.writeBoolean(source.int256_struct);
    builder.writeBoolean(source.uint8_varint16);
    builder.writeBoolean(source.uint8_varint32);
    builder.writeBoolean(source.uint8_varuint16);
    builder.writeBoolean(source.uint8_varuint32);
    builder.writeBoolean(source.uint8_bool);
    builder.writeBoolean(source.uint8_cell);
    builder.writeBoolean(source.uint8_address);
    builder.writeBoolean(source.uint8_struct);
    builder.writeBoolean(source.uint42_varint16);
    builder.writeBoolean(source.uint42_varint32);
    builder.writeBoolean(source.uint42_varuint16);
    builder.writeBoolean(source.uint42_varuint32);
    builder.writeBoolean(source.uint42_bool);
    builder.writeBoolean(source.uint42_cell);
    builder.writeBoolean(source.uint42_address);
    builder.writeBoolean(source.uint42_struct);
    builder.writeBoolean(source.uint256_varint16);
    builder.writeBoolean(source.uint256_varint32);
    builder.writeBoolean(source.uint256_varuint16);
    builder.writeBoolean(source.uint256_varuint32);
    builder.writeBoolean(source.uint256_bool);
    builder.writeBoolean(source.uint256_cell);
    builder.writeBoolean(source.uint256_address);
    builder.writeBoolean(source.uint256_struct);
    builder.writeBoolean(source.address_varint16);
    builder.writeBoolean(source.address_varint32);
    builder.writeBoolean(source.address_varuint16);
    builder.writeBoolean(source.address_varuint32);
    builder.writeBoolean(source.address_bool);
    builder.writeBoolean(source.address_cell);
    builder.writeBoolean(source.address_address);
    builder.writeBoolean(source.address_struct);
    return builder.build();
}

function dictValueParserExistsAllMapsResult(): DictionaryValue<ExistsAllMapsResult> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExistsAllMapsResult(src)).endCell());
        },
        parse: (src) => {
            return loadExistsAllMapsResult(src.loadRef().beginParse());
        }
    }
}

export type IsEmptyAllMapsResult = {
    $$type: 'IsEmptyAllMapsResult';
    int_varint16: boolean;
    int_varint32: boolean;
    int_varuint16: boolean;
    int_varuint32: boolean;
    int_bool: boolean;
    int_cell: boolean;
    int_address: boolean;
    int_struct: boolean;
    int8_varint16: boolean;
    int8_varint32: boolean;
    int8_varuint16: boolean;
    int8_varuint32: boolean;
    int8_bool: boolean;
    int8_cell: boolean;
    int8_address: boolean;
    int8_struct: boolean;
    int42_varint16: boolean;
    int42_varint32: boolean;
    int42_varuint16: boolean;
    int42_varuint32: boolean;
    int42_bool: boolean;
    int42_cell: boolean;
    int42_address: boolean;
    int42_struct: boolean;
    int256_varint16: boolean;
    int256_varint32: boolean;
    int256_varuint16: boolean;
    int256_varuint32: boolean;
    int256_bool: boolean;
    int256_cell: boolean;
    int256_address: boolean;
    int256_struct: boolean;
    uint8_varint16: boolean;
    uint8_varint32: boolean;
    uint8_varuint16: boolean;
    uint8_varuint32: boolean;
    uint8_bool: boolean;
    uint8_cell: boolean;
    uint8_address: boolean;
    uint8_struct: boolean;
    uint42_varint16: boolean;
    uint42_varint32: boolean;
    uint42_varuint16: boolean;
    uint42_varuint32: boolean;
    uint42_bool: boolean;
    uint42_cell: boolean;
    uint42_address: boolean;
    uint42_struct: boolean;
    uint256_varint16: boolean;
    uint256_varint32: boolean;
    uint256_varuint16: boolean;
    uint256_varuint32: boolean;
    uint256_bool: boolean;
    uint256_cell: boolean;
    uint256_address: boolean;
    uint256_struct: boolean;
    address_varint16: boolean;
    address_varint32: boolean;
    address_varuint16: boolean;
    address_varuint32: boolean;
    address_bool: boolean;
    address_cell: boolean;
    address_address: boolean;
    address_struct: boolean;
}

export function storeIsEmptyAllMapsResult(src: IsEmptyAllMapsResult) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.int_varint16);
        b_0.storeBit(src.int_varint32);
        b_0.storeBit(src.int_varuint16);
        b_0.storeBit(src.int_varuint32);
        b_0.storeBit(src.int_bool);
        b_0.storeBit(src.int_cell);
        b_0.storeBit(src.int_address);
        b_0.storeBit(src.int_struct);
        b_0.storeBit(src.int8_varint16);
        b_0.storeBit(src.int8_varint32);
        b_0.storeBit(src.int8_varuint16);
        b_0.storeBit(src.int8_varuint32);
        b_0.storeBit(src.int8_bool);
        b_0.storeBit(src.int8_cell);
        b_0.storeBit(src.int8_address);
        b_0.storeBit(src.int8_struct);
        b_0.storeBit(src.int42_varint16);
        b_0.storeBit(src.int42_varint32);
        b_0.storeBit(src.int42_varuint16);
        b_0.storeBit(src.int42_varuint32);
        b_0.storeBit(src.int42_bool);
        b_0.storeBit(src.int42_cell);
        b_0.storeBit(src.int42_address);
        b_0.storeBit(src.int42_struct);
        b_0.storeBit(src.int256_varint16);
        b_0.storeBit(src.int256_varint32);
        b_0.storeBit(src.int256_varuint16);
        b_0.storeBit(src.int256_varuint32);
        b_0.storeBit(src.int256_bool);
        b_0.storeBit(src.int256_cell);
        b_0.storeBit(src.int256_address);
        b_0.storeBit(src.int256_struct);
        b_0.storeBit(src.uint8_varint16);
        b_0.storeBit(src.uint8_varint32);
        b_0.storeBit(src.uint8_varuint16);
        b_0.storeBit(src.uint8_varuint32);
        b_0.storeBit(src.uint8_bool);
        b_0.storeBit(src.uint8_cell);
        b_0.storeBit(src.uint8_address);
        b_0.storeBit(src.uint8_struct);
        b_0.storeBit(src.uint42_varint16);
        b_0.storeBit(src.uint42_varint32);
        b_0.storeBit(src.uint42_varuint16);
        b_0.storeBit(src.uint42_varuint32);
        b_0.storeBit(src.uint42_bool);
        b_0.storeBit(src.uint42_cell);
        b_0.storeBit(src.uint42_address);
        b_0.storeBit(src.uint42_struct);
        b_0.storeBit(src.uint256_varint16);
        b_0.storeBit(src.uint256_varint32);
        b_0.storeBit(src.uint256_varuint16);
        b_0.storeBit(src.uint256_varuint32);
        b_0.storeBit(src.uint256_bool);
        b_0.storeBit(src.uint256_cell);
        b_0.storeBit(src.uint256_address);
        b_0.storeBit(src.uint256_struct);
        b_0.storeBit(src.address_varint16);
        b_0.storeBit(src.address_varint32);
        b_0.storeBit(src.address_varuint16);
        b_0.storeBit(src.address_varuint32);
        b_0.storeBit(src.address_bool);
        b_0.storeBit(src.address_cell);
        b_0.storeBit(src.address_address);
        b_0.storeBit(src.address_struct);
    };
}

export function loadIsEmptyAllMapsResult(slice: Slice) {
    const sc_0 = slice;
    const _int_varint16 = sc_0.loadBit();
    const _int_varint32 = sc_0.loadBit();
    const _int_varuint16 = sc_0.loadBit();
    const _int_varuint32 = sc_0.loadBit();
    const _int_bool = sc_0.loadBit();
    const _int_cell = sc_0.loadBit();
    const _int_address = sc_0.loadBit();
    const _int_struct = sc_0.loadBit();
    const _int8_varint16 = sc_0.loadBit();
    const _int8_varint32 = sc_0.loadBit();
    const _int8_varuint16 = sc_0.loadBit();
    const _int8_varuint32 = sc_0.loadBit();
    const _int8_bool = sc_0.loadBit();
    const _int8_cell = sc_0.loadBit();
    const _int8_address = sc_0.loadBit();
    const _int8_struct = sc_0.loadBit();
    const _int42_varint16 = sc_0.loadBit();
    const _int42_varint32 = sc_0.loadBit();
    const _int42_varuint16 = sc_0.loadBit();
    const _int42_varuint32 = sc_0.loadBit();
    const _int42_bool = sc_0.loadBit();
    const _int42_cell = sc_0.loadBit();
    const _int42_address = sc_0.loadBit();
    const _int42_struct = sc_0.loadBit();
    const _int256_varint16 = sc_0.loadBit();
    const _int256_varint32 = sc_0.loadBit();
    const _int256_varuint16 = sc_0.loadBit();
    const _int256_varuint32 = sc_0.loadBit();
    const _int256_bool = sc_0.loadBit();
    const _int256_cell = sc_0.loadBit();
    const _int256_address = sc_0.loadBit();
    const _int256_struct = sc_0.loadBit();
    const _uint8_varint16 = sc_0.loadBit();
    const _uint8_varint32 = sc_0.loadBit();
    const _uint8_varuint16 = sc_0.loadBit();
    const _uint8_varuint32 = sc_0.loadBit();
    const _uint8_bool = sc_0.loadBit();
    const _uint8_cell = sc_0.loadBit();
    const _uint8_address = sc_0.loadBit();
    const _uint8_struct = sc_0.loadBit();
    const _uint42_varint16 = sc_0.loadBit();
    const _uint42_varint32 = sc_0.loadBit();
    const _uint42_varuint16 = sc_0.loadBit();
    const _uint42_varuint32 = sc_0.loadBit();
    const _uint42_bool = sc_0.loadBit();
    const _uint42_cell = sc_0.loadBit();
    const _uint42_address = sc_0.loadBit();
    const _uint42_struct = sc_0.loadBit();
    const _uint256_varint16 = sc_0.loadBit();
    const _uint256_varint32 = sc_0.loadBit();
    const _uint256_varuint16 = sc_0.loadBit();
    const _uint256_varuint32 = sc_0.loadBit();
    const _uint256_bool = sc_0.loadBit();
    const _uint256_cell = sc_0.loadBit();
    const _uint256_address = sc_0.loadBit();
    const _uint256_struct = sc_0.loadBit();
    const _address_varint16 = sc_0.loadBit();
    const _address_varint32 = sc_0.loadBit();
    const _address_varuint16 = sc_0.loadBit();
    const _address_varuint32 = sc_0.loadBit();
    const _address_bool = sc_0.loadBit();
    const _address_cell = sc_0.loadBit();
    const _address_address = sc_0.loadBit();
    const _address_struct = sc_0.loadBit();
    return { $$type: 'IsEmptyAllMapsResult' as const, int_varint16: _int_varint16, int_varint32: _int_varint32, int_varuint16: _int_varuint16, int_varuint32: _int_varuint32, int_bool: _int_bool, int_cell: _int_cell, int_address: _int_address, int_struct: _int_struct, int8_varint16: _int8_varint16, int8_varint32: _int8_varint32, int8_varuint16: _int8_varuint16, int8_varuint32: _int8_varuint32, int8_bool: _int8_bool, int8_cell: _int8_cell, int8_address: _int8_address, int8_struct: _int8_struct, int42_varint16: _int42_varint16, int42_varint32: _int42_varint32, int42_varuint16: _int42_varuint16, int42_varuint32: _int42_varuint32, int42_bool: _int42_bool, int42_cell: _int42_cell, int42_address: _int42_address, int42_struct: _int42_struct, int256_varint16: _int256_varint16, int256_varint32: _int256_varint32, int256_varuint16: _int256_varuint16, int256_varuint32: _int256_varuint32, int256_bool: _int256_bool, int256_cell: _int256_cell, int256_address: _int256_address, int256_struct: _int256_struct, uint8_varint16: _uint8_varint16, uint8_varint32: _uint8_varint32, uint8_varuint16: _uint8_varuint16, uint8_varuint32: _uint8_varuint32, uint8_bool: _uint8_bool, uint8_cell: _uint8_cell, uint8_address: _uint8_address, uint8_struct: _uint8_struct, uint42_varint16: _uint42_varint16, uint42_varint32: _uint42_varint32, uint42_varuint16: _uint42_varuint16, uint42_varuint32: _uint42_varuint32, uint42_bool: _uint42_bool, uint42_cell: _uint42_cell, uint42_address: _uint42_address, uint42_struct: _uint42_struct, uint256_varint16: _uint256_varint16, uint256_varint32: _uint256_varint32, uint256_varuint16: _uint256_varuint16, uint256_varuint32: _uint256_varuint32, uint256_bool: _uint256_bool, uint256_cell: _uint256_cell, uint256_address: _uint256_address, uint256_struct: _uint256_struct, address_varint16: _address_varint16, address_varint32: _address_varint32, address_varuint16: _address_varuint16, address_varuint32: _address_varuint32, address_bool: _address_bool, address_cell: _address_cell, address_address: _address_address, address_struct: _address_struct };
}

function loadTupleIsEmptyAllMapsResult(source: TupleReader) {
    const _int_varint16 = source.readBoolean();
    const _int_varint32 = source.readBoolean();
    const _int_varuint16 = source.readBoolean();
    const _int_varuint32 = source.readBoolean();
    const _int_bool = source.readBoolean();
    const _int_cell = source.readBoolean();
    const _int_address = source.readBoolean();
    const _int_struct = source.readBoolean();
    const _int8_varint16 = source.readBoolean();
    const _int8_varint32 = source.readBoolean();
    const _int8_varuint16 = source.readBoolean();
    const _int8_varuint32 = source.readBoolean();
    const _int8_bool = source.readBoolean();
    const _int8_cell = source.readBoolean();
    source = source.readTuple();
    const _int8_address = source.readBoolean();
    const _int8_struct = source.readBoolean();
    const _int42_varint16 = source.readBoolean();
    const _int42_varint32 = source.readBoolean();
    const _int42_varuint16 = source.readBoolean();
    const _int42_varuint32 = source.readBoolean();
    const _int42_bool = source.readBoolean();
    const _int42_cell = source.readBoolean();
    const _int42_address = source.readBoolean();
    const _int42_struct = source.readBoolean();
    const _int256_varint16 = source.readBoolean();
    const _int256_varint32 = source.readBoolean();
    const _int256_varuint16 = source.readBoolean();
    const _int256_varuint32 = source.readBoolean();
    source = source.readTuple();
    const _int256_bool = source.readBoolean();
    const _int256_cell = source.readBoolean();
    const _int256_address = source.readBoolean();
    const _int256_struct = source.readBoolean();
    const _uint8_varint16 = source.readBoolean();
    const _uint8_varint32 = source.readBoolean();
    const _uint8_varuint16 = source.readBoolean();
    const _uint8_varuint32 = source.readBoolean();
    const _uint8_bool = source.readBoolean();
    const _uint8_cell = source.readBoolean();
    const _uint8_address = source.readBoolean();
    const _uint8_struct = source.readBoolean();
    const _uint42_varint16 = source.readBoolean();
    const _uint42_varint32 = source.readBoolean();
    source = source.readTuple();
    const _uint42_varuint16 = source.readBoolean();
    const _uint42_varuint32 = source.readBoolean();
    const _uint42_bool = source.readBoolean();
    const _uint42_cell = source.readBoolean();
    const _uint42_address = source.readBoolean();
    const _uint42_struct = source.readBoolean();
    const _uint256_varint16 = source.readBoolean();
    const _uint256_varint32 = source.readBoolean();
    const _uint256_varuint16 = source.readBoolean();
    const _uint256_varuint32 = source.readBoolean();
    const _uint256_bool = source.readBoolean();
    const _uint256_cell = source.readBoolean();
    const _uint256_address = source.readBoolean();
    const _uint256_struct = source.readBoolean();
    source = source.readTuple();
    const _address_varint16 = source.readBoolean();
    const _address_varint32 = source.readBoolean();
    const _address_varuint16 = source.readBoolean();
    const _address_varuint32 = source.readBoolean();
    const _address_bool = source.readBoolean();
    const _address_cell = source.readBoolean();
    const _address_address = source.readBoolean();
    const _address_struct = source.readBoolean();
    return { $$type: 'IsEmptyAllMapsResult' as const, int_varint16: _int_varint16, int_varint32: _int_varint32, int_varuint16: _int_varuint16, int_varuint32: _int_varuint32, int_bool: _int_bool, int_cell: _int_cell, int_address: _int_address, int_struct: _int_struct, int8_varint16: _int8_varint16, int8_varint32: _int8_varint32, int8_varuint16: _int8_varuint16, int8_varuint32: _int8_varuint32, int8_bool: _int8_bool, int8_cell: _int8_cell, int8_address: _int8_address, int8_struct: _int8_struct, int42_varint16: _int42_varint16, int42_varint32: _int42_varint32, int42_varuint16: _int42_varuint16, int42_varuint32: _int42_varuint32, int42_bool: _int42_bool, int42_cell: _int42_cell, int42_address: _int42_address, int42_struct: _int42_struct, int256_varint16: _int256_varint16, int256_varint32: _int256_varint32, int256_varuint16: _int256_varuint16, int256_varuint32: _int256_varuint32, int256_bool: _int256_bool, int256_cell: _int256_cell, int256_address: _int256_address, int256_struct: _int256_struct, uint8_varint16: _uint8_varint16, uint8_varint32: _uint8_varint32, uint8_varuint16: _uint8_varuint16, uint8_varuint32: _uint8_varuint32, uint8_bool: _uint8_bool, uint8_cell: _uint8_cell, uint8_address: _uint8_address, uint8_struct: _uint8_struct, uint42_varint16: _uint42_varint16, uint42_varint32: _uint42_varint32, uint42_varuint16: _uint42_varuint16, uint42_varuint32: _uint42_varuint32, uint42_bool: _uint42_bool, uint42_cell: _uint42_cell, uint42_address: _uint42_address, uint42_struct: _uint42_struct, uint256_varint16: _uint256_varint16, uint256_varint32: _uint256_varint32, uint256_varuint16: _uint256_varuint16, uint256_varuint32: _uint256_varuint32, uint256_bool: _uint256_bool, uint256_cell: _uint256_cell, uint256_address: _uint256_address, uint256_struct: _uint256_struct, address_varint16: _address_varint16, address_varint32: _address_varint32, address_varuint16: _address_varuint16, address_varuint32: _address_varuint32, address_bool: _address_bool, address_cell: _address_cell, address_address: _address_address, address_struct: _address_struct };
}

function loadGetterTupleIsEmptyAllMapsResult(source: TupleReader) {
    const _int_varint16 = source.readBoolean();
    const _int_varint32 = source.readBoolean();
    const _int_varuint16 = source.readBoolean();
    const _int_varuint32 = source.readBoolean();
    const _int_bool = source.readBoolean();
    const _int_cell = source.readBoolean();
    const _int_address = source.readBoolean();
    const _int_struct = source.readBoolean();
    const _int8_varint16 = source.readBoolean();
    const _int8_varint32 = source.readBoolean();
    const _int8_varuint16 = source.readBoolean();
    const _int8_varuint32 = source.readBoolean();
    const _int8_bool = source.readBoolean();
    const _int8_cell = source.readBoolean();
    const _int8_address = source.readBoolean();
    const _int8_struct = source.readBoolean();
    const _int42_varint16 = source.readBoolean();
    const _int42_varint32 = source.readBoolean();
    const _int42_varuint16 = source.readBoolean();
    const _int42_varuint32 = source.readBoolean();
    const _int42_bool = source.readBoolean();
    const _int42_cell = source.readBoolean();
    const _int42_address = source.readBoolean();
    const _int42_struct = source.readBoolean();
    const _int256_varint16 = source.readBoolean();
    const _int256_varint32 = source.readBoolean();
    const _int256_varuint16 = source.readBoolean();
    const _int256_varuint32 = source.readBoolean();
    const _int256_bool = source.readBoolean();
    const _int256_cell = source.readBoolean();
    const _int256_address = source.readBoolean();
    const _int256_struct = source.readBoolean();
    const _uint8_varint16 = source.readBoolean();
    const _uint8_varint32 = source.readBoolean();
    const _uint8_varuint16 = source.readBoolean();
    const _uint8_varuint32 = source.readBoolean();
    const _uint8_bool = source.readBoolean();
    const _uint8_cell = source.readBoolean();
    const _uint8_address = source.readBoolean();
    const _uint8_struct = source.readBoolean();
    const _uint42_varint16 = source.readBoolean();
    const _uint42_varint32 = source.readBoolean();
    const _uint42_varuint16 = source.readBoolean();
    const _uint42_varuint32 = source.readBoolean();
    const _uint42_bool = source.readBoolean();
    const _uint42_cell = source.readBoolean();
    const _uint42_address = source.readBoolean();
    const _uint42_struct = source.readBoolean();
    const _uint256_varint16 = source.readBoolean();
    const _uint256_varint32 = source.readBoolean();
    const _uint256_varuint16 = source.readBoolean();
    const _uint256_varuint32 = source.readBoolean();
    const _uint256_bool = source.readBoolean();
    const _uint256_cell = source.readBoolean();
    const _uint256_address = source.readBoolean();
    const _uint256_struct = source.readBoolean();
    const _address_varint16 = source.readBoolean();
    const _address_varint32 = source.readBoolean();
    const _address_varuint16 = source.readBoolean();
    const _address_varuint32 = source.readBoolean();
    const _address_bool = source.readBoolean();
    const _address_cell = source.readBoolean();
    const _address_address = source.readBoolean();
    const _address_struct = source.readBoolean();
    return { $$type: 'IsEmptyAllMapsResult' as const, int_varint16: _int_varint16, int_varint32: _int_varint32, int_varuint16: _int_varuint16, int_varuint32: _int_varuint32, int_bool: _int_bool, int_cell: _int_cell, int_address: _int_address, int_struct: _int_struct, int8_varint16: _int8_varint16, int8_varint32: _int8_varint32, int8_varuint16: _int8_varuint16, int8_varuint32: _int8_varuint32, int8_bool: _int8_bool, int8_cell: _int8_cell, int8_address: _int8_address, int8_struct: _int8_struct, int42_varint16: _int42_varint16, int42_varint32: _int42_varint32, int42_varuint16: _int42_varuint16, int42_varuint32: _int42_varuint32, int42_bool: _int42_bool, int42_cell: _int42_cell, int42_address: _int42_address, int42_struct: _int42_struct, int256_varint16: _int256_varint16, int256_varint32: _int256_varint32, int256_varuint16: _int256_varuint16, int256_varuint32: _int256_varuint32, int256_bool: _int256_bool, int256_cell: _int256_cell, int256_address: _int256_address, int256_struct: _int256_struct, uint8_varint16: _uint8_varint16, uint8_varint32: _uint8_varint32, uint8_varuint16: _uint8_varuint16, uint8_varuint32: _uint8_varuint32, uint8_bool: _uint8_bool, uint8_cell: _uint8_cell, uint8_address: _uint8_address, uint8_struct: _uint8_struct, uint42_varint16: _uint42_varint16, uint42_varint32: _uint42_varint32, uint42_varuint16: _uint42_varuint16, uint42_varuint32: _uint42_varuint32, uint42_bool: _uint42_bool, uint42_cell: _uint42_cell, uint42_address: _uint42_address, uint42_struct: _uint42_struct, uint256_varint16: _uint256_varint16, uint256_varint32: _uint256_varint32, uint256_varuint16: _uint256_varuint16, uint256_varuint32: _uint256_varuint32, uint256_bool: _uint256_bool, uint256_cell: _uint256_cell, uint256_address: _uint256_address, uint256_struct: _uint256_struct, address_varint16: _address_varint16, address_varint32: _address_varint32, address_varuint16: _address_varuint16, address_varuint32: _address_varuint32, address_bool: _address_bool, address_cell: _address_cell, address_address: _address_address, address_struct: _address_struct };
}

function storeTupleIsEmptyAllMapsResult(source: IsEmptyAllMapsResult) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.int_varint16);
    builder.writeBoolean(source.int_varint32);
    builder.writeBoolean(source.int_varuint16);
    builder.writeBoolean(source.int_varuint32);
    builder.writeBoolean(source.int_bool);
    builder.writeBoolean(source.int_cell);
    builder.writeBoolean(source.int_address);
    builder.writeBoolean(source.int_struct);
    builder.writeBoolean(source.int8_varint16);
    builder.writeBoolean(source.int8_varint32);
    builder.writeBoolean(source.int8_varuint16);
    builder.writeBoolean(source.int8_varuint32);
    builder.writeBoolean(source.int8_bool);
    builder.writeBoolean(source.int8_cell);
    builder.writeBoolean(source.int8_address);
    builder.writeBoolean(source.int8_struct);
    builder.writeBoolean(source.int42_varint16);
    builder.writeBoolean(source.int42_varint32);
    builder.writeBoolean(source.int42_varuint16);
    builder.writeBoolean(source.int42_varuint32);
    builder.writeBoolean(source.int42_bool);
    builder.writeBoolean(source.int42_cell);
    builder.writeBoolean(source.int42_address);
    builder.writeBoolean(source.int42_struct);
    builder.writeBoolean(source.int256_varint16);
    builder.writeBoolean(source.int256_varint32);
    builder.writeBoolean(source.int256_varuint16);
    builder.writeBoolean(source.int256_varuint32);
    builder.writeBoolean(source.int256_bool);
    builder.writeBoolean(source.int256_cell);
    builder.writeBoolean(source.int256_address);
    builder.writeBoolean(source.int256_struct);
    builder.writeBoolean(source.uint8_varint16);
    builder.writeBoolean(source.uint8_varint32);
    builder.writeBoolean(source.uint8_varuint16);
    builder.writeBoolean(source.uint8_varuint32);
    builder.writeBoolean(source.uint8_bool);
    builder.writeBoolean(source.uint8_cell);
    builder.writeBoolean(source.uint8_address);
    builder.writeBoolean(source.uint8_struct);
    builder.writeBoolean(source.uint42_varint16);
    builder.writeBoolean(source.uint42_varint32);
    builder.writeBoolean(source.uint42_varuint16);
    builder.writeBoolean(source.uint42_varuint32);
    builder.writeBoolean(source.uint42_bool);
    builder.writeBoolean(source.uint42_cell);
    builder.writeBoolean(source.uint42_address);
    builder.writeBoolean(source.uint42_struct);
    builder.writeBoolean(source.uint256_varint16);
    builder.writeBoolean(source.uint256_varint32);
    builder.writeBoolean(source.uint256_varuint16);
    builder.writeBoolean(source.uint256_varuint32);
    builder.writeBoolean(source.uint256_bool);
    builder.writeBoolean(source.uint256_cell);
    builder.writeBoolean(source.uint256_address);
    builder.writeBoolean(source.uint256_struct);
    builder.writeBoolean(source.address_varint16);
    builder.writeBoolean(source.address_varint32);
    builder.writeBoolean(source.address_varuint16);
    builder.writeBoolean(source.address_varuint32);
    builder.writeBoolean(source.address_bool);
    builder.writeBoolean(source.address_cell);
    builder.writeBoolean(source.address_address);
    builder.writeBoolean(source.address_struct);
    return builder.build();
}

function dictValueParserIsEmptyAllMapsResult(): DictionaryValue<IsEmptyAllMapsResult> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeIsEmptyAllMapsResult(src)).endCell());
        },
        parse: (src) => {
            return loadIsEmptyAllMapsResult(src.loadRef().beginParse());
        }
    }
}

export type AsCellAllMapsResult = {
    $$type: 'AsCellAllMapsResult';
    int_varint16: Cell | null;
    int_varint32: Cell | null;
    int_varuint16: Cell | null;
    int_varuint32: Cell | null;
    int_bool: Cell | null;
    int_cell: Cell | null;
    int_address: Cell | null;
    int_struct: Cell | null;
    int8_varint16: Cell | null;
    int8_varint32: Cell | null;
    int8_varuint16: Cell | null;
    int8_varuint32: Cell | null;
    int8_bool: Cell | null;
    int8_cell: Cell | null;
    int8_address: Cell | null;
    int8_struct: Cell | null;
    int42_varint16: Cell | null;
    int42_varint32: Cell | null;
    int42_varuint16: Cell | null;
    int42_varuint32: Cell | null;
    int42_bool: Cell | null;
    int42_cell: Cell | null;
    int42_address: Cell | null;
    int42_struct: Cell | null;
    int256_varint16: Cell | null;
    int256_varint32: Cell | null;
    int256_varuint16: Cell | null;
    int256_varuint32: Cell | null;
    int256_bool: Cell | null;
    int256_cell: Cell | null;
    int256_address: Cell | null;
    int256_struct: Cell | null;
    uint8_varint16: Cell | null;
    uint8_varint32: Cell | null;
    uint8_varuint16: Cell | null;
    uint8_varuint32: Cell | null;
    uint8_bool: Cell | null;
    uint8_cell: Cell | null;
    uint8_address: Cell | null;
    uint8_struct: Cell | null;
    uint42_varint16: Cell | null;
    uint42_varint32: Cell | null;
    uint42_varuint16: Cell | null;
    uint42_varuint32: Cell | null;
    uint42_bool: Cell | null;
    uint42_cell: Cell | null;
    uint42_address: Cell | null;
    uint42_struct: Cell | null;
    uint256_varint16: Cell | null;
    uint256_varint32: Cell | null;
    uint256_varuint16: Cell | null;
    uint256_varuint32: Cell | null;
    uint256_bool: Cell | null;
    uint256_cell: Cell | null;
    uint256_address: Cell | null;
    uint256_struct: Cell | null;
    address_varint16: Cell | null;
    address_varint32: Cell | null;
    address_varuint16: Cell | null;
    address_varuint32: Cell | null;
    address_bool: Cell | null;
    address_cell: Cell | null;
    address_address: Cell | null;
    address_struct: Cell | null;
}

export function storeAsCellAllMapsResult(src: AsCellAllMapsResult) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.int_varint16 !== null && src.int_varint16 !== undefined) { b_0.storeBit(true).storeRef(src.int_varint16); } else { b_0.storeBit(false); }
        if (src.int_varint32 !== null && src.int_varint32 !== undefined) { b_0.storeBit(true).storeRef(src.int_varint32); } else { b_0.storeBit(false); }
        const b_1 = new Builder();
        if (src.int_varuint16 !== null && src.int_varuint16 !== undefined) { b_1.storeBit(true).storeRef(src.int_varuint16); } else { b_1.storeBit(false); }
        if (src.int_varuint32 !== null && src.int_varuint32 !== undefined) { b_1.storeBit(true).storeRef(src.int_varuint32); } else { b_1.storeBit(false); }
        if (src.int_bool !== null && src.int_bool !== undefined) { b_1.storeBit(true).storeRef(src.int_bool); } else { b_1.storeBit(false); }
        const b_2 = new Builder();
        if (src.int_cell !== null && src.int_cell !== undefined) { b_2.storeBit(true).storeRef(src.int_cell); } else { b_2.storeBit(false); }
        if (src.int_address !== null && src.int_address !== undefined) { b_2.storeBit(true).storeRef(src.int_address); } else { b_2.storeBit(false); }
        if (src.int_struct !== null && src.int_struct !== undefined) { b_2.storeBit(true).storeRef(src.int_struct); } else { b_2.storeBit(false); }
        const b_3 = new Builder();
        if (src.int8_varint16 !== null && src.int8_varint16 !== undefined) { b_3.storeBit(true).storeRef(src.int8_varint16); } else { b_3.storeBit(false); }
        if (src.int8_varint32 !== null && src.int8_varint32 !== undefined) { b_3.storeBit(true).storeRef(src.int8_varint32); } else { b_3.storeBit(false); }
        if (src.int8_varuint16 !== null && src.int8_varuint16 !== undefined) { b_3.storeBit(true).storeRef(src.int8_varuint16); } else { b_3.storeBit(false); }
        const b_4 = new Builder();
        if (src.int8_varuint32 !== null && src.int8_varuint32 !== undefined) { b_4.storeBit(true).storeRef(src.int8_varuint32); } else { b_4.storeBit(false); }
        if (src.int8_bool !== null && src.int8_bool !== undefined) { b_4.storeBit(true).storeRef(src.int8_bool); } else { b_4.storeBit(false); }
        if (src.int8_cell !== null && src.int8_cell !== undefined) { b_4.storeBit(true).storeRef(src.int8_cell); } else { b_4.storeBit(false); }
        const b_5 = new Builder();
        if (src.int8_address !== null && src.int8_address !== undefined) { b_5.storeBit(true).storeRef(src.int8_address); } else { b_5.storeBit(false); }
        if (src.int8_struct !== null && src.int8_struct !== undefined) { b_5.storeBit(true).storeRef(src.int8_struct); } else { b_5.storeBit(false); }
        if (src.int42_varint16 !== null && src.int42_varint16 !== undefined) { b_5.storeBit(true).storeRef(src.int42_varint16); } else { b_5.storeBit(false); }
        const b_6 = new Builder();
        if (src.int42_varint32 !== null && src.int42_varint32 !== undefined) { b_6.storeBit(true).storeRef(src.int42_varint32); } else { b_6.storeBit(false); }
        if (src.int42_varuint16 !== null && src.int42_varuint16 !== undefined) { b_6.storeBit(true).storeRef(src.int42_varuint16); } else { b_6.storeBit(false); }
        if (src.int42_varuint32 !== null && src.int42_varuint32 !== undefined) { b_6.storeBit(true).storeRef(src.int42_varuint32); } else { b_6.storeBit(false); }
        const b_7 = new Builder();
        if (src.int42_bool !== null && src.int42_bool !== undefined) { b_7.storeBit(true).storeRef(src.int42_bool); } else { b_7.storeBit(false); }
        if (src.int42_cell !== null && src.int42_cell !== undefined) { b_7.storeBit(true).storeRef(src.int42_cell); } else { b_7.storeBit(false); }
        if (src.int42_address !== null && src.int42_address !== undefined) { b_7.storeBit(true).storeRef(src.int42_address); } else { b_7.storeBit(false); }
        const b_8 = new Builder();
        if (src.int42_struct !== null && src.int42_struct !== undefined) { b_8.storeBit(true).storeRef(src.int42_struct); } else { b_8.storeBit(false); }
        if (src.int256_varint16 !== null && src.int256_varint16 !== undefined) { b_8.storeBit(true).storeRef(src.int256_varint16); } else { b_8.storeBit(false); }
        if (src.int256_varint32 !== null && src.int256_varint32 !== undefined) { b_8.storeBit(true).storeRef(src.int256_varint32); } else { b_8.storeBit(false); }
        const b_9 = new Builder();
        if (src.int256_varuint16 !== null && src.int256_varuint16 !== undefined) { b_9.storeBit(true).storeRef(src.int256_varuint16); } else { b_9.storeBit(false); }
        if (src.int256_varuint32 !== null && src.int256_varuint32 !== undefined) { b_9.storeBit(true).storeRef(src.int256_varuint32); } else { b_9.storeBit(false); }
        if (src.int256_bool !== null && src.int256_bool !== undefined) { b_9.storeBit(true).storeRef(src.int256_bool); } else { b_9.storeBit(false); }
        const b_10 = new Builder();
        if (src.int256_cell !== null && src.int256_cell !== undefined) { b_10.storeBit(true).storeRef(src.int256_cell); } else { b_10.storeBit(false); }
        if (src.int256_address !== null && src.int256_address !== undefined) { b_10.storeBit(true).storeRef(src.int256_address); } else { b_10.storeBit(false); }
        if (src.int256_struct !== null && src.int256_struct !== undefined) { b_10.storeBit(true).storeRef(src.int256_struct); } else { b_10.storeBit(false); }
        const b_11 = new Builder();
        if (src.uint8_varint16 !== null && src.uint8_varint16 !== undefined) { b_11.storeBit(true).storeRef(src.uint8_varint16); } else { b_11.storeBit(false); }
        if (src.uint8_varint32 !== null && src.uint8_varint32 !== undefined) { b_11.storeBit(true).storeRef(src.uint8_varint32); } else { b_11.storeBit(false); }
        if (src.uint8_varuint16 !== null && src.uint8_varuint16 !== undefined) { b_11.storeBit(true).storeRef(src.uint8_varuint16); } else { b_11.storeBit(false); }
        const b_12 = new Builder();
        if (src.uint8_varuint32 !== null && src.uint8_varuint32 !== undefined) { b_12.storeBit(true).storeRef(src.uint8_varuint32); } else { b_12.storeBit(false); }
        if (src.uint8_bool !== null && src.uint8_bool !== undefined) { b_12.storeBit(true).storeRef(src.uint8_bool); } else { b_12.storeBit(false); }
        if (src.uint8_cell !== null && src.uint8_cell !== undefined) { b_12.storeBit(true).storeRef(src.uint8_cell); } else { b_12.storeBit(false); }
        const b_13 = new Builder();
        if (src.uint8_address !== null && src.uint8_address !== undefined) { b_13.storeBit(true).storeRef(src.uint8_address); } else { b_13.storeBit(false); }
        if (src.uint8_struct !== null && src.uint8_struct !== undefined) { b_13.storeBit(true).storeRef(src.uint8_struct); } else { b_13.storeBit(false); }
        if (src.uint42_varint16 !== null && src.uint42_varint16 !== undefined) { b_13.storeBit(true).storeRef(src.uint42_varint16); } else { b_13.storeBit(false); }
        const b_14 = new Builder();
        if (src.uint42_varint32 !== null && src.uint42_varint32 !== undefined) { b_14.storeBit(true).storeRef(src.uint42_varint32); } else { b_14.storeBit(false); }
        if (src.uint42_varuint16 !== null && src.uint42_varuint16 !== undefined) { b_14.storeBit(true).storeRef(src.uint42_varuint16); } else { b_14.storeBit(false); }
        if (src.uint42_varuint32 !== null && src.uint42_varuint32 !== undefined) { b_14.storeBit(true).storeRef(src.uint42_varuint32); } else { b_14.storeBit(false); }
        const b_15 = new Builder();
        if (src.uint42_bool !== null && src.uint42_bool !== undefined) { b_15.storeBit(true).storeRef(src.uint42_bool); } else { b_15.storeBit(false); }
        if (src.uint42_cell !== null && src.uint42_cell !== undefined) { b_15.storeBit(true).storeRef(src.uint42_cell); } else { b_15.storeBit(false); }
        if (src.uint42_address !== null && src.uint42_address !== undefined) { b_15.storeBit(true).storeRef(src.uint42_address); } else { b_15.storeBit(false); }
        const b_16 = new Builder();
        if (src.uint42_struct !== null && src.uint42_struct !== undefined) { b_16.storeBit(true).storeRef(src.uint42_struct); } else { b_16.storeBit(false); }
        if (src.uint256_varint16 !== null && src.uint256_varint16 !== undefined) { b_16.storeBit(true).storeRef(src.uint256_varint16); } else { b_16.storeBit(false); }
        if (src.uint256_varint32 !== null && src.uint256_varint32 !== undefined) { b_16.storeBit(true).storeRef(src.uint256_varint32); } else { b_16.storeBit(false); }
        const b_17 = new Builder();
        if (src.uint256_varuint16 !== null && src.uint256_varuint16 !== undefined) { b_17.storeBit(true).storeRef(src.uint256_varuint16); } else { b_17.storeBit(false); }
        if (src.uint256_varuint32 !== null && src.uint256_varuint32 !== undefined) { b_17.storeBit(true).storeRef(src.uint256_varuint32); } else { b_17.storeBit(false); }
        if (src.uint256_bool !== null && src.uint256_bool !== undefined) { b_17.storeBit(true).storeRef(src.uint256_bool); } else { b_17.storeBit(false); }
        const b_18 = new Builder();
        if (src.uint256_cell !== null && src.uint256_cell !== undefined) { b_18.storeBit(true).storeRef(src.uint256_cell); } else { b_18.storeBit(false); }
        if (src.uint256_address !== null && src.uint256_address !== undefined) { b_18.storeBit(true).storeRef(src.uint256_address); } else { b_18.storeBit(false); }
        if (src.uint256_struct !== null && src.uint256_struct !== undefined) { b_18.storeBit(true).storeRef(src.uint256_struct); } else { b_18.storeBit(false); }
        const b_19 = new Builder();
        if (src.address_varint16 !== null && src.address_varint16 !== undefined) { b_19.storeBit(true).storeRef(src.address_varint16); } else { b_19.storeBit(false); }
        if (src.address_varint32 !== null && src.address_varint32 !== undefined) { b_19.storeBit(true).storeRef(src.address_varint32); } else { b_19.storeBit(false); }
        if (src.address_varuint16 !== null && src.address_varuint16 !== undefined) { b_19.storeBit(true).storeRef(src.address_varuint16); } else { b_19.storeBit(false); }
        const b_20 = new Builder();
        if (src.address_varuint32 !== null && src.address_varuint32 !== undefined) { b_20.storeBit(true).storeRef(src.address_varuint32); } else { b_20.storeBit(false); }
        if (src.address_bool !== null && src.address_bool !== undefined) { b_20.storeBit(true).storeRef(src.address_bool); } else { b_20.storeBit(false); }
        if (src.address_cell !== null && src.address_cell !== undefined) { b_20.storeBit(true).storeRef(src.address_cell); } else { b_20.storeBit(false); }
        const b_21 = new Builder();
        if (src.address_address !== null && src.address_address !== undefined) { b_21.storeBit(true).storeRef(src.address_address); } else { b_21.storeBit(false); }
        if (src.address_struct !== null && src.address_struct !== undefined) { b_21.storeBit(true).storeRef(src.address_struct); } else { b_21.storeBit(false); }
        b_20.storeRef(b_21.endCell());
        b_19.storeRef(b_20.endCell());
        b_18.storeRef(b_19.endCell());
        b_17.storeRef(b_18.endCell());
        b_16.storeRef(b_17.endCell());
        b_15.storeRef(b_16.endCell());
        b_14.storeRef(b_15.endCell());
        b_13.storeRef(b_14.endCell());
        b_12.storeRef(b_13.endCell());
        b_11.storeRef(b_12.endCell());
        b_10.storeRef(b_11.endCell());
        b_9.storeRef(b_10.endCell());
        b_8.storeRef(b_9.endCell());
        b_7.storeRef(b_8.endCell());
        b_6.storeRef(b_7.endCell());
        b_5.storeRef(b_6.endCell());
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadAsCellAllMapsResult(slice: Slice) {
    const sc_0 = slice;
    const _int_varint16 = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _int_varint32 = sc_0.loadBit() ? sc_0.loadRef() : null;
    const sc_1 = sc_0.loadRef().beginParse();
    const _int_varuint16 = sc_1.loadBit() ? sc_1.loadRef() : null;
    const _int_varuint32 = sc_1.loadBit() ? sc_1.loadRef() : null;
    const _int_bool = sc_1.loadBit() ? sc_1.loadRef() : null;
    const sc_2 = sc_1.loadRef().beginParse();
    const _int_cell = sc_2.loadBit() ? sc_2.loadRef() : null;
    const _int_address = sc_2.loadBit() ? sc_2.loadRef() : null;
    const _int_struct = sc_2.loadBit() ? sc_2.loadRef() : null;
    const sc_3 = sc_2.loadRef().beginParse();
    const _int8_varint16 = sc_3.loadBit() ? sc_3.loadRef() : null;
    const _int8_varint32 = sc_3.loadBit() ? sc_3.loadRef() : null;
    const _int8_varuint16 = sc_3.loadBit() ? sc_3.loadRef() : null;
    const sc_4 = sc_3.loadRef().beginParse();
    const _int8_varuint32 = sc_4.loadBit() ? sc_4.loadRef() : null;
    const _int8_bool = sc_4.loadBit() ? sc_4.loadRef() : null;
    const _int8_cell = sc_4.loadBit() ? sc_4.loadRef() : null;
    const sc_5 = sc_4.loadRef().beginParse();
    const _int8_address = sc_5.loadBit() ? sc_5.loadRef() : null;
    const _int8_struct = sc_5.loadBit() ? sc_5.loadRef() : null;
    const _int42_varint16 = sc_5.loadBit() ? sc_5.loadRef() : null;
    const sc_6 = sc_5.loadRef().beginParse();
    const _int42_varint32 = sc_6.loadBit() ? sc_6.loadRef() : null;
    const _int42_varuint16 = sc_6.loadBit() ? sc_6.loadRef() : null;
    const _int42_varuint32 = sc_6.loadBit() ? sc_6.loadRef() : null;
    const sc_7 = sc_6.loadRef().beginParse();
    const _int42_bool = sc_7.loadBit() ? sc_7.loadRef() : null;
    const _int42_cell = sc_7.loadBit() ? sc_7.loadRef() : null;
    const _int42_address = sc_7.loadBit() ? sc_7.loadRef() : null;
    const sc_8 = sc_7.loadRef().beginParse();
    const _int42_struct = sc_8.loadBit() ? sc_8.loadRef() : null;
    const _int256_varint16 = sc_8.loadBit() ? sc_8.loadRef() : null;
    const _int256_varint32 = sc_8.loadBit() ? sc_8.loadRef() : null;
    const sc_9 = sc_8.loadRef().beginParse();
    const _int256_varuint16 = sc_9.loadBit() ? sc_9.loadRef() : null;
    const _int256_varuint32 = sc_9.loadBit() ? sc_9.loadRef() : null;
    const _int256_bool = sc_9.loadBit() ? sc_9.loadRef() : null;
    const sc_10 = sc_9.loadRef().beginParse();
    const _int256_cell = sc_10.loadBit() ? sc_10.loadRef() : null;
    const _int256_address = sc_10.loadBit() ? sc_10.loadRef() : null;
    const _int256_struct = sc_10.loadBit() ? sc_10.loadRef() : null;
    const sc_11 = sc_10.loadRef().beginParse();
    const _uint8_varint16 = sc_11.loadBit() ? sc_11.loadRef() : null;
    const _uint8_varint32 = sc_11.loadBit() ? sc_11.loadRef() : null;
    const _uint8_varuint16 = sc_11.loadBit() ? sc_11.loadRef() : null;
    const sc_12 = sc_11.loadRef().beginParse();
    const _uint8_varuint32 = sc_12.loadBit() ? sc_12.loadRef() : null;
    const _uint8_bool = sc_12.loadBit() ? sc_12.loadRef() : null;
    const _uint8_cell = sc_12.loadBit() ? sc_12.loadRef() : null;
    const sc_13 = sc_12.loadRef().beginParse();
    const _uint8_address = sc_13.loadBit() ? sc_13.loadRef() : null;
    const _uint8_struct = sc_13.loadBit() ? sc_13.loadRef() : null;
    const _uint42_varint16 = sc_13.loadBit() ? sc_13.loadRef() : null;
    const sc_14 = sc_13.loadRef().beginParse();
    const _uint42_varint32 = sc_14.loadBit() ? sc_14.loadRef() : null;
    const _uint42_varuint16 = sc_14.loadBit() ? sc_14.loadRef() : null;
    const _uint42_varuint32 = sc_14.loadBit() ? sc_14.loadRef() : null;
    const sc_15 = sc_14.loadRef().beginParse();
    const _uint42_bool = sc_15.loadBit() ? sc_15.loadRef() : null;
    const _uint42_cell = sc_15.loadBit() ? sc_15.loadRef() : null;
    const _uint42_address = sc_15.loadBit() ? sc_15.loadRef() : null;
    const sc_16 = sc_15.loadRef().beginParse();
    const _uint42_struct = sc_16.loadBit() ? sc_16.loadRef() : null;
    const _uint256_varint16 = sc_16.loadBit() ? sc_16.loadRef() : null;
    const _uint256_varint32 = sc_16.loadBit() ? sc_16.loadRef() : null;
    const sc_17 = sc_16.loadRef().beginParse();
    const _uint256_varuint16 = sc_17.loadBit() ? sc_17.loadRef() : null;
    const _uint256_varuint32 = sc_17.loadBit() ? sc_17.loadRef() : null;
    const _uint256_bool = sc_17.loadBit() ? sc_17.loadRef() : null;
    const sc_18 = sc_17.loadRef().beginParse();
    const _uint256_cell = sc_18.loadBit() ? sc_18.loadRef() : null;
    const _uint256_address = sc_18.loadBit() ? sc_18.loadRef() : null;
    const _uint256_struct = sc_18.loadBit() ? sc_18.loadRef() : null;
    const sc_19 = sc_18.loadRef().beginParse();
    const _address_varint16 = sc_19.loadBit() ? sc_19.loadRef() : null;
    const _address_varint32 = sc_19.loadBit() ? sc_19.loadRef() : null;
    const _address_varuint16 = sc_19.loadBit() ? sc_19.loadRef() : null;
    const sc_20 = sc_19.loadRef().beginParse();
    const _address_varuint32 = sc_20.loadBit() ? sc_20.loadRef() : null;
    const _address_bool = sc_20.loadBit() ? sc_20.loadRef() : null;
    const _address_cell = sc_20.loadBit() ? sc_20.loadRef() : null;
    const sc_21 = sc_20.loadRef().beginParse();
    const _address_address = sc_21.loadBit() ? sc_21.loadRef() : null;
    const _address_struct = sc_21.loadBit() ? sc_21.loadRef() : null;
    return { $$type: 'AsCellAllMapsResult' as const, int_varint16: _int_varint16, int_varint32: _int_varint32, int_varuint16: _int_varuint16, int_varuint32: _int_varuint32, int_bool: _int_bool, int_cell: _int_cell, int_address: _int_address, int_struct: _int_struct, int8_varint16: _int8_varint16, int8_varint32: _int8_varint32, int8_varuint16: _int8_varuint16, int8_varuint32: _int8_varuint32, int8_bool: _int8_bool, int8_cell: _int8_cell, int8_address: _int8_address, int8_struct: _int8_struct, int42_varint16: _int42_varint16, int42_varint32: _int42_varint32, int42_varuint16: _int42_varuint16, int42_varuint32: _int42_varuint32, int42_bool: _int42_bool, int42_cell: _int42_cell, int42_address: _int42_address, int42_struct: _int42_struct, int256_varint16: _int256_varint16, int256_varint32: _int256_varint32, int256_varuint16: _int256_varuint16, int256_varuint32: _int256_varuint32, int256_bool: _int256_bool, int256_cell: _int256_cell, int256_address: _int256_address, int256_struct: _int256_struct, uint8_varint16: _uint8_varint16, uint8_varint32: _uint8_varint32, uint8_varuint16: _uint8_varuint16, uint8_varuint32: _uint8_varuint32, uint8_bool: _uint8_bool, uint8_cell: _uint8_cell, uint8_address: _uint8_address, uint8_struct: _uint8_struct, uint42_varint16: _uint42_varint16, uint42_varint32: _uint42_varint32, uint42_varuint16: _uint42_varuint16, uint42_varuint32: _uint42_varuint32, uint42_bool: _uint42_bool, uint42_cell: _uint42_cell, uint42_address: _uint42_address, uint42_struct: _uint42_struct, uint256_varint16: _uint256_varint16, uint256_varint32: _uint256_varint32, uint256_varuint16: _uint256_varuint16, uint256_varuint32: _uint256_varuint32, uint256_bool: _uint256_bool, uint256_cell: _uint256_cell, uint256_address: _uint256_address, uint256_struct: _uint256_struct, address_varint16: _address_varint16, address_varint32: _address_varint32, address_varuint16: _address_varuint16, address_varuint32: _address_varuint32, address_bool: _address_bool, address_cell: _address_cell, address_address: _address_address, address_struct: _address_struct };
}

function loadTupleAsCellAllMapsResult(source: TupleReader) {
    const _int_varint16 = source.readCellOpt();
    const _int_varint32 = source.readCellOpt();
    const _int_varuint16 = source.readCellOpt();
    const _int_varuint32 = source.readCellOpt();
    const _int_bool = source.readCellOpt();
    const _int_cell = source.readCellOpt();
    const _int_address = source.readCellOpt();
    const _int_struct = source.readCellOpt();
    const _int8_varint16 = source.readCellOpt();
    const _int8_varint32 = source.readCellOpt();
    const _int8_varuint16 = source.readCellOpt();
    const _int8_varuint32 = source.readCellOpt();
    const _int8_bool = source.readCellOpt();
    const _int8_cell = source.readCellOpt();
    source = source.readTuple();
    const _int8_address = source.readCellOpt();
    const _int8_struct = source.readCellOpt();
    const _int42_varint16 = source.readCellOpt();
    const _int42_varint32 = source.readCellOpt();
    const _int42_varuint16 = source.readCellOpt();
    const _int42_varuint32 = source.readCellOpt();
    const _int42_bool = source.readCellOpt();
    const _int42_cell = source.readCellOpt();
    const _int42_address = source.readCellOpt();
    const _int42_struct = source.readCellOpt();
    const _int256_varint16 = source.readCellOpt();
    const _int256_varint32 = source.readCellOpt();
    const _int256_varuint16 = source.readCellOpt();
    const _int256_varuint32 = source.readCellOpt();
    source = source.readTuple();
    const _int256_bool = source.readCellOpt();
    const _int256_cell = source.readCellOpt();
    const _int256_address = source.readCellOpt();
    const _int256_struct = source.readCellOpt();
    const _uint8_varint16 = source.readCellOpt();
    const _uint8_varint32 = source.readCellOpt();
    const _uint8_varuint16 = source.readCellOpt();
    const _uint8_varuint32 = source.readCellOpt();
    const _uint8_bool = source.readCellOpt();
    const _uint8_cell = source.readCellOpt();
    const _uint8_address = source.readCellOpt();
    const _uint8_struct = source.readCellOpt();
    const _uint42_varint16 = source.readCellOpt();
    const _uint42_varint32 = source.readCellOpt();
    source = source.readTuple();
    const _uint42_varuint16 = source.readCellOpt();
    const _uint42_varuint32 = source.readCellOpt();
    const _uint42_bool = source.readCellOpt();
    const _uint42_cell = source.readCellOpt();
    const _uint42_address = source.readCellOpt();
    const _uint42_struct = source.readCellOpt();
    const _uint256_varint16 = source.readCellOpt();
    const _uint256_varint32 = source.readCellOpt();
    const _uint256_varuint16 = source.readCellOpt();
    const _uint256_varuint32 = source.readCellOpt();
    const _uint256_bool = source.readCellOpt();
    const _uint256_cell = source.readCellOpt();
    const _uint256_address = source.readCellOpt();
    const _uint256_struct = source.readCellOpt();
    source = source.readTuple();
    const _address_varint16 = source.readCellOpt();
    const _address_varint32 = source.readCellOpt();
    const _address_varuint16 = source.readCellOpt();
    const _address_varuint32 = source.readCellOpt();
    const _address_bool = source.readCellOpt();
    const _address_cell = source.readCellOpt();
    const _address_address = source.readCellOpt();
    const _address_struct = source.readCellOpt();
    return { $$type: 'AsCellAllMapsResult' as const, int_varint16: _int_varint16, int_varint32: _int_varint32, int_varuint16: _int_varuint16, int_varuint32: _int_varuint32, int_bool: _int_bool, int_cell: _int_cell, int_address: _int_address, int_struct: _int_struct, int8_varint16: _int8_varint16, int8_varint32: _int8_varint32, int8_varuint16: _int8_varuint16, int8_varuint32: _int8_varuint32, int8_bool: _int8_bool, int8_cell: _int8_cell, int8_address: _int8_address, int8_struct: _int8_struct, int42_varint16: _int42_varint16, int42_varint32: _int42_varint32, int42_varuint16: _int42_varuint16, int42_varuint32: _int42_varuint32, int42_bool: _int42_bool, int42_cell: _int42_cell, int42_address: _int42_address, int42_struct: _int42_struct, int256_varint16: _int256_varint16, int256_varint32: _int256_varint32, int256_varuint16: _int256_varuint16, int256_varuint32: _int256_varuint32, int256_bool: _int256_bool, int256_cell: _int256_cell, int256_address: _int256_address, int256_struct: _int256_struct, uint8_varint16: _uint8_varint16, uint8_varint32: _uint8_varint32, uint8_varuint16: _uint8_varuint16, uint8_varuint32: _uint8_varuint32, uint8_bool: _uint8_bool, uint8_cell: _uint8_cell, uint8_address: _uint8_address, uint8_struct: _uint8_struct, uint42_varint16: _uint42_varint16, uint42_varint32: _uint42_varint32, uint42_varuint16: _uint42_varuint16, uint42_varuint32: _uint42_varuint32, uint42_bool: _uint42_bool, uint42_cell: _uint42_cell, uint42_address: _uint42_address, uint42_struct: _uint42_struct, uint256_varint16: _uint256_varint16, uint256_varint32: _uint256_varint32, uint256_varuint16: _uint256_varuint16, uint256_varuint32: _uint256_varuint32, uint256_bool: _uint256_bool, uint256_cell: _uint256_cell, uint256_address: _uint256_address, uint256_struct: _uint256_struct, address_varint16: _address_varint16, address_varint32: _address_varint32, address_varuint16: _address_varuint16, address_varuint32: _address_varuint32, address_bool: _address_bool, address_cell: _address_cell, address_address: _address_address, address_struct: _address_struct };
}

function loadGetterTupleAsCellAllMapsResult(source: TupleReader) {
    const _int_varint16 = source.readCellOpt();
    const _int_varint32 = source.readCellOpt();
    const _int_varuint16 = source.readCellOpt();
    const _int_varuint32 = source.readCellOpt();
    const _int_bool = source.readCellOpt();
    const _int_cell = source.readCellOpt();
    const _int_address = source.readCellOpt();
    const _int_struct = source.readCellOpt();
    const _int8_varint16 = source.readCellOpt();
    const _int8_varint32 = source.readCellOpt();
    const _int8_varuint16 = source.readCellOpt();
    const _int8_varuint32 = source.readCellOpt();
    const _int8_bool = source.readCellOpt();
    const _int8_cell = source.readCellOpt();
    const _int8_address = source.readCellOpt();
    const _int8_struct = source.readCellOpt();
    const _int42_varint16 = source.readCellOpt();
    const _int42_varint32 = source.readCellOpt();
    const _int42_varuint16 = source.readCellOpt();
    const _int42_varuint32 = source.readCellOpt();
    const _int42_bool = source.readCellOpt();
    const _int42_cell = source.readCellOpt();
    const _int42_address = source.readCellOpt();
    const _int42_struct = source.readCellOpt();
    const _int256_varint16 = source.readCellOpt();
    const _int256_varint32 = source.readCellOpt();
    const _int256_varuint16 = source.readCellOpt();
    const _int256_varuint32 = source.readCellOpt();
    const _int256_bool = source.readCellOpt();
    const _int256_cell = source.readCellOpt();
    const _int256_address = source.readCellOpt();
    const _int256_struct = source.readCellOpt();
    const _uint8_varint16 = source.readCellOpt();
    const _uint8_varint32 = source.readCellOpt();
    const _uint8_varuint16 = source.readCellOpt();
    const _uint8_varuint32 = source.readCellOpt();
    const _uint8_bool = source.readCellOpt();
    const _uint8_cell = source.readCellOpt();
    const _uint8_address = source.readCellOpt();
    const _uint8_struct = source.readCellOpt();
    const _uint42_varint16 = source.readCellOpt();
    const _uint42_varint32 = source.readCellOpt();
    const _uint42_varuint16 = source.readCellOpt();
    const _uint42_varuint32 = source.readCellOpt();
    const _uint42_bool = source.readCellOpt();
    const _uint42_cell = source.readCellOpt();
    const _uint42_address = source.readCellOpt();
    const _uint42_struct = source.readCellOpt();
    const _uint256_varint16 = source.readCellOpt();
    const _uint256_varint32 = source.readCellOpt();
    const _uint256_varuint16 = source.readCellOpt();
    const _uint256_varuint32 = source.readCellOpt();
    const _uint256_bool = source.readCellOpt();
    const _uint256_cell = source.readCellOpt();
    const _uint256_address = source.readCellOpt();
    const _uint256_struct = source.readCellOpt();
    const _address_varint16 = source.readCellOpt();
    const _address_varint32 = source.readCellOpt();
    const _address_varuint16 = source.readCellOpt();
    const _address_varuint32 = source.readCellOpt();
    const _address_bool = source.readCellOpt();
    const _address_cell = source.readCellOpt();
    const _address_address = source.readCellOpt();
    const _address_struct = source.readCellOpt();
    return { $$type: 'AsCellAllMapsResult' as const, int_varint16: _int_varint16, int_varint32: _int_varint32, int_varuint16: _int_varuint16, int_varuint32: _int_varuint32, int_bool: _int_bool, int_cell: _int_cell, int_address: _int_address, int_struct: _int_struct, int8_varint16: _int8_varint16, int8_varint32: _int8_varint32, int8_varuint16: _int8_varuint16, int8_varuint32: _int8_varuint32, int8_bool: _int8_bool, int8_cell: _int8_cell, int8_address: _int8_address, int8_struct: _int8_struct, int42_varint16: _int42_varint16, int42_varint32: _int42_varint32, int42_varuint16: _int42_varuint16, int42_varuint32: _int42_varuint32, int42_bool: _int42_bool, int42_cell: _int42_cell, int42_address: _int42_address, int42_struct: _int42_struct, int256_varint16: _int256_varint16, int256_varint32: _int256_varint32, int256_varuint16: _int256_varuint16, int256_varuint32: _int256_varuint32, int256_bool: _int256_bool, int256_cell: _int256_cell, int256_address: _int256_address, int256_struct: _int256_struct, uint8_varint16: _uint8_varint16, uint8_varint32: _uint8_varint32, uint8_varuint16: _uint8_varuint16, uint8_varuint32: _uint8_varuint32, uint8_bool: _uint8_bool, uint8_cell: _uint8_cell, uint8_address: _uint8_address, uint8_struct: _uint8_struct, uint42_varint16: _uint42_varint16, uint42_varint32: _uint42_varint32, uint42_varuint16: _uint42_varuint16, uint42_varuint32: _uint42_varuint32, uint42_bool: _uint42_bool, uint42_cell: _uint42_cell, uint42_address: _uint42_address, uint42_struct: _uint42_struct, uint256_varint16: _uint256_varint16, uint256_varint32: _uint256_varint32, uint256_varuint16: _uint256_varuint16, uint256_varuint32: _uint256_varuint32, uint256_bool: _uint256_bool, uint256_cell: _uint256_cell, uint256_address: _uint256_address, uint256_struct: _uint256_struct, address_varint16: _address_varint16, address_varint32: _address_varint32, address_varuint16: _address_varuint16, address_varuint32: _address_varuint32, address_bool: _address_bool, address_cell: _address_cell, address_address: _address_address, address_struct: _address_struct };
}

function storeTupleAsCellAllMapsResult(source: AsCellAllMapsResult) {
    const builder = new TupleBuilder();
    builder.writeCell(source.int_varint16);
    builder.writeCell(source.int_varint32);
    builder.writeCell(source.int_varuint16);
    builder.writeCell(source.int_varuint32);
    builder.writeCell(source.int_bool);
    builder.writeCell(source.int_cell);
    builder.writeCell(source.int_address);
    builder.writeCell(source.int_struct);
    builder.writeCell(source.int8_varint16);
    builder.writeCell(source.int8_varint32);
    builder.writeCell(source.int8_varuint16);
    builder.writeCell(source.int8_varuint32);
    builder.writeCell(source.int8_bool);
    builder.writeCell(source.int8_cell);
    builder.writeCell(source.int8_address);
    builder.writeCell(source.int8_struct);
    builder.writeCell(source.int42_varint16);
    builder.writeCell(source.int42_varint32);
    builder.writeCell(source.int42_varuint16);
    builder.writeCell(source.int42_varuint32);
    builder.writeCell(source.int42_bool);
    builder.writeCell(source.int42_cell);
    builder.writeCell(source.int42_address);
    builder.writeCell(source.int42_struct);
    builder.writeCell(source.int256_varint16);
    builder.writeCell(source.int256_varint32);
    builder.writeCell(source.int256_varuint16);
    builder.writeCell(source.int256_varuint32);
    builder.writeCell(source.int256_bool);
    builder.writeCell(source.int256_cell);
    builder.writeCell(source.int256_address);
    builder.writeCell(source.int256_struct);
    builder.writeCell(source.uint8_varint16);
    builder.writeCell(source.uint8_varint32);
    builder.writeCell(source.uint8_varuint16);
    builder.writeCell(source.uint8_varuint32);
    builder.writeCell(source.uint8_bool);
    builder.writeCell(source.uint8_cell);
    builder.writeCell(source.uint8_address);
    builder.writeCell(source.uint8_struct);
    builder.writeCell(source.uint42_varint16);
    builder.writeCell(source.uint42_varint32);
    builder.writeCell(source.uint42_varuint16);
    builder.writeCell(source.uint42_varuint32);
    builder.writeCell(source.uint42_bool);
    builder.writeCell(source.uint42_cell);
    builder.writeCell(source.uint42_address);
    builder.writeCell(source.uint42_struct);
    builder.writeCell(source.uint256_varint16);
    builder.writeCell(source.uint256_varint32);
    builder.writeCell(source.uint256_varuint16);
    builder.writeCell(source.uint256_varuint32);
    builder.writeCell(source.uint256_bool);
    builder.writeCell(source.uint256_cell);
    builder.writeCell(source.uint256_address);
    builder.writeCell(source.uint256_struct);
    builder.writeCell(source.address_varint16);
    builder.writeCell(source.address_varint32);
    builder.writeCell(source.address_varuint16);
    builder.writeCell(source.address_varuint32);
    builder.writeCell(source.address_bool);
    builder.writeCell(source.address_cell);
    builder.writeCell(source.address_address);
    builder.writeCell(source.address_struct);
    return builder.build();
}

function dictValueParserAsCellAllMapsResult(): DictionaryValue<AsCellAllMapsResult> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAsCellAllMapsResult(src)).endCell());
        },
        parse: (src) => {
            return loadAsCellAllMapsResult(src.loadRef().beginParse());
        }
    }
}

export type SetAllMaps = {
    $$type: 'SetAllMaps';
    keyInt: bigint;
    keyInt8: bigint;
    keyInt42: bigint;
    keyInt256: bigint;
    keyUint8: bigint;
    keyUint42: bigint;
    keyUint256: bigint;
    keyAddress: Address;
    valueVarint16: bigint | null;
    valueVarint32: bigint | null;
    valueVaruint16: bigint | null;
    valueVaruint32: bigint | null;
    valueBool: boolean | null;
    valueCell: Cell | null;
    valueAddress: Address | null;
    valueStruct: SomeStruct | null;
}

export function storeSetAllMaps(src: SetAllMaps) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(88242610, 32);
        b_0.storeInt(src.keyInt, 257);
        b_0.storeInt(src.keyInt8, 257);
        b_0.storeInt(src.keyInt42, 257);
        const b_1 = new Builder();
        b_1.storeInt(src.keyInt256, 257);
        b_1.storeInt(src.keyUint8, 257);
        b_1.storeInt(src.keyUint42, 257);
        const b_2 = new Builder();
        b_2.storeInt(src.keyUint256, 257);
        b_2.storeAddress(src.keyAddress);
        if (src.valueVarint16 !== null && src.valueVarint16 !== undefined) { b_2.storeBit(true).storeInt(src.valueVarint16, 257); } else { b_2.storeBit(false); }
        const b_3 = new Builder();
        if (src.valueVarint32 !== null && src.valueVarint32 !== undefined) { b_3.storeBit(true).storeInt(src.valueVarint32, 257); } else { b_3.storeBit(false); }
        if (src.valueVaruint16 !== null && src.valueVaruint16 !== undefined) { b_3.storeBit(true).storeInt(src.valueVaruint16, 257); } else { b_3.storeBit(false); }
        if (src.valueVaruint32 !== null && src.valueVaruint32 !== undefined) { b_3.storeBit(true).storeInt(src.valueVaruint32, 257); } else { b_3.storeBit(false); }
        if (src.valueBool !== null && src.valueBool !== undefined) { b_3.storeBit(true).storeBit(src.valueBool); } else { b_3.storeBit(false); }
        if (src.valueCell !== null && src.valueCell !== undefined) { b_3.storeBit(true).storeRef(src.valueCell); } else { b_3.storeBit(false); }
        const b_4 = new Builder();
        b_4.storeAddress(src.valueAddress);
        const b_5 = new Builder();
        if (src.valueStruct !== null && src.valueStruct !== undefined) { b_5.storeBit(true); b_5.store(storeSomeStruct(src.valueStruct)); } else { b_5.storeBit(false); }
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSetAllMaps(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 88242610) { throw Error('Invalid prefix'); }
    const _keyInt = sc_0.loadIntBig(257);
    const _keyInt8 = sc_0.loadIntBig(257);
    const _keyInt42 = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _keyInt256 = sc_1.loadIntBig(257);
    const _keyUint8 = sc_1.loadIntBig(257);
    const _keyUint42 = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _keyUint256 = sc_2.loadIntBig(257);
    const _keyAddress = sc_2.loadAddress();
    const _valueVarint16 = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    const sc_3 = sc_2.loadRef().beginParse();
    const _valueVarint32 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _valueVaruint16 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _valueVaruint32 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _valueBool = sc_3.loadBit() ? sc_3.loadBit() : null;
    const _valueCell = sc_3.loadBit() ? sc_3.loadRef() : null;
    const sc_4 = sc_3.loadRef().beginParse();
    const _valueAddress = sc_4.loadMaybeAddress();
    const sc_5 = sc_4.loadRef().beginParse();
    const _valueStruct = sc_5.loadBit() ? loadSomeStruct(sc_5) : null;
    return { $$type: 'SetAllMaps' as const, keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress, valueVarint16: _valueVarint16, valueVarint32: _valueVarint32, valueVaruint16: _valueVaruint16, valueVaruint32: _valueVaruint32, valueBool: _valueBool, valueCell: _valueCell, valueAddress: _valueAddress, valueStruct: _valueStruct };
}

function loadTupleSetAllMaps(source: TupleReader) {
    const _keyInt = source.readBigNumber();
    const _keyInt8 = source.readBigNumber();
    const _keyInt42 = source.readBigNumber();
    const _keyInt256 = source.readBigNumber();
    const _keyUint8 = source.readBigNumber();
    const _keyUint42 = source.readBigNumber();
    const _keyUint256 = source.readBigNumber();
    const _keyAddress = source.readAddress();
    const _valueVarint16 = source.readBigNumberOpt();
    const _valueVarint32 = source.readBigNumberOpt();
    const _valueVaruint16 = source.readBigNumberOpt();
    const _valueVaruint32 = source.readBigNumberOpt();
    const _valueBool = source.readBooleanOpt();
    const _valueCell = source.readCellOpt();
    source = source.readTuple();
    const _valueAddress = source.readAddressOpt();
    const _valueStruct_p = source.readTupleOpt();
    const _valueStruct = _valueStruct_p ? loadTupleSomeStruct(_valueStruct_p) : null;
    return { $$type: 'SetAllMaps' as const, keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress, valueVarint16: _valueVarint16, valueVarint32: _valueVarint32, valueVaruint16: _valueVaruint16, valueVaruint32: _valueVaruint32, valueBool: _valueBool, valueCell: _valueCell, valueAddress: _valueAddress, valueStruct: _valueStruct };
}

function loadGetterTupleSetAllMaps(source: TupleReader) {
    const _keyInt = source.readBigNumber();
    const _keyInt8 = source.readBigNumber();
    const _keyInt42 = source.readBigNumber();
    const _keyInt256 = source.readBigNumber();
    const _keyUint8 = source.readBigNumber();
    const _keyUint42 = source.readBigNumber();
    const _keyUint256 = source.readBigNumber();
    const _keyAddress = source.readAddress();
    const _valueVarint16 = source.readBigNumberOpt();
    const _valueVarint32 = source.readBigNumberOpt();
    const _valueVaruint16 = source.readBigNumberOpt();
    const _valueVaruint32 = source.readBigNumberOpt();
    const _valueBool = source.readBooleanOpt();
    const _valueCell = source.readCellOpt();
    const _valueAddress = source.readAddressOpt();
    const _valueStruct_p = source.readTupleOpt();
    const _valueStruct = _valueStruct_p ? loadTupleSomeStruct(_valueStruct_p) : null;
    return { $$type: 'SetAllMaps' as const, keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress, valueVarint16: _valueVarint16, valueVarint32: _valueVarint32, valueVaruint16: _valueVaruint16, valueVaruint32: _valueVaruint32, valueBool: _valueBool, valueCell: _valueCell, valueAddress: _valueAddress, valueStruct: _valueStruct };
}

function storeTupleSetAllMaps(source: SetAllMaps) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.keyInt);
    builder.writeNumber(source.keyInt8);
    builder.writeNumber(source.keyInt42);
    builder.writeNumber(source.keyInt256);
    builder.writeNumber(source.keyUint8);
    builder.writeNumber(source.keyUint42);
    builder.writeNumber(source.keyUint256);
    builder.writeAddress(source.keyAddress);
    builder.writeNumber(source.valueVarint16);
    builder.writeNumber(source.valueVarint32);
    builder.writeNumber(source.valueVaruint16);
    builder.writeNumber(source.valueVaruint32);
    builder.writeBoolean(source.valueBool);
    builder.writeCell(source.valueCell);
    builder.writeAddress(source.valueAddress);
    if (source.valueStruct !== null && source.valueStruct !== undefined) {
        builder.writeTuple(storeTupleSomeStruct(source.valueStruct));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserSetAllMaps(): DictionaryValue<SetAllMaps> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetAllMaps(src)).endCell());
        },
        parse: (src) => {
            return loadSetAllMaps(src.loadRef().beginParse());
        }
    }
}

export type DelAllMaps = {
    $$type: 'DelAllMaps';
    keyInt: bigint;
    keyInt8: bigint;
    keyInt42: bigint;
    keyInt256: bigint;
    keyUint8: bigint;
    keyUint42: bigint;
    keyUint256: bigint;
    keyAddress: Address;
}

export function storeDelAllMaps(src: DelAllMaps) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1261158015, 32);
        b_0.storeInt(src.keyInt, 257);
        b_0.storeInt(src.keyInt8, 257);
        b_0.storeInt(src.keyInt42, 257);
        const b_1 = new Builder();
        b_1.storeInt(src.keyInt256, 257);
        b_1.storeInt(src.keyUint8, 257);
        b_1.storeInt(src.keyUint42, 257);
        const b_2 = new Builder();
        b_2.storeInt(src.keyUint256, 257);
        b_2.storeAddress(src.keyAddress);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDelAllMaps(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1261158015) { throw Error('Invalid prefix'); }
    const _keyInt = sc_0.loadIntBig(257);
    const _keyInt8 = sc_0.loadIntBig(257);
    const _keyInt42 = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _keyInt256 = sc_1.loadIntBig(257);
    const _keyUint8 = sc_1.loadIntBig(257);
    const _keyUint42 = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _keyUint256 = sc_2.loadIntBig(257);
    const _keyAddress = sc_2.loadAddress();
    return { $$type: 'DelAllMaps' as const, keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress };
}

function loadTupleDelAllMaps(source: TupleReader) {
    const _keyInt = source.readBigNumber();
    const _keyInt8 = source.readBigNumber();
    const _keyInt42 = source.readBigNumber();
    const _keyInt256 = source.readBigNumber();
    const _keyUint8 = source.readBigNumber();
    const _keyUint42 = source.readBigNumber();
    const _keyUint256 = source.readBigNumber();
    const _keyAddress = source.readAddress();
    return { $$type: 'DelAllMaps' as const, keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress };
}

function loadGetterTupleDelAllMaps(source: TupleReader) {
    const _keyInt = source.readBigNumber();
    const _keyInt8 = source.readBigNumber();
    const _keyInt42 = source.readBigNumber();
    const _keyInt256 = source.readBigNumber();
    const _keyUint8 = source.readBigNumber();
    const _keyUint42 = source.readBigNumber();
    const _keyUint256 = source.readBigNumber();
    const _keyAddress = source.readAddress();
    return { $$type: 'DelAllMaps' as const, keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress };
}

function storeTupleDelAllMaps(source: DelAllMaps) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.keyInt);
    builder.writeNumber(source.keyInt8);
    builder.writeNumber(source.keyInt42);
    builder.writeNumber(source.keyInt256);
    builder.writeNumber(source.keyUint8);
    builder.writeNumber(source.keyUint42);
    builder.writeNumber(source.keyUint256);
    builder.writeAddress(source.keyAddress);
    return builder.build();
}

function dictValueParserDelAllMaps(): DictionaryValue<DelAllMaps> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDelAllMaps(src)).endCell());
        },
        parse: (src) => {
            return loadDelAllMaps(src.loadRef().beginParse());
        }
    }
}

export type ReplaceAllMaps = {
    $$type: 'ReplaceAllMaps';
    keyInt: bigint;
    keyInt8: bigint;
    keyInt42: bigint;
    keyInt256: bigint;
    keyUint8: bigint;
    keyUint42: bigint;
    keyUint256: bigint;
    keyAddress: Address;
    valueVarint16: bigint | null;
    valueVarint32: bigint | null;
    valueVaruint16: bigint | null;
    valueVaruint32: bigint | null;
    valueBool: boolean | null;
    valueCell: Cell | null;
    valueAddress: Address | null;
    valueStruct: SomeStruct | null;
}

export function storeReplaceAllMaps(src: ReplaceAllMaps) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3909681767, 32);
        b_0.storeInt(src.keyInt, 257);
        b_0.storeInt(src.keyInt8, 257);
        b_0.storeInt(src.keyInt42, 257);
        const b_1 = new Builder();
        b_1.storeInt(src.keyInt256, 257);
        b_1.storeInt(src.keyUint8, 257);
        b_1.storeInt(src.keyUint42, 257);
        const b_2 = new Builder();
        b_2.storeInt(src.keyUint256, 257);
        b_2.storeAddress(src.keyAddress);
        if (src.valueVarint16 !== null && src.valueVarint16 !== undefined) { b_2.storeBit(true).storeInt(src.valueVarint16, 257); } else { b_2.storeBit(false); }
        const b_3 = new Builder();
        if (src.valueVarint32 !== null && src.valueVarint32 !== undefined) { b_3.storeBit(true).storeInt(src.valueVarint32, 257); } else { b_3.storeBit(false); }
        if (src.valueVaruint16 !== null && src.valueVaruint16 !== undefined) { b_3.storeBit(true).storeInt(src.valueVaruint16, 257); } else { b_3.storeBit(false); }
        if (src.valueVaruint32 !== null && src.valueVaruint32 !== undefined) { b_3.storeBit(true).storeInt(src.valueVaruint32, 257); } else { b_3.storeBit(false); }
        if (src.valueBool !== null && src.valueBool !== undefined) { b_3.storeBit(true).storeBit(src.valueBool); } else { b_3.storeBit(false); }
        if (src.valueCell !== null && src.valueCell !== undefined) { b_3.storeBit(true).storeRef(src.valueCell); } else { b_3.storeBit(false); }
        const b_4 = new Builder();
        b_4.storeAddress(src.valueAddress);
        const b_5 = new Builder();
        if (src.valueStruct !== null && src.valueStruct !== undefined) { b_5.storeBit(true); b_5.store(storeSomeStruct(src.valueStruct)); } else { b_5.storeBit(false); }
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadReplaceAllMaps(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3909681767) { throw Error('Invalid prefix'); }
    const _keyInt = sc_0.loadIntBig(257);
    const _keyInt8 = sc_0.loadIntBig(257);
    const _keyInt42 = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _keyInt256 = sc_1.loadIntBig(257);
    const _keyUint8 = sc_1.loadIntBig(257);
    const _keyUint42 = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _keyUint256 = sc_2.loadIntBig(257);
    const _keyAddress = sc_2.loadAddress();
    const _valueVarint16 = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    const sc_3 = sc_2.loadRef().beginParse();
    const _valueVarint32 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _valueVaruint16 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _valueVaruint32 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _valueBool = sc_3.loadBit() ? sc_3.loadBit() : null;
    const _valueCell = sc_3.loadBit() ? sc_3.loadRef() : null;
    const sc_4 = sc_3.loadRef().beginParse();
    const _valueAddress = sc_4.loadMaybeAddress();
    const sc_5 = sc_4.loadRef().beginParse();
    const _valueStruct = sc_5.loadBit() ? loadSomeStruct(sc_5) : null;
    return { $$type: 'ReplaceAllMaps' as const, keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress, valueVarint16: _valueVarint16, valueVarint32: _valueVarint32, valueVaruint16: _valueVaruint16, valueVaruint32: _valueVaruint32, valueBool: _valueBool, valueCell: _valueCell, valueAddress: _valueAddress, valueStruct: _valueStruct };
}

function loadTupleReplaceAllMaps(source: TupleReader) {
    const _keyInt = source.readBigNumber();
    const _keyInt8 = source.readBigNumber();
    const _keyInt42 = source.readBigNumber();
    const _keyInt256 = source.readBigNumber();
    const _keyUint8 = source.readBigNumber();
    const _keyUint42 = source.readBigNumber();
    const _keyUint256 = source.readBigNumber();
    const _keyAddress = source.readAddress();
    const _valueVarint16 = source.readBigNumberOpt();
    const _valueVarint32 = source.readBigNumberOpt();
    const _valueVaruint16 = source.readBigNumberOpt();
    const _valueVaruint32 = source.readBigNumberOpt();
    const _valueBool = source.readBooleanOpt();
    const _valueCell = source.readCellOpt();
    source = source.readTuple();
    const _valueAddress = source.readAddressOpt();
    const _valueStruct_p = source.readTupleOpt();
    const _valueStruct = _valueStruct_p ? loadTupleSomeStruct(_valueStruct_p) : null;
    return { $$type: 'ReplaceAllMaps' as const, keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress, valueVarint16: _valueVarint16, valueVarint32: _valueVarint32, valueVaruint16: _valueVaruint16, valueVaruint32: _valueVaruint32, valueBool: _valueBool, valueCell: _valueCell, valueAddress: _valueAddress, valueStruct: _valueStruct };
}

function loadGetterTupleReplaceAllMaps(source: TupleReader) {
    const _keyInt = source.readBigNumber();
    const _keyInt8 = source.readBigNumber();
    const _keyInt42 = source.readBigNumber();
    const _keyInt256 = source.readBigNumber();
    const _keyUint8 = source.readBigNumber();
    const _keyUint42 = source.readBigNumber();
    const _keyUint256 = source.readBigNumber();
    const _keyAddress = source.readAddress();
    const _valueVarint16 = source.readBigNumberOpt();
    const _valueVarint32 = source.readBigNumberOpt();
    const _valueVaruint16 = source.readBigNumberOpt();
    const _valueVaruint32 = source.readBigNumberOpt();
    const _valueBool = source.readBooleanOpt();
    const _valueCell = source.readCellOpt();
    const _valueAddress = source.readAddressOpt();
    const _valueStruct_p = source.readTupleOpt();
    const _valueStruct = _valueStruct_p ? loadTupleSomeStruct(_valueStruct_p) : null;
    return { $$type: 'ReplaceAllMaps' as const, keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress, valueVarint16: _valueVarint16, valueVarint32: _valueVarint32, valueVaruint16: _valueVaruint16, valueVaruint32: _valueVaruint32, valueBool: _valueBool, valueCell: _valueCell, valueAddress: _valueAddress, valueStruct: _valueStruct };
}

function storeTupleReplaceAllMaps(source: ReplaceAllMaps) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.keyInt);
    builder.writeNumber(source.keyInt8);
    builder.writeNumber(source.keyInt42);
    builder.writeNumber(source.keyInt256);
    builder.writeNumber(source.keyUint8);
    builder.writeNumber(source.keyUint42);
    builder.writeNumber(source.keyUint256);
    builder.writeAddress(source.keyAddress);
    builder.writeNumber(source.valueVarint16);
    builder.writeNumber(source.valueVarint32);
    builder.writeNumber(source.valueVaruint16);
    builder.writeNumber(source.valueVaruint32);
    builder.writeBoolean(source.valueBool);
    builder.writeCell(source.valueCell);
    builder.writeAddress(source.valueAddress);
    if (source.valueStruct !== null && source.valueStruct !== undefined) {
        builder.writeTuple(storeTupleSomeStruct(source.valueStruct));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserReplaceAllMaps(): DictionaryValue<ReplaceAllMaps> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReplaceAllMaps(src)).endCell());
        },
        parse: (src) => {
            return loadReplaceAllMaps(src.loadRef().beginParse());
        }
    }
}

export type ReplaceGetAllMaps = {
    $$type: 'ReplaceGetAllMaps';
    keyInt: bigint;
    keyInt8: bigint;
    keyInt42: bigint;
    keyInt256: bigint;
    keyUint8: bigint;
    keyUint42: bigint;
    keyUint256: bigint;
    keyAddress: Address;
    valueVarint16: bigint | null;
    valueVarint32: bigint | null;
    valueVaruint16: bigint | null;
    valueVaruint32: bigint | null;
    valueBool: boolean | null;
    valueCell: Cell | null;
    valueAddress: Address | null;
    valueStruct: SomeStruct | null;
}

export function storeReplaceGetAllMaps(src: ReplaceGetAllMaps) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1054468049, 32);
        b_0.storeInt(src.keyInt, 257);
        b_0.storeInt(src.keyInt8, 257);
        b_0.storeInt(src.keyInt42, 257);
        const b_1 = new Builder();
        b_1.storeInt(src.keyInt256, 257);
        b_1.storeInt(src.keyUint8, 257);
        b_1.storeInt(src.keyUint42, 257);
        const b_2 = new Builder();
        b_2.storeInt(src.keyUint256, 257);
        b_2.storeAddress(src.keyAddress);
        if (src.valueVarint16 !== null && src.valueVarint16 !== undefined) { b_2.storeBit(true).storeInt(src.valueVarint16, 257); } else { b_2.storeBit(false); }
        const b_3 = new Builder();
        if (src.valueVarint32 !== null && src.valueVarint32 !== undefined) { b_3.storeBit(true).storeInt(src.valueVarint32, 257); } else { b_3.storeBit(false); }
        if (src.valueVaruint16 !== null && src.valueVaruint16 !== undefined) { b_3.storeBit(true).storeInt(src.valueVaruint16, 257); } else { b_3.storeBit(false); }
        if (src.valueVaruint32 !== null && src.valueVaruint32 !== undefined) { b_3.storeBit(true).storeInt(src.valueVaruint32, 257); } else { b_3.storeBit(false); }
        if (src.valueBool !== null && src.valueBool !== undefined) { b_3.storeBit(true).storeBit(src.valueBool); } else { b_3.storeBit(false); }
        if (src.valueCell !== null && src.valueCell !== undefined) { b_3.storeBit(true).storeRef(src.valueCell); } else { b_3.storeBit(false); }
        const b_4 = new Builder();
        b_4.storeAddress(src.valueAddress);
        const b_5 = new Builder();
        if (src.valueStruct !== null && src.valueStruct !== undefined) { b_5.storeBit(true); b_5.store(storeSomeStruct(src.valueStruct)); } else { b_5.storeBit(false); }
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadReplaceGetAllMaps(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1054468049) { throw Error('Invalid prefix'); }
    const _keyInt = sc_0.loadIntBig(257);
    const _keyInt8 = sc_0.loadIntBig(257);
    const _keyInt42 = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _keyInt256 = sc_1.loadIntBig(257);
    const _keyUint8 = sc_1.loadIntBig(257);
    const _keyUint42 = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _keyUint256 = sc_2.loadIntBig(257);
    const _keyAddress = sc_2.loadAddress();
    const _valueVarint16 = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    const sc_3 = sc_2.loadRef().beginParse();
    const _valueVarint32 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _valueVaruint16 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _valueVaruint32 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _valueBool = sc_3.loadBit() ? sc_3.loadBit() : null;
    const _valueCell = sc_3.loadBit() ? sc_3.loadRef() : null;
    const sc_4 = sc_3.loadRef().beginParse();
    const _valueAddress = sc_4.loadMaybeAddress();
    const sc_5 = sc_4.loadRef().beginParse();
    const _valueStruct = sc_5.loadBit() ? loadSomeStruct(sc_5) : null;
    return { $$type: 'ReplaceGetAllMaps' as const, keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress, valueVarint16: _valueVarint16, valueVarint32: _valueVarint32, valueVaruint16: _valueVaruint16, valueVaruint32: _valueVaruint32, valueBool: _valueBool, valueCell: _valueCell, valueAddress: _valueAddress, valueStruct: _valueStruct };
}

function loadTupleReplaceGetAllMaps(source: TupleReader) {
    const _keyInt = source.readBigNumber();
    const _keyInt8 = source.readBigNumber();
    const _keyInt42 = source.readBigNumber();
    const _keyInt256 = source.readBigNumber();
    const _keyUint8 = source.readBigNumber();
    const _keyUint42 = source.readBigNumber();
    const _keyUint256 = source.readBigNumber();
    const _keyAddress = source.readAddress();
    const _valueVarint16 = source.readBigNumberOpt();
    const _valueVarint32 = source.readBigNumberOpt();
    const _valueVaruint16 = source.readBigNumberOpt();
    const _valueVaruint32 = source.readBigNumberOpt();
    const _valueBool = source.readBooleanOpt();
    const _valueCell = source.readCellOpt();
    source = source.readTuple();
    const _valueAddress = source.readAddressOpt();
    const _valueStruct_p = source.readTupleOpt();
    const _valueStruct = _valueStruct_p ? loadTupleSomeStruct(_valueStruct_p) : null;
    return { $$type: 'ReplaceGetAllMaps' as const, keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress, valueVarint16: _valueVarint16, valueVarint32: _valueVarint32, valueVaruint16: _valueVaruint16, valueVaruint32: _valueVaruint32, valueBool: _valueBool, valueCell: _valueCell, valueAddress: _valueAddress, valueStruct: _valueStruct };
}

function loadGetterTupleReplaceGetAllMaps(source: TupleReader) {
    const _keyInt = source.readBigNumber();
    const _keyInt8 = source.readBigNumber();
    const _keyInt42 = source.readBigNumber();
    const _keyInt256 = source.readBigNumber();
    const _keyUint8 = source.readBigNumber();
    const _keyUint42 = source.readBigNumber();
    const _keyUint256 = source.readBigNumber();
    const _keyAddress = source.readAddress();
    const _valueVarint16 = source.readBigNumberOpt();
    const _valueVarint32 = source.readBigNumberOpt();
    const _valueVaruint16 = source.readBigNumberOpt();
    const _valueVaruint32 = source.readBigNumberOpt();
    const _valueBool = source.readBooleanOpt();
    const _valueCell = source.readCellOpt();
    const _valueAddress = source.readAddressOpt();
    const _valueStruct_p = source.readTupleOpt();
    const _valueStruct = _valueStruct_p ? loadTupleSomeStruct(_valueStruct_p) : null;
    return { $$type: 'ReplaceGetAllMaps' as const, keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress, valueVarint16: _valueVarint16, valueVarint32: _valueVarint32, valueVaruint16: _valueVaruint16, valueVaruint32: _valueVaruint32, valueBool: _valueBool, valueCell: _valueCell, valueAddress: _valueAddress, valueStruct: _valueStruct };
}

function storeTupleReplaceGetAllMaps(source: ReplaceGetAllMaps) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.keyInt);
    builder.writeNumber(source.keyInt8);
    builder.writeNumber(source.keyInt42);
    builder.writeNumber(source.keyInt256);
    builder.writeNumber(source.keyUint8);
    builder.writeNumber(source.keyUint42);
    builder.writeNumber(source.keyUint256);
    builder.writeAddress(source.keyAddress);
    builder.writeNumber(source.valueVarint16);
    builder.writeNumber(source.valueVarint32);
    builder.writeNumber(source.valueVaruint16);
    builder.writeNumber(source.valueVaruint32);
    builder.writeBoolean(source.valueBool);
    builder.writeCell(source.valueCell);
    builder.writeAddress(source.valueAddress);
    if (source.valueStruct !== null && source.valueStruct !== undefined) {
        builder.writeTuple(storeTupleSomeStruct(source.valueStruct));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserReplaceGetAllMaps(): DictionaryValue<ReplaceGetAllMaps> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReplaceGetAllMaps(src)).endCell());
        },
        parse: (src) => {
            return loadReplaceGetAllMaps(src.loadRef().beginParse());
        }
    }
}

export type CheckNullReference = {
    $$type: 'CheckNullReference';
}

export function storeCheckNullReference(src: CheckNullReference) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2978152160, 32);
    };
}

export function loadCheckNullReference(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2978152160) { throw Error('Invalid prefix'); }
    return { $$type: 'CheckNullReference' as const };
}

function loadTupleCheckNullReference(source: TupleReader) {
    return { $$type: 'CheckNullReference' as const };
}

function loadGetterTupleCheckNullReference(source: TupleReader) {
    return { $$type: 'CheckNullReference' as const };
}

function storeTupleCheckNullReference(source: CheckNullReference) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserCheckNullReference(): DictionaryValue<CheckNullReference> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCheckNullReference(src)).endCell());
        },
        parse: (src) => {
            return loadCheckNullReference(src.loadRef().beginParse());
        }
    }
}

export type MapTestContract$Data = {
    $$type: 'MapTestContract$Data';
    int_varint16: Dictionary<bigint, bigint>;
    int_varint32: Dictionary<bigint, bigint>;
    int_varuint16: Dictionary<bigint, bigint>;
    int_varuint32: Dictionary<bigint, bigint>;
    int_bool: Dictionary<bigint, boolean>;
    int_cell: Dictionary<bigint, Cell>;
    int_address: Dictionary<bigint, Address>;
    int_struct: Dictionary<bigint, SomeStruct>;
    int8_varint16: Dictionary<number, bigint>;
    int8_varint32: Dictionary<number, bigint>;
    int8_varuint16: Dictionary<number, bigint>;
    int8_varuint32: Dictionary<number, bigint>;
    int8_bool: Dictionary<number, boolean>;
    int8_cell: Dictionary<number, Cell>;
    int8_address: Dictionary<number, Address>;
    int8_struct: Dictionary<number, SomeStruct>;
    int42_varint16: Dictionary<bigint, bigint>;
    int42_varint32: Dictionary<bigint, bigint>;
    int42_varuint16: Dictionary<bigint, bigint>;
    int42_varuint32: Dictionary<bigint, bigint>;
    int42_bool: Dictionary<bigint, boolean>;
    int42_cell: Dictionary<bigint, Cell>;
    int42_address: Dictionary<bigint, Address>;
    int42_struct: Dictionary<bigint, SomeStruct>;
    int256_varint16: Dictionary<bigint, bigint>;
    int256_varint32: Dictionary<bigint, bigint>;
    int256_varuint16: Dictionary<bigint, bigint>;
    int256_varuint32: Dictionary<bigint, bigint>;
    int256_bool: Dictionary<bigint, boolean>;
    int256_cell: Dictionary<bigint, Cell>;
    int256_address: Dictionary<bigint, Address>;
    int256_struct: Dictionary<bigint, SomeStruct>;
    uint8_varint16: Dictionary<number, bigint>;
    uint8_varint32: Dictionary<number, bigint>;
    uint8_varuint16: Dictionary<number, bigint>;
    uint8_varuint32: Dictionary<number, bigint>;
    uint8_bool: Dictionary<number, boolean>;
    uint8_cell: Dictionary<number, Cell>;
    uint8_address: Dictionary<number, Address>;
    uint8_struct: Dictionary<number, SomeStruct>;
    uint42_varint16: Dictionary<bigint, bigint>;
    uint42_varint32: Dictionary<bigint, bigint>;
    uint42_varuint16: Dictionary<bigint, bigint>;
    uint42_varuint32: Dictionary<bigint, bigint>;
    uint42_bool: Dictionary<bigint, boolean>;
    uint42_cell: Dictionary<bigint, Cell>;
    uint42_address: Dictionary<bigint, Address>;
    uint42_struct: Dictionary<bigint, SomeStruct>;
    uint256_varint16: Dictionary<bigint, bigint>;
    uint256_varint32: Dictionary<bigint, bigint>;
    uint256_varuint16: Dictionary<bigint, bigint>;
    uint256_varuint32: Dictionary<bigint, bigint>;
    uint256_bool: Dictionary<bigint, boolean>;
    uint256_cell: Dictionary<bigint, Cell>;
    uint256_address: Dictionary<bigint, Address>;
    uint256_struct: Dictionary<bigint, SomeStruct>;
    address_varint16: Dictionary<Address, bigint>;
    address_varint32: Dictionary<Address, bigint>;
    address_varuint16: Dictionary<Address, bigint>;
    address_varuint32: Dictionary<Address, bigint>;
    address_bool: Dictionary<Address, boolean>;
    address_cell: Dictionary<Address, Cell>;
    address_address: Dictionary<Address, Address>;
    address_struct: Dictionary<Address, SomeStruct>;
}

export function storeMapTestContract$Data(src: MapTestContract$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeDict(src.int_varint16, Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarInt(4));
        b_0.storeDict(src.int_varint32, Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarInt(5));
        const b_1 = new Builder();
        b_1.storeDict(src.int_varuint16, Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarUint(4));
        b_1.storeDict(src.int_varuint32, Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarUint(5));
        b_1.storeDict(src.int_bool, Dictionary.Keys.BigInt(257), Dictionary.Values.Bool());
        const b_2 = new Builder();
        b_2.storeDict(src.int_cell, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell());
        b_2.storeDict(src.int_address, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
        b_2.storeDict(src.int_struct, Dictionary.Keys.BigInt(257), dictValueParserSomeStruct());
        const b_3 = new Builder();
        b_3.storeDict(src.int8_varint16, Dictionary.Keys.Int(8), Dictionary.Values.BigVarInt(4));
        b_3.storeDict(src.int8_varint32, Dictionary.Keys.Int(8), Dictionary.Values.BigVarInt(5));
        b_3.storeDict(src.int8_varuint16, Dictionary.Keys.Int(8), Dictionary.Values.BigVarUint(4));
        const b_4 = new Builder();
        b_4.storeDict(src.int8_varuint32, Dictionary.Keys.Int(8), Dictionary.Values.BigVarUint(5));
        b_4.storeDict(src.int8_bool, Dictionary.Keys.Int(8), Dictionary.Values.Bool());
        b_4.storeDict(src.int8_cell, Dictionary.Keys.Int(8), Dictionary.Values.Cell());
        const b_5 = new Builder();
        b_5.storeDict(src.int8_address, Dictionary.Keys.Int(8), Dictionary.Values.Address());
        b_5.storeDict(src.int8_struct, Dictionary.Keys.Int(8), dictValueParserSomeStruct());
        b_5.storeDict(src.int42_varint16, Dictionary.Keys.BigInt(42), Dictionary.Values.BigVarInt(4));
        const b_6 = new Builder();
        b_6.storeDict(src.int42_varint32, Dictionary.Keys.BigInt(42), Dictionary.Values.BigVarInt(5));
        b_6.storeDict(src.int42_varuint16, Dictionary.Keys.BigInt(42), Dictionary.Values.BigVarUint(4));
        b_6.storeDict(src.int42_varuint32, Dictionary.Keys.BigInt(42), Dictionary.Values.BigVarUint(5));
        const b_7 = new Builder();
        b_7.storeDict(src.int42_bool, Dictionary.Keys.BigInt(42), Dictionary.Values.Bool());
        b_7.storeDict(src.int42_cell, Dictionary.Keys.BigInt(42), Dictionary.Values.Cell());
        b_7.storeDict(src.int42_address, Dictionary.Keys.BigInt(42), Dictionary.Values.Address());
        const b_8 = new Builder();
        b_8.storeDict(src.int42_struct, Dictionary.Keys.BigInt(42), dictValueParserSomeStruct());
        b_8.storeDict(src.int256_varint16, Dictionary.Keys.BigInt(256), Dictionary.Values.BigVarInt(4));
        b_8.storeDict(src.int256_varint32, Dictionary.Keys.BigInt(256), Dictionary.Values.BigVarInt(5));
        const b_9 = new Builder();
        b_9.storeDict(src.int256_varuint16, Dictionary.Keys.BigInt(256), Dictionary.Values.BigVarUint(4));
        b_9.storeDict(src.int256_varuint32, Dictionary.Keys.BigInt(256), Dictionary.Values.BigVarUint(5));
        b_9.storeDict(src.int256_bool, Dictionary.Keys.BigInt(256), Dictionary.Values.Bool());
        const b_10 = new Builder();
        b_10.storeDict(src.int256_cell, Dictionary.Keys.BigInt(256), Dictionary.Values.Cell());
        b_10.storeDict(src.int256_address, Dictionary.Keys.BigInt(256), Dictionary.Values.Address());
        b_10.storeDict(src.int256_struct, Dictionary.Keys.BigInt(256), dictValueParserSomeStruct());
        const b_11 = new Builder();
        b_11.storeDict(src.uint8_varint16, Dictionary.Keys.Uint(8), Dictionary.Values.BigVarInt(4));
        b_11.storeDict(src.uint8_varint32, Dictionary.Keys.Uint(8), Dictionary.Values.BigVarInt(5));
        b_11.storeDict(src.uint8_varuint16, Dictionary.Keys.Uint(8), Dictionary.Values.BigVarUint(4));
        const b_12 = new Builder();
        b_12.storeDict(src.uint8_varuint32, Dictionary.Keys.Uint(8), Dictionary.Values.BigVarUint(5));
        b_12.storeDict(src.uint8_bool, Dictionary.Keys.Uint(8), Dictionary.Values.Bool());
        b_12.storeDict(src.uint8_cell, Dictionary.Keys.Uint(8), Dictionary.Values.Cell());
        const b_13 = new Builder();
        b_13.storeDict(src.uint8_address, Dictionary.Keys.Uint(8), Dictionary.Values.Address());
        b_13.storeDict(src.uint8_struct, Dictionary.Keys.Uint(8), dictValueParserSomeStruct());
        b_13.storeDict(src.uint42_varint16, Dictionary.Keys.BigUint(42), Dictionary.Values.BigVarInt(4));
        const b_14 = new Builder();
        b_14.storeDict(src.uint42_varint32, Dictionary.Keys.BigUint(42), Dictionary.Values.BigVarInt(5));
        b_14.storeDict(src.uint42_varuint16, Dictionary.Keys.BigUint(42), Dictionary.Values.BigVarUint(4));
        b_14.storeDict(src.uint42_varuint32, Dictionary.Keys.BigUint(42), Dictionary.Values.BigVarUint(5));
        const b_15 = new Builder();
        b_15.storeDict(src.uint42_bool, Dictionary.Keys.BigUint(42), Dictionary.Values.Bool());
        b_15.storeDict(src.uint42_cell, Dictionary.Keys.BigUint(42), Dictionary.Values.Cell());
        b_15.storeDict(src.uint42_address, Dictionary.Keys.BigUint(42), Dictionary.Values.Address());
        const b_16 = new Builder();
        b_16.storeDict(src.uint42_struct, Dictionary.Keys.BigUint(42), dictValueParserSomeStruct());
        b_16.storeDict(src.uint256_varint16, Dictionary.Keys.BigUint(256), Dictionary.Values.BigVarInt(4));
        b_16.storeDict(src.uint256_varint32, Dictionary.Keys.BigUint(256), Dictionary.Values.BigVarInt(5));
        const b_17 = new Builder();
        b_17.storeDict(src.uint256_varuint16, Dictionary.Keys.BigUint(256), Dictionary.Values.BigVarUint(4));
        b_17.storeDict(src.uint256_varuint32, Dictionary.Keys.BigUint(256), Dictionary.Values.BigVarUint(5));
        b_17.storeDict(src.uint256_bool, Dictionary.Keys.BigUint(256), Dictionary.Values.Bool());
        const b_18 = new Builder();
        b_18.storeDict(src.uint256_cell, Dictionary.Keys.BigUint(256), Dictionary.Values.Cell());
        b_18.storeDict(src.uint256_address, Dictionary.Keys.BigUint(256), Dictionary.Values.Address());
        b_18.storeDict(src.uint256_struct, Dictionary.Keys.BigUint(256), dictValueParserSomeStruct());
        const b_19 = new Builder();
        b_19.storeDict(src.address_varint16, Dictionary.Keys.Address(), Dictionary.Values.BigVarInt(4));
        b_19.storeDict(src.address_varint32, Dictionary.Keys.Address(), Dictionary.Values.BigVarInt(5));
        b_19.storeDict(src.address_varuint16, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
        const b_20 = new Builder();
        b_20.storeDict(src.address_varuint32, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(5));
        b_20.storeDict(src.address_bool, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        b_20.storeDict(src.address_cell, Dictionary.Keys.Address(), Dictionary.Values.Cell());
        const b_21 = new Builder();
        b_21.storeDict(src.address_address, Dictionary.Keys.Address(), Dictionary.Values.Address());
        b_21.storeDict(src.address_struct, Dictionary.Keys.Address(), dictValueParserSomeStruct());
        b_20.storeRef(b_21.endCell());
        b_19.storeRef(b_20.endCell());
        b_18.storeRef(b_19.endCell());
        b_17.storeRef(b_18.endCell());
        b_16.storeRef(b_17.endCell());
        b_15.storeRef(b_16.endCell());
        b_14.storeRef(b_15.endCell());
        b_13.storeRef(b_14.endCell());
        b_12.storeRef(b_13.endCell());
        b_11.storeRef(b_12.endCell());
        b_10.storeRef(b_11.endCell());
        b_9.storeRef(b_10.endCell());
        b_8.storeRef(b_9.endCell());
        b_7.storeRef(b_8.endCell());
        b_6.storeRef(b_7.endCell());
        b_5.storeRef(b_6.endCell());
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMapTestContract$Data(slice: Slice) {
    const sc_0 = slice;
    const _int_varint16 = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarInt(4), sc_0);
    const _int_varint32 = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarInt(5), sc_0);
    const sc_1 = sc_0.loadRef().beginParse();
    const _int_varuint16 = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarUint(4), sc_1);
    const _int_varuint32 = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarUint(5), sc_1);
    const _int_bool = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Bool(), sc_1);
    const sc_2 = sc_1.loadRef().beginParse();
    const _int_cell = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), sc_2);
    const _int_address = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_2);
    const _int_struct = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserSomeStruct(), sc_2);
    const sc_3 = sc_2.loadRef().beginParse();
    const _int8_varint16 = Dictionary.load(Dictionary.Keys.Int(8), Dictionary.Values.BigVarInt(4), sc_3);
    const _int8_varint32 = Dictionary.load(Dictionary.Keys.Int(8), Dictionary.Values.BigVarInt(5), sc_3);
    const _int8_varuint16 = Dictionary.load(Dictionary.Keys.Int(8), Dictionary.Values.BigVarUint(4), sc_3);
    const sc_4 = sc_3.loadRef().beginParse();
    const _int8_varuint32 = Dictionary.load(Dictionary.Keys.Int(8), Dictionary.Values.BigVarUint(5), sc_4);
    const _int8_bool = Dictionary.load(Dictionary.Keys.Int(8), Dictionary.Values.Bool(), sc_4);
    const _int8_cell = Dictionary.load(Dictionary.Keys.Int(8), Dictionary.Values.Cell(), sc_4);
    const sc_5 = sc_4.loadRef().beginParse();
    const _int8_address = Dictionary.load(Dictionary.Keys.Int(8), Dictionary.Values.Address(), sc_5);
    const _int8_struct = Dictionary.load(Dictionary.Keys.Int(8), dictValueParserSomeStruct(), sc_5);
    const _int42_varint16 = Dictionary.load(Dictionary.Keys.BigInt(42), Dictionary.Values.BigVarInt(4), sc_5);
    const sc_6 = sc_5.loadRef().beginParse();
    const _int42_varint32 = Dictionary.load(Dictionary.Keys.BigInt(42), Dictionary.Values.BigVarInt(5), sc_6);
    const _int42_varuint16 = Dictionary.load(Dictionary.Keys.BigInt(42), Dictionary.Values.BigVarUint(4), sc_6);
    const _int42_varuint32 = Dictionary.load(Dictionary.Keys.BigInt(42), Dictionary.Values.BigVarUint(5), sc_6);
    const sc_7 = sc_6.loadRef().beginParse();
    const _int42_bool = Dictionary.load(Dictionary.Keys.BigInt(42), Dictionary.Values.Bool(), sc_7);
    const _int42_cell = Dictionary.load(Dictionary.Keys.BigInt(42), Dictionary.Values.Cell(), sc_7);
    const _int42_address = Dictionary.load(Dictionary.Keys.BigInt(42), Dictionary.Values.Address(), sc_7);
    const sc_8 = sc_7.loadRef().beginParse();
    const _int42_struct = Dictionary.load(Dictionary.Keys.BigInt(42), dictValueParserSomeStruct(), sc_8);
    const _int256_varint16 = Dictionary.load(Dictionary.Keys.BigInt(256), Dictionary.Values.BigVarInt(4), sc_8);
    const _int256_varint32 = Dictionary.load(Dictionary.Keys.BigInt(256), Dictionary.Values.BigVarInt(5), sc_8);
    const sc_9 = sc_8.loadRef().beginParse();
    const _int256_varuint16 = Dictionary.load(Dictionary.Keys.BigInt(256), Dictionary.Values.BigVarUint(4), sc_9);
    const _int256_varuint32 = Dictionary.load(Dictionary.Keys.BigInt(256), Dictionary.Values.BigVarUint(5), sc_9);
    const _int256_bool = Dictionary.load(Dictionary.Keys.BigInt(256), Dictionary.Values.Bool(), sc_9);
    const sc_10 = sc_9.loadRef().beginParse();
    const _int256_cell = Dictionary.load(Dictionary.Keys.BigInt(256), Dictionary.Values.Cell(), sc_10);
    const _int256_address = Dictionary.load(Dictionary.Keys.BigInt(256), Dictionary.Values.Address(), sc_10);
    const _int256_struct = Dictionary.load(Dictionary.Keys.BigInt(256), dictValueParserSomeStruct(), sc_10);
    const sc_11 = sc_10.loadRef().beginParse();
    const _uint8_varint16 = Dictionary.load(Dictionary.Keys.Uint(8), Dictionary.Values.BigVarInt(4), sc_11);
    const _uint8_varint32 = Dictionary.load(Dictionary.Keys.Uint(8), Dictionary.Values.BigVarInt(5), sc_11);
    const _uint8_varuint16 = Dictionary.load(Dictionary.Keys.Uint(8), Dictionary.Values.BigVarUint(4), sc_11);
    const sc_12 = sc_11.loadRef().beginParse();
    const _uint8_varuint32 = Dictionary.load(Dictionary.Keys.Uint(8), Dictionary.Values.BigVarUint(5), sc_12);
    const _uint8_bool = Dictionary.load(Dictionary.Keys.Uint(8), Dictionary.Values.Bool(), sc_12);
    const _uint8_cell = Dictionary.load(Dictionary.Keys.Uint(8), Dictionary.Values.Cell(), sc_12);
    const sc_13 = sc_12.loadRef().beginParse();
    const _uint8_address = Dictionary.load(Dictionary.Keys.Uint(8), Dictionary.Values.Address(), sc_13);
    const _uint8_struct = Dictionary.load(Dictionary.Keys.Uint(8), dictValueParserSomeStruct(), sc_13);
    const _uint42_varint16 = Dictionary.load(Dictionary.Keys.BigUint(42), Dictionary.Values.BigVarInt(4), sc_13);
    const sc_14 = sc_13.loadRef().beginParse();
    const _uint42_varint32 = Dictionary.load(Dictionary.Keys.BigUint(42), Dictionary.Values.BigVarInt(5), sc_14);
    const _uint42_varuint16 = Dictionary.load(Dictionary.Keys.BigUint(42), Dictionary.Values.BigVarUint(4), sc_14);
    const _uint42_varuint32 = Dictionary.load(Dictionary.Keys.BigUint(42), Dictionary.Values.BigVarUint(5), sc_14);
    const sc_15 = sc_14.loadRef().beginParse();
    const _uint42_bool = Dictionary.load(Dictionary.Keys.BigUint(42), Dictionary.Values.Bool(), sc_15);
    const _uint42_cell = Dictionary.load(Dictionary.Keys.BigUint(42), Dictionary.Values.Cell(), sc_15);
    const _uint42_address = Dictionary.load(Dictionary.Keys.BigUint(42), Dictionary.Values.Address(), sc_15);
    const sc_16 = sc_15.loadRef().beginParse();
    const _uint42_struct = Dictionary.load(Dictionary.Keys.BigUint(42), dictValueParserSomeStruct(), sc_16);
    const _uint256_varint16 = Dictionary.load(Dictionary.Keys.BigUint(256), Dictionary.Values.BigVarInt(4), sc_16);
    const _uint256_varint32 = Dictionary.load(Dictionary.Keys.BigUint(256), Dictionary.Values.BigVarInt(5), sc_16);
    const sc_17 = sc_16.loadRef().beginParse();
    const _uint256_varuint16 = Dictionary.load(Dictionary.Keys.BigUint(256), Dictionary.Values.BigVarUint(4), sc_17);
    const _uint256_varuint32 = Dictionary.load(Dictionary.Keys.BigUint(256), Dictionary.Values.BigVarUint(5), sc_17);
    const _uint256_bool = Dictionary.load(Dictionary.Keys.BigUint(256), Dictionary.Values.Bool(), sc_17);
    const sc_18 = sc_17.loadRef().beginParse();
    const _uint256_cell = Dictionary.load(Dictionary.Keys.BigUint(256), Dictionary.Values.Cell(), sc_18);
    const _uint256_address = Dictionary.load(Dictionary.Keys.BigUint(256), Dictionary.Values.Address(), sc_18);
    const _uint256_struct = Dictionary.load(Dictionary.Keys.BigUint(256), dictValueParserSomeStruct(), sc_18);
    const sc_19 = sc_18.loadRef().beginParse();
    const _address_varint16 = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarInt(4), sc_19);
    const _address_varint32 = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarInt(5), sc_19);
    const _address_varuint16 = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_19);
    const sc_20 = sc_19.loadRef().beginParse();
    const _address_varuint32 = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(5), sc_20);
    const _address_bool = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_20);
    const _address_cell = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Cell(), sc_20);
    const sc_21 = sc_20.loadRef().beginParse();
    const _address_address = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Address(), sc_21);
    const _address_struct = Dictionary.load(Dictionary.Keys.Address(), dictValueParserSomeStruct(), sc_21);
    return { $$type: 'MapTestContract$Data' as const, int_varint16: _int_varint16, int_varint32: _int_varint32, int_varuint16: _int_varuint16, int_varuint32: _int_varuint32, int_bool: _int_bool, int_cell: _int_cell, int_address: _int_address, int_struct: _int_struct, int8_varint16: _int8_varint16, int8_varint32: _int8_varint32, int8_varuint16: _int8_varuint16, int8_varuint32: _int8_varuint32, int8_bool: _int8_bool, int8_cell: _int8_cell, int8_address: _int8_address, int8_struct: _int8_struct, int42_varint16: _int42_varint16, int42_varint32: _int42_varint32, int42_varuint16: _int42_varuint16, int42_varuint32: _int42_varuint32, int42_bool: _int42_bool, int42_cell: _int42_cell, int42_address: _int42_address, int42_struct: _int42_struct, int256_varint16: _int256_varint16, int256_varint32: _int256_varint32, int256_varuint16: _int256_varuint16, int256_varuint32: _int256_varuint32, int256_bool: _int256_bool, int256_cell: _int256_cell, int256_address: _int256_address, int256_struct: _int256_struct, uint8_varint16: _uint8_varint16, uint8_varint32: _uint8_varint32, uint8_varuint16: _uint8_varuint16, uint8_varuint32: _uint8_varuint32, uint8_bool: _uint8_bool, uint8_cell: _uint8_cell, uint8_address: _uint8_address, uint8_struct: _uint8_struct, uint42_varint16: _uint42_varint16, uint42_varint32: _uint42_varint32, uint42_varuint16: _uint42_varuint16, uint42_varuint32: _uint42_varuint32, uint42_bool: _uint42_bool, uint42_cell: _uint42_cell, uint42_address: _uint42_address, uint42_struct: _uint42_struct, uint256_varint16: _uint256_varint16, uint256_varint32: _uint256_varint32, uint256_varuint16: _uint256_varuint16, uint256_varuint32: _uint256_varuint32, uint256_bool: _uint256_bool, uint256_cell: _uint256_cell, uint256_address: _uint256_address, uint256_struct: _uint256_struct, address_varint16: _address_varint16, address_varint32: _address_varint32, address_varuint16: _address_varuint16, address_varuint32: _address_varuint32, address_bool: _address_bool, address_cell: _address_cell, address_address: _address_address, address_struct: _address_struct };
}

function loadTupleMapTestContract$Data(source: TupleReader) {
    const _int_varint16 = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarInt(4), source.readCellOpt());
    const _int_varint32 = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarInt(5), source.readCellOpt());
    const _int_varuint16 = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _int_varuint32 = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarUint(5), source.readCellOpt());
    const _int_bool = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Bool(), source.readCellOpt());
    const _int_cell = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), source.readCellOpt());
    const _int_address = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    const _int_struct = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserSomeStruct(), source.readCellOpt());
    const _int8_varint16 = Dictionary.loadDirect(Dictionary.Keys.Int(8), Dictionary.Values.BigVarInt(4), source.readCellOpt());
    const _int8_varint32 = Dictionary.loadDirect(Dictionary.Keys.Int(8), Dictionary.Values.BigVarInt(5), source.readCellOpt());
    const _int8_varuint16 = Dictionary.loadDirect(Dictionary.Keys.Int(8), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _int8_varuint32 = Dictionary.loadDirect(Dictionary.Keys.Int(8), Dictionary.Values.BigVarUint(5), source.readCellOpt());
    const _int8_bool = Dictionary.loadDirect(Dictionary.Keys.Int(8), Dictionary.Values.Bool(), source.readCellOpt());
    const _int8_cell = Dictionary.loadDirect(Dictionary.Keys.Int(8), Dictionary.Values.Cell(), source.readCellOpt());
    source = source.readTuple();
    const _int8_address = Dictionary.loadDirect(Dictionary.Keys.Int(8), Dictionary.Values.Address(), source.readCellOpt());
    const _int8_struct = Dictionary.loadDirect(Dictionary.Keys.Int(8), dictValueParserSomeStruct(), source.readCellOpt());
    const _int42_varint16 = Dictionary.loadDirect(Dictionary.Keys.BigInt(42), Dictionary.Values.BigVarInt(4), source.readCellOpt());
    const _int42_varint32 = Dictionary.loadDirect(Dictionary.Keys.BigInt(42), Dictionary.Values.BigVarInt(5), source.readCellOpt());
    const _int42_varuint16 = Dictionary.loadDirect(Dictionary.Keys.BigInt(42), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _int42_varuint32 = Dictionary.loadDirect(Dictionary.Keys.BigInt(42), Dictionary.Values.BigVarUint(5), source.readCellOpt());
    const _int42_bool = Dictionary.loadDirect(Dictionary.Keys.BigInt(42), Dictionary.Values.Bool(), source.readCellOpt());
    const _int42_cell = Dictionary.loadDirect(Dictionary.Keys.BigInt(42), Dictionary.Values.Cell(), source.readCellOpt());
    const _int42_address = Dictionary.loadDirect(Dictionary.Keys.BigInt(42), Dictionary.Values.Address(), source.readCellOpt());
    const _int42_struct = Dictionary.loadDirect(Dictionary.Keys.BigInt(42), dictValueParserSomeStruct(), source.readCellOpt());
    const _int256_varint16 = Dictionary.loadDirect(Dictionary.Keys.BigInt(256), Dictionary.Values.BigVarInt(4), source.readCellOpt());
    const _int256_varint32 = Dictionary.loadDirect(Dictionary.Keys.BigInt(256), Dictionary.Values.BigVarInt(5), source.readCellOpt());
    const _int256_varuint16 = Dictionary.loadDirect(Dictionary.Keys.BigInt(256), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _int256_varuint32 = Dictionary.loadDirect(Dictionary.Keys.BigInt(256), Dictionary.Values.BigVarUint(5), source.readCellOpt());
    source = source.readTuple();
    const _int256_bool = Dictionary.loadDirect(Dictionary.Keys.BigInt(256), Dictionary.Values.Bool(), source.readCellOpt());
    const _int256_cell = Dictionary.loadDirect(Dictionary.Keys.BigInt(256), Dictionary.Values.Cell(), source.readCellOpt());
    const _int256_address = Dictionary.loadDirect(Dictionary.Keys.BigInt(256), Dictionary.Values.Address(), source.readCellOpt());
    const _int256_struct = Dictionary.loadDirect(Dictionary.Keys.BigInt(256), dictValueParserSomeStruct(), source.readCellOpt());
    const _uint8_varint16 = Dictionary.loadDirect(Dictionary.Keys.Uint(8), Dictionary.Values.BigVarInt(4), source.readCellOpt());
    const _uint8_varint32 = Dictionary.loadDirect(Dictionary.Keys.Uint(8), Dictionary.Values.BigVarInt(5), source.readCellOpt());
    const _uint8_varuint16 = Dictionary.loadDirect(Dictionary.Keys.Uint(8), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _uint8_varuint32 = Dictionary.loadDirect(Dictionary.Keys.Uint(8), Dictionary.Values.BigVarUint(5), source.readCellOpt());
    const _uint8_bool = Dictionary.loadDirect(Dictionary.Keys.Uint(8), Dictionary.Values.Bool(), source.readCellOpt());
    const _uint8_cell = Dictionary.loadDirect(Dictionary.Keys.Uint(8), Dictionary.Values.Cell(), source.readCellOpt());
    const _uint8_address = Dictionary.loadDirect(Dictionary.Keys.Uint(8), Dictionary.Values.Address(), source.readCellOpt());
    const _uint8_struct = Dictionary.loadDirect(Dictionary.Keys.Uint(8), dictValueParserSomeStruct(), source.readCellOpt());
    const _uint42_varint16 = Dictionary.loadDirect(Dictionary.Keys.BigUint(42), Dictionary.Values.BigVarInt(4), source.readCellOpt());
    const _uint42_varint32 = Dictionary.loadDirect(Dictionary.Keys.BigUint(42), Dictionary.Values.BigVarInt(5), source.readCellOpt());
    source = source.readTuple();
    const _uint42_varuint16 = Dictionary.loadDirect(Dictionary.Keys.BigUint(42), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _uint42_varuint32 = Dictionary.loadDirect(Dictionary.Keys.BigUint(42), Dictionary.Values.BigVarUint(5), source.readCellOpt());
    const _uint42_bool = Dictionary.loadDirect(Dictionary.Keys.BigUint(42), Dictionary.Values.Bool(), source.readCellOpt());
    const _uint42_cell = Dictionary.loadDirect(Dictionary.Keys.BigUint(42), Dictionary.Values.Cell(), source.readCellOpt());
    const _uint42_address = Dictionary.loadDirect(Dictionary.Keys.BigUint(42), Dictionary.Values.Address(), source.readCellOpt());
    const _uint42_struct = Dictionary.loadDirect(Dictionary.Keys.BigUint(42), dictValueParserSomeStruct(), source.readCellOpt());
    const _uint256_varint16 = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.BigVarInt(4), source.readCellOpt());
    const _uint256_varint32 = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.BigVarInt(5), source.readCellOpt());
    const _uint256_varuint16 = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _uint256_varuint32 = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.BigVarUint(5), source.readCellOpt());
    const _uint256_bool = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.Bool(), source.readCellOpt());
    const _uint256_cell = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.Cell(), source.readCellOpt());
    const _uint256_address = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.Address(), source.readCellOpt());
    const _uint256_struct = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), dictValueParserSomeStruct(), source.readCellOpt());
    source = source.readTuple();
    const _address_varint16 = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarInt(4), source.readCellOpt());
    const _address_varint32 = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarInt(5), source.readCellOpt());
    const _address_varuint16 = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _address_varuint32 = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(5), source.readCellOpt());
    const _address_bool = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    const _address_cell = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Cell(), source.readCellOpt());
    const _address_address = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Address(), source.readCellOpt());
    const _address_struct = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserSomeStruct(), source.readCellOpt());
    return { $$type: 'MapTestContract$Data' as const, int_varint16: _int_varint16, int_varint32: _int_varint32, int_varuint16: _int_varuint16, int_varuint32: _int_varuint32, int_bool: _int_bool, int_cell: _int_cell, int_address: _int_address, int_struct: _int_struct, int8_varint16: _int8_varint16, int8_varint32: _int8_varint32, int8_varuint16: _int8_varuint16, int8_varuint32: _int8_varuint32, int8_bool: _int8_bool, int8_cell: _int8_cell, int8_address: _int8_address, int8_struct: _int8_struct, int42_varint16: _int42_varint16, int42_varint32: _int42_varint32, int42_varuint16: _int42_varuint16, int42_varuint32: _int42_varuint32, int42_bool: _int42_bool, int42_cell: _int42_cell, int42_address: _int42_address, int42_struct: _int42_struct, int256_varint16: _int256_varint16, int256_varint32: _int256_varint32, int256_varuint16: _int256_varuint16, int256_varuint32: _int256_varuint32, int256_bool: _int256_bool, int256_cell: _int256_cell, int256_address: _int256_address, int256_struct: _int256_struct, uint8_varint16: _uint8_varint16, uint8_varint32: _uint8_varint32, uint8_varuint16: _uint8_varuint16, uint8_varuint32: _uint8_varuint32, uint8_bool: _uint8_bool, uint8_cell: _uint8_cell, uint8_address: _uint8_address, uint8_struct: _uint8_struct, uint42_varint16: _uint42_varint16, uint42_varint32: _uint42_varint32, uint42_varuint16: _uint42_varuint16, uint42_varuint32: _uint42_varuint32, uint42_bool: _uint42_bool, uint42_cell: _uint42_cell, uint42_address: _uint42_address, uint42_struct: _uint42_struct, uint256_varint16: _uint256_varint16, uint256_varint32: _uint256_varint32, uint256_varuint16: _uint256_varuint16, uint256_varuint32: _uint256_varuint32, uint256_bool: _uint256_bool, uint256_cell: _uint256_cell, uint256_address: _uint256_address, uint256_struct: _uint256_struct, address_varint16: _address_varint16, address_varint32: _address_varint32, address_varuint16: _address_varuint16, address_varuint32: _address_varuint32, address_bool: _address_bool, address_cell: _address_cell, address_address: _address_address, address_struct: _address_struct };
}

function loadGetterTupleMapTestContract$Data(source: TupleReader) {
    const _int_varint16 = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarInt(4), source.readCellOpt());
    const _int_varint32 = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarInt(5), source.readCellOpt());
    const _int_varuint16 = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _int_varuint32 = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarUint(5), source.readCellOpt());
    const _int_bool = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Bool(), source.readCellOpt());
    const _int_cell = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), source.readCellOpt());
    const _int_address = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    const _int_struct = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserSomeStruct(), source.readCellOpt());
    const _int8_varint16 = Dictionary.loadDirect(Dictionary.Keys.Int(8), Dictionary.Values.BigVarInt(4), source.readCellOpt());
    const _int8_varint32 = Dictionary.loadDirect(Dictionary.Keys.Int(8), Dictionary.Values.BigVarInt(5), source.readCellOpt());
    const _int8_varuint16 = Dictionary.loadDirect(Dictionary.Keys.Int(8), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _int8_varuint32 = Dictionary.loadDirect(Dictionary.Keys.Int(8), Dictionary.Values.BigVarUint(5), source.readCellOpt());
    const _int8_bool = Dictionary.loadDirect(Dictionary.Keys.Int(8), Dictionary.Values.Bool(), source.readCellOpt());
    const _int8_cell = Dictionary.loadDirect(Dictionary.Keys.Int(8), Dictionary.Values.Cell(), source.readCellOpt());
    const _int8_address = Dictionary.loadDirect(Dictionary.Keys.Int(8), Dictionary.Values.Address(), source.readCellOpt());
    const _int8_struct = Dictionary.loadDirect(Dictionary.Keys.Int(8), dictValueParserSomeStruct(), source.readCellOpt());
    const _int42_varint16 = Dictionary.loadDirect(Dictionary.Keys.BigInt(42), Dictionary.Values.BigVarInt(4), source.readCellOpt());
    const _int42_varint32 = Dictionary.loadDirect(Dictionary.Keys.BigInt(42), Dictionary.Values.BigVarInt(5), source.readCellOpt());
    const _int42_varuint16 = Dictionary.loadDirect(Dictionary.Keys.BigInt(42), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _int42_varuint32 = Dictionary.loadDirect(Dictionary.Keys.BigInt(42), Dictionary.Values.BigVarUint(5), source.readCellOpt());
    const _int42_bool = Dictionary.loadDirect(Dictionary.Keys.BigInt(42), Dictionary.Values.Bool(), source.readCellOpt());
    const _int42_cell = Dictionary.loadDirect(Dictionary.Keys.BigInt(42), Dictionary.Values.Cell(), source.readCellOpt());
    const _int42_address = Dictionary.loadDirect(Dictionary.Keys.BigInt(42), Dictionary.Values.Address(), source.readCellOpt());
    const _int42_struct = Dictionary.loadDirect(Dictionary.Keys.BigInt(42), dictValueParserSomeStruct(), source.readCellOpt());
    const _int256_varint16 = Dictionary.loadDirect(Dictionary.Keys.BigInt(256), Dictionary.Values.BigVarInt(4), source.readCellOpt());
    const _int256_varint32 = Dictionary.loadDirect(Dictionary.Keys.BigInt(256), Dictionary.Values.BigVarInt(5), source.readCellOpt());
    const _int256_varuint16 = Dictionary.loadDirect(Dictionary.Keys.BigInt(256), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _int256_varuint32 = Dictionary.loadDirect(Dictionary.Keys.BigInt(256), Dictionary.Values.BigVarUint(5), source.readCellOpt());
    const _int256_bool = Dictionary.loadDirect(Dictionary.Keys.BigInt(256), Dictionary.Values.Bool(), source.readCellOpt());
    const _int256_cell = Dictionary.loadDirect(Dictionary.Keys.BigInt(256), Dictionary.Values.Cell(), source.readCellOpt());
    const _int256_address = Dictionary.loadDirect(Dictionary.Keys.BigInt(256), Dictionary.Values.Address(), source.readCellOpt());
    const _int256_struct = Dictionary.loadDirect(Dictionary.Keys.BigInt(256), dictValueParserSomeStruct(), source.readCellOpt());
    const _uint8_varint16 = Dictionary.loadDirect(Dictionary.Keys.Uint(8), Dictionary.Values.BigVarInt(4), source.readCellOpt());
    const _uint8_varint32 = Dictionary.loadDirect(Dictionary.Keys.Uint(8), Dictionary.Values.BigVarInt(5), source.readCellOpt());
    const _uint8_varuint16 = Dictionary.loadDirect(Dictionary.Keys.Uint(8), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _uint8_varuint32 = Dictionary.loadDirect(Dictionary.Keys.Uint(8), Dictionary.Values.BigVarUint(5), source.readCellOpt());
    const _uint8_bool = Dictionary.loadDirect(Dictionary.Keys.Uint(8), Dictionary.Values.Bool(), source.readCellOpt());
    const _uint8_cell = Dictionary.loadDirect(Dictionary.Keys.Uint(8), Dictionary.Values.Cell(), source.readCellOpt());
    const _uint8_address = Dictionary.loadDirect(Dictionary.Keys.Uint(8), Dictionary.Values.Address(), source.readCellOpt());
    const _uint8_struct = Dictionary.loadDirect(Dictionary.Keys.Uint(8), dictValueParserSomeStruct(), source.readCellOpt());
    const _uint42_varint16 = Dictionary.loadDirect(Dictionary.Keys.BigUint(42), Dictionary.Values.BigVarInt(4), source.readCellOpt());
    const _uint42_varint32 = Dictionary.loadDirect(Dictionary.Keys.BigUint(42), Dictionary.Values.BigVarInt(5), source.readCellOpt());
    const _uint42_varuint16 = Dictionary.loadDirect(Dictionary.Keys.BigUint(42), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _uint42_varuint32 = Dictionary.loadDirect(Dictionary.Keys.BigUint(42), Dictionary.Values.BigVarUint(5), source.readCellOpt());
    const _uint42_bool = Dictionary.loadDirect(Dictionary.Keys.BigUint(42), Dictionary.Values.Bool(), source.readCellOpt());
    const _uint42_cell = Dictionary.loadDirect(Dictionary.Keys.BigUint(42), Dictionary.Values.Cell(), source.readCellOpt());
    const _uint42_address = Dictionary.loadDirect(Dictionary.Keys.BigUint(42), Dictionary.Values.Address(), source.readCellOpt());
    const _uint42_struct = Dictionary.loadDirect(Dictionary.Keys.BigUint(42), dictValueParserSomeStruct(), source.readCellOpt());
    const _uint256_varint16 = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.BigVarInt(4), source.readCellOpt());
    const _uint256_varint32 = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.BigVarInt(5), source.readCellOpt());
    const _uint256_varuint16 = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _uint256_varuint32 = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.BigVarUint(5), source.readCellOpt());
    const _uint256_bool = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.Bool(), source.readCellOpt());
    const _uint256_cell = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.Cell(), source.readCellOpt());
    const _uint256_address = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.Address(), source.readCellOpt());
    const _uint256_struct = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), dictValueParserSomeStruct(), source.readCellOpt());
    const _address_varint16 = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarInt(4), source.readCellOpt());
    const _address_varint32 = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarInt(5), source.readCellOpt());
    const _address_varuint16 = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _address_varuint32 = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(5), source.readCellOpt());
    const _address_bool = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    const _address_cell = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Cell(), source.readCellOpt());
    const _address_address = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Address(), source.readCellOpt());
    const _address_struct = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserSomeStruct(), source.readCellOpt());
    return { $$type: 'MapTestContract$Data' as const, int_varint16: _int_varint16, int_varint32: _int_varint32, int_varuint16: _int_varuint16, int_varuint32: _int_varuint32, int_bool: _int_bool, int_cell: _int_cell, int_address: _int_address, int_struct: _int_struct, int8_varint16: _int8_varint16, int8_varint32: _int8_varint32, int8_varuint16: _int8_varuint16, int8_varuint32: _int8_varuint32, int8_bool: _int8_bool, int8_cell: _int8_cell, int8_address: _int8_address, int8_struct: _int8_struct, int42_varint16: _int42_varint16, int42_varint32: _int42_varint32, int42_varuint16: _int42_varuint16, int42_varuint32: _int42_varuint32, int42_bool: _int42_bool, int42_cell: _int42_cell, int42_address: _int42_address, int42_struct: _int42_struct, int256_varint16: _int256_varint16, int256_varint32: _int256_varint32, int256_varuint16: _int256_varuint16, int256_varuint32: _int256_varuint32, int256_bool: _int256_bool, int256_cell: _int256_cell, int256_address: _int256_address, int256_struct: _int256_struct, uint8_varint16: _uint8_varint16, uint8_varint32: _uint8_varint32, uint8_varuint16: _uint8_varuint16, uint8_varuint32: _uint8_varuint32, uint8_bool: _uint8_bool, uint8_cell: _uint8_cell, uint8_address: _uint8_address, uint8_struct: _uint8_struct, uint42_varint16: _uint42_varint16, uint42_varint32: _uint42_varint32, uint42_varuint16: _uint42_varuint16, uint42_varuint32: _uint42_varuint32, uint42_bool: _uint42_bool, uint42_cell: _uint42_cell, uint42_address: _uint42_address, uint42_struct: _uint42_struct, uint256_varint16: _uint256_varint16, uint256_varint32: _uint256_varint32, uint256_varuint16: _uint256_varuint16, uint256_varuint32: _uint256_varuint32, uint256_bool: _uint256_bool, uint256_cell: _uint256_cell, uint256_address: _uint256_address, uint256_struct: _uint256_struct, address_varint16: _address_varint16, address_varint32: _address_varint32, address_varuint16: _address_varuint16, address_varuint32: _address_varuint32, address_bool: _address_bool, address_cell: _address_cell, address_address: _address_address, address_struct: _address_struct };
}

function storeTupleMapTestContract$Data(source: MapTestContract$Data) {
    const builder = new TupleBuilder();
    builder.writeCell(source.int_varint16.size > 0 ? beginCell().storeDictDirect(source.int_varint16, Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarInt(4)).endCell() : null);
    builder.writeCell(source.int_varint32.size > 0 ? beginCell().storeDictDirect(source.int_varint32, Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarInt(5)).endCell() : null);
    builder.writeCell(source.int_varuint16.size > 0 ? beginCell().storeDictDirect(source.int_varuint16, Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeCell(source.int_varuint32.size > 0 ? beginCell().storeDictDirect(source.int_varuint32, Dictionary.Keys.BigInt(257), Dictionary.Values.BigVarUint(5)).endCell() : null);
    builder.writeCell(source.int_bool.size > 0 ? beginCell().storeDictDirect(source.int_bool, Dictionary.Keys.BigInt(257), Dictionary.Values.Bool()).endCell() : null);
    builder.writeCell(source.int_cell.size > 0 ? beginCell().storeDictDirect(source.int_cell, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell()).endCell() : null);
    builder.writeCell(source.int_address.size > 0 ? beginCell().storeDictDirect(source.int_address, Dictionary.Keys.BigInt(257), Dictionary.Values.Address()).endCell() : null);
    builder.writeCell(source.int_struct.size > 0 ? beginCell().storeDictDirect(source.int_struct, Dictionary.Keys.BigInt(257), dictValueParserSomeStruct()).endCell() : null);
    builder.writeCell(source.int8_varint16.size > 0 ? beginCell().storeDictDirect(source.int8_varint16, Dictionary.Keys.Int(8), Dictionary.Values.BigVarInt(4)).endCell() : null);
    builder.writeCell(source.int8_varint32.size > 0 ? beginCell().storeDictDirect(source.int8_varint32, Dictionary.Keys.Int(8), Dictionary.Values.BigVarInt(5)).endCell() : null);
    builder.writeCell(source.int8_varuint16.size > 0 ? beginCell().storeDictDirect(source.int8_varuint16, Dictionary.Keys.Int(8), Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeCell(source.int8_varuint32.size > 0 ? beginCell().storeDictDirect(source.int8_varuint32, Dictionary.Keys.Int(8), Dictionary.Values.BigVarUint(5)).endCell() : null);
    builder.writeCell(source.int8_bool.size > 0 ? beginCell().storeDictDirect(source.int8_bool, Dictionary.Keys.Int(8), Dictionary.Values.Bool()).endCell() : null);
    builder.writeCell(source.int8_cell.size > 0 ? beginCell().storeDictDirect(source.int8_cell, Dictionary.Keys.Int(8), Dictionary.Values.Cell()).endCell() : null);
    builder.writeCell(source.int8_address.size > 0 ? beginCell().storeDictDirect(source.int8_address, Dictionary.Keys.Int(8), Dictionary.Values.Address()).endCell() : null);
    builder.writeCell(source.int8_struct.size > 0 ? beginCell().storeDictDirect(source.int8_struct, Dictionary.Keys.Int(8), dictValueParserSomeStruct()).endCell() : null);
    builder.writeCell(source.int42_varint16.size > 0 ? beginCell().storeDictDirect(source.int42_varint16, Dictionary.Keys.BigInt(42), Dictionary.Values.BigVarInt(4)).endCell() : null);
    builder.writeCell(source.int42_varint32.size > 0 ? beginCell().storeDictDirect(source.int42_varint32, Dictionary.Keys.BigInt(42), Dictionary.Values.BigVarInt(5)).endCell() : null);
    builder.writeCell(source.int42_varuint16.size > 0 ? beginCell().storeDictDirect(source.int42_varuint16, Dictionary.Keys.BigInt(42), Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeCell(source.int42_varuint32.size > 0 ? beginCell().storeDictDirect(source.int42_varuint32, Dictionary.Keys.BigInt(42), Dictionary.Values.BigVarUint(5)).endCell() : null);
    builder.writeCell(source.int42_bool.size > 0 ? beginCell().storeDictDirect(source.int42_bool, Dictionary.Keys.BigInt(42), Dictionary.Values.Bool()).endCell() : null);
    builder.writeCell(source.int42_cell.size > 0 ? beginCell().storeDictDirect(source.int42_cell, Dictionary.Keys.BigInt(42), Dictionary.Values.Cell()).endCell() : null);
    builder.writeCell(source.int42_address.size > 0 ? beginCell().storeDictDirect(source.int42_address, Dictionary.Keys.BigInt(42), Dictionary.Values.Address()).endCell() : null);
    builder.writeCell(source.int42_struct.size > 0 ? beginCell().storeDictDirect(source.int42_struct, Dictionary.Keys.BigInt(42), dictValueParserSomeStruct()).endCell() : null);
    builder.writeCell(source.int256_varint16.size > 0 ? beginCell().storeDictDirect(source.int256_varint16, Dictionary.Keys.BigInt(256), Dictionary.Values.BigVarInt(4)).endCell() : null);
    builder.writeCell(source.int256_varint32.size > 0 ? beginCell().storeDictDirect(source.int256_varint32, Dictionary.Keys.BigInt(256), Dictionary.Values.BigVarInt(5)).endCell() : null);
    builder.writeCell(source.int256_varuint16.size > 0 ? beginCell().storeDictDirect(source.int256_varuint16, Dictionary.Keys.BigInt(256), Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeCell(source.int256_varuint32.size > 0 ? beginCell().storeDictDirect(source.int256_varuint32, Dictionary.Keys.BigInt(256), Dictionary.Values.BigVarUint(5)).endCell() : null);
    builder.writeCell(source.int256_bool.size > 0 ? beginCell().storeDictDirect(source.int256_bool, Dictionary.Keys.BigInt(256), Dictionary.Values.Bool()).endCell() : null);
    builder.writeCell(source.int256_cell.size > 0 ? beginCell().storeDictDirect(source.int256_cell, Dictionary.Keys.BigInt(256), Dictionary.Values.Cell()).endCell() : null);
    builder.writeCell(source.int256_address.size > 0 ? beginCell().storeDictDirect(source.int256_address, Dictionary.Keys.BigInt(256), Dictionary.Values.Address()).endCell() : null);
    builder.writeCell(source.int256_struct.size > 0 ? beginCell().storeDictDirect(source.int256_struct, Dictionary.Keys.BigInt(256), dictValueParserSomeStruct()).endCell() : null);
    builder.writeCell(source.uint8_varint16.size > 0 ? beginCell().storeDictDirect(source.uint8_varint16, Dictionary.Keys.Uint(8), Dictionary.Values.BigVarInt(4)).endCell() : null);
    builder.writeCell(source.uint8_varint32.size > 0 ? beginCell().storeDictDirect(source.uint8_varint32, Dictionary.Keys.Uint(8), Dictionary.Values.BigVarInt(5)).endCell() : null);
    builder.writeCell(source.uint8_varuint16.size > 0 ? beginCell().storeDictDirect(source.uint8_varuint16, Dictionary.Keys.Uint(8), Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeCell(source.uint8_varuint32.size > 0 ? beginCell().storeDictDirect(source.uint8_varuint32, Dictionary.Keys.Uint(8), Dictionary.Values.BigVarUint(5)).endCell() : null);
    builder.writeCell(source.uint8_bool.size > 0 ? beginCell().storeDictDirect(source.uint8_bool, Dictionary.Keys.Uint(8), Dictionary.Values.Bool()).endCell() : null);
    builder.writeCell(source.uint8_cell.size > 0 ? beginCell().storeDictDirect(source.uint8_cell, Dictionary.Keys.Uint(8), Dictionary.Values.Cell()).endCell() : null);
    builder.writeCell(source.uint8_address.size > 0 ? beginCell().storeDictDirect(source.uint8_address, Dictionary.Keys.Uint(8), Dictionary.Values.Address()).endCell() : null);
    builder.writeCell(source.uint8_struct.size > 0 ? beginCell().storeDictDirect(source.uint8_struct, Dictionary.Keys.Uint(8), dictValueParserSomeStruct()).endCell() : null);
    builder.writeCell(source.uint42_varint16.size > 0 ? beginCell().storeDictDirect(source.uint42_varint16, Dictionary.Keys.BigUint(42), Dictionary.Values.BigVarInt(4)).endCell() : null);
    builder.writeCell(source.uint42_varint32.size > 0 ? beginCell().storeDictDirect(source.uint42_varint32, Dictionary.Keys.BigUint(42), Dictionary.Values.BigVarInt(5)).endCell() : null);
    builder.writeCell(source.uint42_varuint16.size > 0 ? beginCell().storeDictDirect(source.uint42_varuint16, Dictionary.Keys.BigUint(42), Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeCell(source.uint42_varuint32.size > 0 ? beginCell().storeDictDirect(source.uint42_varuint32, Dictionary.Keys.BigUint(42), Dictionary.Values.BigVarUint(5)).endCell() : null);
    builder.writeCell(source.uint42_bool.size > 0 ? beginCell().storeDictDirect(source.uint42_bool, Dictionary.Keys.BigUint(42), Dictionary.Values.Bool()).endCell() : null);
    builder.writeCell(source.uint42_cell.size > 0 ? beginCell().storeDictDirect(source.uint42_cell, Dictionary.Keys.BigUint(42), Dictionary.Values.Cell()).endCell() : null);
    builder.writeCell(source.uint42_address.size > 0 ? beginCell().storeDictDirect(source.uint42_address, Dictionary.Keys.BigUint(42), Dictionary.Values.Address()).endCell() : null);
    builder.writeCell(source.uint42_struct.size > 0 ? beginCell().storeDictDirect(source.uint42_struct, Dictionary.Keys.BigUint(42), dictValueParserSomeStruct()).endCell() : null);
    builder.writeCell(source.uint256_varint16.size > 0 ? beginCell().storeDictDirect(source.uint256_varint16, Dictionary.Keys.BigUint(256), Dictionary.Values.BigVarInt(4)).endCell() : null);
    builder.writeCell(source.uint256_varint32.size > 0 ? beginCell().storeDictDirect(source.uint256_varint32, Dictionary.Keys.BigUint(256), Dictionary.Values.BigVarInt(5)).endCell() : null);
    builder.writeCell(source.uint256_varuint16.size > 0 ? beginCell().storeDictDirect(source.uint256_varuint16, Dictionary.Keys.BigUint(256), Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeCell(source.uint256_varuint32.size > 0 ? beginCell().storeDictDirect(source.uint256_varuint32, Dictionary.Keys.BigUint(256), Dictionary.Values.BigVarUint(5)).endCell() : null);
    builder.writeCell(source.uint256_bool.size > 0 ? beginCell().storeDictDirect(source.uint256_bool, Dictionary.Keys.BigUint(256), Dictionary.Values.Bool()).endCell() : null);
    builder.writeCell(source.uint256_cell.size > 0 ? beginCell().storeDictDirect(source.uint256_cell, Dictionary.Keys.BigUint(256), Dictionary.Values.Cell()).endCell() : null);
    builder.writeCell(source.uint256_address.size > 0 ? beginCell().storeDictDirect(source.uint256_address, Dictionary.Keys.BigUint(256), Dictionary.Values.Address()).endCell() : null);
    builder.writeCell(source.uint256_struct.size > 0 ? beginCell().storeDictDirect(source.uint256_struct, Dictionary.Keys.BigUint(256), dictValueParserSomeStruct()).endCell() : null);
    builder.writeCell(source.address_varint16.size > 0 ? beginCell().storeDictDirect(source.address_varint16, Dictionary.Keys.Address(), Dictionary.Values.BigVarInt(4)).endCell() : null);
    builder.writeCell(source.address_varint32.size > 0 ? beginCell().storeDictDirect(source.address_varint32, Dictionary.Keys.Address(), Dictionary.Values.BigVarInt(5)).endCell() : null);
    builder.writeCell(source.address_varuint16.size > 0 ? beginCell().storeDictDirect(source.address_varuint16, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeCell(source.address_varuint32.size > 0 ? beginCell().storeDictDirect(source.address_varuint32, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(5)).endCell() : null);
    builder.writeCell(source.address_bool.size > 0 ? beginCell().storeDictDirect(source.address_bool, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
    builder.writeCell(source.address_cell.size > 0 ? beginCell().storeDictDirect(source.address_cell, Dictionary.Keys.Address(), Dictionary.Values.Cell()).endCell() : null);
    builder.writeCell(source.address_address.size > 0 ? beginCell().storeDictDirect(source.address_address, Dictionary.Keys.Address(), Dictionary.Values.Address()).endCell() : null);
    builder.writeCell(source.address_struct.size > 0 ? beginCell().storeDictDirect(source.address_struct, Dictionary.Keys.Address(), dictValueParserSomeStruct()).endCell() : null);
    return builder.build();
}

function dictValueParserMapTestContract$Data(): DictionaryValue<MapTestContract$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMapTestContract$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMapTestContract$Data(src.loadRef().beginParse());
        }
    }
}

 type MapTestContract_init_args = {
    $$type: 'MapTestContract_init_args';
}

function initMapTestContract_init_args(src: MapTestContract_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function MapTestContract_init() {
    const __code = Cell.fromBase64('te6ccgECywEAV5sAART/APSkE/S88sgLAQIBYgIDBKrQAdBy1yHSANIA+kAhEDRQZm8E+GEC+GLbPBFBml8PXw9fD18PXwXgcFZA10kgwh+XMRFA0x8RQd4hghAFQnmyuuMCIYIQSyu+f7rjAiGCEOkJAme6swQFBgIBIA4PAuZbET/bPFcQEU2BAQFT9yBulTBZ9FowmMgB+gNBM/RC4hFMgQEBU/YgbpUwWfRaMJjIAfoHQTP0QuIRS4EBAVP1IG6VMFn0WjCYyAH6AkEz9ELiEUqBAQFT9CBulTBZ9FowmMgB+gZBM/RC4hFJgQEBU/NxPRgC/lsRP9s8OFJgEUaBAQH0WjBSYBFFgQEB9FowUmARRIEBAfRaMFJgEUOBAQH0WjBSYBFCgQEB9FowUmARQYEBAfRaMFJgEUCBAQH0WjARPhaBAQH0WjBSQBE9ePRaMFJAETx49FowUkARO3j0WjBSQBE6ePRaMFJAETl49FowUkAHCAP8j3NbET/bPFcQEU2BAQFT9yBulDBZ9FqYyAH6A0Ez9EriMBFMgQEBU/YgbpQwWfRamMgB+gdBM/RK4jARS4EBAVP1IG6UMFn0WpjIAfoCQTP0SuIwEUqBAQFT9CBulDBZ9FqYyAH6BkEz9EriMBFJgQEBU/Nx4CGCED7Z59G6PScoAGSBAQHXAIEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAgQEB1wDUMNCBAQHXAPpAMBBYEFcQVgH+ETh49FowUkARN3j0WjARNRR49FowUiARNIAq9FowUiARM4Aq9FowUiARMoAq9FowUiARMYAq9FowUiARMIAq9FowUiARL4Aq9FowUiARLoAq9FowESwSgCr0WjBSEBErgwf0WjBSEBEqgwf0WjBSEBEpgwf0WjBSEBEogwf0WgkB/DBSEBEngwf0WjBSEBEmgwf0WjBSEBElgwf0WjARI4MH9FowUhARInj0WzBSEBEhePRbMFIQESB49FswUhARH3j0WzBSEBEeePRbMFIQER149FswUhARHHj0WzARGnj0WzBSEBEZgCr0WzBSEBEYgCr0WzBSEBEXgCr0WzBSEAoB/hEWgCr0WzBSEBEVgCr0WzBSEBEUgCr0WzBSEBETgCr0WzAREYAq9FswVj8BERCDB/RbMFY/UA+DB/RbMFY/UA6DB/RbMFY/UA2DB/RbMFY/UAyDB/RbMFY/UAuDB/RbMFY/UAqDB/RbMAERPwEIgwf0WzBWPlAHgQEL9FkwVj4LAfhQBoEBC/RZMFY+UAWBAQv0WTBWPlAEgQEL9FkwVj5QA4EBC/RZMFY+WIEBC/RZMFY+ARFAgQEL9FkwARE+ARFAgQEL9FkwETwRPxE8ETsRPhE7EToRPRE6ETkRPBE5ETgROxE4ETcROhE3ETYRORE2ETUROBE1ETQRNxE0DAH8ETMRNhEzETIRNREyETERNBExETARMxEwES8RMhEvES4RMREuES0RMBEtESwRLxEsESsRLhErESoRLREqESkRLBEpESgRKxEoEScRKhEnESYRKREmESURKBElESQRJxEkESMRJhEjESIRJREiESERJBEhESARIxEgER8RIhEfDQH6ER4RIREeER0RIBEdERwRHxEcERsRHhEbERoRHREaERkRHBEZERgRGxEYERcRGhEXERYRGREWERURGBEVERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwQixB6EGkQWBBHEDZFQBNdAgEgEBECASAUFQIBSGJjAgFYEhMC8bDIG8l2zwRPxFTET8RPhFSET4RPRFRET0RPBFQETwROxFPETsROhFOEToRORFNETkROBFMETgRNxFLETcRNhFKETYRNRFJETURNBFIETQRMxFHETMRMhFGETIRMRFFETERMBFEETARLxFDES8RLhFCES4RLRFBES2CziwIBIK6vA/m4HA2zzbPFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0CLMWsQP5uJ69s82zxXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAizsLEB9lY/blY/blY/blY/blY/blY/blY/blY/blY/blY/blY/blY/blY/blY/blY/blY/blY/blY/blY/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A0FAIG6UMFn0W5RBM/Qn4jAegQELAVYQAREZIG6UMFn0WZjIAfoDQTP0SeIwHIEBC1LyESA1AfwgbpQwWfRZmMgB+gdBM/RJ4jAagQELUuIRJyBulDBZ9FmYyAH6AkEz9EniMBiBAQtS0hEuIG6UMFn0WZjIAfoGQTP0SeIwFoEBC1LCETVxIW6UW1n0WZjIAc8AQTP0SeIwFIEBC1KyETwgbpQwWfRZlEEz9CPiMAERQQGBAQs2AfRSohFCIG6UMFn0WZjIAc8WQTP0SeIwgQELAiBukjBtjicgbvLQgG8lyFVAUEWBAQHPABLKAAHPFoEBAc8AAciBAQHPAMkBzMniAxFCAxkgbpQwWfRZlEEz9CPiMBE8ET8RPBE7ET4ROxE6ET0ROhE5ETwRORE4ETsRODcB+BE3EToRNxE4ETkROBE1ETgRNRE0ETcRNBEzETYRMxEyETURMhExETQRMREwETMRMBEvETIRLxEvETERLxEtETARLREsES8RLBErES4RKxEqES0RKhEpESwRKREoESsRKBEnESoRJwERKQERJREoESURJBEnESQRIxEmESM4AfwRIhElESIRIREkESERIBEjESARHxEiER8CESECER0RIBEdERwRHxEcERsRHhEbERoRHREaERkRHBEZERgRGxEYERcRGhEXAxEZAxEVERgRFREUERcRFBETERYRExESERUREhERERQREREQERMREA8REg8EEREEDREQDRDPEL45ASQQrRCcEIsQehBZEFYQRRA0QTBdAvxbET/bPFcQEU2BAQFT9yBuljBZ9GRvoZzIAfoDydBBM/Qsb6Hik/oBMJIwbeIwEUyBAQFT9iBuljBZ9GRvoZzIAfoHydBBM/Qsb6Hik/oFMJIwbeIwEUuBAQFT9SBuljBZ9GRvoZzIAfoCydBBM/Qsb6Hik/oAMJIwbeIwEUo9PgH8MFc/bYEBAXAhQTP0DG+hlAHXADCSW23iIG7y0IAwET0RPxE9ETwRPhE8ETsRPRE7EToRPBE6ETkROxE5ETgROhE4ETcRORE3ETYROBE2ETURNxE1ETQRNhE0ETMRNREzETIRNBEyETERMxExETARMhEwES8RMREvES4RMBEuWQH8ET0RPxE9ETwRPhE8ETsRPRE7EToRPBE6ETkROxE5ETgROhE4ETcRORE3ETYROBE2ETURNxE1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MBaBAQtSwhE1cSFulzFBM/Rib6GdAcgizwDJ0FBD9CpvoeKUWNcAMJMwMW3iMBSBAQtSshE8IG6WMFn0Y2+hlkEz9CtvoeKSMG3fMAERQQGBAQtSohFCVQH4IG6WMFn0Ym+hnMgBzxbJ0EEz9CpvoeKSMG3fMIEBCwIgbpIwbY4nIG7y0IBvJchVQFBFgQEBzwASygABzxaBAQHPAAHIgQEBzwDJAczJ4gMRQgMZIG6WMFn0Y2+hlkEz9CtvoeKSMG3fMBE8ET8RPBE7ET4ROxE6ET0ROlYB+BE5ETwRORE4ETsROBE3EToRNxE4ETkROBE1ETgRNRE0ETcRNBEzETYRMxEyETURMhExETQRMREwETMRMBEvETIRLxEvETERLxEtETARLREsES8RLBErES4RKxEqES0RKhEpESwRKREoESsRKBEnESoRJwERKQERJREoESVXAfwRJBEnESQRIxEmESMRIhElESIRIREkESERIBEjESARHxEiER8CESECER0RIBEdERwRHxEcERsRHhEbERoRHREaERkRHBEZERgRGxEYERcRGhEXAxEZAxEVERgRFREUERcRFBETERYRExESERUREhERERQREREQERMREA8REg9YATwEEREEDREQDRDPEL4QrRCcEIsQehBZEFYQRRA0QTBdAfwRLREvES0RLBEuESwRKxEtESsRKhEsESoRKRErESkRKBEqESgRJxEpEScRJhEoESYRJREnESURJBEmESQRIxElESMRIhEkESIRIREjESERIBEiESARHxEhER8RHhEgER4RHREfER0RHBEeERwRGxEdERsRGhEcERoRGREbERlaAYQRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRxdAfwRKBEqESgRJxEpEScRJhEoESYRJREnESURJBEmESQRIxElESMRIhEkESIRIREjESERIBEiESARHxEhER8RHhEgER4RHREfER0RHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERRcAUgRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRxdAdzIfwHKABFAET8RPhE9ETwROxE6ETkROBE3ETYRNRE0ETMRMhExETARLxEuES0RLBErESoRKREoEScRJhElESQRIxEiESERIBEfER4RHREcERsRGhEZERgRFxEWERURFBETERIREREQVeDbPMntVF4B8gERPwERQPQAET3I9AABETwB9AABEToB9AAROMj0AAERNwH0AAERNQH0ABEzyPQAAREyAfQAAREwAfQAES7I9AABES0B9AABESsB9AARKcj0AAERKAH0AAERJgH0ABEkyPQAAREjAfQAAREhAfQAER/I9AABER4B9ABfAfwBERwB9AARGsj0AAERGQH0AAERFwH0ABEVyPQAAREUAfQAARESAfQAERDI9AAf9AAd9AALyPQAGvQAGPQABsj0ABX0ABP0AAHI9AAS9AAS9AADyPQAFPQAFfQABcj0ABf0ABf0AAjI9AAZ9AAa9AAKyPQAHPQAHPQADcj0AB5gAf70AB/0AA/I9AABEREB9AABEREB9AAREsj0AAEREwH0AAERFAH0ABEUyPQAAREWAfQAAREWAfQAyQEREszJUA3MyVAHzMlYzMkBERHMyVAHzMlQCMzJUAXMyVAEzMlQC8zJUAXMyQHMyVADzMlQBMzJUATMyVAGzMkBzMlQA8zJYQAQWMzJWMzJAcwCAnFkZQItsFz2zzbPFcQXw9XEF8PVxBfD1cQXw+CzigLvovW8l2zwRPxFTET8RPhFSET4RPRFRET0RPBFQETwROxFPETsROhFOEToRORFNETkROBFMETgRNxFLETcRNhFKETYRNRFJETURNBFIETQRMxFHETMRMhFGETIRMRFFETERMBFEETARLxFDES8RLhFCES4RLRFBES2s2YC96GjbPBE/EUcRPxE+EUYRPhE9EUURPRE8EUQRPBE7EUMROxE6EUIROhE5EUERORE4EUAROBE3ET8RNxE2ET4RNhE1ET0RNRE0ETwRNBEzETsRMxEyEToRMhExETkRMREwETgRMBEvETcRLxEuETYRLhEtETURLREsETQRLKzfwH8ESwRQBEsESsRPxErESoRPhEqESkRPREpESgRPBEoEScROxEnESYROhEmESURORElESQROBEkESMRNxEjESIRNhEiESERNREhESARNBEgER8RMxEfER4RMhEeER0RMREdERwRMBEcERsRLxEbERoRLhEaERkRLREZERgRLBEYZwH8ERcRKxEXERYR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WfQOb6ExVkN4ViRZ9A5voTFWQ3hWJVn0Dm+hMVZDeFYmWfQOb6ExVkN4VidZ9A5voTF4VkQCEShZ9A5voTFWQoAqVidZ9A5voTFWQoAqVihZ9A5voTFWQoAqVimFAf5Z9A5voTFWQoAqVipZ9A5voTFWQoAqVitZ9A5voTFWQoAqVixZ9A5voTFWQoAqVi1Z9A5voTGAKlZDAhEuWfQOb6ExVkGDB1YtWfQOb6ExVkGDB1YuWfQOb6ExVkGDB1YvWfQOb6ExVkGDB1YwWfQOb6ExVkGDB1YxWfQOb6ExhgH0VkGDB1YyWfQOb6ExVkGDB1YzWfQOb6ExgwdWQgIRNFn0Dm+hMVZAgQELVjNZ9ApvoTFWQIEBC1Y0WfQKb6ExVkCBAQtWNVn0Cm+hMVZAgQELVjZZ9ApvoTFWQIEBC1Y3WfQKb6ExVkCBAQtWOFn0Cm+hMVZAgQELVjmHAfRZ9ApvoTGBAQtWQQIROln0Cm+hMRE3ET8RNxE2ET4RNhE1ET0RNRE0ETwRNBEzETsRMxEyEToRMhE3ETkRNxExETgRMREwETcRMBEvETYRLxEuETURLhEtETQRLREsETMRLBErETIRKxEvETERLxEqETARKhEpES8RKYgB/BEoES4RKBEnES0RJxEmESwRJhElESsRJREkESoRJBEoESkRKBEjESgRIxEiEScRIhEhESYRIREgESURIBEfESQRHxEeESMRHhEdESIRHREdESERHREcESARHBEbER8RGxEaER4RGhEZER0RGREYERwRGBEXERsRFxEWERoRFokAkBEVERgRFREUERcRFBETERYRExESERUREhERERQREREQERMREA8REg8PEREPDhEQDhDfEM4QvRCsEJsQihB4EGcQVhBFEDRBMAA0bYEBAXAhQTP0DG+hlAHXADCSW23iIG7y0IAB/BEsEUARLBErET8RKxEqET4RKhEpET0RKREoETwRKBEnETsRJxEmEToRJhElETkRJREkETgRJBEjETcRIxEiETYRIhEhETURIREgETQRIBEfETMRHxEeETIRHhEdETERHREcETARHBEbES8RGxEaES4RGhEZES0RGREYESwRGIwB/BEXESsRFxEWESoRFhEVESkRFREUESgRFBETEScRExESESYREhERESUREREQESQREA8RIw8OESIODREhDQwRIAwL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ESkRMREpESgRMBEoEScRLxEnESYRLhEmESURLRElESQRLBEkESMRKxEjESIRKhEiESERKREhESARKBEgER8RJxEfER4RJhEeER0RJREdERwRJBEcERsRIxEbERoRIhEaERkRIREZERgRIBEYERcRHxEXugL42zxXQBE+ET8RPhE9ET4RPRE8ET0RPBE7ETwROxE6ETsROhE5EToRORE4ETkROBE3ETgRNxE2ETcRNhE1ETYRNRE0ETURNBEzETQRMxEyETMRMhExETIRMREwETERMBEvETARLxEuES8RLhEtES4RLREsES0RLBErESwRK7a3AfT0BNQB0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0LgB/BEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFrkAmPQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BDARPxFAET8AVBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDgL8ERYRHhEWERURHREVERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RFg4NERUNDBEUDAsREwsKERIKCRERCQgREAhVd9s8V0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAu7wB7lZHgQEBKVn0DG+hk/oBMJIwbeJWR4EBASpZ9AxvoZP6BTCSMG3iVkeBAQErWfQMb6GT+gAwkjBt4lZHgQEBLFn0DG+hk/oEMJIwbeJWR4EBAS1xQTP0DG+hlAHXADCSW23iVkeBAQEuWfQNb6GSMG3fVkeBAQEvvQCgV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0AB+Fn0DG+hkjBt34EBAVZIAhEQWfQNb6GSMG3fIG6SMG2OINCBAQHXANIA+kCBAQHXANQB0IEBAdcAMBUUQzBsFW8F4lZGeC9Z9AxvoZP6ATCSMG3iVkZ4VhBZ9AxvoZP6BTCSMG3iVkZ4VhFZ9AxvoZP6ADCSMG3iVkZ4VhK+AfZZ9AxvoZP6BDCSMG3iVkZ4VhNxQTP0DG+hlAHXADCSW23iVkZ4VhRZ9A1voZIwbd9WRnhWFVn0DG+hkjBt33hWRwIRFln0DW+hkjBt3yBukjBtjiDQgQEB1wDSAPpAgQEB1wDUAdCBAQHXADAVFEMwbBVvBeJWRYAqVhW/Af5Z9AxvoZP6ATCSMG3iVkWAKlYWWfQMb6GT+gUwkjBt4lZFgCpWF1n0DG+hk/oAMJIwbeJWRYAqVhhZ9AxvoZP6BDCSMG3iVkWAKlYZcUEz9AxvoZQB1wAwkltt4lZFgCpWGln0DW+hkjBt31ZFgCpWG1n0DG+hkjBt34AqVkYCwAH+ERxZ9A1voZIwbd8gbpIwbY4g0IEBAdcA0gD6QIEBAdcA1AHQgQEB1wAwFRRDMGwVbwXiVkSDB1YbWfQMb6GT+gEwkjBt4lZEgwdWHFn0DG+hk/oFMJIwbeJWRIMHVh1Z9AxvoZP6ADCSMG3iVkSDB1YeWfQMb6GT+gQwkjBt4sEB/FZEgwdWH3FBM/QMb6GUAdcAMJJbbeJWRIMHViBZ9A1voZIwbd9WRIMHViFZ9AxvoZIwbd+DB1ZFAhEiWfQNb6GSMG3fIG6SMG2OINCBAQHXANIA+kCBAQHXANQB0IEBAdcAMBUUQzBsFW8F4lZDeFYhWfQOb6GT+gEwkjBt4sIB7FZDeFYiWfQOb6GT+gUwkjBt4lZDeFYjWfQOb6GT+gAwkjBt4lZDeFYkWfQOb6GT+gQwkjBt4lZDeFYlcUEz9A5voZQB1wAwkltt4lZDeFYmWfQPb6GSMG3fVkN4VidZ9A5voZIwbd94VkQCEShZ9A9voZIwbd/DAfYgbpIwbY4g0IEBAdcA0gD6QIEBAdcA1AHQgQEB1wAwFRRDMGwVbwXiVkKAKlYnWfQOb6GT+gEwkjBt4lZCgCpWKFn0Dm+hk/oFMJIwbeJWQoAqVilZ9A5voZP6ADCSMG3iVkKAKlYqWfQOb6GT+gQwkjBt4lZCgCpWK3HEAfxBM/QOb6GUAdcAMJJbbeJWQoAqVixZ9A9voZIwbd9WQoAqVi1Z9A5voZIwbd+AKlZDAhEuWfQPb6GSMG3fIG6SMG2OINCBAQHXANIA+kCBAQHXANQB0IEBAdcAMBUUQzBsFW8F4lZBgwdWLVn0Dm+hk/oBMJIwbeJWQYMHVi7FAe5Z9A5voZP6BTCSMG3iVkGDB1YvWfQOb6GT+gAwkjBt4lZBgwdWMFn0Dm+hk/oEMJIwbeJWQYMHVjFxQTP0Dm+hlAHXADCSW23iVkGDB1YyWfQPb6GSMG3fVkGDB1YzWfQOb6GSMG3fgwdWQgIRNFn0D2+hkjBt38YB/iBukjBtjiDQgQEB1wDSAPpAgQEB1wDUAdCBAQHXADAVFEMwbBVvBeJWQIEBC1YzWfQKb6GT+gEwkjBt4lZAgQELVjRZ9ApvoZP6BTCSMG3iVkCBAQtWNVn0Cm+hk/oAMJIwbeJWQIEBC1Y2WfQKb6GT+gQwkjBt4lZAgQELVjfHAfZxQTP0Cm+hlAHXADCSW23iVkCBAQtWOFn0C2+hkjBt31ZAgQELVjlZ9ApvoZIwbd+BAQtWQQIROln0C2+hkjBt3yBukjBtjiDQgQEB1wDSAPpAgQEB1wDUAdCBAQHXADAVFEMwbBVvBeIRNxE/ETcRNhE+ETYRNRE9ETXIAfwRNBE8ETQRMxE7ETMRMhE6ETIRNxE5ETcRMRE4ETERMBE3ETARLxE2ES8RLhE1ES4RLRE0ES0RLBEzESwRKxEyESsRLxExES8RKhEwESoRKREvESkRKBEuESgRJxEtEScRJhEsESYRJRErESURJBEqESQRKBEpESgRIxEoESPJAfgRIhEnESIRIREmESERIBElESARHxEkER8RHhEjER4RHREiER0RHREhER0RHBEgERwRGxEfERsRGhEeERoRGREdERkRGBEcERgRFxEbERcRFhEaERYRFREYERURFBEXERQRExEWERMREhEVERIREREUEREREBETERAPERIPygBADxERDw4REA4Q3xDOEL0QrBCbEIoQeBBnEFYQRRA0QTA=');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initMapTestContract_init_args({ $$type: 'MapTestContract_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const MapTestContract_errors: { [key: number]: { message: string } } = {
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

const MapTestContract_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SomeStruct","header":null,"fields":[{"name":"int","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"a","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"b","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GetAllMapsResult","header":null,"fields":[{"name":"int_varint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int_varint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int_varuint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int_varuint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int_bool","type":{"kind":"simple","type":"bool","optional":true}},{"name":"int_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int_address","type":{"kind":"simple","type":"address","optional":true}},{"name":"int_struct","type":{"kind":"simple","type":"SomeStruct","optional":true}},{"name":"int8_varint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int8_varint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int8_varuint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int8_varuint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int8_bool","type":{"kind":"simple","type":"bool","optional":true}},{"name":"int8_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int8_address","type":{"kind":"simple","type":"address","optional":true}},{"name":"int8_struct","type":{"kind":"simple","type":"SomeStruct","optional":true}},{"name":"int42_varint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int42_varint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int42_varuint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int42_varuint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int42_bool","type":{"kind":"simple","type":"bool","optional":true}},{"name":"int42_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int42_address","type":{"kind":"simple","type":"address","optional":true}},{"name":"int42_struct","type":{"kind":"simple","type":"SomeStruct","optional":true}},{"name":"int256_varint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int256_varint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int256_varuint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int256_varuint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int256_bool","type":{"kind":"simple","type":"bool","optional":true}},{"name":"int256_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int256_address","type":{"kind":"simple","type":"address","optional":true}},{"name":"int256_struct","type":{"kind":"simple","type":"SomeStruct","optional":true}},{"name":"uint8_varint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint8_varint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint8_varuint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint8_varuint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint8_bool","type":{"kind":"simple","type":"bool","optional":true}},{"name":"uint8_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint8_address","type":{"kind":"simple","type":"address","optional":true}},{"name":"uint8_struct","type":{"kind":"simple","type":"SomeStruct","optional":true}},{"name":"uint42_varint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint42_varint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint42_varuint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint42_varuint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint42_bool","type":{"kind":"simple","type":"bool","optional":true}},{"name":"uint42_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint42_address","type":{"kind":"simple","type":"address","optional":true}},{"name":"uint42_struct","type":{"kind":"simple","type":"SomeStruct","optional":true}},{"name":"uint256_varint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint256_varint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint256_varuint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint256_varuint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint256_bool","type":{"kind":"simple","type":"bool","optional":true}},{"name":"uint256_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint256_address","type":{"kind":"simple","type":"address","optional":true}},{"name":"uint256_struct","type":{"kind":"simple","type":"SomeStruct","optional":true}},{"name":"address_varint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"address_varint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"address_varuint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"address_varuint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"address_bool","type":{"kind":"simple","type":"bool","optional":true}},{"name":"address_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"address_address","type":{"kind":"simple","type":"address","optional":true}},{"name":"address_struct","type":{"kind":"simple","type":"SomeStruct","optional":true}}]},
    {"name":"ReplaceAllMapsResult","header":null,"fields":[{"name":"int_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int_struct","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_struct","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_struct","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_struct","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_struct","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_struct","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_struct","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_struct","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"ReplaceGetAllMapsResult","header":null,"fields":[{"name":"int_varint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int_varint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int_varuint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int_varuint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int_bool","type":{"kind":"simple","type":"bool","optional":true}},{"name":"int_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int_address","type":{"kind":"simple","type":"address","optional":true}},{"name":"int_struct","type":{"kind":"simple","type":"SomeStruct","optional":true}},{"name":"int8_varint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int8_varint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int8_varuint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int8_varuint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int8_bool","type":{"kind":"simple","type":"bool","optional":true}},{"name":"int8_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int8_address","type":{"kind":"simple","type":"address","optional":true}},{"name":"int8_struct","type":{"kind":"simple","type":"SomeStruct","optional":true}},{"name":"int42_varint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int42_varint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int42_varuint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int42_varuint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int42_bool","type":{"kind":"simple","type":"bool","optional":true}},{"name":"int42_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int42_address","type":{"kind":"simple","type":"address","optional":true}},{"name":"int42_struct","type":{"kind":"simple","type":"SomeStruct","optional":true}},{"name":"int256_varint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int256_varint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int256_varuint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int256_varuint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"int256_bool","type":{"kind":"simple","type":"bool","optional":true}},{"name":"int256_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int256_address","type":{"kind":"simple","type":"address","optional":true}},{"name":"int256_struct","type":{"kind":"simple","type":"SomeStruct","optional":true}},{"name":"uint8_varint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint8_varint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint8_varuint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint8_varuint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint8_bool","type":{"kind":"simple","type":"bool","optional":true}},{"name":"uint8_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint8_address","type":{"kind":"simple","type":"address","optional":true}},{"name":"uint8_struct","type":{"kind":"simple","type":"SomeStruct","optional":true}},{"name":"uint42_varint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint42_varint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint42_varuint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint42_varuint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint42_bool","type":{"kind":"simple","type":"bool","optional":true}},{"name":"uint42_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint42_address","type":{"kind":"simple","type":"address","optional":true}},{"name":"uint42_struct","type":{"kind":"simple","type":"SomeStruct","optional":true}},{"name":"uint256_varint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint256_varint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint256_varuint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint256_varuint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"uint256_bool","type":{"kind":"simple","type":"bool","optional":true}},{"name":"uint256_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint256_address","type":{"kind":"simple","type":"address","optional":true}},{"name":"uint256_struct","type":{"kind":"simple","type":"SomeStruct","optional":true}},{"name":"address_varint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"address_varint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"address_varuint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"address_varuint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"address_bool","type":{"kind":"simple","type":"bool","optional":true}},{"name":"address_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"address_address","type":{"kind":"simple","type":"address","optional":true}},{"name":"address_struct","type":{"kind":"simple","type":"SomeStruct","optional":true}}]},
    {"name":"ExistsAllMapsResult","header":null,"fields":[{"name":"int_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int_struct","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_struct","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_struct","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_struct","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_struct","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_struct","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_struct","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_struct","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"IsEmptyAllMapsResult","header":null,"fields":[{"name":"int_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int_struct","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int8_struct","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int42_struct","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"int256_struct","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint8_struct","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint42_struct","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"uint256_struct","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_varint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_varint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_varuint16","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_varuint32","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_bool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_cell","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_address","type":{"kind":"simple","type":"bool","optional":false}},{"name":"address_struct","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"AsCellAllMapsResult","header":null,"fields":[{"name":"int_varint16","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int_varint32","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int_varuint16","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int_varuint32","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int_bool","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int_address","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int_struct","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int8_varint16","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int8_varint32","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int8_varuint16","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int8_varuint32","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int8_bool","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int8_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int8_address","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int8_struct","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int42_varint16","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int42_varint32","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int42_varuint16","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int42_varuint32","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int42_bool","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int42_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int42_address","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int42_struct","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int256_varint16","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int256_varint32","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int256_varuint16","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int256_varuint32","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int256_bool","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int256_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int256_address","type":{"kind":"simple","type":"cell","optional":true}},{"name":"int256_struct","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint8_varint16","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint8_varint32","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint8_varuint16","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint8_varuint32","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint8_bool","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint8_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint8_address","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint8_struct","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint42_varint16","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint42_varint32","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint42_varuint16","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint42_varuint32","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint42_bool","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint42_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint42_address","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint42_struct","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint256_varint16","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint256_varint32","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint256_varuint16","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint256_varuint32","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint256_bool","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint256_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint256_address","type":{"kind":"simple","type":"cell","optional":true}},{"name":"uint256_struct","type":{"kind":"simple","type":"cell","optional":true}},{"name":"address_varint16","type":{"kind":"simple","type":"cell","optional":true}},{"name":"address_varint32","type":{"kind":"simple","type":"cell","optional":true}},{"name":"address_varuint16","type":{"kind":"simple","type":"cell","optional":true}},{"name":"address_varuint32","type":{"kind":"simple","type":"cell","optional":true}},{"name":"address_bool","type":{"kind":"simple","type":"cell","optional":true}},{"name":"address_cell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"address_address","type":{"kind":"simple","type":"cell","optional":true}},{"name":"address_struct","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"SetAllMaps","header":88242610,"fields":[{"name":"keyInt","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt42","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt256","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint42","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint256","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"valueVarint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"valueVarint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"valueVaruint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"valueVaruint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"valueBool","type":{"kind":"simple","type":"bool","optional":true}},{"name":"valueCell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"valueAddress","type":{"kind":"simple","type":"address","optional":true}},{"name":"valueStruct","type":{"kind":"simple","type":"SomeStruct","optional":true}}]},
    {"name":"DelAllMaps","header":1261158015,"fields":[{"name":"keyInt","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt42","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt256","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint42","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint256","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ReplaceAllMaps","header":3909681767,"fields":[{"name":"keyInt","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt42","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt256","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint42","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint256","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"valueVarint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"valueVarint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"valueVaruint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"valueVaruint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"valueBool","type":{"kind":"simple","type":"bool","optional":true}},{"name":"valueCell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"valueAddress","type":{"kind":"simple","type":"address","optional":true}},{"name":"valueStruct","type":{"kind":"simple","type":"SomeStruct","optional":true}}]},
    {"name":"ReplaceGetAllMaps","header":1054468049,"fields":[{"name":"keyInt","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt42","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt256","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint42","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint256","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"valueVarint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"valueVarint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"valueVaruint16","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"valueVaruint32","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"valueBool","type":{"kind":"simple","type":"bool","optional":true}},{"name":"valueCell","type":{"kind":"simple","type":"cell","optional":true}},{"name":"valueAddress","type":{"kind":"simple","type":"address","optional":true}},{"name":"valueStruct","type":{"kind":"simple","type":"SomeStruct","optional":true}}]},
    {"name":"CheckNullReference","header":2978152160,"fields":[]},
    {"name":"MapTestContract$Data","header":null,"fields":[{"name":"int_varint16","type":{"kind":"dict","key":"int","value":"int","valueFormat":"varint16"}},{"name":"int_varint32","type":{"kind":"dict","key":"int","value":"int","valueFormat":"varint32"}},{"name":"int_varuint16","type":{"kind":"dict","key":"int","value":"uint","valueFormat":"varuint16"}},{"name":"int_varuint32","type":{"kind":"dict","key":"int","value":"uint","valueFormat":"varuint32"}},{"name":"int_bool","type":{"kind":"dict","key":"int","value":"bool"}},{"name":"int_cell","type":{"kind":"dict","key":"int","value":"cell","valueFormat":"ref"}},{"name":"int_address","type":{"kind":"dict","key":"int","value":"address"}},{"name":"int_struct","type":{"kind":"dict","key":"int","value":"SomeStruct","valueFormat":"ref"}},{"name":"int8_varint16","type":{"kind":"dict","key":"int","keyFormat":8,"value":"int","valueFormat":"varint16"}},{"name":"int8_varint32","type":{"kind":"dict","key":"int","keyFormat":8,"value":"int","valueFormat":"varint32"}},{"name":"int8_varuint16","type":{"kind":"dict","key":"int","keyFormat":8,"value":"uint","valueFormat":"varuint16"}},{"name":"int8_varuint32","type":{"kind":"dict","key":"int","keyFormat":8,"value":"uint","valueFormat":"varuint32"}},{"name":"int8_bool","type":{"kind":"dict","key":"int","keyFormat":8,"value":"bool"}},{"name":"int8_cell","type":{"kind":"dict","key":"int","keyFormat":8,"value":"cell","valueFormat":"ref"}},{"name":"int8_address","type":{"kind":"dict","key":"int","keyFormat":8,"value":"address"}},{"name":"int8_struct","type":{"kind":"dict","key":"int","keyFormat":8,"value":"SomeStruct","valueFormat":"ref"}},{"name":"int42_varint16","type":{"kind":"dict","key":"int","keyFormat":42,"value":"int","valueFormat":"varint16"}},{"name":"int42_varint32","type":{"kind":"dict","key":"int","keyFormat":42,"value":"int","valueFormat":"varint32"}},{"name":"int42_varuint16","type":{"kind":"dict","key":"int","keyFormat":42,"value":"uint","valueFormat":"varuint16"}},{"name":"int42_varuint32","type":{"kind":"dict","key":"int","keyFormat":42,"value":"uint","valueFormat":"varuint32"}},{"name":"int42_bool","type":{"kind":"dict","key":"int","keyFormat":42,"value":"bool"}},{"name":"int42_cell","type":{"kind":"dict","key":"int","keyFormat":42,"value":"cell","valueFormat":"ref"}},{"name":"int42_address","type":{"kind":"dict","key":"int","keyFormat":42,"value":"address"}},{"name":"int42_struct","type":{"kind":"dict","key":"int","keyFormat":42,"value":"SomeStruct","valueFormat":"ref"}},{"name":"int256_varint16","type":{"kind":"dict","key":"int","keyFormat":256,"value":"int","valueFormat":"varint16"}},{"name":"int256_varint32","type":{"kind":"dict","key":"int","keyFormat":256,"value":"int","valueFormat":"varint32"}},{"name":"int256_varuint16","type":{"kind":"dict","key":"int","keyFormat":256,"value":"uint","valueFormat":"varuint16"}},{"name":"int256_varuint32","type":{"kind":"dict","key":"int","keyFormat":256,"value":"uint","valueFormat":"varuint32"}},{"name":"int256_bool","type":{"kind":"dict","key":"int","keyFormat":256,"value":"bool"}},{"name":"int256_cell","type":{"kind":"dict","key":"int","keyFormat":256,"value":"cell","valueFormat":"ref"}},{"name":"int256_address","type":{"kind":"dict","key":"int","keyFormat":256,"value":"address"}},{"name":"int256_struct","type":{"kind":"dict","key":"int","keyFormat":256,"value":"SomeStruct","valueFormat":"ref"}},{"name":"uint8_varint16","type":{"kind":"dict","key":"uint","keyFormat":8,"value":"int","valueFormat":"varint16"}},{"name":"uint8_varint32","type":{"kind":"dict","key":"uint","keyFormat":8,"value":"int","valueFormat":"varint32"}},{"name":"uint8_varuint16","type":{"kind":"dict","key":"uint","keyFormat":8,"value":"uint","valueFormat":"varuint16"}},{"name":"uint8_varuint32","type":{"kind":"dict","key":"uint","keyFormat":8,"value":"uint","valueFormat":"varuint32"}},{"name":"uint8_bool","type":{"kind":"dict","key":"uint","keyFormat":8,"value":"bool"}},{"name":"uint8_cell","type":{"kind":"dict","key":"uint","keyFormat":8,"value":"cell","valueFormat":"ref"}},{"name":"uint8_address","type":{"kind":"dict","key":"uint","keyFormat":8,"value":"address"}},{"name":"uint8_struct","type":{"kind":"dict","key":"uint","keyFormat":8,"value":"SomeStruct","valueFormat":"ref"}},{"name":"uint42_varint16","type":{"kind":"dict","key":"uint","keyFormat":42,"value":"int","valueFormat":"varint16"}},{"name":"uint42_varint32","type":{"kind":"dict","key":"uint","keyFormat":42,"value":"int","valueFormat":"varint32"}},{"name":"uint42_varuint16","type":{"kind":"dict","key":"uint","keyFormat":42,"value":"uint","valueFormat":"varuint16"}},{"name":"uint42_varuint32","type":{"kind":"dict","key":"uint","keyFormat":42,"value":"uint","valueFormat":"varuint32"}},{"name":"uint42_bool","type":{"kind":"dict","key":"uint","keyFormat":42,"value":"bool"}},{"name":"uint42_cell","type":{"kind":"dict","key":"uint","keyFormat":42,"value":"cell","valueFormat":"ref"}},{"name":"uint42_address","type":{"kind":"dict","key":"uint","keyFormat":42,"value":"address"}},{"name":"uint42_struct","type":{"kind":"dict","key":"uint","keyFormat":42,"value":"SomeStruct","valueFormat":"ref"}},{"name":"uint256_varint16","type":{"kind":"dict","key":"uint","keyFormat":256,"value":"int","valueFormat":"varint16"}},{"name":"uint256_varint32","type":{"kind":"dict","key":"uint","keyFormat":256,"value":"int","valueFormat":"varint32"}},{"name":"uint256_varuint16","type":{"kind":"dict","key":"uint","keyFormat":256,"value":"uint","valueFormat":"varuint16"}},{"name":"uint256_varuint32","type":{"kind":"dict","key":"uint","keyFormat":256,"value":"uint","valueFormat":"varuint32"}},{"name":"uint256_bool","type":{"kind":"dict","key":"uint","keyFormat":256,"value":"bool"}},{"name":"uint256_cell","type":{"kind":"dict","key":"uint","keyFormat":256,"value":"cell","valueFormat":"ref"}},{"name":"uint256_address","type":{"kind":"dict","key":"uint","keyFormat":256,"value":"address"}},{"name":"uint256_struct","type":{"kind":"dict","key":"uint","keyFormat":256,"value":"SomeStruct","valueFormat":"ref"}},{"name":"address_varint16","type":{"kind":"dict","key":"address","value":"int","valueFormat":"varint16"}},{"name":"address_varint32","type":{"kind":"dict","key":"address","value":"int","valueFormat":"varint32"}},{"name":"address_varuint16","type":{"kind":"dict","key":"address","value":"uint","valueFormat":"varuint16"}},{"name":"address_varuint32","type":{"kind":"dict","key":"address","value":"uint","valueFormat":"varuint32"}},{"name":"address_bool","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"address_cell","type":{"kind":"dict","key":"address","value":"cell","valueFormat":"ref"}},{"name":"address_address","type":{"kind":"dict","key":"address","value":"address"}},{"name":"address_struct","type":{"kind":"dict","key":"address","value":"SomeStruct","valueFormat":"ref"}}]},
]

const MapTestContract_getters: ABIGetter[] = [
    {"name":"allMaps","methodId":94363,"arguments":[],"returnType":{"kind":"simple","type":"MapTestContract$Data","optional":false}},
    {"name":"getAllMaps","methodId":96520,"arguments":[{"name":"keyInt","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt42","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt256","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint42","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint256","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyAddress","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"GetAllMapsResult","optional":false}},
    {"name":"replaceAllMaps","methodId":66237,"arguments":[{"name":"keyInt","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt42","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt256","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint42","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint256","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"valueVarint16","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"valueVarint32","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"valueVaruint16","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"valueVaruint32","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"valueBool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"valueCell","type":{"kind":"simple","type":"cell","optional":false}},{"name":"valueAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"valueStruct","type":{"kind":"simple","type":"SomeStruct","optional":false}}],"returnType":{"kind":"simple","type":"ReplaceAllMapsResult","optional":false}},
    {"name":"replaceGetAllMaps","methodId":90912,"arguments":[{"name":"keyInt","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt42","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt256","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint42","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint256","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"valueVarint16","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"valueVarint32","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"valueVaruint16","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"valueVaruint32","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"valueBool","type":{"kind":"simple","type":"bool","optional":false}},{"name":"valueCell","type":{"kind":"simple","type":"cell","optional":false}},{"name":"valueAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"valueStruct","type":{"kind":"simple","type":"SomeStruct","optional":false}}],"returnType":{"kind":"simple","type":"ReplaceGetAllMapsResult","optional":false}},
    {"name":"existsAllMaps","methodId":66408,"arguments":[{"name":"keyInt","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt42","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyInt256","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint42","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyUint256","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"keyAddress","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"ExistsAllMapsResult","optional":false}},
    {"name":"isEmptyAllMaps","methodId":98752,"arguments":[],"returnType":{"kind":"simple","type":"IsEmptyAllMapsResult","optional":false}},
    {"name":"asCellAllMaps","methodId":117227,"arguments":[],"returnType":{"kind":"simple","type":"AsCellAllMapsResult","optional":false}},
    {"name":"checkNullReference","methodId":70003,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

export const MapTestContract_getterMapping: { [key: string]: string } = {
    'allMaps': 'getAllMaps',
    'getAllMaps': 'getGetAllMaps',
    'replaceAllMaps': 'getReplaceAllMaps',
    'replaceGetAllMaps': 'getReplaceGetAllMaps',
    'existsAllMaps': 'getExistsAllMaps',
    'isEmptyAllMaps': 'getIsEmptyAllMaps',
    'asCellAllMaps': 'getAsCellAllMaps',
    'checkNullReference': 'getCheckNullReference',
}

const MapTestContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetAllMaps"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DelAllMaps"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ReplaceAllMaps"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ReplaceGetAllMaps"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CheckNullReference"}},
]

export class MapTestContract implements Contract {
    
    static async init() {
        return await MapTestContract_init();
    }
    
    static async fromInit() {
        const __gen_init = await MapTestContract_init();
        const address = contractAddress(0, __gen_init);
        return new MapTestContract(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new MapTestContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  MapTestContract_types,
        getters: MapTestContract_getters,
        receivers: MapTestContract_receivers,
        errors: MapTestContract_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | SetAllMaps | DelAllMaps | ReplaceAllMaps | ReplaceGetAllMaps | CheckNullReference) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetAllMaps') {
            body = beginCell().store(storeSetAllMaps(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DelAllMaps') {
            body = beginCell().store(storeDelAllMaps(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ReplaceAllMaps') {
            body = beginCell().store(storeReplaceAllMaps(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ReplaceGetAllMaps') {
            body = beginCell().store(storeReplaceGetAllMaps(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CheckNullReference') {
            body = beginCell().store(storeCheckNullReference(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getAllMaps(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(94363 as any, builder.build())).stack;
        const result = loadGetterTupleMapTestContract$Data(source);
        return result;
    }
    
    async getGetAllMaps(provider: ContractProvider, keyInt: bigint, keyInt8: bigint, keyInt42: bigint, keyInt256: bigint, keyUint8: bigint, keyUint42: bigint, keyUint256: bigint, keyAddress: Address) {
        const builder = new TupleBuilder();
        builder.writeNumber(keyInt);
        builder.writeNumber(keyInt8);
        builder.writeNumber(keyInt42);
        builder.writeNumber(keyInt256);
        builder.writeNumber(keyUint8);
        builder.writeNumber(keyUint42);
        builder.writeNumber(keyUint256);
        builder.writeAddress(keyAddress);
        const source = (await provider.get(96520 as any, builder.build())).stack;
        const result = loadGetterTupleGetAllMapsResult(source);
        return result;
    }
    
    async getReplaceAllMaps(provider: ContractProvider, keyInt: bigint, keyInt8: bigint, keyInt42: bigint, keyInt256: bigint, keyUint8: bigint, keyUint42: bigint, keyUint256: bigint, keyAddress: Address, valueVarint16: bigint, valueVarint32: bigint, valueVaruint16: bigint, valueVaruint32: bigint, valueBool: boolean, valueCell: Cell, valueAddress: Address, valueStruct: SomeStruct) {
        const builder = new TupleBuilder();
        builder.writeNumber(keyInt);
        builder.writeNumber(keyInt8);
        builder.writeNumber(keyInt42);
        builder.writeNumber(keyInt256);
        builder.writeNumber(keyUint8);
        builder.writeNumber(keyUint42);
        builder.writeNumber(keyUint256);
        builder.writeAddress(keyAddress);
        builder.writeNumber(valueVarint16);
        builder.writeNumber(valueVarint32);
        builder.writeNumber(valueVaruint16);
        builder.writeNumber(valueVaruint32);
        builder.writeBoolean(valueBool);
        builder.writeCell(valueCell);
        builder.writeAddress(valueAddress);
        builder.writeTuple(storeTupleSomeStruct(valueStruct));
        const source = (await provider.get(66237 as any, builder.build())).stack;
        const result = loadGetterTupleReplaceAllMapsResult(source);
        return result;
    }
    
    async getReplaceGetAllMaps(provider: ContractProvider, keyInt: bigint, keyInt8: bigint, keyInt42: bigint, keyInt256: bigint, keyUint8: bigint, keyUint42: bigint, keyUint256: bigint, keyAddress: Address, valueVarint16: bigint, valueVarint32: bigint, valueVaruint16: bigint, valueVaruint32: bigint, valueBool: boolean, valueCell: Cell, valueAddress: Address, valueStruct: SomeStruct) {
        const builder = new TupleBuilder();
        builder.writeNumber(keyInt);
        builder.writeNumber(keyInt8);
        builder.writeNumber(keyInt42);
        builder.writeNumber(keyInt256);
        builder.writeNumber(keyUint8);
        builder.writeNumber(keyUint42);
        builder.writeNumber(keyUint256);
        builder.writeAddress(keyAddress);
        builder.writeNumber(valueVarint16);
        builder.writeNumber(valueVarint32);
        builder.writeNumber(valueVaruint16);
        builder.writeNumber(valueVaruint32);
        builder.writeBoolean(valueBool);
        builder.writeCell(valueCell);
        builder.writeAddress(valueAddress);
        builder.writeTuple(storeTupleSomeStruct(valueStruct));
        const source = (await provider.get(90912 as any, builder.build())).stack;
        const result = loadGetterTupleReplaceGetAllMapsResult(source);
        return result;
    }
    
    async getExistsAllMaps(provider: ContractProvider, keyInt: bigint, keyInt8: bigint, keyInt42: bigint, keyInt256: bigint, keyUint8: bigint, keyUint42: bigint, keyUint256: bigint, keyAddress: Address) {
        const builder = new TupleBuilder();
        builder.writeNumber(keyInt);
        builder.writeNumber(keyInt8);
        builder.writeNumber(keyInt42);
        builder.writeNumber(keyInt256);
        builder.writeNumber(keyUint8);
        builder.writeNumber(keyUint42);
        builder.writeNumber(keyUint256);
        builder.writeAddress(keyAddress);
        const source = (await provider.get(66408 as any, builder.build())).stack;
        const result = loadGetterTupleExistsAllMapsResult(source);
        return result;
    }
    
    async getIsEmptyAllMaps(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(98752 as any, builder.build())).stack;
        const result = loadGetterTupleIsEmptyAllMapsResult(source);
        return result;
    }
    
    async getAsCellAllMaps(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(117227 as any, builder.build())).stack;
        const result = loadGetterTupleAsCellAllMapsResult(source);
        return result;
    }
    
    async getCheckNullReference(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(70003 as any, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
}