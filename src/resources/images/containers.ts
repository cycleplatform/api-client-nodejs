import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, Settings } from "../../common/api";
import * as Structs from "../../common/structs";
import * as Containers from "../containers";

export async function getContainers({
  id,
  token,
  query,
  settings,
}: {
  id: Structs.ResourceId;
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<Containers.Collection>({
    query,
    token,
    settings,
    target: links.images().containers(id),
  });
}
