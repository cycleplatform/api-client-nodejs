import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { QueryParams, links, Settings } from "../../../common/api";
import { ResourceId, Task, CreatedTask } from "../../../common/structs";

export type StackAction = "build";

export async function buildStack({
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
      action: "build",
    },
  });
}

export async function remove({
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
  return Request.deleteRequest<CreatedTask<"delete">>({
    query,
    token,
    settings,
    target: links.stacks().single(id),
  });
}

export async function task<K = {}>({
  id,
  token,
  value,
  query,
  settings,
}: {
  id: ResourceId;
  token: Token;
  value: Task<StackAction, K>;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.postRequest<CreatedTask<StackAction, K>>({
    value,
    query,
    token,
    settings,
    target: links.stacks().tasks(id),
  });
}
