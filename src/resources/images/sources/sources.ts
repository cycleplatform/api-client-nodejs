import * as Request from "../../../common/api/request";
import { links, QueryParams, StandardParams } from "../../../common/api";
import {
  CollectionDoc,
  Events,
  Resource,
  ResourceId,
  SingleDoc,
  State as StateBase,
  UserIncludes,
  UserScope,
} from "../../../common/structs";
import { About, SourceType } from "../image";
import { Origin } from "../origin";

/****************************** Image Source Struct ******************************/

/** ### `interface ImageSource`
 * A direct source for a given image.
 *
 * ### Cycle Info
 * __Something doesn't look right or work as intended?__ \
 * Help us make a better TypeScript Platform Interface by submitting an issue on
 * [Cycles Github](https://github.com/cycleplatform/api-client-nodejs) or
 * forking our repo and submitting a
 * [Pull Request](https://github.com/cycleplatform/api-client-nodejs/pulls).
 *
 * [General Docs](https://docs.cycle.io) /
 * [Public API Docs](https://docs.cycle.io/api/introduction) /
 * [Internal API Docs](https://docs.cycle.io/internal-api/introduction) /
 * [Cycle's Website](https://cycle.io)
 *
 * ---
 *
 * Last Updated: 2021.01.29 — Grady S
 */
export interface Source extends Resource<Metas> {
  name: string;
  about?: About;
  origin: Origin;
  creator: UserScope;
  hub_id: ResourceId;
  state: State;
  events: Events;
}

/****************************** Image Source Struct Sub Types ******************************/
export type State = StateBase<States>;

/** ### `type States`
 * Shared image source state.
 * Possible states can be the following:
 * - `live`
 * - `deleting`
 * - `deleted`
 *
 * ---
 *
 * ### Cycle Info
 * __Something doesn't look right or work as intended?__
 * Help us make a better TypeScript Platform Interface by submitting an issue on
 * [Cycles Github](https://github.com/cycleplatform/api-client-nodejs) or
 * forking our repo and submitting a
 * [Pull Request](https://github.com/cycleplatform/api-client-nodejs/pulls).
 *
 * [General Docs](https://docs.cycle.io) /
 * [Public API Docs](https://docs.cycle.io/api/introduction) /
 * [Internal API Docs](https://docs.cycle.io/internal-api/introduction) /
 * [Cycle's Website](https://cycle.io)
 *
 * ---
 *
 * Last Updated: 2021.01.29 — Grady S
 */
export type States = "live" | "deleting" | "deleted";

/****************************** Metas, Includes, Query, Docs ******************************/

export type Metas = {
  images_count?: number;
};
export interface Includes {
  creators: UserIncludes;
}

export type Query = QueryParams<keyof Includes, keyof Metas>;

export type Single = SingleDoc<Source, Includes>;
export type Collection = CollectionDoc<Source, Includes>;

/****************************** Params ******************************/
/** Base Single Params */
type BSP = StandardParams<Query> & {
  sourceId: ResourceId;
};
/** Base Collection Params */
type BCP = StandardParams<Query>;

export type GetCollectionParams = BCP;
export type GetSingleParams = BSP;
export type CreateParams = BCP & Request.PostParams<CreateValues>;
export type UpdateParams = BSP & Request.PatchParams<UpdateValues>;

/****************************** Values ******************************/

export type CreateValues = {
  name?: string;
  type: SourceType;
  origin: Origin;
  about?: About;
};

export type UpdateValues = Partial<CreateValues>;

/****************************** Functions ******************************/

export async function getCollection(params: GetCollectionParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.images().sources().collection(),
  });
}

export async function create(params: CreateParams) {
  return Request.postRequest<Single>({
    ...params,
    target: links.images().sources().collection(),
  });
}

export async function getSingle(params: GetSingleParams) {
  return Request.getRequest<Single>({
    ...params,
    target: links.images().sources().single(params.sourceId),
  });
}

export async function update(params: UpdateParams) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.images().sources().single(params.sourceId),
  });
}
