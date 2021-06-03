import {
  Resource,
  ResourceId,
  UserScope,
  State as BaseState,
  Events,
  CollectionDoc,
  SingleDoc
} from "../../common/structs";
import { links, QueryParams, StandardParams } from "../../common/api";
import * as Request from "../../common/api/request";

/****************************** Secret Struct ******************************/

export interface Secret extends Resource {
  creator: UserScope;
  hub_id: ResourceId;
  environment_id: ResourceId;
  identifier: string;
  source: Source;
  scope: Scope;
  state: State;
  events: Events;
}

/****************************** Secret Struct Sub Types ******************************/

export interface State extends BaseState<States> {}

export type States =
  "live" |
  "deleting" |
  "deleted";

export type Source = SourceBase<"raw"> | SourceBase<"url">;

export interface SourceBase<T extends AllSourceKeys> {
  type: T;
  details: AllSources[T];
}

export interface AllSources {
  "raw": RawSource;
  "url": URLSource;
}

export type AllSourceKeys = keyof AllSources;

export interface RawSource {
  string: string;
}

export interface URLSource {
  url: string;
}

export interface Scope {
  access: ScopeAccess;
  containers: ScopeContainers;
}

export interface ScopeAccess {
  env_variable: boolean;
  internal_api: boolean;
}

export interface ScopeContainers {
  global: boolean;
  ids: ResourceId[];
  identifiers: string[]
}

/****************************** Metas, Includes, Docs, Query ******************************/

export type Collection = CollectionDoc<Secret>;
export type Single = SingleDoc<Secret>;
export type Query = QueryParams;

/****************************** Params ******************************/
/** Base Single Params */
interface BSP extends StandardParams<Query> {
  environmentId: ResourceId;
  id: ResourceId
}
/** Base Collection Params */
interface BCP extends StandardParams<Query> {
  environmentId: ResourceId;
}

export interface GetCollectionParams extends BCP {}
export interface GetSingleParams extends BSP {}

export type CreateParams = BCP & Request.PostParams<CreateValues>;
export type UpdateParams = BSP & Request.PatchParams<UpdateValues>;
export interface RemoveParams extends BSP {}

/****************************** Values ******************************/

export interface CreateValues {
  identifier: string;
  scope: Scope;
  source: Source;
}

export type UpdateValues = Partial<CreateValues>;

/****************************** Regular Functions ******************************/

export async function getCollection(params: GetCollectionParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.environments().secrets().collection(params.environmentId)
  })
}

export async function getSingle(params: GetSingleParams) {
  return Request.getRequest<Single>({
    ...params,
    target: links.environments().secrets().single(params.environmentId, params.id)
  })
}

export async function create(params: CreateParams) {
  return Request.postRequest<Single>({
    ...params,
    target: links.environments().secrets().collection(params.environmentId)
  })
}

export async function update(params: UpdateParams) {
  return Request.patchRequest<Single>({
      ...params,
      target: links.environments().secrets().single(params.environmentId, params.id),
  })
}

/****************************** Task Functions ******************************/

export async function remove(params: RemoveParams) {
  return Request.deleteRequest({
    ...params,
    target: links.environments().secrets().single(params.environmentId, params.id),
  })
}
