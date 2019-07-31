import { links, StandardParams, deleteRequest, postRequest } from "common/api";
import { ResourceId, Task, CreatedTask } from "common/structs";

export type BuildAction = "deploy" | "delete";

export interface DeployParams {
  environment_id: ResourceId;
  update_configs: boolean;
  redeploy: boolean;
}

export async function deployBuild(
  params: StandardParams & {
    id: ResourceId;
    stackId: ResourceId;
    value: DeployParams;
  },
) {
  return task<DeployParams>({
    ...params,
    value: { action: "deploy", contents: params.value },
  });
}

export async function remove(
  params: StandardParams & {
    id: ResourceId;
    stackId: ResourceId;
  },
) {
  return deleteRequest<CreatedTask<"delete">>({
    ...params,
    target: links
      .stacks()
      .builds(params.stackId)
      .single(params.id),
  });
}

export async function task<K = {}>(
  params: StandardParams & {
    id: ResourceId;
    stackId: ResourceId;
    value: Task<BuildAction, K>;
  },
) {
  return postRequest<CreatedTask<BuildAction, K>>({
    ...params,
    target: links
      .stacks()
      .builds(params.stackId)
      .tasks(params.id),
  });
}
