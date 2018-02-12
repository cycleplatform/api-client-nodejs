import { Token } from "../auth";
import * as Request from "../common/api/request";
import { links, ProjectRequiredSettings } from "../common/api";
import { connectToSocket } from "../common/api/websocket";
import { PipelineEvent } from "./event";

export type ProjectPipelineEventHeader =
    | BillingHeader
    | ContainerHeader
    | DNSHeader
    | ProjectHeader
    | ImageHeader
    | JobHeader
    | EnvironmentHeader
    | ServerHeader
    | StackHeader;

export type BillingHeader =
    | "billing.service.state_changed"
    | "billing.invoice.created"
    | "billing.invoice.state_changed"
    | "billing.invoice.error"
    | "billing.order.created"
    | "billing.order.state_changed"
    | "billing.order.error"
    | "billing.discount.state_changed"
    | "billing.discount.error"
    | "billing.credit.state_changed"
    | "billing.credit.error"
    | "billing.method.created"
    | "billing.method.state_changed"
    | "billing.method.error";
export type ProjectHeader =
    | "project.updated"
    | "project.state_changed"
    | "project.membership.state_changed"
    | "project.api_key.created"
    | "project.api_key.updated"
    | "project.api_key.state_changed"
    | "project.api_key.error";
export type ImageHeader = "image.state_changed" | "image.error";
export type DNSHeader =
    | "dns.zone.created"
    | "dns.zone.updated"
    | "dns.zone.error"
    | "dns.zone.state_changed"
    | "dns.zone.new_record";
export type JobHeader =
    | "job.new"
    | "job.scheduled"
    | "job.queued"
    | "job.scheduled"
    | "job.running"
    | "job.error"
    | "job.completed"
    | "job.expired";
export type EnvironmentHeader =
    | "environment.created"
    | "environment.updated"
    | "environment.error"
    | "environment.state_changed";
export type ServerHeader = "server.state_changed" | "server.error";
export type StackHeader =
    | "stack.created"
    | "stack.error"
    | "stack.state_changed"
    | "stack.build.created"
    | "stack.build.state_changed"
    | "stack.build.error";
export type ContainerHeader =
    | "container.created"
    | "container.updated"
    | "container.error"
    | "container.ip.state_changed"
    | "container.ip.error"
    | "container.event"
    | "container.state_changed"
    | "container.instance.created"
    | "container.instance.error"
    | "container.instance.state_changed"
    | "container.instances.revised";

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
