import * as Request from "../../common/api/request";
import { QueryParams, links, StandardParams } from "../../common/api";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  Events,
  State,
  CreatedTask,
  ResourceId,
  UserScope,
  Webhook,
} from "../../common/structs";
import { Membership } from "./membership";
import { Providers } from "./providers";
import { Term, Plans } from "../billing";
import { Single as SingleTier } from "../billing/plans/tiers";

export type Collection = CollectionDoc<Hub>;
export type Single = SingleDoc<Hub>;

export type HubQuery = QueryParams<"", keyof HubMetas>;
export type HubEvents =
  | "first_provider"
  | "first_server"
  | "first_environment"
  | "first_image"
  | "first_container";

/** ### `type HubState`
 * Possible states for a hub:
 * - `new`: Hub order succeeded, but no servers have been brought online to the hub yet
 * - `configuring`: Order is being place and hub created on platform
 * - `live`: At least one server is currently online
 * - `inactive`: @todo
 * - `deleting`: Hub is currently in the process of being deleted
 * - `deleted`: Hub has been deleted and is no longer active
 */
export type HubState =
  | "new"
  | "configuring"
  | "live"
  | "inactive"
  | "deleting"
  | "deleted";

export interface Hub extends Resource<HubMetas> {
  name: string;
  creator: UserScope;
  events: Events<HubEvents>;
  state: State<HubState>;
  integrations: Integrations;
  providers: Providers;
  webhooks: HubWebhooks;
  billing: BillingProfile | null;
}

export interface Integrations {
  letsencrypt: LetsEncryptIntegration | null;
}

export interface LetsEncryptIntegration {
  email: string;
}

export interface BillingProfile {
  term: Term;
  allow_prepaid?: boolean;
  disable?: boolean;
  plans: Plans;
}

export interface Plans {
  tier_id: ResourceId;
  support_id: ResourceId;
}

export interface HubWebhooks {
  server_deployed: Webhook | null;
};

export interface HubMetas {
  membership?: Membership;
}

export interface CreateParams {
  name: string;
  integrations?: Integrations;
  providers: Partial<Providers>;
  webhooks?: HubWebhooks
}

export type UpdateParams = Partial<CreateParams>;

type BaseCollectionParams = StandardParams<HubQuery>;
type BaseSingleDocParams = StandardParams<HubQuery>;

type GetCollectionParams = BaseCollectionParams;
export async function getCollection(params: GetCollectionParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.hubs().collection(),
  });
}

type GetSingleDocParams = BaseSingleDocParams;
export async function getSingle(params: GetSingleDocParams) {
  return Request.getRequest<Single>({
    ...params,
    target: links.hubs().single(),
  });
}

type GetCurrentHubTierParams = StandardParams;
export async function getCurrentTier(params: GetCurrentHubTierParams) {
  return Request.getRequest<SingleTier>({
    ...params,
    target: links.hubs().tier(),
  });
}

type CreateHubParams = BaseSingleDocParams & { value: CreateParams };
export async function create(params: CreateHubParams) {
  return Request.postRequest<Single>({
    ...params,
    target: links.hubs().collection(),
  });
}

type UpdateHubParams = BaseSingleDocParams & { value: UpdateParams };
export async function update(params: UpdateHubParams) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.hubs().single(),
  });
}

type RemoveHubParams = BaseSingleDocParams;
export async function remove(params: RemoveHubParams) {
  return Request.deleteRequest<CreatedTask<"delete">>({
    ...params,
    target: links.hubs().single(),
  });
}
