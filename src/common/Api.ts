import { OAuthToken } from "../auth";
import { ApiRequestInit } from "./ApiRequestInit";
import { ErrorResource } from "./Error";
import { formatParams, QueryParams } from "./QueryParams";
import { Settings, CreatedTask } from "./Structs";

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

async function makeRequest<T>(
    req: Request,
    token?: OAuthToken,
    settings?: Settings,
): Promise<ApiResult<T>> {
    if (token) {
        req.headers.append("Authorization", `Bearer ${token.access_token}`);
    }

    if (settings && settings.project) {
        req.headers.append("X-Project-Id", settings.project);
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
                detail:
                    "There was an error attempting to fetch data from server.",
                code: "0.network_error",
            },
        };
    }
}

export async function getRequest<T>({
    target,
    query = {},
    token,
    settings,
}: {
    target: string;
    query?: QueryParams;
    token?: OAuthToken;
    settings?: Settings;
}): Promise<ApiResult<T>> {
    const req = new Request(
        `${makeUrl(settings)}${target}?${formatParams(query)}`,
        ApiRequestInit,
    );
    return await makeRequest<T>(req, token, settings);
}

export async function postRequest<T>({
    target,
    value,
    query = {},
    token,
    settings,
}: {
    target: string;
    value: object;
    query?: QueryParams;
    token?: OAuthToken;
    settings?: Settings;
}): Promise<ApiResult<T>> {
    const req = new Request(
        `${makeUrl(settings)}${target}?${formatParams(query)}`,
        {
            ...ApiRequestInit,
            ...{
                method: "POST",
                body: JSON.stringify(value),
            },
        },
    );

    return await makeRequest<T>(req, token, settings);
}

export async function patchRequest<T>({
    target,
    value,
    query = {},
    token,
    settings,
}: {
    target: string;
    value: object;
    query?: QueryParams;
    token?: OAuthToken;
    settings?: Settings;
}): Promise<ApiResult<T>> {
    const req = new Request(
        `${makeUrl(settings)}${target}?${formatParams(query)}`,
        {
            ...ApiRequestInit,
            ...{
                method: "PATCH",
                body: JSON.stringify(value),
            },
        },
    );

    return await makeRequest<T>(req, token, settings);
}

export async function deleteRequest<T = CreatedTask<"delete">>({
    target,
    query = {},
    token,
    settings,
}: {
    target: string;
    query?: QueryParams;
    token?: OAuthToken;
    settings?: Settings;
}): Promise<ApiResult<T>> {
    const req = new Request(
        `${makeUrl(settings)}${target}?${formatParams(query)}`,
        {
            ...ApiRequestInit,
            ...{
                method: "DELETE",
            },
        },
    );

    return await makeRequest<T>(req, token, settings);
}
