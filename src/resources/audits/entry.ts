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
  IP,
} from "../../common/structs";

export interface EntrySession {
  ip: IP;
  scope: string[];
}

export type EntryType = "success";
export enum EntryComponentType {
  ENVIRONMENT = "environments.Environment",
}
export enum EntryCode {
  ENVIRONMENT_CREATED = "environment.created",
}

export interface EntryComponent {
  type: EntryComponentType;
  id: ResourceId;
}

export interface Entry extends Resource {
  project_id: ResourceId;
  environment_id: ResourceId;
  user: OwnerScope;
  session: EntrySession;
  type: EntryType;
  events: Events;
  component: EntryComponent;
  message: string;
  code: EntryCode;
}

export type Collection = CollectionDoc<Entry>;
export type Single = SingleDoc<Entry>;

export async function getEntries({
  token,
  query,
  settings,
}: {
  token: Token;
  query?: QueryParams;
  settings?: ProjectRequiredSettings;
}) {
  return Request.getRequest<Collection>({
    query,
    token,
    settings,
    target: links.audit().entries(),
  });
}