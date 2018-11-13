import * as Request from "../../../common/api/request";
import { Token } from "../../../auth";
import { QueryParams, links, Settings } from "../../../common/api";
import {
  CollectionDoc,
  Resource,
  SingleDoc,
  ResourceId,
  State,
  Events,
  OwnerScope,
  StatefulCounts,
} from "../../../common/structs";
import { Spec } from "../spec";
import { ContainerState } from "../../containers";

export * from "./tasks/build";

export type Collection = CollectionDoc<Build>;
export type Single = SingleDoc<Build>;
export type BuildState =
  | "new"
  | "importing"
  | "building"
  | "verifying"
  | "saving"
  | "live"
  | "deploying"
  | "deleting"
  | "deleted";

export type BuildsQuery = QueryParams<string, keyof BuildMetas>;

export interface Build extends Resource<BuildMetas> {
  stack_id: ResourceId;
  owner: OwnerScope;
  spec: Spec;
  events: Events;
  state: State<BuildState>;
}

export interface BuildMetas {
  container_counts: StatefulCounts<ContainerState>;
}

export async function getCollection({
  stack,
  token,
  query,
  settings,
}: {
  stack: ResourceId;
  token: Token;
  query?: BuildsQuery;
  settings?: Settings;
}) {
  return Request.getRequest<Collection>({
    query,
    token,
    settings,
    target: links
      .stacks()
      .builds(stack)
      .collection(),
  });
}

export async function getSingle({
  id,
  stack,
  token,
  query,
  settings,
}: {
  id: ResourceId;
  stack: ResourceId;
  token: Token;
  query?: BuildsQuery;
  settings?: Settings;
}) {
  return Request.getRequest<Single>({
    query,
    token,
    settings,
    target: links
      .stacks()
      .builds(stack)
      .single(id),
  });
}
