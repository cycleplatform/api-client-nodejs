import * as Request from "../../common/api/request";
import { links, StandardParams } from "../../common/api";
import { Resource, SingleDoc, ResourceId, Events } from "../../common/structs";

/****************************** Build Log Struct ******************************/
export interface BuildLog extends Resource {
  image_id: ResourceId;
  hub_id: ResourceId;
  log: string;
  events: Events;
}

/****************************** Metas, Includes, Docs, Query ******************************/

export type Single = SingleDoc<BuildLog>;

/****************************** Params ******************************/
/** Base Single Params */
type BSP = StandardParams & {
  id: ResourceId;
};

export type GetSingleParams = BSP;

/****************************** Functions ******************************/

/** ### `getSingle(params: GetSingleParams)`
 * Fetch a single build log
 * __Capability:__ `images-view`
 */
export async function getSingle(params: GetSingleParams) {
  return Request.getRequest<Single>({
    ...params,
    target: links.images().buildLog(params.id),
  });
}
