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
  state: State<TriggerKeyState>;
  events: Events;
  ips: string[];
};

export type TriggerKeyState = "live" | "deleting" | "deleted";

type BaseSingleDocParams = StandardParams & {
  pipelineId: ResourceId;
  keyId: ResourceId;
};

type BaseCollectionParams = StandardParams & {
  pipelineId: ResourceId;
};
/**
 * params to be used for the getCollection function of pipeline keys
 */
export type TriggerKeyGetCollectionParams = BaseCollectionParams;
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

export type TriggerKeyGetSingleParams = BaseSingleDocParams;
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
export type TriggerKeyCreateParams = BaseCollectionParams & {
  value: TriggerKeyCreateValues;
};
export async function create(params: TriggerKeyCreateParams) {
  return Request.postRequest<Single>({
    ...params,
    target: links.pipelines().keys(params.pipelineId).collection(),
  });
}

export type TriggerKeysUpdateParams = BaseSingleDocParams & {
  value: Partial<TriggerKeyCreateValues>;
};
export async function update(params: TriggerKeysUpdateParams) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.pipelines().keys(params.pipelineId).single(params.keyId),
  });
}

export type TriggerKeyRemoveParams = BaseSingleDocParams;
export async function remove(params: TriggerKeyRemoveParams) {
  return Request.deleteRequest<Single>({
    ...params,
    target: links.pipelines().keys(params.pipelineId).single(params.keyId),
  });
}
