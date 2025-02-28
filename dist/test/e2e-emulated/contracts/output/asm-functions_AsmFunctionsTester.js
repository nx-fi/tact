"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsmFunctionsTester = exports.AsmFunctionsTester_getterMapping = void 0;
exports.storeDataSize = storeDataSize;
exports.loadDataSize = loadDataSize;
exports.storeStateInit = storeStateInit;
exports.loadStateInit = loadStateInit;
exports.storeContext = storeContext;
exports.loadContext = loadContext;
exports.storeSendParameters = storeSendParameters;
exports.loadSendParameters = loadSendParameters;
exports.storeMessageParameters = storeMessageParameters;
exports.loadMessageParameters = loadMessageParameters;
exports.storeDeployParameters = storeDeployParameters;
exports.loadDeployParameters = loadDeployParameters;
exports.storeStdAddress = storeStdAddress;
exports.loadStdAddress = loadStdAddress;
exports.storeVarAddress = storeVarAddress;
exports.loadVarAddress = loadVarAddress;
exports.storeBasechainAddress = storeBasechainAddress;
exports.loadBasechainAddress = loadBasechainAddress;
exports.storeAsmFunctionsTester$Data = storeAsmFunctionsTester$Data;
exports.loadAsmFunctionsTester$Data = loadAsmFunctionsTester$Data;
exports.storeMapIntIntSlice = storeMapIntIntSlice;
exports.loadMapIntIntSlice = loadMapIntIntSlice;
exports.storeIntSlice = storeIntSlice;
exports.loadIntSlice = loadIntSlice;
exports.storeSliceInt = storeSliceInt;
exports.loadSliceInt = loadSliceInt;
exports.storeTwo = storeTwo;
exports.loadTwo = loadTwo;
exports.storeTwoInTwo = storeTwoInTwo;
exports.loadTwoInTwo = loadTwoInTwo;
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
function storeMessageParameters(src) {
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
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}
function loadMessageParameters(slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters', mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}
function loadTupleMessageParameters(source) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters', mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}
function loadGetterTupleMessageParameters(source) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters', mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}
function storeTupleMessageParameters(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}
function dictValueParserMessageParameters() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
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
function storeBasechainAddress(src) {
    return (builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) {
            b_0.storeBit(true).storeInt(src.hash, 257);
        }
        else {
            b_0.storeBit(false);
        }
    };
}
function loadBasechainAddress(slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress', hash: _hash };
}
function loadTupleBasechainAddress(source) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress', hash: _hash };
}
function loadGetterTupleBasechainAddress(source) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress', hash: _hash };
}
function storeTupleBasechainAddress(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}
function dictValueParserBasechainAddress() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    };
}
function storeAsmFunctionsTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
function loadAsmFunctionsTester$Data(slice) {
    const sc_0 = slice;
    return { $$type: 'AsmFunctionsTester$Data' };
}
function loadTupleAsmFunctionsTester$Data(source) {
    return { $$type: 'AsmFunctionsTester$Data' };
}
function loadGetterTupleAsmFunctionsTester$Data(source) {
    return { $$type: 'AsmFunctionsTester$Data' };
}
function storeTupleAsmFunctionsTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserAsmFunctionsTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeAsmFunctionsTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadAsmFunctionsTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeMapIntIntSlice(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeDict(src.val, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_0.storeRef(src.rem.asCell());
    };
}
function loadMapIntIntSlice(slice) {
    const sc_0 = slice;
    const _val = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_0);
    const _rem = sc_0.loadRef().asSlice();
    return { $$type: 'MapIntIntSlice', val: _val, rem: _rem };
}
function loadTupleMapIntIntSlice(source) {
    const _val = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _rem = source.readCell().asSlice();
    return { $$type: 'MapIntIntSlice', val: _val, rem: _rem };
}
function loadGetterTupleMapIntIntSlice(source) {
    const _val = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _rem = source.readCell().asSlice();
    return { $$type: 'MapIntIntSlice', val: _val, rem: _rem };
}
function storeTupleMapIntIntSlice(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeCell(source.val.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.val, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeSlice(source.rem.asCell());
    return builder.build();
}
function dictValueParserMapIntIntSlice() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMapIntIntSlice(src)).endCell());
        },
        parse: (src) => {
            return loadMapIntIntSlice(src.loadRef().beginParse());
        }
    };
}
function storeIntSlice(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.val, 257);
        b_0.storeRef(src.rem.asCell());
    };
}
function loadIntSlice(slice) {
    const sc_0 = slice;
    const _val = sc_0.loadIntBig(257);
    const _rem = sc_0.loadRef().asSlice();
    return { $$type: 'IntSlice', val: _val, rem: _rem };
}
function loadTupleIntSlice(source) {
    const _val = source.readBigNumber();
    const _rem = source.readCell().asSlice();
    return { $$type: 'IntSlice', val: _val, rem: _rem };
}
function loadGetterTupleIntSlice(source) {
    const _val = source.readBigNumber();
    const _rem = source.readCell().asSlice();
    return { $$type: 'IntSlice', val: _val, rem: _rem };
}
function storeTupleIntSlice(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.val);
    builder.writeSlice(source.rem.asCell());
    return builder.build();
}
function dictValueParserIntSlice() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeIntSlice(src)).endCell());
        },
        parse: (src) => {
            return loadIntSlice(src.loadRef().beginParse());
        }
    };
}
function storeSliceInt(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeRef(src.rem.asCell());
        b_0.storeInt(src.val, 257);
    };
}
function loadSliceInt(slice) {
    const sc_0 = slice;
    const _rem = sc_0.loadRef().asSlice();
    const _val = sc_0.loadIntBig(257);
    return { $$type: 'SliceInt', rem: _rem, val: _val };
}
function loadTupleSliceInt(source) {
    const _rem = source.readCell().asSlice();
    const _val = source.readBigNumber();
    return { $$type: 'SliceInt', rem: _rem, val: _val };
}
function loadGetterTupleSliceInt(source) {
    const _rem = source.readCell().asSlice();
    const _val = source.readBigNumber();
    return { $$type: 'SliceInt', rem: _rem, val: _val };
}
function storeTupleSliceInt(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeSlice(source.rem.asCell());
    builder.writeNumber(source.val);
    return builder.build();
}
function dictValueParserSliceInt() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSliceInt(src)).endCell());
        },
        parse: (src) => {
            return loadSliceInt(src.loadRef().beginParse());
        }
    };
}
function storeTwo(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
        b_0.storeInt(src.b, 257);
    };
}
function loadTwo(slice) {
    const sc_0 = slice;
    const _a = sc_0.loadIntBig(257);
    const _b = sc_0.loadIntBig(257);
    return { $$type: 'Two', a: _a, b: _b };
}
function loadTupleTwo(source) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    return { $$type: 'Two', a: _a, b: _b };
}
function loadGetterTupleTwo(source) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    return { $$type: 'Two', a: _a, b: _b };
}
function storeTupleTwo(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeNumber(source.b);
    return builder.build();
}
function dictValueParserTwo() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeTwo(src)).endCell());
        },
        parse: (src) => {
            return loadTwo(src.loadRef().beginParse());
        }
    };
}
function storeTwoInTwo(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.store(storeTwo(src.a));
        const b_1 = new core_1.Builder();
        b_1.store(storeTwo(src.b));
        b_0.storeRef(b_1.endCell());
    };
}
function loadTwoInTwo(slice) {
    const sc_0 = slice;
    const _a = loadTwo(sc_0);
    const sc_1 = sc_0.loadRef().beginParse();
    const _b = loadTwo(sc_1);
    return { $$type: 'TwoInTwo', a: _a, b: _b };
}
function loadTupleTwoInTwo(source) {
    const _a = loadTupleTwo(source);
    const _b = loadTupleTwo(source);
    return { $$type: 'TwoInTwo', a: _a, b: _b };
}
function loadGetterTupleTwoInTwo(source) {
    const _a = loadGetterTupleTwo(source);
    const _b = loadGetterTupleTwo(source);
    return { $$type: 'TwoInTwo', a: _a, b: _b };
}
function storeTupleTwoInTwo(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeTuple(storeTupleTwo(source.a));
    builder.writeTuple(storeTupleTwo(source.b));
    return builder.build();
}
function dictValueParserTwoInTwo() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeTwoInTwo(src)).endCell());
        },
        parse: (src) => {
            return loadTwoInTwo(src.loadRef().beginParse());
        }
    };
}
function initAsmFunctionsTester_init_args(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
async function AsmFunctionsTester_init() {
    const __code = core_1.Cell.fromBase64('te6ccgECIQEAAnkAAaD/ACCOQjAB0HLXIdIA0gD6QCEQNFBmbwT4YQL4Yu1E0NIAMJFtkW3iMAGRMOBwIddJIMIflTEB0x8wkTLiwAABwSGw3PLAguH0pBP0vPLICwECAnECAwIBIAQFAgEgFBUCASAGBwIBIA0OASG07Z2omhpABhItsi28W2eGMAgCAVgJCgAUcXJzdFowMDDAAwEhrMV2omhpABhItsi28W2eGMALASGvDHaiaGkAGEi2yLbxbZ4YwAwAHsiAKgHKBsnQd9cAATHAKgC8bYEBAYAjgCIiIW6VW1n0WjCYyAHPAEEz9ELigQEBgCqAGyIhbpVbWfRaMJjIAc8AQTP0QuLIUhD0AMnQ9AQwASFuIW5csJNfBH+OEQGzAbOwlwH5AAH5ALqSW3Di4gEhtjP9qJoaQAYSLbItvFtnhjAPAgEgEBEAGMiAKvoCydD6ADDAKgEhs047UTQ0gAwkW2RbeLbPDGASAXWzBcCbyIBbyICbyIQIwRvIgFvIgJvIhAjCG8iAW8iAm8iECPtRNDSADCRbZFt4gwQqxCaEIlVMNs8MYBMAEv71V29ya3MhfwAQVTNbW1tbWzABIbtMXtRNDSADCRbZFt4ts8MYFgIBIBcYABR2pKSkpaWlpMAHATG3ZSAt5EBN5F2omhpABhItsi28SIibZ4YwGQIBIBobAAhaMDAwASGyD3tRNDSADCRbZFt4ts8MYBwCAUgdHgAwcXJzdHV2d3h5eoALgAxVM1tbW1tbMMABASKqEO1E0NIAMJFtkW3iAds8MR8BIKto7UTQ0gAwkW2RbeLbPDEgAAjQ+gDRACbIgCr6AsnQ+gABwCqSxwCSMHDi');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initAsmFunctionsTester_init_args({ $$type: 'AsmFunctionsTester_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const AsmFunctionsTester_errors = {
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
const AsmFunctionsTester_types = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "MessageParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "BasechainAddress", "header": null, "fields": [{ "name": "hash", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }] },
    { "name": "AsmFunctionsTester$Data", "header": null, "fields": [] },
    { "name": "MapIntIntSlice", "header": null, "fields": [{ "name": "val", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "rem", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "IntSlice", "header": null, "fields": [{ "name": "val", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "rem", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SliceInt", "header": null, "fields": [{ "name": "rem", "type": { "kind": "simple", "type": "slice", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "Two", "header": null, "fields": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "TwoInTwo", "header": null, "fields": [{ "name": "a", "type": { "kind": "simple", "type": "Two", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "Two", "optional": false } }] },
];
const AsmFunctionsTester_getters = [
    { "name": "testAsmStoreDict", "methodId": 81432, "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testAsmLoadCoins", "methodId": 86431, "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testAsmLoadCoinsMut", "methodId": 128872, "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testAsmLoadCoinsMutRuntime", "methodId": 127504, "arguments": [{ "name": "c", "type": { "kind": "simple", "type": "cell", "optional": false } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "testAsmLoadInt", "methodId": 78218, "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testAsmDebugStr", "methodId": 93496, "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testAsmCreateUseWord", "methodId": 111813, "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testAsmSecondToLast", "methodId": 67436, "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testAsmSecondToLastRuntime", "methodId": 121641, "arguments": [{ "name": "s1", "type": { "kind": "simple", "type": "Two", "optional": false } }, { "name": "s2", "type": { "kind": "simple", "type": "Two", "optional": false } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "testAsmFirst", "methodId": 124989, "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testAsmFirstRuntime", "methodId": 97303, "arguments": [{ "name": "s1", "type": { "kind": "simple", "type": "TwoInTwo", "optional": false } }, { "name": "s2", "type": { "kind": "simple", "type": "TwoInTwo", "optional": false } }, { "name": "s3", "type": { "kind": "simple", "type": "TwoInTwo", "optional": false } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
];
exports.AsmFunctionsTester_getterMapping = {
    'testAsmStoreDict': 'getTestAsmStoreDict',
    'testAsmLoadCoins': 'getTestAsmLoadCoins',
    'testAsmLoadCoinsMut': 'getTestAsmLoadCoinsMut',
    'testAsmLoadCoinsMutRuntime': 'getTestAsmLoadCoinsMutRuntime',
    'testAsmLoadInt': 'getTestAsmLoadInt',
    'testAsmDebugStr': 'getTestAsmDebugStr',
    'testAsmCreateUseWord': 'getTestAsmCreateUseWord',
    'testAsmSecondToLast': 'getTestAsmSecondToLast',
    'testAsmSecondToLastRuntime': 'getTestAsmSecondToLastRuntime',
    'testAsmFirst': 'getTestAsmFirst',
    'testAsmFirstRuntime': 'getTestAsmFirstRuntime',
};
const AsmFunctionsTester_receivers = [
    { "receiver": "internal", "message": { "kind": "empty" } },
];
class AsmFunctionsTester {
    static storageReserve = 0n;
    static async init() {
        return await AsmFunctionsTester_init();
    }
    static async fromInit() {
        const __gen_init = await AsmFunctionsTester_init();
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new AsmFunctionsTester(address, __gen_init);
    }
    static fromAddress(address) {
        return new AsmFunctionsTester(address);
    }
    address;
    init;
    abi = {
        types: AsmFunctionsTester_types,
        getters: AsmFunctionsTester_getters,
        receivers: AsmFunctionsTester_receivers,
        errors: AsmFunctionsTester_errors,
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
        if (body === null) {
            throw new Error('Invalid message type');
        }
        await provider.internal(via, { ...args, body: body });
    }
    async getTestAsmStoreDict(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(81432, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestAsmLoadCoins(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(86431, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestAsmLoadCoinsMut(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(128872, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestAsmLoadCoinsMutRuntime(provider, c) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(c);
        const source = (await provider.get(127504, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getTestAsmLoadInt(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(78218, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestAsmDebugStr(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(93496, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestAsmCreateUseWord(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(111813, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestAsmSecondToLast(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(67436, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestAsmSecondToLastRuntime(provider, s1, s2) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleTwo(s1));
        builder.writeTuple(storeTupleTwo(s2));
        const source = (await provider.get(121641, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getTestAsmFirst(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(124989, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestAsmFirstRuntime(provider, s1, s2, s3) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleTwoInTwo(s1));
        builder.writeTuple(storeTupleTwoInTwo(s2));
        builder.writeTuple(storeTupleTwoInTwo(s3));
        const source = (await provider.get(97303, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
}
exports.AsmFunctionsTester = AsmFunctionsTester;
