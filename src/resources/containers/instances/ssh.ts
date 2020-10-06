import { Resource, ResourceId, UserScope, Time } from "../../../common/structs";
import {
  links,
  getRequest,
  StandardParams,
  deleteRequest,
} from "../../../common/api";

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
  creator: UserScope;
  events: {
    created: Time;
    used: Time;
    expires: Time;
  };
  valid: boolean;
}

export async function getSSHConnection(
  params: StandardParams & {
    containerId: ResourceId;
    instanceId: ResourceId;
  },
) {
  return getRequest<SSHConnectionDoc>({
    ...params,
    target: links
      .containers()
      .instances()
      .ssh(params.instanceId, params.containerId),
  });
}

export async function expireInstanceSSHTokens(
  params: StandardParams & {
    containerId: ResourceId;
    instanceId: ResourceId;
  },
) {
  return deleteRequest<{ data: { tokens: number } }>({
    ...params,
    target: links
      .containers()
      .instances()
      .ssh(params.instanceId, params.containerId),
  });
}
