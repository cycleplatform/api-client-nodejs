import {
  CollectionDoc,
  Resource,
  SingleDoc,
  Events,
  ResourceId,
  OwnerScope,
  Mills,
  State,
} from "common/structs";
import { getRequest, patchRequest, postRequest } from "common/api/request";
import { links, StandardParams, QueryParams } from "common/api";
import { Item as ServiceItem } from "../services/item";
import { Amount } from "../amount";
import { AssociatedDiscount } from "../discounts";
import { Term, TermLength } from "../term";
import { PromoCode } from "../promocodes";

export type Collection = CollectionDoc<Order, OrderIncludes>;
export type Single = SingleDoc<Order, OrderIncludes>;
export type OrderState = "new" | "processed" | "deleting" | "deleted";
export type OrderEvent = "expires";
export type OrderQuery = QueryParams<keyof OrderIncludes, keyof OrderMeta>;

export interface Order extends Resource<OrderMeta> {
  hub_id: ResourceId;
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

export async function getCollection(params: StandardParams<OrderQuery>) {
  return getRequest<Collection>({
    ...params,
    target: links
      .billing()
      .orders()
      .collection(),
  });
}

export async function getSingle(
  params: StandardParams<OrderQuery> & {
    id: ResourceId;
  },
) {
  return getRequest<Single>({
    ...params,
    target: links
      .billing()
      .orders()
      .single(params.id),
  });
}

export async function create(
  params: StandardParams<OrderQuery> & {
    value: CreateParams;
  },
) {
  return postRequest<Single>({
    ...params,
    target: links
      .billing()
      .orders()
      .collection(),
  });
}

export async function update(
  params: StandardParams<OrderQuery> & {
    id: ResourceId;
    value: CreateParams;
  },
) {
  return patchRequest<Single>({
    ...params,
    target: links
      .billing()
      .orders()
      .single(params.id),
  });
}
