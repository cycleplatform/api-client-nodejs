import {
  CollectionDoc,
  Resource,
  SingleDoc,
  Events,
  ResourceId,
  OwnerScope,
  Mills,
  State,
} from "../../../common/structs";
import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import {
  QueryParams,
  links,
  ProjectRequiredSettings,
  Settings,
} from "../../../common/api";
import { Item as ServiceItem } from "../services/item";
import { Amount } from "../amount";
import { AssociatedDiscount } from "../discounts";
import { Term, TermLength } from "../term";
import { PromoCode } from "../promocodes";

export type Collection = CollectionDoc<Order, {}, OrderIncludes>;
export type Single = SingleDoc<Order, {}, OrderIncludes>;
export type OrderState =
  | "new"
  | "processed"
  | "expired"
  | "deleting"
  | "deleted";
export type OrderEvent =
  | "paid"
  | "expires"
  | "payment_attempt"
  | "credited"
  | "voided"
  | "applied_late_fee";

export interface Order extends Resource<OrderMeta> {
  project_id: ResourceId;
  owner: OwnerScope;
  promo_code_id: string | null;
  term: Term;
  approved: boolean;
  items: Item[];
  total_price: Mills;
  events: Events<OrderEvent>;
  state: State<OrderState>;
}

export interface OrderIncludes {
  promo_codes: {
    [key: string]: PromoCode;
  };
}

export interface CreateParams {
  tier_plan_id?: ResourceId;
  support_plan_id?: ResourceId;
  term_length?: TermLength;
  promo_code?: string;
}

export interface OrderMeta {
  due?: {
    term: Term;
    amount: Mills;
  };
}

export interface Item {
  id: ResourceId;
  service: ServiceItem;
  description: string;
  price: Amount;
  discount?: AssociatedDiscount;
  net_price: Mills;
}

export async function getCollection({
  token,
  query,
  settings,
}: {
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    query,
    token,
    settings,
    target: links
      .billing()
      .orders()
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
      .orders()
      .single(id),
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
    value,
    query,
    token,
    settings,
    target: links
      .billing()
      .orders()
      .collection(),
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
    value,
    query,
    token,
    settings,
    target: links
      .billing()
      .orders()
      .single(id),
  });
}
