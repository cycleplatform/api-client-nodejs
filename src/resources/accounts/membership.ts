import * as Request from "../../common/api/request";
import { links, StandardParams } from "../../common/api";
import { CollectionDoc } from "../../common/structs";
import * as Memberships from "../hubs/membership";

export async function getMemberships(params: StandardParams) {
  return Request.getRequest<
    CollectionDoc<Memberships.Membership, Memberships.MembershipIncludes>
  >({
    ...params,
    target: links.account().memberships(),
  });
}
