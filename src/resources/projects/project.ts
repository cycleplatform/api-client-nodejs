import {
  Resource,
  ResourceId,
  OwnerScope,
  State,
  Events,
  CollectionDoc,
  SingleDoc,
  OwnerInclude,
} from "common/structs";
import {
  links,
  StandardParams,
  QueryParams,
  getRequest,
  postRequest,
  patchRequest,
} from "common/api";
import { Stack } from "resources/stacks";

export type Collection = CollectionDoc<Project, ProjectIncludes>;
export type Single = SingleDoc<Project, ProjectIncludes>;

export type ProjectQuery = QueryParams<keyof ProjectIncludes>;

export type ProjectState =
  | "live"
  | "building"
  | "deploying"
  | "deleting"
  | "deleted";

export interface Project extends Resource {
  name: string;
  owner: OwnerScope;
  stack: StackSummary;
  hub_id: ResourceId;
  state: State<ProjectState>;
  events: Events;
}

export interface StackSummary {
  id: ResourceId;
}

export interface ProjectIncludes {
  owners: OwnerInclude;
  stacks: Record<ResourceId, Stack>;
}

export async function getCollection(params: StandardParams) {
  return getRequest<Collection>({
    ...params,
    target: links.projects().collection(),
  });
}

export async function getSingle(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return getRequest<Single>({
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
  return postRequest<Single>({
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
  return patchRequest<Single>({
    ...params,
    target: links.projects().single(params.id),
  });
}
