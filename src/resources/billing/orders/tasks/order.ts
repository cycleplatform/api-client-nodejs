import { ResourceId, Task, CreatedTask } from "../../../../common/structs";
import * as Request from "../../../../common/api/request";
import { links, StandardParams } from "../../../../common/api";

export type OrderAction = "confirm";

export async function confirm(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return task({
    ...params,
    value: {
      action: "confirm",
    },
  });
}

export async function task(
  params: StandardParams & {
    id: ResourceId;
    value: Task<OrderAction>;
  },
) {
  return Request.postRequest<CreatedTask<OrderAction>>({
    ...params,
    target: links
      .billing()
      .orders()
      .tasks(params.id),
  });
}
