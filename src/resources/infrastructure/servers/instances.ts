import * as Request from "../../../common/api/request";
import { links, StandardParams } from "../../../common/api";
import * as Instances from "../../containers/instances";
import { ResourceId } from "../../../common/structs";

export async function getServerInstances(
  params: StandardParams<Instances.InstanceQuery> & {
    serverId: ResourceId;
  },
) {
  return Request.getRequest<Instances.Collection>({
    ...params,
    target: links
      .infrastructure()
      .servers()
      .instances(params.serverId),
  });
}
