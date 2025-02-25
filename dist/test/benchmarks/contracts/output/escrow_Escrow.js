"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Escrow = exports.Escrow_getterMapping = void 0;
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
exports.storeJettonData = storeJettonData;
exports.loadJettonData = loadJettonData;
exports.storeJettonWalletData = storeJettonWalletData;
exports.loadJettonWalletData = loadJettonWalletData;
exports.storeMaybeAddress = storeMaybeAddress;
exports.loadMaybeAddress = loadMaybeAddress;
exports.storeJettonUpdateContent = storeJettonUpdateContent;
exports.loadJettonUpdateContent = loadJettonUpdateContent;
exports.storeJettonTransfer = storeJettonTransfer;
exports.loadJettonTransfer = loadJettonTransfer;
exports.storeJettonTransferInternal = storeJettonTransferInternal;
exports.loadJettonTransferInternal = loadJettonTransferInternal;
exports.storeJettonNotification = storeJettonNotification;
exports.loadJettonNotification = loadJettonNotification;
exports.storeJettonBurn = storeJettonBurn;
exports.loadJettonBurn = loadJettonBurn;
exports.storeJettonBurnNotification = storeJettonBurnNotification;
exports.loadJettonBurnNotification = loadJettonBurnNotification;
exports.storeJettonExcesses = storeJettonExcesses;
exports.loadJettonExcesses = loadJettonExcesses;
exports.storeProvideWalletAddress = storeProvideWalletAddress;
exports.loadProvideWalletAddress = loadProvideWalletAddress;
exports.storeTakeWalletAddress = storeTakeWalletAddress;
exports.loadTakeWalletAddress = loadTakeWalletAddress;
exports.storeMint = storeMint;
exports.loadMint = loadMint;
exports.storeChangeOwner = storeChangeOwner;
exports.loadChangeOwner = loadChangeOwner;
exports.storeUpdateJettonWalletCode = storeUpdateJettonWalletCode;
exports.loadUpdateJettonWalletCode = loadUpdateJettonWalletCode;
exports.storeTakeEscrowData = storeTakeEscrowData;
exports.loadTakeEscrowData = loadTakeEscrowData;
exports.storeEscrowData = storeEscrowData;
exports.loadEscrowData = loadEscrowData;
exports.storeEscrow$Data = storeEscrow$Data;
exports.loadEscrow$Data = loadEscrow$Data;
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
function storeJettonData(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.totalSupply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.jettonWalletCode);
    };
}
function loadJettonData(slice) {
    const sc_0 = slice;
    const _totalSupply = sc_0.loadIntBig(257);
    const _mintable = sc_0.loadBit();
    const _owner = sc_0.loadAddress();
    const _content = sc_0.loadRef();
    const _jettonWalletCode = sc_0.loadRef();
    return { $$type: 'JettonData', totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, jettonWalletCode: _jettonWalletCode };
}
function loadTupleJettonData(source) {
    const _totalSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _jettonWalletCode = source.readCell();
    return { $$type: 'JettonData', totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, jettonWalletCode: _jettonWalletCode };
}
function loadGetterTupleJettonData(source) {
    const _totalSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _jettonWalletCode = source.readCell();
    return { $$type: 'JettonData', totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, jettonWalletCode: _jettonWalletCode };
}
function storeTupleJettonData(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.jettonWalletCode);
    return builder.build();
}
function dictValueParserJettonData() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    };
}
function storeJettonWalletData(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeRef(src.code);
    };
}
function loadJettonWalletData(slice) {
    const sc_0 = slice;
    const _balance = sc_0.loadIntBig(257);
    const _owner = sc_0.loadAddress();
    const _master = sc_0.loadAddress();
    const _code = sc_0.loadRef();
    return { $$type: 'JettonWalletData', balance: _balance, owner: _owner, master: _master, code: _code };
}
function loadTupleJettonWalletData(source) {
    const _balance = source.readBigNumber();
    const _owner = source.readAddress();
    const _master = source.readAddress();
    const _code = source.readCell();
    return { $$type: 'JettonWalletData', balance: _balance, owner: _owner, master: _master, code: _code };
}
function loadGetterTupleJettonWalletData(source) {
    const _balance = source.readBigNumber();
    const _owner = source.readAddress();
    const _master = source.readAddress();
    const _code = source.readCell();
    return { $$type: 'JettonWalletData', balance: _balance, owner: _owner, master: _master, code: _code };
}
function storeTupleJettonWalletData(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeCell(source.code);
    return builder.build();
}
function dictValueParserJettonWalletData() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWalletData(src.loadRef().beginParse());
        }
    };
}
function storeMaybeAddress(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.address);
    };
}
function loadMaybeAddress(slice) {
    const sc_0 = slice;
    const _address = sc_0.loadMaybeAddress();
    return { $$type: 'MaybeAddress', address: _address };
}
function loadTupleMaybeAddress(source) {
    const _address = source.readAddressOpt();
    return { $$type: 'MaybeAddress', address: _address };
}
function loadGetterTupleMaybeAddress(source) {
    const _address = source.readAddressOpt();
    return { $$type: 'MaybeAddress', address: _address };
}
function storeTupleMaybeAddress(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}
function dictValueParserMaybeAddress() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMaybeAddress(src)).endCell());
        },
        parse: (src) => {
            return loadMaybeAddress(src.loadRef().beginParse());
        }
    };
}
function storeJettonUpdateContent(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(4, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeRef(src.content);
    };
}
function loadJettonUpdateContent(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    const _content = sc_0.loadRef();
    return { $$type: 'JettonUpdateContent', queryId: _queryId, content: _content };
}
function loadTupleJettonUpdateContent(source) {
    const _queryId = source.readBigNumber();
    const _content = source.readCell();
    return { $$type: 'JettonUpdateContent', queryId: _queryId, content: _content };
}
function loadGetterTupleJettonUpdateContent(source) {
    const _queryId = source.readBigNumber();
    const _content = source.readCell();
    return { $$type: 'JettonUpdateContent', queryId: _queryId, content: _content };
}
function storeTupleJettonUpdateContent(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeCell(source.content);
    return builder.build();
}
function dictValueParserJettonUpdateContent() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonUpdateContent(src)).endCell());
        },
        parse: (src) => {
            return loadJettonUpdateContent(src.loadRef().beginParse());
        }
    };
}
function storeJettonTransfer(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) {
            b_0.storeBit(true).storeRef(src.customPayload);
        }
        else {
            b_0.storeBit(false);
        }
        b_0.storeCoins(src.forwardTonAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}
