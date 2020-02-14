import { BaseParams, PostParams, postRequest } from "../common/api";
import { DEFAULT_AUTH_URL } from "./common";
import { Time } from "../common/structs";

/**
 * An OAuth 2.0 token
 */
export interface Token {
  access_token: string;
  expires: Time;
}

interface BrowserAccessTokenParams {
  application_id: string;
}

/**
 * Retrieves an access code using the http-only cookie for a direct browser authentication
 */
export async function getBrowserAccessToken(
  params: BaseParams & PostParams<BrowserAccessTokenParams>,
) {
  return postRequest<{ data: Token }>({
    ...params,
    target: "/auth/token/browser",
    settings: {
      ...params.settings,
      credentials: "include",
      url:
        params.settings && params.settings.url
          ? params.settings.url
          : DEFAULT_AUTH_URL,
    },
  });
}

interface GrantAccessTokenParams {
  application_id: string;
  application_auth: string;
  grant_code: string;
}

/**
 * Retrieves an access code using the server-side flow
 */
export async function getGrantAccessToken(
  params: BaseParams & PostParams<GrantAccessTokenParams>,
) {
  return postRequest<{ data: Token }>({
    ...params,
    target: "/auth/token/grant",
    settings: {
      ...params.settings,
      credentials: "include",
      url:
        params.settings && params.settings.url
          ? params.settings.url
          : DEFAULT_AUTH_URL,
    },
  });
}

export async function revokeAuth(params: BaseParams) {
  return postRequest({
    ...params,
    target: "/auth/revoke",
    value: {},
    settings: {
      ...params.settings,
      credentials: "include",
      url:
        params.settings && params.settings.url
          ? params.settings.url
          : DEFAULT_AUTH_URL,
    },
  });
}
