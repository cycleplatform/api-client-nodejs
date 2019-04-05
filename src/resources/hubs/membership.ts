import * as Request from "../../common/api/request";
import { QueryParams, links, StandardParams } from "../../common/api";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  Events,
  State,
  ResourceId,
  Time,
} from "../../common/structs";
import { PublicAccount } from "../accounts/account";
import { Hub } from "./hub";
import { Capability } from "./capability";
import { Name } from "../accounts";
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
}

export interface MembershipMeta {
  capabilities: Capability[];
}

export interface MembershipIncludes {
  senders: {
    [key: string]: PublicAccount;
  };
  hubs: {
    [key: string]: Hub;
  };
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

export interface Member extends Resource<MembershipMeta> {
  name: Name;
  membership_id: ResourceId;
  role: Role;
  joined: Time;
}

/**
 * Members of this hub
 */
export async function getCollection(params: StandardParams<MembershipQuery>) {
  return Request.getRequest<CollectionDoc<Member>>({
    ...params,
    target: links
      .hubs()
      .members()
      .collection(),
  });
}

export async function getCurrentMembership(
  params: StandardParams<MembershipQuery>,
) {
  return Request.getRequest<SingleDoc<Member>>({
    ...params,
    target: links
      .hubs()
      .members()
      .membership(),
  });
}

export interface UpdateParams {
  role: RoleName;
}

export async function update(
  params: StandardParams<MembershipQuery> & {
    id: ResourceId;
    value: UpdateParams;
  },
) {
  return Request.patchRequest<SingleDoc<Member>>({
    ...params,
    target: links
      .hubs()
      .members()
      .single(params.id),
  });
}

export async function revoke(
  params: StandardParams<MembershipQuery> & {
    id: ResourceId;
  },
) {
  return Request.deleteRequest<Single>({
    ...params,
    target: links
      .hubs()
      .members()
      .single(params.id),
  });
}
