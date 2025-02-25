"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializationTester = exports.SerializationTester_getterMapping = void 0;
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
exports.storeUpdate = storeUpdate;
exports.loadUpdate = loadUpdate;
exports.storeSerializationTester$Data = storeSerializationTester$Data;
exports.loadSerializationTester$Data = loadSerializationTester$Data;
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
function storeUpdate(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(849061239, 32);
        b_0.storeInt(src.a, 257);
        b_0.storeInt(src.b, 257);
        b_0.storeInt(src.c, 257);
        const b_1 = new core_1.Builder();
        b_1.storeInt(src.d, 257);
        b_1.storeInt(src.e, 257);
        b_1.storeInt(src.f, 257);
        const b_2 = new core_1.Builder();
        b_2.storeInt(src.g, 257);
        b_2.storeInt(src.h, 257);
        b_2.storeInt(src.i, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}
function loadUpdate(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 849061239) {
        throw Error('Invalid prefix');
    }
    const _a = sc_0.loadIntBig(257);
    const _b = sc_0.loadIntBig(257);
    const _c = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _d = sc_1.loadIntBig(257);
    const _e = sc_1.loadIntBig(257);
    const _f = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _g = sc_2.loadIntBig(257);
    const _h = sc_2.loadIntBig(257);
    const _i = sc_2.loadIntBig(257);
    return { $$type: 'Update', a: _a, b: _b, c: _c, d: _d, e: _e, f: _f, g: _g, h: _h, i: _i };
}
function loadTupleUpdate(source) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    const _c = source.readBigNumber();
    const _d = source.readBigNumber();
    const _e = source.readBigNumber();
    const _f = source.readBigNumber();
    const _g = source.readBigNumber();
    const _h = source.readBigNumber();
    const _i = source.readBigNumber();
    return { $$type: 'Update', a: _a, b: _b, c: _c, d: _d, e: _e, f: _f, g: _g, h: _h, i: _i };
}
function loadGetterTupleUpdate(source) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    const _c = source.readBigNumber();
    const _d = source.readBigNumber();
    const _e = source.readBigNumber();
    const _f = source.readBigNumber();
    const _g = source.readBigNumber();
    const _h = source.readBigNumber();
    const _i = source.readBigNumber();
    return { $$type: 'Update', a: _a, b: _b, c: _c, d: _d, e: _e, f: _f, g: _g, h: _h, i: _i };
}
function storeTupleUpdate(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeNumber(source.b);
    builder.writeNumber(source.c);
    builder.writeNumber(source.d);
    builder.writeNumber(source.e);
    builder.writeNumber(source.f);
    builder.writeNumber(source.g);
    builder.writeNumber(source.h);
    builder.writeNumber(source.i);
    return builder.build();
}
function dictValueParserUpdate() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeUpdate(src)).endCell());
        },
        parse: (src) => {
            return loadUpdate(src.loadRef().beginParse());
        }
    };
}
function storeSerializationTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
        b_0.storeInt(src.b, 257);
        b_0.storeInt(src.c, 257);
        const b_1 = new core_1.Builder();
        b_1.storeInt(src.d, 257);
        b_1.storeInt(src.e, 257);
        b_1.storeInt(src.f, 257);
        const b_2 = new core_1.Builder();
        b_2.storeInt(src.g, 257);
        b_2.storeInt(src.h, 257);
        b_2.storeInt(src.i, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}
