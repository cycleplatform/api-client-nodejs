import {
    CollectionDoc,
    Resource,
    ProjectRequiredSettings,
    SingleDoc,
    Scope,
    Time,
    StandardEvents,
    ResourceId,
} from "../../common/Structs";
import * as API from "../../common/Api";
import { Term, TermLength } from "./Term";
import { Payment } from "./Payment";
import { Credit } from "./Credit";
import { LineItem } from "./LineItems";
import { Token } from "../../auth";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";

export type Collection = CollectionDoc<Order>;
export type Single = SingleDoc<Order>;

export interface Order extends Resource {
    owner: Scope;
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
    servers: { id: ResourceId; count: number };
    public_ips: number;
    support_plan: ResourceId;
    auto_renew: boolean;
    term_length: TermLength;
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
    return API.getRequest<Single>(
        links.billing(settings).orders().single(id),
        query,
        token,
    );
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
    return API.postRequest<Single>(
        links.billing(settings).orders().collection(),
        value,
        query,
        token,
    );
}
