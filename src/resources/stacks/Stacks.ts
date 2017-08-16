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
import { StackContainer } from "./StackContainer";

export type Collection = CollectionDoc<Stack>;
export type Single = SingleDoc<Stack>;

export type StackState =
    | "new"
    | "live"
    | "building"
    | "deploying"
    | "deleting"
    | "deleted";
export interface Stack extends Resource {
    name: string;
    creator: string;
    project: string;
    containers: { [key: string]: StackContainer };
    state: ResourceState<StackState>;
    events: StandardEvents;
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
