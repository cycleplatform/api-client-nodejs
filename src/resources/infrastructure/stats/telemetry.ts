import * as Request from "../../../common/api/request";
import { links, StandardParams } from "../../../common/api";
import {
  Resource,
  ResourceId,
  CollectionDoc,
  Time,
} from "../../../common/structs";
import { LoadStats } from "./load";
import { RAMStats } from "./ram";
import { StorageStats } from "./storage";

export type Collection = CollectionDoc<TelemetryPoint>;

export interface TelemetryPoint extends Resource {
  time: Time;
  load: LoadStats;
  ram: RAMStats;
  storage_root: StorageStats;
}

export async function getCollection(
  params: StandardParams & {
    serverId: ResourceId;
  },
) {
  return Request.getRequest<Collection>({
    ...params,
    target: links
      .infrastructure()
      .servers()
      .telemetry(params.serverId),
  });
}
