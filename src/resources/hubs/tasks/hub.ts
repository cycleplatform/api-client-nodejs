import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { QueryParams, links, Settings } from "../../../common/api";
import { Task, CreatedTask } from "../../../common/structs";

export type HubAction = "leave";

export async function leave({
  token,
  query,
  settings,
}: {
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return task({
    token,
    query,
    settings,
    value: {
      action: "leave",
    },
  });
}

export async function task<K = {}>({
  token,
  value,
  query,
  settings,
}: {
  token: Token;
  value: Task<HubAction, K>;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.postRequest<CreatedTask<HubAction, K>>({
    value,
    query,
    token,
    settings,
    target: links.hubs().tasks(),
  });
}
