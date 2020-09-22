import * as Request from "../../common/api/request";
import { links, StandardParams } from "../../common/api";
import {
  CollectionDoc,
  Resource,
  ResourceId,
  Events,
  State,
  CreatorScope,
  SingleDoc,
} from "../../common/structs";
import { Capability } from "./capability";

export type Collection = CollectionDoc<ApiKey>;
export type Single = SingleDoc<ApiKey>;

export interface ApiKey extends Resource {
  name: string;
  creator: CreatorScope;
  hub_id: ResourceId;
  secret?: string;
  permissions: Permissions;
  capabilities: Capability[];
  ips: string[] | null;
  state: State<ApiKeyState>;
  events: Events;
}

export type ApiKeyState = "live" | "deleting" | "deleted";

export interface Permissions {
  all_environments: boolean;
  environments: EnvironmentPermission[];
}

export interface EnvironmentPermission {
  id: ResourceId;
  manage: boolean;
}

export interface CreateParams {
  name: string;
  permissions?: Permissions;
  capabilities: Capability[];
  ips: string[] | null;
}

export async function getCollection(params: StandardParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.hubs().keys().collection(),
  });
}

export async function getSingle(
  params: StandardParams & {
    apiKeyId: ResourceId;
  },
) {
  return Request.getRequest<Single>({
    ...params,
    target: links.hubs().keys().single(params.apiKeyId),
  });
}

export async function create(params: StandardParams & { value: CreateParams }) {
  return Request.postRequest<Single>({
    ...params,
    target: links.hubs().keys().collection(),
  });
}

export async function update(
  params: StandardParams & { keyId: ResourceId; value: Partial<CreateParams> },
) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.hubs().keys().single(params.keyId),
  });
}

export async function remove(
  params: StandardParams & {
    keyId: ResourceId;
  },
) {
  return Request.deleteRequest<Single>({
    ...params,
    target: links.hubs().keys().single(params.keyId),
  });
}
