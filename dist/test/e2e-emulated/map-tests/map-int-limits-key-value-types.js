"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intValFormats = exports.intKeyFormats = exports.descriptionToString = exports.maxInt = exports.minInt = void 0;
const minSignedInt = (nBits) => -(2n ** (BigInt(nBits) - 1n));
const maxSignedInt = (nBits) => 2n ** (BigInt(nBits) - 1n) - 1n;
const minUnsignedInt = (_nBits) => 0n;
const maxUnsignedInt = (nBits) => 2n ** BigInt(nBits) - 1n;
const minVarInt = (size) => minSignedInt(8 * (size - 1));
const maxVarInt = (size) => maxSignedInt(8 * (size - 1));
const minVarUInt = (_size) => 0n;
const maxVarUInt = (size) => maxUnsignedInt(8 * (size - 1));
const minInt = (descr) => {
    switch (descr.format) {
        case null:
            return minSignedInt(257);
        case "int":
            return minSignedInt(descr.size);
        case "uint":
            return minUnsignedInt(descr.size);
        case "varint":
            return minVarInt(descr.size);
        case "varuint":
            return minVarUInt(descr.size);
        case "coins":
            return minVarUInt(16);
    }
};
exports.minInt = minInt;
const maxInt = (descr) => {
    switch (descr.format) {
        case null:
            return maxSignedInt(257);
        case "int":
            return maxSignedInt(descr.size);
        case "uint":
            return maxUnsignedInt(descr.size);
        case "varint":
            return maxVarInt(descr.size);
        case "varuint":
            return maxVarUInt(descr.size);
        case "coins":
            return maxVarUInt(16);
    }
};
exports.maxInt = maxInt;
const descriptionToString = (descr) => {
    switch (descr.format) {
        case null:
            return "Int";
        case "int":
        case "uint":
        case "varint":
        case "varuint":
            return `Int as ${descr.format}${descr.size}`;
        case "coins":
            return "Int as coins";
    }
};
exports.descriptionToString = descriptionToString;
const signedIntFormats = [
    { format: "int", size: 2 },
    { format: "int", size: 10 },
    { format: "int", size: 37 },
    { format: "int", size: 256 },
    { format: "int", size: 257 },
    { format: null },
];
const unsignedIntFormats = [
    { format: "uint", size: 2 },
    { format: "uint", size: 8 },
    { format: "uint", size: 32 },
    { format: "uint", size: 256 },
];
const varIntFormats = [
    { format: "varint", size: 16 },
    { format: "varint", size: 32 },
    { format: "varuint", size: 16 },
    { format: "varuint", size: 32 },
    { format: "coins" },
];
const fixedWidthInts = signedIntFormats.concat(unsignedIntFormats);
exports.intKeyFormats = fixedWidthInts;
exports.intValFormats = varIntFormats.concat(fixedWidthInts);
