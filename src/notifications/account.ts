import { Token } from "auth";
import { links, Settings, getRequest, connectToSocket } from "common/api";
import { Notification } from "./event";

/**
 * Possible event types that can be received
 * on the account notification channel
 */
export enum AccountHeader {
  /** The current state of the account has changed */
  ACCOUNT_STATE_CHANGED = "account.state_changed",
  /** An error occured related to the account */
  ACCOUNT_ERROR = "account.error",
  /** A new hub was created */
  HUB_CREATED = "hub.created",
  /** An error occurred on a hub */
  HUB_ERROR = "hub.error",
  /** A hub was deleted */
  HUB_DELETED = "hub.deleted",
  /** User joined a new hub */
  HUB_MEMBERSHIPS_NEW = "hub.memberships.new",
  /** A hub membership was updated (accepted invite, etc) */
  HUB_MEMBERSHIPS_UPDATED = "hub.memberships.updated",
}

export type AccountNotification = Notification<AccountHeader>;

/**
 * Parameters required to initiate an account channel connection
 */
export interface AccountChannelParams {
  token: Token;
  settings: Settings;
  onMessage?: (v: AccountNotification) => void;
}

/**
 * Response from request to initiate account channel.
 * Use the token as a parameter to upgrade connection
 */
export interface AccountChannelSecretResponse {
  data: {
    token: string;
  };
}

/**
 * Opens connection to account channel. First, requests an access token using
 * the authorization token from OAuth. Then, takes that response and appends it to the URL,
 * which will return a websocket we can listen on.
 * @param params Credentials to connect to pipeline
 */
export async function connectToAccountChannel(params: AccountChannelParams) {
  const target = links.channels().account();

  const secretResp = await getRequest<AccountChannelSecretResponse>({
    target,
    token: params.token,
    settings: params.settings,
  });

  if (!secretResp.ok) {
    return secretResp;
  }

  return connectToSocket<AccountNotification>({
    target,
    token: secretResp.value.data.token,
    settings: params.settings,
    onMessage: params.onMessage,
  });
}
