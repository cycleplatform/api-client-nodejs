import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { QueryParams, links, Settings } from "../../../common/api";
import { Server } from "../../infrastructure/servers";
import { Locations, ProviderIdentifier } from "../../infrastructure/provider";
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

export type Collection = CollectionDoc<Instance, {}, InstanceIncludes>;
export type Single = SingleDoc<Instance, {}, InstanceIncludes>;
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
  project_id: ResourceId;
  container_id: ResourceId;
  environment: Environment;
  provider: Provider;
  server_id: ResourceId;
  ready_state: ReadyState;
  hostname: string;
  service: Service | null;
  state: State<InstanceState>;
  events: Events<InstanceEvent>;
}

export interface Environment {
  id: ResourceId;
  instance_subnet: string;
  ipv6: IPNet | null;
}

export interface Provider {
  identifier: ProviderIdentifier;
  location: Locations.LocationProvider;
}

export interface InstanceIncludes extends Includes {
  owner: OwnerInclude;
  servers: {
    [key: string]: Server;
  };
  locations: {
    [key: string]: Locations.Location;
  };
}

// tslint:disable-next-line:no-empty-interface
export interface InstanceMetas {
  //
}

export async function getCollection({
  containerId,
  token,
  query,
  settings,
}: {
  containerId: ResourceId;
  token: Token;
  query?: InstanceQuery;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    query,
    token,
    settings,
    target: links
      .containers()
      .instances()
      .collection(containerId),
  });
}

export async function getSingle({
  id,
  containerId,
  token,
  query,
  settings,
}: {
  id: ResourceId;
  containerId: ResourceId;
  token: Token;
  query?: InstanceQuery;
  settings?: Settings;
}) {
  return Request.getRequest<Single>({
    query,
    token,
    settings,
    target: links
      .containers()
      .instances()
      .single(id, containerId),
  });
}
