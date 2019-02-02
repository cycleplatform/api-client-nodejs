import * as Request from "../../common/api/request";
import { QueryParams, links, StandardParams } from "../../common/api";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  Events,
  State,
} from "../../common/structs";
import { Membership } from "./membership";
import { DeepPartial } from "../../common/types/common";

export type Collection = CollectionDoc<Hub>;
export type Single = SingleDoc<Hub>;

export type HubQuery = QueryParams<"", keyof HubMetas>;

export type HubState =
  | "new"
  | "configuring" // placing an order
  | "live" // at least 1 server online
  | "inactive"
  | "deleting"
  | "deleted";

export interface Hub extends Resource<HubMetas> {
  name: string;
  events: Events;
  state: State<HubState>;
  integrations: Integrations;
  providers: Providers;
  billing?: {
    disabled: boolean;
  };
}

export interface Integrations {
  letsencrypt: LetsEncryptIntegration | null;
}

export interface LetsEncryptIntegration {
  email: string;
}

export interface Providers {
  packet: PacketProvider | null;
}

export interface PacketProvider {
  api_key: string;
  hub_id: string | null;
  bgp_md5: string | null;
}

export interface HubMetas {
  membership?: Membership;
}

export interface CreateParams {
  name: string;
  integrations?: Hub["integrations"];
  providers?: DeepPartial<Hub["providers"]>;
}

export type UpdateParams = Partial<CreateParams>;

export async function getCollection(params: StandardParams<HubQuery>) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.hubs().collection(),
  });
}

export async function getSingle(params: StandardParams<HubQuery>) {
  return Request.getRequest<Single>({
    ...params,
    target: links.hubs().single(),
  });
}

export async function create(
  params: StandardParams<HubQuery> & {
    value: CreateParams;
  },
) {
  return Request.postRequest<Single>({
    ...params,
    target: links.hubs().collection(),
  });
}

export async function update(
  params: StandardParams<HubQuery> & {
    value: UpdateParams;
  },
) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.hubs().single(),
  });
}

export async function remove(params: StandardParams<HubQuery>) {
  return Request.deleteRequest<Single>({
    ...params,
    target: links.hubs().single(),
  });
}
