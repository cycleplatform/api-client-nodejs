import { ResourceId } from "../common/structs";

/**
 * The full structure of a websocket frame from
 * either channel.
 *
 * @param topic Either a hub or account topic which can be seen in ./account.ts or ./hub.ts
 * @param object an object containing the resource id of the corresponding topic, its state, and any errors
 * @param context an object containing several different contexts, which hub or account the notification corresponds to, environment, etc.
 * @param flags Internal usage.
 */
export interface Notification<T extends string> {
  topic: T;
  object: Object;
  context: Context;
  flags?: Flags[];
}

export interface Object {
  id: ResourceId;
  state?: string;
  error?: string;
}

export interface Context {
  hub_id: ResourceId | null;
  account_id: ResourceId | null;
  environments: ResourceId[] | null;
  dns_zones: ResourceId[] | null;
  clusters: string[] | null;
  containers: ResourceId[] | null;
}

type Flags = Record<string, boolean>;
