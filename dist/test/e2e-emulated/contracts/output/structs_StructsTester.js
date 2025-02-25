"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructsTester = exports.StructsTester_getterMapping = void 0;
exports.storeDataSize = storeDataSize;
exports.loadDataSize = loadDataSize;
exports.storeStateInit = storeStateInit;
exports.loadStateInit = loadStateInit;
exports.storeContext = storeContext;
exports.loadContext = loadContext;
exports.storeSendParameters = storeSendParameters;
exports.loadSendParameters = loadSendParameters;
exports.storeDeployParameters = storeDeployParameters;
exports.loadDeployParameters = loadDeployParameters;
exports.storeStdAddress = storeStdAddress;
exports.loadStdAddress = loadStdAddress;
exports.storeVarAddress = storeVarAddress;
exports.loadVarAddress = loadVarAddress;
exports.storeS = storeS;
exports.loadS = loadS;
exports.storeT = storeT;
exports.loadT = loadT;
exports.storeMyStruct1 = storeMyStruct1;
exports.loadMyStruct1 = loadMyStruct1;
exports.storeMyStruct2 = storeMyStruct2;
exports.loadMyStruct2 = loadMyStruct2;
exports.storeMyStruct3 = storeMyStruct3;
exports.loadMyStruct3 = loadMyStruct3;
exports.storeMyMessage1 = storeMyMessage1;
exports.loadMyMessage1 = loadMyMessage1;
exports.storeCoin = storeCoin;
exports.loadCoin = loadCoin;
exports.storeVarIntegers = storeVarIntegers;
exports.loadVarIntegers = loadVarIntegers;
exports.storeIntFields = storeIntFields;
exports.loadIntFields = loadIntFields;
exports.storeUintFields = storeUintFields;
exports.loadUintFields = loadUintFields;
exports.storeLongStruct15 = storeLongStruct15;
exports.loadLongStruct15 = loadLongStruct15;
exports.storeLongStruct16 = storeLongStruct16;
exports.loadLongStruct16 = loadLongStruct16;
exports.storeLongStruct32 = storeLongStruct32;
exports.loadLongStruct32 = loadLongStruct32;
exports.storeLongNestedStruct = storeLongNestedStruct;
exports.loadLongNestedStruct = loadLongNestedStruct;
exports.storeLongNestedStructWithOpts = storeLongNestedStructWithOpts;
exports.loadLongNestedStructWithOpts = loadLongNestedStructWithOpts;
exports.storePoint = storePoint;
exports.loadPoint = loadPoint;
exports.storeLine = storeLine;
exports.loadLine = loadLine;
exports.storeLocation = storeLocation;
exports.loadLocation = loadLocation;
exports.storeDoubleNestedStructOpt = storeDoubleNestedStructOpt;
exports.loadDoubleNestedStructOpt = loadDoubleNestedStructOpt;
exports.storeTripleNestedStructOpt = storeTripleNestedStructOpt;
exports.loadTripleNestedStructOpt = loadTripleNestedStructOpt;
exports.storeLongAndDeepNestedStruct = storeLongAndDeepNestedStruct;
exports.loadLongAndDeepNestedStruct = loadLongAndDeepNestedStruct;
exports.storeFoo = storeFoo;
exports.loadFoo = loadFoo;
exports.storeDict = storeDict;
exports.loadDict = loadDict;
exports.storeOptionalFields = storeOptionalFields;
exports.loadOptionalFields = loadOptionalFields;
exports.storeS1 = storeS1;
exports.loadS1 = loadS1;
exports.storeStructsTester$Data = storeStructsTester$Data;
exports.loadStructsTester$Data = loadStructsTester$Data;
const core_1 = require("@ton/core");
function storeDataSize(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}
function loadDataSize(slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'DataSize', cells: _cells, bits: _bits, refs: _refs };
}
function loadTupleDataSize(source) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize', cells: _cells, bits: _bits, refs: _refs };
}
function loadGetterTupleDataSize(source) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize', cells: _cells, bits: _bits, refs: _refs };
}
function storeTupleDataSize(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}
function dictValueParserDataSize() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        }
    };
}
function storeStateInit(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}
function loadStateInit(slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: 'StateInit', code: _code, data: _data };
}
function loadTupleStateInit(source) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit', code: _code, data: _data };
}
function loadGetterTupleStateInit(source) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit', code: _code, data: _data };
}
function storeTupleStateInit(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}
function dictValueParserStateInit() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    };
}
function storeContext(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}
function loadContext(slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context', bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}
function loadTupleContext(source) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context', bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}
function loadGetterTupleContext(source) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context', bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}
function storeTupleContext(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}
function dictValueParserContext() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    };
}
function storeSendParameters(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) {
            b_0.storeBit(true).storeRef(src.body);
        }
        else {
            b_0.storeBit(false);
        }
        if (src.code !== null && src.code !== undefined) {
            b_0.storeBit(true).storeRef(src.code);
        }
        else {
            b_0.storeBit(false);
        }
        if (src.data !== null && src.data !== undefined) {
            b_0.storeBit(true).storeRef(src.data);
        }
        else {
            b_0.storeBit(false);
        }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}
function loadSendParameters(slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'SendParameters', mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}
function loadTupleSendParameters(source) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters', mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}
function loadGetterTupleSendParameters(source) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters', mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}
function storeTupleSendParameters(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}
function dictValueParserSendParameters() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    };
}
function storeDeployParameters(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) {
            b_0.storeBit(true).storeRef(src.body);
        }
        else {
            b_0.storeBit(false);
        }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}
