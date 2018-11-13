import * as Request from "../../../../common/api/request";
import { Token } from "../../../../auth";
import { QueryParams, links, Settings } from "../../../../common/api";
import { ResourceId, Task, CreatedTask } from "../../../../common/structs";

export type BuildAction = "deploy" | "delete";

export interface DeployParams {
  environment_id: ResourceId;
  update_configs: boolean;
  redeploy: boolean;
}

export async function deployBuild({
  id,
  stackId,
  value,
  token,
  query,
  settings,
}: {
  id: ResourceId;
  stackId: ResourceId;
  value: DeployParams;
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return task<DeployParams>({
    id,
    stackId,
    token,
    query,
    settings,
    value: { action: "deploy", contents: value },
  });
}

export async function remove({
  id,
  stack,
  token,
  query,
  settings,
}: {
  id: ResourceId;
  token: Token;
  stack: ResourceId;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.deleteRequest<CreatedTask<"delete">>({
    query,
    token,
    settings,
    target: links
      .stacks()
      .builds(stack)
      .single(id),
  });
}

export async function task<K = {}>({
  id,
  stackId,
  token,
  value,
  query,
  settings,
}: {
  id: ResourceId;
  stackId: ResourceId;
  token: Token;
  value: Task<BuildAction, K>;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.postRequest<CreatedTask<BuildAction, K>>({
    value,
    query,
    token,
    settings,
    target: links
      .stacks()
      .builds(stackId)
      .tasks(id),
  });
}
