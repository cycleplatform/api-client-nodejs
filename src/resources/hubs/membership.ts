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
export type MembershipState =
  | "pending"
  | "accepted"
  | "declined"
  | "revoked"
  | "deleted";
export type MembershipEvent = "joined";
export type InvitationEvent = "accepted" | "declined" | "revoked";
export type MembershipQuery = QueryParams<
  keyof MembershipIncludes,
  keyof MembershipMeta
>;

export enum Role {
  OWNER = 1 << 0,
  ADMIN = 1 << 1,
  DEVELOPER = 1 << 2,
  ANALYST = 1 << 3,
  DEFAULT = 0,
}

export interface Membership extends Resource<MembershipMeta> {
  account_id: ResourceId;
  hub_id: ResourceId;
  role: Role;
  events: Events<MembershipEvent>;
  state: State<MembershipState>;
  invitation: Invitation;
  permissions: MembershipPermissions;
}

export interface MembershipMeta {
  capabilities: Capability[];
}

export interface MembershipIncludes {
  senders: Record<ResourceId, PublicAccount>;
  hubs: Record<ResourceId, Hub>;
  accounts: Record<ResourceId, PublicAccount>;
}

export interface MembershipPermissions {
  all_environments: boolean;
  environments: MembershipEnvironment[];
}

export interface MembershipEnvironment {
  id: ResourceId;
  read_only: boolean;
}

export interface Invitation {
  sender: {
    id: ResourceId;
    type: string;
  };
  recipient: {
    email: string;
  };
  events: Events<InvitationEvent>;
}

/**
 * Members of this hub
 */
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
