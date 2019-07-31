import { links, StandardParams, deleteRequest, postRequest } from "common/api";
import { ResourceId, Task, CreatedTask } from "common/structs";

export type EnvironmentAction = "start" | "stop";

export async function start(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return task({
    ...params,
    value: {
      action: "start",
    },
  });
}

export async function stop(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return task({
    ...params,
    value: {
      action: "stop",
    },
  });
}

export async function remove(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return deleteRequest<CreatedTask<"delete">>({
    ...params,
    target: links.environments().single(params.id),
  });
}

export async function task<K = {}>(
  params: StandardParams & {
    id: ResourceId;
    value: Task<EnvironmentAction, K>;
  },
) {
  return postRequest<CreatedTask<EnvironmentAction, K>>({
    ...params,
    target: links.environments().tasks(params.id),
  });
}
