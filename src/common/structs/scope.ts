import { ResourceId } from "./doc";

/**
 * Types of 'creators'
 */
export type UserScopeT =
  | "account"
  | "environment"
  | "platform"
  | "platform-pipeline"
  | "employee"
  | "api-key"
  | "visitor";

/**
 * The creator scope is embedded in resource objects
 * to describe who created them
 */
export interface UserScope {
  type: UserScopeT;
  id: ResourceId;
}
