import {
    Resource,
    SingleDoc,
    State,
    ResourceId,
    StatefulCounts,
} from "../../common/structs";
import { ContainerState } from "../containers/container";
import { Location } from "../infrastructure/provider/datacenter";
import { InstanceState } from "./instances";
import { Token } from "../../auth";
import { Settings, links } from "../../common/api";
import * as Request from "../../common/api/request";

export type ContainerSummaryDoc = SingleDoc<ContainerSummary>;

export interface ContainerSummary extends Resource {
    name: string;
    state: State<ContainerState>;
    stats: ContainerSummaryStats;
}

export interface ContainerSummaryStats {
    instances: ContainerSummaryInstances;
}

export interface ContainerSummaryInstances {
    geo: ContainerSummaryGeo[];
    state: StatefulCounts<InstanceState>;
    total: number;
    available: number;
}

export interface ContainerSummaryGeo {
    location: Location;
    datacenter_id: ResourceId;
    available: number;
    total: number;
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
    return Request.getRequest<ContainerSummaryDoc>({
        target: links.containers().summary(id),
        token,
        settings,
    });
}
