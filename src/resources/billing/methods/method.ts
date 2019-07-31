import {
  CollectionDoc,
  Resource,
  SingleDoc,
  Events,
  State,
  OwnerScope,
  ResourceId,
} from "common/structs";
import { getRequest, postRequest, patchRequest } from "common/api/request";
import { links, StandardParams } from "common/api";

export type Collection = CollectionDoc<Method>;
export type Single = SingleDoc<Method>;
export type MethodState = "live" | "deleting" | "deleted";

export interface Method extends Resource {
  name: string;
  primary: boolean;
  address: Address;
  owner: OwnerScope;
  credit_card: CreditCard;
  state: State<MethodState>;
  events: Events;
}

export interface Address {
  country: string;
  zip: string;
}

export interface CreditCard {
  name: string;
  brand: string;
  expiration: {
    month: number;
    year: number;
  };
  last_4: string;
}

export async function getCollection(params: StandardParams) {
  return getRequest<Collection>({
    ...params,
    target: links
      .billing()
      .methods()
      .collection(),
  });
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
      .methods()
      .single(params.id),
  });
}

export interface CreateParams {
  name: string;
  primary: boolean;
  address: Address;
  credit_card: {
    name: string;
    number: string;
    cvv2: string;
    expiration: {
      month: number;
      year: number;
    };
  };
}

export async function create(
  params: StandardParams & {
    value: CreateParams;
  },
) {
  return postRequest<Single>({
    ...params,
    target: links
      .billing()
      .methods()
      .collection(),
  });
}

export interface UpdateParams {
  name?: string;
  primary?: boolean;
  address?: Address;
}

export async function update(
  params: StandardParams & {
    id: ResourceId;
    value: UpdateParams;
  },
) {
  return patchRequest<Single>({
    ...params,
    target: links
      .billing()
      .methods()
      .single(params.id),
  });
}
