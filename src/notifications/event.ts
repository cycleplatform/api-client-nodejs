import { ResourceId } from "../common/structs";

/**
 * The full structure of a websocket frame from
 * either channel.
 */
export interface Notification<T extends string> {
  topic: T;
  id: ResourceId;
  state?: string;
  error?: boolean;
  hub_id: ResourceId;
  environment_id: ResourceId;
  account_id: ResourceId;
}
