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

export type EntryFirst = {
    $$type: "EntryFirst";
    amountToAdd: bigint;
    toAddress: Address;
};

export function storeEntryFirst(src: EntryFirst) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2757457064, 32);
        b_0.storeUint(src.amountToAdd, 32);
        b_0.storeAddress(src.toAddress);
    };
}

export function loadEntryFirst(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2757457064) {
        throw Error("Invalid prefix");
    }
    const _amountToAdd = sc_0.loadUintBig(32);
    const _toAddress = sc_0.loadAddress();
    return {
        $$type: "EntryFirst" as const,
        amountToAdd: _amountToAdd,
        toAddress: _toAddress,
    };
}

function loadTupleEntryFirst(source: TupleReader) {
    const _amountToAdd = source.readBigNumber();
    const _toAddress = source.readAddress();
    return {
        $$type: "EntryFirst" as const,
        amountToAdd: _amountToAdd,
        toAddress: _toAddress,
    };
}

function loadGetterTupleEntryFirst(source: TupleReader) {
    const _amountToAdd = source.readBigNumber();
    const _toAddress = source.readAddress();
    return {
        $$type: "EntryFirst" as const,
        amountToAdd: _amountToAdd,
        toAddress: _toAddress,
    };
}

function storeTupleEntryFirst(source: EntryFirst) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amountToAdd);
    builder.writeAddress(source.toAddress);
    return builder.build();
}

function dictValueParserEntryFirst(): DictionaryValue<EntryFirst> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEntryFirst(src)).endCell());
        },
        parse: (src) => {
            return loadEntryFirst(src.loadRef().beginParse());
        },
    };
}

export type EntrySecond = {
    $$type: "EntrySecond";
    amountToAdd: bigint;
    toAddress: Address;
};

export function storeEntrySecond(src: EntrySecond) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4282440720, 32);
        b_0.storeUint(src.amountToAdd, 32);
        b_0.storeAddress(src.toAddress);
    };
}

export function loadEntrySecond(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4282440720) {
        throw Error("Invalid prefix");
    }
    const _amountToAdd = sc_0.loadUintBig(32);
    const _toAddress = sc_0.loadAddress();
    return {
        $$type: "EntrySecond" as const,
        amountToAdd: _amountToAdd,
        toAddress: _toAddress,
    };
}

function loadTupleEntrySecond(source: TupleReader) {
    const _amountToAdd = source.readBigNumber();
    const _toAddress = source.readAddress();
    return {
        $$type: "EntrySecond" as const,
        amountToAdd: _amountToAdd,
        toAddress: _toAddress,
    };
}

function loadGetterTupleEntrySecond(source: TupleReader) {
    const _amountToAdd = source.readBigNumber();
    const _toAddress = source.readAddress();
    return {
        $$type: "EntrySecond" as const,
        amountToAdd: _amountToAdd,
        toAddress: _toAddress,
    };
}

function storeTupleEntrySecond(source: EntrySecond) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amountToAdd);
    builder.writeAddress(source.toAddress);
    return builder.build();
}

function dictValueParserEntrySecond(): DictionaryValue<EntrySecond> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeEntrySecond(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadEntrySecond(src.loadRef().beginParse());
        },
    };
}

export type First = {
    $$type: "First";
    amount: bigint;
    myCoins: bigint;
    myBool3: boolean;
    anAddress: Address;
};

export function storeFirst(src: First) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3200290616, 32);
        b_0.storeUint(src.amount, 32);
        b_0.storeCoins(src.myCoins);
        b_0.storeBit(src.myBool3);
        b_0.storeAddress(src.anAddress);
    };
}

export function loadFirst(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3200290616) {
        throw Error("Invalid prefix");
    }
    const _amount = sc_0.loadUintBig(32);
    const _myCoins = sc_0.loadCoins();
    const _myBool3 = sc_0.loadBit();
    const _anAddress = sc_0.loadAddress();
    return {
        $$type: "First" as const,
        amount: _amount,
        myCoins: _myCoins,
        myBool3: _myBool3,
        anAddress: _anAddress,
    };
}

function loadTupleFirst(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _myCoins = source.readBigNumber();
    const _myBool3 = source.readBoolean();
    const _anAddress = source.readAddress();
    return {
        $$type: "First" as const,
        amount: _amount,
        myCoins: _myCoins,
        myBool3: _myBool3,
        anAddress: _anAddress,
    };
}

function loadGetterTupleFirst(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _myCoins = source.readBigNumber();
    const _myBool3 = source.readBoolean();
    const _anAddress = source.readAddress();
    return {
        $$type: "First" as const,
        amount: _amount,
        myCoins: _myCoins,
        myBool3: _myBool3,
        anAddress: _anAddress,
    };
}

