import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, Settings } from "../../common/api";
import {
    CollectionDoc,
    Resource,
    ResourceId,
    Events,
    State,
    UserScope,
    SingleDoc,
} from "../../common/structs";
import { Capability } from "./Capability";

export type Collection = CollectionDoc<ApiKey>;
export type Single = SingleDoc<ApiKey>;

export interface ApiKey extends Resource {
    name: string;
    secret: string;
    owner: UserScope;
    capabilities: Capability[];
    project_id: ResourceId;
    whitelist: Whitelist;
    state: State<ApiKeyState>;
    events: Events;
}

export type ApiKeyState = "live" | "deleting" | "deleted";

export interface Whitelist {
    enable: boolean;
    ips: string[];
}

export interface CreateParams {
    name: string;
    capabilities: Capability[];
    whitelist: Whitelist;
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
