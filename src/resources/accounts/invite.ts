import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, Settings } from "../../common/api";
import { CollectionDoc, ResourceId, SingleDoc } from "../../common/structs";
import * as Memberships from "../hubs/membership";

export async function getCollection({
  token,
  query,
  settings,
}: {
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<
    CollectionDoc<Memberships.Membership, Memberships.MembershipIncludes>
  >({
    query,
    token,
    settings,
    target: links
      .account()
      .invites()
      .collection(),
  });
}

export interface InviteUpdateParams {
  accept?: true;
  decline?: true;
}

export async function update({
  inviteId,
  token,
  value,
  query,
  settings,
}: {
  inviteId: ResourceId;
  value: InviteUpdateParams;
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.patchRequest<
    SingleDoc<Memberships.Membership, Memberships.MembershipIncludes>
  >({
    value,
    query,
    token,
    settings,
    target: links
      .account()
      .invites()
      .invite(inviteId),
  });
}
