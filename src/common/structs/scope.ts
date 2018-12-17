import { ResourceId } from "./doc";

/**
 * Types of 'owners'
 */
export type OwnerScopeType =
  | "account"
  | "employee"
  | "api-key"
  | "environment"
  | "visitor"
  | "platform";

/**
 * The owner scope is embedded in resource objects
 * to describe who created them
 */
export interface OwnerScope {
  type: OwnerScopeType;
  id: ResourceId;
}
