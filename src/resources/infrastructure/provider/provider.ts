import { QueryParams, links, Settings, getRequest } from "common/api";
import { CollectionDoc, Resource } from "common/structs";
import { Location } from "./location";

export type Collection = CollectionDoc<Provider>;

export interface Provider extends Resource<ProviderMetas> {
  name: string;
  identifier: ProviderIdentifier;
  website: string;
  required_fields: Record<string, RequiredField>;
  features: string[];
}

export type ProviderIdentifier =
  | "packet"
  | "vultr"
  | "digital-ocean"
  | "aws"
  | "azure";

export interface RequiredField {
  caption: string;
  regex: string;
}

export interface ProviderMetas {
  locations: Location[];
}

export async function getCollection(params: {
  query?: QueryParams;
  settings?: Settings;
}) {
  return getRequest<Collection>({
    ...params,
    target: links
      .infrastructure()
      .providers()
      .collection(),
  });
}
