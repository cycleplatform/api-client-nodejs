import { ApiResult, makeUrl } from "./request";
import { Settings } from "./settings";
import WS from "isomorphic-ws";

export interface SocketConnectParams<T> {
  target: string;
  token: string; // provided by accompanying socket auth
  settings?: Settings;
  onMessage?: (v: T) => void;
  noJsonDecode?: boolean;
}

export async function connectToSocket<T>({
  target,
  token,
  settings,
  onMessage,
  noJsonDecode,
}: SocketConnectParams<T>): Promise<ApiResult<WebSocket>> {
  let ws;
  try {
    ws = new WS(`${makeUrl(settings, true)}${target}?token=${token}`);
  } catch (e) {
    return {
      ok: false,
      error: {
        code: "0.network_error",
        title: (e as CloseEvent).reason,
      },
    };
  }

  if (onMessage) {
    // @ts-ignore
    ws.onmessage = (e: MessageEvent) => {
      const payload: T = noJsonDecode ? e.data : JSON.parse(e.data as string);
      onMessage(payload);
    };
  }

  // @ts-ignore
  return { ok: true, value: ws as WebSocket };
}
