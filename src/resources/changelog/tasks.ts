/**
 * @internal
 */
import { links, StandardParams } from "../../common/api";
import { ResourceId } from "../../common/structs";
import * as Request from "../../common/api/request";

/** Helper to change the url as this lives on a diff url */
const externalURL = "marketing-api.internal.cycle.io";

export type ChangelogActions = "send-email" | "publish" | "hide";

interface BSP extends StandardParams {
  id: ResourceId;
}

type BTP<T = {}> = StandardParams & {
  id: ResourceId;
  value?: T;
};

export type SendEmailContentType = "internal" | "external" | "single";

export interface SendEmailContent {
  type: SendEmailContentType;
  /** Address will only be used to send test emails to a cycle email address */
  address?: string;
}

export interface RemoveParams extends BSP {}
export interface SendEmailParams extends BTP<SendEmailContent> {}
export interface PublishParams extends BTP {}
export interface HideParams extends BTP {}

export async function remove(params: RemoveParams) {
  return Request.deleteRequest({
    ...params,
    settings: {
      url: params.settings?.url ?? externalURL,
      ...params.settings,
    },
    target: links.changelog().single(params.id),
  });
}

export async function publish(params: PublishParams) {
  return Request.postRequest({
    ...params,
    settings: {
      url: params.settings?.url ?? externalURL,
      ...params.settings,
    },
    value: {
      action: "publish",
      ...params.value,
    },
    target: links.changelog().tasks(params.id),
  });
}

export async function sendEmail(params: SendEmailParams) {
  return Request.postRequest({
    ...params,
    settings: {
      url: params.settings?.url ?? externalURL,
      ...params.settings,
    },
    value: {
      action: "send-email",
      ...params.value,
    },
    target: links.changelog().tasks(params.id),
  });
}

export async function hide(params: HideParams) {
  return Request.postRequest({
    ...params,
    settings: {
      url: params.settings?.url ?? externalURL,
      ...params.settings,
    },
    value: {
      action: "hide",
      ...params.value,
    },
    target: links.changelog().tasks(params.id),
  });
}
