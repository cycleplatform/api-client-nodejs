import * as Request from "../../../../common/api/request";
import { links, StandardParams } from "../../../../common/api";
import { ResourceId, Task, CreatedTask } from "../../../../common/structs";

export type BuildAction = "deploy" | "delete" | "generate";

export interface DeployContents {
  environment_id: ResourceId;
  update_configs: boolean;
}

export async function deploy(
  params: StandardParams & {
    id: ResourceId;
    stackId: ResourceId;
    contents: DeployContents;
  },
) {
  return task<DeployContents>({
    ...params,
    value: {
      action: "deploy",
      contents: params.contents,
    },
  });
}

export async function generate(
  params: StandardParams & {
    id: ResourceId;
    stackId: ResourceId;
  },
) {
  return task({
    ...params,
    value: { action: "generate" },
  });
}

export async function remove(
  params: StandardParams & {
    id: ResourceId;
    stackId: ResourceId;
  },
) {
  return Request.deleteRequest<CreatedTask<"delete">>({
    ...params,
    target: links.stacks().builds(params.stackId).single(params.id),
  });
}

export async function task<K = {}>(
  params: StandardParams & {
    id: ResourceId;
    stackId: ResourceId;
    value: Task<BuildAction, K>;
  },
) {
  return Request.postRequest<CreatedTask<BuildAction, K>>({
    ...params,
    target: links.stacks().builds(params.stackId).tasks(params.id),
  });
}
