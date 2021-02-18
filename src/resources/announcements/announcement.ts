import * as Request from "../../common/api/request";
import {
  Resource,
  ResourceId,
  UserScope,
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
/**
 * The announcement state
 */
export type AnnouncementState = "live" | "deleted";
/**
 * The announcement priority
 */
export type AnnouncementPriority =
  | "notice"
  | "low"
  | "medium"
  | "high"
  | "severe";

/**
 * The announcement resource
 */
export interface Announcement extends Resource {
  id: ResourceId;
  title: string;
  description: string;
  updates: Update[];
  affected_providers: ProviderIdentifier[];
  priority: AnnouncementPriority;
  events: Events<"resolved">;
  creator: UserScope;
  state: State<AnnouncementState>;
}

/**
 * Information about an update made to the announcement
 */
export interface Update {
  id: ResourceId;
  message: string;
  creator: UserScope;
  time: Time;
}

export async function getCollection(params: StandardParams) {
  return Request.getRequest<Collection>({
    ...params,
    target: links.announcements().collection(),
  });
}
