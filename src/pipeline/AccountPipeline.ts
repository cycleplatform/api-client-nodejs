import * as API from "../common/Api";
import { Token } from "../auth";
import { ProjectRequiredSettings } from "../common/Structs";
import { links } from "../common/Links";
import { connectToSocket } from "../common/WebSocket";
import { PipelineEvent } from "./PipelineEvent";

export type AccountPipelineEventHeader = "project.create" | "project.delete";

export interface AccountPipelineParams {
    token: Token;
    settings: ProjectRequiredSettings;
    onMessage?: (v: AccountPipelineEvent) => void;
}

export type AccountPipelineEvent = PipelineEvent<AccountPipelineEventHeader>;

export interface AccountSecretResponse {
    data: {
        token: string;
    };
}

export async function connectToAccountPipeline(params: AccountPipelineParams) {
    const target = links.account().pipeline();

    const secretResp = await API.getRequest<AccountSecretResponse>({
        target,
        token: params.token,
        settings: params.settings,
    });

    if (!secretResp.ok) {
        return secretResp;
    }

    return connectToSocket<AccountPipelineEvent>({
        target,
        token: secretResp.value.data.token,
        settings: params.settings,
        onMessage: params.onMessage,
    });
}
