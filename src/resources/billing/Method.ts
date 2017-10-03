import {
    CollectionDoc,
    Resource,
    SingleDoc,
    StandardEvents,
    ResourceState,
    ProjectRequiredSettings,
    UserScope,
} from "../../common/Structs";
import * as API from "../../common/Api";
import { Token } from "../../auth";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";

export type Collection = CollectionDoc<Method>;
export type Single = SingleDoc<Method>;

export interface Method extends Resource {
    name: string;
    primary: boolean;
    address: Address;
    owner: UserScope;
    credit_card: CreditCard;
    state: ResourceState<MethodState>;
    events: StandardEvents;
}

export type MethodState = "live" | "deleting" | "deleted";

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

export async function getCollection({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: QueryParams;
    settings: ProjectRequiredSettings;
}) {
    return API.getRequest<Collection>({
        target: links
            .billing()
            .methods()
            .collection(),
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
    settings: ProjectRequiredSettings;
}) {
    return API.postRequest<Single>({
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
