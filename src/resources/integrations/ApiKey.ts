import * as API from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { CollectionDoc, Settings, Resource, ResourceId, StandardEvents, ResourceState } from "../../common/Structs";
import { links } from "../../common/Links";

export type Collection = CollectionDoc<ApiKey>;

export interface ApiKey extends Resource {
    name: string;
    secret: string;
    readonly: boolean;
    creator_id: ResourceId;
    project_id: ResourceId;
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
