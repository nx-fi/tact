"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const createNodeFileSystem_1 = require("./createNodeFileSystem");
describe("createNodeFileSystem", () => {
    it("should open file system", () => {
        const vfs = (0, createNodeFileSystem_1.createNodeFileSystem)(path_1.default.resolve(__dirname, "./__testdata/"));
        expect(vfs.root).toBe(path_1.default.normalize(__dirname + "/__testdata/"));
    });
    it("should write and read files", () => {
        const vfs = (0, createNodeFileSystem_1.createNodeFileSystem)(path_1.default.resolve(__dirname, "./__testdata"), false);
        // Create a single file
        const filename = "tmp-" + Math.random() + ".txt";
        const realPath = vfs.resolve(filename);
        try {
            expect(vfs.exists(realPath)).toBe(false);
            vfs.writeFile(realPath, "Hello world");
            expect(vfs.exists(realPath)).toBe(true);
            expect(vfs.readFile(realPath).toString("utf8")).toBe("Hello world");
            expect(fs_1.default.readFileSync(realPath, "utf8")).toBe("Hello world");
        }
        finally {
            fs_1.default.unlinkSync(realPath);
        }
        // Automatically create directories
        const dir = "dir-" + Math.random();
        const fileName2 = dir + "/" + Math.random() + ".txt";
        const realPath2 = vfs.resolve(fileName2);
        const realPathDir2 = vfs.resolve(dir);
        try {
            expect(vfs.exists(realPath2)).toBe(false);
            vfs.writeFile(realPath2, "Hello world");
            expect(vfs.exists(realPath2)).toBe(true);
            expect(vfs.readFile(realPath2).toString("utf8")).toBe("Hello world");
            expect(fs_1.default.readFileSync(realPath2, "utf8")).toBe("Hello world");
        }
        finally {
            fs_1.default.rmSync(realPathDir2, { recursive: true, force: true });
        }
    });
});
