import { ResourceId } from "./Structs";

export interface QueryParams {
    include?: string[];
    meta?: string[];
    sort?: string[];
    filter?: { [key: string]: string };
    page?: {
        number: number;
        size: number;
    };
    // Override team from settings
    team?: ResourceId;
}

export function formatParams(q: QueryParams | undefined) {
    if (!q) {
        return "";
    }

    const result = {};
    function recurse(cur: any, prop: any) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
            result[prop] = cur.join(",");
        } else {
            let isEmpty = true;
            for (const p in cur) {
                if (!cur.hasOwnProperty(p)) { continue; }
                isEmpty = false;
                recurse(cur[p], prop ? prop + "[" + p + "]" : p);
            }
            if (isEmpty && prop) {
                result[prop] = {};
            }
        }
    }
    recurse(q, "");

    return Object.keys(result)
        .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(result[k]))
        .join("&");
}
