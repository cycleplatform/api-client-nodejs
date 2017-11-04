import { Token } from "../auth";
import * as Request from "../common/api/request";
import { links, ProjectRequiredSettings } from "../common/api";
import { connectToSocket } from "../common/api/websocket";
import { PipelineEvent } from "./event";

export type AccountPipelineEventHeader =
    | "project.create"
    | "project.delete"
    | "notification.send";

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

    const secretResp = await Request.getRequest<AccountSecretResponse>({
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
