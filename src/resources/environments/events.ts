import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, ProjectRequiredSettings } from "../../common/api";
import { ResourceId, CollectionDoc } from "../../common/structs";
import { Events, Container } from "../containers";

export type EventQuery = QueryParams<keyof EventIncludes>;

export async function getCollection({
  environmentId,
  token,
  query,
  settings,
}: {
  environmentId: ResourceId;
  token: Token;
  query?: EventQuery;
  settings?: ProjectRequiredSettings;
}) {
  return Request.getRequest<CollectionDoc<Events.Event, {}, EventIncludes>>({
    query,
    token,
    settings,
    target: links.environments().events(environmentId),
  });
}

export interface EventIncludes {
  containers?: {
    [key: string]: Container;
  };
}
