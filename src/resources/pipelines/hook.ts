import {
  Resource,
  ResourceId,
  IP,
  CollectionDoc,
  CreatedTask,
} from "../../common/structs";
import { QueryParams, links, Settings } from "../../common/api";
import * as Request from "../../common/api/request";
import { Token } from "../../auth";

export type Collection = CollectionDoc<Hook>;

export interface Hook extends Resource<HookMetas> {
  pipeline_id: ResourceId;
  name: string;
  active: boolean;
  stage: string;
  secret: string;
  ips: IP[];
}

export interface HookMetas {
  url?: string[];
}

export async function getCollection({
  pipelineId,
  token,
  query,
  settings,
}: {
  pipelineId: ResourceId;
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    query,
    token,
    settings,
    target: links.pipelines().hooks(pipelineId),
  });
}

export interface CreateParams {
  name: string;
  stage: string;
  ips?: IP[];
}

export async function create({
  value,
  pipelineId,
  token,
  query,
  settings,
}: {
  value: CreateParams;
  pipelineId: ResourceId;
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.postRequest<CreatedTask<any>>({
    value,
    query,
    token,
    settings,
    target: links.pipelines().hooks(pipelineId),
  });
}
