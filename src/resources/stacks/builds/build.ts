import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { QueryParams, links, Settings } from "../../../common/api";
import {
    CollectionDoc,
    Resource,
    SingleDoc,
    ResourceId,
    State,
    Events,
    UserScope,
} from "../../../common/structs";
import { Spec } from "../spec";

export * from "./tasks/build";

export type Collection = CollectionDoc<Build>;
export type Single = SingleDoc<Build>;
export type BuildState =
    | "new"
    | "importing"
    | "building"
    | "verifying"
    | "saving"
    | "live"
    | "deploying"
    | "deleting"
    | "deleted";

export interface Build extends Resource {
    stack_id: ResourceId;
    owner: UserScope;
    spec: Spec;
    events: Events;
    state: State<BuildState>;
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
    return Request.getRequest<Collection>({
        target: links
            .stacks()
            .builds(stack)
            .collection(),
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
    return Request.getRequest<Single>({
        target: links
            .stacks()
            .builds(stack)
            .single(id),
        query,
        token,
        settings,
    });
}
