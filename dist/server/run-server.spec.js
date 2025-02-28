"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../error/errors");
const run_server_1 = require("./run-server");
describe("runServer", () => {
    test("only first error without error recovery", () => {
        const result = (0, run_server_1.runServer)((log) => {
            log.error(log.text `Error 1`);
            log.error(log.text `Error 2`);
        });
        expect(result).toMatchSnapshot();
    });
    test("all info logs are logged", () => {
        const result = (0, run_server_1.runServer)((log) => {
            log.info(log.text `Info 1`);
            log.info(log.text `Info 2`);
        });
        expect(result).toMatchSnapshot();
    });
    test("raw internal error", () => {
        const result = (0, run_server_1.runServer)((_log) => {
            (0, errors_1.throwInternal)(`OMG`);
        });
        expect(result).toMatchSnapshot();
    });
    test("logger internal error", () => {
        const result = (0, run_server_1.runServer)((log) => {
            log.internal(log.text `OMG`);
        });
        expect(result).toMatchSnapshot();
    });
    test("raw internal error in source", () => {
        const result = (0, run_server_1.runServer)((log) => {
            log.source("/foo/bar", "Hello, world", () => {
                (0, errors_1.throwInternal)(`OMG`);
            });
        });
        expect(result).toMatchSnapshot();
    });
    test("logger internal error in source", () => {
        const result = (0, run_server_1.runServer)((log) => {
            log.source("/foo/bar", "Hello, world", (log) => {
                log.internal(log.text `OMG`);
                log.info(log.text `Impossible`);
            });
        });
        expect(result).toMatchSnapshot();
    });
    test("internal error in source at range", () => {
        const result = (0, run_server_1.runServer)((log) => {
            log.source("/foo/bar", "Hello, world", (log) => {
                log.at({ start: 3, end: 5 }).internal(log.text `OMG`);
                log.info(log.text `Impossible`);
            });
        });
        expect(result).toMatchSnapshot();
    });
    test("uncaught error", () => {
        const result = (0, run_server_1.runServer)(() => {
            throw new Error("Uncaught!");
        });
        expect(result).toMatchSnapshot();
    });
    test("uncaught error in source", () => {
        const result = (0, run_server_1.runServer)((log) => {
            return log.source("/foo/bar", "Hello, world", () => {
                throw new Error("hehe");
            });
        });
        expect(result).toMatchSnapshot();
    });
    test("multiple errors", () => {
        const result = (0, run_server_1.runServer)((log) => {
            log.recover((log) => {
                log.error(log.text `foo`);
                log.error(log.text `bar`);
            });
        });
        expect(result).toMatchSnapshot();
    });
    test("exit on error", () => {
        const result = (0, run_server_1.runServer)((log) => {
            log.recover((log) => {
                log.error(log.text `foo`);
                log.error(log.text `bar`);
                log.exitIfErrored();
            });
            log.error(log.text `impossible`);
        });
        expect(result).toMatchSnapshot();
    });
    test("multiple errors inside source", () => {
        const result = (0, run_server_1.runServer)((log) => {
            log.source("/foo/bar", "Hello, world", (log) => {
                log.recover((log) => {
                    log.at({ start: 3, end: 5 }).error(log.text `foo`);
                    log.error(log.text `bar`);
                    log.exitIfErrored();
                });
                log.error(log.text `impossible`);
            });
        });
        expect(result).toMatchSnapshot();
    });
    test("source inside multiple errors", () => {
        const result = (0, run_server_1.runServer)((log) => {
            log.recover((log) => {
                log.source("/foo/bar", "Hello, world", (log) => {
                    log.at({ start: 3, end: 5 }).error(log.text `foo`);
                    log.error(log.text `bar`);
                    log.exitIfErrored();
                });
                log.error(log.text `impossible`);
            });
        });
        expect(result).toMatchSnapshot();
    });
    test("typed errors", () => {
        const fooBarSchema = (l) => ({
            fooError: () => l.error(l.text `Foo!`),
            barError: () => l.error(l.text `Bar!`),
        });
        const result = (0, run_server_1.runServer)((log) => {
            log.recover((log) => {
                const l = fooBarSchema(log);
                l.fooError();
                l.barError();
            });
        });
        expect(result).toMatchSnapshot();
    });
    test("typed errors for source", () => {
        const fooBarSchemaSrc = (l) => ({
            fooError: (at) => l.at(at).error(l.text `Foo!`),
            barError: () => l.error(l.text `Bar!`),
        });
        const result = (0, run_server_1.runServer)((log) => {
            log.source("/foo/bar", "Hello, world", (log) => {
                log.recover((log) => {
                    const l = fooBarSchemaSrc(log);
                    l.fooError({ start: 3, end: 5 });
                    l.barError();
                });
            });
        });
        expect(result).toMatchSnapshot();
    });
});
