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

export type Collection = CollectionDoc<Record, {}, RecordIncludes>;
export type Single = SingleDoc<Record>;

export type RecordState = "live" | "deleting" | "deleted";
export type RecordType = "a" | "aaaa" | "cname" | "mx" | "ns" | "txt";
export type RecordQuery = QueryParams<keyof RecordIncludes>;

export interface Record extends Resource {
    project_id: ResourceId;
    owner: UserScope;
    zone_id: ResourceId;
    container_id: ResourceId;
    type: RecordType;
    assignable: boolean;
    name: string;
    values: RecordValues;
    domain: string;
    state: State<RecordState>;
    events: Events;
}

export interface RecordValues {
    ip?: string;
    domain?: string;
    priority?: number;
    text?: string;
    comment?: string;
}

export interface RecordIncludes {
    owners: OwnerInclude;
}

export async function getCollection({
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
    return Request.getRequest<Collection>({
        target: links
            .dns()
            .zones()
            .records(zoneId),
        query,
        token,
        settings,
    });
}

export interface CreateParams {
    type: RecordType;
    name: string;
    values: RecordValues;
    assignable: boolean;
}

export async function create({
    zoneId,
    value,
    token,
    query,
    settings,
}: {
    zoneId: ResourceId;
    value: CreateParams;
    token: Token;
    query?: QueryParams;
    settings?: ProjectRequiredSettings;
}) {
    return Request.postRequest<Single>({
        target: links
            .dns()
            .zones()
            .records(zoneId),
        query,
        token,
        settings,
        value,
    });
}

export async function update({
    zoneId,
    recordId,
    value,
    token,
    query,
    settings,
}: {
    zoneId: ResourceId;
    recordId: ResourceId;
    value: CreateParams;
    token: Token;
    query?: QueryParams;
    settings?: ProjectRequiredSettings;
}) {
    return Request.patchRequest<Single>({
        target: links
            .dns()
            .zones()
            .record(zoneId, recordId),
        query,
        token,
        settings,
        value,
    });
}

export async function remove({
    zoneId,
    recordId,
    token,
    query,
    settings,
}: {
    zoneId: ResourceId;
    recordId: ResourceId;
    token: Token;
    query?: QueryParams;
    settings?: ProjectRequiredSettings;
}) {
    return Request.deleteRequest<CreatedTask<"delete">>({
        target: links
            .dns()
            .zones()
            .record(zoneId, recordId),
        query,
        token,
        settings,
    });
}
