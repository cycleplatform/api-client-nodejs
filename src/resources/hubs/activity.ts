import {
  Resource,
  ResourceId,
  OwnerScope,
  Time,
  CollectionDoc,
} from "../../common/structs";
import { StandardParams, getRequest, links } from "../../common/api";

export type Collection = CollectionDoc<Activity>;

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
  scope: Scope;
  changes: Change[];
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

export interface DNSScope {
  zone_id?: ResourceId;
  record_id?: ResourceId;
}

export interface Change {
  component: string;
  before?: Detail;
  after?: Detail;
}

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
