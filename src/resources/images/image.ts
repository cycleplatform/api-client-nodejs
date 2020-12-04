import * as Request from "../../common/api/request";
import {
  QueryParams,
  links,
  StandardParams,
  PostParams,
} from "../../common/api";
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
import { ImageSource } from "../stacks/spec/v1/image";
import { ContainerIdentifier } from "../../common/structs";

export type Collection = CollectionDoc<Image, ImageIncludes>;
export type Single = SingleDoc<Image, ImageIncludes>;
export type ImageQuery = QueryParams<keyof ImageIncludes, keyof ImageMetas>;
/**
 * Information on the image state
 */
export type ImageState =
  | "new"
  | "downloading"
  | "building"
  | "verifying"
  | "saving"
  | "live"
  | "deleting"
  | "deleted";

/**
 * An extended resource including information about images
 */
export interface Image extends Resource<ImageMetas> {
  /** The name of the image */
  name: string;
  stack: StackSummary | null;
  size: Bytes;
  /** Optional information about the image */
  about?: {
    /** A description of the image */
    description: string | null;
  };

  backend: ImageBackend;
  /** An array of tags for the image */
  tags: string[];
  config: Config;
  source: ImageSource;
  creator: UserScope;
  hub_id: ResourceId;
  state: State<ImageState>;
  events: Events;
}
/**
 * Information about where the image is hosted
 */
export interface ImageBackend {
  /** The provider hosting the image  */
  provider: string;
  size: Bytes;
}
/**
 * High level stack information
 */
export interface StackSummary {
  id: ResourceId;
  build_id: ResourceId;
  /** An array of container identifiers */
  containers: ContainerIdentifier[];
}

export interface ImageMetas {
  containers_count?: number;
}

export interface ImageIncludes {
  creators: UserIncludes;
  stack_builds: Record<ResourceId, Builds.Build>;
  stacks: Record<ResourceId, Stack>;
}

/**
 * Fetch a list of images
 * @capability images-view
 */
export async function getCollection(params: StandardParams<ImageQuery>) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.images().collection(),
  });
}

/**
 * Fetch a single image
 * @capability images-view
 */
export async function getSingle(
  params: StandardParams<ImageQuery> & {
    id: ResourceId;
  },
) {
  return Request.getRequest<Single>({
    ...params,
    target: links.images().single(params.id),
  });
}

export interface CreateParams {
  source: ImageSource;
}

/**
 * Creates an image object. This DOES NOT import it, you'll need to call
 * importImage() with the id of this to be able to use it.
 * @param params standard params, and image source value
 * @capability images-import
 */
export async function create(
  params: StandardParams<ImageQuery> & PostParams<CreateParams>,
) {
  return Request.postRequest<Single>({
    ...params,
    target: links.images().collection(),
  });
}

/**
 * Parameters for updating an image
 */
export interface UpdateParams {
  /** The new name for the image */
  name: string;
}

/**
 * Update basic image properties
 * @param params.id - Image ID
 * @param params.value.name - The name we want to set for this image
 * @capability images-update
 */
export async function update(
  params: StandardParams<ImageQuery> & {
    id: ResourceId;
    value: UpdateParams;
  },
) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.images().single(params.id),
  });
}
