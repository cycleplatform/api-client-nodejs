import * as Request from "../../../common/api/request";
import { links, StandardParams } from "../../../common/api";
import { ResourceId, Task, CreatedTask } from "../../../common/structs";

export type StackAction = "build" | "prune";

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

/** Removes all builds that are not in use and have not been created in the last 30 minutes */
export async function pruneBuilds(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return task({
    ...params,
    value: {
      action: "prune",
    },
  });
}

export async function remove(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return Request.deleteRequest<CreatedTask<"delete">>({
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
  return Request.postRequest<CreatedTask<StackAction, K>>({
    ...params,
    target: links.stacks().tasks(params.id),
  });
}
