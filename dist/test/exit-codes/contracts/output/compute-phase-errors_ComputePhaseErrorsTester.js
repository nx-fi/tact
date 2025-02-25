"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComputePhaseErrorsTester = exports.ComputePhaseErrorsTester_getterMapping = void 0;
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
exports.storeComputePhaseErrorsTester$Data = storeComputePhaseErrorsTester$Data;
exports.loadComputePhaseErrorsTester$Data = loadComputePhaseErrorsTester$Data;
exports.storeExitCode4 = storeExitCode4;
exports.loadExitCode4 = loadExitCode4;
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
function storeComputePhaseErrorsTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.tmpI, 257);
        b_0.storeRef(src.tmpC);
    };
}
function loadComputePhaseErrorsTester$Data(slice) {
    const sc_0 = slice;
    const _tmpI = sc_0.loadIntBig(257);
    const _tmpC = sc_0.loadRef();
    return { $$type: 'ComputePhaseErrorsTester$Data', tmpI: _tmpI, tmpC: _tmpC };
}
function loadTupleComputePhaseErrorsTester$Data(source) {
    const _tmpI = source.readBigNumber();
    const _tmpC = source.readCell();
    return { $$type: 'ComputePhaseErrorsTester$Data', tmpI: _tmpI, tmpC: _tmpC };
}
function loadGetterTupleComputePhaseErrorsTester$Data(source) {
    const _tmpI = source.readBigNumber();
    const _tmpC = source.readCell();
    return { $$type: 'ComputePhaseErrorsTester$Data', tmpI: _tmpI, tmpC: _tmpC };
}
function storeTupleComputePhaseErrorsTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.tmpI);
    builder.writeCell(source.tmpC);
    return builder.build();
}
function dictValueParserComputePhaseErrorsTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeComputePhaseErrorsTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadComputePhaseErrorsTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeExitCode4(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(4, 32);
        b_0.storeUint(src.val0, 2);
        b_0.storeUint(src.val1, 2);
    };
}
function loadExitCode4(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4) {
        throw Error('Invalid prefix');
    }
    const _val0 = sc_0.loadUintBig(2);
    const _val1 = sc_0.loadUintBig(2);
    return { $$type: 'ExitCode4', val0: _val0, val1: _val1 };
}
function loadTupleExitCode4(source) {
    const _val0 = source.readBigNumber();
    const _val1 = source.readBigNumber();
    return { $$type: 'ExitCode4', val0: _val0, val1: _val1 };
}
function loadGetterTupleExitCode4(source) {
    const _val0 = source.readBigNumber();
    const _val1 = source.readBigNumber();
    return { $$type: 'ExitCode4', val0: _val0, val1: _val1 };
}
function storeTupleExitCode4(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.val0);
    builder.writeNumber(source.val1);
    return builder.build();
}
function dictValueParserExitCode4() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeExitCode4(src)).endCell());
        },
        parse: (src) => {
            return loadExitCode4(src.loadRef().beginParse());
        }
    };
}
function initComputePhaseErrorsTester_init_args(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
async function ComputePhaseErrorsTester_init() {
    const __code = core_1.Cell.fromBase64('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');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initComputePhaseErrorsTester_init_args({ $$type: 'ComputePhaseErrorsTester_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const ComputePhaseErrorsTester_errors = {
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
    2696: { message: `Negation didn't cause an integer overflow` },
    2983: { message: `1024 bits didn't cause the cell overflow` },
    4287: { message: `Loading 1 ref from an empty Slice didn't cause the cell underflow` },
    13102: { message: `Subtraction didn't cause an integer overflow` },
    13733: { message: `Division didn't cause an integer overflow` },
    16776: { message: `Loading 1 bit from an empty Slice didn't cause the cell underflow` },
    19158: { message: `5 refs didn't cause the cell overflow` },
    27951: { message: `Division by zero didn't cause an integer overflow` },
    34908: { message: `Modulo by zero didn't cause an integer overflow` },
    43549: { message: `Multiplication didn't cause an integer overflow` },
    54296: { message: `Addition didn't cause an integer overflow` },
};
const ComputePhaseErrorsTester_types = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "ComputePhaseErrorsTester$Data", "header": null, "fields": [{ "name": "tmpI", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "tmpC", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "ExitCode4", "header": 4, "fields": [{ "name": "val0", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 2 } }, { "name": "val1", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 2 } }] },
];
const ComputePhaseErrorsTester_getters = [];
exports.ComputePhaseErrorsTester_getterMapping = {};
const ComputePhaseErrorsTester_receivers = [
    { "receiver": "internal", "message": { "kind": "empty" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "0" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "1" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "2" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "3" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "ExitCode4" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "5" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "6" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "7" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "8" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "9" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "10" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "11" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "13" } },
];
class ComputePhaseErrorsTester {
    static async init() {
        return await ComputePhaseErrorsTester_init();
    }
    static async fromInit() {
        const __gen_init = await ComputePhaseErrorsTester_init();
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new ComputePhaseErrorsTester(address, __gen_init);
    }
    static fromAddress(address) {
        return new ComputePhaseErrorsTester(address);
    }
    address;
    init;
    abi = {
        types: ComputePhaseErrorsTester_types,
        getters: ComputePhaseErrorsTester_getters,
        receivers: ComputePhaseErrorsTester_receivers,
        errors: ComputePhaseErrorsTester_errors,
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
        if (message === "0") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "1") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "2") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "3") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'ExitCode4') {
            body = (0, core_1.beginCell)().store(storeExitCode4(message)).endCell();
        }
        if (message === "5") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "6") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "7") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "8") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "9") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "10") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "11") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "13") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) {
            throw new Error('Invalid message type');
        }
        await provider.internal(via, { ...args, body: body });
    }
}
exports.ComputePhaseErrorsTester = ComputePhaseErrorsTester;
