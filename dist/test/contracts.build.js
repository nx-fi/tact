"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const version_1 = require("../pipeline/version");
const all_in_folder_build_1 = require("./utils/all-in-folder.build");
const main = async () => {
    // Disable version number in packages
    (0, version_1.__DANGER__disableVersionNumber)();
    await (0, all_in_folder_build_1.allInFolder)(__dirname, [
        "e2e-emulated/contracts/*.tact",
        "codegen/all-contracts.tact",
        "exit-codes/contracts/*.tact",
        "send-modes/contracts/*.tact",
    ]);
};
void main();
