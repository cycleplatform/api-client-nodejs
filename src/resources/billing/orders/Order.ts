import {
    CollectionDoc,
    Resource,
    ProjectRequiredSettings,
    SingleDoc,
    Time,
    StandardEvents,
    ResourceId,
    Task,
    Settings,
    UserScope,
    CreatedTask,
    Mills,
    ResourceState,
} from "../../../common/Structs";
import * as API from "../../../common/Api";
import { Term, TermLength } from "../Term";
import { Token } from "../../../auth";
import { QueryParams } from "../../../common/QueryParams";
import { links } from "../../../common/Links";
import { Item as ServiceItem } from "../services/Item";
import { Amount } from "../Amount";
import { AssociatedDiscount } from "../discounts";

export type Collection = CollectionDoc<Order>;
export type Single = SingleDoc<Order>;

export type BillingState =
    | "new"
    | "processed"
    | "expired"
    | "deleting"
    | "deleted";

export interface Order extends Resource<OrderMeta> {
    project_id: ResourceId;
    owner: UserScope;
    term: Term;
    approved: boolean;
    items: Item[];
    total_price: Mills;
    events: StandardEvents & {
        paid: Time;
        payment_attempt: Time;
        credited: Time;
        voided: Time;
        applied_late_fee: Time;
    };
    state: ResourceState<BillingState>;
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
    discount: AssociatedDiscount;
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
    return API.getRequest<Single>({
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
    return API.postRequest<Single>({
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
    return API.patchRequest<Single>({
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

export async function confirm({
    id,
    token,
    query,
    settings,
}: {
    id: ResourceId;
    token: Token;
    query?: QueryParams;
    settings?: Settings;
}) {
    return task({
        id,
        token,
        query,
        settings,
        value: {
            action: "confirm",
        },
    });
}

export type OrderAction = "confirm";
export async function task({
    id,
    token,
    value,
    query,
    settings,
}: {
    id: ResourceId;
    token: Token;
    value: Task<OrderAction>;
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.postRequest<CreatedTask<OrderAction>>({
        target: links
            .billing()
            .orders()
            .tasks(id),
        value,
        query,
        token,
        settings,
    });
}
