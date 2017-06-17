import { ApiResult, makeUrl } from "../common/Api";
import { OAuthError } from "../common/Error";
import { Settings } from "../common/Structs";
import { Token } from "./Token";

export interface PasswordAuth {
    email: string;
    password: string;
    totp_passcode: string;
    // Required only if hitting auth server directly
    client_id?: string;
    client_secret?: string;
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
                    source: "/data/email",
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
                detail: e.message,
                title: "Unable to reach authentication server",
            },
        };
    }
}
