import * as Request from "../../common/api/request";
import { links, StandardParams } from "../../common/api";
import {
  CollectionDoc,
  Resource,
  ResourceId,
  Events,
  State,
  OwnerScope,
  SingleDoc,
} from "../../common/structs";
import { Capability } from "./capability";

export type Collection = CollectionDoc<ApiKey>;
export type Single = SingleDoc<ApiKey>;

export interface ApiKey extends Resource {
  name: string;
  owner: OwnerScope;
  hub_id: ResourceId;
  ips: string[] | null;
  state: State<ApiKeyState>;
  events: Events;
}

export type ApiKeyState = "live" | "deleting" | "deleted";

export interface CreateParams {
  name: string;
  capabilities: Capability[];
  ips: string[] | null;
}

export async function getCollection(params: StandardParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links
      .hubs()
      .keys()
      .collection(),
  });
}

export async function getSingle(
  params: StandardParams & {
    apiKeyId: ResourceId;
  },
) {
  return Request.getRequest<Single>({
    ...params,
    target: links
      .hubs()
      .keys()
      .single(params.apiKeyId),
  });
}

export async function create(params: StandardParams & { value: CreateParams }) {
  return Request.postRequest<Single>({
    ...params,
    target: links
      .hubs()
      .keys()
      .collection(),
  });
}

export async function remove(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return Request.deleteRequest<Single>({
    ...params,
    target: links
      .hubs()
      .keys()
      .single(params.id),
  });
}
