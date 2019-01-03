import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, Settings } from "../../common/api";
import { CollectionDoc, SingleDoc } from "../../common/structs";
import * as Memberships from "./membership";

export type RoleName = "owner" | "admin" | "developer" | "analyst";

export interface CreateParams {
  recipient: string; // Email
  role: RoleName;
}

export async function getCollection({
  token,
  query,
  settings,
}: {
  token: Token;
  query?: Memberships.MembershipQuery;
  settings?: Settings;
}) {
  return Request.getRequest<CollectionDoc<Memberships.Membership>>({
    query,
    token,
    settings,
    target: links
      .projects()
      .invites()
      .collection(),
  });
}

export async function create({
  token,
  value,
  query,
  settings,
}: {
  token: Token;
  value: CreateParams;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.postRequest<SingleDoc<Memberships.Membership>>({
    value,
    query,
    token,
    settings,
    target: links
      .projects()
      .invites()
      .collection(),
  });
}
