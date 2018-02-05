import { ResourceId, Resource, CollectionDoc } from "../../../common/structs";
import { Token } from "../../../auth";
import { QueryParams, Settings, links } from "../../../common/api";
import * as Request from "../../../common/api/request";

export type Collection = CollectionDoc<VolumeAccount>;

export interface VolumeAccount extends Resource {
    username: string;
    readonly: boolean;
    container_id: ResourceId;
    project_id: ResourceId;
    destination: string;
}

export async function getAccounts({
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
    return Request.getRequest<Collection>({
        target: links
            .containers()
            .volumes()
            .accounts(id),
        query,
        token,
        settings,
    });
}

export interface CreateAccountParams {
    username: string;
    password: string;
    readonly: boolean;
    destination: string;
}

export async function createAccount({
    id,
    value,
    token,
    query,
    settings,
}: {
    id: ResourceId;
    value: CreateAccountParams;
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.postRequest<Collection>({
        target: links
            .containers()
            .volumes()
            .accounts(id),
        value,
        query,
        token,
        settings,
    });
}
