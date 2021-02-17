import * as Request from "../../common/api/request";
import { links, StandardParams } from "../../common/api";
import {
  CollectionDoc,
  Resource,
  ResourceId,
  Events,
  State,
  UserScope,
  SingleDoc,
} from "../../common/structs";
import { Capability } from "./capability";

export type Collection = CollectionDoc<ApiKey>;
export type Single = SingleDoc<ApiKey>;

/**
 * An extended resource that has information on a Cycle hub API key
 */

export interface ApiKey extends Resource {
  /** The name of the API key  */
  name: string;
  creator: UserScope;
  hub_id: ResourceId;
  /** The API key secret */
  secret?: string;
  permissions: Permissions;
  capabilities: ApiKeyCapabilities;
  ips: string[] | null;
  state: State<ApiKeyState>;
  events: Events;
}

export interface ApiKeyCapabilities {
  all: boolean;
  specific: Capability[];
}

/**
 * The different states an API key can be in
 */
export type ApiKeyState = "live" | "deleting" | "deleted";

/**
 * Permissions information for an API Key
 */
export interface Permissions {
  /** A boolean, where true represents this API key is authorized to make requests that involve all of a hubs environments */
  all_environments: boolean;
  /** An array of environment permission configurations */
  environments: EnvironmentPermission[];
}
/**
 * An environment ID and a boolean representing management configuration for an API key
 */
export interface EnvironmentPermission {
  id: ResourceId;
  /** A boolean, where true represents the API keys ability to make changes to the environment components */
  manage: boolean;
}
/**
 * Create information used for an API key
 */
export interface CreateParams {
  /** The name of the API key */
  name: string;
  permissions?: Permissions;
  capabilities: ApiKeyCapabilities;
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
