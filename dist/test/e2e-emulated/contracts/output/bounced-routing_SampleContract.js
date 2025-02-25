"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleContract = exports.SampleContract_getterMapping = void 0;
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
exports.storeEntryFirst = storeEntryFirst;
exports.loadEntryFirst = loadEntryFirst;
exports.storeEntrySecond = storeEntrySecond;
exports.loadEntrySecond = loadEntrySecond;
exports.storeFirst = storeFirst;
exports.loadFirst = loadFirst;
exports.storeSecond = storeSecond;
exports.loadSecond = loadSecond;
exports.storeLarge = storeLarge;
exports.loadLarge = loadLarge;
exports.storeSmallBounce = storeSmallBounce;
exports.loadSmallBounce = loadSmallBounce;
exports.storeMyStruct = storeMyStruct;
exports.loadMyStruct = loadMyStruct;
exports.storeSampleContract$Data = storeSampleContract$Data;
exports.loadSampleContract$Data = loadSampleContract$Data;
exports.storeSampleContract2$Data = storeSampleContract2$Data;
exports.loadSampleContract2$Data = loadSampleContract2$Data;
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
function storeEntryFirst(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(2757457064, 32);
        b_0.storeUint(src.amountToAdd, 32);
        b_0.storeAddress(src.toAddress);
    };
}
function loadEntryFirst(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2757457064) {
        throw Error('Invalid prefix');
    }
    const _amountToAdd = sc_0.loadUintBig(32);
    const _toAddress = sc_0.loadAddress();
    return { $$type: 'EntryFirst', amountToAdd: _amountToAdd, toAddress: _toAddress };
}
function loadTupleEntryFirst(source) {
    const _amountToAdd = source.readBigNumber();
    const _toAddress = source.readAddress();
    return { $$type: 'EntryFirst', amountToAdd: _amountToAdd, toAddress: _toAddress };
}
function loadGetterTupleEntryFirst(source) {
    const _amountToAdd = source.readBigNumber();
    const _toAddress = source.readAddress();
    return { $$type: 'EntryFirst', amountToAdd: _amountToAdd, toAddress: _toAddress };
}
function storeTupleEntryFirst(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.amountToAdd);
    builder.writeAddress(source.toAddress);
    return builder.build();
}
function dictValueParserEntryFirst() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEntryFirst(src)).endCell());
        },
        parse: (src) => {
            return loadEntryFirst(src.loadRef().beginParse());
        }
    };
}
function storeEntrySecond(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(4282440720, 32);
        b_0.storeUint(src.amountToAdd, 32);
        b_0.storeAddress(src.toAddress);
    };
}
function loadEntrySecond(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4282440720) {
        throw Error('Invalid prefix');
    }
    const _amountToAdd = sc_0.loadUintBig(32);
    const _toAddress = sc_0.loadAddress();
    return { $$type: 'EntrySecond', amountToAdd: _amountToAdd, toAddress: _toAddress };
}
function loadTupleEntrySecond(source) {
    const _amountToAdd = source.readBigNumber();
    const _toAddress = source.readAddress();
    return { $$type: 'EntrySecond', amountToAdd: _amountToAdd, toAddress: _toAddress };
}
function loadGetterTupleEntrySecond(source) {
    const _amountToAdd = source.readBigNumber();
    const _toAddress = source.readAddress();
    return { $$type: 'EntrySecond', amountToAdd: _amountToAdd, toAddress: _toAddress };
}
function storeTupleEntrySecond(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.amountToAdd);
    builder.writeAddress(source.toAddress);
    return builder.build();
}
function dictValueParserEntrySecond() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEntrySecond(src)).endCell());
        },
        parse: (src) => {
            return loadEntrySecond(src.loadRef().beginParse());
        }
    };
}
function storeFirst(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(3200290616, 32);
        b_0.storeUint(src.amount, 32);
        b_0.storeCoins(src.myCoins);
        b_0.storeBit(src.myBool3);
        b_0.storeAddress(src.anAddress);
    };
}
function loadFirst(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3200290616) {
        throw Error('Invalid prefix');
    }
    const _amount = sc_0.loadUintBig(32);
    const _myCoins = sc_0.loadCoins();
    const _myBool3 = sc_0.loadBit();
    const _anAddress = sc_0.loadAddress();
    return { $$type: 'First', amount: _amount, myCoins: _myCoins, myBool3: _myBool3, anAddress: _anAddress };
}
function loadTupleFirst(source) {
    const _amount = source.readBigNumber();
    const _myCoins = source.readBigNumber();
    const _myBool3 = source.readBoolean();
    const _anAddress = source.readAddress();
    return { $$type: 'First', amount: _amount, myCoins: _myCoins, myBool3: _myBool3, anAddress: _anAddress };
}
function loadGetterTupleFirst(source) {
    const _amount = source.readBigNumber();
    const _myCoins = source.readBigNumber();
    const _myBool3 = source.readBoolean();
    const _anAddress = source.readAddress();
    return { $$type: 'First', amount: _amount, myCoins: _myCoins, myBool3: _myBool3, anAddress: _anAddress };
}
function storeTupleFirst(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeNumber(source.myCoins);
    builder.writeBoolean(source.myBool3);
    builder.writeAddress(source.anAddress);
    return builder.build();
}
function dictValueParserFirst() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeFirst(src)).endCell());
        },
        parse: (src) => {
            return loadFirst(src.loadRef().beginParse());
        }
    };
}
function storeSecond(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(391585480, 32);
        b_0.storeUint(src.amount_bigger, 64);
        b_0.storeBit(src.myBool);
        b_0.storeUint(src.thisDoesNotFit, 256);
        b_0.storeAddress(src.myAddress);
        b_0.storeBit(src.myBool2);
        b_0.store(storeMyStruct(src.myStruct));
        const b_1 = new core_1.Builder();
        b_1.store(storeMyStruct(src.myStruct2));
        b_0.storeRef(b_1.endCell());
    };
}
function loadSecond(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 391585480) {
        throw Error('Invalid prefix');
    }
    const _amount_bigger = sc_0.loadUintBig(64);
    const _myBool = sc_0.loadBit();
    const _thisDoesNotFit = sc_0.loadUintBig(256);
    const _myAddress = sc_0.loadAddress();
    const _myBool2 = sc_0.loadBit();
    const _myStruct = loadMyStruct(sc_0);
    const sc_1 = sc_0.loadRef().beginParse();
    const _myStruct2 = loadMyStruct(sc_1);
    return { $$type: 'Second', amount_bigger: _amount_bigger, myBool: _myBool, thisDoesNotFit: _thisDoesNotFit, myAddress: _myAddress, myBool2: _myBool2, myStruct: _myStruct, myStruct2: _myStruct2 };
}
function loadTupleSecond(source) {
    const _amount_bigger = source.readBigNumber();
    const _myBool = source.readBoolean();
    const _thisDoesNotFit = source.readBigNumber();
    const _myAddress = source.readAddress();
    const _myBool2 = source.readBoolean();
    const _myStruct = loadTupleMyStruct(source);
    const _myStruct2 = loadTupleMyStruct(source);
    return { $$type: 'Second', amount_bigger: _amount_bigger, myBool: _myBool, thisDoesNotFit: _thisDoesNotFit, myAddress: _myAddress, myBool2: _myBool2, myStruct: _myStruct, myStruct2: _myStruct2 };
}
function loadGetterTupleSecond(source) {
    const _amount_bigger = source.readBigNumber();
    const _myBool = source.readBoolean();
    const _thisDoesNotFit = source.readBigNumber();
    const _myAddress = source.readAddress();
    const _myBool2 = source.readBoolean();
    const _myStruct = loadGetterTupleMyStruct(source);
    const _myStruct2 = loadGetterTupleMyStruct(source);
    return { $$type: 'Second', amount_bigger: _amount_bigger, myBool: _myBool, thisDoesNotFit: _thisDoesNotFit, myAddress: _myAddress, myBool2: _myBool2, myStruct: _myStruct, myStruct2: _myStruct2 };
}
function storeTupleSecond(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.amount_bigger);
    builder.writeBoolean(source.myBool);
    builder.writeNumber(source.thisDoesNotFit);
    builder.writeAddress(source.myAddress);
    builder.writeBoolean(source.myBool2);
    builder.writeTuple(storeTupleMyStruct(source.myStruct));
    builder.writeTuple(storeTupleMyStruct(source.myStruct2));
    return builder.build();
}
function dictValueParserSecond() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSecond(src)).endCell());
        },
        parse: (src) => {
            return loadSecond(src.loadRef().beginParse());
        }
    };
}
function storeLarge(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(618480963, 32);
        b_0.storeAddress(src.address);
        b_0.storeCoins(src.value);
    };
}
function loadLarge(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 618480963) {
        throw Error('Invalid prefix');
    }
    const _address = sc_0.loadAddress();
    const _value = sc_0.loadCoins();
    return { $$type: 'Large', address: _address, value: _value };
}
function loadTupleLarge(source) {
    const _address = source.readAddress();
    const _value = source.readBigNumber();
    return { $$type: 'Large', address: _address, value: _value };
}
function loadGetterTupleLarge(source) {
    const _address = source.readAddress();
    const _value = source.readBigNumber();
    return { $$type: 'Large', address: _address, value: _value };
}
function storeTupleLarge(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeNumber(source.value);
    return builder.build();
}
function dictValueParserLarge() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeLarge(src)).endCell());
        },
        parse: (src) => {
            return loadLarge(src.loadRef().beginParse());
        }
    };
}
function storeSmallBounce(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(3235833558, 32);
        b_0.storeUint(src.amount, 32);
        b_0.storeBit(src.myBool3);
    };
}
function loadSmallBounce(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3235833558) {
        throw Error('Invalid prefix');
    }
    const _amount = sc_0.loadUintBig(32);
    const _myBool3 = sc_0.loadBit();
    return { $$type: 'SmallBounce', amount: _amount, myBool3: _myBool3 };
}
function loadTupleSmallBounce(source) {
    const _amount = source.readBigNumber();
    const _myBool3 = source.readBoolean();
    return { $$type: 'SmallBounce', amount: _amount, myBool3: _myBool3 };
}
function loadGetterTupleSmallBounce(source) {
    const _amount = source.readBigNumber();
    const _myBool3 = source.readBoolean();
    return { $$type: 'SmallBounce', amount: _amount, myBool3: _myBool3 };
}
function storeTupleSmallBounce(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeBoolean(source.myBool3);
    return builder.build();
}
function dictValueParserSmallBounce() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSmallBounce(src)).endCell());
        },
        parse: (src) => {
            return loadSmallBounce(src.loadRef().beginParse());
        }
    };
}
function storeMyStruct(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.amount, 257);
    };
}
function loadMyStruct(slice) {
    const sc_0 = slice;
    const _amount = sc_0.loadIntBig(257);
    return { $$type: 'MyStruct', amount: _amount };
}
function loadTupleMyStruct(source) {
    const _amount = source.readBigNumber();
    return { $$type: 'MyStruct', amount: _amount };
}
function loadGetterTupleMyStruct(source) {
    const _amount = source.readBigNumber();
    return { $$type: 'MyStruct', amount: _amount };
}
function storeTupleMyStruct(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}
function dictValueParserMyStruct() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMyStruct(src)).endCell());
        },
        parse: (src) => {
            return loadMyStruct(src.loadRef().beginParse());
        }
    };
}
function storeSampleContract$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.a, 257);
    };
}
function loadSampleContract$Data(slice) {
    const sc_0 = slice;
    const _a = sc_0.loadIntBig(257);
    return { $$type: 'SampleContract$Data', a: _a };
}
function loadTupleSampleContract$Data(source) {
    const _a = source.readBigNumber();
    return { $$type: 'SampleContract$Data', a: _a };
}
function loadGetterTupleSampleContract$Data(source) {
    const _a = source.readBigNumber();
    return { $$type: 'SampleContract$Data', a: _a };
}
function storeTupleSampleContract$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.a);
    return builder.build();
}
function dictValueParserSampleContract$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSampleContract$Data(src)).endCell());
        },
        parse: (src) => {
            return loadSampleContract$Data(src.loadRef().beginParse());
        }
    };
}
function storeSampleContract2$Data(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
function loadSampleContract2$Data(slice) {
    const sc_0 = slice;
    return { $$type: 'SampleContract2$Data' };
}
function loadTupleSampleContract2$Data(source) {
    return { $$type: 'SampleContract2$Data' };
}
function loadGetterTupleSampleContract2$Data(source) {
    return { $$type: 'SampleContract2$Data' };
}
function storeTupleSampleContract2$Data(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserSampleContract2$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSampleContract2$Data(src)).endCell());
        },
        parse: (src) => {
            return loadSampleContract2$Data(src.loadRef().beginParse());
        }
    };
}
function initSampleContract_init_args(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
async function SampleContract_init() {
    const __code = core_1.Cell.fromBase64('te6ccgECFQEABY8AART/APSkE/S88sgLAQIBYgIDBPbQ7aLt+wHQctch0gDSAPpAIRA0UGZvBPhhAvhi2zwC4wJwIddJIMIf4wABwAABwSGwjhAwyH8BygABAYEBAc8Aye1U4PkBgvD/QDGO2LGCMAxt0aOiZXzBaB133uT5ciicQR7UAJjJvbqfyH8BygABAYEBAc8Aye1U4DATBAUGAg+hFdm2ebZ4YxMUAvyAINchcCHXScIflTAg1wsf3iCCEL7Ajzi6juEwgCDXIdMf+gDSAFUgECNfA40EkluIGJvdW5jZSBvZiBmaXJzdII0GmR1bXAoIkluIGJvdW5jZSBvZiBmaXJzdCIpgif4UMP4UMP4UMGagMab+yH8BygABAYEBAc8Aye1U4CAHCAKqMQHTHyGCEKRbdKi64wIhghD/QNwQuuMCIYIQvsCPOLqOE18DyH8BygABAYEBAc8Aye1U2zHgIYIQF1ceyLqOE18DyH8BygABAYEBAc8Aye1U2zHgAhARAAbywIIAfkZpbGUgc3JjL3Rlc3QvZTJlLWVtdWxhdGVkL2NvbnRyYWN0cy9ib3VuY2VkLXJvdXRpbmcudGFjdDo5NTo5OgT2ghAXVx7Iuo7cMIAg1yHTP9IAWTAxjQTSW4gYm91bmNlIG9mIHNlY29uZII0G2R1bXAoIkluIGJvdW5jZSBvZiBzZWNvbmQiKYIn+FDD+FDD+FDCgpvzIfwHKAAEBgQEBzwDJ7VTgIIIQwN7m1rrjAjGCECTdRUO64wIwCQoLDACARmlsZSBzcmMvdGVzdC9lMmUtZW11bGF0ZWQvY29udHJhY3RzL2JvdW5jZWQtcm91dGluZy50YWN0OjEwNDo5OgHQMIAg1yHTH9IAWTAxjQZSW4gYm91bmNlIG9mIHNtYWxsIGJvdW5jZYI0IWR1bXAoIkluIGJvdW5jZSBvZiBzbWFsbCBib3VuY2UiKYIn+FDD+FDD+FDCgpvzIfwHKAAEBgQEBzwDJ7VQNAbKNBlJbiBib3VuY2Ugb2YgbGFyZ2UgYm91bmNlgjQhZHVtcCgiSW4gYm91bmNlIG9mIGxhcmdlIGJvdW5jZSIpgif4UMP4UMP4UMMh/AcoAAQGBAQHPAMntVA4B8omNBlkdW1wKCJJbiBnZW5lcmljIGJvdW5jZSIpgjQ/RmlsZSBzcmMvdGVzdC9lMmUtZW11bGF0ZWQvY29udHJhY3RzL2JvdW5jZWQtcm91dGluZy50YWN0Ojg5Ojk6g/hQw/hQw/hQwgE3IfwHKAAEBgQEBzwDJ7VQPAIBGaWxlIHNyYy90ZXN0L2UyZS1lbXVsYXRlZC9jb250cmFjdHMvYm91bmNlZC1yb3V0aW5nLnRhY3Q6MTA5Ojk6AIBGaWxlIHNyYy90ZXN0L2UyZS1lbXVsYXRlZC9jb250cmFjdHMvYm91bmNlZC1yb3V0aW5nLnRhY3Q6MTE0Ojk6ACJJbiBnZW5lcmljIGJvdW5jZQD6bCHTH/pAWTJRIqGCEDuaygByf3Nw+EIQOMhVMIIQvsCPOFAFyx8Tyx8B+gLKAAHPFslBMBUQJG1QQ20DyM+FgMoAz4RAzgH6AoBpz0ACXG4BbqiTW8+BnVjPhoDPhID0APQAz4Hi9ADJAfsAyH8BygABAYEBAc8Aye1U2zEB2mwh0x/6QFkyUSKhghA7msoAcn9wcfhCcCImEGvIVWDbPMlBMBUQJG1QQ20DyM+FgMoAz4RAzgH6AoBpz0ACXG4BbqiTW8+BnVjPhoDPhID0APQAz4Hi9ADJAfsAyH8BygABAYEBAc8Aye1U2zESAFSCEBdXHshQCMsfFss/FMoAEsv/Ac8WygABAYEBAc8AyFgBgQEBzwDJAcwAJO1E0NIAAZeBAQHXAAEx4DCAZAACIA==');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initSampleContract_init_args({ $$type: 'SampleContract_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const SampleContract_errors = {
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
const SampleContract_types = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "EntryFirst", "header": 2757457064, "fields": [{ "name": "amountToAdd", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 32 } }, { "name": "toAddress", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "EntrySecond", "header": 4282440720, "fields": [{ "name": "amountToAdd", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 32 } }, { "name": "toAddress", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "First", "header": 3200290616, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 32 } }, { "name": "myCoins", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "myBool3", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "anAddress", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "Second", "header": 391585480, "fields": [{ "name": "amount_bigger", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "myBool", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "thisDoesNotFit", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }, { "name": "myAddress", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "myBool2", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "myStruct", "type": { "kind": "simple", "type": "MyStruct", "optional": false } }, { "name": "myStruct2", "type": { "kind": "simple", "type": "MyStruct", "optional": false } }] },
    { "name": "Large", "header": 618480963, "fields": [{ "name": "address", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }] },
    { "name": "SmallBounce", "header": 3235833558, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 32 } }, { "name": "myBool3", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "MyStruct", "header": null, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "SampleContract$Data", "header": null, "fields": [{ "name": "a", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "SampleContract2$Data", "header": null, "fields": [] },
];
const SampleContract_getters = [
    { "name": "amount", "methodId": 101100, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
];
exports.SampleContract_getterMapping = {
    'amount': 'getAmount',
};
const SampleContract_receivers = [
    { "receiver": "internal", "message": { "kind": "empty" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "EntryFirst" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "EntrySecond" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "First" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Second" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "Increment" } },
];
class SampleContract {
    static async init() {
        return await SampleContract_init();
    }
    static async fromInit() {
        const __gen_init = await SampleContract_init();
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new SampleContract(address, __gen_init);
    }
    static fromAddress(address) {
        return new SampleContract(address);
    }
    address;
    init;
    abi = {
        types: SampleContract_types,
        getters: SampleContract_getters,
        receivers: SampleContract_receivers,
        errors: SampleContract_errors,
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
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'EntryFirst') {
            body = (0, core_1.beginCell)().store(storeEntryFirst(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'EntrySecond') {
            body = (0, core_1.beginCell)().store(storeEntrySecond(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'First') {
            body = (0, core_1.beginCell)().store(storeFirst(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'Second') {
            body = (0, core_1.beginCell)().store(storeSecond(message)).endCell();
        }
        if (message === "Increment") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) {
            throw new Error('Invalid message type');
        }
        await provider.internal(via, { ...args, body: body });
    }
    async getAmount(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(101100, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
}
exports.SampleContract = SampleContract;
