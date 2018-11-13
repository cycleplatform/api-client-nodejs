import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, ProjectRequiredSettings } from "../../common/api";
import { ResourceId, CollectionDoc, SingleDoc } from "../../common/structs";
import { Record, RecordIncludes, RecordQuery } from "./record";

export type Collection = CollectionDoc<Record, {}, RecordIncludes>;
export type Single = SingleDoc<Record>;

export async function getCollection({
  token,
  query,
  settings,
}: {
  token: Token;
  query?: RecordQuery;
  settings?: ProjectRequiredSettings;
}) {
  return Request.getRequest<Collection>({
    query,
    token,
    settings,
    target: links
      .dns()
      .domains()
      .collection(),
  });
}

export interface CreateParams {
  domain: string;
  container_id?: ResourceId;
}

export async function create({
  value,
  token,
  query,
  settings,
}: {
  value: CreateParams;
  token: Token;
  query?: QueryParams;
  settings?: ProjectRequiredSettings;
}) {
  return Request.postRequest<Single>({
    query,
    token,
    settings,
    value,
    target: links
      .dns()
      .domains()
      .collection(),
  });
}
