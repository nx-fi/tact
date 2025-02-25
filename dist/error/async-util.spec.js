"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async_util_1 = require("./async-util");
describe("catchUncolored", () => {
    it("should return the result of a synchronous function when it does not throw an error", () => {
        const result = (0, async_util_1.catchUncolored)(() => 1, () => {
            throw new Error("Rethrow");
        });
        expect(result).toBe(1);
    });
    it("should call onError callback when the synchronous function throws an error", () => {
        const onError = jest.fn(() => "Handled");
        const result = (0, async_util_1.catchUncolored)(() => {
            throw new Error("Test Error");
        }, onError);
        expect(result).toBe("Handled");
        expect(onError).toHaveBeenCalledWith(expect.any(Error));
    });
    it("should return the result of an asynchronous function", async () => {
        const result = await (0, async_util_1.catchUncolored)(() => Promise.resolve(3), () => {
            throw new Error("Rethrow");
        });
        expect(result).toBe(3);
    });
    it("should handle error in asynchronous function and return result from synchronous onError", async () => {
        const onError = jest.fn(() => "Handled");
        // eslint-disable-next-line @typescript-eslint/require-await
        const result = await (0, async_util_1.catchUncolored)(async () => {
            throw new Error("Async Error");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }, onError);
        expect(result).toBe("Handled");
        expect(onError).toHaveBeenCalledWith(expect.any(Error));
    });
    it("should handle error in asynchronous function and return result from asynchronous onError", async () => {
        // eslint-disable-next-line @typescript-eslint/require-await
        const onError = jest.fn(async () => "Handled");
        // eslint-disable-next-line @typescript-eslint/require-await
        const result = await (0, async_util_1.catchUncolored)(async () => {
            throw new Error("Async Error");
        }, onError);
        expect(result).toBe("Handled");
        expect(onError).toHaveBeenCalledWith(expect.any(Error));
    });
    it("should return result from synchronous onError when async function throws an error", async () => {
        const onError = jest.fn(() => "Handled");
        // eslint-disable-next-line @typescript-eslint/require-await
        const result = await (0, async_util_1.catchUncolored)(async () => {
            throw new Error("Async Error");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }, onError);
        expect(result).toBe("Handled");
        expect(onError).toHaveBeenCalledWith(expect.any(Error));
    });
    it("should return result from asynchronous onError when async function throws an error", async () => {
        // eslint-disable-next-line @typescript-eslint/require-await
        const onError = jest.fn(async () => "Handled");
        // eslint-disable-next-line @typescript-eslint/require-await
        const result = await (0, async_util_1.catchUncolored)(async () => {
            throw new Error("Async Error");
        }, onError);
        expect(result).toBe("Handled");
        expect(onError).toHaveBeenCalledWith(expect.any(Error));
    });
});
describe("thenUncolored", () => {
    it("should return the result of a synchronous function when function is passed", () => {
        const result = (0, async_util_1.thenUncolored)(3, () => 2);
        expect(result).toBe(2);
    });
    it("should return a Promise that resolves to the result when a Promise is passed", async () => {
        const result = (0, async_util_1.thenUncolored)(Promise.resolve(5), () => 2);
        await expect(result).resolves.toBe(2);
    });
});
