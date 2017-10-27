import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import {
    QueryParams,
    links,
    ProjectRequiredSettings,
    Settings,
} from "../../common/api";
import {
    CollectionDoc,
    Resource,
    SingleDoc,
    Events,
    State,
} from "../../common/structs";

export type Collection = CollectionDoc<Project>;
export type Single = SingleDoc<Project>;

export type ProjectState =
    | "new"
    | "configuring" // placing an order
    | "provisioning" // order confirmed, invoice billed
    | "live" // at least 1 server online
    | "inactive"
    | "deleting"
    | "deleted";

export interface Project extends Resource {
    name: string;
    events: Events;
    billing: {
        disabled: boolean;
    };
    state: State<ProjectState>;
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
    return Request.getRequest<Collection>({
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
    return Request.postRequest<Single>({
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
    return Request.patchRequest<Single>({
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
    return Request.deleteRequest<Single>({
        target: links.projects().single(),
        query,
        token,
        settings,
    });
}
