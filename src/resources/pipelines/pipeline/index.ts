import * as Request from "../../../common/api/request";
import { links, QueryParams, StandardParams } from "../../../common/api";
import {
  CollectionDoc,
  CreatedTask,
  UserIncludes,
  UserScope,
  Events as BaseEvents,
  Resource,
  ResourceId,
  SingleDoc,
  Time,
  State,
} from "../../../common/structs";
import { Tasks } from "../tasks";

export type Collection = CollectionDoc<Pipeline, PipelineIncludes>;
export type Single = SingleDoc<Pipeline, PipelineIncludes>;
export type PipelineQuery = QueryParams<keyof PipelineIncludes>;

export type Events = BaseEvents & {
  last_run: Time;
};

export type PipelineState =
  | "new"
  | "ready"
  | "running"
  | "deleting"
  | "deleted";

export type Pipeline = Resource & {
  name: string;
  creator: UserScope;
  hub_id: ResourceId;
  disable: boolean;
  stages: Stage[];
  events: Events;
  state: State;
};

export type Stage = {
  name: string;
  tasks: Tasks;
  disabled: boolean;
};

export type PipelineIncludes = {
  name: string;
  creators: UserIncludes;
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
  stages: Stage[];
  disable: boolean;
}

export async function update(
  params: StandardParams<PipelineQuery> & {
    id: ResourceId;
    value: Partial<UpdateParams>;
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
