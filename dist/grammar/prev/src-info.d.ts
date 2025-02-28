import type { Interval } from "ohm-js";
import type { SrcInfo } from "../src-info";
import type { ItemOrigin } from "../../imports/source";
/**
 * @deprecated
 */
export declare const getSrcInfoFromOhm: ({ sourceString, startIdx, endIdx }: Interval, file: string | null, origin: ItemOrigin) => SrcInfo;
