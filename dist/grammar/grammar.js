"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParser = exports.defaultParser = void 0;
const next_1 = require("./next");
const grammar_1 = require("./prev/grammar");
exports.defaultParser = "new";
const getParser = (ast, version) => {
    if (version === "new") {
        return (0, next_1.getParser)(ast);
    }
    else {
        return (0, grammar_1.getParser)(ast);
    }
};
exports.getParser = getParser;
