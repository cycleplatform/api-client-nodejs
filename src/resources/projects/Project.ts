import { Token } from "../../auth";
import * as API from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";
import { Profile } from "../billing";
import {
    CollectionDoc,
    Resource,
    Settings,
    SingleDoc,
    StandardEvents,
    ResourceState,
    ResourceId,
} from "../../common/Structs";

export type Collection = CollectionDoc<Project>;
export type Single = SingleDoc<Project>;

export type ProjectState = "new" | "live" | "deleting" | "deleted";
export interface Project extends Resource {
    name: string;
    events: StandardEvents;
    billing: Profile;
    state: ResourceState<ProjectState>;
}

export interface CreateParams {
    name: string;
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
        target: links.projects().collection(),
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
        target: links.projects().collection(),
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
