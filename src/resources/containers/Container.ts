import { Token } from "../../auth";
import * as API from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";
import { Config, Builds, Stack } from "../stacks";
import { Image } from "../images";
import {
    CollectionDoc,
    Resource,
    Settings,
    SingleDoc,
    ResourceId,
    ResourceState,
    StandardEvents,
    Time,
    UserScope,
    Includes,
} from "../../common/Structs";
import { Features } from "./Features";

export type Collection = CollectionDoc<Container, {}, ContainerIncludes>;
export type Single = SingleDoc<Container>;

export interface Container extends Resource<ContainerMeta> {
    name: string;
    owner: UserScope;
    project_id: ResourceId;
    environment_id: ResourceId;
    stack?: Stack;
    image?: Image;
    config: Config;
    features: Features;
    state: ResourceState<ContainerState>;
    events: StandardEvents & {
        started?: Time;
    };
}

export interface ContainerIncludes extends Includes {
    images: {
        [key: string]: Image;
    };
    stack_builds: {
        [key: string]: Builds.Build;
    };
    stacks: {
        [key: string]: Stack;
    };
}

export type ContainerState =
    | "new"
    | "starting"
    | "running"
    | "stopping"
    | "stopped"
    | "deleting"
    | "deleted";

export interface ContainerMeta {
    instances?: { [key: string]: number };
}

export interface Stack {
    id: ResourceId;
    build_id: ResourceId;
    identifier: string;
}

export interface Image {
    id: ResourceId;
}

export interface CreateParams {
    name: string;
    about: {
        description: string;
    };
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
        target: links.containers().collection(),
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
        target: links.containers().single(id),
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
        target: links.containers().collection(),
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
        target: links.containers().single(id),
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
        target: links.containers().single(id),
        query,
        token,
        settings,
    });
}
