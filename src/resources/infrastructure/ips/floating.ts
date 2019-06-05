import { ResourceId, SingleDoc } from "../../../common/structs";
import { StandardParams, postRequest, links } from "../../../common/api";
import { Job } from "../../../resources/jobs";
import { ProviderIdentifier } from "../provider";
import { Kind } from "./kind";

export interface FloatingIP {
  pool_id: ResourceId;
  id: ResourceId;
}

export interface AddFloatingIPParams {
  identifier: ProviderIdentifier;
  location_id: ResourceId;
  kind: Kind;
}

export async function addFloatingIP(
  params: StandardParams & {
    value: AddFloatingIPParams;
  },
) {
  return postRequest<SingleDoc<Job>>({
    ...params,
    value: params.value,
    target: links
      .infrastructure()
      .ips()
      .pools()
      .collection(),
  });
}
