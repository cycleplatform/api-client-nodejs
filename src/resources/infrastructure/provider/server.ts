import * as Request from "../../../common/api/request";
import { QueryParams, links, Settings } from "../../../common/api";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  ResourceId,
  Includes,
  Gigabytes,
} from "../../../common/structs";
import { ProviderIdentifier } from "./provider";
import { Amount } from "../../billing";
import { Location } from "./location";

/** A collection of servers for a provider */
export type Collection = CollectionDoc<Server, {}, ServerIncludes>;

/** A single provider server document */
export type Single = SingleDoc<Server>;

/** A provider server interface */
export interface Server extends Resource {
  /** Name of the server */
  name: string;
  /** Description of the server */
  description: string;
  /** Detailed breakdown of the server's specs */
  specs: ServerSpecs;
  /** Information about the provider of this server */
  provider: ServerProvider;
  /** Price of this server */
  pricing: Amount;
  /** List of location IDs this server is available in */
  location_ids: ResourceId[];
}

export interface ServerIncludes extends Includes {
  locations: Record<ResourceId, Location>;
}

export interface ServerProvider {
  identifier: ProviderIdentifier;
  category: string;
  class?: string;
  plan_id: string;
}

/** Detailed breakdown of a provider server's specs */
export interface ServerSpecs {
  cpus: CPU[];
  memory: Memory;
  drives: Storage[];
  nics: NIC[];
}

/** Details of a CPU on a provider server */
export interface CPU {
  /** Number of this type of CPU */
  count: number;
  type: string;
  extra?: { [key: string]: string };
}

export interface Memory {
  size_gb: Gigabytes;
  type: string;
  extra?: { [key: string]: string };
}

export interface Storage {
  count: number;
  size_gb: Gigabytes;
  type: string;
  extra?: { [key: string]: string };
}

export interface NIC {
  count: number;
  throughput_mbps: number;
}

export type ProviderServerQuery = QueryParams<keyof ServerIncludes>;

export async function getCollection({
  provider,
  query,
  settings,
}: {
  provider: ProviderIdentifier;
  query?: ProviderServerQuery;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    query,
    settings,
    target: links
      .infrastructure()
      .providers()
      .servers(provider),
  });
}
