import { ApiResult, makeUrl, OAuthError, Settings } from "../common/api";
import { Token } from "./token";

export interface PasswordAuth {
    email: string;
    password: string;
    totp_passcode: string;
    register_device?: boolean;
    // Not required if running in browser/through thin client
    client_id?: string;
    client_secret?: string;
    scope?: string;
}

export async function passwordGrant(
    options: PasswordAuth,
    settings?: Settings,
): Promise<ApiResult<Token>> {
    const url = `${makeUrl(settings)}/oauth/token`;
    const queryParams = Object.keys(options)
        .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(options[k]))
        .join("&");

    try {
        const resp = await fetch(url, {
            method: "POST",
            body: `grant_type=password&${queryParams}`,
            credentials: "include", // support registered device cookie
            headers: new Headers({
                "Content-type": "application/x-www-form-urlencoded",
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
                code: "0.network_error",
                detail: e.message,
                title: "Unable to reach authentication server",
            },
        };
    }
}
