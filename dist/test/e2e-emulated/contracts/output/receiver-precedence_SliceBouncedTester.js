"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliceBouncedTester = exports.SliceBouncedTester_getterMapping = void 0;
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
exports.storeMessage = storeMessage;
exports.loadMessage = loadMessage;
exports.storeEmpty = storeEmpty;
exports.loadEmpty = loadEmpty;
exports.storeBinaryIntOperation = storeBinaryIntOperation;
exports.loadBinaryIntOperation = loadBinaryIntOperation;
exports.storeBinaryIntResult = storeBinaryIntResult;
exports.loadBinaryIntResult = loadBinaryIntResult;
exports.storeSendCellToAddress = storeSendCellToAddress;
exports.loadSendCellToAddress = loadSendCellToAddress;
exports.storeCalculator$Data = storeCalculator$Data;
exports.loadCalculator$Data = loadCalculator$Data;
exports.storeReceiverTester$Data = storeReceiverTester$Data;
exports.loadReceiverTester$Data = loadReceiverTester$Data;
exports.storeNoReceiverTester$Data = storeNoReceiverTester$Data;
exports.loadNoReceiverTester$Data = loadNoReceiverTester$Data;
exports.storeEmptyReceiverTester$Data = storeEmptyReceiverTester$Data;
exports.loadEmptyReceiverTester$Data = loadEmptyReceiverTester$Data;
exports.storeCommentReceiverTester$Data = storeCommentReceiverTester$Data;
exports.loadCommentReceiverTester$Data = loadCommentReceiverTester$Data;
exports.storeStringReceiverTester$Data = storeStringReceiverTester$Data;
exports.loadStringReceiverTester$Data = loadStringReceiverTester$Data;
exports.storeBinaryReceiverTester$Data = storeBinaryReceiverTester$Data;
exports.loadBinaryReceiverTester$Data = loadBinaryReceiverTester$Data;
exports.storeSliceReceiverTester$Data = storeSliceReceiverTester$Data;
exports.loadSliceReceiverTester$Data = loadSliceReceiverTester$Data;
exports.storeEmptyAndCommentReceiverTester$Data = storeEmptyAndCommentReceiverTester$Data;
exports.loadEmptyAndCommentReceiverTester$Data = loadEmptyAndCommentReceiverTester$Data;
exports.storeEmptyAndStringReceiverTester$Data = storeEmptyAndStringReceiverTester$Data;
exports.loadEmptyAndStringReceiverTester$Data = loadEmptyAndStringReceiverTester$Data;
exports.storeEmptyAndBinaryReceiverTester$Data = storeEmptyAndBinaryReceiverTester$Data;
exports.loadEmptyAndBinaryReceiverTester$Data = loadEmptyAndBinaryReceiverTester$Data;
exports.storeEmptyAndSliceReceiverTester$Data = storeEmptyAndSliceReceiverTester$Data;
exports.loadEmptyAndSliceReceiverTester$Data = loadEmptyAndSliceReceiverTester$Data;
exports.storeCommentAndStringReceiverTester$Data = storeCommentAndStringReceiverTester$Data;
exports.loadCommentAndStringReceiverTester$Data = loadCommentAndStringReceiverTester$Data;
exports.storeCommentAndBinaryReceiverTester$Data = storeCommentAndBinaryReceiverTester$Data;
exports.loadCommentAndBinaryReceiverTester$Data = loadCommentAndBinaryReceiverTester$Data;
exports.storeCommentAndSliceReceiverTester$Data = storeCommentAndSliceReceiverTester$Data;
exports.loadCommentAndSliceReceiverTester$Data = loadCommentAndSliceReceiverTester$Data;
exports.storeStringAndBinaryReceiverTester$Data = storeStringAndBinaryReceiverTester$Data;
exports.loadStringAndBinaryReceiverTester$Data = loadStringAndBinaryReceiverTester$Data;
exports.storeStringAndSliceReceiverTester$Data = storeStringAndSliceReceiverTester$Data;
exports.loadStringAndSliceReceiverTester$Data = loadStringAndSliceReceiverTester$Data;
exports.storeBinaryAndSliceReceiverTester$Data = storeBinaryAndSliceReceiverTester$Data;
exports.loadBinaryAndSliceReceiverTester$Data = loadBinaryAndSliceReceiverTester$Data;
exports.storeEmptyAndCommentAndStringReceiverTester$Data = storeEmptyAndCommentAndStringReceiverTester$Data;
exports.loadEmptyAndCommentAndStringReceiverTester$Data = loadEmptyAndCommentAndStringReceiverTester$Data;
exports.storeEmptyAndCommentAndBinaryReceiverTester$Data = storeEmptyAndCommentAndBinaryReceiverTester$Data;
exports.loadEmptyAndCommentAndBinaryReceiverTester$Data = loadEmptyAndCommentAndBinaryReceiverTester$Data;
exports.storeEmptyAndCommentAndSliceReceiverTester$Data = storeEmptyAndCommentAndSliceReceiverTester$Data;
exports.loadEmptyAndCommentAndSliceReceiverTester$Data = loadEmptyAndCommentAndSliceReceiverTester$Data;
exports.storeEmptyAndStringAndBinaryReceiverTester$Data = storeEmptyAndStringAndBinaryReceiverTester$Data;
exports.loadEmptyAndStringAndBinaryReceiverTester$Data = loadEmptyAndStringAndBinaryReceiverTester$Data;
exports.storeEmptyAndStringAndSliceReceiverTester$Data = storeEmptyAndStringAndSliceReceiverTester$Data;
exports.loadEmptyAndStringAndSliceReceiverTester$Data = loadEmptyAndStringAndSliceReceiverTester$Data;
exports.storeEmptyAndBinaryAndSliceReceiverTester$Data = storeEmptyAndBinaryAndSliceReceiverTester$Data;
exports.loadEmptyAndBinaryAndSliceReceiverTester$Data = loadEmptyAndBinaryAndSliceReceiverTester$Data;
exports.storeCommentAndStringAndBinaryReceiverTester$Data = storeCommentAndStringAndBinaryReceiverTester$Data;
exports.loadCommentAndStringAndBinaryReceiverTester$Data = loadCommentAndStringAndBinaryReceiverTester$Data;
exports.storeCommentAndStringAndSliceReceiverTester$Data = storeCommentAndStringAndSliceReceiverTester$Data;
exports.loadCommentAndStringAndSliceReceiverTester$Data = loadCommentAndStringAndSliceReceiverTester$Data;
exports.storeCommentAndBinaryAndSliceReceiverTester$Data = storeCommentAndBinaryAndSliceReceiverTester$Data;
exports.loadCommentAndBinaryAndSliceReceiverTester$Data = loadCommentAndBinaryAndSliceReceiverTester$Data;
exports.storeStringAndBinaryAndSliceReceiverTester$Data = storeStringAndBinaryAndSliceReceiverTester$Data;
exports.loadStringAndBinaryAndSliceReceiverTester$Data = loadStringAndBinaryAndSliceReceiverTester$Data;
exports.storeEmptyAndCommentAndStringAndBinaryReceiverTester$Data = storeEmptyAndCommentAndStringAndBinaryReceiverTester$Data;
exports.loadEmptyAndCommentAndStringAndBinaryReceiverTester$Data = loadEmptyAndCommentAndStringAndBinaryReceiverTester$Data;
exports.storeEmptyAndCommentAndStringAndSliceReceiverTester$Data = storeEmptyAndCommentAndStringAndSliceReceiverTester$Data;
exports.loadEmptyAndCommentAndStringAndSliceReceiverTester$Data = loadEmptyAndCommentAndStringAndSliceReceiverTester$Data;
exports.storeEmptyAndCommentAndBinaryAndSliceReceiverTester$Data = storeEmptyAndCommentAndBinaryAndSliceReceiverTester$Data;
exports.loadEmptyAndCommentAndBinaryAndSliceReceiverTester$Data = loadEmptyAndCommentAndBinaryAndSliceReceiverTester$Data;
exports.storeEmptyAndStringAndBinaryAndSliceReceiverTester$Data = storeEmptyAndStringAndBinaryAndSliceReceiverTester$Data;
exports.loadEmptyAndStringAndBinaryAndSliceReceiverTester$Data = loadEmptyAndStringAndBinaryAndSliceReceiverTester$Data;
exports.storeCommentAndStringAndBinaryAndSliceReceiverTester$Data = storeCommentAndStringAndBinaryAndSliceReceiverTester$Data;
exports.loadCommentAndStringAndBinaryAndSliceReceiverTester$Data = loadCommentAndStringAndBinaryAndSliceReceiverTester$Data;
exports.storeAllReceiverTester$Data = storeAllReceiverTester$Data;
exports.loadAllReceiverTester$Data = loadAllReceiverTester$Data;
exports.storeEmptyBouncedTester$Data = storeEmptyBouncedTester$Data;
exports.loadEmptyBouncedTester$Data = loadEmptyBouncedTester$Data;
exports.storeBinaryBouncedTester$Data = storeBinaryBouncedTester$Data;
exports.loadBinaryBouncedTester$Data = loadBinaryBouncedTester$Data;
exports.storeSliceBouncedTester$Data = storeSliceBouncedTester$Data;
exports.loadSliceBouncedTester$Data = loadSliceBouncedTester$Data;
exports.storeAllBouncedTester$Data = storeAllBouncedTester$Data;
exports.loadAllBouncedTester$Data = loadAllBouncedTester$Data;
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
function storeMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(100, 32);
        b_0.storeStringRefTail(src.msg);
    };
}
function loadMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 100) {
        throw Error('Invalid prefix');
    }
    const _msg = sc_0.loadStringRefTail();
    return { $$type: 'Message', msg: _msg };
}
function loadTupleMessage(source) {
    const _msg = source.readString();
    return { $$type: 'Message', msg: _msg };
}
function loadGetterTupleMessage(source) {
    const _msg = source.readString();
    return { $$type: 'Message', msg: _msg };
}
function storeTupleMessage(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.msg);
    return builder.build();
}
function dictValueParserMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMessage(src)).endCell());
        },
        parse: (src) => {
            return loadMessage(src.loadRef().beginParse());
        }
    };
}
function storeEmpty(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(101, 32);
    };
}
function loadEmpty(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 101) {
        throw Error('Invalid prefix');
    }
    return { $$type: 'Empty' };
}
function loadTupleEmpty(source) {
    return { $$type: 'Empty' };
}
function loadGetterTupleEmpty(source) {
    return { $$type: 'Empty' };
}
function storeTupleEmpty(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserEmpty() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEmpty(src)).endCell());
        },
        parse: (src) => {
            return loadEmpty(src.loadRef().beginParse());
        }
    };
}
function storeBinaryIntOperation(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(829886522, 32);
        b_0.storeStringRefTail(src.op);
        b_0.storeInt(src.val1, 257);
        b_0.storeInt(src.val2, 257);
    };
}
function loadBinaryIntOperation(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 829886522) {
        throw Error('Invalid prefix');
    }
    const _op = sc_0.loadStringRefTail();
    const _val1 = sc_0.loadIntBig(257);
    const _val2 = sc_0.loadIntBig(257);
    return { $$type: 'BinaryIntOperation', op: _op, val1: _val1, val2: _val2 };
}
function loadTupleBinaryIntOperation(source) {
    const _op = source.readString();
    const _val1 = source.readBigNumber();
    const _val2 = source.readBigNumber();
    return { $$type: 'BinaryIntOperation', op: _op, val1: _val1, val2: _val2 };
}
function loadGetterTupleBinaryIntOperation(source) {
    const _op = source.readString();
    const _val1 = source.readBigNumber();
    const _val2 = source.readBigNumber();
    return { $$type: 'BinaryIntOperation', op: _op, val1: _val1, val2: _val2 };
}
function storeTupleBinaryIntOperation(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.op);
    builder.writeNumber(source.val1);
    builder.writeNumber(source.val2);
    return builder.build();
}
function dictValueParserBinaryIntOperation() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeBinaryIntOperation(src)).endCell());
        },
        parse: (src) => {
            return loadBinaryIntOperation(src.loadRef().beginParse());
        }
    };
}
function storeBinaryIntResult(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(4234356752, 32);
        b_0.storeInt(src.val, 257);
    };
}
function loadBinaryIntResult(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4234356752) {
        throw Error('Invalid prefix');
    }
    const _val = sc_0.loadIntBig(257);
    return { $$type: 'BinaryIntResult', val: _val };
}
function loadTupleBinaryIntResult(source) {
    const _val = source.readBigNumber();
    return { $$type: 'BinaryIntResult', val: _val };
}
function loadGetterTupleBinaryIntResult(source) {
    const _val = source.readBigNumber();
    return { $$type: 'BinaryIntResult', val: _val };
}
function storeTupleBinaryIntResult(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.val);
    return builder.build();
}
function dictValueParserBinaryIntResult() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeBinaryIntResult(src)).endCell());
        },
        parse: (src) => {
            return loadBinaryIntResult(src.loadRef().beginParse());
        }
    };
}
function storeSendCellToAddress(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(2141069065, 32);
        b_0.storeAddress(src.address);
        b_0.storeRef(src.body);
    };
}
function loadSendCellToAddress(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2141069065) {
        throw Error('Invalid prefix');
    }
    const _address = sc_0.loadAddress();
    const _body = sc_0.loadRef();
    return { $$type: 'SendCellToAddress', address: _address, body: _body };
}
function loadTupleSendCellToAddress(source) {
    const _address = source.readAddress();
    const _body = source.readCell();
    return { $$type: 'SendCellToAddress', address: _address, body: _body };
}
function loadGetterTupleSendCellToAddress(source) {
    const _address = source.readAddress();
    const _body = source.readCell();
    return { $$type: 'SendCellToAddress', address: _address, body: _body };
}
function storeTupleSendCellToAddress(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeCell(source.body);
    return builder.build();
}
function dictValueParserSendCellToAddress() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSendCellToAddress(src)).endCell());
        },
        parse: (src) => {
            return loadSendCellToAddress(src.loadRef().beginParse());
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
function storeReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiverKind);
    };
}
function loadReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiverKind = sc_0.loadStringRefTail();
    return { $$type: 'ReceiverTester$Data', receiverKind: _receiverKind };
}
function loadTupleReceiverTester$Data(source) {
    const _receiverKind = source.readString();
    return { $$type: 'ReceiverTester$Data', receiverKind: _receiverKind };
}
function loadGetterTupleReceiverTester$Data(source) {
    const _receiverKind = source.readString();
    return { $$type: 'ReceiverTester$Data', receiverKind: _receiverKind };
}
function storeTupleReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiverKind);
    return builder.build();
}
function dictValueParserReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeNoReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadNoReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'NoReceiverTester$Data', receiver: _receiver };
}
function loadTupleNoReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'NoReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleNoReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'NoReceiverTester$Data', receiver: _receiver };
}
function storeTupleNoReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserNoReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeNoReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadNoReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeEmptyReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadEmptyReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyReceiverTester$Data', receiver: _receiver };
}
function loadTupleEmptyReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleEmptyReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyReceiverTester$Data', receiver: _receiver };
}
function storeTupleEmptyReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserEmptyReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEmptyReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeCommentReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadCommentReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'CommentReceiverTester$Data', receiver: _receiver };
}
function loadTupleCommentReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'CommentReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleCommentReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'CommentReceiverTester$Data', receiver: _receiver };
}
function storeTupleCommentReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserCommentReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeCommentReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadCommentReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeStringReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadStringReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'StringReceiverTester$Data', receiver: _receiver };
}
function loadTupleStringReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'StringReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleStringReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'StringReceiverTester$Data', receiver: _receiver };
}
function storeTupleStringReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserStringReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeStringReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadStringReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeBinaryReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadBinaryReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'BinaryReceiverTester$Data', receiver: _receiver };
}
function loadTupleBinaryReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'BinaryReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleBinaryReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'BinaryReceiverTester$Data', receiver: _receiver };
}
function storeTupleBinaryReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserBinaryReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeBinaryReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadBinaryReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeSliceReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadSliceReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'SliceReceiverTester$Data', receiver: _receiver };
}
function loadTupleSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'SliceReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'SliceReceiverTester$Data', receiver: _receiver };
}
function storeTupleSliceReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserSliceReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeEmptyAndCommentReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadEmptyAndCommentReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndCommentReceiverTester$Data', receiver: _receiver };
}
function loadTupleEmptyAndCommentReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleEmptyAndCommentReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentReceiverTester$Data', receiver: _receiver };
}
function storeTupleEmptyAndCommentReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserEmptyAndCommentReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEmptyAndCommentReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndCommentReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeEmptyAndStringReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadEmptyAndStringReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndStringReceiverTester$Data', receiver: _receiver };
}
function loadTupleEmptyAndStringReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndStringReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleEmptyAndStringReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndStringReceiverTester$Data', receiver: _receiver };
}
function storeTupleEmptyAndStringReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserEmptyAndStringReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEmptyAndStringReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndStringReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeEmptyAndBinaryReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadEmptyAndBinaryReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndBinaryReceiverTester$Data', receiver: _receiver };
}
function loadTupleEmptyAndBinaryReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndBinaryReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleEmptyAndBinaryReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndBinaryReceiverTester$Data', receiver: _receiver };
}
function storeTupleEmptyAndBinaryReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserEmptyAndBinaryReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEmptyAndBinaryReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndBinaryReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeEmptyAndSliceReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadEmptyAndSliceReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadTupleEmptyAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleEmptyAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndSliceReceiverTester$Data', receiver: _receiver };
}
function storeTupleEmptyAndSliceReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserEmptyAndSliceReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEmptyAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeCommentAndStringReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadCommentAndStringReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'CommentAndStringReceiverTester$Data', receiver: _receiver };
}
function loadTupleCommentAndStringReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndStringReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleCommentAndStringReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndStringReceiverTester$Data', receiver: _receiver };
}
function storeTupleCommentAndStringReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserCommentAndStringReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeCommentAndStringReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadCommentAndStringReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeCommentAndBinaryReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadCommentAndBinaryReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'CommentAndBinaryReceiverTester$Data', receiver: _receiver };
}
function loadTupleCommentAndBinaryReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndBinaryReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleCommentAndBinaryReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndBinaryReceiverTester$Data', receiver: _receiver };
}
function storeTupleCommentAndBinaryReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserCommentAndBinaryReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeCommentAndBinaryReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadCommentAndBinaryReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeCommentAndSliceReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadCommentAndSliceReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'CommentAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadTupleCommentAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleCommentAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndSliceReceiverTester$Data', receiver: _receiver };
}
function storeTupleCommentAndSliceReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserCommentAndSliceReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeCommentAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadCommentAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeStringAndBinaryReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadStringAndBinaryReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'StringAndBinaryReceiverTester$Data', receiver: _receiver };
}
function loadTupleStringAndBinaryReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'StringAndBinaryReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleStringAndBinaryReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'StringAndBinaryReceiverTester$Data', receiver: _receiver };
}
function storeTupleStringAndBinaryReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserStringAndBinaryReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeStringAndBinaryReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadStringAndBinaryReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeStringAndSliceReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadStringAndSliceReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'StringAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadTupleStringAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'StringAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleStringAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'StringAndSliceReceiverTester$Data', receiver: _receiver };
}
function storeTupleStringAndSliceReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserStringAndSliceReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeStringAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadStringAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeBinaryAndSliceReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadBinaryAndSliceReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'BinaryAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadTupleBinaryAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'BinaryAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleBinaryAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'BinaryAndSliceReceiverTester$Data', receiver: _receiver };
}
function storeTupleBinaryAndSliceReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserBinaryAndSliceReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeBinaryAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadBinaryAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeEmptyAndCommentAndStringReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadEmptyAndCommentAndStringReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndCommentAndStringReceiverTester$Data', receiver: _receiver };
}
function loadTupleEmptyAndCommentAndStringReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndStringReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleEmptyAndCommentAndStringReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndStringReceiverTester$Data', receiver: _receiver };
}
function storeTupleEmptyAndCommentAndStringReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserEmptyAndCommentAndStringReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEmptyAndCommentAndStringReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndCommentAndStringReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeEmptyAndCommentAndBinaryReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadEmptyAndCommentAndBinaryReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndCommentAndBinaryReceiverTester$Data', receiver: _receiver };
}
function loadTupleEmptyAndCommentAndBinaryReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndBinaryReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleEmptyAndCommentAndBinaryReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndBinaryReceiverTester$Data', receiver: _receiver };
}
function storeTupleEmptyAndCommentAndBinaryReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserEmptyAndCommentAndBinaryReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEmptyAndCommentAndBinaryReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndCommentAndBinaryReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeEmptyAndCommentAndSliceReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadEmptyAndCommentAndSliceReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndCommentAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadTupleEmptyAndCommentAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleEmptyAndCommentAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndSliceReceiverTester$Data', receiver: _receiver };
}
function storeTupleEmptyAndCommentAndSliceReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserEmptyAndCommentAndSliceReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEmptyAndCommentAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndCommentAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeEmptyAndStringAndBinaryReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadEmptyAndStringAndBinaryReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndStringAndBinaryReceiverTester$Data', receiver: _receiver };
}
function loadTupleEmptyAndStringAndBinaryReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndStringAndBinaryReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleEmptyAndStringAndBinaryReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndStringAndBinaryReceiverTester$Data', receiver: _receiver };
}
function storeTupleEmptyAndStringAndBinaryReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserEmptyAndStringAndBinaryReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEmptyAndStringAndBinaryReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndStringAndBinaryReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeEmptyAndStringAndSliceReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadEmptyAndStringAndSliceReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndStringAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadTupleEmptyAndStringAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndStringAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleEmptyAndStringAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndStringAndSliceReceiverTester$Data', receiver: _receiver };
}
function storeTupleEmptyAndStringAndSliceReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserEmptyAndStringAndSliceReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEmptyAndStringAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndStringAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeEmptyAndBinaryAndSliceReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadEmptyAndBinaryAndSliceReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndBinaryAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadTupleEmptyAndBinaryAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndBinaryAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleEmptyAndBinaryAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndBinaryAndSliceReceiverTester$Data', receiver: _receiver };
}
function storeTupleEmptyAndBinaryAndSliceReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserEmptyAndBinaryAndSliceReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEmptyAndBinaryAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndBinaryAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeCommentAndStringAndBinaryReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadCommentAndStringAndBinaryReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'CommentAndStringAndBinaryReceiverTester$Data', receiver: _receiver };
}
function loadTupleCommentAndStringAndBinaryReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndStringAndBinaryReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleCommentAndStringAndBinaryReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndStringAndBinaryReceiverTester$Data', receiver: _receiver };
}
function storeTupleCommentAndStringAndBinaryReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserCommentAndStringAndBinaryReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeCommentAndStringAndBinaryReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadCommentAndStringAndBinaryReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeCommentAndStringAndSliceReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadCommentAndStringAndSliceReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'CommentAndStringAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadTupleCommentAndStringAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndStringAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleCommentAndStringAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndStringAndSliceReceiverTester$Data', receiver: _receiver };
}
function storeTupleCommentAndStringAndSliceReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserCommentAndStringAndSliceReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeCommentAndStringAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadCommentAndStringAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeCommentAndBinaryAndSliceReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadCommentAndBinaryAndSliceReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'CommentAndBinaryAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadTupleCommentAndBinaryAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndBinaryAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleCommentAndBinaryAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndBinaryAndSliceReceiverTester$Data', receiver: _receiver };
}
function storeTupleCommentAndBinaryAndSliceReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserCommentAndBinaryAndSliceReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeCommentAndBinaryAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadCommentAndBinaryAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeStringAndBinaryAndSliceReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadStringAndBinaryAndSliceReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'StringAndBinaryAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadTupleStringAndBinaryAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'StringAndBinaryAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleStringAndBinaryAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'StringAndBinaryAndSliceReceiverTester$Data', receiver: _receiver };
}
function storeTupleStringAndBinaryAndSliceReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserStringAndBinaryAndSliceReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeStringAndBinaryAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadStringAndBinaryAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeEmptyAndCommentAndStringAndBinaryReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadEmptyAndCommentAndStringAndBinaryReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndCommentAndStringAndBinaryReceiverTester$Data', receiver: _receiver };
}
function loadTupleEmptyAndCommentAndStringAndBinaryReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndStringAndBinaryReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleEmptyAndCommentAndStringAndBinaryReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndStringAndBinaryReceiverTester$Data', receiver: _receiver };
}
function storeTupleEmptyAndCommentAndStringAndBinaryReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserEmptyAndCommentAndStringAndBinaryReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEmptyAndCommentAndStringAndBinaryReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndCommentAndStringAndBinaryReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeEmptyAndCommentAndStringAndSliceReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadEmptyAndCommentAndStringAndSliceReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndCommentAndStringAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadTupleEmptyAndCommentAndStringAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndStringAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleEmptyAndCommentAndStringAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndStringAndSliceReceiverTester$Data', receiver: _receiver };
}
function storeTupleEmptyAndCommentAndStringAndSliceReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserEmptyAndCommentAndStringAndSliceReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEmptyAndCommentAndStringAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndCommentAndStringAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeEmptyAndCommentAndBinaryAndSliceReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadEmptyAndCommentAndBinaryAndSliceReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndCommentAndBinaryAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadTupleEmptyAndCommentAndBinaryAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndBinaryAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleEmptyAndCommentAndBinaryAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndCommentAndBinaryAndSliceReceiverTester$Data', receiver: _receiver };
}
function storeTupleEmptyAndCommentAndBinaryAndSliceReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserEmptyAndCommentAndBinaryAndSliceReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEmptyAndCommentAndBinaryAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndCommentAndBinaryAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeEmptyAndStringAndBinaryAndSliceReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadEmptyAndStringAndBinaryAndSliceReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyAndStringAndBinaryAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadTupleEmptyAndStringAndBinaryAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndStringAndBinaryAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleEmptyAndStringAndBinaryAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyAndStringAndBinaryAndSliceReceiverTester$Data', receiver: _receiver };
}
function storeTupleEmptyAndStringAndBinaryAndSliceReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserEmptyAndStringAndBinaryAndSliceReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEmptyAndStringAndBinaryAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyAndStringAndBinaryAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeCommentAndStringAndBinaryAndSliceReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadCommentAndStringAndBinaryAndSliceReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'CommentAndStringAndBinaryAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadTupleCommentAndStringAndBinaryAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndStringAndBinaryAndSliceReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleCommentAndStringAndBinaryAndSliceReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'CommentAndStringAndBinaryAndSliceReceiverTester$Data', receiver: _receiver };
}
function storeTupleCommentAndStringAndBinaryAndSliceReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserCommentAndStringAndBinaryAndSliceReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeCommentAndStringAndBinaryAndSliceReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadCommentAndStringAndBinaryAndSliceReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeAllReceiverTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadAllReceiverTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'AllReceiverTester$Data', receiver: _receiver };
}
function loadTupleAllReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'AllReceiverTester$Data', receiver: _receiver };
}
function loadGetterTupleAllReceiverTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'AllReceiverTester$Data', receiver: _receiver };
}
function storeTupleAllReceiverTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserAllReceiverTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeAllReceiverTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadAllReceiverTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeEmptyBouncedTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadEmptyBouncedTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'EmptyBouncedTester$Data', receiver: _receiver };
}
function loadTupleEmptyBouncedTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyBouncedTester$Data', receiver: _receiver };
}
function loadGetterTupleEmptyBouncedTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'EmptyBouncedTester$Data', receiver: _receiver };
}
function storeTupleEmptyBouncedTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserEmptyBouncedTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEmptyBouncedTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEmptyBouncedTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeBinaryBouncedTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadBinaryBouncedTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'BinaryBouncedTester$Data', receiver: _receiver };
}
function loadTupleBinaryBouncedTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'BinaryBouncedTester$Data', receiver: _receiver };
}
function loadGetterTupleBinaryBouncedTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'BinaryBouncedTester$Data', receiver: _receiver };
}
function storeTupleBinaryBouncedTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserBinaryBouncedTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeBinaryBouncedTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadBinaryBouncedTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeSliceBouncedTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadSliceBouncedTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'SliceBouncedTester$Data', receiver: _receiver };
}
function loadTupleSliceBouncedTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'SliceBouncedTester$Data', receiver: _receiver };
}
function loadGetterTupleSliceBouncedTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'SliceBouncedTester$Data', receiver: _receiver };
}
function storeTupleSliceBouncedTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserSliceBouncedTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSliceBouncedTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadSliceBouncedTester$Data(src.loadRef().beginParse());
        }
    };
}
function storeAllBouncedTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.receiver);
    };
}
function loadAllBouncedTester$Data(slice) {
    const sc_0 = slice;
    const _receiver = sc_0.loadStringRefTail();
    return { $$type: 'AllBouncedTester$Data', receiver: _receiver };
}
function loadTupleAllBouncedTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'AllBouncedTester$Data', receiver: _receiver };
}
function loadGetterTupleAllBouncedTester$Data(source) {
    const _receiver = source.readString();
    return { $$type: 'AllBouncedTester$Data', receiver: _receiver };
}
function storeTupleAllBouncedTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.receiver);
    return builder.build();
}
function dictValueParserAllBouncedTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeAllBouncedTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadAllBouncedTester$Data(src.loadRef().beginParse());
        }
    };
}
function initSliceBouncedTester_init_args(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
async function SliceBouncedTester_init() {
    const __code = core_1.Cell.fromBase64('te6ccgECBQEAATcAA+b/ACCPZTDtou37AdBy1yHSANIA+kAhEDRQZm8E+GEC+GLtRNDSAAGU1AHQMZowi3dW5rbm93bo4jABjiQwjQQYm91bmNlZF9mYWxsYmFja4Mh/AcoAAcgBzxbJAczJ7VTgINdJwh/jAPkB4fSkE/S88sgLAQIDAKrTHwGCEH+eHwm6jkj6QNRZMn9YghEqBfIAAXBQNG0DbVAjyM+FgMoAz4RAzgH6AoBpz0ACXG4BbqiTW8+BnVjPhoDPhID0APQAz4Hi9ADJAfsA2zHgAISC8EOo1JpV4YtV8vOZWKdsUScni5os3oLidNJhIJf9w7pEuo4Zi3dW5rbm93boyH8BygAByAHPFskBzMntVODywIIBO6ZNGPtRNDSAAGU1AHQMZowi3dW5rbm93bo4ts8MYAQAAiA=');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initSliceBouncedTester_init_args({ $$type: 'SliceBouncedTester_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const SliceBouncedTester_errors = {
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
    48163: { message: `Only divisions are currently supported.` },
};
const SliceBouncedTester_types = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "MessageParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "BasechainAddress", "header": null, "fields": [{ "name": "hash", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }] },
    { "name": "Message", "header": 100, "fields": [{ "name": "msg", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "Empty", "header": 101, "fields": [] },
    { "name": "BinaryIntOperation", "header": 829886522, "fields": [{ "name": "op", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "val1", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "val2", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "BinaryIntResult", "header": 4234356752, "fields": [{ "name": "val", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "SendCellToAddress", "header": 2141069065, "fields": [{ "name": "address", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Calculator$Data", "header": null, "fields": [] },
    { "name": "ReceiverTester$Data", "header": null, "fields": [{ "name": "receiverKind", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "NoReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "EmptyReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "CommentReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "StringReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "BinaryReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "SliceReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "EmptyAndCommentReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "EmptyAndStringReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "EmptyAndBinaryReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "EmptyAndSliceReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "CommentAndStringReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "CommentAndBinaryReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "CommentAndSliceReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "StringAndBinaryReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "StringAndSliceReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "BinaryAndSliceReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "EmptyAndCommentAndStringReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "EmptyAndCommentAndBinaryReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "EmptyAndCommentAndSliceReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "EmptyAndStringAndBinaryReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "EmptyAndStringAndSliceReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "EmptyAndBinaryAndSliceReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "CommentAndStringAndBinaryReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "CommentAndStringAndSliceReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "CommentAndBinaryAndSliceReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "StringAndBinaryAndSliceReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "EmptyAndCommentAndStringAndBinaryReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "EmptyAndCommentAndStringAndSliceReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "EmptyAndCommentAndBinaryAndSliceReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "EmptyAndStringAndBinaryAndSliceReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "CommentAndStringAndBinaryAndSliceReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "AllReceiverTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "EmptyBouncedTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "BinaryBouncedTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "SliceBouncedTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
    { "name": "AllBouncedTester$Data", "header": null, "fields": [{ "name": "receiver", "type": { "kind": "simple", "type": "string", "optional": false } }] },
];
const SliceBouncedTester_getters = [
    { "name": "receiver", "methodId": 78947, "arguments": [], "returnType": { "kind": "simple", "type": "string", "optional": false } },
];
exports.SliceBouncedTester_getterMapping = {
    'receiver': 'getReceiver',
};
const SliceBouncedTester_receivers = [
    { "receiver": "internal", "message": { "kind": "typed", "type": "SendCellToAddress" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "reset" } },
];
class SliceBouncedTester {
    static storageReserve = 0n;
    static async init() {
        return await SliceBouncedTester_init();
    }
    static async fromInit() {
        const __gen_init = await SliceBouncedTester_init();
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new SliceBouncedTester(address, __gen_init);
    }
    static fromAddress(address) {
        return new SliceBouncedTester(address);
    }
    address;
    init;
    abi = {
        types: SliceBouncedTester_types,
        getters: SliceBouncedTester_getters,
        receivers: SliceBouncedTester_receivers,
        errors: SliceBouncedTester_errors,
    };
    constructor(address, init) {
        this.address = address;
        this.init = init;
    }
    async send(provider, via, args, message) {
        let body = null;
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'SendCellToAddress') {
            body = (0, core_1.beginCell)().store(storeSendCellToAddress(message)).endCell();
        }
        if (message === "reset") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) {
            throw new Error('Invalid message type');
        }
        await provider.internal(via, { ...args, body: body });
    }
    async getReceiver(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(78947, builder.build())).stack;
        const result = source.readString();
        return result;
    }
}
exports.SliceBouncedTester = SliceBouncedTester;
