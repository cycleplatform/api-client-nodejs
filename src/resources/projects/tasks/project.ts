import { links, StandardParams, deleteRequest, postRequest } from "common/api";
import { ResourceId, Task, CreatedTask } from "common/structs";

type Action = "delete";

export async function remove(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return deleteRequest<CreatedTask<"delete">>({
    ...params,
    target: links.projects().single(params.id),
  });
}

export async function task<K = {}>(
  params: StandardParams & {
    id: ResourceId;
    value: Task<Action, K>;
  },
) {
  return postRequest<CreatedTask<Action, K>>({
    ...params,
    target: links.environments().tasks(params.id),
  });
}
