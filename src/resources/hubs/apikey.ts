import {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
} from "common/api/request";
import { links, StandardParams } from "common/api";
import {
  CollectionDoc,
  Resource,
  ResourceId,
  Events,
  State,
  OwnerScope,
  SingleDoc,
} from "common/structs";
import { Capability } from "./capability";

export type Collection = CollectionDoc<ApiKey>;
export type Single = SingleDoc<ApiKey>;

export interface ApiKey extends Resource {
  name: string;
  owner: OwnerScope;
  hub_id: ResourceId;
  secret?: string;
  capabilities?: Capability[];
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
  return getRequest<Collection>({
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
  return getRequest<Single>({
    ...params,
    target: links
      .hubs()
      .keys()
      .single(params.apiKeyId),
  });
}

export async function create(params: StandardParams & { value: CreateParams }) {
  return postRequest<Single>({
    ...params,
    target: links
      .hubs()
      .keys()
      .collection(),
  });
}

export async function update(
  params: StandardParams & { keyId: ResourceId; value: Partial<CreateParams> },
) {
  return patchRequest<Single>({
    ...params,
    target: links
      .hubs()
      .keys()
      .single(params.keyId),
  });
}

export async function remove(
  params: StandardParams & {
    keyId: ResourceId;
  },
) {
  return deleteRequest<Single>({
    ...params,
    target: links
      .hubs()
      .keys()
      .single(params.keyId),
  });
}
