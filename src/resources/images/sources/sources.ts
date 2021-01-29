import * as Request from "../../../common/api/request";
import { links, QueryParams, StandardParams } from "../../../common/api";
import {
  CollectionDoc,
  ResourceId,
  SingleDoc,
  UserIncludes,
} from "../../../common/structs";
import { ImageSource, ImageOrigin, AboutImage } from "../source";
import { ImageSourceType } from "../image";

export type Single = SingleDoc<ImageSource, SourcesIncludes>;
export type Collection = CollectionDoc<ImageSource, SourcesIncludes>;

/** Base Single Params */
type BSP = StandardParams<SourcesQuery> & {
  sourceId: ResourceId;
};

type GetCollectionParams = StandardParams<SourcesQuery>;

export type CreateValues = {
  name?: string;
  type: ImageSourceType;
  origin: ImageOrigin;
  about?: AboutImage;
};
type CreateParams = StandardParams<SourcesQuery> &
  Request.PostParams<CreateValues>;

type GetSingleParams = BSP;

export type UpdateSourceValues = Partial<CreateValues>;
type UpdateParams = BSP & {
  value: Partial<UpdateSourceValues>;
};

export type SourcesQuery = QueryParams<
  keyof SourcesIncludes,
  keyof SourcesMetas
>;

export type Source = ImageSource<SourcesMetas>;

export type SourcesMetas = {
  image_counts?: number;
};

export interface SourcesIncludes {
  creators: UserIncludes;
}

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
