import {
  Resource,
  ResourceId,
  IP as IPString,
  State,
  CollectionDoc,
  SingleDoc,
  OwnerInclude,
} from "common/structs";
import { Kind } from "./kind";
import { ProviderIdentifier, Provider } from "../provider";
import {
  StandardParams,
  getRequest,
  patchRequest,
  links,
  QueryParams,
} from "common/api";
import { IP } from "./ip";
import { Server } from "../servers";
import { Location } from "../provider/location";

export type Collection = CollectionDoc<Pool, PoolIncludes>;
export type Single = SingleDoc<Pool, PoolIncludes>;
export type PoolState = "live" | "releasing" | "released";

export type PoolQuery = QueryParams<
  keyof PoolIncludes,
  string,
  "available" | "cluster"
>;

export interface Pool extends Resource {
  hub_id: ResourceId;
  kind: Kind;
  provider: PoolProvider;
  server_id: ResourceId;
  floating: boolean;
  location_id: ResourceId;
  ips: IPs;
  block: Block;
  state: State<PoolState>;
}

export interface IPs {
  total: number;
  available: number;
}

export interface Block {
  cidr: string;
  gateway: IPString;
  netmask: IPString;
  network: IPString;
}

export type ReservationIdentifier = string;
export type ServerIdentifier = string;
export type ServerAssignmentIdentifier = string;

export interface PoolProvider {
  identifier: ProviderIdentifier;
  location: string;
  reservation: ReservationIdentifier;
  server: ServerIdentifier;
  server_assignment: ServerAssignmentIdentifier;
}

export interface PoolIncludes {
  owners: OwnerInclude;
  servers: Record<ResourceId, Server>;
  providers: Record<ResourceId, Provider>;
  locations: Record<ResourceId, Location>;
}

export async function getCollection(params: StandardParams<PoolQuery>) {
  return getRequest<Collection>({
    ...params,
    target: links
      .infrastructure()
      .ips()
      .pools()
      .collection(),
  });
}

export async function getSingle(
  params: StandardParams<PoolQuery> & {
    id: ResourceId;
  },
) {
  return getRequest<Single>({
    ...params,
    target: links
      .infrastructure()
      .ips()
      .pools()
      .single(params.id),
  });
}

export interface UpdateParams {
  floating: boolean;
}

export async function update(
  params: StandardParams<PoolQuery> & {
    id: ResourceId;
    value: UpdateParams;
  },
) {
  return patchRequest<Single>({
    ...params,
    target: links
      .infrastructure()
      .ips()
      .pools()
      .single(params.id),
  });
}

export async function getPoolIPs(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return getRequest<CollectionDoc<IP>>({
    ...params,
    target: links
      .infrastructure()
      .ips()
      .pools()
      .ips(params.id),
  });
}
