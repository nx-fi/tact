"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createVirtualFileSystem_1 = require("../vfs/createVirtualFileSystem");
const path_1 = require("./path");
const resolveLibrary_1 = require("./resolveLibrary");
const project = (0, createVirtualFileSystem_1.createVirtualFileSystem)("/project", {
    ["main.tact"]: "",
    ["import.tact"]: "",
    ["main.fc"]: "",
});
const mainSource = {
    origin: "user",
    path: "/project/main.tact",
    code: "",
};
const stdlib = (0, createVirtualFileSystem_1.createVirtualFileSystem)("@stdlib", {
    ["libs/config.tact"]: "",
    ["libs/import.tact"]: "",
});
const stdlibSource = {
    origin: "stdlib",
    path: "@stdlib/libs/import.tact",
    code: "",
};
it("project file, stdlib import", () => {
    const resolved = (0, resolveLibrary_1.resolveLibrary)({
        sourceFrom: mainSource,
        importPath: {
            path: (0, path_1.fromString)("config.tact"),
            language: "tact",
            type: "stdlib",
        },
        project,
        stdlib,
    });
    expect(resolved).toMatchObject({
        ok: true,
        path: "@stdlib/libs/config.tact",
        origin: "stdlib",
        language: "tact",
    });
});
it("project file, relative import, func", () => {
    const resolved = (0, resolveLibrary_1.resolveLibrary)({
        sourceFrom: mainSource,
        importPath: {
            path: (0, path_1.fromString)("./main.fc"),
            type: "relative",
            language: "func",
        },
        project,
        stdlib,
    });
    expect(resolved).toMatchObject({
        ok: true,
        path: "/project/main.fc",
        origin: "user",
        language: "func",
    });
});
it("project file, relative import, tact", () => {
    const resolved = (0, resolveLibrary_1.resolveLibrary)({
        sourceFrom: mainSource,
        importPath: {
            path: (0, path_1.fromString)("./import.tact"),
            language: "tact",
            type: "relative",
        },
        project,
        stdlib,
    });
    expect(resolved).toMatchObject({
        ok: true,
        path: "/project/import.tact",
        origin: "user",
        language: "tact",
    });
});
it("stdlib file, relative import, tact", () => {
    const resolved = (0, resolveLibrary_1.resolveLibrary)({
        sourceFrom: stdlibSource,
        importPath: {
            path: (0, path_1.fromString)("./import.tact"),
            language: "tact",
            type: "relative",
        },
        project,
        stdlib,
    });
    expect(resolved).toMatchObject({
        ok: true,
        path: "@stdlib/libs/import.tact",
        origin: "stdlib",
        language: "tact",
    });
});
