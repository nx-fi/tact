"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
const errors_1 = require("../error/errors");
const colors_1 = require("./colors");
const logger_1 = require("./logger");
const win32_1 = __importDefault(require("path/win32"));
const posix_1 = __importDefault(require("path/posix"));
const catchProcessExit = (fn) => {
    const exitSpy = jest.spyOn(process, "exit").mockImplementation((code) => {
        throw new Error(`process.exit called with code ${code}`);
    });
    let result = null;
    let caughtError = null;
    try {
        result = fn();
    }
    catch (error) {
        caughtError = error;
    }
    exitSpy.mockRestore();
    if (caughtError) {
        return caughtError.message.includes("process.exit called")
            ? caughtError.message
            : "Unknown error";
    }
    return result;
};
const os = [
    ["Windows", win32_1.default],
    ["POSIX", posix_1.default],
];
describe.each(os)("TerminalLogger %s", (_, pathApi) => {
    const ansi = (0, colors_1.getAnsiMarkup)(false);
    test("only first error without error recovery", () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        const result = catchProcessExit(() => {
            return (0, logger_1.TerminalLogger)(pathApi, "info", ansi, (log) => {
                log.error(log.text `Error 1`);
                log.error(log.text `Error 2`);
            });
        });
        expect(result).toMatchSnapshot();
        expect(logSpy.mock.calls).toMatchSnapshot();
        logSpy.mockRestore();
    });
    test("all info logs are logged", () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        const result = catchProcessExit(() => {
            return (0, logger_1.TerminalLogger)(pathApi, "info", ansi, (log) => {
                log.info(log.text `Info 1`);
                log.info(log.text `Info 2`);
            });
        });
        expect(result).toMatchSnapshot();
        expect(logSpy.mock.calls).toMatchSnapshot();
        logSpy.mockRestore();
    });
    test("warn verbosity does not show info", () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        const result = catchProcessExit(() => {
            return (0, logger_1.TerminalLogger)(pathApi, "warn", ansi, (log) => {
                log.warn(log.text `Warn`);
                log.info(log.text `Info`);
            });
        });
        expect(result).toMatchSnapshot();
        expect(logSpy.mock.calls).toMatchSnapshot();
        logSpy.mockRestore();
    });
    test("path is resolved relative to cwd", () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        const cwdSpy = jest.spyOn(process, "cwd").mockReturnValue("/foo");
        const result = catchProcessExit(() => {
            return (0, logger_1.TerminalLogger)(pathApi, "info", ansi, (log) => {
                log.error(log.text `See ${log.path("/foo/bar")}.`);
            });
        });
        expect(result).toMatchSnapshot();
        expect(logSpy.mock.calls).toMatchSnapshot();
        cwdSpy.mockRestore();
        logSpy.mockRestore();
    });
    test("raw internal error", () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        const result = catchProcessExit(() => {
            return (0, logger_1.TerminalLogger)(pathApi, "info", ansi, (_log) => {
                (0, errors_1.throwInternal)(`OMG`);
            });
        });
        expect(result).toMatchSnapshot();
        expect(logSpy.mock.calls).toMatchSnapshot();
        logSpy.mockRestore();
    });
    test("logger internal error", () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        const result = catchProcessExit(() => {
            return (0, logger_1.TerminalLogger)(pathApi, "info", ansi, (log) => {
                log.internal(log.text `OMG`);
            });
        });
        expect(result).toMatchSnapshot();
        expect(logSpy.mock.calls).toMatchSnapshot();
        logSpy.mockRestore();
    });
    test("raw internal error in source", () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        const cwdSpy = jest.spyOn(process, "cwd").mockReturnValue("/foo");
        const result = catchProcessExit(() => {
            return (0, logger_1.TerminalLogger)(pathApi, "info", ansi, (log) => {
                log.source("/foo/bar", "Hello, world", () => {
                    (0, errors_1.throwInternal)(`OMG`);
                });
            });
        });
        expect(result).toMatchSnapshot();
        expect(logSpy.mock.calls).toMatchSnapshot();
        cwdSpy.mockRestore();
        logSpy.mockRestore();
    });
    test("logger internal error in source", () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        const cwdSpy = jest.spyOn(process, "cwd").mockReturnValue("/foo");
        const result = catchProcessExit(() => {
            return (0, logger_1.TerminalLogger)(pathApi, "info", ansi, (log) => {
                log.source("/foo/bar", "Hello, world", (log) => {
                    log.internal(log.text `OMG`);
                    log.info(log.text `Impossible`);
                });
            });
        });
        expect(result).toMatchSnapshot();
        expect(logSpy.mock.calls).toMatchSnapshot();
        cwdSpy.mockRestore();
        logSpy.mockRestore();
    });
    test("internal error in source at range", () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        const cwdSpy = jest.spyOn(process, "cwd").mockReturnValue("/foo");
        const result = catchProcessExit(() => {
            return (0, logger_1.TerminalLogger)(pathApi, "info", ansi, (log) => {
                log.source("/foo/bar", "Hello, world", (log) => {
                    log.at({ start: 3, end: 5 }).internal(log.text `OMG`);
                    log.info(log.text `Impossible`);
                });
            });
        });
        expect(result).toMatchSnapshot();
        expect(logSpy.mock.calls).toMatchSnapshot();
        cwdSpy.mockRestore();
        logSpy.mockRestore();
    });
    test("uncaught error", () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        const result = catchProcessExit(() => {
            return (0, logger_1.TerminalLogger)(pathApi, "info", ansi, () => {
                throw new Error("Uncaught!");
            });
        });
        expect(result).toMatchSnapshot();
        expect(logSpy.mock.calls).toMatchSnapshot();
        logSpy.mockRestore();
    });
    test("uncaught error in source", () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        const cwdSpy = jest.spyOn(process, "cwd").mockReturnValue("/foo");
        const result = catchProcessExit(() => {
            return (0, logger_1.TerminalLogger)(pathApi, "info", ansi, (log) => {
                return log.source("/foo/bar", "Hello, world", () => {
                    throw new Error("hehe");
                });
            });
        });
        expect(result).toMatchSnapshot();
        expect(logSpy.mock.calls).toMatchSnapshot();
        cwdSpy.mockRestore();
        logSpy.mockRestore();
    });
    test("multiple errors", () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        const result = catchProcessExit(() => {
            return (0, logger_1.TerminalLogger)(pathApi, "info", ansi, (log) => {
                log.recover((log) => {
                    log.error(log.text `foo`);
                    log.error(log.text `bar`);
                });
            });
        });
        expect(result).toMatchSnapshot();
        expect(logSpy.mock.calls).toMatchSnapshot();
        logSpy.mockRestore();
    });
    test("exit on error", () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        const result = catchProcessExit(() => {
            return (0, logger_1.TerminalLogger)(pathApi, "info", ansi, (log) => {
                log.recover((log) => {
                    log.error(log.text `foo`);
                    log.error(log.text `bar`);
                    log.exitIfErrored();
                });
                log.error(log.text `impossible`);
            });
        });
        expect(result).toMatchSnapshot();
        expect(logSpy.mock.calls).toMatchSnapshot();
        logSpy.mockRestore();
    });
    test("multiple errors inside source", () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        const cwdSpy = jest.spyOn(process, "cwd").mockReturnValue("/foo");
        const result = catchProcessExit(() => {
            return (0, logger_1.TerminalLogger)(pathApi, "info", ansi, (log) => {
                log.source("/foo/bar", "Hello, world", (log) => {
                    log.recover((log) => {
                        log.at({ start: 3, end: 5 }).error(log.text `foo`);
                        log.error(log.text `bar`);
                        log.exitIfErrored();
                    });
                    log.error(log.text `impossible`);
                });
            });
        });
        expect(result).toMatchSnapshot();
        expect(logSpy.mock.calls).toMatchSnapshot();
        cwdSpy.mockRestore();
        logSpy.mockRestore();
    });
    test("source inside multiple errors", () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        const cwdSpy = jest.spyOn(process, "cwd").mockReturnValue("/foo");
        const result = catchProcessExit(() => {
            return (0, logger_1.TerminalLogger)(pathApi, "info", ansi, (log) => {
                log.recover((log) => {
                    log.source("/foo/bar", "Hello, world", (log) => {
                        log.at({ start: 3, end: 5 }).error(log.text `foo`);
                        log.error(log.text `bar`);
                        log.exitIfErrored();
                    });
                    log.error(log.text `impossible`);
                });
            });
        });
        expect(result).toMatchSnapshot();
        expect(logSpy.mock.calls).toMatchSnapshot();
        cwdSpy.mockRestore();
        logSpy.mockRestore();
    });
    test("typed errors", () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        const cwdSpy = jest.spyOn(process, "cwd").mockReturnValue("/foo");
        const fooBarSchema = (l) => ({
            fooError: () => l.error(l.text `Foo!`),
            barError: () => l.error(l.text `Bar!`),
        });
        const result = catchProcessExit(() => {
            return (0, logger_1.TerminalLogger)(pathApi, "info", ansi, (log) => {
                log.recover((log) => {
                    const l = fooBarSchema(log);
                    l.fooError();
                    l.barError();
                });
            });
        });
        expect(result).toMatchSnapshot();
        expect(logSpy.mock.calls).toMatchSnapshot();
        cwdSpy.mockRestore();
        logSpy.mockRestore();
    });
    test("typed errors for source", () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        const cwdSpy = jest.spyOn(process, "cwd").mockReturnValue("/foo");
        const fooBarSchemaSrc = (l) => ({
            fooError: (at) => l.at(at).error(l.text `Foo!`),
            barError: () => l.error(l.text `Bar!`),
        });
        const result = catchProcessExit(() => {
            return (0, logger_1.TerminalLogger)(pathApi, "info", ansi, (log) => {
                log.source("/foo/bar", "Hello, world", (log) => {
                    log.recover((log) => {
                        const l = fooBarSchemaSrc(log);
                        l.fooError({ start: 3, end: 5 });
                        l.barError();
                    });
                });
            });
        });
        expect(result).toMatchSnapshot();
        expect(logSpy.mock.calls).toMatchSnapshot();
        cwdSpy.mockRestore();
        logSpy.mockRestore();
    });
});
