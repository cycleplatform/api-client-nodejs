import {
    Resource,
    ResourceId,
    CollectionDoc,
    Settings,
} from "../../../common/Structs";
import * as API from "../../../common/Api";
import { QueryParams } from "../../../common/QueryParams";
import { Token } from "../../../auth";
import { links } from "../../../common/Links";
import { CPUStats } from "./CPUStats";
import { LoadStats } from "./LoadStats";
import { RAMStats } from "./RAMStats";
import { StorageStats } from "./StorageStats";
import { UptimeStats } from "./UptimeStats";

export type Collection = CollectionDoc<Checkin>;

export interface Checkin extends Resource {
    cluster_id: ResourceId;
    node_id: ResourceId;
    stats: TelemetryStats;
}

export interface TelemetryStats {
    cpu: CPUStats;
    load: LoadStats;
    ram: RAMStats;
    storage: StorageStats;
    uptime: UptimeStats;
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
    return API.getRequest<Collection>({
        token,
        target: links.infrastructure().servers().telemetry(server_id),
        query,
        settings,
    });
}
