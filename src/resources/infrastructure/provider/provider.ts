import * as Request from "../../../common/api/request";
import { QueryParams, links, Settings } from "../../../common/api";
import { CollectionDoc, Resource } from "../../../common/structs";
import { Location } from "./location";

export type Collection = CollectionDoc<Provider>;

export interface Provider extends Resource<ProviderMetas> {
  id: string;
  name: string;
  identifier: ProviderIdentifier;
  website: string;
}

export enum ProviderIdentifier {
  PACKET = "packet",
}

export interface ProviderMetas {
  locations: Location[];
}

export async function getCollection(params: {
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    ...params,
    target: links
      .infrastructure()
      .providers()
      .collection(),
  });
}
