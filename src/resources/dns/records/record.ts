import * as Request from "../../../common/api/request";
import { QueryParams, links, StandardParams } from "../../../common/api";
import {
  CollectionDoc,
  Resource,
  Events,
  OwnerScope,
  ResourceId,
  SingleDoc,
  OwnerInclude,
  CreatedTask,
  State,
  ContainerIdentifier,
} from "../../../common/structs";
import { Container } from "../../containers";
import { Project } from "../../projects";

export type Collection = CollectionDoc<Record, RecordIncludes>;
export type Single = SingleDoc<Record, RecordIncludes>;

export type RecordState = "live" | "deleting" | "deleted";
export type RecordQuery = QueryParams<keyof RecordIncludes>;

export interface Record extends Resource {
  hub_id: ResourceId;
  owner: OwnerScope;
  zone_id: ResourceId;
  name: string;
  resolved_domain: string;
  type: RecordType;
  state: State<RecordState>;
  events: Events;
}

export interface RecordType {
  a?: TypeA;
  aaaa?: TypeAAAA;
  cname?: TypeCNAME;
  ns?: TypeNS;
  mx?: TypeMX;
  txt?: TypeTXT;
  alias?: TypeALIAS;
  linked?: TypeLinked;
}

export interface TypeA {
  ip: string;
}

export interface TypeAAAA {
  ip: string;
}

export interface TypeCNAME {
  domain: string;
}

export interface TypeNS {
  domain: string;
}

export interface TypeMX {
  priority: number;
  domain: string;
}

export interface TypeTXT {
  value: string;
}

export interface TypeALIAS {
  domain: string;
}

export interface TypeLinked {
  container_id?: ResourceId;
  project?: ProjectLink;
  features: LinkFeatures;
}

export interface ProjectLink {
  project_id: ResourceId;
  container: ContainerIdentifier;
}

export interface LinkFeatures {
  tls: {
    enable: boolean;
  };
}

export interface RecordValues {
  ip?: string;
  domain?: string;
  priority?: number;
  text?: string;
  comment?: string;
}

export interface RecordIncludes {
  owners?: OwnerInclude;
  containers?: {
    [key: string]: Container;
  };
  projects?: {
    [key: string]: Project;
  };
}

export async function getCollection(
  params: StandardParams & {
    zoneId: ResourceId;
  },
) {
  return Request.getRequest<Collection>({
    ...params,
    target: links
      .dns()
      .zones()
      .records(params.zoneId),
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
    target: links
      .dns()
      .zones()
      .records(params.zoneId),
  });
}

export async function update(
  params: StandardParams & {
    zoneId: ResourceId;
    recordId: ResourceId;
    value: CreateParams;
  },
) {
  return Request.patchRequest<Single>({
    ...params,
    target: links
      .dns()
      .zones()
      .record(params.zoneId, params.recordId),
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
    target: links
      .dns()
      .zones()
      .record(params.zoneId, params.recordId),
  });
}
