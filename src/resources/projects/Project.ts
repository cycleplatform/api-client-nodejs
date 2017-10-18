import { Token } from "../../auth";
import * as API from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";
import {
    CollectionDoc,
    Resource,
    Settings,
    SingleDoc,
    StandardEvents,
    ResourceState,
    ProjectRequiredSettings,
} from "../../common/Structs";

export type Collection = CollectionDoc<Project>;
export type Single = SingleDoc<Project>;

export type ProjectState = "new" | "live" | "deleting" | "deleted";
export interface Project extends Resource {
    name: string;
    events: StandardEvents;
    billing: {
        disabled: boolean;
    };
    state: ResourceState<ProjectState>;
}

export interface CreateParams {
    name: string;
}

export type UpdateParams = Partial<CreateParams>;

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
    value,
    token,
    query,
    settings,
}: {
    value: Partial<UpdateParams>;
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.patchRequest<Single>({
        target: links.projects().single(),
        value,
        query,
        token,
        settings,
    });
}

export async function remove({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: QueryParams;
    settings: ProjectRequiredSettings;
}) {
    return API.deleteRequest<Single>({
        target: links.projects().single(),
        query,
        token,
        settings,
    });
}
