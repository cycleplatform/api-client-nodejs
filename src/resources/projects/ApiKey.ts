import * as API from "../../common/Api";
import { Token } from "../../auth";
import { QueryParams } from "../../common/QueryParams";
import { CollectionDoc, Settings, Resource, ResourceId, StandardEvents, ResourceState, UserScope, SingleDoc } from "../../common/Structs";
import { Capability } from "./Capability";
import { links } from "../../common/Links";

export type Collection = CollectionDoc<ApiKey>;
export type Single = SingleDoc<ApiKey>;

export interface ApiKey extends Resource {
    name: string;
    secret: string;
    owner: UserScope;
    capabilities: Capability[];
    project_id: ResourceId;
    whitelist: Whitelist;
    state: ResourceState<ApiKeyState>;
    events: StandardEvents;
}

export type ApiKeyState =
    | "live"
    | "deleting"
    | "deleted";

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
    return API.getRequest<Collection>({
        token,
        target: links.projects().keys().collection(),
        query,
        settings,
    });
}

export async function getSingle({
    token,
    query,
    settings,
}: {
        token: Token,
        query?: QueryParams;
        settings?: Settings;
    }) {
    return API.getRequest<Single>({
        token,
        target: links.projects().keys().collection(),
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
        token: Token,
        value: CreateParams;
        query?: QueryParams;
        settings?: Settings;
    }) {
    return API.postRequest<Single>({
        token,
        target: links.projects().keys().collection(),
        value,
        query,
        settings,
    });
}