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
} from "../../common/Structs";
import * as API from "../../common/Api";
import { Term, TermLength } from "./Term";
import { Payment } from "./Payment";
import { Credit } from "./Credit";
import { LineItem } from "./LineItem";
import { Token } from "../../auth";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";

export type Collection = CollectionDoc<Order>;
export type Single = SingleDoc<Order>;

export interface Order extends Resource {
    owner: UserScope;
    term: Term;
    auto_renew: boolean;
    approved: boolean;
    items: LineItem[];
    charges: number;
    payments: Payment[];
    credits: Credit[];
    events: StandardEvents & {
        paid: Time;
        payment_attempt: Time;
        credited: Time;
        voided: Time;
        applied_late_fee: Time;
    };
}

export interface OrderBuilder {
    servers?: ServerOrder[];
    support_plan_id?: ResourceId;
    bandwidth_plan_id?: ResourceId;
    ips_plan_id?: ResourceId;
    auto_renew?: boolean;
    term_length?: TermLength;
}

export interface ServerOrder {
    id: ResourceId;
    count: number;
    datacenter_id: ResourceId;
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
        target: links.billing().orders().single(id),
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
    value: OrderBuilder;
    token: Token;
    query?: QueryParams;
    settings: ProjectRequiredSettings;
}) {
    return API.postRequest<Single>({
        target: links.billing().orders().collection(),
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
    value: Partial<OrderBuilder>;
    token: Token;
    query?: QueryParams;
    settings: ProjectRequiredSettings;
}) {
    return API.patchRequest<Single>({
        target: links.billing().orders().single(id),
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
        target: links.billing().orders().tasks(id),
        value,
        query,
        token,
        settings,
    });
}