function loadDeployParameters(slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return { $$type: 'DeployParameters', mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}
function loadTupleDeployParameters(source) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters', mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}
function loadGetterTupleDeployParameters(source) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters', mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}
function storeTupleDeployParameters(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}
function dictValueParserDeployParameters() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    };
}
function storeStdAddress(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}
function loadStdAddress(slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress', workchain: _workchain, address: _address };
}
function loadTupleStdAddress(source) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress', workchain: _workchain, address: _address };
}
function loadGetterTupleStdAddress(source) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress', workchain: _workchain, address: _address };
}
function storeTupleStdAddress(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}
function dictValueParserStdAddress() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    };
}
function storeVarAddress(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}
function loadVarAddress(slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress', workchain: _workchain, address: _address };
}
function loadTupleVarAddress(source) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress', workchain: _workchain, address: _address };
}
function loadGetterTupleVarAddress(source) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress', workchain: _workchain, address: _address };
}
function storeTupleVarAddress(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}
function dictValueParserVarAddress() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    };
}
function storeS(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeBit(src.a);
        b_0.storeInt(src.b, 257);
    };
}
function loadS(slice) {
    const sc_0 = slice;
    const _a = sc_0.loadBit();
    const _b = sc_0.loadIntBig(257);
    return { $$type: 'S', a: _a, b: _b };
}
function loadTupleS(source) {
    const _a = source.readBoolean();
    const _b = source.readBigNumber();
    return { $$type: 'S', a: _a, b: _b };
}
function loadGetterTupleS(source) {
    const _a = source.readBoolean();
    const _b = source.readBigNumber();
    return { $$type: 'S', a: _a, b: _b };
}
function storeTupleS(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeBoolean(source.a);
    builder.writeNumber(source.b);
    return builder.build();
}
function dictValueParserS() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeS(src)).endCell());
        },
        parse: (src) => {
            return loadS(src.loadRef().beginParse());
        }
    };
}
function storeT(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
        b_0.store(storeS(src.s));
    };
}
function loadT(slice) {
    const sc_0 = slice;
    const _a = sc_0.loadIntBig(257);
    const _s = loadS(sc_0);
    return { $$type: 'T', a: _a, s: _s };
}
function loadTupleT(source) {
    const _a = source.readBigNumber();
    const _s = loadTupleS(source);
    return { $$type: 'T', a: _a, s: _s };
}
function loadGetterTupleT(source) {
    const _a = source.readBigNumber();
    const _s = loadGetterTupleS(source);
    return { $$type: 'T', a: _a, s: _s };
}
function storeTupleT(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeTuple(storeTupleS(source.s));
    return builder.build();
}
function dictValueParserT() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeT(src)).endCell());
        },
        parse: (src) => {
            return loadT(src.loadRef().beginParse());
        }
    };
}
function storeMyStruct1(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
        b_0.storeUint(src.b, 32);
        if (src.c !== null && src.c !== undefined) {
            b_0.storeBit(true).storeInt(src.c, 257);
        }
        else {
            b_0.storeBit(false);
        }
    };
}
function loadMyStruct1(slice) {
    const sc_0 = slice;
    const _a = sc_0.loadIntBig(257);
    const _b = sc_0.loadUintBig(32);
    const _c = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'MyStruct1', a: _a, b: _b, c: _c };
}
function loadTupleMyStruct1(source) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    const _c = source.readBigNumberOpt();
    return { $$type: 'MyStruct1', a: _a, b: _b, c: _c };
}
function loadGetterTupleMyStruct1(source) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    const _c = source.readBigNumberOpt();
    return { $$type: 'MyStruct1', a: _a, b: _b, c: _c };
}
function storeTupleMyStruct1(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeNumber(source.b);
    builder.writeNumber(source.c);
    return builder.build();
}
function dictValueParserMyStruct1() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMyStruct1(src)).endCell());
        },
        parse: (src) => {
            return loadMyStruct1(src.loadRef().beginParse());
        }
    };
}
function storeMyStruct2(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeDict(src.m, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigUint(64));
        if (src.s !== null && src.s !== undefined) {
            b_0.storeBit(true);
            b_0.store(storeMyStruct1(src.s));
        }
        else {
            b_0.storeBit(false);
        }
    };
}
function loadMyStruct2(slice) {
    const sc_0 = slice;
    const _m = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigUint(64), sc_0);
    const _s = sc_0.loadBit() ? loadMyStruct1(sc_0) : null;
    return { $$type: 'MyStruct2', m: _m, s: _s };
}
function loadTupleMyStruct2(source) {
    const _m = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigUint(64), source.readCellOpt());
    const _s_p = source.readTupleOpt();
    const _s = _s_p ? loadTupleMyStruct1(_s_p) : null;
    return { $$type: 'MyStruct2', m: _m, s: _s };
}
function loadGetterTupleMyStruct2(source) {
    const _m = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigUint(64), source.readCellOpt());
    const _s_p = source.readTupleOpt();
    const _s = _s_p ? loadTupleMyStruct1(_s_p) : null;
    return { $$type: 'MyStruct2', m: _m, s: _s };
}
function storeTupleMyStruct2(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeCell(source.m.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.m, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigUint(64)).endCell() : null);
    if (source.s !== null && source.s !== undefined) {
        builder.writeTuple(storeTupleMyStruct1(source.s));
    }
    else {
        builder.writeTuple(null);
    }
    return builder.build();
}
function dictValueParserMyStruct2() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMyStruct2(src)).endCell());
        },
        parse: (src) => {
            return loadMyStruct2(src.loadRef().beginParse());
        }
    };
}
function storeMyStruct3(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.s);
    };
}
function loadMyStruct3(slice) {
    const sc_0 = slice;
    const _s = sc_0.loadStringRefTail();
    return { $$type: 'MyStruct3', s: _s };
}
function loadTupleMyStruct3(source) {
    const _s = source.readString();
    return { $$type: 'MyStruct3', s: _s };
}
function loadGetterTupleMyStruct3(source) {
    const _s = source.readString();
    return { $$type: 'MyStruct3', s: _s };
}
function storeTupleMyStruct3(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.s);
    return builder.build();
}
function dictValueParserMyStruct3() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMyStruct3(src)).endCell());
        },
        parse: (src) => {
            return loadMyStruct3(src.loadRef().beginParse());
        }
    };
}
function storeMyMessage1(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(2844430700, 32);
        b_0.storeInt(src.a, 257);
        b_0.store(storeMyStruct2(src.s));
    };
}
function loadMyMessage1(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2844430700) {
        throw Error('Invalid prefix');
    }
    const _a = sc_0.loadIntBig(257);
    const _s = loadMyStruct2(sc_0);
    return { $$type: 'MyMessage1', a: _a, s: _s };
}
function loadTupleMyMessage1(source) {
    const _a = source.readBigNumber();
    const _s = loadTupleMyStruct2(source);
    return { $$type: 'MyMessage1', a: _a, s: _s };
}
function loadGetterTupleMyMessage1(source) {
    const _a = source.readBigNumber();
    const _s = loadGetterTupleMyStruct2(source);
    return { $$type: 'MyMessage1', a: _a, s: _s };
}
function storeTupleMyMessage1(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeTuple(storeTupleMyStruct2(source.s));
    return builder.build();
}
function dictValueParserMyMessage1() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMyMessage1(src)).endCell());
        },
        parse: (src) => {
            return loadMyMessage1(src.loadRef().beginParse());
        }
    };
}
function storeCoin(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeCoins(src.first);
        b_0.storeUint(src.second, 32);
    };
}
function loadCoin(slice) {
    const sc_0 = slice;
    const _first = sc_0.loadCoins();
    const _second = sc_0.loadUintBig(32);
    return { $$type: 'Coin', first: _first, second: _second };
}
function loadTupleCoin(source) {
    const _first = source.readBigNumber();
    const _second = source.readBigNumber();
    return { $$type: 'Coin', first: _first, second: _second };
}
function loadGetterTupleCoin(source) {
    const _first = source.readBigNumber();
    const _second = source.readBigNumber();
    return { $$type: 'Coin', first: _first, second: _second };
}
function storeTupleCoin(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.first);
    builder.writeNumber(source.second);
    return builder.build();
}
function dictValueParserCoin() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeCoin(src)).endCell());
        },
        parse: (src) => {
            return loadCoin(src.loadRef().beginParse());
        }
    };
}
function storeVarIntegers(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeVarInt(src.a, 2);
        b_0.storeVarInt(src.b, 4);
        b_0.storeVarUint(src.c, 2);
        b_0.storeVarUint(src.d, 4);
    };
}
function loadVarIntegers(slice) {
    const sc_0 = slice;
    const _a = sc_0.loadVarIntBig(2);
    const _b = sc_0.loadVarIntBig(4);
    const _c = sc_0.loadVarUintBig(2);
    const _d = sc_0.loadVarUintBig(4);
    return { $$type: 'VarIntegers', a: _a, b: _b, c: _c, d: _d };
}
function loadTupleVarIntegers(source) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    const _c = source.readBigNumber();
    const _d = source.readBigNumber();
    return { $$type: 'VarIntegers', a: _a, b: _b, c: _c, d: _d };
}
function loadGetterTupleVarIntegers(source) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    const _c = source.readBigNumber();
    const _d = source.readBigNumber();
    return { $$type: 'VarIntegers', a: _a, b: _b, c: _c, d: _d };
}
function storeTupleVarIntegers(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeNumber(source.b);
    builder.writeNumber(source.c);
    builder.writeNumber(source.d);
    return builder.build();
}
function dictValueParserVarIntegers() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeVarIntegers(src)).endCell());
        },
        parse: (src) => {
            return loadVarIntegers(src.loadRef().beginParse());
        }
    };
}
function storeIntFields(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.i1, 1);
        b_0.storeInt(src.i2, 2);
        b_0.storeInt(src.i3, 3);
        b_0.storeInt(src.i255, 255);
        b_0.storeInt(src.i256, 256);
        b_0.storeInt(src.i257, 257);
    };
}
function loadIntFields(slice) {
    const sc_0 = slice;
    const _i1 = sc_0.loadIntBig(1);
    const _i2 = sc_0.loadIntBig(2);
    const _i3 = sc_0.loadIntBig(3);
    const _i255 = sc_0.loadIntBig(255);
    const _i256 = sc_0.loadIntBig(256);
    const _i257 = sc_0.loadIntBig(257);
    return { $$type: 'IntFields', i1: _i1, i2: _i2, i3: _i3, i255: _i255, i256: _i256, i257: _i257 };
}
function loadTupleIntFields(source) {
    const _i1 = source.readBigNumber();
    const _i2 = source.readBigNumber();
    const _i3 = source.readBigNumber();
    const _i255 = source.readBigNumber();
    const _i256 = source.readBigNumber();
    const _i257 = source.readBigNumber();
    return { $$type: 'IntFields', i1: _i1, i2: _i2, i3: _i3, i255: _i255, i256: _i256, i257: _i257 };
}
function loadGetterTupleIntFields(source) {
    const _i1 = source.readBigNumber();
    const _i2 = source.readBigNumber();
    const _i3 = source.readBigNumber();
    const _i255 = source.readBigNumber();
    const _i256 = source.readBigNumber();
    const _i257 = source.readBigNumber();
    return { $$type: 'IntFields', i1: _i1, i2: _i2, i3: _i3, i255: _i255, i256: _i256, i257: _i257 };
}
function storeTupleIntFields(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.i1);
    builder.writeNumber(source.i2);
    builder.writeNumber(source.i3);
    builder.writeNumber(source.i255);
    builder.writeNumber(source.i256);
    builder.writeNumber(source.i257);
    return builder.build();
}
function dictValueParserIntFields() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeIntFields(src)).endCell());
        },
        parse: (src) => {
            return loadIntFields(src.loadRef().beginParse());
        }
    };
}
function storeUintFields(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(3925996650, 32);
        b_0.storeUint(src.u1, 1);
        b_0.storeUint(src.u2, 2);
        b_0.storeUint(src.u3, 3);
        b_0.storeUint(src.u254, 254);
        b_0.storeUint(src.u255, 255);
        b_0.storeUint(src.u256, 256);
    };
}
function loadUintFields(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3925996650) {
        throw Error('Invalid prefix');
    }
    const _u1 = sc_0.loadUintBig(1);
    const _u2 = sc_0.loadUintBig(2);
    const _u3 = sc_0.loadUintBig(3);
    const _u254 = sc_0.loadUintBig(254);
    const _u255 = sc_0.loadUintBig(255);
    const _u256 = sc_0.loadUintBig(256);
    return { $$type: 'UintFields', u1: _u1, u2: _u2, u3: _u3, u254: _u254, u255: _u255, u256: _u256 };
}
function loadTupleUintFields(source) {
    const _u1 = source.readBigNumber();
    const _u2 = source.readBigNumber();
    const _u3 = source.readBigNumber();
    const _u254 = source.readBigNumber();
    const _u255 = source.readBigNumber();
    const _u256 = source.readBigNumber();
    return { $$type: 'UintFields', u1: _u1, u2: _u2, u3: _u3, u254: _u254, u255: _u255, u256: _u256 };
}
function loadGetterTupleUintFields(source) {
    const _u1 = source.readBigNumber();
    const _u2 = source.readBigNumber();
    const _u3 = source.readBigNumber();
    const _u254 = source.readBigNumber();
    const _u255 = source.readBigNumber();
    const _u256 = source.readBigNumber();
    return { $$type: 'UintFields', u1: _u1, u2: _u2, u3: _u3, u254: _u254, u255: _u255, u256: _u256 };
}
function storeTupleUintFields(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.u1);
    builder.writeNumber(source.u2);
    builder.writeNumber(source.u3);
    builder.writeNumber(source.u254);
    builder.writeNumber(source.u255);
    builder.writeNumber(source.u256);
    return builder.build();
}
function dictValueParserUintFields() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeUintFields(src)).endCell());
        },
        parse: (src) => {
            return loadUintFields(src.loadRef().beginParse());
        }
    };
}
function storeLongStruct15(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.x1, 257);
        b_0.storeInt(src.x2, 257);
        b_0.storeInt(src.x3, 257);
        const b_1 = new core_1.Builder();
        b_1.storeInt(src.x4, 257);
        b_1.storeInt(src.x5, 257);
        b_1.storeInt(src.x6, 257);
        const b_2 = new core_1.Builder();
        b_2.storeInt(src.x7, 257);
        b_2.storeInt(src.x8, 257);
        b_2.storeInt(src.x9, 257);
        const b_3 = new core_1.Builder();
        b_3.storeInt(src.x10, 257);
        b_3.storeInt(src.x11, 257);
        b_3.storeInt(src.x12, 257);
        const b_4 = new core_1.Builder();
        b_4.storeInt(src.x13, 257);
        b_4.storeInt(src.x14, 257);
        b_4.storeInt(src.x15, 257);
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}
function loadLongStruct15(slice) {
    const sc_0 = slice;
    const _x1 = sc_0.loadIntBig(257);
    const _x2 = sc_0.loadIntBig(257);
    const _x3 = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _x4 = sc_1.loadIntBig(257);
    const _x5 = sc_1.loadIntBig(257);
    const _x6 = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _x7 = sc_2.loadIntBig(257);
    const _x8 = sc_2.loadIntBig(257);
    const _x9 = sc_2.loadIntBig(257);
    const sc_3 = sc_2.loadRef().beginParse();
    const _x10 = sc_3.loadIntBig(257);
    const _x11 = sc_3.loadIntBig(257);
    const _x12 = sc_3.loadIntBig(257);
    const sc_4 = sc_3.loadRef().beginParse();
    const _x13 = sc_4.loadIntBig(257);
    const _x14 = sc_4.loadIntBig(257);
    const _x15 = sc_4.loadIntBig(257);
    return { $$type: 'LongStruct15', x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15 };
}
function loadTupleLongStruct15(source) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    const _x15 = source.readBigNumber();
    return { $$type: 'LongStruct15', x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15 };
}
function loadGetterTupleLongStruct15(source) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    const _x15 = source.readBigNumber();
    return { $$type: 'LongStruct15', x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15 };
}
function storeTupleLongStruct15(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.x1);
    builder.writeNumber(source.x2);
    builder.writeNumber(source.x3);
    builder.writeNumber(source.x4);
    builder.writeNumber(source.x5);
    builder.writeNumber(source.x6);
    builder.writeNumber(source.x7);
    builder.writeNumber(source.x8);
    builder.writeNumber(source.x9);
    builder.writeNumber(source.x10);
    builder.writeNumber(source.x11);
    builder.writeNumber(source.x12);
    builder.writeNumber(source.x13);
    builder.writeNumber(source.x14);
    builder.writeNumber(source.x15);
    return builder.build();
}
function dictValueParserLongStruct15() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeLongStruct15(src)).endCell());
        },
        parse: (src) => {
            return loadLongStruct15(src.loadRef().beginParse());
        }
    };
}
function storeLongStruct16(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.x1, 257);
        b_0.storeInt(src.x2, 257);
        b_0.storeInt(src.x3, 257);
        const b_1 = new core_1.Builder();
        b_1.storeInt(src.x4, 257);
        b_1.storeInt(src.x5, 257);
        b_1.storeInt(src.x6, 257);
        const b_2 = new core_1.Builder();
        b_2.storeInt(src.x7, 257);
        b_2.storeInt(src.x8, 257);
        b_2.storeInt(src.x9, 257);
        const b_3 = new core_1.Builder();
        b_3.storeInt(src.x10, 257);
        b_3.storeInt(src.x11, 257);
        b_3.storeInt(src.x12, 257);
        const b_4 = new core_1.Builder();
        b_4.storeInt(src.x13, 257);
        b_4.storeInt(src.x14, 257);
        b_4.storeInt(src.x15, 257);
        const b_5 = new core_1.Builder();
        b_5.storeInt(src.x16, 257);
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}
function loadLongStruct16(slice) {
    const sc_0 = slice;
    const _x1 = sc_0.loadIntBig(257);
    const _x2 = sc_0.loadIntBig(257);
    const _x3 = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _x4 = sc_1.loadIntBig(257);
    const _x5 = sc_1.loadIntBig(257);
    const _x6 = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _x7 = sc_2.loadIntBig(257);
    const _x8 = sc_2.loadIntBig(257);
    const _x9 = sc_2.loadIntBig(257);
    const sc_3 = sc_2.loadRef().beginParse();
    const _x10 = sc_3.loadIntBig(257);
    const _x11 = sc_3.loadIntBig(257);
    const _x12 = sc_3.loadIntBig(257);
    const sc_4 = sc_3.loadRef().beginParse();
    const _x13 = sc_4.loadIntBig(257);
    const _x14 = sc_4.loadIntBig(257);
    const _x15 = sc_4.loadIntBig(257);
    const sc_5 = sc_4.loadRef().beginParse();
    const _x16 = sc_5.loadIntBig(257);
    return { $$type: 'LongStruct16', x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16 };
}
function loadTupleLongStruct16(source) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    source = source.readTuple();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    return { $$type: 'LongStruct16', x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16 };
}
function loadGetterTupleLongStruct16(source) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    return { $$type: 'LongStruct16', x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16 };
}
function storeTupleLongStruct16(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.x1);
    builder.writeNumber(source.x2);
    builder.writeNumber(source.x3);
    builder.writeNumber(source.x4);
    builder.writeNumber(source.x5);
    builder.writeNumber(source.x6);
    builder.writeNumber(source.x7);
    builder.writeNumber(source.x8);
    builder.writeNumber(source.x9);
    builder.writeNumber(source.x10);
    builder.writeNumber(source.x11);
    builder.writeNumber(source.x12);
    builder.writeNumber(source.x13);
    builder.writeNumber(source.x14);
    builder.writeNumber(source.x15);
    builder.writeNumber(source.x16);
    return builder.build();
}
function dictValueParserLongStruct16() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeLongStruct16(src)).endCell());
        },
        parse: (src) => {
            return loadLongStruct16(src.loadRef().beginParse());
        }
    };
}
function storeLongStruct32(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.x1, 257);
        b_0.storeInt(src.x2, 257);
        b_0.storeInt(src.x3, 257);
        const b_1 = new core_1.Builder();
        b_1.storeInt(src.x4, 257);
        b_1.storeInt(src.x5, 257);
        b_1.storeInt(src.x6, 257);
        const b_2 = new core_1.Builder();
        b_2.storeInt(src.x7, 257);
        b_2.storeInt(src.x8, 257);
        b_2.storeInt(src.x9, 257);
        const b_3 = new core_1.Builder();
        b_3.storeInt(src.x10, 257);
        b_3.storeInt(src.x11, 257);
        b_3.storeInt(src.x12, 257);
        const b_4 = new core_1.Builder();
        b_4.storeInt(src.x13, 257);
        b_4.storeInt(src.x14, 257);
        b_4.storeInt(src.x15, 257);
        const b_5 = new core_1.Builder();
        b_5.storeInt(src.x16, 257);
        b_5.storeInt(src.x17, 257);
        b_5.storeInt(src.x18, 257);
        const b_6 = new core_1.Builder();
        b_6.storeInt(src.x19, 257);
        b_6.storeInt(src.x20, 257);
        b_6.storeInt(src.x21, 257);
        const b_7 = new core_1.Builder();
        b_7.storeInt(src.x22, 257);
        b_7.storeInt(src.x23, 257);
        b_7.storeInt(src.x24, 257);
        const b_8 = new core_1.Builder();
        b_8.storeInt(src.x25, 257);
        b_8.storeInt(src.x26, 257);
        b_8.storeInt(src.x27, 257);
        const b_9 = new core_1.Builder();
        b_9.storeInt(src.x28, 257);
        b_9.storeInt(src.x29, 257);
        b_9.storeInt(src.x30, 257);
        const b_10 = new core_1.Builder();
        b_10.storeInt(src.x31, 257);
        b_10.storeInt(src.x32, 257);
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
function loadLongStruct32(slice) {
    const sc_0 = slice;
    const _x1 = sc_0.loadIntBig(257);
    const _x2 = sc_0.loadIntBig(257);
    const _x3 = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _x4 = sc_1.loadIntBig(257);
    const _x5 = sc_1.loadIntBig(257);
    const _x6 = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _x7 = sc_2.loadIntBig(257);
    const _x8 = sc_2.loadIntBig(257);
    const _x9 = sc_2.loadIntBig(257);
    const sc_3 = sc_2.loadRef().beginParse();
    const _x10 = sc_3.loadIntBig(257);
    const _x11 = sc_3.loadIntBig(257);
    const _x12 = sc_3.loadIntBig(257);
    const sc_4 = sc_3.loadRef().beginParse();
    const _x13 = sc_4.loadIntBig(257);
    const _x14 = sc_4.loadIntBig(257);
    const _x15 = sc_4.loadIntBig(257);
    const sc_5 = sc_4.loadRef().beginParse();
    const _x16 = sc_5.loadIntBig(257);
    const _x17 = sc_5.loadIntBig(257);
    const _x18 = sc_5.loadIntBig(257);
    const sc_6 = sc_5.loadRef().beginParse();
    const _x19 = sc_6.loadIntBig(257);
    const _x20 = sc_6.loadIntBig(257);
    const _x21 = sc_6.loadIntBig(257);
    const sc_7 = sc_6.loadRef().beginParse();
    const _x22 = sc_7.loadIntBig(257);
    const _x23 = sc_7.loadIntBig(257);
    const _x24 = sc_7.loadIntBig(257);
    const sc_8 = sc_7.loadRef().beginParse();
    const _x25 = sc_8.loadIntBig(257);
    const _x26 = sc_8.loadIntBig(257);
    const _x27 = sc_8.loadIntBig(257);
    const sc_9 = sc_8.loadRef().beginParse();
    const _x28 = sc_9.loadIntBig(257);
    const _x29 = sc_9.loadIntBig(257);
    const _x30 = sc_9.loadIntBig(257);
    const sc_10 = sc_9.loadRef().beginParse();
    const _x31 = sc_10.loadIntBig(257);
    const _x32 = sc_10.loadIntBig(257);
    return { $$type: 'LongStruct32', x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20, x21: _x21, x22: _x22, x23: _x23, x24: _x24, x25: _x25, x26: _x26, x27: _x27, x28: _x28, x29: _x29, x30: _x30, x31: _x31, x32: _x32 };
}
function loadTupleLongStruct32(source) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    source = source.readTuple();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    const _x17 = source.readBigNumber();
    const _x18 = source.readBigNumber();
    const _x19 = source.readBigNumber();
    const _x20 = source.readBigNumber();
    const _x21 = source.readBigNumber();
    const _x22 = source.readBigNumber();
    const _x23 = source.readBigNumber();
    const _x24 = source.readBigNumber();
    const _x25 = source.readBigNumber();
    const _x26 = source.readBigNumber();
    const _x27 = source.readBigNumber();
    const _x28 = source.readBigNumber();
    source = source.readTuple();
    const _x29 = source.readBigNumber();
    const _x30 = source.readBigNumber();
    const _x31 = source.readBigNumber();
    const _x32 = source.readBigNumber();
    return { $$type: 'LongStruct32', x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20, x21: _x21, x22: _x22, x23: _x23, x24: _x24, x25: _x25, x26: _x26, x27: _x27, x28: _x28, x29: _x29, x30: _x30, x31: _x31, x32: _x32 };
}
function loadGetterTupleLongStruct32(source) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    const _x17 = source.readBigNumber();
    const _x18 = source.readBigNumber();
    const _x19 = source.readBigNumber();
    const _x20 = source.readBigNumber();
    const _x21 = source.readBigNumber();
    const _x22 = source.readBigNumber();
    const _x23 = source.readBigNumber();
    const _x24 = source.readBigNumber();
    const _x25 = source.readBigNumber();
    const _x26 = source.readBigNumber();
    const _x27 = source.readBigNumber();
    const _x28 = source.readBigNumber();
    const _x29 = source.readBigNumber();
    const _x30 = source.readBigNumber();
    const _x31 = source.readBigNumber();
    const _x32 = source.readBigNumber();
    return { $$type: 'LongStruct32', x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20, x21: _x21, x22: _x22, x23: _x23, x24: _x24, x25: _x25, x26: _x26, x27: _x27, x28: _x28, x29: _x29, x30: _x30, x31: _x31, x32: _x32 };
}
function storeTupleLongStruct32(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.x1);
    builder.writeNumber(source.x2);
    builder.writeNumber(source.x3);
    builder.writeNumber(source.x4);
    builder.writeNumber(source.x5);
    builder.writeNumber(source.x6);
    builder.writeNumber(source.x7);
    builder.writeNumber(source.x8);
    builder.writeNumber(source.x9);
    builder.writeNumber(source.x10);
    builder.writeNumber(source.x11);
    builder.writeNumber(source.x12);
    builder.writeNumber(source.x13);
    builder.writeNumber(source.x14);
    builder.writeNumber(source.x15);
    builder.writeNumber(source.x16);
    builder.writeNumber(source.x17);
    builder.writeNumber(source.x18);
    builder.writeNumber(source.x19);
    builder.writeNumber(source.x20);
    builder.writeNumber(source.x21);
    builder.writeNumber(source.x22);
    builder.writeNumber(source.x23);
    builder.writeNumber(source.x24);
    builder.writeNumber(source.x25);
    builder.writeNumber(source.x26);
    builder.writeNumber(source.x27);
    builder.writeNumber(source.x28);
    builder.writeNumber(source.x29);
    builder.writeNumber(source.x30);
    builder.writeNumber(source.x31);
    builder.writeNumber(source.x32);
    return builder.build();
}
function dictValueParserLongStruct32() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeLongStruct32(src)).endCell());
        },
        parse: (src) => {
            return loadLongStruct32(src.loadRef().beginParse());
        }
    };
}
function storeLongNestedStruct(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.x1, 257);
        b_0.storeInt(src.x2, 257);
        b_0.storeInt(src.x3, 257);
        const b_1 = new core_1.Builder();
        b_1.storeInt(src.x4, 257);
        b_1.storeInt(src.x5, 257);
        b_1.storeInt(src.x6, 257);
        const b_2 = new core_1.Builder();
        b_2.storeInt(src.x7, 257);
        b_2.storeInt(src.x8, 257);
        b_2.storeInt(src.x9, 257);
        const b_3 = new core_1.Builder();
        b_3.storeInt(src.x10, 257);
        b_3.storeInt(src.x11, 257);
        b_3.storeInt(src.x12, 257);
        const b_4 = new core_1.Builder();
        b_4.storeInt(src.x13, 257);
        b_4.storeInt(src.x14, 257);
        b_4.storeInt(src.x15, 257);
        const b_5 = new core_1.Builder();
        b_5.storeInt(src.x16, 257);
        b_5.storeInt(src.x17, 257);
        b_5.storeInt(src.x18, 257);
        const b_6 = new core_1.Builder();
        b_6.storeInt(src.x19, 257);
        b_6.storeInt(src.x20, 257);
        const b_7 = new core_1.Builder();
        b_7.store(storeLongStruct15(src.s1));
        const b_8 = new core_1.Builder();
        b_8.store(storeLongStruct16(src.s2));
        const b_9 = new core_1.Builder();
        b_9.store(storeLongStruct32(src.s3));
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
function loadLongNestedStruct(slice) {
    const sc_0 = slice;
    const _x1 = sc_0.loadIntBig(257);
    const _x2 = sc_0.loadIntBig(257);
    const _x3 = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _x4 = sc_1.loadIntBig(257);
    const _x5 = sc_1.loadIntBig(257);
    const _x6 = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _x7 = sc_2.loadIntBig(257);
    const _x8 = sc_2.loadIntBig(257);
    const _x9 = sc_2.loadIntBig(257);
    const sc_3 = sc_2.loadRef().beginParse();
    const _x10 = sc_3.loadIntBig(257);
    const _x11 = sc_3.loadIntBig(257);
    const _x12 = sc_3.loadIntBig(257);
    const sc_4 = sc_3.loadRef().beginParse();
    const _x13 = sc_4.loadIntBig(257);
    const _x14 = sc_4.loadIntBig(257);
    const _x15 = sc_4.loadIntBig(257);
    const sc_5 = sc_4.loadRef().beginParse();
    const _x16 = sc_5.loadIntBig(257);
    const _x17 = sc_5.loadIntBig(257);
    const _x18 = sc_5.loadIntBig(257);
    const sc_6 = sc_5.loadRef().beginParse();
    const _x19 = sc_6.loadIntBig(257);
    const _x20 = sc_6.loadIntBig(257);
    const sc_7 = sc_6.loadRef().beginParse();
    const _s1 = loadLongStruct15(sc_7);
    const sc_8 = sc_7.loadRef().beginParse();
    const _s2 = loadLongStruct16(sc_8);
    const sc_9 = sc_8.loadRef().beginParse();
    const _s3 = loadLongStruct32(sc_9);
    return { $$type: 'LongNestedStruct', x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20, s1: _s1, s2: _s2, s3: _s3 };
}
function loadTupleLongNestedStruct(source) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    source = source.readTuple();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    const _x17 = source.readBigNumber();
    const _x18 = source.readBigNumber();
    const _x19 = source.readBigNumber();
    const _x20 = source.readBigNumber();
    const _s1 = loadTupleLongStruct15(source);
    const _s2 = loadTupleLongStruct16(source);
    const _s3 = loadTupleLongStruct32(source);
    return { $$type: 'LongNestedStruct', x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20, s1: _s1, s2: _s2, s3: _s3 };
}
function loadGetterTupleLongNestedStruct(source) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    const _x17 = source.readBigNumber();
    const _x18 = source.readBigNumber();
    const _x19 = source.readBigNumber();
    const _x20 = source.readBigNumber();
    const _s1 = loadGetterTupleLongStruct15(source);
    const _s2 = loadGetterTupleLongStruct16(source);
    const _s3 = loadGetterTupleLongStruct32(source);
    return { $$type: 'LongNestedStruct', x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20, s1: _s1, s2: _s2, s3: _s3 };
}
function storeTupleLongNestedStruct(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.x1);
    builder.writeNumber(source.x2);
    builder.writeNumber(source.x3);
    builder.writeNumber(source.x4);
    builder.writeNumber(source.x5);
    builder.writeNumber(source.x6);
    builder.writeNumber(source.x7);
    builder.writeNumber(source.x8);
    builder.writeNumber(source.x9);
    builder.writeNumber(source.x10);
    builder.writeNumber(source.x11);
    builder.writeNumber(source.x12);
    builder.writeNumber(source.x13);
    builder.writeNumber(source.x14);
    builder.writeNumber(source.x15);
    builder.writeNumber(source.x16);
    builder.writeNumber(source.x17);
    builder.writeNumber(source.x18);
    builder.writeNumber(source.x19);
    builder.writeNumber(source.x20);
    builder.writeTuple(storeTupleLongStruct15(source.s1));
    builder.writeTuple(storeTupleLongStruct16(source.s2));
    builder.writeTuple(storeTupleLongStruct32(source.s3));
    return builder.build();
}
function dictValueParserLongNestedStruct() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeLongNestedStruct(src)).endCell());
        },
        parse: (src) => {
            return loadLongNestedStruct(src.loadRef().beginParse());
        }
    };
}
function storeLongNestedStructWithOpts(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.x1, 257);
        b_0.storeInt(src.x2, 257);
        b_0.storeInt(src.x3, 257);
        const b_1 = new core_1.Builder();
        b_1.storeInt(src.x4, 257);
        b_1.storeInt(src.x5, 257);
        b_1.storeInt(src.x6, 257);
        const b_2 = new core_1.Builder();
        b_2.storeInt(src.x7, 257);
        b_2.storeInt(src.x8, 257);
        b_2.storeInt(src.x9, 257);
        const b_3 = new core_1.Builder();
        b_3.storeInt(src.x10, 257);
        b_3.storeInt(src.x11, 257);
        b_3.storeInt(src.x12, 257);
        const b_4 = new core_1.Builder();
        b_4.storeInt(src.x13, 257);
        b_4.storeInt(src.x14, 257);
        b_4.storeInt(src.x15, 257);
        const b_5 = new core_1.Builder();
        b_5.storeInt(src.x16, 257);
        b_5.storeInt(src.x17, 257);
        if (src.x18 !== null && src.x18 !== undefined) {
            b_5.storeBit(true).storeInt(src.x18, 257);
        }
        else {
            b_5.storeBit(false);
        }
        const b_6 = new core_1.Builder();
        b_6.storeInt(src.x19, 257);
        b_6.storeInt(src.x20, 257);
        const b_7 = new core_1.Builder();
        if (src.s1 !== null && src.s1 !== undefined) {
            b_7.storeBit(true);
            b_7.store(storeLongStruct15(src.s1));
        }
        else {
            b_7.storeBit(false);
        }
        const b_8 = new core_1.Builder();
        b_8.store(storeLongStruct16(src.s2));
        const b_9 = new core_1.Builder();
        if (src.s3 !== null && src.s3 !== undefined) {
            b_9.storeBit(true);
            b_9.store(storeLongStruct32(src.s3));
        }
        else {
            b_9.storeBit(false);
        }
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
function loadLongNestedStructWithOpts(slice) {
    const sc_0 = slice;
    const _x1 = sc_0.loadIntBig(257);
    const _x2 = sc_0.loadIntBig(257);
    const _x3 = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _x4 = sc_1.loadIntBig(257);
    const _x5 = sc_1.loadIntBig(257);
    const _x6 = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _x7 = sc_2.loadIntBig(257);
    const _x8 = sc_2.loadIntBig(257);
    const _x9 = sc_2.loadIntBig(257);
    const sc_3 = sc_2.loadRef().beginParse();
    const _x10 = sc_3.loadIntBig(257);
    const _x11 = sc_3.loadIntBig(257);
    const _x12 = sc_3.loadIntBig(257);
    const sc_4 = sc_3.loadRef().beginParse();
    const _x13 = sc_4.loadIntBig(257);
    const _x14 = sc_4.loadIntBig(257);
    const _x15 = sc_4.loadIntBig(257);
    const sc_5 = sc_4.loadRef().beginParse();
    const _x16 = sc_5.loadIntBig(257);
    const _x17 = sc_5.loadIntBig(257);
    const _x18 = sc_5.loadBit() ? sc_5.loadIntBig(257) : null;
    const sc_6 = sc_5.loadRef().beginParse();
    const _x19 = sc_6.loadIntBig(257);
    const _x20 = sc_6.loadIntBig(257);
    const sc_7 = sc_6.loadRef().beginParse();
    const _s1 = sc_7.loadBit() ? loadLongStruct15(sc_7) : null;
    const sc_8 = sc_7.loadRef().beginParse();
    const _s2 = loadLongStruct16(sc_8);
    const sc_9 = sc_8.loadRef().beginParse();
    const _s3 = sc_9.loadBit() ? loadLongStruct32(sc_9) : null;
    return { $$type: 'LongNestedStructWithOpts', x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20, s1: _s1, s2: _s2, s3: _s3 };
}
function loadTupleLongNestedStructWithOpts(source) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    source = source.readTuple();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    const _x17 = source.readBigNumber();
    const _x18 = source.readBigNumberOpt();
    const _x19 = source.readBigNumber();
    const _x20 = source.readBigNumber();
    const _s1_p = source.readTupleOpt();
    const _s1 = _s1_p ? loadTupleLongStruct15(_s1_p) : null;
    const _s2 = loadTupleLongStruct16(source);
    const _s3_p = source.readTupleOpt();
    const _s3 = _s3_p ? loadTupleLongStruct32(_s3_p) : null;
    return { $$type: 'LongNestedStructWithOpts', x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20, s1: _s1, s2: _s2, s3: _s3 };
}
function loadGetterTupleLongNestedStructWithOpts(source) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    const _x17 = source.readBigNumber();
    const _x18 = source.readBigNumberOpt();
    const _x19 = source.readBigNumber();
    const _x20 = source.readBigNumber();
    const _s1_p = source.readTupleOpt();
    const _s1 = _s1_p ? loadTupleLongStruct15(_s1_p) : null;
    const _s2 = loadGetterTupleLongStruct16(source);
    const _s3_p = source.readTupleOpt();
    const _s3 = _s3_p ? loadTupleLongStruct32(_s3_p) : null;
    return { $$type: 'LongNestedStructWithOpts', x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20, s1: _s1, s2: _s2, s3: _s3 };
}
function storeTupleLongNestedStructWithOpts(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.x1);
    builder.writeNumber(source.x2);
    builder.writeNumber(source.x3);
    builder.writeNumber(source.x4);
    builder.writeNumber(source.x5);
    builder.writeNumber(source.x6);
    builder.writeNumber(source.x7);
    builder.writeNumber(source.x8);
    builder.writeNumber(source.x9);
    builder.writeNumber(source.x10);
    builder.writeNumber(source.x11);
    builder.writeNumber(source.x12);
    builder.writeNumber(source.x13);
    builder.writeNumber(source.x14);
    builder.writeNumber(source.x15);
    builder.writeNumber(source.x16);
    builder.writeNumber(source.x17);
    builder.writeNumber(source.x18);
    builder.writeNumber(source.x19);
    builder.writeNumber(source.x20);
    if (source.s1 !== null && source.s1 !== undefined) {
        builder.writeTuple(storeTupleLongStruct15(source.s1));
    }
    else {
        builder.writeTuple(null);
    }
    builder.writeTuple(storeTupleLongStruct16(source.s2));
    if (source.s3 !== null && source.s3 !== undefined) {
        builder.writeTuple(storeTupleLongStruct32(source.s3));
    }
    else {
        builder.writeTuple(null);
    }
    return builder.build();
}
function dictValueParserLongNestedStructWithOpts() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeLongNestedStructWithOpts(src)).endCell());
        },
        parse: (src) => {
            return loadLongNestedStructWithOpts(src.loadRef().beginParse());
        }
    };
}
function storePoint(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.x, 64);
        b_0.storeInt(src.y, 64);
    };
}
function loadPoint(slice) {
    const sc_0 = slice;
    const _x = sc_0.loadIntBig(64);
    const _y = sc_0.loadIntBig(64);
    return { $$type: 'Point', x: _x, y: _y };
}
function loadTuplePoint(source) {
    const _x = source.readBigNumber();
    const _y = source.readBigNumber();
    return { $$type: 'Point', x: _x, y: _y };
}
function loadGetterTuplePoint(source) {
    const _x = source.readBigNumber();
    const _y = source.readBigNumber();
    return { $$type: 'Point', x: _x, y: _y };
}
function storeTuplePoint(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.x);
    builder.writeNumber(source.y);
    return builder.build();
}
function dictValueParserPoint() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storePoint(src)).endCell());
        },
        parse: (src) => {
            return loadPoint(src.loadRef().beginParse());
        }
    };
}
function storeLine(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.store(storePoint(src.start));
        b_0.store(storePoint(src.end));
    };
}
function loadLine(slice) {
    const sc_0 = slice;
    const _start = loadPoint(sc_0);
    const _end = loadPoint(sc_0);
    return { $$type: 'Line', start: _start, end: _end };
}
function loadTupleLine(source) {
    const _start = loadTuplePoint(source);
    const _end = loadTuplePoint(source);
    return { $$type: 'Line', start: _start, end: _end };
}
function loadGetterTupleLine(source) {
    const _start = loadGetterTuplePoint(source);
    const _end = loadGetterTuplePoint(source);
    return { $$type: 'Line', start: _start, end: _end };
}
function storeTupleLine(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeTuple(storeTuplePoint(source.start));
    builder.writeTuple(storeTuplePoint(source.end));
    return builder.build();
}
function dictValueParserLine() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeLine(src)).endCell());
        },
        parse: (src) => {
            return loadLine(src.loadRef().beginParse());
        }
    };
}
function storeLocation(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.idx, 257);
        b_0.store(storeLine(src.line1));
        if (src.line2 !== null && src.line2 !== undefined) {
            b_0.storeBit(true);
            b_0.store(storeLine(src.line2));
        }
        else {
            b_0.storeBit(false);
        }
    };
}
function loadLocation(slice) {
    const sc_0 = slice;
    const _idx = sc_0.loadIntBig(257);
    const _line1 = loadLine(sc_0);
    const _line2 = sc_0.loadBit() ? loadLine(sc_0) : null;
    return { $$type: 'Location', idx: _idx, line1: _line1, line2: _line2 };
}
function loadTupleLocation(source) {
    const _idx = source.readBigNumber();
    const _line1 = loadTupleLine(source);
    const _line2_p = source.readTupleOpt();
    const _line2 = _line2_p ? loadTupleLine(_line2_p) : null;
    return { $$type: 'Location', idx: _idx, line1: _line1, line2: _line2 };
}
function loadGetterTupleLocation(source) {
    const _idx = source.readBigNumber();
    const _line1 = loadGetterTupleLine(source);
    const _line2_p = source.readTupleOpt();
    const _line2 = _line2_p ? loadTupleLine(_line2_p) : null;
    return { $$type: 'Location', idx: _idx, line1: _line1, line2: _line2 };
}
function storeTupleLocation(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.idx);
    builder.writeTuple(storeTupleLine(source.line1));
    if (source.line2 !== null && source.line2 !== undefined) {
        builder.writeTuple(storeTupleLine(source.line2));
    }
    else {
        builder.writeTuple(null);
    }
    return builder.build();
}
function dictValueParserLocation() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeLocation(src)).endCell());
        },
        parse: (src) => {
            return loadLocation(src.loadRef().beginParse());
        }
    };
}
function storeDoubleNestedStructOpt(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
        if (src.s !== null && src.s !== undefined) {
            b_0.storeBit(true);
            b_0.store(storeMyStruct1(src.s));
        }
        else {
            b_0.storeBit(false);
        }
    };
}
function loadDoubleNestedStructOpt(slice) {
    const sc_0 = slice;
    const _a = sc_0.loadIntBig(257);
    const _s = sc_0.loadBit() ? loadMyStruct1(sc_0) : null;
    return { $$type: 'DoubleNestedStructOpt', a: _a, s: _s };
}
function loadTupleDoubleNestedStructOpt(source) {
    const _a = source.readBigNumber();
    const _s_p = source.readTupleOpt();
    const _s = _s_p ? loadTupleMyStruct1(_s_p) : null;
    return { $$type: 'DoubleNestedStructOpt', a: _a, s: _s };
}
function loadGetterTupleDoubleNestedStructOpt(source) {
    const _a = source.readBigNumber();
    const _s_p = source.readTupleOpt();
    const _s = _s_p ? loadTupleMyStruct1(_s_p) : null;
    return { $$type: 'DoubleNestedStructOpt', a: _a, s: _s };
}
function storeTupleDoubleNestedStructOpt(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.a);
    if (source.s !== null && source.s !== undefined) {
        builder.writeTuple(storeTupleMyStruct1(source.s));
    }
    else {
        builder.writeTuple(null);
    }
    return builder.build();
}
function dictValueParserDoubleNestedStructOpt() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeDoubleNestedStructOpt(src)).endCell());
        },
        parse: (src) => {
            return loadDoubleNestedStructOpt(src.loadRef().beginParse());
        }
    };
}
function storeTripleNestedStructOpt(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
        const b_1 = new core_1.Builder();
        if (src.s !== null && src.s !== undefined) {
            b_1.storeBit(true);
            b_1.store(storeDoubleNestedStructOpt(src.s));
        }
        else {
            b_1.storeBit(false);
        }
        b_0.storeRef(b_1.endCell());
    };
}
function loadTripleNestedStructOpt(slice) {
    const sc_0 = slice;
    const _a = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _s = sc_1.loadBit() ? loadDoubleNestedStructOpt(sc_1) : null;
    return { $$type: 'TripleNestedStructOpt', a: _a, s: _s };
}
function loadTupleTripleNestedStructOpt(source) {
    const _a = source.readBigNumber();
    const _s_p = source.readTupleOpt();
    const _s = _s_p ? loadTupleDoubleNestedStructOpt(_s_p) : null;
    return { $$type: 'TripleNestedStructOpt', a: _a, s: _s };
}
function loadGetterTupleTripleNestedStructOpt(source) {
    const _a = source.readBigNumber();
    const _s_p = source.readTupleOpt();
    const _s = _s_p ? loadTupleDoubleNestedStructOpt(_s_p) : null;
    return { $$type: 'TripleNestedStructOpt', a: _a, s: _s };
}
function storeTupleTripleNestedStructOpt(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.a);
    if (source.s !== null && source.s !== undefined) {
        builder.writeTuple(storeTupleDoubleNestedStructOpt(source.s));
    }
    else {
        builder.writeTuple(null);
    }
    return builder.build();
}
function dictValueParserTripleNestedStructOpt() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeTripleNestedStructOpt(src)).endCell());
        },
        parse: (src) => {
            return loadTripleNestedStructOpt(src.loadRef().beginParse());
        }
    };
}
function storeLongAndDeepNestedStruct(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.x1, 257);
        b_0.storeInt(src.x2, 257);
        b_0.storeInt(src.x3, 257);
        const b_1 = new core_1.Builder();
        b_1.storeInt(src.x4, 257);
        b_1.storeInt(src.x5, 257);
        b_1.storeInt(src.x6, 257);
        const b_2 = new core_1.Builder();
        b_2.storeInt(src.x7, 257);
        b_2.storeInt(src.x8, 257);
        b_2.storeInt(src.x9, 257);
        const b_3 = new core_1.Builder();
        b_3.storeInt(src.x10, 257);
        b_3.storeInt(src.x11, 257);
        b_3.storeInt(src.x12, 257);
        const b_4 = new core_1.Builder();
        b_4.storeInt(src.x13, 257);
        b_4.storeInt(src.x14, 257);
        b_4.storeInt(src.x15, 257);
        const b_5 = new core_1.Builder();
        b_5.storeInt(src.x16, 257);
        b_5.store(storeTripleNestedStructOpt(src.s1));
        b_5.store(storeTripleNestedStructOpt(src.s2));
        const b_6 = new core_1.Builder();
        if (src.s3 !== null && src.s3 !== undefined) {
            b_6.storeBit(true);
            b_6.store(storeTripleNestedStructOpt(src.s3));
        }
        else {
            b_6.storeBit(false);
        }
        if (src.s4 !== null && src.s4 !== undefined) {
            b_6.storeBit(true);
            b_6.store(storeTripleNestedStructOpt(src.s4));
        }
        else {
            b_6.storeBit(false);
        }
        b_5.storeRef(b_6.endCell());
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}
function loadLongAndDeepNestedStruct(slice) {
    const sc_0 = slice;
    const _x1 = sc_0.loadIntBig(257);
    const _x2 = sc_0.loadIntBig(257);
    const _x3 = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _x4 = sc_1.loadIntBig(257);
    const _x5 = sc_1.loadIntBig(257);
    const _x6 = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _x7 = sc_2.loadIntBig(257);
    const _x8 = sc_2.loadIntBig(257);
    const _x9 = sc_2.loadIntBig(257);
    const sc_3 = sc_2.loadRef().beginParse();
    const _x10 = sc_3.loadIntBig(257);
    const _x11 = sc_3.loadIntBig(257);
    const _x12 = sc_3.loadIntBig(257);
    const sc_4 = sc_3.loadRef().beginParse();
    const _x13 = sc_4.loadIntBig(257);
    const _x14 = sc_4.loadIntBig(257);
    const _x15 = sc_4.loadIntBig(257);
    const sc_5 = sc_4.loadRef().beginParse();
    const _x16 = sc_5.loadIntBig(257);
    const _s1 = loadTripleNestedStructOpt(sc_5);
    const _s2 = loadTripleNestedStructOpt(sc_5);
    const sc_6 = sc_5.loadRef().beginParse();
    const _s3 = sc_6.loadBit() ? loadTripleNestedStructOpt(sc_6) : null;
    const _s4 = sc_6.loadBit() ? loadTripleNestedStructOpt(sc_6) : null;
    return { $$type: 'LongAndDeepNestedStruct', x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, s1: _s1, s2: _s2, s3: _s3, s4: _s4 };
}
function loadTupleLongAndDeepNestedStruct(source) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    source = source.readTuple();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    const _s1 = loadTupleTripleNestedStructOpt(source);
    const _s2 = loadTupleTripleNestedStructOpt(source);
    const _s3_p = source.readTupleOpt();
    const _s3 = _s3_p ? loadTupleTripleNestedStructOpt(_s3_p) : null;
    const _s4_p = source.readTupleOpt();
    const _s4 = _s4_p ? loadTupleTripleNestedStructOpt(_s4_p) : null;
    return { $$type: 'LongAndDeepNestedStruct', x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, s1: _s1, s2: _s2, s3: _s3, s4: _s4 };
}
function loadGetterTupleLongAndDeepNestedStruct(source) {
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    const _s1 = loadGetterTupleTripleNestedStructOpt(source);
    const _s2 = loadGetterTupleTripleNestedStructOpt(source);
    const _s3_p = source.readTupleOpt();
    const _s3 = _s3_p ? loadTupleTripleNestedStructOpt(_s3_p) : null;
    const _s4_p = source.readTupleOpt();
    const _s4 = _s4_p ? loadTupleTripleNestedStructOpt(_s4_p) : null;
    return { $$type: 'LongAndDeepNestedStruct', x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, s1: _s1, s2: _s2, s3: _s3, s4: _s4 };
}
function storeTupleLongAndDeepNestedStruct(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.x1);
    builder.writeNumber(source.x2);
    builder.writeNumber(source.x3);
    builder.writeNumber(source.x4);
    builder.writeNumber(source.x5);
    builder.writeNumber(source.x6);
    builder.writeNumber(source.x7);
    builder.writeNumber(source.x8);
    builder.writeNumber(source.x9);
    builder.writeNumber(source.x10);
    builder.writeNumber(source.x11);
    builder.writeNumber(source.x12);
    builder.writeNumber(source.x13);
    builder.writeNumber(source.x14);
    builder.writeNumber(source.x15);
    builder.writeNumber(source.x16);
    builder.writeTuple(storeTupleTripleNestedStructOpt(source.s1));
    builder.writeTuple(storeTupleTripleNestedStructOpt(source.s2));
    if (source.s3 !== null && source.s3 !== undefined) {
        builder.writeTuple(storeTupleTripleNestedStructOpt(source.s3));
    }
    else {
        builder.writeTuple(null);
    }
    if (source.s4 !== null && source.s4 !== undefined) {
        builder.writeTuple(storeTupleTripleNestedStructOpt(source.s4));
    }
    else {
        builder.writeTuple(null);
    }
    return builder.build();
}
function dictValueParserLongAndDeepNestedStruct() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeLongAndDeepNestedStruct(src)).endCell());
        },
        parse: (src) => {
            return loadLongAndDeepNestedStruct(src.loadRef().beginParse());
        }
    };
}
function storeFoo(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(42, 32);
        b_0.storeBuilder(src.s.asBuilder());
    };
}
function loadFoo(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 42) {
        throw Error('Invalid prefix');
    }
    const _s = sc_0;
    return { $$type: 'Foo', s: _s };
}
function loadTupleFoo(source) {
    const _s = source.readCell().asSlice();
    return { $$type: 'Foo', s: _s };
}
function loadGetterTupleFoo(source) {
    const _s = source.readCell().asSlice();
    return { $$type: 'Foo', s: _s };
}
function storeTupleFoo(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeSlice(source.s.asCell());
    return builder.build();
}
function dictValueParserFoo() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeFoo(src)).endCell());
        },
        parse: (src) => {
            return loadFoo(src.loadRef().beginParse());
        }
    };
}
function storeDict(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeDict(src.m, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigVarUint(4));
    };
}
function loadDict(slice) {
    const sc_0 = slice;
    const _m = core_1.Dictionary.load(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigVarUint(4), sc_0);
    return { $$type: 'Dict', m: _m };
}
function loadTupleDict(source) {
    const _m = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigVarUint(4), source.readCellOpt());
    return { $$type: 'Dict', m: _m };
}
function loadGetterTupleDict(source) {
    const _m = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigVarUint(4), source.readCellOpt());
    return { $$type: 'Dict', m: _m };
}
function storeTupleDict(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeCell(source.m.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.m, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigVarUint(4)).endCell() : null);
    return builder.build();
}
function dictValueParserDict() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeDict(src)).endCell());
        },
        parse: (src) => {
            return loadDict(src.loadRef().beginParse());
        }
    };
}
function storeOptionalFields(src) {
    return (builder) => {
        const b_0 = builder;
        if (src.nickname !== null && src.nickname !== undefined) {
            b_0.storeBit(true).storeStringRefTail(src.nickname);
        }
        else {
            b_0.storeBit(false);
        }
        if (src.avatar !== null && src.avatar !== undefined) {
            b_0.storeBit(true).storeStringRefTail(src.avatar);
        }
        else {
            b_0.storeBit(false);
        }
    };
}
function loadOptionalFields(slice) {
    const sc_0 = slice;
    const _nickname = sc_0.loadBit() ? sc_0.loadStringRefTail() : null;
    const _avatar = sc_0.loadBit() ? sc_0.loadStringRefTail() : null;
    return { $$type: 'OptionalFields', nickname: _nickname, avatar: _avatar };
}
function loadTupleOptionalFields(source) {
    const _nickname = source.readStringOpt();
    const _avatar = source.readStringOpt();
    return { $$type: 'OptionalFields', nickname: _nickname, avatar: _avatar };
}
function loadGetterTupleOptionalFields(source) {
    const _nickname = source.readStringOpt();
    const _avatar = source.readStringOpt();
    return { $$type: 'OptionalFields', nickname: _nickname, avatar: _avatar };
}
function storeTupleOptionalFields(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.nickname);
    builder.writeString(source.avatar);
    return builder.build();
}
function dictValueParserOptionalFields() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeOptionalFields(src)).endCell());
        },
        parse: (src) => {
            return loadOptionalFields(src.loadRef().beginParse());
        }
    };
}
function storeS1(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
        b_0.storeInt(src.b, 257);
        b_0.storeInt(src.c, 257);
    };
}
function loadS1(slice) {
    const sc_0 = slice;
    const _a = sc_0.loadIntBig(257);
    const _b = sc_0.loadIntBig(257);
    const _c = sc_0.loadIntBig(257);
    return { $$type: 'S1', a: _a, b: _b, c: _c };
}
function loadTupleS1(source) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    const _c = source.readBigNumber();
    return { $$type: 'S1', a: _a, b: _b, c: _c };
}
function loadGetterTupleS1(source) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    const _c = source.readBigNumber();
    return { $$type: 'S1', a: _a, b: _b, c: _c };
}
function storeTupleS1(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeNumber(source.b);
    builder.writeNumber(source.c);
    return builder.build();
}
function dictValueParserS1() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeS1(src)).endCell());
        },
        parse: (src) => {
            return loadS1(src.loadRef().beginParse());
        }
    };
}
function storeStructsTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.store(storeS(src.s1));
        b_0.store(storeS(src.s2));
        const b_1 = new core_1.Builder();
        b_1.store(storeT(src.t1));
        const b_2 = new core_1.Builder();
        b_2.store(storeT(src.t2));
        b_2.storeDict(src.mapWithLongStructs15, core_1.Dictionary.Keys.BigInt(257), dictValueParserLongStruct15());
        b_2.storeDict(src.mapWithLongStructs16, core_1.Dictionary.Keys.BigInt(257), dictValueParserLongStruct16());
        b_2.storeDict(src.mapWithLongStructs32, core_1.Dictionary.Keys.BigInt(257), dictValueParserLongStruct32());
        b_2.storeInt(src.x1, 257);
        const b_3 = new core_1.Builder();
        b_3.storeInt(src.x2, 257);
        b_3.storeInt(src.x3, 257);
        b_3.storeInt(src.x4, 257);
        const b_4 = new core_1.Builder();
        b_4.storeInt(src.x5, 257);
        b_4.storeInt(src.x6, 257);
        b_4.storeInt(src.x7, 257);
        const b_5 = new core_1.Builder();
        b_5.storeInt(src.x8, 257);
        b_5.storeInt(src.x9, 257);
        b_5.storeInt(src.x10, 257);
        const b_6 = new core_1.Builder();
        b_6.storeInt(src.x11, 257);
        b_6.storeInt(src.x12, 257);
        b_6.storeInt(src.x13, 257);
        const b_7 = new core_1.Builder();
        b_7.storeInt(src.x14, 257);
        b_7.storeInt(src.x15, 257);
        b_7.storeInt(src.x16, 257);
        const b_8 = new core_1.Builder();
        b_8.storeInt(src.x17, 257);
        b_8.storeInt(src.x18, 257);
        b_8.storeInt(src.x19, 257);
        const b_9 = new core_1.Builder();
        b_9.storeInt(src.x20, 257);
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
function loadStructsTester$Data(slice) {
    const sc_0 = slice;
    const _s1 = loadS(sc_0);
    const _s2 = loadS(sc_0);
    const sc_1 = sc_0.loadRef().beginParse();
    const _t1 = loadT(sc_1);
    const sc_2 = sc_1.loadRef().beginParse();
    const _t2 = loadT(sc_2);
    const _mapWithLongStructs15 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserLongStruct15(), sc_2);
    const _mapWithLongStructs16 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserLongStruct16(), sc_2);
    const _mapWithLongStructs32 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserLongStruct32(), sc_2);
    const _x1 = sc_2.loadIntBig(257);
    const sc_3 = sc_2.loadRef().beginParse();
    const _x2 = sc_3.loadIntBig(257);
    const _x3 = sc_3.loadIntBig(257);
    const _x4 = sc_3.loadIntBig(257);
    const sc_4 = sc_3.loadRef().beginParse();
    const _x5 = sc_4.loadIntBig(257);
    const _x6 = sc_4.loadIntBig(257);
    const _x7 = sc_4.loadIntBig(257);
    const sc_5 = sc_4.loadRef().beginParse();
    const _x8 = sc_5.loadIntBig(257);
    const _x9 = sc_5.loadIntBig(257);
    const _x10 = sc_5.loadIntBig(257);
    const sc_6 = sc_5.loadRef().beginParse();
    const _x11 = sc_6.loadIntBig(257);
    const _x12 = sc_6.loadIntBig(257);
    const _x13 = sc_6.loadIntBig(257);
    const sc_7 = sc_6.loadRef().beginParse();
    const _x14 = sc_7.loadIntBig(257);
    const _x15 = sc_7.loadIntBig(257);
    const _x16 = sc_7.loadIntBig(257);
    const sc_8 = sc_7.loadRef().beginParse();
    const _x17 = sc_8.loadIntBig(257);
    const _x18 = sc_8.loadIntBig(257);
    const _x19 = sc_8.loadIntBig(257);
    const sc_9 = sc_8.loadRef().beginParse();
    const _x20 = sc_9.loadIntBig(257);
    return { $$type: 'StructsTester$Data', s1: _s1, s2: _s2, t1: _t1, t2: _t2, mapWithLongStructs15: _mapWithLongStructs15, mapWithLongStructs16: _mapWithLongStructs16, mapWithLongStructs32: _mapWithLongStructs32, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20 };
}
function loadTupleStructsTester$Data(source) {
    const _s1 = loadTupleS(source);
    const _s2 = loadTupleS(source);
    const _t1 = loadTupleT(source);
    const _t2 = loadTupleT(source);
    const _mapWithLongStructs15 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserLongStruct15(), source.readCellOpt());
    const _mapWithLongStructs16 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserLongStruct16(), source.readCellOpt());
    const _mapWithLongStructs32 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserLongStruct32(), source.readCellOpt());
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    source = source.readTuple();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    const _x17 = source.readBigNumber();
    const _x18 = source.readBigNumber();
    const _x19 = source.readBigNumber();
    const _x20 = source.readBigNumber();
    return { $$type: 'StructsTester$Data', s1: _s1, s2: _s2, t1: _t1, t2: _t2, mapWithLongStructs15: _mapWithLongStructs15, mapWithLongStructs16: _mapWithLongStructs16, mapWithLongStructs32: _mapWithLongStructs32, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20 };
}
function loadGetterTupleStructsTester$Data(source) {
    const _s1 = loadGetterTupleS(source);
    const _s2 = loadGetterTupleS(source);
    const _t1 = loadGetterTupleT(source);
    const _t2 = loadGetterTupleT(source);
    const _mapWithLongStructs15 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserLongStruct15(), source.readCellOpt());
    const _mapWithLongStructs16 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserLongStruct16(), source.readCellOpt());
    const _mapWithLongStructs32 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserLongStruct32(), source.readCellOpt());
    const _x1 = source.readBigNumber();
    const _x2 = source.readBigNumber();
    const _x3 = source.readBigNumber();
    const _x4 = source.readBigNumber();
    const _x5 = source.readBigNumber();
    const _x6 = source.readBigNumber();
    const _x7 = source.readBigNumber();
    const _x8 = source.readBigNumber();
    const _x9 = source.readBigNumber();
    const _x10 = source.readBigNumber();
    const _x11 = source.readBigNumber();
    const _x12 = source.readBigNumber();
    const _x13 = source.readBigNumber();
    const _x14 = source.readBigNumber();
    const _x15 = source.readBigNumber();
    const _x16 = source.readBigNumber();
    const _x17 = source.readBigNumber();
    const _x18 = source.readBigNumber();
    const _x19 = source.readBigNumber();
    const _x20 = source.readBigNumber();
    return { $$type: 'StructsTester$Data', s1: _s1, s2: _s2, t1: _t1, t2: _t2, mapWithLongStructs15: _mapWithLongStructs15, mapWithLongStructs16: _mapWithLongStructs16, mapWithLongStructs32: _mapWithLongStructs32, x1: _x1, x2: _x2, x3: _x3, x4: _x4, x5: _x5, x6: _x6, x7: _x7, x8: _x8, x9: _x9, x10: _x10, x11: _x11, x12: _x12, x13: _x13, x14: _x14, x15: _x15, x16: _x16, x17: _x17, x18: _x18, x19: _x19, x20: _x20 };
}
function storeTupleStructsTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeTuple(storeTupleS(source.s1));
    builder.writeTuple(storeTupleS(source.s2));
    builder.writeTuple(storeTupleT(source.t1));
    builder.writeTuple(storeTupleT(source.t2));
    builder.writeCell(source.mapWithLongStructs15.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.mapWithLongStructs15, core_1.Dictionary.Keys.BigInt(257), dictValueParserLongStruct15()).endCell() : null);
    builder.writeCell(source.mapWithLongStructs16.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.mapWithLongStructs16, core_1.Dictionary.Keys.BigInt(257), dictValueParserLongStruct16()).endCell() : null);
    builder.writeCell(source.mapWithLongStructs32.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.mapWithLongStructs32, core_1.Dictionary.Keys.BigInt(257), dictValueParserLongStruct32()).endCell() : null);
    builder.writeNumber(source.x1);
    builder.writeNumber(source.x2);
    builder.writeNumber(source.x3);
    builder.writeNumber(source.x4);
    builder.writeNumber(source.x5);
    builder.writeNumber(source.x6);
    builder.writeNumber(source.x7);
    builder.writeNumber(source.x8);
    builder.writeNumber(source.x9);
    builder.writeNumber(source.x10);
    builder.writeNumber(source.x11);
    builder.writeNumber(source.x12);
    builder.writeNumber(source.x13);
    builder.writeNumber(source.x14);
    builder.writeNumber(source.x15);
    builder.writeNumber(source.x16);
    builder.writeNumber(source.x17);
    builder.writeNumber(source.x18);
    builder.writeNumber(source.x19);
    builder.writeNumber(source.x20);
    return builder.build();
}
function dictValueParserStructsTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeStructsTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadStructsTester$Data(src.loadRef().beginParse());
        }
    };
}
function initStructsTester_init_args(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
async function StructsTester_init() {
    const __code = core_1.Cell.fromBase64('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ViJWIlYiViJWIlYyVjJWMlYyVjJWMlYyVjJWMlYyVjJWMlYyVjJWMnoB/BEpEUoRKREoEUkRKBEnEUgRJxEmEUcRJhElEUYRJREkEUURJBEjEUQRIxEiEUMRIhEhEUIRIREgEUERIBEfEUARHxEeET8RHhEdET4RHREcET0RHBEbETwRGxEaETsRGhEZEToRGREYETkRGBEXETgRFxEWETcRFhEVETYRFXsARFYyVjJWMlYyVjKAFYAWgBeAGIAZgBqAG4AcgB2AHoAfgCAB/BEUETURFBETETQRExESETMREhERETIREREQETEREA8RMA8OES8ODREuDQwRLQwLESwLChErCgkRKgkIESkIBxEoBwYRJwYFESYFBBElBAMRJAMCESMCAREiAREhERARIBEQDxEfDw4RHg4NER0NDBEcDAsRGwsKERoKCREZCXwASAgRGAgHERcHBhEWBgURFQUEERQEAxETAwIREgIBEREBERBV4AAScXJzdHVvA28CAhiqcNs82zxsxmzGbJbPgAIBIIGCABJ/fnyF/YX+hf8D76Ybtnm2eK5ArkCuQK5ArkCuQK5ArkCuQK5ArkCuQK5ArkCuQK5ArkCuQK5ArkCuQK5ArkCuQK5ArkCuQK5ArkCuQK5ArkKuPiI6IjwiOiI4IjoiOCI2IjgiNiI0IjYiNCIyIjQiMiIwIjIiMCIuIjAiLiIsIi4iLc+DhAKPppe2ebZ4riCuIK4griCuIK4griCuIK4griCuIK4griCuIK4griCuIK4griCuIK4griCuIK4griCuIK4griCuIK4griCuItg/z44B7HFyc3R1dnd4eXqAC4AMgA2ADoAPgBCAEYASgBOAFIAVgBaAF4AYgBmAGoAbgByAHYAegB+AIDBXHnGAIIEBASIDER8DER4RIBEeAxEdAxEcESARHAMRGwMRGhEgERoDERkDERgRIBEYAxEXAxEWESARFgMRFQOFAFQRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ4C6BEUESARFAMREwMREhEgERIDEREDERARIBEQED8OESAOED0MESAMEDsKESAKEDkIESAIEDcGESAGEDUEESAEAhEgAgERIQERIMgRIBEfER4RHREcERsRGhEZERgRFxEWERURFBETERIREREQVeDbPMkDERcD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');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initStructsTester_init_args({ $$type: 'StructsTester_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const StructsTester_errors = {
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
};
const StructsTester_types = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "S", "header": null, "fields": [{ "name": "a", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "T", "header": null, "fields": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "s", "type": { "kind": "simple", "type": "S", "optional": false } }] },
    { "name": "MyStruct1", "header": null, "fields": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 32 } }, { "name": "c", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }] },
    { "name": "MyStruct2", "header": null, "fields": [{ "name": "m", "type": { "kind": "dict", "key": "int", "value": "uint", "valueFormat": 64 } }, { "name": "s", "type": { "kind": "simple", "type": "MyStruct1", "optional": true } }] },
    { "name": "MyStruct3", "header": null, "fields": [{ "name": "s", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "MyMessage1", "header": 2844430700, "fields": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "s", "type": { "kind": "simple", "type": "MyStruct2", "optional": false } }] },
    { "name": "Coin", "header": null, "fields": [{ "name": "first", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "second", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 32 } }] },
    { "name": "VarIntegers", "header": null, "fields": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": "varint16" } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": "varint32" } }, { "name": "c", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "varuint16" } }, { "name": "d", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "varuint32" } }] },
    { "name": "IntFields", "header": null, "fields": [{ "name": "i1", "type": { "kind": "simple", "type": "int", "optional": false, "format": 1 } }, { "name": "i2", "type": { "kind": "simple", "type": "int", "optional": false, "format": 2 } }, { "name": "i3", "type": { "kind": "simple", "type": "int", "optional": false, "format": 3 } }, { "name": "i255", "type": { "kind": "simple", "type": "int", "optional": false, "format": 255 } }, { "name": "i256", "type": { "kind": "simple", "type": "int", "optional": false, "format": 256 } }, { "name": "i257", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "UintFields", "header": 3925996650, "fields": [{ "name": "u1", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 1 } }, { "name": "u2", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 2 } }, { "name": "u3", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 3 } }, { "name": "u254", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 254 } }, { "name": "u255", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 255 } }, { "name": "u256", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "LongStruct15", "header": null, "fields": [{ "name": "x1", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x2", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x3", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x4", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x5", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x6", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x7", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x9", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x10", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x11", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x12", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x13", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x14", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x15", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "LongStruct16", "header": null, "fields": [{ "name": "x1", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x2", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x3", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x4", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x5", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x6", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x7", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x9", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x10", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x11", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x12", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x13", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x14", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x15", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x16", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "LongStruct32", "header": null, "fields": [{ "name": "x1", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x2", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x3", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x4", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x5", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x6", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x7", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x9", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x10", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x11", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x12", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x13", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x14", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x15", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x16", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x17", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x18", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x19", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x20", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x21", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x22", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x23", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x24", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x25", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x26", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x27", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x28", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x29", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x30", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x31", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x32", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "LongNestedStruct", "header": null, "fields": [{ "name": "x1", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x2", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x3", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x4", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x5", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x6", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x7", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x9", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x10", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x11", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x12", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x13", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x14", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x15", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x16", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x17", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x18", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x19", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x20", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "s1", "type": { "kind": "simple", "type": "LongStruct15", "optional": false } }, { "name": "s2", "type": { "kind": "simple", "type": "LongStruct16", "optional": false } }, { "name": "s3", "type": { "kind": "simple", "type": "LongStruct32", "optional": false } }] },
    { "name": "LongNestedStructWithOpts", "header": null, "fields": [{ "name": "x1", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x2", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x3", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x4", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x5", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x6", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x7", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x9", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x10", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x11", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x12", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x13", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x14", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x15", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x16", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x17", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x18", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "x19", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x20", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "s1", "type": { "kind": "simple", "type": "LongStruct15", "optional": true } }, { "name": "s2", "type": { "kind": "simple", "type": "LongStruct16", "optional": false } }, { "name": "s3", "type": { "kind": "simple", "type": "LongStruct32", "optional": true } }] },
    { "name": "Point", "header": null, "fields": [{ "name": "x", "type": { "kind": "simple", "type": "int", "optional": false, "format": 64 } }, { "name": "y", "type": { "kind": "simple", "type": "int", "optional": false, "format": 64 } }] },
    { "name": "Line", "header": null, "fields": [{ "name": "start", "type": { "kind": "simple", "type": "Point", "optional": false } }, { "name": "end", "type": { "kind": "simple", "type": "Point", "optional": false } }] },
    { "name": "Location", "header": null, "fields": [{ "name": "idx", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "line1", "type": { "kind": "simple", "type": "Line", "optional": false } }, { "name": "line2", "type": { "kind": "simple", "type": "Line", "optional": true } }] },
    { "name": "DoubleNestedStructOpt", "header": null, "fields": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "s", "type": { "kind": "simple", "type": "MyStruct1", "optional": true } }] },
    { "name": "TripleNestedStructOpt", "header": null, "fields": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "s", "type": { "kind": "simple", "type": "DoubleNestedStructOpt", "optional": true } }] },
    { "name": "LongAndDeepNestedStruct", "header": null, "fields": [{ "name": "x1", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x2", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x3", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x4", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x5", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x6", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x7", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x9", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x10", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x11", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x12", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x13", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x14", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x15", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x16", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "s1", "type": { "kind": "simple", "type": "TripleNestedStructOpt", "optional": false } }, { "name": "s2", "type": { "kind": "simple", "type": "TripleNestedStructOpt", "optional": false } }, { "name": "s3", "type": { "kind": "simple", "type": "TripleNestedStructOpt", "optional": true } }, { "name": "s4", "type": { "kind": "simple", "type": "TripleNestedStructOpt", "optional": true } }] },
    { "name": "Foo", "header": 42, "fields": [{ "name": "s", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "Dict", "header": null, "fields": [{ "name": "m", "type": { "kind": "dict", "key": "uint", "keyFormat": 8, "value": "uint", "valueFormat": "coins" } }] },
    { "name": "OptionalFields", "header": null, "fields": [{ "name": "nickname", "type": { "kind": "simple", "type": "string", "optional": true } }, { "name": "avatar", "type": { "kind": "simple", "type": "string", "optional": true } }] },
    { "name": "S1", "header": null, "fields": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "c", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "StructsTester$Data", "header": null, "fields": [{ "name": "s1", "type": { "kind": "simple", "type": "S", "optional": false } }, { "name": "s2", "type": { "kind": "simple", "type": "S", "optional": false } }, { "name": "t1", "type": { "kind": "simple", "type": "T", "optional": false } }, { "name": "t2", "type": { "kind": "simple", "type": "T", "optional": false } }, { "name": "mapWithLongStructs15", "type": { "kind": "dict", "key": "int", "value": "LongStruct15", "valueFormat": "ref" } }, { "name": "mapWithLongStructs16", "type": { "kind": "dict", "key": "int", "value": "LongStruct16", "valueFormat": "ref" } }, { "name": "mapWithLongStructs32", "type": { "kind": "dict", "key": "int", "value": "LongStruct32", "valueFormat": "ref" } }, { "name": "x1", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x2", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x3", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x4", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x5", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x6", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x7", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x9", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x10", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x11", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x12", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x13", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x14", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x15", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x16", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x17", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x18", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x19", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "x20", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
];
const StructsTester_getters = [
    { "name": "structInitializerTest", "methodId": 69602, "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "toCell1", "methodId": 82862, "arguments": [{ "name": "s", "type": { "kind": "simple", "type": "MyStruct1", "optional": false } }], "returnType": { "kind": "simple", "type": "cell", "optional": false } },
    { "name": "toSlice1", "methodId": 69666, "arguments": [{ "name": "s", "type": { "kind": "simple", "type": "MyStruct1", "optional": false } }], "returnType": { "kind": "simple", "type": "slice", "optional": false } },
    { "name": "fromCell1", "methodId": 76221, "arguments": [{ "name": "src", "type": { "kind": "simple", "type": "cell", "optional": false } }], "returnType": { "kind": "simple", "type": "MyStruct1", "optional": false } },
    { "name": "fromSlice1", "methodId": 118478, "arguments": [{ "name": "src", "type": { "kind": "simple", "type": "slice", "optional": false } }], "returnType": { "kind": "simple", "type": "MyStruct1", "optional": false } },
    { "name": "toCell2", "methodId": 95181, "arguments": [{ "name": "s", "type": { "kind": "simple", "type": "MyStruct2", "optional": false } }], "returnType": { "kind": "simple", "type": "cell", "optional": false } },
    { "name": "fromCell2", "methodId": 72158, "arguments": [{ "name": "src", "type": { "kind": "simple", "type": "cell", "optional": false } }], "returnType": { "kind": "simple", "type": "MyStruct2", "optional": false } },
    { "name": "fromSlice2", "methodId": 130733, "arguments": [{ "name": "src", "type": { "kind": "simple", "type": "slice", "optional": false } }], "returnType": { "kind": "simple", "type": "MyStruct2", "optional": false } },
    { "name": "test1", "methodId": 70304, "arguments": [{ "name": "s1", "type": { "kind": "simple", "type": "MyStruct1", "optional": false } }, { "name": "s2", "type": { "kind": "simple", "type": "MyStruct2", "optional": false } }], "returnType": { "kind": "simple", "type": "cell", "optional": false } },
    { "name": "toCellMessage1", "methodId": 103675, "arguments": [{ "name": "m", "type": { "kind": "simple", "type": "MyMessage1", "optional": false } }], "returnType": { "kind": "simple", "type": "cell", "optional": false } },
    { "name": "fromCellMessage1", "methodId": 65739, "arguments": [{ "name": "src", "type": { "kind": "simple", "type": "cell", "optional": false } }], "returnType": { "kind": "simple", "type": "MyMessage1", "optional": false } },
    { "name": "fromSliceMessage1", "methodId": 100880, "arguments": [{ "name": "src", "type": { "kind": "simple", "type": "slice", "optional": false } }], "returnType": { "kind": "simple", "type": "MyMessage1", "optional": false } },
    { "name": "contractStructConstantImmediate", "methodId": 131046, "arguments": [], "returnType": { "kind": "simple", "type": "MyStruct3", "optional": false } },
    { "name": "globalConstStructConstantImmediate", "methodId": 96485, "arguments": [], "returnType": { "kind": "simple", "type": "MyStruct3", "optional": false } },
    { "name": "contractStructConstantFieldImmediate", "methodId": 115253, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "globalConstStructConstantFieldImmediate", "methodId": 72941, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "contractStructConstantViaVar", "methodId": 103564, "arguments": [], "returnType": { "kind": "simple", "type": "MyStruct3", "optional": false } },
    { "name": "globalConstStructConstantViaVar", "methodId": 105147, "arguments": [], "returnType": { "kind": "simple", "type": "MyStruct3", "optional": false } },
    { "name": "contractStructConstantFieldViaVar", "methodId": 97692, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "globalConstStructConstantFieldViaVar", "methodId": 118768, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "longStruct15Test", "methodId": 92569, "arguments": [], "returnType": { "kind": "simple", "type": "LongStruct15", "optional": false } },
    { "name": "longStruct16Test", "methodId": 100171, "arguments": [], "returnType": { "kind": "simple", "type": "LongStruct16", "optional": false } },
    { "name": "longStruct32Test", "methodId": 99597, "arguments": [], "returnType": { "kind": "simple", "type": "LongStruct32", "optional": false } },
    { "name": "longNestedStructTest", "methodId": 101744, "arguments": [], "returnType": { "kind": "simple", "type": "LongNestedStruct", "optional": false } },
    { "name": "longNestedStructWithOptsTest", "methodId": 103572, "arguments": [], "returnType": { "kind": "simple", "type": "LongNestedStructWithOpts", "optional": false } },
    { "name": "longContractTest", "methodId": 81181, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "location1", "methodId": 126791, "arguments": [], "returnType": { "kind": "simple", "type": "Location", "optional": false } },
    { "name": "location2", "methodId": 122660, "arguments": [], "returnType": { "kind": "simple", "type": "Location", "optional": false } },
    { "name": "tripleNestedStructOpt1", "methodId": 102164, "arguments": [], "returnType": { "kind": "simple", "type": "TripleNestedStructOpt", "optional": false } },
    { "name": "tripleNestedStructOpt2", "methodId": 114551, "arguments": [], "returnType": { "kind": "simple", "type": "TripleNestedStructOpt", "optional": false } },
    { "name": "tripleNestedStructOpt3", "methodId": 110422, "arguments": [], "returnType": { "kind": "simple", "type": "TripleNestedStructOpt", "optional": false } },
    { "name": "longAndDeepNestedStruct1", "methodId": 87259, "arguments": [], "returnType": { "kind": "simple", "type": "LongAndDeepNestedStruct", "optional": false } },
    { "name": "longAndDeepNestedStruct2", "methodId": 91320, "arguments": [], "returnType": { "kind": "simple", "type": "LongAndDeepNestedStruct", "optional": false } },
    { "name": "longAndDeepNestedStruct3", "methodId": 95385, "arguments": [], "returnType": { "kind": "simple", "type": "LongAndDeepNestedStruct", "optional": false } },
    { "name": "intFieldsStruct", "methodId": 98928, "arguments": [], "returnType": { "kind": "simple", "type": "IntFields", "optional": false } },
    { "name": "intFieldsFromCell", "methodId": 75138, "arguments": [{ "name": "src", "type": { "kind": "simple", "type": "cell", "optional": false } }], "returnType": { "kind": "simple", "type": "IntFields", "optional": false } },
    { "name": "uintFieldsMessage", "methodId": 72699, "arguments": [], "returnType": { "kind": "simple", "type": "UintFields", "optional": false } },
    { "name": "uintFieldsFromCell", "methodId": 121259, "arguments": [{ "name": "src", "type": { "kind": "simple", "type": "cell", "optional": false } }], "returnType": { "kind": "simple", "type": "UintFields", "optional": false } },
    { "name": "optionalFields", "methodId": 79909, "arguments": [], "returnType": { "kind": "simple", "type": "OptionalFields", "optional": false } },
    { "name": "destructuringTest1", "methodId": 121307, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "destructuringTest1Const", "methodId": 112759, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "destructuringTest2", "methodId": 125368, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "destructuringTest2Const", "methodId": 95895, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "destructuringTest3", "methodId": 129433, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "destructuringTest3Const", "methodId": 78647, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "destructuringTest4", "methodId": 100734, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "destructuringTest4Const", "methodId": 129910, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "destructuringTest5", "methodId": 104799, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "destructuringTest5Const", "methodId": 114390, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "destructuringTest6", "methodId": 108860, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "destructuringTest6Const", "methodId": 94262, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "destructuringTest7", "methodId": 112925, "arguments": [], "returnType": { "kind": "simple", "type": "S1", "optional": false } },
    { "name": "destructuringTest7Const", "methodId": 79254, "arguments": [], "returnType": { "kind": "simple", "type": "S1", "optional": false } },
    { "name": "destructuringTest8", "methodId": 84210, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "destructuringTest8Const", "methodId": 127125, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
];
exports.StructsTester_getterMapping = {
    'structInitializerTest': 'getStructInitializerTest',
    'toCell1': 'getToCell1',
    'toSlice1': 'getToSlice1',
    'fromCell1': 'getFromCell1',
    'fromSlice1': 'getFromSlice1',
    'toCell2': 'getToCell2',
    'fromCell2': 'getFromCell2',
    'fromSlice2': 'getFromSlice2',
    'test1': 'getTest1',
    'toCellMessage1': 'getToCellMessage1',
    'fromCellMessage1': 'getFromCellMessage1',
    'fromSliceMessage1': 'getFromSliceMessage1',
    'contractStructConstantImmediate': 'getContractStructConstantImmediate',
    'globalConstStructConstantImmediate': 'getGlobalConstStructConstantImmediate',
    'contractStructConstantFieldImmediate': 'getContractStructConstantFieldImmediate',
    'globalConstStructConstantFieldImmediate': 'getGlobalConstStructConstantFieldImmediate',
    'contractStructConstantViaVar': 'getContractStructConstantViaVar',
    'globalConstStructConstantViaVar': 'getGlobalConstStructConstantViaVar',
    'contractStructConstantFieldViaVar': 'getContractStructConstantFieldViaVar',
    'globalConstStructConstantFieldViaVar': 'getGlobalConstStructConstantFieldViaVar',
    'longStruct15Test': 'getLongStruct15Test',
    'longStruct16Test': 'getLongStruct16Test',
    'longStruct32Test': 'getLongStruct32Test',
    'longNestedStructTest': 'getLongNestedStructTest',
    'longNestedStructWithOptsTest': 'getLongNestedStructWithOptsTest',
    'longContractTest': 'getLongContractTest',
    'location1': 'getLocation1',
    'location2': 'getLocation2',
    'tripleNestedStructOpt1': 'getTripleNestedStructOpt1',
    'tripleNestedStructOpt2': 'getTripleNestedStructOpt2',
    'tripleNestedStructOpt3': 'getTripleNestedStructOpt3',
    'longAndDeepNestedStruct1': 'getLongAndDeepNestedStruct1',
    'longAndDeepNestedStruct2': 'getLongAndDeepNestedStruct2',
    'longAndDeepNestedStruct3': 'getLongAndDeepNestedStruct3',
    'intFieldsStruct': 'getIntFieldsStruct',
    'intFieldsFromCell': 'getIntFieldsFromCell',
    'uintFieldsMessage': 'getUintFieldsMessage',
    'uintFieldsFromCell': 'getUintFieldsFromCell',
    'optionalFields': 'getOptionalFields',
    'destructuringTest1': 'getDestructuringTest1',
    'destructuringTest1Const': 'getDestructuringTest1Const',
    'destructuringTest2': 'getDestructuringTest2',
    'destructuringTest2Const': 'getDestructuringTest2Const',
    'destructuringTest3': 'getDestructuringTest3',
    'destructuringTest3Const': 'getDestructuringTest3Const',
    'destructuringTest4': 'getDestructuringTest4',
    'destructuringTest4Const': 'getDestructuringTest4Const',
    'destructuringTest5': 'getDestructuringTest5',
    'destructuringTest5Const': 'getDestructuringTest5Const',
    'destructuringTest6': 'getDestructuringTest6',
    'destructuringTest6Const': 'getDestructuringTest6Const',
    'destructuringTest7': 'getDestructuringTest7',
    'destructuringTest7Const': 'getDestructuringTest7Const',
    'destructuringTest8': 'getDestructuringTest8',
    'destructuringTest8Const': 'getDestructuringTest8Const',
};
const StructsTester_receivers = [
    { "receiver": "internal", "message": { "kind": "empty" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Foo" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "example" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "exampleVarIntegers" } },
];
class StructsTester {
    static async init() {
        return await StructsTester_init();
    }
    static async fromInit() {
        const __gen_init = await StructsTester_init();
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new StructsTester(address, __gen_init);
    }
    static fromAddress(address) {
        return new StructsTester(address);
    }
    address;
    init;
    abi = {
        types: StructsTester_types,
        getters: StructsTester_getters,
        receivers: StructsTester_receivers,
        errors: StructsTester_errors,
    };
    constructor(address, init) {
        this.address = address;
        this.init = init;
    }
    async send(provider, via, args, message) {
        let body = null;
        if (message === null) {
            body = new core_1.Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'Foo') {
            body = (0, core_1.beginCell)().store(storeFoo(message)).endCell();
        }
        if (message === "example") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "exampleVarIntegers") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) {
            throw new Error('Invalid message type');
        }
        await provider.internal(via, { ...args, body: body });
    }
    async getStructInitializerTest(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(69602, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getToCell1(provider, s) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleMyStruct1(s));
        const source = (await provider.get(82862, builder.build())).stack;
        const result = source.readCell();
        return result;
    }
    async getToSlice1(provider, s) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleMyStruct1(s));
        const source = (await provider.get(69666, builder.build())).stack;
        const result = source.readCell().asSlice();
        return result;
    }
    async getFromCell1(provider, src) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(src);
        const source = (await provider.get(76221, builder.build())).stack;
        const result = loadGetterTupleMyStruct1(source);
        return result;
    }
    async getFromSlice1(provider, src) {
        const builder = new core_1.TupleBuilder();
        builder.writeSlice(src.asCell());
        const source = (await provider.get(118478, builder.build())).stack;
        const result = loadGetterTupleMyStruct1(source);
        return result;
    }
    async getToCell2(provider, s) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleMyStruct2(s));
        const source = (await provider.get(95181, builder.build())).stack;
        const result = source.readCell();
        return result;
    }
    async getFromCell2(provider, src) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(src);
        const source = (await provider.get(72158, builder.build())).stack;
        const result = loadGetterTupleMyStruct2(source);
        return result;
    }
    async getFromSlice2(provider, src) {
        const builder = new core_1.TupleBuilder();
        builder.writeSlice(src.asCell());
        const source = (await provider.get(130733, builder.build())).stack;
        const result = loadGetterTupleMyStruct2(source);
        return result;
    }
    async getTest1(provider, s1, s2) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleMyStruct1(s1));
        builder.writeTuple(storeTupleMyStruct2(s2));
        const source = (await provider.get(70304, builder.build())).stack;
        const result = source.readCell();
        return result;
    }
    async getToCellMessage1(provider, m) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleMyMessage1(m));
        const source = (await provider.get(103675, builder.build())).stack;
        const result = source.readCell();
        return result;
    }
    async getFromCellMessage1(provider, src) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(src);
        const source = (await provider.get(65739, builder.build())).stack;
        const result = loadGetterTupleMyMessage1(source);
        return result;
    }
    async getFromSliceMessage1(provider, src) {
        const builder = new core_1.TupleBuilder();
        builder.writeSlice(src.asCell());
        const source = (await provider.get(100880, builder.build())).stack;
        const result = loadGetterTupleMyMessage1(source);
        return result;
    }
    async getContractStructConstantImmediate(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(131046, builder.build())).stack;
        const result = loadGetterTupleMyStruct3(source);
        return result;
    }
    async getGlobalConstStructConstantImmediate(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(96485, builder.build())).stack;
        const result = loadGetterTupleMyStruct3(source);
        return result;
    }
    async getContractStructConstantFieldImmediate(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(115253, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getGlobalConstStructConstantFieldImmediate(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(72941, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getContractStructConstantViaVar(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(103564, builder.build())).stack;
        const result = loadGetterTupleMyStruct3(source);
        return result;
    }
    async getGlobalConstStructConstantViaVar(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(105147, builder.build())).stack;
        const result = loadGetterTupleMyStruct3(source);
        return result;
    }
    async getContractStructConstantFieldViaVar(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(97692, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getGlobalConstStructConstantFieldViaVar(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(118768, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getLongStruct15Test(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(92569, builder.build())).stack;
        const result = loadGetterTupleLongStruct15(source);
        return result;
    }
    async getLongStruct16Test(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(100171, builder.build())).stack;
        const result = loadGetterTupleLongStruct16(source);
        return result;
    }
    async getLongStruct32Test(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(99597, builder.build())).stack;
        const result = loadGetterTupleLongStruct32(source);
        return result;
    }
    async getLongNestedStructTest(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(101744, builder.build())).stack;
        const result = loadGetterTupleLongNestedStruct(source);
        return result;
    }
    async getLongNestedStructWithOptsTest(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(103572, builder.build())).stack;
        const result = loadGetterTupleLongNestedStructWithOpts(source);
        return result;
    }
    async getLongContractTest(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(81181, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getLocation1(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(126791, builder.build())).stack;
        const result = loadGetterTupleLocation(source);
        return result;
    }
    async getLocation2(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(122660, builder.build())).stack;
        const result = loadGetterTupleLocation(source);
        return result;
    }
    async getTripleNestedStructOpt1(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(102164, builder.build())).stack;
        const result = loadGetterTupleTripleNestedStructOpt(source);
        return result;
    }
    async getTripleNestedStructOpt2(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(114551, builder.build())).stack;
        const result = loadGetterTupleTripleNestedStructOpt(source);
        return result;
    }
    async getTripleNestedStructOpt3(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(110422, builder.build())).stack;
        const result = loadGetterTupleTripleNestedStructOpt(source);
        return result;
    }
    async getLongAndDeepNestedStruct1(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(87259, builder.build())).stack;
        const result = loadGetterTupleLongAndDeepNestedStruct(source);
        return result;
    }
    async getLongAndDeepNestedStruct2(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(91320, builder.build())).stack;
        const result = loadGetterTupleLongAndDeepNestedStruct(source);
        return result;
    }
    async getLongAndDeepNestedStruct3(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(95385, builder.build())).stack;
        const result = loadGetterTupleLongAndDeepNestedStruct(source);
        return result;
    }
    async getIntFieldsStruct(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(98928, builder.build())).stack;
        const result = loadGetterTupleIntFields(source);
        return result;
    }
    async getIntFieldsFromCell(provider, src) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(src);
        const source = (await provider.get(75138, builder.build())).stack;
        const result = loadGetterTupleIntFields(source);
        return result;
    }
    async getUintFieldsMessage(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(72699, builder.build())).stack;
        const result = loadGetterTupleUintFields(source);
        return result;
    }
    async getUintFieldsFromCell(provider, src) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(src);
        const source = (await provider.get(121259, builder.build())).stack;
        const result = loadGetterTupleUintFields(source);
        return result;
    }
    async getOptionalFields(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(79909, builder.build())).stack;
        const result = loadGetterTupleOptionalFields(source);
        return result;
    }
    async getDestructuringTest1(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(121307, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getDestructuringTest1Const(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(112759, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getDestructuringTest2(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(125368, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getDestructuringTest2Const(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(95895, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getDestructuringTest3(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(129433, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getDestructuringTest3Const(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(78647, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getDestructuringTest4(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(100734, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getDestructuringTest4Const(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(129910, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getDestructuringTest5(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(104799, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getDestructuringTest5Const(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(114390, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getDestructuringTest6(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(108860, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getDestructuringTest6Const(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(94262, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getDestructuringTest7(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(112925, builder.build())).stack;
        const result = loadGetterTupleS1(source);
        return result;
    }
    async getDestructuringTest7Const(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(79254, builder.build())).stack;
        const result = loadGetterTupleS1(source);
        return result;
    }
    async getDestructuringTest8(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(84210, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getDestructuringTest8Const(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(127125, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
}
exports.StructsTester = StructsTester;
