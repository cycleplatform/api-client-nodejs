import {
  Resource,
  ResourceId,
  OwnerScope,
  Time,
  CollectionDoc,
} from "../../common/structs";
import {
  StandardParams,
  getRequest,
  links,
  QueryParams,
} from "../../common/api";
import { Environment } from "../environments";
import { Container } from "../containers";
import { Instance } from "../containers/instances";

export type Collection = CollectionDoc<Activity, ActivityQuery>;
export type ActivityQuery = QueryParams<keyof ActivityIncludes>;

export interface ActivityIncludes {
  verbosity?: number;
  environments?: Record<ResourceId, Environment>;
  containers?: Record<ResourceId, Container>;
  instances?: Record<ResourceId, Instance>;
}

type EventType =
  // environments
  | "environment.initialized"
  | "environment.started"
  | "environment.stopped"
  | "environment.deleted"
  // images
  | "image.imported"
  | "image.deleted"
  // containers
  | "container.started"
  | "container.stopped"
  | "container.reconfigured"
  | "container.reimaged"
  | "container.scaled"
  | "container.deleted"
  // instances
  | "container.instance.migration.started"
  | "container.instance.migration.reverted"
  | "container.instance.deleted";
// dns zones
// dns records
// servers

export interface Activity extends Resource {
  hub_id: ResourceId;
  user: OwnerScope;
  verbosity: number;
  scope: Scope;
  session: Session;
  changes: Change[];
  component: Component | null;
  status: ActivityStatusType;
  event: EventType;
  time: Time;
}

export interface Scope {
  environment_id?: ResourceId;
  container_id?: ResourceId;
  instance_id?: ResourceId;
  server_id?: ResourceId;
  image_id?: ResourceId;
  dns?: DNSScope;
}

export interface Session {
  url: string;
  ip: string;
  api_key: ResourceId;
}

export interface DNSScope {
  zone_id?: ResourceId;
  record_id?: ResourceId;
}

export interface Change {
  component: string;
  before?: Detail;
  after?: Detail;
}

export interface Component {
  id: string;
  type: string;
}

export type ActivityStatusType =
  | "info"
  | "warn"
  | "pending"
  | "success"
  | "error";

export interface Detail {
  id?: ResourceId;
  number?: number;
  string?: string;
}

export async function getCollection(params: StandardParams) {
  return getRequest<Collection>({
    ...params,
    target: links.hubs().activity(),
  });
}
