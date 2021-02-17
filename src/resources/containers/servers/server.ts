import * as Request from "../../../common/api/request";
import { QueryParams, links, StandardParams } from "../../../common/api";
import {
  CollectionDoc,
  Resource,
  StatefulCounts,
  ResourceId,
  IP,
} from "../../../common/structs";
import { InstanceState } from "../../containers/instances";
import { Server } from "../../infrastructure/servers";

export type ServerInstancesQuery = QueryParams<
  string,
  keyof ServerInstancesMeta
>;

type BaseCollectionParams = StandardParams & { containerId: ResourceId };

/**
 * Information about the instances on a server
 */
export interface ServerInstances extends Resource<ServerInstancesMeta> {
  instances: StatefulCounts<InstanceState>;
  /** the server hostname */
  hostname: string;
  // todo double check hostname is correct
}
//  todo am i marking metas

export interface ServerInstancesMeta {
  primary_ip: IP;
}

export type Collection = CollectionDoc<ServerInstances>;
export async function getCollection(params: BaseCollectionParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.containers().servers(params.containerId).list(),
  });
}

type UsableServerCollection = CollectionDoc<Server>;
export async function usable(params: BaseCollectionParams) {
  return Request.getRequest<UsableServerCollection>({
    ...params,
    target: links.containers().servers(params.containerId).usable(),
  });
}
