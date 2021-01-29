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

export interface SourcesIncludes {
  creators: UserIncludes;
}
export type Single = SingleDoc<ImageSource, SourcesIncludes>;
export type Collection = CollectionDoc<ImageSource, SourcesIncludes>;

export type SourcesMetas = {
  image_counts?: number;
};
export type Source = ImageSource<SourcesMetas>;

// Query
export type SourcesQuery = QueryParams<
  keyof SourcesIncludes,
  keyof SourcesMetas
>;

/** Base Single Params */
type BSP = StandardParams<SourcesQuery> & {
  sourceId: ResourceId;
};
/** Base Collection Params */
type BCP = StandardParams<SourcesQuery>;

// Params
type GetCollectionParams = BCP;
type GetSingleParams = BSP;
type CreateParams = BCP & Request.PostParams<CreateValues>;
type UpdateParams = BSP & Request.PatchParams<UpdateValues>;

// Values
export type CreateValues = {
  name?: string;
  type: ImageSourceType;
  origin: ImageOrigin;
  about?: AboutImage;
};
export type UpdateValues = Partial<CreateValues>;

// Functions
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
