import { PublicAccount } from "../../resources/accounts";
import { ApiKeys } from "../../resources/projects";

/**
 * Count number of resource of state
 */
export interface StatefulCounts<K extends string> {
    state: { [P in K]: number };
    total: number;
    available: number;
}

export interface OwnerInclude {
    accounts?: {
        [key: string]: PublicAccount;
    };
    api_keys?: {
        [key: string]: ApiKeys.ApiKey;
    };
    // employees
}
