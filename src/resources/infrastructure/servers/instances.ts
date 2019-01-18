import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { links, Settings } from "../../../common/api";
import * as Instances from "../../containers/instances";
import { ResourceId } from "../../../common/structs";

export async function getServerInstances({
  serverId,
  token,
  query,
  settings,
}: {
  serverId: ResourceId;
  token: Token;
  query?: Instances.InstanceQuery;
  settings?: Settings;
}) {
  return Request.getRequest<Instances.Collection>({
    query,
    token,
    settings,
    target: links
      .infrastructure()
      .servers()
      .instances(serverId),
  });
}
