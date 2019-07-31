import { links, StandardParams, getRequest } from "common/api";
import { ResourceId } from "common/structs";
import { Collection as ContainerCollection } from "resources/containers";

export async function getContainers(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return getRequest<ContainerCollection>({
    ...params,
    target: links.images().containers(params.id),
  });
}
