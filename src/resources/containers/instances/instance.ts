import * as Request from "../../../common/api/request";
import {
  QueryParams,
  links,
  StandardParams,
  PostParams,
} from "../../../common/api";
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
  UserScope,
  Includes,
  UserIncludes,
  Time,
  CreatedTask,
} from "../../../common/structs";
import { IPNet } from "../../infrastructure/ips";
import { Service } from "../services";
import { Container } from "../container";
import { Environment } from "../../environments";

export type Collection = CollectionDoc<Instance, InstanceIncludes>;
export type Single = SingleDoc<Instance, InstanceIncludes>;

/**
 * The possible states an instance can be in
 */
export type InstanceState =
  | "new"
  | "starting"
  | "reimaging"
  | "migrating"
  | "running"
  | "stopping"
  | "stopped"
  | "failed"
  | "deleting"
  | "deleted";

// This was done before did not change

/**
 * Instance status
 * @param active this instance can be started/stopped &nbsp;
 * @param purge this instance should be deleted
 * @param hibernate this instance is active but not allowed to run
 */
export type ReadyState = "active" | "purge" | "hibernate";

/**
 * An instance event type
 */
export type InstanceEvent = "first_started";
/**
 * Instance specific query
 */
export type InstanceQuery = QueryParams<
  keyof InstanceIncludes,
  keyof InstanceMetas
>;

/**
 * Information about the Instance resource
 */

export interface Instance extends Resource<InstanceMetas> {
  creator: UserScope;
  hub_id: ResourceId;
  container_id: ResourceId;
  location_id: ResourceId;
  environment: EnvironmentSummary;
  stateful: Stateful | null;
  provider: ProviderSummary;
  server_id: ResourceId;
  ready_state: ReadyState;
  /** The hostname of the instance */
  hostname: string;
  migration: Migration | null;
  purge_time?: Time;
  service: Service | null;
  state: State<InstanceState> & {
    /** Information about the health of the instance */
    health: {
      /** A boolean where true means the instance appears healthy */
      healthy: boolean;
      updated: Time;
    } | null;
  };
  events: Events<InstanceEvent>;
}

/**
 * Information about the Environment Summary Resource
 */
export interface EnvironmentSummary {
  id: ResourceId;
  /** An octet representing the IPv6 subnet used for this environment */
  subnet: string;
  /** The MAC address of the instance */
  mac_addr: string;
  ipv6: IPNet | null;
  legacy: Legacy | null;
}

/**
 * Information used to create stateful instances
 */

export interface Stateful {
  /** The instance number */
  id: number;
  /** The base hostname */
  base_hostname: string;
}

/**
 * Legacy networking information
 */
export interface Legacy {
  /** The last octet (IPv4) that represents the instance in the containers cidr block */
  host: number;
  ipv4: IPNet | null;
  /** The third octect (IPv4) that represents the containers private network subnet */
  subnet: number;
}

/**
 * Provider information and location
 */

export interface ProviderSummary {
  identifier: ProviderIdentifier;
  /** A string representing the provider datacenter location city */
  location: string;
}

/**
 * Instance migration information
 */
export interface Migration {
  to?: MigrationInstance;
  from?: MigrationInstance;
  started?: Time;
  completed?: Time;
  key: string;
  /** A boolean where true represents the migration should copy the contents of the volume to the destination server */
  copy_volumes: boolean;
}

/**
 * Information about the instance that was migrated and its origin server
 */
export interface MigrationInstance {
  instance_id: ResourceId;
  server_id: ResourceId;
}

/**
 * Information about the instance
 */
export interface InstanceIncludes extends Includes {
  creator: UserIncludes;
  servers: Record<ResourceId, Server>;
  locations: Record<ResourceId, Locations.Location>;
  providers: Record<ProviderIdentifier, Provider>;
  containers: Record<ResourceId, Container>;
  environments: Record<ResourceId, Environment>;
}

export interface InstanceMetas {}

export async function getCollection(
  params: StandardParams<InstanceQuery> & {
    containerId: ResourceId;
  },
) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.containers().instances().collection(params.containerId),
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

export type CreateParams = [
  {
    server_id: ResourceId;
    new_instances: number;
  },
];

export async function create(
  params: StandardParams<InstanceQuery> & {
    containerId: ResourceId;
  } & PostParams<CreateParams>,
) {
  return Request.postRequest<CreatedTask<any>>({
    ...params,
    target: links.containers().instances().collection(params.containerId),
  });
}

export async function remove(
  params: StandardParams<InstanceQuery> & {
    id: ResourceId;
    containerId: ResourceId;
  },
) {
  return Request.deleteRequest<CreatedTask<any>>({
    ...params,
    target: links
      .containers()
      .instances()
      .single(params.id, params.containerId),
  });
}

export async function removeMultiple(
  params: StandardParams<InstanceQuery> & {
    containerId: ResourceId;
    value: {
      instances_ids: ResourceId[];
    };
  },
) {
  return Request.deleteRequest<CreatedTask<any>>({
    ...params,
    target: links.containers().instances().collection(params.containerId),
  });
}
