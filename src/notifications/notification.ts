import { ResourceId } from "../common/structs";

/**
 * The full structure of a websocket frame from
 * either channel.
 */
export interface Notification<T extends string> {
  topic: T;
  object: Object;
  context: Context;
}

export interface Object {
  id?: ResourceId;
  state?: string;
  error?: string;
}

export interface Context {
  hub_id: ResourceId | null;
  account_id: ResourceId | null;
  environments: ResourceId[];
  dns_zones: ResourceId[];
  clusters: string[];
  containers: ResourceId[];
}
