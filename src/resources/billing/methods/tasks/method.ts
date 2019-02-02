import * as Request from "../../../../common/api/request";
import { links, StandardParams } from "../../../../common/api";
import { ResourceId, CreatedTask } from "../../../../common/structs";

export async function remove(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return Request.deleteRequest<CreatedTask<"delete">>({
    ...params,
    target: links
      .billing()
      .methods()
      .single(params.id),
  });
}
