import { getRequest } from "common/api/request";
import { QueryParams, links, Settings } from "common/api";
import { CollectionDoc, Resource, SingleDoc } from "common/structs";
import { Amount } from "../amount";

export type Collection = CollectionDoc<SupportPlan>;
export type Single = SingleDoc<SupportPlan>;

export interface SupportPlan extends Resource {
  name: string;
  price: Amount;
  description: string;
  default?: true;
}

export async function getCollection(params: {
  query?: QueryParams;
  settings?: Settings;
}) {
  return getRequest<Collection>({
    ...params,
    target: links
      .billing()
      .plans()
      .support(),
  });
}
