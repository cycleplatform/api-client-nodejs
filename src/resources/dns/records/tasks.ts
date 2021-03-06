import * as Request from "../../../common/api/request";
import { links, StandardParams } from "../../../common/api";
import { ResourceId, Task, CreatedTask } from "../../../common/structs";

export type RecordAction = "cert.generate";

export async function generateCert(
  params: StandardParams & {
    id: ResourceId;
    zoneId: ResourceId;
  },
) {
  return task({
    ...params,
    value: {
      action: "cert.generate",
    },
  });
}

export async function task(
  params: StandardParams & {
    id: ResourceId;
    zoneId: ResourceId;
    value: Task<RecordAction>;
  },
) {
  return Request.postRequest<CreatedTask<RecordAction>>({
    ...params,
    target: links.dns().zones().recordTasks(params.zoneId, params.id),
  });
}
