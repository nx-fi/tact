import {
    Cell,
    Slice,
    Address,
    Builder,
    beginCell,
    ComputeError,
    TupleItem,
    TupleReader,
    Dictionary,
    contractAddress,
    ContractProvider,
    Sender,
    Contract,
    ContractABI,
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue,
} from "@ton/core";

export type DataSize = {
    $$type: "DataSize";
    cells: bigint;
    bits: bigint;
    refs: bigint;
};

export function storeDataSize(src: DataSize) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}

export function loadDataSize(slice: Slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return {
        $$type: "DataSize" as const,
        cells: _cells,
        bits: _bits,
        refs: _refs,
    };
}

function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return {
        $$type: "DataSize" as const,
        cells: _cells,
        bits: _bits,
        refs: _refs,
    };
}

function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return {
        $$type: "DataSize" as const,
        cells: _cells,
        bits: _bits,
        refs: _refs,
    };
}

function storeTupleDataSize(source: DataSize) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}

function dictValueParserDataSize(): DictionaryValue<DataSize> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        },
    };
}

export type StateInit = {
    $$type: "StateInit";
    code: Cell;
    data: Cell;
};

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: "StateInit" as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: "StateInit" as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: "StateInit" as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    const builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        },
    };
}

export type Context = {
    $$type: "Context";
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
};

export function storeContext(src: Context) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return {
        $$type: "Context" as const,
        bounceable: _bounceable,
        sender: _sender,
        value: _value,
        raw: _raw,
    };
}

function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return {
        $$type: "Context" as const,
        bounceable: _bounceable,
        sender: _sender,
        value: _value,
        raw: _raw,
    };
}

function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return {
        $$type: "Context" as const,
        bounceable: _bounceable,
        sender: _sender,
        value: _value,
        raw: _raw,
    };
}

function storeTupleContext(source: Context) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        },
    };
}

export type SendParameters = {
    $$type: "SendParameters";
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
};

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) {
            b_0.storeBit(true).storeRef(src.body);
        } else {
            b_0.storeBit(false);
        }
        if (src.code !== null && src.code !== undefined) {
            b_0.storeBit(true).storeRef(src.code);
        } else {
            b_0.storeBit(false);
        }
        if (src.data !== null && src.data !== undefined) {
            b_0.storeBit(true).storeRef(src.data);
        } else {
            b_0.storeBit(false);
        }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadSendParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return {
        $$type: "SendParameters" as const,
        mode: _mode,
        body: _body,
        code: _code,
        data: _data,
        value: _value,
        to: _to,
        bounce: _bounce,
    };
}

function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return {
        $$type: "SendParameters" as const,
        mode: _mode,
        body: _body,
        code: _code,
        data: _data,
        value: _value,
        to: _to,
        bounce: _bounce,
    };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return {
        $$type: "SendParameters" as const,
        mode: _mode,
        body: _body,
        code: _code,
        data: _data,
        value: _value,
        to: _to,
        bounce: _bounce,
    };
}

function storeTupleSendParameters(source: SendParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeSendParameters(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        },
    };
}

export type DeployParameters = {
    $$type: "DeployParameters";
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
};

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) {
            b_0.storeBit(true).storeRef(src.body);
        } else {
            b_0.storeBit(false);
        }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}

export function loadDeployParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return {
        $$type: "DeployParameters" as const,
        mode: _mode,
        body: _body,
        value: _value,
        bounce: _bounce,
        init: _init,
    };
}

function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return {
        $$type: "DeployParameters" as const,
        mode: _mode,
        body: _body,
        value: _value,
        bounce: _bounce,
        init: _init,
    };
}

function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return {
        $$type: "DeployParameters" as const,
        mode: _mode,
        body: _body,
        value: _value,
        bounce: _bounce,
        init: _init,
    };
}

function storeTupleDeployParameters(source: DeployParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}

function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeDeployParameters(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        },
    };
}

