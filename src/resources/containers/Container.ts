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
    State,
    StandardEvents,
    Time,
    UserScope,
    Includes,
    Task,
    CreatedTask,
    OwnerIncludes,
} from "../../common/Structs";
import { Features } from "./Features";

export type Collection = CollectionDoc<Container, {}, CollectionIncludes>;
export type Single = SingleDoc<Container>;
export type ContainerState =
    | "new"
    | "starting"
    | "running"
    | "stopping"
    | "stopped"
    | "deleting"
    | "deleted";

export interface Container extends Resource<CollectionMetas> {
    name: string;
    owner: UserScope;
    project_id: ResourceId;
    environment_id: ResourceId;
    stack?: Stack;
    image?: Image;
    config: Config;
    features: Features;
    state: State<ContainerState>;
    events: StandardEvents & {
        started?: Time;
    };
}

export interface CollectionIncludes extends Includes {
    owner: OwnerIncludes;
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

export interface CollectionMetas {
    instance_counts?: { [key: string]: number };
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
    environment_id: ResourceId;
    image_id: ResourceId;
    dns_record_id: ResourceId;
    config?: Partial<Config>;
}

export async function getCollection({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: QueryParams<keyof CollectionIncludes>;
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

export async function start({
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
    return task({
        id,
        token,
        query,
        settings,
        value: {
            action: "start",
        },
    });
}

export async function stop({
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
    return task({
        id,
        token,
        query,
        settings,
        value: {
            action: "stop",
        },
    });
}

export type ContainerAction = "start" | "stop";
export async function task<K = {}>({
    id,
    token,
    value,
    query,
    settings,
}: {
    id: ResourceId;
    token: Token;
    value: Task<ContainerAction, K>;
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.postRequest<CreatedTask<ContainerAction, K>>({
        target: links.containers().tasks(id),
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
    return API.deleteRequest<CreatedTask<"delete">>({
        target: links.containers().single(id),
        query,
        token,
        settings,
    });
}
