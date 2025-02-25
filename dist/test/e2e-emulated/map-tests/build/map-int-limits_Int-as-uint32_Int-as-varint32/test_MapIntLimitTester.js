"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapIntLimitTester = exports.MapIntLimitTester_getterMapping = void 0;
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
exports.storeMapIntLimitTester$Data = storeMapIntLimitTester$Data;
exports.loadMapIntLimitTester$Data = loadMapIntLimitTester$Data;
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
function storeMapIntLimitTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
function loadMapIntLimitTester$Data(slice) {
    const sc_0 = slice;
    return { $$type: 'MapIntLimitTester$Data' };
}
function loadTupleMapIntLimitTester$Data(source) {
    return { $$type: 'MapIntLimitTester$Data' };
}
function loadGetterTupleMapIntLimitTester$Data(source) {
    return { $$type: 'MapIntLimitTester$Data' };
}
function storeTupleMapIntLimitTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserMapIntLimitTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMapIntLimitTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMapIntLimitTester$Data(src.loadRef().beginParse());
        }
    };
}
function initMapIntLimitTester_init_args(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
async function MapIntLimitTester_init() {
    const __code = core_1.Cell.fromBase64('te6ccgECGwEAA9MAART/APSkE/S88sgLAQIBYgIDAYbQAdBy1yHSANIA+kAhEDRQZm8E+GEC+GLbPAKRW+BwIddJIMIflTEB0x8wkTLiwAABwSGwmTDIfwHKAMntVOAw8sCCGQIBIAQFAgFYBgcCAUgTFAIBIAgJAg+07ptnm2eGMBkQAg+wpTbPNs8MYBkKAgFmCwwAJm2AIIMfWfQOb6GT+gUwkjBt4m4CDaVFtnm2eGMZDQINpDO2ebZ4YxkPAeJtgCBwhfYgbpUwWfRbMJjIAfoHQTP0Q+KBGjMhgCBwWfQOb6GT+gUwkjBt4iBu8tCAhfa68vSAIHCE9iBulTBZ9FswmMgB+gdBM/RD4oE3miGAIHBZ9A5voZP6BTCSMG3iIG7y0ICE9rry9IAghB+F9g4A1CBulTBZ9FswmMgB+gdBM/RD4oF7bCGAIIQfWfQOb6GT+gUwkjBt4iBu8tCAhfa68vSAIIQfhPYgbpUwWfRbMJjIAfoHQTP0Q+KCANndAYAghB9Z9A5voZP6BTCSMG3iIG7y0ICE9rry9H8A5I5u7aLt+20h7UHtQ+1E7UXtR5YxwAXbMTDtZ+1l7WTtY+1hcX/tEY4WgCB/cCBulTBZ9FswmMgB+gdBM/RD4u1B7fEB8v8ggCBwWfQOb6GT+gUwkjBt4m6zjhGAIHBZ9A5voZP6BTCSMG3ibpIwcOLbAQEGitsBEQH47aLt+20h7UHtQ+1E7UXtR5YxwAXbMTDtZ+1l7WTtY+1hcX/tEY42gCBwgu9/////////////////////////////////////////IG6VMFn0WzCYyAH6B0Ez9EPi7UHt8QHy/yCAIHBZ9A5voZP6BTCSMG3ibrOSMHDjDRIAIoAgcFn0Dm+hk/oFMJIwbeJuAg+1Avtnm2eGMBkVAgEgFhcA5o5v7aLt+20h7UHtQ+1E7UXtR5YxwAXbMTDtZ+1l7WTtY+1hcX/tEY4XgCBwg/YgbpUwWfRbMJjIAfoHQTP0Q+LtQe3xAfL/IIAgcFn0Dm+hk/oFMJIwbeJus44RgCBwWfQOb6GT+gUwkjBt4m6SMHDi2wECD7N99s82zwxgGRgCD7Jets82zwxgGRoAJG2AIH9Z9A5voZP6BTCSMG3ibgAU7UTQ0gAwkW3gbQDmjm/tou37bSHtQe1D7UTtRe1HljHABdsxMO1n7WXtZO1j7WFxf+0RjheAIIMfcCBulTBZ9FswmMgB+gdBM/RD4u1B7fEB8v8ggCBwWfQOb6GT+gUwkjBt4m6zjhGAIHBZ9A5voZP6BTCSMG3ibpIwcOLbAQ==');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initMapIntLimitTester_init_args({ $$type: 'MapIntLimitTester_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const MapIntLimitTester_errors = {
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
    6707: { message: `Error 1` },
    14234: { message: `Error 2` },
    31596: { message: `Error 3` },
    55773: { message: `Error 4` },
};
const MapIntLimitTester_types = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "MapIntLimitTester$Data", "header": null, "fields": [] },
];
const MapIntLimitTester_getters = [
    { "name": "testSetMinAndMaxDoesNotThrow", "methodId": 87202, "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testGetGreaterThanMax", "methodId": 82580, "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testGetSmallerThanMin", "methodId": 110071, "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testSetKeyGreaterThanMax", "methodId": 113018, "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testSetKeySmallerThanMin", "methodId": 87577, "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testSetValGreaterThanMax", "methodId": 100375, "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testSetValSmallerThanMin", "methodId": 92020, "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
];
exports.MapIntLimitTester_getterMapping = {
    'testSetMinAndMaxDoesNotThrow': 'getTestSetMinAndMaxDoesNotThrow',
    'testGetGreaterThanMax': 'getTestGetGreaterThanMax',
    'testGetSmallerThanMin': 'getTestGetSmallerThanMin',
    'testSetKeyGreaterThanMax': 'getTestSetKeyGreaterThanMax',
    'testSetKeySmallerThanMin': 'getTestSetKeySmallerThanMin',
    'testSetValGreaterThanMax': 'getTestSetValGreaterThanMax',
    'testSetValSmallerThanMin': 'getTestSetValSmallerThanMin',
};
const MapIntLimitTester_receivers = [
    { "receiver": "internal", "message": { "kind": "empty" } },
];
class MapIntLimitTester {
    static async init() {
        return await MapIntLimitTester_init();
    }
    static async fromInit() {
        const __gen_init = await MapIntLimitTester_init();
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new MapIntLimitTester(address, __gen_init);
    }
    static fromAddress(address) {
        return new MapIntLimitTester(address);
    }
    address;
    init;
    abi = {
        types: MapIntLimitTester_types,
        getters: MapIntLimitTester_getters,
        receivers: MapIntLimitTester_receivers,
        errors: MapIntLimitTester_errors,
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
    async getTestSetMinAndMaxDoesNotThrow(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(87202, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestGetGreaterThanMax(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(82580, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestGetSmallerThanMin(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(110071, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestSetKeyGreaterThanMax(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(113018, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestSetKeySmallerThanMin(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(87577, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestSetValGreaterThanMax(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(100375, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestSetValSmallerThanMin(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(92020, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
}
exports.MapIntLimitTester = MapIntLimitTester;
