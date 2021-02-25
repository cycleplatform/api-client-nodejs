import * as Request from "../../common/api/request";
import { links, QueryParams, StandardParams } from "../../common/api";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  ResourceId,
  State,
  Events,
  UserScope,
  UserIncludes,
} from "../../common/structs";
import { Spec } from "./spec";
import { Repo } from "../images/origin";

export type Collection = CollectionDoc<Stack>;
export type Single = SingleDoc<Stack>;
export type StackState = "live" | "deleting" | "deleted";
export type Query = QueryParams<keyof Includes, keyof StackMetas>;

type BSP = StandardParams & { id: ResourceId };
export interface StackCreateParams {
  name: string;
  source: Source;
}

export interface Stack extends Resource<StackMetas> {
  name: string;
  creator: UserScope;
  hub_id: ResourceId;
  source: Source;
  state: State<StackState>;
  events: Events<"last_build">;
}

export interface StackMetas {
  containers_count?: number;
  builds_count?: number;
}

export type Source = SourceBase<"git-repo"> | SourceBase<"raw">;

export interface SourceBase<T extends AllSourcesKeys> {
  /**
   * Key of the origin. Can be any of the following:
   * - `git-repo`
   * - `raw`
   */
  type: T;
  details: AllSourcesMap[T];
}

export interface Includes {
  creators: UserIncludes;
}

export interface AllSourcesMap {
  /**
   * @see /resources/images/origin.ts for the Repo interface
   */
  "git-repo": Repo;
  raw: Spec;
}

export type AllSourcesKeys = keyof AllSourcesMap;

export async function getCollection(params: StandardParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.stacks().collection(),
  });
}

export async function getSingle(params: BSP) {
  return Request.getRequest<Single>({
    ...params,
    target: links.stacks().single(params.id),
  });
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
