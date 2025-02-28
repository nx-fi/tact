"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createVirtualFileSystem_1 = require("./createVirtualFileSystem");
describe("createVirtualFileSystem", () => {
    it("should create a virtual file system", () => {
        let vfs = (0, createVirtualFileSystem_1.createVirtualFileSystem)("/", {});
        expect(vfs.root).toBe("/");
        vfs = (0, createVirtualFileSystem_1.createVirtualFileSystem)("//", {});
        expect(vfs.root).toBe("/");
        vfs = (0, createVirtualFileSystem_1.createVirtualFileSystem)("//./", {});
        expect(vfs.root).toBe("/");
        vfs = (0, createVirtualFileSystem_1.createVirtualFileSystem)("@stdlib", {});
        expect(vfs.root).toBe("@stdlib/");
    });
    it("should read from virtual file system", () => {
        const fs = {
            ["file.txt"]: Buffer.from("Hello World").toString("base64"),
            ["empty.txt"]: Buffer.from([]).toString("base64"),
        };
        const vfs = (0, createVirtualFileSystem_1.createVirtualFileSystem)("@stdlib", fs);
        let realPath = vfs.resolve("./", "./", "file.txt");
        expect(realPath).toBe("@stdlib/file.txt");
        expect(vfs.exists(realPath)).toBe(true);
        expect(vfs.readFile(realPath).toString()).toBe("Hello World");
        realPath = vfs.resolve("./", "./", "empty.txt");
        expect(realPath).toBe("@stdlib/empty.txt");
        expect(vfs.exists(realPath)).toBe(true);
        expect(vfs.readFile(realPath).toString()).toBe("");
    });
});
