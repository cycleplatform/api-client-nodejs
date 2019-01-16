import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { links, Settings, QueryParams } from "../../../common/api";
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

export async function getCollection({
  server_id,
  token,
  query,
  settings,
}: {
  server_id: ResourceId;
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    token,
    query,
    settings,
    target: links
      .infrastructure()
      .servers()
      .telemetry(server_id),
  });
}
