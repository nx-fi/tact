"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isSubsetOf_1 = require("./isSubsetOf");
// Tests are adapted from:
// https://github.com/zloirock/core-js/blob/227a758ef96fa585a66cc1e89741e7d0bb696f48/tests/unit-global/es.set.is-subset-of.js
describe("isSubsetOf", () => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    let s1;
    let s2;
    it("should implement isSubsetOf correctly", () => {
        s1 = new Set([1]);
        s2 = new Set([1, 2, 3]);
        expect((0, isSubsetOf_1.isSubsetOf)(s1, s2)).toBe(true);
        s1 = new Set([1]);
        s2 = new Set([2, 3, 4]);
        expect((0, isSubsetOf_1.isSubsetOf)(s1, s2)).toBe(false);
        s1 = new Set([1, 2, 3]);
        s2 = new Set([5, 4, 3, 2, 1]);
        expect((0, isSubsetOf_1.isSubsetOf)(s1, s2)).toBe(true);
        s1 = new Set([1, 2, 3]);
        s2 = new Set([5, 4, 3, 2]);
        expect((0, isSubsetOf_1.isSubsetOf)(s1, s2)).toBe(false);
        s1 = new Set([1]);
        s2 = createSetLike([1, 2, 3]);
        expect((0, isSubsetOf_1.isSubsetOf)(s1, s2)).toBe(true);
        s1 = new Set([1]);
        s2 = createSetLike([2, 3, 4]);
        expect((0, isSubsetOf_1.isSubsetOf)(s1, s2)).toBe(false);
        s1 = new Set([1, 2, 3]);
        s2 = createSetLike([5, 4, 3, 2, 1]);
        expect((0, isSubsetOf_1.isSubsetOf)(s1, s2)).toBe(true);
        s1 = new Set([1, 2, 3]);
        s2 = createSetLike([5, 4, 3, 2]);
        expect((0, isSubsetOf_1.isSubsetOf)(s1, s2)).toBe(false);
        s1 = new Set([1, 2, 3]);
        s2 = new Set([1]);
        expect((0, isSubsetOf_1.isSubsetOf)(s1, s2)).toBe(false);
        s1 = new Set([1, 2, 3]);
        s2 = new Set();
        expect((0, isSubsetOf_1.isSubsetOf)(s1, s2)).toBe(false);
        s1 = new Set();
        s2 = new Set([1, 2, 3]);
        expect((0, isSubsetOf_1.isSubsetOf)(s1, s2)).toBe(true);
    });
});
// Helper functions are adapted from:
// https://github.com/zloirock/core-js/blob/227a758ef96fa585a66cc1e89741e7d0bb696f48/tests/helpers/helpers.js
function createSetLike(elements) {
    return {
        size: elements.length,
        has(value) {
            return includes(elements, value);
        },
        keys() {
            return createIterator(elements);
        },
    };
}
function includes(target, wanted) {
    return target.some((element) => element === wanted);
}
function createIterator(elements) {
    let index = 0;
    const iterator = {
        called: false,
        /* eslint-disable @typescript-eslint/no-explicit-any */
        next() {
            iterator.called = true;
            return {
                value: elements[index++],
                done: index > elements.length,
            };
        },
    };
    return iterator;
}
