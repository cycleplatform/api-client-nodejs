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

export interface Hook extends Resource {
  pipeline_id: ResourceId;
  active: boolean;
  secret: string;
  ips: IP[];
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
  ips?: IP[];
}

export async function create({
  value = {},
  token,
  query,
  settings,
}: {
  value: CreateParams;
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.postRequest<CreatedTask<any>>({
    value,
    query,
    token,
    settings,
    target: links.pipelines().collection(),
  });
}
