import { Token } from "../../auth";
import { ErrorResource, ErrorCode } from "./error";
import { formatParams, QueryParams } from "./query";
import { CreatedTask } from "../structs";
import { Settings } from "./settings";
import { VERSION } from "./version";

/**
 * The result structure of an API request. Can be success or failure
 */
export type ApiResult<T> = ResultSuccess<T> | ResultFail<ErrorResource>;

/** The result of a successful API call */
export interface ResultSuccess<T> {
  ok: true;
  value: T;
}

/** The result of a failed API call */
export interface ResultFail<T> {
  ok: false;
  error: T;
}

/** Standard settings for API call */
export const ApiRequestInit: RequestInit = {
  method: "GET",
  headers: new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
  }),
  mode: "cors",
  credentials: "omit",
  cache: "no-cache",
};

/** Take a settings bag and turn it into a valid API URL endpoint */
export function makeUrl(settings?: Settings, websocket?: boolean) {
  let secure = true;
  let version = `/${VERSION}`;

  if (settings && settings.noVersion) {
    version = "";
  }

  if (settings && settings.useHttp) {
    secure = false;
  }

  if (settings && settings.url && settings.url.indexOf("://") > -1) {
    return settings.url;
  }

  const prefix = websocket
    ? `ws${secure ? "s" : ""}://`
    : `http${secure ? "s" : ""}://`;

  if (settings && settings.url) {
    return `${prefix}${settings.url}${version}`;
  }

  // Default URL returned. Version will be updated here if changed
  return `${prefix}api.cycle.io${version}`;
}

/** Make the request */
async function makeRequest<T>(
  req: Request,
  token?: Token,
  settings?: Settings,
): Promise<ApiResult<T>> {
  if (token) {
    req.headers.append("Authorization", `Bearer ${token.access_token}`);
  }

  if (settings && settings.project) {
    req.headers.append("X-Project-Id", settings.project);
  }

  try {
    const resp = await fetch(req, {
      signal: settings && settings.signal,
    });
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
        code: ErrorCode.C_0_NETWORK_ERROR,
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
  token?: Token;
  settings?: Settings;
}): Promise<ApiResult<T>> {
  const req = new Request(
    `${makeUrl(settings)}${target}?${formatParams(query)}`,
    ApiRequestInit,
  );
  return makeRequest<T>(req, token, settings);
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
  token?: Token;
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

  return makeRequest<T>(req, token, settings);
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
  token?: Token;
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

  return makeRequest<T>(req, token, settings);
}

export async function deleteRequest<T = CreatedTask<"delete">>({
  target,
  query = {},
  token,
  settings,
}: {
  target: string;
  query?: QueryParams;
  token?: Token;
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

  return makeRequest<T>(req, token, settings);
}
