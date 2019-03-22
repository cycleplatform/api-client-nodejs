import * as Request from "../common/api/request";
import { links, StandardParams } from "../common/api";
import { connectToSocket } from "../common/api/websocket";
import { Notification } from "./event";

/**
 * Possible event types that can be received
 * on the hub notification channel
 */
export enum HubHeader {
  /** A billing service state has changed */
  BILLING_SERVICE_STATE_CHANGED = "billing.service.state_changed",
  BILLING_SERVICE_ERROR = "billing.service.error",
  /** A new invoice has been created */
  BILLING_INVOICE_CREATED = "billing.invoice.created",
  /** An invoice state has changed */
  BILLING_INVOICE_STATE_CHANGED = "billing.invoice.state_changed",
  /** An invoice has encountered an error */
  BILLING_INVOICE_ERROR = "billing.invoice.error",
  /** A new order has been created */
  BILLING_ORDER_CREATED = "billing.order.created",
  /** An order state has changed */
  BILLING_ORDER_STATE_CHANGED = "billing.order.state_changed",
  /** There has been an error with an order */
  BILLING_ORDER_ERROR = "billing.order.error",
  /** A discount item's state has changed */
  BILLING_DISCOUNT_STATE_CHANGED = "billing.discount.state_changed",
  BILLING_DISCOUNT_ERROR = "billing.discount.error",
  BILLING_CREDIT_STATE_CHANGED = "billing.credit.state_changed",
  BILLING_CREDIT_ERROR = "billing.credit.error",
  BILLING_METHOD_CREATED = "billing.method.created",
  BILLING_METHOD_STATE_CHANGED = "billing.method.state_changed",
  BILLING_METHOD_ERROR = "billing.method.error",

  CERTIFICATES_STATE_CHANGED = "certificates.state_changed",
  CERTIFICATES_ERROR = "certificates.error",

  CONTAINER_CREATED = "container.created",
  CONTAINER_UPDATED = "container.updated",
  CONTAINER_ERROR = "container.error",
  CONTAINER_EVENT = "container.event",
  CONTAINER_STATE_CHANGE_DESIRED = "container.state_changed.desired",
  CONTAINER_STATE_CHANGED = "container.state_changed",
  CONTAINER_INSTANCE_CREATED = "container.instance.created",
  CONTAINER_RECONFIGURED = "container.reconfigured",
  CONTAINER_INSTANCES_REVISED = "container.instances.revised",

  DNS_ZONE_CREATED = "dns.zone.created",
  DNS_ZONE_UPDATED = "dns.zone.updated",
  DNS_ZONE_ERROR = "dns.zone.error",
  DNS_ZONE_STATE_CHANGED = "dns.zone.state_changed",
  DNS_ZONE_NEW_RECORD = "dns.zone.record.created",
  DNS_RECORD_STATE_CHANGED = "dns.zone.record.state_changed",
  DNS_ZONE_CERTIFICATES_GENERATED = "dns.zone.certificates.generated",
  DNS_ZONE_VERIFIED = "dns.zone.verified",

  ENVIRONMENT_CREATED = "environment.created",
  ENVIRONMENT_UPDATED = "environment.updated",
  ENVIRONMENT_ERROR = "environment.error",
  ENVIRONMENT_STATE_CHANGED = "environment.state_changed",
  ENVIRONMENT_SERVICES_UPDATED = "environment.services.updated",
  ENVIRONMENT_SERVICES_VPN_USER_CREATED = "environment.services.vpn.user.created",
  ENVIRONMENT_SERVICES_VPN_USER_DELETED = "environment.services.vpn.user.deleted",

  EMPLOYEES_STATE_CHANGED = "employees.state_changed",
  EMPLOYEES_ERROR = "employees.error",

  IMAGE_STATE_CHANGED = "image.state_changed",
  IMAGE_ERROR = "image.error",

  JOB_NEW = "job.new",
  JOB_SCHEDULED = "job.scheduled",
  JOB_QUEUED = "job.queued",
  JOB_RUNNING = "job.running",
  JOB_ERROR = "job.error",
  JOB_COMPLETED = "job.completed",
  JOB_EXPIRED = "job.expired",

  PROJECT_CREATED = "project.created",
  PROJECT_UPDATED = "project.updated",
  PROJECT_STATE_CHANGED = "project.state_changed",
  PROJECT_ERROR = "project.error",

  HUB_UPDATED = "hub.updated",
  HUB_STATE_CHANGED = "hub.state_changed",
  HUB_MEMBERSHIP_STATE_CHANGED = "hub.membership.state_changed",
  HUB_API_KEY_CREATED = "hub.api_key.created",
  HUB_API_KEY_UPDATED = "hub.api_key.updated",
  HUB_API_KEY_STATE_CHANGED = "hub.api_key.state_changed",
  HUB_API_KEY_ERROR = "hub.api_key.error",

  INFRASTRUCTURE_IP_STATE_CHANGED = "infrastructure.ip.state_changed",
  INFRASTRUCTURE_IP_ERROR = "infrastructure.ip.error",
  INFRASTRUCTURE_SERVER_CREATED = "infrastructure.server.created",
  INFRASTRUCTURE_SERVER_STATE_CHANGED = "infrastructure.server.state_changed",
  INFRASTRUCTURE_SERVER_ERROR = "infrastructure.server.error",

  STACK_CREATED = "stack.created",
  STACK_ERROR = "stack.error",
  STACK_STATE_CHANGED = "stack.state_changed",
  STACK_UPDATED = "stack.updated",
  STACK_BUILD_CREATED = "stack.build.created",
  STACK_BUILD_STATE_CHANGED = "stack.build.state_changed",
  STACK_BUILD_ERROR = "stack.build.error",
  STACK_HOOK_CREATED = "stack.hook.created",
  STACK_HOOK_UPDATED = "stack.hook.updated",
  STACK_HOOK_TASK_DEPLOY = "stack.hook.task_deploy",
}

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
