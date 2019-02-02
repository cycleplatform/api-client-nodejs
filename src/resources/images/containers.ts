import * as Request from "../../common/api/request";
import { links, StandardParams } from "../../common/api";
import * as Structs from "../../common/structs";
import * as Containers from "../containers";

export async function getContainers(
  params: StandardParams & {
    id: Structs.ResourceId;
  },
) {
  return Request.getRequest<Containers.Collection>({
    ...params,
    target: links.images().containers(params.id),
  });
}
