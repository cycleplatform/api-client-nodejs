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
export type AnnouncementEvents = "created" | "deleted" | "updated";
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

export async function getSingle(
  params: StandardParams & {
    id: ResourceId;
  },
) {
  return Request.getRequest<Single>({
    ...params,
    target: links.announcements().single(params.id),
  });
}
