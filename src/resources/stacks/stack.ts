import * as Request from "../../common/api/request";
import { links, StandardParams } from "../../common/api";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  ResourceId,
  State,
  Events,
  OwnerScope,
} from "../../common/structs";
import { Spec } from "./spec";

export type Collection = CollectionDoc<Stack>;
export type Single = SingleDoc<Stack>;
export type StackState = "live" | "deleting" | "deleted";

export interface Stack extends Resource {
  name: string;
  owner: OwnerScope;
  hub_id: ResourceId;
  source: Source;
  state: State<StackState>;
  events: Events<"last_build">;
}

export interface Source {
  repo?: Repo;
  raw?: Spec;
}

export interface Repo {
  url: string;
  private_key?: string; // used for creating
  private_key_url?: string;
}

export async function getCollection(params: StandardParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.stacks().collection(),
  });
}

export async function getSingle(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return Request.getRequest<Single>({
    ...params,
    target: links.stacks().single(params.id),
  });
}

export interface StackCreateParams {
  name: string;
  source: Source;
}

export async function create(
  params: StandardParams & {
    value: StackCreateParams;
  },
) {
  return Request.postRequest<Single>({
    ...params,
    target: links.stacks().collection(),
  });
}

export async function update(
  params: StandardParams & {
    id: ResourceId;
    value: StackCreateParams;
  },
) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.stacks().single(params.id),
  });
}
