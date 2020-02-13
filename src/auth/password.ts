import { postRequest, BaseParams, PostParams } from "../common/api";
import { DEFAULT_AUTH_URL } from "./common";
import { Time } from "../common/structs";

/**
 * Parameters for creating a password grant request
 */
export interface PasswordAuth {
  email: string;
  password: string;
  application_id: string;
  totp_code?: string;
  register_device?: boolean;
}

export interface PasswordAuthReturn {
  redirect_url?: string;
  application_id: string;
  expires: Time;
  grant_code: string;
}

/**
 * **You probably don't need this, you most likely want the clientCredentialsGrant() or to pass in an API key for your token directly**
 *
 * Make a request to the Cycle OAuth server using password grant in order to obtain an access token.
 * This will return a grant code that can be used with the getGrantAccessToken() function,
 * and an http-only cookie that can be used with the getBrowserAccessToken() function.
 *
 * @param auth The PasswordAuth object containing authorization credentials
 * @param settings Optional Settings object to control the request
 */
export async function passwordGrant(
  params: BaseParams & PostParams<PasswordAuth>,
) {
  return postRequest<{ data: PasswordAuthReturn }>({
    ...params,
    target: "/auth/password",
    settings: {
      ...params.settings,
      url:
        params.settings && params.settings.url
          ? params.settings.url
          : DEFAULT_AUTH_URL,
    },
  });
}
