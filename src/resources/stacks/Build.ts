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
} from "../../common/Structs";
import { StackState, Spec } from "./Stack";

export type Collection = CollectionDoc<Build>;
export type Single = SingleDoc<Build>;

export interface Build extends Resource {
    stack: ResourceId;
    creator: string;
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
