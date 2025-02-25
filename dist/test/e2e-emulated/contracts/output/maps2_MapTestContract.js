"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapTestContract = exports.MapTestContract_getterMapping = void 0;
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
exports.storeSomeStruct = storeSomeStruct;
exports.loadSomeStruct = loadSomeStruct;
exports.storeGetAllMapsResult = storeGetAllMapsResult;
exports.loadGetAllMapsResult = loadGetAllMapsResult;
exports.storeReplaceAllMapsResult = storeReplaceAllMapsResult;
exports.loadReplaceAllMapsResult = loadReplaceAllMapsResult;
exports.storeReplaceGetAllMapsResult = storeReplaceGetAllMapsResult;
exports.loadReplaceGetAllMapsResult = loadReplaceGetAllMapsResult;
exports.storeExistsAllMapsResult = storeExistsAllMapsResult;
exports.loadExistsAllMapsResult = loadExistsAllMapsResult;
exports.storeIsEmptyAllMapsResult = storeIsEmptyAllMapsResult;
exports.loadIsEmptyAllMapsResult = loadIsEmptyAllMapsResult;
exports.storeAsCellAllMapsResult = storeAsCellAllMapsResult;
exports.loadAsCellAllMapsResult = loadAsCellAllMapsResult;
exports.storeSetAllMaps = storeSetAllMaps;
exports.loadSetAllMaps = loadSetAllMaps;
exports.storeDelAllMaps = storeDelAllMaps;
exports.loadDelAllMaps = loadDelAllMaps;
exports.storeReplaceAllMaps = storeReplaceAllMaps;
exports.loadReplaceAllMaps = loadReplaceAllMaps;
exports.storeReplaceGetAllMaps = storeReplaceGetAllMaps;
exports.loadReplaceGetAllMaps = loadReplaceGetAllMaps;
exports.storeCheckNullReference = storeCheckNullReference;
exports.loadCheckNullReference = loadCheckNullReference;
exports.storeMapTestContract$Data = storeMapTestContract$Data;
exports.loadMapTestContract$Data = loadMapTestContract$Data;
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
function storeSomeStruct(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.int, 257);
        b_0.storeBit(src.bool);
        b_0.storeAddress(src.address);
        b_0.storeInt(src.a, 257);
        const b_1 = new core_1.Builder();
        b_1.storeInt(src.b, 257);
        b_0.storeRef(b_1.endCell());
    };
}
function loadSomeStruct(slice) {
    const sc_0 = slice;
    const _int = sc_0.loadIntBig(257);
    const _bool = sc_0.loadBit();
    const _address = sc_0.loadAddress();
    const _a = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _b = sc_1.loadIntBig(257);
    return { $$type: 'SomeStruct', int: _int, bool: _bool, address: _address, a: _a, b: _b };
}
function loadTupleSomeStruct(source) {
    const _int = source.readBigNumber();
    const _bool = source.readBoolean();
    const _address = source.readAddress();
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    return { $$type: 'SomeStruct', int: _int, bool: _bool, address: _address, a: _a, b: _b };
}
function loadGetterTupleSomeStruct(source) {
    const _int = source.readBigNumber();
    const _bool = source.readBoolean();
    const _address = source.readAddress();
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    return { $$type: 'SomeStruct', int: _int, bool: _bool, address: _address, a: _a, b: _b };
}
function storeTupleSomeStruct(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.int);
    builder.writeBoolean(source.bool);
    builder.writeAddress(source.address);
    builder.writeNumber(source.a);
    builder.writeNumber(source.b);
    return builder.build();
}
function dictValueParserSomeStruct() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSomeStruct(src)).endCell());
        },
        parse: (src) => {
            return loadSomeStruct(src.loadRef().beginParse());
        }
    };
}
function storeGetAllMapsResult(src) {
    return (builder) => {
        const b_0 = builder;
        if (src.int_int !== null && src.int_int !== undefined) {
            b_0.storeBit(true).storeInt(src.int_int, 257);
        }
        else {
            b_0.storeBit(false);
        }
        if (src.int_int8 !== null && src.int_int8 !== undefined) {
            b_0.storeBit(true).storeInt(src.int_int8, 257);
        }
        else {
            b_0.storeBit(false);
        }
        if (src.int_int42 !== null && src.int_int42 !== undefined) {
            b_0.storeBit(true).storeInt(src.int_int42, 257);
        }
        else {
            b_0.storeBit(false);
        }
        const b_1 = new core_1.Builder();
        if (src.int_int256 !== null && src.int_int256 !== undefined) {
            b_1.storeBit(true).storeInt(src.int_int256, 257);
        }
        else {
            b_1.storeBit(false);
        }
        if (src.int_uint8 !== null && src.int_uint8 !== undefined) {
            b_1.storeBit(true).storeInt(src.int_uint8, 257);
        }
        else {
            b_1.storeBit(false);
        }
        if (src.int_uint42 !== null && src.int_uint42 !== undefined) {
            b_1.storeBit(true).storeInt(src.int_uint42, 257);
        }
        else {
            b_1.storeBit(false);
        }
        const b_2 = new core_1.Builder();
        if (src.int_uint256 !== null && src.int_uint256 !== undefined) {
            b_2.storeBit(true).storeInt(src.int_uint256, 257);
        }
        else {
            b_2.storeBit(false);
        }
        if (src.int_coins !== null && src.int_coins !== undefined) {
            b_2.storeBit(true).storeInt(src.int_coins, 257);
        }
        else {
            b_2.storeBit(false);
        }
        if (src.int8_int !== null && src.int8_int !== undefined) {
            b_2.storeBit(true).storeInt(src.int8_int, 257);
        }
        else {
            b_2.storeBit(false);
        }
        const b_3 = new core_1.Builder();
        if (src.int8_int8 !== null && src.int8_int8 !== undefined) {
            b_3.storeBit(true).storeInt(src.int8_int8, 257);
        }
        else {
            b_3.storeBit(false);
        }
        if (src.int8_int42 !== null && src.int8_int42 !== undefined) {
            b_3.storeBit(true).storeInt(src.int8_int42, 257);
        }
        else {
            b_3.storeBit(false);
        }
        if (src.int8_int256 !== null && src.int8_int256 !== undefined) {
            b_3.storeBit(true).storeInt(src.int8_int256, 257);
        }
        else {
            b_3.storeBit(false);
        }
        const b_4 = new core_1.Builder();
        if (src.int8_uint8 !== null && src.int8_uint8 !== undefined) {
            b_4.storeBit(true).storeInt(src.int8_uint8, 257);
        }
        else {
            b_4.storeBit(false);
        }
        if (src.int8_uint42 !== null && src.int8_uint42 !== undefined) {
            b_4.storeBit(true).storeInt(src.int8_uint42, 257);
        }
        else {
            b_4.storeBit(false);
        }
        if (src.int8_uint256 !== null && src.int8_uint256 !== undefined) {
            b_4.storeBit(true).storeInt(src.int8_uint256, 257);
        }
        else {
            b_4.storeBit(false);
        }
        const b_5 = new core_1.Builder();
        if (src.int8_coins !== null && src.int8_coins !== undefined) {
            b_5.storeBit(true).storeInt(src.int8_coins, 257);
        }
        else {
            b_5.storeBit(false);
        }
        if (src.int42_int !== null && src.int42_int !== undefined) {
            b_5.storeBit(true).storeInt(src.int42_int, 257);
        }
        else {
            b_5.storeBit(false);
        }
        if (src.int42_int8 !== null && src.int42_int8 !== undefined) {
            b_5.storeBit(true).storeInt(src.int42_int8, 257);
        }
        else {
            b_5.storeBit(false);
        }
        const b_6 = new core_1.Builder();
        if (src.int42_int42 !== null && src.int42_int42 !== undefined) {
            b_6.storeBit(true).storeInt(src.int42_int42, 257);
        }
        else {
            b_6.storeBit(false);
        }
        if (src.int42_int256 !== null && src.int42_int256 !== undefined) {
            b_6.storeBit(true).storeInt(src.int42_int256, 257);
        }
        else {
            b_6.storeBit(false);
        }
        if (src.int42_uint8 !== null && src.int42_uint8 !== undefined) {
            b_6.storeBit(true).storeInt(src.int42_uint8, 257);
        }
        else {
            b_6.storeBit(false);
        }
        const b_7 = new core_1.Builder();
        if (src.int42_uint42 !== null && src.int42_uint42 !== undefined) {
            b_7.storeBit(true).storeInt(src.int42_uint42, 257);
        }
        else {
            b_7.storeBit(false);
        }
        if (src.int42_uint256 !== null && src.int42_uint256 !== undefined) {
            b_7.storeBit(true).storeInt(src.int42_uint256, 257);
        }
        else {
            b_7.storeBit(false);
        }
        if (src.int42_coins !== null && src.int42_coins !== undefined) {
            b_7.storeBit(true).storeInt(src.int42_coins, 257);
        }
        else {
            b_7.storeBit(false);
        }
        const b_8 = new core_1.Builder();
        if (src.int256_int !== null && src.int256_int !== undefined) {
            b_8.storeBit(true).storeInt(src.int256_int, 257);
        }
        else {
            b_8.storeBit(false);
        }
        if (src.int256_int8 !== null && src.int256_int8 !== undefined) {
            b_8.storeBit(true).storeInt(src.int256_int8, 257);
        }
        else {
            b_8.storeBit(false);
        }
        if (src.int256_int42 !== null && src.int256_int42 !== undefined) {
            b_8.storeBit(true).storeInt(src.int256_int42, 257);
        }
        else {
            b_8.storeBit(false);
        }
        const b_9 = new core_1.Builder();
        if (src.int256_int256 !== null && src.int256_int256 !== undefined) {
            b_9.storeBit(true).storeInt(src.int256_int256, 257);
        }
        else {
            b_9.storeBit(false);
        }
        if (src.int256_uint8 !== null && src.int256_uint8 !== undefined) {
            b_9.storeBit(true).storeInt(src.int256_uint8, 257);
        }
        else {
            b_9.storeBit(false);
        }
        if (src.int256_uint42 !== null && src.int256_uint42 !== undefined) {
            b_9.storeBit(true).storeInt(src.int256_uint42, 257);
        }
        else {
            b_9.storeBit(false);
        }
        const b_10 = new core_1.Builder();
        if (src.int256_uint256 !== null && src.int256_uint256 !== undefined) {
            b_10.storeBit(true).storeInt(src.int256_uint256, 257);
        }
        else {
            b_10.storeBit(false);
        }
        if (src.int256_coins !== null && src.int256_coins !== undefined) {
            b_10.storeBit(true).storeInt(src.int256_coins, 257);
        }
        else {
            b_10.storeBit(false);
        }
        if (src.uint8_int !== null && src.uint8_int !== undefined) {
            b_10.storeBit(true).storeInt(src.uint8_int, 257);
        }
        else {
            b_10.storeBit(false);
        }
        const b_11 = new core_1.Builder();
        if (src.uint8_int8 !== null && src.uint8_int8 !== undefined) {
            b_11.storeBit(true).storeInt(src.uint8_int8, 257);
        }
        else {
            b_11.storeBit(false);
        }
        if (src.uint8_int42 !== null && src.uint8_int42 !== undefined) {
            b_11.storeBit(true).storeInt(src.uint8_int42, 257);
        }
        else {
            b_11.storeBit(false);
        }
        if (src.uint8_int256 !== null && src.uint8_int256 !== undefined) {
            b_11.storeBit(true).storeInt(src.uint8_int256, 257);
        }
        else {
            b_11.storeBit(false);
        }
        const b_12 = new core_1.Builder();
        if (src.uint8_uint8 !== null && src.uint8_uint8 !== undefined) {
            b_12.storeBit(true).storeInt(src.uint8_uint8, 257);
        }
        else {
            b_12.storeBit(false);
        }
        if (src.uint8_uint42 !== null && src.uint8_uint42 !== undefined) {
            b_12.storeBit(true).storeInt(src.uint8_uint42, 257);
        }
        else {
            b_12.storeBit(false);
        }
        if (src.uint8_uint256 !== null && src.uint8_uint256 !== undefined) {
            b_12.storeBit(true).storeInt(src.uint8_uint256, 257);
        }
        else {
            b_12.storeBit(false);
        }
        const b_13 = new core_1.Builder();
        if (src.uint8_coins !== null && src.uint8_coins !== undefined) {
            b_13.storeBit(true).storeInt(src.uint8_coins, 257);
        }
        else {
            b_13.storeBit(false);
        }
        if (src.uint42_int !== null && src.uint42_int !== undefined) {
            b_13.storeBit(true).storeInt(src.uint42_int, 257);
        }
        else {
            b_13.storeBit(false);
        }
        if (src.uint42_int8 !== null && src.uint42_int8 !== undefined) {
            b_13.storeBit(true).storeInt(src.uint42_int8, 257);
        }
        else {
            b_13.storeBit(false);
        }
        const b_14 = new core_1.Builder();
        if (src.uint42_int42 !== null && src.uint42_int42 !== undefined) {
            b_14.storeBit(true).storeInt(src.uint42_int42, 257);
        }
        else {
            b_14.storeBit(false);
        }
        if (src.uint42_int256 !== null && src.uint42_int256 !== undefined) {
            b_14.storeBit(true).storeInt(src.uint42_int256, 257);
        }
        else {
            b_14.storeBit(false);
        }
        if (src.uint42_uint8 !== null && src.uint42_uint8 !== undefined) {
            b_14.storeBit(true).storeInt(src.uint42_uint8, 257);
        }
        else {
            b_14.storeBit(false);
        }
        const b_15 = new core_1.Builder();
        if (src.uint42_uint42 !== null && src.uint42_uint42 !== undefined) {
            b_15.storeBit(true).storeInt(src.uint42_uint42, 257);
        }
        else {
            b_15.storeBit(false);
        }
        if (src.uint42_uint256 !== null && src.uint42_uint256 !== undefined) {
            b_15.storeBit(true).storeInt(src.uint42_uint256, 257);
        }
        else {
            b_15.storeBit(false);
        }
        if (src.uint42_coins !== null && src.uint42_coins !== undefined) {
            b_15.storeBit(true).storeInt(src.uint42_coins, 257);
        }
        else {
            b_15.storeBit(false);
        }
        const b_16 = new core_1.Builder();
        if (src.uint256_int !== null && src.uint256_int !== undefined) {
            b_16.storeBit(true).storeInt(src.uint256_int, 257);
        }
        else {
            b_16.storeBit(false);
        }
        if (src.uint256_int8 !== null && src.uint256_int8 !== undefined) {
            b_16.storeBit(true).storeInt(src.uint256_int8, 257);
        }
        else {
            b_16.storeBit(false);
        }
        if (src.uint256_int42 !== null && src.uint256_int42 !== undefined) {
            b_16.storeBit(true).storeInt(src.uint256_int42, 257);
        }
        else {
            b_16.storeBit(false);
        }
        const b_17 = new core_1.Builder();
        if (src.uint256_int256 !== null && src.uint256_int256 !== undefined) {
            b_17.storeBit(true).storeInt(src.uint256_int256, 257);
        }
        else {
            b_17.storeBit(false);
        }
        if (src.uint256_uint8 !== null && src.uint256_uint8 !== undefined) {
            b_17.storeBit(true).storeInt(src.uint256_uint8, 257);
        }
        else {
            b_17.storeBit(false);
        }
        if (src.uint256_uint42 !== null && src.uint256_uint42 !== undefined) {
            b_17.storeBit(true).storeInt(src.uint256_uint42, 257);
        }
        else {
            b_17.storeBit(false);
        }
        const b_18 = new core_1.Builder();
        if (src.uint256_uint256 !== null && src.uint256_uint256 !== undefined) {
            b_18.storeBit(true).storeInt(src.uint256_uint256, 257);
        }
        else {
            b_18.storeBit(false);
        }
        if (src.uint256_coins !== null && src.uint256_coins !== undefined) {
            b_18.storeBit(true).storeInt(src.uint256_coins, 257);
        }
        else {
            b_18.storeBit(false);
        }
        if (src.address_int !== null && src.address_int !== undefined) {
            b_18.storeBit(true).storeInt(src.address_int, 257);
        }
        else {
            b_18.storeBit(false);
        }
        const b_19 = new core_1.Builder();
        if (src.address_int8 !== null && src.address_int8 !== undefined) {
            b_19.storeBit(true).storeInt(src.address_int8, 257);
        }
        else {
            b_19.storeBit(false);
        }
        if (src.address_int42 !== null && src.address_int42 !== undefined) {
            b_19.storeBit(true).storeInt(src.address_int42, 257);
        }
        else {
            b_19.storeBit(false);
        }
        if (src.address_int256 !== null && src.address_int256 !== undefined) {
            b_19.storeBit(true).storeInt(src.address_int256, 257);
        }
        else {
            b_19.storeBit(false);
        }
        const b_20 = new core_1.Builder();
        if (src.address_uint8 !== null && src.address_uint8 !== undefined) {
            b_20.storeBit(true).storeInt(src.address_uint8, 257);
        }
        else {
            b_20.storeBit(false);
        }
        if (src.address_uint42 !== null && src.address_uint42 !== undefined) {
            b_20.storeBit(true).storeInt(src.address_uint42, 257);
        }
        else {
            b_20.storeBit(false);
        }
        if (src.address_uint256 !== null && src.address_uint256 !== undefined) {
            b_20.storeBit(true).storeInt(src.address_uint256, 257);
        }
        else {
            b_20.storeBit(false);
        }
        const b_21 = new core_1.Builder();
        if (src.address_coins !== null && src.address_coins !== undefined) {
            b_21.storeBit(true).storeInt(src.address_coins, 257);
        }
        else {
            b_21.storeBit(false);
        }
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
function loadGetAllMapsResult(slice) {
    const sc_0 = slice;
    const _int_int = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    const _int_int8 = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    const _int_int42 = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    const sc_1 = sc_0.loadRef().beginParse();
    const _int_int256 = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    const _int_uint8 = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    const _int_uint42 = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    const sc_2 = sc_1.loadRef().beginParse();
    const _int_uint256 = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    const _int_coins = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    const _int8_int = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    const sc_3 = sc_2.loadRef().beginParse();
    const _int8_int8 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _int8_int42 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _int8_int256 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const sc_4 = sc_3.loadRef().beginParse();
    const _int8_uint8 = sc_4.loadBit() ? sc_4.loadIntBig(257) : null;
    const _int8_uint42 = sc_4.loadBit() ? sc_4.loadIntBig(257) : null;
    const _int8_uint256 = sc_4.loadBit() ? sc_4.loadIntBig(257) : null;
    const sc_5 = sc_4.loadRef().beginParse();
    const _int8_coins = sc_5.loadBit() ? sc_5.loadIntBig(257) : null;
    const _int42_int = sc_5.loadBit() ? sc_5.loadIntBig(257) : null;
    const _int42_int8 = sc_5.loadBit() ? sc_5.loadIntBig(257) : null;
    const sc_6 = sc_5.loadRef().beginParse();
    const _int42_int42 = sc_6.loadBit() ? sc_6.loadIntBig(257) : null;
    const _int42_int256 = sc_6.loadBit() ? sc_6.loadIntBig(257) : null;
    const _int42_uint8 = sc_6.loadBit() ? sc_6.loadIntBig(257) : null;
    const sc_7 = sc_6.loadRef().beginParse();
    const _int42_uint42 = sc_7.loadBit() ? sc_7.loadIntBig(257) : null;
    const _int42_uint256 = sc_7.loadBit() ? sc_7.loadIntBig(257) : null;
    const _int42_coins = sc_7.loadBit() ? sc_7.loadIntBig(257) : null;
    const sc_8 = sc_7.loadRef().beginParse();
    const _int256_int = sc_8.loadBit() ? sc_8.loadIntBig(257) : null;
    const _int256_int8 = sc_8.loadBit() ? sc_8.loadIntBig(257) : null;
    const _int256_int42 = sc_8.loadBit() ? sc_8.loadIntBig(257) : null;
    const sc_9 = sc_8.loadRef().beginParse();
    const _int256_int256 = sc_9.loadBit() ? sc_9.loadIntBig(257) : null;
    const _int256_uint8 = sc_9.loadBit() ? sc_9.loadIntBig(257) : null;
    const _int256_uint42 = sc_9.loadBit() ? sc_9.loadIntBig(257) : null;
    const sc_10 = sc_9.loadRef().beginParse();
    const _int256_uint256 = sc_10.loadBit() ? sc_10.loadIntBig(257) : null;
    const _int256_coins = sc_10.loadBit() ? sc_10.loadIntBig(257) : null;
    const _uint8_int = sc_10.loadBit() ? sc_10.loadIntBig(257) : null;
    const sc_11 = sc_10.loadRef().beginParse();
    const _uint8_int8 = sc_11.loadBit() ? sc_11.loadIntBig(257) : null;
    const _uint8_int42 = sc_11.loadBit() ? sc_11.loadIntBig(257) : null;
    const _uint8_int256 = sc_11.loadBit() ? sc_11.loadIntBig(257) : null;
    const sc_12 = sc_11.loadRef().beginParse();
    const _uint8_uint8 = sc_12.loadBit() ? sc_12.loadIntBig(257) : null;
    const _uint8_uint42 = sc_12.loadBit() ? sc_12.loadIntBig(257) : null;
    const _uint8_uint256 = sc_12.loadBit() ? sc_12.loadIntBig(257) : null;
    const sc_13 = sc_12.loadRef().beginParse();
    const _uint8_coins = sc_13.loadBit() ? sc_13.loadIntBig(257) : null;
    const _uint42_int = sc_13.loadBit() ? sc_13.loadIntBig(257) : null;
    const _uint42_int8 = sc_13.loadBit() ? sc_13.loadIntBig(257) : null;
    const sc_14 = sc_13.loadRef().beginParse();
    const _uint42_int42 = sc_14.loadBit() ? sc_14.loadIntBig(257) : null;
    const _uint42_int256 = sc_14.loadBit() ? sc_14.loadIntBig(257) : null;
    const _uint42_uint8 = sc_14.loadBit() ? sc_14.loadIntBig(257) : null;
    const sc_15 = sc_14.loadRef().beginParse();
    const _uint42_uint42 = sc_15.loadBit() ? sc_15.loadIntBig(257) : null;
    const _uint42_uint256 = sc_15.loadBit() ? sc_15.loadIntBig(257) : null;
    const _uint42_coins = sc_15.loadBit() ? sc_15.loadIntBig(257) : null;
    const sc_16 = sc_15.loadRef().beginParse();
    const _uint256_int = sc_16.loadBit() ? sc_16.loadIntBig(257) : null;
    const _uint256_int8 = sc_16.loadBit() ? sc_16.loadIntBig(257) : null;
    const _uint256_int42 = sc_16.loadBit() ? sc_16.loadIntBig(257) : null;
    const sc_17 = sc_16.loadRef().beginParse();
    const _uint256_int256 = sc_17.loadBit() ? sc_17.loadIntBig(257) : null;
    const _uint256_uint8 = sc_17.loadBit() ? sc_17.loadIntBig(257) : null;
    const _uint256_uint42 = sc_17.loadBit() ? sc_17.loadIntBig(257) : null;
    const sc_18 = sc_17.loadRef().beginParse();
    const _uint256_uint256 = sc_18.loadBit() ? sc_18.loadIntBig(257) : null;
    const _uint256_coins = sc_18.loadBit() ? sc_18.loadIntBig(257) : null;
    const _address_int = sc_18.loadBit() ? sc_18.loadIntBig(257) : null;
    const sc_19 = sc_18.loadRef().beginParse();
    const _address_int8 = sc_19.loadBit() ? sc_19.loadIntBig(257) : null;
    const _address_int42 = sc_19.loadBit() ? sc_19.loadIntBig(257) : null;
    const _address_int256 = sc_19.loadBit() ? sc_19.loadIntBig(257) : null;
    const sc_20 = sc_19.loadRef().beginParse();
    const _address_uint8 = sc_20.loadBit() ? sc_20.loadIntBig(257) : null;
    const _address_uint42 = sc_20.loadBit() ? sc_20.loadIntBig(257) : null;
    const _address_uint256 = sc_20.loadBit() ? sc_20.loadIntBig(257) : null;
    const sc_21 = sc_20.loadRef().beginParse();
    const _address_coins = sc_21.loadBit() ? sc_21.loadIntBig(257) : null;
    return { $$type: 'GetAllMapsResult', int_int: _int_int, int_int8: _int_int8, int_int42: _int_int42, int_int256: _int_int256, int_uint8: _int_uint8, int_uint42: _int_uint42, int_uint256: _int_uint256, int_coins: _int_coins, int8_int: _int8_int, int8_int8: _int8_int8, int8_int42: _int8_int42, int8_int256: _int8_int256, int8_uint8: _int8_uint8, int8_uint42: _int8_uint42, int8_uint256: _int8_uint256, int8_coins: _int8_coins, int42_int: _int42_int, int42_int8: _int42_int8, int42_int42: _int42_int42, int42_int256: _int42_int256, int42_uint8: _int42_uint8, int42_uint42: _int42_uint42, int42_uint256: _int42_uint256, int42_coins: _int42_coins, int256_int: _int256_int, int256_int8: _int256_int8, int256_int42: _int256_int42, int256_int256: _int256_int256, int256_uint8: _int256_uint8, int256_uint42: _int256_uint42, int256_uint256: _int256_uint256, int256_coins: _int256_coins, uint8_int: _uint8_int, uint8_int8: _uint8_int8, uint8_int42: _uint8_int42, uint8_int256: _uint8_int256, uint8_uint8: _uint8_uint8, uint8_uint42: _uint8_uint42, uint8_uint256: _uint8_uint256, uint8_coins: _uint8_coins, uint42_int: _uint42_int, uint42_int8: _uint42_int8, uint42_int42: _uint42_int42, uint42_int256: _uint42_int256, uint42_uint8: _uint42_uint8, uint42_uint42: _uint42_uint42, uint42_uint256: _uint42_uint256, uint42_coins: _uint42_coins, uint256_int: _uint256_int, uint256_int8: _uint256_int8, uint256_int42: _uint256_int42, uint256_int256: _uint256_int256, uint256_uint8: _uint256_uint8, uint256_uint42: _uint256_uint42, uint256_uint256: _uint256_uint256, uint256_coins: _uint256_coins, address_int: _address_int, address_int8: _address_int8, address_int42: _address_int42, address_int256: _address_int256, address_uint8: _address_uint8, address_uint42: _address_uint42, address_uint256: _address_uint256, address_coins: _address_coins };
}
function loadTupleGetAllMapsResult(source) {
    const _int_int = source.readBigNumberOpt();
    const _int_int8 = source.readBigNumberOpt();
    const _int_int42 = source.readBigNumberOpt();
    const _int_int256 = source.readBigNumberOpt();
    const _int_uint8 = source.readBigNumberOpt();
    const _int_uint42 = source.readBigNumberOpt();
    const _int_uint256 = source.readBigNumberOpt();
    const _int_coins = source.readBigNumberOpt();
    const _int8_int = source.readBigNumberOpt();
    const _int8_int8 = source.readBigNumberOpt();
    const _int8_int42 = source.readBigNumberOpt();
    const _int8_int256 = source.readBigNumberOpt();
    const _int8_uint8 = source.readBigNumberOpt();
    const _int8_uint42 = source.readBigNumberOpt();
    source = source.readTuple();
    const _int8_uint256 = source.readBigNumberOpt();
    const _int8_coins = source.readBigNumberOpt();
    const _int42_int = source.readBigNumberOpt();
    const _int42_int8 = source.readBigNumberOpt();
    const _int42_int42 = source.readBigNumberOpt();
    const _int42_int256 = source.readBigNumberOpt();
    const _int42_uint8 = source.readBigNumberOpt();
    const _int42_uint42 = source.readBigNumberOpt();
    const _int42_uint256 = source.readBigNumberOpt();
    const _int42_coins = source.readBigNumberOpt();
    const _int256_int = source.readBigNumberOpt();
    const _int256_int8 = source.readBigNumberOpt();
    const _int256_int42 = source.readBigNumberOpt();
    const _int256_int256 = source.readBigNumberOpt();
    source = source.readTuple();
    const _int256_uint8 = source.readBigNumberOpt();
    const _int256_uint42 = source.readBigNumberOpt();
    const _int256_uint256 = source.readBigNumberOpt();
    const _int256_coins = source.readBigNumberOpt();
    const _uint8_int = source.readBigNumberOpt();
    const _uint8_int8 = source.readBigNumberOpt();
    const _uint8_int42 = source.readBigNumberOpt();
    const _uint8_int256 = source.readBigNumberOpt();
    const _uint8_uint8 = source.readBigNumberOpt();
    const _uint8_uint42 = source.readBigNumberOpt();
    const _uint8_uint256 = source.readBigNumberOpt();
    const _uint8_coins = source.readBigNumberOpt();
    const _uint42_int = source.readBigNumberOpt();
    const _uint42_int8 = source.readBigNumberOpt();
    source = source.readTuple();
    const _uint42_int42 = source.readBigNumberOpt();
    const _uint42_int256 = source.readBigNumberOpt();
    const _uint42_uint8 = source.readBigNumberOpt();
    const _uint42_uint42 = source.readBigNumberOpt();
    const _uint42_uint256 = source.readBigNumberOpt();
    const _uint42_coins = source.readBigNumberOpt();
    const _uint256_int = source.readBigNumberOpt();
    const _uint256_int8 = source.readBigNumberOpt();
    const _uint256_int42 = source.readBigNumberOpt();
    const _uint256_int256 = source.readBigNumberOpt();
    const _uint256_uint8 = source.readBigNumberOpt();
    const _uint256_uint42 = source.readBigNumberOpt();
    const _uint256_uint256 = source.readBigNumberOpt();
    const _uint256_coins = source.readBigNumberOpt();
    source = source.readTuple();
    const _address_int = source.readBigNumberOpt();
    const _address_int8 = source.readBigNumberOpt();
    const _address_int42 = source.readBigNumberOpt();
    const _address_int256 = source.readBigNumberOpt();
    const _address_uint8 = source.readBigNumberOpt();
    const _address_uint42 = source.readBigNumberOpt();
    const _address_uint256 = source.readBigNumberOpt();
    const _address_coins = source.readBigNumberOpt();
    return { $$type: 'GetAllMapsResult', int_int: _int_int, int_int8: _int_int8, int_int42: _int_int42, int_int256: _int_int256, int_uint8: _int_uint8, int_uint42: _int_uint42, int_uint256: _int_uint256, int_coins: _int_coins, int8_int: _int8_int, int8_int8: _int8_int8, int8_int42: _int8_int42, int8_int256: _int8_int256, int8_uint8: _int8_uint8, int8_uint42: _int8_uint42, int8_uint256: _int8_uint256, int8_coins: _int8_coins, int42_int: _int42_int, int42_int8: _int42_int8, int42_int42: _int42_int42, int42_int256: _int42_int256, int42_uint8: _int42_uint8, int42_uint42: _int42_uint42, int42_uint256: _int42_uint256, int42_coins: _int42_coins, int256_int: _int256_int, int256_int8: _int256_int8, int256_int42: _int256_int42, int256_int256: _int256_int256, int256_uint8: _int256_uint8, int256_uint42: _int256_uint42, int256_uint256: _int256_uint256, int256_coins: _int256_coins, uint8_int: _uint8_int, uint8_int8: _uint8_int8, uint8_int42: _uint8_int42, uint8_int256: _uint8_int256, uint8_uint8: _uint8_uint8, uint8_uint42: _uint8_uint42, uint8_uint256: _uint8_uint256, uint8_coins: _uint8_coins, uint42_int: _uint42_int, uint42_int8: _uint42_int8, uint42_int42: _uint42_int42, uint42_int256: _uint42_int256, uint42_uint8: _uint42_uint8, uint42_uint42: _uint42_uint42, uint42_uint256: _uint42_uint256, uint42_coins: _uint42_coins, uint256_int: _uint256_int, uint256_int8: _uint256_int8, uint256_int42: _uint256_int42, uint256_int256: _uint256_int256, uint256_uint8: _uint256_uint8, uint256_uint42: _uint256_uint42, uint256_uint256: _uint256_uint256, uint256_coins: _uint256_coins, address_int: _address_int, address_int8: _address_int8, address_int42: _address_int42, address_int256: _address_int256, address_uint8: _address_uint8, address_uint42: _address_uint42, address_uint256: _address_uint256, address_coins: _address_coins };
}
function loadGetterTupleGetAllMapsResult(source) {
    const _int_int = source.readBigNumberOpt();
    const _int_int8 = source.readBigNumberOpt();
    const _int_int42 = source.readBigNumberOpt();
    const _int_int256 = source.readBigNumberOpt();
    const _int_uint8 = source.readBigNumberOpt();
    const _int_uint42 = source.readBigNumberOpt();
    const _int_uint256 = source.readBigNumberOpt();
    const _int_coins = source.readBigNumberOpt();
    const _int8_int = source.readBigNumberOpt();
    const _int8_int8 = source.readBigNumberOpt();
    const _int8_int42 = source.readBigNumberOpt();
    const _int8_int256 = source.readBigNumberOpt();
    const _int8_uint8 = source.readBigNumberOpt();
    const _int8_uint42 = source.readBigNumberOpt();
    const _int8_uint256 = source.readBigNumberOpt();
    const _int8_coins = source.readBigNumberOpt();
    const _int42_int = source.readBigNumberOpt();
    const _int42_int8 = source.readBigNumberOpt();
    const _int42_int42 = source.readBigNumberOpt();
    const _int42_int256 = source.readBigNumberOpt();
    const _int42_uint8 = source.readBigNumberOpt();
    const _int42_uint42 = source.readBigNumberOpt();
    const _int42_uint256 = source.readBigNumberOpt();
    const _int42_coins = source.readBigNumberOpt();
    const _int256_int = source.readBigNumberOpt();
    const _int256_int8 = source.readBigNumberOpt();
    const _int256_int42 = source.readBigNumberOpt();
    const _int256_int256 = source.readBigNumberOpt();
    const _int256_uint8 = source.readBigNumberOpt();
    const _int256_uint42 = source.readBigNumberOpt();
    const _int256_uint256 = source.readBigNumberOpt();
    const _int256_coins = source.readBigNumberOpt();
    const _uint8_int = source.readBigNumberOpt();
    const _uint8_int8 = source.readBigNumberOpt();
    const _uint8_int42 = source.readBigNumberOpt();
    const _uint8_int256 = source.readBigNumberOpt();
    const _uint8_uint8 = source.readBigNumberOpt();
    const _uint8_uint42 = source.readBigNumberOpt();
    const _uint8_uint256 = source.readBigNumberOpt();
    const _uint8_coins = source.readBigNumberOpt();
    const _uint42_int = source.readBigNumberOpt();
    const _uint42_int8 = source.readBigNumberOpt();
    const _uint42_int42 = source.readBigNumberOpt();
    const _uint42_int256 = source.readBigNumberOpt();
    const _uint42_uint8 = source.readBigNumberOpt();
    const _uint42_uint42 = source.readBigNumberOpt();
    const _uint42_uint256 = source.readBigNumberOpt();
    const _uint42_coins = source.readBigNumberOpt();
    const _uint256_int = source.readBigNumberOpt();
    const _uint256_int8 = source.readBigNumberOpt();
    const _uint256_int42 = source.readBigNumberOpt();
    const _uint256_int256 = source.readBigNumberOpt();
    const _uint256_uint8 = source.readBigNumberOpt();
    const _uint256_uint42 = source.readBigNumberOpt();
    const _uint256_uint256 = source.readBigNumberOpt();
    const _uint256_coins = source.readBigNumberOpt();
    const _address_int = source.readBigNumberOpt();
    const _address_int8 = source.readBigNumberOpt();
    const _address_int42 = source.readBigNumberOpt();
    const _address_int256 = source.readBigNumberOpt();
    const _address_uint8 = source.readBigNumberOpt();
    const _address_uint42 = source.readBigNumberOpt();
    const _address_uint256 = source.readBigNumberOpt();
    const _address_coins = source.readBigNumberOpt();
    return { $$type: 'GetAllMapsResult', int_int: _int_int, int_int8: _int_int8, int_int42: _int_int42, int_int256: _int_int256, int_uint8: _int_uint8, int_uint42: _int_uint42, int_uint256: _int_uint256, int_coins: _int_coins, int8_int: _int8_int, int8_int8: _int8_int8, int8_int42: _int8_int42, int8_int256: _int8_int256, int8_uint8: _int8_uint8, int8_uint42: _int8_uint42, int8_uint256: _int8_uint256, int8_coins: _int8_coins, int42_int: _int42_int, int42_int8: _int42_int8, int42_int42: _int42_int42, int42_int256: _int42_int256, int42_uint8: _int42_uint8, int42_uint42: _int42_uint42, int42_uint256: _int42_uint256, int42_coins: _int42_coins, int256_int: _int256_int, int256_int8: _int256_int8, int256_int42: _int256_int42, int256_int256: _int256_int256, int256_uint8: _int256_uint8, int256_uint42: _int256_uint42, int256_uint256: _int256_uint256, int256_coins: _int256_coins, uint8_int: _uint8_int, uint8_int8: _uint8_int8, uint8_int42: _uint8_int42, uint8_int256: _uint8_int256, uint8_uint8: _uint8_uint8, uint8_uint42: _uint8_uint42, uint8_uint256: _uint8_uint256, uint8_coins: _uint8_coins, uint42_int: _uint42_int, uint42_int8: _uint42_int8, uint42_int42: _uint42_int42, uint42_int256: _uint42_int256, uint42_uint8: _uint42_uint8, uint42_uint42: _uint42_uint42, uint42_uint256: _uint42_uint256, uint42_coins: _uint42_coins, uint256_int: _uint256_int, uint256_int8: _uint256_int8, uint256_int42: _uint256_int42, uint256_int256: _uint256_int256, uint256_uint8: _uint256_uint8, uint256_uint42: _uint256_uint42, uint256_uint256: _uint256_uint256, uint256_coins: _uint256_coins, address_int: _address_int, address_int8: _address_int8, address_int42: _address_int42, address_int256: _address_int256, address_uint8: _address_uint8, address_uint42: _address_uint42, address_uint256: _address_uint256, address_coins: _address_coins };
}
function storeTupleGetAllMapsResult(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.int_int);
    builder.writeNumber(source.int_int8);
    builder.writeNumber(source.int_int42);
    builder.writeNumber(source.int_int256);
    builder.writeNumber(source.int_uint8);
    builder.writeNumber(source.int_uint42);
    builder.writeNumber(source.int_uint256);
    builder.writeNumber(source.int_coins);
    builder.writeNumber(source.int8_int);
    builder.writeNumber(source.int8_int8);
    builder.writeNumber(source.int8_int42);
    builder.writeNumber(source.int8_int256);
    builder.writeNumber(source.int8_uint8);
    builder.writeNumber(source.int8_uint42);
    builder.writeNumber(source.int8_uint256);
    builder.writeNumber(source.int8_coins);
    builder.writeNumber(source.int42_int);
    builder.writeNumber(source.int42_int8);
    builder.writeNumber(source.int42_int42);
    builder.writeNumber(source.int42_int256);
    builder.writeNumber(source.int42_uint8);
    builder.writeNumber(source.int42_uint42);
    builder.writeNumber(source.int42_uint256);
    builder.writeNumber(source.int42_coins);
    builder.writeNumber(source.int256_int);
    builder.writeNumber(source.int256_int8);
    builder.writeNumber(source.int256_int42);
    builder.writeNumber(source.int256_int256);
    builder.writeNumber(source.int256_uint8);
    builder.writeNumber(source.int256_uint42);
    builder.writeNumber(source.int256_uint256);
    builder.writeNumber(source.int256_coins);
    builder.writeNumber(source.uint8_int);
    builder.writeNumber(source.uint8_int8);
    builder.writeNumber(source.uint8_int42);
    builder.writeNumber(source.uint8_int256);
    builder.writeNumber(source.uint8_uint8);
    builder.writeNumber(source.uint8_uint42);
    builder.writeNumber(source.uint8_uint256);
    builder.writeNumber(source.uint8_coins);
    builder.writeNumber(source.uint42_int);
    builder.writeNumber(source.uint42_int8);
    builder.writeNumber(source.uint42_int42);
    builder.writeNumber(source.uint42_int256);
    builder.writeNumber(source.uint42_uint8);
    builder.writeNumber(source.uint42_uint42);
    builder.writeNumber(source.uint42_uint256);
    builder.writeNumber(source.uint42_coins);
    builder.writeNumber(source.uint256_int);
    builder.writeNumber(source.uint256_int8);
    builder.writeNumber(source.uint256_int42);
    builder.writeNumber(source.uint256_int256);
    builder.writeNumber(source.uint256_uint8);
    builder.writeNumber(source.uint256_uint42);
    builder.writeNumber(source.uint256_uint256);
    builder.writeNumber(source.uint256_coins);
    builder.writeNumber(source.address_int);
    builder.writeNumber(source.address_int8);
    builder.writeNumber(source.address_int42);
    builder.writeNumber(source.address_int256);
    builder.writeNumber(source.address_uint8);
    builder.writeNumber(source.address_uint42);
    builder.writeNumber(source.address_uint256);
    builder.writeNumber(source.address_coins);
    return builder.build();
}
function dictValueParserGetAllMapsResult() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeGetAllMapsResult(src)).endCell());
        },
        parse: (src) => {
            return loadGetAllMapsResult(src.loadRef().beginParse());
        }
    };
}
function storeReplaceAllMapsResult(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeBit(src.int_int);
        b_0.storeBit(src.int_int8);
        b_0.storeBit(src.int_int42);
        b_0.storeBit(src.int_int256);
        b_0.storeBit(src.int_uint8);
        b_0.storeBit(src.int_uint42);
        b_0.storeBit(src.int_uint256);
        b_0.storeBit(src.int_coins);
        b_0.storeBit(src.int8_int);
        b_0.storeBit(src.int8_int8);
        b_0.storeBit(src.int8_int42);
        b_0.storeBit(src.int8_int256);
        b_0.storeBit(src.int8_uint8);
        b_0.storeBit(src.int8_uint42);
        b_0.storeBit(src.int8_uint256);
        b_0.storeBit(src.int8_coins);
        b_0.storeBit(src.int42_int);
        b_0.storeBit(src.int42_int8);
        b_0.storeBit(src.int42_int42);
        b_0.storeBit(src.int42_int256);
        b_0.storeBit(src.int42_uint8);
        b_0.storeBit(src.int42_uint42);
        b_0.storeBit(src.int42_uint256);
        b_0.storeBit(src.int42_coins);
        b_0.storeBit(src.int256_int);
        b_0.storeBit(src.int256_int8);
        b_0.storeBit(src.int256_int42);
        b_0.storeBit(src.int256_int256);
        b_0.storeBit(src.int256_uint8);
        b_0.storeBit(src.int256_uint42);
        b_0.storeBit(src.int256_uint256);
        b_0.storeBit(src.int256_coins);
        b_0.storeBit(src.uint8_int);
        b_0.storeBit(src.uint8_int8);
        b_0.storeBit(src.uint8_int42);
        b_0.storeBit(src.uint8_int256);
        b_0.storeBit(src.uint8_uint8);
        b_0.storeBit(src.uint8_uint42);
        b_0.storeBit(src.uint8_uint256);
        b_0.storeBit(src.uint8_coins);
        b_0.storeBit(src.uint42_int);
        b_0.storeBit(src.uint42_int8);
        b_0.storeBit(src.uint42_int42);
        b_0.storeBit(src.uint42_int256);
        b_0.storeBit(src.uint42_uint8);
        b_0.storeBit(src.uint42_uint42);
        b_0.storeBit(src.uint42_uint256);
        b_0.storeBit(src.uint42_coins);
        b_0.storeBit(src.uint256_int);
        b_0.storeBit(src.uint256_int8);
        b_0.storeBit(src.uint256_int42);
        b_0.storeBit(src.uint256_int256);
        b_0.storeBit(src.uint256_uint8);
        b_0.storeBit(src.uint256_uint42);
        b_0.storeBit(src.uint256_uint256);
        b_0.storeBit(src.uint256_coins);
        b_0.storeBit(src.address_int);
        b_0.storeBit(src.address_int8);
        b_0.storeBit(src.address_int42);
        b_0.storeBit(src.address_int256);
        b_0.storeBit(src.address_uint8);
        b_0.storeBit(src.address_uint42);
        b_0.storeBit(src.address_uint256);
        b_0.storeBit(src.address_coins);
    };
}
function loadReplaceAllMapsResult(slice) {
    const sc_0 = slice;
    const _int_int = sc_0.loadBit();
    const _int_int8 = sc_0.loadBit();
    const _int_int42 = sc_0.loadBit();
    const _int_int256 = sc_0.loadBit();
    const _int_uint8 = sc_0.loadBit();
    const _int_uint42 = sc_0.loadBit();
    const _int_uint256 = sc_0.loadBit();
    const _int_coins = sc_0.loadBit();
    const _int8_int = sc_0.loadBit();
    const _int8_int8 = sc_0.loadBit();
    const _int8_int42 = sc_0.loadBit();
    const _int8_int256 = sc_0.loadBit();
    const _int8_uint8 = sc_0.loadBit();
    const _int8_uint42 = sc_0.loadBit();
    const _int8_uint256 = sc_0.loadBit();
    const _int8_coins = sc_0.loadBit();
    const _int42_int = sc_0.loadBit();
    const _int42_int8 = sc_0.loadBit();
    const _int42_int42 = sc_0.loadBit();
    const _int42_int256 = sc_0.loadBit();
    const _int42_uint8 = sc_0.loadBit();
    const _int42_uint42 = sc_0.loadBit();
    const _int42_uint256 = sc_0.loadBit();
    const _int42_coins = sc_0.loadBit();
    const _int256_int = sc_0.loadBit();
    const _int256_int8 = sc_0.loadBit();
    const _int256_int42 = sc_0.loadBit();
    const _int256_int256 = sc_0.loadBit();
    const _int256_uint8 = sc_0.loadBit();
    const _int256_uint42 = sc_0.loadBit();
    const _int256_uint256 = sc_0.loadBit();
    const _int256_coins = sc_0.loadBit();
    const _uint8_int = sc_0.loadBit();
    const _uint8_int8 = sc_0.loadBit();
    const _uint8_int42 = sc_0.loadBit();
    const _uint8_int256 = sc_0.loadBit();
    const _uint8_uint8 = sc_0.loadBit();
    const _uint8_uint42 = sc_0.loadBit();
    const _uint8_uint256 = sc_0.loadBit();
    const _uint8_coins = sc_0.loadBit();
    const _uint42_int = sc_0.loadBit();
    const _uint42_int8 = sc_0.loadBit();
    const _uint42_int42 = sc_0.loadBit();
    const _uint42_int256 = sc_0.loadBit();
    const _uint42_uint8 = sc_0.loadBit();
    const _uint42_uint42 = sc_0.loadBit();
    const _uint42_uint256 = sc_0.loadBit();
    const _uint42_coins = sc_0.loadBit();
    const _uint256_int = sc_0.loadBit();
    const _uint256_int8 = sc_0.loadBit();
    const _uint256_int42 = sc_0.loadBit();
    const _uint256_int256 = sc_0.loadBit();
    const _uint256_uint8 = sc_0.loadBit();
    const _uint256_uint42 = sc_0.loadBit();
    const _uint256_uint256 = sc_0.loadBit();
    const _uint256_coins = sc_0.loadBit();
    const _address_int = sc_0.loadBit();
    const _address_int8 = sc_0.loadBit();
    const _address_int42 = sc_0.loadBit();
    const _address_int256 = sc_0.loadBit();
    const _address_uint8 = sc_0.loadBit();
    const _address_uint42 = sc_0.loadBit();
    const _address_uint256 = sc_0.loadBit();
    const _address_coins = sc_0.loadBit();
    return { $$type: 'ReplaceAllMapsResult', int_int: _int_int, int_int8: _int_int8, int_int42: _int_int42, int_int256: _int_int256, int_uint8: _int_uint8, int_uint42: _int_uint42, int_uint256: _int_uint256, int_coins: _int_coins, int8_int: _int8_int, int8_int8: _int8_int8, int8_int42: _int8_int42, int8_int256: _int8_int256, int8_uint8: _int8_uint8, int8_uint42: _int8_uint42, int8_uint256: _int8_uint256, int8_coins: _int8_coins, int42_int: _int42_int, int42_int8: _int42_int8, int42_int42: _int42_int42, int42_int256: _int42_int256, int42_uint8: _int42_uint8, int42_uint42: _int42_uint42, int42_uint256: _int42_uint256, int42_coins: _int42_coins, int256_int: _int256_int, int256_int8: _int256_int8, int256_int42: _int256_int42, int256_int256: _int256_int256, int256_uint8: _int256_uint8, int256_uint42: _int256_uint42, int256_uint256: _int256_uint256, int256_coins: _int256_coins, uint8_int: _uint8_int, uint8_int8: _uint8_int8, uint8_int42: _uint8_int42, uint8_int256: _uint8_int256, uint8_uint8: _uint8_uint8, uint8_uint42: _uint8_uint42, uint8_uint256: _uint8_uint256, uint8_coins: _uint8_coins, uint42_int: _uint42_int, uint42_int8: _uint42_int8, uint42_int42: _uint42_int42, uint42_int256: _uint42_int256, uint42_uint8: _uint42_uint8, uint42_uint42: _uint42_uint42, uint42_uint256: _uint42_uint256, uint42_coins: _uint42_coins, uint256_int: _uint256_int, uint256_int8: _uint256_int8, uint256_int42: _uint256_int42, uint256_int256: _uint256_int256, uint256_uint8: _uint256_uint8, uint256_uint42: _uint256_uint42, uint256_uint256: _uint256_uint256, uint256_coins: _uint256_coins, address_int: _address_int, address_int8: _address_int8, address_int42: _address_int42, address_int256: _address_int256, address_uint8: _address_uint8, address_uint42: _address_uint42, address_uint256: _address_uint256, address_coins: _address_coins };
}
function loadTupleReplaceAllMapsResult(source) {
    const _int_int = source.readBoolean();
    const _int_int8 = source.readBoolean();
    const _int_int42 = source.readBoolean();
    const _int_int256 = source.readBoolean();
    const _int_uint8 = source.readBoolean();
    const _int_uint42 = source.readBoolean();
    const _int_uint256 = source.readBoolean();
    const _int_coins = source.readBoolean();
    const _int8_int = source.readBoolean();
    const _int8_int8 = source.readBoolean();
    const _int8_int42 = source.readBoolean();
    const _int8_int256 = source.readBoolean();
    const _int8_uint8 = source.readBoolean();
    const _int8_uint42 = source.readBoolean();
    source = source.readTuple();
    const _int8_uint256 = source.readBoolean();
    const _int8_coins = source.readBoolean();
    const _int42_int = source.readBoolean();
    const _int42_int8 = source.readBoolean();
    const _int42_int42 = source.readBoolean();
    const _int42_int256 = source.readBoolean();
    const _int42_uint8 = source.readBoolean();
    const _int42_uint42 = source.readBoolean();
    const _int42_uint256 = source.readBoolean();
    const _int42_coins = source.readBoolean();
    const _int256_int = source.readBoolean();
    const _int256_int8 = source.readBoolean();
    const _int256_int42 = source.readBoolean();
    const _int256_int256 = source.readBoolean();
    source = source.readTuple();
    const _int256_uint8 = source.readBoolean();
    const _int256_uint42 = source.readBoolean();
    const _int256_uint256 = source.readBoolean();
    const _int256_coins = source.readBoolean();
    const _uint8_int = source.readBoolean();
    const _uint8_int8 = source.readBoolean();
    const _uint8_int42 = source.readBoolean();
    const _uint8_int256 = source.readBoolean();
    const _uint8_uint8 = source.readBoolean();
    const _uint8_uint42 = source.readBoolean();
    const _uint8_uint256 = source.readBoolean();
    const _uint8_coins = source.readBoolean();
    const _uint42_int = source.readBoolean();
    const _uint42_int8 = source.readBoolean();
    source = source.readTuple();
    const _uint42_int42 = source.readBoolean();
    const _uint42_int256 = source.readBoolean();
    const _uint42_uint8 = source.readBoolean();
    const _uint42_uint42 = source.readBoolean();
    const _uint42_uint256 = source.readBoolean();
    const _uint42_coins = source.readBoolean();
    const _uint256_int = source.readBoolean();
    const _uint256_int8 = source.readBoolean();
    const _uint256_int42 = source.readBoolean();
    const _uint256_int256 = source.readBoolean();
    const _uint256_uint8 = source.readBoolean();
    const _uint256_uint42 = source.readBoolean();
    const _uint256_uint256 = source.readBoolean();
    const _uint256_coins = source.readBoolean();
    source = source.readTuple();
    const _address_int = source.readBoolean();
    const _address_int8 = source.readBoolean();
    const _address_int42 = source.readBoolean();
    const _address_int256 = source.readBoolean();
    const _address_uint8 = source.readBoolean();
    const _address_uint42 = source.readBoolean();
    const _address_uint256 = source.readBoolean();
    const _address_coins = source.readBoolean();
    return { $$type: 'ReplaceAllMapsResult', int_int: _int_int, int_int8: _int_int8, int_int42: _int_int42, int_int256: _int_int256, int_uint8: _int_uint8, int_uint42: _int_uint42, int_uint256: _int_uint256, int_coins: _int_coins, int8_int: _int8_int, int8_int8: _int8_int8, int8_int42: _int8_int42, int8_int256: _int8_int256, int8_uint8: _int8_uint8, int8_uint42: _int8_uint42, int8_uint256: _int8_uint256, int8_coins: _int8_coins, int42_int: _int42_int, int42_int8: _int42_int8, int42_int42: _int42_int42, int42_int256: _int42_int256, int42_uint8: _int42_uint8, int42_uint42: _int42_uint42, int42_uint256: _int42_uint256, int42_coins: _int42_coins, int256_int: _int256_int, int256_int8: _int256_int8, int256_int42: _int256_int42, int256_int256: _int256_int256, int256_uint8: _int256_uint8, int256_uint42: _int256_uint42, int256_uint256: _int256_uint256, int256_coins: _int256_coins, uint8_int: _uint8_int, uint8_int8: _uint8_int8, uint8_int42: _uint8_int42, uint8_int256: _uint8_int256, uint8_uint8: _uint8_uint8, uint8_uint42: _uint8_uint42, uint8_uint256: _uint8_uint256, uint8_coins: _uint8_coins, uint42_int: _uint42_int, uint42_int8: _uint42_int8, uint42_int42: _uint42_int42, uint42_int256: _uint42_int256, uint42_uint8: _uint42_uint8, uint42_uint42: _uint42_uint42, uint42_uint256: _uint42_uint256, uint42_coins: _uint42_coins, uint256_int: _uint256_int, uint256_int8: _uint256_int8, uint256_int42: _uint256_int42, uint256_int256: _uint256_int256, uint256_uint8: _uint256_uint8, uint256_uint42: _uint256_uint42, uint256_uint256: _uint256_uint256, uint256_coins: _uint256_coins, address_int: _address_int, address_int8: _address_int8, address_int42: _address_int42, address_int256: _address_int256, address_uint8: _address_uint8, address_uint42: _address_uint42, address_uint256: _address_uint256, address_coins: _address_coins };
}
function loadGetterTupleReplaceAllMapsResult(source) {
    const _int_int = source.readBoolean();
    const _int_int8 = source.readBoolean();
    const _int_int42 = source.readBoolean();
    const _int_int256 = source.readBoolean();
    const _int_uint8 = source.readBoolean();
    const _int_uint42 = source.readBoolean();
    const _int_uint256 = source.readBoolean();
    const _int_coins = source.readBoolean();
    const _int8_int = source.readBoolean();
    const _int8_int8 = source.readBoolean();
    const _int8_int42 = source.readBoolean();
    const _int8_int256 = source.readBoolean();
    const _int8_uint8 = source.readBoolean();
    const _int8_uint42 = source.readBoolean();
    const _int8_uint256 = source.readBoolean();
    const _int8_coins = source.readBoolean();
    const _int42_int = source.readBoolean();
    const _int42_int8 = source.readBoolean();
    const _int42_int42 = source.readBoolean();
    const _int42_int256 = source.readBoolean();
    const _int42_uint8 = source.readBoolean();
    const _int42_uint42 = source.readBoolean();
    const _int42_uint256 = source.readBoolean();
    const _int42_coins = source.readBoolean();
    const _int256_int = source.readBoolean();
    const _int256_int8 = source.readBoolean();
    const _int256_int42 = source.readBoolean();
    const _int256_int256 = source.readBoolean();
    const _int256_uint8 = source.readBoolean();
    const _int256_uint42 = source.readBoolean();
    const _int256_uint256 = source.readBoolean();
    const _int256_coins = source.readBoolean();
    const _uint8_int = source.readBoolean();
    const _uint8_int8 = source.readBoolean();
    const _uint8_int42 = source.readBoolean();
    const _uint8_int256 = source.readBoolean();
    const _uint8_uint8 = source.readBoolean();
    const _uint8_uint42 = source.readBoolean();
    const _uint8_uint256 = source.readBoolean();
    const _uint8_coins = source.readBoolean();
    const _uint42_int = source.readBoolean();
    const _uint42_int8 = source.readBoolean();
    const _uint42_int42 = source.readBoolean();
    const _uint42_int256 = source.readBoolean();
    const _uint42_uint8 = source.readBoolean();
    const _uint42_uint42 = source.readBoolean();
    const _uint42_uint256 = source.readBoolean();
    const _uint42_coins = source.readBoolean();
    const _uint256_int = source.readBoolean();
    const _uint256_int8 = source.readBoolean();
    const _uint256_int42 = source.readBoolean();
    const _uint256_int256 = source.readBoolean();
    const _uint256_uint8 = source.readBoolean();
    const _uint256_uint42 = source.readBoolean();
    const _uint256_uint256 = source.readBoolean();
    const _uint256_coins = source.readBoolean();
    const _address_int = source.readBoolean();
    const _address_int8 = source.readBoolean();
    const _address_int42 = source.readBoolean();
    const _address_int256 = source.readBoolean();
    const _address_uint8 = source.readBoolean();
    const _address_uint42 = source.readBoolean();
    const _address_uint256 = source.readBoolean();
    const _address_coins = source.readBoolean();
    return { $$type: 'ReplaceAllMapsResult', int_int: _int_int, int_int8: _int_int8, int_int42: _int_int42, int_int256: _int_int256, int_uint8: _int_uint8, int_uint42: _int_uint42, int_uint256: _int_uint256, int_coins: _int_coins, int8_int: _int8_int, int8_int8: _int8_int8, int8_int42: _int8_int42, int8_int256: _int8_int256, int8_uint8: _int8_uint8, int8_uint42: _int8_uint42, int8_uint256: _int8_uint256, int8_coins: _int8_coins, int42_int: _int42_int, int42_int8: _int42_int8, int42_int42: _int42_int42, int42_int256: _int42_int256, int42_uint8: _int42_uint8, int42_uint42: _int42_uint42, int42_uint256: _int42_uint256, int42_coins: _int42_coins, int256_int: _int256_int, int256_int8: _int256_int8, int256_int42: _int256_int42, int256_int256: _int256_int256, int256_uint8: _int256_uint8, int256_uint42: _int256_uint42, int256_uint256: _int256_uint256, int256_coins: _int256_coins, uint8_int: _uint8_int, uint8_int8: _uint8_int8, uint8_int42: _uint8_int42, uint8_int256: _uint8_int256, uint8_uint8: _uint8_uint8, uint8_uint42: _uint8_uint42, uint8_uint256: _uint8_uint256, uint8_coins: _uint8_coins, uint42_int: _uint42_int, uint42_int8: _uint42_int8, uint42_int42: _uint42_int42, uint42_int256: _uint42_int256, uint42_uint8: _uint42_uint8, uint42_uint42: _uint42_uint42, uint42_uint256: _uint42_uint256, uint42_coins: _uint42_coins, uint256_int: _uint256_int, uint256_int8: _uint256_int8, uint256_int42: _uint256_int42, uint256_int256: _uint256_int256, uint256_uint8: _uint256_uint8, uint256_uint42: _uint256_uint42, uint256_uint256: _uint256_uint256, uint256_coins: _uint256_coins, address_int: _address_int, address_int8: _address_int8, address_int42: _address_int42, address_int256: _address_int256, address_uint8: _address_uint8, address_uint42: _address_uint42, address_uint256: _address_uint256, address_coins: _address_coins };
}
function storeTupleReplaceAllMapsResult(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeBoolean(source.int_int);
    builder.writeBoolean(source.int_int8);
    builder.writeBoolean(source.int_int42);
    builder.writeBoolean(source.int_int256);
    builder.writeBoolean(source.int_uint8);
    builder.writeBoolean(source.int_uint42);
    builder.writeBoolean(source.int_uint256);
    builder.writeBoolean(source.int_coins);
    builder.writeBoolean(source.int8_int);
    builder.writeBoolean(source.int8_int8);
    builder.writeBoolean(source.int8_int42);
    builder.writeBoolean(source.int8_int256);
    builder.writeBoolean(source.int8_uint8);
    builder.writeBoolean(source.int8_uint42);
    builder.writeBoolean(source.int8_uint256);
    builder.writeBoolean(source.int8_coins);
    builder.writeBoolean(source.int42_int);
    builder.writeBoolean(source.int42_int8);
    builder.writeBoolean(source.int42_int42);
    builder.writeBoolean(source.int42_int256);
    builder.writeBoolean(source.int42_uint8);
    builder.writeBoolean(source.int42_uint42);
    builder.writeBoolean(source.int42_uint256);
    builder.writeBoolean(source.int42_coins);
    builder.writeBoolean(source.int256_int);
    builder.writeBoolean(source.int256_int8);
    builder.writeBoolean(source.int256_int42);
    builder.writeBoolean(source.int256_int256);
    builder.writeBoolean(source.int256_uint8);
    builder.writeBoolean(source.int256_uint42);
    builder.writeBoolean(source.int256_uint256);
    builder.writeBoolean(source.int256_coins);
    builder.writeBoolean(source.uint8_int);
    builder.writeBoolean(source.uint8_int8);
    builder.writeBoolean(source.uint8_int42);
    builder.writeBoolean(source.uint8_int256);
    builder.writeBoolean(source.uint8_uint8);
    builder.writeBoolean(source.uint8_uint42);
    builder.writeBoolean(source.uint8_uint256);
    builder.writeBoolean(source.uint8_coins);
    builder.writeBoolean(source.uint42_int);
    builder.writeBoolean(source.uint42_int8);
    builder.writeBoolean(source.uint42_int42);
    builder.writeBoolean(source.uint42_int256);
    builder.writeBoolean(source.uint42_uint8);
    builder.writeBoolean(source.uint42_uint42);
    builder.writeBoolean(source.uint42_uint256);
    builder.writeBoolean(source.uint42_coins);
    builder.writeBoolean(source.uint256_int);
    builder.writeBoolean(source.uint256_int8);
    builder.writeBoolean(source.uint256_int42);
    builder.writeBoolean(source.uint256_int256);
    builder.writeBoolean(source.uint256_uint8);
    builder.writeBoolean(source.uint256_uint42);
    builder.writeBoolean(source.uint256_uint256);
    builder.writeBoolean(source.uint256_coins);
    builder.writeBoolean(source.address_int);
    builder.writeBoolean(source.address_int8);
    builder.writeBoolean(source.address_int42);
    builder.writeBoolean(source.address_int256);
    builder.writeBoolean(source.address_uint8);
    builder.writeBoolean(source.address_uint42);
    builder.writeBoolean(source.address_uint256);
    builder.writeBoolean(source.address_coins);
    return builder.build();
}
function dictValueParserReplaceAllMapsResult() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeReplaceAllMapsResult(src)).endCell());
        },
        parse: (src) => {
            return loadReplaceAllMapsResult(src.loadRef().beginParse());
        }
    };
}
function storeReplaceGetAllMapsResult(src) {
    return (builder) => {
        const b_0 = builder;
        if (src.int_int !== null && src.int_int !== undefined) {
            b_0.storeBit(true).storeInt(src.int_int, 257);
        }
        else {
            b_0.storeBit(false);
        }
        if (src.int_int8 !== null && src.int_int8 !== undefined) {
            b_0.storeBit(true).storeInt(src.int_int8, 257);
        }
        else {
            b_0.storeBit(false);
        }
        if (src.int_int42 !== null && src.int_int42 !== undefined) {
            b_0.storeBit(true).storeInt(src.int_int42, 257);
        }
        else {
            b_0.storeBit(false);
        }
        const b_1 = new core_1.Builder();
        if (src.int_int256 !== null && src.int_int256 !== undefined) {
            b_1.storeBit(true).storeInt(src.int_int256, 257);
        }
        else {
            b_1.storeBit(false);
        }
        if (src.int_uint8 !== null && src.int_uint8 !== undefined) {
            b_1.storeBit(true).storeInt(src.int_uint8, 257);
        }
        else {
            b_1.storeBit(false);
        }
        if (src.int_uint42 !== null && src.int_uint42 !== undefined) {
            b_1.storeBit(true).storeInt(src.int_uint42, 257);
        }
        else {
            b_1.storeBit(false);
        }
        const b_2 = new core_1.Builder();
        if (src.int_uint256 !== null && src.int_uint256 !== undefined) {
            b_2.storeBit(true).storeInt(src.int_uint256, 257);
        }
        else {
            b_2.storeBit(false);
        }
        if (src.int_coins !== null && src.int_coins !== undefined) {
            b_2.storeBit(true).storeInt(src.int_coins, 257);
        }
        else {
            b_2.storeBit(false);
        }
        if (src.int8_int !== null && src.int8_int !== undefined) {
            b_2.storeBit(true).storeInt(src.int8_int, 257);
        }
        else {
            b_2.storeBit(false);
        }
        const b_3 = new core_1.Builder();
        if (src.int8_int8 !== null && src.int8_int8 !== undefined) {
            b_3.storeBit(true).storeInt(src.int8_int8, 257);
        }
        else {
            b_3.storeBit(false);
        }
        if (src.int8_int42 !== null && src.int8_int42 !== undefined) {
            b_3.storeBit(true).storeInt(src.int8_int42, 257);
        }
        else {
            b_3.storeBit(false);
        }
        if (src.int8_int256 !== null && src.int8_int256 !== undefined) {
            b_3.storeBit(true).storeInt(src.int8_int256, 257);
        }
        else {
            b_3.storeBit(false);
        }
        const b_4 = new core_1.Builder();
        if (src.int8_uint8 !== null && src.int8_uint8 !== undefined) {
            b_4.storeBit(true).storeInt(src.int8_uint8, 257);
        }
        else {
            b_4.storeBit(false);
        }
        if (src.int8_uint42 !== null && src.int8_uint42 !== undefined) {
            b_4.storeBit(true).storeInt(src.int8_uint42, 257);
        }
        else {
            b_4.storeBit(false);
        }
        if (src.int8_uint256 !== null && src.int8_uint256 !== undefined) {
            b_4.storeBit(true).storeInt(src.int8_uint256, 257);
        }
        else {
            b_4.storeBit(false);
        }
        const b_5 = new core_1.Builder();
        if (src.int8_coins !== null && src.int8_coins !== undefined) {
            b_5.storeBit(true).storeInt(src.int8_coins, 257);
        }
        else {
            b_5.storeBit(false);
        }
        if (src.int42_int !== null && src.int42_int !== undefined) {
            b_5.storeBit(true).storeInt(src.int42_int, 257);
        }
        else {
            b_5.storeBit(false);
        }
        if (src.int42_int8 !== null && src.int42_int8 !== undefined) {
            b_5.storeBit(true).storeInt(src.int42_int8, 257);
        }
        else {
            b_5.storeBit(false);
        }
        const b_6 = new core_1.Builder();
        if (src.int42_int42 !== null && src.int42_int42 !== undefined) {
            b_6.storeBit(true).storeInt(src.int42_int42, 257);
        }
        else {
            b_6.storeBit(false);
        }
        if (src.int42_int256 !== null && src.int42_int256 !== undefined) {
            b_6.storeBit(true).storeInt(src.int42_int256, 257);
        }
        else {
            b_6.storeBit(false);
        }
        if (src.int42_uint8 !== null && src.int42_uint8 !== undefined) {
            b_6.storeBit(true).storeInt(src.int42_uint8, 257);
        }
        else {
            b_6.storeBit(false);
        }
        const b_7 = new core_1.Builder();
        if (src.int42_uint42 !== null && src.int42_uint42 !== undefined) {
            b_7.storeBit(true).storeInt(src.int42_uint42, 257);
        }
        else {
            b_7.storeBit(false);
        }
        if (src.int42_uint256 !== null && src.int42_uint256 !== undefined) {
            b_7.storeBit(true).storeInt(src.int42_uint256, 257);
        }
        else {
            b_7.storeBit(false);
        }
        if (src.int42_coins !== null && src.int42_coins !== undefined) {
            b_7.storeBit(true).storeInt(src.int42_coins, 257);
        }
        else {
            b_7.storeBit(false);
        }
        const b_8 = new core_1.Builder();
        if (src.int256_int !== null && src.int256_int !== undefined) {
            b_8.storeBit(true).storeInt(src.int256_int, 257);
        }
        else {
            b_8.storeBit(false);
        }
        if (src.int256_int8 !== null && src.int256_int8 !== undefined) {
            b_8.storeBit(true).storeInt(src.int256_int8, 257);
        }
        else {
            b_8.storeBit(false);
        }
        if (src.int256_int42 !== null && src.int256_int42 !== undefined) {
            b_8.storeBit(true).storeInt(src.int256_int42, 257);
        }
        else {
            b_8.storeBit(false);
        }
        const b_9 = new core_1.Builder();
        if (src.int256_int256 !== null && src.int256_int256 !== undefined) {
            b_9.storeBit(true).storeInt(src.int256_int256, 257);
        }
        else {
            b_9.storeBit(false);
        }
        if (src.int256_uint8 !== null && src.int256_uint8 !== undefined) {
            b_9.storeBit(true).storeInt(src.int256_uint8, 257);
        }
        else {
            b_9.storeBit(false);
        }
        if (src.int256_uint42 !== null && src.int256_uint42 !== undefined) {
            b_9.storeBit(true).storeInt(src.int256_uint42, 257);
        }
        else {
            b_9.storeBit(false);
        }
        const b_10 = new core_1.Builder();
        if (src.int256_uint256 !== null && src.int256_uint256 !== undefined) {
            b_10.storeBit(true).storeInt(src.int256_uint256, 257);
        }
        else {
            b_10.storeBit(false);
        }
        if (src.int256_coins !== null && src.int256_coins !== undefined) {
            b_10.storeBit(true).storeInt(src.int256_coins, 257);
        }
        else {
            b_10.storeBit(false);
        }
        if (src.uint8_int !== null && src.uint8_int !== undefined) {
            b_10.storeBit(true).storeInt(src.uint8_int, 257);
        }
        else {
            b_10.storeBit(false);
        }
        const b_11 = new core_1.Builder();
        if (src.uint8_int8 !== null && src.uint8_int8 !== undefined) {
            b_11.storeBit(true).storeInt(src.uint8_int8, 257);
        }
        else {
            b_11.storeBit(false);
        }
        if (src.uint8_int42 !== null && src.uint8_int42 !== undefined) {
            b_11.storeBit(true).storeInt(src.uint8_int42, 257);
        }
        else {
            b_11.storeBit(false);
        }
        if (src.uint8_int256 !== null && src.uint8_int256 !== undefined) {
            b_11.storeBit(true).storeInt(src.uint8_int256, 257);
        }
        else {
            b_11.storeBit(false);
        }
        const b_12 = new core_1.Builder();
        if (src.uint8_uint8 !== null && src.uint8_uint8 !== undefined) {
            b_12.storeBit(true).storeInt(src.uint8_uint8, 257);
        }
        else {
            b_12.storeBit(false);
        }
        if (src.uint8_uint42 !== null && src.uint8_uint42 !== undefined) {
            b_12.storeBit(true).storeInt(src.uint8_uint42, 257);
        }
        else {
            b_12.storeBit(false);
        }
        if (src.uint8_uint256 !== null && src.uint8_uint256 !== undefined) {
            b_12.storeBit(true).storeInt(src.uint8_uint256, 257);
        }
        else {
            b_12.storeBit(false);
        }
        const b_13 = new core_1.Builder();
        if (src.uint8_coins !== null && src.uint8_coins !== undefined) {
            b_13.storeBit(true).storeInt(src.uint8_coins, 257);
        }
        else {
            b_13.storeBit(false);
        }
        if (src.uint42_int !== null && src.uint42_int !== undefined) {
            b_13.storeBit(true).storeInt(src.uint42_int, 257);
        }
        else {
            b_13.storeBit(false);
        }
        if (src.uint42_int8 !== null && src.uint42_int8 !== undefined) {
            b_13.storeBit(true).storeInt(src.uint42_int8, 257);
        }
        else {
            b_13.storeBit(false);
        }
        const b_14 = new core_1.Builder();
        if (src.uint42_int42 !== null && src.uint42_int42 !== undefined) {
            b_14.storeBit(true).storeInt(src.uint42_int42, 257);
        }
        else {
            b_14.storeBit(false);
        }
        if (src.uint42_int256 !== null && src.uint42_int256 !== undefined) {
            b_14.storeBit(true).storeInt(src.uint42_int256, 257);
        }
        else {
            b_14.storeBit(false);
        }
        if (src.uint42_uint8 !== null && src.uint42_uint8 !== undefined) {
            b_14.storeBit(true).storeInt(src.uint42_uint8, 257);
        }
        else {
            b_14.storeBit(false);
        }
        const b_15 = new core_1.Builder();
        if (src.uint42_uint42 !== null && src.uint42_uint42 !== undefined) {
            b_15.storeBit(true).storeInt(src.uint42_uint42, 257);
        }
        else {
            b_15.storeBit(false);
        }
        if (src.uint42_uint256 !== null && src.uint42_uint256 !== undefined) {
            b_15.storeBit(true).storeInt(src.uint42_uint256, 257);
        }
        else {
            b_15.storeBit(false);
        }
        if (src.uint42_coins !== null && src.uint42_coins !== undefined) {
            b_15.storeBit(true).storeInt(src.uint42_coins, 257);
        }
        else {
            b_15.storeBit(false);
        }
        const b_16 = new core_1.Builder();
        if (src.uint256_int !== null && src.uint256_int !== undefined) {
            b_16.storeBit(true).storeInt(src.uint256_int, 257);
        }
        else {
            b_16.storeBit(false);
        }
        if (src.uint256_int8 !== null && src.uint256_int8 !== undefined) {
            b_16.storeBit(true).storeInt(src.uint256_int8, 257);
        }
        else {
            b_16.storeBit(false);
        }
        if (src.uint256_int42 !== null && src.uint256_int42 !== undefined) {
            b_16.storeBit(true).storeInt(src.uint256_int42, 257);
        }
        else {
            b_16.storeBit(false);
        }
        const b_17 = new core_1.Builder();
        if (src.uint256_int256 !== null && src.uint256_int256 !== undefined) {
            b_17.storeBit(true).storeInt(src.uint256_int256, 257);
        }
        else {
            b_17.storeBit(false);
        }
        if (src.uint256_uint8 !== null && src.uint256_uint8 !== undefined) {
            b_17.storeBit(true).storeInt(src.uint256_uint8, 257);
        }
        else {
            b_17.storeBit(false);
        }
        if (src.uint256_uint42 !== null && src.uint256_uint42 !== undefined) {
            b_17.storeBit(true).storeInt(src.uint256_uint42, 257);
        }
        else {
            b_17.storeBit(false);
        }
        const b_18 = new core_1.Builder();
        if (src.uint256_uint256 !== null && src.uint256_uint256 !== undefined) {
            b_18.storeBit(true).storeInt(src.uint256_uint256, 257);
        }
        else {
            b_18.storeBit(false);
        }
        if (src.uint256_coins !== null && src.uint256_coins !== undefined) {
            b_18.storeBit(true).storeInt(src.uint256_coins, 257);
        }
        else {
            b_18.storeBit(false);
        }
        if (src.address_int !== null && src.address_int !== undefined) {
            b_18.storeBit(true).storeInt(src.address_int, 257);
        }
        else {
            b_18.storeBit(false);
        }
        const b_19 = new core_1.Builder();
        if (src.address_int8 !== null && src.address_int8 !== undefined) {
            b_19.storeBit(true).storeInt(src.address_int8, 257);
        }
        else {
            b_19.storeBit(false);
        }
        if (src.address_int42 !== null && src.address_int42 !== undefined) {
            b_19.storeBit(true).storeInt(src.address_int42, 257);
        }
        else {
            b_19.storeBit(false);
        }
        if (src.address_int256 !== null && src.address_int256 !== undefined) {
            b_19.storeBit(true).storeInt(src.address_int256, 257);
        }
        else {
            b_19.storeBit(false);
        }
        const b_20 = new core_1.Builder();
        if (src.address_uint8 !== null && src.address_uint8 !== undefined) {
            b_20.storeBit(true).storeInt(src.address_uint8, 257);
        }
        else {
            b_20.storeBit(false);
        }
        if (src.address_uint42 !== null && src.address_uint42 !== undefined) {
            b_20.storeBit(true).storeInt(src.address_uint42, 257);
        }
        else {
            b_20.storeBit(false);
        }
        if (src.address_uint256 !== null && src.address_uint256 !== undefined) {
            b_20.storeBit(true).storeInt(src.address_uint256, 257);
        }
        else {
            b_20.storeBit(false);
        }
        const b_21 = new core_1.Builder();
        if (src.address_coins !== null && src.address_coins !== undefined) {
            b_21.storeBit(true).storeInt(src.address_coins, 257);
        }
        else {
            b_21.storeBit(false);
        }
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
function loadReplaceGetAllMapsResult(slice) {
    const sc_0 = slice;
    const _int_int = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    const _int_int8 = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    const _int_int42 = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    const sc_1 = sc_0.loadRef().beginParse();
    const _int_int256 = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    const _int_uint8 = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    const _int_uint42 = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    const sc_2 = sc_1.loadRef().beginParse();
    const _int_uint256 = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    const _int_coins = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    const _int8_int = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    const sc_3 = sc_2.loadRef().beginParse();
    const _int8_int8 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _int8_int42 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _int8_int256 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const sc_4 = sc_3.loadRef().beginParse();
    const _int8_uint8 = sc_4.loadBit() ? sc_4.loadIntBig(257) : null;
    const _int8_uint42 = sc_4.loadBit() ? sc_4.loadIntBig(257) : null;
    const _int8_uint256 = sc_4.loadBit() ? sc_4.loadIntBig(257) : null;
    const sc_5 = sc_4.loadRef().beginParse();
    const _int8_coins = sc_5.loadBit() ? sc_5.loadIntBig(257) : null;
    const _int42_int = sc_5.loadBit() ? sc_5.loadIntBig(257) : null;
    const _int42_int8 = sc_5.loadBit() ? sc_5.loadIntBig(257) : null;
    const sc_6 = sc_5.loadRef().beginParse();
    const _int42_int42 = sc_6.loadBit() ? sc_6.loadIntBig(257) : null;
    const _int42_int256 = sc_6.loadBit() ? sc_6.loadIntBig(257) : null;
    const _int42_uint8 = sc_6.loadBit() ? sc_6.loadIntBig(257) : null;
    const sc_7 = sc_6.loadRef().beginParse();
    const _int42_uint42 = sc_7.loadBit() ? sc_7.loadIntBig(257) : null;
    const _int42_uint256 = sc_7.loadBit() ? sc_7.loadIntBig(257) : null;
    const _int42_coins = sc_7.loadBit() ? sc_7.loadIntBig(257) : null;
    const sc_8 = sc_7.loadRef().beginParse();
    const _int256_int = sc_8.loadBit() ? sc_8.loadIntBig(257) : null;
    const _int256_int8 = sc_8.loadBit() ? sc_8.loadIntBig(257) : null;
    const _int256_int42 = sc_8.loadBit() ? sc_8.loadIntBig(257) : null;
    const sc_9 = sc_8.loadRef().beginParse();
    const _int256_int256 = sc_9.loadBit() ? sc_9.loadIntBig(257) : null;
    const _int256_uint8 = sc_9.loadBit() ? sc_9.loadIntBig(257) : null;
    const _int256_uint42 = sc_9.loadBit() ? sc_9.loadIntBig(257) : null;
    const sc_10 = sc_9.loadRef().beginParse();
    const _int256_uint256 = sc_10.loadBit() ? sc_10.loadIntBig(257) : null;
    const _int256_coins = sc_10.loadBit() ? sc_10.loadIntBig(257) : null;
    const _uint8_int = sc_10.loadBit() ? sc_10.loadIntBig(257) : null;
    const sc_11 = sc_10.loadRef().beginParse();
    const _uint8_int8 = sc_11.loadBit() ? sc_11.loadIntBig(257) : null;
    const _uint8_int42 = sc_11.loadBit() ? sc_11.loadIntBig(257) : null;
    const _uint8_int256 = sc_11.loadBit() ? sc_11.loadIntBig(257) : null;
    const sc_12 = sc_11.loadRef().beginParse();
    const _uint8_uint8 = sc_12.loadBit() ? sc_12.loadIntBig(257) : null;
    const _uint8_uint42 = sc_12.loadBit() ? sc_12.loadIntBig(257) : null;
    const _uint8_uint256 = sc_12.loadBit() ? sc_12.loadIntBig(257) : null;
    const sc_13 = sc_12.loadRef().beginParse();
    const _uint8_coins = sc_13.loadBit() ? sc_13.loadIntBig(257) : null;
    const _uint42_int = sc_13.loadBit() ? sc_13.loadIntBig(257) : null;
    const _uint42_int8 = sc_13.loadBit() ? sc_13.loadIntBig(257) : null;
    const sc_14 = sc_13.loadRef().beginParse();
    const _uint42_int42 = sc_14.loadBit() ? sc_14.loadIntBig(257) : null;
    const _uint42_int256 = sc_14.loadBit() ? sc_14.loadIntBig(257) : null;
    const _uint42_uint8 = sc_14.loadBit() ? sc_14.loadIntBig(257) : null;
    const sc_15 = sc_14.loadRef().beginParse();
    const _uint42_uint42 = sc_15.loadBit() ? sc_15.loadIntBig(257) : null;
    const _uint42_uint256 = sc_15.loadBit() ? sc_15.loadIntBig(257) : null;
    const _uint42_coins = sc_15.loadBit() ? sc_15.loadIntBig(257) : null;
    const sc_16 = sc_15.loadRef().beginParse();
    const _uint256_int = sc_16.loadBit() ? sc_16.loadIntBig(257) : null;
    const _uint256_int8 = sc_16.loadBit() ? sc_16.loadIntBig(257) : null;
    const _uint256_int42 = sc_16.loadBit() ? sc_16.loadIntBig(257) : null;
    const sc_17 = sc_16.loadRef().beginParse();
    const _uint256_int256 = sc_17.loadBit() ? sc_17.loadIntBig(257) : null;
    const _uint256_uint8 = sc_17.loadBit() ? sc_17.loadIntBig(257) : null;
    const _uint256_uint42 = sc_17.loadBit() ? sc_17.loadIntBig(257) : null;
    const sc_18 = sc_17.loadRef().beginParse();
    const _uint256_uint256 = sc_18.loadBit() ? sc_18.loadIntBig(257) : null;
    const _uint256_coins = sc_18.loadBit() ? sc_18.loadIntBig(257) : null;
    const _address_int = sc_18.loadBit() ? sc_18.loadIntBig(257) : null;
    const sc_19 = sc_18.loadRef().beginParse();
    const _address_int8 = sc_19.loadBit() ? sc_19.loadIntBig(257) : null;
    const _address_int42 = sc_19.loadBit() ? sc_19.loadIntBig(257) : null;
    const _address_int256 = sc_19.loadBit() ? sc_19.loadIntBig(257) : null;
    const sc_20 = sc_19.loadRef().beginParse();
    const _address_uint8 = sc_20.loadBit() ? sc_20.loadIntBig(257) : null;
    const _address_uint42 = sc_20.loadBit() ? sc_20.loadIntBig(257) : null;
    const _address_uint256 = sc_20.loadBit() ? sc_20.loadIntBig(257) : null;
    const sc_21 = sc_20.loadRef().beginParse();
    const _address_coins = sc_21.loadBit() ? sc_21.loadIntBig(257) : null;
    return { $$type: 'ReplaceGetAllMapsResult', int_int: _int_int, int_int8: _int_int8, int_int42: _int_int42, int_int256: _int_int256, int_uint8: _int_uint8, int_uint42: _int_uint42, int_uint256: _int_uint256, int_coins: _int_coins, int8_int: _int8_int, int8_int8: _int8_int8, int8_int42: _int8_int42, int8_int256: _int8_int256, int8_uint8: _int8_uint8, int8_uint42: _int8_uint42, int8_uint256: _int8_uint256, int8_coins: _int8_coins, int42_int: _int42_int, int42_int8: _int42_int8, int42_int42: _int42_int42, int42_int256: _int42_int256, int42_uint8: _int42_uint8, int42_uint42: _int42_uint42, int42_uint256: _int42_uint256, int42_coins: _int42_coins, int256_int: _int256_int, int256_int8: _int256_int8, int256_int42: _int256_int42, int256_int256: _int256_int256, int256_uint8: _int256_uint8, int256_uint42: _int256_uint42, int256_uint256: _int256_uint256, int256_coins: _int256_coins, uint8_int: _uint8_int, uint8_int8: _uint8_int8, uint8_int42: _uint8_int42, uint8_int256: _uint8_int256, uint8_uint8: _uint8_uint8, uint8_uint42: _uint8_uint42, uint8_uint256: _uint8_uint256, uint8_coins: _uint8_coins, uint42_int: _uint42_int, uint42_int8: _uint42_int8, uint42_int42: _uint42_int42, uint42_int256: _uint42_int256, uint42_uint8: _uint42_uint8, uint42_uint42: _uint42_uint42, uint42_uint256: _uint42_uint256, uint42_coins: _uint42_coins, uint256_int: _uint256_int, uint256_int8: _uint256_int8, uint256_int42: _uint256_int42, uint256_int256: _uint256_int256, uint256_uint8: _uint256_uint8, uint256_uint42: _uint256_uint42, uint256_uint256: _uint256_uint256, uint256_coins: _uint256_coins, address_int: _address_int, address_int8: _address_int8, address_int42: _address_int42, address_int256: _address_int256, address_uint8: _address_uint8, address_uint42: _address_uint42, address_uint256: _address_uint256, address_coins: _address_coins };
}
function loadTupleReplaceGetAllMapsResult(source) {
    const _int_int = source.readBigNumberOpt();
    const _int_int8 = source.readBigNumberOpt();
    const _int_int42 = source.readBigNumberOpt();
    const _int_int256 = source.readBigNumberOpt();
    const _int_uint8 = source.readBigNumberOpt();
    const _int_uint42 = source.readBigNumberOpt();
    const _int_uint256 = source.readBigNumberOpt();
    const _int_coins = source.readBigNumberOpt();
    const _int8_int = source.readBigNumberOpt();
    const _int8_int8 = source.readBigNumberOpt();
    const _int8_int42 = source.readBigNumberOpt();
    const _int8_int256 = source.readBigNumberOpt();
    const _int8_uint8 = source.readBigNumberOpt();
    const _int8_uint42 = source.readBigNumberOpt();
    source = source.readTuple();
    const _int8_uint256 = source.readBigNumberOpt();
    const _int8_coins = source.readBigNumberOpt();
    const _int42_int = source.readBigNumberOpt();
    const _int42_int8 = source.readBigNumberOpt();
    const _int42_int42 = source.readBigNumberOpt();
    const _int42_int256 = source.readBigNumberOpt();
    const _int42_uint8 = source.readBigNumberOpt();
    const _int42_uint42 = source.readBigNumberOpt();
    const _int42_uint256 = source.readBigNumberOpt();
    const _int42_coins = source.readBigNumberOpt();
    const _int256_int = source.readBigNumberOpt();
    const _int256_int8 = source.readBigNumberOpt();
    const _int256_int42 = source.readBigNumberOpt();
    const _int256_int256 = source.readBigNumberOpt();
    source = source.readTuple();
    const _int256_uint8 = source.readBigNumberOpt();
    const _int256_uint42 = source.readBigNumberOpt();
    const _int256_uint256 = source.readBigNumberOpt();
    const _int256_coins = source.readBigNumberOpt();
    const _uint8_int = source.readBigNumberOpt();
    const _uint8_int8 = source.readBigNumberOpt();
    const _uint8_int42 = source.readBigNumberOpt();
    const _uint8_int256 = source.readBigNumberOpt();
    const _uint8_uint8 = source.readBigNumberOpt();
    const _uint8_uint42 = source.readBigNumberOpt();
    const _uint8_uint256 = source.readBigNumberOpt();
    const _uint8_coins = source.readBigNumberOpt();
    const _uint42_int = source.readBigNumberOpt();
    const _uint42_int8 = source.readBigNumberOpt();
    source = source.readTuple();
    const _uint42_int42 = source.readBigNumberOpt();
    const _uint42_int256 = source.readBigNumberOpt();
    const _uint42_uint8 = source.readBigNumberOpt();
    const _uint42_uint42 = source.readBigNumberOpt();
    const _uint42_uint256 = source.readBigNumberOpt();
    const _uint42_coins = source.readBigNumberOpt();
    const _uint256_int = source.readBigNumberOpt();
    const _uint256_int8 = source.readBigNumberOpt();
    const _uint256_int42 = source.readBigNumberOpt();
    const _uint256_int256 = source.readBigNumberOpt();
    const _uint256_uint8 = source.readBigNumberOpt();
    const _uint256_uint42 = source.readBigNumberOpt();
    const _uint256_uint256 = source.readBigNumberOpt();
    const _uint256_coins = source.readBigNumberOpt();
    source = source.readTuple();
    const _address_int = source.readBigNumberOpt();
    const _address_int8 = source.readBigNumberOpt();
    const _address_int42 = source.readBigNumberOpt();
    const _address_int256 = source.readBigNumberOpt();
    const _address_uint8 = source.readBigNumberOpt();
    const _address_uint42 = source.readBigNumberOpt();
    const _address_uint256 = source.readBigNumberOpt();
    const _address_coins = source.readBigNumberOpt();
    return { $$type: 'ReplaceGetAllMapsResult', int_int: _int_int, int_int8: _int_int8, int_int42: _int_int42, int_int256: _int_int256, int_uint8: _int_uint8, int_uint42: _int_uint42, int_uint256: _int_uint256, int_coins: _int_coins, int8_int: _int8_int, int8_int8: _int8_int8, int8_int42: _int8_int42, int8_int256: _int8_int256, int8_uint8: _int8_uint8, int8_uint42: _int8_uint42, int8_uint256: _int8_uint256, int8_coins: _int8_coins, int42_int: _int42_int, int42_int8: _int42_int8, int42_int42: _int42_int42, int42_int256: _int42_int256, int42_uint8: _int42_uint8, int42_uint42: _int42_uint42, int42_uint256: _int42_uint256, int42_coins: _int42_coins, int256_int: _int256_int, int256_int8: _int256_int8, int256_int42: _int256_int42, int256_int256: _int256_int256, int256_uint8: _int256_uint8, int256_uint42: _int256_uint42, int256_uint256: _int256_uint256, int256_coins: _int256_coins, uint8_int: _uint8_int, uint8_int8: _uint8_int8, uint8_int42: _uint8_int42, uint8_int256: _uint8_int256, uint8_uint8: _uint8_uint8, uint8_uint42: _uint8_uint42, uint8_uint256: _uint8_uint256, uint8_coins: _uint8_coins, uint42_int: _uint42_int, uint42_int8: _uint42_int8, uint42_int42: _uint42_int42, uint42_int256: _uint42_int256, uint42_uint8: _uint42_uint8, uint42_uint42: _uint42_uint42, uint42_uint256: _uint42_uint256, uint42_coins: _uint42_coins, uint256_int: _uint256_int, uint256_int8: _uint256_int8, uint256_int42: _uint256_int42, uint256_int256: _uint256_int256, uint256_uint8: _uint256_uint8, uint256_uint42: _uint256_uint42, uint256_uint256: _uint256_uint256, uint256_coins: _uint256_coins, address_int: _address_int, address_int8: _address_int8, address_int42: _address_int42, address_int256: _address_int256, address_uint8: _address_uint8, address_uint42: _address_uint42, address_uint256: _address_uint256, address_coins: _address_coins };
}
function loadGetterTupleReplaceGetAllMapsResult(source) {
    const _int_int = source.readBigNumberOpt();
    const _int_int8 = source.readBigNumberOpt();
    const _int_int42 = source.readBigNumberOpt();
    const _int_int256 = source.readBigNumberOpt();
    const _int_uint8 = source.readBigNumberOpt();
    const _int_uint42 = source.readBigNumberOpt();
    const _int_uint256 = source.readBigNumberOpt();
    const _int_coins = source.readBigNumberOpt();
    const _int8_int = source.readBigNumberOpt();
    const _int8_int8 = source.readBigNumberOpt();
    const _int8_int42 = source.readBigNumberOpt();
    const _int8_int256 = source.readBigNumberOpt();
    const _int8_uint8 = source.readBigNumberOpt();
    const _int8_uint42 = source.readBigNumberOpt();
    const _int8_uint256 = source.readBigNumberOpt();
    const _int8_coins = source.readBigNumberOpt();
    const _int42_int = source.readBigNumberOpt();
    const _int42_int8 = source.readBigNumberOpt();
    const _int42_int42 = source.readBigNumberOpt();
    const _int42_int256 = source.readBigNumberOpt();
    const _int42_uint8 = source.readBigNumberOpt();
    const _int42_uint42 = source.readBigNumberOpt();
    const _int42_uint256 = source.readBigNumberOpt();
    const _int42_coins = source.readBigNumberOpt();
    const _int256_int = source.readBigNumberOpt();
    const _int256_int8 = source.readBigNumberOpt();
    const _int256_int42 = source.readBigNumberOpt();
    const _int256_int256 = source.readBigNumberOpt();
    const _int256_uint8 = source.readBigNumberOpt();
    const _int256_uint42 = source.readBigNumberOpt();
    const _int256_uint256 = source.readBigNumberOpt();
    const _int256_coins = source.readBigNumberOpt();
    const _uint8_int = source.readBigNumberOpt();
    const _uint8_int8 = source.readBigNumberOpt();
    const _uint8_int42 = source.readBigNumberOpt();
    const _uint8_int256 = source.readBigNumberOpt();
    const _uint8_uint8 = source.readBigNumberOpt();
    const _uint8_uint42 = source.readBigNumberOpt();
    const _uint8_uint256 = source.readBigNumberOpt();
    const _uint8_coins = source.readBigNumberOpt();
    const _uint42_int = source.readBigNumberOpt();
    const _uint42_int8 = source.readBigNumberOpt();
    const _uint42_int42 = source.readBigNumberOpt();
    const _uint42_int256 = source.readBigNumberOpt();
    const _uint42_uint8 = source.readBigNumberOpt();
    const _uint42_uint42 = source.readBigNumberOpt();
    const _uint42_uint256 = source.readBigNumberOpt();
    const _uint42_coins = source.readBigNumberOpt();
    const _uint256_int = source.readBigNumberOpt();
    const _uint256_int8 = source.readBigNumberOpt();
    const _uint256_int42 = source.readBigNumberOpt();
    const _uint256_int256 = source.readBigNumberOpt();
    const _uint256_uint8 = source.readBigNumberOpt();
    const _uint256_uint42 = source.readBigNumberOpt();
    const _uint256_uint256 = source.readBigNumberOpt();
    const _uint256_coins = source.readBigNumberOpt();
    const _address_int = source.readBigNumberOpt();
    const _address_int8 = source.readBigNumberOpt();
    const _address_int42 = source.readBigNumberOpt();
    const _address_int256 = source.readBigNumberOpt();
    const _address_uint8 = source.readBigNumberOpt();
    const _address_uint42 = source.readBigNumberOpt();
    const _address_uint256 = source.readBigNumberOpt();
    const _address_coins = source.readBigNumberOpt();
    return { $$type: 'ReplaceGetAllMapsResult', int_int: _int_int, int_int8: _int_int8, int_int42: _int_int42, int_int256: _int_int256, int_uint8: _int_uint8, int_uint42: _int_uint42, int_uint256: _int_uint256, int_coins: _int_coins, int8_int: _int8_int, int8_int8: _int8_int8, int8_int42: _int8_int42, int8_int256: _int8_int256, int8_uint8: _int8_uint8, int8_uint42: _int8_uint42, int8_uint256: _int8_uint256, int8_coins: _int8_coins, int42_int: _int42_int, int42_int8: _int42_int8, int42_int42: _int42_int42, int42_int256: _int42_int256, int42_uint8: _int42_uint8, int42_uint42: _int42_uint42, int42_uint256: _int42_uint256, int42_coins: _int42_coins, int256_int: _int256_int, int256_int8: _int256_int8, int256_int42: _int256_int42, int256_int256: _int256_int256, int256_uint8: _int256_uint8, int256_uint42: _int256_uint42, int256_uint256: _int256_uint256, int256_coins: _int256_coins, uint8_int: _uint8_int, uint8_int8: _uint8_int8, uint8_int42: _uint8_int42, uint8_int256: _uint8_int256, uint8_uint8: _uint8_uint8, uint8_uint42: _uint8_uint42, uint8_uint256: _uint8_uint256, uint8_coins: _uint8_coins, uint42_int: _uint42_int, uint42_int8: _uint42_int8, uint42_int42: _uint42_int42, uint42_int256: _uint42_int256, uint42_uint8: _uint42_uint8, uint42_uint42: _uint42_uint42, uint42_uint256: _uint42_uint256, uint42_coins: _uint42_coins, uint256_int: _uint256_int, uint256_int8: _uint256_int8, uint256_int42: _uint256_int42, uint256_int256: _uint256_int256, uint256_uint8: _uint256_uint8, uint256_uint42: _uint256_uint42, uint256_uint256: _uint256_uint256, uint256_coins: _uint256_coins, address_int: _address_int, address_int8: _address_int8, address_int42: _address_int42, address_int256: _address_int256, address_uint8: _address_uint8, address_uint42: _address_uint42, address_uint256: _address_uint256, address_coins: _address_coins };
}
function storeTupleReplaceGetAllMapsResult(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.int_int);
    builder.writeNumber(source.int_int8);
    builder.writeNumber(source.int_int42);
    builder.writeNumber(source.int_int256);
    builder.writeNumber(source.int_uint8);
    builder.writeNumber(source.int_uint42);
    builder.writeNumber(source.int_uint256);
    builder.writeNumber(source.int_coins);
    builder.writeNumber(source.int8_int);
    builder.writeNumber(source.int8_int8);
    builder.writeNumber(source.int8_int42);
    builder.writeNumber(source.int8_int256);
    builder.writeNumber(source.int8_uint8);
    builder.writeNumber(source.int8_uint42);
    builder.writeNumber(source.int8_uint256);
    builder.writeNumber(source.int8_coins);
    builder.writeNumber(source.int42_int);
    builder.writeNumber(source.int42_int8);
    builder.writeNumber(source.int42_int42);
    builder.writeNumber(source.int42_int256);
    builder.writeNumber(source.int42_uint8);
    builder.writeNumber(source.int42_uint42);
    builder.writeNumber(source.int42_uint256);
    builder.writeNumber(source.int42_coins);
    builder.writeNumber(source.int256_int);
    builder.writeNumber(source.int256_int8);
    builder.writeNumber(source.int256_int42);
    builder.writeNumber(source.int256_int256);
    builder.writeNumber(source.int256_uint8);
    builder.writeNumber(source.int256_uint42);
    builder.writeNumber(source.int256_uint256);
    builder.writeNumber(source.int256_coins);
    builder.writeNumber(source.uint8_int);
    builder.writeNumber(source.uint8_int8);
    builder.writeNumber(source.uint8_int42);
    builder.writeNumber(source.uint8_int256);
    builder.writeNumber(source.uint8_uint8);
    builder.writeNumber(source.uint8_uint42);
    builder.writeNumber(source.uint8_uint256);
    builder.writeNumber(source.uint8_coins);
    builder.writeNumber(source.uint42_int);
    builder.writeNumber(source.uint42_int8);
    builder.writeNumber(source.uint42_int42);
    builder.writeNumber(source.uint42_int256);
    builder.writeNumber(source.uint42_uint8);
    builder.writeNumber(source.uint42_uint42);
    builder.writeNumber(source.uint42_uint256);
    builder.writeNumber(source.uint42_coins);
    builder.writeNumber(source.uint256_int);
    builder.writeNumber(source.uint256_int8);
    builder.writeNumber(source.uint256_int42);
    builder.writeNumber(source.uint256_int256);
    builder.writeNumber(source.uint256_uint8);
    builder.writeNumber(source.uint256_uint42);
    builder.writeNumber(source.uint256_uint256);
    builder.writeNumber(source.uint256_coins);
    builder.writeNumber(source.address_int);
    builder.writeNumber(source.address_int8);
    builder.writeNumber(source.address_int42);
    builder.writeNumber(source.address_int256);
    builder.writeNumber(source.address_uint8);
    builder.writeNumber(source.address_uint42);
    builder.writeNumber(source.address_uint256);
    builder.writeNumber(source.address_coins);
    return builder.build();
}
function dictValueParserReplaceGetAllMapsResult() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeReplaceGetAllMapsResult(src)).endCell());
        },
        parse: (src) => {
            return loadReplaceGetAllMapsResult(src.loadRef().beginParse());
        }
    };
}
function storeExistsAllMapsResult(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeBit(src.int_int);
        b_0.storeBit(src.int_int8);
        b_0.storeBit(src.int_int42);
        b_0.storeBit(src.int_int256);
        b_0.storeBit(src.int_uint8);
        b_0.storeBit(src.int_uint42);
        b_0.storeBit(src.int_uint256);
        b_0.storeBit(src.int_coins);
        b_0.storeBit(src.int8_int);
        b_0.storeBit(src.int8_int8);
        b_0.storeBit(src.int8_int42);
        b_0.storeBit(src.int8_int256);
        b_0.storeBit(src.int8_uint8);
        b_0.storeBit(src.int8_uint42);
        b_0.storeBit(src.int8_uint256);
        b_0.storeBit(src.int8_coins);
        b_0.storeBit(src.int42_int);
        b_0.storeBit(src.int42_int8);
        b_0.storeBit(src.int42_int42);
        b_0.storeBit(src.int42_int256);
        b_0.storeBit(src.int42_uint8);
        b_0.storeBit(src.int42_uint42);
        b_0.storeBit(src.int42_uint256);
        b_0.storeBit(src.int42_coins);
        b_0.storeBit(src.int256_int);
        b_0.storeBit(src.int256_int8);
        b_0.storeBit(src.int256_int42);
        b_0.storeBit(src.int256_int256);
        b_0.storeBit(src.int256_uint8);
        b_0.storeBit(src.int256_uint42);
        b_0.storeBit(src.int256_uint256);
        b_0.storeBit(src.int256_coins);
        b_0.storeBit(src.uint8_int);
        b_0.storeBit(src.uint8_int8);
        b_0.storeBit(src.uint8_int42);
        b_0.storeBit(src.uint8_int256);
        b_0.storeBit(src.uint8_uint8);
        b_0.storeBit(src.uint8_uint42);
        b_0.storeBit(src.uint8_uint256);
        b_0.storeBit(src.uint8_coins);
        b_0.storeBit(src.uint42_int);
        b_0.storeBit(src.uint42_int8);
        b_0.storeBit(src.uint42_int42);
        b_0.storeBit(src.uint42_int256);
        b_0.storeBit(src.uint42_uint8);
        b_0.storeBit(src.uint42_uint42);
        b_0.storeBit(src.uint42_uint256);
        b_0.storeBit(src.uint42_coins);
        b_0.storeBit(src.uint256_int);
        b_0.storeBit(src.uint256_int8);
        b_0.storeBit(src.uint256_int42);
        b_0.storeBit(src.uint256_int256);
        b_0.storeBit(src.uint256_uint8);
        b_0.storeBit(src.uint256_uint42);
        b_0.storeBit(src.uint256_uint256);
        b_0.storeBit(src.uint256_coins);
        b_0.storeBit(src.address_int);
        b_0.storeBit(src.address_int8);
        b_0.storeBit(src.address_int42);
        b_0.storeBit(src.address_int256);
        b_0.storeBit(src.address_uint8);
        b_0.storeBit(src.address_uint42);
        b_0.storeBit(src.address_uint256);
        b_0.storeBit(src.address_coins);
    };
}
function loadExistsAllMapsResult(slice) {
    const sc_0 = slice;
    const _int_int = sc_0.loadBit();
    const _int_int8 = sc_0.loadBit();
    const _int_int42 = sc_0.loadBit();
    const _int_int256 = sc_0.loadBit();
    const _int_uint8 = sc_0.loadBit();
    const _int_uint42 = sc_0.loadBit();
    const _int_uint256 = sc_0.loadBit();
    const _int_coins = sc_0.loadBit();
    const _int8_int = sc_0.loadBit();
    const _int8_int8 = sc_0.loadBit();
    const _int8_int42 = sc_0.loadBit();
    const _int8_int256 = sc_0.loadBit();
    const _int8_uint8 = sc_0.loadBit();
    const _int8_uint42 = sc_0.loadBit();
    const _int8_uint256 = sc_0.loadBit();
    const _int8_coins = sc_0.loadBit();
    const _int42_int = sc_0.loadBit();
    const _int42_int8 = sc_0.loadBit();
    const _int42_int42 = sc_0.loadBit();
    const _int42_int256 = sc_0.loadBit();
    const _int42_uint8 = sc_0.loadBit();
    const _int42_uint42 = sc_0.loadBit();
    const _int42_uint256 = sc_0.loadBit();
    const _int42_coins = sc_0.loadBit();
    const _int256_int = sc_0.loadBit();
    const _int256_int8 = sc_0.loadBit();
    const _int256_int42 = sc_0.loadBit();
    const _int256_int256 = sc_0.loadBit();
    const _int256_uint8 = sc_0.loadBit();
    const _int256_uint42 = sc_0.loadBit();
    const _int256_uint256 = sc_0.loadBit();
    const _int256_coins = sc_0.loadBit();
    const _uint8_int = sc_0.loadBit();
    const _uint8_int8 = sc_0.loadBit();
    const _uint8_int42 = sc_0.loadBit();
    const _uint8_int256 = sc_0.loadBit();
    const _uint8_uint8 = sc_0.loadBit();
    const _uint8_uint42 = sc_0.loadBit();
    const _uint8_uint256 = sc_0.loadBit();
    const _uint8_coins = sc_0.loadBit();
    const _uint42_int = sc_0.loadBit();
    const _uint42_int8 = sc_0.loadBit();
    const _uint42_int42 = sc_0.loadBit();
    const _uint42_int256 = sc_0.loadBit();
    const _uint42_uint8 = sc_0.loadBit();
    const _uint42_uint42 = sc_0.loadBit();
    const _uint42_uint256 = sc_0.loadBit();
    const _uint42_coins = sc_0.loadBit();
    const _uint256_int = sc_0.loadBit();
    const _uint256_int8 = sc_0.loadBit();
    const _uint256_int42 = sc_0.loadBit();
    const _uint256_int256 = sc_0.loadBit();
    const _uint256_uint8 = sc_0.loadBit();
    const _uint256_uint42 = sc_0.loadBit();
    const _uint256_uint256 = sc_0.loadBit();
    const _uint256_coins = sc_0.loadBit();
    const _address_int = sc_0.loadBit();
    const _address_int8 = sc_0.loadBit();
    const _address_int42 = sc_0.loadBit();
    const _address_int256 = sc_0.loadBit();
    const _address_uint8 = sc_0.loadBit();
    const _address_uint42 = sc_0.loadBit();
    const _address_uint256 = sc_0.loadBit();
    const _address_coins = sc_0.loadBit();
    return { $$type: 'ExistsAllMapsResult', int_int: _int_int, int_int8: _int_int8, int_int42: _int_int42, int_int256: _int_int256, int_uint8: _int_uint8, int_uint42: _int_uint42, int_uint256: _int_uint256, int_coins: _int_coins, int8_int: _int8_int, int8_int8: _int8_int8, int8_int42: _int8_int42, int8_int256: _int8_int256, int8_uint8: _int8_uint8, int8_uint42: _int8_uint42, int8_uint256: _int8_uint256, int8_coins: _int8_coins, int42_int: _int42_int, int42_int8: _int42_int8, int42_int42: _int42_int42, int42_int256: _int42_int256, int42_uint8: _int42_uint8, int42_uint42: _int42_uint42, int42_uint256: _int42_uint256, int42_coins: _int42_coins, int256_int: _int256_int, int256_int8: _int256_int8, int256_int42: _int256_int42, int256_int256: _int256_int256, int256_uint8: _int256_uint8, int256_uint42: _int256_uint42, int256_uint256: _int256_uint256, int256_coins: _int256_coins, uint8_int: _uint8_int, uint8_int8: _uint8_int8, uint8_int42: _uint8_int42, uint8_int256: _uint8_int256, uint8_uint8: _uint8_uint8, uint8_uint42: _uint8_uint42, uint8_uint256: _uint8_uint256, uint8_coins: _uint8_coins, uint42_int: _uint42_int, uint42_int8: _uint42_int8, uint42_int42: _uint42_int42, uint42_int256: _uint42_int256, uint42_uint8: _uint42_uint8, uint42_uint42: _uint42_uint42, uint42_uint256: _uint42_uint256, uint42_coins: _uint42_coins, uint256_int: _uint256_int, uint256_int8: _uint256_int8, uint256_int42: _uint256_int42, uint256_int256: _uint256_int256, uint256_uint8: _uint256_uint8, uint256_uint42: _uint256_uint42, uint256_uint256: _uint256_uint256, uint256_coins: _uint256_coins, address_int: _address_int, address_int8: _address_int8, address_int42: _address_int42, address_int256: _address_int256, address_uint8: _address_uint8, address_uint42: _address_uint42, address_uint256: _address_uint256, address_coins: _address_coins };
}
function loadTupleExistsAllMapsResult(source) {
    const _int_int = source.readBoolean();
    const _int_int8 = source.readBoolean();
    const _int_int42 = source.readBoolean();
    const _int_int256 = source.readBoolean();
    const _int_uint8 = source.readBoolean();
    const _int_uint42 = source.readBoolean();
    const _int_uint256 = source.readBoolean();
    const _int_coins = source.readBoolean();
    const _int8_int = source.readBoolean();
    const _int8_int8 = source.readBoolean();
    const _int8_int42 = source.readBoolean();
    const _int8_int256 = source.readBoolean();
    const _int8_uint8 = source.readBoolean();
    const _int8_uint42 = source.readBoolean();
    source = source.readTuple();
    const _int8_uint256 = source.readBoolean();
    const _int8_coins = source.readBoolean();
    const _int42_int = source.readBoolean();
    const _int42_int8 = source.readBoolean();
    const _int42_int42 = source.readBoolean();
    const _int42_int256 = source.readBoolean();
    const _int42_uint8 = source.readBoolean();
    const _int42_uint42 = source.readBoolean();
    const _int42_uint256 = source.readBoolean();
    const _int42_coins = source.readBoolean();
    const _int256_int = source.readBoolean();
    const _int256_int8 = source.readBoolean();
    const _int256_int42 = source.readBoolean();
    const _int256_int256 = source.readBoolean();
    source = source.readTuple();
    const _int256_uint8 = source.readBoolean();
    const _int256_uint42 = source.readBoolean();
    const _int256_uint256 = source.readBoolean();
    const _int256_coins = source.readBoolean();
    const _uint8_int = source.readBoolean();
    const _uint8_int8 = source.readBoolean();
    const _uint8_int42 = source.readBoolean();
    const _uint8_int256 = source.readBoolean();
    const _uint8_uint8 = source.readBoolean();
    const _uint8_uint42 = source.readBoolean();
    const _uint8_uint256 = source.readBoolean();
    const _uint8_coins = source.readBoolean();
    const _uint42_int = source.readBoolean();
    const _uint42_int8 = source.readBoolean();
    source = source.readTuple();
    const _uint42_int42 = source.readBoolean();
    const _uint42_int256 = source.readBoolean();
    const _uint42_uint8 = source.readBoolean();
    const _uint42_uint42 = source.readBoolean();
    const _uint42_uint256 = source.readBoolean();
    const _uint42_coins = source.readBoolean();
    const _uint256_int = source.readBoolean();
    const _uint256_int8 = source.readBoolean();
    const _uint256_int42 = source.readBoolean();
    const _uint256_int256 = source.readBoolean();
    const _uint256_uint8 = source.readBoolean();
    const _uint256_uint42 = source.readBoolean();
    const _uint256_uint256 = source.readBoolean();
    const _uint256_coins = source.readBoolean();
    source = source.readTuple();
    const _address_int = source.readBoolean();
    const _address_int8 = source.readBoolean();
    const _address_int42 = source.readBoolean();
    const _address_int256 = source.readBoolean();
    const _address_uint8 = source.readBoolean();
    const _address_uint42 = source.readBoolean();
    const _address_uint256 = source.readBoolean();
    const _address_coins = source.readBoolean();
    return { $$type: 'ExistsAllMapsResult', int_int: _int_int, int_int8: _int_int8, int_int42: _int_int42, int_int256: _int_int256, int_uint8: _int_uint8, int_uint42: _int_uint42, int_uint256: _int_uint256, int_coins: _int_coins, int8_int: _int8_int, int8_int8: _int8_int8, int8_int42: _int8_int42, int8_int256: _int8_int256, int8_uint8: _int8_uint8, int8_uint42: _int8_uint42, int8_uint256: _int8_uint256, int8_coins: _int8_coins, int42_int: _int42_int, int42_int8: _int42_int8, int42_int42: _int42_int42, int42_int256: _int42_int256, int42_uint8: _int42_uint8, int42_uint42: _int42_uint42, int42_uint256: _int42_uint256, int42_coins: _int42_coins, int256_int: _int256_int, int256_int8: _int256_int8, int256_int42: _int256_int42, int256_int256: _int256_int256, int256_uint8: _int256_uint8, int256_uint42: _int256_uint42, int256_uint256: _int256_uint256, int256_coins: _int256_coins, uint8_int: _uint8_int, uint8_int8: _uint8_int8, uint8_int42: _uint8_int42, uint8_int256: _uint8_int256, uint8_uint8: _uint8_uint8, uint8_uint42: _uint8_uint42, uint8_uint256: _uint8_uint256, uint8_coins: _uint8_coins, uint42_int: _uint42_int, uint42_int8: _uint42_int8, uint42_int42: _uint42_int42, uint42_int256: _uint42_int256, uint42_uint8: _uint42_uint8, uint42_uint42: _uint42_uint42, uint42_uint256: _uint42_uint256, uint42_coins: _uint42_coins, uint256_int: _uint256_int, uint256_int8: _uint256_int8, uint256_int42: _uint256_int42, uint256_int256: _uint256_int256, uint256_uint8: _uint256_uint8, uint256_uint42: _uint256_uint42, uint256_uint256: _uint256_uint256, uint256_coins: _uint256_coins, address_int: _address_int, address_int8: _address_int8, address_int42: _address_int42, address_int256: _address_int256, address_uint8: _address_uint8, address_uint42: _address_uint42, address_uint256: _address_uint256, address_coins: _address_coins };
}
function loadGetterTupleExistsAllMapsResult(source) {
    const _int_int = source.readBoolean();
    const _int_int8 = source.readBoolean();
    const _int_int42 = source.readBoolean();
    const _int_int256 = source.readBoolean();
    const _int_uint8 = source.readBoolean();
    const _int_uint42 = source.readBoolean();
    const _int_uint256 = source.readBoolean();
    const _int_coins = source.readBoolean();
    const _int8_int = source.readBoolean();
    const _int8_int8 = source.readBoolean();
    const _int8_int42 = source.readBoolean();
    const _int8_int256 = source.readBoolean();
    const _int8_uint8 = source.readBoolean();
    const _int8_uint42 = source.readBoolean();
    const _int8_uint256 = source.readBoolean();
    const _int8_coins = source.readBoolean();
    const _int42_int = source.readBoolean();
    const _int42_int8 = source.readBoolean();
    const _int42_int42 = source.readBoolean();
    const _int42_int256 = source.readBoolean();
    const _int42_uint8 = source.readBoolean();
    const _int42_uint42 = source.readBoolean();
    const _int42_uint256 = source.readBoolean();
    const _int42_coins = source.readBoolean();
    const _int256_int = source.readBoolean();
    const _int256_int8 = source.readBoolean();
    const _int256_int42 = source.readBoolean();
    const _int256_int256 = source.readBoolean();
    const _int256_uint8 = source.readBoolean();
    const _int256_uint42 = source.readBoolean();
    const _int256_uint256 = source.readBoolean();
    const _int256_coins = source.readBoolean();
    const _uint8_int = source.readBoolean();
    const _uint8_int8 = source.readBoolean();
    const _uint8_int42 = source.readBoolean();
    const _uint8_int256 = source.readBoolean();
    const _uint8_uint8 = source.readBoolean();
    const _uint8_uint42 = source.readBoolean();
    const _uint8_uint256 = source.readBoolean();
    const _uint8_coins = source.readBoolean();
    const _uint42_int = source.readBoolean();
    const _uint42_int8 = source.readBoolean();
    const _uint42_int42 = source.readBoolean();
    const _uint42_int256 = source.readBoolean();
    const _uint42_uint8 = source.readBoolean();
    const _uint42_uint42 = source.readBoolean();
    const _uint42_uint256 = source.readBoolean();
    const _uint42_coins = source.readBoolean();
    const _uint256_int = source.readBoolean();
    const _uint256_int8 = source.readBoolean();
    const _uint256_int42 = source.readBoolean();
    const _uint256_int256 = source.readBoolean();
    const _uint256_uint8 = source.readBoolean();
    const _uint256_uint42 = source.readBoolean();
    const _uint256_uint256 = source.readBoolean();
    const _uint256_coins = source.readBoolean();
    const _address_int = source.readBoolean();
    const _address_int8 = source.readBoolean();
    const _address_int42 = source.readBoolean();
    const _address_int256 = source.readBoolean();
    const _address_uint8 = source.readBoolean();
    const _address_uint42 = source.readBoolean();
    const _address_uint256 = source.readBoolean();
    const _address_coins = source.readBoolean();
    return { $$type: 'ExistsAllMapsResult', int_int: _int_int, int_int8: _int_int8, int_int42: _int_int42, int_int256: _int_int256, int_uint8: _int_uint8, int_uint42: _int_uint42, int_uint256: _int_uint256, int_coins: _int_coins, int8_int: _int8_int, int8_int8: _int8_int8, int8_int42: _int8_int42, int8_int256: _int8_int256, int8_uint8: _int8_uint8, int8_uint42: _int8_uint42, int8_uint256: _int8_uint256, int8_coins: _int8_coins, int42_int: _int42_int, int42_int8: _int42_int8, int42_int42: _int42_int42, int42_int256: _int42_int256, int42_uint8: _int42_uint8, int42_uint42: _int42_uint42, int42_uint256: _int42_uint256, int42_coins: _int42_coins, int256_int: _int256_int, int256_int8: _int256_int8, int256_int42: _int256_int42, int256_int256: _int256_int256, int256_uint8: _int256_uint8, int256_uint42: _int256_uint42, int256_uint256: _int256_uint256, int256_coins: _int256_coins, uint8_int: _uint8_int, uint8_int8: _uint8_int8, uint8_int42: _uint8_int42, uint8_int256: _uint8_int256, uint8_uint8: _uint8_uint8, uint8_uint42: _uint8_uint42, uint8_uint256: _uint8_uint256, uint8_coins: _uint8_coins, uint42_int: _uint42_int, uint42_int8: _uint42_int8, uint42_int42: _uint42_int42, uint42_int256: _uint42_int256, uint42_uint8: _uint42_uint8, uint42_uint42: _uint42_uint42, uint42_uint256: _uint42_uint256, uint42_coins: _uint42_coins, uint256_int: _uint256_int, uint256_int8: _uint256_int8, uint256_int42: _uint256_int42, uint256_int256: _uint256_int256, uint256_uint8: _uint256_uint8, uint256_uint42: _uint256_uint42, uint256_uint256: _uint256_uint256, uint256_coins: _uint256_coins, address_int: _address_int, address_int8: _address_int8, address_int42: _address_int42, address_int256: _address_int256, address_uint8: _address_uint8, address_uint42: _address_uint42, address_uint256: _address_uint256, address_coins: _address_coins };
}
function storeTupleExistsAllMapsResult(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeBoolean(source.int_int);
    builder.writeBoolean(source.int_int8);
    builder.writeBoolean(source.int_int42);
    builder.writeBoolean(source.int_int256);
    builder.writeBoolean(source.int_uint8);
    builder.writeBoolean(source.int_uint42);
    builder.writeBoolean(source.int_uint256);
    builder.writeBoolean(source.int_coins);
    builder.writeBoolean(source.int8_int);
    builder.writeBoolean(source.int8_int8);
    builder.writeBoolean(source.int8_int42);
    builder.writeBoolean(source.int8_int256);
    builder.writeBoolean(source.int8_uint8);
    builder.writeBoolean(source.int8_uint42);
    builder.writeBoolean(source.int8_uint256);
    builder.writeBoolean(source.int8_coins);
    builder.writeBoolean(source.int42_int);
    builder.writeBoolean(source.int42_int8);
    builder.writeBoolean(source.int42_int42);
    builder.writeBoolean(source.int42_int256);
    builder.writeBoolean(source.int42_uint8);
    builder.writeBoolean(source.int42_uint42);
    builder.writeBoolean(source.int42_uint256);
    builder.writeBoolean(source.int42_coins);
    builder.writeBoolean(source.int256_int);
    builder.writeBoolean(source.int256_int8);
    builder.writeBoolean(source.int256_int42);
    builder.writeBoolean(source.int256_int256);
    builder.writeBoolean(source.int256_uint8);
    builder.writeBoolean(source.int256_uint42);
    builder.writeBoolean(source.int256_uint256);
    builder.writeBoolean(source.int256_coins);
    builder.writeBoolean(source.uint8_int);
    builder.writeBoolean(source.uint8_int8);
    builder.writeBoolean(source.uint8_int42);
    builder.writeBoolean(source.uint8_int256);
    builder.writeBoolean(source.uint8_uint8);
    builder.writeBoolean(source.uint8_uint42);
    builder.writeBoolean(source.uint8_uint256);
    builder.writeBoolean(source.uint8_coins);
    builder.writeBoolean(source.uint42_int);
    builder.writeBoolean(source.uint42_int8);
    builder.writeBoolean(source.uint42_int42);
    builder.writeBoolean(source.uint42_int256);
    builder.writeBoolean(source.uint42_uint8);
    builder.writeBoolean(source.uint42_uint42);
    builder.writeBoolean(source.uint42_uint256);
    builder.writeBoolean(source.uint42_coins);
    builder.writeBoolean(source.uint256_int);
    builder.writeBoolean(source.uint256_int8);
    builder.writeBoolean(source.uint256_int42);
    builder.writeBoolean(source.uint256_int256);
    builder.writeBoolean(source.uint256_uint8);
    builder.writeBoolean(source.uint256_uint42);
    builder.writeBoolean(source.uint256_uint256);
    builder.writeBoolean(source.uint256_coins);
    builder.writeBoolean(source.address_int);
    builder.writeBoolean(source.address_int8);
    builder.writeBoolean(source.address_int42);
    builder.writeBoolean(source.address_int256);
    builder.writeBoolean(source.address_uint8);
    builder.writeBoolean(source.address_uint42);
    builder.writeBoolean(source.address_uint256);
    builder.writeBoolean(source.address_coins);
    return builder.build();
}
function dictValueParserExistsAllMapsResult() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeExistsAllMapsResult(src)).endCell());
        },
        parse: (src) => {
            return loadExistsAllMapsResult(src.loadRef().beginParse());
        }
    };
}
function storeIsEmptyAllMapsResult(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeBit(src.int_int);
        b_0.storeBit(src.int_int8);
        b_0.storeBit(src.int_int42);
        b_0.storeBit(src.int_int256);
        b_0.storeBit(src.int_uint8);
        b_0.storeBit(src.int_uint42);
        b_0.storeBit(src.int_uint256);
        b_0.storeBit(src.int_coins);
        b_0.storeBit(src.int8_int);
        b_0.storeBit(src.int8_int8);
        b_0.storeBit(src.int8_int42);
        b_0.storeBit(src.int8_int256);
        b_0.storeBit(src.int8_uint8);
        b_0.storeBit(src.int8_uint42);
        b_0.storeBit(src.int8_uint256);
        b_0.storeBit(src.int8_coins);
        b_0.storeBit(src.int42_int);
        b_0.storeBit(src.int42_int8);
        b_0.storeBit(src.int42_int42);
        b_0.storeBit(src.int42_int256);
        b_0.storeBit(src.int42_uint8);
        b_0.storeBit(src.int42_uint42);
        b_0.storeBit(src.int42_uint256);
        b_0.storeBit(src.int42_coins);
        b_0.storeBit(src.int256_int);
        b_0.storeBit(src.int256_int8);
        b_0.storeBit(src.int256_int42);
        b_0.storeBit(src.int256_int256);
        b_0.storeBit(src.int256_uint8);
        b_0.storeBit(src.int256_uint42);
        b_0.storeBit(src.int256_uint256);
        b_0.storeBit(src.int256_coins);
        b_0.storeBit(src.uint8_int);
        b_0.storeBit(src.uint8_int8);
        b_0.storeBit(src.uint8_int42);
        b_0.storeBit(src.uint8_int256);
        b_0.storeBit(src.uint8_uint8);
        b_0.storeBit(src.uint8_uint42);
        b_0.storeBit(src.uint8_uint256);
        b_0.storeBit(src.uint8_coins);
        b_0.storeBit(src.uint42_int);
        b_0.storeBit(src.uint42_int8);
        b_0.storeBit(src.uint42_int42);
        b_0.storeBit(src.uint42_int256);
        b_0.storeBit(src.uint42_uint8);
        b_0.storeBit(src.uint42_uint42);
        b_0.storeBit(src.uint42_uint256);
        b_0.storeBit(src.uint42_coins);
        b_0.storeBit(src.uint256_int);
        b_0.storeBit(src.uint256_int8);
        b_0.storeBit(src.uint256_int42);
        b_0.storeBit(src.uint256_int256);
        b_0.storeBit(src.uint256_uint8);
        b_0.storeBit(src.uint256_uint42);
        b_0.storeBit(src.uint256_uint256);
        b_0.storeBit(src.uint256_coins);
        b_0.storeBit(src.address_int);
        b_0.storeBit(src.address_int8);
        b_0.storeBit(src.address_int42);
        b_0.storeBit(src.address_int256);
        b_0.storeBit(src.address_uint8);
        b_0.storeBit(src.address_uint42);
        b_0.storeBit(src.address_uint256);
        b_0.storeBit(src.address_coins);
    };
}
function loadIsEmptyAllMapsResult(slice) {
    const sc_0 = slice;
    const _int_int = sc_0.loadBit();
    const _int_int8 = sc_0.loadBit();
    const _int_int42 = sc_0.loadBit();
    const _int_int256 = sc_0.loadBit();
    const _int_uint8 = sc_0.loadBit();
    const _int_uint42 = sc_0.loadBit();
    const _int_uint256 = sc_0.loadBit();
    const _int_coins = sc_0.loadBit();
    const _int8_int = sc_0.loadBit();
    const _int8_int8 = sc_0.loadBit();
    const _int8_int42 = sc_0.loadBit();
    const _int8_int256 = sc_0.loadBit();
    const _int8_uint8 = sc_0.loadBit();
    const _int8_uint42 = sc_0.loadBit();
    const _int8_uint256 = sc_0.loadBit();
    const _int8_coins = sc_0.loadBit();
    const _int42_int = sc_0.loadBit();
    const _int42_int8 = sc_0.loadBit();
    const _int42_int42 = sc_0.loadBit();
    const _int42_int256 = sc_0.loadBit();
    const _int42_uint8 = sc_0.loadBit();
    const _int42_uint42 = sc_0.loadBit();
    const _int42_uint256 = sc_0.loadBit();
    const _int42_coins = sc_0.loadBit();
    const _int256_int = sc_0.loadBit();
    const _int256_int8 = sc_0.loadBit();
    const _int256_int42 = sc_0.loadBit();
    const _int256_int256 = sc_0.loadBit();
    const _int256_uint8 = sc_0.loadBit();
    const _int256_uint42 = sc_0.loadBit();
    const _int256_uint256 = sc_0.loadBit();
    const _int256_coins = sc_0.loadBit();
    const _uint8_int = sc_0.loadBit();
    const _uint8_int8 = sc_0.loadBit();
    const _uint8_int42 = sc_0.loadBit();
    const _uint8_int256 = sc_0.loadBit();
    const _uint8_uint8 = sc_0.loadBit();
    const _uint8_uint42 = sc_0.loadBit();
    const _uint8_uint256 = sc_0.loadBit();
    const _uint8_coins = sc_0.loadBit();
    const _uint42_int = sc_0.loadBit();
    const _uint42_int8 = sc_0.loadBit();
    const _uint42_int42 = sc_0.loadBit();
    const _uint42_int256 = sc_0.loadBit();
    const _uint42_uint8 = sc_0.loadBit();
    const _uint42_uint42 = sc_0.loadBit();
    const _uint42_uint256 = sc_0.loadBit();
    const _uint42_coins = sc_0.loadBit();
    const _uint256_int = sc_0.loadBit();
    const _uint256_int8 = sc_0.loadBit();
    const _uint256_int42 = sc_0.loadBit();
    const _uint256_int256 = sc_0.loadBit();
    const _uint256_uint8 = sc_0.loadBit();
    const _uint256_uint42 = sc_0.loadBit();
    const _uint256_uint256 = sc_0.loadBit();
    const _uint256_coins = sc_0.loadBit();
    const _address_int = sc_0.loadBit();
    const _address_int8 = sc_0.loadBit();
    const _address_int42 = sc_0.loadBit();
    const _address_int256 = sc_0.loadBit();
    const _address_uint8 = sc_0.loadBit();
    const _address_uint42 = sc_0.loadBit();
    const _address_uint256 = sc_0.loadBit();
    const _address_coins = sc_0.loadBit();
    return { $$type: 'IsEmptyAllMapsResult', int_int: _int_int, int_int8: _int_int8, int_int42: _int_int42, int_int256: _int_int256, int_uint8: _int_uint8, int_uint42: _int_uint42, int_uint256: _int_uint256, int_coins: _int_coins, int8_int: _int8_int, int8_int8: _int8_int8, int8_int42: _int8_int42, int8_int256: _int8_int256, int8_uint8: _int8_uint8, int8_uint42: _int8_uint42, int8_uint256: _int8_uint256, int8_coins: _int8_coins, int42_int: _int42_int, int42_int8: _int42_int8, int42_int42: _int42_int42, int42_int256: _int42_int256, int42_uint8: _int42_uint8, int42_uint42: _int42_uint42, int42_uint256: _int42_uint256, int42_coins: _int42_coins, int256_int: _int256_int, int256_int8: _int256_int8, int256_int42: _int256_int42, int256_int256: _int256_int256, int256_uint8: _int256_uint8, int256_uint42: _int256_uint42, int256_uint256: _int256_uint256, int256_coins: _int256_coins, uint8_int: _uint8_int, uint8_int8: _uint8_int8, uint8_int42: _uint8_int42, uint8_int256: _uint8_int256, uint8_uint8: _uint8_uint8, uint8_uint42: _uint8_uint42, uint8_uint256: _uint8_uint256, uint8_coins: _uint8_coins, uint42_int: _uint42_int, uint42_int8: _uint42_int8, uint42_int42: _uint42_int42, uint42_int256: _uint42_int256, uint42_uint8: _uint42_uint8, uint42_uint42: _uint42_uint42, uint42_uint256: _uint42_uint256, uint42_coins: _uint42_coins, uint256_int: _uint256_int, uint256_int8: _uint256_int8, uint256_int42: _uint256_int42, uint256_int256: _uint256_int256, uint256_uint8: _uint256_uint8, uint256_uint42: _uint256_uint42, uint256_uint256: _uint256_uint256, uint256_coins: _uint256_coins, address_int: _address_int, address_int8: _address_int8, address_int42: _address_int42, address_int256: _address_int256, address_uint8: _address_uint8, address_uint42: _address_uint42, address_uint256: _address_uint256, address_coins: _address_coins };
}
function loadTupleIsEmptyAllMapsResult(source) {
    const _int_int = source.readBoolean();
    const _int_int8 = source.readBoolean();
    const _int_int42 = source.readBoolean();
    const _int_int256 = source.readBoolean();
    const _int_uint8 = source.readBoolean();
    const _int_uint42 = source.readBoolean();
    const _int_uint256 = source.readBoolean();
    const _int_coins = source.readBoolean();
    const _int8_int = source.readBoolean();
    const _int8_int8 = source.readBoolean();
    const _int8_int42 = source.readBoolean();
    const _int8_int256 = source.readBoolean();
    const _int8_uint8 = source.readBoolean();
    const _int8_uint42 = source.readBoolean();
    source = source.readTuple();
    const _int8_uint256 = source.readBoolean();
    const _int8_coins = source.readBoolean();
    const _int42_int = source.readBoolean();
    const _int42_int8 = source.readBoolean();
    const _int42_int42 = source.readBoolean();
    const _int42_int256 = source.readBoolean();
    const _int42_uint8 = source.readBoolean();
    const _int42_uint42 = source.readBoolean();
    const _int42_uint256 = source.readBoolean();
    const _int42_coins = source.readBoolean();
    const _int256_int = source.readBoolean();
    const _int256_int8 = source.readBoolean();
    const _int256_int42 = source.readBoolean();
    const _int256_int256 = source.readBoolean();
    source = source.readTuple();
    const _int256_uint8 = source.readBoolean();
    const _int256_uint42 = source.readBoolean();
    const _int256_uint256 = source.readBoolean();
    const _int256_coins = source.readBoolean();
    const _uint8_int = source.readBoolean();
    const _uint8_int8 = source.readBoolean();
    const _uint8_int42 = source.readBoolean();
    const _uint8_int256 = source.readBoolean();
    const _uint8_uint8 = source.readBoolean();
    const _uint8_uint42 = source.readBoolean();
    const _uint8_uint256 = source.readBoolean();
    const _uint8_coins = source.readBoolean();
    const _uint42_int = source.readBoolean();
    const _uint42_int8 = source.readBoolean();
    source = source.readTuple();
    const _uint42_int42 = source.readBoolean();
    const _uint42_int256 = source.readBoolean();
    const _uint42_uint8 = source.readBoolean();
    const _uint42_uint42 = source.readBoolean();
    const _uint42_uint256 = source.readBoolean();
    const _uint42_coins = source.readBoolean();
    const _uint256_int = source.readBoolean();
    const _uint256_int8 = source.readBoolean();
    const _uint256_int42 = source.readBoolean();
    const _uint256_int256 = source.readBoolean();
    const _uint256_uint8 = source.readBoolean();
    const _uint256_uint42 = source.readBoolean();
    const _uint256_uint256 = source.readBoolean();
    const _uint256_coins = source.readBoolean();
    source = source.readTuple();
    const _address_int = source.readBoolean();
    const _address_int8 = source.readBoolean();
    const _address_int42 = source.readBoolean();
    const _address_int256 = source.readBoolean();
    const _address_uint8 = source.readBoolean();
    const _address_uint42 = source.readBoolean();
    const _address_uint256 = source.readBoolean();
    const _address_coins = source.readBoolean();
    return { $$type: 'IsEmptyAllMapsResult', int_int: _int_int, int_int8: _int_int8, int_int42: _int_int42, int_int256: _int_int256, int_uint8: _int_uint8, int_uint42: _int_uint42, int_uint256: _int_uint256, int_coins: _int_coins, int8_int: _int8_int, int8_int8: _int8_int8, int8_int42: _int8_int42, int8_int256: _int8_int256, int8_uint8: _int8_uint8, int8_uint42: _int8_uint42, int8_uint256: _int8_uint256, int8_coins: _int8_coins, int42_int: _int42_int, int42_int8: _int42_int8, int42_int42: _int42_int42, int42_int256: _int42_int256, int42_uint8: _int42_uint8, int42_uint42: _int42_uint42, int42_uint256: _int42_uint256, int42_coins: _int42_coins, int256_int: _int256_int, int256_int8: _int256_int8, int256_int42: _int256_int42, int256_int256: _int256_int256, int256_uint8: _int256_uint8, int256_uint42: _int256_uint42, int256_uint256: _int256_uint256, int256_coins: _int256_coins, uint8_int: _uint8_int, uint8_int8: _uint8_int8, uint8_int42: _uint8_int42, uint8_int256: _uint8_int256, uint8_uint8: _uint8_uint8, uint8_uint42: _uint8_uint42, uint8_uint256: _uint8_uint256, uint8_coins: _uint8_coins, uint42_int: _uint42_int, uint42_int8: _uint42_int8, uint42_int42: _uint42_int42, uint42_int256: _uint42_int256, uint42_uint8: _uint42_uint8, uint42_uint42: _uint42_uint42, uint42_uint256: _uint42_uint256, uint42_coins: _uint42_coins, uint256_int: _uint256_int, uint256_int8: _uint256_int8, uint256_int42: _uint256_int42, uint256_int256: _uint256_int256, uint256_uint8: _uint256_uint8, uint256_uint42: _uint256_uint42, uint256_uint256: _uint256_uint256, uint256_coins: _uint256_coins, address_int: _address_int, address_int8: _address_int8, address_int42: _address_int42, address_int256: _address_int256, address_uint8: _address_uint8, address_uint42: _address_uint42, address_uint256: _address_uint256, address_coins: _address_coins };
}
function loadGetterTupleIsEmptyAllMapsResult(source) {
    const _int_int = source.readBoolean();
    const _int_int8 = source.readBoolean();
    const _int_int42 = source.readBoolean();
    const _int_int256 = source.readBoolean();
    const _int_uint8 = source.readBoolean();
    const _int_uint42 = source.readBoolean();
    const _int_uint256 = source.readBoolean();
    const _int_coins = source.readBoolean();
    const _int8_int = source.readBoolean();
    const _int8_int8 = source.readBoolean();
    const _int8_int42 = source.readBoolean();
    const _int8_int256 = source.readBoolean();
    const _int8_uint8 = source.readBoolean();
    const _int8_uint42 = source.readBoolean();
    const _int8_uint256 = source.readBoolean();
    const _int8_coins = source.readBoolean();
    const _int42_int = source.readBoolean();
    const _int42_int8 = source.readBoolean();
    const _int42_int42 = source.readBoolean();
    const _int42_int256 = source.readBoolean();
    const _int42_uint8 = source.readBoolean();
    const _int42_uint42 = source.readBoolean();
    const _int42_uint256 = source.readBoolean();
    const _int42_coins = source.readBoolean();
    const _int256_int = source.readBoolean();
    const _int256_int8 = source.readBoolean();
    const _int256_int42 = source.readBoolean();
    const _int256_int256 = source.readBoolean();
    const _int256_uint8 = source.readBoolean();
    const _int256_uint42 = source.readBoolean();
    const _int256_uint256 = source.readBoolean();
    const _int256_coins = source.readBoolean();
    const _uint8_int = source.readBoolean();
    const _uint8_int8 = source.readBoolean();
    const _uint8_int42 = source.readBoolean();
    const _uint8_int256 = source.readBoolean();
    const _uint8_uint8 = source.readBoolean();
    const _uint8_uint42 = source.readBoolean();
    const _uint8_uint256 = source.readBoolean();
    const _uint8_coins = source.readBoolean();
    const _uint42_int = source.readBoolean();
    const _uint42_int8 = source.readBoolean();
    const _uint42_int42 = source.readBoolean();
    const _uint42_int256 = source.readBoolean();
    const _uint42_uint8 = source.readBoolean();
    const _uint42_uint42 = source.readBoolean();
    const _uint42_uint256 = source.readBoolean();
    const _uint42_coins = source.readBoolean();
    const _uint256_int = source.readBoolean();
    const _uint256_int8 = source.readBoolean();
    const _uint256_int42 = source.readBoolean();
    const _uint256_int256 = source.readBoolean();
    const _uint256_uint8 = source.readBoolean();
    const _uint256_uint42 = source.readBoolean();
    const _uint256_uint256 = source.readBoolean();
    const _uint256_coins = source.readBoolean();
    const _address_int = source.readBoolean();
    const _address_int8 = source.readBoolean();
    const _address_int42 = source.readBoolean();
    const _address_int256 = source.readBoolean();
    const _address_uint8 = source.readBoolean();
    const _address_uint42 = source.readBoolean();
    const _address_uint256 = source.readBoolean();
    const _address_coins = source.readBoolean();
    return { $$type: 'IsEmptyAllMapsResult', int_int: _int_int, int_int8: _int_int8, int_int42: _int_int42, int_int256: _int_int256, int_uint8: _int_uint8, int_uint42: _int_uint42, int_uint256: _int_uint256, int_coins: _int_coins, int8_int: _int8_int, int8_int8: _int8_int8, int8_int42: _int8_int42, int8_int256: _int8_int256, int8_uint8: _int8_uint8, int8_uint42: _int8_uint42, int8_uint256: _int8_uint256, int8_coins: _int8_coins, int42_int: _int42_int, int42_int8: _int42_int8, int42_int42: _int42_int42, int42_int256: _int42_int256, int42_uint8: _int42_uint8, int42_uint42: _int42_uint42, int42_uint256: _int42_uint256, int42_coins: _int42_coins, int256_int: _int256_int, int256_int8: _int256_int8, int256_int42: _int256_int42, int256_int256: _int256_int256, int256_uint8: _int256_uint8, int256_uint42: _int256_uint42, int256_uint256: _int256_uint256, int256_coins: _int256_coins, uint8_int: _uint8_int, uint8_int8: _uint8_int8, uint8_int42: _uint8_int42, uint8_int256: _uint8_int256, uint8_uint8: _uint8_uint8, uint8_uint42: _uint8_uint42, uint8_uint256: _uint8_uint256, uint8_coins: _uint8_coins, uint42_int: _uint42_int, uint42_int8: _uint42_int8, uint42_int42: _uint42_int42, uint42_int256: _uint42_int256, uint42_uint8: _uint42_uint8, uint42_uint42: _uint42_uint42, uint42_uint256: _uint42_uint256, uint42_coins: _uint42_coins, uint256_int: _uint256_int, uint256_int8: _uint256_int8, uint256_int42: _uint256_int42, uint256_int256: _uint256_int256, uint256_uint8: _uint256_uint8, uint256_uint42: _uint256_uint42, uint256_uint256: _uint256_uint256, uint256_coins: _uint256_coins, address_int: _address_int, address_int8: _address_int8, address_int42: _address_int42, address_int256: _address_int256, address_uint8: _address_uint8, address_uint42: _address_uint42, address_uint256: _address_uint256, address_coins: _address_coins };
}
function storeTupleIsEmptyAllMapsResult(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeBoolean(source.int_int);
    builder.writeBoolean(source.int_int8);
    builder.writeBoolean(source.int_int42);
    builder.writeBoolean(source.int_int256);
    builder.writeBoolean(source.int_uint8);
    builder.writeBoolean(source.int_uint42);
    builder.writeBoolean(source.int_uint256);
    builder.writeBoolean(source.int_coins);
    builder.writeBoolean(source.int8_int);
    builder.writeBoolean(source.int8_int8);
    builder.writeBoolean(source.int8_int42);
    builder.writeBoolean(source.int8_int256);
    builder.writeBoolean(source.int8_uint8);
    builder.writeBoolean(source.int8_uint42);
    builder.writeBoolean(source.int8_uint256);
    builder.writeBoolean(source.int8_coins);
    builder.writeBoolean(source.int42_int);
    builder.writeBoolean(source.int42_int8);
    builder.writeBoolean(source.int42_int42);
    builder.writeBoolean(source.int42_int256);
    builder.writeBoolean(source.int42_uint8);
    builder.writeBoolean(source.int42_uint42);
    builder.writeBoolean(source.int42_uint256);
    builder.writeBoolean(source.int42_coins);
    builder.writeBoolean(source.int256_int);
    builder.writeBoolean(source.int256_int8);
    builder.writeBoolean(source.int256_int42);
    builder.writeBoolean(source.int256_int256);
    builder.writeBoolean(source.int256_uint8);
    builder.writeBoolean(source.int256_uint42);
    builder.writeBoolean(source.int256_uint256);
    builder.writeBoolean(source.int256_coins);
    builder.writeBoolean(source.uint8_int);
    builder.writeBoolean(source.uint8_int8);
    builder.writeBoolean(source.uint8_int42);
    builder.writeBoolean(source.uint8_int256);
    builder.writeBoolean(source.uint8_uint8);
    builder.writeBoolean(source.uint8_uint42);
    builder.writeBoolean(source.uint8_uint256);
    builder.writeBoolean(source.uint8_coins);
    builder.writeBoolean(source.uint42_int);
    builder.writeBoolean(source.uint42_int8);
    builder.writeBoolean(source.uint42_int42);
    builder.writeBoolean(source.uint42_int256);
    builder.writeBoolean(source.uint42_uint8);
    builder.writeBoolean(source.uint42_uint42);
    builder.writeBoolean(source.uint42_uint256);
    builder.writeBoolean(source.uint42_coins);
    builder.writeBoolean(source.uint256_int);
    builder.writeBoolean(source.uint256_int8);
    builder.writeBoolean(source.uint256_int42);
    builder.writeBoolean(source.uint256_int256);
    builder.writeBoolean(source.uint256_uint8);
    builder.writeBoolean(source.uint256_uint42);
    builder.writeBoolean(source.uint256_uint256);
    builder.writeBoolean(source.uint256_coins);
    builder.writeBoolean(source.address_int);
    builder.writeBoolean(source.address_int8);
    builder.writeBoolean(source.address_int42);
    builder.writeBoolean(source.address_int256);
    builder.writeBoolean(source.address_uint8);
    builder.writeBoolean(source.address_uint42);
    builder.writeBoolean(source.address_uint256);
    builder.writeBoolean(source.address_coins);
    return builder.build();
}
function dictValueParserIsEmptyAllMapsResult() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeIsEmptyAllMapsResult(src)).endCell());
        },
        parse: (src) => {
            return loadIsEmptyAllMapsResult(src.loadRef().beginParse());
        }
    };
}
function storeAsCellAllMapsResult(src) {
    return (builder) => {
        const b_0 = builder;
        if (src.int_int !== null && src.int_int !== undefined) {
            b_0.storeBit(true).storeRef(src.int_int);
        }
        else {
            b_0.storeBit(false);
        }
        if (src.int_int8 !== null && src.int_int8 !== undefined) {
            b_0.storeBit(true).storeRef(src.int_int8);
        }
        else {
            b_0.storeBit(false);
        }
        const b_1 = new core_1.Builder();
        if (src.int_int42 !== null && src.int_int42 !== undefined) {
            b_1.storeBit(true).storeRef(src.int_int42);
        }
        else {
            b_1.storeBit(false);
        }
        if (src.int_int256 !== null && src.int_int256 !== undefined) {
            b_1.storeBit(true).storeRef(src.int_int256);
        }
        else {
            b_1.storeBit(false);
        }
        if (src.int_uint8 !== null && src.int_uint8 !== undefined) {
            b_1.storeBit(true).storeRef(src.int_uint8);
        }
        else {
            b_1.storeBit(false);
        }
        const b_2 = new core_1.Builder();
        if (src.int_uint42 !== null && src.int_uint42 !== undefined) {
            b_2.storeBit(true).storeRef(src.int_uint42);
        }
        else {
            b_2.storeBit(false);
        }
        if (src.int_uint256 !== null && src.int_uint256 !== undefined) {
            b_2.storeBit(true).storeRef(src.int_uint256);
        }
        else {
            b_2.storeBit(false);
        }
        if (src.int_coins !== null && src.int_coins !== undefined) {
            b_2.storeBit(true).storeRef(src.int_coins);
        }
        else {
            b_2.storeBit(false);
        }
        const b_3 = new core_1.Builder();
        if (src.int8_int !== null && src.int8_int !== undefined) {
            b_3.storeBit(true).storeRef(src.int8_int);
        }
        else {
            b_3.storeBit(false);
        }
        if (src.int8_int8 !== null && src.int8_int8 !== undefined) {
            b_3.storeBit(true).storeRef(src.int8_int8);
        }
        else {
            b_3.storeBit(false);
        }
        if (src.int8_int42 !== null && src.int8_int42 !== undefined) {
            b_3.storeBit(true).storeRef(src.int8_int42);
        }
        else {
            b_3.storeBit(false);
        }
        const b_4 = new core_1.Builder();
        if (src.int8_int256 !== null && src.int8_int256 !== undefined) {
            b_4.storeBit(true).storeRef(src.int8_int256);
        }
        else {
            b_4.storeBit(false);
        }
        if (src.int8_uint8 !== null && src.int8_uint8 !== undefined) {
            b_4.storeBit(true).storeRef(src.int8_uint8);
        }
        else {
            b_4.storeBit(false);
        }
        if (src.int8_uint42 !== null && src.int8_uint42 !== undefined) {
            b_4.storeBit(true).storeRef(src.int8_uint42);
        }
        else {
            b_4.storeBit(false);
        }
        const b_5 = new core_1.Builder();
        if (src.int8_uint256 !== null && src.int8_uint256 !== undefined) {
            b_5.storeBit(true).storeRef(src.int8_uint256);
        }
        else {
            b_5.storeBit(false);
        }
        if (src.int8_coins !== null && src.int8_coins !== undefined) {
            b_5.storeBit(true).storeRef(src.int8_coins);
        }
        else {
            b_5.storeBit(false);
        }
        if (src.int42_int !== null && src.int42_int !== undefined) {
            b_5.storeBit(true).storeRef(src.int42_int);
        }
        else {
            b_5.storeBit(false);
        }
        const b_6 = new core_1.Builder();
        if (src.int42_int8 !== null && src.int42_int8 !== undefined) {
            b_6.storeBit(true).storeRef(src.int42_int8);
        }
        else {
            b_6.storeBit(false);
        }
        if (src.int42_int42 !== null && src.int42_int42 !== undefined) {
            b_6.storeBit(true).storeRef(src.int42_int42);
        }
        else {
            b_6.storeBit(false);
        }
        if (src.int42_int256 !== null && src.int42_int256 !== undefined) {
            b_6.storeBit(true).storeRef(src.int42_int256);
        }
        else {
            b_6.storeBit(false);
        }
        const b_7 = new core_1.Builder();
        if (src.int42_uint8 !== null && src.int42_uint8 !== undefined) {
            b_7.storeBit(true).storeRef(src.int42_uint8);
        }
        else {
            b_7.storeBit(false);
        }
        if (src.int42_uint42 !== null && src.int42_uint42 !== undefined) {
            b_7.storeBit(true).storeRef(src.int42_uint42);
        }
        else {
            b_7.storeBit(false);
        }
        if (src.int42_uint256 !== null && src.int42_uint256 !== undefined) {
            b_7.storeBit(true).storeRef(src.int42_uint256);
        }
        else {
            b_7.storeBit(false);
        }
        const b_8 = new core_1.Builder();
        if (src.int42_coins !== null && src.int42_coins !== undefined) {
            b_8.storeBit(true).storeRef(src.int42_coins);
        }
        else {
            b_8.storeBit(false);
        }
        if (src.int256_int !== null && src.int256_int !== undefined) {
            b_8.storeBit(true).storeRef(src.int256_int);
        }
        else {
            b_8.storeBit(false);
        }
        if (src.int256_int8 !== null && src.int256_int8 !== undefined) {
            b_8.storeBit(true).storeRef(src.int256_int8);
        }
        else {
            b_8.storeBit(false);
        }
        const b_9 = new core_1.Builder();
        if (src.int256_int42 !== null && src.int256_int42 !== undefined) {
            b_9.storeBit(true).storeRef(src.int256_int42);
        }
        else {
            b_9.storeBit(false);
        }
        if (src.int256_int256 !== null && src.int256_int256 !== undefined) {
            b_9.storeBit(true).storeRef(src.int256_int256);
        }
        else {
            b_9.storeBit(false);
        }
        if (src.int256_uint8 !== null && src.int256_uint8 !== undefined) {
            b_9.storeBit(true).storeRef(src.int256_uint8);
        }
        else {
            b_9.storeBit(false);
        }
        const b_10 = new core_1.Builder();
        if (src.int256_uint42 !== null && src.int256_uint42 !== undefined) {
            b_10.storeBit(true).storeRef(src.int256_uint42);
        }
        else {
            b_10.storeBit(false);
        }
        if (src.int256_uint256 !== null && src.int256_uint256 !== undefined) {
            b_10.storeBit(true).storeRef(src.int256_uint256);
        }
        else {
            b_10.storeBit(false);
        }
        if (src.int256_coins !== null && src.int256_coins !== undefined) {
            b_10.storeBit(true).storeRef(src.int256_coins);
        }
        else {
            b_10.storeBit(false);
        }
        const b_11 = new core_1.Builder();
        if (src.uint8_int !== null && src.uint8_int !== undefined) {
            b_11.storeBit(true).storeRef(src.uint8_int);
        }
        else {
            b_11.storeBit(false);
        }
        if (src.uint8_int8 !== null && src.uint8_int8 !== undefined) {
            b_11.storeBit(true).storeRef(src.uint8_int8);
        }
        else {
            b_11.storeBit(false);
        }
        if (src.uint8_int42 !== null && src.uint8_int42 !== undefined) {
            b_11.storeBit(true).storeRef(src.uint8_int42);
        }
        else {
            b_11.storeBit(false);
        }
        const b_12 = new core_1.Builder();
        if (src.uint8_int256 !== null && src.uint8_int256 !== undefined) {
            b_12.storeBit(true).storeRef(src.uint8_int256);
        }
        else {
            b_12.storeBit(false);
        }
        if (src.uint8_uint8 !== null && src.uint8_uint8 !== undefined) {
            b_12.storeBit(true).storeRef(src.uint8_uint8);
        }
        else {
            b_12.storeBit(false);
        }
        if (src.uint8_uint42 !== null && src.uint8_uint42 !== undefined) {
            b_12.storeBit(true).storeRef(src.uint8_uint42);
        }
        else {
            b_12.storeBit(false);
        }
        const b_13 = new core_1.Builder();
        if (src.uint8_uint256 !== null && src.uint8_uint256 !== undefined) {
            b_13.storeBit(true).storeRef(src.uint8_uint256);
        }
        else {
            b_13.storeBit(false);
        }
        if (src.uint8_coins !== null && src.uint8_coins !== undefined) {
            b_13.storeBit(true).storeRef(src.uint8_coins);
        }
        else {
            b_13.storeBit(false);
        }
        if (src.uint42_int !== null && src.uint42_int !== undefined) {
            b_13.storeBit(true).storeRef(src.uint42_int);
        }
        else {
            b_13.storeBit(false);
        }
        const b_14 = new core_1.Builder();
        if (src.uint42_int8 !== null && src.uint42_int8 !== undefined) {
            b_14.storeBit(true).storeRef(src.uint42_int8);
        }
        else {
            b_14.storeBit(false);
        }
        if (src.uint42_int42 !== null && src.uint42_int42 !== undefined) {
            b_14.storeBit(true).storeRef(src.uint42_int42);
        }
        else {
            b_14.storeBit(false);
        }
        if (src.uint42_int256 !== null && src.uint42_int256 !== undefined) {
            b_14.storeBit(true).storeRef(src.uint42_int256);
        }
        else {
            b_14.storeBit(false);
        }
        const b_15 = new core_1.Builder();
        if (src.uint42_uint8 !== null && src.uint42_uint8 !== undefined) {
            b_15.storeBit(true).storeRef(src.uint42_uint8);
        }
        else {
            b_15.storeBit(false);
        }
        if (src.uint42_uint42 !== null && src.uint42_uint42 !== undefined) {
            b_15.storeBit(true).storeRef(src.uint42_uint42);
        }
        else {
            b_15.storeBit(false);
        }
        if (src.uint42_uint256 !== null && src.uint42_uint256 !== undefined) {
            b_15.storeBit(true).storeRef(src.uint42_uint256);
        }
        else {
            b_15.storeBit(false);
        }
        const b_16 = new core_1.Builder();
        if (src.uint42_coins !== null && src.uint42_coins !== undefined) {
            b_16.storeBit(true).storeRef(src.uint42_coins);
        }
        else {
            b_16.storeBit(false);
        }
        if (src.uint256_int !== null && src.uint256_int !== undefined) {
            b_16.storeBit(true).storeRef(src.uint256_int);
        }
        else {
            b_16.storeBit(false);
        }
        if (src.uint256_int8 !== null && src.uint256_int8 !== undefined) {
            b_16.storeBit(true).storeRef(src.uint256_int8);
        }
        else {
            b_16.storeBit(false);
        }
        const b_17 = new core_1.Builder();
        if (src.uint256_int42 !== null && src.uint256_int42 !== undefined) {
            b_17.storeBit(true).storeRef(src.uint256_int42);
        }
        else {
            b_17.storeBit(false);
        }
        if (src.uint256_int256 !== null && src.uint256_int256 !== undefined) {
            b_17.storeBit(true).storeRef(src.uint256_int256);
        }
        else {
            b_17.storeBit(false);
        }
        if (src.uint256_uint8 !== null && src.uint256_uint8 !== undefined) {
            b_17.storeBit(true).storeRef(src.uint256_uint8);
        }
        else {
            b_17.storeBit(false);
        }
        const b_18 = new core_1.Builder();
        if (src.uint256_uint42 !== null && src.uint256_uint42 !== undefined) {
            b_18.storeBit(true).storeRef(src.uint256_uint42);
        }
        else {
            b_18.storeBit(false);
        }
        if (src.uint256_uint256 !== null && src.uint256_uint256 !== undefined) {
            b_18.storeBit(true).storeRef(src.uint256_uint256);
        }
        else {
            b_18.storeBit(false);
        }
        if (src.uint256_coins !== null && src.uint256_coins !== undefined) {
            b_18.storeBit(true).storeRef(src.uint256_coins);
        }
        else {
            b_18.storeBit(false);
        }
        const b_19 = new core_1.Builder();
        if (src.address_int !== null && src.address_int !== undefined) {
            b_19.storeBit(true).storeRef(src.address_int);
        }
        else {
            b_19.storeBit(false);
        }
        if (src.address_int8 !== null && src.address_int8 !== undefined) {
            b_19.storeBit(true).storeRef(src.address_int8);
        }
        else {
            b_19.storeBit(false);
        }
        if (src.address_int42 !== null && src.address_int42 !== undefined) {
            b_19.storeBit(true).storeRef(src.address_int42);
        }
        else {
            b_19.storeBit(false);
        }
        const b_20 = new core_1.Builder();
        if (src.address_int256 !== null && src.address_int256 !== undefined) {
            b_20.storeBit(true).storeRef(src.address_int256);
        }
        else {
            b_20.storeBit(false);
        }
        if (src.address_uint8 !== null && src.address_uint8 !== undefined) {
            b_20.storeBit(true).storeRef(src.address_uint8);
        }
        else {
            b_20.storeBit(false);
        }
        if (src.address_uint42 !== null && src.address_uint42 !== undefined) {
            b_20.storeBit(true).storeRef(src.address_uint42);
        }
        else {
            b_20.storeBit(false);
        }
        const b_21 = new core_1.Builder();
        if (src.address_uint256 !== null && src.address_uint256 !== undefined) {
            b_21.storeBit(true).storeRef(src.address_uint256);
        }
        else {
            b_21.storeBit(false);
        }
        if (src.address_coins !== null && src.address_coins !== undefined) {
            b_21.storeBit(true).storeRef(src.address_coins);
        }
        else {
            b_21.storeBit(false);
        }
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
function loadAsCellAllMapsResult(slice) {
    const sc_0 = slice;
    const _int_int = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _int_int8 = sc_0.loadBit() ? sc_0.loadRef() : null;
    const sc_1 = sc_0.loadRef().beginParse();
    const _int_int42 = sc_1.loadBit() ? sc_1.loadRef() : null;
    const _int_int256 = sc_1.loadBit() ? sc_1.loadRef() : null;
    const _int_uint8 = sc_1.loadBit() ? sc_1.loadRef() : null;
    const sc_2 = sc_1.loadRef().beginParse();
    const _int_uint42 = sc_2.loadBit() ? sc_2.loadRef() : null;
    const _int_uint256 = sc_2.loadBit() ? sc_2.loadRef() : null;
    const _int_coins = sc_2.loadBit() ? sc_2.loadRef() : null;
    const sc_3 = sc_2.loadRef().beginParse();
    const _int8_int = sc_3.loadBit() ? sc_3.loadRef() : null;
    const _int8_int8 = sc_3.loadBit() ? sc_3.loadRef() : null;
    const _int8_int42 = sc_3.loadBit() ? sc_3.loadRef() : null;
    const sc_4 = sc_3.loadRef().beginParse();
    const _int8_int256 = sc_4.loadBit() ? sc_4.loadRef() : null;
    const _int8_uint8 = sc_4.loadBit() ? sc_4.loadRef() : null;
    const _int8_uint42 = sc_4.loadBit() ? sc_4.loadRef() : null;
    const sc_5 = sc_4.loadRef().beginParse();
    const _int8_uint256 = sc_5.loadBit() ? sc_5.loadRef() : null;
    const _int8_coins = sc_5.loadBit() ? sc_5.loadRef() : null;
    const _int42_int = sc_5.loadBit() ? sc_5.loadRef() : null;
    const sc_6 = sc_5.loadRef().beginParse();
    const _int42_int8 = sc_6.loadBit() ? sc_6.loadRef() : null;
    const _int42_int42 = sc_6.loadBit() ? sc_6.loadRef() : null;
    const _int42_int256 = sc_6.loadBit() ? sc_6.loadRef() : null;
    const sc_7 = sc_6.loadRef().beginParse();
    const _int42_uint8 = sc_7.loadBit() ? sc_7.loadRef() : null;
    const _int42_uint42 = sc_7.loadBit() ? sc_7.loadRef() : null;
    const _int42_uint256 = sc_7.loadBit() ? sc_7.loadRef() : null;
    const sc_8 = sc_7.loadRef().beginParse();
    const _int42_coins = sc_8.loadBit() ? sc_8.loadRef() : null;
    const _int256_int = sc_8.loadBit() ? sc_8.loadRef() : null;
    const _int256_int8 = sc_8.loadBit() ? sc_8.loadRef() : null;
    const sc_9 = sc_8.loadRef().beginParse();
    const _int256_int42 = sc_9.loadBit() ? sc_9.loadRef() : null;
    const _int256_int256 = sc_9.loadBit() ? sc_9.loadRef() : null;
    const _int256_uint8 = sc_9.loadBit() ? sc_9.loadRef() : null;
    const sc_10 = sc_9.loadRef().beginParse();
    const _int256_uint42 = sc_10.loadBit() ? sc_10.loadRef() : null;
    const _int256_uint256 = sc_10.loadBit() ? sc_10.loadRef() : null;
    const _int256_coins = sc_10.loadBit() ? sc_10.loadRef() : null;
    const sc_11 = sc_10.loadRef().beginParse();
    const _uint8_int = sc_11.loadBit() ? sc_11.loadRef() : null;
    const _uint8_int8 = sc_11.loadBit() ? sc_11.loadRef() : null;
    const _uint8_int42 = sc_11.loadBit() ? sc_11.loadRef() : null;
    const sc_12 = sc_11.loadRef().beginParse();
    const _uint8_int256 = sc_12.loadBit() ? sc_12.loadRef() : null;
    const _uint8_uint8 = sc_12.loadBit() ? sc_12.loadRef() : null;
    const _uint8_uint42 = sc_12.loadBit() ? sc_12.loadRef() : null;
    const sc_13 = sc_12.loadRef().beginParse();
    const _uint8_uint256 = sc_13.loadBit() ? sc_13.loadRef() : null;
    const _uint8_coins = sc_13.loadBit() ? sc_13.loadRef() : null;
    const _uint42_int = sc_13.loadBit() ? sc_13.loadRef() : null;
    const sc_14 = sc_13.loadRef().beginParse();
    const _uint42_int8 = sc_14.loadBit() ? sc_14.loadRef() : null;
    const _uint42_int42 = sc_14.loadBit() ? sc_14.loadRef() : null;
    const _uint42_int256 = sc_14.loadBit() ? sc_14.loadRef() : null;
    const sc_15 = sc_14.loadRef().beginParse();
    const _uint42_uint8 = sc_15.loadBit() ? sc_15.loadRef() : null;
    const _uint42_uint42 = sc_15.loadBit() ? sc_15.loadRef() : null;
    const _uint42_uint256 = sc_15.loadBit() ? sc_15.loadRef() : null;
    const sc_16 = sc_15.loadRef().beginParse();
    const _uint42_coins = sc_16.loadBit() ? sc_16.loadRef() : null;
    const _uint256_int = sc_16.loadBit() ? sc_16.loadRef() : null;
    const _uint256_int8 = sc_16.loadBit() ? sc_16.loadRef() : null;
    const sc_17 = sc_16.loadRef().beginParse();
    const _uint256_int42 = sc_17.loadBit() ? sc_17.loadRef() : null;
    const _uint256_int256 = sc_17.loadBit() ? sc_17.loadRef() : null;
    const _uint256_uint8 = sc_17.loadBit() ? sc_17.loadRef() : null;
    const sc_18 = sc_17.loadRef().beginParse();
    const _uint256_uint42 = sc_18.loadBit() ? sc_18.loadRef() : null;
    const _uint256_uint256 = sc_18.loadBit() ? sc_18.loadRef() : null;
    const _uint256_coins = sc_18.loadBit() ? sc_18.loadRef() : null;
    const sc_19 = sc_18.loadRef().beginParse();
    const _address_int = sc_19.loadBit() ? sc_19.loadRef() : null;
    const _address_int8 = sc_19.loadBit() ? sc_19.loadRef() : null;
    const _address_int42 = sc_19.loadBit() ? sc_19.loadRef() : null;
    const sc_20 = sc_19.loadRef().beginParse();
    const _address_int256 = sc_20.loadBit() ? sc_20.loadRef() : null;
    const _address_uint8 = sc_20.loadBit() ? sc_20.loadRef() : null;
    const _address_uint42 = sc_20.loadBit() ? sc_20.loadRef() : null;
    const sc_21 = sc_20.loadRef().beginParse();
    const _address_uint256 = sc_21.loadBit() ? sc_21.loadRef() : null;
    const _address_coins = sc_21.loadBit() ? sc_21.loadRef() : null;
    return { $$type: 'AsCellAllMapsResult', int_int: _int_int, int_int8: _int_int8, int_int42: _int_int42, int_int256: _int_int256, int_uint8: _int_uint8, int_uint42: _int_uint42, int_uint256: _int_uint256, int_coins: _int_coins, int8_int: _int8_int, int8_int8: _int8_int8, int8_int42: _int8_int42, int8_int256: _int8_int256, int8_uint8: _int8_uint8, int8_uint42: _int8_uint42, int8_uint256: _int8_uint256, int8_coins: _int8_coins, int42_int: _int42_int, int42_int8: _int42_int8, int42_int42: _int42_int42, int42_int256: _int42_int256, int42_uint8: _int42_uint8, int42_uint42: _int42_uint42, int42_uint256: _int42_uint256, int42_coins: _int42_coins, int256_int: _int256_int, int256_int8: _int256_int8, int256_int42: _int256_int42, int256_int256: _int256_int256, int256_uint8: _int256_uint8, int256_uint42: _int256_uint42, int256_uint256: _int256_uint256, int256_coins: _int256_coins, uint8_int: _uint8_int, uint8_int8: _uint8_int8, uint8_int42: _uint8_int42, uint8_int256: _uint8_int256, uint8_uint8: _uint8_uint8, uint8_uint42: _uint8_uint42, uint8_uint256: _uint8_uint256, uint8_coins: _uint8_coins, uint42_int: _uint42_int, uint42_int8: _uint42_int8, uint42_int42: _uint42_int42, uint42_int256: _uint42_int256, uint42_uint8: _uint42_uint8, uint42_uint42: _uint42_uint42, uint42_uint256: _uint42_uint256, uint42_coins: _uint42_coins, uint256_int: _uint256_int, uint256_int8: _uint256_int8, uint256_int42: _uint256_int42, uint256_int256: _uint256_int256, uint256_uint8: _uint256_uint8, uint256_uint42: _uint256_uint42, uint256_uint256: _uint256_uint256, uint256_coins: _uint256_coins, address_int: _address_int, address_int8: _address_int8, address_int42: _address_int42, address_int256: _address_int256, address_uint8: _address_uint8, address_uint42: _address_uint42, address_uint256: _address_uint256, address_coins: _address_coins };
}
function loadTupleAsCellAllMapsResult(source) {
    const _int_int = source.readCellOpt();
    const _int_int8 = source.readCellOpt();
    const _int_int42 = source.readCellOpt();
    const _int_int256 = source.readCellOpt();
    const _int_uint8 = source.readCellOpt();
    const _int_uint42 = source.readCellOpt();
    const _int_uint256 = source.readCellOpt();
    const _int_coins = source.readCellOpt();
    const _int8_int = source.readCellOpt();
    const _int8_int8 = source.readCellOpt();
    const _int8_int42 = source.readCellOpt();
    const _int8_int256 = source.readCellOpt();
    const _int8_uint8 = source.readCellOpt();
    const _int8_uint42 = source.readCellOpt();
    source = source.readTuple();
    const _int8_uint256 = source.readCellOpt();
    const _int8_coins = source.readCellOpt();
    const _int42_int = source.readCellOpt();
    const _int42_int8 = source.readCellOpt();
    const _int42_int42 = source.readCellOpt();
    const _int42_int256 = source.readCellOpt();
    const _int42_uint8 = source.readCellOpt();
    const _int42_uint42 = source.readCellOpt();
    const _int42_uint256 = source.readCellOpt();
    const _int42_coins = source.readCellOpt();
    const _int256_int = source.readCellOpt();
    const _int256_int8 = source.readCellOpt();
    const _int256_int42 = source.readCellOpt();
    const _int256_int256 = source.readCellOpt();
    source = source.readTuple();
    const _int256_uint8 = source.readCellOpt();
    const _int256_uint42 = source.readCellOpt();
    const _int256_uint256 = source.readCellOpt();
    const _int256_coins = source.readCellOpt();
    const _uint8_int = source.readCellOpt();
    const _uint8_int8 = source.readCellOpt();
    const _uint8_int42 = source.readCellOpt();
    const _uint8_int256 = source.readCellOpt();
    const _uint8_uint8 = source.readCellOpt();
    const _uint8_uint42 = source.readCellOpt();
    const _uint8_uint256 = source.readCellOpt();
    const _uint8_coins = source.readCellOpt();
    const _uint42_int = source.readCellOpt();
    const _uint42_int8 = source.readCellOpt();
    source = source.readTuple();
    const _uint42_int42 = source.readCellOpt();
    const _uint42_int256 = source.readCellOpt();
    const _uint42_uint8 = source.readCellOpt();
    const _uint42_uint42 = source.readCellOpt();
    const _uint42_uint256 = source.readCellOpt();
    const _uint42_coins = source.readCellOpt();
    const _uint256_int = source.readCellOpt();
    const _uint256_int8 = source.readCellOpt();
    const _uint256_int42 = source.readCellOpt();
    const _uint256_int256 = source.readCellOpt();
    const _uint256_uint8 = source.readCellOpt();
    const _uint256_uint42 = source.readCellOpt();
    const _uint256_uint256 = source.readCellOpt();
    const _uint256_coins = source.readCellOpt();
    source = source.readTuple();
    const _address_int = source.readCellOpt();
    const _address_int8 = source.readCellOpt();
    const _address_int42 = source.readCellOpt();
    const _address_int256 = source.readCellOpt();
    const _address_uint8 = source.readCellOpt();
    const _address_uint42 = source.readCellOpt();
    const _address_uint256 = source.readCellOpt();
    const _address_coins = source.readCellOpt();
    return { $$type: 'AsCellAllMapsResult', int_int: _int_int, int_int8: _int_int8, int_int42: _int_int42, int_int256: _int_int256, int_uint8: _int_uint8, int_uint42: _int_uint42, int_uint256: _int_uint256, int_coins: _int_coins, int8_int: _int8_int, int8_int8: _int8_int8, int8_int42: _int8_int42, int8_int256: _int8_int256, int8_uint8: _int8_uint8, int8_uint42: _int8_uint42, int8_uint256: _int8_uint256, int8_coins: _int8_coins, int42_int: _int42_int, int42_int8: _int42_int8, int42_int42: _int42_int42, int42_int256: _int42_int256, int42_uint8: _int42_uint8, int42_uint42: _int42_uint42, int42_uint256: _int42_uint256, int42_coins: _int42_coins, int256_int: _int256_int, int256_int8: _int256_int8, int256_int42: _int256_int42, int256_int256: _int256_int256, int256_uint8: _int256_uint8, int256_uint42: _int256_uint42, int256_uint256: _int256_uint256, int256_coins: _int256_coins, uint8_int: _uint8_int, uint8_int8: _uint8_int8, uint8_int42: _uint8_int42, uint8_int256: _uint8_int256, uint8_uint8: _uint8_uint8, uint8_uint42: _uint8_uint42, uint8_uint256: _uint8_uint256, uint8_coins: _uint8_coins, uint42_int: _uint42_int, uint42_int8: _uint42_int8, uint42_int42: _uint42_int42, uint42_int256: _uint42_int256, uint42_uint8: _uint42_uint8, uint42_uint42: _uint42_uint42, uint42_uint256: _uint42_uint256, uint42_coins: _uint42_coins, uint256_int: _uint256_int, uint256_int8: _uint256_int8, uint256_int42: _uint256_int42, uint256_int256: _uint256_int256, uint256_uint8: _uint256_uint8, uint256_uint42: _uint256_uint42, uint256_uint256: _uint256_uint256, uint256_coins: _uint256_coins, address_int: _address_int, address_int8: _address_int8, address_int42: _address_int42, address_int256: _address_int256, address_uint8: _address_uint8, address_uint42: _address_uint42, address_uint256: _address_uint256, address_coins: _address_coins };
}
function loadGetterTupleAsCellAllMapsResult(source) {
    const _int_int = source.readCellOpt();
    const _int_int8 = source.readCellOpt();
    const _int_int42 = source.readCellOpt();
    const _int_int256 = source.readCellOpt();
    const _int_uint8 = source.readCellOpt();
    const _int_uint42 = source.readCellOpt();
    const _int_uint256 = source.readCellOpt();
    const _int_coins = source.readCellOpt();
    const _int8_int = source.readCellOpt();
    const _int8_int8 = source.readCellOpt();
    const _int8_int42 = source.readCellOpt();
    const _int8_int256 = source.readCellOpt();
    const _int8_uint8 = source.readCellOpt();
    const _int8_uint42 = source.readCellOpt();
    const _int8_uint256 = source.readCellOpt();
    const _int8_coins = source.readCellOpt();
    const _int42_int = source.readCellOpt();
    const _int42_int8 = source.readCellOpt();
    const _int42_int42 = source.readCellOpt();
    const _int42_int256 = source.readCellOpt();
    const _int42_uint8 = source.readCellOpt();
    const _int42_uint42 = source.readCellOpt();
    const _int42_uint256 = source.readCellOpt();
    const _int42_coins = source.readCellOpt();
    const _int256_int = source.readCellOpt();
    const _int256_int8 = source.readCellOpt();
    const _int256_int42 = source.readCellOpt();
    const _int256_int256 = source.readCellOpt();
    const _int256_uint8 = source.readCellOpt();
    const _int256_uint42 = source.readCellOpt();
    const _int256_uint256 = source.readCellOpt();
    const _int256_coins = source.readCellOpt();
    const _uint8_int = source.readCellOpt();
    const _uint8_int8 = source.readCellOpt();
    const _uint8_int42 = source.readCellOpt();
    const _uint8_int256 = source.readCellOpt();
    const _uint8_uint8 = source.readCellOpt();
    const _uint8_uint42 = source.readCellOpt();
    const _uint8_uint256 = source.readCellOpt();
    const _uint8_coins = source.readCellOpt();
    const _uint42_int = source.readCellOpt();
    const _uint42_int8 = source.readCellOpt();
    const _uint42_int42 = source.readCellOpt();
    const _uint42_int256 = source.readCellOpt();
    const _uint42_uint8 = source.readCellOpt();
    const _uint42_uint42 = source.readCellOpt();
    const _uint42_uint256 = source.readCellOpt();
    const _uint42_coins = source.readCellOpt();
    const _uint256_int = source.readCellOpt();
    const _uint256_int8 = source.readCellOpt();
    const _uint256_int42 = source.readCellOpt();
    const _uint256_int256 = source.readCellOpt();
    const _uint256_uint8 = source.readCellOpt();
    const _uint256_uint42 = source.readCellOpt();
    const _uint256_uint256 = source.readCellOpt();
    const _uint256_coins = source.readCellOpt();
    const _address_int = source.readCellOpt();
    const _address_int8 = source.readCellOpt();
    const _address_int42 = source.readCellOpt();
    const _address_int256 = source.readCellOpt();
    const _address_uint8 = source.readCellOpt();
    const _address_uint42 = source.readCellOpt();
    const _address_uint256 = source.readCellOpt();
    const _address_coins = source.readCellOpt();
    return { $$type: 'AsCellAllMapsResult', int_int: _int_int, int_int8: _int_int8, int_int42: _int_int42, int_int256: _int_int256, int_uint8: _int_uint8, int_uint42: _int_uint42, int_uint256: _int_uint256, int_coins: _int_coins, int8_int: _int8_int, int8_int8: _int8_int8, int8_int42: _int8_int42, int8_int256: _int8_int256, int8_uint8: _int8_uint8, int8_uint42: _int8_uint42, int8_uint256: _int8_uint256, int8_coins: _int8_coins, int42_int: _int42_int, int42_int8: _int42_int8, int42_int42: _int42_int42, int42_int256: _int42_int256, int42_uint8: _int42_uint8, int42_uint42: _int42_uint42, int42_uint256: _int42_uint256, int42_coins: _int42_coins, int256_int: _int256_int, int256_int8: _int256_int8, int256_int42: _int256_int42, int256_int256: _int256_int256, int256_uint8: _int256_uint8, int256_uint42: _int256_uint42, int256_uint256: _int256_uint256, int256_coins: _int256_coins, uint8_int: _uint8_int, uint8_int8: _uint8_int8, uint8_int42: _uint8_int42, uint8_int256: _uint8_int256, uint8_uint8: _uint8_uint8, uint8_uint42: _uint8_uint42, uint8_uint256: _uint8_uint256, uint8_coins: _uint8_coins, uint42_int: _uint42_int, uint42_int8: _uint42_int8, uint42_int42: _uint42_int42, uint42_int256: _uint42_int256, uint42_uint8: _uint42_uint8, uint42_uint42: _uint42_uint42, uint42_uint256: _uint42_uint256, uint42_coins: _uint42_coins, uint256_int: _uint256_int, uint256_int8: _uint256_int8, uint256_int42: _uint256_int42, uint256_int256: _uint256_int256, uint256_uint8: _uint256_uint8, uint256_uint42: _uint256_uint42, uint256_uint256: _uint256_uint256, uint256_coins: _uint256_coins, address_int: _address_int, address_int8: _address_int8, address_int42: _address_int42, address_int256: _address_int256, address_uint8: _address_uint8, address_uint42: _address_uint42, address_uint256: _address_uint256, address_coins: _address_coins };
}
function storeTupleAsCellAllMapsResult(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeCell(source.int_int);
    builder.writeCell(source.int_int8);
    builder.writeCell(source.int_int42);
    builder.writeCell(source.int_int256);
    builder.writeCell(source.int_uint8);
    builder.writeCell(source.int_uint42);
    builder.writeCell(source.int_uint256);
    builder.writeCell(source.int_coins);
    builder.writeCell(source.int8_int);
    builder.writeCell(source.int8_int8);
    builder.writeCell(source.int8_int42);
    builder.writeCell(source.int8_int256);
    builder.writeCell(source.int8_uint8);
    builder.writeCell(source.int8_uint42);
    builder.writeCell(source.int8_uint256);
    builder.writeCell(source.int8_coins);
    builder.writeCell(source.int42_int);
    builder.writeCell(source.int42_int8);
    builder.writeCell(source.int42_int42);
    builder.writeCell(source.int42_int256);
    builder.writeCell(source.int42_uint8);
    builder.writeCell(source.int42_uint42);
    builder.writeCell(source.int42_uint256);
    builder.writeCell(source.int42_coins);
    builder.writeCell(source.int256_int);
    builder.writeCell(source.int256_int8);
    builder.writeCell(source.int256_int42);
    builder.writeCell(source.int256_int256);
    builder.writeCell(source.int256_uint8);
    builder.writeCell(source.int256_uint42);
    builder.writeCell(source.int256_uint256);
    builder.writeCell(source.int256_coins);
    builder.writeCell(source.uint8_int);
    builder.writeCell(source.uint8_int8);
    builder.writeCell(source.uint8_int42);
    builder.writeCell(source.uint8_int256);
    builder.writeCell(source.uint8_uint8);
    builder.writeCell(source.uint8_uint42);
    builder.writeCell(source.uint8_uint256);
    builder.writeCell(source.uint8_coins);
    builder.writeCell(source.uint42_int);
    builder.writeCell(source.uint42_int8);
    builder.writeCell(source.uint42_int42);
    builder.writeCell(source.uint42_int256);
    builder.writeCell(source.uint42_uint8);
    builder.writeCell(source.uint42_uint42);
    builder.writeCell(source.uint42_uint256);
    builder.writeCell(source.uint42_coins);
    builder.writeCell(source.uint256_int);
    builder.writeCell(source.uint256_int8);
    builder.writeCell(source.uint256_int42);
    builder.writeCell(source.uint256_int256);
    builder.writeCell(source.uint256_uint8);
    builder.writeCell(source.uint256_uint42);
    builder.writeCell(source.uint256_uint256);
    builder.writeCell(source.uint256_coins);
    builder.writeCell(source.address_int);
    builder.writeCell(source.address_int8);
    builder.writeCell(source.address_int42);
    builder.writeCell(source.address_int256);
    builder.writeCell(source.address_uint8);
    builder.writeCell(source.address_uint42);
    builder.writeCell(source.address_uint256);
    builder.writeCell(source.address_coins);
    return builder.build();
}
function dictValueParserAsCellAllMapsResult() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeAsCellAllMapsResult(src)).endCell());
        },
        parse: (src) => {
            return loadAsCellAllMapsResult(src.loadRef().beginParse());
        }
    };
}
function storeSetAllMaps(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(1374781841, 32);
        b_0.storeInt(src.keyInt, 257);
        b_0.storeInt(src.keyInt8, 257);
        b_0.storeInt(src.keyInt42, 257);
        const b_1 = new core_1.Builder();
        b_1.storeInt(src.keyInt256, 257);
        b_1.storeInt(src.keyUint8, 257);
        b_1.storeInt(src.keyUint42, 257);
        const b_2 = new core_1.Builder();
        b_2.storeInt(src.keyUint256, 257);
        b_2.storeAddress(src.keyAddress);
        if (src.valueInt !== null && src.valueInt !== undefined) {
            b_2.storeBit(true).storeInt(src.valueInt, 257);
        }
        else {
            b_2.storeBit(false);
        }
        const b_3 = new core_1.Builder();
        if (src.valueInt8 !== null && src.valueInt8 !== undefined) {
            b_3.storeBit(true).storeInt(src.valueInt8, 257);
        }
        else {
            b_3.storeBit(false);
        }
        if (src.valueInt42 !== null && src.valueInt42 !== undefined) {
            b_3.storeBit(true).storeInt(src.valueInt42, 257);
        }
        else {
            b_3.storeBit(false);
        }
        if (src.valueInt256 !== null && src.valueInt256 !== undefined) {
            b_3.storeBit(true).storeInt(src.valueInt256, 257);
        }
        else {
            b_3.storeBit(false);
        }
        const b_4 = new core_1.Builder();
        if (src.valueUint8 !== null && src.valueUint8 !== undefined) {
            b_4.storeBit(true).storeInt(src.valueUint8, 257);
        }
        else {
            b_4.storeBit(false);
        }
        if (src.valueUint42 !== null && src.valueUint42 !== undefined) {
            b_4.storeBit(true).storeInt(src.valueUint42, 257);
        }
        else {
            b_4.storeBit(false);
        }
        if (src.valueUint256 !== null && src.valueUint256 !== undefined) {
            b_4.storeBit(true).storeInt(src.valueUint256, 257);
        }
        else {
            b_4.storeBit(false);
        }
        const b_5 = new core_1.Builder();
        if (src.valueCoins !== null && src.valueCoins !== undefined) {
            b_5.storeBit(true).storeInt(src.valueCoins, 257);
        }
        else {
            b_5.storeBit(false);
        }
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}
function loadSetAllMaps(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1374781841) {
        throw Error('Invalid prefix');
    }
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
    const _valueInt = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    const sc_3 = sc_2.loadRef().beginParse();
    const _valueInt8 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _valueInt42 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _valueInt256 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const sc_4 = sc_3.loadRef().beginParse();
    const _valueUint8 = sc_4.loadBit() ? sc_4.loadIntBig(257) : null;
    const _valueUint42 = sc_4.loadBit() ? sc_4.loadIntBig(257) : null;
    const _valueUint256 = sc_4.loadBit() ? sc_4.loadIntBig(257) : null;
    const sc_5 = sc_4.loadRef().beginParse();
    const _valueCoins = sc_5.loadBit() ? sc_5.loadIntBig(257) : null;
    return { $$type: 'SetAllMaps', keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress, valueInt: _valueInt, valueInt8: _valueInt8, valueInt42: _valueInt42, valueInt256: _valueInt256, valueUint8: _valueUint8, valueUint42: _valueUint42, valueUint256: _valueUint256, valueCoins: _valueCoins };
}
function loadTupleSetAllMaps(source) {
    const _keyInt = source.readBigNumber();
    const _keyInt8 = source.readBigNumber();
    const _keyInt42 = source.readBigNumber();
    const _keyInt256 = source.readBigNumber();
    const _keyUint8 = source.readBigNumber();
    const _keyUint42 = source.readBigNumber();
    const _keyUint256 = source.readBigNumber();
    const _keyAddress = source.readAddress();
    const _valueInt = source.readBigNumberOpt();
    const _valueInt8 = source.readBigNumberOpt();
    const _valueInt42 = source.readBigNumberOpt();
    const _valueInt256 = source.readBigNumberOpt();
    const _valueUint8 = source.readBigNumberOpt();
    const _valueUint42 = source.readBigNumberOpt();
    source = source.readTuple();
    const _valueUint256 = source.readBigNumberOpt();
    const _valueCoins = source.readBigNumberOpt();
    return { $$type: 'SetAllMaps', keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress, valueInt: _valueInt, valueInt8: _valueInt8, valueInt42: _valueInt42, valueInt256: _valueInt256, valueUint8: _valueUint8, valueUint42: _valueUint42, valueUint256: _valueUint256, valueCoins: _valueCoins };
}
function loadGetterTupleSetAllMaps(source) {
    const _keyInt = source.readBigNumber();
    const _keyInt8 = source.readBigNumber();
    const _keyInt42 = source.readBigNumber();
    const _keyInt256 = source.readBigNumber();
    const _keyUint8 = source.readBigNumber();
    const _keyUint42 = source.readBigNumber();
    const _keyUint256 = source.readBigNumber();
    const _keyAddress = source.readAddress();
    const _valueInt = source.readBigNumberOpt();
    const _valueInt8 = source.readBigNumberOpt();
    const _valueInt42 = source.readBigNumberOpt();
    const _valueInt256 = source.readBigNumberOpt();
    const _valueUint8 = source.readBigNumberOpt();
    const _valueUint42 = source.readBigNumberOpt();
    const _valueUint256 = source.readBigNumberOpt();
    const _valueCoins = source.readBigNumberOpt();
    return { $$type: 'SetAllMaps', keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress, valueInt: _valueInt, valueInt8: _valueInt8, valueInt42: _valueInt42, valueInt256: _valueInt256, valueUint8: _valueUint8, valueUint42: _valueUint42, valueUint256: _valueUint256, valueCoins: _valueCoins };
}
function storeTupleSetAllMaps(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.keyInt);
    builder.writeNumber(source.keyInt8);
    builder.writeNumber(source.keyInt42);
    builder.writeNumber(source.keyInt256);
    builder.writeNumber(source.keyUint8);
    builder.writeNumber(source.keyUint42);
    builder.writeNumber(source.keyUint256);
    builder.writeAddress(source.keyAddress);
    builder.writeNumber(source.valueInt);
    builder.writeNumber(source.valueInt8);
    builder.writeNumber(source.valueInt42);
    builder.writeNumber(source.valueInt256);
    builder.writeNumber(source.valueUint8);
    builder.writeNumber(source.valueUint42);
    builder.writeNumber(source.valueUint256);
    builder.writeNumber(source.valueCoins);
    return builder.build();
}
function dictValueParserSetAllMaps() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSetAllMaps(src)).endCell());
        },
        parse: (src) => {
            return loadSetAllMaps(src.loadRef().beginParse());
        }
    };
}
function storeDelAllMaps(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(1261158015, 32);
        b_0.storeInt(src.keyInt, 257);
        b_0.storeInt(src.keyInt8, 257);
        b_0.storeInt(src.keyInt42, 257);
        const b_1 = new core_1.Builder();
        b_1.storeInt(src.keyInt256, 257);
        b_1.storeInt(src.keyUint8, 257);
        b_1.storeInt(src.keyUint42, 257);
        const b_2 = new core_1.Builder();
        b_2.storeInt(src.keyUint256, 257);
        b_2.storeAddress(src.keyAddress);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}
