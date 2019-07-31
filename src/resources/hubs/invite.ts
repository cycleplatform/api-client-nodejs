import { getRequest, postRequest } from "common/api/request";
import { links, StandardParams } from "common/api";
import { CollectionDoc, SingleDoc, Email } from "common/structs";
import * as Memberships from "./membership";

export type RoleName = "owner" | "admin" | "developer" | "analyst";

export interface CreateParams {
  recipient: Email; // Email
  role: RoleName;
}

export async function getCollection(
  params: StandardParams<Memberships.MembershipQuery>,
) {
  return getRequest<CollectionDoc<Memberships.Membership>>({
    ...params,
    target: links
      .hubs()
      .invites()
      .collection(),
  });
}

export async function create(
  params: StandardParams<Memberships.MembershipQuery> & {
    value: CreateParams;
  },
) {
  return postRequest<SingleDoc<Memberships.Membership>>({
    ...params,
    target: links
      .hubs()
      .invites()
      .collection(),
  });
}
