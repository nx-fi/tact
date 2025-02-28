"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("./path");
describe("fromString", () => {
    it("empty path", () => {
        expect((0, path_1.fromString)("")).toMatchObject({ stepsUp: 0, segments: [] });
    });
    it("empty path segments: .///foo", () => {
        expect((0, path_1.fromString)(".///foo")).toMatchObject({
            stepsUp: 0,
            segments: ["foo"],
        });
    });
    it("dot segments: /./foo", () => {
        expect((0, path_1.fromString)("/./foo")).toMatchObject({
            stepsUp: 0,
            segments: ["foo"],
        });
    });
    it("double dot segments: ../foo", () => {
        expect((0, path_1.fromString)("../foo")).toMatchObject({
            stepsUp: 1,
            segments: ["foo"],
        });
    });
    it("two double dot segments: ../../foo", () => {
        expect((0, path_1.fromString)("../../foo")).toMatchObject({
            stepsUp: 2,
            segments: ["foo"],
        });
    });
    it("removed part: ../foo/../bar", () => {
        expect((0, path_1.fromString)("../foo/../bar")).toMatchObject({
            stepsUp: 1,
            segments: ["bar"],
        });
    });
    it("removed parts: ../foo/../../bar", () => {
        expect((0, path_1.fromString)("../foo/../../bar")).toMatchObject({
            stepsUp: 2,
            segments: ["bar"],
        });
    });
});
describe("asString", () => {
    it("empty path", () => {
        expect((0, path_1.asString)((0, path_1.fromString)(""))).toBe("");
    });
    it("empty path segments: .///foo", () => {
        expect((0, path_1.asString)((0, path_1.fromString)(".///foo"))).toBe("foo");
    });
    it("dot segments: /./foo", () => {
        expect((0, path_1.asString)((0, path_1.fromString)("/./foo"))).toBe("foo");
    });
    it("double dot segments: ../foo", () => {
        expect((0, path_1.asString)((0, path_1.fromString)("../foo"))).toBe("../foo");
    });
    it("two double dot segments: ../../foo", () => {
        expect((0, path_1.asString)((0, path_1.fromString)("../../foo"))).toBe("../../foo");
    });
    it("removed part: ../foo/../bar", () => {
        expect((0, path_1.asString)((0, path_1.fromString)("../foo/../bar"))).toBe("../bar");
    });
    it("removed parts: ../foo/../../bar", () => {
        expect((0, path_1.asString)((0, path_1.fromString)("../foo/../../bar"))).toBe("../../bar");
    });
});
