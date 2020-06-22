import * as Request from "../../../common/api/request";
import { links, StandardParams } from "../../../common/api";
import { ResourceId, Task, CreatedTask } from "../../../common/structs";
import { Features } from "./server";

export type ServerAction = "reconfigure.features";

export async function reconfigureFeatures(
  params: StandardParams & {
    id: ResourceId;
    value: Features;
  },
) {
  return task({
    ...params,
    value: {
      action: "reconfigure.features",
      contents: params.value,
    },
  });
}

export async function task<K = {}>(
  params: StandardParams & {
    id: ResourceId;
    value: Task<ServerAction, K>;
  },
) {
  return Request.postRequest<CreatedTask<ServerAction, K>>({
    ...params,
    target: links.infrastructure().servers().tasks(params.id),
  });
}
