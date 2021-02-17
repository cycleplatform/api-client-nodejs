import * as Request from "../../../common/api/request";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  ResourceId,
  Megabytes,
  Time,
} from "../../../common/structs";
import { links, StandardParams } from "../../../common/api";
import { Volumes } from "../config";

export type Collection = CollectionDoc<InstanceVolume>;
export type Single = SingleDoc<InstanceVolume>;
export type SecretState = "live" | "deleting" | "deleted";

/**
 * Instance Volume resource information
 */
export interface InstanceVolume extends Resource {
  config: Volumes.Volume;
  deployed: DeployedVolume;
  sftp: SFTP | null;
}

/**
 * todo (whats the diff between instance and deployed?)
 */
export interface DeployedVolume {
  server_id: ResourceId | null;
  container_id: ResourceId;
  container_volume_id: ResourceId;
  instance_id: ResourceId;
  hash: string;
  path: string;
  storage: Storage;
  last_updated: Time;
}

/**
 * Instance volume storage information
 */
export interface Storage {
  /** The amount of volume storage used in megabytes */
  used: Megabytes;
  /** The total amount of available space in megabytes */
  total: Megabytes;
}

/**
 * SFTP connection information for the instance volume
 */
export interface SFTP {
  /** Hostname for connecting to the volume through SFTP */
  host: string;
  /** The port number used to connect to the volume through SFTP */
  port: number;
  /** The username for the user connecting to the volume through SFTP */
  username: string;
  password: Volumes.VolumePassword;
}

export async function getCollection(
  params: StandardParams & {
    instanceId: ResourceId;
    containerId: ResourceId;
  },
) {
  return Request.getRequest<Collection | { data: null }>({
    ...params,
    target: links
      .containers()
      .instances()
      .volumes(params.instanceId, params.containerId),
  });
}
