"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringsTester = exports.StringsTester_getterMapping = void 0;
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
exports.storeStringsTester$Data = storeStringsTester$Data;
exports.loadStringsTester$Data = loadStringsTester$Data;
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
function storeStringsTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
function loadStringsTester$Data(slice) {
    const sc_0 = slice;
    return { $$type: 'StringsTester$Data' };
}
function loadTupleStringsTester$Data(source) {
    return { $$type: 'StringsTester$Data' };
}
function loadGetterTupleStringsTester$Data(source) {
    return { $$type: 'StringsTester$Data' };
}
function storeTupleStringsTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserStringsTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeStringsTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadStringsTester$Data(src.loadRef().beginParse());
        }
    };
}
function initStringsTester_init_args(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
async function StringsTester_init() {
    const __code = core_1.Cell.fromBase64('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');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initStringsTester_init_args({ $$type: 'StringsTester_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const StringsTester_errors = {
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
    31733: { message: `condition can\`t be...` },
};
const StringsTester_types = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "StringsTester$Data", "header": null, "fields": [] },
];
const StringsTester_getters = [
    { "name": "constantString", "methodId": 93932, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "constantStringUnicode", "methodId": 94939, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "constantStringUnicodeLong", "methodId": 104680, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "dynamicStringCell", "methodId": 122225, "arguments": [], "returnType": { "kind": "simple", "type": "cell", "optional": false } },
    { "name": "dynamicStringCell2", "methodId": 97729, "arguments": [], "returnType": { "kind": "simple", "type": "cell", "optional": false } },
    { "name": "dynamicCommentCell", "methodId": 122531, "arguments": [], "returnType": { "kind": "simple", "type": "cell", "optional": false } },
    { "name": "dynamicCommentCellLarge", "methodId": 74771, "arguments": [], "returnType": { "kind": "simple", "type": "cell", "optional": false } },
    { "name": "dynamicCommentStringLarge", "methodId": 74191, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "stringWithNumber", "methodId": 68752, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "stringWithNegativeNumber", "methodId": 82914, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "stringWithLargeNumber", "methodId": 94811, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "stringWithFloat", "methodId": 80064, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "intToString", "methodId": 104498, "arguments": [{ "name": "x", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "floatToString", "methodId": 90680, "arguments": [{ "name": "x", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "digits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "base64", "methodId": 71427, "arguments": [], "returnType": { "kind": "simple", "type": "slice", "optional": false } },
    { "name": "processBase64", "methodId": 128362, "arguments": [{ "name": "src", "type": { "kind": "simple", "type": "string", "optional": false } }], "returnType": { "kind": "simple", "type": "slice", "optional": false } },
    { "name": "stringWithEscapedChars1", "methodId": 82062, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "stringWithEscapedChars2", "methodId": 94445, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "stringWithEscapedChars3", "methodId": 90316, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "stringWithEscapedChars4", "methodId": 69675, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "stringWithEscapedChars5", "methodId": 65546, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "stringWithEscapedChars6", "methodId": 77929, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "stringWithAddress", "methodId": 84575, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
];
exports.StringsTester_getterMapping = {
    'constantString': 'getConstantString',
    'constantStringUnicode': 'getConstantStringUnicode',
    'constantStringUnicodeLong': 'getConstantStringUnicodeLong',
    'dynamicStringCell': 'getDynamicStringCell',
    'dynamicStringCell2': 'getDynamicStringCell2',
    'dynamicCommentCell': 'getDynamicCommentCell',
    'dynamicCommentCellLarge': 'getDynamicCommentCellLarge',
    'dynamicCommentStringLarge': 'getDynamicCommentStringLarge',
    'stringWithNumber': 'getStringWithNumber',
    'stringWithNegativeNumber': 'getStringWithNegativeNumber',
    'stringWithLargeNumber': 'getStringWithLargeNumber',
    'stringWithFloat': 'getStringWithFloat',
    'intToString': 'getIntToString',
    'floatToString': 'getFloatToString',
    'base64': 'getBase64',
    'processBase64': 'getProcessBase64',
    'stringWithEscapedChars1': 'getStringWithEscapedChars1',
    'stringWithEscapedChars2': 'getStringWithEscapedChars2',
    'stringWithEscapedChars3': 'getStringWithEscapedChars3',
    'stringWithEscapedChars4': 'getStringWithEscapedChars4',
    'stringWithEscapedChars5': 'getStringWithEscapedChars5',
    'stringWithEscapedChars6': 'getStringWithEscapedChars6',
    'stringWithAddress': 'getStringWithAddress',
};
const StringsTester_receivers = [
    { "receiver": "internal", "message": { "kind": "empty" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "backtick-test" } },
];
class StringsTester {
    static async init() {
        return await StringsTester_init();
    }
    static async fromInit() {
        const __gen_init = await StringsTester_init();
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new StringsTester(address, __gen_init);
    }
    static fromAddress(address) {
        return new StringsTester(address);
    }
    address;
    init;
    abi = {
        types: StringsTester_types,
        getters: StringsTester_getters,
        receivers: StringsTester_receivers,
        errors: StringsTester_errors,
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
        if (message === "backtick-test") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) {
            throw new Error('Invalid message type');
        }
        await provider.internal(via, { ...args, body: body });
    }
    async getConstantString(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(93932, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getConstantStringUnicode(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(94939, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getConstantStringUnicodeLong(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(104680, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getDynamicStringCell(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(122225, builder.build())).stack;
        const result = source.readCell();
        return result;
    }
    async getDynamicStringCell2(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(97729, builder.build())).stack;
        const result = source.readCell();
        return result;
    }
    async getDynamicCommentCell(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(122531, builder.build())).stack;
        const result = source.readCell();
        return result;
    }
    async getDynamicCommentCellLarge(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(74771, builder.build())).stack;
        const result = source.readCell();
        return result;
    }
    async getDynamicCommentStringLarge(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(74191, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getStringWithNumber(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(68752, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getStringWithNegativeNumber(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(82914, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getStringWithLargeNumber(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(94811, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getStringWithFloat(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(80064, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getIntToString(provider, x) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(x);
        const source = (await provider.get(104498, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getFloatToString(provider, x, digits) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(x);
        builder.writeNumber(digits);
        const source = (await provider.get(90680, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getBase64(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(71427, builder.build())).stack;
        const result = source.readCell().asSlice();
        return result;
    }
    async getProcessBase64(provider, src) {
        const builder = new core_1.TupleBuilder();
        builder.writeString(src);
        const source = (await provider.get(128362, builder.build())).stack;
        const result = source.readCell().asSlice();
        return result;
    }
    async getStringWithEscapedChars1(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(82062, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getStringWithEscapedChars2(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(94445, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getStringWithEscapedChars3(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(90316, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getStringWithEscapedChars4(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(69675, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getStringWithEscapedChars5(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(65546, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getStringWithEscapedChars6(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(77929, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getStringWithAddress(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(84575, builder.build())).stack;
        const result = source.readString();
        return result;
    }
}
exports.StringsTester = StringsTester;
