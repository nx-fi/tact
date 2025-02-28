"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolveDescriptors_1 = require("./resolveDescriptors");
const loadCases_1 = require("../utils/loadCases");
const store_1 = require("../context/store");
const resolveStatements_1 = require("./resolveStatements");
const context_1 = require("../context/context");
const features_1 = require("../config/features");
const grammar_1 = require("../grammar");
const ast_helpers_1 = require("../ast/ast-helpers");
const grammar_2 = require("../grammar/grammar");
const effects_1 = require("./effects");
describe("effects", () => {
    for (const testContract of (0, loadCases_1.loadCases)(__dirname + "/effects/")) {
        it(`should correctly compute effects: ${testContract.name}`, () => {
            const Ast = (0, ast_helpers_1.getAstFactory)();
            let ctx = (0, store_1.openContext)(new context_1.CompilerContext(), [
                {
                    code: testContract.code,
                    path: "<unknown>",
                    origin: "user",
                },
            ], [], (0, grammar_1.getParser)(Ast, grammar_2.defaultParser));
            ctx = (0, features_1.featureEnable)(ctx, "external");
            ctx = (0, resolveDescriptors_1.resolveDescriptors)(ctx, Ast);
            ctx = (0, resolveStatements_1.resolveStatements)(ctx, Ast);
            (0, effects_1.computeReceiversEffects)(ctx);
            const receiverEffects = (0, resolveDescriptors_1.getAllTypes)(ctx)
                .filter((type) => type.kind === "contract")
                .map((contract) => {
                return {
                    contract: contract.name,
                    receivers: contract.receivers.map((receiver) => {
                        return {
                            ...receiver.selector,
                            effects: receiver.effects,
                        };
                    }),
                };
            });
            expect(receiverEffects).toMatchSnapshot();
        });
    }
});
