import {
  Resource,
  ResourceId,
  IP,
  CollectionDoc,
  SingleDoc,
  Events,
} from "common/structs";
import {
  links,
  StandardParams,
  QueryParams,
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
} from "common/api";

export type Collection = CollectionDoc<Hook>;
export type Single = SingleDoc<Hook>;

export type HookQuery = QueryParams<"", keyof HookMetas>;

export interface Hook extends Resource<HookMetas> {
  stack_id: ResourceId;
  name: string;
  active: boolean;
  secret: string;
  default_label: string;
  integrations: Integrations;
  events: Events<"last_trigger">;
  ips: IP[];
}

export interface Integrations {
  git?: Git;
}

export interface Git {
  require: GitRequire;
}

export interface GitRequire {
  /** If true, this hook will only trigger if a label is detected in the git commit */
  label: boolean;
  /** If true, this hook will only trigger if a version label is detected in the git commit */
  version: boolean;
}

export interface HookMetas {
  urls?: string[];
}

export async function getCollection(
  params: StandardParams & {
    stackId: ResourceId;
  },
) {
  return getRequest<Collection>({
    ...params,
    target: links
      .stacks()
      .hooks(params.stackId)
      .collection(),
  });
}

export async function getSingle(
  params: StandardParams & {
    stackId: ResourceId;
    hookId: ResourceId;
  },
) {
  return getRequest<Collection>({
    ...params,
    target: links
      .stacks()
      .hooks(params.stackId)
      .single(params.hookId),
  });
}

export interface CreateParams {
  name: string;
  ips?: IP[];
  default_tag: string;
}

export async function create(
  params: StandardParams & {
    value: CreateParams;
    stackId: ResourceId;
  },
) {
  return postRequest<Single>({
    ...params,
    target: links
      .stacks()
      .hooks(params.stackId)
      .collection(),
  });
}

export interface UpdateParams {
  name?: string;
  active?: boolean;
  default_label?: string;
  ips?: IP[];
  integrations?: Integrations;
}

export async function update(
  params: StandardParams & {
    value: UpdateParams;
    stackId: ResourceId;
    hookId: ResourceId;
  },
) {
  return patchRequest<Single>({
    ...params,
    target: links
      .stacks()
      .hooks(params.stackId)
      .single(params.hookId),
  });
}

export async function remove(
  params: StandardParams & {
    stackId: ResourceId;
    hookId: ResourceId;
  },
) {
  return deleteRequest<{ data: true }>({
    ...params,
    target: links
      .stacks()
      .hooks(params.stackId)
      .single(params.hookId),
  });
}
