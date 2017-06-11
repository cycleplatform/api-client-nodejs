import { Token } from "../../auth";
import { getRequest, makeUrl, postRequest } from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { CollectionDoc, Resource, Settings, SingleDoc } from "../../common/Structs";

export interface Collection extends CollectionDoc {
    data: Account[];
}

export interface Single extends SingleDoc {
    data: Account | null;
}

export interface Account extends Resource {
    name: {
        first: string;
        last: string;
    };
}

export interface UpdateParams {
    name?: {
        first?: string;
        last?: string;
    };
}

export async function getSingle(token: Token, query?: QueryParams, settings?: Settings) {
    return getRequest<Single>(`${makeUrl(settings)}/account`, query, token);
}

export async function update(update: UpdateParams, token: Token, query?: QueryParams, settings?: Settings) {
    return postRequest<Single>(`${makeUrl(settings)}/account`, update, query, token);
}
