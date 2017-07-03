import { Token } from "../../auth";
import * as API from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";
import { BillingProfile } from "../billing";
import {
    CollectionDoc,
    Resource,
    Settings,
    SingleDoc,
    StandardEvents,
    ResourceState,
} from "../../common/Structs";

export type Collection = CollectionDoc<Project>;
export type Single = SingleDoc<Project>;

export interface Project extends Resource {
    name: string;
    events: StandardEvents;
    billing: BillingProfile;
    state: ResourceState;
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
    return API.getRequest<Collection>(
        links.projects(settings).collection(),
        query,
        token,
    );
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
    return API.postRequest<Single>(
        links.projects(settings).collection(),
        value,
        query,
        token,
    );
}