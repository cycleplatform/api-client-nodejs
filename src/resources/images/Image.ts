import { Token } from "../../auth";
import * as API from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";
import {
    CollectionDoc,
    Resource,
    Settings,
    SingleDoc,
    ResourceId,
    ResourceState,
    StandardEvents,
    Bytes,
} from "../../common/Structs";
import { Config } from "./Config";

export type Collection = CollectionDoc<Image>;
export type Single = SingleDoc<Image>;

export interface Image extends Resource {
    name: string;
    stack_id: ResourceId;
    size: Bytes;
    about: {
        description: string;
    };
    tags: string[];
    config: Config;
    creator: string;
    project: string;
    state: ResourceState<ImageState>;
    events: StandardEvents;
}

export type ImageState =
    | "new"
    | "downloading"
    | "building"
    | "verifying"
    | "saving"
    | "live"
    | "deleting"
    | "deleted";

export interface CreateParams {
    name: string;
    about: {
        description: string;
    };
}

export interface EnvService {
    container: string;
    id: ResourceId;
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
    return API.getRequest<Single>({
        target: links.images().single(id),
        query,
        token,
        settings,
    });
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
    settings?: Settings;
}) {
    return API.postRequest<Single>({
        target: links.images().collection(),
        value,
        query,
        token,
        settings,
    });
}

export async function update({
    id,
    value,
    token,
    query,
    settings,
}: {
    id: ResourceId;
    value: Partial<CreateParams>;
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.patchRequest<Single>({
        target: links.images().single(id),
        value,
        query,
        token,
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
    return API.deleteRequest<Single>({
        target: links.images().single(id),
        query,
        token,
        settings,
    });
}
