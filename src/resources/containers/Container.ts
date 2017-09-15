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
    Time,
} from "../../common/Structs";
import { Volume } from "./Volume";

export type Collection = CollectionDoc<Container>;
export type Single = SingleDoc<Container>;

export interface Container extends Resource {
    name: string;
    creator_id: ResourceId;
    project_id: ResourceId;
    environment_id: ResourceId;
    image_id: ResourceId;
    plan_id: ResourceId;
    stats: Stats;
    volumes: Volume[];
    tags: string[];
    state: ResourceState<ContainerState>;
    events: StandardEvents & {
        started?: Time;
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

export interface Stats {
    spawns: number;
}

export interface Config {
    flags: Flags;
    tls: TLS;
    runtime: RuntimeConfig;
    hostname: string;
    service?: Service;
}

export interface Flags {
    auto_restart: boolean;
}

export interface TLS {
    enabled: boolean;
    path: string;
    domain: string;
    created: Time;
    certificate_id?: ResourceId;
}

export interface RuntimeConfig {
    env_vars: { [key: string]: string };
    command: RuntimeCommand;
}

export interface RuntimeCommand {
    args: string[];
    override: boolean;
}

export interface Service {
    role: "" | "dns";
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
        target: links.environments().collection(),
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
        target: links.environments().single(id),
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
        target: links.environments().collection(),
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
        target: links.projects().single(id),
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
        target: links.projects().single(id),
        query,
        token,
        settings,
    });
}
