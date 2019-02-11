import * as Request from "../../../common/api/request";
import { links, StandardParams } from "../../../common/api";
import {
  CollectionDoc,
  Resource,
  ResourceId,
  Time,
} from "../../../common/structs";

export type Collection = CollectionDoc<Event>;
export type EventType = "default" | "info" | "success" | "error";

export interface Event extends Resource {
  platform: boolean;
  hub_id: ResourceId;
  container_id: ResourceId;
  detail: string;
  caption: string;
  instance_id: ResourceId | null;
  type: EventType;
  time: Time;
}

export async function getCollection(
  params: StandardParams & {
    containerId: ResourceId;
  },
) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.containers().events(params.containerId),
  });
}
