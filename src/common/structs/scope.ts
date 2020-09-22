import { ResourceId } from "./doc";

/**
 * Types of 'creators'
 */
export type CreatorScopeT =
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
export interface CreatorScope {
  type: CreatorScopeT;
  id: ResourceId;
}