function loadJettonTransfer(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _destination = sc_0.loadAddress();
    const _responseDestination = sc_0.loadMaybeAddress();
    const _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _forwardTonAmount = sc_0.loadCoins();
    const _forwardPayload = sc_0;
    return { $$type: 'JettonTransfer', queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}
function loadTupleJettonTransfer(source) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _destination = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    const _customPayload = source.readCellOpt();
    const _forwardTonAmount = source.readBigNumber();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransfer', queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}
function loadGetterTupleJettonTransfer(source) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _destination = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    const _customPayload = source.readCellOpt();
    const _forwardTonAmount = source.readBigNumber();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransfer', queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}
function storeTupleJettonTransfer(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forwardTonAmount);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}
function dictValueParserJettonTransfer() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransfer(src.loadRef().beginParse());
        }
    };
}
function storeJettonTransferInternal(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.responseDestination);
        b_0.storeCoins(src.forwardTonAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}
function loadJettonTransferInternal(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _responseDestination = sc_0.loadMaybeAddress();
    const _forwardTonAmount = sc_0.loadCoins();
    const _forwardPayload = sc_0;
    return { $$type: 'JettonTransferInternal', queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}
function loadTupleJettonTransferInternal(source) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    const _forwardTonAmount = source.readBigNumber();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransferInternal', queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}
function loadGetterTupleJettonTransferInternal(source) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    const _forwardTonAmount = source.readBigNumber();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonTransferInternal', queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}
function storeTupleJettonTransferInternal(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.responseDestination);
    builder.writeNumber(source.forwardTonAmount);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}
