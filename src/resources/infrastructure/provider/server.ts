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

/** A collection of server models for a provider */
export type Collection = CollectionDoc<Server, ServerIncludes>;

/** A single provider server model document */
export type Single = SingleDoc<Server>;

/** A provider server model */
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
  price: Amount;
  /** Whether this server is compatible with Cycle or not */
  compatible: boolean;
  /** If true, this server has limited resources and should only be used for lightweight applications */
  low_resource: boolean;
  /** An array of Location IDs where this server type is available */
  location_ids: ResourceId[];
  /** A list of features this particular server type has available */
}

export interface ServerIncludes extends Includes {
  locations: Record<ResourceId, Location>;
}

export interface ServerProvider {
  identifier: ProviderIdentifier;
  category: string;
  class?: string;
  model: string;
  plan_identifier?: string;
  /** List of location IDs this server is available in */
  locations: string[];
}

export interface ServerFeatures {
  /** Features specific to AWS */
  aws: AWSFeatures;
}

export interface AWSFeatures {
  /** A VM type that can support a much higher networking throughput */
  ena_support: boolean;
  /** A VM type that can support a much higher storage throughput */
  ebs_optimized: boolean;
}

/** Detailed breakdown of a provider server's specs */
export interface ServerSpecs {
  cpus: CPU[];
  memory: Memory;
  storage: Storage[];
  network: NIC[];
  features: Features;
}

export interface Features {
  raid: string | null;
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

export type NICScope = "public" | "private" | "shared";

export interface NIC {
  count: number;
  scope: NICScope;
  throughput_mbps: number;
  type: string;
}

export type ProviderServerQuery = QueryParams<keyof ServerIncludes>;

export async function getCollection(params: {
  provider: ProviderIdentifier;
  query?: ProviderServerQuery;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    ...params,
    target: links
      .infrastructure()
      .providers()
      .servers(params.provider),
  });
}
