import * as Request from "../../common/api/request";
import { links, StandardParams } from "../../common/api";
import { ResourceId, CreatedTask, Task } from "../../common/structs";

export type NetworkAction = "reconfigure";

export interface ReconfigureParams {
  environment_ids: ResourceId[];
}

export async function reconfigure(
  params: StandardParams & {
    id: ResourceId;
    value: ReconfigureParams;
  },
) {
  return task({
    ...params,
    value: {
      action: "reconfigure",
      contents: params.value,
    },
  });
}

export async function task<K = {}>(
  params: StandardParams & {
    id: ResourceId;
    value: Task<NetworkAction, K>;
  },
) {
  return Request.postRequest<CreatedTask<NetworkAction, K>>({
    ...params,
    target: links
      .sdn()
      .networks()
      .tasks(params.id),
  });
}
