"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomKey = randomKey;
exports.randomAddress = randomAddress;
const prando_1 = __importDefault(require("prando"));
const crypto_1 = require("@ton/crypto");
const core_1 = require("@ton/core");
function randomKey(seed) {
    const random = new prando_1.default(seed);
    const res = Buffer.alloc(32);
    for (let i = 0; i < res.length; i++) {
        res[i] = random.nextInt(0, 256);
    }
    return (0, crypto_1.keyPairFromSeed)(res);
}
function randomAddress(workchain, seed) {
    const random = new prando_1.default(seed);
    const hash = Buffer.alloc(32);
    for (let i = 0; i < hash.length; i++) {
        hash[i] = random.nextInt(0, 255);
    }
    return new core_1.Address(workchain, hash);
}
