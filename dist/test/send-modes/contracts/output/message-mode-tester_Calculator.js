"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = exports.Calculator_getterMapping = void 0;
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
exports.storeAverageRequest = storeAverageRequest;
exports.loadAverageRequest = loadAverageRequest;
exports.storeAverageResult = storeAverageResult;
exports.loadAverageResult = loadAverageResult;
exports.storeCalculator$Data = storeCalculator$Data;
exports.loadCalculator$Data = loadCalculator$Data;
exports.storeDoCalculatorRequest = storeDoCalculatorRequest;
exports.loadDoCalculatorRequest = loadDoCalculatorRequest;
exports.storeMessageModeTester$Data = storeMessageModeTester$Data;
exports.loadMessageModeTester$Data = loadMessageModeTester$Data;
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
function storeAverageRequest(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(3337606158, 32);
        b_0.storeUint(src.from, 32);
        b_0.storeUint(src.to, 32);
        b_0.storeInt(src.amountToPayInResponse, 257);
    };
}
function loadAverageRequest(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3337606158) {
        throw Error('Invalid prefix');
    }
    const _from = sc_0.loadUintBig(32);
    const _to = sc_0.loadUintBig(32);
    const _amountToPayInResponse = sc_0.loadIntBig(257);
    return { $$type: 'AverageRequest', from: _from, to: _to, amountToPayInResponse: _amountToPayInResponse };
}
function loadTupleAverageRequest(source) {
    const _from = source.readBigNumber();
    const _to = source.readBigNumber();
    const _amountToPayInResponse = source.readBigNumber();
    return { $$type: 'AverageRequest', from: _from, to: _to, amountToPayInResponse: _amountToPayInResponse };
}
function loadGetterTupleAverageRequest(source) {
    const _from = source.readBigNumber();
    const _to = source.readBigNumber();
    const _amountToPayInResponse = source.readBigNumber();
    return { $$type: 'AverageRequest', from: _from, to: _to, amountToPayInResponse: _amountToPayInResponse };
}
function storeTupleAverageRequest(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.from);
    builder.writeNumber(source.to);
    builder.writeNumber(source.amountToPayInResponse);
    return builder.build();
}
function dictValueParserAverageRequest() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeAverageRequest(src)).endCell());
        },
        parse: (src) => {
            return loadAverageRequest(src.loadRef().beginParse());
        }
    };
}
function storeAverageResult(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(23842436, 32);
        b_0.storeUint(src.res, 32);
    };
}
function loadAverageResult(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 23842436) {
        throw Error('Invalid prefix');
    }
    const _res = sc_0.loadUintBig(32);
    return { $$type: 'AverageResult', res: _res };
}
function loadTupleAverageResult(source) {
    const _res = source.readBigNumber();
    return { $$type: 'AverageResult', res: _res };
}
function loadGetterTupleAverageResult(source) {
    const _res = source.readBigNumber();
    return { $$type: 'AverageResult', res: _res };
}
function storeTupleAverageResult(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.res);
    return builder.build();
}
function dictValueParserAverageResult() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeAverageResult(src)).endCell());
        },
        parse: (src) => {
            return loadAverageResult(src.loadRef().beginParse());
        }
    };
}
function storeCalculator$Data(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
function loadCalculator$Data(slice) {
    const sc_0 = slice;
    return { $$type: 'Calculator$Data' };
}
function loadTupleCalculator$Data(source) {
    return { $$type: 'Calculator$Data' };
}
function loadGetterTupleCalculator$Data(source) {
    return { $$type: 'Calculator$Data' };
}
function storeTupleCalculator$Data(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserCalculator$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeCalculator$Data(src)).endCell());
        },
        parse: (src) => {
            return loadCalculator$Data(src.loadRef().beginParse());
        }
    };
}
function storeDoCalculatorRequest(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(1607210036, 32);
        b_0.storeUint(src.from, 32);
        b_0.storeUint(src.to, 32);
        b_0.storeInt(src.amountToPayInRequest, 257);
        b_0.storeInt(src.amountToPayInCalculatorResponse, 257);
    };
}
function loadDoCalculatorRequest(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607210036) {
        throw Error('Invalid prefix');
    }
    const _from = sc_0.loadUintBig(32);
    const _to = sc_0.loadUintBig(32);
    const _amountToPayInRequest = sc_0.loadIntBig(257);
    const _amountToPayInCalculatorResponse = sc_0.loadIntBig(257);
    return { $$type: 'DoCalculatorRequest', from: _from, to: _to, amountToPayInRequest: _amountToPayInRequest, amountToPayInCalculatorResponse: _amountToPayInCalculatorResponse };
}
function loadTupleDoCalculatorRequest(source) {
    const _from = source.readBigNumber();
    const _to = source.readBigNumber();
    const _amountToPayInRequest = source.readBigNumber();
    const _amountToPayInCalculatorResponse = source.readBigNumber();
    return { $$type: 'DoCalculatorRequest', from: _from, to: _to, amountToPayInRequest: _amountToPayInRequest, amountToPayInCalculatorResponse: _amountToPayInCalculatorResponse };
}
function loadGetterTupleDoCalculatorRequest(source) {
    const _from = source.readBigNumber();
    const _to = source.readBigNumber();
    const _amountToPayInRequest = source.readBigNumber();
    const _amountToPayInCalculatorResponse = source.readBigNumber();
    return { $$type: 'DoCalculatorRequest', from: _from, to: _to, amountToPayInRequest: _amountToPayInRequest, amountToPayInCalculatorResponse: _amountToPayInCalculatorResponse };
}
function storeTupleDoCalculatorRequest(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.from);
    builder.writeNumber(source.to);
    builder.writeNumber(source.amountToPayInRequest);
    builder.writeNumber(source.amountToPayInCalculatorResponse);
    return builder.build();
}
function dictValueParserDoCalculatorRequest() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeDoCalculatorRequest(src)).endCell());
        },
        parse: (src) => {
            return loadDoCalculatorRequest(src.loadRef().beginParse());
        }
    };
}
function storeMessageModeTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.val, 257);
    };
}
function loadMessageModeTester$Data(slice) {
    const sc_0 = slice;
    const _val = sc_0.loadIntBig(257);
    return { $$type: 'MessageModeTester$Data', val: _val };
}
function loadTupleMessageModeTester$Data(source) {
    const _val = source.readBigNumber();
    return { $$type: 'MessageModeTester$Data', val: _val };
}
function loadGetterTupleMessageModeTester$Data(source) {
    const _val = source.readBigNumber();
    return { $$type: 'MessageModeTester$Data', val: _val };
}
function storeTupleMessageModeTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.val);
    return builder.build();
}
function dictValueParserMessageModeTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMessageModeTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMessageModeTester$Data(src.loadRef().beginParse());
        }
    };
}
function initCalculator_init_args(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
async function Calculator_init() {
    const __code = core_1.Cell.fromBase64('te6ccgEBBAEA6AABFP8A9KQT9LzyyAsBApjTAdBy1yHSANIA+kAhEDRQZm8E+GEC+GLbPAKRW+BwIddJIMIflTEB0x8C3iGCEMbv1A664wIywAABwSGwmTDIfwHKAMntVOAw8sCCAgMAFO1E0NIAMJFt4G0A+lvTH9MfgQEB1wBVIDOBY3NTEqHC//L0UwGhpHCSXbuVI6ADpAPoMzGpBPhCcALIAYIJa86EWMsfyx/JE3BQNG0DbVAjyM+FgMoAz4RAzgH6AoBpz0ACXG4BbqiTW8+BnVjPhoDPhID0APQAz4Hi9ADJAfsAMMh/AcoAye1U');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initCalculator_init_args({ $$type: 'Calculator_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const Calculator_errors = {
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
    25459: { message: `There must exist at least one number in the interval.` },
};
const Calculator_types = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "AverageRequest", "header": 3337606158, "fields": [{ "name": "from", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 32 } }, { "name": "to", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 32 } }, { "name": "amountToPayInResponse", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "AverageResult", "header": 23842436, "fields": [{ "name": "res", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 32 } }] },
    { "name": "Calculator$Data", "header": null, "fields": [] },
    { "name": "DoCalculatorRequest", "header": 1607210036, "fields": [{ "name": "from", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 32 } }, { "name": "to", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 32 } }, { "name": "amountToPayInRequest", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "amountToPayInCalculatorResponse", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "MessageModeTester$Data", "header": null, "fields": [{ "name": "val", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
];
const Calculator_getters = [];
exports.Calculator_getterMapping = {};
const Calculator_receivers = [
    { "receiver": "internal", "message": { "kind": "empty" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "AverageRequest" } },
];
class Calculator {
    static async init() {
        return await Calculator_init();
    }
    static async fromInit() {
        const __gen_init = await Calculator_init();
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new Calculator(address, __gen_init);
    }
    static fromAddress(address) {
        return new Calculator(address);
    }
    address;
    init;
    abi = {
        types: Calculator_types,
        getters: Calculator_getters,
        receivers: Calculator_receivers,
        errors: Calculator_errors,
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
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'AverageRequest') {
            body = (0, core_1.beginCell)().store(storeAverageRequest(message)).endCell();
        }
        if (body === null) {
            throw new Error('Invalid message type');
        }
        await provider.internal(via, { ...args, body: body });
    }
}
exports.Calculator = Calculator;
