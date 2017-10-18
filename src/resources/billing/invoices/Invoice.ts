import {
    CollectionDoc,
    Resource,
    SingleDoc,
    StandardEvents,
    ResourceId,
    ResourceState,
    Time,
    ProjectRequiredSettings,
} from "../../../common/Structs";
import * as API from "../../../common/Api";
import { Token } from "../../../auth";
import { QueryParams } from "../../../common/QueryParams";
import { links } from "../../../common/Links";
import { Payment } from "./Payment";
import { Credit } from "./Credit";
import { LateFee } from "./LateFee";
import { Summary as ServiceSummary } from "../services";

export type Collection = CollectionDoc<Invoice>;
export type Single = SingleDoc<Invoice>;

export interface Invoice extends Resource {
    project_id: ResourceId;
    approved: boolean;
    services: ServiceSummary[];
    payments: Payment[];
    credits: Credit[];
    late_fees: LateFee[];
    charges: number;
    events: StandardEvents & {
        billed?: Time;
        paid?: Time;
        payment_attempt?: Time;
        credited?: Time;
        voided?: Time;
    };
    state: ResourceState<InvoiceState>;
}

export type InvoiceState =
    | "new"
    | "billing"
    | "billed"
    | "processing"
    | "partially-paid"
    | "paid"
    | "refunding"
    | "refunded"
    | "crediting"
    | "credited"
    | "voiding"
    | "voided";

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
            .invoices()
            .collection(),
        query,
        token,
        settings,
    });
}
