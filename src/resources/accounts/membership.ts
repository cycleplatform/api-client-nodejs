import { getRequest } from "common/api/request";
import { links, StandardParams } from "common/api";
import { CollectionDoc } from "common/structs";
import * as Memberships from "resources/hubs/membership";

export async function getMemberships(params: StandardParams) {
  return getRequest<
    CollectionDoc<Memberships.Membership, Memberships.MembershipIncludes>
  >({
    ...params,
    target: links.account().memberships(),
  });
}
