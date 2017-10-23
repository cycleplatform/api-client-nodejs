import { ApiResult, makeUrl } from "./Api";
import { Settings } from "./Structs";

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
    try {
        console.log("WEBSOCKET DEF", typeof WebSocket);
        const ws = new WebSocket(
            `${makeUrl(settings, true)}${target}?token=${token}`,
        );
        if (onMessage) {
            ws.onmessage = e => {
                try {
                    const payload: T = noJsonDecode
                        ? e.data
                        : JSON.parse(e.data);
                    onMessage(payload);
                } catch (e) {
                    // tslint:disable-next-line:no-console
                    console.warn("Unable to decode payload");
                }
            };
        }
        return { ok: true, value: ws };
    } catch (e) {
        return {
            ok: false,
            error: { code: "0.network_error", title: (e as CloseEvent).reason },
        };
    }
}
