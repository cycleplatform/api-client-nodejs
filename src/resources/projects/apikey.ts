import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import {
    QueryParams,
    links,
    Settings,
    ProjectRequiredSettings,
} from "../../common/api";
import {
    CollectionDoc,
    Resource,
    ResourceId,
    Events,
    State,
    OwnerScope,
    SingleDoc,
} from "../../common/structs";
import { Capability } from "./capability";

export type Collection = CollectionDoc<ApiKey>;
export type Single = SingleDoc<ApiKey>;

export interface ApiKey extends Resource {
    name: string;
    secret: string;
    owner: OwnerScope;
    capabilities: Capability[];
    project_id: ResourceId;
    ips: string[] | null;
    state: State<ApiKeyState>;
    events: Events;
}

export type ApiKeyState = "live" | "deleting" | "deleted";

export interface CreateParams {
    name: string;
    capabilities: Capability[];
    ips: string[] | null;
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
    return Request.getRequest<Collection>({
        token,
        target: links
            .projects()
            .keys()
            .collection(),
        query,
        settings,
    });
}

export async function getSingle({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.getRequest<Single>({
        token,
        target: links
            .projects()
            .keys()
            .collection(),
        query,
        settings,
    });
}

export async function create({
    token,
    value,
    query,
    settings,
}: {
    token: Token;
    value: CreateParams;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.postRequest<Single>({
        token,
        target: links
            .projects()
            .keys()
            .collection(),
        value,
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
    settings: ProjectRequiredSettings;
}) {
    return Request.deleteRequest<Single>({
        target: links
            .projects()
            .keys()
            .single(id),
        query,
        token,
        settings,
    });
}