function loadSerializationTester$Data(slice) {
    const sc_0 = slice;
    const _a = sc_0.loadIntBig(257);
    const _b = sc_0.loadIntBig(257);
    const _c = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _d = sc_1.loadIntBig(257);
    const _e = sc_1.loadIntBig(257);
    const _f = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _g = sc_2.loadIntBig(257);
    const _h = sc_2.loadIntBig(257);
    const _i = sc_2.loadIntBig(257);
    return { $$type: 'SerializationTester$Data', a: _a, b: _b, c: _c, d: _d, e: _e, f: _f, g: _g, h: _h, i: _i };
}
function loadTupleSerializationTester$Data(source) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    const _c = source.readBigNumber();
    const _d = source.readBigNumber();
    const _e = source.readBigNumber();
    const _f = source.readBigNumber();
    const _g = source.readBigNumber();
    const _h = source.readBigNumber();
    const _i = source.readBigNumber();
    return { $$type: 'SerializationTester$Data', a: _a, b: _b, c: _c, d: _d, e: _e, f: _f, g: _g, h: _h, i: _i };
}
function loadGetterTupleSerializationTester$Data(source) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    const _c = source.readBigNumber();
    const _d = source.readBigNumber();
    const _e = source.readBigNumber();
    const _f = source.readBigNumber();
    const _g = source.readBigNumber();
    const _h = source.readBigNumber();
    const _i = source.readBigNumber();
    return { $$type: 'SerializationTester$Data', a: _a, b: _b, c: _c, d: _d, e: _e, f: _f, g: _g, h: _h, i: _i };
}
function storeTupleSerializationTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeNumber(source.b);
    builder.writeNumber(source.c);
    builder.writeNumber(source.d);
    builder.writeNumber(source.e);
    builder.writeNumber(source.f);
    builder.writeNumber(source.g);
    builder.writeNumber(source.h);
    builder.writeNumber(source.i);
    return builder.build();
}
function dictValueParserSerializationTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSerializationTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadSerializationTester$Data(src.loadRef().beginParse());
        }
    };
}
function initSerializationTester_init_args(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
        b_0.storeInt(src.b, 257);
        b_0.storeInt(src.c, 257);
        const b_1 = new core_1.Builder();
        b_1.storeInt(src.d, 257);
        b_1.storeInt(src.e, 257);
        b_1.storeInt(src.f, 257);
        const b_2 = new core_1.Builder();
        b_2.storeInt(src.g, 257);
        b_2.storeInt(src.h, 257);
        b_2.storeInt(src.i, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}
async function SerializationTester_init(a, b, c, d, e, f, g, h, i) {
    const __code = core_1.Cell.fromBase64('te6ccgECIQEAAksAART/APSkE/S88sgLAQIBYgIDA4zQAdBy1yHSANIA+kAhEDRQZm8E+GEC+GLbPAqSXwrgcCnXSSDCH5UxCdMfCt4hghAym6V3uuMCOsAACcEhGbDjAl8J8sCCHgQFAgEgBgcBthA5Xwky2zwyOBBoEFcQRhA1RDDIfwHKAFWAUImBAQHPABaBAQHPABSBAQHPAALIgQEBzwCBAQHPABKBAQHPAALIgQEBzwATgQEBzwATgQEBzwDJWMzJAczJ7VQgAJgQaFUVyH8BygBVgFCJgQEBzwAWgQEBzwAUgQEBzwACyIEBAc8AgQEBzwASgQEBzwACyIEBAc8AE4EBAc8AE4EBAc8AyVjMyQHMye1UAgFuCAkCASAMDQIRsUU2zzbPGyRgHgoCEbFNds82zxskYB4LAAIgAAIhAgEgDg8CASAYGQIBIBARAgEgFBUCEbE2ts82zxskYB4SAhGxPvbPNs8bJGAeEwACIgACIwIRsSY2zzbPGyRgHhYCEbEuds82zxskYB4XAAIkAAIlAgEgGhsCEbSDm2ebZ42SMB4fAhGxF7bPNs8bJGAeHAIRsR/2zzbPGyRgHh0AAiYAAicBlu1E0NIAAY48gQEB1wCBAQHXAIEBAdcA1AHQgQEB1wCBAQHXAIEBAdcA1DDQgQEB1wCBAQHXAIEBAdcAMBBpEGgQZ2wZ4Ns8CdFVByAAAigAdIEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wCBAQHXANQw0IEBAdcAgQEB1wCBAQHXADAQaRBoEGc=');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initSerializationTester_init_args({ $$type: 'SerializationTester_init_args', a, b, c, d, e, f, g, h, i })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const SerializationTester_errors = {
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
const SerializationTester_types = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "Update", "header": 849061239, "fields": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "c", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "d", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "e", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "f", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "g", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "h", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "i", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "SerializationTester$Data", "header": null, "fields": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "c", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "d", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "e", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "f", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "g", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "h", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "i", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
];
const SerializationTester_getters = [
    { "name": "getA", "methodId": 123932, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "getB", "methodId": 119935, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "getC", "methodId": 115806, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "getD", "methodId": 111801, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "getE", "methodId": 107672, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "getF", "methodId": 103675, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "getG", "methodId": 99546, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "getH", "methodId": 95541, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "getI", "methodId": 91412, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
];
exports.SerializationTester_getterMapping = {
    'getA': 'getGetA',
    'getB': 'getGetB',
    'getC': 'getGetC',
    'getD': 'getGetD',
    'getE': 'getGetE',
    'getF': 'getGetF',
    'getG': 'getGetG',
    'getH': 'getGetH',
    'getI': 'getGetI',
};
const SerializationTester_receivers = [
    { "receiver": "internal", "message": { "kind": "empty" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Update" } },
];
class SerializationTester {
    static async init(a, b, c, d, e, f, g, h, i) {
        return await SerializationTester_init(a, b, c, d, e, f, g, h, i);
    }
    static async fromInit(a, b, c, d, e, f, g, h, i) {
        const __gen_init = await SerializationTester_init(a, b, c, d, e, f, g, h, i);
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new SerializationTester(address, __gen_init);
    }
    static fromAddress(address) {
        return new SerializationTester(address);
    }
    address;
    init;
    abi = {
        types: SerializationTester_types,
        getters: SerializationTester_getters,
        receivers: SerializationTester_receivers,
        errors: SerializationTester_errors,
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
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'Update') {
            body = (0, core_1.beginCell)().store(storeUpdate(message)).endCell();
        }
        if (body === null) {
            throw new Error('Invalid message type');
        }
        await provider.internal(via, { ...args, body: body });
    }
    async getGetA(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(123932, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGetB(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(119935, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGetC(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(115806, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGetD(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(111801, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGetE(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(107672, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGetF(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(103675, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGetG(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(99546, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGetH(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(95541, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGetI(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(91412, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
}
exports.SerializationTester = SerializationTester;
