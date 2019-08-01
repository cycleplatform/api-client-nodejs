import * as Request from "../../../common/api/request";
import { links, StandardParams } from "../../../common/api";
import { ResourceId, Task, CreatedTask } from "../../../common/structs";

export type ZoneAction = "verify" | "generate_certs";

export async function verify(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return task({
    ...params,
    value: {
      action: "verify",
    },
  });
}

export async function generateCerts(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return task({
    ...params,
    value: {
      action: "generate_certs",
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
