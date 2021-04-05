/**
 * @internal
 */
import { links, StandardParams } from "../../common/api";
import { ResourceId } from "../../common/structs";
import * as Request from "../../common/api/request";

/** Helper to change the url as this lives on a diff url */
const externalURL = "marketing-api.internal.cycle.io";

export type ChangelogActions = "prepublish" | "publish" | "hide";

//
interface BSP extends StandardParams {
  id: ResourceId;
}

interface BTP extends StandardParams {
  id: ResourceId;
  value?: any;
}

export interface RemoveParams extends BSP {}
export interface PrepublishParams extends BTP {}
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

export async function prepublish(params: PrepublishParams) {
  return Request.postRequest({
    ...params,
    settings: {
      url: params.settings?.url ?? externalURL,
      ...params.settings,
    },
    value: {
      action: "prepublish",
      ...params.value,
    },
    target: links.changelog().tasks(params.id),
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
