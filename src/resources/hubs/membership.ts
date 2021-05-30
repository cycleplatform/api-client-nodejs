import * as Request from "../../common/api/request";
import { QueryParams, links, StandardParams } from "../../common/api";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  Events,
  State,
  ResourceId,
} from "../../common/structs";
import { PublicAccount } from "../accounts/account";
import { Hub } from "./hub";
import { Capability } from "./capability";
import { RoleName } from "./invite";

export type Collection = CollectionDoc<Membership, MembershipIncludes>;
export type Single = SingleDoc<Membership, MembershipIncludes>;
/**
 * Possible states of a membership
 */
export type MembershipState =
  | "pending"
  | "accepted"
  | "declined"
  | "revoked"
  | "deleted";
/**
 * Notable membership events
 */
export type MembershipEvent = "joined";
/**
 * Notable invitation events
 */
export type InvitationEvent = "accepted" | "declined" | "revoked";
export type MembershipQuery = QueryParams<
  keyof MembershipIncludes,
  keyof MembershipMeta
>;

/**
 * Membership role information
 */
export enum Role {
  OWNER = 1 << 0,
  ADMIN = 1 << 1,
  DEVELOPER = 1 << 2,
  ANALYST = 1 << 3,
  DEFAULT = 0,
}

/**
 * An extended resource including information on a hub membership
 */
export interface Membership extends Resource<MembershipMeta> {
  account_id: ResourceId;
  hub_id: ResourceId;
  role: Role;
  events: Events<MembershipEvent>;
  state: State<MembershipState>;
  invitation: Invitation;
  permissions: MembershipPermissions;
  preferences: Preferences;
  cycle?: Cycle;
  agency?: Agency;
}

export interface MembershipMeta {
  capabilities: Capability[];
}

export interface Preferences {
  notifications: NotificationPreferences;
}

export interface NotificationPreferences {
  api_keys: boolean;
}

export interface Cycle {
  employee_id: ResourceId;
}

export interface Agency {
  id: ResourceId;
}

export interface MembershipIncludes {
  senders: Record<ResourceId, PublicAccount>;
  hubs: Record<ResourceId, Hub>;
  accounts: Record<ResourceId, PublicAccount>;
}

export interface Cycle {}

/**
 * Information on the memberships access to the hubs environments
 */
export interface MembershipPermissions {
  /** A boolean, where true indicates that the membership has access to all environments in the hub */
  all_environments: boolean;
  /** An array of membership environment configurations */
  environments: MembershipEnvironment[];
}

/**
 * Per environment information describing the memberships access level
 */
export interface MembershipEnvironment {
  id: ResourceId;
  /** A boolean, where true indicates this environment can be managed by the membership */
  manage: boolean;
}

/**
 * Information for a hub membership invitation
 */
export interface Invitation {
  /** The sending accounts ID and type */
  sender: {
    id: ResourceId;
    /** The account type */
    type: string;
  };
  /** The receiving account email of the invitation */
  recipient: string;
  events: Events<InvitationEvent>;
}

export async function getCollection(params: StandardParams<MembershipQuery>) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.hubs().members().collection(),
  });
}

export async function getCurrentMembership(
  params: StandardParams<MembershipQuery>,
) {
  return Request.getRequest<Single>({
    ...params,
    target: links.hubs().members().membership(),
  });
}

export async function getHubMember(
  params: StandardParams<MembershipQuery> & {
    id: ResourceId;
  },
) {
  return Request.getRequest<Single>({
    ...params,
    target: links.hubs().members().single(params.id),
  });
}

export async function getHubMemberByAccountId(
  params: StandardParams<MembershipQuery> & {
    id: ResourceId;
  },
) {
  return Request.getRequest<Single>({
    ...params,
    target: links.hubs().members().account(params.id),
  });
}

export interface UpdateParams {
  role?: RoleName;
  permissions?: MembershipPermissions;
}

export async function update(
  params: StandardParams<MembershipQuery> & {
    id: ResourceId;
    value: UpdateParams;
  },
) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.hubs().members().single(params.id),
  });
}

export async function revoke(
  params: StandardParams<MembershipQuery> & {
    id: ResourceId;
  },
) {
  return Request.deleteRequest<Single>({
    ...params,
    target: links.hubs().members().single(params.id),
  });
}
