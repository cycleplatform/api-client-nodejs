import * as Request from "../../../../common/api/request";
import { Token } from "../../../../auth";
import { QueryParams, links, Settings } from "../../../../common/api";
import { ResourceId, CreatedTask } from "../../../../common/structs";

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
    target: links
      .billing()
      .methods()
      .single(id),
  });
}
