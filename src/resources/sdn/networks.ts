import * as Request from "../../common/api/request";
import { QueryParams, links, StandardParams } from "../../common/api";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  ResourceId,
  State,
  Events,
  UserScope,
  UserIncludes,
  Time,
  CreatedTask,
} from "../../common/structs";
import { Environment } from "../environments";

export type Collection = CollectionDoc<Network, NetworkIncludes>;
export type Single = SingleDoc<Network, NetworkIncludes>;
export type NetworkQuery = QueryParams<keyof NetworkIncludes>;
/**
 * Types of states a network can be in
 */
export type NetworkState = "live" | "deleting" | "deleted";

export * from "./tasks";
/**
 * An extended resource including information about a network
 */
export interface Network extends Resource {
  /** The name of the network */
  name: string;
  /** The network identifier */
  identifier: string;
  /** The cluster this network will accept environment candidates from */
  cluster: string;
  creator: UserScope;
  hub_id: ResourceId;
  state: State<NetworkState>;
  private_network: PrivateNetwork;
  environments: NetworkEnvironment[];
  events: Events;
}

/**
 * Private network information for the network
 */
export interface PrivateNetwork {
  /** A tag used to ensure proper routing */
  vxlan_tag: number;
  /** The subnet of the private network */
  subnet: string;
  /** A number used to ensure a MAC address exists for each network */
  mac_addr_suffix: number;
  /** Network IPv6 information */
  ipv6: {
    /** The networks IPv6 base */
    ip: string;
    /** The private network CIDR */
    cidr: string;
  };
}

/**
 * Information about the ID of an environment and the time it was added to the network
 */
export interface NetworkEnvironment {
  id: ResourceId;
  added: Time;
}

export interface NetworkIncludes {
  creators: UserIncludes;
  environments: Record<ResourceId, Environment>;
}

export async function getCollection(params: StandardParams<NetworkQuery>) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.sdn().networks().collection(),
  });
}

export async function getSingle(
  params: StandardParams<NetworkQuery> & {
    id: ResourceId;
  },
) {
  return Request.getRequest<Single>({
    ...params,
    target: links.sdn().networks().single(params.id),
  });
}

export interface CreateParams {
  name: string;
  identifier: string;
  cluster: string;
  environments: ResourceId[];
}

export async function create(
  params: StandardParams<NetworkQuery> & {
    value: CreateParams;
  },
) {
  return Request.postRequest<Single>({
    ...params,
    target: links.sdn().networks().collection(),
  });
}

export interface UpdateParams {
  name: string;
  identifier: string;
}

export async function update(
  params: StandardParams<NetworkQuery> & {
    id: ResourceId;
    value: UpdateParams;
  },
) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.sdn().networks().single(params.id),
  });
}

export async function remove(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return Request.deleteRequest<CreatedTask<"delete">>({
    ...params,
    target: links.sdn().networks().single(params.id),
  });
}
