import {
  CollectionDoc,
  Resource,
  SingleDoc,
  Events,
  State as StateBase,
  UserScope,
  ResourceId,
} from "../../../common/structs";
import * as Request from "../../../common/api/request";
import { links, QueryParams, StandardParams } from "../../../common/api";

/****************************** Billing Method Struct ******************************/

/** ### `interface Method`
 * Single billing method resource.
 *
 * This resource is portal specific at the current point in time. All methods
 * to get, post, and patch will only work for cycle portal.
 *
 * ### Cycle Info
 * __Something doesn't look right or work as intended?__
 * Help us make a better TypeScript Platform Interface by submitting an issue on
 * [Cycles Github](https://github.com/cycleplatform/api-client-nodejs) or
 * forking our repo and submitting a
 * [Pull Request](https://github.com/cycleplatform/api-client-nodejs/pulls).
 *
 * [General Docs](https://docs.cycle.io) /
 * [Public API Docs](https://docs.cycle.io/api/introduction) /
 * [Internal API Docs](https://docs.cycle.io/internal-api/introduction) /
 * [Cycle's Website](https://cycle.io)
 *
 * ---
 *
 * Last Updated: 2021.12.15 — Grady S
 */
export interface Method extends Resource {
  name: string;
  primary: boolean;
  address: Address;
  creator: UserScope;
  credit_card: CreditCard;
  state: State;
  events: Events;
}

/****************************** Billing Method Struct Sub Types ******************************/

/** ### `type States`
 * Billing method state
 * Possible states can be the following:
 * - `live`
 * - `deleting`
 * - `deleted`
 *
 * ---
 *
 * ### Cycle Info
 * __Something doesn't look right or work as intended?__
 * Help us make a better TypeScript Platform Interface by submitting an issue on
 * [Cycles Github](https://github.com/cycleplatform/api-client-nodejs) or
 * forking our repo and submitting a
 * [Pull Request](https://github.com/cycleplatform/api-client-nodejs/pulls).
 *
 * [General Docs](https://docs.cycle.io) /
 * [Public API Docs](https://docs.cycle.io/api/introduction) /
 * [Internal API Docs](https://docs.cycle.io/internal-api/introduction) /
 * [Cycle's Website](https://cycle.io)
 *
 * ---
 *
 * Last Updated: 2021.12.15 — Grady S
 */
export type States = "live" | "deleting" | "deleted";
export type State = StateBase<States>;

/** ### `interface Address`
 * Billing method address struct
 * ---
 *
 * ### Cycle Info
 * __Something doesn't look right or work as intended?__
 * Help us make a better TypeScript Platform Interface by submitting an issue on
 * [Cycles Github](https://github.com/cycleplatform/api-client-nodejs) or
 * forking our repo and submitting a
 * [Pull Request](https://github.com/cycleplatform/api-client-nodejs/pulls).
 *
 * [General Docs](https://docs.cycle.io) /
 * [Public API Docs](https://docs.cycle.io/api/introduction) /
 * [Internal API Docs](https://docs.cycle.io/internal-api/introduction) /
 * [Cycle's Website](https://cycle.io)
 *
 * ---
 *
 * Last Updated: 2021.12.15 — Grady S
 */
export interface Address {
  country: string;
  zip: string;
}

/** ### `interface CreditCard`
 * Billing method credit card struct
 * ---
 *
 * ### Cycle Info
 * __Something doesn't look right or work as intended?__
 * Help us make a better TypeScript Platform Interface by submitting an issue on
 * [Cycles Github](https://github.com/cycleplatform/api-client-nodejs) or
 * forking our repo and submitting a
 * [Pull Request](https://github.com/cycleplatform/api-client-nodejs/pulls).
 *
 * [General Docs](https://docs.cycle.io) /
 * [Public API Docs](https://docs.cycle.io/api/introduction) /
 * [Internal API Docs](https://docs.cycle.io/internal-api/introduction) /
 * [Cycle's Website](https://cycle.io)
 *
 * ---
 *
 * Last Updated: 2021.12.15 — Grady S
 */
export interface CreditCard {
  name: string;
  brand: string;
  expiration: Expiration;
  last_4: string;
}

/** ### `interface Expiration`
 * Billing method credit card expiration struct
 * ---
 *
 * ### Cycle Info
 * __Something doesn't look right or work as intended?__
 * Help us make a better TypeScript Platform Interface by submitting an issue on
 * [Cycles Github](https://github.com/cycleplatform/api-client-nodejs) or
 * forking our repo and submitting a
 * [Pull Request](https://github.com/cycleplatform/api-client-nodejs/pulls).
 *
 * [General Docs](https://docs.cycle.io) /
 * [Public API Docs](https://docs.cycle.io/api/introduction) /
 * [Internal API Docs](https://docs.cycle.io/internal-api/introduction) /
 * [Cycle's Website](https://cycle.io)
 *
 * ---
 *
 * Last Updated: 2021.12.15 — Grady S
 */
export interface Expiration {
  month: number;
  year: number;
}

/****************************** Metas, Includes, Query, Docs ******************************/

export type Query = QueryParams;
export type Single = SingleDoc<Method>;
export type Collection = CollectionDoc<Method>;

export type GetCollectionParams = BCP;
export type GetSingleParams = BSP;
export type CreateParams = BCP & Request.PostParams<CreateValues>;
export type UpdateParams = BSP & Request.PatchParams<UpdateValues>;

/****************************** Params ******************************/

type BSP = StandardParams<Query> & {
  id: ResourceId;
};

type BCP = StandardParams<Query>;

/****************************** Values ******************************/

export interface CreateValues {
  name: string;
  primary: boolean;
  address: Address;
  credit_card: CreateValuesCreditCard;
}

export interface CreateValuesCreditCard {
  name: string;
  number: string;
  cvv: string;
  expiration: Expiration;
}

export type UpdateValues = Partial<Omit<CreateValues, "credit_card">>;

/****************************** Functions ******************************/

export async function getCollection(params: GetCollectionParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.billing().methods().collection(),
  });
}

export async function getSingle(params: GetSingleParams) {
  return Request.getRequest<Single>({
    ...params,
    target: links.billing().methods().single(params.id),
  });
}

export async function create(params: CreateParams) {
  return Request.postRequest<Single>({
    ...params,
    target: links.billing().methods().collection(),
  });
}

export async function update(params: UpdateParams) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.billing().methods().single(params.id),
  });
}