export type StdAddress = {
    $$type: "StdAddress";
    workchain: bigint;
    address: bigint;
};

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return {
        $$type: "StdAddress" as const,
        workchain: _workchain,
        address: _address,
    };
}

function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return {
        $$type: "StdAddress" as const,
        workchain: _workchain,
        address: _address,
    };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return {
        $$type: "StdAddress" as const,
        workchain: _workchain,
        address: _address,
    };
}

function storeTupleStdAddress(source: StdAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        },
    };
}

export type VarAddress = {
    $$type: "VarAddress";
    workchain: bigint;
    address: Slice;
};

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return {
        $$type: "VarAddress" as const,
        workchain: _workchain,
        address: _address,
    };
}

function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return {
        $$type: "VarAddress" as const,
        workchain: _workchain,
        address: _address,
    };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return {
        $$type: "VarAddress" as const,
        workchain: _workchain,
        address: _address,
    };
}

function storeTupleVarAddress(source: VarAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        },
    };
}

export type Transfer = {
    $$type: "Transfer";
    seqno: bigint;
    mode: bigint;
    to: Address;
    amount: bigint;
    body: Cell | null;
};

export function storeTransfer(src: Transfer) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.seqno, 32);
        b_0.storeUint(src.mode, 8);
        b_0.storeAddress(src.to);
        b_0.storeCoins(src.amount);
        if (src.body !== null && src.body !== undefined) {
            b_0.storeBit(true).storeRef(src.body);
        } else {
            b_0.storeBit(false);
        }
    };
}

export function loadTransfer(slice: Slice) {
    const sc_0 = slice;
    const _seqno = sc_0.loadUintBig(32);
    const _mode = sc_0.loadUintBig(8);
    const _to = sc_0.loadAddress();
    const _amount = sc_0.loadCoins();
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    return {
        $$type: "Transfer" as const,
        seqno: _seqno,
        mode: _mode,
        to: _to,
        amount: _amount,
        body: _body,
    };
}

function loadTupleTransfer(source: TupleReader) {
    const _seqno = source.readBigNumber();
    const _mode = source.readBigNumber();
    const _to = source.readAddress();
    const _amount = source.readBigNumber();
    const _body = source.readCellOpt();
    return {
        $$type: "Transfer" as const,
        seqno: _seqno,
        mode: _mode,
        to: _to,
        amount: _amount,
        body: _body,
    };
}

function loadGetterTupleTransfer(source: TupleReader) {
    const _seqno = source.readBigNumber();
    const _mode = source.readBigNumber();
    const _to = source.readAddress();
    const _amount = source.readBigNumber();
    const _body = source.readCellOpt();
    return {
        $$type: "Transfer" as const,
        seqno: _seqno,
        mode: _mode,
        to: _to,
        amount: _amount,
        body: _body,
    };
}

function storeTupleTransfer(source: Transfer) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    builder.writeNumber(source.mode);
    builder.writeAddress(source.to);
    builder.writeNumber(source.amount);
    builder.writeCell(source.body);
    return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTransfer(src.loadRef().beginParse());
        },
    };
}

export type TransferMessage = {
    $$type: "TransferMessage";
    signature: Slice;
    transfer: Transfer;
};

export function storeTransferMessage(src: TransferMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(123, 32);
        b_0.storeRef(src.signature.asCell());
        b_0.store(storeTransfer(src.transfer));
    };
}

export function loadTransferMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 123) {
        throw Error("Invalid prefix");
    }
    const _signature = sc_0.loadRef().asSlice();
    const _transfer = loadTransfer(sc_0);
    return {
        $$type: "TransferMessage" as const,
        signature: _signature,
        transfer: _transfer,
    };
}

function loadTupleTransferMessage(source: TupleReader) {
    const _signature = source.readCell().asSlice();
    const _transfer = loadTupleTransfer(source);
    return {
        $$type: "TransferMessage" as const,
        signature: _signature,
        transfer: _transfer,
    };
}

