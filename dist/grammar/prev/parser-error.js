"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parserErrorSchema = void 0;
const errors_1 = require("../../error/errors");
const parser_error_1 = require("../parser-error");
const src_info_1 = require("./src-info");
/**
 * @deprecated
 */
const parserErrorSchema = (display) => ({
    ...(0, parser_error_1.syntaxErrorSchema)(display, (message) => (source) => {
        throw new errors_1.TactCompilationError(display.at(source, message), source);
    }),
    generic: (matchResult, path, origin) => {
        const interval = matchResult.getInterval();
        const source = (0, src_info_1.getSrcInfoFromOhm)(interval, path, origin);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const message = `Expected ${matchResult.getExpectedText()}\n`;
        throw new errors_1.TactCompilationError(display.at(source, message), source);
    },
});
exports.parserErrorSchema = parserErrorSchema;
