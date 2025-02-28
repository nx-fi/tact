import type { ABIType, ABITypeRef } from "@ton/core";
import type { AllocationCell } from "../../storage/operation";
import type { Writer } from "../../utils/Writer";
export declare const maxTupleSize = 15;
export declare function writeStruct(name: string, fields: {
    name: string;
    type: ABITypeRef;
}[], exp: boolean, w: Writer): void;
export declare function writeParser(s: ABIType, allocation: AllocationCell, w: Writer): void;
export declare function writeSerializer(s: ABIType, allocation: AllocationCell, w: Writer): void;
export declare function writeInitSerializer(name: string, allocation: AllocationCell, w: Writer): void;
export declare function writeTupleParser(s: ABIType, w: Writer): void;
export declare function writeGetterTupleParser(s: ABIType, w: Writer): void;
export declare function writeGetParser(name: string, type: ABITypeRef, w: Writer): void;
export declare function writeTupleSerializer(s: ABIType, w: Writer): void;
export declare function writeArgumentToStack(name: string, ref: ABITypeRef, w: Writer): void;
export declare function writeDictParser(s: ABIType, w: Writer): void;