function loadGetterTupleTransferMessage(source: TupleReader) {
    const _signature = source.readCell().asSlice();
    const _transfer = loadGetterTupleTransfer(source);
    return {
        $$type: "TransferMessage" as const,
        signature: _signature,
        transfer: _transfer,
    };
}

function storeTupleTransferMessage(source: TransferMessage) {
    const builder = new TupleBuilder();
    builder.writeSlice(source.signature.asCell());
    builder.writeTuple(storeTupleTransfer(source.transfer));
    return builder.build();
}

function dictValueParserTransferMessage(): DictionaryValue<TransferMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeTransferMessage(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadTransferMessage(src.loadRef().beginParse());
        },
    };
}

export type Wallet$Data = {
    $$type: "Wallet$Data";
    seqno: bigint;
    key: bigint;
    walletId: bigint;
};

export function storeWallet$Data(src: Wallet$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.seqno, 32);
        b_0.storeUint(src.key, 256);
        b_0.storeUint(src.walletId, 64);
    };
}

export function loadWallet$Data(slice: Slice) {
    const sc_0 = slice;
    const _seqno = sc_0.loadUintBig(32);
    const _key = sc_0.loadUintBig(256);
    const _walletId = sc_0.loadUintBig(64);
    return {
        $$type: "Wallet$Data" as const,
        seqno: _seqno,
        key: _key,
        walletId: _walletId,
    };
}

function loadTupleWallet$Data(source: TupleReader) {
    const _seqno = source.readBigNumber();
    const _key = source.readBigNumber();
    const _walletId = source.readBigNumber();
    return {
        $$type: "Wallet$Data" as const,
        seqno: _seqno,
        key: _key,
        walletId: _walletId,
    };
}

function loadGetterTupleWallet$Data(source: TupleReader) {
    const _seqno = source.readBigNumber();
    const _key = source.readBigNumber();
    const _walletId = source.readBigNumber();
    return {
        $$type: "Wallet$Data" as const,
        seqno: _seqno,
        key: _key,
        walletId: _walletId,
    };
}

function storeTupleWallet$Data(source: Wallet$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    builder.writeNumber(source.key);
    builder.writeNumber(source.walletId);
    return builder.build();
}

function dictValueParserWallet$Data(): DictionaryValue<Wallet$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(
                beginCell().store(storeWallet$Data(src)).endCell(),
            );
        },
        parse: (src) => {
            return loadWallet$Data(src.loadRef().beginParse());
        },
    };
}

type Wallet_init_args = {
    $$type: "Wallet_init_args";
    key: bigint;
    walletId: bigint;
};

function initWallet_init_args(src: Wallet_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.key, 257);
        b_0.storeInt(src.walletId, 257);
    };
}

