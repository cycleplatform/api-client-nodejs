import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, Settings } from "../../common/api";
import {
  CollectionDoc,
  Resource,
  State,
  Events,
  OwnerScope,
  ResourceId,
  SingleDoc,
  OwnerInclude,
  CreatedTask,
} from "../../common/structs";
import * as Records from "./records";

export * from "./tasks/zone";
export { Records };

export type Collection = CollectionDoc<Zone, ZoneIncludes>;
export type Single = SingleDoc<Zone, ZoneIncludes>;

export type ZoneState =
  | "pending"
  | "verifying"
  | "live"
  | "disabled"
  | "deleting"
  | "deleted";
export type ZoneEvent = "last_verification" | "verified";
export type ZoneQuery = QueryParams<keyof ZoneIncludes>;

export interface Zone extends Resource {
  hub_id: ResourceId;
  owner: OwnerScope;
  origin: string;
  state: State<ZoneState>;
  events: Events<ZoneEvent>;
}

export interface ZoneIncludes {
  owners: OwnerInclude;
}

export async function getCollection({
  token,
  query,
  settings,
}: {
  token: Token;
  query?: ZoneQuery;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    query,
    token,
    settings,
    target: links
      .dns()
      .zones()
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
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<Single>({
    query,
    token,
    settings,
    target: links
      .dns()
      .zones()
      .single(id),
  });
}

export interface CreateParams {
  origin: string;
}

export async function create({
  value,
  token,
  query,
  settings,
}: {
  value: CreateParams;
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.postRequest<Single>({
    query,
    token,
    settings,
    value,
    target: links
      .dns()
      .zones()
      .collection(),
  });
}

export async function remove({
  zoneId,
  token,
  query,
  settings,
}: {
  zoneId: ResourceId;
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.deleteRequest<CreatedTask<"delete">>({
    query,
    token,
    settings,
    target: links
      .dns()
      .zones()
      .single(zoneId),
  });
}
