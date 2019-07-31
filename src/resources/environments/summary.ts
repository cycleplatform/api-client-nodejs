import { Resource, ResourceId, SingleDoc, State } from "common/structs";
import { EnvironmentState } from "./environment";
import { Service } from "./services";
import { ContainerState } from "resources/containers/container";
import { Location } from "resources/infrastructure/provider/location";
import { StandardParams, links, getRequest } from "common/api";

export type EnvironmentSummaryDoc = SingleDoc<EnvironmentSummary>;

export interface EnvironmentSummary extends Resource {
  state: EnvironmentState;
  services: { [key: string]: ServiceSummary };
  stats: Stats;
}

export interface ServiceSummary extends Service {
  state: State<ContainerState>;
}

export interface Stats {
  containers: ContainerStats;
  instances: InstanceStats;
}

export interface ContainerStats {
  state: { [key: string]: number };
  total: number;
  available: number;
}

export interface InstanceStats {
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
  return getRequest<EnvironmentSummaryDoc>({
    ...params,
    target: links.environments().summary(params.id),
  });
}
