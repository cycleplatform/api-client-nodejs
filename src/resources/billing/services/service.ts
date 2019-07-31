import {
  ResourceId,
  Events,
  State,
  OwnerScope,
  Mills,
  Resource,
  CollectionDoc,
  SingleDoc,
} from "common/structs";
import { links, StandardParams, getRequest } from "common/api";
import { Term } from "../term";
import { Item } from "./item";
import { Amount } from "../amount";
import { AssociatedDiscount } from "../discounts";
import { PlanType } from "../plans";

export type Collection = CollectionDoc<Service>;
export type Single = SingleDoc<Service>;

export type ServiceEvent = "last_billed";
export type ServiceState = "active";

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
  state: State<ServiceState>;
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

export async function getSingle(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return getRequest<Single>({
    ...params,
    target: links
      .billing()
      .services()
      .single(params.id),
  });
}

export async function getCollection(params: StandardParams) {
  return getRequest<Collection>({
    ...params,
    target: links
      .billing()
      .services()
      .collection(),
  });
}
