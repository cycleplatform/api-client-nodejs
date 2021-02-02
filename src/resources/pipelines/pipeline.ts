import * as Request from "../../common/api/request";
import { links, QueryParams, StandardParams } from "../../common/api";
import {
  CollectionDoc,
  UserIncludes,
  UserScope,
  Events as BaseEvents,
  Resource,
  ResourceId,
  SingleDoc,
  Time,
  State,
} from "../../common/structs";
import { Step } from "./steps";

export type Collection = CollectionDoc<Pipeline, PipelineIncludes>;
export type Single = SingleDoc<Pipeline, PipelineIncludes>;
export type PipelineQuery = QueryParams<keyof PipelineIncludes>;

export type Events = BaseEvents & {
  last_run: Time;
};

export type PipelineState = "new" | "deleting" | "deleted";

export type Pipeline = Resource & {
  name: string;
  creator: UserScope;
  hub_id: ResourceId;
  disable: boolean;
  stages: Stage[];
  events: Events;
  state: State<PipelineState>;
};

export type Stage = {
  identifier: string;
  skip: boolean;
  steps: Step[];
};

export type PipelineIncludes = {
  name: string;
  creators: UserIncludes;
};

/** Base Collection Params */
type BCP = StandardParams;
/** Base Single Params */
type BSP = StandardParams<PipelineQuery> & {
  id: ResourceId;
};

// Params
export type GetCollectionParams = BCP;
export type GetSingleParams = BSP;
export type CreateParams = BCP & Request.PostParams<CreateValues>;
export type UpdateParams = BSP & Request.PatchParams<UpdateValues>;

// Values
export type CreateValues = {
  name: string;
  stages: Stage[];
  disable?: boolean;
};
export type UpdateValues = Partial<CreateValues>;

// functions
export async function getCollection(params: GetCollectionParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.pipelines().collection(),
  });
}

export async function getSingle(params: GetSingleParams) {
  return Request.getRequest<Single>({
    ...params,
    target: links.pipelines().single(params.id),
  });
}

export async function create(params: CreateParams) {
  return Request.postRequest<Single>({
    ...params,
    target: links.pipelines().collection(),
  });
}

export async function update(params: UpdateParams) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.pipelines().single(params.id),
  });
}
