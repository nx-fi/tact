"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstantTester = exports.NESTED_STRUCT = exports.SIMPLE_STRUCT = exports.SLICE = exports.CELL = exports.ADDR = exports.BOOL = exports.STRING_WITH_QUOTES = exports.STRING = exports.INT = exports.ConstantTester_getterMapping = void 0;
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
exports.storeSimpleStruct = storeSimpleStruct;
exports.loadSimpleStruct = loadSimpleStruct;
exports.storeNestedStruct = storeNestedStruct;
exports.loadNestedStruct = loadNestedStruct;
exports.storeConstantTester$Data = storeConstantTester$Data;
exports.loadConstantTester$Data = loadConstantTester$Data;
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
function storeSimpleStruct(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.value, 257);
    };
}
function loadSimpleStruct(slice) {
    const sc_0 = slice;
    const _value = sc_0.loadIntBig(257);
    return { $$type: 'SimpleStruct', value: _value };
}
function loadTupleSimpleStruct(source) {
    const _value = source.readBigNumber();
    return { $$type: 'SimpleStruct', value: _value };
}
function loadGetterTupleSimpleStruct(source) {
    const _value = source.readBigNumber();
    return { $$type: 'SimpleStruct', value: _value };
}
function storeTupleSimpleStruct(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.value);
    return builder.build();
}
function dictValueParserSimpleStruct() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSimpleStruct(src)).endCell());
        },
        parse: (src) => {
            return loadSimpleStruct(src.loadRef().beginParse());
        }
    };
}
function storeNestedStruct(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.value, 257);
        b_0.store(storeSimpleStruct(src.other));
    };
}
function loadNestedStruct(slice) {
    const sc_0 = slice;
    const _value = sc_0.loadIntBig(257);
    const _other = loadSimpleStruct(sc_0);
    return { $$type: 'NestedStruct', value: _value, other: _other };
}
function loadTupleNestedStruct(source) {
    const _value = source.readBigNumber();
    const _other = loadTupleSimpleStruct(source);
    return { $$type: 'NestedStruct', value: _value, other: _other };
}
function loadGetterTupleNestedStruct(source) {
    const _value = source.readBigNumber();
    const _other = loadGetterTupleSimpleStruct(source);
    return { $$type: 'NestedStruct', value: _value, other: _other };
}
function storeTupleNestedStruct(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.value);
    builder.writeTuple(storeTupleSimpleStruct(source.other));
    return builder.build();
}
function dictValueParserNestedStruct() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeNestedStruct(src)).endCell());
        },
        parse: (src) => {
            return loadNestedStruct(src.loadRef().beginParse());
        }
    };
}
function storeConstantTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
function loadConstantTester$Data(slice) {
    const sc_0 = slice;
    return { $$type: 'ConstantTester$Data' };
}
function loadTupleConstantTester$Data(source) {
    return { $$type: 'ConstantTester$Data' };
}
function loadGetterTupleConstantTester$Data(source) {
    return { $$type: 'ConstantTester$Data' };
}
function storeTupleConstantTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserConstantTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeConstantTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadConstantTester$Data(src.loadRef().beginParse());
        }
    };
}
function initConstantTester_init_args(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
async function ConstantTester_init() {
    const __code = core_1.Cell.fromBase64('te6ccgECMwEAAxEAAaD/ACCOQjAB0HLXIdIA0gD6QCEQNFBmbwT4YQL4Yu1E0NIAMJFtkW3iMAGRMOBwIddJIMIflTEB0x8wkTLiwAABwSGw3PLAguH0pBP0vPLICwECAnECAwIBIAQFAgEgFhcCASAGBwIBWBMUAgEgCAkCASAQEQIBIAoLAgEgDA0BIa/ZdqJoaQAYSLbItvFtnhjAEgEhrCb2omhpABhItsi28W2eGMAxAgFiDg8BIa0idqJoaQAYSLbItvFtnhjAFQEfobu1E0NIAMJFtkW3i2zwxjEBIaBvtRNDSADCRbZFt4ts8bBKJAEhsUN7UTQ0gAwkW2RbeLbPDGAaASGxi3tRNDSADCRbZFt4ts8MYBIASI0IYAQe/qqXMblNo5fl5kYi9eYzSLgSrFtHY6k/DdIB0HmNRAEhsKK7UTQ0gAwkW2RbeLbPDGAVASGw6LtRNDSADCRbZFt4ts8MYCcAGou2hlbGxvIHdvcmxkgCASAYGQIBSCUmASG28J2omhpABhItsi28W2eGMBoCAUgbHAACfwIBIB0eASGtvXaiaGkAGEi2yLbxbZ4YwDEBIKrU7UTQ0gAwkW2RbeLbPDEjAgFIHyACASAhIgEho1e1E0NIAMJFtkW3i2zxsEokAR+4LtRNDSADCRbZFt4ts8MYIwEfug7UTQ0gAwkW2RbeLbPDGDEAHovWhlbGxvICJ3b3JsZCKAAGeoALASGwSvtRNDSADCRbZFt4ts8MYCcCASApKgECiCgBFP8A9KQT9LzyyAssASGtRvaiaGkAGEi2yLbxbZ4YwCsBIa4KdqJoaQAYSLbItvFtnhjAKwEYjBX+AelIJ+l55ZAXLAIBYi0uAKbQAdBy1yHSANIA+kAhEDRQZm8E+GEC+GLtRNDSAAGU+kABMZMw+CjiApFb4HAh10kgwh+VMQHTHzCRMuLAAAHBIbCbyH8BygABzxbJ7VTgMPLAggIBSC8wASu4vU7UTQ0gABlPpAATGTMPgo4ts8MYMQEruFHe1E0NIAAZT6QAExkzD4KOLbPDGDIAAnoAAiA=');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initConstantTester_init_args({ $$type: 'ConstantTester_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const ConstantTester_errors = {
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
const ConstantTester_types = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "MessageParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "BasechainAddress", "header": null, "fields": [{ "name": "hash", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }] },
    { "name": "SimpleStruct", "header": null, "fields": [{ "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "NestedStruct", "header": null, "fields": [{ "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "other", "type": { "kind": "simple", "type": "SimpleStruct", "optional": false } }] },
    { "name": "ConstantTester$Data", "header": null, "fields": [] },
];
const ConstantTester_getters = [
    { "name": "globalInt", "methodId": 67661, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "globalString", "methodId": 72260, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "globalStringWithQuotes", "methodId": 107522, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "globalBool", "methodId": 104324, "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "globalAddress", "methodId": 67506, "arguments": [], "returnType": { "kind": "simple", "type": "address", "optional": false } },
    { "name": "globalCell", "methodId": 95138, "arguments": [], "returnType": { "kind": "simple", "type": "cell", "optional": false } },
    { "name": "globalSlice", "methodId": 121876, "arguments": [], "returnType": { "kind": "simple", "type": "slice", "optional": false } },
    { "name": "globalSimpleStruct", "methodId": 69742, "arguments": [], "returnType": { "kind": "simple", "type": "SimpleStruct", "optional": false } },
    { "name": "globalNestedStruct", "methodId": 69915, "arguments": [], "returnType": { "kind": "simple", "type": "NestedStruct", "optional": false } },
    { "name": "contractInt", "methodId": 109434, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "contractString", "methodId": 90762, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "contractStringWithQuotes", "methodId": 107220, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "contractBool", "methodId": 75021, "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "contractAddress", "methodId": 79405, "arguments": [], "returnType": { "kind": "simple", "type": "address", "optional": false } },
    { "name": "contractCell", "methodId": 114987, "arguments": [], "returnType": { "kind": "simple", "type": "cell", "optional": false } },
    { "name": "contractSlice", "methodId": 119437, "arguments": [], "returnType": { "kind": "simple", "type": "slice", "optional": false } },
    { "name": "contractSimpleStruct", "methodId": 107680, "arguments": [], "returnType": { "kind": "simple", "type": "SimpleStruct", "optional": false } },
    { "name": "contractNestedStruct", "methodId": 107989, "arguments": [], "returnType": { "kind": "simple", "type": "NestedStruct", "optional": false } },
];
exports.ConstantTester_getterMapping = {
    'globalInt': 'getGlobalInt',
    'globalString': 'getGlobalString',
    'globalStringWithQuotes': 'getGlobalStringWithQuotes',
    'globalBool': 'getGlobalBool',
    'globalAddress': 'getGlobalAddress',
    'globalCell': 'getGlobalCell',
    'globalSlice': 'getGlobalSlice',
    'globalSimpleStruct': 'getGlobalSimpleStruct',
    'globalNestedStruct': 'getGlobalNestedStruct',
    'contractInt': 'getContractInt',
    'contractString': 'getContractString',
    'contractStringWithQuotes': 'getContractStringWithQuotes',
    'contractBool': 'getContractBool',
    'contractAddress': 'getContractAddress',
    'contractCell': 'getContractCell',
    'contractSlice': 'getContractSlice',
    'contractSimpleStruct': 'getContractSimpleStruct',
    'contractNestedStruct': 'getContractNestedStruct',
};
const ConstantTester_receivers = [
    { "receiver": "internal", "message": { "kind": "empty" } },
];
exports.INT = 10n;
exports.STRING = "hello world";
exports.STRING_WITH_QUOTES = "hello \"world\"";
exports.BOOL = true;
exports.ADDR = (0, core_1.address)("EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N");
exports.CELL = core_1.Cell.fromHex("b5ee9c724101080100a4000114ff00f4a413f4bcf2c80b01020162020300a6d001d072d721d200d200fa4021103450666f04f86102f862ed44d0d2000194fa4001319330f828e202915be07021d74920c21f953101d31f309132e2c00001c121b09bc87f01ca0001cf16c9ed54e030f2c0820201480406012bb8bd4ed44d0d2000194fa4001319330f828e2db3c3180500027a012bb851ded44d0d2000194fa4001319330f828e2db3c3180700022037abbce9");
exports.SLICE = core_1.Cell.fromHex("b5ee9c724101080100a4000114ff00f4a413f4bcf2c80b01020162020300a6d001d072d721d200d200fa4021103450666f04f86102f862ed44d0d2000194fa4001319330f828e202915be07021d74920c21f953101d31f309132e2c00001c121b09bc87f01ca0001cf16c9ed54e030f2c0820201480406012bb8bd4ed44d0d2000194fa4001319330f828e2db3c3180500027a012bb851ded44d0d2000194fa4001319330f828e2db3c3180700022037abbce9").beginParse();
exports.SIMPLE_STRUCT = { $$type: "SimpleStruct", value: 10n };
exports.NESTED_STRUCT = { $$type: "NestedStruct", value: 10n, other: { $$type: "SimpleStruct", value: 11n } };
class ConstantTester {
    static INT = 10n;
    static STRING = "hello world";
    static STRING_WITH_QUOTES = "hello \"world\"";
    static BOOL = true;
    static ADDR = (0, core_1.address)("EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N");
    static CELL = core_1.Cell.fromHex("b5ee9c724101080100a4000114ff00f4a413f4bcf2c80b01020162020300a6d001d072d721d200d200fa4021103450666f04f86102f862ed44d0d2000194fa4001319330f828e202915be07021d74920c21f953101d31f309132e2c00001c121b09bc87f01ca0001cf16c9ed54e030f2c0820201480406012bb8bd4ed44d0d2000194fa4001319330f828e2db3c3180500027a012bb851ded44d0d2000194fa4001319330f828e2db3c3180700022037abbce9");
    static SLICE = core_1.Cell.fromHex("b5ee9c724101080100a4000114ff00f4a413f4bcf2c80b01020162020300a6d001d072d721d200d200fa4021103450666f04f86102f862ed44d0d2000194fa4001319330f828e202915be07021d74920c21f953101d31f309132e2c00001c121b09bc87f01ca0001cf16c9ed54e030f2c0820201480406012bb8bd4ed44d0d2000194fa4001319330f828e2db3c3180500027a012bb851ded44d0d2000194fa4001319330f828e2db3c3180700022037abbce9").beginParse();
    static SIMPLE_STRUCT = { $$type: "SimpleStruct", value: 10n };
    static NESTED_STRUCT = { $$type: "NestedStruct", value: 10n, other: { $$type: "SimpleStruct", value: 11n } };
    static storageReserve = 0n;
    static async init() {
        return await ConstantTester_init();
    }
    static async fromInit() {
        const __gen_init = await ConstantTester_init();
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new ConstantTester(address, __gen_init);
    }
    static fromAddress(address) {
        return new ConstantTester(address);
    }
    address;
    init;
    abi = {
        types: ConstantTester_types,
        getters: ConstantTester_getters,
        receivers: ConstantTester_receivers,
        errors: ConstantTester_errors,
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
    async getGlobalInt(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(67661, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGlobalString(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(72260, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getGlobalStringWithQuotes(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(107522, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getGlobalBool(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(104324, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getGlobalAddress(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(67506, builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    async getGlobalCell(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(95138, builder.build())).stack;
        const result = source.readCell();
        return result;
    }
    async getGlobalSlice(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(121876, builder.build())).stack;
        const result = source.readCell().asSlice();
        return result;
    }
    async getGlobalSimpleStruct(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(69742, builder.build())).stack;
        const result = loadGetterTupleSimpleStruct(source);
        return result;
    }
    async getGlobalNestedStruct(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(69915, builder.build())).stack;
        const result = loadGetterTupleNestedStruct(source);
        return result;
    }
    async getContractInt(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(109434, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getContractString(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(90762, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getContractStringWithQuotes(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(107220, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getContractBool(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(75021, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getContractAddress(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(79405, builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    async getContractCell(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(114987, builder.build())).stack;
        const result = source.readCell();
        return result;
    }
    async getContractSlice(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(119437, builder.build())).stack;
        const result = source.readCell().asSlice();
        return result;
    }
    async getContractSimpleStruct(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(107680, builder.build())).stack;
        const result = loadGetterTupleSimpleStruct(source);
        return result;
    }
    async getContractNestedStruct(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(107989, builder.build())).stack;
        const result = loadGetterTupleNestedStruct(source);
        return result;
    }
}
exports.ConstantTester = ConstantTester;
