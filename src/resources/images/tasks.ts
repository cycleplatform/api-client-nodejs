import * as Request from "../../common/api/request";
import { links, StandardParams } from "../../common/api";
import { ResourceId, CreatedTask, Task } from "../../common/structs";

export type ImageAction = "import" | "prune";

export async function importImage(params: StandardParams) {
  return task({
    ...params,
    value: {
      action: "import",
    },
  });
}

export async function pruneUnused(params: StandardParams) {
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
    target: links.images().single(params.id),
  });
}

export async function task<K = {}>(
  params: StandardParams & {
    value: Task<ImageAction, K>;
  },
) {
  return Request.postRequest<CreatedTask<ImageAction, K>>({
    ...params,
    target: links.images().tasks(),
  });
}
