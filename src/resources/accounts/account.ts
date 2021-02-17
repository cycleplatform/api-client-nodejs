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
/**
 * Information about the last login for the account.
 */
export type AccountEvent = "last_login";
/**
 * The different states an account can be in.
 */
export type AccountState =
  | "new"
  | "live"
  | "suspending"
  | "purging"
  | "deleting"
  | "deleted";

export interface Account extends Resource {
  name: Name;
  email: Email;
  two_factor_auth: TwoFactorAuth | null;
  allow_support_login: boolean;
  events: Events<AccountEvent>;
  state: State<AccountState>;
}

/**
 * Publicly available information about the account
 */
// todo - do we use this?
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
/**
 * The first and last name of the account owner
 */
export interface Name {
  /**
   * The first name of the account owner
   */
  first: string;
  /**
   * The last name of the account owner
   */
  last: string;
}
/**
 * Email information for the account
 */
export interface Email {
  /** The email address */
  address: string;
  /** A boolean representing if the email has been verified */
  verified: boolean;
  /** A Time resource showing when the email was added */
  added: Time;
}
/**
 * Two factor auth verification information
 */
export interface TwoFactorAuth {
  /**
   * A boolean representing if the account has verified with TwoFA
   */
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
