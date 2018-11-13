import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, ProjectRequiredSettings } from "../../common/api";
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
} from "../../common/structs";
import { Container } from "../containers";

export type Collection = CollectionDoc<Record, {}, RecordIncludes>;
export type Single = SingleDoc<Record>;

export type RecordState = "live" | "deleting" | "deleted";
export type RecordQuery = QueryParams<keyof RecordIncludes>;

export interface Record extends Resource {
  project_id: ResourceId;
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
  hosted?: TypeHosted;
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

export interface TypeHosted {
  container_id?: ResourceId;
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
}

export async function getCollection({
  zoneId,
  token,
  query,
  settings,
}: {
  zoneId: ResourceId;
  token: Token;
  query?: QueryParams;
  settings?: ProjectRequiredSettings;
}) {
  return Request.getRequest<Collection>({
    query,
    token,
    settings,
    target: links
      .dns()
      .zones()
      .records(zoneId),
  });
}

export interface CreateParams {
  type: RecordType;
  name: string;
}

export async function create({
  zoneId,
  value,
  token,
  query,
  settings,
}: {
  zoneId: ResourceId;
  value: CreateParams;
  token: Token;
  query?: QueryParams;
  settings?: ProjectRequiredSettings;
}) {
  return Request.postRequest<Single>({
    query,
    token,
    settings,
    value,
    target: links
      .dns()
      .zones()
      .records(zoneId),
  });
}

export async function update({
  zoneId,
  recordId,
  value,
  token,
  query,
  settings,
}: {
  zoneId: ResourceId;
  recordId: ResourceId;
  value: CreateParams;
  token: Token;
  query?: QueryParams;
  settings?: ProjectRequiredSettings;
}) {
  return Request.patchRequest<Single>({
    query,
    token,
    settings,
    value,
    target: links
      .dns()
      .zones()
      .record(zoneId, recordId),
  });
}

export async function remove({
  zoneId,
  recordId,
  token,
  query,
  settings,
}: {
  zoneId: ResourceId;
  recordId: ResourceId;
  token: Token;
  query?: QueryParams;
  settings?: ProjectRequiredSettings;
}) {
  return Request.deleteRequest<CreatedTask<"delete">>({
    query,
    token,
    settings,
    target: links
      .dns()
      .zones()
      .record(zoneId, recordId),
  });
}
