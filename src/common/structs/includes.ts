import { PublicAccount } from "../../resources/accounts";
import { ApiKeys } from "../../resources/projects";

/**
 * Count number of resource of state
 */
export type StatefulCounts<K extends string> = { [P in K]: number };

export interface OwnerInclude {
    accounts?: {
        [key: string]: PublicAccount;
    };
    api_keys?: {
        [key: string]: ApiKeys.ApiKey;
    };
    // employees
}
