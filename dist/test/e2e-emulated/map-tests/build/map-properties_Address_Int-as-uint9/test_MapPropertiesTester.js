"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapPropertiesTester = exports.MapPropertiesTester_getterMapping = void 0;
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
exports.storeKeyData = storeKeyData;
exports.loadKeyData = loadKeyData;
exports.storeValData = storeValData;
exports.loadValData = loadValData;
exports.storeSomeStruct = storeSomeStruct;
exports.loadSomeStruct = loadSomeStruct;
exports.storeSomeMessage = storeSomeMessage;
exports.loadSomeMessage = loadSomeMessage;
exports.storeMapPropertiesTester$Data = storeMapPropertiesTester$Data;
exports.loadMapPropertiesTester$Data = loadMapPropertiesTester$Data;
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
function storeKeyData(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeAddress(src._1);
        b_0.storeAddress(src._2);
    };
}
function loadKeyData(slice) {
    const sc_0 = slice;
    const __1 = sc_0.loadAddress();
    const __2 = sc_0.loadAddress();
    return { $$type: 'KeyData', _1: __1, _2: __2 };
}
function loadTupleKeyData(source) {
    const __1 = source.readAddress();
    const __2 = source.readAddress();
    return { $$type: 'KeyData', _1: __1, _2: __2 };
}
function loadGetterTupleKeyData(source) {
    const __1 = source.readAddress();
    const __2 = source.readAddress();
    return { $$type: 'KeyData', _1: __1, _2: __2 };
}
function storeTupleKeyData(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeAddress(source._1);
    builder.writeAddress(source._2);
    return builder.build();
}
function dictValueParserKeyData() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeKeyData(src)).endCell());
        },
        parse: (src) => {
            return loadKeyData(src.loadRef().beginParse());
        }
    };
}
function storeValData(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(src._1, 9);
        b_0.storeUint(src._2, 9);
    };
}
function loadValData(slice) {
    const sc_0 = slice;
    const __1 = sc_0.loadUintBig(9);
    const __2 = sc_0.loadUintBig(9);
    return { $$type: 'ValData', _1: __1, _2: __2 };
}
function loadTupleValData(source) {
    const __1 = source.readBigNumber();
    const __2 = source.readBigNumber();
    return { $$type: 'ValData', _1: __1, _2: __2 };
}
function loadGetterTupleValData(source) {
    const __1 = source.readBigNumber();
    const __2 = source.readBigNumber();
    return { $$type: 'ValData', _1: __1, _2: __2 };
}
function storeTupleValData(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source._1);
    builder.writeNumber(source._2);
    return builder.build();
}
function dictValueParserValData() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeValData(src)).endCell());
        },
        parse: (src) => {
            return loadValData(src.loadRef().beginParse());
        }
    };
}
function storeSomeStruct(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.i, 257);
        b_0.storeBit(src.b);
        b_0.storeAddress(src.a);
        b_0.storeUint(src.u1, 256);
        const b_1 = new core_1.Builder();
        b_1.storeUint(src.u2, 255);
        b_0.storeRef(b_1.endCell());
    };
}
function loadSomeStruct(slice) {
    const sc_0 = slice;
    const _i = sc_0.loadIntBig(257);
    const _b = sc_0.loadBit();
    const _a = sc_0.loadAddress();
    const _u1 = sc_0.loadUintBig(256);
    const sc_1 = sc_0.loadRef().beginParse();
    const _u2 = sc_1.loadUintBig(255);
    return { $$type: 'SomeStruct', i: _i, b: _b, a: _a, u1: _u1, u2: _u2 };
}
function loadTupleSomeStruct(source) {
    const _i = source.readBigNumber();
    const _b = source.readBoolean();
    const _a = source.readAddress();
    const _u1 = source.readBigNumber();
    const _u2 = source.readBigNumber();
    return { $$type: 'SomeStruct', i: _i, b: _b, a: _a, u1: _u1, u2: _u2 };
}
function loadGetterTupleSomeStruct(source) {
    const _i = source.readBigNumber();
    const _b = source.readBoolean();
    const _a = source.readAddress();
    const _u1 = source.readBigNumber();
    const _u2 = source.readBigNumber();
    return { $$type: 'SomeStruct', i: _i, b: _b, a: _a, u1: _u1, u2: _u2 };
}
function storeTupleSomeStruct(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.i);
    builder.writeBoolean(source.b);
    builder.writeAddress(source.a);
    builder.writeNumber(source.u1);
    builder.writeNumber(source.u2);
    return builder.build();
}
function dictValueParserSomeStruct() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSomeStruct(src)).endCell());
        },
        parse: (src) => {
            return loadSomeStruct(src.loadRef().beginParse());
        }
    };
}
function storeSomeMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(4660, 32);
        b_0.storeAddress(src.buyer);
        b_0.storeUint(src.nonce, 32);
    };
}
function loadSomeMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4660) {
        throw Error('Invalid prefix');
    }
    const _buyer = sc_0.loadAddress();
    const _nonce = sc_0.loadUintBig(32);
    return { $$type: 'SomeMessage', buyer: _buyer, nonce: _nonce };
}
function loadTupleSomeMessage(source) {
    const _buyer = source.readAddress();
    const _nonce = source.readBigNumber();
    return { $$type: 'SomeMessage', buyer: _buyer, nonce: _nonce };
}
function loadGetterTupleSomeMessage(source) {
    const _buyer = source.readAddress();
    const _nonce = source.readBigNumber();
    return { $$type: 'SomeMessage', buyer: _buyer, nonce: _nonce };
}
function storeTupleSomeMessage(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeAddress(source.buyer);
    builder.writeNumber(source.nonce);
    return builder.build();
}
function dictValueParserSomeMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSomeMessage(src)).endCell());
        },
        parse: (src) => {
            return loadSomeMessage(src.loadRef().beginParse());
        }
    };
}
function storeMapPropertiesTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
function loadMapPropertiesTester$Data(slice) {
    const sc_0 = slice;
    return { $$type: 'MapPropertiesTester$Data' };
}
function loadTupleMapPropertiesTester$Data(source) {
    return { $$type: 'MapPropertiesTester$Data' };
}
function loadGetterTupleMapPropertiesTester$Data(source) {
    return { $$type: 'MapPropertiesTester$Data' };
}
function storeTupleMapPropertiesTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserMapPropertiesTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMapPropertiesTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMapPropertiesTester$Data(src.loadRef().beginParse());
        }
    };
}
function initMapPropertiesTester_init_args(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
async function MapPropertiesTester_init() {
    const __code = core_1.Cell.fromBase64('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');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initMapPropertiesTester_init_args({ $$type: 'MapPropertiesTester_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const MapPropertiesTester_errors = {
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
const MapPropertiesTester_types = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "MessageParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "BasechainAddress", "header": null, "fields": [{ "name": "hash", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }] },
    { "name": "KeyData", "header": null, "fields": [{ "name": "_1", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "_2", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "ValData", "header": null, "fields": [{ "name": "_1", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 9 } }, { "name": "_2", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 9 } }] },
    { "name": "SomeStruct", "header": null, "fields": [{ "name": "i", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "b", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "a", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "u1", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }, { "name": "u2", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 255 } }] },
    { "name": "SomeMessage", "header": 4660, "fields": [{ "name": "buyer", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "nonce", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 32 } }] },
    { "name": "MapPropertiesTester$Data", "header": null, "fields": [] },
];
const MapPropertiesTester_getters = [
    { "name": "testEmptyMapGet", "methodId": 83942, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testGetDoesNotModify", "methodId": 107617, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testSetModifies", "methodId": 70361, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testSetGetSameKey", "methodId": 124233, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testSetGetNotSameKey", "methodId": 72917, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testSetIdempotent", "methodId": 114904, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testSetSetOfNotSameCommutes", "methodId": 123161, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testDelGetSameKeyPresent", "methodId": 66216, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testDelGetSameKeyMissing", "methodId": 104467, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testDelOfPresentModifies", "methodId": 70707, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testDelOfMissingDoesNotModify", "methodId": 125331, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testDelDelOfSameDoesNotModify", "methodId": 115397, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testSetDelOfMissingDoesNotModify", "methodId": 109300, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testDelSetOfSamePresent", "methodId": 107451, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testDelSetOfSameMissing", "methodId": 80128, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testDelSetOfNotSameCommutes", "methodId": 113604, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testEmptyMapSize", "methodId": 91416, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testSingletonMapSize", "methodId": 87514, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testDoubletonMapSize", "methodId": 75989, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testGetNonNullEquivalentExists", "methodId": 125207, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testEmptyMapIsEmpty", "methodId": 113933, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testNonEmptyMapsNotIsEmpty", "methodId": 126836, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testEqualsImpliesDeepEquals", "methodId": 67863, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testThereDeepEqualMapsThatAreNotEqual", "methodId": 112497, "arguments": [{ "name": "_key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "_val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testAsCellEquals", "methodId": 102963, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testAsCellDoesNothing", "methodId": 75654, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testReplaceEmptyMap", "methodId": 120102, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testReplaceDoesNotModifyIfKeyIsMissing", "methodId": 68251, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testReplaceWorksAsSetIfKeyIsPresent", "methodId": 92956, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testReplaceGetSameKeyIfPresent", "methodId": 94587, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testReplaceGetNotSameKey", "methodId": 108276, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testReplaceIdempotent", "methodId": 131067, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testReplaceReplaceOfNotSameCommutes", "methodId": 122556, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testEmptyMapReplaceGet", "methodId": 73819, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testDelReplaceGet", "methodId": 77773, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
    { "name": "testSetReplaceGet", "methodId": 66754, "arguments": [{ "name": "key", "type": { "kind": "simple", "type": "KeyData", "optional": false } }, { "name": "val", "type": { "kind": "simple", "type": "ValData", "optional": false } }], "returnType": { "kind": "simple", "type": "bool", "optional": false } },
];
exports.MapPropertiesTester_getterMapping = {
    'testEmptyMapGet': 'getTestEmptyMapGet',
    'testGetDoesNotModify': 'getTestGetDoesNotModify',
    'testSetModifies': 'getTestSetModifies',
    'testSetGetSameKey': 'getTestSetGetSameKey',
    'testSetGetNotSameKey': 'getTestSetGetNotSameKey',
    'testSetIdempotent': 'getTestSetIdempotent',
    'testSetSetOfNotSameCommutes': 'getTestSetSetOfNotSameCommutes',
    'testDelGetSameKeyPresent': 'getTestDelGetSameKeyPresent',
    'testDelGetSameKeyMissing': 'getTestDelGetSameKeyMissing',
    'testDelOfPresentModifies': 'getTestDelOfPresentModifies',
    'testDelOfMissingDoesNotModify': 'getTestDelOfMissingDoesNotModify',
    'testDelDelOfSameDoesNotModify': 'getTestDelDelOfSameDoesNotModify',
    'testSetDelOfMissingDoesNotModify': 'getTestSetDelOfMissingDoesNotModify',
    'testDelSetOfSamePresent': 'getTestDelSetOfSamePresent',
    'testDelSetOfSameMissing': 'getTestDelSetOfSameMissing',
    'testDelSetOfNotSameCommutes': 'getTestDelSetOfNotSameCommutes',
    'testEmptyMapSize': 'getTestEmptyMapSize',
    'testSingletonMapSize': 'getTestSingletonMapSize',
    'testDoubletonMapSize': 'getTestDoubletonMapSize',
    'testGetNonNullEquivalentExists': 'getTestGetNonNullEquivalentExists',
    'testEmptyMapIsEmpty': 'getTestEmptyMapIsEmpty',
    'testNonEmptyMapsNotIsEmpty': 'getTestNonEmptyMapsNotIsEmpty',
    'testEqualsImpliesDeepEquals': 'getTestEqualsImpliesDeepEquals',
    'testThereDeepEqualMapsThatAreNotEqual': 'getTestThereDeepEqualMapsThatAreNotEqual',
    'testAsCellEquals': 'getTestAsCellEquals',
    'testAsCellDoesNothing': 'getTestAsCellDoesNothing',
    'testReplaceEmptyMap': 'getTestReplaceEmptyMap',
    'testReplaceDoesNotModifyIfKeyIsMissing': 'getTestReplaceDoesNotModifyIfKeyIsMissing',
    'testReplaceWorksAsSetIfKeyIsPresent': 'getTestReplaceWorksAsSetIfKeyIsPresent',
    'testReplaceGetSameKeyIfPresent': 'getTestReplaceGetSameKeyIfPresent',
    'testReplaceGetNotSameKey': 'getTestReplaceGetNotSameKey',
    'testReplaceIdempotent': 'getTestReplaceIdempotent',
    'testReplaceReplaceOfNotSameCommutes': 'getTestReplaceReplaceOfNotSameCommutes',
    'testEmptyMapReplaceGet': 'getTestEmptyMapReplaceGet',
    'testDelReplaceGet': 'getTestDelReplaceGet',
    'testSetReplaceGet': 'getTestSetReplaceGet',
};
const MapPropertiesTester_receivers = [
    { "receiver": "internal", "message": { "kind": "empty" } },
];
class MapPropertiesTester {
    static ExitCodeEqualKeys = 1024n;
    static ExitCodeKeyMustBeMissing = 1025n;
    static ExitCodeKeyMustBePresent = 1026n;
    static ExitCodeUnequalMapHashes = 1027n;
    static storageReserve = 0n;
    static async init() {
        return await MapPropertiesTester_init();
    }
    static async fromInit() {
        const __gen_init = await MapPropertiesTester_init();
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new MapPropertiesTester(address, __gen_init);
    }
    static fromAddress(address) {
        return new MapPropertiesTester(address);
    }
    address;
    init;
    abi = {
        types: MapPropertiesTester_types,
        getters: MapPropertiesTester_getters,
        receivers: MapPropertiesTester_receivers,
        errors: MapPropertiesTester_errors,
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
    async getTestEmptyMapGet(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(83942, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestGetDoesNotModify(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(107617, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestSetModifies(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(70361, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestSetGetSameKey(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(124233, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestSetGetNotSameKey(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(72917, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestSetIdempotent(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(114904, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestSetSetOfNotSameCommutes(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(123161, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestDelGetSameKeyPresent(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(66216, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestDelGetSameKeyMissing(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(104467, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestDelOfPresentModifies(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(70707, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestDelOfMissingDoesNotModify(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(125331, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestDelDelOfSameDoesNotModify(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(115397, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestSetDelOfMissingDoesNotModify(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(109300, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestDelSetOfSamePresent(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(107451, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestDelSetOfSameMissing(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(80128, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestDelSetOfNotSameCommutes(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(113604, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestEmptyMapSize(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(91416, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestSingletonMapSize(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(87514, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestDoubletonMapSize(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(75989, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestGetNonNullEquivalentExists(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(125207, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestEmptyMapIsEmpty(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(113933, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestNonEmptyMapsNotIsEmpty(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(126836, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestEqualsImpliesDeepEquals(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(67863, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestThereDeepEqualMapsThatAreNotEqual(provider, _key, _val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(_key));
        builder.writeTuple(storeTupleValData(_val));
        const source = (await provider.get(112497, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestAsCellEquals(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(102963, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestAsCellDoesNothing(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(75654, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestReplaceEmptyMap(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(120102, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestReplaceDoesNotModifyIfKeyIsMissing(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(68251, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestReplaceWorksAsSetIfKeyIsPresent(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(92956, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestReplaceGetSameKeyIfPresent(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(94587, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestReplaceGetNotSameKey(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(108276, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestReplaceIdempotent(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(131067, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestReplaceReplaceOfNotSameCommutes(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(122556, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestEmptyMapReplaceGet(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(73819, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestDelReplaceGet(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(77773, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    async getTestSetReplaceGet(provider, key, val) {
        const builder = new core_1.TupleBuilder();
        builder.writeTuple(storeTupleKeyData(key));
        builder.writeTuple(storeTupleValData(val));
        const source = (await provider.get(66754, builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
}
exports.MapPropertiesTester = MapPropertiesTester;
