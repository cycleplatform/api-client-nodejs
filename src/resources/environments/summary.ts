import { Resource, ResourceId, SingleDoc } from "../../common/structs";
import { EnvironmentState, EnvService } from "./environment";
import { ContainerState } from "../containers/container";
import { Location } from "../infrastructure/provider/datacenter";
import { Token } from "../../auth";
import { Settings, links } from "../../common/api";
import * as Request from "../../common/api/request";

export type EnvironmentSummaryDoc = SingleDoc<EnvironmentSummary>;

export interface EnvironmentSummary extends Resource {
    state: EnvironmentState;
    services: { [key: string]: ServiceSummary };
    stats: Stats;
}

export interface ServiceSummary extends EnvService {
    state: ContainerState;
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
    geo: Array<{
        datacenter_id: ResourceId;
        location: Location;
        available: number;
        total: number;
        active: number;
    }>;
    state: { [key: string]: number };
    total: number;
    available: number;
}

export async function getSummary({
    id,
    token,
    settings,
}: {
    id: ResourceId;
    token: Token;
    settings?: Settings;
}) {
    return Request.getRequest<EnvironmentSummaryDoc>({
        target: links.environments().summary(id),
        token,
        settings,
    });
}
