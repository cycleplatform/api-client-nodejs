import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { QueryParams, links, Settings } from "../../../common/api";
import { ResourceId, Task, CreatedTask } from "../../../common/structs";

export type InviteAction = "accept" | "decline";

export async function accept({
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
      action: "accept",
    },
  });
}

export async function decline({
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
      action: "decline",
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
  value: Task<InviteAction>;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.postRequest<CreatedTask<InviteAction>>({
    value,
    query,
    token,
    settings,
    target: links
      .account()
      .invites()
      .tasks(id),
  });
}
