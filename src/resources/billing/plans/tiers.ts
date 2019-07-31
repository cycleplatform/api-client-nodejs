import { getRequest } from "common/api/request";
import { QueryParams, links, Settings } from "common/api";
import { CollectionDoc, Resource, SingleDoc, Gigabytes } from "common/structs";
import { Amount } from "../amount";

export type Collection = CollectionDoc<TierPlan>;
export type Single = SingleDoc<TierPlan>;

export interface TierPlan extends Resource {
  name: string;
  price: Amount;
  description: string;
  ram: RAM;
  image_storage: ImageStorage;
  default?: true;
}

export interface RAM {
  included_gb: Gigabytes;
  additional_gb: Amount;
}

export interface ImageStorage {
  included_gb: Gigabytes;
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
      .tiers(),
  });
}
