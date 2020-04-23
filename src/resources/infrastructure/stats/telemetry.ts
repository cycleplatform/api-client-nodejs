import * as Request from "../../../common/api/request";
import { links, StandardParams } from "../../../common/api";
import { ResourceId, DataPointCollection, Time } from "../../../common/structs";
import { LoadStats } from "./load";
import { RAMStats } from "./ram";

export type Collection = DataPointCollection<TelemetryPoint>;

export interface TelemetryPoint {
  time: Time;
  load: LoadStats;
  ram: RAMStats;
  /** Cycle's base volume, 25GB */
  storage_base: {
    used: number;
    free: number;
    total: number;
  };
  /** User data storage across all devices */
  storage_pool: {
    /** The percentage of storage used by user data */
    data_percent: number;
    /** The percentage of storage used by the file allocation tables, etc. */
    meta_percent: number;
    /** The total amount of storage available */
    total: number;
  };
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
