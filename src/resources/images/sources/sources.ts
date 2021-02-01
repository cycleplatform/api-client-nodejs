import * as Request from "../../../common/api/request";
import { links, QueryParams, StandardParams } from "../../../common/api";
import {
  CollectionDoc,
  Events,
  Resource,
  ResourceId,
  SingleDoc,
  State,
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
export interface Source extends Resource<SourceMetas> {
  name: string;
  about?: About;
  origin: Origin;
  creator: UserScope;
  hub_id: ResourceId;
  state: SourceState;
  events: Events;
}

/****************************** Image Source Struct Sub Types ******************************/

export type SourceState = State<SourceStates>;

/** ### `type ImageSourceState`
 * Shared image source state.
 * Possible states can be the following:
 * - `live`
 * - `deleting`
 * - `deleted`
 *
 * ---
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
export type SourceStates = "live" | "deleting" | "deleted";

/****************************** Metas, Includes, Query, Docs ******************************/

export type SourceMetas = {
  image_counts?: number;
};
export interface SourcesIncludes {
  creators: UserIncludes;
}

export type SourcesQuery = QueryParams<
  keyof SourcesIncludes,
  keyof SourceMetas
>;

export type Single = SingleDoc<Source, SourcesIncludes>;
export type Collection = CollectionDoc<Source, SourcesIncludes>;

/****************************** Params ******************************/
/** Base Single Params */
type BSP = StandardParams<SourcesQuery> & {
  sourceId: ResourceId;
};
/** Base Collection Params */
type BCP = StandardParams<SourcesQuery>;

type GetCollectionParams = BCP;
type GetSingleParams = BSP;
type CreateParams = BCP & Request.PostParams<CreateValues>;
type UpdateParams = BSP & Request.PatchParams<UpdateValues>;

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
