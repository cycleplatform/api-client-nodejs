/**
 * @chris
 * this file is new, there are no metas or includes
 * so that is why i put this in it's own file. same reason
 * for containers being in their own file
 */

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

export type BuildLogSingle = SingleDoc<BuildLog>;

/****************************** Params ******************************/
/** Base Single Params */
type BSP = StandardParams & {
  id: ResourceId;
};

export type GetBuildLogParams = BSP;

/****************************** Functions ******************************/

/** ### `getSingle(params: GetSingleParams)`
 * Fetch a single build log
 * __Capability:__ `images-view`
 */
export async function getBuildLog(params: GetBuildLogParams) {
  return Request.getRequest<BuildLogSingle>({
    ...params,
    target: links.images().buildLog(params.id),
  });
}
