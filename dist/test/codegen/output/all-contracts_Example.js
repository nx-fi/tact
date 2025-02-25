"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example = exports.Example_getterMapping = void 0;
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
function initExample_init_args(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
async function Example_init() {
    const __code = core_1.Cell.fromBase64('te6ccgEBAwEAgwABFP8A9KQT9LzyyAsBAc7TAdBy1yHSANIA+kAhEDRQZm8E+GEC+GLbPAKRW+CAINcFb6NbIIIIEBAQupowMMh/AcoAye1U4CDAU5owMMh/AcoAye1U4CDALJowMMh/AcoAye1U4MAtmTDIfwHKAMntVOAw8sCCAgAU7UTQ0gAwkW3gbQ==');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initExample_init_args({ $$type: 'Example_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const Example_errors = {
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
const Example_types = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
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
const Example_getters = [];
exports.Example_getterMapping = {};
const Example_receivers = [
    { "receiver": "internal", "message": { "kind": "typed", "type": "Binary" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Octal" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Decimal" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Hexadecimal" } },
];
class Example {
    static async init() {
        return await Example_init();
    }
    static async fromInit() {
        const __gen_init = await Example_init();
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new Example(address, __gen_init);
    }
    static fromAddress(address) {
        return new Example(address);
    }
    address;
    init;
    abi = {
        types: Example_types,
        getters: Example_getters,
        receivers: Example_receivers,
        errors: Example_errors,
    };
    constructor(address, init) {
        this.address = address;
        this.init = init;
    }
    async send(provider, via, args, message) {
        let body = null;
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'Binary') {
            body = (0, core_1.beginCell)().store(storeBinary(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'Octal') {
            body = (0, core_1.beginCell)().store(storeOctal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'Decimal') {
            body = (0, core_1.beginCell)().store(storeDecimal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'Hexadecimal') {
            body = (0, core_1.beginCell)().store(storeHexadecimal(message)).endCell();
        }
        if (body === null) {
            throw new Error('Invalid message type');
        }
        await provider.internal(via, { ...args, body: body });
    }
}
exports.Example = Example;
