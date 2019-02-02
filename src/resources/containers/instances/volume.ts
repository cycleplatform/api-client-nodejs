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
import { Spec } from "../../stacks";

export type Collection = CollectionDoc<Volume>;
export type Single = SingleDoc<Volume>;
export type SecretState = "live" | "deleting" | "deleted";

export interface Volume extends Resource {
  config: Spec.Volume;
  deployed: {
    server_id: ResourceId | null;
    container_id: ResourceId;
    container_volume_id: ResourceId;
    hash: string;
    path: string;
    storage: Storage;
    last_updated: Time;
  };
  sftp: SFTP;
}

export interface Storage {
  used: Megabytes;
  total: Megabytes;
}

export interface SFTP {
  host: string;
  port: number;
  username: string;
}

export async function getCollection(
  params: StandardParams & {
    instanceId: ResourceId;
    containerId: ResourceId;
  },
) {
  return Request.getRequest<Collection>({
    ...params,
    target: links
      .containers()
      .instances()
      .volumes(params.instanceId, params.containerId),
  });
}
