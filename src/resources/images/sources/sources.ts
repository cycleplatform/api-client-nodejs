import * as Request from "../../../common/api/request";
import { links, QueryParams, StandardParams } from "../../../common/api";
import { CollectionDoc, ResourceId, SingleDoc } from "../../../common/structs";
import { ImageSource, ImageOrigin } from "../source";

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

type CreateValues = {
  name: string | null;
  origin: ImageSource["origin"];
};

type GetSourcesParams = StandardParams<SourcesQuery>;
export async function getSources(params: GetSourcesParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.images().sources().collection(),
  });
}

type CreateSourceParams = StandardParams<SourcesQuery> &
  Request.PostParams<CreateValues>;
export async function createSource(params: CreateSourceParams) {
  return Request.postRequest<Single>({
    ...params,
    target: links.images().sources().collection(),
  });
}

type SourceParams = BaseSingleDocParams;
export async function getSource(params: SourceParams) {
  return Request.getRequest<Single>({
    ...params,
    target: links.images().sources().single(params.sourceId),
  });
}

type UpdateSourceValues = {
  name: string | null;
  origin: ImageSource["origin"];
};

type UpdateSourceParams = BaseSingleDocParams & {
  value: Partial<UpdateSourceValues>;
};
export async function updateSource(params: UpdateSourceParams) {
  return Request.patchRequest({
    ...params,
    target: links.images().sources().single(params.sourceId),
  });
}

type DeleteSourceParams = BaseSingleDocParams;
export async function deleteSource(params: DeleteSourceParams) {
  return Request.deleteRequest({
    ...params,
    target: links.images().sources().single(params.sourceId),
  });
}
