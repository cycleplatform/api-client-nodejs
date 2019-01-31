import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, Settings } from "../../common/api";
import {
  CollectionDoc,
  Resource,
  ResourceId,
  Time,
} from "../../common/structs";

export type Collection = CollectionDoc<Event>;
export type EventType = "default" | "info" | "success" | "error";

export interface Event extends Resource {
  platform: boolean;
  cloud_id: ResourceId;
  container_id: ResourceId;
  detail: string;
  caption: string;
  instance_id: ResourceId | null;
  type: EventType;
  time: Time;
}

export async function getCollection({
  containerId,
  token,
  query,
  settings,
}: {
  containerId: ResourceId;
  token: Token;
  query?: QueryParams;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    query,
    token,
    settings,
    target: links.containers().events(containerId),
  });
}
