import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import {
  QueryParams,
  links,
  ProjectRequiredSettings,
  Settings,
} from "../../common/api";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  Events,
  State,
} from "../../common/structs";
import { Membership } from "./membership";

export type Collection = CollectionDoc<Project>;
export type Single = SingleDoc<Project>;

export type ProjectQuery = QueryParams<"", keyof ProjectMetas>;

export type ProjectState =
  | "new"
  | "configuring" // placing an order
  | "provisioning" // order confirmed, invoice billed
  | "live" // at least 1 server online
  | "inactive"
  | "deleting"
  | "deleted";

export interface Project extends Resource<ProjectMetas> {
  name: string;
  events: Events;
  billing: {
    disabled: boolean;
  };
  state: State<ProjectState>;
}

export interface ProjectMetas {
  membership?: Membership;
}

export interface CreateParams {
  name: string;
  ssl?: {
    email: string;
  };
}

export type UpdateParams = Partial<CreateParams>;

export async function getCollection({
  token,
  query,
  settings,
}: {
  token: Token;
  query?: ProjectQuery;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    query,
    token,
    settings,
    target: links.projects().collection(),
  });
}

export async function getSingle({
  token,
  query,
  settings,
}: {
  token: Token;
  query?: ProjectQuery;
  settings?: Settings;
}) {
  return Request.getRequest<Single>({
    query,
    token,
    settings,
    target: links.projects().single(),
  });
}

export async function create({
  value,
  token,
  query,
  settings,
}: {
  value: CreateParams;
  token: Token;
  query?: ProjectQuery;
  settings?: Settings;
}) {
  return Request.postRequest<Single>({
    value,
    query,
    token,
    settings,
    target: links.projects().collection(),
  });
}

export async function update({
  value,
  token,
  query,
  settings,
}: {
  value: Partial<UpdateParams>;
  token: Token;
  query?: ProjectQuery;
  settings?: Settings;
}) {
  return Request.patchRequest<Single>({
    value,
    query,
    token,
    settings,
    target: links.projects().single(),
  });
}

export async function remove({
  token,
  query,
  settings,
}: {
  token: Token;
  query?: ProjectQuery;
  settings: ProjectRequiredSettings;
}) {
  return Request.deleteRequest<Single>({
    query,
    token,
    settings,
    target: links.projects().single(),
  });
}
