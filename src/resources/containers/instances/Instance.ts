import { Token } from "../../../auth";
import * as API from "../../../common/Api";
import { QueryParams } from "../../../common/QueryParams";
import { links } from "../../../common/Links";
import { Config, Stack } from "../../stacks";
import { Image } from "../../images";
import { Server } from "../../infrastructure/servers";
import { DataCenters } from "../../infrastructure/provider";
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
    Task,
    CreatedTask,
    OwnerIncludes,
} from "../../../common/Structs";
import { IPNet } from "../../network";

export type Collection = CollectionDoc<Instance, {}, CollectionIncludes>;
export type Single = SingleDoc<Instance>;
export type InstanceState =
    | "new"
    | "starting"
    | "reimaging"
    | "running"
    | "stopping"
    | "stopped"
    | "deleting"
    | "deleted";

export interface Instance extends Resource<InstanceMeta> {
    owner: UserScope;
    project_id: ResourceId;
    container_id: ResourceId;
    environment: Environment;
    datacenter_id: ResourceId;
    server_id: ResourceId;
    hostname: string;
    state: ResourceState<InstanceState>;
    events: StandardEvents & {
        first_boot?: Time;
        started?: Time;
    };
}

export interface Environment {
    id: ResourceId;
    network_id: number;
    ipv4: IPNet;
    ipv6: IPNet;
}

export interface CollectionIncludes extends Includes {
    owner: OwnerIncludes;
    servers: {
        [key: string]: Server;
    };
    datacenters: {
        [key: string]: DataCenters.DataCenter;
    };
}

// tslint:disable-next-line:no-empty-interface
export interface InstanceMeta {
    //
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
    query?: QueryParams<keyof CollectionIncludes, keyof InstanceMeta>;
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
