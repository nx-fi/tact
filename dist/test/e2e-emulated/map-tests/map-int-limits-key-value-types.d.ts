type FixedWidthFormat = "int" | "uint";
type VarWidthFormat = "varint" | "varuint";
type MapIntKeyDescription = {
    format: FixedWidthFormat;
    size: number;
} | {
    format: null;
};
type MapIntValDescription = MapIntKeyDescription | {
    format: VarWidthFormat;
    size: 16 | 32;
} | {
    format: "coins";
};
export declare const minInt: (descr: MapIntValDescription) => bigint;
export declare const maxInt: (descr: MapIntValDescription) => bigint;
export declare const descriptionToString: (descr: MapIntValDescription) => string;
export declare const intKeyFormats: MapIntKeyDescription[];
export declare const intValFormats: MapIntValDescription[];
export {};
