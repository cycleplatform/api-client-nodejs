import {
  ResourceId,
  CreatorScope,
  Events,
  State,
  CollectionDoc,
  SingleDoc,
  Time,
} from "../../../common/structs";
import * as Request from "../../../common/api/request";
import { links, StandardParams } from "../../../common/api";

export type Collection = CollectionDoc<Credit>;
export type Single = SingleDoc<Credit>;
export type CreditState = "new" | "live" | "expired";
export type CreditEvent = "expires";

export interface Credit {
  id: ResourceId;
  hub_id: ResourceId;
  description: string;
  creator: CreatorScope;
  amount: number;
  amount_remaining: number;
  expires: Expires | null;
  events: Events<CreditEvent>;
  state: State<CreditState>;
}

export interface AssociatedCredit {
  id: ResourceId;
  amount: number;
}

export interface Expires {
  date: Time;
}

export async function getCollection(params: StandardParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.billing().credits().collection(),
  });
}

export async function getSingle(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return Request.getRequest<Single>({
    ...params,
    target: links.billing().credits().single(params.id),
  });
}
