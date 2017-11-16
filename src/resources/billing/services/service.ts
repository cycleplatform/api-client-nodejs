import {
    ResourceId,
    Events,
    State,
    UserScope,
    Mills,
} from "../../../common/structs";
import { Term } from "../term";
import { Item } from "./item";
import { Amount } from "../amount";
import { AssociatedDiscount } from "../discounts";
import { PlanType } from "../../plans";

export type ServiceEvent =
    | "billed"
    | "paid"
    | "payment_attempt"
    | "credited"
    | "voided";

export interface Service {
    id: ResourceId;
    owner: UserScope;
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
