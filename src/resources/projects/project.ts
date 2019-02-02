import {
  Resource,
  ResourceId,
  OwnerScope,
  State,
  Events,
  CollectionDoc,
  SingleDoc,
} from "../../common/structs";
import { links, StandardParams } from "../../common/api";
import * as Request from "../../common/api/request";
import { Omit } from "../../common/types/common";

export type Collection = CollectionDoc<Project>;
export type Single = SingleDoc<Project>;

export type ProjectState =
  | "new"
  | "live"
  | "building"
  | "deploying"
  | "deleting"
  | "deleted";

export interface Project extends Resource {
  name: string;
  owner: OwnerScope;
  stack_id: ResourceId;
  hub_id: ResourceId;
  state: State<ProjectState>;
  events: Events;
}

export async function getCollection(params: StandardParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.projects().collection(),
  });
}

export async function getSingle(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return Request.getRequest<Single>({
    ...params,
    target: links.projects().single(params.id),
  });
}

export interface CreateParams {
  name: string;
  stack_id: string;
}

export async function create(
  params: StandardParams & {
    value: CreateParams;
  },
) {
  return Request.postRequest<Single>({
    ...params,
    target: links.projects().collection(),
  });
}

export type UpdateParams = Partial<Omit<CreateParams, "stack_id">>;

export async function update(
  params: StandardParams & {
    id: ResourceId;
    value: UpdateParams;
  },
) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.projects().single(params.id),
  });
}
