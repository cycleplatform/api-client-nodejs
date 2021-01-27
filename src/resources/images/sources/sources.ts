import * as Request from "../../../common/api/request";
import { links, QueryParams, StandardParams } from "../../../common/api";
import { CollectionDoc, ResourceId, SingleDoc } from "../../../common/structs";
import { ImageSource, ImageOrigin, AboutImage } from "../source";

export type Single = SingleDoc<ImageSource>;
export type Collection = CollectionDoc<ImageSource>;
export type SourcesQuery = QueryParams<"", keyof SourcesMetas>;

export type Source = ImageSource<SourcesMetas, ImageOrigin>;

export type SourcesMetas = {
  image_counts?: number;
};

type BaseSingleDocParams = StandardParams<SourcesQuery> & {
  sourceId: ResourceId;
};

export type CreateValues = {
  name: string | null;
  origin: ImageSource["origin"];
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
