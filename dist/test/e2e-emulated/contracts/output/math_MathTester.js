"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathTester = exports.MathTester_getterMapping = void 0;
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
exports.storeDeploy = storeDeploy;
exports.loadDeploy = loadDeploy;
exports.storeDeployOk = storeDeployOk;
exports.loadDeployOk = loadDeployOk;
exports.storeFactoryDeploy = storeFactoryDeploy;
exports.loadFactoryDeploy = loadFactoryDeploy;
exports.storeMathTester$Data = storeMathTester$Data;
exports.loadMathTester$Data = loadMathTester$Data;
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
function storeDeploy(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}
function loadDeploy(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy', queryId: _queryId };
}
function loadTupleDeploy(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy', queryId: _queryId };
}
function loadGetterTupleDeploy(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy', queryId: _queryId };
}
function storeTupleDeploy(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}
function dictValueParserDeploy() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    };
}
function storeDeployOk(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}
function loadDeployOk(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk', queryId: _queryId };
}
function loadTupleDeployOk(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk', queryId: _queryId };
}
function loadGetterTupleDeployOk(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk', queryId: _queryId };
}
function storeTupleDeployOk(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}
function dictValueParserDeployOk() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    };
}
function storeFactoryDeploy(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}
function loadFactoryDeploy(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    const _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy', queryId: _queryId, cashback: _cashback };
}
function loadTupleFactoryDeploy(source) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy', queryId: _queryId, cashback: _cashback };
}
function loadGetterTupleFactoryDeploy(source) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy', queryId: _queryId, cashback: _cashback };
}
function storeTupleFactoryDeploy(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}
function dictValueParserFactoryDeploy() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    };
}
function storeMathTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
function loadMathTester$Data(slice) {
    const sc_0 = slice;
    return { $$type: 'MathTester$Data' };
}
function loadTupleMathTester$Data(source) {
    return { $$type: 'MathTester$Data' };
}
function loadGetterTupleMathTester$Data(source) {
    return { $$type: 'MathTester$Data' };
}
function storeTupleMathTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserMathTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMathTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMathTester$Data(src.loadRef().beginParse());
        }
    };
}
function initMathTester_init_args(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
async function MathTester_init() {
    const __code = core_1.Cell.fromBase64('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');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initMathTester_init_args({ $$type: 'MathTester_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const MathTester_errors = {
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
const MathTester_types = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "MessageParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "BasechainAddress", "header": null, "fields": [{ "name": "hash", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }] },
    { "name": "Deploy", "header": 2490013878, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "DeployOk", "header": 2952335191, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "FactoryDeploy", "header": 1829761339, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "cashback", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "MathTester$Data", "header": null, "fields": [] },
];
const MathTester_getters = [
    { "name": "add", "methodId": 83863, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "sub", "methodId": 80400, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "mul", "methodId": 99260, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "div", "methodId": 125000, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "mod", "methodId": 126476, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "shr", "methodId": 89358, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "shl", "methodId": 110321, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "and", "methodId": 108636, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "or", "methodId": 83393, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "xor", "methodId": 78952, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "bitwise_not", "methodId": 85436, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "addAug", "methodId": 120881, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "subAug", "methodId": 114791, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "mulAug", "methodId": 129050, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "divAug", "methodId": 85125, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "modAug", "methodId": 81709, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "bitwiseOrAug", "methodId": 116497, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "bitwiseAndAug", "methodId": 89159, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "bitwiseXorAug", "methodId": 104526, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "compare1", "methodId": 80704, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare2", "methodId": 68387, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare3", "methodId": 72450, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare4", "methodId": 93157, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare5", "methodId": 97220, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare6", "methodId": 84903, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare7", "methodId": 88966, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare8", "methodId": 109161, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare9", "methodId": 113224, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare10", "methodId": 127339, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare11", "methodId": 123210, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "address", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare12", "methodId": 119081, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "address", "optional": true } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare13", "methodId": 114952, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "b", "type": { "kind": "simple", "type": "address", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare14", "methodId": 111087, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "b", "type": { "kind": "simple", "type": "address", "optional": true } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare15", "methodId": 106958, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "address", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare16", "methodId": 102829, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "address", "optional": true } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare17", "methodId": 98700, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "b", "type": { "kind": "simple", "type": "address", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare18", "methodId": 94307, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "b", "type": { "kind": "simple", "type": "address", "optional": true } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare19", "methodId": 90178, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "cell", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare20", "methodId": 107576, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "cell", "optional": true } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare21", "methodId": 111641, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "b", "type": { "kind": "simple", "type": "cell", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare22", "methodId": 99450, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "b", "type": { "kind": "simple", "type": "cell", "optional": true } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare23", "methodId": 103515, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "cell", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare24", "methodId": 124092, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "cell", "optional": true } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare25", "methodId": 128157, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "b", "type": { "kind": "simple", "type": "cell", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare26", "methodId": 115966, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "b", "type": { "kind": "simple", "type": "cell", "optional": true } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare27", "methodId": 120031, "arguments": [{ "name": "a", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "b", "type": { "kind": "dict", "key": "int", "value": "int" } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare28", "methodId": 75056, "arguments": [{ "name": "a", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "b", "type": { "kind": "dict", "key": "int", "value": "int" } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare29", "methodId": 79121, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "slice", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "slice", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare30", "methodId": 104201, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "slice", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "slice", "optional": true } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare31", "methodId": 100136, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "slice", "optional": true } }, { "name": "b", "type": { "kind": "simple", "type": "slice", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare32", "methodId": 112459, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "slice", "optional": true } }, { "name": "b", "type": { "kind": "simple", "type": "slice", "optional": true } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare33", "methodId": 108394, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "slice", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "slice", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare34", "methodId": 120717, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "slice", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "slice", "optional": true } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare35", "methodId": 116652, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "slice", "optional": true } }, { "name": "b", "type": { "kind": "simple", "type": "slice", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare36", "methodId": 128975, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "slice", "optional": true } }, { "name": "b", "type": { "kind": "simple", "type": "slice", "optional": true } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare37", "methodId": 124910, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "string", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare38", "methodId": 71169, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "string", "optional": true } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare39", "methodId": 67104, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "string", "optional": true } }, { "name": "b", "type": { "kind": "simple", "type": "string", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare40", "methodId": 69278, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "string", "optional": true } }, { "name": "b", "type": { "kind": "simple", "type": "string", "optional": true } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare41", "methodId": 73407, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "string", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare42", "methodId": 77532, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "string", "optional": true } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare43", "methodId": 81661, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "string", "optional": true } }, { "name": "b", "type": { "kind": "simple", "type": "string", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "compare44", "methodId": 85530, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "string", "optional": true } }, { "name": "b", "type": { "kind": "simple", "type": "string", "optional": true } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "isNull1", "methodId": 111973, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "isNotNull1", "methodId": 89158, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "isNull2", "methodId": 99590, "arguments": [{ "name": "address", "type": { "kind": "simple", "type": "address", "optional": true } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "isNotNull2", "methodId": 93221, "arguments": [{ "name": "address", "type": { "kind": "simple", "type": "address", "optional": true } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "isNull3", "methodId": 103719, "arguments": [{ "name": "cell", "type": { "kind": "simple", "type": "cell", "optional": true } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "isNotNull3", "methodId": 97284, "arguments": [{ "name": "cell", "type": { "kind": "simple", "type": "cell", "optional": true } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "log2", "methodId": 75030, "arguments": [{ "name": "num", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "log", "methodId": 125279, "arguments": [{ "name": "num", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "base", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "pow", "methodId": 118124, "arguments": [{ "name": "base", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "exp", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "pow2", "methodId": 94960, "arguments": [{ "name": "exp", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "precedence1", "methodId": 78380, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "precedence2", "methodId": 66127, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "precedence3", "methodId": 70254, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "precedence4", "methodId": 90761, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "precedence5", "methodId": 94888, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "precedence6", "methodId": 82635, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "precedence7", "methodId": 86762, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "precedence8", "methodId": 107269, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "precedence9", "methodId": 111396, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "precedence10", "methodId": 68674, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "precedence11", "methodId": 72803, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "precedence12", "methodId": 76800, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "bitwiseNot1", "methodId": 118903, "arguments": [{ "name": "x", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "bitwiseNot2", "methodId": 122900, "arguments": [{ "name": "x", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "bitwiseNot3", "methodId": 127029, "arguments": [{ "name": "x", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "bitwiseNot4", "methodId": 98514, "arguments": [{ "name": "x", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "augmentedAnd", "methodId": 127849, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "bool", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "augmentedOr", "methodId": 121304, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "b", "type": { "kind": "simple", "type": "bool", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "augmentedShiftLeft", "methodId": 104823, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "augmentedShiftRight", "methodId": 110189, "arguments": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "shiftLeft0", "methodId": 106230, "arguments": [{ "name": "i", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "shiftRight0", "methodId": 78486, "arguments": [{ "name": "i", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "sign", "methodId": 115590, "arguments": [{ "name": "x", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "divc", "methodId": 92387, "arguments": [{ "name": "x", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "y", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "muldivc", "methodId": 107929, "arguments": [{ "name": "x", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "y", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "z", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "mulShiftRight", "methodId": 127246, "arguments": [{ "name": "x", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "y", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "z", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "mulShiftRightRound", "methodId": 121903, "arguments": [{ "name": "x", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "y", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "z", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "mulShiftRightCeil", "methodId": 93115, "arguments": [{ "name": "x", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "y", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "z", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "sqrt", "methodId": 91833, "arguments": [{ "name": "x", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
];
exports.MathTester_getterMapping = {
    'add': 'getAdd',
    'sub': 'getSub',
    'mul': 'getMul',
    'div': 'getDiv',
    'mod': 'getMod',
    'shr': 'getShr',
    'shl': 'getShl',
    'and': 'getAnd',
    'or': 'getOr',
    'xor': 'getXor',
    'bitwise_not': 'getBitwiseNot',
    'addAug': 'getAddAug',
    'subAug': 'getSubAug',
    'mulAug': 'getMulAug',
    'divAug': 'getDivAug',
    'modAug': 'getModAug',
    'bitwiseOrAug': 'getBitwiseOrAug',
    'bitwiseAndAug': 'getBitwiseAndAug',
    'bitwiseXorAug': 'getBitwiseXorAug',
    'compare1': 'getCompare1',
    'compare2': 'getCompare2',
    'compare3': 'getCompare3',
    'compare4': 'getCompare4',
    'compare5': 'getCompare5',
    'compare6': 'getCompare6',
    'compare7': 'getCompare7',
    'compare8': 'getCompare8',
    'compare9': 'getCompare9',
    'compare10': 'getCompare10',
    'compare11': 'getCompare11',
    'compare12': 'getCompare12',
    'compare13': 'getCompare13',
    'compare14': 'getCompare14',
    'compare15': 'getCompare15',
    'compare16': 'getCompare16',
    'compare17': 'getCompare17',
    'compare18': 'getCompare18',
    'compare19': 'getCompare19',
    'compare20': 'getCompare20',
    'compare21': 'getCompare21',
    'compare22': 'getCompare22',
    'compare23': 'getCompare23',
    'compare24': 'getCompare24',
    'compare25': 'getCompare25',
    'compare26': 'getCompare26',
    'compare27': 'getCompare27',
    'compare28': 'getCompare28',
    'compare29': 'getCompare29',
    'compare30': 'getCompare30',
    'compare31': 'getCompare31',
    'compare32': 'getCompare32',
    'compare33': 'getCompare33',
    'compare34': 'getCompare34',
    'compare35': 'getCompare35',
    'compare36': 'getCompare36',
    'compare37': 'getCompare37',
    'compare38': 'getCompare38',
    'compare39': 'getCompare39',
    'compare40': 'getCompare40',
    'compare41': 'getCompare41',
    'compare42': 'getCompare42',
    'compare43': 'getCompare43',
    'compare44': 'getCompare44',
    'isNull1': 'getIsNull1',
    'isNotNull1': 'getIsNotNull1',
    'isNull2': 'getIsNull2',
    'isNotNull2': 'getIsNotNull2',
    'isNull3': 'getIsNull3',
    'isNotNull3': 'getIsNotNull3',
    'log2': 'getLog2',
    'log': 'getLog',
    'pow': 'getPow',
    'pow2': 'getPow2',
    'precedence1': 'getPrecedence1',
    'precedence2': 'getPrecedence2',
    'precedence3': 'getPrecedence3',
    'precedence4': 'getPrecedence4',
    'precedence5': 'getPrecedence5',
    'precedence6': 'getPrecedence6',
    'precedence7': 'getPrecedence7',
    'precedence8': 'getPrecedence8',
    'precedence9': 'getPrecedence9',
    'precedence10': 'getPrecedence10',
    'precedence11': 'getPrecedence11',
    'precedence12': 'getPrecedence12',
    'bitwiseNot1': 'getBitwiseNot1',
    'bitwiseNot2': 'getBitwiseNot2',
    'bitwiseNot3': 'getBitwiseNot3',
    'bitwiseNot4': 'getBitwiseNot4',
    'augmentedAnd': 'getAugmentedAnd',
    'augmentedOr': 'getAugmentedOr',
    'augmentedShiftLeft': 'getAugmentedShiftLeft',
    'augmentedShiftRight': 'getAugmentedShiftRight',
    'shiftLeft0': 'getShiftLeft0',
    'shiftRight0': 'getShiftRight0',
    'sign': 'getSign',
    'divc': 'getDivc',
    'muldivc': 'getMuldivc',
    'mulShiftRight': 'getMulShiftRight',
    'mulShiftRightRound': 'getMulShiftRightRound',
    'mulShiftRightCeil': 'getMulShiftRightCeil',
    'sqrt': 'getSqrt',
};
const MathTester_receivers = [
    { "receiver": "internal", "message": { "kind": "typed", "type": "Deploy" } },
];
class MathTester {
    static storageReserve = 0n;
    static async init() {
        return await MathTester_init();
    }
    static async fromInit() {
        const __gen_init = await MathTester_init();
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new MathTester(address, __gen_init);
    }
    static fromAddress(address) {
        return new MathTester(address);
    }
    address;
    init;
    abi = {
        types: MathTester_types,
        getters: MathTester_getters,
        receivers: MathTester_receivers,
        errors: MathTester_errors,
    };
    constructor(address, init) {
        this.address = address;
        this.init = init;
    }
    async send(provider, via, args, message) {
        let body = null;
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'Deploy') {
            body = (0, core_1.beginCell)().store(storeDeploy(message)).endCell();
        }
        if (body === null) {
            throw new Error('Invalid message type');
        }
        await provider.internal(via, { ...args, body: body });
    }
    async getAdd(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(83863, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSub(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(80400, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getMul(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(99260, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getDiv(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(125000, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getMod(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(126476, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getShr(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(89358, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getShl(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(110321, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getAnd(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(108636, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getOr(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(83393, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getXor(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(78952, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getBitwiseNot(provider, a) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        const source = (await provider.get(85436, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getAddAug(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(120881, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSubAug(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(114791, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getMulAug(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(129050, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getDivAug(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(85125, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getModAug(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(81709, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getBitwiseOrAug(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(116497, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getBitwiseAndAug(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(89159, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getBitwiseXorAug(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(104526, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getCompare1(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(80704, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare2(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(68387, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare3(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(72450, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare4(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(93157, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare5(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(97220, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare6(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(84903, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare7(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(88966, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare8(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(109161, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare9(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(113224, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare10(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(127339, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare11(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeAddress(a);
        builder.writeAddress(b);
        const source = (await provider.get(123210, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare12(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeAddress(a);
        builder.writeAddress(b);
        const source = (await provider.get(119081, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare13(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeAddress(a);
        builder.writeAddress(b);
        const source = (await provider.get(114952, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare14(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeAddress(a);
        builder.writeAddress(b);
        const source = (await provider.get(111087, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare15(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeAddress(a);
        builder.writeAddress(b);
        const source = (await provider.get(106958, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare16(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeAddress(a);
        builder.writeAddress(b);
        const source = (await provider.get(102829, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare17(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeAddress(a);
        builder.writeAddress(b);
        const source = (await provider.get(98700, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare18(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeAddress(a);
        builder.writeAddress(b);
        const source = (await provider.get(94307, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare19(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(a);
        builder.writeCell(b);
        const source = (await provider.get(90178, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare20(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(a);
        builder.writeCell(b);
        const source = (await provider.get(107576, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare21(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(a);
        builder.writeCell(b);
        const source = (await provider.get(111641, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare22(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(a);
        builder.writeCell(b);
        const source = (await provider.get(99450, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare23(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(a);
        builder.writeCell(b);
        const source = (await provider.get(103515, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare24(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(a);
        builder.writeCell(b);
        const source = (await provider.get(124092, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare25(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(a);
        builder.writeCell(b);
        const source = (await provider.get(128157, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare26(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(a);
        builder.writeCell(b);
        const source = (await provider.get(115966, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare27(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(a.size > 0 ? (0, core_1.beginCell)().storeDictDirect(a, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
        builder.writeCell(b.size > 0 ? (0, core_1.beginCell)().storeDictDirect(b, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
        const source = (await provider.get(120031, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare28(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(a.size > 0 ? (0, core_1.beginCell)().storeDictDirect(a, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
        builder.writeCell(b.size > 0 ? (0, core_1.beginCell)().storeDictDirect(b, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
        const source = (await provider.get(75056, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare29(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeSlice(a.asCell());
        builder.writeSlice(b.asCell());
        const source = (await provider.get(79121, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare30(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeSlice(a.asCell());
        builder.writeSlice(b?.asCell());
        const source = (await provider.get(104201, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare31(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeSlice(a?.asCell());
        builder.writeSlice(b.asCell());
        const source = (await provider.get(100136, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare32(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeSlice(a?.asCell());
        builder.writeSlice(b?.asCell());
        const source = (await provider.get(112459, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare33(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeSlice(a.asCell());
        builder.writeSlice(b.asCell());
        const source = (await provider.get(108394, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare34(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeSlice(a.asCell());
        builder.writeSlice(b?.asCell());
        const source = (await provider.get(120717, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare35(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeSlice(a?.asCell());
        builder.writeSlice(b.asCell());
        const source = (await provider.get(116652, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare36(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeSlice(a?.asCell());
        builder.writeSlice(b?.asCell());
        const source = (await provider.get(128975, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare37(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeString(a);
        builder.writeString(b);
        const source = (await provider.get(124910, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare38(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeString(a);
        builder.writeString(b);
        const source = (await provider.get(71169, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare39(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeString(a);
        builder.writeString(b);
        const source = (await provider.get(67104, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare40(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeString(a);
        builder.writeString(b);
        const source = (await provider.get(69278, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare41(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeString(a);
        builder.writeString(b);
        const source = (await provider.get(73407, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare42(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeString(a);
        builder.writeString(b);
        const source = (await provider.get(77532, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare43(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeString(a);
        builder.writeString(b);
        const source = (await provider.get(81661, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getCompare44(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeString(a);
        builder.writeString(b);
        const source = (await provider.get(85530, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getIsNull1(provider, a) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        const source = (await provider.get(111973, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getIsNotNull1(provider, a) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        const source = (await provider.get(89158, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getIsNull2(provider, address) {
        const builder = new core_1.TupleBuilder();
        builder.writeAddress(address);
        const source = (await provider.get(99590, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getIsNotNull2(provider, address) {
        const builder = new core_1.TupleBuilder();
        builder.writeAddress(address);
        const source = (await provider.get(93221, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getIsNull3(provider, cell) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(cell);
        const source = (await provider.get(103719, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getIsNotNull3(provider, cell) {
        const builder = new core_1.TupleBuilder();
        builder.writeCell(cell);
        const source = (await provider.get(97284, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getLog2(provider, num) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(num);
        const source = (await provider.get(75030, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getLog(provider, num, base) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(num);
        builder.writeNumber(base);
        const source = (await provider.get(125279, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getPow(provider, base, exp) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(base);
        builder.writeNumber(exp);
        const source = (await provider.get(118124, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getPow2(provider, exp) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(exp);
        const source = (await provider.get(94960, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getPrecedence1(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(78380, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getPrecedence2(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(66127, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getPrecedence3(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(70254, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getPrecedence4(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(90761, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getPrecedence5(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(94888, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getPrecedence6(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(82635, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getPrecedence7(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(86762, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getPrecedence8(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(107269, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getPrecedence9(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(111396, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getPrecedence10(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(68674, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getPrecedence11(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(72803, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getPrecedence12(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(76800, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getBitwiseNot1(provider, x) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(x);
        const source = (await provider.get(118903, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getBitwiseNot2(provider, x) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(x);
        const source = (await provider.get(122900, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getBitwiseNot3(provider, x) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(x);
        const source = (await provider.get(127029, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getBitwiseNot4(provider, x) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(x);
        const source = (await provider.get(98514, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getAugmentedAnd(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeBoolean(a);
        builder.writeBoolean(b);
        const source = (await provider.get(127849, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getAugmentedOr(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeBoolean(a);
        builder.writeBoolean(b);
        const source = (await provider.get(121304, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getAugmentedShiftLeft(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(104823, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getAugmentedShiftRight(provider, a, b) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(a);
        builder.writeNumber(b);
        const source = (await provider.get(110189, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getShiftLeft0(provider, i) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(i);
        const source = (await provider.get(106230, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getShiftRight0(provider, i) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(i);
        const source = (await provider.get(78486, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getSign(provider, x) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(x);
        const source = (await provider.get(115590, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getDivc(provider, x, y) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(x);
        builder.writeNumber(y);
        const source = (await provider.get(92387, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getMuldivc(provider, x, y, z) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(x);
        builder.writeNumber(y);
        builder.writeNumber(z);
        const source = (await provider.get(107929, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getMulShiftRight(provider, x, y, z) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(x);
        builder.writeNumber(y);
        builder.writeNumber(z);
        const source = (await provider.get(127246, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getMulShiftRightRound(provider, x, y, z) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(x);
        builder.writeNumber(y);
        builder.writeNumber(z);
        const source = (await provider.get(121903, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getMulShiftRightCeil(provider, x, y, z) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(x);
        builder.writeNumber(y);
        builder.writeNumber(z);
        const source = (await provider.get(93115, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getSqrt(provider, x) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(x);
        const source = (await provider.get(91833, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
}
exports.MathTester = MathTester;
