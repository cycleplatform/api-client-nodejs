import { Token } from "../auth";
import * as Request from "../common/api/request";
import { links, ProjectRequiredSettings } from "../common/api";
import { connectToSocket } from "../common/api/websocket";
import { PipelineEvent } from "./event";

/**
 * Possible event types that can be received
 * on the account pipeline
 */
export enum EventHeader {
  /** The current state of the account has changed */
  ACCOUNT_STATE_CHANGED = "account.state_changed",
  /** An error occured related to the account */
  ACCOUNT_ERROR = "account.error",
  /** A new project was created */
  PROJECT_CREATED = "project.created",
  /** An error occurred on a project */
  PROJECT_ERROR = "project.error",
  /** A new member was added to a project in your scope */
  PROJECT_MEMBERSHIP_NEW = "project.membership.new",
  /** A new notification was generated for the account */
  NOTIFICATION_NEW = "notification.new",
  /** A notification state was changed */
  NOTIFICATION_STATE_CHANGED = "notification.state_changed",
}

/**
 * Parameters required to initiate an account pipeline connection
 */
export interface AccountPipelineParams {
  token: Token;
  settings: ProjectRequiredSettings;
  onMessage?: (v: AccountPipelineEvent) => void;
}

export type AccountPipelineEvent = PipelineEvent<EventHeader>;

/**
 * Response from request to initiate account pipeline.
 * Use the token as a parameter to upgrade connection
 */
export interface AccountSecretResponse {
  data: {
    token: string;
  };
}

/**
 * Opens connection to account pipeline. First, requests an access token using
 * the authorization token from OAuth. Then, takes that response and appends it to the URL,
 * which will return a websocket we can listen on.
 * @param params Credentials to connect to pipeline
 */
export async function connectToAccountPipeline(params: AccountPipelineParams) {
  const target = links.account().pipeline();

  const secretResp = await Request.getRequest<AccountSecretResponse>({
    target,
    token: params.token,
    settings: params.settings,
  });

  if (!secretResp.ok) {
    return secretResp;
  }

  return connectToSocket<AccountPipelineEvent>({
    target,
    token: secretResp.value.data.token,
    settings: params.settings,
    onMessage: params.onMessage,
  });
}
