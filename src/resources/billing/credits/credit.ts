import {
  ResourceId,
  OwnerScope,
  Events,
  State,
  CollectionDoc,
  SingleDoc,
  Time,
} from "../../../common/structs";
import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { QueryParams, links, Settings } from "../../../common/api";

export type Collection = CollectionDoc<Credit>;
export type Single = SingleDoc<Credit>;
export type CreditState = "new" | "live" | "expired";
export type CreditEvent = "expires";

export interface Credit {
  id: ResourceId;
  hub_id: ResourceId;
  description: string;
  owner: OwnerScope;
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

export async function getCollection({
  token,
  query,
  settings,
}: {
  token: Token;
  query?: QueryParams;
  settings: Settings;
}) {
  return Request.getRequest<Collection>({
    query,
    token,
    settings,
    target: links
      .billing()
      .credits()
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
  settings: Settings;
}) {
  return Request.getRequest<Single>({
    query,
    token,
    settings,
    target: links
      .billing()
      .credits()
      .single(id),
  });
}
