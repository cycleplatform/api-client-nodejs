import {
  Resource,
  ResourceId,
  OwnerScope,
  State,
  Events,
  CollectionDoc,
  SingleDoc,
} from "../../common/structs";
import { QueryParams, links, Settings } from "../../common/api";
import * as Request from "../../common/api/request";
import { Token } from "../../auth";
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

export async function getCollection({
  token,
  query,
  settings,
}: {
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    query,
    token,
    settings,
    target: links.projects().collection(),
  });
}

export async function getSingle({
  id,
  token,
  query,
  settings,
}: {
  id: ResourceId;
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<Single>({
    query,
    token,
    settings,
    target: links.projects().single(id),
  });
}

export interface CreateParams {
  name: string;
  stack_id: string;
}

export async function create({
  value,
  token,
  query,
  settings,
}: {
  value: CreateParams;
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.postRequest<Single>({
    value,
    query,
    token,
    settings,
    target: links.projects().collection(),
  });
}

export type UpdateParams = Partial<Omit<CreateParams, "stack_id">>;

export async function update({
  id,
  value,
  token,
  query,
  settings,
}: {
  id: ResourceId;
  value: UpdateParams;
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.patchRequest<Single>({
    value,
    query,
    token,
    settings,
    target: links.projects().single(id),
  });
}
