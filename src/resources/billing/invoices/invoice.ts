import {
  CollectionDoc,
  Resource,
  SingleDoc,
  Events,
  ResourceId,
  State,
  Time,
} from "../../../common/structs";
import * as Request from "../../../common/api/request";
import { links, StandardParams, QueryParams } from "../../../common/api";
import { Payment } from "./payment";
import { Credit } from "./credit";
import { LateFee } from "./latefee";
import { Summary as ServiceSummary } from "../services";

export type Collection = CollectionDoc<Invoice>;
export type Single = SingleDoc<Invoice>;
export type InvoiceQuery = QueryParams<"", keyof InvoiceMeta>;
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
  | "voided"
  | "uncollectible";
export type InvoiceEvent =
  | "billed"
  | "paid"
  | "payment_attempt"
  | "credited"
  | "voided";

export interface Invoice extends Resource<InvoiceMeta> {
  hub_id: ResourceId;
  approved: boolean;
  services: ServiceSummary[];
  payments: Payment[];
  credits: Credit[];
  late_fees: LateFee[];
  charges: number;
  due?: Time;
  overdue?: Time;
  events: Events<InvoiceEvent>;
  state: State<InvoiceState>;
}

export interface InvoiceMeta {
  due?: number;
}

export async function getCollection(params: StandardParams<InvoiceQuery>) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.billing().invoices().collection(),
  });
}

export async function getSingle(
  params: StandardParams<InvoiceQuery> & {
    id: ResourceId;
  },
) {
  return Request.getRequest<Single>({
    ...params,
    target: links.billing().invoices().single(params.id),
  });
}
