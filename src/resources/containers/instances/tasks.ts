import * as Request from "../../../common/api/request";
import { links, StandardParams } from "../../../common/api";
import { ResourceId, Task, CreatedTask } from "../../../common/structs";

export type InstanceAction = "migrate";

export interface MigrateParams {
  destination_server_id: ResourceId;
  stateful?: StatefulMigrationParams;
}

export interface StatefulMigrationParams {
  copy_volumes: boolean;
}

export async function migrate(
  params: StandardParams & {
    id: ResourceId;
    containerId: ResourceId;
    value: MigrateParams;
  },
) {
  return task({
    ...params,
    value: {
      action: "migrate",
      contents: params.value,
    },
  });
}

export async function task<K = {}>(
  params: StandardParams & {
    id: ResourceId;
    containerId: ResourceId;
    value: Task<InstanceAction, K>;
  },
) {
  return Request.postRequest<CreatedTask<InstanceAction, K>>({
    ...params,
    target: links
      .containers()
      .instances()
      .tasks(params.id, params.containerId),
  });
}
