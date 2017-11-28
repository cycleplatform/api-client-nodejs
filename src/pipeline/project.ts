import { Token } from "../auth";
import * as Request from "../common/api/request";
import { links, ProjectRequiredSettings } from "../common/api";
import { connectToSocket } from "../common/api/websocket";
import { PipelineEvent } from "./event";

export type ProjectPipelineEventHeader =
    | BillingHeader
    | ContainerHeader
    | ProjectHeader
    | ImageHeader
    | JobHeader
    | EnvironmentHeader
    | ServerHeader
    | StackHeader;

export type BillingHeader =
    | "billing.service.state_changed"
    | "billing.invoice.state_changed"
    | "billing.order.state_changed"
    | "billing.discount.state_changed"
    | "billing.credit.state_changed"
    | "billing.method.state_changed";
export type ProjectHeader =
    | "project.state_changed"
    | "project.membership.state_changed"
    | "project.api_key.state_changed";
export type ImageHeader = "image.state_changed";
export type DNSHeader = "dns.zone.state_changed";
export type JobHeader =
    | "job.new"
    | "job.scheduled"
    | "job.queued"
    | "job.scheduled"
    | "job.running"
    | "job.error"
    | "job.completed"
    | "job.expired";
export type EnvironmentHeader = "environment.state_changed";
export type ServerHeader = "server.state_changed";
export type StackHeader = "stack.state_changed" | "stack.build.state_changed";
export type ContainerHeader =
    | "container.state_changed"
    | "container.instance.state_changed";

export type ProjectPipelineEvent = PipelineEvent<ProjectPipelineEventHeader>;

export interface ProjectPipelineParams {
    token: Token;
    settings: ProjectRequiredSettings;
    onMessage?: (v: ProjectPipelineEvent) => void;
}

export interface ProjectSecretResponse {
    data: {
        token: string;
    };
}

export async function connectToProjectPipeline(params: ProjectPipelineParams) {
    const target = links.projects().pipeline();

    const secretResp = await Request.getRequest<ProjectSecretResponse>({
        target,
        token: params.token,
        settings: params.settings,
    });

    if (!secretResp.ok) {
        return secretResp;
    }

    return connectToSocket<ProjectPipelineEvent>({
        target,
        token: secretResp.value.data.token,
        settings: params.settings,
        onMessage: params.onMessage,
    });
}
