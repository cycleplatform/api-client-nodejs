import {
  ApiResult,
  makeUrl,
  OAuthError,
  Settings,
  ErrorCode,
} from '../common/api';
import { Token } from './token';

/**
 * Credentials required for refresh grant
 */
export interface RefreshParams {
  token: Token;
  // Not required if running in browser/through thin client
  client_id?: string;
  client_secret?: string;
}

/**
 * Make a request to the Cycle OAuth server to refresh token
 * @param auth The RefreshParams object containing refresh credentials
 * @param settings Optional Settings object to control the request
 */
export async function refreshGrant(
  auth: RefreshParams,
  settings?: Settings
): Promise<ApiResult<Token>> {
  const url = `${makeUrl(settings || { noVersion: true })}/oauth/token`;

  const params = { ...auth, refresh_token: auth.token.refresh_token };
  delete params.token;
  const queryParams = Object.keys(params)
    .map(
      k => `${encodeURIComponent(k)}=${encodeURIComponent((params as any)[k])}`
    )
    .join('&');

  try {
    const resp = await fetch(url, {
      method: 'POST',
      body: `grant_type=refresh_token&${queryParams}`,
      headers: new Headers({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
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
        title: 'Unable to reach authentication server',
      },
    };
  }
}
