"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapComparisonTestContract = exports.MapComparisonTestContract_getterMapping = void 0;
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
exports.storeCompare = storeCompare;
exports.loadCompare = loadCompare;
exports.storeCompareDeep = storeCompareDeep;
exports.loadCompareDeep = loadCompareDeep;
exports.storeMapComparisonTestContract$Data = storeMapComparisonTestContract$Data;
exports.loadMapComparisonTestContract$Data = loadMapComparisonTestContract$Data;
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
function storeCompare(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(1473646961, 32);
        b_0.storeDict(src.m1, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Bool());
        b_0.storeDict(src.m2, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Bool());
    };
}
function loadCompare(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1473646961) {
        throw Error('Invalid prefix');
    }
    const _m1 = core_1.Dictionary.load(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Bool(), sc_0);
    const _m2 = core_1.Dictionary.load(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Bool(), sc_0);
    return { $$type: 'Compare', m1: _m1, m2: _m2 };
}
function loadTupleCompare(source) {
    const _m1 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Bool(), source.readCellOpt());
    const _m2 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Bool(), source.readCellOpt());
    return { $$type: 'Compare', m1: _m1, m2: _m2 };
}
function loadGetterTupleCompare(source) {
    const _m1 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Bool(), source.readCellOpt());
    const _m2 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Bool(), source.readCellOpt());
    return { $$type: 'Compare', m1: _m1, m2: _m2 };
}
function storeTupleCompare(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeCell(source.m1.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.m1, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Bool()).endCell() : null);
    builder.writeCell(source.m2.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.m2, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Bool()).endCell() : null);
    return builder.build();
}
function dictValueParserCompare() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeCompare(src)).endCell());
        },
        parse: (src) => {
            return loadCompare(src.loadRef().beginParse());
        }
    };
}
function storeCompareDeep(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(3800136638, 32);
        b_0.storeDict(src.m1, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Bool());
        b_0.storeDict(src.m2, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Bool());
    };
}
function loadCompareDeep(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3800136638) {
        throw Error('Invalid prefix');
    }
    const _m1 = core_1.Dictionary.load(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Bool(), sc_0);
    const _m2 = core_1.Dictionary.load(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Bool(), sc_0);
    return { $$type: 'CompareDeep', m1: _m1, m2: _m2 };
}
function loadTupleCompareDeep(source) {
    const _m1 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Bool(), source.readCellOpt());
    const _m2 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Bool(), source.readCellOpt());
    return { $$type: 'CompareDeep', m1: _m1, m2: _m2 };
}
function loadGetterTupleCompareDeep(source) {
    const _m1 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Bool(), source.readCellOpt());
    const _m2 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Bool(), source.readCellOpt());
    return { $$type: 'CompareDeep', m1: _m1, m2: _m2 };
}
function storeTupleCompareDeep(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeCell(source.m1.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.m1, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Bool()).endCell() : null);
    builder.writeCell(source.m2.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.m2, core_1.Dictionary.Keys.Uint(8), core_1.Dictionary.Values.Bool()).endCell() : null);
    return builder.build();
}
function dictValueParserCompareDeep() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeCompareDeep(src)).endCell());
        },
        parse: (src) => {
            return loadCompareDeep(src.loadRef().beginParse());
        }
    };
}
function storeMapComparisonTestContract$Data(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
function loadMapComparisonTestContract$Data(slice) {
    const sc_0 = slice;
    return { $$type: 'MapComparisonTestContract$Data' };
}
function loadTupleMapComparisonTestContract$Data(source) {
    return { $$type: 'MapComparisonTestContract$Data' };
}
function loadGetterTupleMapComparisonTestContract$Data(source) {
    return { $$type: 'MapComparisonTestContract$Data' };
}
function storeTupleMapComparisonTestContract$Data(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserMapComparisonTestContract$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMapComparisonTestContract$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMapComparisonTestContract$Data(src.loadRef().beginParse());
        }
    };
}
function initMapComparisonTestContract_init_args(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
async function MapComparisonTestContract_init() {
    const __code = core_1.Cell.fromBase64('te6ccgECEgEAAdsAART/APSkE/S88sgLAQIBYgIDA/jQAdBy1yHSANIA+kAhEDRQZm8E+GEC+GLbPAKRW+BwIddJIMIflTEB0x8C3iGCEFfWEXG6jjRb9AT0BFmCAM93MyFuIW5csJNfBH+OEQGzAbOwlwH5AAH5ALqSW3Di4vL0MMh/AcoAye1U4CGCEOKBe7664wIywAABwSGwEAQFAgEgBgcAolv0BPQEWYIAz3czeI437aLt+1Mg9IJvpZCOJFRQQ/Rib6GVXwZw2zHhAvkBAvkBErqVXwRw2zHhVDIx9HRvpegQNF8Ebtjy9DDIfwHKAMntVAAemTDIfwHKAMntVOAw8sCCAgEgCAkCASAKCwIRuNqds8Wds8MYEA8CEbuJvbPFnbPDGBARAhG5Lz2zxZ2zwxgQEQIBSAwNAgWtwcAODgIRss12zxZ2zwxgEBECDTbPFnbPDGAQDwB6gQEBjjftou37UyD0gm+lkI4kVFBD9GJvoZVfBnDbMeEC+QEC+QESupVfBHDbMeFUMjH0dG+l6BA0XwRu2AAU7UTQ0gAwkW3gbQB6gQELjjftou37UyD0gm+lkI4kVFBD9GJvoZVfBnDbMeEC+QEC+QESupVfBHDbMeFUMjH0dG+l6BA0XwRu2A==');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initMapComparisonTestContract_init_args({ $$type: 'MapComparisonTestContract_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const MapComparisonTestContract_errors = {
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
    53111: { message: `Maps are not equal` },
};
const MapComparisonTestContract_types = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "Compare", "header": 1473646961, "fields": [{ "name": "m1", "type": { "kind": "dict", "key": "uint", "keyFormat": 8, "value": "bool" } }, { "name": "m2", "type": { "kind": "dict", "key": "uint", "keyFormat": 8, "value": "bool" } }] },
    { "name": "CompareDeep", "header": 3800136638, "fields": [{ "name": "m1", "type": { "kind": "dict", "key": "uint", "keyFormat": 8, "value": "bool" } }, { "name": "m2", "type": { "kind": "dict", "key": "uint", "keyFormat": 8, "value": "bool" } }] },
    { "name": "MapComparisonTestContract$Data", "header": null, "fields": [] },
];
const MapComparisonTestContract_getters = [
    { "name": "compareIntInt", "methodId": 69033, "arguments": [{ "name": "m1", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "m2", "type": { "kind": "dict", "key": "int", "value": "int" } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compareIntCell", "methodId": 116487, "arguments": [{ "name": "m1", "type": { "kind": "dict", "key": "int", "value": "cell", "valueFormat": "ref" } }, { "name": "m2", "type": { "kind": "dict", "key": "int", "value": "cell", "valueFormat": "ref" } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compareIntAddress", "methodId": 116486, "arguments": [{ "name": "m1", "type": { "kind": "dict", "key": "int", "value": "address" } }, { "name": "m2", "type": { "kind": "dict", "key": "int", "value": "address" } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compareAddressInt", "methodId": 96411, "arguments": [{ "name": "m1", "type": { "kind": "dict", "key": "address", "value": "int" } }, { "name": "m2", "type": { "kind": "dict", "key": "address", "value": "int" } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compareAddressCell", "methodId": 121653, "arguments": [{ "name": "m1", "type": { "kind": "dict", "key": "address", "value": "cell", "valueFormat": "ref" } }, { "name": "m2", "type": { "kind": "dict", "key": "address", "value": "cell", "valueFormat": "ref" } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compareAddressAddress", "methodId": 103155, "arguments": [{ "name": "m1", "type": { "kind": "dict", "key": "address", "value": "address" } }, { "name": "m2", "type": { "kind": "dict", "key": "address", "value": "address" } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
];
exports.MapComparisonTestContract_getterMapping = {
    'compareIntInt': 'getCompareIntInt',
    'compareIntCell': 'getCompareIntCell',
    'compareIntAddress': 'getCompareIntAddress',
    'compareAddressInt': 'getCompareAddressInt',
    'compareAddressCell': 'getCompareAddressCell',
    'compareAddressAddress': 'getCompareAddressAddress',
};
const MapComparisonTestContract_receivers = [
    { "receiver": "internal", "message": { "kind": "empty" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Compare" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "CompareDeep" } },
];
class MapComparisonTestContract {
    static async init() {
        return await MapComparisonTestContract_init();
    }
    static async fromInit() {
        const __gen_init = await MapComparisonTestContract_init();
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new MapComparisonTestContract(address, __gen_init);
    }
    static fromAddress(address) {
        return new MapComparisonTestContract(address);
    }
    address;
    init;
    abi = {
        types: MapComparisonTestContract_types,
        getters: MapComparisonTestContract_getters,
        receivers: MapComparisonTestContract_receivers,
        errors: MapComparisonTestContract_errors,
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
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'Compare') {
            body = (0, core_1.beginCell)().store(storeCompare(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'CompareDeep') {
            body = (0, core_1.beginCell)().store(storeCompareDeep(message)).endCell();
        }
        if (body === null) {
            throw new Error('Invalid message type');
        }
        await provider.internal(via, { ...args, body: body });
    }
    async getCompareIntInt(provider, m1, m2) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(m1.size > 0 ? (0, core_1.beginCell)().storeDictDirect(m1, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
        builder.writeCell(m2.size > 0 ? (0, core_1.beginCell)().storeDictDirect(m2, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
        const source = (await provider.get(69033, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompareIntCell(provider, m1, m2) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(m1.size > 0 ? (0, core_1.beginCell)().storeDictDirect(m1, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Cell()).endCell() : null);
        builder.writeCell(m2.size > 0 ? (0, core_1.beginCell)().storeDictDirect(m2, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Cell()).endCell() : null);
        const source = (await provider.get(116487, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompareIntAddress(provider, m1, m2) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(m1.size > 0 ? (0, core_1.beginCell)().storeDictDirect(m1, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Address()).endCell() : null);
        builder.writeCell(m2.size > 0 ? (0, core_1.beginCell)().storeDictDirect(m2, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Address()).endCell() : null);
        const source = (await provider.get(116486, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompareAddressInt(provider, m1, m2) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(m1.size > 0 ? (0, core_1.beginCell)().storeDictDirect(m1, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
        builder.writeCell(m2.size > 0 ? (0, core_1.beginCell)().storeDictDirect(m2, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
        const source = (await provider.get(96411, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompareAddressCell(provider, m1, m2) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(m1.size > 0 ? (0, core_1.beginCell)().storeDictDirect(m1, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Cell()).endCell() : null);
        builder.writeCell(m2.size > 0 ? (0, core_1.beginCell)().storeDictDirect(m2, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Cell()).endCell() : null);
        const source = (await provider.get(121653, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompareAddressAddress(provider, m1, m2) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(m1.size > 0 ? (0, core_1.beginCell)().storeDictDirect(m1, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Address()).endCell() : null);
        builder.writeCell(m2.size > 0 ? (0, core_1.beginCell)().storeDictDirect(m2, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Address()).endCell() : null);
        const source = (await provider.get(103155, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
}
exports.MapComparisonTestContract = MapComparisonTestContract;
