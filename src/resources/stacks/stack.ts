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
    Task,
    CreatedTask,
} from "../../common/structs";
import { Container, RepoProtocol } from "./spec";

export type Collection = CollectionDoc<Stack>;
export type Single = SingleDoc<Stack>;
export type StackState =
    | "new"
    | "importing"
    | "building"
    | "verifying"
    | "saving"
    | "live"
    | "deleting"
    | "deleted";

export interface Stack extends Resource {
    name: string;
    owner: UserScope;
    project_id: ResourceId;
    source: Source;
    state: State<StackState>;
    events: Events;
}

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

export async function getCollection({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.getRequest<Collection>({
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
    return Request.getRequest<Single>({
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
    return Request.postRequest<Single>({
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
    return Request.patchRequest<Single>({
        target: links.stacks().single(id),
        value,
        query,
        token,
        settings,
    });
}
