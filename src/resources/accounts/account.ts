import * as Request from "../../common/api/request";
import { links, StandardParams } from "../../common/api";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  Time,
  Events,
  State,
} from "../../common/structs";

export type Collection = CollectionDoc<Account>;
export type Single = SingleDoc<Account>;
export type AccountEvent = "last_login";
export type AccountState =
  | "new"
  | "live"
  | "suspending"
  | "purging"
  | "deleting"
  | "deleted";

export interface Account extends Resource {
  /** The first and last name of the account owner */
  name: Name;
  /** Email registered to this account */
  email: Email;
  /** Number of trial hubs this account has made */
  trials: number;
  /** 2FA information */
  two_factor_auth: TwoFactorAuth | null;
  /** Whether to allow Cycle employees to log in to diagnose support issues */
  allow_support_login: boolean;
  events: Events<AccountEvent>;
  state: State<AccountState>;
}

export interface PublicAccount extends Resource {
  name: {
    first: string;
    last: string;
  };
  email: {
    address: string;
    added: Time;
    verified: boolean;
  };
}

export interface Name {
  first: string;
  last: string;
}

export interface Email {
  address: string;
  verified: boolean;
  added: Time;
}

export interface TwoFactorAuth {
  verified: boolean;
}

export async function getSingle(params: StandardParams) {
  return Request.getRequest<Single>({
    ...params,
    target: links.account().single(),
  });
}

export interface UpdateParams {
  name?: {
    first?: string;
    last?: string;
  };
  allow_support_login?: boolean;
}

export async function update(
  params: StandardParams & {
    value: UpdateParams;
  },
) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.account().single(),
  });
}

export async function remove(params: StandardParams) {
  return Request.deleteRequest({
    ...params,
    target: links.account().single(),
  });
}
