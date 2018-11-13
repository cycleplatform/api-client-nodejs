import { ResourceId, Task, CreatedTask } from "../../../../common/structs";
import * as Request from "../../../../common/api/request";
import { Token } from "../../../../auth";
import { QueryParams, links, Settings } from "../../../../common/api";

export type OrderAction = "confirm";

export async function confirm({
  id,
  token,
  query,
  settings,
}: {
  id: ResourceId;
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return task({
    id,
    token,
    query,
    settings,
    value: {
      action: "confirm",
    },
  });
}

export async function task({
  id,
  token,
  value,
  query,
  settings,
}: {
  id: ResourceId;
  token: Token;
  value: Task<OrderAction>;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.postRequest<CreatedTask<OrderAction>>({
    value,
    query,
    token,
    settings,
    target: links
      .billing()
      .orders()
      .tasks(id),
  });
}
