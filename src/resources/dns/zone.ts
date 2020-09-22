import * as Request from "../../common/api/request";
import { QueryParams, links, StandardParams } from "../../common/api";
import {
  CollectionDoc,
  Resource,
  State,
  Events,
  CreatorScope,
  ResourceId,
  SingleDoc,
  CreatorIncludes,
  CreatedTask,
} from "../../common/structs";
import * as Records from "./records";

export * from "./tasks/zone";
export { Records };

export type Collection = CollectionDoc<Zone, ZoneIncludes>;
export type Single = SingleDoc<Zone, ZoneIncludes>;

export type ZoneState =
  | "new"
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
  creator: CreatorScope;
  origin: string;
  hosted: boolean;
  state: State<ZoneState>;
  events: Events<ZoneEvent>;
}

export interface ZoneIncludes {
  creators: CreatorIncludes;
}

export async function getCollection(params: StandardParams<ZoneQuery>) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.dns().zones().collection(),
  });
}

export async function getSingle(
  params: StandardParams<ZoneQuery> & {
    id: ResourceId;
  },
) {
  return Request.getRequest<Single>({
    ...params,
    target: links.dns().zones().single(params.id),
  });
}

export interface CreateParams {
  origin: string;
  hosted: boolean;
}

export async function create(
  params: StandardParams<ZoneQuery> & {
    value: CreateParams;
  },
) {
  return Request.postRequest<Single>({
    ...params,
    target: links.dns().zones().collection(),
  });
}

export type UpdateParams = Pick<CreateParams, "hosted">;

export async function update(
  params: StandardParams<ZoneQuery> & {
    id: ResourceId;
    value: UpdateParams;
  },
) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.dns().zones().single(params.id),
  });
}

export async function remove(
  params: StandardParams<ZoneQuery> & {
    zoneId: ResourceId;
  },
) {
  return Request.deleteRequest<CreatedTask<"delete">>({
    ...params,
    target: links.dns().zones().single(params.zoneId),
  });
}
