import * as Request from "../../../common/api/request";
import { QueryParams, links, StandardParams } from "../../../common/api";
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
  hub_id: ResourceId;
  owner: OwnerScope;
  spec: Spec;
  events: Events;
  state: State<BuildState>;
}

export interface BuildMetas {
  container_counts: StatefulCounts<ContainerState>;
}

export async function getCollection(
  params: StandardParams<BuildsQuery> & {
    stackId: ResourceId;
  },
) {
  return Request.getRequest<Collection>({
    ...params,
    target: links
      .stacks()
      .builds(params.stackId)
      .collection(),
  });
}

export async function getSingle(
  params: StandardParams<BuildsQuery> & {
    id: ResourceId;
    stackId: ResourceId;
  },
) {
  return Request.getRequest<Single>({
    ...params,
    target: links
      .stacks()
      .builds(params.stackId)
      .single(params.id),
  });
}
