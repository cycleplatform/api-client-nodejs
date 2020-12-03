import { Resource, ResourceId, UserScope, Time } from "../../../common/structs";
import {
  links,
  getRequest,
  StandardParams,
  deleteRequest,
} from "../../../common/api";

export type SSHConnectionDoc = { data: SSHConnectionResponse };

/**
 * SSH connection response information
 */
export interface SSHConnectionResponse {
  token: SSHToken;
  /** SSH connection response secret */
  secret: string;
  /** SSH connection response address */
  address: string;
}

/**
 * SSH token resource
 */
export interface SSHToken extends Resource {
  instance_id: ResourceId;
  container_id: ResourceId;
  hub_id: ResourceId;
  creator: UserScope;
  /** specific ssh connection events */
  events: {
    created: Time;
    used: Time;
    expires: Time;
  };
  /** A boolean where true represents the token being valid */
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
