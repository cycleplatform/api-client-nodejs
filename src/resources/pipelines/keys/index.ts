import { links, StandardParams } from "common/api";
import { CreateParams } from "resources/containers/instances";
import { Request } from "../../..";
import {
  CollectionDoc,
  Events,
  Resource,
  ResourceId,
  SingleDoc,
  State,
  UserScope,
} from "../../../common/structs";

export type Collection = CollectionDoc<PipelineKey>;
export type Single = SingleDoc<PipelineKey>;

export type PipelineKey = Resource & {
  name: string;
  secret: string;
  creator: UserScope;
  hub_id: ResourceId;
  pipeline_id: ResourceId;
  state: State;
  events: Events;
  ips: string[];
};

export type PipelineKeyState = "live" | "deleting" | "deleted";

/**
 * params to be used for the getCollection function of pipeline keys
 */
export type PipelineKeyGetCollectionParams = StandardParams & {
  pipelineId: ResourceId;
};
/** Get pipeline keys as a collection
 *
 * @summary get a collection of keys in a given pipeline
 *
 * @param params object containing the target pipelineId to fetch keys for
 */
export async function getCollection(params: PipelineKeyGetCollectionParams) {
  return Request.getRequest({
    ...params,
    target: links.pipelines().keys(params.pipelineId).collection(),
  });
}

export type PipelineKeyGetSingleParams = StandardParams & {
  pipelineId: ResourceId;
  keyId: ResourceId;
};
export async function getSingle(params: PipelineKeyGetSingleParams) {
  return Request.getRequest<Single>({
    ...params,
    target: links.pipelines().keys(params.pipelineId).single(params.keyId),
  });
}

export type PipelineKeyCreateValues = {
  name: string;
  ips: string[] | null;
};

// Create new pipeline
export type PipelineKeyCreateParams = PipelineKeyGetCollectionParams & {
  value: PipelineKeyCreateValues;
};
export async function create(params: PipelineKeyCreateParams) {
  return Request.postRequest<Single>({
    ...params,
    target: links.pipelines().keys(params.pipelineId).collection(),
  });
}

export type PipelineKeysUpdateParams = PipelineKeyGetSingleParams & {
  value: Partial<PipelineKeyCreateValues>;
};
export async function update(params: PipelineKeysUpdateParams) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.pipelines().keys(params.pipelineId).single(params.keyId),
  });
}

export type PipelineKeyRemoveParams = PipelineKeyGetSingleParams;
export async function remove(params: PipelineKeyRemoveParams) {
  return Request.deleteRequest<Single>({
    ...params,
    target: links.pipelines().keys(params.pipelineId).single(params.keyId),
  });
}
