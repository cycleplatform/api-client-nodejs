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
    UserScope,
    CreatedTask,
    StatefulCounts,
    OwnerInclude,
} from "../../common/structs";
import { ContainerState, Instances } from "../containers";
import { IPNet } from "../network";

export type Collection = CollectionDoc<Environment, {}, EnvironmentIncludes>;
export type Single = SingleDoc<Environment>;
export type EnvironmentState =
    | "new"
    | "live"
    | "cloning"
    | "deleting"
    | "deleted";
export type EnvironmentQuery = QueryParams<
    keyof EnvironmentIncludes,
    keyof EnvironmentMeta
>;

export interface Environment extends Resource<EnvironmentMeta> {
    name: string;
    about: {
        description: string;
    };
    owner: UserScope;
    project_id: ResourceId;
    state: State<EnvironmentState>;
    events: Events;
    private_network: {
        vxlan_tag: number;
        subnet: number;
        ipv4: IPNet;
        ipv6: IPNet;
    };
    services: {
        dns: EnvService | null;
    };
}

export interface EnvironmentIncludes {
    owners: OwnerInclude;
}

export interface EnvironmentMeta {
    counts?: {
        containers: StatefulCounts<ContainerState>;
        instances: StatefulCounts<Instances.InstanceState>;
    };
}

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
    query?: EnvironmentQuery;
    settings?: Settings;
}) {
    return Request.getRequest<Collection>({
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
    query?: EnvironmentQuery;
    settings?: Settings;
}) {
    return Request.getRequest<Single>({
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
    return Request.postRequest<Single>({
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
    return Request.patchRequest<Single>({
        target: links.environments().single(id),
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
    return Request.deleteRequest<CreatedTask<"delete">>({
        target: links.environments().single(id),
        query,
        token,
        settings,
    });
}
