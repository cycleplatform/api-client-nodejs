import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, Settings } from "../../common/api";
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
import { Builds, Stack, Spec } from "../stacks";

export type Collection = CollectionDoc<Image>;
export type Single = SingleDoc<Image>;
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
  stack_id: ResourceId;
  size: Bytes;
  about?: {
    description: string | null;
  };
  tags: string[];
  config: Config;
  source: Spec.ImageSource;
  owner: OwnerScope;
  cloud_id: ResourceId;
  state: State<ImageState>;
  events: Events;
}

export interface ImageMetas {
  containers_count?: number;
}

export interface ImageIncludes {
  owners: OwnerInclude;
  stack_builds: {
    [key: string]: Builds.Build;
  };
  stacks: {
    [key: string]: Stack;
  };
}

export async function getCollection({
  token,
  query,
  settings,
}: {
  token: Token;
  query?: ImageQuery;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    query,
    token,
    settings,
    target: links.images().collection(),
  });
}

export async function getSingle({
  id,
  token,
  query,
  settings,
}: {
  id: ResourceId;
  token: Token;
  query?: ImageQuery;
  settings?: Settings;
}) {
  return Request.getRequest<Single>({
    query,
    token,
    settings,
    target: links.images().single(id),
  });
}

export interface UpdateParams {
  name: string;
}

export async function update({
  id,
  value,
  token,
  query,
  settings,
}: {
  id: ResourceId;
  value: UpdateParams;
  token: Token;
  query?: ImageQuery;
  settings?: Settings;
}) {
  return Request.patchRequest<Single>({
    value,
    query,
    token,
    settings,
    target: links.images().single(id),
  });
}
