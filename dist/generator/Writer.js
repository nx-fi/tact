"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriterContext = void 0;
const text_1 = require("../utils/text");
const utils_1 = require("../utils/utils");
const Writer_1 = require("../utils/Writer");
const errors_1 = require("../error/errors");
class WriterContext {
    ctx;
    #name;
    #functions = new Map();
    #functionsRendering = new Set();
    #pendingWriter = null;
    #pendingCode = null;
    #pendingDepends = null;
    #pendingName = null;
    #pendingSignature = null;
    #pendingFlags = null;
    #pendingComment = null;
    #pendingContext = null;
    #nextId = 0;
    // #headers: string[] = [];
    #rendered = new Set();
    constructor(ctx, name) {
        this.ctx = ctx;
        this.#name = name;
    }
    get name() {
        return this.#name;
    }
    clone() {
        const res = new WriterContext(this.ctx, this.#name);
        res.#functions = new Map(this.#functions);
        res.#nextId = this.#nextId;
        // res.#headers = [...this.#headers];
        res.#rendered = new Set(this.#rendered);
        return res;
    }
    //
    // Rendering
    //
    extract(debug = false) {
        // Check dependencies
        const missing = new Map();
        for (const f of this.#functions.values()) {
            for (const d of f.depends) {
                if (!this.#functions.has(d)) {
                    if (!missing.has(d)) {
                        missing.set(d, [f.name]);
                    }
                    else {
                        missing.set(d, [...missing.get(d), f.name]);
                    }
                }
            }
        }
        if (missing.size > 0) {
            throw new errors_1.TactInternalCompilerError(`Functions ${Array.from(missing.keys())
                .map((v) => `"${v}"`)
                .join(", ")} wasn't processed and generated`);
        }
        // All functions
        let all = Array.from(this.#functions.values());
        // Remove unused
        if (!debug) {
            const used = new Set();
            const visit = (name) => {
                used.add(name);
                const f = this.#functions.get(name);
                for (const d of f.depends) {
                    visit(d);
                }
            };
            visit("$main");
            all = all.filter((v) => used.has(v.name));
        }
        // Sort functions
        const sorted = (0, utils_1.topologicalSort)(all, (f) => Array.from(f.depends).map((v) => this.#functions.get(v)));
        return sorted;
    }
    //
    // Declaration
    //
    skip(name) {
        this.fun(name, () => {
            this.signature("<unknown>");
            this.context("stdlib");
            this.#pendingCode = { kind: "skip" };
        });
    }
    fun(name, handler) {
        //
        // Duplicates check
        //
        if (this.#functions.has(name)) {
            throw new Error(`Function "${name}" already defined`); // Should not happen
        }
        if (this.#functionsRendering.has(name)) {
            throw new Error(`Function "${name}" already rendering`); // Should not happen
        }
        //
        // Nesting check
        //
        if (this.#pendingName) {
            const w = this.#pendingWriter;
            const d = this.#pendingDepends;
            const n = this.#pendingName;
            const s = this.#pendingSignature;
            const f = this.#pendingFlags;
            const c = this.#pendingCode;
            const cc = this.#pendingComment;
            const cs = this.#pendingContext;
            this.#pendingDepends = null;
            this.#pendingWriter = null;
            this.#pendingName = null;
            this.#pendingSignature = null;
            this.#pendingFlags = null;
            this.#pendingCode = null;
            this.#pendingComment = null;
            this.#pendingContext = null;
            this.fun(name, handler);
            this.#pendingSignature = s;
            this.#pendingDepends = d;
            this.#pendingWriter = w;
            this.#pendingName = n;
            this.#pendingFlags = f;
            this.#pendingCode = c;
            this.#pendingComment = cc;
            this.#pendingContext = cs;
            return;
        }
        // Write function
        this.#functionsRendering.add(name);
        this.#pendingWriter = null;
        this.#pendingDepends = new Set();
        this.#pendingName = name;
        this.#pendingSignature = null;
        this.#pendingFlags = new Set();
        this.#pendingCode = null;
        this.#pendingComment = null;
        this.#pendingContext = null;
        handler();
        const depends = this.#pendingDepends;
        const signature = this.#pendingSignature;
        const flags = this.#pendingFlags;
        const code = this.#pendingCode;
        const comment = this.#pendingComment;
        const context = this.#pendingContext;
        if (!signature && name !== "$main") {
            throw new Error(`Function "${name}" signature not set`);
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!code) {
            throw new Error(`Function "${name}" body not set`);
        }
        this.#pendingDepends = null;
        this.#pendingWriter = null;
        this.#pendingName = null;
        this.#pendingSignature = null;
        this.#pendingFlags = null;
        this.#functionsRendering.delete(name);
        this.#functions.set(name, {
            name,
            code,
            depends,
            signature,
            flags,
            comment,
            context,
        });
    }
    asm(shuffle, code) {
        if (this.#pendingName) {
            this.#pendingCode = {
                kind: "asm",
                shuffle,
                code,
            };
        }
        else {
            throw new Error(`ASM can be set only inside function`);
        }
    }
    body(handler) {
        if (this.#pendingWriter) {
            throw new Error(`Body can be set only once`);
        }
        this.#pendingWriter = new Writer_1.Writer();
        handler();
        this.#pendingCode = {
            kind: "generic",
            code: this.#pendingWriter.end(),
        };
    }
    main(handler) {
        this.fun("$main", () => {
            this.body(() => {
                handler();
            });
        });
    }
    signature(sig) {
        if (this.#pendingName) {
            this.#pendingSignature = sig;
        }
        else {
            throw new Error(`Signature can be set only inside function`);
        }
    }
    flag(flag) {
        if (this.#pendingName) {
            this.#pendingFlags.add(flag);
        }
        else {
            throw new Error(`Flag can be set only inside function`);
        }
    }
    used(name) {
        if (this.#pendingName !== name) {
            this.#pendingDepends.add(name);
        }
        return name;
    }
    comment(src) {
        if (this.#pendingName) {
            this.#pendingComment = (0, text_1.escapeUnicodeControlCodes)((0, text_1.trimIndent)(src));
        }
        else {
            throw new Error(`Comment can be set only inside function`);
        }
    }
    context(src) {
        if (this.#pendingName) {
            this.#pendingContext = src;
        }
        else {
            throw new Error(`Context can be set only inside function`);
        }
    }
    currentContext() {
        return this.#pendingName;
    }
    //
    // Writers
    //
    inIndent = (handler) => {
        this.#pendingWriter.inIndent(handler);
    };
    inBlock = (beforeCurlyBrace, handler) => {
        this.#pendingWriter.inBlock(beforeCurlyBrace, handler);
    };
    append(src = "") {
        this.#pendingWriter.append(src);
    }
    write(src = "") {
        this.#pendingWriter.write(src);
    }
    //
    // Headers
    //
    // header(src: string) {
    //     this.#headers.push(src);
    // }
    //
    // Utils
    //
    isRendered(key) {
        return this.#rendered.has(key);
    }
    markRendered(key) {
        if (this.#rendered.has(key)) {
            throw new Error(`Key "${key}" already rendered`);
        }
        this.#rendered.add(key);
    }
}
exports.WriterContext = WriterContext;
