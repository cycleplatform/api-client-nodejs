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

export type Collection = CollectionDoc<Pipeline>;
export type Single = SingleDoc<Pipeline>;

export type PipelineState =
  | "new"
  | "live"
  | "building"
  | "deploying"
  | "deleting"
  | "deleted";

export interface Pipeline extends Resource {
  name: string;
  owner: OwnerScope;
  stack_id: ResourceId;
  project_id: ResourceId;
  stages: Stages;
  state: State<PipelineState>;
  events: Events;
}

export interface Stages {
  labels: string[];
  default: string;
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
    target: links.pipelines().collection(),
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
    target: links.pipelines().single(id),
  });
}

export interface CreateParams {
  name: string;
  stages: Stages;
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
    target: links.pipelines().collection(),
  });
}
