import * as API from "../../../common/Api";
import { Token } from "../../../auth";
import { ResourceId, ProjectRequiredSettings } from "../../../common/Structs";
import { links } from "../../../common/Links";
import { connectToSocket } from "../../../common/WebSocket";

export interface ConsolePipelineParams {
    id: ResourceId;
    token: Token;
    settings?: ProjectRequiredSettings;
    /**
     * optional typed onmessage handler
     */
    onMessage?: (v: string) => void;
}

export interface ConsolePipelineResponse {
    data: {
        token: string;
        address: string;
    };
}

export async function connectToConsole(params: ConsolePipelineParams) {
    const target = links
        .infrastructure()
        .servers()
        .console(params.id);

    const secretResp = await API.getRequest<ConsolePipelineResponse>({
        target,
        token: params.token,
        settings: params.settings,
    });

    if (!secretResp.ok) {
        return secretResp;
    }

    return connectToSocket({
        target: "",
        token: secretResp.value.data.token,
        settings: {
            url: `${secretResp.value.data.address}/v1/console`,
        },
        onMessage: params.onMessage,
        noJsonDecode: true,
    });
}
