"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapTraverseTestContract = exports.MapTraverseTestContract_getterMapping = void 0;
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
exports.storeMyStruct = storeMyStruct;
exports.loadMyStruct = loadMyStruct;
exports.storeMyStructWithMap = storeMyStructWithMap;
exports.loadMyStructWithMap = loadMyStructWithMap;
exports.storeMapTraverseTestContract$Data = storeMapTraverseTestContract$Data;
exports.loadMapTraverseTestContract$Data = loadMapTraverseTestContract$Data;
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
function storeMyStruct(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
        b_0.storeBit(src.b);
    };
}
function loadMyStruct(slice) {
    const sc_0 = slice;
    const _a = sc_0.loadIntBig(257);
    const _b = sc_0.loadBit();
    return { $$type: 'MyStruct', a: _a, b: _b };
}
function loadTupleMyStruct(source) {
    const _a = source.readBigNumber();
    const _b = source.readBoolean();
    return { $$type: 'MyStruct', a: _a, b: _b };
}
function loadGetterTupleMyStruct(source) {
    const _a = source.readBigNumber();
    const _b = source.readBoolean();
    return { $$type: 'MyStruct', a: _a, b: _b };
}
function storeTupleMyStruct(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.a);
    builder.writeBoolean(source.b);
    return builder.build();
}
function dictValueParserMyStruct() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMyStruct(src)).endCell());
        },
        parse: (src) => {
            return loadMyStruct(src.loadRef().beginParse());
        }
    };
}
function storeMyStructWithMap(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeDict(src.m, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
    };
}
function loadMyStructWithMap(slice) {
    const sc_0 = slice;
    const _m = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_0);
    return { $$type: 'MyStructWithMap', m: _m };
}
function loadTupleMyStructWithMap(source) {
    const _m = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'MyStructWithMap', m: _m };
}
function loadGetterTupleMyStructWithMap(source) {
    const _m = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'MyStructWithMap', m: _m };
}
function storeTupleMyStructWithMap(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeCell(source.m.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.m, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    return builder.build();
}
function dictValueParserMyStructWithMap() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMyStructWithMap(src)).endCell());
        },
        parse: (src) => {
            return loadMyStructWithMap(src.loadRef().beginParse());
        }
    };
}
function storeMapTraverseTestContract$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeDict(src.m, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_0.store(storeMyStructWithMap(src.s));
    };
}
function loadMapTraverseTestContract$Data(slice) {
    const sc_0 = slice;
    const _m = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_0);
    const _s = loadMyStructWithMap(sc_0);
    return { $$type: 'MapTraverseTestContract$Data', m: _m, s: _s };
}
function loadTupleMapTraverseTestContract$Data(source) {
    const _m = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _s = loadTupleMyStructWithMap(source);
    return { $$type: 'MapTraverseTestContract$Data', m: _m, s: _s };
}
function loadGetterTupleMapTraverseTestContract$Data(source) {
    const _m = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _s = loadGetterTupleMyStructWithMap(source);
    return { $$type: 'MapTraverseTestContract$Data', m: _m, s: _s };
}
function storeTupleMapTraverseTestContract$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeCell(source.m.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.m, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeTuple(storeTupleMyStructWithMap(source.s));
    return builder.build();
}
function dictValueParserMapTraverseTestContract$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMapTraverseTestContract$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMapTraverseTestContract$Data(src.loadRef().beginParse());
        }
    };
}
function initMapTraverseTestContract_init_args(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
async function MapTraverseTestContract_init() {
    const __code = core_1.Cell.fromBase64('te6ccgECXQEAG00AAhr/ACDjA/SkE/S88sgLAQIB+DAB0HLXIdIA0gD6QCEQNFBmbwT4YQL4Yu1E0NIAAZj0BPQEARJsEo5QMG2BAQFxgGQiIW6VW1n0WjCYyAHPAEEz9ELigQEBcoEAyCIhbpVbWfRaMJjIAc8AQTP0QuKBAQFzgQEsIiFulVtZ9FowmMgBzwBBM/RC4iDiWwEDAgJxBAUAOpEw4HAh10kgwh+VMQHTHzCRMuLAAAHBIbDc8sCCAgEgBgcCASAyMwIBIAgJAgEgJSYCASAKCwIBIBcYAgHJDA0B0bOfe1E0NIAAZj0BPQEARJsEo5QMG2BAQFxgGQiIW6VW1n0WjCYyAHPAEEz9ELigQEBcoEAyCIhbpVbWfRaMJjIAc8AQTP0QuKBAQFzgQEsIiFulVtZ9FowmMgBzwBBM/RC4iDi2zxsIYBUBz70+1E0NIAAZj0BPQEARJsEo5QMG2BAQFxgGQiIW6VW1n0WjCYyAHPAEEz9ELigQEBcoEAyCIhbpVbWfRaMJjIAc8AQTP0QuKBAQFzgQEsIiFulVtZ9FowmMgBzwBBM/RC4iDi2zxsIYDgHPvp7UTQ0gABmPQE9AQBEmwSjlAwbYEBAXGAZCIhbpVbWfRaMJjIAc8AQTP0QuKBAQFygQDIIiFulVtZ9FowmMgBzwBBM/RC4oEBAXOBASwiIW6VW1n0WjCYyAHPAEEz9ELiIOLbPGwhgSAfRtgQELjQhgAlQLhGlnvYrQ2bF9+yRAIo60wjD6l4L4otm2BCi+u0OcgGR/yFkCgQEBzwDKAMkgbpUwWfRZMJRBM/QT4oEBC40IYAJUC4RpZ72K0NmxffskQCKOtMIw+peC+KLZtgQovrtDpIEAyHDIWQKBAQHPAMoAyQ8B+iBulTBZ9FkwlEEz9BPigQELjQhgAlQLhGlnvYrQ2bF9+yRAIo60wjD6l4L4otm2BCi+u0OsgQEsf8hZAoEBAc8AygDJIG6VMFn0WTCUQTP0E+KBAQuNCGACVAuEaWe9itDZsX37JEAijrTCMPqXgvii2bYEKL67Q7SBAZBwEAF0yFkCgQEBzwDKAMkgbpUwWfRZMJRBM/QT4nBUcAAkgQEL9INvpSCREpUxbTJtAeKQiuhbNFmgAaABoBEAqCBukjBtndCBAQHXANIAWWwSbwLiIG7y0IBvIsgjzxbJ0IEBCNchAZjTAjAWoFBFoJrTAjAUoFAjoFAD4oEBC1RGFVn0dG+lIJQC1DBYlTFtMm0B4gHYbYEBC40IYAJUC4RpZ72K0NmxffskQCKOtMIw+peC+KLZtgQovrtDnIBkgQEBIW6VW1n0WTCYyAHPAEEz9EHigQELjQhgAlQLhGlnvYrQ2bF9+yRAIo60wjD6l4L4otm2BCi+u0OkgQDIgQEBEwH8IW6VW1n0WTCYyAHPAEEz9EHigQELjQhgAlQLhGlnvYrQ2bF9+yRAIo60wjD6l4L4otm2BCi+u0OsgQEsgQEBIW6VW1n0WTCYyAHPAEEz9EHigQELjQhgAlQLhGlnvYrQ2bF9+yRAIo60wjD6l4L4otm2BCi+u0O0gQGQgQEBFADUIW6VW1n0WTCYyAHPAEEz9EHicFMBgQELgQEBWfSCb6UgllAj1wAwWJZsIW0ybQHikI4yyCLPFsnQgQEI1yHTAjAUoFAjoIEBC1REE4EBAUEz9HRvpSCWUCPXADBYlmwhbTJtAeLoW2wSoAHebYEBAXGAZCIhbpVbWfRaMJjIAc8AQTP0QuKBAQFygQDIIiFulVtZ9FowmMgBzwBBM/RC4oEBAXOBASwiIW6VW1n0WjCYyAHPAEEz9ELigQEBdIEBkCIhbpVbWfRaMJjIAc8AQTP0QuJwgQEBVFIAFgB6WfSEb6UgllAj1wAwWJZsIW0ybQHiMZCOIQGkgQEBUwMDUERBM/R4b6UgllAj1wAwWJZsIW0ybQHiMegwMQHRs9E7UTQ0gABmPQE9AQBEmwSjlAwbYEBAXGAZCIhbpVbWfRaMJjIAc8AQTP0QuKBAQFygQDIIiFulVtZ9FowmMgBzwBBM/RC4oEBAXOBASwiIW6VW1n0WjCYyAHPAEEz9ELiIOLbPGwhgGQIBIBscAdJtgQEBcX8hIW6VW1n0WjCYyAHPAEEz9ELigQEBcnBxIW6VW1n0WjCYyAHPAEEz9ELigQEBc39xIW6VW1n0WjCYyAHPAEEz9ELigQEBdHBxIW6VW1n0WjCYyAHPAEEz9ELicFRwAYEBAXEaAJJZ9IRvpSCWUCPXADBYlmwhbTJtAeKQjiuVUTOgAqSUZqBDA+KBAQFURRVxQTP0eG+lIJZQI9cAMFiWbCFtMm0B4hBF6FszoAGgAgJ2HR4B0a3/dqJoaQAAzHoCegIAiTYJRygYNsCAgLjAMhEQt0qtrPotGExkAOeAIJn6IXFAgIC5QIBkERC3Sq2s+i0YTGQA54AgmfohcUCAgLnAgJYRELdKraz6LRhMZADngCCZ+iFxEHFtnjYQwCIBz7ju1E0NIAAZj0BPQEARJsEo5QMG2BAQFxgGQiIW6VW1n0WjCYyAHPAEEz9ELigQEBcoEAyCIhbpVbWfRaMJjIAc8AQTP0QuKBAQFzgQEsIiFulVtZ9FowmMgBzwBBM/RC4iDi2zxsIYHwHPug7UTQ0gABmPQE9AQBEmwSjlAwbYEBAXGAZCIhbpVbWfRaMJjIAc8AQTP0QuKBAQFygQDIIiFulVtZ9FowmMgBzwBBM/RC4oEBAXOBASwiIW6VW1n0WjCYyAHPAEEz9ELiIOLbPGwhggAIhwgQEBVFIAWfSEb6UgllAj1wAwWJZsIW0ybQHikI4jUhCgEqCBAQFTAwNQREEz9HhvpSCWUCPXADBYlmwhbTJtAeLoWwHsbYEBAXGAZH/IWQKBAQHPAMoAySBulTBZ9FowlEEz9BXigQEBcoEAyHDIWQKBAQHPAMoAySBulTBZ9FowlEEz9BXigQEBc4EBLH/IWQKBAQHPAMoAySBulTBZ9FowlEEz9BXigQEBdIEBkHDIWQKBAQHPAMoAySEA6CBulTBZ9FowlEEz9BXicFRwACSBAQH0hW+lIJESlTFtMm0B4pCORCBukjBtndCBAQHXANIAWWwSbwLiIG7y0IBvIpZRUaBQRaCYUTGgUCOgUAPigQEBVEYVWfR4b6UglALUMFiVMW0ybQHi6Fs0WaABoAGgAfZtgQELjQhgAlQLhGlnvYrQ2bF9+yRAIo60wjD6l4L4otm2BCi+u0OcgGQgbpUwWfRZMJjIAfoCQTP0QeKBAQuNCGACVAuEaWe9itDZsX37JEAijrTCMPqXgvii2bYEKL67Q6SBAMggbpUwWfRZMJjIAfoCQTP0QeKBAQsjAuKJgQEsIG6VMFn0WTCYyAH6AkEz9EHigQELjQhgAlQLhGlnvYrQ2bF9+yRAIo60wjD6l4L4otm2BCi+u0O0gQGQIG6VMFn0WTCYyAH6AkEz9EHicFMBgQEL9IJvpSCVAvoAMFiVMW0ybQHikIroW2wSoFckAFjIIs8WydCBAQjXIdMCMBSgUCOggQELVEQTWfR0b6UglQL6ADBYlTFtMm0B4gIBICcoAgFYLzAB0bGuO1E0NIAAZj0BPQEARJsEo5QMG2BAQFxgGQiIW6VW1n0WjCYyAHPAEEz9ELigQEBcoEAyCIhbpVbWfRaMJjIAc8AQTP0QuKBAQFzgQEsIiFulVtZ9FowmMgBzwBBM/RC4iDi2zxsIYCkB0bGqu1E0NIAAZj0BPQEARJsEo5QMG2BAQFxgGQiIW6VW1n0WjCYyAHPAEEz9ELigQEBcoEAyCIhbpVbWfRaMJjIAc8AQTP0QuKBAQFzgQEsIiFulVtZ9FowmMgBzwBBM/RC4iDi2zxsIYCwC5G2BAQFxjQhgAlQLhGlnvYrQ2bF9+yRAIo60wjD6l4L4otm2BCi+u0OcIG6VMFn0WjCUQTP0FOKBAQFyjQhgAlQLhGlnvYrQ2bF9+yRAIo60wjD6l4L4otm2BCi+u0OkIG6VMFn0WjCUQTP0FOKBAQFziVcqAb4gbpUwWfRaMJRBM/QU4oEBAXSNCGACVAuEaWe9itDZsX37JEAijrTCMPqXgvii2bYEKL67Q7QgbpUwWfRaMJRBM/QU4nBTAYEBAfSEb6UgkRKVMW0ybQHikIroW2wSoCsAUsgBzxbJ0IEBCNchUTGgA9MCMBKggQEBVEQTWfR4b6UgkRKVMW0ybQHiAfRtgQELjQhgAlQLhGlnvYrQ2bF9+yRAIo60wjD6l4L4otm2BCi+u0OcyIBkAcsPySBulTBZ9FkwlEEz9BPigQELjQhgAlQLhGlnvYrQ2bF9+yRAIo60wjD6l4L4otm2BCi+u0OkyIEAyAHLD8kgbpUwWfRZMJRBM/QT4i0B+oEBC40IYAJUC4RpZ72K0NmxffskQCKOtMIw+peC+KLZtgQovrtDrMiBASwByw/JIG6VMFn0WTCUQTP0E+KBAQuNCGACVAuEaWe9itDZsX37JEAijrTCMPqXgvii2bYEKL67Q7TIgQGQAcsPySBulTBZ9FkwlEEz9BPicFMBLgCQgQEL9INvpSCREpUxbTJtAeKQji/IIs8WydCBAQjXIdMCMBSgA9DTDzASoIEBC1REE1n0dG+lIJQC1DBYlTFtMm0B4uhbbBKgAdGugfaiaGkAAMx6AnoCAIk2CUcoGDbAgIC4wDIRELdKraz6LRhMZADngCCZ+iFxQICAuUCAZBEQt0qtrPotGExkAOeAIJn6IXFAgIC5wICWERC3Sq2s+i0YTGQA54AgmfohcRBxbZ42EMAxAdGssfaiaGkAAMx6AnoCAIk2CUcoGDbAgIC4wDIRELdKraz6LRhMZADngCCZ+iFxQICAuUCAZBEQt0qtrPotGExkAOeAIJn6IXFAgIC5wICWERC3Sq2s+i0YTGQA54AgmfohcRBxbZ42EMBGAIhwgQEBVFMAWfSEb6UgllAj1wAwWJZsIW0ybQHikI4jUhCgEqCBAQFTBANQREEz9HhvpSCWUCPXADBYlmwhbTJtAeLoWwIBIDQ1AgEgSksB0bboXaiaGkAAMx6AnoCAIk2CUcoGDbAgIC4wDIRELdKraz6LRhMZADngCCZ+iFxQICAuUCAZBEQt0qtrPotGExkAOeAIJn6IXFAgIC5wICWERC3Sq2s+i0YTGQA54AgmfohcRBxbZ42EMDYCASA4OQHebYEBAXGAZCIhbpVbWfRaMJjIAc8AQTP0QuKBAQFygQDIIiFulVtZ9FowmMgBzwBBM/RC4oEBAXOBASwiIW6VW1n0WjCYyAHPAEEz9ELigQEBdIEBkCIhbpVbWfRaMJjIAc8AQTP0QuJwgQEBVFIANwCSWfSEb6UgllAj1wAwWJZsIW0ybQHikI4sgQEBckBV9FowUhSgEqCBAQFTAwNQREEz9HhvpSCWUCPXADBYlmwhbTJtAeLoECNfAwIBSDo7AgEgP0AB0Knq7UTQ0gABmPQE9AQBEmwSjlAwbYEBAXGAZCIhbpVbWfRaMJjIAc8AQTP0QuKBAQFygQDIIiFulVtZ9FowmMgBzwBBM/RC4oEBAXOBASwiIW6VW1n0WjCYyAHPAEEz9ELiIOLbPGwhPAHOqyHtRNDSAAGY9AT0BAESbBKOUDBtgQEBcYBkIiFulVtZ9FowmMgBzwBBM/RC4oEBAXKBAMgiIW6VW1n0WjCYyAHPAEEz9ELigQEBc4EBLCIhbpVbWfRaMJjIAc8AQTP0QuIg4ts8Wz4B1G2BAQFxgGQgbpUwWfRaMJjIAfoCQTP0QuKBAQFygQDIIG6VMFn0WjCYyAH6AkEz9ELigQEBc4EBLCBulTBZ9FowmMgB+gJBM/RC4oEBAXSBAZAgbpUwWfRaMJjIAfoCQTP0QuJwUwGBAQE9AHL0hG+lIJUC+gAwWJUxbTJtAeKQjh9RMaBQI6CBAQFURBNZ9HhvpSCVAvoAMFiVMW0ybQHi6FtsEqAA7G2BAQFxgGQiIW6VW1n0WjCYyAHPAEEz9ELigQEBVFEAWfSEb6UgllAj1wAwWJZsIW0ybQHikI47gQEBIqQCpCEQRRAjIW6VW1n0WjCYyAHPAEEz9ELigQEBUwFQREEz9HhvpSCWUCPXADBYlmwhbTJtAeLoXwMCASBBQgHRrRl2omhpAADMegJ6AgCJNglHKBg2wICAuMAyERC3Sq2s+i0YTGQA54AgmfohcUCAgLlAgGQRELdKraz6LRhMZADngCCZ+iFxQICAucCAlhEQt0qtrPotGExkAOeAIJn6IXEQcW2eNhDARwHQqoztRNDSAAGY9AT0BAESbBKOUDBtgQEBcYBkIiFulVtZ9FowmMgBzwBBM/RC4oEBAXKBAMgiIW6VW1n0WjCYyAHPAEEz9ELigQEBc4EBLCIhbpVbWfRaMJjIAc8AQTP0QuIg4ts8bCFDAdCqOu1E0NIAAZj0BPQEARJsEo5QMG2BAQFxgGQiIW6VW1n0WjCYyAHPAEEz9ELigQEBcoEAyCIhbpVbWfRaMJjIAc8AQTP0QuKBAQFzgQEsIiFulVtZ9FowmMgBzwBBM/RC4iDi2zxsIUYC9m2BAQuNCGACVAuEaWe9itDZsX37JEAijrTCMPqXgvii2bYEKL67Q5x/cSFulVtZ9FkwmMgBzwBBM/RB4oEBC40IYAJUC4RpZ72K0NmxffskQCKOtMIw+peC+KLZtgQovrtDpHBxIW6VW1n0WTCYyAHPAEEz9EHigQELiVdEAeh/cSFulVtZ9FkwmMgBzwBBM/RB4oEBC40IYAJUC4RpZ72K0NmxffskQCKOtMIw+peC+KLZtgQovrtDtHBxIW6VW1n0WTCYyAHPAEEz9EHicFRwAYEBC3FZ9IJvpSCWUCPXADBYlmwhbTJtAeKQiuhbM6ABoEUAeMgizxbJ0IEBCNchAZfTAjAUoAKkl9MCMBKgQwPigQELVEUVcUEz9HRvpSCWUCPXADBYlmwhbTJtAeIQRQBIbXCBAQFUEgBZ9IRvpSCWUCPXADBYlmwhbTJtAeJsIZMwgCrgAfZtgQELjQhgAlQLhGlnvYrQ2bF9+yRAIo60wjD6l4L4otm2BCi+u0OcgGQgbpUwWfRZMJjIAfoDQTP0QeKBAQuNCGACVAuEaWe9itDZsX37JEAijrTCMPqXgvii2bYEKL67Q6SBAMggbpUwWfRZMJjIAfoDQTP0QeKBAQtIAuKJgQEsIG6VMFn0WTCYyAH6A0Ez9EHigQELjQhgAlQLhGlnvYrQ2bF9+yRAIo60wjD6l4L4otm2BCi+u0O0gQGQIG6VMFn0WTCYyAH6A0Ez9EHicFMBgQEL9IJvpSCVAvoBMFiVMW0ybQHikIroW2wSoFdJAFjIIs8WydCBAQjXIdMCMBSgUCOggQELVEQTWfR0b6UglQL6ATBYlTFtMm0B4gIBSExNAdG0Zb2omhpAADMegJ6AgCJNglHKBg2wICAuMAyERC3Sq2s+i0YTGQA54AgmfohcUCAgLlAgGQRELdKraz6LRhMZADngCCZ+iFxQICAucCAlhEQt0qtrPotGExkAOeAIJn6IXEQcW2eNhDBWAdGudvaiaGkAAMx6AnoCAIk2CUcoGDbAgIC4wDIRELdKraz6LRhMZADngCCZ+iFxQICAuUCAZBEQt0qtrPotGExkAOeAIJn6IXFAgIC5wICWERC3Sq2s+i0YTGQA54AgmfohcRBxbZ42EMBOAgFmUFEB4G2BAQFxgGQiIW6VW1n0WjCYyAHPAEEz9ELigQEBcoEAyCIhbpVbWfRaMJjIAc8AQTP0QuKBAQFzgQEsIiFulVtZ9FowmMgBzwBBM/RC4oEBAXSBAZAiIW6VW1n0WjCYyAHPAEEz9ELicCCBAQFUUwBPAIJZ9IRvpSCWUCPXADBYlmwhbTJtAeKQjiRRMaBQI6CBAQFTBANQREEz9HhvpSCWUCPXADBYlmwhbTJtAeLoW2wSoAHPofe1E0NIAAZj0BPQEARJsEo5QMG2BAQFxgGQiIW6VW1n0WjCYyAHPAEEz9ELigQEBcoEAyCIhbpVbWfRaMJjIAc8AQTP0QuKBAQFzgQEsIiFulVtZ9FowmMgBzwBBM/RC4iDi2zxsIZSAc+hi7UTQ0gABmPQE9AQBEmwSjlAwbYEBAXGAZCIhbpVbWfRaMJjIAc8AQTP0QuKBAQFygQDIIiFulVtZ9FowmMgBzwBBM/RC4oEBAXOBASwiIW6VW1n0WjCYyAHPAEEz9ELiIOLbPGwhlQB1G2BAQFxgGQgbpUwWfRaMJjIAfoDQTP0QuKBAQFygQDIIG6VMFn0WjCYyAH6A0Ez9ELigQEBc4EBLCBulTBZ9FowmMgB+gNBM/RC4oEBAXSBAZAgbpUwWfRaMJjIAfoDQTP0QuJwUwGBAQFTAHL0hG+lIJUC+gEwWJUxbTJtAeKQjh9RMaBQI6CBAQFURBNZ9HhvpSCVAvoBMFiVMW0ybQHi6FtsEqAB3G2BAQFxyIBkAcsPySBulTBZ9FowlEEz9BXigQEBcsiBAMgByw/JIG6VMFn0WjCUQTP0FeKBAQFzyIEBLAHLD8kgbpUwWfRaMJRBM/QV4oEBAXTIgQGQAcsPySBulTBZ9FowlEEz9BXicFMBgQEBVQBw9IVvpSCREpUxbTJtAeKQjiLQUTGgA9MPMBKggQEBVEQTWfR4b6UglALUMFiVMW0ybQHi6FtsEqAE8m2BAQuNCGACVAuEaWe9itDZsX37JEAijrTCMPqXgvii2bYEKL67Q5yNCGACVAuEaWe9itDZsX37JEAijrTCMPqXgvii2bYEKL67Q6QgbpUwWfRZMJjIAc8WQTP0QeKBAQuJiSBulTBZ9FkwmMgBzxZBM/RB4oEBC4lXWFlaAEOACVAuEaWe9itDZsX37JEAijrTCMPqXgvii2bYEKL67Q6wAEOACVAuEaWe9itDZsX37JEAijrTCMPqXgvii2bYEKL67Q7QAEOACVAuEaWe9itDZsX37JEAijrTCMPqXgvii2bYEKL67Q7wAuyJIG6VMFn0WTCYyAHPFkEz9EHigQELjQhgAlQLhGlnvYrQ2bF9+yRAIo60wjD6l4L4otm2BCi+u0PMjQhgAlQLhGlnvYrQ2bF9+yRAIo60wjD6l4L4otm2BCi+u0QEIG6VMFn0WTCYyAHPFkEz9EHicFMBgQELW1wAQ4AJUC4RpZ72K0NmxffskQCKOtMIw+peC+KLZtgQovrtDxAAhvSCb6UgkRKVMW0ybQHikI4tyCLPFsnQgQEI1yHTAjAUoMhQBM8WydCBAQjXIdMCMBKggQELVEQTWfR0b6US6FtsEqA=');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initMapTraverseTestContract_init_args({ $$type: 'MapTraverseTestContract_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const MapTraverseTestContract_errors = {
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
const MapTraverseTestContract_types = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "MessageParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "BasechainAddress", "header": null, "fields": [{ "name": "hash", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }] },
    { "name": "MyStruct", "header": null, "fields": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "MyStructWithMap", "header": null, "fields": [{ "name": "m", "type": { "kind": "dict", "key": "int", "value": "int" } }] },
    { "name": "MapTraverseTestContract$Data", "header": null, "fields": [{ "name": "m", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "s", "type": { "kind": "simple", "type": "MyStructWithMap", "optional": false } }] },
];
const MapTraverseTestContract_getters = [
    { "name": "test_int_int", "methodId": 115949, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "test_int_coins", "methodId": 106986, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "test_int_varint16", "methodId": 117373, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "test_int_bool", "methodId": 77636, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "test_int_cell", "methodId": 117602, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "test_int_address", "methodId": 83640, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "test_int_struct", "methodId": 79520, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "test_address_int", "methodId": 65769, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "test_address_coins", "methodId": 80894, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "test_address_varint16", "methodId": 113202, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "test_address_bool", "methodId": 111244, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "test_address_cell", "methodId": 87722, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "test_address_address", "methodId": 123693, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "test_address_struct", "methodId": 65619, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "test_empty_map", "methodId": 96611, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "test_null", "methodId": 112186, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "test_map_modification_during_traversal1", "methodId": 104258, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "test_map_modification_during_traversal2", "methodId": 108321, "arguments": [], "returnType": null },
    { "name": "test_map_size", "methodId": 73341, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "test_map_as_field", "methodId": 95491, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "test_map_as_struct_field", "methodId": 79374, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
];
exports.MapTraverseTestContract_getterMapping = {
    'test_int_int': 'getTestIntInt',
    'test_int_coins': 'getTestIntCoins',
    'test_int_varint16': 'getTestIntVarint16',
    'test_int_bool': 'getTestIntBool',
    'test_int_cell': 'getTestIntCell',
    'test_int_address': 'getTestIntAddress',
    'test_int_struct': 'getTestIntStruct',
    'test_address_int': 'getTestAddressInt',
    'test_address_coins': 'getTestAddressCoins',
    'test_address_varint16': 'getTestAddressVarint16',
    'test_address_bool': 'getTestAddressBool',
    'test_address_cell': 'getTestAddressCell',
    'test_address_address': 'getTestAddressAddress',
    'test_address_struct': 'getTestAddressStruct',
    'test_empty_map': 'getTestEmptyMap',
    'test_null': 'getTestNull',
    'test_map_modification_during_traversal1': 'getTestMapModificationDuringTraversal1',
    'test_map_modification_during_traversal2': 'getTestMapModificationDuringTraversal2',
    'test_map_size': 'getTestMapSize',
    'test_map_as_field': 'getTestMapAsField',
    'test_map_as_struct_field': 'getTestMapAsStructField',
};
const MapTraverseTestContract_receivers = [
    { "receiver": "internal", "message": { "kind": "empty" } },
];
class MapTraverseTestContract {
    static storageReserve = 0n;
    static async init() {
        return await MapTraverseTestContract_init();
    }
    static async fromInit() {
        const __gen_init = await MapTraverseTestContract_init();
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new MapTraverseTestContract(address, __gen_init);
    }
    static fromAddress(address) {
        return new MapTraverseTestContract(address);
    }
    address;
    init;
    abi = {
        types: MapTraverseTestContract_types,
        getters: MapTraverseTestContract_getters,
        receivers: MapTraverseTestContract_receivers,
        errors: MapTraverseTestContract_errors,
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
    async getTestIntInt(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(115949, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getTestIntCoins(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(106986, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getTestIntVarint16(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(117373, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getTestIntBool(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(77636, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getTestIntCell(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(117602, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getTestIntAddress(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(83640, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getTestIntStruct(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(79520, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getTestAddressInt(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(65769, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getTestAddressCoins(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(80894, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getTestAddressVarint16(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(113202, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getTestAddressBool(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(111244, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getTestAddressCell(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(87722, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getTestAddressAddress(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(123693, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getTestAddressStruct(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(65619, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getTestEmptyMap(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(96611, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getTestNull(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(112186, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getTestMapModificationDuringTraversal1(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(104258, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getTestMapModificationDuringTraversal2(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(108321, builder.build())).stack;
    }
    async getTestMapSize(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(73341, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getTestMapAsField(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(95491, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getTestMapAsStructField(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(79374, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
}
exports.MapTraverseTestContract = MapTraverseTestContract;
