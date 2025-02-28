"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LargeContract = exports.GlobalConst = exports.LargeContract_getterMapping = void 0;
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
exports.storeMyMessage = storeMyMessage;
exports.loadMyMessage = loadMyMessage;
exports.storeIssue74$Data = storeIssue74$Data;
exports.loadIssue74$Data = loadIssue74$Data;
exports.storeLargeContract$Data = storeLargeContract$Data;
exports.loadLargeContract$Data = loadLargeContract$Data;
exports.storeTokenInfo = storeTokenInfo;
exports.loadTokenInfo = loadTokenInfo;
exports.storeReplace = storeReplace;
exports.loadReplace = loadReplace;
exports.storeMaps$Data = storeMaps$Data;
exports.loadMaps$Data = loadMaps$Data;
exports.storeFunCKeywords = storeFunCKeywords;
exports.loadFunCKeywords = loadFunCKeywords;
exports.storeBar$Data = storeBar$Data;
exports.loadBar$Data = loadBar$Data;
exports.storeBinary = storeBinary;
exports.loadBinary = loadBinary;
exports.storeOctal = storeOctal;
exports.loadOctal = loadOctal;
exports.storeDecimal = storeDecimal;
exports.loadDecimal = loadDecimal;
exports.storeHexadecimal = storeHexadecimal;
exports.loadHexadecimal = loadHexadecimal;
exports.storeExample$Data = storeExample$Data;
exports.loadExample$Data = loadExample$Data;
exports.storePosition = storePosition;
exports.loadPosition = loadPosition;
exports.storeTest$Data = storeTest$Data;
exports.loadTest$Data = loadTest$Data;
exports.storeFoo = storeFoo;
exports.loadFoo = loadFoo;
exports.storeMutatingMethodOnNonLvalues$Data = storeMutatingMethodOnNonLvalues$Data;
exports.loadMutatingMethodOnNonLvalues$Data = loadMutatingMethodOnNonLvalues$Data;
exports.storeTestGlobalFunctionShadowing$Data = storeTestGlobalFunctionShadowing$Data;
exports.loadTestGlobalFunctionShadowing$Data = loadTestGlobalFunctionShadowing$Data;
exports.storeMapUintBool$Data = storeMapUintBool$Data;
exports.loadMapUintBool$Data = loadMapUintBool$Data;
exports.storeTestContract$Data = storeTestContract$Data;
exports.loadTestContract$Data = loadTestContract$Data;
exports.storeDeploy = storeDeploy;
exports.loadDeploy = loadDeploy;
exports.storeDeployOk = storeDeployOk;
exports.loadDeployOk = loadDeployOk;
exports.storeFactoryDeploy = storeFactoryDeploy;
exports.loadFactoryDeploy = loadFactoryDeploy;
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
function storeMyMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(2133041362, 32);
    };
}
function loadMyMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2133041362) {
        throw Error('Invalid prefix');
    }
    return { $$type: 'MyMessage' };
}
function loadTupleMyMessage(source) {
    return { $$type: 'MyMessage' };
}
function loadGetterTupleMyMessage(source) {
    return { $$type: 'MyMessage' };
}
function storeTupleMyMessage(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserMyMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMyMessage(src)).endCell());
        },
        parse: (src) => {
            return loadMyMessage(src.loadRef().beginParse());
        }
    };
}
function storeIssue74$Data(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
function loadIssue74$Data(slice) {
    const sc_0 = slice;
    return { $$type: 'Issue74$Data' };
}
function loadTupleIssue74$Data(source) {
    return { $$type: 'Issue74$Data' };
}
function loadGetterTupleIssue74$Data(source) {
    return { $$type: 'Issue74$Data' };
}
function storeTupleIssue74$Data(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserIssue74$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeIssue74$Data(src)).endCell());
        },
        parse: (src) => {
            return loadIssue74$Data(src.loadRef().beginParse());
        }
    };
}
function storeLargeContract$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeDict(src.testMap0, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_0.storeDict(src.testMap1, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        const b_1 = new core_1.Builder();
        b_1.storeDict(src.testMap2, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_1.storeDict(src.testMap3, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_1.storeDict(src.testMap4, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        const b_2 = new core_1.Builder();
        b_2.storeDict(src.testMap5, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_2.storeDict(src.testMap6, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_2.storeDict(src.testMap7, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        const b_3 = new core_1.Builder();
        b_3.storeDict(src.testMap8, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_3.storeDict(src.testMap9, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_3.storeDict(src.testMap10, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        const b_4 = new core_1.Builder();
        b_4.storeDict(src.testMap11, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_4.storeDict(src.testMap12, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_4.storeDict(src.testMap13, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        const b_5 = new core_1.Builder();
        b_5.storeDict(src.testMap14, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_5.storeDict(src.testMap15, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_5.storeDict(src.testMap16, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        const b_6 = new core_1.Builder();
        b_6.storeDict(src.testMap17, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_6.storeDict(src.testMap18, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_6.storeDict(src.testMap19, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        const b_7 = new core_1.Builder();
        b_7.storeDict(src.testMap20, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_7.storeDict(src.testMap21, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_7.storeDict(src.testMap22, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        const b_8 = new core_1.Builder();
        b_8.storeDict(src.testMap23, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_8.storeDict(src.testMap24, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_8.storeDict(src.testMap25, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        const b_9 = new core_1.Builder();
        b_9.storeDict(src.testMap26, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_9.storeDict(src.testMap27, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_9.storeDict(src.testMap28, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        const b_10 = new core_1.Builder();
        b_10.storeDict(src.testMap29, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_10.storeDict(src.testMap30, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_10.storeDict(src.testMap31, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        const b_11 = new core_1.Builder();
        b_11.storeDict(src.testMap32, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_11.storeDict(src.testMap33, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_11.storeDict(src.testMap34, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        const b_12 = new core_1.Builder();
        b_12.storeDict(src.testMap35, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_12.storeDict(src.testMap36, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_12.storeDict(src.testMap37, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        const b_13 = new core_1.Builder();
        b_13.storeDict(src.testMap38, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_13.storeDict(src.testMap39, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_13.storeDict(src.testMap40, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        const b_14 = new core_1.Builder();
        b_14.storeDict(src.testMap41, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_14.storeDict(src.testMap42, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_14.storeDict(src.testMap43, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        const b_15 = new core_1.Builder();
        b_15.storeDict(src.testMap44, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_15.storeDict(src.testMap45, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_15.storeDict(src.testMap46, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        const b_16 = new core_1.Builder();
        b_16.storeDict(src.testMap47, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_16.storeDict(src.testMap48, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_16.storeDict(src.testMap49, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        const b_17 = new core_1.Builder();
        b_17.storeDict(src.testMap50, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_17.storeDict(src.testMap51, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_17.storeDict(src.testMap52, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        const b_18 = new core_1.Builder();
        b_18.storeDict(src.testMap53, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_18.storeDict(src.testMap54, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_18.storeDict(src.testMap55, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        const b_19 = new core_1.Builder();
        b_19.storeDict(src.testMap56, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_19.storeDict(src.testMap57, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_19.storeDict(src.testMap58, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        const b_20 = new core_1.Builder();
        b_20.storeDict(src.testMap59, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_20.storeDict(src.testMap60, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_20.storeDict(src.testMap61, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_20.storeDict(src.testMap62, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_19.storeRef(b_20.endCell());
        b_18.storeRef(b_19.endCell());
        b_17.storeRef(b_18.endCell());
        b_16.storeRef(b_17.endCell());
        b_15.storeRef(b_16.endCell());
        b_14.storeRef(b_15.endCell());
        b_13.storeRef(b_14.endCell());
        b_12.storeRef(b_13.endCell());
        b_11.storeRef(b_12.endCell());
        b_10.storeRef(b_11.endCell());
        b_9.storeRef(b_10.endCell());
        b_8.storeRef(b_9.endCell());
        b_7.storeRef(b_8.endCell());
        b_6.storeRef(b_7.endCell());
        b_5.storeRef(b_6.endCell());
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}
function loadLargeContract$Data(slice) {
    const sc_0 = slice;
    const _testMap0 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_0);
    const _testMap1 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_0);
    const sc_1 = sc_0.loadRef().beginParse();
    const _testMap2 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_1);
    const _testMap3 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_1);
    const _testMap4 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_1);
    const sc_2 = sc_1.loadRef().beginParse();
    const _testMap5 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_2);
    const _testMap6 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_2);
    const _testMap7 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_2);
    const sc_3 = sc_2.loadRef().beginParse();
    const _testMap8 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_3);
    const _testMap9 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_3);
    const _testMap10 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_3);
    const sc_4 = sc_3.loadRef().beginParse();
    const _testMap11 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_4);
    const _testMap12 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_4);
    const _testMap13 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_4);
    const sc_5 = sc_4.loadRef().beginParse();
    const _testMap14 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_5);
    const _testMap15 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_5);
    const _testMap16 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_5);
    const sc_6 = sc_5.loadRef().beginParse();
    const _testMap17 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_6);
    const _testMap18 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_6);
    const _testMap19 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_6);
    const sc_7 = sc_6.loadRef().beginParse();
    const _testMap20 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_7);
    const _testMap21 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_7);
    const _testMap22 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_7);
    const sc_8 = sc_7.loadRef().beginParse();
    const _testMap23 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_8);
    const _testMap24 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_8);
    const _testMap25 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_8);
    const sc_9 = sc_8.loadRef().beginParse();
    const _testMap26 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_9);
    const _testMap27 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_9);
    const _testMap28 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_9);
    const sc_10 = sc_9.loadRef().beginParse();
    const _testMap29 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_10);
    const _testMap30 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_10);
    const _testMap31 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_10);
    const sc_11 = sc_10.loadRef().beginParse();
    const _testMap32 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_11);
    const _testMap33 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_11);
    const _testMap34 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_11);
    const sc_12 = sc_11.loadRef().beginParse();
    const _testMap35 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_12);
    const _testMap36 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_12);
    const _testMap37 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_12);
    const sc_13 = sc_12.loadRef().beginParse();
    const _testMap38 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_13);
    const _testMap39 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_13);
    const _testMap40 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_13);
    const sc_14 = sc_13.loadRef().beginParse();
    const _testMap41 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_14);
    const _testMap42 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_14);
    const _testMap43 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_14);
    const sc_15 = sc_14.loadRef().beginParse();
    const _testMap44 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_15);
    const _testMap45 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_15);
    const _testMap46 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_15);
    const sc_16 = sc_15.loadRef().beginParse();
    const _testMap47 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_16);
    const _testMap48 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_16);
    const _testMap49 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_16);
    const sc_17 = sc_16.loadRef().beginParse();
    const _testMap50 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_17);
    const _testMap51 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_17);
    const _testMap52 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_17);
    const sc_18 = sc_17.loadRef().beginParse();
    const _testMap53 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_18);
    const _testMap54 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_18);
    const _testMap55 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_18);
    const sc_19 = sc_18.loadRef().beginParse();
    const _testMap56 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_19);
    const _testMap57 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_19);
    const _testMap58 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_19);
    const sc_20 = sc_19.loadRef().beginParse();
    const _testMap59 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_20);
    const _testMap60 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_20);
    const _testMap61 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_20);
    const _testMap62 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_20);
    return { $$type: 'LargeContract$Data', testMap0: _testMap0, testMap1: _testMap1, testMap2: _testMap2, testMap3: _testMap3, testMap4: _testMap4, testMap5: _testMap5, testMap6: _testMap6, testMap7: _testMap7, testMap8: _testMap8, testMap9: _testMap9, testMap10: _testMap10, testMap11: _testMap11, testMap12: _testMap12, testMap13: _testMap13, testMap14: _testMap14, testMap15: _testMap15, testMap16: _testMap16, testMap17: _testMap17, testMap18: _testMap18, testMap19: _testMap19, testMap20: _testMap20, testMap21: _testMap21, testMap22: _testMap22, testMap23: _testMap23, testMap24: _testMap24, testMap25: _testMap25, testMap26: _testMap26, testMap27: _testMap27, testMap28: _testMap28, testMap29: _testMap29, testMap30: _testMap30, testMap31: _testMap31, testMap32: _testMap32, testMap33: _testMap33, testMap34: _testMap34, testMap35: _testMap35, testMap36: _testMap36, testMap37: _testMap37, testMap38: _testMap38, testMap39: _testMap39, testMap40: _testMap40, testMap41: _testMap41, testMap42: _testMap42, testMap43: _testMap43, testMap44: _testMap44, testMap45: _testMap45, testMap46: _testMap46, testMap47: _testMap47, testMap48: _testMap48, testMap49: _testMap49, testMap50: _testMap50, testMap51: _testMap51, testMap52: _testMap52, testMap53: _testMap53, testMap54: _testMap54, testMap55: _testMap55, testMap56: _testMap56, testMap57: _testMap57, testMap58: _testMap58, testMap59: _testMap59, testMap60: _testMap60, testMap61: _testMap61, testMap62: _testMap62 };
}
function loadTupleLargeContract$Data(source) {
    const _testMap0 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap1 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap2 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap3 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap4 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap5 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap6 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap7 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap9 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap10 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap11 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap12 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap13 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    source = source.readTuple();
    const _testMap14 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap15 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap16 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap17 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap18 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap19 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap20 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap21 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap22 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap23 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap24 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap25 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap26 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap27 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    source = source.readTuple();
    const _testMap28 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap29 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap30 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap31 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap32 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap33 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap34 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap35 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap36 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap37 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap38 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap39 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap40 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap41 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    source = source.readTuple();
    const _testMap42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap43 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap44 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap45 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap46 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap47 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap48 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap49 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap50 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap51 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap52 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap53 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap54 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap55 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    source = source.readTuple();
    const _testMap56 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap57 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap58 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap59 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap60 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap61 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap62 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'LargeContract$Data', testMap0: _testMap0, testMap1: _testMap1, testMap2: _testMap2, testMap3: _testMap3, testMap4: _testMap4, testMap5: _testMap5, testMap6: _testMap6, testMap7: _testMap7, testMap8: _testMap8, testMap9: _testMap9, testMap10: _testMap10, testMap11: _testMap11, testMap12: _testMap12, testMap13: _testMap13, testMap14: _testMap14, testMap15: _testMap15, testMap16: _testMap16, testMap17: _testMap17, testMap18: _testMap18, testMap19: _testMap19, testMap20: _testMap20, testMap21: _testMap21, testMap22: _testMap22, testMap23: _testMap23, testMap24: _testMap24, testMap25: _testMap25, testMap26: _testMap26, testMap27: _testMap27, testMap28: _testMap28, testMap29: _testMap29, testMap30: _testMap30, testMap31: _testMap31, testMap32: _testMap32, testMap33: _testMap33, testMap34: _testMap34, testMap35: _testMap35, testMap36: _testMap36, testMap37: _testMap37, testMap38: _testMap38, testMap39: _testMap39, testMap40: _testMap40, testMap41: _testMap41, testMap42: _testMap42, testMap43: _testMap43, testMap44: _testMap44, testMap45: _testMap45, testMap46: _testMap46, testMap47: _testMap47, testMap48: _testMap48, testMap49: _testMap49, testMap50: _testMap50, testMap51: _testMap51, testMap52: _testMap52, testMap53: _testMap53, testMap54: _testMap54, testMap55: _testMap55, testMap56: _testMap56, testMap57: _testMap57, testMap58: _testMap58, testMap59: _testMap59, testMap60: _testMap60, testMap61: _testMap61, testMap62: _testMap62 };
}
function loadGetterTupleLargeContract$Data(source) {
    const _testMap0 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap1 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap2 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap3 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap4 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap5 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap6 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap7 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap8 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap9 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap10 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap11 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap12 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap13 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap14 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap15 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap16 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap17 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap18 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap19 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap20 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap21 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap22 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap23 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap24 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap25 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap26 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap27 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap28 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap29 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap30 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap31 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap32 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap33 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap34 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap35 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap36 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap37 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap38 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap39 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap40 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap41 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap42 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap43 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap44 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap45 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap46 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap47 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap48 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap49 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap50 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap51 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap52 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap53 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap54 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap55 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap56 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap57 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap58 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap59 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap60 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap61 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _testMap62 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'LargeContract$Data', testMap0: _testMap0, testMap1: _testMap1, testMap2: _testMap2, testMap3: _testMap3, testMap4: _testMap4, testMap5: _testMap5, testMap6: _testMap6, testMap7: _testMap7, testMap8: _testMap8, testMap9: _testMap9, testMap10: _testMap10, testMap11: _testMap11, testMap12: _testMap12, testMap13: _testMap13, testMap14: _testMap14, testMap15: _testMap15, testMap16: _testMap16, testMap17: _testMap17, testMap18: _testMap18, testMap19: _testMap19, testMap20: _testMap20, testMap21: _testMap21, testMap22: _testMap22, testMap23: _testMap23, testMap24: _testMap24, testMap25: _testMap25, testMap26: _testMap26, testMap27: _testMap27, testMap28: _testMap28, testMap29: _testMap29, testMap30: _testMap30, testMap31: _testMap31, testMap32: _testMap32, testMap33: _testMap33, testMap34: _testMap34, testMap35: _testMap35, testMap36: _testMap36, testMap37: _testMap37, testMap38: _testMap38, testMap39: _testMap39, testMap40: _testMap40, testMap41: _testMap41, testMap42: _testMap42, testMap43: _testMap43, testMap44: _testMap44, testMap45: _testMap45, testMap46: _testMap46, testMap47: _testMap47, testMap48: _testMap48, testMap49: _testMap49, testMap50: _testMap50, testMap51: _testMap51, testMap52: _testMap52, testMap53: _testMap53, testMap54: _testMap54, testMap55: _testMap55, testMap56: _testMap56, testMap57: _testMap57, testMap58: _testMap58, testMap59: _testMap59, testMap60: _testMap60, testMap61: _testMap61, testMap62: _testMap62 };
}
function storeTupleLargeContract$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeCell(source.testMap0.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap0, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap1.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap1, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap2.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap2, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap3.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap3, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap4.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap4, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap5.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap5, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap6.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap6, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap7.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap7, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap8.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap8, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap9.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap9, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap10.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap10, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap11.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap11, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap12.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap12, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap13.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap13, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap14.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap14, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap15.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap15, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap16.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap16, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap17.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap17, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap18.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap18, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap19.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap19, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap20.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap20, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap21.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap21, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap22.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap22, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap23.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap23, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap24.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap24, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap25.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap25, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap26.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap26, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap27.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap27, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap28.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap28, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap29.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap29, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap30.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap30, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap31.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap31, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap32.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap32, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap33.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap33, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap34.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap34, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap35.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap35, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap36.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap36, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap37.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap37, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap38.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap38, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap39.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap39, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap40.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap40, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap41.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap41, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap42.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap42, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap43.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap43, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap44.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap44, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap45.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap45, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap46.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap46, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap47.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap47, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap48.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap48, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap49.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap49, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap50.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap50, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap51.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap51, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap52.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap52, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap53.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap53, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap54.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap54, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap55.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap55, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap56.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap56, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap57.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap57, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap58.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap58, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap59.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap59, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap60.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap60, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap61.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap61, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.testMap62.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.testMap62, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    return builder.build();
}
function dictValueParserLargeContract$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeLargeContract$Data(src)).endCell());
        },
        parse: (src) => {
            return loadLargeContract$Data(src.loadRef().beginParse());
        }
    };
}
function storeTokenInfo(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.ticker);
        b_0.storeUint(src.decimals, 8);
    };
}
function loadTokenInfo(slice) {
    const sc_0 = slice;
    const _ticker = sc_0.loadStringRefTail();
    const _decimals = sc_0.loadUintBig(8);
    return { $$type: 'TokenInfo', ticker: _ticker, decimals: _decimals };
}
function loadTupleTokenInfo(source) {
    const _ticker = source.readString();
    const _decimals = source.readBigNumber();
    return { $$type: 'TokenInfo', ticker: _ticker, decimals: _decimals };
}
function loadGetterTupleTokenInfo(source) {
    const _ticker = source.readString();
    const _decimals = source.readBigNumber();
    return { $$type: 'TokenInfo', ticker: _ticker, decimals: _decimals };
}
function storeTupleTokenInfo(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeString(source.ticker);
    builder.writeNumber(source.decimals);
    return builder.build();
}
function dictValueParserTokenInfo() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeTokenInfo(src)).endCell());
        },
        parse: (src) => {
            return loadTokenInfo(src.loadRef().beginParse());
        }
    };
}
function storeReplace(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(1384510466, 32);
        b_0.storeDict(src.items, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Address());
    };
}
function loadReplace(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1384510466) {
        throw Error('Invalid prefix');
    }
    const _items = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Address(), sc_0);
    return { $$type: 'Replace', items: _items };
}
function loadTupleReplace(source) {
    const _items = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Address(), source.readCellOpt());
    return { $$type: 'Replace', items: _items };
}
function loadGetterTupleReplace(source) {
    const _items = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Address(), source.readCellOpt());
    return { $$type: 'Replace', items: _items };
}
function storeTupleReplace(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeCell(source.items.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.items, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Address()).endCell() : null);
    return builder.build();
}
function dictValueParserReplace() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeReplace(src)).endCell());
        },
        parse: (src) => {
            return loadReplace(src.loadRef().beginParse());
        }
    };
}
function storeMaps$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeDict(src.mi1, core_1.Dictionary.Keys.BigInt(257), dictValueParserTokenInfo());
        b_0.storeDict(src.mi2, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Bool());
        const b_1 = new core_1.Builder();
        b_1.storeDict(src.mi3, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257));
        b_1.storeDict(src.mi4, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Address());
        b_1.storeDict(src.ma1, core_1.Dictionary.Keys.Address(), dictValueParserTokenInfo());
        const b_2 = new core_1.Builder();
        b_2.storeDict(src.ma2, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Bool());
        b_2.storeDict(src.ma3, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(257));
        b_2.storeDict(src.ma4, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Address());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}
