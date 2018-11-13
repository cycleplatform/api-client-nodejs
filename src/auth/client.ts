import {
  ApiResult,
  makeUrl,
  OAuthError,
  Settings,
  ErrorCode,
} from "../common/api";
import { Token } from "./token";

/**
 * Credentials required for client authorization
 */
export interface ClientCredsAuth {
  client_id: string;
  client_secret: string;
  scope?: string;
}

/**
 * Make a request to the Cycle OAuth server using client credentials grant
 * @param auth The ClientCredsAuth object containing authorization credentials
 * @param settings Optional Settings object to control the request
 */
export async function clientCredentialsGrant(
  auth: ClientCredsAuth,
  settings?: Settings,
): Promise<ApiResult<Token>> {
  const url = `${makeUrl(settings || { noVersion: true })}/oauth/token`;

  const queryParams = Object.keys(auth)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(auth[k]))
    .join("&");

  try {
    const resp = await fetch(url, {
      method: "POST",
      body: `grant_type=client_credentials&${queryParams}`,
      headers: new Headers({
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        Accept: "application/json",
      }),
    });
    if (!resp.ok) {
      const err: OAuthError = await resp.json();
      return {
        ok: false,
        error: {
          status: resp.status,
          detail: err.error_description,
          title: err.error,
        },
      };
    }

    const token: Token = await resp.json();
    return {
      ok: true,
      value: token,
    };
  } catch (e) {
    return {
      ok: false,
      error: {
        code: ErrorCode.C_0_NETWORK_ERROR,
        detail: e.message,
        title: "Unable to reach authentication server",
      },
    };
  }
}
