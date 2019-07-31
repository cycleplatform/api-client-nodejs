import { QueryParams, links, StandardParams, getRequest } from "common/api";
import { ResourceId, CollectionDoc } from "common/structs";
import { Events, Container } from "resources/containers";

export type EventQuery = QueryParams<keyof EventIncludes>;

export async function getCollection(
  params: StandardParams<EventQuery> & {
    environmentId: ResourceId;
  },
) {
  return getRequest<CollectionDoc<Events.Event, EventIncludes>>({
    ...params,
    target: links.environments().events(params.environmentId),
  });
}

export interface EventIncludes {
  containers?: {
    [key: string]: Container;
  };
}
