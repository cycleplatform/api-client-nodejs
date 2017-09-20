import * as API from "../../common/Api";
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
    query,
    settings,
}: {
        query?: QueryParams;
        settings?: Settings;
    }) {
    return API.getRequest<Collection>({
        target: links.integrations().keys().collection(),
        query,
        settings,
    });
}

export async function getSingle({
    query,
    settings,
}: {
        query?: QueryParams;
        settings?: Settings;
    }) {
    return API.getRequest<Single>({
        target: links.integrations().keys().collection(),
        query,
        settings,
    });
}

export async function create({
    value,
    query,
    settings,
}: {
        value: CreateParams;
        query?: QueryParams;
        settings?: Settings;
    }) {
    return API.postRequest<Single>({
        target: links.integrations().keys().collection(),
        value,
        query,
        settings,
    });
}