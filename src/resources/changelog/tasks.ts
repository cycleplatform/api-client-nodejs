/**
 * @internal
 */
import { links, Settings, StandardParams } from "../../common/api";
import { ResourceId } from "../../common/structs";
import * as Request from "../../common/api/request";

/** Helper to change the url as this lives on a diff url */
const changelogSettings: Settings = {
  url: "api.marketing.internal.cycle.io",
};

type BSP = StandardParams & {
  id: ResourceId;
};

type RemoveParams = BSP;
export async function remove(params: RemoveParams) {
  return Request.deleteRequest({
    ...params,
    settings: changelogSettings,
    target: links.changelog().single(params.id),
  });
}
