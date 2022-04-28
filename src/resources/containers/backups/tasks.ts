import { links, StandardParams } from "../../../common/api";
import { CreatedTask, ResourceId, Task } from "../../../common/structs";
import * as Request from "../../../common/api/request";

export type BackupAction = "restore";

export async function restore(
  params: StandardParams & {
    id: ResourceId;
    instanceId: ResourceId;
    containerId: ResourceId;
  },
) {
  return task({
    ...params,
    value: {
      action: "restore",
      contents: {
        instance_id: params.instanceId,
      },
    },
  });
}

export async function remove(
  params: StandardParams & {
    id: ResourceId;
    containerId: ResourceId;
  },
) {
  return Request.deleteRequest<CreatedTask<"delete">>({
    ...params,
    target: links.containers().backups().single(params.id, params.containerId),
  });
}

export async function task<K = {}>(
  params: StandardParams & {
    id: ResourceId;
    containerId: ResourceId;
    value: Task<BackupAction, K>;
  },
) {
  return Request.postRequest<CreatedTask<BackupAction, K>>({
    ...params,
    target: links.containers().backups().tasks(params.id, params.containerId),
  });
}
