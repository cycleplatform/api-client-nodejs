import * as Request from "../../common/api/request";
import { QueryParams, links, StandardParams } from "../../common/api";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  ResourceId,
  State,
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
export interface Image extends Resource<ImageMetas> {
  name: string;
  stack: ImageStackSummary | null;
  size: Bytes;
  about?: ImageAbout;
  backend: ImageBackend;
  tags: string[];
  config: Config;
  source: ImageSource;
  creator: UserScope;
  hub_id: ResourceId;
  state: ImageState;
  events: Events;
}

/****************************** Image Struct Sub Types ******************************/
export interface ImageAbout {
  description: string | null;
}

export type ImageStates =
  | "new"
  | "downloading"
  | "building"
  | "verifying"
  | "saving"
  | "live"
  | "deleting"
  | "deleted";

export type ImageState = State<ImageStates>;
export interface ImageBackend {
  provider: string;
  size: Bytes;
}
export interface ImageSource {
  type: ImageSourceType;
  details: ImageSourceDetails;
}

export type ImageSourceType = "stack-build" | "direct";

export interface ImageSourceDetails {
  id: ResourceId;
  origin: Origin;
}

export interface ImageStackSummary {
  id: ResourceId;
  build_id: ResourceId;
  containers: ContainerIdentifier[];
}

/****************************** Metas, Includes, Docs, Query ******************************/

export interface ImageMetas {
  containers_count?: number;
}

export interface ImageIncludes {
  creators: UserIncludes;
  stack_builds: Record<ResourceId, Builds.Build>;
  stacks: Record<ResourceId, Stack>;
}

export type Collection = CollectionDoc<Image, ImageIncludes>;
export type Single = SingleDoc<Image, ImageIncludes>;
export type ImageQuery = QueryParams<keyof ImageIncludes, keyof ImageMetas>;

/****************************** Params ******************************/
/** Base Single Params */
type BSP = StandardParams<ImageQuery> & {
  id: ResourceId;
};
/** Base Collection Params */
type BCP = StandardParams<ImageQuery>;

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
 * @capability images-view
 */
export async function getCollection(params: GetCollectionParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.images().collection(),
  });
}

/** ### `getSingle(params: GetSingleParams)`
 * @capability images-view
 */
export async function getSingle(params: GetSingleParams) {
  return Request.getRequest<Single>({
    ...params,
    target: links.images().single(params.id),
  });
}

/** ### `create(params: CreateParams)`
 * Creates an image object. This DOES NOT import it, you'll need to call
 * @capability images-import
 */
export async function create(params: CreateParams) {
  return Request.postRequest<Single>({
    ...params,
    target: links.images().collection(),
  });
}

/** ### `update(params: UpdateParams)`
 * Update basic image properties
 * @capability images-update
 */
export async function update(params: UpdateParams) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.images().single(params.id),
  });
}
