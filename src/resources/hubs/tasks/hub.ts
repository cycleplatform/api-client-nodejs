import * as Request from "common/api/request";
import { links, StandardParams } from "common/api";
import { Task, CreatedTask } from "common/structs";

export type HubAction = "leave";

export async function leave(params: StandardParams) {
  return task({
    ...params,
    value: {
      action: "leave",
    },
  });
}

export async function task<K = {}>(
  params: StandardParams & {
    value: Task<HubAction, K>;
  },
) {
  return Request.postRequest<CreatedTask<HubAction, K>>({
    ...params,
    target: links.hubs().tasks(),
  });
}
