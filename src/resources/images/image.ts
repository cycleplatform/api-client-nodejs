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
  OwnerScope,
  OwnerInclude,
} from "../../common/structs";
import { Config } from "./config";
import { Builds, Stack } from "../stacks";
import { ImageSource } from "./source";
import { ContainerIdentifier } from "../../common/structs";

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
  tags: string[];
  config: Config;
  source: ImageSource;
  owner: OwnerScope;
  hub_id: ResourceId;
  state: State<ImageState>;
  events: Events;
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
  owners: OwnerInclude;
  stack_builds: Record<ResourceId, Builds.Build>;
  stacks: Record<ResourceId, Stack>;
}

export async function getCollection(params: StandardParams<ImageQuery>) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.images().collection(),
  });
}

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

export interface UpdateParams {
  name: string;
}

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
