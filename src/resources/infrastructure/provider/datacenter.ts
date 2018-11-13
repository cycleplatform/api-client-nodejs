import * as Request from "../../../common/api/request";
import { QueryParams, links, Settings } from "../../../common/api";
import {
  CollectionDoc,
  Resource,
  ResourceId,
  SingleDoc,
} from "../../../common/structs";

export type Collection = CollectionDoc<DataCenter>;
export type Single = SingleDoc<DataCenter>;

export interface DataCenter extends Resource {
  name: string;
  location: Location;
  provider: DataCenterProvider;
  features: string[];
  abbreviation: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  country: string;
}

export interface DataCenterProvider {
  id: ResourceId;
  datacenter_id: ResourceId;
  code: string;
}

export async function getCollection({
  provider,
  query,
  settings,
}: {
  provider: ResourceId;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    query,
    settings,
    target: links
      .infrastructure()
      .providers()
      .datacenters(provider),
  });
}
