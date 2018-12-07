import * as Request from "../../../common/api/request";
import { QueryParams, links, Settings } from "../../../common/api";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  Gigabytes,
} from "../../../common/structs";
import { Amount } from "../../billing";

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
  additional_gb: Amount;
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
    target: links
      .billing()
      .plans()
      .tiers(),
  });
}
