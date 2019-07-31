import { PublicAccount } from "resources/accounts";
import { ApiKeys } from "resources/hubs";

/** Count number of resource of state */
export interface StatefulCounts<K extends string> {
  state: Record<K, number>;
  total: number;
  available: number;
}

/** An owner is an identity that created a resource. */
export interface OwnerInclude {
  accounts?: {
    [key: string]: PublicAccount;
  };
  api_keys?: {
    [key: string]: ApiKeys.ApiKey;
  };
  employees?: {
    [key: string]: PublicAccount;
  };
  visitors?: {
    [key: string]: PublicAccount;
  };
}
