"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapPropertiesTester = exports.MapPropertiesTester_getterMapping = void 0;
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
exports.storeKeyData = storeKeyData;
exports.loadKeyData = loadKeyData;
exports.storeValData = storeValData;
exports.loadValData = loadValData;
exports.storeSomeStruct = storeSomeStruct;
exports.loadSomeStruct = loadSomeStruct;
exports.storeSomeMessage = storeSomeMessage;
exports.loadSomeMessage = loadSomeMessage;
exports.storeMapPropertiesTester$Data = storeMapPropertiesTester$Data;
exports.loadMapPropertiesTester$Data = loadMapPropertiesTester$Data;
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
function storeKeyData(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src._1, 257);
        b_0.storeInt(src._2, 257);
    };
}
function loadKeyData(slice) {
    const sc_0 = slice;
    const __1 = sc_0.loadIntBig(257);
    const __2 = sc_0.loadIntBig(257);
    return { $$type: 'KeyData', _1: __1, _2: __2 };
}
function loadTupleKeyData(source) {
    const __1 = source.readBigNumber();
    const __2 = source.readBigNumber();
    return { $$type: 'KeyData', _1: __1, _2: __2 };
}
function loadGetterTupleKeyData(source) {
    const __1 = source.readBigNumber();
    const __2 = source.readBigNumber();
    return { $$type: 'KeyData', _1: __1, _2: __2 };
}
function storeTupleKeyData(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source._1);
    builder.writeNumber(source._2);
    return builder.build();
}
function dictValueParserKeyData() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeKeyData(src)).endCell());
        },
        parse: (src) => {
            return loadKeyData(src.loadRef().beginParse());
        }
    };
}
function storeValData(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.store(storeSomeMessage(src._1));
        b_0.store(storeSomeMessage(src._2));
    };
}
function loadValData(slice) {
    const sc_0 = slice;
    const __1 = loadSomeMessage(sc_0);
    const __2 = loadSomeMessage(sc_0);
    return { $$type: 'ValData', _1: __1, _2: __2 };
}
function loadTupleValData(source) {
    const __1 = loadTupleSomeMessage(source);
    const __2 = loadTupleSomeMessage(source);
    return { $$type: 'ValData', _1: __1, _2: __2 };
}
function loadGetterTupleValData(source) {
    const __1 = loadGetterTupleSomeMessage(source);
    const __2 = loadGetterTupleSomeMessage(source);
    return { $$type: 'ValData', _1: __1, _2: __2 };
}
function storeTupleValData(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeTuple(storeTupleSomeMessage(source._1));
    builder.writeTuple(storeTupleSomeMessage(source._2));
    return builder.build();
}
function dictValueParserValData() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeValData(src)).endCell());
        },
        parse: (src) => {
            return loadValData(src.loadRef().beginParse());
        }
    };
}
function storeSomeStruct(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.i, 257);
        b_0.storeBit(src.b);
        b_0.storeAddress(src.a);
        b_0.storeUint(src.u1, 256);
        const b_1 = new core_1.Builder();
        b_1.storeUint(src.u2, 255);
        b_0.storeRef(b_1.endCell());
    };
}
function loadSomeStruct(slice) {
    const sc_0 = slice;
    const _i = sc_0.loadIntBig(257);
    const _b = sc_0.loadBit();
    const _a = sc_0.loadAddress();
    const _u1 = sc_0.loadUintBig(256);
    const sc_1 = sc_0.loadRef().beginParse();
    const _u2 = sc_1.loadUintBig(255);
    return { $$type: 'SomeStruct', i: _i, b: _b, a: _a, u1: _u1, u2: _u2 };
}
function loadTupleSomeStruct(source) {
    const _i = source.readBigNumber();
    const _b = source.readBoolean();
    const _a = source.readAddress();
    const _u1 = source.readBigNumber();
    const _u2 = source.readBigNumber();
    return { $$type: 'SomeStruct', i: _i, b: _b, a: _a, u1: _u1, u2: _u2 };
}
function loadGetterTupleSomeStruct(source) {
    const _i = source.readBigNumber();
    const _b = source.readBoolean();
    const _a = source.readAddress();
    const _u1 = source.readBigNumber();
    const _u2 = source.readBigNumber();
    return { $$type: 'SomeStruct', i: _i, b: _b, a: _a, u1: _u1, u2: _u2 };
}
function storeTupleSomeStruct(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.i);
    builder.writeBoolean(source.b);
    builder.writeAddress(source.a);
    builder.writeNumber(source.u1);
    builder.writeNumber(source.u2);
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
function storeSomeMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(4660, 32);
        b_0.storeAddress(src.buyer);
        b_0.storeUint(src.nonce, 32);
    };
}
function loadSomeMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4660) {
        throw Error('Invalid prefix');
    }
    const _buyer = sc_0.loadAddress();
    const _nonce = sc_0.loadUintBig(32);
    return { $$type: 'SomeMessage', buyer: _buyer, nonce: _nonce };
}
function loadTupleSomeMessage(source) {
    const _buyer = source.readAddress();
    const _nonce = source.readBigNumber();
    return { $$type: 'SomeMessage', buyer: _buyer, nonce: _nonce };
}
function loadGetterTupleSomeMessage(source) {
    const _buyer = source.readAddress();
    const _nonce = source.readBigNumber();
    return { $$type: 'SomeMessage', buyer: _buyer, nonce: _nonce };
}
function storeTupleSomeMessage(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeAddress(source.buyer);
    builder.writeNumber(source.nonce);
    return builder.build();
}
function dictValueParserSomeMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSomeMessage(src)).endCell());
        },
        parse: (src) => {
            return loadSomeMessage(src.loadRef().beginParse());
        }
    };
}
function storeMapPropertiesTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
function loadMapPropertiesTester$Data(slice) {
    const sc_0 = slice;
    return { $$type: 'MapPropertiesTester$Data' };
}
function loadTupleMapPropertiesTester$Data(source) {
    return { $$type: 'MapPropertiesTester$Data' };
}
function loadGetterTupleMapPropertiesTester$Data(source) {
    return { $$type: 'MapPropertiesTester$Data' };
}
function storeTupleMapPropertiesTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserMapPropertiesTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMapPropertiesTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMapPropertiesTester$Data(src.loadRef().beginParse());
        }
    };
}
function initMapPropertiesTester_init_args(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
async function MapPropertiesTester_init() {
    const __code = core_1.Cell.fromBase64('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');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initMapPropertiesTester_init_args({ $$type: 'MapPropertiesTester_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const MapPropertiesTester_errors = {
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
const MapPropertiesTester_types = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "KeyData", "header": null, "fields": [{ "name": "_1", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "_2", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "ValData", "header": null, "fields": [{ "name": "_1", "type": { "kind": "simple", "type": "SomeMessage", "optional": false } }, { "name": "_2", "type": { "kind": "simple", "type": "SomeMessage", "optional": false } }] },
    { "name": "SomeStruct", "header": null, "fields": [{ "name": "i", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "a", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "u1", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }, { "name": "u2", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 255 } }] },
    { "name": "SomeMessage", "header": 4660, "fields": [{ "name": "buyer", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "nonce", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 32 } }] },
    { "name": "MapPropertiesTester$Data", "header": null, "fields": [] },
];
const MapPropertiesTester_getters = [
    { "name": "testEmptyMapGet", "methodId": 83942, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testGetDoesNotModify", "methodId": 107617, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testSetModifies", "methodId": 70361, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testSetGetSameKey", "methodId": 124233, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testSetGetNotSameKey", "methodId": 72917, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testSetIdempotent", "methodId": 114904, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testSetSetOfNotSameCommutes", "methodId": 123161, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testDelGetSameKeyPresent", "methodId": 66216, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testDelGetSameKeyMissing", "methodId": 104467, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testDelOfPresentModifies", "methodId": 70707, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testDelOfMissingDoesNotModify", "methodId": 125331, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testDelDelOfSameDoesNotModify", "methodId": 115397, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testSetDelOfMissingDoesNotModify", "methodId": 109300, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testDelSetOfSamePresent", "methodId": 107451, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testDelSetOfSameMissing", "methodId": 80128, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testDelSetOfNotSameCommutes", "methodId": 113604, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testEmptyMapSize", "methodId": 91416, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testSingletonMapSize", "methodId": 87514, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testDoubletonMapSize", "methodId": 75989, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testGetNonNullEquivalentExists", "methodId": 125207, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testEmptyMapIsEmpty", "methodId": 113933, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testNonEmptyMapsNotIsEmpty", "methodId": 126836, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testEqualsImpliesDeepEquals", "methodId": 67863, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testThereDeepEqualMapsThatAreNotEqual", "methodId": 112497, "arguments": [{ "name": "_key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "_val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testAsCellEquals", "methodId": 102963, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testAsCellDoesNothing", "methodId": 75654, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testReplaceEmptyMap", "methodId": 120102, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testReplaceDoesNotModifyIfKeyIsMissing", "methodId": 68251, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testReplaceWorksAsSetIfKeyIsPresent", "methodId": 92956, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testReplaceGetSameKeyIfPresent", "methodId": 94587, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testReplaceGetNotSameKey", "methodId": 108276, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testReplaceIdempotent", "methodId": 131067, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testReplaceReplaceOfNotSameCommutes", "methodId": 122556, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testEmptyMapReplaceGet", "methodId": 73819, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testDelReplaceGet", "methodId": 77773, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testSetReplaceGet", "methodId": 66754, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
];
exports.MapPropertiesTester_getterMapping = {
    'testEmptyMapGet': 'getTestEmptyMapGet',
    'testGetDoesNotModify': 'getTestGetDoesNotModify',
    'testSetModifies': 'getTestSetModifies',
    'testSetGetSameKey': 'getTestSetGetSameKey',
    'testSetGetNotSameKey': 'getTestSetGetNotSameKey',
    'testSetIdempotent': 'getTestSetIdempotent',
    'testSetSetOfNotSameCommutes': 'getTestSetSetOfNotSameCommutes',
    'testDelGetSameKeyPresent': 'getTestDelGetSameKeyPresent',
    'testDelGetSameKeyMissing': 'getTestDelGetSameKeyMissing',
    'testDelOfPresentModifies': 'getTestDelOfPresentModifies',
    'testDelOfMissingDoesNotModify': 'getTestDelOfMissingDoesNotModify',
    'testDelDelOfSameDoesNotModify': 'getTestDelDelOfSameDoesNotModify',
    'testSetDelOfMissingDoesNotModify': 'getTestSetDelOfMissingDoesNotModify',
    'testDelSetOfSamePresent': 'getTestDelSetOfSamePresent',
    'testDelSetOfSameMissing': 'getTestDelSetOfSameMissing',
    'testDelSetOfNotSameCommutes': 'getTestDelSetOfNotSameCommutes',
    'testEmptyMapSize': 'getTestEmptyMapSize',
    'testSingletonMapSize': 'getTestSingletonMapSize',
    'testDoubletonMapSize': 'getTestDoubletonMapSize',
    'testGetNonNullEquivalentExists': 'getTestGetNonNullEquivalentExists',
    'testEmptyMapIsEmpty': 'getTestEmptyMapIsEmpty',
    'testNonEmptyMapsNotIsEmpty': 'getTestNonEmptyMapsNotIsEmpty',
    'testEqualsImpliesDeepEquals': 'getTestEqualsImpliesDeepEquals',
    'testThereDeepEqualMapsThatAreNotEqual': 'getTestThereDeepEqualMapsThatAreNotEqual',
    'testAsCellEquals': 'getTestAsCellEquals',
    'testAsCellDoesNothing': 'getTestAsCellDoesNothing',
    'testReplaceEmptyMap': 'getTestReplaceEmptyMap',
    'testReplaceDoesNotModifyIfKeyIsMissing': 'getTestReplaceDoesNotModifyIfKeyIsMissing',
    'testReplaceWorksAsSetIfKeyIsPresent': 'getTestReplaceWorksAsSetIfKeyIsPresent',
    'testReplaceGetSameKeyIfPresent': 'getTestReplaceGetSameKeyIfPresent',
    'testReplaceGetNotSameKey': 'getTestReplaceGetNotSameKey',
    'testReplaceIdempotent': 'getTestReplaceIdempotent',
    'testReplaceReplaceOfNotSameCommutes': 'getTestReplaceReplaceOfNotSameCommutes',
    'testEmptyMapReplaceGet': 'getTestEmptyMapReplaceGet',
    'testDelReplaceGet': 'getTestDelReplaceGet',
    'testSetReplaceGet': 'getTestSetReplaceGet',
};
const MapPropertiesTester_receivers = [
    { "receiver": "internal", "message": { "kind": "empty" } },
];
class MapPropertiesTester {
    static async init() {
        return await MapPropertiesTester_init();
    }
    static async fromInit() {
        const __gen_init = await MapPropertiesTester_init();
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new MapPropertiesTester(address, __gen_init);
    }
    static fromAddress(address) {
        return new MapPropertiesTester(address);
    }
    address;
    init;
    abi = {
        types: MapPropertiesTester_types,
        getters: MapPropertiesTester_getters,
        receivers: MapPropertiesTester_receivers,
        errors: MapPropertiesTester_errors,
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
    async getTestEmptyMapGet(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(83942, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestGetDoesNotModify(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(107617, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestSetModifies(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(70361, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestSetGetSameKey(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(124233, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestSetGetNotSameKey(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(72917, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestSetIdempotent(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(114904, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestSetSetOfNotSameCommutes(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(123161, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestDelGetSameKeyPresent(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(66216, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestDelGetSameKeyMissing(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(104467, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestDelOfPresentModifies(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(70707, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestDelOfMissingDoesNotModify(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(125331, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestDelDelOfSameDoesNotModify(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(115397, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestSetDelOfMissingDoesNotModify(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(109300, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestDelSetOfSamePresent(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(107451, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestDelSetOfSameMissing(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(80128, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestDelSetOfNotSameCommutes(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(113604, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestEmptyMapSize(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(91416, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestSingletonMapSize(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(87514, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestDoubletonMapSize(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(75989, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestGetNonNullEquivalentExists(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(125207, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestEmptyMapIsEmpty(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(113933, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestNonEmptyMapsNotIsEmpty(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(126836, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestEqualsImpliesDeepEquals(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(67863, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestThereDeepEqualMapsThatAreNotEqual(provider, _key, _val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(_key));
        builder.writeTuple(storeTupleValData(_val));
        const source = (await provider.get(112497, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestAsCellEquals(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(102963, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestAsCellDoesNothing(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(75654, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestReplaceEmptyMap(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(120102, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestReplaceDoesNotModifyIfKeyIsMissing(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(68251, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestReplaceWorksAsSetIfKeyIsPresent(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(92956, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestReplaceGetSameKeyIfPresent(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(94587, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestReplaceGetNotSameKey(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(108276, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestReplaceIdempotent(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(131067, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestReplaceReplaceOfNotSameCommutes(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(122556, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestEmptyMapReplaceGet(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(73819, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestDelReplaceGet(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(77773, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestSetReplaceGet(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(66754, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
}
exports.MapPropertiesTester = MapPropertiesTester;
