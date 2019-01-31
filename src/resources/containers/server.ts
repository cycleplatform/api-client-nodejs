import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, Settings } from "../../common/api";
import {
  CollectionDoc,
  Resource,
  StatefulCounts,
  ResourceId,
  IP,
} from "../../common/structs";
import { InstanceState } from "../containers/instances";

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

export async function getCollection({
  containerId,
  token,
  query,
  settings,
}: {
  containerId: ResourceId;
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    query,
    token,
    settings,
    target: links.containers().servers(containerId),
  });
}
