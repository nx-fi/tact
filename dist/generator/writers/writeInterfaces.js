"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeInterfaces = writeInterfaces;
const getSupportedInterfaces_1 = require("../../types/getSupportedInterfaces");
function writeInterfaces(type, ctx) {
    ctx.append(`_ supported_interfaces() method_id {`);
    ctx.inIndent(() => {
        ctx.append(`return (`);
        ctx.inIndent(() => {
            // Build interfaces list
            const interfaces = [];
            interfaces.push("org.ton.introspection.v0");
            interfaces.push(...(0, getSupportedInterfaces_1.getSupportedInterfaces)(type, ctx.ctx));
            // Render interfaces
            for (let i = 0; i < interfaces.length; i++) {
                ctx.append(`"${interfaces[i]}"H >> 128${i < interfaces.length - 1 ? "," : ""}`);
            }
        });
        ctx.append(`);`);
    });
    ctx.append(`}`);
    ctx.append();
}
