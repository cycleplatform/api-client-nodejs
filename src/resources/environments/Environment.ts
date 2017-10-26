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
    UserScope,
    CreatedTask,
    StatefulCounts,
} from "../../common/Structs";
import { ContainerState } from "../containers";

export type Collection = CollectionDoc<Environment>;
export type Single = SingleDoc<Environment>;

export type EnvironmentState =
    | "new"
    | "live"
    | "cloning"
    | "deleting"
    | "deleted";

export interface Environment extends Resource<EnvironmentMeta> {
    name: string;
    about: {
        description: string;
    };
    owner: UserScope;
    project_id: ResourceId;
    state: ResourceState<EnvironmentState>;
    events: StandardEvents;
    private_network: {};
    services: {
        dns: EnvService | null;
    };
}

export interface EnvironmentMeta {
    counts?: {
        containers: StatefulCounts<ContainerState>;
        instances: {
            new: number;
            starting: number;
            reimaging: number;
            running: number;
            stopping: number;
            stopped: number;
            deleting: number;
            deleted: number;
        };
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
    return API.deleteRequest<CreatedTask<"delete">>({
        target: links.environments().single(id),
        query,
        token,
        settings,
    });
}
