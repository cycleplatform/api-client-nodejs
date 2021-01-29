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
import { ContainerIdentifier } from "../../common/structs";
import { ImageOrigin } from "resources/stacks/spec/v1";

export type Collection = CollectionDoc<Image, ImageIncludes>;
export type Single = SingleDoc<Image, ImageIncludes>;
export type ImageQuery = QueryParams<keyof ImageIncludes, keyof ImageMetas>;
export type ImageState =
  | "new"
  | "downloading"
  | "building"
  | "verifying"
  | "saving"
  | "live"
  | "deleting"
  | "deleted";

export interface Image extends Resource<ImageMetas> {
  name: string;
  stack: StackSummary | null;
  size: Bytes;
  about?: {
    description: string | null;
  };
  backend: ImageBackend;
  tags: string[];
  config: Config;
  source: ImageSource;
  creator: UserScope;
  hub_id: ResourceId;
  state: State<ImageState>;
  events: Events;
}

export type ImageSourceType = "stack-build" | "direct";

export interface ImageSource {
  type: ImageSourceType;
  source: {
    id: ResourceId;
    origin: ImageOrigin;
  };
}

export interface ImageBackend {
  provider: string;
  size: Bytes;
}

export interface StackSummary {
  id: ResourceId;
  build_id: ResourceId;
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

// Takes the sourceId to create the image
export interface CreateParams {
  source_id: ResourceId;
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
