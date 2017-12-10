import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { links, Settings, QueryParams } from "../../../common/api";
import {
    CollectionDoc,
    SingleDoc,
    Resource,
    ResourceId,
    State,
    Events,
    Time,
    Includes,
    CreatedTask,
} from "../../../common/structs";
import { Stats, Telemetry } from "../stats";
import { DataCenters, Servers, Provider } from "../provider";

export type Collection = CollectionDoc<Server, {}, ServerIncludes>;
export type Single = SingleDoc<Server>;

/**
 * Filters: [tags]
 */
export type ServerQuery = QueryParams<keyof ServerIncludes, keyof ServerMeta>;

export { Telemetry };

export interface Server extends Resource<ServerMeta> {
    hostname: string;
    project_id: ResourceId;
    provider: ServerProvider;
    node_id: ResourceId;
    tags: string[];
    state: State<ServerState>;
    events: Events;
}

export interface ServerMeta {
    stats?: Stats;
    last_checkin?: Time;
}

export interface ServerIncludes extends Includes {
    providers: {
        [key: string]: Provider;
    };
    plans: {
        [key: string]: Servers.Server;
    };
    datacenters: {
        [key: string]: DataCenters.DataCenter;
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
    query?: ServerQuery;
    settings?: Settings;
}) {
    return Request.getRequest<Collection>({
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
    query?: ServerQuery;
    settings?: Settings;
}) {
    return Request.getRequest<Single>({
        token,
        target: links
            .infrastructure()
            .servers()
            .single(id),
        query,
        settings,
    });
}

export async function getTags({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.getRequest<{ data: string[] }>({
        token,
        target: links
            .infrastructure()
            .servers()
            .tags(),
        query,
        settings,
    });
}

export interface UpdateParams {
    tags: string[];
}

export async function update({
    id,
    token,
    value,
    query,
    settings,
}: {
    id: ResourceId;
    token: Token;
    value: UpdateParams;
    query?: ServerQuery;
    settings?: Settings;
}) {
    return Request.patchRequest<Single>({
        token,
        target: links
            .infrastructure()
            .servers()
            .single(id),
        query,
        value,
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
    query?: ServerQuery;
    settings?: Settings;
}) {
    return Request.deleteRequest<CreatedTask<"delete">>({
        token,
        target: links
            .infrastructure()
            .servers()
            .single(id),
        query,
        settings,
    });
}
