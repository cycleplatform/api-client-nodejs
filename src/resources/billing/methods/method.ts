import {
    CollectionDoc,
    Resource,
    SingleDoc,
    Events,
    State,
    OwnerScope,
    ResourceId,
} from "../../../common/structs";
import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import {
    QueryParams,
    links,
    ProjectRequiredSettings,
} from "../../../common/api";

export type Collection = CollectionDoc<Method>;
export type Single = SingleDoc<Method>;
export type MethodState = "live" | "deleting" | "deleted";

export interface Method extends Resource {
    name: string;
    primary: boolean;
    address: Address;
    owner: OwnerScope;
    credit_card: CreditCard;
    state: State<MethodState>;
    events: Events;
}

export interface Address {
    country: string;
    zip: string;
}

export interface CreditCard {
    name: string;
    brand: string;
    expiration: {
        month: number;
        year: number;
    };
    last_4: string;
}

export async function getCollection({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: QueryParams;
    settings: ProjectRequiredSettings;
}) {
    return Request.getRequest<Collection>({
        target: links
            .billing()
            .methods()
            .collection(),
        query,
        token,
        settings,
    });
}

export async function getSingle({
    id,
    token,
    query,
    settings,
}: {
    id: ResourceId;
    token: Token;
    query?: QueryParams;
    settings: ProjectRequiredSettings;
}) {
    return Request.getRequest<Single>({
        target: links
            .billing()
            .methods()
            .single(id),
        query,
        token,
        settings,
    });
}

export interface CreateParams {
    name: string;
    primary: boolean;
    address: Address;
    credit_card: {
        name: string;
        number: string;
        cvv2: string;
        expiration: {
            month: number;
            year: number;
        };
    };
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
    settings: ProjectRequiredSettings;
}) {
    return Request.postRequest<Single>({
        target: links
            .billing()
            .methods()
            .collection(),
        value,
        query,
        token,
        settings,
    });
}

export interface UpdateParams {
    name?: string;
    primary?: boolean;
    address?: Address;
}

export async function update({
    id,
    value,
    token,
    query,
    settings,
}: {
    id: ResourceId;
    value: UpdateParams;
    token: Token;
    query?: QueryParams;
    settings: ProjectRequiredSettings;
}) {
    return Request.patchRequest<Single>({
        target: links
            .billing()
            .methods()
            .single(id),
        value,
        query,
        token,
        settings,
    });
}
