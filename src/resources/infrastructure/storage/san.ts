import {
  CollectionDoc,
  Resource,
  SingleDoc,
  Events,
  ResourceId,
  State,
  Cluster,
  Gigabytes,
} from "../../../common/structs";
import * as Request from "../../../common/api/request";
import { links, StandardParams, QueryParams } from "../../../common/api";

export type Collection = CollectionDoc<SAN>;
export type Single = SingleDoc<SAN>;
export type SANQuery = QueryParams;
export type SANState =
  | "provisioning"
  | "live"
  | "decommissioning"
  | "decommissioned";

export type SANEvent = "attached";

export interface SAN extends Resource {
  hub_id: ResourceId;
  cluster: Cluster;
  shared: Shared | null;
  instance: Instance;
  performance: boolean;
  provider: Provider;
  size_gb: Gigabytes;
  server_id: ResourceId | null;
  location_id: ResourceId;
  state: State<SANState>;
  events: Events<SANEvent>;
}

export interface Shared {
  name: string;
  identifier: string;
}

export interface Instance {
  id: ResourceId;
}

export interface Provider {
  identifier: string;
  location: string;
  server: string;
  volume_id: string;
  attachment: string;
  volume_name: string;
}

export async function getCollection(params: StandardParams<SANQuery>) {
  return Request.getRequest<Collection>({
    ...params,
    target: links
      .infrastructure()
      .storage()
      .sans()
      .collection(),
  });
}

export async function getSingle(
  params: StandardParams<SANQuery> & {
    id: ResourceId;
  },
) {
  return Request.getRequest<Single>({
    ...params,
    target: links
      .infrastructure()
      .storage()
      .sans()
      .single(params.id),
  });
}
