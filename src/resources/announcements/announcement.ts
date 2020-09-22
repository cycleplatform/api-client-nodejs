import * as Request from "../../common/api/request";
import {
  Resource,
  ResourceId,
  CreatorScope,
  State,
  CollectionDoc,
  SingleDoc,
  Events,
  Time,
} from "../../common/structs";
import { StandardParams, links } from "../../common/api";
import { ProviderIdentifier } from "../infrastructure/provider";

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
  updates: Update[];
  affected_providers: ProviderIdentifier[];
  priority: AnnouncementPriority;
  events: Events<"resolved">;
  creator: CreatorScope;
  state: State<AnnouncementState>;
}

export interface Update {
  id: ResourceId;
  message: string;
  creator: CreatorScope;
  time: Time;
}

export async function getCollection(params: StandardParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.announcements().collection(),
  });
}
