import * as Request from "../../common/api/request";
import { links, StandardParams } from "../../common/api";
import { CollectionDoc, ResourceId, SingleDoc } from "../../common/structs";
import * as Memberships from "../hubs/membership";

export async function getCollection(params: StandardParams) {
  return Request.getRequest<
    CollectionDoc<Memberships.Membership, Memberships.MembershipIncludes>
  >({
    ...params,
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

export async function update(
  params: StandardParams & {
    inviteId: ResourceId;
    value: InviteUpdateParams;
  },
) {
  return Request.patchRequest<
    SingleDoc<Memberships.Membership, Memberships.MembershipIncludes>
  >({
    ...params,
    target: links
      .account()
      .invites()
      .invite(params.inviteId),
  });
}
