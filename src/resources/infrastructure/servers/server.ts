import * as Request from "../../../common/api/request";
import { links, StandardParams, QueryParams } from "../../../common/api";
import {
  CollectionDoc,
  SingleDoc,
  Resource,
  ResourceId,
  State,
  Events,
  Time,
  Includes,
  CreatedTask,
  StatefulCounts,
  OwnerScope,
} from "../../../common/structs";
import { Stats, Telemetry } from "../stats";
import {
  Locations,
  ProviderIdentifier,
  Servers as ProviderServers,
  Provider,
} from "../provider";
import { InstanceState } from "../../containers/instances";

export type Collection = CollectionDoc<Server, ServerIncludes>;
export type Single = SingleDoc<Server, ServerIncludes>;

/**
 * Filters: [tags]
 */
export type ServerQuery = QueryParams<keyof ServerIncludes, keyof ServerMeta>;

export { Telemetry, Stats };

export interface Server extends Resource<ServerMeta> {
  hostname: string;
  owner: OwnerScope;
  hub_id: ResourceId;
  provider: ServerProvider;
  location_id: ResourceId;
  model_id: ResourceId;
  node_id: ResourceId | null;
  tags: string[];
  state: State<ServerState>;
  events: Events;
}

export interface ServerIncludes extends Includes {
  locations: Record<ResourceId, Locations.Location>;
  models: Record<ResourceId, ProviderServers.Server>;
  providers: Record<ResourceId, Provider>;
}

export interface ServerMeta {
  stats?: Stats;
  last_checkin?: Time;
  counts?: {
    instances: StatefulCounts<InstanceState>;
  };
}

export type ServerState =
  | "new"
  | "live"
  | "provisioning"
  | "offline"
  | "deleting"
  | "deleted";

export interface ServerProvider {
  identifier: ProviderIdentifier;
  model: string;
  location: string;
  server: string;
}

export async function getCollection(params: StandardParams<ServerQuery>) {
  return Request.getRequest<Collection>({
    ...params,
    target: links
      .infrastructure()
      .servers()
      .collection(),
  });
}

export async function getSingle(
  params: StandardParams<ServerQuery> & {
    id: ResourceId;
  },
) {
  return Request.getRequest<Single>({
    ...params,
    target: links
      .infrastructure()
      .servers()
      .single(params.id),
  });
}

export async function getTags(params: StandardParams) {
  return Request.getRequest<{ data: string[] }>({
    ...params,
    target: links
      .infrastructure()
      .servers()
      .tags(),
  });
}

export interface ServerCreate {
  provider: ProviderIdentifier;
  model_id: string;
  location_id: string;
  quantity: number;
  /** must have equal number of hostnames as quantity */
  hostnames?: string[];
}

export interface CreateParams {
  servers: ServerCreate[];
}

export async function create(
  params: StandardParams<ServerQuery> & {
    value: CreateParams;
  },
) {
  return Request.postRequest<CreatedTask<any>>({
    ...params,
    target: links
      .infrastructure()
      .servers()
      .collection(),
  });
}

export interface UpdateParams {
  tags: string[];
}

export async function update(
  params: StandardParams<ServerQuery> & {
    id: ResourceId;
    value: UpdateParams;
  },
) {
  return Request.patchRequest<Single>({
    ...params,
    target: links
      .infrastructure()
      .servers()
      .single(params.id),
  });
}

export async function remove(
  params: StandardParams<ServerQuery> & {
    id: ResourceId;
  },
) {
  return Request.deleteRequest<CreatedTask<"delete">>({
    ...params,
    target: links
      .infrastructure()
      .servers()
      .single(params.id),
  });
}
