import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { QueryParams, links, Settings } from "../../../common/api";
import { Task, CreatedTask } from "../../../common/structs";

export type CloudAction = "leave";

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
  value: Task<CloudAction, K>;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.postRequest<CreatedTask<CloudAction, K>>({
    value,
    query,
    token,
    settings,
    target: links.clouds().tasks(),
  });
}
