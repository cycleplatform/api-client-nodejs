import { ApiResult, makeUrl } from "../common/Api";
import { OAuthError } from "../common/Error";
import { Settings } from "../common/Structs";
import { Token } from "./Token";

export interface RefreshParams {
    token: Token;
    // Not required if running in browser/through thin client
    client_id?: string;
    client_secret?: string;
}

export async function refreshGrant(
    options: RefreshParams,
    settings?: Settings,
): Promise<ApiResult<Token>> {
    const url = `${makeUrl(settings)}/oauth/token`;

    const params = { ...options, refresh_token: options.token.refresh_token };
    delete params.token;
    const queryParams = Object.keys(params)
        .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
        .join("&");

    try {
        const resp = await fetch(url, {
            method: "POST",
            body: `grant_type=refresh_token&${queryParams}`,
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                Accept: "application/json",
            },
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