function dictValueParserJettonTransferInternal() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonTransferInternal(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransferInternal(src.loadRef().beginParse());
        }
    };
}
function storeJettonNotification(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}
function loadJettonNotification(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _forwardPayload = sc_0;
    return { $$type: 'JettonNotification', queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}
function loadTupleJettonNotification(source) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonNotification', queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}
function loadGetterTupleJettonNotification(source) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'JettonNotification', queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload };
}
function storeTupleJettonNotification(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}
function dictValueParserJettonNotification() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonNotification(src.loadRef().beginParse());
        }
    };
}
function storeJettonBurn(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) {
            b_0.storeBit(true).storeRef(src.customPayload);
        }
        else {
            b_0.storeBit(false);
        }
    };
}
function loadJettonBurn(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _responseDestination = sc_0.loadAddress();
    const _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'JettonBurn', queryId: _queryId, amount: _amount, responseDestination: _responseDestination, customPayload: _customPayload };
}
function loadTupleJettonBurn(source) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _responseDestination = source.readAddress();
    const _customPayload = source.readCellOpt();
    return { $$type: 'JettonBurn', queryId: _queryId, amount: _amount, responseDestination: _responseDestination, customPayload: _customPayload };
}
function loadGetterTupleJettonBurn(source) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _responseDestination = source.readAddress();
    const _customPayload = source.readCellOpt();
    return { $$type: 'JettonBurn', queryId: _queryId, amount: _amount, responseDestination: _responseDestination, customPayload: _customPayload };
}
function storeTupleJettonBurn(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    return builder.build();
}
function dictValueParserJettonBurn() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonBurn(src)).endCell());
        },
        parse: (src) => {
            return loadJettonBurn(src.loadRef().beginParse());
        }
    };
}
function storeJettonBurnNotification(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.responseDestination);
    };
}
function loadJettonBurnNotification(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _sender = sc_0.loadAddress();
    const _responseDestination = sc_0.loadAddress();
    return { $$type: 'JettonBurnNotification', queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination };
}
function loadTupleJettonBurnNotification(source) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _responseDestination = source.readAddress();
    return { $$type: 'JettonBurnNotification', queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination };
}
function loadGetterTupleJettonBurnNotification(source) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _sender = source.readAddress();
    const _responseDestination = source.readAddress();
    return { $$type: 'JettonBurnNotification', queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination };
}
function storeTupleJettonBurnNotification(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.responseDestination);
    return builder.build();
}
function dictValueParserJettonBurnNotification() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonBurnNotification(src.loadRef().beginParse());
        }
    };
}
function storeJettonExcesses(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.queryId, 64);
    };
}
function loadJettonExcesses(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'JettonExcesses', queryId: _queryId };
}
function loadTupleJettonExcesses(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'JettonExcesses', queryId: _queryId };
}
function loadGetterTupleJettonExcesses(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'JettonExcesses', queryId: _queryId };
}
function storeTupleJettonExcesses(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}
function dictValueParserJettonExcesses() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadJettonExcesses(src.loadRef().beginParse());
        }
    };
}
function storeProvideWalletAddress(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(745978227, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.ownerAddress);
        b_0.storeBit(src.includeAddress);
    };
}
function loadProvideWalletAddress(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 745978227) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    const _ownerAddress = sc_0.loadAddress();
    const _includeAddress = sc_0.loadBit();
    return { $$type: 'ProvideWalletAddress', queryId: _queryId, ownerAddress: _ownerAddress, includeAddress: _includeAddress };
}
function loadTupleProvideWalletAddress(source) {
    const _queryId = source.readBigNumber();
    const _ownerAddress = source.readAddress();
    const _includeAddress = source.readBoolean();
    return { $$type: 'ProvideWalletAddress', queryId: _queryId, ownerAddress: _ownerAddress, includeAddress: _includeAddress };
}
function loadGetterTupleProvideWalletAddress(source) {
    const _queryId = source.readBigNumber();
    const _ownerAddress = source.readAddress();
    const _includeAddress = source.readBoolean();
    return { $$type: 'ProvideWalletAddress', queryId: _queryId, ownerAddress: _ownerAddress, includeAddress: _includeAddress };
}
function storeTupleProvideWalletAddress(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.ownerAddress);
    builder.writeBoolean(source.includeAddress);
    return builder.build();
}
function dictValueParserProvideWalletAddress() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeProvideWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadProvideWalletAddress(src.loadRef().beginParse());
        }
    };
}
function storeTakeWalletAddress(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(3513996288, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.walletAddress);
        if (src.ownerAddress !== null && src.ownerAddress !== undefined) {
            b_0.storeBit(true).storeRef(src.ownerAddress);
        }
        else {
            b_0.storeBit(false);
        }
    };
}
function loadTakeWalletAddress(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3513996288) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    const _walletAddress = sc_0.loadAddress();
    const _ownerAddress = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TakeWalletAddress', queryId: _queryId, walletAddress: _walletAddress, ownerAddress: _ownerAddress };
}
function loadTupleTakeWalletAddress(source) {
    const _queryId = source.readBigNumber();
    const _walletAddress = source.readAddress();
    const _ownerAddress = source.readCellOpt();
    return { $$type: 'TakeWalletAddress', queryId: _queryId, walletAddress: _walletAddress, ownerAddress: _ownerAddress };
}
function loadGetterTupleTakeWalletAddress(source) {
    const _queryId = source.readBigNumber();
    const _walletAddress = source.readAddress();
    const _ownerAddress = source.readCellOpt();
    return { $$type: 'TakeWalletAddress', queryId: _queryId, walletAddress: _walletAddress, ownerAddress: _ownerAddress };
}
function storeTupleTakeWalletAddress(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.walletAddress);
    builder.writeCell(source.ownerAddress);
    return builder.build();
}
function dictValueParserTakeWalletAddress() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeTakeWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadTakeWalletAddress(src.loadRef().beginParse());
        }
    };
}
function storeMint(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(21, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.receiver);
        b_0.storeCoins(src.tonAmount);
        const b_1 = new core_1.Builder();
        b_1.store(storeJettonTransferInternal(src.mintMessage));
        b_0.storeRef(b_1.endCell());
    };
}
function loadMint(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 21) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    const _receiver = sc_0.loadAddress();
    const _tonAmount = sc_0.loadCoins();
    const sc_1 = sc_0.loadRef().beginParse();
    const _mintMessage = loadJettonTransferInternal(sc_1);
    return { $$type: 'Mint', queryId: _queryId, receiver: _receiver, tonAmount: _tonAmount, mintMessage: _mintMessage };
}
function loadTupleMint(source) {
    const _queryId = source.readBigNumber();
    const _receiver = source.readAddress();
    const _tonAmount = source.readBigNumber();
    const _mintMessage = loadTupleJettonTransferInternal(source);
    return { $$type: 'Mint', queryId: _queryId, receiver: _receiver, tonAmount: _tonAmount, mintMessage: _mintMessage };
}
function loadGetterTupleMint(source) {
    const _queryId = source.readBigNumber();
    const _receiver = source.readAddress();
    const _tonAmount = source.readBigNumber();
    const _mintMessage = loadGetterTupleJettonTransferInternal(source);
    return { $$type: 'Mint', queryId: _queryId, receiver: _receiver, tonAmount: _tonAmount, mintMessage: _mintMessage };
}
function storeTupleMint(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.receiver);
    builder.writeNumber(source.tonAmount);
    builder.writeTuple(storeTupleJettonTransferInternal(source.mintMessage));
    return builder.build();
}
function dictValueParserMint() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMint(src)).endCell());
        },
        parse: (src) => {
            return loadMint(src.loadRef().beginParse());
        }
    };
}
function storeChangeOwner(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(3, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}
function loadChangeOwner(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner', queryId: _queryId, newOwner: _newOwner };
}
function loadTupleChangeOwner(source) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner', queryId: _queryId, newOwner: _newOwner };
}
function loadGetterTupleChangeOwner(source) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner', queryId: _queryId, newOwner: _newOwner };
}
function storeTupleChangeOwner(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}
function dictValueParserChangeOwner() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    };
}
function storeUpdateJettonWalletCode(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(492442125, 32);
        b_0.storeRef(src.newJettonWalletCode);
    };
}
function loadUpdateJettonWalletCode(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 492442125) {
        throw Error('Invalid prefix');
    }
    const _newJettonWalletCode = sc_0.loadRef();
    return { $$type: 'UpdateJettonWalletCode', newJettonWalletCode: _newJettonWalletCode };
}
function loadTupleUpdateJettonWalletCode(source) {
    const _newJettonWalletCode = source.readCell();
    return { $$type: 'UpdateJettonWalletCode', newJettonWalletCode: _newJettonWalletCode };
}
function loadGetterTupleUpdateJettonWalletCode(source) {
    const _newJettonWalletCode = source.readCell();
    return { $$type: 'UpdateJettonWalletCode', newJettonWalletCode: _newJettonWalletCode };
}
function storeTupleUpdateJettonWalletCode(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeCell(source.newJettonWalletCode);
    return builder.build();
}
function dictValueParserUpdateJettonWalletCode() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeUpdateJettonWalletCode(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateJettonWalletCode(src.loadRef().beginParse());
        }
    };
}
function storeTakeEscrowData(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(741952126, 32);
        const b_1 = new core_1.Builder();
        b_1.store(storeEscrowData(src.escrowData));
        b_0.storeRef(b_1.endCell());
    };
}
function loadTakeEscrowData(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 741952126) {
        throw Error('Invalid prefix');
    }
    const sc_1 = sc_0.loadRef().beginParse();
    const _escrowData = loadEscrowData(sc_1);
    return { $$type: 'TakeEscrowData', escrowData: _escrowData };
}
function loadTupleTakeEscrowData(source) {
    const _escrowData = loadTupleEscrowData(source);
    return { $$type: 'TakeEscrowData', escrowData: _escrowData };
}
function loadGetterTupleTakeEscrowData(source) {
    const _escrowData = loadGetterTupleEscrowData(source);
    return { $$type: 'TakeEscrowData', escrowData: _escrowData };
}
function storeTupleTakeEscrowData(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeTuple(storeTupleEscrowData(source.escrowData));
    return builder.build();
}
function dictValueParserTakeEscrowData() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeTakeEscrowData(src)).endCell());
        },
        parse: (src) => {
            return loadTakeEscrowData(src.loadRef().beginParse());
        }
    };
}
function storeEscrowData(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(src.id, 32);
        b_0.storeAddress(src.sellerAddress);
        b_0.storeAddress(src.guarantorAddress);
        b_0.storeCoins(src.dealAmount);
        b_0.storeUint(src.guarantorRoyaltyPercent, 32);
        b_0.storeBit(src.isFunded);
        b_0.storeAddress(src.assetAddress);
        if (src.jettonWalletCode !== null && src.jettonWalletCode !== undefined) {
            b_0.storeBit(true).storeRef(src.jettonWalletCode);
        }
        else {
            b_0.storeBit(false);
        }
        const b_1 = new core_1.Builder();
        b_1.storeAddress(src.buyerAddress);
        b_0.storeRef(b_1.endCell());
    };
}
function loadEscrowData(slice) {
    const sc_0 = slice;
    const _id = sc_0.loadUintBig(32);
    const _sellerAddress = sc_0.loadAddress();
    const _guarantorAddress = sc_0.loadAddress();
    const _dealAmount = sc_0.loadCoins();
    const _guarantorRoyaltyPercent = sc_0.loadUintBig(32);
    const _isFunded = sc_0.loadBit();
    const _assetAddress = sc_0.loadMaybeAddress();
    const _jettonWalletCode = sc_0.loadBit() ? sc_0.loadRef() : null;
    const sc_1 = sc_0.loadRef().beginParse();
    const _buyerAddress = sc_1.loadMaybeAddress();
    return { $$type: 'EscrowData', id: _id, sellerAddress: _sellerAddress, guarantorAddress: _guarantorAddress, dealAmount: _dealAmount, guarantorRoyaltyPercent: _guarantorRoyaltyPercent, isFunded: _isFunded, assetAddress: _assetAddress, jettonWalletCode: _jettonWalletCode, buyerAddress: _buyerAddress };
}
function loadTupleEscrowData(source) {
    const _id = source.readBigNumber();
    const _sellerAddress = source.readAddress();
    const _guarantorAddress = source.readAddress();
    const _dealAmount = source.readBigNumber();
    const _guarantorRoyaltyPercent = source.readBigNumber();
    const _isFunded = source.readBoolean();
    const _assetAddress = source.readAddressOpt();
    const _jettonWalletCode = source.readCellOpt();
    const _buyerAddress = source.readAddressOpt();
    return { $$type: 'EscrowData', id: _id, sellerAddress: _sellerAddress, guarantorAddress: _guarantorAddress, dealAmount: _dealAmount, guarantorRoyaltyPercent: _guarantorRoyaltyPercent, isFunded: _isFunded, assetAddress: _assetAddress, jettonWalletCode: _jettonWalletCode, buyerAddress: _buyerAddress };
}
function loadGetterTupleEscrowData(source) {
    const _id = source.readBigNumber();
    const _sellerAddress = source.readAddress();
    const _guarantorAddress = source.readAddress();
    const _dealAmount = source.readBigNumber();
    const _guarantorRoyaltyPercent = source.readBigNumber();
    const _isFunded = source.readBoolean();
    const _assetAddress = source.readAddressOpt();
    const _jettonWalletCode = source.readCellOpt();
    const _buyerAddress = source.readAddressOpt();
    return { $$type: 'EscrowData', id: _id, sellerAddress: _sellerAddress, guarantorAddress: _guarantorAddress, dealAmount: _dealAmount, guarantorRoyaltyPercent: _guarantorRoyaltyPercent, isFunded: _isFunded, assetAddress: _assetAddress, jettonWalletCode: _jettonWalletCode, buyerAddress: _buyerAddress };
}
function storeTupleEscrowData(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeAddress(source.sellerAddress);
    builder.writeAddress(source.guarantorAddress);
    builder.writeNumber(source.dealAmount);
    builder.writeNumber(source.guarantorRoyaltyPercent);
    builder.writeBoolean(source.isFunded);
    builder.writeAddress(source.assetAddress);
    builder.writeCell(source.jettonWalletCode);
    builder.writeAddress(source.buyerAddress);
    return builder.build();
}
function dictValueParserEscrowData() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEscrowData(src)).endCell());
        },
        parse: (src) => {
            return loadEscrowData(src.loadRef().beginParse());
        }
    };
}
function storeEscrow$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(src.id, 32);
        b_0.storeAddress(src.sellerAddress);
        b_0.storeAddress(src.guarantorAddress);
        b_0.storeAddress(src.buyerAddress);
        b_0.storeCoins(src.dealAmount);
        b_0.storeUint(src.guarantorRoyaltyPercent, 32);
        b_0.storeBit(src.isFunded);
        const b_1 = new core_1.Builder();
        b_1.storeAddress(src.assetAddress);
        if (src.jettonWalletCode !== null && src.jettonWalletCode !== undefined) {
            b_1.storeBit(true).storeRef(src.jettonWalletCode);
        }
        else {
            b_1.storeBit(false);
        }
        b_0.storeRef(b_1.endCell());
    };
}
function loadEscrow$Data(slice) {
    const sc_0 = slice;
    const _id = sc_0.loadUintBig(32);
    const _sellerAddress = sc_0.loadAddress();
    const _guarantorAddress = sc_0.loadAddress();
    const _buyerAddress = sc_0.loadMaybeAddress();
    const _dealAmount = sc_0.loadCoins();
    const _guarantorRoyaltyPercent = sc_0.loadUintBig(32);
    const _isFunded = sc_0.loadBit();
    const sc_1 = sc_0.loadRef().beginParse();
    const _assetAddress = sc_1.loadMaybeAddress();
    const _jettonWalletCode = sc_1.loadBit() ? sc_1.loadRef() : null;
    return { $$type: 'Escrow$Data', id: _id, sellerAddress: _sellerAddress, guarantorAddress: _guarantorAddress, buyerAddress: _buyerAddress, dealAmount: _dealAmount, guarantorRoyaltyPercent: _guarantorRoyaltyPercent, isFunded: _isFunded, assetAddress: _assetAddress, jettonWalletCode: _jettonWalletCode };
}
function loadTupleEscrow$Data(source) {
    const _id = source.readBigNumber();
    const _sellerAddress = source.readAddress();
    const _guarantorAddress = source.readAddress();
    const _buyerAddress = source.readAddressOpt();
    const _dealAmount = source.readBigNumber();
    const _guarantorRoyaltyPercent = source.readBigNumber();
    const _isFunded = source.readBoolean();
    const _assetAddress = source.readAddressOpt();
    const _jettonWalletCode = source.readCellOpt();
    return { $$type: 'Escrow$Data', id: _id, sellerAddress: _sellerAddress, guarantorAddress: _guarantorAddress, buyerAddress: _buyerAddress, dealAmount: _dealAmount, guarantorRoyaltyPercent: _guarantorRoyaltyPercent, isFunded: _isFunded, assetAddress: _assetAddress, jettonWalletCode: _jettonWalletCode };
}
function loadGetterTupleEscrow$Data(source) {
    const _id = source.readBigNumber();
    const _sellerAddress = source.readAddress();
    const _guarantorAddress = source.readAddress();
    const _buyerAddress = source.readAddressOpt();
    const _dealAmount = source.readBigNumber();
    const _guarantorRoyaltyPercent = source.readBigNumber();
    const _isFunded = source.readBoolean();
    const _assetAddress = source.readAddressOpt();
    const _jettonWalletCode = source.readCellOpt();
    return { $$type: 'Escrow$Data', id: _id, sellerAddress: _sellerAddress, guarantorAddress: _guarantorAddress, buyerAddress: _buyerAddress, dealAmount: _dealAmount, guarantorRoyaltyPercent: _guarantorRoyaltyPercent, isFunded: _isFunded, assetAddress: _assetAddress, jettonWalletCode: _jettonWalletCode };
}
function storeTupleEscrow$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeAddress(source.sellerAddress);
    builder.writeAddress(source.guarantorAddress);
    builder.writeAddress(source.buyerAddress);
    builder.writeNumber(source.dealAmount);
    builder.writeNumber(source.guarantorRoyaltyPercent);
    builder.writeBoolean(source.isFunded);
    builder.writeAddress(source.assetAddress);
    builder.writeCell(source.jettonWalletCode);
    return builder.build();
}
function dictValueParserEscrow$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEscrow$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEscrow$Data(src.loadRef().beginParse());
        }
    };
}
function initEscrow_init_args(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.id, 257);
        b_0.storeAddress(src.sellerAddress);
        b_0.storeAddress(src.guarantorAddress);
        const b_1 = new core_1.Builder();
        b_1.storeInt(src.dealAmount, 257);
        b_1.storeInt(src.guarantorRoyaltyPercent, 257);
        b_1.storeAddress(src.assetAddress);
        if (src.jettonWalletCode !== null && src.jettonWalletCode !== undefined) {
            b_1.storeBit(true).storeRef(src.jettonWalletCode);
        }
        else {
            b_1.storeBit(false);
        }
        b_0.storeRef(b_1.endCell());
    };
}
async function Escrow_init(id, sellerAddress, guarantorAddress, dealAmount, guarantorRoyaltyPercent, assetAddress, jettonWalletCode) {
    const __code = core_1.Cell.fromBase64('te6ccgECIAEAB9EAART/APSkE/S88sgLAQIBYgIDBO7Q7aLt+wHQctch0gDSAPpAIRA0UGZvBPhhAvhi2zwKkl8K4CjXScIf4wAI+QEggvAGNZ8K1pVvqic2Ba0z1Qm2MwU45IMrYd5jzqWHwyow6rrjAiCC8HSZTMm7ten/zW5g38ER+CzAlu7FgjaDZ4gZXpA7a2nkuhwEBQYCASAWFwTSCNMfIYIQHVoSDbrjAiGCEHNi0Jy6j0kxNAPTP/oA+kBRM0MwMGwiggCDqAXAABXy9IIAzJAobrPy9IIAvnkpbrPy9PgoU4nbPIIAk174QhLHBfL0IoE7xQK68vRVFX8C4AGCEJRqmLa6Bx8ICQDuMIIAg6g0wAAT8vSCAMyQJm7y9PhBbyQwgTvFMyO6EvL0EFcQRhA1UDR/Ash/AcoAVYBQicsfUAbPFlAEzxZYIG6VMHABywGSzxbiAfoCyx/KAMhYIG6VMHABywGSzxbiIm6zln8BygASzJUycFjKAOLJAczJ7VQE+I/4MIE3hyHA//L0+EFvJDAygVKeURfHBfL0EHgQZxBWEEUQNEE52zwibuMPVQfIfwHKAFWAUInLH1AGzxZQBM8WWCBulTBwAcsBks8W4gH6AssfygDIWCBulTBwAcsBks8W4iJus5Z/AcoAEsyVMnBYygDiyQHMye1U4CAaCwwNAf4xOQjUATGCAIOoKcAA8vSCAMyQKG6z8vSCAPeO+EFvJBAjXwMnxwXy9BBoEFcQRhA1RDDIfwHKAFWAUInLH1AGzxZQBM8WWCBulTBwAcsBks8W4gH6AssfygDIWCBulTBwAcsBks8W4iJus5Z/AcoAEsyVMnBYygDiyQHMye1UCgCcyH8BygBVgFCJyx9QBs8WUATPFlggbpUwcAHLAZLPFuIB+gLLH8oAyFggbpUwcAHLAZLPFuIibrOWfwHKABLMlTJwWMoA4skBzMntVNsxAe6O89M/ATHIAYIQr/kPV1jLH8s/yRB5EGgQVxBGEDVEMPhCAXBt2zzIfwHKAFWAUInLH1AGzxZQBM8WWCBulTBwAcsBks8W4gH6AssfygDIWCBulTBwAcsBks8W4iJus5Z/AcoAEsyVMnBYygDiyQHMye1U2zHgCBQABNsxAfKBFO0LggnJw4C8G/L0U0mhUoBxbVptbUADf8jPhYDKAM+EQM4B+gKAac9AAlxuAW6ok1vPgZ1Yz4aAz4SA9AD0AM+B4vQAyQH7AFJqgQCgbVptbUADf8jPhYDKAM+EQM4B+gKAac9AAlxuAW6ok1vPgYri9ADJAfsADgJYgRTtC4IQBfXhALwb8vRTSaFSgHHbPCYQmggJEGcQVhBFEDRBMIEAoNs8VXAREQKegvBYqNpZXrxnremYNB2jzp7RO0AvBes3R7tAHGsa19ICo7rjAoLwR2T0K0HY59/Hr7lWwniw4JmPySCaCo4yMz3D0hUyucu64wJfCfLAgg8QABpYz4aAz4SA9AD0AM+BAuIwgTeHIcD/8vT4QW8kW4FSnjImxwXy9CdujjtdgQCgbVptbUADf8jPhYDKAM+EQM4B+gKAac9AAlxuAW6ok1vPgZ1Yz4aAz4SA9AD0AM+B4vQAyQH7AI6UIxB5EGgQV1FjBlUTgQCg2zwIVVHiEGhVFREVBJZUdlRUdlRUdt4QjxB+EG0QXBBLEDoQKQEREAEREds8bJnIVYCCECw5Sn5QCssfyFWACts8yQHMyRB5EGgQVxBGEDVEMPhCAX9t2zwbExQVArb4KFNU2zyCCvrwgHCCCJiWgIsIJxA1EEcDSIhtWchVYNs8yQFtUEJtUEJ/yM+FgMoAz4RAzgH6AoBpz0ACXG4BbqiTW8+BnVjPhoDPhID0APQAz4Hi9ADJAfsAHxIAbIIQD4p+pVAIyx8Wyz9QBPoCWM8WASBulTBwAcsBks8W4iFus5V/AcoAzJRwMsoA4gH6AgHPFgCAUInLH1AGzxZQBM8WWPoCyx/KAAEgbpUwcAHLAZLPFuIhbrOVfwHKAMyUcDLKAOLIWCBulTBwAcsBks8W4skBzACWbW0ibrOUW28iAZEy4hAkcAMEgEJQIxA2VSISyM+FgMoAz4RAzgH6AoBpz0ACXG4BbqiTW8+BnVjPhoDPhID0APQAz4Hi9ADJAfsAAJjIfwHKAFWAUInLH1AGzxZQBM8WWCBulTBwAcsBks8W4gH6AssfygDIWCBulTBwAcsBks8W4iJus5Z/AcoAEsyVMnBYygDiyQHMye1UAgEgGBkCEb/UBtnm2eNkjBwdAhG7RR2zzbPGyRgcGgIRuvuts82zxsmYHBsALlMzggFfkL6VMIIBX5DeUlCoggGGoKkEABJUeHZUd2VUd2sBwO1E0NIAAY5L0x/6QPpAINcLAcMAk/pAAZRy1yFt4gH6ANMf0gDUAdAg1wsBwwCT+kABlHLXIW3iAdIAAZLUMJIwbeIQKRAoECcQJhAlECQQI2wZ4Ns8B9FVBXBtBQRBMx4BDPgoUyHbPB8AboEBAdcA+kD6QNQB0IEBAdcAgQEB1wAg1wsBwwCT+kABlHLXIW3iAdIAAZLUMJIwbeIQRxBGEEUAiHBUEyPIVTBQNIEBAc8AAc8WAc8WzMlwWSD5ACL5AFrXZQHXZYICATTIyxfLD8sPy//L/3H5BADIdAHLAhLKB8v/ydAA');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initEscrow_init_args({ $$type: 'Escrow_init_args', id, sellerAddress, guarantorAddress, dealAmount, guarantorRoyaltyPercent, assetAddress, jettonWalletCode })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
const Escrow_errors = {
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
    5357: { message: `low msg value` },
    14215: { message: `not funded` },
    15301: { message: `wrong fund amount` },
    21150: { message: `not guarantor` },
    33704: { message: `already funded` },
    37726: { message: `notification not from escrow jetton wallet` },
    48761: { message: `empty jetton wallet code` },
    52368: { message: `wrong asset type` },
    63374: { message: `only seller can change wallet code` },
};
const Escrow_types = [
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
    { "name": "JettonData", "header": null, "fields": [{ "name": "totalSupply", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "mintable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "owner", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "content", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "jettonWalletCode", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "JettonWalletData", "header": null, "fields": [{ "name": "balance", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "owner", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "master", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "MaybeAddress", "header": null, "fields": [{ "name": "address", "type": { "kind": "simple", "type": "address", "optional": true } }] },
    { "name": "JettonUpdateContent", "header": 4, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "content", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "JettonTransfer", "header": 260734629, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "destination", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "responseDestination", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "customPayload", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "forwardTonAmount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "forwardPayload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "JettonTransferInternal", "header": 395134233, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "responseDestination", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "forwardTonAmount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "forwardPayload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "JettonNotification", "header": 1935855772, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "forwardPayload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "JettonBurn", "header": 1499400124, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "responseDestination", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "customPayload", "type": { "kind": "simple", "type": "cell", "optional": true } }] },
    { "name": "JettonBurnNotification", "header": 2078119902, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "responseDestination", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "JettonExcesses", "header": 3576854235, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "ProvideWalletAddress", "header": 745978227, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "ownerAddress", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "includeAddress", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "TakeWalletAddress", "header": 3513996288, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "walletAddress", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "ownerAddress", "type": { "kind": "simple", "type": "cell", "optional": true } }] },
    { "name": "Mint", "header": 21, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "receiver", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "tonAmount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "mintMessage", "type": { "kind": "simple", "type": "JettonTransferInternal", "optional": false } }] },
    { "name": "ChangeOwner", "header": 3, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "newOwner", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "UpdateJettonWalletCode", "header": 492442125, "fields": [{ "name": "newJettonWalletCode", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "TakeEscrowData", "header": 741952126, "fields": [{ "name": "escrowData", "type": { "kind": "simple", "type": "EscrowData", "optional": false } }] },
    { "name": "EscrowData", "header": null, "fields": [{ "name": "id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 32 } }, { "name": "sellerAddress", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "guarantorAddress", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "dealAmount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "guarantorRoyaltyPercent", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 32 } }, { "name": "isFunded", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "assetAddress", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "jettonWalletCode", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "buyerAddress", "type": { "kind": "simple", "type": "address", "optional": true } }] },
    { "name": "Escrow$Data", "header": null, "fields": [{ "name": "id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 32 } }, { "name": "sellerAddress", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "guarantorAddress", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "buyerAddress", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "dealAmount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "guarantorRoyaltyPercent", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 32 } }, { "name": "isFunded", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "assetAddress", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "jettonWalletCode", "type": { "kind": "simple", "type": "cell", "optional": true } }] },
];
const Escrow_getters = [
    { "name": "calculateRoyaltyAmount", "methodId": 78929, "arguments": [], "returnType": { "kind": "simple", "type": "int", "optional": false, "format": 257 } },
    { "name": "walletAddress", "methodId": 129664, "arguments": [], "returnType": { "kind": "simple", "type": "address", "optional": false } },
    { "name": "escrowInfo", "methodId": 94138, "arguments": [], "returnType": { "kind": "simple", "type": "EscrowData", "optional": false } },
];
exports.Escrow_getterMapping = {
    'calculateRoyaltyAmount': 'getCalculateRoyaltyAmount',
    'walletAddress': 'getWalletAddress',
    'escrowInfo': 'getEscrowInfo',
};
const Escrow_receivers = [
    { "receiver": "internal", "message": { "kind": "text", "text": "funding" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "UpdateJettonWalletCode" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "JettonNotification" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "approve" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "cancel" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "provideEscrowData" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Deploy" } },
];
class Escrow {
    static async init(id, sellerAddress, guarantorAddress, dealAmount, guarantorRoyaltyPercent, assetAddress, jettonWalletCode) {
        return await Escrow_init(id, sellerAddress, guarantorAddress, dealAmount, guarantorRoyaltyPercent, assetAddress, jettonWalletCode);
    }
    static async fromInit(id, sellerAddress, guarantorAddress, dealAmount, guarantorRoyaltyPercent, assetAddress, jettonWalletCode) {
        const __gen_init = await Escrow_init(id, sellerAddress, guarantorAddress, dealAmount, guarantorRoyaltyPercent, assetAddress, jettonWalletCode);
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new Escrow(address, __gen_init);
    }
    static fromAddress(address) {
        return new Escrow(address);
    }
    address;
    init;
    abi = {
        types: Escrow_types,
        getters: Escrow_getters,
        receivers: Escrow_receivers,
        errors: Escrow_errors,
    };
    constructor(address, init) {
        this.address = address;
        this.init = init;
    }
    async send(provider, via, args, message) {
        let body = null;
        if (message === "funding") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'UpdateJettonWalletCode') {
            body = (0, core_1.beginCell)().store(storeUpdateJettonWalletCode(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'JettonNotification') {
            body = (0, core_1.beginCell)().store(storeJettonNotification(message)).endCell();
        }
        if (message === "approve") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "cancel") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "provideEscrowData") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'Deploy') {
            body = (0, core_1.beginCell)().store(storeDeploy(message)).endCell();
        }
        if (body === null) {
            throw new Error('Invalid message type');
        }
        await provider.internal(via, { ...args, body: body });
    }
    async getCalculateRoyaltyAmount(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(78929, builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    async getWalletAddress(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(129664, builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    async getEscrowInfo(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get(94138, builder.build())).stack;
        const result = loadGetterTupleEscrowData(source);
        return result;
    }
}
exports.Escrow = Escrow;
