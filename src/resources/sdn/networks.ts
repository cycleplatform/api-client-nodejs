import * as Request from "../../common/api/request";
import { QueryParams, links, StandardParams } from "../../common/api";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  ResourceId,
  State,
  Events,
  OwnerScope,
  OwnerInclude,
  Time,
  CreatedTask,
} from "../../common/structs";
import { Environment } from "../environments";

export type Collection = CollectionDoc<Network, NetworkIncludes>;
export type Single = SingleDoc<Network, NetworkIncludes>;
export type NetworkQuery = QueryParams<keyof NetworkIncludes>;
export type NetworkState = "live" | "deleting" | "deleted";

export interface Network extends Resource {
  name: string;
  cluster: string;
  owner: OwnerScope;
  hub_id: ResourceId;
  state: State<NetworkState>;
  environments: NetworkEnvironment[];
  events: Events;
}

export interface NetworkEnvironment {
  id: ResourceId;
  added: Time;
}

export interface NetworkIncludes {
  owners: OwnerInclude;
  environments: Record<ResourceId, Environment>;
}

export async function getCollection(params: StandardParams<NetworkQuery>) {
  return Request.getRequest<Collection>({
    ...params,
    target: links
      .sdn()
      .networks()
      .collection(),
  });
}

export async function getSingle(
  params: StandardParams<NetworkQuery> & {
    id: ResourceId;
  },
) {
  return Request.getRequest<Single>({
    ...params,
    target: links
      .sdn()
      .networks()
      .single(params.id),
  });
}

export interface UpdateParams {
  name: string;
}

export async function update(
  params: StandardParams<NetworkQuery> & {
    id: ResourceId;
    value: UpdateParams;
  },
) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.images().single(params.id),
  });
}

export async function remove(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return Request.deleteRequest<CreatedTask<"delete">>({
    ...params,
    target: links
      .sdn()
      .networks()
      .single(params.id),
  });
}
