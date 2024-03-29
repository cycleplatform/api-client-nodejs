import { Token } from "../../auth";
import { ErrorResource } from "./error";
import { formatParams, QueryParams } from "./query";
import { CreatedTask, ResourceId, Task } from "../structs";
import { Settings } from "./settings";
import { VERSION } from "./version";

/**
 * The result structure of an API request. Can be success or failure
 */
export type ApiResult<T> = ResultSuccess<T> | ResultFail<ErrorResource>;

export type BaseParams<T = QueryParams> = {
  query?: T;
  settings?: Settings;
};

export type StandardParams<T = QueryParams> = BaseParams<T> & {
  token: Token | string;
  hubId: ResourceId;
};

export type PostParams<T = object> = {
  value: T;
};

export type PatchParams<T = object> = {
  value: T;
};

export type OptionalPostParam<T = object> = Partial<PostParams<T>>;

export type TaskParams<A extends string, T = {}> = {
  value: Task<A, T>;
};

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
  token?: Token | string,
  hubId?: ResourceId,
  settings?: Settings,
): Promise<ApiResult<T>> {
  if (token) {
    req.headers.append(
      "Authorization",
      `Bearer ${typeof token === "string" ? token : token.token}`,
    );
  }

  if (hubId) {
    req.headers.append("X-Hub-Id", hubId);
  }

  if (settings?.url && settings.setAccessControl) {
    req.headers.set("Access-Control-Allow-Origin", settings.url);
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

    try {
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
          title: "Error parsing response",
          detail: "API returned a non-JSON response",
          code: "0.parse_error",
        },
      };
    }
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

export async function getRequest<T>({
  target,
  query = {},
  token,
  hubId,
  settings,
}: {
  target: string;
  query?: QueryParams;
  token?: Token | string;
  hubId?: ResourceId;
  settings?: Settings;
}): Promise<ApiResult<T>> {
  const req = new Request(
    `${makeUrl(settings)}${target}?${formatParams(query)}`,
    {
      ...ApiRequestInit,
      credentials:
        settings && settings.credentials ? settings.credentials : undefined,
    },
  );
  return makeRequest<T>(req, token, hubId, settings);
}

export async function postRequest<T>({
  target,
  value,
  query = {},
  token,
  hubId,
  settings,
}: {
  target: string;
  value?: object;
  query?: QueryParams;
  hubId?: ResourceId;
  token?: Token | string;
  settings?: Settings;
}): Promise<ApiResult<T>> {
  const req = new Request(
    `${makeUrl(settings)}${target}?${formatParams(query)}`,
    {
      ...ApiRequestInit,
      ...{
        method: "POST",
        body: JSON.stringify(value),
        credentials:
          settings && settings.credentials ? settings.credentials : undefined,
      },
    },
  );

  return makeRequest<T>(req, token, hubId, settings);
}

export async function patchRequest<T>({
  target,
  value,
  query = {},
  hubId,
  token,
  settings,
}: {
  target: string;
  value: object;
  query?: QueryParams;
  hubId?: ResourceId;
  token?: Token | string;
  settings?: Settings;
}): Promise<ApiResult<T>> {
  const req = new Request(
    `${makeUrl(settings)}${target}?${formatParams(query)}`,
    {
      ...ApiRequestInit,
      ...{
        method: "PATCH",
        body: JSON.stringify(value),
        credentials:
          settings && settings.credentials ? settings.credentials : undefined,
      },
    },
  );

  return makeRequest<T>(req, token, hubId, settings);
}

export async function deleteRequest<T = CreatedTask<"delete">>({
  target,
  query = {},
  token,
  value,
  hubId,
  settings,
}: {
  target: string;
  query?: QueryParams;
  token?: Token | string;
  hubId?: ResourceId;
  value?: object;
  settings?: Settings;
}): Promise<ApiResult<T>> {
  const req = new Request(
    `${makeUrl(settings)}${target}?${formatParams(query)}`,
    {
      ...ApiRequestInit,
      ...{
        method: "DELETE",
        body: value ? JSON.stringify(value) : undefined,
        credentials:
          settings && settings.credentials ? settings.credentials : undefined,
      },
    },
  );

  return makeRequest<T>(req, token, hubId, settings);
}
