import * as Request from "../../common/api/request";
import {
  Resource,
  ResourceId,
  OwnerScope,
  State,
  StandardEvents,
  CollectionDoc,
  SingleDoc,
} from "../../common/structs";
import { StandardParams, links } from "../../common/api";

export type Collection = CollectionDoc<Announcement>;
export type Single = SingleDoc<Announcement>;
export type AnnouncementState = "live" | "deleted";
export type AnnouncementPriority =
  | "notice"
  | "low"
  | "medium"
  | "high"
  | "severe";

export interface Announcement extends Resource {
  id: ResourceId;
  title: string;
  description: string;
  priority: AnnouncementPriority;
  link: string | null;
  events: StandardEvents;
  creator: OwnerScope;
  state: State<AnnouncementState>;
}

export async function getCollection(params: StandardParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.announcements().collection(),
  });
}