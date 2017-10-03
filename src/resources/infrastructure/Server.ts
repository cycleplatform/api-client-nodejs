import * as API from "../../common/Api";
import { Token } from "../../auth";
import { QueryParams } from "../../common/QueryParams";
import {
    CollectionDoc,
    Settings,
    Resource,
    ResourceId,
    ResourceState,
    StandardEvents,
} from "../../common/Structs";
import { links } from "../../common/Links";
import { Stats } from "./stats";
import { Location } from "./provider/DataCenter";
import { Telemetry } from "./stats";

export type Collection = CollectionDoc<Server>;

export { Telemetry };

export interface Server extends Resource<ServerMeta> {
    hostname: string;
    project_id: ResourceId;
    provider: ServerProvider;
    node_id: ResourceId;
    tags: string[];
    state: ResourceState<ServerState>;
    events: StandardEvents;
}

export interface ServerMeta {
    stats?: Stats;
    location?: Location;
}

export type ServerState = "new" | "live" | "updating" | "deleting" | "deleted";

export interface ServerProvider {
    id: ResourceId;
    server_id: string;
}

export async function getCollection({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.getRequest<Collection>({
        token,
        target: links
            .infrastructure()
            .servers()
            .collection(),
        query,
        settings,
    });
}
