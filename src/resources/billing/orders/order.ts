import {
    CollectionDoc,
    Resource,
    SingleDoc,
    Time,
    StandardEvents,
    ResourceId,
    Task,
    UserScope,
    CreatedTask,
    Mills,
    State,
} from "../../../common/structs";
import { Term, TermLength } from "../Term";
import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import {
    QueryParams,
    links,
    ProjectRequiredSettings,
    Settings,
} from "../../../common/api";
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
    state: State<BillingState>;
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
    return Request.postRequest<CreatedTask<OrderAction>>({
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
