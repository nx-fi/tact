export declare class Writer {
    private indent;
    private lines;
    inIndent: (handler: () => void) => void;
    inBlock: (beforeCurlyBrace: string, handler: () => void) => void;
    append(src?: string): void;
    write(src: string): void;
    end(): string;
}
