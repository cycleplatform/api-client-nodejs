import { ResourceId } from "./doc";

/**
 * Types of 'creators'
 */
export type UserScopeT =
  | "account"
  | "employee"
  | "api-key"
  | "environment"
  | "visitor"
  | "platform";

/**
 * The creator scope is embedded in resource objects
 * to describe who created them
 */
export interface UserScope {
  type: UserScopeT;
  id: ResourceId;
}
