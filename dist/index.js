"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVirtualFileSystem = exports.TactConstEvalError = exports.TactInternalCompilerError = exports.TactCompilationError = exports.TactError = exports.precompile = exports.build = exports.enableFeatures = void 0;
var build_1 = require("./pipeline/build");
Object.defineProperty(exports, "enableFeatures", { enumerable: true, get: function () { return build_1.enableFeatures; } });
Object.defineProperty(exports, "build", { enumerable: true, get: function () { return build_1.build; } });
var precompile_1 = require("./pipeline/precompile");
Object.defineProperty(exports, "precompile", { enumerable: true, get: function () { return precompile_1.precompile; } });
var errors_1 = require("./error/errors");
Object.defineProperty(exports, "TactError", { enumerable: true, get: function () { return errors_1.TactError; } });
Object.defineProperty(exports, "TactCompilationError", { enumerable: true, get: function () { return errors_1.TactCompilationError; } });
Object.defineProperty(exports, "TactInternalCompilerError", { enumerable: true, get: function () { return errors_1.TactInternalCompilerError; } });
Object.defineProperty(exports, "TactConstEvalError", { enumerable: true, get: function () { return errors_1.TactConstEvalError; } });
__exportStar(require("./config/parseConfig"), exports);
var createVirtualFileSystem_1 = require("./vfs/createVirtualFileSystem");
Object.defineProperty(exports, "createVirtualFileSystem", { enumerable: true, get: function () { return createVirtualFileSystem_1.createVirtualFileSystem; } });
__exportStar(require("./browser"), exports);
__exportStar(require("./context/logger"), exports);
__exportStar(require("./error/errors"), exports);