function loadMaps$Data(slice) {
    const sc_0 = slice;
    const _mi1 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), dictValueParserTokenInfo(), sc_0);
    const _mi2 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Bool(), sc_0);
    const sc_1 = sc_0.loadRef().beginParse();
    const _mi3 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), sc_1);
    const _mi4 = core_1.Dictionary.load(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Address(), sc_1);
    const _ma1 = core_1.Dictionary.load(core_1.Dictionary.Keys.Address(), dictValueParserTokenInfo(), sc_1);
    const sc_2 = sc_1.loadRef().beginParse();
    const _ma2 = core_1.Dictionary.load(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Bool(), sc_2);
    const _ma3 = core_1.Dictionary.load(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(257), sc_2);
    const _ma4 = core_1.Dictionary.load(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Address(), sc_2);
    return { $$type: 'Maps$Data', mi1: _mi1, mi2: _mi2, mi3: _mi3, mi4: _mi4, ma1: _ma1, ma2: _ma2, ma3: _ma3, ma4: _ma4 };
}
function loadTupleMaps$Data(source) {
    const _mi1 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserTokenInfo(), source.readCellOpt());
    const _mi2 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Bool(), source.readCellOpt());
    const _mi3 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _mi4 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Address(), source.readCellOpt());
    const _ma1 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), dictValueParserTokenInfo(), source.readCellOpt());
    const _ma2 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Bool(), source.readCellOpt());
    const _ma3 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _ma4 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Address(), source.readCellOpt());
    return { $$type: 'Maps$Data', mi1: _mi1, mi2: _mi2, mi3: _mi3, mi4: _mi4, ma1: _ma1, ma2: _ma2, ma3: _ma3, ma4: _ma4 };
}
function loadGetterTupleMaps$Data(source) {
    const _mi1 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), dictValueParserTokenInfo(), source.readCellOpt());
    const _mi2 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Bool(), source.readCellOpt());
    const _mi3 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _mi4 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Address(), source.readCellOpt());
    const _ma1 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), dictValueParserTokenInfo(), source.readCellOpt());
    const _ma2 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Bool(), source.readCellOpt());
    const _ma3 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(257), source.readCellOpt());
    const _ma4 = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Address(), source.readCellOpt());
    return { $$type: 'Maps$Data', mi1: _mi1, mi2: _mi2, mi3: _mi3, mi4: _mi4, ma1: _ma1, ma2: _ma2, ma3: _ma3, ma4: _ma4 };
}
function storeTupleMaps$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeCell(source.mi1.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.mi1, core_1.Dictionary.Keys.BigInt(257), dictValueParserTokenInfo()).endCell() : null);
    builder.writeCell(source.mi2.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.mi2, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Bool()).endCell() : null);
    builder.writeCell(source.mi3.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.mi3, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.mi4.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.mi4, core_1.Dictionary.Keys.BigInt(257), core_1.Dictionary.Values.Address()).endCell() : null);
    builder.writeCell(source.ma1.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.ma1, core_1.Dictionary.Keys.Address(), dictValueParserTokenInfo()).endCell() : null);
    builder.writeCell(source.ma2.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.ma2, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Bool()).endCell() : null);
    builder.writeCell(source.ma3.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.ma3, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.ma4.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.ma4, core_1.Dictionary.Keys.Address(), core_1.Dictionary.Values.Address()).endCell() : null);
    return builder.build();
}
function dictValueParserMaps$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMaps$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMaps$Data(src.loadRef().beginParse());
        }
    };
}
function storeFunCKeywords(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.var, 257);
        b_0.storeInt(src.ifnot, 257);
        b_0.storeInt(src.then, 257);
        const b_1 = new core_1.Builder();
        b_1.storeInt(src.elseifnot, 257);
        b_1.storeInt(src.int, 257);
        b_1.storeInt(src.cell, 257);
        const b_2 = new core_1.Builder();
        b_2.storeInt(src.slice, 257);
        b_2.storeInt(src.builder, 257);
        b_2.storeInt(src.cont, 257);
        const b_3 = new core_1.Builder();
        b_3.storeInt(src.tuple, 257);
        b_3.storeInt(src.type, 257);
        b_3.storeInt(src.forall, 257);
        const b_4 = new core_1.Builder();
        b_4.storeInt(src.extern, 257);
        b_4.storeInt(src.global, 257);
        b_4.storeInt(src.asm, 257);
        const b_5 = new core_1.Builder();
        b_5.storeInt(src.impure, 257);
        b_5.storeInt(src.inline_ref, 257);
        b_5.storeInt(src.auto_apply, 257);
        const b_6 = new core_1.Builder();
        b_6.storeInt(src.method_id, 257);
        b_6.storeInt(src.operator, 257);
        b_6.storeInt(src.infix, 257);
        const b_7 = new core_1.Builder();
        b_7.storeInt(src.infixl, 257);
        b_7.storeInt(src.infixr, 257);
        b_6.storeRef(b_7.endCell());
        b_5.storeRef(b_6.endCell());
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}
function loadFunCKeywords(slice) {
    const sc_0 = slice;
    const _var = sc_0.loadIntBig(257);
    const _ifnot = sc_0.loadIntBig(257);
    const _then = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _elseifnot = sc_1.loadIntBig(257);
    const _int = sc_1.loadIntBig(257);
    const _cell = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _slice = sc_2.loadIntBig(257);
    const _builder = sc_2.loadIntBig(257);
    const _cont = sc_2.loadIntBig(257);
    const sc_3 = sc_2.loadRef().beginParse();
    const _tuple = sc_3.loadIntBig(257);
    const _type = sc_3.loadIntBig(257);
    const _forall = sc_3.loadIntBig(257);
    const sc_4 = sc_3.loadRef().beginParse();
    const _extern = sc_4.loadIntBig(257);
    const _global = sc_4.loadIntBig(257);
    const _asm = sc_4.loadIntBig(257);
    const sc_5 = sc_4.loadRef().beginParse();
    const _impure = sc_5.loadIntBig(257);
    const _inline_ref = sc_5.loadIntBig(257);
    const _auto_apply = sc_5.loadIntBig(257);
    const sc_6 = sc_5.loadRef().beginParse();
    const _method_id = sc_6.loadIntBig(257);
    const _operator = sc_6.loadIntBig(257);
    const _infix = sc_6.loadIntBig(257);
    const sc_7 = sc_6.loadRef().beginParse();
    const _infixl = sc_7.loadIntBig(257);
    const _infixr = sc_7.loadIntBig(257);
    return { $$type: 'FunCKeywords', var: _var, ifnot: _ifnot, then: _then, elseifnot: _elseifnot, int: _int, cell: _cell, slice: _slice, builder: _builder, cont: _cont, tuple: _tuple, type: _type, forall: _forall, extern: _extern, global: _global, asm: _asm, impure: _impure, inline_ref: _inline_ref, auto_apply: _auto_apply, method_id: _method_id, operator: _operator, infix: _infix, infixl: _infixl, infixr: _infixr };
}
function loadTupleFunCKeywords(source) {
    const _var = source.readBigNumber();
    const _ifnot = source.readBigNumber();
    const _then = source.readBigNumber();
    const _elseifnot = source.readBigNumber();
    const _int = source.readBigNumber();
    const _cell = source.readBigNumber();
    const _slice = source.readBigNumber();
    const _builder = source.readBigNumber();
    const _cont = source.readBigNumber();
    const _tuple = source.readBigNumber();
    const _type = source.readBigNumber();
    const _forall = source.readBigNumber();
    const _extern = source.readBigNumber();
    const _global = source.readBigNumber();
    source = source.readTuple();
    const _asm = source.readBigNumber();
    const _impure = source.readBigNumber();
    const _inline_ref = source.readBigNumber();
    const _auto_apply = source.readBigNumber();
    const _method_id = source.readBigNumber();
    const _operator = source.readBigNumber();
    const _infix = source.readBigNumber();
    const _infixl = source.readBigNumber();
    const _infixr = source.readBigNumber();
    return { $$type: 'FunCKeywords', var: _var, ifnot: _ifnot, then: _then, elseifnot: _elseifnot, int: _int, cell: _cell, slice: _slice, builder: _builder, cont: _cont, tuple: _tuple, type: _type, forall: _forall, extern: _extern, global: _global, asm: _asm, impure: _impure, inline_ref: _inline_ref, auto_apply: _auto_apply, method_id: _method_id, operator: _operator, infix: _infix, infixl: _infixl, infixr: _infixr };
}
function loadGetterTupleFunCKeywords(source) {
    const _var = source.readBigNumber();
    const _ifnot = source.readBigNumber();
    const _then = source.readBigNumber();
    const _elseifnot = source.readBigNumber();
    const _int = source.readBigNumber();
    const _cell = source.readBigNumber();
    const _slice = source.readBigNumber();
    const _builder = source.readBigNumber();
    const _cont = source.readBigNumber();
    const _tuple = source.readBigNumber();
    const _type = source.readBigNumber();
    const _forall = source.readBigNumber();
    const _extern = source.readBigNumber();
    const _global = source.readBigNumber();
    const _asm = source.readBigNumber();
    const _impure = source.readBigNumber();
    const _inline_ref = source.readBigNumber();
    const _auto_apply = source.readBigNumber();
    const _method_id = source.readBigNumber();
    const _operator = source.readBigNumber();
    const _infix = source.readBigNumber();
    const _infixl = source.readBigNumber();
    const _infixr = source.readBigNumber();
    return { $$type: 'FunCKeywords', var: _var, ifnot: _ifnot, then: _then, elseifnot: _elseifnot, int: _int, cell: _cell, slice: _slice, builder: _builder, cont: _cont, tuple: _tuple, type: _type, forall: _forall, extern: _extern, global: _global, asm: _asm, impure: _impure, inline_ref: _inline_ref, auto_apply: _auto_apply, method_id: _method_id, operator: _operator, infix: _infix, infixl: _infixl, infixr: _infixr };
}
function storeTupleFunCKeywords(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.var);
    builder.writeNumber(source.ifnot);
    builder.writeNumber(source.then);
    builder.writeNumber(source.elseifnot);
    builder.writeNumber(source.int);
    builder.writeNumber(source.cell);
    builder.writeNumber(source.slice);
    builder.writeNumber(source.builder);
    builder.writeNumber(source.cont);
    builder.writeNumber(source.tuple);
    builder.writeNumber(source.type);
    builder.writeNumber(source.forall);
    builder.writeNumber(source.extern);
    builder.writeNumber(source.global);
    builder.writeNumber(source.asm);
    builder.writeNumber(source.impure);
    builder.writeNumber(source.inline_ref);
    builder.writeNumber(source.auto_apply);
    builder.writeNumber(source.method_id);
    builder.writeNumber(source.operator);
    builder.writeNumber(source.infix);
    builder.writeNumber(source.infixl);
    builder.writeNumber(source.infixr);
    return builder.build();
}
function dictValueParserFunCKeywords() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeFunCKeywords(src)).endCell());
        },
        parse: (src) => {
            return loadFunCKeywords(src.loadRef().beginParse());
        }
    };
}
function storeBar$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.store(storeFunCKeywords(src.f));
    };
}
function loadBar$Data(slice) {
    const sc_0 = slice;
    const _f = loadFunCKeywords(sc_0);
    return { $$type: 'Bar$Data', f: _f };
}
function loadTupleBar$Data(source) {
    const _f = loadTupleFunCKeywords(source);
    return { $$type: 'Bar$Data', f: _f };
}
function loadGetterTupleBar$Data(source) {
    const _f = loadGetterTupleFunCKeywords(source);
    return { $$type: 'Bar$Data', f: _f };
}
function storeTupleBar$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeTuple(storeTupleFunCKeywords(source.f));
    return builder.build();
}
function dictValueParserBar$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeBar$Data(src)).endCell());
        },
        parse: (src) => {
            return loadBar$Data(src.loadRef().beginParse());
        }
    };
}
function storeBinary(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(42, 32);
    };
}
function loadBinary(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 42) {
        throw Error('Invalid prefix');
    }
    return { $$type: 'Binary' };
}
function loadTupleBinary(source) {
    return { $$type: 'Binary' };
}
function loadGetterTupleBinary(source) {
    return { $$type: 'Binary' };
}
function storeTupleBinary(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserBinary() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeBinary(src)).endCell());
        },
        parse: (src) => {
            return loadBinary(src.loadRef().beginParse());
        }
    };
}
function storeOctal(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(43, 32);
    };
}
function loadOctal(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 43) {
        throw Error('Invalid prefix');
    }
    return { $$type: 'Octal' };
}
function loadTupleOctal(source) {
    return { $$type: 'Octal' };
}
function loadGetterTupleOctal(source) {
    return { $$type: 'Octal' };
}
function storeTupleOctal(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserOctal() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeOctal(src)).endCell());
        },
        parse: (src) => {
            return loadOctal(src.loadRef().beginParse());
        }
    };
}
function storeDecimal(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(44, 32);
    };
}
function loadDecimal(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 44) {
        throw Error('Invalid prefix');
    }
    return { $$type: 'Decimal' };
}
function loadTupleDecimal(source) {
    return { $$type: 'Decimal' };
}
function loadGetterTupleDecimal(source) {
    return { $$type: 'Decimal' };
}
function storeTupleDecimal(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserDecimal() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeDecimal(src)).endCell());
        },
        parse: (src) => {
            return loadDecimal(src.loadRef().beginParse());
        }
    };
}
function storeHexadecimal(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(45, 32);
    };
}
function loadHexadecimal(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 45) {
        throw Error('Invalid prefix');
    }
    return { $$type: 'Hexadecimal' };
}
function loadTupleHexadecimal(source) {
    return { $$type: 'Hexadecimal' };
}
function loadGetterTupleHexadecimal(source) {
    return { $$type: 'Hexadecimal' };
}
function storeTupleHexadecimal(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserHexadecimal() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeHexadecimal(src)).endCell());
        },
        parse: (src) => {
            return loadHexadecimal(src.loadRef().beginParse());
        }
    };
}
function storeExample$Data(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
function loadExample$Data(slice) {
    const sc_0 = slice;
    return { $$type: 'Example$Data' };
}
function loadTupleExample$Data(source) {
    return { $$type: 'Example$Data' };
}
function loadGetterTupleExample$Data(source) {
    return { $$type: 'Example$Data' };
}
function storeTupleExample$Data(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserExample$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeExample$Data(src)).endCell());
        },
        parse: (src) => {
            return loadExample$Data(src.loadRef().beginParse());
        }
    };
}
function storePosition(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(src.tokenId, 16);
        if (src.foo !== null && src.foo !== undefined) {
            b_0.storeBit(true).storeInt(src.foo, 257);
        }
        else {
            b_0.storeBit(false);
        }
    };
}
function loadPosition(slice) {
    const sc_0 = slice;
    const _tokenId = sc_0.loadUintBig(16);
    const _foo = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'Position', tokenId: _tokenId, foo: _foo };
}
function loadTuplePosition(source) {
    const _tokenId = source.readBigNumber();
    const _foo = source.readBigNumberOpt();
    return { $$type: 'Position', tokenId: _tokenId, foo: _foo };
}
function loadGetterTuplePosition(source) {
    const _tokenId = source.readBigNumber();
    const _foo = source.readBigNumberOpt();
    return { $$type: 'Position', tokenId: _tokenId, foo: _foo };
}
function storeTuplePosition(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeNumber(source.foo);
    return builder.build();
}
function dictValueParserPosition() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storePosition(src)).endCell());
        },
        parse: (src) => {
            return loadPosition(src.loadRef().beginParse());
        }
    };
}
function storeTest$Data(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
function loadTest$Data(slice) {
    const sc_0 = slice;
    return { $$type: 'Test$Data' };
}
function loadTupleTest$Data(source) {
    return { $$type: 'Test$Data' };
}
function loadGetterTupleTest$Data(source) {
    return { $$type: 'Test$Data' };
}
function storeTupleTest$Data(source) {
    const builder = new core_1.TupleBuilder();
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
function storeFoo(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.x, 257);
    };
}
function loadFoo(slice) {
    const sc_0 = slice;
    const _x = sc_0.loadIntBig(257);
    return { $$type: 'Foo', x: _x };
}
function loadTupleFoo(source) {
    const _x = source.readBigNumber();
    return { $$type: 'Foo', x: _x };
}
function loadGetterTupleFoo(source) {
    const _x = source.readBigNumber();
    return { $$type: 'Foo', x: _x };
}
function storeTupleFoo(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.x);
    return builder.build();
}
function dictValueParserFoo() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeFoo(src)).endCell());
        },
        parse: (src) => {
            return loadFoo(src.loadRef().beginParse());
        }
    };
}
function storeMutatingMethodOnNonLvalues$Data(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
function loadMutatingMethodOnNonLvalues$Data(slice) {
    const sc_0 = slice;
    return { $$type: 'MutatingMethodOnNonLvalues$Data' };
}
function loadTupleMutatingMethodOnNonLvalues$Data(source) {
    return { $$type: 'MutatingMethodOnNonLvalues$Data' };
}
function loadGetterTupleMutatingMethodOnNonLvalues$Data(source) {
    return { $$type: 'MutatingMethodOnNonLvalues$Data' };
}
function storeTupleMutatingMethodOnNonLvalues$Data(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserMutatingMethodOnNonLvalues$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMutatingMethodOnNonLvalues$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMutatingMethodOnNonLvalues$Data(src.loadRef().beginParse());
        }
    };
}
function storeTestGlobalFunctionShadowing$Data(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
function loadTestGlobalFunctionShadowing$Data(slice) {
    const sc_0 = slice;
    return { $$type: 'TestGlobalFunctionShadowing$Data' };
}
function loadTupleTestGlobalFunctionShadowing$Data(source) {
    return { $$type: 'TestGlobalFunctionShadowing$Data' };
}
function loadGetterTupleTestGlobalFunctionShadowing$Data(source) {
    return { $$type: 'TestGlobalFunctionShadowing$Data' };
}
function storeTupleTestGlobalFunctionShadowing$Data(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserTestGlobalFunctionShadowing$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeTestGlobalFunctionShadowing$Data(src)).endCell());
        },
        parse: (src) => {
            return loadTestGlobalFunctionShadowing$Data(src.loadRef().beginParse());
        }
    };
}
function storeMapUintBool$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeDict(src.m, core_1.Dictionary.Keys.BigUint(64), core_1.Dictionary.Values.Bool());
    };
}
function loadMapUintBool$Data(slice) {
    const sc_0 = slice;
    const _m = core_1.Dictionary.load(core_1.Dictionary.Keys.BigUint(64), core_1.Dictionary.Values.Bool(), sc_0);
    return { $$type: 'MapUintBool$Data', m: _m };
}
function loadTupleMapUintBool$Data(source) {
    const _m = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(64), core_1.Dictionary.Values.Bool(), source.readCellOpt());
    return { $$type: 'MapUintBool$Data', m: _m };
}
function loadGetterTupleMapUintBool$Data(source) {
    const _m = core_1.Dictionary.loadDirect(core_1.Dictionary.Keys.BigUint(64), core_1.Dictionary.Values.Bool(), source.readCellOpt());
    return { $$type: 'MapUintBool$Data', m: _m };
}
function storeTupleMapUintBool$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeCell(source.m.size > 0 ? (0, core_1.beginCell)().storeDictDirect(source.m, core_1.Dictionary.Keys.BigUint(64), core_1.Dictionary.Values.Bool()).endCell() : null);
    return builder.build();
}
function dictValueParserMapUintBool$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMapUintBool$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMapUintBool$Data(src.loadRef().beginParse());
        }
    };
}
function storeTestContract$Data(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
function loadTestContract$Data(slice) {
    const sc_0 = slice;
    return { $$type: 'TestContract$Data' };
}
function loadTupleTestContract$Data(source) {
    return { $$type: 'TestContract$Data' };
}
function loadGetterTupleTestContract$Data(source) {
    return { $$type: 'TestContract$Data' };
}
function storeTupleTestContract$Data(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserTestContract$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeTestContract$Data(src)).endCell());
        },
        parse: (src) => {
            return loadTestContract$Data(src.loadRef().beginParse());
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
function initLargeContract_init_args(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
async function LargeContract_init() {
    const __code = core_1.Cell.fromBase64('te6ccgICAVcAAQAAYTsAAAJs/wAgjqgwMNBy1yHSANIA+kAhEDRQVW8E+GEB+GLbPF8PXw9fD18PXwPc8sCC4fSkE/S88sgLAU4AAQICcQACAAMCASAABAAFAgEgABAAEQIBIAAGAAcCASAADAANAgEgAAgACQIBIAAKAAsCASAAGgAbAgEgACwALQIBIAA+AD8CASAAUABRAgEgAA4ADwIBIACKAIsCASAAYgBjAgEgAHYAdwIBIAASABMCASAAFgAXAgEgABQAFQIBIADIAMkCASAApgCnAgEgALcAuAIBIAD8AP0CASAAGAAZAgEgASkBKgIBIAE9AT4C+a71bZ4InwifiJ8InoifCJ6IngieiJ4InYieCJ2InQidiJ0InIidCJyInAiciJwIm4icCJuImwibiJsImoibCJqImgiaiJoImYiaCJmImQiZiJkImIiZCJiImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJXAAU4AHAIBIAAfACAB/BEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFgAdAXQRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9XEF8PVxBfD2zxAB4ANoEBAVMFUDNBM/QMb6GUAdcAMJJbbeIgbvLQgAL4qKLbPBE+ET8RPhE9ET4RPRE8ET0RPBE7ETwROxE6ETsROhE5EToRORE4ETkROBE3ETgRNxE2ETcRNhE1ETYRNRE0ETURNBEzETQRMxEyETMRMhExETIRMREwETERMBEvETARLxEuES8RLhEtES4RLREsES0RLBErESwRKwFOACECASAAJAAlAfwRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYAIgF0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9s8QAjADiBAQEgVjJQM0Ez9AxvoZQB1wAwkltt4iBu8tCAAvemqbZ4InwifiJ8InoifCJ6IngieiJ4InYieCJ2InQidiJ0InIidCJyInAiciJwIm4icCJuImwibiJsImoibCJqImgiaiJoImYiaCJmImQiZiJkImIiZCJiImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJXAU4AJgL3pA22eCJ8In4ifCJ6InwieiJ4InoieCJ2IngidiJ0InYidCJyInQiciJwInIicCJuInAibiJsIm4ibCJqImwiaiJoImoiaCJmImgiZiJkImYiZCJiImQiYiJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiVwFOACkB/BEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFgAnAXQRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9XEF8PVxBfD2zxACgAOIEBASBWLVAzQTP0DG+hlAHXADCSW23iIG7y0IAB/BEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFgAqAXQRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9XEF8PVxBfD2zxACsAOIEBASBWIFAzQTP0DG+hlAHXADCSW23iIG7y0IAC+a7l7Z4InwifiJ8InoifCJ6IngieiJ4InYieCJ2InQidiJ0InIidCJyInAiciJwIm4icCJuImwibiJsImoibCJqImgiaiJoImYiaCJmImQiZiJkImIiZCJiImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJXAAU4ALgIBIAAxADIB/BEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFgAvAXQRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9XEF8PVxBfD2zxADAANoEBAVMGUDNBM/QMb6GUAdcAMJJbbeIgbvLQgAL4qIPbPBE+ET8RPhE9ET4RPRE8ET0RPBE7ETwROxE6ETsROhE5EToRORE4ETkROBE3ETgRNxE2ETcRNhE1ETYRNRE0ETURNBEzETQRMxEyETMRMhExETIRMREwETERMBEvETARLxEuES8RLhEtES4RLREsES0RLBErESwRKwFOADMCASAANgA3AfwRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYANAF0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9s8QA1ADiBAQEgVjNQM0Ez9AxvoZQB1wAwkltt4iBu8tCAAvem67Z4InwifiJ8InoifCJ6IngieiJ4InYieCJ2InQidiJ0InIidCJyInAiciJwIm4icCJuImwibiJsImoibCJqImgiaiJoImYiaCJmImQiZiJkImIiZCJiImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJXAU4AOAL3pE+2eCJ8In4ifCJ6InwieiJ4InoieCJ2IngidiJ0InYidCJyInQiciJwInIicCJuInAibiJsIm4ibCJqImwiaiJoImoiaCJmImgiZiJkImYiZCJiImQiYiJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiVwFOADsB/BEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFgA5AXQRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9XEF8PVxBfD2zxADoAOIEBASBWLFAzQTP0DG+hlAHXADCSW23iIG7y0IAB/BEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFgA8AXQRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9XEF8PVxBfD2zxAD0AOIEBASBWIVAzQTP0DG+hlAHXADCSW23iIG7y0IAC+a99bZ4InwifiJ8InoifCJ6IngieiJ4InYieCJ2InQidiJ0InIidCJyInAiciJwIm4icCJuImwibiJsImoibCJqImgiaiJoImYiaCJmImQiZiJkImIiZCJiImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJXAAU4AQAIBIABDAEQB/BEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFgBBAXQRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9XEF8PVxBfD2zxAEIAOIEBASBWEVAzQTP0DG+hlAHXADCSW23iIG7y0IAC+Kjg2zwRPhE/ET4RPRE+ET0RPBE9ETwROxE8ETsROhE7EToRORE6ETkROBE5ETgRNxE4ETcRNhE3ETYRNRE2ETURNBE1ETQRMxE0ETMRMhEzETIRMREyETERMBExETARLxEwES8RLhEvES4RLREuES0RLBEtESwRKxEsESsBTgBFAgEgAEgASQH8ESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWAEYBdBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9XEF8PbPEARwA4gQEBIFYwUDNBM/QMb6GUAdcAMJJbbeIgbvLQgAL3pi22eCJ8In4ifCJ6InwieiJ4InoieCJ2IngidiJ0InYidCJyInQiciJwInIicCJuInAibiJsIm4ibCJqImwiaiJoImoiaCJmImgiZiJkImYiZCJiImQiYiJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiVwFOAEoC96SJtngifCJ+InwieiJ8InoieCJ6IngidiJ4InYidCJ2InQiciJ0InIicCJyInAibiJwIm4ibCJuImwiaiJsImoiaCJqImgiZiJoImYiZCJmImQiYiJkImIiYCJiImAiXiJgIl4iXCJeIlwiWiJcIloiWCJaIlgiViJYIlcBTgBNAfwRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYASwF0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9s8QBMADiBAQEgVitQM0Ez9AxvoZQB1wAwkltt4iBu8tCAAfwRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYATgF0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9s8QBPADiBAQEgViJQM0Ez9AxvoZQB1wAwkltt4iBu8tCAAvmvbe2eCJ8In4ifCJ6InwieiJ4InoieCJ2IngidiJ0InYidCJyInQiciJwInIicCJuInAibiJsIm4ibCJqImwiaiJoImoiaCJmImgiZiJkImYiZCJiImQiYiJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiVwAFOAFICASAAVQBWAfwRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYAUwF0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9s8QBUADaBAQFTD1AzQTP0DG+hlAHXADCSW23iIG7y0IAC+KjB2zwRPhE/ET4RPRE+ET0RPBE9ETwROxE8ETsROhE7EToRORE6ETkROBE5ETgRNxE4ETcRNhE3ETYRNRE2ETURNBE1ETQRMxE0ETMRMhEzETIRMREyETERMBExETARLxEwES8RLhEvES4RLREuES0RLBEtESwRKxEsESsBTgBXAgEgAFoAWwH8ESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWAFgBdBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9XEF8PbPEAWQA4gQEBIFYxUDNBM/QMb6GUAdcAMJJbbeIgbvLQgAL3pm+2eCJ8In4ifCJ6InwieiJ4InoieCJ2IngidiJ0InYidCJyInQiciJwInIicCJuInAibiJsIm4ibCJqImwiaiJoImoiaCJmImgiZiJkImYiZCJiImQiYiJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiVwFOAFwC96TLtngifCJ+InwieiJ8InoieCJ6IngidiJ4InYidCJ2InQiciJ0InIicCJyInAibiJwIm4ibCJuImwiaiJsImoiaCJqImgiZiJoImYiZCJmImQiYiJkImIiYCJiImAiXiJgIl4iXCJeIlwiWiJcIloiWCJaIlgiViJYIlcBTgBfAfwRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYAXQF0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9s8QBeADiBAQEgVipQM0Ez9AxvoZQB1wAwkltt4iBu8tCAAfwRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYAYAF0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9s8QBhADiBAQEgViNQM0Ez9AxvoZQB1wAwkltt4iBu8tCAAvmsTG2eCJ8In4ifCJ6InwieiJ4InoieCJ2IngidiJ0InYidCJyInQiciJwInIicCJuInAibiJsIm4ibCJqImwiaiJoImoiaCJmImgiZiJkImYiZCJiImQiYiJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiVwAFOAGgCASAAZABlAgHJAGYAZwIBIABuAG8C9692zwRPhE/ET4RPRE+ET0RPBE9ETwROxE8ETsROhE7EToRORE6ETkROBE5ETgRNxE4ETcRNhE3ETYRNRE2ETURNBE1ETQRMxE0ETMRMhEzETIRMREyETERMBExETARLxEwES8RLhEvES4RLREuES0RLBEtESwRKxEsESuABTgBoAvepts8ET4RPxE+ET0RPhE9ETwRPRE8ETsRPBE7EToROxE6ETkROhE5ETgRORE4ETcROBE3ETYRNxE2ETURNhE1ETQRNRE0ETMRNBEzETIRMxEyETERMhExETARMREwES8RMBEvES4RLxEuES0RLhEtESwRLREsESsRLBErgAU4AawH8ESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWAGkBdBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9XEF8PbPEAagA4gQEBIFY5UDNBM/QMb6GUAdcAMJJbbeIgbvLQgAH8ESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWAGwBdBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9XEF8PbPEAbQA4gQEBIFY2UDNBM/QMb6GUAdcAMJJbbeIgbvLQgAL3p6G2eCJ8In4ifCJ6InwieiJ4InoieCJ2IngidiJ0InYidCJyInQiciJwInIicCJuInAibiJsIm4ibCJqImwiaiJoImoiaCJmImgiZiJkImYiZCJiImQiYiJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiVwFOAHAC96UFtngifCJ+InwieiJ8InoieCJ6IngidiJ4InYidCJ2InQiciJ0InIicCJyInAibiJwIm4ibCJuImwiaiJsImoiaCJqImgiZiJoImYiZCJmImQiYiJkImIiYCJiImAiXiJgIl4iXCJeIlwiWiJcIloiWCJaIlgiViJYIlcBTgBzAfwRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYAcQF0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9s8QByADiBAQEgVilQM0Ez9AxvoZQB1wAwkltt4iBu8tCAAfwRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYAdAF0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9s8QB1ADiBAQEgVhxQM0Ez9AxvoZQB1wAwkltt4iBu8tCAAvmsXO2eCJ8In4ifCJ6InwieiJ4InoieCJ2IngidiJ0InYidCJyInQiciJwInIicCJuInAibiJsIm4ibCJqImwiaiJoImoiaCJmImgiZiJkImYiZCJiImQiYiJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiVwAFOAH8CASAAeAB5AgHJAHoAewIBIACCAIMC96n2zwRPhE/ET4RPRE+ET0RPBE9ETwROxE8ETsROhE7EToRORE6ETkROBE5ETgRNxE4ETcRNhE3ETYRNRE2ETURNBE1ETQRMxE0ETMRMhEzETIRMREyETERMBExETARLxEwES8RLhEvES4RLREuES0RLBEtESwRKxEsESuABTgB8AvevNs8ET4RPxE+ET0RPhE9ETwRPRE8ETsRPBE7EToROxE6ETkROhE5ETgRORE4ETcROBE3ETYRNxE2ETURNhE1ETQRNRE0ETMRNBEzETIRMxEyETERMhExETARMREwES8RMBEvES4RLxEuES0RLhEtESwRLREsESsRLBErgAU4AfwH8ESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWAH0BdBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9XEF8PbPEAfgA4gQEBIFY3UDNBM/QMb6GUAdcAMJJbbeIgbvLQgAH8ESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWAIABdBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9XEF8PbPEAgQA4gQEBIFY4UDNBM/QMb6GUAdcAMJJbbeIgbvLQgAL3p+O2eCJ8In4ifCJ6InwieiJ4InoieCJ2IngidiJ0InYidCJyInQiciJwInIicCJuInAibiJsIm4ibCJqImwiaiJoImoiaCJmImgiZiJkImYiZCJiImQiYiJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiVwFOAIQC96VHtngifCJ+InwieiJ8InoieCJ6IngidiJ4InYidCJ2InQiciJ0InIicCJyInAibiJwIm4ibCJuImwiaiJsImoiaCJqImgiZiJoImYiZCJmImQiYiJkImIiYCJiImAiXiJgIl4iXCJeIlwiWiJcIloiWCJaIlgiViJYIlcBTgCHAfwRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYAhQF0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9s8QCGADiBAQEgVihQM0Ez9AxvoZQB1wAwkltt4iBu8tCAAfwRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYAiAF0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9s8QCJADiBAQEgVh1QM0Ez9AxvoZQB1wAwkltt4iBu8tCAAgFYAJkAmgIBWACMAI0C+KhF2zwRPhE/ET4RPRE+ET0RPBE9ETwROxE8ETsROhE7EToRORE6ETkROBE5ETgRNxE4ETcRNhE3ETYRNRE2ETURNBE1ETQRMxE0ETMRMhEzETIRMREyETERMBExETARLxEwES8RLhEvES4RLREuES0RLBEtESwRKxEsESsBTgCOAgEgAJEAkgH8ESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWAI8BdBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9XEF8PbPEAkAA4gQEBIFY1UDNBM/QMb6GUAdcAMJJbbeIgbvLQgAL3p2e2eCJ8In4ifCJ6InwieiJ4InoieCJ2IngidiJ0InYidCJyInQiciJwInIicCJuInAibiJsIm4ibCJqImwiaiJoImoiaCJmImgiZiJkImYiZCJiImQiYiJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiVwFOAJMC96XDtngifCJ+InwieiJ8InoieCJ6IngidiJ4InYidCJ2InQiciJ0InIicCJyInAibiJwIm4ibCJuImwiaiJsImoiaCJqImgiZiJoImYiZCJmImQiYiJkImIiYCJiImAiXiJgIl4iXCJeIlwiWiJcIloiWCJaIlgiViJYIlcBTgCWAfwRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYAlAF0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9s8QCVADiBAQEgViZQM0Ez9AxvoZQB1wAwkltt4iBu8tCAAfwRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYAlwF0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9s8QCYADiBAQEgVh9QM0Ez9AxvoZQB1wAwkltt4iBu8tCAAvioZNs8ET4RPxE+ET0RPhE9ETwRPRE8ETsRPBE7EToROxE6ETkROhE5ETgRORE4ETcROBE3ETYRNxE2ETURNhE1ETQRNRE0ETMRNBEzETIRMxEyETERMhExETARMREwES8RMBEvES4RLxEuES0RLhEtESwRLREsESsRLBErAU4AmwIBIACeAJ8B/BEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFgCcAXQRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9XEF8PVxBfD2zxAJ0AOIEBASBWNFAzQTP0DG+hlAHXADCSW23iIG7y0IAC96cltngifCJ+InwieiJ8InoieCJ6IngidiJ4InYidCJ2InQiciJ0InIicCJyInAibiJwIm4ibCJuImwiaiJsImoiaCJqImgiZiJoImYiZCJmImQiYiJkImIiYCJiImAiXiJgIl4iXCJeIlwiWiJcIloiWCJaIlgiViJYIlcBTgCgAvelgbZ4InwifiJ8InoifCJ6IngieiJ4InYieCJ2InQidiJ0InIidCJyInAiciJwIm4icCJuImwibiJsImoibCJqImgiaiJoImYiaCJmImQiZiJkImIiZCJiImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJXAU4AowH8ESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWAKEBdBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9XEF8PbPEAogA4gQEBIFYnUDNBM/QMb6GUAdcAMJJbbeIgbvLQgAH8ESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWAKQBdBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9XEF8PbPEApQA4gQEBIFYeUDNBM/QMb6GUAdcAMJJbbeIgbvLQgAIBIACoAKkCASAAsgCzAvipFNs8ET4RPxE+ET0RPhE9ETwRPRE8ETsRPBE7EToROxE6ETkROhE5ETgRORE4ETcROBE3ETYRNxE2ETURNhE1ETQRNRE0ETMRNBEzETIRMxEyETERMhExETARMREwES8RMBEvES4RLxEuES0RLhEtESwRLREsESsRLBErAU4A8QIBIACqAKsC96XFtngifCJ+InwieiJ8InoieCJ6IngidiJ4InYidCJ2InQiciJ0InIicCJyInAibiJwIm4ibCJuImwiaiJsImoiaCJqImgiZiJoImYiZCJmImQiYiJkImIiYCJiImAiXiJgIl4iXCJeIlwiWiJcIloiWCJaIlgiViJYIlcBTgCsAvenYbZ4InwifiJ8InoifCJ6IngieiJ4InYieCJ2InQidiJ0InIidCJyInAiciJwIm4icCJuImwibiJsImoibCJqImgiaiJoImYiaCJmImQiZiJkImIiZCJiImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJXAU4ArwH8ESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWAK0BdBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9XEF8PbPEArgA2gQEBUw1QM0Ez9AxvoZQB1wAwkltt4iBu8tCAAfwRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYAsAF0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9s8QCxADiBAQEgVhdQM0Ez9AxvoZQB1wAwkltt4iBu8tCAAvipkds8ET4RPxE+ET0RPhE9ETwRPRE8ETsRPBE7EToROxE6ETkROhE5ETgRORE4ETcROBE3ETYRNxE2ETURNhE1ETQRNRE0ETMRNBEzETIRMxEyETERMhExETARMREwES8RMBEvES4RLxEuES0RLhEtESwRLREsESsRLBErAU4A8QL4qFzbPBE+ET8RPhE9ET4RPRE8ET0RPBE7ETwROxE6ETsROhE5EToRORE4ETkROBE3ETgRNxE2ETcRNhE1ETYRNRE0ETURNBEzETQRMxEyETMRMhExETIRMREwETERMBEvETARLxEuES8RLhEtES4RLREsES0RLBErESwRKwFOALQB/BEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFgC1AXQRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9XEF8PVxBfD2zxALYAOIEBASBWJVAzQTP0DG+hlAHXADCSW23iIG7y0IACASAAuQC6AgEgAMMAxAL4qTXbPBE+ET8RPhE9ET4RPRE8ET0RPBE7ETwROxE6ETsROhE5EToRORE4ETkROBE3ETgRNxE2ETcRNhE1ETYRNRE0ETURNBEzETQRMxEyETMRMhExETIRMREwETERMBEvETARLxEuES8RLhEtES4RLREsES0RLBErESwRKwFOAN8CASAAuwC8Avelh7Z4InwifiJ8InoifCJ6IngieiJ4InYieCJ2InQidiJ0InIidCJyInAiciJwIm4icCJuImwibiJsImoibCJqImgiaiJoImYiaCJmImQiZiJkImIiZCJiImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJXAU4AvQL3pyO2eCJ8In4ifCJ6InwieiJ4InoieCJ2IngidiJ0InYidCJyInQiciJwInIicCJuInAibiJsIm4ibCJqImwiaiJoImoiaCJmImgiZiJkImYiZCJiImQiYiJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiVwFOAMAB/BEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFgC+AXQRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9XEF8PVxBfD2zxAL8ANoEBAVMOUDNBM/QMb6GUAdcAMJJbbeIgbvLQgAH8ESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWAMEBdBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9XEF8PbPEAwgA4gQEBIFYWUDNBM/QMb6GUAdcAMJJbbeIgbvLQgAL4qbDbPBE+ET8RPhE9ET4RPRE8ET0RPBE7ETwROxE6ETsROhE5EToRORE4ETkROBE3ETgRNxE2ETcRNhE1ETYRNRE0ETURNBEzETQRMxEyETMRMhExETIRMREwETERMBEvETARLxEuES8RLhEtES4RLREsES0RLBErESwRKwFOAN8C+Kh92zwRPhE/ET4RPRE+ET0RPBE9ETwROxE8ETsROhE7EToRORE6ETkROBE5ETgRNxE4ETcRNhE3ETYRNRE2ETURNBE1ETQRMxE0ETMRMhEzETIRMREyETERMBExETARLxEwES8RLhEvES4RLREuES0RLBEtESwRKxEsESsBTgDFAfwRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYAxgF0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9s8QDHADiBAQEgViRQM0Ez9AxvoZQB1wAwkltt4iBu8tCAAgEgAMoAywIBIADRANICASAA2ADZAgEgAMwAzQL4qdPbPBE+ET8RPhE9ET4RPRE8ET0RPBE7ETwROxE6ETsROhE5EToRORE4ETkROBE3ETgRNxE2ETcRNhE1ETYRNRE0ETURNBEzETQRMxEyETMRMhExETIRMREwETERMBEvETARLxEuES8RLhEtES4RLREsES0RLBErESwRKwFOANwC+KtM2zwRPhE/ET4RPRE+ET0RPBE9ETwROxE8ETsROhE7EToRORE6ETkROBE5ETgRNxE4ETcRNhE3ETYRNRE2ETURNBE1ETQRMxE0ETMRMhEzETIRMREyETERMBExETARLxEwES8RLhEvES4RLREuES0RLBEtESwRKxEsESsBTgDOAfwRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYAzwF0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9s8QDQADiBAQEgVhpQM0Ez9AxvoZQB1wAwkltt4iBu8tCAAgEgAOoA6wIBIADTANQC+Kny2zwRPhE/ET4RPRE+ET0RPBE9ETwROxE8ETsROhE7EToRORE6ETkROBE5ETgRNxE4ETcRNhE3ETYRNRE2ETURNBE1ETQRMxE0ETMRMhEzETIRMREyETERMBExETARLxEwES8RLhEvES4RLREuES0RLBEtESwRKxEsESsBTgDuAvirbds8ET4RPxE+ET0RPhE9ETwRPRE8ETsRPBE7EToROxE6ETkROhE5ETgRORE4ETcROBE3ETYRNxE2ETURNhE1ETQRNRE0ETMRNBEzETIRMxEyETERMhExETARMREwES8RMBEvES4RLxEuES0RLhEtESwRLREsESsRLBErAU4A1QH8ESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWANYBdBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9XEF8PbPEA1wA4gQEBIFYbUDNBM/QMb6GUAdcAMJJbbeIgbvLQgAIBIADaANsCASAA4gDjAvemrbZ4InwifiJ8InoifCJ6IngieiJ4InYieCJ2InQidiJ0InIidCJyInAiciJwIm4icCJuImwibiJsImoibCJqImgiaiJoImYiaCJmImQiZiJkImIiZCJiImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJXAU4A3AL3pAm2eCJ8In4ifCJ6InwieiJ4InoieCJ2IngidiJ0InYidCJyInQiciJwInIicCJuInAibiJsIm4ibCJqImwiaiJoImoiaCJmImgiZiJkImYiZCJiImQiYiJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiVwFOAN8B/BEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFgDdAXQRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9XEF8PVxBfD2zxAN4AOIEBASBWO1AzQTP0DG+hlAHXADCSW23iIG7y0IAB/BEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFgDgAXQRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9XEF8PVxBfD2zxAOEAOIEBASBWPFAzQTP0DG+hlAHXADCSW23iIG7y0IAC96VBtngifCJ+InwieiJ8InoieCJ6IngidiJ4InYidCJ2InQiciJ0InIicCJyInAibiJwIm4ibCJuImwiaiJsImoiaCJqImgiZiJoImYiZCJmImQiYiJkImIiYCJiImAiXiJgIl4iXCJeIlwiWiJcIloiWCJaIlgiViJYIlcBTgDkAven5bZ4InwifiJ8InoifCJ6IngieiJ4InYieCJ2InQidiJ0InIidCJyInAiciJwIm4icCJuImwibiJsImoibCJqImgiaiJoImYiaCJmImQiZiJkImIiZCJiImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJXAU4A5wH8ESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWAOUBdBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9XEF8PbPEA5gA2gQEBUwtQM0Ez9AxvoZQB1wAwkltt4iBu8tCAAfwRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYA6AF0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9s8QDpADiBAQEgVhlQM0Ez9AxvoZQB1wAwkltt4iBu8tCAAgEgAOwA7QIBIAD0APUC96bvtngifCJ+InwieiJ8InoieCJ6IngidiJ4InYidCJ2InQiciJ0InIicCJyInAibiJwIm4ibCJuImwiaiJsImoiaCJqImgiZiJoImYiZCJmImQiYiJkImIiYCJiImAiXiJgIl4iXCJeIlwiWiJcIloiWCJaIlgiViJYIlcBTgDuAvekS7Z4InwifiJ8InoifCJ6IngieiJ4InYieCJ2InQidiJ0InIidCJyInAiciJwIm4icCJuImwibiJsImoibCJqImgiaiJoImYiaCJmImQiZiJkImIiZCJiImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJXAU4A8QH8ESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWAO8BdBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9XEF8PbPEA8AA4gQEBIFY6UDNBM/QMb6GUAdcAMJJbbeIgbvLQgAH8ESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWAPIBdBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9XEF8PbPEA8wA4gQEBIFY9UDNBM/QMb6GUAdcAMJJbbeIgbvLQgAL3pQO2eCJ8In4ifCJ6InwieiJ4InoieCJ2IngidiJ0InYidCJyInQiciJwInIicCJuInAibiJsIm4ibCJqImwiaiJoImoiaCJmImgiZiJkImYiZCJiImQiYiJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiVwFOAPYC96entngifCJ+InwieiJ8InoieCJ6IngidiJ4InYidCJ2InQiciJ0InIicCJyInAibiJwIm4ibCJuImwiaiJsImoiaCJqImgiZiJoImYiZCJmImQiYiJkImIiYCJiImAiXiJgIl4iXCJeIlwiWiJcIloiWCJaIlgiViJYIlcBTgD5AfwRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYA9wF0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9s8QD4ADaBAQFTDFAzQTP0DG+hlAHXADCSW23iIG7y0IAB/BEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFgD6AXQRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9XEF8PVxBfD2zxAPsAOIEBASBWGFAzQTP0DG+hlAHXADCSW23iIG7y0IACASAA/gD/AgEgAQoBCwIBIAERARICA5SQAQABAQL3rXbPBE+ET8RPhE9ET4RPRE8ET0RPBE7ETwROxE6ETsROhE5EToRORE4ETkROBE3ETgRNxE2ETcRNhE1ETYRNRE0ETURNBEzETQRMxEyETMRMhExETIRMREwETERMBEvETARLxEuES8RLhEtES4RLREsES0RLBErESwRK4AFOAQIC96u2zwRPhE/ET4RPRE+ET0RPBE9ETwROxE8ETsROhE7EToRORE6ETkROBE5ETgRNxE4ETcRNhE3ETYRNRE2ETURNBE1ETQRMxE0ETMRMhEzETIRMREyETERMBExETARLxEwES8RLhEvES4RLREuES0RLBEtESwRKxEsESuABTgEHAfwRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYBAwF0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9s8QEEAfaBAQEgVkFUIjNBM/QMb6GUAdcAMJJbbeIgbvLQgIEBASBWQVQiQ0Ez9AxvoZQB1wAwkltt4iBu8tCAoIEBASBWQFQiQ0Ez9AxvoZQB1wAwkltt4iBu8tCAoIEBASBWP1QiQ0Ez9AxvoZQB1wAwkltt4iBu8tCAoIEBASABBQH6Vj5UIkNBM/QMb6GUAdcAMJJbbeIgbvLQgKCBAQEgVj1UIkNBM/QMb6GUAdcAMJJbbeIgbvLQgKCBAQEgVjxUIkNBM/QMb6GUAdcAMJJbbeIgbvLQgKCBAQEgVjtUIkNBM/QMb6GUAdcAMJJbbeIgbvLQgKCBAQEgVjpUIkMBBgCiQTP0DG+hlAHXADCSW23iIG7y0ICggQEBIFY5VCJDQTP0DG+hlAHXADCSW23iIG7y0ICggQEBIFY4A1BEQTP0DG+hlAHXADCSW23iIG7y0ICgAfwRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYBCAF0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9s8QEJADiBAQEgVi5QM0Ez9AxvoZQB1wAwkltt4iBu8tCAAgEgAR0BHgIDlJABDAENAver9s8ET4RPxE+ET0RPhE9ETwRPRE8ETsRPBE7EToROxE6ETkROhE5ETgRORE4ETcROBE3ETYRNxE2ETURNhE1ETQRNRE0ETMRNBEzETIRMxEyETERMhExETARMREwES8RMBEvES4RLxEuES0RLhEtESwRLREsESsRLBErgAU4BDgL3rTbPBE+ET8RPhE9ET4RPRE8ET0RPBE7ETwROxE6ETsROhE5EToRORE4ETkROBE3ETgRNxE2ETcRNhE1ETYRNRE0ETURNBEzETQRMxEyETMRMhExETIRMREwETERMBEvETARLxEuES8RLhEtES4RLREsES0RLBErESwRK4AFOAS8B/BEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFgEPAXQRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9XEF8PVxBfD2zxARAAOIEBASBWL1AzQTP0DG+hlAHXADCSW23iIG7y0IACASABEwEUAgEgARUBFgL3pyG2eCJ8In4ifCJ6InwieiJ4InoieCJ2IngidiJ0InYidCJyInQiciJwInIicCJuInAibiJsIm4ibCJqImwiaiJoImoiaCJmImgiZiJkImYiZCJiImQiYiJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiVwFOAUMC96WFtngifCJ+InwieiJ8InoieCJ6IngidiJ4InYidCJ2InQiciJ0InIicCJyInAibiJwIm4ibCJuImwiaiJsImoiaCJqImgiZiJoImYiZCJmImQiYiJkImIiYCJiImAiXiJgIl4iXCJeIlwiWiJcIloiWCJaIlgiViJYIlcBTgFPAvekzbZ4InwifiJ8InoifCJ6IngieiJ4InYieCJ2InQidiJ0InIidCJyInAiciJwIm4icCJuImwibiJsImoibCJqImgiaiJoImYiaCJmImQiZiJkImIiZCJiImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJXAU4BFwL3pmm2eCJ8In4ifCJ6InwieiJ4InoieCJ2IngidiJ0InYidCJyInQiciJwInIicCJuInAibiJsIm4ibCJqImwiaiJoImoiaCJmImgiZiJkImYiZCJiImQiYiJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiVwFOARoB/BEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFgEYAXQRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9XEF8PVxBfD2zxARkANoEBAVMJUDNBM/QMb6GUAdcAMJJbbeIgbvLQgAH8ESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWARsBdBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9XEF8PbPEBHAA4gQEBIFYTUDNBM/QMb6GUAdcAMJJbbeIgbvLQgAIBIAEfASACASABIQEiAvenY7Z4InwifiJ8InoifCJ6IngieiJ4InYieCJ2InQidiJ0InIidCJyInAiciJwIm4icCJuImwibiJsImoibCJqImgiaiJoImYiaCJmImQiZiJkImIiZCJiImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJXAU4BLwL3pce2eCJ8In4ifCJ6InwieiJ4InoieCJ2IngidiJ0InYidCJyInQiciJwInIicCJuInAibiJsIm4ibCJqImwiaiJoImoiaCJmImgiZiJkImYiZCJiImQiYiJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiVwFOAToC96SPtngifCJ+InwieiJ8InoieCJ6IngidiJ4InYidCJ2InQiciJ0InIicCJyInAibiJwIm4ibCJuImwiaiJsImoiaCJqImgiZiJoImYiZCJmImQiYiJkImIiYCJiImAiXiJgIl4iXCJeIlwiWiJcIloiWCJaIlgiViJYIlcBTgEjAvemK7Z4InwifiJ8InoifCJ6IngieiJ4InYieCJ2InQidiJ0InIidCJyInAiciJwIm4icCJuImwibiJsImoibCJqImgiaiJoImYiaCJmImQiZiJkImIiZCJiImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJXAU4BJgH8ESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWASQBdBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9XEF8PbPEBJQA2gQEBUwpQM0Ez9AxvoZQB1wAwkltt4iBu8tCAAfwRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYBJwF0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9s8QEoADiBAQEgVhJQM0Ez9AxvoZQB1wAwkltt4iBu8tCAAgEgASsBLAL5rKvtngifCJ+InwieiJ8InoieCJ6IngidiJ4InYidCJ2InQiciJ0InIicCJyInAibiJwIm4ibCJuImwiaiJsImoiaCJqImgiZiJoImYiZCJmImQiYiJkImIiYCJiImAiXiJgIl4iXCJeIlwiWiJcIloiWCJaIlgiViJYIlcABTgE6AgEgAS0BLgIBIAEyATMC96eltngifCJ+InwieiJ8InoieCJ6IngidiJ4InYidCJ2InQiciJ0InIicCJyInAibiJwIm4ibCJuImwiaiJsImoiaCJqImgiZiJoImYiZCJmImQiYiJkImIiYCJiImAiXiJgIl4iXCJeIlwiWiJcIloiWCJaIlgiViJYIlcBTgE6AvelAbZ4InwifiJ8InoifCJ6IngieiJ4InYieCJ2InQidiJ0InIidCJyInAiciJwIm4icCJuImwibiJsImoibCJqImgiaiJoImYiaCJmImQiZiJkImIiZCJiImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJXAU4BLwH8ESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWATABdBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9XEF8PbPEBMQA4gQEBIFZAUDNBM/QMb6GUAdcAMJJbbeIgbvLQgAL3pEm2eCJ8In4ifCJ6InwieiJ4InoieCJ2IngidiJ0InYidCJyInQiciJwInIicCJuInAibiJsIm4ibCJqImwiaiJoImoiaCJmImgiZiJkImYiZCJiImQiYiJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiVwFOATQC96bttngifCJ+InwieiJ8InoieCJ6IngidiJ4InYidCJ2InQiciJ0InIicCJyInAibiJwIm4ibCJuImwiaiJsImoiaCJqImgiZiJoImYiZCJmImQiYiJkImIiYCJiImAiXiJgIl4iXCJeIlwiWiJcIloiWCJaIlgiViJYIlcBTgE3AfwRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYBNQF0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9s8QE2ADaBAQFTB1AzQTP0DG+hlAHXADCSW23iIG7y0IAB/BEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFgE4AXQRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9XEF8PVxBfD2zxATkAOIEBASBWFVAzQTP0DG+hlAHXADCSW23iIG7y0IAB/BEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFgE7AXQRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9XEF8PVxBfD2zxATwAOIEBASBWP1AzQTP0DG+hlAHXADCSW23iIG7y0IACASABPwFAAvmsu22eCJ8In4ifCJ6InwieiJ4InoieCJ2IngidiJ0InYidCJyInQiciJwInIicCJuInAibiJsIm4ibCJqImwiaiJoImoiaCJmImgiZiJkImYiZCJiImQiYiJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiVwAFOAU8CASABQQFCAgEgAUYBRwL3p+e2eCJ8In4ifCJ6InwieiJ4InoieCJ2IngidiJ0InYidCJyInQiciJwInIicCJuInAibiJsIm4ibCJqImwiaiJoImoiaCJmImgiZiJkImYiZCJiImQiYiJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiVwFOAU8C96VDtngifCJ+InwieiJ8InoieCJ6IngidiJ4InYidCJ2InQiciJ0InIicCJyInAibiJwIm4ibCJuImwiaiJsImoiaCJqImgiZiJoImYiZCJmImQiYiJkImIiYCJiImAiXiJgIl4iXCJeIlwiWiJcIloiWCJaIlgiViJYIlcBTgFDAfwRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYBRAF0ERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9s8QFFADiBAQEgVkFQM0Ez9AxvoZQB1wAwkltt4iBu8tCAAvekC7Z4InwifiJ8InoifCJ6IngieiJ4InYieCJ2InQidiJ0InIidCJyInAiciJwIm4icCJuImwibiJsImoibCJqImgiaiJoImYiaCJmImQiZiJkImIiZCJiImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJXAU4BSAL3pq+2eCJ8In4ifCJ6InwieiJ4InoieCJ2IngidiJ0InYidCJyInQiciJwInIicCJuInAibiJsIm4ibCJqImwiaiJoImoiaCJmImgiZiJkImYiZCJiImQiYiJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiVwFOAUsB/BEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFgFJAXQRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9XEF8PVxBfD2zxAUoANoEBAVMIUDNBM/QMb6GUAdcAMJJbbeIgbvLQgAH8ESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWAUwBdBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9XEF8PbPEBTQA4gQEBIFYUUDNBM/QMb6GUAdcAMJJbbeIgbvLQgAGQ7UTQ0gAB4wIwbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tAVAB/BEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFgFVAvjbPFc/ET0RPhE9ETwRPRE8ETsRPBE7EToROxE6ETkROhE5ETgRORE4ETcROBE3ETYRNxE2ETURNhE1ETQRNRE0ETMRNBEzETIRMxEyETERMhExETARMREwES8RMBEvES4RLxEuES0RLhEtESwRLREsESsRLBErESoRKxEqAVEBUgH09ATUAdD0BPQE9ATUMND0BPQE9ATUMND0BPQE9ATUMND0BPQE9ATUMND0BPQE9ATUMND0BPQE9ATUMND0BPQE9ATUMND0BPQE9ATUMND0BPQE9ATUMND0BPQE9ATUMND0BPQE9ATUMND0BPQE9ATUMND0BPQE9ATUMNABUwH8ESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVAVQAlPQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AT0BNQw0PQE9AQwET4RPxE+AEgRFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ4BdBEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9XEF8PbPEBVgA4gQEBIFY+UDNBM/QMb6GUAdcAMJJbbeIgbvLQgA==');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initLargeContract_init_args({ $$type: 'LargeContract_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const LargeContract_errors = {
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
const LargeContract_types = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "MessageParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "BasechainAddress", "header": null, "fields": [{ "name": "hash", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }] },
    { "name": "MyMessage", "header": 2133041362, "fields": [] },
    { "name": "Issue74$Data", "header": null, "fields": [] },
    { "name": "LargeContract$Data", "header": null, "fields": [{ "name": "testMap0", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap1", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap2", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap3", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap4", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap5", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap6", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap7", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap8", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap9", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap10", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap11", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap12", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap13", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap14", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap15", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap16", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap17", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap18", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap19", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap20", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap21", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap22", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap23", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap24", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap25", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap26", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap27", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap28", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap29", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap30", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap31", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap32", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap33", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap34", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap35", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap36", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap37", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap38", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap39", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap40", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap41", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap42", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap43", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap44", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap45", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap46", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap47", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap48", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap49", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap50", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap51", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap52", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap53", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap54", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap55", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap56", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap57", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap58", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap59", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap60", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap61", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "testMap62", "type": { "kind": "dict", "key": "int", "value": "int" } }] },
    { "name": "TokenInfo", "header": null, "fields": [{ "name": "ticker", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "decimals", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 8 } }] },
    { "name": "Replace", "header": 1384510466, "fields": [{ "name": "items", "type": { "kind": "dict", "key": "int", "value": "address" } }] },
    { "name": "Maps$Data", "header": null, "fields": [{ "name": "mi1", "type": { "kind": "dict", "key": "int", "value": "TokenInfo", "valueFormat": "ref" } }, { "name": "mi2", "type": { "kind": "dict", "key": "int", "value": "bool" } }, { "name": "mi3", "type": { "kind": "dict", "key": "int", "value": "int" } }, { "name": "mi4", "type": { "kind": "dict", "key": "int", "value": "address" } }, { "name": "ma1", "type": { "kind": "dict", "key": "address", "value": "TokenInfo", "valueFormat": "ref" } }, { "name": "ma2", "type": { "kind": "dict", "key": "address", "value": "bool" } }, { "name": "ma3", "type": { "kind": "dict", "key": "address", "value": "int" } }, { "name": "ma4", "type": { "kind": "dict", "key": "address", "value": "address" } }] },
    { "name": "FunCKeywords", "header": null, "fields": [{ "name": "var", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "ifnot", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "then", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "elseifnot", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "int", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "cell", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "slice", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "builder", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "cont", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "tuple", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "type", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "forall", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "extern", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "global", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "asm", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "impure", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "inline_ref", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "auto_apply", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "method_id", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "operator", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "infix", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "infixl", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "infixr", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "Bar$Data", "header": null, "fields": [{ "name": "f", "type": { "kind": "simple", "type": "FunCKeywords", "optional": false } }] },
    { "name": "Binary", "header": 42, "fields": [] },
    { "name": "Octal", "header": 43, "fields": [] },
    { "name": "Decimal", "header": 44, "fields": [] },
    { "name": "Hexadecimal", "header": 45, "fields": [] },
    { "name": "Example$Data", "header": null, "fields": [] },
    { "name": "Position", "header": null, "fields": [{ "name": "tokenId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 16 } }, { "name": "foo", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }] },
    { "name": "Test$Data", "header": null, "fields": [] },
    { "name": "Foo", "header": null, "fields": [{ "name": "x", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "MutatingMethodOnNonLvalues$Data", "header": null, "fields": [] },
    { "name": "TestGlobalFunctionShadowing$Data", "header": null, "fields": [] },
    { "name": "MapUintBool$Data", "header": null, "fields": [{ "name": "m", "type": { "kind": "dict", "key": "uint", "keyFormat": 64, "value": "bool" } }] },
    { "name": "TestContract$Data", "header": null, "fields": [] },
    { "name": "Deploy", "header": 2490013878, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "DeployOk", "header": 2952335191, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "FactoryDeploy", "header": 1829761339, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "cashback", "type": { "kind": "simple", "type": "address", "optional": false } }] },
];
const LargeContract_getters = [
    { "name": "getTest0", "methodId": 117013, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest1", "methodId": 121140, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest2", "methodId": 125271, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest3", "methodId": 129398, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest4", "methodId": 100753, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest5", "methodId": 104880, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest6", "methodId": 109011, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest7", "methodId": 113138, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest8", "methodId": 83997, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest9", "methodId": 88124, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest10", "methodId": 88071, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest11", "methodId": 84006, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest12", "methodId": 96325, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest13", "methodId": 92260, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest14", "methodId": 71811, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest15", "methodId": 67746, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest16", "methodId": 80065, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest17", "methodId": 76000, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest18", "methodId": 121103, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest19", "methodId": 117038, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest20", "methodId": 68948, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest21", "methodId": 73077, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest22", "methodId": 77078, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest23", "methodId": 81207, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest24", "methodId": 85456, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest25", "methodId": 89585, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest26", "methodId": 93586, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest27", "methodId": 97715, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest28", "methodId": 101468, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest29", "methodId": 105597, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest30", "methodId": 81509, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest31", "methodId": 77380, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest32", "methodId": 73255, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest33", "methodId": 69126, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest34", "methodId": 98017, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest35", "methodId": 93888, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest36", "methodId": 89763, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest37", "methodId": 85634, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest38", "methodId": 114541, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest39", "methodId": 110412, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest40", "methodId": 108530, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest41", "methodId": 112595, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest42", "methodId": 100272, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest43", "methodId": 104337, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest44", "methodId": 124790, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest45", "methodId": 128855, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest46", "methodId": 116532, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest47", "methodId": 120597, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest48", "methodId": 75514, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest49", "methodId": 79579, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest50", "methodId": 103619, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest51", "methodId": 99554, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest52", "methodId": 111745, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest53", "methodId": 107680, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest54", "methodId": 119879, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest55", "methodId": 115814, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest56", "methodId": 128005, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest57", "methodId": 123940, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest58", "methodId": 71115, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest59", "methodId": 67050, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest60", "methodId": 115088, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest61", "methodId": 119217, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest62", "methodId": 123346, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest63", "methodId": 127475, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest64", "methodId": 98580, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest65", "methodId": 102709, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest66", "methodId": 106838, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest67", "methodId": 110967, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest68", "methodId": 82072, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest69", "methodId": 86201, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest70", "methodId": 127649, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest71", "methodId": 123520, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest72", "methodId": 119523, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest73", "methodId": 115394, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest74", "methodId": 111141, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
    { "name": "getTest75", "methodId": 107012, "arguments": [{ "name": "index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": true, "format": 257 } },
];
exports.LargeContract_getterMapping = {
    'getTest0': 'getGetTest0',
    'getTest1': 'getGetTest1',
    'getTest2': 'getGetTest2',
    'getTest3': 'getGetTest3',
    'getTest4': 'getGetTest4',
    'getTest5': 'getGetTest5',
    'getTest6': 'getGetTest6',
    'getTest7': 'getGetTest7',
    'getTest8': 'getGetTest8',
    'getTest9': 'getGetTest9',
    'getTest10': 'getGetTest10',
    'getTest11': 'getGetTest11',
    'getTest12': 'getGetTest12',
    'getTest13': 'getGetTest13',
    'getTest14': 'getGetTest14',
    'getTest15': 'getGetTest15',
    'getTest16': 'getGetTest16',
    'getTest17': 'getGetTest17',
    'getTest18': 'getGetTest18',
    'getTest19': 'getGetTest19',
    'getTest20': 'getGetTest20',
    'getTest21': 'getGetTest21',
    'getTest22': 'getGetTest22',
    'getTest23': 'getGetTest23',
    'getTest24': 'getGetTest24',
    'getTest25': 'getGetTest25',
    'getTest26': 'getGetTest26',
    'getTest27': 'getGetTest27',
    'getTest28': 'getGetTest28',
    'getTest29': 'getGetTest29',
    'getTest30': 'getGetTest30',
    'getTest31': 'getGetTest31',
    'getTest32': 'getGetTest32',
    'getTest33': 'getGetTest33',
    'getTest34': 'getGetTest34',
    'getTest35': 'getGetTest35',
    'getTest36': 'getGetTest36',
    'getTest37': 'getGetTest37',
    'getTest38': 'getGetTest38',
    'getTest39': 'getGetTest39',
    'getTest40': 'getGetTest40',
    'getTest41': 'getGetTest41',
    'getTest42': 'getGetTest42',
    'getTest43': 'getGetTest43',
    'getTest44': 'getGetTest44',
    'getTest45': 'getGetTest45',
    'getTest46': 'getGetTest46',
    'getTest47': 'getGetTest47',
    'getTest48': 'getGetTest48',
    'getTest49': 'getGetTest49',
    'getTest50': 'getGetTest50',
    'getTest51': 'getGetTest51',
    'getTest52': 'getGetTest52',
    'getTest53': 'getGetTest53',
    'getTest54': 'getGetTest54',
    'getTest55': 'getGetTest55',
    'getTest56': 'getGetTest56',
    'getTest57': 'getGetTest57',
    'getTest58': 'getGetTest58',
    'getTest59': 'getGetTest59',
    'getTest60': 'getGetTest60',
    'getTest61': 'getGetTest61',
    'getTest62': 'getGetTest62',
    'getTest63': 'getGetTest63',
    'getTest64': 'getGetTest64',
    'getTest65': 'getGetTest65',
    'getTest66': 'getGetTest66',
    'getTest67': 'getGetTest67',
    'getTest68': 'getGetTest68',
    'getTest69': 'getGetTest69',
    'getTest70': 'getGetTest70',
    'getTest71': 'getGetTest71',
    'getTest72': 'getGetTest72',
    'getTest73': 'getGetTest73',
    'getTest74': 'getGetTest74',
    'getTest75': 'getGetTest75',
};
const LargeContract_receivers = [];
exports.GlobalConst = 42n;
class LargeContract {
    static storageReserve = 0n;
    static ContractConst = 43n;
    static async init() {
        return await LargeContract_init();
    }
    static async fromInit() {
        const __gen_init = await LargeContract_init();
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new LargeContract(address, __gen_init);
    }
    static fromAddress(address) {
        return new LargeContract(address);
    }
    address;
    init;
    abi = {
        types: LargeContract_types,
        getters: LargeContract_getters,
        receivers: LargeContract_receivers,
        errors: LargeContract_errors,
    };
    constructor(address, init) {
        this.address = address;
        this.init = init;
    }
    async getGetTest0(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(117013, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest1(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(121140, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest2(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(125271, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest3(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(129398, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest4(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(100753, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest5(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(104880, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest6(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(109011, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest7(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(113138, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest8(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(83997, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest9(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(88124, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest10(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(88071, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest11(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(84006, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest12(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(96325, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest13(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(92260, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest14(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(71811, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest15(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(67746, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest16(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(80065, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest17(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(76000, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest18(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(121103, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest19(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(117038, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest20(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(68948, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest21(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(73077, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest22(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(77078, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest23(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(81207, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest24(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(85456, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest25(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(89585, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest26(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(93586, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest27(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(97715, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest28(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(101468, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest29(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(105597, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest30(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(81509, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest31(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(77380, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest32(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(73255, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest33(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(69126, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest34(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(98017, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest35(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(93888, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest36(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(89763, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest37(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(85634, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest38(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(114541, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest39(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(110412, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest40(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(108530, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest41(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(112595, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest42(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(100272, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest43(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(104337, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest44(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(124790, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest45(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(128855, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest46(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(116532, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest47(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(120597, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest48(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(75514, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest49(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(79579, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest50(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(103619, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest51(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(99554, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest52(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(111745, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest53(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(107680, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest54(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(119879, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest55(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(115814, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest56(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(128005, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest57(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(123940, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest58(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(71115, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest59(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(67050, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest60(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(115088, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest61(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(119217, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest62(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(123346, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest63(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(127475, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest64(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(98580, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest65(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(102709, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest66(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(106838, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest67(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(110967, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest68(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(82072, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest69(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(86201, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest70(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(127649, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest71(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(123520, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest72(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(119523, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest73(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(115394, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest74(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(111141, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
    async getGetTest75(provider, index) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get(107012, builder.build())).stack;
        const result = source.readBigNumberOpt();
        return result;
    }
}
exports.LargeContract = LargeContract;
