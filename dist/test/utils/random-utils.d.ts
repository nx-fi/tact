import type { KeyPair } from "@ton/crypto";
import { Address } from "@ton/core";
export declare function randomKey(seed: string): KeyPair;
export declare function randomAddress(workchain: number, seed: string): Address;
