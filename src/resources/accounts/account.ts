import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, Settings } from "../../common/api";
import {
    CollectionDoc,
    Resource,
    SingleDoc,
    Time,
    Events,
    State,
} from "../../common/structs";

export type Collection = CollectionDoc<Account>;
export type Single = SingleDoc<Account>;
export type AccountEvent = "last_login";
export type AccountState =
    | "new"
    | "live"
    | "suspending"
    | "purging"
    | "deleting"
    | "deleted";

export interface Account extends Resource {
    name: Name;
    email: Email;
    two_factor_auth: TwoFactorAuth;
    // TODO - this isn't being returned right now.
    active: boolean;
    allow_support_login: boolean;
    events: Events<AccountEvent>;
    state: State<AccountState>;
}

export interface PublicAccount extends Resource {
    name: {
        first: string;
        last: string;
    };
}

export interface Name {
    first: string;
    last: string;
}

export interface Email {
    address: string;
    verified: boolean;
    added: Time;
}

export interface TwoFactorAuth {
    verified: boolean;
}

export async function getSingle({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.getRequest<Single>({
        target: links.account().single(),
        query,
        token,
        settings,
    });
}

export interface UpdateParams {
    name?: {
        first?: string;
        last?: string;
    };
    allow_support_login?: boolean;
}

export async function update({
    token,
    value,
    query,
    settings,
}: {
    token: Token;
    value: UpdateParams;
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.patchRequest<Single>({
        target: links.account().single(),
        value,
        query,
        token,
        settings,
    });
}