async function Wallet_init(key: bigint, walletId: bigint) {
    const __code = Cell.fromBase64(
        "te6ccgECEwEAArAAART/APSkE/S88sgLAQIBYgIDBObQ7aLt+wHQctch0gDSAPpAIRA0UGZvBPhhAvhi2zwEjhQyAsh/AcoAVSBQI8sfy//LP8ntVOBwI9dJIMIfjosxI9cLHyDAe+MCAd4hwAABwSGwjhYwMqQCyH8BygBVIFAjyx/L/8s/ye1U4MAAkTLjDaQCEQQFBgIBIAsMA/5bAoAg1yHUAdAB0x/TB/pA+gDSAAGR1JJtAeJVQBBWNlRzIVM4yFVAUEXLHxLLBwHPFgH6AiFus5V/AcoAzJRwMsoA4sn5AIIAvRFRafkQFfL0gUT2UTa6E/L0BKRBRANabW1af8jPhYDKAM+EQM4B+gKAac9AAlxuAW6oioriBwgJAf4i+QEzIoLwhdKIOEwAQ0WLAoA8siBZ9ogDxVPDZWNENGRo2slh8ka6jhYyAsh/AcoAVSBQI8sfy//LP8ntVNsx4CKC8A4jVyYQi1cA0Dad1xZ/av+4BqfgQFk3XdDg+ySXHnKyuo4XMqQCyH8BygBVIFAjyx/L/8s/ye1U2zHgCgAkyH8BygBVIFAjyx/L/8s/ye1UAAZbz4EAGljPhoDPhID0APQAz4EANvQAyQH7AALIfwHKAFUgUCPLH8v/yz/J7VTbMQD0IoLwdEPESJgvW47fKy0DSzFvltxqfCq3lZikM0jBUtTK3Sa6jhcypALIfwHKAFUgUCPLH8v/yz/J7VTbMeACgvCcoPGFUXTjLo/TeN9WpuT2xA5N/LYJDkmBL3seJiFL+bqOFQLIfwHKAFUgUCPLH8v/yz/J7VTbMeACAWoNDgIRvgJW2ebZ42GMERICEbMl9s82zxsMYBEPAhGwfjbPNs8bDGAREAACIgACIQBE7UTQ0gABmtMf0//TP1UgbBPggQEB1wCBAQHXAFkC0QFwWQACIA==",
    );
    const builder = beginCell();
    builder.storeUint(0, 1);
    initWallet_init_args({ $$type: "Wallet_init_args", key, walletId })(
        builder,
    );
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Wallet_errors: { [key: number]: { message: string } } = {
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
    39: {
        message: `Outbound message does not fit into a cell after rewriting`,
    },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: {
        message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree`,
    },
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
    17654: { message: `Invalid seqno` },
    48401: { message: `Invalid signature` },
};

const Wallet_types: ABIType[] = [
    {
        name: "DataSize",
        header: null,
        fields: [
            {
                name: "cells",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "bits",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "refs",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
        ],
    },
    {
        name: "StateInit",
        header: null,
        fields: [
            {
                name: "code",
                type: { kind: "simple", type: "cell", optional: false },
            },
            {
                name: "data",
                type: { kind: "simple", type: "cell", optional: false },
            },
        ],
    },
    {
        name: "Context",
        header: null,
        fields: [
            {
                name: "bounceable",
                type: { kind: "simple", type: "bool", optional: false },
            },
            {
                name: "sender",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "value",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "raw",
                type: { kind: "simple", type: "slice", optional: false },
            },
        ],
    },
    {
        name: "SendParameters",
        header: null,
        fields: [
            {
                name: "mode",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "body",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "code",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "data",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "value",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "to",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "bounce",
                type: { kind: "simple", type: "bool", optional: false },
            },
        ],
    },
    {
        name: "DeployParameters",
        header: null,
        fields: [
            {
                name: "mode",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "body",
                type: { kind: "simple", type: "cell", optional: true },
            },
            {
                name: "value",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 257,
                },
            },
            {
                name: "bounce",
                type: { kind: "simple", type: "bool", optional: false },
            },
            {
                name: "init",
                type: { kind: "simple", type: "StateInit", optional: false },
            },
        ],
    },
    {
        name: "StdAddress",
        header: null,
        fields: [
            {
                name: "workchain",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 8,
                },
            },
            {
                name: "address",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 256,
                },
            },
        ],
    },
    {
        name: "VarAddress",
        header: null,
        fields: [
            {
                name: "workchain",
                type: {
                    kind: "simple",
                    type: "int",
                    optional: false,
                    format: 32,
                },
            },
            {
                name: "address",
                type: { kind: "simple", type: "slice", optional: false },
            },
        ],
    },
    {
        name: "Transfer",
        header: null,
        fields: [
            {
                name: "seqno",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 32,
                },
            },
            {
                name: "mode",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 8,
                },
            },
            {
                name: "to",
                type: { kind: "simple", type: "address", optional: false },
            },
            {
                name: "amount",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: "coins",
                },
            },
            {
                name: "body",
                type: { kind: "simple", type: "cell", optional: true },
            },
        ],
    },
    {
        name: "TransferMessage",
        header: 123,
        fields: [
            {
                name: "signature",
                type: { kind: "simple", type: "slice", optional: false },
            },
            {
                name: "transfer",
                type: { kind: "simple", type: "Transfer", optional: false },
            },
        ],
    },
    {
        name: "Wallet$Data",
        header: null,
        fields: [
            {
                name: "seqno",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 32,
                },
            },
            {
                name: "key",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 256,
                },
            },
            {
                name: "walletId",
                type: {
                    kind: "simple",
                    type: "uint",
                    optional: false,
                    format: 64,
                },
            },
        ],
    },
];

const Wallet_getters: ABIGetter[] = [
    {
        name: "publicKey",
        methodId: 86520,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "walletId",
        methodId: 114762,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
    {
        name: "seqno",
        methodId: 85143,
        arguments: [],
        returnType: {
            kind: "simple",
            type: "int",
            optional: false,
            format: 257,
        },
    },
];

export const Wallet_getterMapping: { [key: string]: string } = {
    publicKey: "getPublicKey",
    walletId: "getWalletId",
    seqno: "getSeqno",
};

const Wallet_receivers: ABIReceiver[] = [
    { receiver: "internal", message: { kind: "text", text: "Deploy" } },
    {
        receiver: "internal",
        message: { kind: "typed", type: "TransferMessage" },
    },
    { receiver: "internal", message: { kind: "any" } },
    { receiver: "internal", message: { kind: "empty" } },
    { receiver: "internal", message: { kind: "text", text: "notify" } },
    { receiver: "internal", message: { kind: "text", text: "你好ж" } },
    { receiver: "internal", message: { kind: "text", text: "duplicate" } },
];

export class Wallet implements Contract {
    static async init(key: bigint, walletId: bigint) {
        return await Wallet_init(key, walletId);
    }

    static async fromInit(key: bigint, walletId: bigint) {
        const __gen_init = await Wallet_init(key, walletId);
        const address = contractAddress(0, __gen_init);
        return new Wallet(address, __gen_init);
    }

    static fromAddress(address: Address) {
        return new Wallet(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell; data: Cell };
    readonly abi: ContractABI = {
        types: Wallet_types,
        getters: Wallet_getters,
        receivers: Wallet_receivers,
        errors: Wallet_errors,
    };

    private constructor(address: Address, init?: { code: Cell; data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(
        provider: ContractProvider,
        via: Sender,
        args: { value: bigint; bounce?: boolean | null | undefined },
        message:
            | "Deploy"
            | TransferMessage
            | Slice
            | null
            | "notify"
            | "你好ж"
            | "duplicate",
    ) {
        let body: Cell | null = null;
        if (message === "Deploy") {
            body = beginCell()
                .storeUint(0, 32)
                .storeStringTail(message)
                .endCell();
        }
        if (
            message &&
            typeof message === "object" &&
            !(message instanceof Slice) &&
            message.$$type === "TransferMessage"
        ) {
            body = beginCell().store(storeTransferMessage(message)).endCell();
        }
        if (
            message &&
            typeof message === "object" &&
            message instanceof Slice
        ) {
            body = message.asCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (message === "notify") {
            body = beginCell()
                .storeUint(0, 32)
                .storeStringTail(message)
                .endCell();
        }
        if (message === "你好ж") {
            body = beginCell()
                .storeUint(0, 32)
                .storeStringTail(message)
                .endCell();
        }
        if (message === "duplicate") {
            body = beginCell()
                .storeUint(0, 32)
                .storeStringTail(message)
                .endCell();
        }
        if (body === null) {
            throw new Error("Invalid message type");
        }

        await provider.internal(via, { ...args, body: body });
    }

    async getPublicKey(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(86520 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getWalletId(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(114762 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }

    async getSeqno(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get(85143 as any, builder.build()))
            .stack;
        const result = source.readBigNumber();
        return result;
    }
}
