import {
    CollectionDoc,
    Resource,
    SingleDoc,
    Scope,
    StandardEvents,
    ResourceId,
    ResourceState,
} from "../../common/Structs";

export type Collection = CollectionDoc<Method>;
export type Single = SingleDoc<Method>;

export interface Method extends Resource {
    name: string;
    primary: boolean;
    address: Address;
    creator: ResourceId;
    owner: Scope;
    credit_card: CreditCard;
    state: ResourceState<MethodState>;
    events: StandardEvents;
}

export type MethodState = "live" | "deleting" | "deleted";

export interface Address {
    city: string;
    country: string;
    state: string;
    zip: string;
    lines: string[];
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
