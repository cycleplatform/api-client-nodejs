import {
    CollectionDoc,
    Resource,
    SingleDoc,
    Events,
    ResourceId,
    UserScope,
    Mills,
    State,
} from "../../../common/structs";
import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import {
    QueryParams,
    links,
    ProjectRequiredSettings,
} from "../../../common/api";
import { Item as ServiceItem } from "../services/item";
import { Amount } from "../amount";
import { AssociatedDiscount } from "../discounts";
import { Term, TermLength } from "../term";

export type Collection = CollectionDoc<Order>;
export type Single = SingleDoc<Order>;
export type OrderState =
    | "new"
    | "processed"
    | "expired"
    | "deleting"
    | "deleted";
export type OrderEvent =
    | "paid"
    | "payment_attempt"
    | "credited"
    | "voided"
    | "applied_late_fee";

export interface Order extends Resource<OrderMeta> {
    project_id: ResourceId;
    owner: UserScope;
    term: Term;
    approved: boolean;
    items: Item[];
    total_price: Mills;
    events: Events<OrderEvent>;
    state: State<OrderState>;
}

export interface CreateParams {
    servers?: OrderServer[];
    ip_plan_id?: ResourceId;
    bandwidth_plan_id?: ResourceId;
    support_plan_id?: ResourceId;
    term_length?: TermLength;
}

export interface OrderMeta {
    due?: {
        term: Term;
        amount: Mills;
    };
}

export interface OrderServer {
    id: ResourceId;
    datacenter_id: ResourceId;
    count: number;
}

export interface Item {
    id: ResourceId;
    service: ServiceItem;
    description: string;
    price: Amount;
    discount?: AssociatedDiscount;
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
            .orders()
            .single(id),
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
    return Request.postRequest<Single>({
        target: links
            .billing()
            .orders()
            .collection(),
        value,
        query,
        token,
        settings,
    });
}

export async function update({
    id,
    value,
    token,
    query,
    settings,
}: {
    id: ResourceId;
    value: CreateParams;
    token: Token;
    query?: QueryParams;
    settings: ProjectRequiredSettings;
}) {
    return Request.patchRequest<Single>({
        target: links
            .billing()
            .orders()
            .single(id),
        value,
        query,
        token,
        settings,
    });
}
