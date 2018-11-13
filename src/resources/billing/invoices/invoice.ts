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
import { Token } from "../../../auth";
import {
  QueryParams,
  links,
  ProjectRequiredSettings,
} from "../../../common/api";
import { Payment } from "./payment";
import { Credit } from "./credit";
import { LateFee } from "./latefee";
import { Summary as ServiceSummary } from "../services";

export type Collection = CollectionDoc<Invoice>;
export type Single = SingleDoc<Invoice>;
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
export type InvoiceEvent =
  | "billed"
  | "paid"
  | "payment_attempt"
  | "credited"
  | "voided";

export interface Invoice extends Resource {
  project_id: ResourceId;
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

export async function getCollection({
  token,
  query,
  settings,
}: {
  token: Token;
  query?: QueryParams;
  settings: ProjectRequiredSettings;
}) {
  return Request.getRequest<Collection>({
    query,
    token,
    settings,
    target: links
      .billing()
      .invoices()
      .collection(),
  });
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
    query,
    token,
    settings,
    target: links
      .billing()
      .invoices()
      .single(id),
  });
}