function storeTupleFirst(source: First) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeNumber(source.myCoins);
    builder.writeBoolean(source.myBool3);
    builder.writeAddress(source.anAddress);
    return builder.build();
}

function dictValueParserFirst(): DictionaryValue<First> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFirst(src)).endCell());
        },
        parse: (src) => {
            return loadFirst(src.loadRef().beginParse());
        },
    };
}

export type Second = {
    $$type: "Second";
    amount_bigger: bigint;
    myBool: boolean;
    thisDoesNotFit: bigint;
    myAddress: Address;
    myBool2: boolean;
    myStruct: MyStruct;
    myStruct2: MyStruct;
};

export function storeSecond(src: Second) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(391585480, 32);
        b_0.storeUint(src.amount_bigger, 64);
        b_0.storeBit(src.myBool);
        b_0.storeUint(src.thisDoesNotFit, 256);
        b_0.storeAddress(src.myAddress);
        b_0.storeBit(src.myBool2);
        b_0.store(storeMyStruct(src.myStruct));
        const b_1 = new Builder();
        b_1.store(storeMyStruct(src.myStruct2));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSecond(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 391585480) {
        throw Error("Invalid prefix");
    }
    const _amount_bigger = sc_0.loadUintBig(64);
    const _myBool = sc_0.loadBit();
    const _thisDoesNotFit = sc_0.loadUintBig(256);
    const _myAddress = sc_0.loadAddress();
    const _myBool2 = sc_0.loadBit();
    const _myStruct = loadMyStruct(sc_0);
    const sc_1 = sc_0.loadRef().beginParse();
    const _myStruct2 = loadMyStruct(sc_1);
    return {
        $$type: "Second" as const,
        amount_bigger: _amount_bigger,
        myBool: _myBool,
        thisDoesNotFit: _thisDoesNotFit,
        myAddress: _myAddress,
        myBool2: _myBool2,
        myStruct: _myStruct,
        myStruct2: _myStruct2,
    };
}

function loadTupleSecond(source: TupleReader) {
    const _amount_bigger = source.readBigNumber();
    const _myBool = source.readBoolean();
    const _thisDoesNotFit = source.readBigNumber();
    const _myAddress = source.readAddress();
    const _myBool2 = source.readBoolean();
    const _myStruct = loadTupleMyStruct(source);
    const _myStruct2 = loadTupleMyStruct(source);
    return {
        $$type: "Second" as const,
        amount_bigger: _amount_bigger,
        myBool: _myBool,
        thisDoesNotFit: _thisDoesNotFit,
        myAddress: _myAddress,
        myBool2: _myBool2,
        myStruct: _myStruct,
        myStruct2: _myStruct2,
    };
}

function loadGetterTupleSecond(source: TupleReader) {
    const _amount_bigger = source.readBigNumber();
    const _myBool = source.readBoolean();
    const _thisDoesNotFit = source.readBigNumber();
    const _myAddress = source.readAddress();
    const _myBool2 = source.readBoolean();
    const _myStruct = loadGetterTupleMyStruct(source);
    const _myStruct2 = loadGetterTupleMyStruct(source);
    return {
        $$type: "Second" as const,
        amount_bigger: _amount_bigger,
        myBool: _myBool,
        thisDoesNotFit: _thisDoesNotFit,
        myAddress: _myAddress,
        myBool2: _myBool2,
        myStruct: _myStruct,
        myStruct2: _myStruct2,
    };
}

function storeTupleSecond(source: Second) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount_bigger);
    builder.writeBoolean(source.myBool);
    builder.writeNumber(source.thisDoesNotFit);
    builder.writeAddress(source.myAddress);
    builder.writeBoolean(source.myBool2);
    builder.writeTuple(storeTupleMyStruct(source.myStruct));
    builder.writeTuple(storeTupleMyStruct(source.myStruct2));
    return builder.build();
}

function dictValueParserSecond(): DictionaryValue<Second> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSecond(src)).endCell());
        },
        parse: (src) => {
            return loadSecond(src.loadRef().beginParse());
        },
    };
}

export type Large = {
    $$type: "Large";
    address: Address;
    value: bigint;
};

export function storeLarge(src: Large) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(618480963, 32);
        b_0.storeAddress(src.address);
        b_0.storeCoins(src.value);
    };
}

export function loadLarge(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 618480963) {
        throw Error("Invalid prefix");
    }
    const _address = sc_0.loadAddress();
    const _value = sc_0.loadCoins();
    return { $$type: "Large" as const, address: _address, value: _value };
}

function loadTupleLarge(source: TupleReader) {
    const _address = source.readAddress();
    const _value = source.readBigNumber();
    return { $$type: "Large" as const, address: _address, value: _value };
}

function loadGetterTupleLarge(source: TupleReader) {
    const _address = source.readAddress();
    const _value = source.readBigNumber();
    return { $$type: "Large" as const, address: _address, value: _value };
}

