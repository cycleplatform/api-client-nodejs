import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, ProjectRequiredSettings } from "../../common/api";
import {
    CollectionDoc,
    Resource,
    State,
    Events,
    UserScope,
    ResourceId,
    SingleDoc,
    OwnerInclude,
    CreatedTask,
} from "../../common/structs";
import * as Records from "./record";

export * from "./tasks/zone";
export { Records };

export type Collection = CollectionDoc<Zone, {}, ZoneIncludes>;
export type Single = SingleDoc<Zone>;

export type ZoneState =
    | "pending"
    | "verifying"
    | "live"
    | "disabled"
    | "deleting"
    | "deleted";
export type ZoneEvent = "last_verification" | "verified";
export type ZoneQuery = QueryParams<keyof ZoneIncludes>;

export interface Zone extends Resource {
    project_id: ResourceId;
    owner: UserScope;
    origin: string;
    state: State<ZoneState>;
    events: Events<ZoneEvent>;
}

export interface ZoneIncludes {
    owners: OwnerInclude;
}

export async function getCollection({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: ZoneQuery;
    settings?: ProjectRequiredSettings;
}) {
    return Request.getRequest<Collection>({
        target: links
            .dns()
            .zones()
            .collection(),
        query,
        token,
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
    settings?: ProjectRequiredSettings;
}) {
    return Request.getRequest<Single>({
        target: links
            .dns()
            .zones()
            .single(id),
        query,
        token,
        settings,
    });
}

export interface CreateParams {
    origin: string;
}

export async function create({
    value,
    token,
    query,
    settings,
}: {
    value: CreateParams;
    token: Token;
    query?: QueryParams;
    settings?: ProjectRequiredSettings;
}) {
    return Request.postRequest<Single>({
        target: links
            .dns()
            .zones()
            .collection(),
        query,
        token,
        settings,
        value,
    });
}

export async function remove({
    zoneId,
    token,
    query,
    settings,
}: {
    zoneId: ResourceId;
    token: Token;
    query?: QueryParams;
    settings?: ProjectRequiredSettings;
}) {
    return Request.deleteRequest<CreatedTask<"delete">>({
        target: links
            .dns()
            .zones()
            .single(zoneId),
        query,
        token,
        settings,
    });
}
