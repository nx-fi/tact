"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSrcInfoFromOhm = void 0;
const src_info_1 = require("../src-info");
/**
 * @deprecated
 */
const getSrcInfoFromOhm = ({ sourceString, startIdx, endIdx }, file, origin) => {
    return (0, src_info_1.getSrcInfo)(sourceString, startIdx, endIdx, file, origin);
};
exports.getSrcInfoFromOhm = getSrcInfoFromOhm;
