import type { StorageAllocation } from "../../storage/StorageAllocation";
import type { WriterContext } from "../Writer";
import type { ItemOrigin } from "../../imports/source";
export declare function writeSerializer(name: string, forceInline: boolean, allocation: StorageAllocation, origin: ItemOrigin, ctx: WriterContext): void;
export declare function writeOptionalSerializer(name: string, origin: ItemOrigin, ctx: WriterContext): void;
export declare function writeParser(name: string, forceInline: boolean, opcode: "with-opcode" | "no-opcode", allocation: StorageAllocation, origin: ItemOrigin, ctx: WriterContext): void;
export declare function writeBouncedParser(name: string, forceInline: boolean, allocation: StorageAllocation, origin: ItemOrigin, ctx: WriterContext): void;
export declare function writeOptionalParser(name: string, origin: ItemOrigin, ctx: WriterContext): void;
