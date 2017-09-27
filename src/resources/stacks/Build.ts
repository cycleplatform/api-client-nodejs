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
    Task,
    CreatedTask,
} from "../../common/Structs";
import { StackState, Spec } from "./Stack";

export type Collection = CollectionDoc<Build>;
export type Single = SingleDoc<Build>;

export interface Build extends Resource {
    stack_id: ResourceId;
    owner: UserScope;
    spec: Spec;
    events: StandardEvents;
    state: ResourceState<StackState>;
}

export async function getCollection({
    stack,
    token,
    query,
    settings,
}: {
    stack: ResourceId;
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.getRequest<Collection>({
        target: links.stacks().builds(stack).collection(),
        query,
        token,
        settings,
    });
}

export async function getSingle({
    id,
    stack,
    token,
    query,
    settings,
}: {
    id: ResourceId;
    stack: ResourceId;
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.getRequest<Single>({
        target: links.stacks().builds(stack).single(id),
        query,
        token,
        settings,
    });
}

export async function remove({
    id,
    stack,
    token,
    query,
    settings,
}: {
    id: ResourceId;
    token: Token;
    stack: ResourceId;
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.deleteRequest<Single>({
        target: links.stacks().builds(stack).single(id),
        query,
        token,
        settings,
    });
}

export type BuildAction = "deploy";
export async function task<K = {}>({
    id,
    stackId,
    token,
    value,
    query,
    settings,
}: {
    id: ResourceId;
    stackId: ResourceId;
    token: Token;
    value: Task<BuildAction, K>;
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.postRequest<CreatedTask<BuildAction, K>>({
        target: links.stacks().builds(stackId).tasks(id),
        value,
        query,
        token,
        settings,
    });
}

export interface DeployParams {
    environment_id: ResourceId;
}

export async function deployBuild({
    id,
    stackId,
    value, 
    token,
    query,
    settings,
}: {
    id: ResourceId;
    stackId: ResourceId;    
    value: DeployParams,
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return task<DeployParams>({
        id,
        stackId,
        token,
        query,
        settings,
        value: {action: "deploy", contents: value},
    });
}

