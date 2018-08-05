import {
    ResourceId,
    Events,
    State,
    OwnerScope,
    Mills,
    Resource,
    CollectionDoc,
    SingleDoc,
} from "../../../common/structs";
import { Token } from "../../../auth";
import {
    QueryParams,
    links,
    ProjectRequiredSettings,
} from "../../../common/api";
import * as Request from "../../../common/api/request";

import { Term } from "../term";
import { Item } from "./item";
import { Amount } from "../amount";
import { AssociatedDiscount } from "../discounts";
import { PlanType } from "../../plans";

export type Collection = CollectionDoc<Service>;
export type Single = SingleDoc<Service>;

export type ServiceEvent = "last_billed";

export interface Service extends Resource {
    owner: OwnerScope;
    project_id: ResourceId;
    title: string;
    order: Order;
    item: Item;
    events: Events<ServiceEvent>;
    discount: AssociatedDiscount;
    price: Amount;
    term: Term;
    state: State;
}

export interface Order {
    id: ResourceId;
    item_id: ResourceId;
}

export interface Summary {
    service_id: ResourceId;
    title: string;
    type: PlanType;
    term: Term;
    price: Mills;
    discount: Mills;
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
            .services()
            .single(id),
        query,
        token,
        settings,
    });
}

export async function getCollection({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: QueryParams;
    settings?: ProjectRequiredSettings;
}) {
    return Request.getRequest<Collection>({
        target: links
            .billing()
            .services()
            .collection(),
        query,
        token,
        settings,
    });
}
