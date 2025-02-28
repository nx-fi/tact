"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ton/core");
const sandbox_1 = require("@ton/sandbox");
const serialization_3_SerializationTester3_1 = require("./contracts/output/serialization-3_SerializationTester3");
const serialization_2_SerializationTester2_1 = require("./contracts/output/serialization-2_SerializationTester2");
const serialization_SerializationTester_1 = require("./contracts/output/serialization_SerializationTester");
require("@ton/test-utils");
describe("serialization", () => {
    let blockchain;
    let treasure;
    beforeEach(async () => {
        blockchain = await sandbox_1.Blockchain.create();
        blockchain.verbosity.print = false;
        treasure = await blockchain.treasury("treasure");
    });
    //
    // Simple case
    //
    {
        const cases = [];
        cases.push({
            a: 1n,
            b: 2n,
            c: 3n,
            d: 4n,
            e: 5n,
            f: 6n,
            g: 7n,
            h: 8n,
            i: 9n,
        });
        for (let i = 0; i < cases.length; i++) {
            it("should handle case #" + i, async () => {
                const cs = cases[i];
                // Init contract
                const contract = blockchain.openContract(await serialization_SerializationTester_1.SerializationTester.fromInit(cs.a, cs.b, cs.c, cs.d, cs.e, cs.f, cs.g, cs.h, cs.i));
                const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
                expect(deployResult.transactions).toHaveTransaction({
                    from: treasure.address,
                    to: contract.address,
                    success: true,
                    deploy: true,
                });
                // Check inputs
                expect(await contract.getGetA()).toBe(cs.a);
                expect(await contract.getGetB()).toBe(cs.b);
                expect(await contract.getGetC()).toBe(cs.c);
                expect(await contract.getGetD()).toBe(cs.d);
                expect(await contract.getGetE()).toBe(cs.e);
                expect(await contract.getGetF()).toBe(cs.f);
                expect(await contract.getGetG()).toBe(cs.g);
                expect(await contract.getGetH()).toBe(cs.h);
                expect(await contract.getGetI()).toBe(cs.i);
            });
        }
    }
    //
    // Cases with references
    //
    {
        const cases = [];
        cases.push({
            a: {
                $$type: "Vars",
                a: 1n,
                b: 2n,
                c: 3n,
                d: 4n,
                e: 5n,
            },
            b: {
                $$type: "Vars",
                a: 6n,
                b: 7n,
                c: 8n,
                d: 9n,
                e: 10n,
            },
        });
        for (let i = 0; i < cases.length; i++) {
            it("should handle case-2 #" + i, async () => {
                const cs = cases[i];
                // Init contract
                const contract = blockchain.openContract(await serialization_2_SerializationTester2_1.SerializationTester2.fromInit(cs.a, cs.b));
                const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
                expect(deployResult.transactions).toHaveTransaction({
                    from: treasure.address,
                    to: contract.address,
                    success: true,
                    deploy: true,
                });
                // Check values
                const a = await contract.getGetA();
                const aOpt = await contract.getGetAOpt();
                const b = await contract.getGetB();
                const bOpt = await contract.getGetBOpt();
                const both = await contract.getGetBoth();
                expect(aOpt).toMatchObject(a);
                expect(bOpt).toMatchObject(b);
                expect(a.a).toBe(cs.a.a);
                expect(a.b).toBe(cs.a.b);
                expect(a.c).toBe(cs.a.c);
                expect(a.d).toBe(cs.a.d);
                expect(a.e).toBe(cs.a.e);
                expect(b.a).toBe(cs.b.a);
                expect(b.b).toBe(cs.b.b);
                expect(b.c).toBe(cs.b.c);
                expect(b.d).toBe(cs.b.d);
                expect(b.e).toBe(cs.b.e);
                expect(both.a.a).toBe(cs.a.a);
                expect(both.a.b).toBe(cs.a.b);
                expect(both.a.c).toBe(cs.a.c);
                expect(both.a.d).toBe(cs.a.d);
                expect(both.a.e).toBe(cs.a.e);
                expect(both.b.a).toBe(cs.b.a);
                expect(both.b.b).toBe(cs.b.b);
                expect(both.b.c).toBe(cs.b.c);
                expect(both.b.d).toBe(cs.b.d);
                expect(both.b.e).toBe(cs.b.e);
            });
        }
    }
    it("serialization-3", async () => {
        // Init contract
        const contract = blockchain.openContract(await serialization_3_SerializationTester3_1.SerializationTester3.fromInit(1n, true, (0, core_1.beginCell)().endCell(), (0, core_1.beginCell)().endCell().asSlice(), (0, core_1.beginCell)().endCell().asBuilder(), "test"));
        const deployResult = await contract.send(treasure.getSender(), { value: (0, core_1.toNano)("10") }, null);
        expect(deployResult.transactions).toHaveTransaction({
            from: treasure.address,
            to: contract.address,
            success: true,
            deploy: true,
        });
        // Check values
        expect(await contract.getGetA()).toBe(1n);
        expect(await contract.getGetB()).toBe(true);
        expect(await contract.getGetC()).toBeInstanceOf(core_1.Cell);
        expect(await contract.getGetD()).toBeInstanceOf(core_1.Slice);
        expect(await contract.getGetE()).toBeInstanceOf(core_1.Builder);
        expect(await contract.getGetF()).toBe("test");
    });
});
