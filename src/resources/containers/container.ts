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
    OwnerScope,
    OwnerInclude,
    StatefulCounts,
    IP,
} from "../../common/structs";
import { Features } from "./features";
import { IPNet, Kind, IPState } from "../network";
import { InstanceState } from "./instances";
import { Services } from "./services";
import { ContainerVolume } from "./volumes";

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
    owner: OwnerScope;
    project_id: ResourceId;
    environment: CondensedEnvironment;
    stack?: CondensedStack;
    image: CondensedImage;
    config: Spec.Config;
    volumes?: ContainerVolume[];
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
    instance_counts?: StatefulCounts<InstanceState>;
    ips?: Array<{
        kind: Kind;
        ip: IPNet;
        gateway: IP;
        netmask: IP;
        network: IP;
        state: State<IPState>;
    }>;
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
    id?: ResourceId;
    service: Services | null;
}

export interface CondensedEnvironment {
    id: ResourceId;
    network_id: number | null;
    ipv4: IPNet | null;
    ipv6: IPNet | null;
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
    config?: Partial<Spec.Config>;
    hosted_domain_id?: ResourceId;
    volumes?: Spec.Volume[];
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
