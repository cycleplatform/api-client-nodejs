import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, Settings } from "../../common/api";
import {
    CollectionDoc,
    Resource,
    SingleDoc,
    ResourceId,
    State,
    Events,
    Bytes,
    UserScope,
} from "../../common/Structs";
import { Config } from "./Config";

export type Collection = CollectionDoc<Image>;
export type Single = SingleDoc<Image>;
export type ImageState =
    | "new"
    | "downloading"
    | "building"
    | "verifying"
    | "saving"
    | "live"
    | "deleting"
    | "deleted";

export interface Image extends Resource {
    name: string;
    stack_id: ResourceId;
    size: Bytes;
    about: {
        description: string;
    };
    tags: string[];
    config: Config;
    owner: UserScope;
    project: ResourceId;
    state: State<ImageState>;
    events: Events;
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
        target: links.images().collection(),
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
    settings?: Settings;
}) {
    return Request.getRequest<Single>({
        target: links.images().single(id),
        query,
        token,
        settings,
    });
}
