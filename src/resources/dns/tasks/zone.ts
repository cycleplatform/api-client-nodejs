import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { links, StandardParams } from "../../../common/api";
import { ResourceId, Task, CreatedTask } from "../../../common/structs";

export type ZoneAction = "verify" | "change_origin";

export async function changeOrigin(
  params: StandardParams & {
    id: ResourceId;
    origin: string;
  },
) {
  return task({
    ...params,
    value: {
      action: "change_origin",
      contents: {
        origin: params.origin,
      },
    },
  });
}

export async function verify(
  params: StandardParams & {
    id: ResourceId;
    token: Token;
  },
) {
  return task({
    ...params,
    value: {
      action: "verify",
    },
  });
}

export async function task(
  params: StandardParams & {
    id: ResourceId;
    value: Task<ZoneAction>;
  },
) {
  return Request.postRequest<CreatedTask<ZoneAction>>({
    ...params,
    target: links
      .dns()
      .zones()
      .tasks(params.id),
  });
}
