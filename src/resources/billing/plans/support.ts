import * as Request from "../../../common/api/request";
import { QueryParams, links, Settings } from "../../../common/api";
import { CollectionDoc, Resource, SingleDoc } from "../../../common/structs";
import { Amount } from "../../billing";

export type Collection = CollectionDoc<SupportPlan>;
export type Single = SingleDoc<SupportPlan>;

export interface SupportPlan extends Resource {
  name: string;
  price: Amount;
  description: string;
  features: Features;
  default?: true;
}

export interface Features {
  engineering_support: boolean;
  uptime_sla: boolean;
  guaranteed_response_time: string;
}

export async function getCollection(params: {
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.billing().plans().support(),
  });
}
