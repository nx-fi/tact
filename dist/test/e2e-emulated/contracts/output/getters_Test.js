"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = exports.Test_getterMapping = void 0;
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
exports.storeDeploy = storeDeploy;
exports.loadDeploy = loadDeploy;
exports.storeDeployOk = storeDeployOk;
exports.loadDeployOk = loadDeployOk;
exports.storeFactoryDeploy = storeFactoryDeploy;
exports.loadFactoryDeploy = loadFactoryDeploy;
exports.storeS = storeS;
exports.loadS = loadS;
exports.storeSetIdAndData = storeSetIdAndData;
exports.loadSetIdAndData = loadSetIdAndData;
exports.storeTest$Data = storeTest$Data;
exports.loadTest$Data = loadTest$Data;
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
function storeS(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
        b_0.storeInt(src.b, 257);
    };
}
function loadS(slice) {
    const sc_0 = slice;
    const _a = sc_0.loadIntBig(257);
    const _b = sc_0.loadIntBig(257);
    return { $$type: 'S', a: _a, b: _b };
}
function loadTupleS(source) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    return { $$type: 'S', a: _a, b: _b };
}
function loadGetterTupleS(source) {
    const _a = source.readBigNumber();
    const _b = source.readBigNumber();
    return { $$type: 'S', a: _a, b: _b };
}
function storeTupleS(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.a);
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
function storeSetIdAndData(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(1746430141, 32);
        b_0.storeInt(src.id, 257);
        b_0.storeRef(src.data);
    };
}
function loadSetIdAndData(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1746430141) {
        throw Error('Invalid prefix');
    }
    const _id = sc_0.loadIntBig(257);
    const _data = sc_0.loadRef();
    return { $$type: 'SetIdAndData', id: _id, data: _data };
}
function loadTupleSetIdAndData(source) {
    const _id = source.readBigNumber();
    const _data = source.readCell();
    return { $$type: 'SetIdAndData', id: _id, data: _data };
}
function loadGetterTupleSetIdAndData(source) {
    const _id = source.readBigNumber();
    const _data = source.readCell();
    return { $$type: 'SetIdAndData', id: _id, data: _data };
}
function storeTupleSetIdAndData(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeCell(source.data);
    return builder.build();
}
function dictValueParserSetIdAndData() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSetIdAndData(src)).endCell());
        },
        parse: (src) => {
            return loadSetIdAndData(src.loadRef().beginParse());
        }
    };
}
function storeTest$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(src.id, 32);
        b_0.storeRef(src.anotherData);
    };
}
function loadTest$Data(slice) {
    const sc_0 = slice;
    const _id = sc_0.loadUintBig(32);
    const _anotherData = sc_0.loadRef();
    return { $$type: 'Test$Data', id: _id, anotherData: _anotherData };
}
function loadTupleTest$Data(source) {
    const _id = source.readBigNumber();
    const _anotherData = source.readCell();
    return { $$type: 'Test$Data', id: _id, anotherData: _anotherData };
}
function loadGetterTupleTest$Data(source) {
    const _id = source.readBigNumber();
    const _anotherData = source.readCell();
    return { $$type: 'Test$Data', id: _id, anotherData: _anotherData };
}
function storeTupleTest$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeCell(source.anotherData);
    return builder.build();
}
function dictValueParserTest$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeTest$Data(src)).endCell());
        },
        parse: (src) => {
            return loadTest$Data(src.loadRef().beginParse());
        }
    };
}
function initTest_init_args(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
async function Test_init() {
    const __code = core_1.Cell.fromBase64('te6ccgECJAEAAeQAART/APSkE/S88sgLAQIBIAIDAgEgBAUCDtLbPNs8bCEiIwIBIAYHAg7x2zzbPGwhIiMCASAICQIBIA8QAgEgCgsCEb1/Rtnm2eNhDCIjA/fcA6DlrkOkAaQB9IBCIGigzN4J8MIF8MW2eAckvgfAAwBBrgrfRmBDBCDQMNF7dRww2GMCAgOuAaiy2CWQ/gOUALIFlj+Zk9qpwAMEISjVMW11HU+mfgJjkAMEIV/yHq6xlj+Wf5Il8IQC4Nu2eZD+A5QAsgWWP5mT2qnBIgwNAg3dtnm2eNhDIg4AoG1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQIxA2VSISyM+FgMoAz4RAzgH6AoBpz0ACXG4BbqiTW8+BnVjPhoDPhID0APQAz4Hi9ADJAfsAAApfA/LAggAEgw0CASAREgIBIBgZAgFmExQCEbvh/bPNs8bCGCIXAhGv2O2ebZ42EUAiFQIRre5tnm2eNhDAIhYAAlwAAnMAAnECEbsabbPNs8bCGCIaAgEgGxwAAnICF7fYTeRbZ4tbZ42EMCIdAgEgHh8AAjACAVggIQETsbHbyLbPFpsIoCIBEqthbyLbPFpsIiIBEqqhbyLbPFpsIiIAJO1E0NIAAZbTH9RZbBLgMHDIyQACfw==');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initTest_init_args({ $$type: 'Test_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const Test_errors = {
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
const Test_types = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "Deploy", "header": 2490013878, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "DeployOk", "header": 2952335191, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "FactoryDeploy", "header": 1829761339, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "cashback", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "S", "header": null, "fields": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "SetIdAndData", "header": 1746430141, "fields": [{ "name": "id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Test$Data", "header": null, "fields": [{ "name": "id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 32 } }, { "name": "anotherData", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
];
const Test_getters = [
    { "name": "testGetter", "methodId": 97823, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "test_getter", "methodId": 111014, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "Test_getter", "methodId": 72668, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "contractData", "methodId": 71601, "arguments": [], "returnType": { "kind": "simple", "type": "Test$Data", "optional": false } },
    { "name": "structAsInput", "methodId": 128711, "arguments": [{ "name": "s", "type": { "kind": "simple", "type": "S", "optional": false } }], "returnType": { "kind": "simple", "type": "S", "optional": false } },
    { "name": "messageAsInput1", "methodId": 122562, "arguments": [{ "name": "m", "type": { "kind": "simple", "type": "SetIdAndData", "optional": false } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "messageAsInput2", "methodId": 126625, "arguments": [{ "name": "m", "type": { "kind": "simple", "type": "SetIdAndData", "optional": false } }], "returnType": { "kind": "simple", "type": "SetIdAndData", "optional": false } },
    { "name": "contractAsInput", "methodId": 125793, "arguments": [{ "name": "test", "type": { "kind": "simple", "type": "Test$Data", "optional": false } }], "returnType": { "kind": "simple", "type": "Test$Data", "optional": false } },
    { "name": "methodIdExpr", "methodId": 45032, "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "methodIdConst", "methodId": 16384, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "methodIdMin", "methodId": -262144, "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "methodIdMax", "methodId": 262143, "arguments": [], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
];
exports.Test_getterMapping = {
    'testGetter': 'getTestGetter',
    'test_getter': 'gettest_getter',
    'Test_getter': 'getTest_getter',
    'contractData': 'getContractData',
    'structAsInput': 'getStructAsInput',
    'messageAsInput1': 'getMessageAsInput1',
    'messageAsInput2': 'getMessageAsInput2',
    'contractAsInput': 'getContractAsInput',
    'methodIdExpr': 'getMethodIdExpr',
    'methodIdConst': 'getMethodIdConst',
    'methodIdMin': 'getMethodIdMin',
    'methodIdMax': 'getMethodIdMax',
};
const Test_receivers = [
    { "receiver": "internal", "message": { "kind": "typed", "type": "SetIdAndData" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Deploy" } },
];
class Test {
    static async init() {
        return await Test_init();
    }
    static async fromInit() {
        const __gen_init = await Test_init();
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new Test(address, __gen_init);
    }
    static fromAddress(address) {
        return new Test(address);
    }
    address;
    init;
    abi = {
        types: Test_types,
        getters: Test_getters,
        receivers: Test_receivers,
        errors: Test_errors,
    };
    constructor(address, init) {
        this.address = address;
        this.init = init;
    }
    async send(provider, via, args, message) {
        let body = null;
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'SetIdAndData') {
            body = (0, core_1.beginCell)().store(storeSetIdAndData(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'Deploy') {
            body = (0, core_1.beginCell)().store(storeDeploy(message)).endCell();
        }
        if (body === null) {
            throw new Error('Invalid message type');
        }
        await provider.internal(via, { ...args, body: body });
    }
    async getTestGetter(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(97823, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async gettest_getter(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(111014, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getTest_getter(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(72668, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getContractData(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(71601, builder.build())).stack;
        const result = loadGetterTupleTest$Data(source);
        return result;
    }
    async getStructAsInput(provider, s) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleS(s));
        const source = (await provider.get(128711, builder.build())).stack;
        const result = loadGetterTupleS(source);
        return result;
    }
    async getMessageAsInput1(provider, m) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleSetIdAndData(m));
        const source = (await provider.get(122562, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getMessageAsInput2(provider, m) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleSetIdAndData(m));
        const source = (await provider.get(126625, builder.build())).stack;
        const result = loadGetterTupleSetIdAndData(source);
        return result;
    }
    async getContractAsInput(provider, test) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleTest$Data(test));
        const source = (await provider.get(125793, builder.build())).stack;
        const result = loadGetterTupleTest$Data(source);
        return result;
    }
    async getMethodIdExpr(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(45032, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getMethodIdConst(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(16384, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getMethodIdMin(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(-262144, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getMethodIdMax(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(262143, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
}
exports.Test = Test;
