import * as Request from "../../../common/api/request";
import { links, StandardParams } from "../../../common/api";
import {
  Resource,
  CollectionDoc,
  ResourceId,
  Events,
} from "../../../common/structs";

/****************************** Build Log Struct ******************************/
export interface Log extends Resource {
  backup_id: ResourceId;
  hub_id: ResourceId;
  type: LogType;
  log: string;
  events: Events;
}

/****************************** Build Log Sub Structs ******************************/
export type LogType = "restore" | "backup";

/****************************** Metas, Includes, Docs, Query ******************************/

export type BuildLogCollection = CollectionDoc<Log>;

/****************************** Params ******************************/
/** Base Collection Params */
type BSP = StandardParams & {
  id: ResourceId;
  containerId: ResourceId;
};

export type GetBuildLogsParams = BSP;

/****************************** Functions ******************************/

/** ### `getBuildLogs(params: GetBuildLogsParams)`
 * Fetch a collection of build logs
 * __Capability:__ `container-backups-view`
 */
export async function getBuildLogs(params: GetBuildLogsParams) {
  return Request.getRequest<BuildLogCollection>({
    ...params,
    target: links
      .containers()
      .backups()
      .logs(params.id, params.containerId),
  });
}
