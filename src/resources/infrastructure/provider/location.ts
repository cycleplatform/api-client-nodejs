import * as Request from "../../../common/api/request";
import { QueryParams, links, Settings } from "../../../common/api";
import {
  CollectionDoc,
  Resource,
  ResourceId,
  SingleDoc,
} from "../../../common/structs";
import { ProviderIdentifier } from "./provider";

export type Collection = CollectionDoc<Location>;
export type Single = SingleDoc<Location>;

export interface Location extends Resource {
  name: string;
  geographic: Geographic | null;
  provider: LocationProvider;
  compatible: boolean;
  features: {
    available: string[];
    supported: string[];
  };
  abbreviation: string;
  annotations: Record<string, string>;
}

export interface Geographic {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  country: string;
  region: string;
}

export interface LocationProvider {
  identifier: ProviderIdentifier;
  location: string;
  code: string;
}

export async function getCollection(params: {
  provider: ResourceId;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    ...params,
    target: links
      .infrastructure()
      .providers()
      .locations(params.provider),
  });
}
