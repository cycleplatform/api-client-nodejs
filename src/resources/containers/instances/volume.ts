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

export interface InstanceVolume extends Resource {
  config: Volumes.Volume;
  deployed: DeployedVolume;
  sftp: SFTP | null;
}

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

export interface Storage {
  used: Megabytes;
  total: Megabytes;
}

export interface SFTP {
  host: string;
  port: number;
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
