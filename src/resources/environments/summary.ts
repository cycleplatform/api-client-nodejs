import { Resource, ResourceId, SingleDoc, State } from "../../common/structs";
import { EnvironmentState } from "./environment";
import { Service } from "./services";
import { ContainerState } from "../containers/container";
import { Location } from "../infrastructure/provider/location";
import { StandardParams, links } from "../../common/api";
import * as Request from "../../common/api/request";

export type EnvironmentSummaryDoc = SingleDoc<EnvironmentSummary>;
/**
 * An extended resource that contains a higher level environment summary
 */
export interface EnvironmentSummary extends Resource {
  state: EnvironmentState;
  services: Record<string, ServiceSummary>;
  stats: Stats;
}

/** An extended service that contains information about the state of a service */
export interface ServiceSummary extends Service {
  state: State<ContainerState>;
}

/** Statistics for containers and instances */
export interface Stats {
  containers: ContainerStats;
  instances: InstanceStats;
}

/**
 * Statistics for a container
 */
export interface ContainerStats {
  /** The amount of times the container has been in each state */
  state: { [key: string]: number };
  /** The total of all states combined */
  total: number;
  // TODO need to investigate
  available: number;
}

/**
 * Statistics for an instance
 */
export interface InstanceStats {
  /** Geographical statistics for the instance */
  geo:
    | {
        datacenter_id: ResourceId;
        location: Location;
        available: number;
        total: number;
        active: number;
      }[]
    | null;
  state: { [key: string]: number };
  total: number;
  available: number;
}

export async function getSummary(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return Request.getRequest<EnvironmentSummaryDoc>({
    ...params,
    target: links.environments().summary(params.id),
  });
}
