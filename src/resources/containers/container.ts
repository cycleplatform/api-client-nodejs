import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, Settings } from "../../common/api";
import { Spec, Builds, Stack } from "../stacks";
import { Image } from "../images";
import {
    CollectionDoc,
    Resource,
    SingleDoc,
    ResourceId,
    State,
    Events,
    UserScope,
    OwnerInclude,
} from "../../common/structs";
import { Features } from "./features";

export type Collection = CollectionDoc<Container, {}, ContainerIncludes>;
export type Single = SingleDoc<Container>;
export type ContainerState =
    | "new"
    | "starting"
    | "running"
    | "stopping"
    | "stopped"
    | "deleting"
    | "deleted";
export type ContainerEvent = "started";

export interface Container extends Resource<ContainerMetas> {
    name: string;
    owner: UserScope;
    project_id: ResourceId;
    environment_id: ResourceId;
    stack?: Stack;
    image?: Image;
    config: Spec.Config;
    features: Features;
    state: State<ContainerState>;
    events: Events<ContainerEvent>;
}

export interface ContainerIncludes {
    owner: OwnerInclude;
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

export interface ContainerMetas {
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

export async function getCollection({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: QueryParams<keyof ContainerIncludes>;
    settings?: Settings;
}) {
    return Request.getRequest<Collection>({
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
    return Request.getRequest<Single>({
        target: links.containers().single(id),
        query,
        token,
        settings,
    });
}

export interface CreateParams {
    name: string;
    environment_id: ResourceId;
    image_id: ResourceId;
    dns_record_id: ResourceId;
    config?: Partial<Spec.Config>;
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
    return Request.postRequest<Single>({
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
    return Request.patchRequest<Single>({
        target: links.containers().single(id),
        value,
        query,
        token,
        settings,
    });
}
