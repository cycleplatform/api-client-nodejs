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
    temp: boolean;
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
    return API.getRequest<Single>(
        links.account(settings).single(),
        query,
        token,
    );
}

export async function update({
    token,
    update,
    query,
    settings,
}: {
    token: Token;
    update: UpdateParams;
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.patchRequest<Single>(
        links.account(settings).single(),
        update,
        query,
        token,
    );
}
