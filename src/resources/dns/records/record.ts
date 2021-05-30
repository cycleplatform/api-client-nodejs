import * as Request from "../../../common/api/request";
import { QueryParams, links, StandardParams } from "../../../common/api";
import {
  CollectionDoc,
  Resource,
  Events,
  UserScope,
  ResourceId,
  SingleDoc,
  UserIncludes,
  CreatedTask,
  State,
  Time,
} from "../../../common/structs";
import { Container } from "../../containers";

export type Collection = CollectionDoc<Record, RecordIncludes>;
export type Single = SingleDoc<Record, RecordIncludes>;
/**
 * Possible states a record can be in
 */
export type RecordState = "pending" | "live" | "deleting" | "deleted";
export type RecordQuery = QueryParams<keyof RecordIncludes>;

/** DNS Record resource information */
export interface Record extends Resource {
  hub_id: ResourceId;
  creator: UserScope;
  zone_id: ResourceId;
  /** The name used for the record where @ is root */
  name: string;
  /** The string a request to a DNS server will return */
  resolved_domain: string;
  type: RecordType;
  features: RecordFeatures | null;
  state: State<RecordState>;
  events: Events;
}
/**
 * Information about the features for the record
 */
export interface RecordFeatures {
  certificate: Certificate | null;
}

/**
 * TLS certificate information
 */
export interface Certificate {
  id: ResourceId;
  generated: Time;
  wildcard_child: boolean;
}

/**
 * Information about the types of records
 */
export interface RecordType {
  a?: TypeA;
  aaaa?: TypeAAAA;
  cname?: TypeCNAME;
  ns?: TypeNS;
  mx?: TypeMX;
  caa?: TypeCAA;
  txt?: TypeTXT;
  alias?: TypeALIAS;
  srv?: TypeSRV;
  linked?: TypeLinked;
}

/**
 * Information about an A record
 */
export interface TypeA {
  /** The IPv4 address this record resolves to */
  ip: string;
}

/**
 * Information about a AAAA record
 */
export interface TypeAAAA {
  /** The IPv6 address this record resolves to  */
  ip: string;
}
/**
 * Information about a CNAME record
 */
export interface TypeCNAME {
  /** The domain string this record resolves to  */
  domain: string;
}

/**
 * Information about a NS record
 */
export interface TypeNS {
  /** The domain of the nameserver to be used by the zone */
  domain: string;
}

/**
 * Information about a MX record
 */
export interface TypeMX {
  /** The records setting for priority */
  priority: number;
  /** The domain this mx record points to */
  domain: string;
}
/**
 * Information about a TXT record
 */
export interface TypeTXT {
  /** The value returned by the DNS server when this TXT record is requested */
  value: string;
}
/**
 * Information about a ALIAS record
 */
export interface TypeALIAS {
  /** The domain string returned from the DNS server when this ALIAS record is requested */
  domain: string;
}
/**
 * Information about a SRV record
 */
export interface TypeSRV {
  /** The weight configured for this record - breaks ties for priority */
  weight: number;
  /** The priority configured for this record */
  priority: number;
  /**  The port number for the service */
  port: number;
  /** The domain for this record - can optionally include service and protocol information  */
  domain: string;
}
/**
 * Information about a CAA record
 */
export interface TypeCAA {
  /** An ASCII string that represents the identifier of the property represented by the record */
  tag: string;
  /** The value associated with the tag */
  value: string;
}
/**
 * Information about a Linked record
 */
export interface TypeLinked {
  /** The container ID this record is associated with  */
  container_id?: ResourceId;

  features: LinkFeatures;
}

/**
 * Information about advanced features
 */
export interface LinkFeatures {
  /** TLS information  */
  tls: {
    /** A boolean where true means that TLS is enabled */
    enable: boolean;
  };
}
/**
 * Information on the values of a record
 */
export interface RecordValues {
  /** IP information for the record */
  ip?: string;
  /** Domain information for the record */
  domain?: string;
  /** Priority information for the record */
  priority?: number;
  /** Text value information for the record */
  text?: string;
  /** Comment information for the record */
  comment?: string;
}

export interface RecordIncludes {
  creators?: UserIncludes;
  containers?: {
    [key: string]: Container;
  };
}

export async function getCollection(
  params: StandardParams & {
    zoneId: ResourceId;
  },
) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.dns().zones().records(params.zoneId),
  });
}

export interface CreateParams {
  type: RecordType;
  name: string;
}

export async function create(
  params: StandardParams & {
    zoneId: ResourceId;
    value: CreateParams;
  },
) {
  return Request.postRequest<Single>({
    ...params,
    target: links.dns().zones().records(params.zoneId),
  });
}

export async function update(
  params: StandardParams & {
    zoneId: ResourceId;
    recordId: ResourceId;
    value: Omit<CreateParams, "name">;
  },
) {
  return Request.patchRequest<Single>({
    ...params,
    target: links.dns().zones().record(params.zoneId, params.recordId),
  });
}

export async function remove(
  params: StandardParams & {
    zoneId: ResourceId;
    recordId: ResourceId;
  },
) {
  return Request.deleteRequest<CreatedTask<"delete">>({
    ...params,
    target: links.dns().zones().record(params.zoneId, params.recordId),
  });
}
