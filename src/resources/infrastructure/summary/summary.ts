import * as Request from "../../../common/api/request";
import { links, Settings, QueryParams } from "../../../common/api";
import { ResourceId, Megabytes } from "../../../common/structs";
import { ProviderIdentifier } from "../provider";

/** A single infrastructure summary document */
export type Single = { data: InfrastructureSummary };

/** A summary of infrastructure stats by cluster */
export interface InfrastructureSummary {
  /** ID of the hub */
  hub_id: ResourceId;
  /** Stats about image usage */
  images: ImageStats;
  clusters: Record<string, Cluster>;
}

export interface ImageStats {
  tier: {
    total_mb: Megabytes;
    used_mb: Megabytes;
  };
}

export interface Cluster {
  name: string;
  resources: ClusterResources;
  servers: ServerStats;
  versions: Record<string, Record<string, number>>;
}

export interface ClusterResources {
  ram: RAMResources;
  cpu: CPUResources;
}

export interface RAMResources {
  total_mb: Megabytes;
  used_mb: Megabytes;
}

export interface CPUResources {
  shares: {
    allocated: number;
    total: number;
  };
  share_ratio: number;
}

export interface ServerStats {
  count: number;
  providers: Record<ProviderIdentifier, ProviderStats>;
}

export interface ProviderStats {
  locations: Record<string, number>;
  models: Record<string, number>;
}

export async function getCollection(params: {
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<Single>({
    ...params,
    target: links.infrastructure().summary(),
  });
}
