import { Token } from "../auth";
import * as Request from "../common/api/request";
import { links, ProjectRequiredSettings } from "../common/api";
import { connectToSocket } from "../common/api/websocket";
import { Notification } from "./event";

/**
 * Possible event types that can be received
 * on the project notification channel
 */
export enum ProjectHeader {
  /** A billing service state has changed */
  BILLING_SERVICE_STATE_CHANGED = "billing.service.state_changed",
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

  CONTAINER_CREATED = "container.created",
  CONTAINER_UPDATED = "container.updated",
  CONTAINER_ERROR = "container.error",
  CONTAINER_IP_STATE_CHANGED = "container.ip.state_changed",
  CONTAINER_IP_ERROR = "container.ip.error",
  CONTAINER_EVENT = "container.event",
  CONTAINER_STATE_CHANGED = "container.state_changed",
  CONTAINER_INSTANCE_CREATED = "container.instance.created",
  CONTAINER_INSTANCE_ERROR = "container.instance.error",
  CONTAINER_INSTANCE_STATE_CHANGED = "container.instance.state_changed",
  CONTAINER_INSTANCES_REVISED = "container.instances.revised",

  DNS_ZONE_CREATED = "dns.zone.created",
  DNS_ZONE_UPDATED = "dns.zone.updated",
  DNS_ZONE_ERROR = "dns.zone.error",
  DNS_ZONE_STATE_CHANGED = "dns.zone.state_changed",
  DNS_ZONE_NEW_RECORD = "dns.zone.new_record",

  ENVIRONMENT_CREATED = "environment.created",
  ENVIRONMENT_UPDATED = "environment.updated",
  ENVIRONMENT_ERROR = "environment.error",
  ENVIRONMENT_STATE_CHANGED = "environment.state_changed",
  ENVIRONMENT_VPN_RECONFIGURED = "environment.vpn.reconfigured",

  IMAGE_STATE_CHANGED = "image.state_changed",
  IMAGE_ERROR = "image.error",

  JOB_NEW = "job.new",
  JOB_SCHEDULED = "job.scheduled",
  JOB_QUEUED = "job.queued",
  JOB_RUNNING = "job.running",
  JOB_ERROR = "job.error",
  JOB_COMPLETED = "job.completed",
  JOB_EXPIRED = "job.expired",

  PROJECT_UPDATED = "project.updated",
  PROJECT_STATE_CHANGED = "project.state_changed",
  PROJECT_MEMBERSHIP_STATE_CHANGED = "project.membership.state_changed",
  PROJECT_API_KEY_CREATED = "project.api_key.created",
  PROJECT_API_KEY_UPDATED = "project.api_key.updated",
  PROJECT_API_KEY_STATE_CHANGED = "project.api_key.state_changed",
  PROJECT_API_KEY_ERROR = "project.api_key.error",

  SERVER_STATE_CHANGED = "server.state_changed",
  SERVER_ERROR = "server.error",

  STACK_CREATED = "stack.created",
  STACK_ERROR = "stack.error",
  STACK_STATE_CHANGED = "stack.state_changed",
  STACK_UPDATED = "stack.updated",
  STACK_BUILD_CREATED = "stack.build.created",
  STACK_BUILD_STATE_CHANGED = "stack.build.state_changed",
  STACK_BUILD_ERROR = "stack.build.error",
}

export type ProjectNotification = Notification<ProjectHeader>;

export interface ProjectPipelineParams {
  token: Token;
  settings: ProjectRequiredSettings;
  onMessage?: (v: ProjectNotification) => void;
}

export interface ProjectSecretResponse {
  data: {
    token: string;
  };
}

export async function connectToProjectChannel(params: ProjectPipelineParams) {
  const target = links.channels().project();

  const secretResp = await Request.getRequest<ProjectSecretResponse>({
    target,
    token: params.token,
    settings: params.settings,
  });

  if (!secretResp.ok) {
    return secretResp;
  }

  return connectToSocket<ProjectNotification>({
    target,
    token: secretResp.value.data.token,
    settings: params.settings,
    onMessage: params.onMessage,
  });
}
