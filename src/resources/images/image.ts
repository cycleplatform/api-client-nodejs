import * as Request from "../../common/api/request";
import { QueryParams, links, StandardParams } from "../../common/api";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  ResourceId,
  State as StateBase,
  Events,
  Bytes,
  UserScope,
  UserIncludes,
} from "../../common/structs";
import { Config } from "./config";
import { Builds, Stack } from "../stacks";
import { ContainerIdentifier } from "../../common/structs";
import { Origin } from "./origin";

/****************************** Image Struct ******************************/
export interface Image extends Resource<Metas> {
  name: string;
  stack: StackSummary | null;
  size: Bytes;
  about?: About;
  backend: Backend;
  tags: string[];
  config: Config;
  source: Source;
  creator: UserScope;
  hub_id: ResourceId;
  state: State;
  events: Events;
}

/****************************** Image Struct Sub Types ******************************/
export interface About {
  description: string | null;
}

export type States =
  | "new"
  | "downloading"
  | "building"
  | "verifying"
  | "saving"
  | "live"
  | "deleting"
  | "deleted";

export type State = StateBase<States>;
export interface Backend {
  provider: string;
  size: Bytes;
}
export interface Source {
  type: SourceType;
  details: SourceDetails;
}

export type SourceType = "stack-build" | "direct";

export interface SourceDetails {
  id: ResourceId;
  origin: Origin;
}

export interface StackSummary {
  id: ResourceId;
  build_id: ResourceId;
  containers: ContainerIdentifier[];
}

/****************************** Metas, Includes, Docs, Query ******************************/

export interface Metas {
  containers_count?: number;
}

export interface Includes {
  creators: UserIncludes;
  stack_builds: Record<ResourceId, Builds.Build>;
  stacks: Record<ResourceId, Stack>;
}

export type Collection = CollectionDoc<Image, Includes>;
export type Single = SingleDoc<Image, Includes>;
export type Query = QueryParams<keyof Includes, keyof Metas>;

/****************************** Params ******************************/
/** Base Single Params */
type BSP = StandardParams<Query> & {
  id: ResourceId;
};
/** Base Collection Params */
type BCP = StandardParams<Query>;

export type GetCollectionParams = BCP;
export type GetSingleParams = BSP;
export type CreateParams = BSP & Request.PostParams<CreateValues>;
export type UpdateParams = BSP & Request.PatchParams<UpdateValues>;

/****************************** Values ******************************/
export interface CreateValues {
  source_id: ResourceId;
}
export interface UpdateValues {
  /** The new name for the image */
  name: string;
}

/****************************** Functions ******************************/

/** ### `getCollection(params: GetCollectionParams)`
 * Fetch a list of images
 *
 * __Capability:__ `images-view`
 */
export async function getCollection(params: GetCollectionParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.images().collection(),
  });
}

/** ### `getSingle(params: GetSingleParams)`
 * Fetch a single image
 * __Capability:__ `images-view`
 */
export async function getSingle(params: GetSingleParams) {
  return Request.getRequest<Single>({
    ...params,
    target: links.images().single(params.id),
  });
}

/** ### `create(params: CreateParams)`
 * Creates an image object.
 * __Capability:__ `images-import`
 *
 * ### Important Notes
 * Calling the `create()` function does not import an image. To
 * import an image call @see {importImage()}.
 */
export async function create(params: CreateParams) {
  return Request.postRequest<Single>({
    ...params,
    target: links.images().collection(),
  });
}

/** ### `update(params: UpdateParams)`
 * Update basic image properties
 * __Capability:__ `images-update`
 */
export async function update(params: UpdateParams) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.images().single(params.id),
  });
}
