import type { Project } from "../config/parseConfig";
type Result = Exited | Signaled;
type Exited = {
    kind: "exited";
    code: number;
    stdout: string;
    stderr: string;
};
type Signaled = {
    kind: "signaled";
    signal: NodeJS.Signals;
};
export declare const runCommand: (command: string, cwd?: string) => Promise<Result>;
export declare const makeCodegen: (outputDir: string) => {
    contract: (name: string, code: string) => Promise<string>;
    config: (name: string, code: string, partialConfig: Pick<Project, "options" | "mode">) => Promise<{
        config: string;
        outputPath: (ext: string) => string;
    }>;
};
export {};