function storeTupleLarge(source: Large) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeNumber(source.value);
    return builder.build();
}

function dictValueParserLarge(): DictionaryValue<Large> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLarge(src)).endCell());
        },
        parse: (src) => {
            return loadLarge(src.loadRef().beginParse());
        },
    };
}

export type SmallBounce = {
    $$type: "SmallBounce";
    amount: bigint;
    myBool3: boolean;
};

export function storeSmallBounce(src: SmallBounce) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3235833558, 32);
        b_0.storeUint(src.amount, 32);
        b_0.storeBit(src.myBool3);
    };
}

export function loadSmallBounce(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3235833558) {
        throw Error("Invalid prefix");
    }
    const _amount = sc_0.loadUintBig(32);
    const _myBool3 = sc_0.loadBit();
    return {
        $$type: "SmallBounce" as const,
        amount: _amount,
        myBool3: _myBool3,
    };
}

function loadTupleSmallBounce(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _myBool3 = source.readBoolean();
    return {
        $$type: "SmallBounce" as const,
        amount: _amount,
        myBool3: _myBool3,
    };
}

function loadGetterTupleSmallBounce(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _myBool3 = source.readBoolean();
    return {
        $$type: "SmallBounce" as const,
        amount: _amount,
        myBool3: _myBool3,
    };
}

function storeTupleSmallBounce(source: SmallBounce) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeBoolean(source.myBool3);
    return builder.build();
}

function dictValueParserSmallBounce(): DictionaryValue<SmallBounce> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeSmallBounce(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadSmallBounce(src.loadRef().beginParse());
        },
    };
}

export type MyStruct = {
    $$type: "MyStruct";
    amount: bigint;
};

export function storeMyStruct(src: MyStruct) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.amount, 257);
    };
}

export function loadMyStruct(slice: Slice) {
    const sc_0 = slice;
    const _amount = sc_0.loadIntBig(257);
    return { $$type: "MyStruct" as const, amount: _amount };
}

function loadTupleMyStruct(source: TupleReader) {
    const _amount = source.readBigNumber();
    return { $$type: "MyStruct" as const, amount: _amount };
}

function loadGetterTupleMyStruct(source: TupleReader) {
    const _amount = source.readBigNumber();
    return { $$type: "MyStruct" as const, amount: _amount };
}

function storeTupleMyStruct(source: MyStruct) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
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

export type SampleContract$Data = {
    $$type: "SampleContract$Data";
    a: bigint;
};

export function storeSampleContract$Data(src: SampleContract$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
    };
}

export function loadSampleContract$Data(slice: Slice) {
    const sc_0 = slice;
    const _a = sc_0.loadIntBig(257);
    return { $$type: "SampleContract$Data" as const, a: _a };
}

function loadTupleSampleContract$Data(source: TupleReader) {
    const _a = source.readBigNumber();
    return { $$type: "SampleContract$Data" as const, a: _a };
}

function loadGetterTupleSampleContract$Data(source: TupleReader) {
    const _a = source.readBigNumber();
    return { $$type: "SampleContract$Data" as const, a: _a };
}

function storeTupleSampleContract$Data(source: SampleContract$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.a);
    return builder.build();
}

function dictValueParserSampleContract$Data(): DictionaryValue<SampleContract$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeSampleContract$Data(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadSampleContract$Data(src.loadRef().beginParse());
        },
    };
}

export type SampleContract2$Data = {
    $$type: "SampleContract2$Data";
};

export function storeSampleContract2$Data(src: SampleContract2$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

export function loadSampleContract2$Data(slice: Slice) {
    const sc_0 = slice;
    return { $$type: "SampleContract2$Data" as const };
}

function loadTupleSampleContract2$Data(source: TupleReader) {
    return { $$type: "SampleContract2$Data" as const };
}

function loadGetterTupleSampleContract2$Data(source: TupleReader) {
    return { $$type: "SampleContract2$Data" as const };
}

function storeTupleSampleContract2$Data(source: SampleContract2$Data) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserSampleContract2$Data(): DictionaryValue<SampleContract2$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeSampleContract2$Data(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadSampleContract2$Data(src.loadRef().beginParse());
        },
    };
}

type SampleContract2_init_args = {
    $$type: "SampleContract2_init_args";
};

function initSampleContract2_init_args(src: SampleContract2_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
    };
}

