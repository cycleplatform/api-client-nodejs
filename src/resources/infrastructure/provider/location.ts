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
  features: string[];
  abbreviation: string;
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
  location_identifier: string;
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
      .locations(provider),
  });
}
