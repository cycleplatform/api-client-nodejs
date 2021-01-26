import * as Request from "../../common/api/request";
import { links, StandardParams } from "../../common/api";
import { ResourceId, CreatedTask, Task } from "../../common/structs";
import { Structs } from "../..";

export type CollectionTaskAction = "prune";
export type ImageTaskAction = "import";

export async function importImage(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return imageTask({
    ...params,
    value: {
      action: "import",
    },
  });
}

type PruneUnusedValue = {
  source_ids: ResourceId[];
};

type PruneUnusedParams = StandardParams & PruneUnusedValue;
export async function pruneUnused(params: PruneUnusedParams) {
  return collectionTask<PruneUnusedValue>({
    ...params,
    value: {
      action: "prune",
      contents: {
        source_ids: params.source_ids,
      },
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

export async function collectionTask<K = {}>(
  params: StandardParams & {
    value: Task<CollectionTaskAction, K>;
  },
) {
  return Request.postRequest<CreatedTask<CollectionTaskAction, K>>({
    ...params,
    target: links.images().collectionTasks(),
  });
}

export async function imageTask<K = {}>(
  params: StandardParams & {
    id: ResourceId;
    value: Task<ImageTaskAction, K>;
  },
) {
  return Request.postRequest<CreatedTask<ImageTaskAction, K>>({
    ...params,
    target: links.images().imageTasks(params.id),
  });
}
