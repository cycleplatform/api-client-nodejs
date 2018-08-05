import { ApiResult, makeUrl, OAuthError, Settings, ErrorCode } from "../common/api";
import { Token } from "./token";

export interface ClientCredsAuth {
    client_id: string;
    client_secret: string;
    scope?: string;
}

export async function clientCredentialsGrant(
    options: ClientCredsAuth,
    settings?: Settings,
): Promise<ApiResult<Token>> {
    const url = `${makeUrl(settings)}/oauth/token`;

    const queryParams = Object.keys(options)
        .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(options[k]))
        .join("&");

    try {
        const resp = await fetch(url, {
            method: "POST",
            body: `grant_type=client_credentials&${queryParams}`,
            headers: new Headers({
                "Content-type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
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
