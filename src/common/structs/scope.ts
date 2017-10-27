import { ResourceId } from "./doc";

export type UserScopeType = "account" | "employee" | "api-key" | "visitor";

export interface UserScope {
    type: UserScopeType;
    id: ResourceId;
}
