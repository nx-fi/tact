"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateIPFSlink = calculateIPFSlink;
const ipfs_unixfs_importer_1 = require("ipfs-unixfs-importer");
const memory_1 = require("blockstore-core/memory");
async function calculateIPFSlink(data) {
    const blockstore = new memory_1.MemoryBlockstore();
    const cid = await new Promise((resolve, reject) => {
        void (async () => {
            try {
                for await (const entry of (0, ipfs_unixfs_importer_1.importer)({ content: data }, blockstore)) {
                    resolve(entry.cid.toString());
                }
            }
            catch (e) {
                reject(e);
            }
        })();
    });
    return "ipfs://" + cid;
}
