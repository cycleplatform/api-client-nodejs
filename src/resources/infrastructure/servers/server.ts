import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { links, Settings, QueryParams } from "../../../common/api";
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
} from "../provider";
import { InstanceState } from "../../containers/instances";

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
}

export type Collection = CollectionDoc<Server, ServerIncludes>;
export type Single = SingleDoc<Server>;

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

export async function getCollection({
  token,
  query,
  settings,
}: {
  token: Token;
  query?: ServerQuery;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    query,
    settings,
    token,
    target: links
      .infrastructure()
      .servers()
      .collection(),
  });
}

export async function getSingle({
  id,
  token,
  query,
  settings,
}: {
  id: ResourceId;
  token: Token;
  query?: ServerQuery;
  settings?: Settings;
}) {
  return Request.getRequest<Single>({
    query,
    settings,
    token,
    target: links
      .infrastructure()
      .servers()
      .single(id),
  });
}

export async function getTags({
  token,
  query,
  settings,
}: {
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<{ data: string[] }>({
    query,
    settings,
    token,
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

export async function create({
  token,
  query,
  settings,
  value,
}: {
  token: Token;
  query?: QueryParams;
  settings: Settings;
  value: CreateParams;
}) {
  return Request.postRequest<CreatedTask<any>>({
    query,
    settings,
    token,
    value,
    target: links
      .infrastructure()
      .servers()
      .collection(),
  });
}

export interface UpdateParams {
  tags: string[];
}

export async function update({
  id,
  token,
  value,
  query,
  settings,
}: {
  id: ResourceId;
  token: Token;
  value: UpdateParams;
  query?: ServerQuery;
  settings?: Settings;
}) {
  return Request.patchRequest<Single>({
    query,
    value,
    settings,
    token,
    target: links
      .infrastructure()
      .servers()
      .single(id),
  });
}

export async function remove({
  id,
  token,
  query,
  settings,
}: {
  id: ResourceId;
  token: Token;
  query?: ServerQuery;
  settings?: Settings;
}) {
  return Request.deleteRequest<CreatedTask<"delete">>({
    token,
    query,
    settings,
    target: links
      .infrastructure()
      .servers()
      .single(id),
  });
}
