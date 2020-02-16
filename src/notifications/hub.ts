import * as Request from "../common/api/request";
import { links, StandardParams } from "../common/api";
import { connectToSocket } from "../common/api/websocket";
import { Notification } from "./event";

/**
 * Possible event types that can be received
 * on the hub notification channel
 */
export type HubHeader =
  // billing
  | "billing.service.state_changed"
  | "billing.service.error"
  | "billing.invoice.created"
  | "billing.invoice.state_changed"
  | "billing.invoice.error"
  | "billing.order.created"
  | "billing.order.state_changed"
  | "billing.order.error"
  | "billing.discount.state_changed"
  | "billing.discount.error"
  | "billing.method.created"
  | "billing.method.state_changed"
  | "billing.method.error"
  // certificated
  | "certificates.state_changed"
  | "certificates.error"
  // container
  | "container.created"
  | "container.updated"
  | "container.error"
  | "container.event"
  | "container.state_changed.desired"
  | "container.state_changed"
  | "container.instance.created"
  | "container.reconfigured"
  | "container.instances.revised"
  // dns
  | "dns.zone.created"
  | "dns.zone.updated"
  | "dns.zone.error"
  | "dns.zone.state_changed"
  | "dns.zone.certificates.generated"
  | "dns.zone.certificates.failed"
  | "dns.zone.verified"
  // environments
  | "environment.created"
  | "environment.updated"
  | "environment.error"
  | "environment.state_changed"
  | "environment.services.updated"
  | "environment.services.vpn.user.created"
  | "environment.services.vpn.user.deleted"
  | "environment.egress_gateway.created"
  // images
  | "image.state_changed"
  | "image.error"
  // jobs
  | "job.new"
  | "job.scheduled"
  | "job.queued"
  | "job.running"
  | "job.error"
  | "job.completed"
  | "job.expired"
  // hub
  | "hub.updated"
  | "hub.state_changed"
  | "hub.membership.state_changed"
  | "hub.api_key.created"
  | "hub.api_key.updated"
  | "hub.api_key.state_changed"
  | "hub.api_key.error"
  // infrastructure
  | "infrastructure.ips.pool.state_changed"
  | "infrastructure.ips.pool.error"
  | "infrastructure.server.state_changed"
  | "infrastructure.server.error"
  | "infrastructure.server.updated"
  // stack
  | "stack.created"
  | "stack.error"
  | "stack.state_changed"
  | "stack.updated"
  | "stack.build.created"
  | "stack.build.state_changed"
  | "stack.build.error"
  | "stack.hook.created"
  | "stack.hook.updated"
  | "stack.hook.task_deploy"
  // sdn
  | "sdn.network.created"
  | "sdn.network.reconfigured"
  | "sdn.network.state_changed";

export type HubNotification = Notification<HubHeader>;

export interface HubPipelineParams extends StandardParams {
  onMessage?: (v: HubNotification) => void;
}

export interface HubSecretResponse {
  data: {
    token: string;
  };
}

export async function connectToHubChannel(params: HubPipelineParams) {
  const target = links.channels().hub();

  const secretResp = await Request.getRequest<HubSecretResponse>({
    ...params,
    target,
  });

  if (!secretResp.ok) {
    return secretResp;
  }

  return connectToSocket<HubNotification>({
    target,
    token: secretResp.value.data.token,
    settings: params.settings,
    onMessage: params.onMessage,
  });
}
