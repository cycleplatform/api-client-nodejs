import * as API from "../../../common/Api";
import { Token } from "../../../auth";
import { QueryParams } from "../../../common/QueryParams";
import {
    CollectionDoc,
    SingleDoc,
    Settings,
    Resource,
    ResourceId,
    ResourceState,
    StandardEvents,
    Time,
    Includes,
    CreatedTask,
} from "../../../common/Structs";
import { links } from "../../../common/Links";
import { Stats, Telemetry } from "../stats";
import { DataCenters, Servers, Provider } from "../provider";

export type Collection = CollectionDoc<Server, {}, ServerIncludes>;
export type Single = SingleDoc<Server>;

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
    location?: DataCenters.Location;
    last_checkin?: Time;
}

export interface ServerIncludes extends Includes {
    providers: {
        [key: string]: Provider;
    };
    plans: {
        [key: string]: Servers.Server;
    };
}

export type ServerState =
    | "new"
    | "live"
    | "provisioning"
    | "offline"
    | "deleting"
    | "deleted";

export interface ServerProvider {
    id: ResourceId;
    plan_id: ResourceId;
    datacenter_id: ResourceId;
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

export async function getSingle({
    id,
    token,
    query,
    settings,
}: {
    id: ResourceId;
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.getRequest<Single>({
        token,
        target: links
            .infrastructure()
            .servers()
            .single(id),
        query,
        settings,
    });
}

export async function remove({
    id,
    token,
    query,
    settings,
}: {
    id: ResourceId;
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.deleteRequest<CreatedTask<"delete">>({
        token,
        target: links
            .infrastructure()
            .servers()
            .single(id),
        query,
        settings,
    });
}
