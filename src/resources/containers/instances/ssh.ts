import {
  Resource,
  ResourceId,
  OwnerScope,
  Time,
} from "../../../common/structs";
import { Token } from "../../../auth";
import { links, Settings, getRequest } from "../../../common/api";

export type SSHConnectionDoc = { data: SSHConnectionResponse };

export interface SSHConnectionResponse {
  token: SSHToken;
  secret: string;
  address: string;
}

export interface SSHToken extends Resource {
  instance_id: ResourceId;
  container_id: ResourceId;
  hub_id: ResourceId;
  owner: OwnerScope;
  events: {
    created: Time;
    used: Time;
    expires: Time;
  };
  valid: boolean;
}

export async function getSSHConnection({
  instanceId,
  containerId,
  token,
  settings,
}: {
  containerId: ResourceId;
  instanceId: ResourceId;
  token: Token;
  settings?: Settings;
}) {
  return getRequest<SSHConnectionDoc>({
    token,
    settings,
    target: links
      .containers()
      .instances()
      .ssh(instanceId, containerId),
  });
}
