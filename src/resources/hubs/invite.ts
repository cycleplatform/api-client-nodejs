import * as Request from "../../common/api/request";
import { links, StandardParams } from "../../common/api";
import {
  CollectionDoc,
  SingleDoc,
  Email,
  ResourceId,
} from "../../common/structs";
import * as Memberships from "./membership";

export type RoleName = "creator" | "admin" | "developer" | "analyst";

export interface CreateParams {
  recipient: Email; // Email
  role: RoleName;
}

export async function remove(
  params: StandardParams & {
    inviteId: ResourceId;
  },
) {
  return Request.deleteRequest<SingleDoc<Memberships.Membership>>({
    ...params,
    target: links.hubs().invites().single(params.inviteId),
  });
}

export async function getCollection(
  params: StandardParams<Memberships.MembershipQuery>,
) {
  return Request.getRequest<CollectionDoc<Memberships.Membership>>({
    ...params,
    target: links.hubs().invites().collection(),
  });
}

export async function create(
  params: StandardParams<Memberships.MembershipQuery> & {
    value: CreateParams;
  },
) {
  return Request.postRequest<SingleDoc<Memberships.Membership>>({
    ...params,
    target: links.hubs().invites().collection(),
  });
}
