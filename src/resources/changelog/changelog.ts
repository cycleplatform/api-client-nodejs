import { getRequest } from "../../common/api/request";
import { Resource, CollectionDoc } from "../../common/structs";
import { links, QueryParams, Settings } from "../../common/api";

export type ChangeType =
  | "added"
  | "fixed"
  | "improvement"
  | "security"
  | "removed"
  | "changed"
  | "deprecated";

export type Collection = CollectionDoc<Change>;

export interface Change extends Resource {
  release: string;
  version: string;
  type: ChangeType;
  title: string;
  detail: string;
  codebase: string;
  link?: string;
}

export async function getCollection(params: {
  query?: QueryParams;
  settings?: Settings;
}) {
  return getRequest<Collection>({
    ...params,
    target: links.changelog().collection(),
  });
}
