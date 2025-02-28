"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const version_1 = require("../../pipeline/version");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const all_in_folder_build_1 = require("../utils/all-in-folder.build");
const main = async () => {
    // Disable version number in packages
    (0, version_1.__DANGER__disableVersionNumber)();
    const outputDir = path_1.default.join(__dirname, "contracts/func/output");
    try {
        await fs_1.promises.access(outputDir);
        await fs_1.promises.rm(outputDir, { recursive: true, force: true });
    }
    catch {
        // Directory does not exist, no need to remove
    }
    await (0, all_in_folder_build_1.allInFolderFunc)(__dirname, ["contracts/func/**/*.fc"]);
};
void main();
