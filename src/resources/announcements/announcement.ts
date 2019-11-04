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
import { StandardParams, links } from "common/api";

export type Collection = CollectionDoc<Announcement>;
export type Single = SingleDoc<Announcement>;
export type AnnouncementState = "live" | "deleted";

export interface Announcement extends Resource {
  id: ResourceId;
  detail: string;
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

export async function getActive() {
  return Request.getRequest<Single>({
    target: links.announcements().active(),
  });
}
