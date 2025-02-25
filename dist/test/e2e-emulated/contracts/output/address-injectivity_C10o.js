"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C10o = exports.C10o_getterMapping = void 0;
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
exports.storeC1$Data = storeC1$Data;
exports.loadC1$Data = loadC1$Data;
exports.storeC2$Data = storeC2$Data;
exports.loadC2$Data = loadC2$Data;
exports.storeC3f$Data = storeC3f$Data;
exports.loadC3f$Data = loadC3f$Data;
exports.storeC4g$Data = storeC4g$Data;
exports.loadC4g$Data = loadC4g$Data;
exports.storeC5i$Data = storeC5i$Data;
exports.loadC5i$Data = loadC5i$Data;
exports.storeC6fn$Data = storeC6fn$Data;
exports.loadC6fn$Data = loadC6fn$Data;
exports.storeC7gt$Data = storeC7gt$Data;
exports.loadC7gt$Data = loadC7gt$Data;
exports.storeC8h$Data = storeC8h$Data;
exports.loadC8h$Data = loadC8h$Data;
exports.storeC9g2$Data = storeC9g2$Data;
exports.loadC9g2$Data = loadC9g2$Data;
exports.storeC10o$Data = storeC10o$Data;
exports.loadC10o$Data = loadC10o$Data;
exports.storeTester$Data = storeTester$Data;
exports.loadTester$Data = loadTester$Data;
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
function storeC1$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.f1, 257);
    };
}
function loadC1$Data(slice) {
    const sc_0 = slice;
    const _f1 = sc_0.loadIntBig(257);
    return { $$type: 'C1$Data', f1: _f1 };
}
function loadTupleC1$Data(source) {
    const _f1 = source.readBigNumber();
    return { $$type: 'C1$Data', f1: _f1 };
}
function loadGetterTupleC1$Data(source) {
    const _f1 = source.readBigNumber();
    return { $$type: 'C1$Data', f1: _f1 };
}
function storeTupleC1$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.f1);
    return builder.build();
}
function dictValueParserC1$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeC1$Data(src)).endCell());
        },
        parse: (src) => {
            return loadC1$Data(src.loadRef().beginParse());
        }
    };
}
function storeC2$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.f1, 257);
    };
}
function loadC2$Data(slice) {
    const sc_0 = slice;
    const _f1 = sc_0.loadIntBig(257);
    return { $$type: 'C2$Data', f1: _f1 };
}
function loadTupleC2$Data(source) {
    const _f1 = source.readBigNumber();
    return { $$type: 'C2$Data', f1: _f1 };
}
function loadGetterTupleC2$Data(source) {
    const _f1 = source.readBigNumber();
    return { $$type: 'C2$Data', f1: _f1 };
}
function storeTupleC2$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.f1);
    return builder.build();
}
function dictValueParserC2$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeC2$Data(src)).endCell());
        },
        parse: (src) => {
            return loadC2$Data(src.loadRef().beginParse());
        }
    };
}
function storeC3f$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.f1, 257);
        b_0.storeInt(src.f2, 257);
    };
}
function loadC3f$Data(slice) {
    const sc_0 = slice;
    const _f1 = sc_0.loadIntBig(257);
    const _f2 = sc_0.loadIntBig(257);
    return { $$type: 'C3f$Data', f1: _f1, f2: _f2 };
}
function loadTupleC3f$Data(source) {
    const _f1 = source.readBigNumber();
    const _f2 = source.readBigNumber();
    return { $$type: 'C3f$Data', f1: _f1, f2: _f2 };
}
function loadGetterTupleC3f$Data(source) {
    const _f1 = source.readBigNumber();
    const _f2 = source.readBigNumber();
    return { $$type: 'C3f$Data', f1: _f1, f2: _f2 };
}
function storeTupleC3f$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.f1);
    builder.writeNumber(source.f2);
    return builder.build();
}
function dictValueParserC3f$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeC3f$Data(src)).endCell());
        },
        parse: (src) => {
            return loadC3f$Data(src.loadRef().beginParse());
        }
    };
}
function storeC4g$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.f1, 257);
    };
}
function loadC4g$Data(slice) {
    const sc_0 = slice;
    const _f1 = sc_0.loadIntBig(257);
    return { $$type: 'C4g$Data', f1: _f1 };
}
function loadTupleC4g$Data(source) {
    const _f1 = source.readBigNumber();
    return { $$type: 'C4g$Data', f1: _f1 };
}
function loadGetterTupleC4g$Data(source) {
    const _f1 = source.readBigNumber();
    return { $$type: 'C4g$Data', f1: _f1 };
}
function storeTupleC4g$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.f1);
    return builder.build();
}
function dictValueParserC4g$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeC4g$Data(src)).endCell());
        },
        parse: (src) => {
            return loadC4g$Data(src.loadRef().beginParse());
        }
    };
}
function storeC5i$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.f1, 257);
    };
}
function loadC5i$Data(slice) {
    const sc_0 = slice;
    const _f1 = sc_0.loadIntBig(257);
    return { $$type: 'C5i$Data', f1: _f1 };
}
function loadTupleC5i$Data(source) {
    const _f1 = source.readBigNumber();
    return { $$type: 'C5i$Data', f1: _f1 };
}
function loadGetterTupleC5i$Data(source) {
    const _f1 = source.readBigNumber();
    return { $$type: 'C5i$Data', f1: _f1 };
}
function storeTupleC5i$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.f1);
    return builder.build();
}
function dictValueParserC5i$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeC5i$Data(src)).endCell());
        },
        parse: (src) => {
            return loadC5i$Data(src.loadRef().beginParse());
        }
    };
}
function storeC6fn$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.f, 257);
    };
}
function loadC6fn$Data(slice) {
    const sc_0 = slice;
    const _f = sc_0.loadIntBig(257);
    return { $$type: 'C6fn$Data', f: _f };
}
function loadTupleC6fn$Data(source) {
    const _f = source.readBigNumber();
    return { $$type: 'C6fn$Data', f: _f };
}
function loadGetterTupleC6fn$Data(source) {
    const _f = source.readBigNumber();
    return { $$type: 'C6fn$Data', f: _f };
}
function storeTupleC6fn$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.f);
    return builder.build();
}
function dictValueParserC6fn$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeC6fn$Data(src)).endCell());
        },
        parse: (src) => {
            return loadC6fn$Data(src.loadRef().beginParse());
        }
    };
}
function storeC7gt$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.f1, 257);
    };
}
function loadC7gt$Data(slice) {
    const sc_0 = slice;
    const _f1 = sc_0.loadIntBig(257);
    return { $$type: 'C7gt$Data', f1: _f1 };
}
function loadTupleC7gt$Data(source) {
    const _f1 = source.readBigNumber();
    return { $$type: 'C7gt$Data', f1: _f1 };
}
function loadGetterTupleC7gt$Data(source) {
    const _f1 = source.readBigNumber();
    return { $$type: 'C7gt$Data', f1: _f1 };
}
function storeTupleC7gt$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.f1);
    return builder.build();
}
function dictValueParserC7gt$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeC7gt$Data(src)).endCell());
        },
        parse: (src) => {
            return loadC7gt$Data(src.loadRef().beginParse());
        }
    };
}
function storeC8h$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.h1, 257);
        b_0.storeInt(src.h2, 257);
    };
}
function loadC8h$Data(slice) {
    const sc_0 = slice;
    const _h1 = sc_0.loadIntBig(257);
    const _h2 = sc_0.loadIntBig(257);
    return { $$type: 'C8h$Data', h1: _h1, h2: _h2 };
}
function loadTupleC8h$Data(source) {
    const _h1 = source.readBigNumber();
    const _h2 = source.readBigNumber();
    return { $$type: 'C8h$Data', h1: _h1, h2: _h2 };
}
function loadGetterTupleC8h$Data(source) {
    const _h1 = source.readBigNumber();
    const _h2 = source.readBigNumber();
    return { $$type: 'C8h$Data', h1: _h1, h2: _h2 };
}
function storeTupleC8h$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.h1);
    builder.writeNumber(source.h2);
    return builder.build();
}
function dictValueParserC8h$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeC8h$Data(src)).endCell());
        },
        parse: (src) => {
            return loadC8h$Data(src.loadRef().beginParse());
        }
    };
}
function storeC9g2$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.f1, 257);
        b_0.storeInt(src.f2, 257);
    };
}
function loadC9g2$Data(slice) {
    const sc_0 = slice;
    const _f1 = sc_0.loadIntBig(257);
    const _f2 = sc_0.loadIntBig(257);
    return { $$type: 'C9g2$Data', f1: _f1, f2: _f2 };
}
function loadTupleC9g2$Data(source) {
    const _f1 = source.readBigNumber();
    const _f2 = source.readBigNumber();
    return { $$type: 'C9g2$Data', f1: _f1, f2: _f2 };
}
function loadGetterTupleC9g2$Data(source) {
    const _f1 = source.readBigNumber();
    const _f2 = source.readBigNumber();
    return { $$type: 'C9g2$Data', f1: _f1, f2: _f2 };
}
function storeTupleC9g2$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.f1);
    builder.writeNumber(source.f2);
    return builder.build();
}
function dictValueParserC9g2$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeC9g2$Data(src)).endCell());
        },
        parse: (src) => {
            return loadC9g2$Data(src.loadRef().beginParse());
        }
    };
}
function storeC10o$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.f2, 257);
        b_0.storeInt(src.f1, 257);
    };
}
function loadC10o$Data(slice) {
    const sc_0 = slice;
    const _f2 = sc_0.loadIntBig(257);
    const _f1 = sc_0.loadIntBig(257);
    return { $$type: 'C10o$Data', f2: _f2, f1: _f1 };
}
function loadTupleC10o$Data(source) {
    const _f2 = source.readBigNumber();
    const _f1 = source.readBigNumber();
    return { $$type: 'C10o$Data', f2: _f2, f1: _f1 };
}
function loadGetterTupleC10o$Data(source) {
    const _f2 = source.readBigNumber();
    const _f1 = source.readBigNumber();
    return { $$type: 'C10o$Data', f2: _f2, f1: _f1 };
}
function storeTupleC10o$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.f2);
    builder.writeNumber(source.f1);
    return builder.build();
}
function dictValueParserC10o$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeC10o$Data(src)).endCell());
        },
        parse: (src) => {
            return loadC10o$Data(src.loadRef().beginParse());
        }
    };
}
function storeTester$Data(src) {
    return (builder) => {
        const b_0 = builder;
    };
}
function loadTester$Data(slice) {
    const sc_0 = slice;
    return { $$type: 'Tester$Data' };
}
function loadTupleTester$Data(source) {
    return { $$type: 'Tester$Data' };
}
function loadGetterTupleTester$Data(source) {
    return { $$type: 'Tester$Data' };
}
function storeTupleTester$Data(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserTester$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeTester$Data(src)).endCell());
        },
        parse: (src) => {
            return loadTester$Data(src.loadRef().beginParse());
        }
    };
}
function initC10o_init_args(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.v, 257);
    };
}
async function C10o_init(v) {
    const __code = core_1.Cell.fromBase64('te6ccgEBCQEAfgABFP8A9KQT9LzyyAsBAgFiAgMBPtAw0HLXIdIA0gD6QCEQNFBVbwT4YQH4Yts8W9zywIIHAgEgBAUCEb4o5tnm2eNhDAcGAhO9l7bZ4sbZ42EMBwgAAiEAQO1E0NIAAZ2BAQHXAIEBAdcAWWwS4IEBAdcAAQHRgGQBAAZSEKA=');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initC10o_init_args({ $$type: 'C10o_init_args', v })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const C10o_errors = {
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
const C10o_types = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "C1$Data", "header": null, "fields": [{ "name": "f1", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "C2$Data", "header": null, "fields": [{ "name": "f1", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "C3f$Data", "header": null, "fields": [{ "name": "f1", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "f2", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "C4g$Data", "header": null, "fields": [{ "name": "f1", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "C5i$Data", "header": null, "fields": [{ "name": "f1", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "C6fn$Data", "header": null, "fields": [{ "name": "f", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "C7gt$Data", "header": null, "fields": [{ "name": "f1", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "C8h$Data", "header": null, "fields": [{ "name": "h1", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "h2", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "C9g2$Data", "header": null, "fields": [{ "name": "f1", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "f2", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "C10o$Data", "header": null, "fields": [{ "name": "f2", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "f1", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "Tester$Data", "header": null, "fields": [] },
];
const C10o_getters = [
    { "name": "incrAndGetField1", "methodId": 111350, "arguments": [{ "name": "n", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "getField2", "methodId": 83228, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
];
exports.C10o_getterMapping = {
    'incrAndGetField1': 'getIncrAndGetField1',
    'getField2': 'getGetField2',
};
const C10o_receivers = [];
class C10o {
    static async init(v) {
        return await C10o_init(v);
    }
    static async fromInit(v) {
        const __gen_init = await C10o_init(v);
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new C10o(address, __gen_init);
    }
    static fromAddress(address) {
        return new C10o(address);
    }
    address;
    init;
    abi = {
        types: C10o_types,
        getters: C10o_getters,
        receivers: C10o_receivers,
        errors: C10o_errors,
    };
    constructor(address, init) {
        this.address = address;
        this.init = init;
    }
    async getIncrAndGetField1(provider, n) {
        const builder = new core_1.TupleBuilder();
        builder.writeNumber(n);
        const source = (await provider.get(111350, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getGetField2(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(83228, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
}
exports.C10o = C10o;
