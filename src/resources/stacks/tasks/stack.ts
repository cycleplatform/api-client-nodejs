import { links, StandardParams, deleteRequest, postRequest } from "common/api";
import { ResourceId, Task, CreatedTask } from "common/structs";

export type StackAction = "build";

export async function buildStack(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return task({
    ...params,
    value: {
      action: "build",
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
    target: links.stacks().single(params.id),
  });
}

export async function task<K = {}>(
  params: StandardParams & {
    id: ResourceId;
    value: Task<StackAction, K>;
  },
) {
  return postRequest<CreatedTask<StackAction, K>>({
    ...params,
    target: links.stacks().tasks(params.id),
  });
}
