import { BaseParams, PostParams, postRequest } from "../common/api";
import { DEFAULT_AUTH_URL } from "./common";

/**
 * An OAuth 2.0 token
 */
export interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
  created?: number;
  refresh_token: string;
  scope: string;
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
  return postRequest<Token>({
    ...params,
    target: "/auth/browser",
    settings: {
      ...params.settings,
      url: DEFAULT_AUTH_URL,
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
  return postRequest<Token>({
    ...params,
    target: "/auth/grant",
    settings: {
      ...params.settings,
      url: DEFAULT_AUTH_URL,
    },
  });
}
