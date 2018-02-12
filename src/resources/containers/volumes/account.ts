import { ResourceId, Resource, CollectionDoc } from "../../../common/structs";
import { Token } from "../../../auth";
import { QueryParams, Settings, links } from "../../../common/api";
import * as Request from "../../../common/api/request";

export type AccountsCollection = CollectionDoc<VolumeAccount>;

export interface VolumeAccount extends Resource {
    username: string;
    readonly: boolean;
    container_id: ResourceId;
    project_id: ResourceId;
    container_volume_id: ResourceId;
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
    return Request.getRequest<AccountsCollection>({
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
    container_volume_id: ResourceId;
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
    return Request.postRequest<AccountsCollection>({
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

export interface UpdateAccountParams {
    username?: string;
    password?: string;
    readonly?: boolean;
}

export async function updateAccount({
    id,
    containerId,
    value,
    token,
    query,
    settings,
}: {
    id: ResourceId;
    containerId: ResourceId;
    value: UpdateAccountParams;
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.patchRequest<AccountsCollection>({
        target: links
            .containers()
            .volumes()
            .account(id, containerId),
        value,
        query,
        token,
        settings,
    });
}
