import { links, StandardParams } from "../../../common/api";
import * as Request from "../../../common/api/request";
import {
  CollectionDoc,
  Events,
  Resource,
  ResourceId,
  SingleDoc,
  State as StateBase,
  UserScope,
} from "../../../common/structs";

/****************************** Key Struct ******************************/

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

/****************************** Key Struct Sub Types ******************************/

export type State = StateBase<States>;
export type States = "live" | "deleting" | "deleted";

/****************************** Metas, Includes, Docs, Query ******************************/
export type Collection = CollectionDoc<TriggerKey>;
export type Single = SingleDoc<TriggerKey>;

/****************************** Params ******************************/
/** Base Single Params */
export type BSP = StandardParams & {
  pipelineId: ResourceId;
  keyId: ResourceId;
};
/** Base Collection Params */
type BCP = StandardParams & {
  pipelineId: ResourceId;
};

export type GetCollectionParams = BCP;
export type CreateParams = BCP & Request.PostParams<CreateValues>;
export type UpdateParams = BSP & Request.PatchParams<UpdateValues>;
export type GetSingleParams = BSP;

/****************************** Values ******************************/
export type CreateValues = {
  name: string;
  ips: string[] | null;
};
export type UpdateValues = Partial<CreateValues>;

/****************************** Functions ******************************/
/** Get pipeline keys as a collection
 * @summary get a collection of keys in a given pipeline
 * @param params object containing the target pipelineId to fetch keys for
 */
export async function getCollection(params: GetCollectionParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.pipelines().keys(params.pipelineId).collection(),
  });
}

export async function getSingle(params: GetSingleParams) {
  return Request.getRequest<Single>({
    ...params,
    target: links.pipelines().keys(params.pipelineId).single(params.keyId),
  });
}

export async function create(params: CreateParams) {
  return Request.postRequest<Single>({
    ...params,
    target: links.pipelines().keys(params.pipelineId).collection(),
  });
}

export async function update(params: UpdateParams) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.pipelines().keys(params.pipelineId).single(params.keyId),
  });
}
