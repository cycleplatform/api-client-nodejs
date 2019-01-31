import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, Settings } from "../../common/api";
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
import { Cloud } from "./cloud";
import { Capability } from "./capability";
import { Name } from "../accounts";

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
  cloud_id: ResourceId;
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
  clouds: {
    [key: string]: Cloud;
  };
}

export interface Invitation {
  sender: ResourceId;
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
 * Members of this cloud
 */
export async function getCollection({
  token,
  query,
  settings,
}: {
  token: Token;
  query?: MembershipQuery;
  settings?: Settings;
}) {
  return Request.getRequest<CollectionDoc<Member>>({
    query,
    token,
    settings,
    target: links
      .clouds()
      .members()
      .collection(),
  });
}

export async function getCurrentMembership({
  token,
  query,
  settings,
}: {
  token: Token;
  query?: MembershipQuery;
  settings?: Settings;
}) {
  return Request.getRequest<SingleDoc<Member>>({
    query,
    token,
    settings,
    target: links
      .clouds()
      .members()
      .membership(),
  });
}

export async function revoke({
  id,
  token,
  query,
  settings,
}: {
  id: ResourceId;
  token: Token;
  query?: QueryParams;
  settings: Settings;
}) {
  return Request.deleteRequest<Single>({
    query,
    token,
    settings,
    target: links
      .clouds()
      .members()
      .single(id),
  });
}
