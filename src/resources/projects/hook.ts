import {
  Resource,
  ResourceId,
  IP,
  CollectionDoc,
  CreatedTask,
} from "../../common/structs";
import { links, StandardParams } from "../../common/api";
import * as Request from "../../common/api/request";

export type Collection = CollectionDoc<Hook>;

export interface Hook extends Resource<HookMetas> {
  project_id: ResourceId;
  name: string;
  active: boolean;
  secret: string;
  default_tag: string;
  ips: IP[];
}

export interface HookMetas {
  url?: string[];
}

export async function getCollection(
  params: StandardParams & {
    projectId: ResourceId;
  },
) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.projects().hooks(params.projectId),
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
    projectId: ResourceId;
  },
) {
  return Request.postRequest<CreatedTask<any>>({
    ...params,
    target: links.projects().hooks(params.projectId),
  });
}

export interface UpdateParams {
  name?: string;
  active?: boolean;
  default_tag?: string;
  ips?: IP[];
}

export async function update(
  params: StandardParams & {
    value: UpdateParams;
    projectId: ResourceId;
  },
) {
  return Request.patchRequest<CreatedTask<any>>({
    ...params,
    target: links.projects().hooks(params.projectId),
  });
}
