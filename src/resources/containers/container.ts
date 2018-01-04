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
import { IPNet } from "../network";

export type Collection = CollectionDoc<Container, {}, ContainerIncludes>;
export type Single = SingleDoc<Container, {}, ContainerIncludes>;
export type ContainerState =
    | "new"
    | "starting"
    | "running"
    | "stopping"
    | "stopped"
    | "deleting"
    | "deleted";
export type ContainerEvent = "started";
export type ContainerQuery = QueryParams<
    keyof ContainerIncludes,
    keyof ContainerMetas
>;

export interface Container extends Resource<ContainerMetas> {
    name: string;
    owner: UserScope;
    project_id: ResourceId;
    environment: {
        id: ResourceId;
        network_id: number;
        ipv4: IPNet;
        ipv6: IPNet;
    };
    stack?: CondensedStack;
    image?: CondensedImage;
    config: Spec.Config;
    volumes: Spec.Volume[];
    features: Features;
    state: State<ContainerState>;
    events: Events<ContainerEvent>;
}

export interface ContainerIncludes {
    owners: OwnerInclude;
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

export interface CondensedStack {
    id: ResourceId;
    image: {
        id: ResourceId;
    };
    build_id: ResourceId;
    identifier: "db";
}

export interface CondensedImage {
    id: ResourceId;
}

export async function getCollection({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: ContainerQuery;
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
    query?: ContainerQuery;
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
    query?: ContainerQuery;
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
    value: Pick<CreateParams, "name">;
    token: Token;
    query?: ContainerQuery;
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
