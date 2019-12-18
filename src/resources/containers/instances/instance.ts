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
  Time,
} from "../../../common/structs";
import { IPNet } from "../../infrastructure/ips";
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
  | "failed"
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
  stateful: Stateful | null;
  provider: ProviderSummary;
  server_id: ResourceId;
  ready_state: ReadyState;
  hostname: string;
  migration: Migration | null;
  service: Service | null;
  state: State<InstanceState> & {
    health: {
      healthy: boolean;
      updated: Time;
    } | null;
  };
  events: Events<InstanceEvent>;
}

export interface EnvironmentSummary {
  id: ResourceId;
  subnet: string;
  mac_addr: string;
  ipv6: IPNet | null;
  legacy: Legacy | null;
}

export interface Stateful {
  id: number;
  base_hostname: string;
}

export interface Legacy {
  host: number;
  ipv4: IPNet | null;
  subnet: number;
}

export interface ProviderSummary {
  identifier: ProviderIdentifier;
  location: string;
}

export interface Migration {
  to?: MigrationInstance;
  from?: MigrationInstance;
  key: string;
}

export interface MigrationInstance {
  instance_id: ResourceId;
  server_id: ResourceId;
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
