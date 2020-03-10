import * as Request from "../common/api/request";
import { links, StandardParams } from "../common/api";
import { connectToSocket } from "../common/api/websocket";
import { Notification } from "./event";

/**
 * Possible event types that can be received
 * on the hub notification channel
 */
export type HubTopic =
  // billing credits
  | "billing.credit.created"
  | "billing.credit.state.changed"
  | "billing.credit.error"

  // billing discount
  | "billing.discount.state.changed"
  | "billing.discount.error"

  // billing invoice
  | "billing.invoice.created"
  | "billing.invoice.updated"
  | "billing.invoice.state.changed"
  | "billing.invoice.error"

  //billing method
  | "billing.method.created"
  | "billing.method.state.changed"
  | "billing.method.updated"
  | "billing.method.error"

  // billing order
  | "billing.order.created"
  | "billing.order.state.changed"
  | "billing.order.error"
  | "billing.order.updated"

  // billing service
  | "billing.service.state.changed"
  | "billing.service.error"

  // container
  | "container.created"
  | "container.updated"
  | "container.reconfigured"
  | "container.event.created"
  | "container.state.changed"
  | "container.desired_state.changed"
  | "container.error"

  // container instance
  | "container.instance.state.changed"
  | "container.instance.error"
  | "container.instance.reconfigured"

  // dns certificate
  | "dns.certificate.state.changed"
  | "dns.certificate.error"

  // dns zone
  | "dns.zone.state.changed"
  | "dns.zone.error"
  | "dns.zone.created"
  | "dns.zone.verified"
  | "dns.zone.reconfigured"
  | "dns.zone.records.reconfigured"

  // dns zone record
  | "dns.zone.record.state.changed"
  | "dns.zone.record.certificate.ready"

  // employees
  | "employee.state.changed"
  | "employee.error"

  // environments
  | "environment.started"
  | "environment.stopped"
  | "environment.created"
  | "environment.updated"
  | "environment.error"
  | "environment.state.changed"
  | "environment.services.reconfigured"
  | "environment.services.vpn.users.updated"
  | "environment.services.lb.ip.acquired"

  // hub
  | "hub.updated"
  | "hub.state.changed"
  | "hub.error"

  // hub api keys
  | "hub.api_key.created"
  | "hub.api_key.updated"
  | "hub.api_key.state.changed"
  | "hub.api_key.error"

  // hub memberships
  | "hub.membership.state.changed"
  | "hub.membership.error"
  | "hub.membership.updated"

  // images
  | "image.state.changed"
  | "image.updated"
  | "image.error"

  // infrastructure ips assignment
  | "infrastructure.ips.assignment.state.changed"
  | "infrastructure.ips.assignment.error"

  // infrastructure ips pool
  | "infrastructure.ips.pool.state.changed"
  | "infrastructure.ips.pool.error"

  // infrastructure server
  | "infrastructure.server.state.changed"
  | "infrastructure.server.error"
  | "infrastructure.server.new"
  | "infrastructure.server.reconfigured"

  // jobs
  | "job.created"
  | "job.state.changed"
  | "job.created"

  // sdn
  | "sdn.network.created"
  | "sdn.network.error"
  | "sdn.network.reconfigured"
  | "sdn.network.state.changed"
  | "sdn.network.update"

  // secret
  | "secret.state.changed"
  | "secret.error"

  // stack
  | "stack.state.changed"
  | "stack.error"

  // stack
  | "stack.created"
  | "stack.error"
  | "stack.state.changed"
  | "stack.updated"

  // builds
  | "stack.build.created"
  | "stack.build.state.changed"
  | "stack.build.error"
  | "stack.build.deployed";

export type HubNotification = Notification<HubTopic>;

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
