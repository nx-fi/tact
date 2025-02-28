"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstantTester = exports.NoCircularB = exports.NoCircularA = exports.beforeDefinedB = exports.beforeDefinedA = exports.beforeDefinedC = exports.globalConst13 = exports.globalConst12 = exports.globalConst11 = exports.globalConst10 = exports.globalConst9 = exports.globalConst8 = exports.globalConst7 = exports.globalConst6 = exports.globalConst5 = exports.globalConst4 = exports.globalConst3 = exports.globalConst2 = exports.globalConst1 = exports.someGlobalConst = exports.ConstantTester_getterMapping = void 0;
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
exports.storeA = storeA;
exports.loadA = loadA;
exports.storeS = storeS;
exports.loadS = loadS;
exports.storeT = storeT;
exports.loadT = loadT;
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
function storeA(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.b, 257);
    };
}
function loadA(slice) {
    const sc_0 = slice;
    const _b = sc_0.loadIntBig(257);
    return { $$type: 'A', b: _b };
}
function loadTupleA(source) {
    const _b = source.readBigNumber();
    return { $$type: 'A', b: _b };
}
function loadGetterTupleA(source) {
    const _b = source.readBigNumber();
    return { $$type: 'A', b: _b };
}
function storeTupleA(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.b);
    return builder.build();
}
function dictValueParserA() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeA(src)).endCell());
        },
        parse: (src) => {
            return loadA(src.loadRef().beginParse());
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
    const __code = core_1.Cell.fromBase64('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');
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
    { "name": "A", "header": null, "fields": [{ "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "S", "header": null, "fields": [{ "name": "a", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "T", "header": null, "fields": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "s", "type": { "kind": "simple", "type": "S", "optional": false } }] },
    { "name": "ConstantTester$Data", "header": null, "fields": [] },
];
const ConstantTester_getters = [
    { "name": "something1", "methodId": 121234, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something2", "methodId": 125425, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "something3", "methodId": 129488, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something4", "methodId": 100663, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something5", "methodId": 104726, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
    { "name": "something6", "methodId": 108917, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something7", "methodId": 112980, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something8", "methodId": 84155, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something9", "methodId": 88218, "arguments": [], "returnType": { "kind": "simple", "type": "address", "optional": false } },
    { "name": "something10", "methodId": 130567, "arguments": [], "returnType": { "kind": "simple", "type": "address", "optional": false } },
    { "name": "something11", "methodId": 126502, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something12", "methodId": 122437, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something13", "methodId": 118372, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something14", "methodId": 114307, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something15", "methodId": 110242, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something16", "methodId": 106177, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something17", "methodId": 102112, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something18", "methodId": 98063, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something19", "methodId": 93998, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something20", "methodId": 109396, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something21", "methodId": 113525, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something22", "methodId": 101142, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something23", "methodId": 105271, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something24", "methodId": 125904, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something25", "methodId": 130033, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something26", "methodId": 117650, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something27", "methodId": 121779, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something28", "methodId": 76380, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something29", "methodId": 80509, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "something30", "methodId": 104549, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "something31", "methodId": 100420, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something32", "methodId": 112679, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something33", "methodId": 108550, "arguments": [], "returnType": { "kind": "dict", "key": "int", "value": "int" } },
    { "name": "something34", "methodId": 121057, "arguments": [], "returnType": { "kind": "dict", "key": "int", "value": "int" } },
    { "name": "something35", "methodId": 116928, "arguments": [], "returnType": { "kind": "simple", "type": "S", "optional": false } },
    { "name": "something36", "methodId": 129187, "arguments": [], "returnType": { "kind": "simple", "type": "S", "optional": false } },
    { "name": "something37", "methodId": 125058, "arguments": [], "returnType": { "kind": "simple", "type": "T", "optional": false } },
    { "name": "something38", "methodId": 72045, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "something39", "methodId": 67916, "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "something40", "methodId": 66034, "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "something41", "methodId": 70099, "arguments": [], "returnType": { "kind": "simple", "type": "address", "optional": false } },
    { "name": "something42", "methodId": 74160, "arguments": [], "returnType": { "kind": "simple", "type": "address", "optional": false } },
    { "name": "something43", "methodId": 78225, "arguments": [], "returnType": { "kind": "simple", "type": "address", "optional": false } },
    { "name": "something44", "methodId": 82294, "arguments": [], "returnType": { "kind": "simple", "type": "address", "optional": false } },
    { "name": "something45", "methodId": 86359, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "globalConst1", "methodId": 126681, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "globalConst2", "methodId": 122554, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "globalConst3", "methodId": 118427, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "globalConst4", "methodId": 114300, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "globalConst5", "methodId": 110173, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "globalConst6", "methodId": 106046, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "globalConst7", "methodId": 101919, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "globalConst8", "methodId": 98288, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "globalConst9", "methodId": 94161, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "globalConst10", "methodId": 127923, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "globalConst11", "methodId": 123794, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "globalConst12", "methodId": 119793, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "globalConst13", "methodId": 115664, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "beforeDefinedA", "methodId": 90149, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "beforeDefinedC", "methodId": 82023, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "defaultFieldB", "methodId": 66374, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "noCircularA", "methodId": 115089, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "minInt1", "methodId": 92144, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "minInt2", "methodId": 87955, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "minInt3", "methodId": 83890, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "globalConst", "methodId": 116577, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
];
exports.ConstantTester_getterMapping = {
    'something1': 'getSomething1',
    'something2': 'getSomething2',
    'something3': 'getSomething3',
    'something4': 'getSomething4',
    'something5': 'getSomething5',
    'something6': 'getSomething6',
    'something7': 'getSomething7',
    'something8': 'getSomething8',
    'something9': 'getSomething9',
    'something10': 'getSomething10',
    'something11': 'getSomething11',
    'something12': 'getSomething12',
    'something13': 'getSomething13',
    'something14': 'getSomething14',
    'something15': 'getSomething15',
    'something16': 'getSomething16',
    'something17': 'getSomething17',
    'something18': 'getSomething18',
    'something19': 'getSomething19',
    'something20': 'getSomething20',
    'something21': 'getSomething21',
    'something22': 'getSomething22',
    'something23': 'getSomething23',
    'something24': 'getSomething24',
    'something25': 'getSomething25',
    'something26': 'getSomething26',
    'something27': 'getSomething27',
    'something28': 'getSomething28',
    'something29': 'getSomething29',
    'something30': 'getSomething30',
    'something31': 'getSomething31',
    'something32': 'getSomething32',
    'something33': 'getSomething33',
    'something34': 'getSomething34',
    'something35': 'getSomething35',
    'something36': 'getSomething36',
    'something37': 'getSomething37',
    'something38': 'getSomething38',
    'something39': 'getSomething39',
    'something40': 'getSomething40',
    'something41': 'getSomething41',
    'something42': 'getSomething42',
    'something43': 'getSomething43',
    'something44': 'getSomething44',
    'something45': 'getSomething45',
    'globalConst1': 'getGlobalConst1',
    'globalConst2': 'getGlobalConst2',
    'globalConst3': 'getGlobalConst3',
    'globalConst4': 'getGlobalConst4',
    'globalConst5': 'getGlobalConst5',
    'globalConst6': 'getGlobalConst6',
    'globalConst7': 'getGlobalConst7',
    'globalConst8': 'getGlobalConst8',
    'globalConst9': 'getGlobalConst9',
    'globalConst10': 'getGlobalConst10',
    'globalConst11': 'getGlobalConst11',
    'globalConst12': 'getGlobalConst12',
    'globalConst13': 'getGlobalConst13',
    'beforeDefinedA': 'getBeforeDefinedA',
    'beforeDefinedC': 'getBeforeDefinedC',
    'defaultFieldB': 'getDefaultFieldB',
    'noCircularA': 'getNoCircularA',
    'minInt1': 'getMinInt1',
    'minInt2': 'getMinInt2',
    'minInt3': 'getMinInt3',
    'globalConst': 'getGlobalConst',
};
const ConstantTester_receivers = [
    { "receiver": "internal", "message": { "kind": "empty" } },
];
exports.someGlobalConst = 100n;
exports.globalConst1 = 1n;
exports.globalConst2 = 2n;
exports.globalConst3 = 4n;
exports.globalConst4 = 15n;
exports.globalConst5 = 15n;
exports.globalConst6 = 26n;
exports.globalConst7 = 27n;
exports.globalConst8 = 2n;
exports.globalConst9 = 2n;
exports.globalConst10 = 24n;
exports.globalConst11 = 24n;
exports.globalConst12 = 8n;
exports.globalConst13 = 8n;
exports.beforeDefinedC = 20n;
exports.beforeDefinedA = 10n;
exports.beforeDefinedB = 10n;
exports.NoCircularA = 100n;
exports.NoCircularB = 100n;
class ConstantTester {
    static something1 = 11n;
    static something2 = null;
    static something3 = 123000000000n;
    static something4 = 456000000000n;
    static something5 = "Hello world!";
    static something6 = 10n;
    static something7 = 5n;
    static something8 = 4n;
    static something9 = (0, core_1.address)("EQBKgXCNLPexWhs2L79kiARR1phGH1LwXxRbNsCFF9doc2lN");
    static something10 = (0, core_1.address)("EQBKgXCNLPexWhs2L79kiARR1phGH1LwXxRbNsCFF9doc2lN");
    static something11 = 88n;
    static something12 = -90n;
    static something13 = 88n;
    static something14 = 243n;
    static something15 = 32n;
    static something16 = -115792089237316195423570985008687907853269984665640564039457584007913129639936n;
    static something17 = 115792089237316195423570985008687907853269984665640564039457584007913129639935n;
    static something18 = -115792089237316195423570985008687907853269984665640564039457584007913129639935n;
    static something19 = -115792089237316195423570985008687907853269984665640564039457584007913129639936n;
    static something20 = -6n;
    static something21 = 0n;
    static something22 = -1n;
    static something23 = -1n;
    static something24 = 0n;
    static something25 = 1n;
    static something26 = 4n;
    static something27 = -4n;
    static something28 = -1n;
    static something29 = 42n;
    static something30 = null;
    static something31 = 42n;
    static something32 = 42n;
    static something33 = null;
    static something34 = null;
    static something35 = { $$type: "S", a: false, b: 42n };
    static something36 = { $$type: "S", b: 42n, a: false };
    static something37 = { $$type: "T", a: 42n, s: { $$type: "S", a: true, b: 42n } };
    static something38 = 4n;
    static something39 = true;
    static something40 = true;
    static something41 = (0, core_1.address)("EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c");
    static something42 = (0, core_1.address)("EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEjRbO4");
    static something43 = (0, core_1.address)("EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABI0VniavN72YJ");
    static something44 = (0, core_1.address)("EQBKgXCNLPexWhs2L79kiARR1phGH1LwXxRbNsCFF9doc2lN");
    static something45 = 42n;
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
    async getSomething1(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(121234, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething2(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(125425, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getSomething3(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(129488, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething4(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(100663, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething5(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(104726, builder.build())).stack;
        const result = source.readString();
        return result;
    }
    async getSomething6(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(108917, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething7(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(112980, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething8(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(84155, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething9(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(88218, builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    async getSomething10(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(130567, builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    async getSomething11(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(126502, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething12(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(122437, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething13(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(118372, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething14(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(114307, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething15(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(110242, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething16(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(106177, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething17(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(102112, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething18(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(98063, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething19(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(93998, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething20(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(109396, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething21(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(113525, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething22(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(101142, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething23(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(105271, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething24(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(125904, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething25(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(130033, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething26(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(117650, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething27(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(121779, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething28(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(76380, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething29(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(80509, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getSomething30(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(104549, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getSomething31(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(100420, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething32(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(112679, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething33(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(108550, builder.build())).stack;
        const result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
        return result;
    }
    async getSomething34(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(121057, builder.build())).stack;
        const result = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
        return result;
    }
    async getSomething35(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(116928, builder.build())).stack;
        const result = loadGetterTupleS(source);
        return result;
    }
    async getSomething36(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(129187, builder.build())).stack;
        const result = loadGetterTupleS(source);
        return result;
    }
    async getSomething37(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(125058, builder.build())).stack;
        const result = loadGetterTupleT(source);
        return result;
    }
    async getSomething38(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(72045, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSomething39(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(67916, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getSomething40(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(66034, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getSomething41(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(70099, builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    async getSomething42(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(74160, builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    async getSomething43(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(78225, builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    async getSomething44(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(82294, builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    async getSomething45(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(86359, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGlobalConst1(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(126681, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGlobalConst2(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(122554, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGlobalConst3(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(118427, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGlobalConst4(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(114300, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGlobalConst5(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(110173, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGlobalConst6(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(106046, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGlobalConst7(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(101919, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGlobalConst8(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(98288, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGlobalConst9(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(94161, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGlobalConst10(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(127923, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGlobalConst11(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(123794, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGlobalConst12(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(119793, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGlobalConst13(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(115664, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getBeforeDefinedA(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(90149, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getBeforeDefinedC(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(82023, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getDefaultFieldB(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(66374, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getNoCircularA(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(115089, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getMinInt1(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(92144, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getMinInt2(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(87955, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getMinInt3(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(83890, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGlobalConst(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(116577, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
}
exports.ConstantTester = ConstantTester;
