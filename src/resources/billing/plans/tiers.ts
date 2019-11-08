import * as Request from "../../../common/api/request";
import { QueryParams, links, Settings } from "../../../common/api";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  Gigabytes,
} from "../../../common/structs";
import { Amount } from "../../billing";
import { Builds } from "resources/stacks";

export type Collection = CollectionDoc<TierPlan>;
export type Single = SingleDoc<TierPlan>;

export interface TierPlan extends Resource {
  name: string;
  price: Amount;
  description: string;
  ram: RAM;
  image_storage: ImageStorage;
  builds: Builds;
  default?: true;
  hidden: boolean;
  code: string;
}

export interface RAM {
  included_gb: Gigabytes;
  additional_gb: Amount;
}

export interface ImageStorage {
  included_gb: Gigabytes;
}

export interface Builds {
  parallel: number;
  cpu_cores: number;
  ram_gb: Gigabytes;
}

export async function getCollection(params: {
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    ...params,
    target: links
      .billing()
      .plans()
      .tiers(),
  });
}
