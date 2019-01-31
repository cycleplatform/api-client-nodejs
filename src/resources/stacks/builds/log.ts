import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { QueryParams, links, Settings } from "../../../common/api";
import { Resource, SingleDoc, ResourceId } from "../../../common/structs";

export type Single = SingleDoc<BuildLog>;

export interface BuildLog extends Resource {
  stack_id: ResourceId;
  cloud_id: ResourceId;
  build_id: ResourceId;
  log: string;
}

export async function getSingle({
  stackId,
  buildId,
  token,
  query,
  settings,
}: {
  stackId: ResourceId;
  buildId: ResourceId;
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<Single>({
    query,
    token,
    settings,
    target: links
      .stacks()
      .builds(stackId)
      .log(buildId),
  });
}
