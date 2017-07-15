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

export type Collection = CollectionDoc<Environment>;
export type Single = SingleDoc<Environment>;

export interface Environment extends Resource {
    name: string;
    about: {
        description: string;
    };
    creator: string;
    project: string;
    state: ResourceState<"cloning" | "deleting">;
    events: StandardEvents;
    services: {
        dns: EnvService;
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
        target: links.projects().single(id),
        value,
        query,
        token,
        settings,
    });
}
