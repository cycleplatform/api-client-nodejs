import * as Request from "../../common/api/request";
import { QueryParams, links, Settings } from "../../common/api";
import { CollectionDoc, Resource, SingleDoc } from "../../common/structs";
import { Amount } from "../billing";

export type Collection = CollectionDoc<SupportPlan>;
export type Single = SingleDoc<SupportPlan>;

export interface SupportPlan extends Resource {
  name: string;
  price: Amount;
  description: string;
  default?: true;
}

export async function getCollection({
  query,
  settings,
}: {
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    query,
    settings,
    target: links.plans().support(),
  });
}
