import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { links, ProjectRequiredSettings } from "../../../common/api";
import { ResourceId } from "../../../common/structs";
import { connectToSocket } from "../../../common/api/websocket";
import { VERSION } from "../../../common/api/version";

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

    const secretResp = await Request.getRequest<ConsolePipelineResponse>({
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
            url: `${secretResp.value.data.address}/${VERSION}/console`,
            noVersion: true,
        },
        onMessage: params.onMessage,
        noJsonDecode: true,
    });
}
