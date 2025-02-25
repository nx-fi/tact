"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializationTester2 = exports.SerializationTester2_getterMapping = void 0;
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
exports.storeVars = storeVars;
exports.loadVars = loadVars;
exports.storeBoth = storeBoth;
exports.loadBoth = loadBoth;
exports.storeUpdate = storeUpdate;
exports.loadUpdate = loadUpdate;
exports.storeSerializationTester2$Data = storeSerializationTester2$Data;
exports.loadSerializationTester2$Data = loadSerializationTester2$Data;
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
function storeVars(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
        b_0.storeInt(src.b, 257);
        b_0.storeInt(src.c, 257);
        const b_1 = new core_1.Builder();
        b_1.storeInt(src.d, 257);
        b_1.storeInt(src.e, 257);
        b_0.storeRef(b_1.endCell());
    };
}
function loadVars(slice) {
    const sc_0 = slice;
    const _a = sc_0.loadIntBig(257);
    const _b = sc_0.loadIntBig(257);
    const _c = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _d = sc_1.loadIntBig(257);
    const _e = sc_1.loadIntBig(257);
    return { $$type: 'Vars', a: _a, b: _b, c: _c, d: _d, e: _e };
}
function loadTupleVars(source) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    const _c = source.readBigNumber();
    const _d = source.readBigNumber();
    const _e = source.readBigNumber();
    return { $$type: 'Vars', a: _a, b: _b, c: _c, d: _d, e: _e };
}
function loadGetterTupleVars(source) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    const _c = source.readBigNumber();
    const _d = source.readBigNumber();
    const _e = source.readBigNumber();
    return { $$type: 'Vars', a: _a, b: _b, c: _c, d: _d, e: _e };
}
function storeTupleVars(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeNumber(source.b);
    builder.writeNumber(source.c);
    builder.writeNumber(source.d);
    builder.writeNumber(source.e);
    return builder.build();
}
function dictValueParserVars() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeVars(src)).endCell());
        },
        parse: (src) => {
            return loadVars(src.loadRef().beginParse());
        }
    };
}
function storeBoth(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.store(storeVars(src.a));
        const b_1 = new core_1.Builder();
        b_1.store(storeVars(src.b));
        b_0.storeRef(b_1.endCell());
    };
}
function loadBoth(slice) {
    const sc_0 = slice;
    const _a = loadVars(sc_0);
    const sc_1 = sc_0.loadRef().beginParse();
    const _b = loadVars(sc_1);
    return { $$type: 'Both', a: _a, b: _b };
}
function loadTupleBoth(source) {
    const _a = loadTupleVars(source);
    const _b = loadTupleVars(source);
    return { $$type: 'Both', a: _a, b: _b };
}
function loadGetterTupleBoth(source) {
    const _a = loadGetterTupleVars(source);
    const _b = loadGetterTupleVars(source);
    return { $$type: 'Both', a: _a, b: _b };
}
function storeTupleBoth(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeTuple(storeTupleVars(source.a));
    builder.writeTuple(storeTupleVars(source.b));
    return builder.build();
}
function dictValueParserBoth() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeBoth(src)).endCell());
        },
        parse: (src) => {
            return loadBoth(src.loadRef().beginParse());
        }
    };
}
function storeUpdate(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(2732768933, 32);
        b_0.store(storeVars(src.a));
        const b_1 = new core_1.Builder();
        b_1.store(storeVars(src.b));
        b_0.storeRef(b_1.endCell());
    };
}
function loadUpdate(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2732768933) {
        throw Error('Invalid prefix');
    }
    const _a = loadVars(sc_0);
    const sc_1 = sc_0.loadRef().beginParse();
    const _b = loadVars(sc_1);
    return { $$type: 'Update', a: _a, b: _b };
}
function loadTupleUpdate(source) {
    const _a = loadTupleVars(source);
    const _b = loadTupleVars(source);
    return { $$type: 'Update', a: _a, b: _b };
}
function loadGetterTupleUpdate(source) {
    const _a = loadGetterTupleVars(source);
    const _b = loadGetterTupleVars(source);
    return { $$type: 'Update', a: _a, b: _b };
}
function storeTupleUpdate(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeTuple(storeTupleVars(source.a));
    builder.writeTuple(storeTupleVars(source.b));
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
function storeSerializationTester2$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.store(storeVars(src.a));
        const b_1 = new core_1.Builder();
        b_1.store(storeVars(src.b));
        b_0.storeRef(b_1.endCell());
    };
}
function loadSerializationTester2$Data(slice) {
    const sc_0 = slice;
    const _a = loadVars(sc_0);
    const sc_1 = sc_0.loadRef().beginParse();
    const _b = loadVars(sc_1);
    return { $$type: 'SerializationTester2$Data', a: _a, b: _b };
}
function loadTupleSerializationTester2$Data(source) {
    const _a = loadTupleVars(source);
    const _b = loadTupleVars(source);
    return { $$type: 'SerializationTester2$Data', a: _a, b: _b };
}
function loadGetterTupleSerializationTester2$Data(source) {
    const _a = loadGetterTupleVars(source);
    const _b = loadGetterTupleVars(source);
    return { $$type: 'SerializationTester2$Data', a: _a, b: _b };
}
function storeTupleSerializationTester2$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeTuple(storeTupleVars(source.a));
    builder.writeTuple(storeTupleVars(source.b));
    return builder.build();
}
function dictValueParserSerializationTester2$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSerializationTester2$Data(src)).endCell());
        },
        parse: (src) => {
            return loadSerializationTester2$Data(src.loadRef().beginParse());
        }
    };
}
function initSerializationTester2_init_args(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.store(storeVars(src.a));
        const b_1 = new core_1.Builder();
        b_1.store(storeVars(src.b));
        b_0.storeRef(b_1.endCell());
    };
}
async function SerializationTester2_init(a, b) {
    const __code = core_1.Cell.fromBase64('te6ccgECHAEAA6MAART/APSkE/S88sgLAQIBYgIDA4zQAdBy1yHSANIA+kAhEDRQZm8E+GEC+GLbPAuSXwvgcCrXSSDCH5UxCtMfC94hghCi4r6luuMCO8AACsEhGrDjAl8K8sCCGQQFAgEgBwgBqhC8XwyBAQHXAIEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAMBAlECQQIwXUAdCBAQHXAIEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAMBAlECQQIzUQWlUDbBoGAMIQeVUWyH8BygBVkBBaEEkQOEdqUEWBAQHPABKBAQHPAIEBAc8AAciBAQHPABKBAQHPAMkBzMhVQAZQRYEBAc8AEoEBAc8AgQEBzwAByIEBAc8AEoEBAc8AyQHMyQHMye1UALrIfwHKAFWQEFoQSRA4R2pQRYEBAc8AEoEBAc8AgQEBzwAByIEBAc8AEoEBAc8AyQHMyFVABlBFgQEBzwASgQEBzwCBAQHPAAHIgQEBzwASgQEBzwDJAczJAczJ7VQCAUgJCgIBIBARAk+15ttnm2eNlCQN0kYNscIkDd5aEA3lSqiN4KqoDeCt4FxEDdJGDbvQGQsCAecMDQAYVHmHVHmHVHmHKW8KAjumc7Z5tnjZQkDdJGDbMkDd5aEA3kreC8RA3SRg270ZDgIPprW2ebZ42VUZDwAOVHmHU5hvBQAUVHmHVHmHVHmHKQIBIBITAgEgFhcC4bb+YE3koK3kQC3koK3kohEiDwIM4grB5A3SRg2xwk3kQC3koK3kohEiDwIM4grN4VxbZ4EiIyEhAiMBAOIi4ODCIsDAoiKgoIIigIBiImBgQiJAQCIiICIiAg/iDcILogmCEWIHSSLgwKCJEHtnjZSwGRQCPbTcu2ebZ42UJA3SRg2zJA3eWhAN5K3gvEQN0kYNu9AZFQAoXwsEpAOmAgKmAwGmBASmBRA0QTAADlR0MlNDbwUCEbaP+2ebZ42UsBkYAhG0g5tnm2eNlLAZGgAKVHQyU0MBtO1E0NIAAY5RgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wCBAQHXADAQJRAkECMF1AHQgQEB1wCBAQHXAIEBAdcA1AHQgQEB1wCBAQHXADAQJRAkECM1EFpVA2wa4BsAClR5h1OYAKaBAQHXAIEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAMBAlECQQIwXUAdCBAQHXAIEBAdcAgQEB1wDUAdCBAQHXAIEBAdcAMBAlECQQIzUQWlUDCtFVCA==');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initSerializationTester2_init_args({ $$type: 'SerializationTester2_init_args', a, b })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const SerializationTester2_errors = {
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
const SerializationTester2_types = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "Vars", "header": null, "fields": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "c", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "d", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "e", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "Both", "header": null, "fields": [{ "name": "a", "type": { "kind": "simple", "type": "Vars", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "Vars", "optional": false } }] },
    { "name": "Update", "header": 2732768933, "fields": [{ "name": "a", "type": { "kind": "simple", "type": "Vars", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "Vars", "optional": false } }] },
    { "name": "SerializationTester2$Data", "header": null, "fields": [{ "name": "a", "type": { "kind": "simple", "type": "Vars", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "Vars", "optional": false } }] },
];
const SerializationTester2_getters = [
    { "name": "getA", "methodId": 123932, "arguments": [], "returnType": { "kind": "simple", "type": "Vars", "optional": false } },
    { "name": "getAOpt", "methodId": 81209, "arguments": [], "returnType": { "kind": "simple", "type": "Vars", "optional": true } },
    { "name": "getB", "methodId": 119935, "arguments": [], "returnType": { "kind": "simple", "type": "Vars", "optional": false } },
    { "name": "getBOpt", "methodId": 108261, "arguments": [], "returnType": { "kind": "simple", "type": "Vars", "optional": true } },
    { "name": "getBoth", "methodId": 81754, "arguments": [], "returnType": { "kind": "simple", "type": "Both", "optional": false } },
    { "name": "getBothOpt", "methodId": 69430, "arguments": [], "returnType": { "kind": "simple", "type": "Both", "optional": true } },
    { "name": "process", "methodId": 104435, "arguments": [{ "name": "src", "type": { "kind": "simple", "type": "Vars", "optional": false } }, { "name": "both", "type": { "kind": "simple", "type": "Both", "optional": false } }, { "name": "both2", "type": { "kind": "simple", "type": "Both", "optional": true } }], "returnType": { "kind": "simple", "type": "Vars", "optional": false } },
];
exports.SerializationTester2_getterMapping = {
    'getA': 'getGetA',
    'getAOpt': 'getGetAOpt',
    'getB': 'getGetB',
    'getBOpt': 'getGetBOpt',
    'getBoth': 'getGetBoth',
    'getBothOpt': 'getGetBothOpt',
    'process': 'getProcess',
};
const SerializationTester2_receivers = [
    { "receiver": "internal", "message": { "kind": "empty" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Update" } },
];
class SerializationTester2 {
    static async init(a, b) {
        return await SerializationTester2_init(a, b);
    }
    static async fromInit(a, b) {
        const __gen_init = await SerializationTester2_init(a, b);
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new SerializationTester2(address, __gen_init);
    }
    static fromAddress(address) {
        return new SerializationTester2(address);
    }
    address;
    init;
    abi = {
        types: SerializationTester2_types,
        getters: SerializationTester2_getters,
        receivers: SerializationTester2_receivers,
        errors: SerializationTester2_errors,
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
        const result = loadGetterTupleVars(source);
        return result;
    }
    async getGetAOpt(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(81209, builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleVars(result_p) : null;
        return result;
    }
    async getGetB(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(119935, builder.build())).stack;
        const result = loadGetterTupleVars(source);
        return result;
    }
    async getGetBOpt(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(108261, builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleVars(result_p) : null;
        return result;
    }
    async getGetBoth(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(81754, builder.build())).stack;
        const result = loadGetterTupleBoth(source);
        return result;
    }
    async getGetBothOpt(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(69430, builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleBoth(result_p) : null;
        return result;
    }
    async getProcess(provider, src, both, both2) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleVars(src));
        builder.writeTuple(storeTupleBoth(both));
        if (both2 !== null && both2 !== undefined) {
            builder.writeTuple(storeTupleBoth(both2));
        }
        else {
            builder.writeTuple(null);
        }
        const source = (await provider.get(104435, builder.build())).stack;
        const result = loadGetterTupleVars(source);
        return result;
    }
}
exports.SerializationTester2 = SerializationTester2;
