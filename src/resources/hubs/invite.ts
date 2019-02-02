import * as Request from "../../common/api/request";
import { links, StandardParams } from "../../common/api";
import { CollectionDoc, SingleDoc } from "../../common/structs";
import * as Memberships from "./membership";

export type RoleName = "owner" | "admin" | "developer" | "analyst";

export interface CreateParams {
  recipient: string; // Email
  role: RoleName;
}

export async function getCollection(
  params: StandardParams<Memberships.MembershipQuery>,
) {
  return Request.getRequest<CollectionDoc<Memberships.Membership>>({
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
  return Request.postRequest<SingleDoc<Memberships.Membership>>({
    ...params,
    target: links
      .hubs()
      .invites()
      .collection(),
  });
}
