import {
    Resource,
    ResourceId,
    CollectionDoc,
    Settings,
    Time,
} from "../../../common/Structs";
import * as API from "../../../common/Api";
import { QueryParams } from "../../../common/QueryParams";
import { Token } from "../../../auth";
import { links } from "../../../common/Links";
import { LoadStats } from "./LoadStats";
import { RAMStats } from "./RAMStats";
import { StorageStats } from "./StorageStats";

export type Collection = CollectionDoc<Telemetry>;

export interface Telemetry extends Resource {
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
    return API.getRequest<Collection>({
        token,
        target: links.infrastructure().servers().telemetry(server_id),
        query,
        settings,
    });
}
