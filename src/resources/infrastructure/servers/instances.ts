import { links, StandardParams, getRequest } from "common/api";
import {
  InstanceQuery,
  Collection as InstanceCollection,
} from "resources/containers/instances";
import { ResourceId } from "common/structs";

export async function getServerInstances(
  params: StandardParams<InstanceQuery> & {
    serverId: ResourceId;
  },
) {
  return getRequest<InstanceCollection>({
    ...params,
    target: links
      .infrastructure()
      .servers()
      .instances(params.serverId),
  });
}
