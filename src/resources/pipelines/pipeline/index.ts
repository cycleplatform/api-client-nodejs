import * as Request from "../../../common/api/request";
import { links, QueryParams, StandardParams } from "common/api";
import {
  CollectionDoc,
  CreatedTask,
  CreatorIncludes,
  CreatorScope,
  Events,
  Resource,
  ResourceId,
  SingleDoc,
} from "common/structs";
import { Tasks } from "../tasks";

export type Collection = CollectionDoc<Pipeline, PipelineIncludes>;
export type Single = SingleDoc<Pipeline, PipelineIncludes>;
export type PipelineQuery = QueryParams<keyof PipelineIncludes>;
export interface Pipeline extends Resource {
  name: string;
  creator: CreatorScope;
  hubId: ResourceId;
  stages: Stages[];
  events: Events;
}

export type Stages = {
  name: string;
  tasks: Tasks;
  disabled: boolean;
};

export type PipelineIncludes = {
  name: string;
  creators: CreatorIncludes;
};

export async function getCollection(params: StandardParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.pipelines().collection(),
  });
}

export async function getSingle(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return Request.getRequest<Single>({
    ...params,
    target: links.pipelines().single(params.id),
  });
}

export interface CreateParams {
  name: string;
}

export async function create(
  params: StandardParams<PipelineQuery> & Request.PostParams<CreateParams>,
) {
  return Request.postRequest<Single>({
    ...params,
    target: links.pipelines().collection(),
  });
}

export interface UpdateParams {
  name: string;
}

export async function update(
  params: StandardParams<PipelineQuery> & {
    id: ResourceId;
    value: UpdateParams;
  },
) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.pipelines().single(params.id),
  });
}

export async function remove(
  params: StandardParams<PipelineQuery> & {
    id: ResourceId;
  },
) {
  return Request.deleteRequest<CreatedTask<"delete">>({
    ...params,
    target: links.pipelines().single(params.id),
  });
}
