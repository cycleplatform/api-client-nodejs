import {
  Resource,
  SingleDoc,
  State,
  ResourceId,
  StatefulCounts,
} from "../../common/structs";
import { ContainerState } from "../containers/container";
import { Location } from "../infrastructure/provider/location";
import { InstanceState } from "./instances";
import { StandardParams, links } from "../../common/api";
import * as Request from "../../common/api/request";

export type ContainerSummaryDoc = SingleDoc<ContainerSummary>;
/**
 * A container summary resource
 */
export interface ContainerSummary extends Resource {
  /** The containers name */
  name: string;
  state: State<ContainerState>;
  stats: ContainerSummaryStats;
}

/**
 * A summary of container statistics
 */
export interface ContainerSummaryStats {
  instances: ContainerSummaryInstances;
}

/**
 * A summary of information about a container instance
 */
export interface ContainerSummaryInstances {
  geo: ContainerSummaryGeo[];
  state: StatefulCounts<InstanceState>;
  /** The number of instances */
  total: number;
  /** The available number that can be created */
  available: number;
}

/**
 * A summary of geographic information about an instance
 */
export interface ContainerSummaryGeo {
  location: Location;
  datacenter_id: ResourceId;
  available: number;
  total: number;
}

export async function getSummary(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return Request.getRequest<ContainerSummaryDoc>({
    ...params,
    target: links.containers().summary(params.id),
  });
}
