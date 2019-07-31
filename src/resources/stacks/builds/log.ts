import { links, StandardParams, getRequest } from "common/api";
import { Resource, SingleDoc, ResourceId } from "common/structs";

export type Single = SingleDoc<BuildLog>;

export interface BuildLog extends Resource {
  stack_id: ResourceId;
  hub_id: ResourceId;
  build_id: ResourceId;
  log: string;
}

export async function getSingle(
  params: StandardParams & {
    stackId: ResourceId;
    buildId: ResourceId;
  },
) {
  return getRequest<Single>({
    ...params,
    target: links
      .stacks()
      .builds(params.stackId)
      .log(params.buildId),
  });
}
