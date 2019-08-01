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

export type Collection = CollectionDoc<ServerInstances>;
export type ServerInstancesQuery = QueryParams<
  string,
  keyof ServerInstancesMeta
>;

export interface ServerInstances extends Resource<ServerInstancesMeta> {
  instances: StatefulCounts<InstanceState>;
  hostname: string;
}

export interface ServerInstancesMeta {
  primary_ip: IP;
}

export async function getCollection(
  params: StandardParams & {
    containerId: ResourceId;
  },
) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.containers().servers(params.containerId),
  });
}
