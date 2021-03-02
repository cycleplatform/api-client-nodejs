import * as Request from "../../common/api/request";
import { links, QueryParams, StandardParams } from "../../common/api";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  ResourceId,
  State as StateBase,
  Events as EventsBase,
  UserScope,
  UserIncludes,
} from "../../common/structs";
import { Spec } from "./spec";
import { Repo } from "../images/origin";

/****************************** Stack Struct ******************************/

export interface Stack extends Resource<StackMetas> {
  name: string;
  creator: UserScope;
  hub_id: ResourceId;
  source: Source;
  state: State;
  events: Events;
}

/****************************** Stack Struct Sub Types ******************************/

export type State = StateBase<States>;
export type States = "live" | "deleting" | "deleted";
export type Events = EventsBase<"last_build">;
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

export interface AllSourcesMap {
  /**
   * @see /resources/images/origin.ts for the Repo interface
   */
  "git-repo": Repo;
  raw: Spec;
}

export type AllSourcesKeys = keyof AllSourcesMap;

/****************************** Metas, Includes, Docs, Query ******************************/

export interface StackMetas {
  containers_count?: number;
  builds_count?: number;
}

export interface Includes {
  creators: UserIncludes;
}

export type Collection = CollectionDoc<Stack>;
export type Single = SingleDoc<Stack>;
export type Query = QueryParams<keyof Includes, keyof StackMetas>;

/****************************** Params ******************************/
/** Base Single Params */
type BSP = StandardParams<Query> & { id: ResourceId };
/** Base Collection Params */
type BCP = StandardParams<Query>;

export type GetCollectionParams = BCP;
export type GetSingleParams = BSP;
export type CreateParams = BCP & Request.PostParams<StackCreateParams>;
export type UpdateParams = BSP & Request.PatchParams<UpdateValues>;

/****************************** Values ******************************/

// TODO: change to CreateValues in v2
export interface StackCreateParams {
  name: string;
  source: Source;
}

export type UpdateValues = Partial<StackCreateParams>;

/****************************** Functions ******************************/

export async function getCollection(params: GetCollectionParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.stacks().collection(),
  });
}

export async function getSingle(params: GetSingleParams) {
  return Request.getRequest<Single>({
    ...params,
    target: links.stacks().single(params.id),
  });
}

export async function create(params: CreateParams) {
  return Request.postRequest<Single>({
    ...params,
    target: links.stacks().collection(),
  });
}

export async function update(params: UpdateParams) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.stacks().single(params.id),
  });
}
