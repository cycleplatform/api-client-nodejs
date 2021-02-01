import * as Request from "../../common/api/request";
import { links, StandardParams } from "../../common/api";
import * as Structs from "../../common/structs";
import * as Containers from "../containers";

/****************************** Params ******************************/
interface GetContainersParams extends StandardParams {
  id: Structs.ResourceId;
}

/****************************** Functions ******************************/

export async function getContainers(params: GetContainersParams) {
  return Request.getRequest<Containers.Collection>({
    ...params,
    target: links.images().containers(params.id),
  });
}
