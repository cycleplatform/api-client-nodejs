import { OAuthToken } from "../auth";
import { ApiRequestInit } from "./ApiRequestInit";
import { ErrorResource } from "./Error";
import { formatParams, QueryParams } from "./QueryParams";
import { Settings } from "./Structs";

export type ApiResult<T> = ResultSuccess<T> | ResultFail<ErrorResource>;

export interface ResultSuccess<T> {
    ok: true;
    value: T;
}

export interface ResultFail<T> {
    ok: false;
    error: T;
}

export function makeUrl(settings?: Settings) {
    if (settings && settings.url) {
        return settings.url;
    }

    // Default URL returned. Version will be updated here if changed
    return `https://api.cycle.io/v1`;
}

async function makeRequest<T>(req: Request, token: OAuthToken, headers?: Headers): Promise<ApiResult<T>> {
    req.headers.append("Authorization", `Bearer ${token.access_token}`);

    if (headers) {
        for (const p in headers) {
            if (!headers.hasOwnProperty(p)) { continue; }
            req.headers.append(p, headers[p]);
        }
    }

    try {
        const resp = await fetch(req);
        if (!resp.ok) {
            const error = await resp.json();
            return {
                ok: false,
                error: error.error,
            };
        }

        const result: T = await resp.json();
        return {
            ok: true,
            value: result,
        };
    } catch (e) {
        return {
            ok: false,
            error: {
                status: 0,
                title: "Unable to reach server",
                detail: "There was an error attempting to fetch data from server.",
                code: "0.network_error",
            },
        };
    }
}

export async function getRequest<T>(
    target: string,
    query: QueryParams = {},
    token: OAuthToken,
): Promise<ApiResult<T>> {
    const req = new Request(`${target}?${formatParams(query)}`, ApiRequestInit);
    return await makeRequest<T>(req, token);
}

export async function postRequest<T>(
    target: string,
    doc: object,
    query: QueryParams = {},
    token: OAuthToken,
): Promise<ApiResult<T>> {
    const req = new Request(
        `${target}?${formatParams(query)}`,
        {
            ...ApiRequestInit,
            ...{
                method: "POST",
                body: JSON.stringify(doc),
            },
        },
    );

    return await makeRequest<T>(req, token);
}

export async function patchRequest<T>(
    target: string,
    doc: object,
    query: QueryParams = {},
    token: OAuthToken,
): Promise<ApiResult<T>> {
    const req = new Request(
        `${target}?${formatParams(query)}`,
        {
            ...ApiRequestInit,
            ...{
                method: "PATCH",
                body: JSON.stringify(doc),
            },
        },
    );

    return await makeRequest<T>(req, token);
}

export async function deleteRequest<T>(
    target: string,
    query: QueryParams = {},
    token: OAuthToken,
): Promise<ApiResult<T>> {
    const req = new Request(
        `${target}?${formatParams(query)}`,
        {
            ...ApiRequestInit,
            ...{
                method: "DELETE",
            },
        },
    );

    return await makeRequest<T>(req, token);
}
