import { ResourceId } from "../common/structs";

/**
 * The full structure of a websocket frame from
 * either channel.
 */
export interface Notification<T extends string> {
  header: T;
  id: ResourceId;
  state?: string;
  error?: boolean;
  project_id: ResourceId;
  environment_id: ResourceId;
  account_id: ResourceId;
}
