import { Token } from "../../auth";
import * as API from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";
import {
    CollectionDoc,
    Resource,
    Settings,
    SingleDoc,
    Time,
} from "../../common/Structs";

export type Collection = CollectionDoc<Account>;
export type Single = SingleDoc<Account>;

export interface Account extends Resource {
    email: {
        address: string;
        verified: boolean;
        added: Time;
    };
    name: {
        first: string;
        last: string;
    };
    temp?: boolean;
}

export interface UpdateParams {
    name?: {
        first?: string;
        last?: string;
    };
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
    return API.getRequest<Single>({
        target: links.account().single(),
        query,
        token,
        settings,
    });
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
    return API.patchRequest<Single>({
        target: links.account().single(),
        value,
        query,
        token,
        settings,
    });
}
