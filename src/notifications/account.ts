import { Token } from "../auth";
import * as Request from "../common/api/request";
import { links, Settings } from "../common/api";
import { connectToSocket } from "../common/api/websocket";
import { Notification } from "./notification";

/**
 * Possible event types that can be received
 * on the account notification channel
 */
export type AccountTopic =
  // account
  | "account.state.changed"
  | "account.error"

  // hub
  | "hub.created"
  | "hub.state.changed"
  | "hub.error"

  // hub memberships
  | "hub.memberships.new"
  | "hub.memberships.updated"
  | "hub.invite.new"

  // announcements
  | "announcement.created"
  | "announcement.updated"
  | "announcement.state.changed";

export type AccountNotification = Notification<AccountTopic>;

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

  const secretResp = await Request.getRequest<AccountChannelSecretResponse>({
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