async function SampleContract2_init() {
    const __code = Cell.fromBase64(
        "te6ccgECBgEAAX8AART/APSkE/S88sgLAQOu0wHQctch0gDSAPpAIRA0UGZvBPhhAvhi2zwCkVvgcCHXSSDCH5UxAdMfMJEy4iCCEL7Ajzi64wIgghAXVx7IuuMCwAABwSGwmTDIfwHKAMntVOAw8sCCAgMEABTtRNDSADCRbeBtAfZbi/Qm91bmNpbmcgRmlyc3QhiNBdkdW1wKCJCb3VuY2luZyBGaXJzdCEiKYI0QEZpbGUgc3JjL3Rlc3QvZTJlLWVtdWxhdGVkL2NvbnRyYWN0cy9ib3VuY2VkLXJvdXRpbmcudGFjdDoxMzM6OTqD+FDD+FDD+FDDywJAFAfxbjQQQm91bmNpbmcgU2Vjb25kIYI0GGR1bXAoIkJvdW5jaW5nIFNlY29uZCEiKYI0QEZpbGUgc3JjL3Rlc3QvZTJlLWVtdWxhdGVkL2NvbnRyYWN0cy9ib3VuY2VkLXJvdXRpbmcudGFjdDoxMzg6OTqD+FDD+FDD+FDDywJEFABIwyH8BygDJ7VQ=",
    );
    const builder = beginCell();
    builder.storeUint(0, 1);
    initSampleContract2_init_args({ $$type: "SampleContract2_init_args" })(
        builder,
    );
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const SampleContract2_errors: { [key: number]: { message: string } } = {
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

const SampleContract2_types: ABIType[] = [
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
        name: "EntryFirst",
        header: 2757457064,
        fields: [
            {
                name: "amountToAdd",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 32,
                },
            },
            {
                name: "toAddress",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "EntrySecond",
        header: 4282440720,
        fields: [
            {
                name: "amountToAdd",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 32,
                },
            },
            {
                name: "toAddress",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "First",
        header: 3200290616,
        fields: [
            {
                name: "amount",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 32,
                },
            },
            {
                name: "myCoins",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
            {
                name: "myBool3",
                type: { kind: "simple", type: "bool", optional: false },
            },
            {
                name: "anAddress",
                type: { kind: "simple", type: "address", optional: false },
            },
        ],
    },
    {
        name: "Second",
        header: 391585480,
        fields: [
            {
                name: "amount_bigger",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 64,
                },
            },
            {
                name: "myBool",
                type: { kind: "simple", type: "bool", optional: false },
            },
            {
                name: "thisDoesNotFit",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 256,
                },
            },
            {
                name: "myAddress",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "myBool2",
                type: { kind: "simple", type: "bool", optional: false },
            },
            {
                name: "myStruct",
                type: { kind: "simple", type: "MyStruct", optional: false },
            },
            {
                name: "myStruct2",
                type: { kind: "simple", type: "MyStruct", optional: false },
            },
        ],
    },
    {
        name: "Large",
        header: 618480963,
        fields: [
            {
                name: "address",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "value",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
        ],
    },
    {
        name: "SmallBounce",
        header: 3235833558,
        fields: [
            {
                name: "amount",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 32,
                },
            },
            {
                name: "myBool3",
                type: { kind: "simple", type: "bool", optional: false },
            },
        ],
    },
    {
        name: "MyStruct",
        header: null,
        fields: [
            {
                name: "amount",
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
        name: "SampleContract$Data",
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
        ],
    },
    { name: "SampleContract2$Data", header: null, fields: [] },
];

const SampleContract2_getters: ABIGetter[] = [];

export const SampleContract2_getterMapping: { [key: string]: string } = {};

const SampleContract2_receivers: ABIReceiver[] = [
    { receiver: "internal", message: { kind: "empty" } },
    { receiver: "internal", message: { kind: "typed", type: "First" } },
    { receiver: "internal", message: { kind: "typed", type: "Second" } },
];

export class SampleContract2 implements Contract {
    static async init() {
        return await SampleContract2_init();
    }

    static async fromInit() {
        const __gen_init = await SampleContract2_init();
        const address = contractAddress(0, __gen_init);
        return new SampleContract2(address, __gen_init);
    }

    static fromAddress(address: Address) {
        return new SampleContract2(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };
    readonly abi: ContractABI = {
        types: SampleContract2_types,
        getters: SampleContract2_getters,
        receivers: SampleContract2_receivers,
        errors: SampleContract2_errors,
    };

    private constructor(address: Address, init?: { code: Cell; data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(
        provider: ContractProvider,
        via: Sender,
        args: { value: bigint; bounce?: boolean | null | undefined },
        message: null | First | Second,
    ) {
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (
            message &&
            typeof message === "object" &&
            !(message instanceof Slice) &&
            message.$$type === "First"
        ) {
            body = beginCell().store(storeFirst(message)).endCell();
        }
        if (
            message &&
            typeof message === "object" &&
            !(message instanceof Slice) &&
            message.$$type === "Second"
        ) {
            body = beginCell().store(storeSecond(message)).endCell();
        }
        if (body === null) {
            throw new Error("Invalid message type");
        }

        await provider.internal(via, { ...args, body: body });
    }
}
