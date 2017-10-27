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
    State,
    StandardEvents,
    UserScope,
    Task,
    CreatedTask,
} from "../../common/Structs";
import { StackContainer } from "./StackContainer";
import { RepoProtocol } from "./StackImage";

export type Collection = CollectionDoc<Stack>;
export type Single = SingleDoc<Stack>;

export interface Stack extends Resource {
    name: string;
    owner: UserScope;
    project_id: ResourceId;
    source: Source;
    state: State<StackState>;
    events: StandardEvents;
}

export type StackState =
    | "new"
    | "live"
    | "building"
    | "deploying"
    | "deleting"
    | "deleted";

export interface Source {
    repo?: Repo;
    raw?: string | Spec; // string for creating. Spec on return
}

export interface Repo {
    url: string;
    protocol?: RepoProtocol;
    private_key?: string; // used for creating
    private_key_url?: string;
}

export interface Spec {
    name: string;
    description: string;
    containers: { [key: string]: StackContainer };
    annotations: { [key: string]: string };
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
        target: links.stacks().collection(),
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
        target: links.stacks().single(id),
        query,
        token,
        settings,
    });
}

export interface StackCreateParams {
    name: string;
    source: Source;
}

export async function create({
    value,
    token,
    query,
    settings,
}: {
    value: StackCreateParams;
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.postRequest<Single>({
        target: links.stacks().collection(),
        value,
        query,
        token,
        settings,
    });
}

export async function update({
    id,
    token,
    value,
    query,
    settings,
}: {
    id: ResourceId;
    token: Token;
    value: StackCreateParams;
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.patchRequest<Single>({
        target: links.stacks().single(id),
        value,
        query,
        token,
        settings,
    });
}

export type StackAction = "build";
export async function task<K = {}>({
    id,
    token,
    value,
    query,
    settings,
}: {
    id: ResourceId;
    token: Token;
    value: Task<StackAction, K>;
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.postRequest<CreatedTask<StackAction, K>>({
        target: links.stacks().tasks(id),
        value,
        query,
        token,
        settings,
    });
}

export async function buildStack({
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
            action: "build",
        },
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
        target: links.stacks().single(id),
        query,
        token,
        settings,
    });
}
