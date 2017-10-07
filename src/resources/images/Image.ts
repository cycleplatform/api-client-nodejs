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
    UserScope,
    CreatedTask,
} from "../../common/Structs";
import { Config } from "./Config";
import { ImageSource } from "../stacks/StackImage";

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
    owner: UserScope;
    project: ResourceId;
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

export interface BuildParams {
    source: ImageSource;
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

export async function build({
    value,
    token,
    query,
    settings,
}: {
    value: BuildParams;
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.postRequest<CreatedTask<"image.import">>({
        target: links.images().build(),
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
