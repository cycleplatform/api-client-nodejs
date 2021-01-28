import * as Request from "../../../common/api/request";
import { links, QueryParams, StandardParams } from "../../../common/api";
import {
  CollectionDoc,
  ResourceId,
  SingleDoc,
  UserIncludes,
} from "../../../common/structs";
import { ImageSource, ImageOrigin, AboutImage } from "../source";

export type Single = SingleDoc<ImageSource, SourcesIncludes>;
export type Collection = CollectionDoc<ImageSource, SourcesIncludes>;
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

type BaseSingleDocParams = StandardParams<SourcesQuery> & {
  sourceId: ResourceId;
};

export type CreateValues = {
  name: string | null;
  origin: ImageOrigin;
  about?: AboutImage;
};

type GetCollectionParams = StandardParams<SourcesQuery>;
export async function getCollection(params: GetCollectionParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.images().sources().collection(),
  });
}

type CreateParams = StandardParams<SourcesQuery> &
  Request.PostParams<CreateValues>;
export async function create(params: CreateParams) {
  return Request.postRequest<Single>({
    ...params,
    target: links.images().sources().collection(),
  });
}

type GetSingleParams = BaseSingleDocParams;
export async function getSingle(params: GetSingleParams) {
  return Request.getRequest<Single>({
    ...params,
    target: links.images().sources().single(params.sourceId),
  });
}

export type UpdateSourceValues = Partial<CreateValues>;
type UpdateParams = BaseSingleDocParams & {
  value: Partial<UpdateSourceValues>;
};
export async function update(params: UpdateParams) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.images().sources().single(params.sourceId),
  });
}
