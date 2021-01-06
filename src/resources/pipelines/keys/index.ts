import { links, StandardParams } from "../../../common/api";
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

export type Collection = CollectionDoc<TriggerKey>;
export type Single = SingleDoc<TriggerKey>;

export type TriggerKey = Resource & {
  name: string;
  secret: string;
  creator: UserScope;
  hub_id: ResourceId;
  pipeline_id: ResourceId;
  state: State;
  events: Events;
  ips: string[];
};

export type TriggerKeyState = "live" | "deleting" | "deleted";

/**
 * params to be used for the getCollection function of pipeline keys
 */
export type TriggerKeyGetCollectionParams = StandardParams & {
  pipelineId: ResourceId;
};
/** Get pipeline keys as a collection
 *
 * @summary get a collection of keys in a given pipeline
 *
 * @param params object containing the target pipelineId to fetch keys for
 */
export async function getCollection(params: TriggerKeyGetCollectionParams) {
  return Request.getRequest({
    ...params,
    target: links.pipelines().keys(params.pipelineId).collection(),
  });
}

export type TriggerKeyGetSingleParams = StandardParams & {
  pipelineId: ResourceId;
  keyId: ResourceId;
};
export async function getSingle(params: TriggerKeyGetSingleParams) {
  return Request.getRequest<Single>({
    ...params,
    target: links.pipelines().keys(params.pipelineId).single(params.keyId),
  });
}

export type TriggerKeyCreateValues = {
  name: string;
  ips: string[] | null;
};

// Create new pipeline
export type TriggerKeyCreateParams = TriggerKeyGetCollectionParams & {
  value: TriggerKeyCreateValues;
};
export async function create(params: TriggerKeyCreateParams) {
  return Request.postRequest<Single>({
    ...params,
    target: links.pipelines().keys(params.pipelineId).collection(),
  });
}

export type TriggerKeysUpdateParams = TriggerKeyGetSingleParams & {
  value: Partial<TriggerKeyCreateValues>;
};
export async function update(params: TriggerKeysUpdateParams) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.pipelines().keys(params.pipelineId).single(params.keyId),
  });
}

export type TriggerKeyRemoveParams = TriggerKeyGetSingleParams;
export async function remove(params: TriggerKeyRemoveParams) {
  return Request.deleteRequest<Single>({
    ...params,
    target: links.pipelines().keys(params.pipelineId).single(params.keyId),
  });
}
