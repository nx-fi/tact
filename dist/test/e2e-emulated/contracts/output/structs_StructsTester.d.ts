import { Cell, Slice, Address, Builder, Dictionary, ContractProvider, Sender, Contract, ContractABI } from '@ton/core';
export type DataSize = {
    $$type: 'DataSize';
    cells: bigint;
    bits: bigint;
    refs: bigint;
};
export declare function storeDataSize(src: DataSize): (builder: Builder) => void;
export declare function loadDataSize(slice: Slice): {
    $$type: "DataSize";
    cells: bigint;
    bits: bigint;
    refs: bigint;
};
export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
};
export declare function storeStateInit(src: StateInit): (builder: Builder) => void;
export declare function loadStateInit(slice: Slice): {
    $$type: "StateInit";
    code: Cell;
    data: Cell;
};
export type Context = {
    $$type: 'Context';
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
};
export declare function storeContext(src: Context): (builder: Builder) => void;
export declare function loadContext(slice: Slice): {
    $$type: "Context";
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
};
export type SendParameters = {
    $$type: 'SendParameters';
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
};
export declare function storeSendParameters(src: SendParameters): (builder: Builder) => void;
export declare function loadSendParameters(slice: Slice): {
    $$type: "SendParameters";
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
};
export type DeployParameters = {
    $$type: 'DeployParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
};
export declare function storeDeployParameters(src: DeployParameters): (builder: Builder) => void;
export declare function loadDeployParameters(slice: Slice): {
    $$type: "DeployParameters";
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: {
        $$type: "StateInit";
        code: Cell;
        data: Cell;
    };
};
export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
};
export declare function storeStdAddress(src: StdAddress): (builder: Builder) => void;
export declare function loadStdAddress(slice: Slice): {
    $$type: "StdAddress";
    workchain: bigint;
    address: bigint;
};
export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
};
export declare function storeVarAddress(src: VarAddress): (builder: Builder) => void;
export declare function loadVarAddress(slice: Slice): {
    $$type: "VarAddress";
    workchain: bigint;
    address: Slice;
};
export type S = {
    $$type: 'S';
    a: boolean;
    b: bigint;
};
export declare function storeS(src: S): (builder: Builder) => void;
export declare function loadS(slice: Slice): {
    $$type: "S";
    a: boolean;
    b: bigint;
};
export type T = {
    $$type: 'T';
    a: bigint;
    s: S;
};
export declare function storeT(src: T): (builder: Builder) => void;
export declare function loadT(slice: Slice): {
    $$type: "T";
    a: bigint;
    s: {
        $$type: "S";
        a: boolean;
        b: bigint;
    };
};
export type MyStruct1 = {
    $$type: 'MyStruct1';
    a: bigint;
    b: bigint;
    c: bigint | null;
};
export declare function storeMyStruct1(src: MyStruct1): (builder: Builder) => void;
export declare function loadMyStruct1(slice: Slice): {
    $$type: "MyStruct1";
    a: bigint;
    b: bigint;
    c: bigint | null;
};
export type MyStruct2 = {
    $$type: 'MyStruct2';
    m: Dictionary<bigint, bigint>;
    s: MyStruct1 | null;
};
export declare function storeMyStruct2(src: MyStruct2): (builder: Builder) => void;
export declare function loadMyStruct2(slice: Slice): {
    $$type: "MyStruct2";
    m: Dictionary<bigint, bigint>;
    s: {
        $$type: "MyStruct1";
        a: bigint;
        b: bigint;
        c: bigint | null;
    } | null;
};
export type MyStruct3 = {
    $$type: 'MyStruct3';
    s: string;
};
export declare function storeMyStruct3(src: MyStruct3): (builder: Builder) => void;
export declare function loadMyStruct3(slice: Slice): {
    $$type: "MyStruct3";
    s: string;
};
export type MyMessage1 = {
    $$type: 'MyMessage1';
    a: bigint;
    s: MyStruct2;
};
export declare function storeMyMessage1(src: MyMessage1): (builder: Builder) => void;
export declare function loadMyMessage1(slice: Slice): {
    $$type: "MyMessage1";
    a: bigint;
    s: {
        $$type: "MyStruct2";
        m: Dictionary<bigint, bigint>;
        s: {
            $$type: "MyStruct1";
            a: bigint;
            b: bigint;
            c: bigint | null;
        } | null;
    };
};
export type Coin = {
    $$type: 'Coin';
    first: bigint;
    second: bigint;
};
export declare function storeCoin(src: Coin): (builder: Builder) => void;
export declare function loadCoin(slice: Slice): {
    $$type: "Coin";
    first: bigint;
    second: bigint;
};
export type VarIntegers = {
    $$type: 'VarIntegers';
    a: bigint;
    b: bigint;
    c: bigint;
    d: bigint;
};
export declare function storeVarIntegers(src: VarIntegers): (builder: Builder) => void;
export declare function loadVarIntegers(slice: Slice): {
    $$type: "VarIntegers";
    a: bigint;
    b: bigint;
    c: bigint;
    d: bigint;
};
export type IntFields = {
    $$type: 'IntFields';
    i1: bigint;
    i2: bigint;
    i3: bigint;
    i255: bigint;
    i256: bigint;
    i257: bigint;
};
export declare function storeIntFields(src: IntFields): (builder: Builder) => void;
export declare function loadIntFields(slice: Slice): {
    $$type: "IntFields";
    i1: bigint;
    i2: bigint;
    i3: bigint;
    i255: bigint;
    i256: bigint;
    i257: bigint;
};
export type UintFields = {
    $$type: 'UintFields';
    u1: bigint;
    u2: bigint;
    u3: bigint;
    u254: bigint;
    u255: bigint;
    u256: bigint;
};
export declare function storeUintFields(src: UintFields): (builder: Builder) => void;
export declare function loadUintFields(slice: Slice): {
    $$type: "UintFields";
    u1: bigint;
    u2: bigint;
    u3: bigint;
    u254: bigint;
    u255: bigint;
    u256: bigint;
};
export type LongStruct15 = {
    $$type: 'LongStruct15';
    x1: bigint;
    x2: bigint;
    x3: bigint;
    x4: bigint;
    x5: bigint;
    x6: bigint;
    x7: bigint;
    x8: bigint;
    x9: bigint;
    x10: bigint;
    x11: bigint;
    x12: bigint;
    x13: bigint;
    x14: bigint;
    x15: bigint;
};
export declare function storeLongStruct15(src: LongStruct15): (builder: Builder) => void;
export declare function loadLongStruct15(slice: Slice): {
    $$type: "LongStruct15";
    x1: bigint;
    x2: bigint;
    x3: bigint;
    x4: bigint;
    x5: bigint;
    x6: bigint;
    x7: bigint;
    x8: bigint;
    x9: bigint;
    x10: bigint;
    x11: bigint;
    x12: bigint;
    x13: bigint;
    x14: bigint;
    x15: bigint;
};
export type LongStruct16 = {
    $$type: 'LongStruct16';
    x1: bigint;
    x2: bigint;
    x3: bigint;
    x4: bigint;
    x5: bigint;
    x6: bigint;
    x7: bigint;
    x8: bigint;
    x9: bigint;
    x10: bigint;
    x11: bigint;
    x12: bigint;
    x13: bigint;
    x14: bigint;
    x15: bigint;
    x16: bigint;
};
export declare function storeLongStruct16(src: LongStruct16): (builder: Builder) => void;
export declare function loadLongStruct16(slice: Slice): {
    $$type: "LongStruct16";
    x1: bigint;
    x2: bigint;
    x3: bigint;
    x4: bigint;
    x5: bigint;
    x6: bigint;
    x7: bigint;
    x8: bigint;
    x9: bigint;
    x10: bigint;
    x11: bigint;
    x12: bigint;
    x13: bigint;
    x14: bigint;
    x15: bigint;
    x16: bigint;
};
export type LongStruct32 = {
    $$type: 'LongStruct32';
    x1: bigint;
    x2: bigint;
    x3: bigint;
    x4: bigint;
    x5: bigint;
    x6: bigint;
    x7: bigint;
    x8: bigint;
    x9: bigint;
    x10: bigint;
    x11: bigint;
    x12: bigint;
    x13: bigint;
    x14: bigint;
    x15: bigint;
    x16: bigint;
    x17: bigint;
    x18: bigint;
    x19: bigint;
    x20: bigint;
    x21: bigint;
    x22: bigint;
    x23: bigint;
    x24: bigint;
    x25: bigint;
    x26: bigint;
    x27: bigint;
    x28: bigint;
    x29: bigint;
    x30: bigint;
    x31: bigint;
    x32: bigint;
};
export declare function storeLongStruct32(src: LongStruct32): (builder: Builder) => void;
export declare function loadLongStruct32(slice: Slice): {
    $$type: "LongStruct32";
    x1: bigint;
    x2: bigint;
    x3: bigint;
    x4: bigint;
    x5: bigint;
    x6: bigint;
    x7: bigint;
    x8: bigint;
    x9: bigint;
    x10: bigint;
    x11: bigint;
    x12: bigint;
    x13: bigint;
    x14: bigint;
    x15: bigint;
    x16: bigint;
    x17: bigint;
    x18: bigint;
    x19: bigint;
    x20: bigint;
    x21: bigint;
    x22: bigint;
    x23: bigint;
    x24: bigint;
    x25: bigint;
    x26: bigint;
    x27: bigint;
    x28: bigint;
    x29: bigint;
    x30: bigint;
    x31: bigint;
    x32: bigint;
};
export type LongNestedStruct = {
    $$type: 'LongNestedStruct';
    x1: bigint;
    x2: bigint;
    x3: bigint;
    x4: bigint;
    x5: bigint;
    x6: bigint;
    x7: bigint;
    x8: bigint;
    x9: bigint;
    x10: bigint;
    x11: bigint;
    x12: bigint;
    x13: bigint;
    x14: bigint;
    x15: bigint;
    x16: bigint;
    x17: bigint;
    x18: bigint;
    x19: bigint;
    x20: bigint;
    s1: LongStruct15;
    s2: LongStruct16;
    s3: LongStruct32;
};
export declare function storeLongNestedStruct(src: LongNestedStruct): (builder: Builder) => void;
export declare function loadLongNestedStruct(slice: Slice): {
    $$type: "LongNestedStruct";
    x1: bigint;
    x2: bigint;
    x3: bigint;
    x4: bigint;
    x5: bigint;
    x6: bigint;
    x7: bigint;
    x8: bigint;
    x9: bigint;
    x10: bigint;
    x11: bigint;
    x12: bigint;
    x13: bigint;
    x14: bigint;
    x15: bigint;
    x16: bigint;
    x17: bigint;
    x18: bigint;
    x19: bigint;
    x20: bigint;
    s1: {
        $$type: "LongStruct15";
        x1: bigint;
        x2: bigint;
        x3: bigint;
        x4: bigint;
        x5: bigint;
        x6: bigint;
        x7: bigint;
        x8: bigint;
        x9: bigint;
        x10: bigint;
        x11: bigint;
        x12: bigint;
        x13: bigint;
        x14: bigint;
        x15: bigint;
    };
    s2: {
        $$type: "LongStruct16";
        x1: bigint;
        x2: bigint;
        x3: bigint;
        x4: bigint;
        x5: bigint;
        x6: bigint;
        x7: bigint;
        x8: bigint;
        x9: bigint;
        x10: bigint;
        x11: bigint;
        x12: bigint;
        x13: bigint;
        x14: bigint;
        x15: bigint;
        x16: bigint;
    };
    s3: {
        $$type: "LongStruct32";
        x1: bigint;
        x2: bigint;
        x3: bigint;
        x4: bigint;
        x5: bigint;
        x6: bigint;
        x7: bigint;
        x8: bigint;
        x9: bigint;
        x10: bigint;
        x11: bigint;
        x12: bigint;
        x13: bigint;
        x14: bigint;
        x15: bigint;
        x16: bigint;
        x17: bigint;
        x18: bigint;
        x19: bigint;
        x20: bigint;
        x21: bigint;
        x22: bigint;
        x23: bigint;
        x24: bigint;
        x25: bigint;
        x26: bigint;
        x27: bigint;
        x28: bigint;
        x29: bigint;
        x30: bigint;
        x31: bigint;
        x32: bigint;
    };
};
export type LongNestedStructWithOpts = {
    $$type: 'LongNestedStructWithOpts';
    x1: bigint;
    x2: bigint;
    x3: bigint;
    x4: bigint;
    x5: bigint;
    x6: bigint;
    x7: bigint;
    x8: bigint;
    x9: bigint;
    x10: bigint;
    x11: bigint;
    x12: bigint;
    x13: bigint;
    x14: bigint;
    x15: bigint;
    x16: bigint;
    x17: bigint;
    x18: bigint | null;
    x19: bigint;
    x20: bigint;
    s1: LongStruct15 | null;
    s2: LongStruct16;
    s3: LongStruct32 | null;
};
export declare function storeLongNestedStructWithOpts(src: LongNestedStructWithOpts): (builder: Builder) => void;
export declare function loadLongNestedStructWithOpts(slice: Slice): {
    $$type: "LongNestedStructWithOpts";
    x1: bigint;
    x2: bigint;
    x3: bigint;
    x4: bigint;
    x5: bigint;
    x6: bigint;
    x7: bigint;
    x8: bigint;
    x9: bigint;
    x10: bigint;
    x11: bigint;
    x12: bigint;
    x13: bigint;
    x14: bigint;
    x15: bigint;
    x16: bigint;
    x17: bigint;
    x18: bigint | null;
    x19: bigint;
    x20: bigint;
    s1: {
        $$type: "LongStruct15";
        x1: bigint;
        x2: bigint;
        x3: bigint;
        x4: bigint;
        x5: bigint;
        x6: bigint;
        x7: bigint;
        x8: bigint;
        x9: bigint;
        x10: bigint;
        x11: bigint;
        x12: bigint;
        x13: bigint;
        x14: bigint;
        x15: bigint;
    } | null;
    s2: {
        $$type: "LongStruct16";
        x1: bigint;
        x2: bigint;
        x3: bigint;
        x4: bigint;
        x5: bigint;
        x6: bigint;
        x7: bigint;
        x8: bigint;
        x9: bigint;
        x10: bigint;
        x11: bigint;
        x12: bigint;
        x13: bigint;
        x14: bigint;
        x15: bigint;
        x16: bigint;
    };
    s3: {
        $$type: "LongStruct32";
        x1: bigint;
        x2: bigint;
        x3: bigint;
        x4: bigint;
        x5: bigint;
        x6: bigint;
        x7: bigint;
        x8: bigint;
        x9: bigint;
        x10: bigint;
        x11: bigint;
        x12: bigint;
        x13: bigint;
        x14: bigint;
        x15: bigint;
        x16: bigint;
        x17: bigint;
        x18: bigint;
        x19: bigint;
        x20: bigint;
        x21: bigint;
        x22: bigint;
        x23: bigint;
        x24: bigint;
        x25: bigint;
        x26: bigint;
        x27: bigint;
        x28: bigint;
        x29: bigint;
        x30: bigint;
        x31: bigint;
        x32: bigint;
    } | null;
};
export type Point = {
    $$type: 'Point';
    x: bigint;
    y: bigint;
};
export declare function storePoint(src: Point): (builder: Builder) => void;
export declare function loadPoint(slice: Slice): {
    $$type: "Point";
    x: bigint;
    y: bigint;
};
export type Line = {
    $$type: 'Line';
    start: Point;
    end: Point;
};
export declare function storeLine(src: Line): (builder: Builder) => void;
export declare function loadLine(slice: Slice): {
    $$type: "Line";
    start: {
        $$type: "Point";
        x: bigint;
        y: bigint;
    };
    end: {
        $$type: "Point";
        x: bigint;
        y: bigint;
    };
};
export type Location = {
    $$type: 'Location';
    idx: bigint;
    line1: Line;
    line2: Line | null;
};
export declare function storeLocation(src: Location): (builder: Builder) => void;
export declare function loadLocation(slice: Slice): {
    $$type: "Location";
    idx: bigint;
    line1: {
        $$type: "Line";
        start: {
            $$type: "Point";
            x: bigint;
            y: bigint;
        };
        end: {
            $$type: "Point";
            x: bigint;
            y: bigint;
        };
    };
    line2: {
        $$type: "Line";
        start: {
            $$type: "Point";
            x: bigint;
            y: bigint;
        };
        end: {
            $$type: "Point";
            x: bigint;
            y: bigint;
        };
    } | null;
};
export type DoubleNestedStructOpt = {
    $$type: 'DoubleNestedStructOpt';
    a: bigint;
    s: MyStruct1 | null;
};
export declare function storeDoubleNestedStructOpt(src: DoubleNestedStructOpt): (builder: Builder) => void;
export declare function loadDoubleNestedStructOpt(slice: Slice): {
    $$type: "DoubleNestedStructOpt";
    a: bigint;
    s: {
        $$type: "MyStruct1";
        a: bigint;
        b: bigint;
        c: bigint | null;
    } | null;
};
export type TripleNestedStructOpt = {
    $$type: 'TripleNestedStructOpt';
    a: bigint;
    s: DoubleNestedStructOpt | null;
};
export declare function storeTripleNestedStructOpt(src: TripleNestedStructOpt): (builder: Builder) => void;
export declare function loadTripleNestedStructOpt(slice: Slice): {
    $$type: "TripleNestedStructOpt";
    a: bigint;
    s: {
        $$type: "DoubleNestedStructOpt";
        a: bigint;
        s: {
            $$type: "MyStruct1";
            a: bigint;
            b: bigint;
            c: bigint | null;
        } | null;
    } | null;
};
export type LongAndDeepNestedStruct = {
    $$type: 'LongAndDeepNestedStruct';
    x1: bigint;
    x2: bigint;
    x3: bigint;
    x4: bigint;
    x5: bigint;
    x6: bigint;
    x7: bigint;
    x8: bigint;
    x9: bigint;
    x10: bigint;
    x11: bigint;
    x12: bigint;
    x13: bigint;
    x14: bigint;
    x15: bigint;
    x16: bigint;
    s1: TripleNestedStructOpt;
    s2: TripleNestedStructOpt;
    s3: TripleNestedStructOpt | null;
    s4: TripleNestedStructOpt | null;
};
export declare function storeLongAndDeepNestedStruct(src: LongAndDeepNestedStruct): (builder: Builder) => void;
export declare function loadLongAndDeepNestedStruct(slice: Slice): {
    $$type: "LongAndDeepNestedStruct";
    x1: bigint;
    x2: bigint;
    x3: bigint;
    x4: bigint;
    x5: bigint;
    x6: bigint;
    x7: bigint;
    x8: bigint;
    x9: bigint;
    x10: bigint;
    x11: bigint;
    x12: bigint;
    x13: bigint;
    x14: bigint;
    x15: bigint;
    x16: bigint;
    s1: {
        $$type: "TripleNestedStructOpt";
        a: bigint;
        s: {
            $$type: "DoubleNestedStructOpt";
            a: bigint;
            s: {
                $$type: "MyStruct1";
                a: bigint;
                b: bigint;
                c: bigint | null;
            } | null;
        } | null;
    };
    s2: {
        $$type: "TripleNestedStructOpt";
        a: bigint;
        s: {
            $$type: "DoubleNestedStructOpt";
            a: bigint;
            s: {
                $$type: "MyStruct1";
                a: bigint;
                b: bigint;
                c: bigint | null;
            } | null;
        } | null;
    };
    s3: {
        $$type: "TripleNestedStructOpt";
        a: bigint;
        s: {
            $$type: "DoubleNestedStructOpt";
            a: bigint;
            s: {
                $$type: "MyStruct1";
                a: bigint;
                b: bigint;
                c: bigint | null;
            } | null;
        } | null;
    } | null;
    s4: {
        $$type: "TripleNestedStructOpt";
        a: bigint;
        s: {
            $$type: "DoubleNestedStructOpt";
            a: bigint;
            s: {
                $$type: "MyStruct1";
                a: bigint;
                b: bigint;
                c: bigint | null;
            } | null;
        } | null;
    } | null;
};
export type Foo = {
    $$type: 'Foo';
    s: Slice;
};
export declare function storeFoo(src: Foo): (builder: Builder) => void;
export declare function loadFoo(slice: Slice): {
    $$type: "Foo";
    s: Slice;
};
export type Dict = {
    $$type: 'Dict';
    m: Dictionary<number, bigint>;
};
export declare function storeDict(src: Dict): (builder: Builder) => void;
export declare function loadDict(slice: Slice): {
    $$type: "Dict";
    m: Dictionary<number, bigint>;
};
export type OptionalFields = {
    $$type: 'OptionalFields';
    nickname: string | null;
    avatar: string | null;
};
export declare function storeOptionalFields(src: OptionalFields): (builder: Builder) => void;
export declare function loadOptionalFields(slice: Slice): {
    $$type: "OptionalFields";
    nickname: string | null;
    avatar: string | null;
};
export type S1 = {
    $$type: 'S1';
    a: bigint;
    b: bigint;
    c: bigint;
};
export declare function storeS1(src: S1): (builder: Builder) => void;
export declare function loadS1(slice: Slice): {
    $$type: "S1";
    a: bigint;
    b: bigint;
    c: bigint;
};
export type StructsTester$Data = {
    $$type: 'StructsTester$Data';
    s1: S;
    s2: S;
    t1: T;
    t2: T;
    mapWithLongStructs15: Dictionary<bigint, LongStruct15>;
    mapWithLongStructs16: Dictionary<bigint, LongStruct16>;
    mapWithLongStructs32: Dictionary<bigint, LongStruct32>;
    x1: bigint;
    x2: bigint;
    x3: bigint;
    x4: bigint;
    x5: bigint;
    x6: bigint;
    x7: bigint;
    x8: bigint;
    x9: bigint;
    x10: bigint;
    x11: bigint;
    x12: bigint;
    x13: bigint;
    x14: bigint;
    x15: bigint;
    x16: bigint;
    x17: bigint;
    x18: bigint;
    x19: bigint;
    x20: bigint;
};
export declare function storeStructsTester$Data(src: StructsTester$Data): (builder: Builder) => void;
export declare function loadStructsTester$Data(slice: Slice): {
    $$type: "StructsTester$Data";
    s1: {
        $$type: "S";
        a: boolean;
        b: bigint;
    };
    s2: {
        $$type: "S";
        a: boolean;
        b: bigint;
    };
    t1: {
        $$type: "T";
        a: bigint;
        s: {
            $$type: "S";
            a: boolean;
            b: bigint;
        };
    };
    t2: {
        $$type: "T";
        a: bigint;
        s: {
            $$type: "S";
            a: boolean;
            b: bigint;
        };
    };
    mapWithLongStructs15: Dictionary<bigint, LongStruct15>;
    mapWithLongStructs16: Dictionary<bigint, LongStruct16>;
    mapWithLongStructs32: Dictionary<bigint, LongStruct32>;
    x1: bigint;
    x2: bigint;
    x3: bigint;
    x4: bigint;
    x5: bigint;
    x6: bigint;
    x7: bigint;
    x8: bigint;
    x9: bigint;
    x10: bigint;
    x11: bigint;
    x12: bigint;
    x13: bigint;
    x14: bigint;
    x15: bigint;
    x16: bigint;
    x17: bigint;
    x18: bigint;
    x19: bigint;
    x20: bigint;
};
export declare const StructsTester_getterMapping: {
    [key: string]: string;
};
export declare class StructsTester implements Contract {
    static init(): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(): Promise<StructsTester>;
    static fromAddress(address: Address): StructsTester;
    readonly address: Address;
    readonly init?: {
        code: Cell;
        data: Cell;
    };
    readonly abi: ContractABI;
    private constructor();
    send(provider: ContractProvider, via: Sender, args: {
        value: bigint;
        bounce?: boolean | null | undefined;
    }, message: null | Foo | "example" | "exampleVarIntegers"): Promise<void>;
    getStructInitializerTest(provider: ContractProvider): Promise<boolean>;
    getToCell1(provider: ContractProvider, s: MyStruct1): Promise<Cell>;
    getToSlice1(provider: ContractProvider, s: MyStruct1): Promise<Slice>;
    getFromCell1(provider: ContractProvider, src: Cell): Promise<{
        $$type: "MyStruct1";
        a: bigint;
        b: bigint;
        c: bigint | null;
    }>;
    getFromSlice1(provider: ContractProvider, src: Slice): Promise<{
        $$type: "MyStruct1";
        a: bigint;
        b: bigint;
        c: bigint | null;
    }>;
    getToCell2(provider: ContractProvider, s: MyStruct2): Promise<Cell>;
    getFromCell2(provider: ContractProvider, src: Cell): Promise<{
        $$type: "MyStruct2";
        m: Dictionary<bigint, bigint>;
        s: {
            $$type: "MyStruct1";
            a: bigint;
            b: bigint;
            c: bigint | null;
        } | null;
    }>;
    getFromSlice2(provider: ContractProvider, src: Slice): Promise<{
        $$type: "MyStruct2";
        m: Dictionary<bigint, bigint>;
        s: {
            $$type: "MyStruct1";
            a: bigint;
            b: bigint;
            c: bigint | null;
        } | null;
    }>;
    getTest1(provider: ContractProvider, s1: MyStruct1, s2: MyStruct2): Promise<Cell>;
    getToCellMessage1(provider: ContractProvider, m: MyMessage1): Promise<Cell>;
    getFromCellMessage1(provider: ContractProvider, src: Cell): Promise<{
        $$type: "MyMessage1";
        a: bigint;
        s: {
            $$type: "MyStruct2";
            m: Dictionary<bigint, bigint>;
            s: {
                $$type: "MyStruct1";
                a: bigint;
                b: bigint;
                c: bigint | null;
            } | null;
        };
    }>;
    getFromSliceMessage1(provider: ContractProvider, src: Slice): Promise<{
        $$type: "MyMessage1";
        a: bigint;
        s: {
            $$type: "MyStruct2";
            m: Dictionary<bigint, bigint>;
            s: {
                $$type: "MyStruct1";
                a: bigint;
                b: bigint;
                c: bigint | null;
            } | null;
        };
    }>;
    getContractStructConstantImmediate(provider: ContractProvider): Promise<{
        $$type: "MyStruct3";
        s: string;
    }>;
    getGlobalConstStructConstantImmediate(provider: ContractProvider): Promise<{
        $$type: "MyStruct3";
        s: string;
    }>;
    getContractStructConstantFieldImmediate(provider: ContractProvider): Promise<string>;
    getGlobalConstStructConstantFieldImmediate(provider: ContractProvider): Promise<string>;
    getContractStructConstantViaVar(provider: ContractProvider): Promise<{
        $$type: "MyStruct3";
        s: string;
    }>;
    getGlobalConstStructConstantViaVar(provider: ContractProvider): Promise<{
        $$type: "MyStruct3";
        s: string;
    }>;
    getContractStructConstantFieldViaVar(provider: ContractProvider): Promise<string>;
    getGlobalConstStructConstantFieldViaVar(provider: ContractProvider): Promise<string>;
    getLongStruct15Test(provider: ContractProvider): Promise<{
        $$type: "LongStruct15";
        x1: bigint;
        x2: bigint;
        x3: bigint;
        x4: bigint;
        x5: bigint;
        x6: bigint;
        x7: bigint;
        x8: bigint;
        x9: bigint;
        x10: bigint;
        x11: bigint;
        x12: bigint;
        x13: bigint;
        x14: bigint;
        x15: bigint;
    }>;
    getLongStruct16Test(provider: ContractProvider): Promise<{
        $$type: "LongStruct16";
        x1: bigint;
        x2: bigint;
        x3: bigint;
        x4: bigint;
        x5: bigint;
        x6: bigint;
        x7: bigint;
        x8: bigint;
        x9: bigint;
        x10: bigint;
        x11: bigint;
        x12: bigint;
        x13: bigint;
        x14: bigint;
        x15: bigint;
        x16: bigint;
    }>;
    getLongStruct32Test(provider: ContractProvider): Promise<{
        $$type: "LongStruct32";
        x1: bigint;
        x2: bigint;
        x3: bigint;
        x4: bigint;
        x5: bigint;
        x6: bigint;
        x7: bigint;
        x8: bigint;
        x9: bigint;
        x10: bigint;
        x11: bigint;
        x12: bigint;
        x13: bigint;
        x14: bigint;
        x15: bigint;
        x16: bigint;
        x17: bigint;
        x18: bigint;
        x19: bigint;
        x20: bigint;
        x21: bigint;
        x22: bigint;
        x23: bigint;
        x24: bigint;
        x25: bigint;
        x26: bigint;
        x27: bigint;
        x28: bigint;
        x29: bigint;
        x30: bigint;
        x31: bigint;
        x32: bigint;
    }>;
    getLongNestedStructTest(provider: ContractProvider): Promise<{
        $$type: "LongNestedStruct";
        x1: bigint;
        x2: bigint;
        x3: bigint;
        x4: bigint;
        x5: bigint;
        x6: bigint;
        x7: bigint;
        x8: bigint;
        x9: bigint;
        x10: bigint;
        x11: bigint;
        x12: bigint;
        x13: bigint;
        x14: bigint;
        x15: bigint;
        x16: bigint;
        x17: bigint;
        x18: bigint;
        x19: bigint;
        x20: bigint;
        s1: {
            $$type: "LongStruct15";
            x1: bigint;
            x2: bigint;
            x3: bigint;
            x4: bigint;
            x5: bigint;
            x6: bigint;
            x7: bigint;
            x8: bigint;
            x9: bigint;
            x10: bigint;
            x11: bigint;
            x12: bigint;
            x13: bigint;
            x14: bigint;
            x15: bigint;
        };
        s2: {
            $$type: "LongStruct16";
            x1: bigint;
            x2: bigint;
            x3: bigint;
            x4: bigint;
            x5: bigint;
            x6: bigint;
            x7: bigint;
            x8: bigint;
            x9: bigint;
            x10: bigint;
            x11: bigint;
            x12: bigint;
            x13: bigint;
            x14: bigint;
            x15: bigint;
            x16: bigint;
        };
        s3: {
            $$type: "LongStruct32";
            x1: bigint;
            x2: bigint;
            x3: bigint;
            x4: bigint;
            x5: bigint;
            x6: bigint;
            x7: bigint;
            x8: bigint;
            x9: bigint;
            x10: bigint;
            x11: bigint;
            x12: bigint;
            x13: bigint;
            x14: bigint;
            x15: bigint;
            x16: bigint;
            x17: bigint;
            x18: bigint;
            x19: bigint;
            x20: bigint;
            x21: bigint;
            x22: bigint;
            x23: bigint;
            x24: bigint;
            x25: bigint;
            x26: bigint;
            x27: bigint;
            x28: bigint;
            x29: bigint;
            x30: bigint;
            x31: bigint;
            x32: bigint;
        };
    }>;
    getLongNestedStructWithOptsTest(provider: ContractProvider): Promise<{
        $$type: "LongNestedStructWithOpts";
        x1: bigint;
        x2: bigint;
        x3: bigint;
        x4: bigint;
        x5: bigint;
        x6: bigint;
        x7: bigint;
        x8: bigint;
        x9: bigint;
        x10: bigint;
        x11: bigint;
        x12: bigint;
        x13: bigint;
        x14: bigint;
        x15: bigint;
        x16: bigint;
        x17: bigint;
        x18: bigint | null;
        x19: bigint;
        x20: bigint;
        s1: {
            $$type: "LongStruct15";
            x1: bigint;
            x2: bigint;
            x3: bigint;
            x4: bigint;
            x5: bigint;
            x6: bigint;
            x7: bigint;
            x8: bigint;
            x9: bigint;
            x10: bigint;
            x11: bigint;
            x12: bigint;
            x13: bigint;
            x14: bigint;
            x15: bigint;
        } | null;
        s2: {
            $$type: "LongStruct16";
            x1: bigint;
            x2: bigint;
            x3: bigint;
            x4: bigint;
            x5: bigint;
            x6: bigint;
            x7: bigint;
            x8: bigint;
            x9: bigint;
            x10: bigint;
            x11: bigint;
            x12: bigint;
            x13: bigint;
            x14: bigint;
            x15: bigint;
            x16: bigint;
        };
        s3: {
            $$type: "LongStruct32";
            x1: bigint;
            x2: bigint;
            x3: bigint;
            x4: bigint;
            x5: bigint;
            x6: bigint;
            x7: bigint;
            x8: bigint;
            x9: bigint;
            x10: bigint;
            x11: bigint;
            x12: bigint;
            x13: bigint;
            x14: bigint;
            x15: bigint;
            x16: bigint;
            x17: bigint;
            x18: bigint;
            x19: bigint;
            x20: bigint;
            x21: bigint;
            x22: bigint;
            x23: bigint;
            x24: bigint;
            x25: bigint;
            x26: bigint;
            x27: bigint;
            x28: bigint;
            x29: bigint;
            x30: bigint;
            x31: bigint;
            x32: bigint;
        } | null;
    }>;
    getLongContractTest(provider: ContractProvider): Promise<bigint>;
    getLocation1(provider: ContractProvider): Promise<{
        $$type: "Location";
        idx: bigint;
        line1: {
            $$type: "Line";
            start: {
                $$type: "Point";
                x: bigint;
                y: bigint;
            };
            end: {
                $$type: "Point";
                x: bigint;
                y: bigint;
            };
        };
        line2: {
            $$type: "Line";
            start: {
                $$type: "Point";
                x: bigint;
                y: bigint;
            };
            end: {
                $$type: "Point";
                x: bigint;
                y: bigint;
            };
        } | null;
    }>;
    getLocation2(provider: ContractProvider): Promise<{
        $$type: "Location";
        idx: bigint;
        line1: {
            $$type: "Line";
            start: {
                $$type: "Point";
                x: bigint;
                y: bigint;
            };
            end: {
                $$type: "Point";
                x: bigint;
                y: bigint;
            };
        };
        line2: {
            $$type: "Line";
            start: {
                $$type: "Point";
                x: bigint;
                y: bigint;
            };
            end: {
                $$type: "Point";
                x: bigint;
                y: bigint;
            };
        } | null;
    }>;
    getTripleNestedStructOpt1(provider: ContractProvider): Promise<{
        $$type: "TripleNestedStructOpt";
        a: bigint;
        s: {
            $$type: "DoubleNestedStructOpt";
            a: bigint;
            s: {
                $$type: "MyStruct1";
                a: bigint;
                b: bigint;
                c: bigint | null;
            } | null;
        } | null;
    }>;
    getTripleNestedStructOpt2(provider: ContractProvider): Promise<{
        $$type: "TripleNestedStructOpt";
        a: bigint;
        s: {
            $$type: "DoubleNestedStructOpt";
            a: bigint;
            s: {
                $$type: "MyStruct1";
                a: bigint;
                b: bigint;
                c: bigint | null;
            } | null;
        } | null;
    }>;
    getTripleNestedStructOpt3(provider: ContractProvider): Promise<{
        $$type: "TripleNestedStructOpt";
        a: bigint;
        s: {
            $$type: "DoubleNestedStructOpt";
            a: bigint;
            s: {
                $$type: "MyStruct1";
                a: bigint;
                b: bigint;
                c: bigint | null;
            } | null;
        } | null;
    }>;
    getLongAndDeepNestedStruct1(provider: ContractProvider): Promise<{
        $$type: "LongAndDeepNestedStruct";
        x1: bigint;
        x2: bigint;
        x3: bigint;
        x4: bigint;
        x5: bigint;
        x6: bigint;
        x7: bigint;
        x8: bigint;
        x9: bigint;
        x10: bigint;
        x11: bigint;
        x12: bigint;
        x13: bigint;
        x14: bigint;
        x15: bigint;
        x16: bigint;
        s1: {
            $$type: "TripleNestedStructOpt";
            a: bigint;
            s: {
                $$type: "DoubleNestedStructOpt";
                a: bigint;
                s: {
                    $$type: "MyStruct1";
                    a: bigint;
                    b: bigint;
                    c: bigint | null;
                } | null;
            } | null;
        };
        s2: {
            $$type: "TripleNestedStructOpt";
            a: bigint;
            s: {
                $$type: "DoubleNestedStructOpt";
                a: bigint;
                s: {
                    $$type: "MyStruct1";
                    a: bigint;
                    b: bigint;
                    c: bigint | null;
                } | null;
            } | null;
        };
        s3: {
            $$type: "TripleNestedStructOpt";
            a: bigint;
            s: {
                $$type: "DoubleNestedStructOpt";
                a: bigint;
                s: {
                    $$type: "MyStruct1";
                    a: bigint;
                    b: bigint;
                    c: bigint | null;
                } | null;
            } | null;
        } | null;
        s4: {
            $$type: "TripleNestedStructOpt";
            a: bigint;
            s: {
                $$type: "DoubleNestedStructOpt";
                a: bigint;
                s: {
                    $$type: "MyStruct1";
                    a: bigint;
                    b: bigint;
                    c: bigint | null;
                } | null;
            } | null;
        } | null;
    }>;
    getLongAndDeepNestedStruct2(provider: ContractProvider): Promise<{
        $$type: "LongAndDeepNestedStruct";
        x1: bigint;
        x2: bigint;
        x3: bigint;
        x4: bigint;
        x5: bigint;
        x6: bigint;
        x7: bigint;
        x8: bigint;
        x9: bigint;
        x10: bigint;
        x11: bigint;
        x12: bigint;
        x13: bigint;
        x14: bigint;
        x15: bigint;
        x16: bigint;
        s1: {
            $$type: "TripleNestedStructOpt";
            a: bigint;
            s: {
                $$type: "DoubleNestedStructOpt";
                a: bigint;
                s: {
                    $$type: "MyStruct1";
                    a: bigint;
                    b: bigint;
                    c: bigint | null;
                } | null;
            } | null;
        };
        s2: {
            $$type: "TripleNestedStructOpt";
            a: bigint;
            s: {
                $$type: "DoubleNestedStructOpt";
                a: bigint;
                s: {
                    $$type: "MyStruct1";
                    a: bigint;
                    b: bigint;
                    c: bigint | null;
                } | null;
            } | null;
        };
        s3: {
            $$type: "TripleNestedStructOpt";
            a: bigint;
            s: {
                $$type: "DoubleNestedStructOpt";
                a: bigint;
                s: {
                    $$type: "MyStruct1";
                    a: bigint;
                    b: bigint;
                    c: bigint | null;
                } | null;
            } | null;
        } | null;
        s4: {
            $$type: "TripleNestedStructOpt";
            a: bigint;
            s: {
                $$type: "DoubleNestedStructOpt";
                a: bigint;
                s: {
                    $$type: "MyStruct1";
                    a: bigint;
                    b: bigint;
                    c: bigint | null;
                } | null;
            } | null;
        } | null;
    }>;
    getLongAndDeepNestedStruct3(provider: ContractProvider): Promise<{
        $$type: "LongAndDeepNestedStruct";
        x1: bigint;
        x2: bigint;
        x3: bigint;
        x4: bigint;
        x5: bigint;
        x6: bigint;
        x7: bigint;
        x8: bigint;
        x9: bigint;
        x10: bigint;
        x11: bigint;
        x12: bigint;
        x13: bigint;
        x14: bigint;
        x15: bigint;
        x16: bigint;
        s1: {
            $$type: "TripleNestedStructOpt";
            a: bigint;
            s: {
                $$type: "DoubleNestedStructOpt";
                a: bigint;
                s: {
                    $$type: "MyStruct1";
                    a: bigint;
                    b: bigint;
                    c: bigint | null;
                } | null;
            } | null;
        };
        s2: {
            $$type: "TripleNestedStructOpt";
            a: bigint;
            s: {
                $$type: "DoubleNestedStructOpt";
                a: bigint;
                s: {
                    $$type: "MyStruct1";
                    a: bigint;
                    b: bigint;
                    c: bigint | null;
                } | null;
            } | null;
        };
        s3: {
            $$type: "TripleNestedStructOpt";
            a: bigint;
            s: {
                $$type: "DoubleNestedStructOpt";
                a: bigint;
                s: {
                    $$type: "MyStruct1";
                    a: bigint;
                    b: bigint;
                    c: bigint | null;
                } | null;
            } | null;
        } | null;
        s4: {
            $$type: "TripleNestedStructOpt";
            a: bigint;
            s: {
                $$type: "DoubleNestedStructOpt";
                a: bigint;
                s: {
                    $$type: "MyStruct1";
                    a: bigint;
                    b: bigint;
                    c: bigint | null;
                } | null;
            } | null;
        } | null;
    }>;
    getIntFieldsStruct(provider: ContractProvider): Promise<{
        $$type: "IntFields";
        i1: bigint;
        i2: bigint;
        i3: bigint;
        i255: bigint;
        i256: bigint;
        i257: bigint;
    }>;
    getIntFieldsFromCell(provider: ContractProvider, src: Cell): Promise<{
        $$type: "IntFields";
        i1: bigint;
        i2: bigint;
        i3: bigint;
        i255: bigint;
        i256: bigint;
        i257: bigint;
    }>;
    getUintFieldsMessage(provider: ContractProvider): Promise<{
        $$type: "UintFields";
        u1: bigint;
        u2: bigint;
        u3: bigint;
        u254: bigint;
        u255: bigint;
        u256: bigint;
    }>;
    getUintFieldsFromCell(provider: ContractProvider, src: Cell): Promise<{
        $$type: "UintFields";
        u1: bigint;
        u2: bigint;
        u3: bigint;
        u254: bigint;
        u255: bigint;
        u256: bigint;
    }>;
    getOptionalFields(provider: ContractProvider): Promise<{
        $$type: "OptionalFields";
        nickname: string | null;
        avatar: string | null;
    }>;
    getDestructuringTest1(provider: ContractProvider): Promise<bigint>;
    getDestructuringTest1Const(provider: ContractProvider): Promise<bigint>;
    getDestructuringTest2(provider: ContractProvider): Promise<bigint>;
    getDestructuringTest2Const(provider: ContractProvider): Promise<bigint>;
    getDestructuringTest3(provider: ContractProvider): Promise<bigint>;
    getDestructuringTest3Const(provider: ContractProvider): Promise<bigint>;
    getDestructuringTest4(provider: ContractProvider): Promise<bigint>;
    getDestructuringTest4Const(provider: ContractProvider): Promise<bigint>;
    getDestructuringTest5(provider: ContractProvider): Promise<bigint>;
    getDestructuringTest5Const(provider: ContractProvider): Promise<bigint>;
    getDestructuringTest6(provider: ContractProvider): Promise<bigint>;
    getDestructuringTest6Const(provider: ContractProvider): Promise<bigint>;
    getDestructuringTest7(provider: ContractProvider): Promise<{
        $$type: "S1";
        a: bigint;
        b: bigint;
        c: bigint;
    }>;
    getDestructuringTest7Const(provider: ContractProvider): Promise<{
        $$type: "S1";
        a: bigint;
        b: bigint;
        c: bigint;
    }>;
    getDestructuringTest8(provider: ContractProvider): Promise<bigint>;
    getDestructuringTest8Const(provider: ContractProvider): Promise<bigint>;
}
