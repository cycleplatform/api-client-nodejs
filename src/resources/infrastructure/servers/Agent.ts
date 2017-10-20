import * as API from "../../../common/Api";
import { Token } from "../../../auth";
import { ResourceId, ProjectRequiredSettings } from "../../../common/Structs";
import { links } from "../../../common/Links";
import { connectToSocket } from "../../../common/WebSocket";

export interface AgentPipelineParams {
    id: ResourceId;
    token: Token;
    settings?: ProjectRequiredSettings;
    /**
     * optional typed onmessage handler
     */
    onMessage?: (v: string) => void;
}

export interface AgentPipelineResponse {
    data: string;
}

export async function connectToAgentSocket(params: AgentPipelineParams) {
    const target = links
        .infrastructure()
        .servers()
        .agent(params.id);

    const secretResp = await API.getRequest<AgentPipelineResponse>({
        target,
        token: params.token,
        settings: params.settings,
    });

    if (!secretResp.ok) {
        return secretResp;
    }

    return connectToSocket({
        target,
        token: secretResp.value.data,
        settings: params.settings,
        onMessage: params.onMessage,
        noJsonDecode: true,
    });
}