function loadDelAllMaps(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1261158015) {
        throw Error('Invalid prefix');
    }
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
    return { $$type: 'DelAllMaps', keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress };
}
function loadTupleDelAllMaps(source) {
    const _keyInt = source.readBigNumber();
    const _keyInt8 = source.readBigNumber();
    const _keyInt42 = source.readBigNumber();
    const _keyInt256 = source.readBigNumber();
    const _keyUint8 = source.readBigNumber();
    const _keyUint42 = source.readBigNumber();
    const _keyUint256 = source.readBigNumber();
    const _keyAddress = source.readAddress();
    return { $$type: 'DelAllMaps', keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress };
}
function loadGetterTupleDelAllMaps(source) {
    const _keyInt = source.readBigNumber();
    const _keyInt8 = source.readBigNumber();
    const _keyInt42 = source.readBigNumber();
    const _keyInt256 = source.readBigNumber();
    const _keyUint8 = source.readBigNumber();
    const _keyUint42 = source.readBigNumber();
    const _keyUint256 = source.readBigNumber();
    const _keyAddress = source.readAddress();
    return { $$type: 'DelAllMaps', keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress };
}
function storeTupleDelAllMaps(source) {
    const builder = new core_1.TupleBuilder();
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
function dictValueParserDelAllMaps() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeDelAllMaps(src)).endCell());
        },
        parse: (src) => {
            return loadDelAllMaps(src.loadRef().beginParse());
        }
    };
}
function storeReplaceAllMaps(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(2669006230, 32);
        b_0.storeInt(src.keyInt, 257);
        b_0.storeInt(src.keyInt8, 257);
        b_0.storeInt(src.keyInt42, 257);
        const b_1 = new core_1.Builder();
        b_1.storeInt(src.keyInt256, 257);
        b_1.storeInt(src.keyUint8, 257);
        b_1.storeInt(src.keyUint42, 257);
        const b_2 = new core_1.Builder();
        b_2.storeInt(src.keyUint256, 257);
        b_2.storeAddress(src.keyAddress);
        if (src.valueInt !== null && src.valueInt !== undefined) {
            b_2.storeBit(true).storeInt(src.valueInt, 257);
        }
        else {
            b_2.storeBit(false);
        }
        const b_3 = new core_1.Builder();
        if (src.valueInt8 !== null && src.valueInt8 !== undefined) {
            b_3.storeBit(true).storeInt(src.valueInt8, 257);
        }
        else {
            b_3.storeBit(false);
        }
        if (src.valueInt42 !== null && src.valueInt42 !== undefined) {
            b_3.storeBit(true).storeInt(src.valueInt42, 257);
        }
        else {
            b_3.storeBit(false);
        }
        if (src.valueInt256 !== null && src.valueInt256 !== undefined) {
            b_3.storeBit(true).storeInt(src.valueInt256, 257);
        }
        else {
            b_3.storeBit(false);
        }
        const b_4 = new core_1.Builder();
        if (src.valueUint8 !== null && src.valueUint8 !== undefined) {
            b_4.storeBit(true).storeInt(src.valueUint8, 257);
        }
        else {
            b_4.storeBit(false);
        }
        if (src.valueUint42 !== null && src.valueUint42 !== undefined) {
            b_4.storeBit(true).storeInt(src.valueUint42, 257);
        }
        else {
            b_4.storeBit(false);
        }
        if (src.valueUint256 !== null && src.valueUint256 !== undefined) {
            b_4.storeBit(true).storeInt(src.valueUint256, 257);
        }
        else {
            b_4.storeBit(false);
        }
        const b_5 = new core_1.Builder();
        if (src.valueCoins !== null && src.valueCoins !== undefined) {
            b_5.storeBit(true).storeInt(src.valueCoins, 257);
        }
        else {
            b_5.storeBit(false);
        }
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}
function loadReplaceAllMaps(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2669006230) {
        throw Error('Invalid prefix');
    }
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
    const _valueInt = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    const sc_3 = sc_2.loadRef().beginParse();
    const _valueInt8 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _valueInt42 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _valueInt256 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const sc_4 = sc_3.loadRef().beginParse();
    const _valueUint8 = sc_4.loadBit() ? sc_4.loadIntBig(257) : null;
    const _valueUint42 = sc_4.loadBit() ? sc_4.loadIntBig(257) : null;
    const _valueUint256 = sc_4.loadBit() ? sc_4.loadIntBig(257) : null;
    const sc_5 = sc_4.loadRef().beginParse();
    const _valueCoins = sc_5.loadBit() ? sc_5.loadIntBig(257) : null;
    return { $$type: 'ReplaceAllMaps', keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress, valueInt: _valueInt, valueInt8: _valueInt8, valueInt42: _valueInt42, valueInt256: _valueInt256, valueUint8: _valueUint8, valueUint42: _valueUint42, valueUint256: _valueUint256, valueCoins: _valueCoins };
}
function loadTupleReplaceAllMaps(source) {
    const _keyInt = source.readBigNumber();
    const _keyInt8 = source.readBigNumber();
    const _keyInt42 = source.readBigNumber();
    const _keyInt256 = source.readBigNumber();
    const _keyUint8 = source.readBigNumber();
    const _keyUint42 = source.readBigNumber();
    const _keyUint256 = source.readBigNumber();
    const _keyAddress = source.readAddress();
    const _valueInt = source.readBigNumberOpt();
    const _valueInt8 = source.readBigNumberOpt();
    const _valueInt42 = source.readBigNumberOpt();
    const _valueInt256 = source.readBigNumberOpt();
    const _valueUint8 = source.readBigNumberOpt();
    const _valueUint42 = source.readBigNumberOpt();
    source = source.readTuple();
    const _valueUint256 = source.readBigNumberOpt();
    const _valueCoins = source.readBigNumberOpt();
    return { $$type: 'ReplaceAllMaps', keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress, valueInt: _valueInt, valueInt8: _valueInt8, valueInt42: _valueInt42, valueInt256: _valueInt256, valueUint8: _valueUint8, valueUint42: _valueUint42, valueUint256: _valueUint256, valueCoins: _valueCoins };
}
function loadGetterTupleReplaceAllMaps(source) {
    const _keyInt = source.readBigNumber();
    const _keyInt8 = source.readBigNumber();
    const _keyInt42 = source.readBigNumber();
    const _keyInt256 = source.readBigNumber();
    const _keyUint8 = source.readBigNumber();
    const _keyUint42 = source.readBigNumber();
    const _keyUint256 = source.readBigNumber();
    const _keyAddress = source.readAddress();
    const _valueInt = source.readBigNumberOpt();
    const _valueInt8 = source.readBigNumberOpt();
    const _valueInt42 = source.readBigNumberOpt();
    const _valueInt256 = source.readBigNumberOpt();
    const _valueUint8 = source.readBigNumberOpt();
    const _valueUint42 = source.readBigNumberOpt();
    const _valueUint256 = source.readBigNumberOpt();
    const _valueCoins = source.readBigNumberOpt();
    return { $$type: 'ReplaceAllMaps', keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress, valueInt: _valueInt, valueInt8: _valueInt8, valueInt42: _valueInt42, valueInt256: _valueInt256, valueUint8: _valueUint8, valueUint42: _valueUint42, valueUint256: _valueUint256, valueCoins: _valueCoins };
}
function storeTupleReplaceAllMaps(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.keyInt);
    builder.writeNumber(source.keyInt8);
    builder.writeNumber(source.keyInt42);
    builder.writeNumber(source.keyInt256);
    builder.writeNumber(source.keyUint8);
    builder.writeNumber(source.keyUint42);
    builder.writeNumber(source.keyUint256);
    builder.writeAddress(source.keyAddress);
    builder.writeNumber(source.valueInt);
    builder.writeNumber(source.valueInt8);
    builder.writeNumber(source.valueInt42);
    builder.writeNumber(source.valueInt256);
    builder.writeNumber(source.valueUint8);
    builder.writeNumber(source.valueUint42);
    builder.writeNumber(source.valueUint256);
    builder.writeNumber(source.valueCoins);
    return builder.build();
}
function dictValueParserReplaceAllMaps() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeReplaceAllMaps(src)).endCell());
        },
        parse: (src) => {
            return loadReplaceAllMaps(src.loadRef().beginParse());
        }
    };
}
function storeReplaceGetAllMaps(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(3424045530, 32);
        b_0.storeInt(src.keyInt, 257);
        b_0.storeInt(src.keyInt8, 257);
        b_0.storeInt(src.keyInt42, 257);
        const b_1 = new core_1.Builder();
        b_1.storeInt(src.keyInt256, 257);
        b_1.storeInt(src.keyUint8, 257);
        b_1.storeInt(src.keyUint42, 257);
        const b_2 = new core_1.Builder();
        b_2.storeInt(src.keyUint256, 257);
        b_2.storeAddress(src.keyAddress);
        if (src.valueInt !== null && src.valueInt !== undefined) {
            b_2.storeBit(true).storeInt(src.valueInt, 257);
        }
        else {
            b_2.storeBit(false);
        }
        const b_3 = new core_1.Builder();
        if (src.valueInt8 !== null && src.valueInt8 !== undefined) {
            b_3.storeBit(true).storeInt(src.valueInt8, 257);
        }
        else {
            b_3.storeBit(false);
        }
        if (src.valueInt42 !== null && src.valueInt42 !== undefined) {
            b_3.storeBit(true).storeInt(src.valueInt42, 257);
        }
        else {
            b_3.storeBit(false);
        }
        if (src.valueInt256 !== null && src.valueInt256 !== undefined) {
            b_3.storeBit(true).storeInt(src.valueInt256, 257);
        }
        else {
            b_3.storeBit(false);
        }
        const b_4 = new core_1.Builder();
        if (src.valueUint8 !== null && src.valueUint8 !== undefined) {
            b_4.storeBit(true).storeInt(src.valueUint8, 257);
        }
        else {
            b_4.storeBit(false);
        }
        if (src.valueUint42 !== null && src.valueUint42 !== undefined) {
            b_4.storeBit(true).storeInt(src.valueUint42, 257);
        }
        else {
            b_4.storeBit(false);
        }
        if (src.valueUint256 !== null && src.valueUint256 !== undefined) {
            b_4.storeBit(true).storeInt(src.valueUint256, 257);
        }
        else {
            b_4.storeBit(false);
        }
        const b_5 = new core_1.Builder();
        if (src.valueCoins !== null && src.valueCoins !== undefined) {
            b_5.storeBit(true).storeInt(src.valueCoins, 257);
        }
        else {
            b_5.storeBit(false);
        }
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}
function loadReplaceGetAllMaps(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3424045530) {
        throw Error('Invalid prefix');
    }
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
    const _valueInt = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
    const sc_3 = sc_2.loadRef().beginParse();
    const _valueInt8 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _valueInt42 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const _valueInt256 = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    const sc_4 = sc_3.loadRef().beginParse();
    const _valueUint8 = sc_4.loadBit() ? sc_4.loadIntBig(257) : null;
    const _valueUint42 = sc_4.loadBit() ? sc_4.loadIntBig(257) : null;
    const _valueUint256 = sc_4.loadBit() ? sc_4.loadIntBig(257) : null;
    const sc_5 = sc_4.loadRef().beginParse();
    const _valueCoins = sc_5.loadBit() ? sc_5.loadIntBig(257) : null;
    return { $$type: 'ReplaceGetAllMaps', keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress, valueInt: _valueInt, valueInt8: _valueInt8, valueInt42: _valueInt42, valueInt256: _valueInt256, valueUint8: _valueUint8, valueUint42: _valueUint42, valueUint256: _valueUint256, valueCoins: _valueCoins };
}
function loadTupleReplaceGetAllMaps(source) {
    const _keyInt = source.readBigNumber();
    const _keyInt8 = source.readBigNumber();
    const _keyInt42 = source.readBigNumber();
    const _keyInt256 = source.readBigNumber();
    const _keyUint8 = source.readBigNumber();
    const _keyUint42 = source.readBigNumber();
    const _keyUint256 = source.readBigNumber();
    const _keyAddress = source.readAddress();
    const _valueInt = source.readBigNumberOpt();
    const _valueInt8 = source.readBigNumberOpt();
    const _valueInt42 = source.readBigNumberOpt();
    const _valueInt256 = source.readBigNumberOpt();
    const _valueUint8 = source.readBigNumberOpt();
    const _valueUint42 = source.readBigNumberOpt();
    source = source.readTuple();
    const _valueUint256 = source.readBigNumberOpt();
    const _valueCoins = source.readBigNumberOpt();
    return { $$type: 'ReplaceGetAllMaps', keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress, valueInt: _valueInt, valueInt8: _valueInt8, valueInt42: _valueInt42, valueInt256: _valueInt256, valueUint8: _valueUint8, valueUint42: _valueUint42, valueUint256: _valueUint256, valueCoins: _valueCoins };
}
function loadGetterTupleReplaceGetAllMaps(source) {
    const _keyInt = source.readBigNumber();
    const _keyInt8 = source.readBigNumber();
    const _keyInt42 = source.readBigNumber();
    const _keyInt256 = source.readBigNumber();
    const _keyUint8 = source.readBigNumber();
    const _keyUint42 = source.readBigNumber();
    const _keyUint256 = source.readBigNumber();
    const _keyAddress = source.readAddress();
    const _valueInt = source.readBigNumberOpt();
    const _valueInt8 = source.readBigNumberOpt();
    const _valueInt42 = source.readBigNumberOpt();
    const _valueInt256 = source.readBigNumberOpt();
    const _valueUint8 = source.readBigNumberOpt();
    const _valueUint42 = source.readBigNumberOpt();
    const _valueUint256 = source.readBigNumberOpt();
    const _valueCoins = source.readBigNumberOpt();
    return { $$type: 'ReplaceGetAllMaps', keyInt: _keyInt, keyInt8: _keyInt8, keyInt42: _keyInt42, keyInt256: _keyInt256, keyUint8: _keyUint8, keyUint42: _keyUint42, keyUint256: _keyUint256, keyAddress: _keyAddress, valueInt: _valueInt, valueInt8: _valueInt8, valueInt42: _valueInt42, valueInt256: _valueInt256, valueUint8: _valueUint8, valueUint42: _valueUint42, valueUint256: _valueUint256, valueCoins: _valueCoins };
}
function storeTupleReplaceGetAllMaps(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.keyInt);
    builder.writeNumber(source.keyInt8);
    builder.writeNumber(source.keyInt42);
    builder.writeNumber(source.keyInt256);
    builder.writeNumber(source.keyUint8);
    builder.writeNumber(source.keyUint42);
    builder.writeNumber(source.keyUint256);
    builder.writeAddress(source.keyAddress);
    builder.writeNumber(source.valueInt);
    builder.writeNumber(source.valueInt8);
    builder.writeNumber(source.valueInt42);
    builder.writeNumber(source.valueInt256);
    builder.writeNumber(source.valueUint8);
    builder.writeNumber(source.valueUint42);
    builder.writeNumber(source.valueUint256);
    builder.writeNumber(source.valueCoins);
    return builder.build();
}
function dictValueParserReplaceGetAllMaps() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeReplaceGetAllMaps(src)).endCell());
        },
        parse: (src) => {
            return loadReplaceGetAllMaps(src.loadRef().beginParse());
        }
    };
}
function storeCheckNullReference(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(2978152160, 32);
    };
}
function loadCheckNullReference(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2978152160) {
        throw Error('Invalid prefix');
    }
    return { $$type: 'CheckNullReference' };
}
function loadTupleCheckNullReference(source) {
    return { $$type: 'CheckNullReference' };
}
function loadGetterTupleCheckNullReference(source) {
    return { $$type: 'CheckNullReference' };
}
function storeTupleCheckNullReference(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserCheckNullReference() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeCheckNullReference(src)).endCell());
        },
        parse: (src) => {
            return loadCheckNullReference(src.loadRef().beginParse());
        }
    };
}
function storeMapTestContract$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeDict(src.int_int, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_0.storeDict(src.int_int8, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Int(8));
        const b_1 = new core_1.Builder();
        b_1.storeDict(src.int_int42, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(42));
        b_1.storeDict(src.int_int256, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(256));
        b_1.storeDict(src.int_uint8, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Uint(8));
        const b_2 = new core_1.Builder();
        b_2.storeDict(src.int_uint42, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigUint(42));
        b_2.storeDict(src.int_uint256, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigUint(256));
        b_2.storeDict(src.int_coins, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigVarUint(4));
        const b_3 = new core_1.Builder();
        b_3.storeDict(src.int8_int, core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigInt(257));
        b_3.storeDict(src.int8_int8, core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.Int(8));
        b_3.storeDict(src.int8_int42, core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigInt(42));
        const b_4 = new core_1.Builder();
        b_4.storeDict(src.int8_int256, core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigInt(256));
        b_4.storeDict(src.int8_uint8, core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.Uint(8));
        b_4.storeDict(src.int8_uint42, core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigUint(42));
        const b_5 = new core_1.Builder();
        b_5.storeDict(src.int8_uint256, core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigUint(256));
        b_5.storeDict(src.int8_coins, core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigVarUint(4));
        b_5.storeDict(src.int42_int, core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigInt(257));
        const b_6 = new core_1.Builder();
        b_6.storeDict(src.int42_int8, core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.Int(8));
        b_6.storeDict(src.int42_int42, core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigInt(42));
        b_6.storeDict(src.int42_int256, core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigInt(256));
        const b_7 = new core_1.Builder();
        b_7.storeDict(src.int42_uint8, core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.Uint(8));
        b_7.storeDict(src.int42_uint42, core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigUint(42));
        b_7.storeDict(src.int42_uint256, core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigUint(256));
        const b_8 = new core_1.Builder();
        b_8.storeDict(src.int42_coins, core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigVarUint(4));
        b_8.storeDict(src.int256_int, core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigInt(257));
        b_8.storeDict(src.int256_int8, core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.Int(8));
        const b_9 = new core_1.Builder();
        b_9.storeDict(src.int256_int42, core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigInt(42));
        b_9.storeDict(src.int256_int256, core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigInt(256));
        b_9.storeDict(src.int256_uint8, core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.Uint(8));
        const b_10 = new core_1.Builder();
        b_10.storeDict(src.int256_uint42, core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigUint(42));
        b_10.storeDict(src.int256_uint256, core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigUint(256));
        b_10.storeDict(src.int256_coins, core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigVarUint(4));
        const b_11 = new core_1.Builder();
        b_11.storeDict(src.uint8_int, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigInt(257));
        b_11.storeDict(src.uint8_int8, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Int(8));
        b_11.storeDict(src.uint8_int42, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigInt(42));
        const b_12 = new core_1.Builder();
        b_12.storeDict(src.uint8_int256, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigInt(256));
        b_12.storeDict(src.uint8_uint8, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Uint(8));
        b_12.storeDict(src.uint8_uint42, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigUint(42));
        const b_13 = new core_1.Builder();
        b_13.storeDict(src.uint8_uint256, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigUint(256));
        b_13.storeDict(src.uint8_coins, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigVarUint(4));
        b_13.storeDict(src.uint42_int, core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigInt(257));
        const b_14 = new core_1.Builder();
        b_14.storeDict(src.uint42_int8, core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.Int(8));
        b_14.storeDict(src.uint42_int42, core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigInt(42));
        b_14.storeDict(src.uint42_int256, core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigInt(256));
        const b_15 = new core_1.Builder();
        b_15.storeDict(src.uint42_uint8, core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.Uint(8));
        b_15.storeDict(src.uint42_uint42, core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigUint(42));
        b_15.storeDict(src.uint42_uint256, core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigUint(256));
        const b_16 = new core_1.Builder();
        b_16.storeDict(src.uint42_coins, core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigVarUint(4));
        b_16.storeDict(src.uint256_int, core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigInt(257));
        b_16.storeDict(src.uint256_int8, core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.Int(8));
        const b_17 = new core_1.Builder();
        b_17.storeDict(src.uint256_int42, core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigInt(42));
        b_17.storeDict(src.uint256_int256, core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigInt(256));
        b_17.storeDict(src.uint256_uint8, core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.Uint(8));
        const b_18 = new core_1.Builder();
        b_18.storeDict(src.uint256_uint42, core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigUint(42));
        b_18.storeDict(src.uint256_uint256, core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigUint(256));
        b_18.storeDict(src.uint256_coins, core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigVarUint(4));
        const b_19 = new core_1.Builder();
        b_19.storeDict(src.address_int, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(257));
        b_19.storeDict(src.address_int8, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Int(8));
        b_19.storeDict(src.address_int42, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(42));
        const b_20 = new core_1.Builder();
        b_20.storeDict(src.address_int256, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(256));
        b_20.storeDict(src.address_uint8, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Uint(8));
        b_20.storeDict(src.address_uint42, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigUint(42));
        const b_21 = new core_1.Builder();
        b_21.storeDict(src.address_uint256, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigUint(256));
        b_21.storeDict(src.address_coins, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigVarUint(4));
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
function loadMapTestContract$Data(slice) {
    const sc_0 = slice;
    const _int_int = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_0);
    const _int_int8 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Int(8), sc_0);
    const sc_1 = sc_0.loadRef().beginParse();
    const _int_int42 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(42), sc_1);
    const _int_int256 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(256), sc_1);
    const _int_uint8 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Uint(8), sc_1);
    const sc_2 = sc_1.loadRef().beginParse();
    const _int_uint42 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigUint(42), sc_2);
    const _int_uint256 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigUint(256), sc_2);
    const _int_coins = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigVarUint(4), sc_2);
    const sc_3 = sc_2.loadRef().beginParse();
    const _int8_int = core_1.Dictionary.load(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigInt(257), sc_3);
    const _int8_int8 = core_1.Dictionary.load(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.Int(8), sc_3);
    const _int8_int42 = core_1.Dictionary.load(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigInt(42), sc_3);
    const sc_4 = sc_3.loadRef().beginParse();
    const _int8_int256 = core_1.Dictionary.load(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigInt(256), sc_4);
    const _int8_uint8 = core_1.Dictionary.load(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.Uint(8), sc_4);
    const _int8_uint42 = core_1.Dictionary.load(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigUint(42), sc_4);
    const sc_5 = sc_4.loadRef().beginParse();
    const _int8_uint256 = core_1.Dictionary.load(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigUint(256), sc_5);
    const _int8_coins = core_1.Dictionary.load(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigVarUint(4), sc_5);
    const _int42_int = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigInt(257), sc_5);
    const sc_6 = sc_5.loadRef().beginParse();
    const _int42_int8 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.Int(8), sc_6);
    const _int42_int42 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigInt(42), sc_6);
    const _int42_int256 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigInt(256), sc_6);
    const sc_7 = sc_6.loadRef().beginParse();
    const _int42_uint8 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.Uint(8), sc_7);
    const _int42_uint42 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigUint(42), sc_7);
    const _int42_uint256 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigUint(256), sc_7);
    const sc_8 = sc_7.loadRef().beginParse();
    const _int42_coins = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigVarUint(4), sc_8);
    const _int256_int = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigInt(257), sc_8);
    const _int256_int8 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.Int(8), sc_8);
    const sc_9 = sc_8.loadRef().beginParse();
    const _int256_int42 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigInt(42), sc_9);
    const _int256_int256 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigInt(256), sc_9);
    const _int256_uint8 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.Uint(8), sc_9);
    const sc_10 = sc_9.loadRef().beginParse();
    const _int256_uint42 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigUint(42), sc_10);
    const _int256_uint256 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigUint(256), sc_10);
    const _int256_coins = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigVarUint(4), sc_10);
    const sc_11 = sc_10.loadRef().beginParse();
    const _uint8_int = core_1.Dictionary.load(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigInt(257), sc_11);
    const _uint8_int8 = core_1.Dictionary.load(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Int(8), sc_11);
    const _uint8_int42 = core_1.Dictionary.load(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigInt(42), sc_11);
    const sc_12 = sc_11.loadRef().beginParse();
    const _uint8_int256 = core_1.Dictionary.load(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigInt(256), sc_12);
    const _uint8_uint8 = core_1.Dictionary.load(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Uint(8), sc_12);
    const _uint8_uint42 = core_1.Dictionary.load(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigUint(42), sc_12);
    const sc_13 = sc_12.loadRef().beginParse();
    const _uint8_uint256 = core_1.Dictionary.load(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigUint(256), sc_13);
    const _uint8_coins = core_1.Dictionary.load(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigVarUint(4), sc_13);
    const _uint42_int = core_1.Dictionary.load(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigInt(257), sc_13);
    const sc_14 = sc_13.loadRef().beginParse();
    const _uint42_int8 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.Int(8), sc_14);
    const _uint42_int42 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigInt(42), sc_14);
    const _uint42_int256 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigInt(256), sc_14);
    const sc_15 = sc_14.loadRef().beginParse();
    const _uint42_uint8 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.Uint(8), sc_15);
    const _uint42_uint42 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigUint(42), sc_15);
    const _uint42_uint256 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigUint(256), sc_15);
    const sc_16 = sc_15.loadRef().beginParse();
    const _uint42_coins = core_1.Dictionary.load(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigVarUint(4), sc_16);
    const _uint256_int = core_1.Dictionary.load(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigInt(257), sc_16);
    const _uint256_int8 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.Int(8), sc_16);
    const sc_17 = sc_16.loadRef().beginParse();
    const _uint256_int42 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigInt(42), sc_17);
    const _uint256_int256 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigInt(256), sc_17);
    const _uint256_uint8 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.Uint(8), sc_17);
    const sc_18 = sc_17.loadRef().beginParse();
    const _uint256_uint42 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigUint(42), sc_18);
    const _uint256_uint256 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigUint(256), sc_18);
    const _uint256_coins = core_1.Dictionary.load(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigVarUint(4), sc_18);
    const sc_19 = sc_18.loadRef().beginParse();
    const _address_int = core_1.Dictionary.load(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(257), sc_19);
    const _address_int8 = core_1.Dictionary.load(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Int(8), sc_19);
    const _address_int42 = core_1.Dictionary.load(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(42), sc_19);
    const sc_20 = sc_19.loadRef().beginParse();
    const _address_int256 = core_1.Dictionary.load(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(256), sc_20);
    const _address_uint8 = core_1.Dictionary.load(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Uint(8), sc_20);
    const _address_uint42 = core_1.Dictionary.load(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigUint(42), sc_20);
    const sc_21 = sc_20.loadRef().beginParse();
    const _address_uint256 = core_1.Dictionary.load(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigUint(256), sc_21);
    const _address_coins = core_1.Dictionary.load(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigVarUint(4), sc_21);
    return { $$type: 'MapTestContract$Data', int_int: _int_int, int_int8: _int_int8, int_int42: _int_int42, int_int256: _int_int256, int_uint8: _int_uint8, int_uint42: _int_uint42, int_uint256: _int_uint256, int_coins: _int_coins, int8_int: _int8_int, int8_int8: _int8_int8, int8_int42: _int8_int42, int8_int256: _int8_int256, int8_uint8: _int8_uint8, int8_uint42: _int8_uint42, int8_uint256: _int8_uint256, int8_coins: _int8_coins, int42_int: _int42_int, int42_int8: _int42_int8, int42_int42: _int42_int42, int42_int256: _int42_int256, int42_uint8: _int42_uint8, int42_uint42: _int42_uint42, int42_uint256: _int42_uint256, int42_coins: _int42_coins, int256_int: _int256_int, int256_int8: _int256_int8, int256_int42: _int256_int42, int256_int256: _int256_int256, int256_uint8: _int256_uint8, int256_uint42: _int256_uint42, int256_uint256: _int256_uint256, int256_coins: _int256_coins, uint8_int: _uint8_int, uint8_int8: _uint8_int8, uint8_int42: _uint8_int42, uint8_int256: _uint8_int256, uint8_uint8: _uint8_uint8, uint8_uint42: _uint8_uint42, uint8_uint256: _uint8_uint256, uint8_coins: _uint8_coins, uint42_int: _uint42_int, uint42_int8: _uint42_int8, uint42_int42: _uint42_int42, uint42_int256: _uint42_int256, uint42_uint8: _uint42_uint8, uint42_uint42: _uint42_uint42, uint42_uint256: _uint42_uint256, uint42_coins: _uint42_coins, uint256_int: _uint256_int, uint256_int8: _uint256_int8, uint256_int42: _uint256_int42, uint256_int256: _uint256_int256, uint256_uint8: _uint256_uint8, uint256_uint42: _uint256_uint42, uint256_uint256: _uint256_uint256, uint256_coins: _uint256_coins, address_int: _address_int, address_int8: _address_int8, address_int42: _address_int42, address_int256: _address_int256, address_uint8: _address_uint8, address_uint42: _address_uint42, address_uint256: _address_uint256, address_coins: _address_coins };
}
function loadTupleMapTestContract$Data(source) {
    const _int_int = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _int_int8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Int(8), source.readCellOpt());
    const _int_int42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(42), source.readCellOpt());
    const _int_int256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(256), source.readCellOpt());
    const _int_uint8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Uint(8), source.readCellOpt());
    const _int_uint42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigUint(42), source.readCellOpt());
    const _int_uint256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigUint(256), source.readCellOpt());
    const _int_coins = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _int8_int = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _int8_int8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.Int(8), source.readCellOpt());
    const _int8_int42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigInt(42), source.readCellOpt());
    const _int8_int256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigInt(256), source.readCellOpt());
    const _int8_uint8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.Uint(8), source.readCellOpt());
    const _int8_uint42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigUint(42), source.readCellOpt());
    source = source.readTuple();
    const _int8_uint256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigUint(256), source.readCellOpt());
    const _int8_coins = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _int42_int = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _int42_int8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.Int(8), source.readCellOpt());
    const _int42_int42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigInt(42), source.readCellOpt());
    const _int42_int256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigInt(256), source.readCellOpt());
    const _int42_uint8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.Uint(8), source.readCellOpt());
    const _int42_uint42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigUint(42), source.readCellOpt());
    const _int42_uint256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigUint(256), source.readCellOpt());
    const _int42_coins = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _int256_int = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _int256_int8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.Int(8), source.readCellOpt());
    const _int256_int42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigInt(42), source.readCellOpt());
    const _int256_int256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigInt(256), source.readCellOpt());
    source = source.readTuple();
    const _int256_uint8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.Uint(8), source.readCellOpt());
    const _int256_uint42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigUint(42), source.readCellOpt());
    const _int256_uint256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigUint(256), source.readCellOpt());
    const _int256_coins = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _uint8_int = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _uint8_int8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Int(8), source.readCellOpt());
    const _uint8_int42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigInt(42), source.readCellOpt());
    const _uint8_int256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigInt(256), source.readCellOpt());
    const _uint8_uint8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Uint(8), source.readCellOpt());
    const _uint8_uint42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigUint(42), source.readCellOpt());
    const _uint8_uint256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigUint(256), source.readCellOpt());
    const _uint8_coins = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _uint42_int = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _uint42_int8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.Int(8), source.readCellOpt());
    source = source.readTuple();
    const _uint42_int42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigInt(42), source.readCellOpt());
    const _uint42_int256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigInt(256), source.readCellOpt());
    const _uint42_uint8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.Uint(8), source.readCellOpt());
    const _uint42_uint42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigUint(42), source.readCellOpt());
    const _uint42_uint256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigUint(256), source.readCellOpt());
    const _uint42_coins = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _uint256_int = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _uint256_int8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.Int(8), source.readCellOpt());
    const _uint256_int42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigInt(42), source.readCellOpt());
    const _uint256_int256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigInt(256), source.readCellOpt());
    const _uint256_uint8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.Uint(8), source.readCellOpt());
    const _uint256_uint42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigUint(42), source.readCellOpt());
    const _uint256_uint256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigUint(256), source.readCellOpt());
    const _uint256_coins = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigVarUint(4), source.readCellOpt());
    source = source.readTuple();
    const _address_int = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _address_int8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Int(8), source.readCellOpt());
    const _address_int42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(42), source.readCellOpt());
    const _address_int256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(256), source.readCellOpt());
    const _address_uint8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Uint(8), source.readCellOpt());
    const _address_uint42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigUint(42), source.readCellOpt());
    const _address_uint256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigUint(256), source.readCellOpt());
    const _address_coins = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigVarUint(4), source.readCellOpt());
    return { $$type: 'MapTestContract$Data', int_int: _int_int, int_int8: _int_int8, int_int42: _int_int42, int_int256: _int_int256, int_uint8: _int_uint8, int_uint42: _int_uint42, int_uint256: _int_uint256, int_coins: _int_coins, int8_int: _int8_int, int8_int8: _int8_int8, int8_int42: _int8_int42, int8_int256: _int8_int256, int8_uint8: _int8_uint8, int8_uint42: _int8_uint42, int8_uint256: _int8_uint256, int8_coins: _int8_coins, int42_int: _int42_int, int42_int8: _int42_int8, int42_int42: _int42_int42, int42_int256: _int42_int256, int42_uint8: _int42_uint8, int42_uint42: _int42_uint42, int42_uint256: _int42_uint256, int42_coins: _int42_coins, int256_int: _int256_int, int256_int8: _int256_int8, int256_int42: _int256_int42, int256_int256: _int256_int256, int256_uint8: _int256_uint8, int256_uint42: _int256_uint42, int256_uint256: _int256_uint256, int256_coins: _int256_coins, uint8_int: _uint8_int, uint8_int8: _uint8_int8, uint8_int42: _uint8_int42, uint8_int256: _uint8_int256, uint8_uint8: _uint8_uint8, uint8_uint42: _uint8_uint42, uint8_uint256: _uint8_uint256, uint8_coins: _uint8_coins, uint42_int: _uint42_int, uint42_int8: _uint42_int8, uint42_int42: _uint42_int42, uint42_int256: _uint42_int256, uint42_uint8: _uint42_uint8, uint42_uint42: _uint42_uint42, uint42_uint256: _uint42_uint256, uint42_coins: _uint42_coins, uint256_int: _uint256_int, uint256_int8: _uint256_int8, uint256_int42: _uint256_int42, uint256_int256: _uint256_int256, uint256_uint8: _uint256_uint8, uint256_uint42: _uint256_uint42, uint256_uint256: _uint256_uint256, uint256_coins: _uint256_coins, address_int: _address_int, address_int8: _address_int8, address_int42: _address_int42, address_int256: _address_int256, address_uint8: _address_uint8, address_uint42: _address_uint42, address_uint256: _address_uint256, address_coins: _address_coins };
}
function loadGetterTupleMapTestContract$Data(source) {
    const _int_int = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _int_int8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Int(8), source.readCellOpt());
    const _int_int42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(42), source.readCellOpt());
    const _int_int256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(256), source.readCellOpt());
    const _int_uint8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Uint(8), source.readCellOpt());
    const _int_uint42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigUint(42), source.readCellOpt());
    const _int_uint256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigUint(256), source.readCellOpt());
    const _int_coins = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _int8_int = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _int8_int8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.Int(8), source.readCellOpt());
    const _int8_int42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigInt(42), source.readCellOpt());
    const _int8_int256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigInt(256), source.readCellOpt());
    const _int8_uint8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.Uint(8), source.readCellOpt());
    const _int8_uint42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigUint(42), source.readCellOpt());
    const _int8_uint256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigUint(256), source.readCellOpt());
    const _int8_coins = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _int42_int = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _int42_int8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.Int(8), source.readCellOpt());
    const _int42_int42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigInt(42), source.readCellOpt());
    const _int42_int256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigInt(256), source.readCellOpt());
    const _int42_uint8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.Uint(8), source.readCellOpt());
    const _int42_uint42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigUint(42), source.readCellOpt());
    const _int42_uint256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigUint(256), source.readCellOpt());
    const _int42_coins = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _int256_int = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _int256_int8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.Int(8), source.readCellOpt());
    const _int256_int42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigInt(42), source.readCellOpt());
    const _int256_int256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigInt(256), source.readCellOpt());
    const _int256_uint8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.Uint(8), source.readCellOpt());
    const _int256_uint42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigUint(42), source.readCellOpt());
    const _int256_uint256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigUint(256), source.readCellOpt());
    const _int256_coins = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _uint8_int = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _uint8_int8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Int(8), source.readCellOpt());
    const _uint8_int42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigInt(42), source.readCellOpt());
    const _uint8_int256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigInt(256), source.readCellOpt());
    const _uint8_uint8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Uint(8), source.readCellOpt());
    const _uint8_uint42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigUint(42), source.readCellOpt());
    const _uint8_uint256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigUint(256), source.readCellOpt());
    const _uint8_coins = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _uint42_int = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _uint42_int8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.Int(8), source.readCellOpt());
    const _uint42_int42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigInt(42), source.readCellOpt());
    const _uint42_int256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigInt(256), source.readCellOpt());
    const _uint42_uint8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.Uint(8), source.readCellOpt());
    const _uint42_uint42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigUint(42), source.readCellOpt());
    const _uint42_uint256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigUint(256), source.readCellOpt());
    const _uint42_coins = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _uint256_int = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _uint256_int8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.Int(8), source.readCellOpt());
    const _uint256_int42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigInt(42), source.readCellOpt());
    const _uint256_int256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigInt(256), source.readCellOpt());
    const _uint256_uint8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.Uint(8), source.readCellOpt());
    const _uint256_uint42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigUint(42), source.readCellOpt());
    const _uint256_uint256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigUint(256), source.readCellOpt());
    const _uint256_coins = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigVarUint(4), source.readCellOpt());
    const _address_int = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _address_int8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Int(8), source.readCellOpt());
    const _address_int42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(42), source.readCellOpt());
    const _address_int256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(256), source.readCellOpt());
    const _address_uint8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Uint(8), source.readCellOpt());
    const _address_uint42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigUint(42), source.readCellOpt());
    const _address_uint256 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigUint(256), source.readCellOpt());
    const _address_coins = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigVarUint(4), source.readCellOpt());
    return { $$type: 'MapTestContract$Data', int_int: _int_int, int_int8: _int_int8, int_int42: _int_int42, int_int256: _int_int256, int_uint8: _int_uint8, int_uint42: _int_uint42, int_uint256: _int_uint256, int_coins: _int_coins, int8_int: _int8_int, int8_int8: _int8_int8, int8_int42: _int8_int42, int8_int256: _int8_int256, int8_uint8: _int8_uint8, int8_uint42: _int8_uint42, int8_uint256: _int8_uint256, int8_coins: _int8_coins, int42_int: _int42_int, int42_int8: _int42_int8, int42_int42: _int42_int42, int42_int256: _int42_int256, int42_uint8: _int42_uint8, int42_uint42: _int42_uint42, int42_uint256: _int42_uint256, int42_coins: _int42_coins, int256_int: _int256_int, int256_int8: _int256_int8, int256_int42: _int256_int42, int256_int256: _int256_int256, int256_uint8: _int256_uint8, int256_uint42: _int256_uint42, int256_uint256: _int256_uint256, int256_coins: _int256_coins, uint8_int: _uint8_int, uint8_int8: _uint8_int8, uint8_int42: _uint8_int42, uint8_int256: _uint8_int256, uint8_uint8: _uint8_uint8, uint8_uint42: _uint8_uint42, uint8_uint256: _uint8_uint256, uint8_coins: _uint8_coins, uint42_int: _uint42_int, uint42_int8: _uint42_int8, uint42_int42: _uint42_int42, uint42_int256: _uint42_int256, uint42_uint8: _uint42_uint8, uint42_uint42: _uint42_uint42, uint42_uint256: _uint42_uint256, uint42_coins: _uint42_coins, uint256_int: _uint256_int, uint256_int8: _uint256_int8, uint256_int42: _uint256_int42, uint256_int256: _uint256_int256, uint256_uint8: _uint256_uint8, uint256_uint42: _uint256_uint42, uint256_uint256: _uint256_uint256, uint256_coins: _uint256_coins, address_int: _address_int, address_int8: _address_int8, address_int42: _address_int42, address_int256: _address_int256, address_uint8: _address_uint8, address_uint42: _address_uint42, address_uint256: _address_uint256, address_coins: _address_coins };
}
function storeTupleMapTestContract$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeCell(source.int_int.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int_int, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.int_int8.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int_int8, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Int(8)).endCell() : null);
    builder.writeCell(source.int_int42.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int_int42, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(42)).endCell() : null);
    builder.writeCell(source.int_int256.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int_int256, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(256)).endCell() : null);
    builder.writeCell(source.int_uint8.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int_uint8, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Uint(8)).endCell() : null);
    builder.writeCell(source.int_uint42.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int_uint42, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigUint(42)).endCell() : null);
    builder.writeCell(source.int_uint256.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int_uint256, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigUint(256)).endCell() : null);
    builder.writeCell(source.int_coins.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int_coins, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeCell(source.int8_int.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int8_int, core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.int8_int8.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int8_int8, core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.Int(8)).endCell() : null);
    builder.writeCell(source.int8_int42.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int8_int42, core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigInt(42)).endCell() : null);
    builder.writeCell(source.int8_int256.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int8_int256, core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigInt(256)).endCell() : null);
    builder.writeCell(source.int8_uint8.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int8_uint8, core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.Uint(8)).endCell() : null);
    builder.writeCell(source.int8_uint42.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int8_uint42, core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigUint(42)).endCell() : null);
    builder.writeCell(source.int8_uint256.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int8_uint256, core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigUint(256)).endCell() : null);
    builder.writeCell(source.int8_coins.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int8_coins, core_1.Dictionary.Keys.Int(8), core_1.Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeCell(source.int42_int.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int42_int, core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.int42_int8.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int42_int8, core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.Int(8)).endCell() : null);
    builder.writeCell(source.int42_int42.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int42_int42, core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigInt(42)).endCell() : null);
    builder.writeCell(source.int42_int256.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int42_int256, core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigInt(256)).endCell() : null);
    builder.writeCell(source.int42_uint8.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int42_uint8, core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.Uint(8)).endCell() : null);
    builder.writeCell(source.int42_uint42.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int42_uint42, core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigUint(42)).endCell() : null);
    builder.writeCell(source.int42_uint256.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int42_uint256, core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigUint(256)).endCell() : null);
    builder.writeCell(source.int42_coins.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int42_coins, core_1.Dictionary.Keys.BigInt(42), core_1.Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeCell(source.int256_int.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int256_int, core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.int256_int8.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int256_int8, core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.Int(8)).endCell() : null);
    builder.writeCell(source.int256_int42.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int256_int42, core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigInt(42)).endCell() : null);
    builder.writeCell(source.int256_int256.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int256_int256, core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigInt(256)).endCell() : null);
    builder.writeCell(source.int256_uint8.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int256_uint8, core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.Uint(8)).endCell() : null);
    builder.writeCell(source.int256_uint42.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int256_uint42, core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigUint(42)).endCell() : null);
    builder.writeCell(source.int256_uint256.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int256_uint256, core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigUint(256)).endCell() : null);
    builder.writeCell(source.int256_coins.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.int256_coins, core_1.Dictionary.Keys.BigInt(256), core_1.Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeCell(source.uint8_int.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint8_int, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.uint8_int8.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint8_int8, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Int(8)).endCell() : null);
    builder.writeCell(source.uint8_int42.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint8_int42, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigInt(42)).endCell() : null);
    builder.writeCell(source.uint8_int256.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint8_int256, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigInt(256)).endCell() : null);
    builder.writeCell(source.uint8_uint8.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint8_uint8, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Uint(8)).endCell() : null);
    builder.writeCell(source.uint8_uint42.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint8_uint42, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigUint(42)).endCell() : null);
    builder.writeCell(source.uint8_uint256.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint8_uint256, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigUint(256)).endCell() : null);
    builder.writeCell(source.uint8_coins.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint8_coins, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeCell(source.uint42_int.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint42_int, core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.uint42_int8.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint42_int8, core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.Int(8)).endCell() : null);
    builder.writeCell(source.uint42_int42.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint42_int42, core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigInt(42)).endCell() : null);
    builder.writeCell(source.uint42_int256.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint42_int256, core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigInt(256)).endCell() : null);
    builder.writeCell(source.uint42_uint8.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint42_uint8, core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.Uint(8)).endCell() : null);
    builder.writeCell(source.uint42_uint42.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint42_uint42, core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigUint(42)).endCell() : null);
    builder.writeCell(source.uint42_uint256.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint42_uint256, core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigUint(256)).endCell() : null);
    builder.writeCell(source.uint42_coins.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint42_coins, core_1.Dictionary.Keys.BigUint(42), core_1.Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeCell(source.uint256_int.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint256_int, core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.uint256_int8.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint256_int8, core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.Int(8)).endCell() : null);
    builder.writeCell(source.uint256_int42.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint256_int42, core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigInt(42)).endCell() : null);
    builder.writeCell(source.uint256_int256.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint256_int256, core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigInt(256)).endCell() : null);
    builder.writeCell(source.uint256_uint8.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint256_uint8, core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.Uint(8)).endCell() : null);
    builder.writeCell(source.uint256_uint42.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint256_uint42, core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigUint(42)).endCell() : null);
    builder.writeCell(source.uint256_uint256.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint256_uint256, core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigUint(256)).endCell() : null);
    builder.writeCell(source.uint256_coins.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.uint256_coins, core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.BigVarUint(4)).endCell() : null);
    builder.writeCell(source.address_int.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.address_int, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.address_int8.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.address_int8, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Int(8)).endCell() : null);
    builder.writeCell(source.address_int42.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.address_int42, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(42)).endCell() : null);
    builder.writeCell(source.address_int256.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.address_int256, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(256)).endCell() : null);
    builder.writeCell(source.address_uint8.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.address_uint8, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Uint(8)).endCell() : null);
    builder.writeCell(source.address_uint42.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.address_uint42, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigUint(42)).endCell() : null);
    builder.writeCell(source.address_uint256.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.address_uint256, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigUint(256)).endCell() : null);
    builder.writeCell(source.address_coins.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.address_coins, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigVarUint(4)).endCell() : null);
    return builder.build();
}
function dictValueParserMapTestContract$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMapTestContract$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMapTestContract$Data(src.loadRef().beginParse());
        }
    };
}
function initMapTestContract_init_args(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
async function MapTestContract_init() {
    const __code = core_1.Cell.fromBase64('te6ccgECywEAVqoAART/APSkE/S88sgLAQIBYgIDBKrQAdBy1yHSANIA+kAhEDRQZm8E+GEC+GLbPBFBml8PXw9fD18PXwXgcFZA10kgwh+XMRFA0x8RQd4hghBR8YGRuuMCIYIQSyu+f7rjAiGCEJ8VzZa6swQFBgIBIA4PAvpbET/bPFcQgQEBIAIRTwJWEFKSIW6VW1n0WjCYyAHPAEEz9ELiEUyBAQFT9nghbpVbWfRaMJjIAc8AQTP0QuIRS4EBAVP1gCohbpVbWfRaMJjIAc8AQTP0QuIRSoEBAVP0gwchbpVbWfRaMJjIAc8AQTP0QuIRSYEBAVPzeDkYAv5bET/bPDhSYBFGgQEB9FowUmARRYEBAfRaMFJgEUSBAQH0WjBSYBFDgQEB9FowUmARQoEBAfRaMFJgEUGBAQH0WjBSYBFAgQEB9FowET4WgQEB9FowUkARPXj0WjBSQBE8ePRaMFJAETt49FowUkAROnj0WjBSQBE5ePRaMFJABwgD/o99WxE/2zxXEIEBASACEU8CVhBSkiFulFtZ9FqYyAHPAEEz9EriMBFMgQEBU/Z4IW6UW1n0WpjIAc8AQTP0SuIwEUuBAQFT9YAqIW6UW1n0WpjIAc8AQTP0SuIwEUqBAQFT9IMHIW6UW1n0WpjIAc8AQTP0SuIwEUmBAQFT83g5KCkAZIEBAdcAgQEB1wCBAQHXANQB0IEBAdcAgQEB1wCBAQHXANQw0IEBAdcA+kAwEFgQVxBWAf4ROHj0WjBSQBE3ePRaMBE1FHj0WjBSIBE0gCr0WjBSIBEzgCr0WjBSIBEygCr0WjBSIBExgCr0WjBSIBEwgCr0WjBSIBEvgCr0WjBSIBEugCr0WjARLBKAKvRaMFIQESuDB/RaMFIQESqDB/RaMFIQESmDB/RaMFIQESiDB/RaCQH8MFIQESeDB/RaMFIQESaDB/RaMFIQESWDB/RaMBEjgwf0WjBSEBEiePRbMFIQESF49FswUhARIHj0WzBSEBEfePRbMFIQER549FswUhARHXj0WzBSEBEcePRbMBEaePRbMFIQERmAKvRbMFIQERiAKvRbMFIQEReAKvRbMFIQCgH+ERaAKvRbMFIQERWAKvRbMFIQERSAKvRbMFIQEROAKvRbMBERgCr0WzBWPwEREIMH9FswVj9QD4MH9FswVj9QDoMH9FswVj9QDYMH9FswVj9QDIMH9FswVj9QC4MH9FswVj9QCoMH9FswARE/AQiDB/RbMFY+UAeBAQv0WTBWPgsB+FAGgQEL9FkwVj5QBYEBC/RZMFY+UASBAQv0WTBWPlADgQEL9FkwVj5YgQEL9FkwVj4BEUCBAQv0WTABET4BEUCBAQv0WTARPBE/ETwROxE+ETsROhE9EToRORE8ETkROBE7ETgRNxE6ETcRNhE5ETYRNRE4ETURNBE3ETQMAfwRMxE2ETMRMhE1ETIRMRE0ETERMBEzETARLxEyES8RLhExES4RLREwES0RLBEvESwRKxEuESsRKhEtESoRKREsESkRKBErESgRJxEqEScRJhEpESYRJREoESURJBEnESQRIxEmESMRIhElESIRIREkESERIBEjESARHxEiER8NAfoRHhEhER4RHREgER0RHBEfERwRGxEeERsRGhEdERoRGREcERkRGBEbERgRFxEaERcRFhEZERYRFREYERURFBEXERQRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK0QnBCLEHoQaRBYEEcQNkVAE14CASAQEQIBIBQVAgFIY2QCAVgSEwL5sMg2zwRPxFPET8RPhFOET4RPRFNET0RPBFMETwROxFLETsROhFKEToRORFJETkROBFIETgRNxFHETcRNhFGETYRNRFFETURNBFEETQRMxFDETMRMhFCETIRMRFBETERMBFAETARLxE/ES8RLhE+ES4RLRE9ES0RLBE8ESyCzigIBIK6vA/m4HA2zzbPFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0CLMWsQP5uJ69s82zxXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAV0BXQFdAizsLEB9lY/blY/blY/blY/blY/blY/blY/blY/blY/blY/blY/blY/blY/blY/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AcgizwHJ0FBD9CpvoeKUWNcBMJMwMW3iMAIRQQKBAQtQklUB9CBuljBZ9GJvoZzIAfoCydBBM/Qqb6Hik/oAMJIwbeIwETwRPxE8ETsRPhE7EToRPRE6ETkRPBE5ETgROxE4ETcROhE3ETgRORE4ETUROBE1ETQRNxE0ETMRNhEzETIRNREyETERNBExETARMxEwES8RMhEvES8RMREvVgH0ES0RMBEtESwRLxEsESsRLhErESoRLREqESkRLBEpESgRKxEoEScRKhEnAREpARElESgRJREkEScRJBEjESYRIxEiESURIhEhESQRIREgESMRIBEfESIRHwIRIQIRHREgER0RHBEfERwRGxEeERsRGhEdERoRGREcERlXAawRGBEbERgRFxEaERcDERkDERURGBEVERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDxESDwQREQQNERANEM8QvhCtEJwQixB6EFkQVhBFEDRBMF4B/DBXP22BAQFwIUEz9AxvoZQB1wAwkltt4iBu8tCAMBE9ET8RPRE8ET4RPBE7ET0ROxE6ETwROhE5ETsRORE4EToROBE3ETkRNxE2ETgRNhE1ETcRNRE0ETYRNBEzETURMxEyETQRMhExETMRMREwETIRMBEvETERLxEuETARLloB/BE9ET8RPRE8ET4RPBE7ET0ROxE6ETwROhE5ETsRORE4EToROBE3ETkRNxE2ETgRNhE1ETcRNRE0ETYRNBEzETURMxEyETQRMhExETMRMREwETIRMBEvETERLxEuETARLhEtES8RLREsES4RLBErES0RKxEqESwRKhEpESsRKVwB/BEtES8RLREsES4RLBErES0RKxEqESwRKhEpESsRKREoESoRKBEnESkRJxEmESgRJhElEScRJREkESYRJBEjESURIxEiESQRIhEhESMRIREgESIRIBEfESERHxEeESARHhEdER8RHREcER4RHBEbER0RGxEaERwRGhEZERsRGVsBhBEYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN9VHF4B/BEoESoRKBEnESkRJxEmESgRJhElEScRJREkESYRJBEjESURIxEiESQRIhEhESMRIREgESIRIBEfESERHxEeESARHhEdER8RHREcER4RHBEbER0RGxEaERwRGhEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFF0BSBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN9VHF4B3Mh/AcoAEUARPxE+ET0RPBE7EToRORE4ETcRNhE1ETQRMxEyETERMBEvES4RLREsESsRKhEpESgRJxEmESURJBEjESIRIREgER8RHhEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4Ns8ye1UXwHyARE/ARFA9AARPcj0AAERPAH0AAEROgH0ABE4yPQAARE3AfQAARE1AfQAETPI9AABETIB9AABETAB9AARLsj0AAERLQH0AAERKwH0ABEpyPQAAREoAfQAAREmAfQAESTI9AABESMB9AABESEB9AARH8j0AAERHgH0AGAB/AERHAH0ABEayPQAAREZAfQAAREXAfQAERXI9AABERQB9AABERIB9AAREMj0AB/0AB30AAvI9AAa9AAY9AAGyPQAFfQAE/QAAcj0ABL0ABL0AAPI9AAU9AAV9AAFyPQAF/QAF/QACMj0ABn0ABr0AArI9AAc9AAc9AANyPQAHmEB/vQAH/QAD8j0AAEREQH0AAEREQH0ABESyPQAARETAfQAAREUAfQAERTI9AABERYB9AABERYB9ADJARESzMlQDczJUAfMyVjMyQEREczJUAfMyVAIzMlQBczJUATMyVALzMlQBczJAczJUAPMyVAEzMlQBMzJUAbMyQHMyVADzMliABBYzMlYzMkBzAICcWVmAi2wXPbPNs8VxBfD1cQXw9XEF8PVxBfD4LOJAvei92zwRPxFPET8RPhFOET4RPRFNET0RPBFMETwROxFLETsROhFKEToRORFJETkROBFIETgRNxFHETcRNhFGETYRNRFFETURNBFEETQRMxFDETMRMhFCETIRMRFBETERMBFAETARLxE/ES8RLhE+ES4RLRE9ES0RLBE8ESys2cC96GjbPBE/EUcRPxE+EUYRPhE9EUURPRE8EUQRPBE7EUMROxE6EUIROhE5EUERORE4EUAROBE3ET8RNxE2ET4RNhE1ET0RNRE0ETwRNBEzETsRMxEyEToRMhExETkRMREwETgRMBEvETcRLxEuETYRLhEtETURLREsETQRLKzfgH8ESsROxEr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ADCSW23iVkGDB1YxeEEz9A5voZQB1wEwkltt4lZBgwdWMoAqxgHoQTP0Dm+hlAHXATCSW23igwcgVkNZVjQBQTP0Dm+hlAHXATCSW23igwdWQgIRNFn0Dm+hk/oAMJIwbeJWQIEBC1YzgQEBQTP0Cm+hlAHXADCSW23iVkCBAQtWNHhBM/QKb6GUAdcAMJJbbeJWQIEBC1Y1gCrHAexBM/QKb6GUAdcAMJJbbeJWQIEBC1Y2gwdBM/QKb6GUAdcAMJJbbeJWQIEBC1Y3eEEz9ApvoZQB1wEwkltt4lZAgQELVjiAKkEz9ApvoZQB1wEwkltt4lZAgQELVjmDB0Ez9ApvoZQB1wEwkltt4oEBC1ZBAhE6yAH+WfQKb6GT+gAwkjBt4hE3ET8RNxE2ET4RNhE1ET0RNRE0ETwRNBEzETsRMxEyEToRMhE3ETkRNxExETgRMREwETcRMBEvETYRLxEuETURLhEtETQRLREsETMRLBErETIRKxEvETERLxEqETARKhEpES8RKREoES4RKBEnES0RJ8kB/BEmESwRJhElESsRJREkESoRJBEoESkRKBEjESgRIxEiEScRIhEhESYRIREgESURIBEfESQRHxEeESMRHhEdESIRHREdESERHREcESARHBEbER8RGxEaER4RGhEZER0RGREYERwRGBEXERsRFxEWERoRFhEVERgRFREUERcRFMoAeBETERYRExESERUREhERERQREREQERMREA8REg8PEREPDhEQDhDfEM4QvRCsEJsQihB4EGcQVhBFEDRBMA==');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initMapTestContract_init_args({ $$type: 'MapTestContract_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const MapTestContract_errors = {
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
const MapTestContract_types = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SomeStruct", "header": null, "fields": [{ "name": "int", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bool", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "GetAllMapsResult", "header": null, "fields": [{ "name": "int_int", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int_int8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int_int42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int_int256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int_uint8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int_uint42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int_uint256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int_coins", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int8_int", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int8_int8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int8_int42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int8_int256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int8_uint8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int8_uint42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int8_uint256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int8_coins", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int42_int", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int42_int8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int42_int42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int42_int256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int42_uint8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int42_uint42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int42_uint256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int42_coins", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int256_int", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int256_int8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int256_int42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int256_int256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int256_uint8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int256_uint42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int256_uint256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int256_coins", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint8_int", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint8_int8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint8_int42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint8_int256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint8_uint8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint8_uint42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint8_uint256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint8_coins", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint42_int", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint42_int8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint42_int42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint42_int256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint42_uint8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint42_uint42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint42_uint256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint42_coins", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint256_int", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint256_int8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint256_int42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint256_int256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint256_uint8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint256_uint42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint256_uint256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint256_coins", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "address_int", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "address_int8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "address_int42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "address_int256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "address_uint8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "address_uint42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "address_uint256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "address_coins", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }] },
    { "name": "ReplaceAllMapsResult", "header": null, "fields": [{ "name": "int_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "ReplaceGetAllMapsResult", "header": null, "fields": [{ "name": "int_int", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int_int8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int_int42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int_int256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int_uint8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int_uint42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int_uint256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int_coins", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int8_int", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int8_int8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int8_int42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int8_int256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int8_uint8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int8_uint42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int8_uint256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int8_coins", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int42_int", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int42_int8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int42_int42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int42_int256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int42_uint8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int42_uint42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int42_uint256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int42_coins", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int256_int", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int256_int8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int256_int42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int256_int256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int256_uint8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int256_uint42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int256_uint256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "int256_coins", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint8_int", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint8_int8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint8_int42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint8_int256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint8_uint8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint8_uint42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint8_uint256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint8_coins", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint42_int", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint42_int8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint42_int42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint42_int256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint42_uint8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint42_uint42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint42_uint256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint42_coins", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint256_int", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint256_int8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint256_int42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint256_int256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint256_uint8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint256_uint42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint256_uint256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "uint256_coins", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "address_int", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "address_int8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "address_int42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "address_int256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "address_uint8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "address_uint42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "address_uint256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "address_coins", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }] },
    { "name": "ExistsAllMapsResult", "header": null, "fields": [{ "name": "int_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "IsEmptyAllMapsResult", "header": null, "fields": [{ "name": "int_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int8_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int42_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "int256_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint8_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint42_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "uint256_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_int", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_int8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_int42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_int256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_uint8", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_uint42", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_uint256", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "address_coins", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "AsCellAllMapsResult", "header": null, "fields": [{ "name": "int_int", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int_int8", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int_int42", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int_int256", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int_uint8", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int_uint42", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int_uint256", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int_coins", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int8_int", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int8_int8", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int8_int42", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int8_int256", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int8_uint8", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int8_uint42", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int8_uint256", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int8_coins", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int42_int", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int42_int8", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int42_int42", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int42_int256", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int42_uint8", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int42_uint42", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int42_uint256", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int42_coins", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int256_int", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int256_int8", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int256_int42", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int256_int256", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int256_uint8", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int256_uint42", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int256_uint256", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "int256_coins", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint8_int", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint8_int8", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint8_int42", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint8_int256", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint8_uint8", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint8_uint42", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint8_uint256", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint8_coins", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint42_int", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint42_int8", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint42_int42", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint42_int256", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint42_uint8", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint42_uint42", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint42_uint256", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint42_coins", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint256_int", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint256_int8", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint256_int42", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint256_int256", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint256_uint8", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint256_uint42", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint256_uint256", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "uint256_coins", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "address_int", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "address_int8", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "address_int42", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "address_int256", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "address_uint8", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "address_uint42", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "address_uint256", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "address_coins", "type": { "kind": "simple", "type": "cell", "optional": true } }] },
    { "name": "SetAllMaps", "header": 1374781841, "fields": [{ "name": "keyInt", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt42", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt256", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint42", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint256", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyAddress", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "valueInt", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "valueInt8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "valueInt42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "valueInt256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "valueUint8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "valueUint42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "valueUint256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "valueCoins", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }] },
    { "name": "DelAllMaps", "header": 1261158015, "fields": [{ "name": "keyInt", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt42", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt256", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint42", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint256", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyAddress", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "ReplaceAllMaps", "header": 2669006230, "fields": [{ "name": "keyInt", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt42", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt256", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint42", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint256", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyAddress", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "valueInt", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "valueInt8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "valueInt42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "valueInt256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "valueUint8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "valueUint42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "valueUint256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "valueCoins", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }] },
    { "name": "ReplaceGetAllMaps", "header": 3424045530, "fields": [{ "name": "keyInt", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt42", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt256", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint42", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint256", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyAddress", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "valueInt", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "valueInt8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "valueInt42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "valueInt256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "valueUint8", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "valueUint42", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "valueUint256", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "valueCoins", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }] },
    { "name": "CheckNullReference", "header": 2978152160, "fields": [] },
    { "name": "MapTestContract$Data", "header": null, "fields": [{ "name": "int_int", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "int_int8", "type": { "kind": "dict", "key": "int", "value": "int", "valueFormat": 8 } }, { "name": "int_int42", "type": { "kind": "dict", "key": "int", "value": "int", "valueFormat": 42 } }, { "name": "int_int256", "type": { "kind": "dict", "key": "int", "value": "int", "valueFormat": 256 } }, { "name": "int_uint8", "type": { "kind": "dict", "key": "int", "value": "uint", "valueFormat": 8 } }, { "name": "int_uint42", "type": { "kind": "dict", "key": "int", "value": "uint", "valueFormat": 42 } }, { "name": "int_uint256", "type": { "kind": "dict", "key": "int", "value": "uint", "valueFormat": 256 } }, { "name": "int_coins", "type": { "kind": "dict", "key": "int", "value": "uint", "valueFormat": "coins" } }, { "name": "int8_int", "type": { "kind": "dict", "key": "int", "keyFormat": 8, "value": "int" } }, { "name": "int8_int8", "type": { "kind": "dict", "key": "int", "keyFormat": 8, "value": "int", "valueFormat": 8 } }, { "name": "int8_int42", "type": { "kind": "dict", "key": "int", "keyFormat": 8, "value": "int", "valueFormat": 42 } }, { "name": "int8_int256", "type": { "kind": "dict", "key": "int", "keyFormat": 8, "value": "int", "valueFormat": 256 } }, { "name": "int8_uint8", "type": { "kind": "dict", "key": "int", "keyFormat": 8, "value": "uint", "valueFormat": 8 } }, { "name": "int8_uint42", "type": { "kind": "dict", "key": "int", "keyFormat": 8, "value": "uint", "valueFormat": 42 } }, { "name": "int8_uint256", "type": { "kind": "dict", "key": "int", "keyFormat": 8, "value": "uint", "valueFormat": 256 } }, { "name": "int8_coins", "type": { "kind": "dict", "key": "int", "keyFormat": 8, "value": "uint", "valueFormat": "coins" } }, { "name": "int42_int", "type": { "kind": "dict", "key": "int", "keyFormat": 42, "value": "int" } }, { "name": "int42_int8", "type": { "kind": "dict", "key": "int", "keyFormat": 42, "value": "int", "valueFormat": 8 } }, { "name": "int42_int42", "type": { "kind": "dict", "key": "int", "keyFormat": 42, "value": "int", "valueFormat": 42 } }, { "name": "int42_int256", "type": { "kind": "dict", "key": "int", "keyFormat": 42, "value": "int", "valueFormat": 256 } }, { "name": "int42_uint8", "type": { "kind": "dict", "key": "int", "keyFormat": 42, "value": "uint", "valueFormat": 8 } }, { "name": "int42_uint42", "type": { "kind": "dict", "key": "int", "keyFormat": 42, "value": "uint", "valueFormat": 42 } }, { "name": "int42_uint256", "type": { "kind": "dict", "key": "int", "keyFormat": 42, "value": "uint", "valueFormat": 256 } }, { "name": "int42_coins", "type": { "kind": "dict", "key": "int", "keyFormat": 42, "value": "uint", "valueFormat": "coins" } }, { "name": "int256_int", "type": { "kind": "dict", "key": "int", "keyFormat": 256, "value": "int" } }, { "name": "int256_int8", "type": { "kind": "dict", "key": "int", "keyFormat": 256, "value": "int", "valueFormat": 8 } }, { "name": "int256_int42", "type": { "kind": "dict", "key": "int", "keyFormat": 256, "value": "int", "valueFormat": 42 } }, { "name": "int256_int256", "type": { "kind": "dict", "key": "int", "keyFormat": 256, "value": "int", "valueFormat": 256 } }, { "name": "int256_uint8", "type": { "kind": "dict", "key": "int", "keyFormat": 256, "value": "uint", "valueFormat": 8 } }, { "name": "int256_uint42", "type": { "kind": "dict", "key": "int", "keyFormat": 256, "value": "uint", "valueFormat": 42 } }, { "name": "int256_uint256", "type": { "kind": "dict", "key": "int", "keyFormat": 256, "value": "uint", "valueFormat": 256 } }, { "name": "int256_coins", "type": { "kind": "dict", "key": "int", "keyFormat": 256, "value": "uint", "valueFormat": "coins" } }, { "name": "uint8_int", "type": { "kind": "dict", "key": "uint", "keyFormat": 8, "value": "int" } }, { "name": "uint8_int8", "type": { "kind": "dict", "key": "uint", "keyFormat": 8, "value": "int", "valueFormat": 8 } }, { "name": "uint8_int42", "type": { "kind": "dict", "key": "uint", "keyFormat": 8, "value": "int", "valueFormat": 42 } }, { "name": "uint8_int256", "type": { "kind": "dict", "key": "uint", "keyFormat": 8, "value": "int", "valueFormat": 256 } }, { "name": "uint8_uint8", "type": { "kind": "dict", "key": "uint", "keyFormat": 8, "value": "uint", "valueFormat": 8 } }, { "name": "uint8_uint42", "type": { "kind": "dict", "key": "uint", "keyFormat": 8, "value": "uint", "valueFormat": 42 } }, { "name": "uint8_uint256", "type": { "kind": "dict", "key": "uint", "keyFormat": 8, "value": "uint", "valueFormat": 256 } }, { "name": "uint8_coins", "type": { "kind": "dict", "key": "uint", "keyFormat": 8, "value": "uint", "valueFormat": "coins" } }, { "name": "uint42_int", "type": { "kind": "dict", "key": "uint", "keyFormat": 42, "value": "int" } }, { "name": "uint42_int8", "type": { "kind": "dict", "key": "uint", "keyFormat": 42, "value": "int", "valueFormat": 8 } }, { "name": "uint42_int42", "type": { "kind": "dict", "key": "uint", "keyFormat": 42, "value": "int", "valueFormat": 42 } }, { "name": "uint42_int256", "type": { "kind": "dict", "key": "uint", "keyFormat": 42, "value": "int", "valueFormat": 256 } }, { "name": "uint42_uint8", "type": { "kind": "dict", "key": "uint", "keyFormat": 42, "value": "uint", "valueFormat": 8 } }, { "name": "uint42_uint42", "type": { "kind": "dict", "key": "uint", "keyFormat": 42, "value": "uint", "valueFormat": 42 } }, { "name": "uint42_uint256", "type": { "kind": "dict", "key": "uint", "keyFormat": 42, "value": "uint", "valueFormat": 256 } }, { "name": "uint42_coins", "type": { "kind": "dict", "key": "uint", "keyFormat": 42, "value": "uint", "valueFormat": "coins" } }, { "name": "uint256_int", "type": { "kind": "dict", "key": "uint", "keyFormat": 256, "value": "int" } }, { "name": "uint256_int8", "type": { "kind": "dict", "key": "uint", "keyFormat": 256, "value": "int", "valueFormat": 8 } }, { "name": "uint256_int42", "type": { "kind": "dict", "key": "uint", "keyFormat": 256, "value": "int", "valueFormat": 42 } }, { "name": "uint256_int256", "type": { "kind": "dict", "key": "uint", "keyFormat": 256, "value": "int", "valueFormat": 256 } }, { "name": "uint256_uint8", "type": { "kind": "dict", "key": "uint", "keyFormat": 256, "value": "uint", "valueFormat": 8 } }, { "name": "uint256_uint42", "type": { "kind": "dict", "key": "uint", "keyFormat": 256, "value": "uint", "valueFormat": 42 } }, { "name": "uint256_uint256", "type": { "kind": "dict", "key": "uint", "keyFormat": 256, "value": "uint", "valueFormat": 256 } }, { "name": "uint256_coins", "type": { "kind": "dict", "key": "uint", "keyFormat": 256, "value": "uint", "valueFormat": "coins" } }, { "name": "address_int", "type": { "kind": "dict", "key": "address", "value": "int" } }, { "name": "address_int8", "type": { "kind": "dict", "key": "address", "value": "int", "valueFormat": 8 } }, { "name": "address_int42", "type": { "kind": "dict", "key": "address", "value": "int", "valueFormat": 42 } }, { "name": "address_int256", "type": { "kind": "dict", "key": "address", "value": "int", "valueFormat": 256 } }, { "name": "address_uint8", "type": { "kind": "dict", "key": "address", "value": "uint", "valueFormat": 8 } }, { "name": "address_uint42", "type": { "kind": "dict", "key": "address", "value": "uint", "valueFormat": 42 } }, { "name": "address_uint256", "type": { "kind": "dict", "key": "address", "value": "uint", "valueFormat": 256 } }, { "name": "address_coins", "type": { "kind": "dict", "key": "address", "value": "uint", "valueFormat": "coins" } }] },
];
const MapTestContract_getters = [
    { "name": "allMaps", "methodId": 94363, "arguments": [], "returnType": { "kind": "simple", "type": "MapTestContract$Data", "optional": false } },
    { "name": "getAllMaps", "methodId": 96520, "arguments": [{ "name": "keyInt", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt42", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt256", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint42", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint256", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyAddress", "type": { "kind": "simple", "type": "address", "optional": false } }], "returnType": { "kind": "simple", "type": "GetAllMapsResult", "optional": false } },
    { "name": "replaceAllMaps", "methodId": 66237, "arguments": [{ "name": "keyInt", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt42", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt256", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint42", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint256", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyAddress", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "valueInt", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "valueInt8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "valueInt42", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "valueInt256", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "valueUint8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "valueUint42", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "valueUint256", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "valueCoins", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "ReplaceAllMapsResult", "optional": false } },
    { "name": "replaceGetAllMaps", "methodId": 90912, "arguments": [{ "name": "keyInt", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt42", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt256", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint42", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint256", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyAddress", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "valueInt", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "valueInt8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "valueInt42", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "valueInt256", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "valueUint8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "valueUint42", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "valueUint256", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "valueCoins", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "ReplaceGetAllMapsResult", "optional": false } },
    { "name": "existsAllMaps", "methodId": 66408, "arguments": [{ "name": "keyInt", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt42", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyInt256", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint8", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint42", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyUint256", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "keyAddress", "type": { "kind": "simple", "type": "address", "optional": false } }], "returnType": { "kind": "simple", "type": "ExistsAllMapsResult", "optional": false } },
    { "name": "isEmptyAllMaps", "methodId": 98752, "arguments": [], "returnType": { "kind": "simple", "type": "IsEmptyAllMapsResult", "optional": false } },
    { "name": "asCellAllMaps", "methodId": 117227, "arguments": [], "returnType": { "kind": "simple", "type": "AsCellAllMapsResult", "optional": false } },
    { "name": "checkNullReference", "methodId": 70003, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
];
exports.MapTestContract_getterMapping = {
    'allMaps': 'getAllMaps',
    'getAllMaps': 'getGetAllMaps',
    'replaceAllMaps': 'getReplaceAllMaps',
    'replaceGetAllMaps': 'getReplaceGetAllMaps',
    'existsAllMaps': 'getExistsAllMaps',
    'isEmptyAllMaps': 'getIsEmptyAllMaps',
    'asCellAllMaps': 'getAsCellAllMaps',
    'checkNullReference': 'getCheckNullReference',
};
const MapTestContract_receivers = [
    { "receiver": "internal", "message": { "kind": "empty" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "SetAllMaps" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "DelAllMaps" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "ReplaceAllMaps" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "ReplaceGetAllMaps" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "CheckNullReference" } },
];
class MapTestContract {
    static async init() {
        return await MapTestContract_init();
    }
    static async fromInit() {
        const __gen_init = await MapTestContract_init();
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new MapTestContract(address, __gen_init);
    }
    static fromAddress(address) {
        return new MapTestContract(address);
    }
    address;
    init;
    abi = {
        types: MapTestContract_types,
        getters: MapTestContract_getters,
        receivers: MapTestContract_receivers,
        errors: MapTestContract_errors,
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
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'SetAllMaps') {
            body = (0, core_1.beginCell)().store(storeSetAllMaps(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'DelAllMaps') {
            body = (0, core_1.beginCell)().store(storeDelAllMaps(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'ReplaceAllMaps') {
            body = (0, core_1.beginCell)().store(storeReplaceAllMaps(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'ReplaceGetAllMaps') {
            body = (0, core_1.beginCell)().store(storeReplaceGetAllMaps(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'CheckNullReference') {
            body = (0, core_1.beginCell)().store(storeCheckNullReference(message)).endCell();
        }
        if (body === null) {
            throw new Error('Invalid message type');
        }
        await provider.internal(via, { ...args, body: body });
    }
    async getAllMaps(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(94363, builder.build())).stack;
        const result = loadGetterTupleMapTestContract$Data(source);
        return result;
    }
    async getGetAllMaps(provider, keyInt, keyInt8, keyInt42, keyInt256, keyUint8, keyUint42, keyUint256, keyAddress) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(keyInt);
        builder.writeNumber(keyInt8);
        builder.writeNumber(keyInt42);
        builder.writeNumber(keyInt256);
        builder.writeNumber(keyUint8);
        builder.writeNumber(keyUint42);
        builder.writeNumber(keyUint256);
        builder.writeAddress(keyAddress);
        const source = (await provider.get(96520, builder.build())).stack;
        const result = loadGetterTupleGetAllMapsResult(source);
        return result;
    }
    async getReplaceAllMaps(provider, keyInt, keyInt8, keyInt42, keyInt256, keyUint8, keyUint42, keyUint256, keyAddress, valueInt, valueInt8, valueInt42, valueInt256, valueUint8, valueUint42, valueUint256, valueCoins) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(keyInt);
        builder.writeNumber(keyInt8);
        builder.writeNumber(keyInt42);
        builder.writeNumber(keyInt256);
        builder.writeNumber(keyUint8);
        builder.writeNumber(keyUint42);
        builder.writeNumber(keyUint256);
        builder.writeAddress(keyAddress);
        builder.writeNumber(valueInt);
        builder.writeNumber(valueInt8);
        builder.writeNumber(valueInt42);
        builder.writeNumber(valueInt256);
        builder.writeNumber(valueUint8);
        builder.writeNumber(valueUint42);
        builder.writeNumber(valueUint256);
        builder.writeNumber(valueCoins);
        const source = (await provider.get(66237, builder.build())).stack;
        const result = loadGetterTupleReplaceAllMapsResult(source);
        return result;
    }
    async getReplaceGetAllMaps(provider, keyInt, keyInt8, keyInt42, keyInt256, keyUint8, keyUint42, keyUint256, keyAddress, valueInt, valueInt8, valueInt42, valueInt256, valueUint8, valueUint42, valueUint256, valueCoins) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(keyInt);
        builder.writeNumber(keyInt8);
        builder.writeNumber(keyInt42);
        builder.writeNumber(keyInt256);
        builder.writeNumber(keyUint8);
        builder.writeNumber(keyUint42);
        builder.writeNumber(keyUint256);
        builder.writeAddress(keyAddress);
        builder.writeNumber(valueInt);
        builder.writeNumber(valueInt8);
        builder.writeNumber(valueInt42);
        builder.writeNumber(valueInt256);
        builder.writeNumber(valueUint8);
        builder.writeNumber(valueUint42);
        builder.writeNumber(valueUint256);
        builder.writeNumber(valueCoins);
        const source = (await provider.get(90912, builder.build())).stack;
        const result = loadGetterTupleReplaceGetAllMapsResult(source);
        return result;
    }
    async getExistsAllMaps(provider, keyInt, keyInt8, keyInt42, keyInt256, keyUint8, keyUint42, keyUint256, keyAddress) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(keyInt);
        builder.writeNumber(keyInt8);
        builder.writeNumber(keyInt42);
        builder.writeNumber(keyInt256);
        builder.writeNumber(keyUint8);
        builder.writeNumber(keyUint42);
        builder.writeNumber(keyUint256);
        builder.writeAddress(keyAddress);
        const source = (await provider.get(66408, builder.build())).stack;
        const result = loadGetterTupleExistsAllMapsResult(source);
        return result;
    }
    async getIsEmptyAllMaps(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(98752, builder.build())).stack;
        const result = loadGetterTupleIsEmptyAllMapsResult(source);
        return result;
    }
    async getAsCellAllMaps(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(117227, builder.build())).stack;
        const result = loadGetterTupleAsCellAllMapsResult(source);
        return result;
    }
    async getCheckNullReference(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(70003, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
}
exports.MapTestContract = MapTestContract;
