import {
  ResourceId,
  Events,
  State,
  OwnerScope,
  Mills,
  Resource,
  CollectionDoc,
  SingleDoc,
} from "../../../common/structs";
import { Token } from "../../../auth";
import { QueryParams, links, Settings } from "../../../common/api";
import * as Request from "../../../common/api/request";

import { Term } from "../term";
import { Item } from "./item";
import { Amount } from "../amount";
import { AssociatedDiscount } from "../discounts";
import { PlanType } from "../../billing/plans";

export type Collection = CollectionDoc<Service>;
export type Single = SingleDoc<Service>;

export type ServiceEvent = "last_billed";

export interface Service extends Resource {
  owner: OwnerScope;
  hub_id: ResourceId;
  title: string;
  order: Order;
  item: Item;
  events: Events<ServiceEvent>;
  discount: AssociatedDiscount | null;
  price: Amount;
  term: Term;
  state: State;
}

export interface Order {
  id: ResourceId;
  item_id: ResourceId;
}

export interface Summary {
  service_id: ResourceId;
  title: string;
  type: PlanType;
  term: Term;
  price: Mills;
  discount: Mills;
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
  settings: Settings;
}) {
  return Request.getRequest<Single>({
    query,
    token,
    settings,
    target: links
      .billing()
      .services()
      .single(id),
  });
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
      .services()
      .collection(),
  });
}
