import { links, StandardParams } from "../../common/api";
import { Request } from "../../";
import {
  CollectionDoc,
  Events,
  Resource,
  ResourceId,
  SingleDoc,
  State,
  UserScope,
} from "../../common/structs";

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

/** Base Collection Params */
type BSP = StandardParams & {
  pipelineId: ResourceId;
  keyId: ResourceId;
};

/** Base Single Params */
type BCP = StandardParams & {
  pipelineId: ResourceId;
};

// Params
export type TriggerKeyGetCollectionParams = BCP;
export type TriggerKeyCreateParams = BCP & Request.PostParams<CreateValues>;
export type TriggerKeysUpdateParams = BSP & Request.PatchParams<UpdateValues>;
export type TriggerKeyRemoveParams = BSP;
export type TriggerKeyGetSingleParams = BSP;

// Values
export type CreateValues = {
  name: string;
  ips: string[] | null;
};
export type UpdateValues = Partial<CreateValues>;

// Functions

/** Get pipeline keys as a collection
 * @summary get a collection of keys in a given pipeline
 * @param params object containing the target pipelineId to fetch keys for
 */
export async function getCollection(params: TriggerKeyGetCollectionParams) {
  return Request.getRequest({
    ...params,
    target: links.pipelines().keys(params.pipelineId).collection(),
  });
}

export async function getSingle(params: TriggerKeyGetSingleParams) {
  return Request.getRequest<Single>({
    ...params,
    target: links.pipelines().keys(params.pipelineId).single(params.keyId),
  });
}

export async function create(params: TriggerKeyCreateParams) {
  return Request.postRequest<Single>({
    ...params,
    target: links.pipelines().keys(params.pipelineId).collection(),
  });
}

export async function update(params: TriggerKeysUpdateParams) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.pipelines().keys(params.pipelineId).single(params.keyId),
  });
}

export async function remove(params: TriggerKeyRemoveParams) {
  return Request.deleteRequest<Single>({
    ...params,
    target: links.pipelines().keys(params.pipelineId).single(params.keyId),
  });
}
