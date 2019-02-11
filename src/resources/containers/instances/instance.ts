import * as Request from "../../../common/api/request";
import { QueryParams, links, StandardParams } from "../../../common/api";
import { Server } from "../../infrastructure/servers";
import {
  Locations,
  ProviderIdentifier,
  Provider,
} from "../../infrastructure/provider";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  ResourceId,
  State,
  Events,
  OwnerScope,
  Includes,
  OwnerInclude,
} from "../../../common/structs";
import { IPNet } from "../../network";
import { Service } from "../services";

export type Collection = CollectionDoc<Instance, InstanceIncludes>;
export type Single = SingleDoc<Instance, InstanceIncludes>;
export type InstanceState =
  | "new"
  | "starting"
  | "reimaging"
  | "running"
  | "stopping"
  | "stopped"
  | "deleting"
  | "deleted";

/**
 * Instance status
 * @param active this instance can be started/stopped &nbsp;
 * @param purge this instance should be deleted
 * @param hibernate this instance is active but not allowed to run
 */
export type ReadyState = "active" | "purge" | "hibernate";

export type InstanceEvent = "first_boot" | "started";
export type InstanceQuery = QueryParams<
  keyof InstanceIncludes,
  keyof InstanceMetas
>;

export interface Instance extends Resource<InstanceMetas> {
  owner: OwnerScope;
  hub_id: ResourceId;
  container_id: ResourceId;
  location_id: ResourceId;
  environment: EnvironmentSummary;
  provider: ProviderSummary;
  server_id: ResourceId;
  ready_state: ReadyState;
  hostname: string;
  service: Service | null;
  state: State<InstanceState>;
  events: Events<InstanceEvent>;
}

export interface EnvironmentSummary {
  id: ResourceId;
  instance_subnet: string;
  ipv6: IPNet | null;
}

export interface ProviderSummary {
  identifier: ProviderIdentifier;
  location: Locations.LocationProvider;
}

export interface InstanceIncludes extends Includes {
  owner: OwnerInclude;
  servers: Record<ResourceId, Server>;
  locations: Record<ResourceId, Locations.Location>;
  providers: Record<ProviderIdentifier, Provider>;
}

export interface InstanceMetas {}

export async function getCollection(
  params: StandardParams<InstanceQuery> & {
    containerId: ResourceId;
  },
) {
  return Request.getRequest<Collection>({
    ...params,
    target: links
      .containers()
      .instances()
      .collection(params.containerId),
  });
}

export async function getSingle(
  params: StandardParams<InstanceQuery> & {
    id: ResourceId;
    containerId: ResourceId;
  },
) {
  return Request.getRequest<Single>({
    ...params,
    target: links
      .containers()
      .instances()
      .single(params.id, params.containerId),
  });
}
